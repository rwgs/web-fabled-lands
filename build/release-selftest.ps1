#Requires -Version 7.0
<#
  release-selftest.ps1
  --------------------
  Drives release.ps1 over fixtures so the edition manifest is tested instead of trusted
  (task 209). Three parts:

    1. books.ini validation - one case per class of malformed, duplicated or dangling
       Published= entry, plus the shapes that must still be accepted.
    2. The service worker's generated offline inventory - a publish set in, the three
       precache lists out, byte-identical on a no-op re-run.
    3. A REAL build of a fixture tree, both directions of an added-book transition, once per
       number in $ADDED: adding a book must reach meta.json, its bundled data and the
       offline inventory; withdrawing it must delete exactly its own generated files and
       nothing else. Then the failure path: a fixture broken on purpose must fail carrying
       the build's own diagnosis, naming the offending file.

  Nothing under books/ or web/ is touched: every fixture is built in a temp directory and
  removed afterwards (build-data.ps1 takes -Root for exactly this).

  Run: pwsh -ExecutionPolicy Bypass -File build/release-selftest.ps1   (exit 0 = pass)

  ASCII-only and OS-neutral (forward slashes), like the other build scripts.
#>
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'release.ps1')

$pass = 0
$fail = 0
function Assert([string]$label, [bool]$cond, [string]$detail) {
    if ($cond) { $script:pass++; Write-Host "PASS $label" }
    else { $script:fail++; Write-Host "FAIL $label$(if ($detail) { " - $detail" })" }
}

$tmp = Join-Path ([System.IO.Path]::GetTempPath()) ('fl-release-' + [System.Guid]::NewGuid().ToString('N'))
function Reset-Tmp {
    if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }
    New-Item -ItemType Directory -Force -Path $tmp | Out-Null
}
function Write-Text([string]$path, [string]$text) {
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $path) | Out-Null
    [System.IO.File]::WriteAllText($path, $text, (New-Object System.Text.UTF8Encoding($false)))
}

# =========================================================================================
# 1. books.ini validation
# =========================================================================================
# A registry fixture: the ini text, and the book directories that exist beside it.
function Test-Ini([string[]]$lines, [string[]]$dirs) {
    Reset-Tmp
    $booksDir = Join-Path $tmp 'books'
    New-Item -ItemType Directory -Force -Path $booksDir | Out-Null
    foreach ($d in $dirs) { New-Item -ItemType Directory -Force -Path (Join-Path $booksDir $d) | Out-Null }
    $ini = Join-Path $booksDir 'books.ini'
    Write-Text $ini (($lines -join "`n") + "`n")
    return Get-BookRegistry $ini $booksDir
}

$GOOD = @('Books=1,2', 'Published=1,2', '1.Path=book1', '1.Title=One', '2.Path=book2', '2.Title=Two')
$GOOD_DIRS = @('book1', 'book2')

$clean = Test-Ini $GOOD $GOOD_DIRS
Assert 'a valid registry reports no errors' ($clean.Errors.Count -eq 0) ($clean.Errors -join ' | ')
Assert 'it normalises Published= to the publish set' (($clean.Published -join ',') -eq '1,2') ($clean.Published -join ',')
Assert 'it resolves each published book to its source directory' `
    ($clean.Dirs.Count -eq 2 -and (Split-Path -Leaf $clean.Dirs[2]) -eq 'book2') ($clean.Dirs.Keys -join ',')
Assert 'it keeps the titles the picker shows' ($clean.Titles[1] -eq 'One' -and $clean.Titles[2] -eq 'Two') ($clean.Titles[1])

# Path= is honoured rather than assumed to be "book<N>", so a renamed folder is a one-line
# registry change and a Path= that points nowhere is an error (below) instead of a silent
# fall back to the conventional name.
$alt = Test-Ini @('Published=1', '1.Path=serpent-domain', '1.Title=One') @('serpent-domain')
Assert 'Path= names the source folder, not a book<N> convention' `
    ($alt.Errors.Count -eq 0 -and (Split-Path -Leaf $alt.Dirs[1]) -eq 'serpent-domain') ($alt.Errors -join ' | ')

$order = Test-Ini @('Published= 2 , 1 ', '1.Path=book1', '1.Title=One', '2.Path=book2', '2.Title=Two') $GOOD_DIRS
Assert 'a padded, out-of-order Published= is accepted and sorted' `
    ($order.Errors.Count -eq 0 -and ($order.Published -join ',') -eq '1,2') ($order.Errors -join ' | ')

# books.ini stays ASCII (5.1 misreads a raw non-ASCII byte), so a curly apostrophe is written
# as a backslash-u escape and decoded here - char 16 of the decoded title must be U+2019
# itself. The escape is spelled in two pieces to keep THIS file ASCII-only too.
$escTitle = '1.Title=The Serpent-King' + '\' + 'u2019s Domain'
$esc = Test-Ini @('Published=1', '1.Path=book1', $escTitle) @('book1')
Assert 'a \uXXXX escape in a title is decoded to the character' `
    ($esc.Titles[1].Length -eq 25 -and [int][char]$esc.Titles[1][16] -eq 0x2019) ("[$($esc.Titles[1])] len=$($esc.Titles[1].Length)")

# Each case: a label, the registry lines, the directories present, and a fragment the error
# must mention. Every one of these used to be skipped, defaulted or cast-crashed.
$CASES = @(
    @{ label = 'no Published= line at all'
       lines = @('Books=1,2', '1.Path=book1', '1.Title=One'); dirs = $GOOD_DIRS
       want  = 'no Published= line' }

    @{ label = 'an empty Published= line'
       lines = @('Published=', '1.Path=book1', '1.Title=One'); dirs = $GOOD_DIRS
       want  = 'Published= is empty' }

    @{ label = 'a non-numeric Published= entry'
       lines = @('Published=1,two', '1.Path=book1', '1.Title=One'); dirs = $GOOD_DIRS
       want  = 'entry "two" is not a book number' }

    @{ label = 'a zero Published= entry'
       lines = @('Published=0', '1.Path=book1', '1.Title=One'); dirs = $GOOD_DIRS
       want  = 'entry "0" is not a book number' }

    @{ label = 'a duplicated Published= entry'
       lines = @('Published=1,2,1', '1.Path=book1', '1.Title=One', '2.Path=book2', '2.Title=Two'); dirs = $GOOD_DIRS
       want  = 'lists book 1 more than once' }

    @{ label = 'a published book with no title'
       lines = @('Published=1,2', '1.Path=book1', '1.Title=One', '2.Path=book2'); dirs = $GOOD_DIRS
       want  = 'published book 2 has no 2.Title=' }

    @{ label = 'a published book whose title is blank (it used to become "Book N")'
       lines = @('Published=1,2', '1.Path=book1', '1.Title=One', '2.Path=book2', '2.Title='); dirs = $GOOD_DIRS
       want  = 'published book 2 has no 2.Title=' }

    @{ label = 'a published book with no path'
       lines = @('Published=1,2', '1.Path=book1', '1.Title=One', '2.Title=Two'); dirs = $GOOD_DIRS
       want  = 'published book 2 has no 2.Path=' }

    @{ label = 'a published book whose source directory is missing'
       lines = @('Published=1,2', '1.Path=book1', '1.Title=One', '2.Path=book9', '2.Title=Two'); dirs = @('book1')
       want  = 'source directory books/book9 not found' }
)

foreach ($c in $CASES) {
    $res = Test-Ini $c.lines $c.dirs
    $hit = @($res.Errors | Where-Object { $_ -like "*$($c.want)*" })
    Assert "the registry gate catches $($c.label)" ($hit.Count -ge 1) ("errors: " + ($res.Errors -join ' | '))
}

# A rejected entry must not reach the publish set, or the build would carry on with it.
$bad = Test-Ini @('Published=1,two,1', '1.Path=book1', '1.Title=One') @('book1')
Assert 'a rejected entry is left out of the publish set' (($bad.Published -join ',') -eq '1') ($bad.Published -join ',')

# =========================================================================================
# 2. The service worker's generated offline inventory
# =========================================================================================
$SW_TEMPLATE = (@(
    "const VERSION = 'fl-fixture';",
    '// BEGIN GENERATED BOOK INVENTORY',
    '// END GENERATED BOOK INVENTORY',
    "const REQUIRED = ['./', './data/meta.json', ...BOOK_DATA];",
    'const OPTIONAL = [...BOOK_MAPS, ...BOOK_ILLUS];'
) -join "`n") + "`n"

# The book numbers the added-book coverage runs for: one inside the twelve-book series and
# one outside it. Every assertion below is written against $ADDED.
$ADDED = @(2, 99)
$addedData  = @($ADDED | ForEach-Object { "'./data/book$_.json'," })
$addedMaps  = @($ADDED | ForEach-Object { "'./assets/maps/book$_.jpg'," })
$addedArt   = @($ADDED | ForEach-Object { "Art $_.jpg" })
$addedUrls  = @($ADDED | ForEach-Object { "'./assets/illus/Art%20$_.jpg'," })

Reset-Tmp
$swPath = Join-Path $tmp 'sw.js'
Write-Text $swPath $SW_TEMPLATE
$changed = Set-BookInventory $swPath (@(1) + $ADDED) (@('Art 1.jpg') + $addedArt)
$sw = [System.IO.File]::ReadAllText($swPath)
Assert 'writing the inventory reports the file changed' ($changed -eq $true)
Assert 'the publish set becomes the REQUIRED book data' `
    ($sw -like "*'./data/book1.json',*" -and -not ($addedData | Where-Object { $sw -notlike "*$_*" })) $sw
Assert 'and the OPTIONAL regional maps' `
    ($sw -like "*'./assets/maps/book1.jpg',*" -and -not ($addedMaps | Where-Object { $sw -notlike "*$_*" })) $sw
Assert 'illustration URLs are encoded the way the runtime requests them' `
    (-not ($addedUrls | Where-Object { $sw -notlike "*$_*" })) $sw
Assert 'the code around the generated region is untouched' `
    ($sw.StartsWith("const VERSION = 'fl-fixture';") -and $sw -like '*const OPTIONAL = `[...BOOK_MAPS, ...BOOK_ILLUS`];*') $sw

Assert 'rewriting the same inventory is a no-op (a rebuild must leave the tree clean)' `
    ((Set-BookInventory $swPath (@(1) + $ADDED) (@('Art 1.jpg') + $addedArt)) -eq $false)

# Withdrawing books must restore exactly the smaller inventory, not leave their entries behind.
[void](Set-BookInventory $swPath @(1) @('Art 1.jpg'))
$sw1 = [System.IO.File]::ReadAllText($swPath)
Assert 'withdrawing a book drops all three of its inventory entries' `
    (-not ($addedData + $addedMaps + $addedUrls | Where-Object { $sw1 -like "*$_*" }) `
     -and $sw1 -like "*'./data/book1.json',*") $sw1

# Losing the markers must fail loudly: silently shipping an inventory that no longer tracks
# the publish set is the failure this whole file exists to prevent.
Write-Text $swPath "const VERSION = 'fl-fixture';`n"
$threw = $false
try { [void](Set-BookInventory $swPath @(1) @()) } catch { $threw = $true }
Assert 'a missing generated-inventory marker throws instead of passing silently' $threw

# =========================================================================================
# 3. A real build: both directions of an added-book transition
# =========================================================================================
# A miniature repo - a base book plus ONE added book (each with a regional map, one
# illustration and a book.ini), the rules, and just enough of web/ for the stamp step.
# build-data.ps1 runs against it with -Root, so this exercises the actual validation,
# bundling, copy, reconcile and inventory steps rather than a re-implementation of them. The
# tree is regenerated, and the whole transition run, once per number in $ADDED.
#
# Each book needs its book.ini for the same reason a real one does: the codeword gate reads
# Codewords= as a UNION over the published books, so a book that declares none is an error
# that disarms the value check for every book (task 325). A fixture without it fails the
# build before any assertion below can run - which is what it did until task 333.
function New-E2EFixture([int]$n) {
    Reset-Tmp
    $files = @{
        'books/book1/1.xml'           = '<section name="1"><p>Base one. <goto section="2"/></p></section>'
        'books/book1/2.xml'           = '<section name="2"><p>Second.</p><return/></section>'
        'books/book1/Adventurers.xml' = '<adventurers><starting><adventurer name="Ona Fixture" profession="warrior" gender="f">A fixture warrior.</adventurer></starting></adventurers>'
        'books/book1/Region-Map.jpg'  = 'MAP1'
        'books/book1/Art 1.jpg'       = 'ART1'
        'books/book1/book.ini'        = 'Codewords=Basefix'
        "books/book$n/1.xml"           = '<section name="1"><p>Added book.</p><return/></section>'
        "books/book$n/Adventurers.xml" = '<adventurers><starting><adventurer name="Sev Fixture" profession="mage" gender="m">A fixture mage.</adventurer></starting></adventurers>'
        "books/book$n/Region-Map.jpg"  = "MAP$n"
        "books/book$n/Art $n.jpg"      = "ART$n"
        "books/book$n/book.ini"        = "Codewords=Addedfix$n"
        'rules/Rules.xml'             = '<section name="rules"><p>Roll two dice.</p></section>'
        'rules/QuickRules.xml'        = '<section name="quick"><p>Quick.</p></section>'
        'web/css/style.css'           = 'body{}'
        'web/js/app.js'               = 'export const app = 1;'
    }
    foreach ($rel in $files.Keys) { Write-Text (Join-Path $tmp $rel) $files[$rel] }
    Write-Text (Join-Path $tmp 'web/sw.js') $SW_TEMPLATE
}
function Set-Published([int]$n, [string]$published) {
    Write-Text (Join-Path $tmp 'books/books.ini') (@(
        "Books=1,$n", "Published=$published",
        '1.Path=book1', '1.Title=Base Book',
        "$n.Path=book$n", "$n.Title=Added Book"
    ) -join "`n")
}
function Invoke-FixtureBuild {
    # Stream 6 is captured, not discarded: the build's own progress lines would drown the
    # assertions, but that same stream carries both gates' DIAGNOSIS - a heading and one line
    # per offending file, written just before they throw. Under the old 6>$null those lines
    # vanished, so a failing run showed "fix the source XML above" above nothing at all, and
    # recovering the reason cost a hand-built reproduction of the fixture (task 334). A
    # passing run stays as quiet as before; a failing one prints what it captured before
    # re-throwing, so the log names the files that were wrong.
    $log = [System.Collections.Generic.List[string]]::new()
    try {
        & (Join-Path $PSScriptRoot 'build-data.ps1') -Root $tmp 6>&1 |
            ForEach-Object { $log.Add([string]$_) }
    } catch {
        # Replayed a line at a time, not folded into the thrown message: the error view
        # reflows a multi-line message onto continuation lines, which loses the indent that
        # separates the gate's heading from the files it lists.
        Write-Host 'The fixture build FAILED - its own output follows:'
        $log | ForEach-Object { Write-Host "  build> $_" }
        throw
    }
}

foreach ($n in $ADDED) {
    New-E2EFixture $n
    $data  = Join-Path $tmp "web/data/book$n.json"
    $map   = Join-Path $tmp "web/assets/maps/book$n.jpg"
    $art   = Join-Path $tmp "web/assets/illus/Art $n.jpg"

    # ---- forwards: publishing it -------------------------------------------------------
    Set-Published $n "1,$n"
    Invoke-FixtureBuild
    $meta = [System.IO.File]::ReadAllText((Join-Path $tmp 'web/data/meta.json'))
    $sw = [System.IO.File]::ReadAllText((Join-Path $tmp 'web/sw.js'))
    Assert "publishing book $n reaches meta.json with its title" `
        ($meta -like "*`"number`":$n,`"title`":`"Added Book`"*") $meta
    Assert "publishing book $n generates its bundled section data" (Test-Path $data)
    Assert "publishing book $n copies its regional map and illustration" `
        ((Test-Path $map) -and (Test-Path $art))
    Assert "publishing book $n puts its data in the REQUIRED offline inventory" `
        ($sw -like "*'./data/book$n.json',*") $sw
    Assert "publishing book $n puts its art in the OPTIONAL offline inventory" `
        ($sw -like "*'./assets/maps/book$n.jpg',*" -and $sw -like "*'./assets/illus/Art%20$n.jpg',*") $sw

    # ---- backwards: withdrawing it, with a manual drop-in present -----------------------
    # The README invites players to drop general per-section art (e.g. 142.jpg) into
    # web/assets/illus/. It matches no book folder's image, so the reconcile must not touch it.
    Write-Text (Join-Path $tmp 'web/assets/illus/142.jpg') 'DROPIN'
    Set-Published $n '1'
    Invoke-FixtureBuild
    $meta = [System.IO.File]::ReadAllText((Join-Path $tmp 'web/data/meta.json'))
    $sw = [System.IO.File]::ReadAllText((Join-Path $tmp 'web/sw.js'))
    Assert "withdrawing book $n removes its bundled section data" (-not (Test-Path $data))
    Assert "withdrawing book $n removes its copied regional map" (-not (Test-Path $map))
    Assert "withdrawing book $n removes its copied illustration" (-not (Test-Path $art))
    # meta.books is the publish set; meta.titles deliberately keeps ALL series titles, so a
    # choice leading into an unpublished book can still name it in the "not in this edition"
    # message. Only the books array may lose the withdrawn number.
    Assert "withdrawing book $n leaves meta.json books and the offline inventory" `
        ($meta -notlike "*`"number`":$n*" -and $meta -like "*`"$n`":`"Added Book`"*" `
         -and $sw -notlike "*book$n*" -and $sw -notlike "*Art%20$n*") "$meta`n$sw"
    Assert "withdrawing book $n keeps every one of the base book's outputs" `
        ((Test-Path (Join-Path $tmp 'web/data/book1.json')) -and (Test-Path (Join-Path $tmp 'web/assets/maps/book1.jpg')) `
         -and (Test-Path (Join-Path $tmp 'web/assets/illus/Art 1.jpg')) -and $sw -like "*'./data/book1.json',*")
    Assert "withdrawing book $n leaves a manual illustration drop-in alone (not build-owned)" `
        (Test-Path (Join-Path $tmp 'web/assets/illus/142.jpg'))
}

# ---- task 344: an output whose SOURCE went away must go with it ------------------------
# The withdrawal run above passes even with the pre-344 reconciler, because its fixture leaves
# the unpublished book's folder and image in place - which is exactly what let the old
# ownership heuristic recognise the output as its own. These four scenarios remove the source
# instead, which is the case the heuristic could not see: an illus/ file whose name no current
# book folder supplies looked like a manual drop-in and was preserved forever, so a clean
# rebuild left the orphan byte-for-byte unchanged and CI's rebuild-and-diff gate reported a
# match. Ownership now comes from the previous build's own inventory in sw.js.
New-E2EFixture 2
Set-Published 2 '1,2'
Invoke-FixtureBuild
$art1  = Join-Path $tmp 'web/assets/illus/Art 1.jpg'
$map1  = Join-Path $tmp 'web/assets/maps/book1.jpg'
$art2  = Join-Path $tmp 'web/assets/illus/Art 2.jpg'
$map2  = Join-Path $tmp 'web/assets/maps/book2.jpg'
$world = Join-Path $tmp 'web/assets/world-map.jpg'
Write-Text (Join-Path $tmp 'web/assets/illus/142.jpg') 'DROPIN'   # the (d) control
Write-Text (Join-Path $tmp 'images/world-map.jpg') 'WORLD'
Invoke-FixtureBuild
Assert 'task344: the fixture build owns both books'' art, and the world map' `
    ((Test-Path $art1) -and (Test-Path $map1) -and (Test-Path $art2) -and (Test-Path $map2) -and (Test-Path $world))

# (a) RENAME a published book's illustration. Both halves matter: the old output must go
# (its source no longer exists under that name) and the new one must arrive.
Remove-Item -LiteralPath (Join-Path $tmp 'books/book1/Art 1.jpg') -Force
Write-Text (Join-Path $tmp 'books/book1/Art One.jpg') 'ART1'
Invoke-FixtureBuild
$sw = [System.IO.File]::ReadAllText((Join-Path $tmp 'web/sw.js'))
Assert 'task344: renaming a published illustration removes the old copy and adds the new' `
    ((-not (Test-Path $art1)) -and (Test-Path (Join-Path $tmp 'web/assets/illus/Art One.jpg')) `
     -and $sw -notlike '*Art%201.jpg*' -and $sw -like '*Art%20One.jpg*') $sw

# ...and DELETING one outright, with nothing to replace it.
Remove-Item -LiteralPath (Join-Path $tmp 'books/book2/Art 2.jpg') -Force
Invoke-FixtureBuild
$sw = [System.IO.File]::ReadAllText((Join-Path $tmp 'web/sw.js'))
Assert 'task344: deleting a published illustration removes its generated copy' `
    ((-not (Test-Path $art2)) -and $sw -notlike '*Art%202.jpg*') $sw

# (b) DELETE a still-published book's regional map. The publish set alone cannot see this:
# book 2 is published, so the pre-344 rule kept book2.jpg forever.
Remove-Item -LiteralPath (Join-Path $tmp 'books/book2/Region-Map.jpg') -Force
Invoke-FixtureBuild
$sw = [System.IO.File]::ReadAllText((Join-Path $tmp 'web/sw.js'))
Assert 'task344: deleting a published book''s map source removes its copied map' `
    (-not (Test-Path $map2))
Assert 'task344: ...and drops it from the offline inventory, keeping book 1''s' `
    ($sw -notlike "*'./assets/maps/book2.jpg',*" -and $sw -like "*'./assets/maps/book1.jpg',*") $sw
Assert 'task344: the still-sourced map and data are untouched' `
    ((Test-Path $map1) -and (Test-Path (Join-Path $tmp 'web/data/book2.json')))

# The world map has no inventory entry and no per-book identity, so it needs its own rule.
Remove-Item -LiteralPath (Join-Path $tmp 'images/world-map.jpg') -Force
Invoke-FixtureBuild
Assert 'task344: removing images/world-map.jpg removes web/assets/world-map.jpg' `
    (-not (Test-Path $world))

# (c) WITHDRAW a book AND delete its folder - the shape the existing withdrawal run cannot
# reach, because with the folder gone there is no source left to identify the outputs.
Set-Published 2 '1'
Remove-Item -LiteralPath (Join-Path $tmp 'books/book2') -Recurse -Force
Write-Text (Join-Path $tmp 'books/books.ini') (@(
    'Books=1', 'Published=1', '1.Path=book1', '1.Title=Base Book') -join "`n")
Invoke-FixtureBuild
$sw = [System.IO.File]::ReadAllText((Join-Path $tmp 'web/sw.js'))
Assert 'task344: a withdrawn book whose FOLDER is gone still loses every generated output' `
    ((-not (Test-Path (Join-Path $tmp 'web/data/book2.json'))) -and (-not (Test-Path $map2)) `
     -and $sw -notlike '*book2*') $sw

# (d) the control, all the way through: a manual drop-in no inventory ever listed and no
# book folder supplies is never touched, however many reconciles run over it.
Assert 'task344: the manual illustration drop-in survived every one of these rebuilds' `
    (Test-Path (Join-Path $tmp 'web/assets/illus/142.jpg'))
Assert 'task344: and book 1''s own outputs are all still in place' `
    ((Test-Path (Join-Path $tmp 'web/data/book1.json')) -and (Test-Path $map1) `
     -and (Test-Path (Join-Path $tmp 'web/assets/illus/Art One.jpg')))

# A second build changes nothing: the reconciler is idempotent, which is what makes the
# rebuild-and-diff gate meaningful.
$before = @(Get-ChildItem -Path (Join-Path $tmp 'web') -Recurse -File | Sort-Object FullName |
    ForEach-Object { "$($_.FullName)|$($_.Length)" })
Invoke-FixtureBuild
$after = @(Get-ChildItem -Path (Join-Path $tmp 'web') -Recurse -File | Sort-Object FullName |
    ForEach-Object { "$($_.FullName)|$($_.Length)" })
Assert 'task344: a second build over the reconciled tree is a no-op' `
    (($before -join "`n") -eq ($after -join "`n")) (($before + @('---') + $after) -join "`n")

# ---- the failure path: a broken fixture must say WHICH file broke ----------------------
# A non-zero exit is not a diagnosis. Delete the book.ini task 333 added and the codeword
# gate fires exactly as it did on CI for four commits - so this checks the thing that was
# missing then: the failure carries the gate's own heading and the offending filename, and
# not just "fix the source XML above" over an empty log (task 334).
New-E2EFixture $ADDED[0]
Remove-Item (Join-Path $tmp 'books/book1/book.ini')
Set-Published $ADDED[0] "1,$($ADDED[0])"
# 6>&1 collects what the replay PRINTS, so the assertion reads the CI log rather than a
# value only this test can see; the build's own progress lines never reach it, having been
# captured inside the function.
$diag = ''
$threw = $false
try { Invoke-FixtureBuild 6>&1 | ForEach-Object { $diag += "$_`n" } } catch { $threw = $true }
Assert 'a failing fixture build replays the gate diagnosis, naming the offending file' `
    ($threw -and $diag -like '*XML validation FAILED*' -and $diag -like '*book1/book.ini*') $diag

if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }

Write-Host ''
Write-Host ("RESULT {0} pass={1} fail={2}" -f $(if ($fail) { 'FAILURES' } else { 'ALL PASS' }), $pass, $fail)
exit $(if ($fail) { 1 } else { 0 })
