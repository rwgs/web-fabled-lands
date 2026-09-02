#Requires -Version 7.0
# The build requires PowerShell 7 (pwsh). Under Windows PowerShell 5.1 the outputs
# diverge silently: ConvertTo-Json escapes non-ASCII differently and the culture-aware
# Sort-Object reorders the stamp inputs, so 5.1 would rewrite every book JSON and the
# version stamp. The #Requires line makes 5.1 refuse to run (with a clear message)
# instead of producing a divergent build. Run: pwsh -File build/build-data.ps1 (task 121)
<#
  build-data.ps1
  ---------------
  Bundles the Fabled Lands source data (book section XML, per-book starting
  characters, and the rules) into the JSON files the web app loads at runtime,
  copies the world + regional maps, and refreshes the build stamp.

  Source of truth is left untouched:
    books/book<n>/<s>.xml         -> web/data/book<n>.json  ( { "<section>": "<xml>" } )
    books/book<n>/Adventurers.xml -> folded into web/data/meta.json
    books/book<n>/book.ini        -> Map.Title, the regional map's own caption, in meta.json
    rules/*.xml                   -> folded into web/data/meta.json
    books/books.ini               -> book titles in meta.json, and the Published= list
                                     of book numbers this build bundles (which also drives
                                     sw.js's generated offline inventory)
    images/world-map.jpg          -> web/assets/world-map.jpg
    books/book<n>/<Region>-Map.*  -> web/assets/maps/book<n>.jpg

  Run from the repository root (requires PowerShell 7 - see #Requires below):
      pwsh -ExecutionPolicy Bypass -File build/build-data.ps1

  CI runs this same script on Linux to check the committed output against a clean rebuild
  (task 197), so keep it OS-neutral: forward slashes in path literals (a 'web\data' literal
  becomes a file called "web\data" on Linux, not a directory) and no reliance on the checkout's
  line endings. It is deliberately dependency-free - stock pwsh 7, no modules.
#>


# -Root exists so release-selftest.ps1 can run a REAL build over a fixture tree and check
# both directions of a publish/withdraw transition. It defaults to this repo. (task 209)
param([string]$Root = (Split-Path -Parent $PSScriptRoot))

$ErrorActionPreference = 'Stop'
$root   = $Root                              # repo root (parent of build/ by default)
$books  = Join-Path $root 'books'
$rules  = Join-Path $root 'rules'
$images = Join-Path $root 'images'
$out    = Join-Path $root 'web/data'
$assets = Join-Path $root 'web/assets'

New-Item -ItemType Directory -Force -Path $out    | Out-Null
New-Item -ItemType Directory -Force -Path $assets | Out-Null

# Read-Xml (the LF-normalising reader both phases use) and the whole source-XML gate live in
# validate-source.ps1, so the self-test can drive the same validation over mutation fixtures
# instead of a real build. (tasks 13, 78, 197, 199)
. (Join-Path $PSScriptRoot 'validate-source.ps1')

# The edition manifest - the publish set, the service worker's offline inventory, and the
# reconciliation of build-owned outputs - lives in release.ps1 so release-selftest.ps1 can
# drive it over fixtures instead of trusting it. (task 209)
. (Join-Path $PSScriptRoot 'release.ps1')

# ---- Pregen starting characters --------------------------------------------
# Each book's Adventurers.xml <starting> block lists the six pre-made characters
# (name, profession, gender). Their bios live either inline in that element
# (book 5) or in a per-character file named after the character's first name
# (e.g. book1/Andriel.xml). We fold the first <p> of that prose into the bundled
# data so the create-character screen can offer each ready-made adventurer while
# still letting the player type a custom name.
function Get-Pregens([string]$dir, [string]$advXml) {
    $list = @()
    if (-not $advXml) { return $list }
    try {
        $doc = New-Object System.Xml.XmlDocument
        $doc.LoadXml($advXml)
    } catch { Write-Warning "  pregens: could not parse Adventurers.xml in $dir"; return $list }

    foreach ($a in $doc.SelectNodes('//starting/adventurer')) {
        $name = $a.GetAttribute('name')
        $prof = $a.GetAttribute('profession')
        $g    = $a.GetAttribute('gender')
        $gender = if ($g -and $g.Trim().ToLower().StartsWith('m')) { 'm' } else { 'f' }

        $bio = "$($a.InnerText)".Trim()   # inline prose (book 5)
        if (-not $bio) {
            $first = ($name -split '\s+')[0]
            $cf = Join-Path $dir ($first + '.xml')
            if (Test-Path $cf) {
                try {
                    $cdoc = New-Object System.Xml.XmlDocument
                    $cdoc.LoadXml((Read-Xml $cf))
                    $p = $cdoc.SelectSingleNode('//section/p[1]')
                    if ($p) { $bio = $p.InnerText }
                } catch { Write-Warning "  pregens: could not parse $cf" }
            }
        }
        $bio = ([regex]::Replace($bio, '\s+', ' ')).Trim()

        $list += [ordered]@{ name = $name; profession = $prof; gender = $gender; bio = $bio }
    }
    return $list
}

# ---- The regional map's own caption (book.ini Map.Title) --------------------
# Map.Title is a caption written for the MAP rather than for the volume - book 3's is
# "The Ports & Anchorages of the Violet Ocean" where its Title= is "Over the Blood-Dark Sea" -
# and the Maps modal uses it as both the caption and the image's alt text. It holds something
# no other file in the repo knows, which is the test AGENTS.md sets for reading a book.ini key
# at all; contrast Map=, left dead in task 322 because the filesystem already answers it.
# Deliberately a targeted match for this one key rather than a Properties parser: book.ini is
# Java Properties and Codewords= needs the continuation and \uXXXX handling that
# validate-source.ps1's Get-IniCodewords carries, but every Map.Title is one plain line.
# A missing key returns $null and the app falls back to the book title - a caption is
# decoration and must never fail a build. (task 324)
function Get-IniMapTitle([string]$dir) {
    $path = Join-Path $dir 'book.ini'
    if (-not (Test-Path $path)) { return $null }
    foreach ($line in [System.IO.File]::ReadAllLines($path)) {
        $t = $line.Trim()
        if ($t -eq '' -or $t.StartsWith('#') -or $t.StartsWith('!')) { continue }
        $eq = $t.IndexOf('=')
        if ($eq -lt 0 -or $t.Substring(0, $eq).Trim() -ne 'Map.Title') { continue }
        $value = $t.Substring($eq + 1).Trim()
        if ($value -ne '') { return $value }
    }
    return $null
}

# ---- The publish set (books.ini) --------------------------------------------
# Published= is the set of books this build bundles: source validation, all three copy loops
# below, the service worker's offline inventory and the reconciliation of withdrawn outputs
# all read this ONE set, so publishing a book is a content change (drop in the folder, add
# it to the line) rather than a build-script edit. It is deliberately an explicit list and
# not a books/book*/ glob: a half-transcribed book folder would otherwise be bundled the
# moment it appeared - reaching meta.json and the in-game book picker, and failing the
# closed-vocabulary gate. An explicit list keeps work-in-progress in-tree and inert.
# (Books= is the 12-title series registry, not the publish set; the build ignores it.)
#
# The line is validated BEFORE anything is written (task 209): a non-numeric or duplicated
# entry, or one whose title, Path= or source folder is missing, aborts here instead of
# quietly producing a partial edition.
Write-Host 'Validating books.ini...'
$reg = Get-BookRegistry (Join-Path $books 'books.ini') $books
if ($reg.Errors.Count -gt 0) {
    Write-Host ("books.ini validation FAILED - {0} problem(s):" -f $reg.Errors.Count)
    $reg.Errors | ForEach-Object { Write-Host "  $_" }
    throw "Build aborted: fix books/books.ini above and re-run."
}
$bundled = $reg.Published
$titles  = $reg.Titles
$bookDirs = $reg.Dirs
Write-Host ("books.ini OK: publishing book(s) {0}." -f ($bundled -join ', '))

# ---- Validate the source XML before bundling (tasks 13, 199) ----------------
# Every file the build is about to bundle is checked BEFORE anything is written: well-formed,
# rooted at the element its kind requires, a <section name> matching its filename, a known
# tag/attribute/value vocabulary, an explicit link that resolves inside its bundled book, and
# a readable biography for each pregen. A failure aborts here - naming the file - instead of
# shipping data that only misbehaves when the browser renders that section. The runtime
# DOMParser is more lenient, so this is a deliberately stricter gate; the corpus is clean, so
# it never fires spuriously.
Write-Host 'Validating source XML...'
$v = Test-SourceTree $rules $bookDirs
if ($v.Errors.Count -gt 0) {
    Write-Host ("XML validation FAILED - {0} problem(s) in {1} file(s) checked:" -f $v.Errors.Count, $v.Checked)
    $v.Errors | ForEach-Object { Write-Host "  $_" }
    throw "Build aborted: fix the source XML above and re-run."
}
Write-Host ("XML OK: {0} files validated." -f $v.Checked)
# Notes are the gate's information channel, not its verdict: today the only entries are the
# codewords a book.ini declares that no section awards or tests (task 325). That usually means
# a missed <gain>, but the printed books really do list a codeword they never use, so it is
# printed for a human to weigh rather than allowed to abort the build.
$v.Notes | ForEach-Object { Write-Host "  note: $_" }

# ---- Bundle each book -------------------------------------------------------
$bookMeta = @()
foreach ($b in $bundled) {
    $dir = $bookDirs[$b]

    # Numeric sections, plus lettered sub-sections like "448a"/"609a" that the
    # numbered sections link to (e.g. <success section="609a"/>). Sort by the
    # numeric prefix, then by name so "448" precedes "448a".
    $map = [ordered]@{}
    Get-ChildItem -Path $dir -Filter '*.xml' |
        Where-Object { $_.BaseName -match '^\d+[a-z]?$' } |
        Sort-Object @{ Expression = { [int]($_.BaseName -replace '[a-z]+$', '') } }, @{ Expression = { $_.BaseName } } |
        ForEach-Object { $map[$_.BaseName] = Read-Xml $_.FullName }

    $json = $map | ConvertTo-Json -Depth 4 -Compress
    $bookFile = Join-Path $out ("book{0}.json" -f $b)
    [System.IO.File]::WriteAllText($bookFile, $json, (New-Object System.Text.UTF8Encoding($false)))

    $advPath = Join-Path $dir 'Adventurers.xml'
    $advXml  = if (Test-Path $advPath) { Read-Xml $advPath } else { $null }
    $pregens = @(Get-Pregens $dir $advXml)

    $bookMeta += [ordered]@{
        number      = $b
        title       = $titles[$b]
        mapTitle    = Get-IniMapTitle $dir
        sections    = $map.Count
        adventurers = $advXml
        pregens     = $pregens
    }
    Write-Host ("book{0}: {1} sections, {2} pregens -> {3:N0} bytes" -f $b, $map.Count, $pregens.Count, $json.Length)
}

# ---- Rules -----------------------------------------------------------------
$rulesXml      = if (Test-Path (Join-Path $rules 'Rules.xml'))      { Read-Xml (Join-Path $rules 'Rules.xml') }      else { $null }
$quickRulesXml = if (Test-Path (Join-Path $rules 'QuickRules.xml')) { Read-Xml (Join-Path $rules 'QuickRules.xml') } else { $null }

# ---- All 12 canonical titles ------------------------------------------------
$allTitles = [ordered]@{}
foreach ($k in ($titles.Keys | Sort-Object)) { $allTitles["$k"] = $titles[$k] }

# ---- Meta -------------------------------------------------------------------
# No build date here: nothing in web/js reads it, and a per-run timestamp would
# make a no-op rebuild (unchanged books/rules) produce a different meta.json, a
# new version stamp, and a new service-worker cache key -- forcing every installed
# player to re-download a byte-identical app. meta.json is now purely content. (task 144)
# The printed codewords this edition declares: the union of every PUBLISHED book's book.ini
# Codewords= list, read through the same Get-IniCodewords the source gate uses (so the .ini
# stays the one authority and its continuations and \uXXXX escapes are decoded once). The
# Adventure Sheet needs it to tell a printed codeword from the port's own bookkeeping: the
# corpus reuses the codeword store as per-playthrough memory - section-scoped keys with a dot
# OR a slash ('2.567.1a', '5/520'), scoped keys continuing in words ('5.Aku.leaving'), and
# named engine flags ('StillInYellowport', 'HydraDamage') - and every one of those was being
# chipped under "Codewords" beside Anchor. Passed as data rather than reimplemented in ui.js,
# so the sheet cannot drift from the gate. Sorted ordinally, for a deterministic meta.json.
# (task 347)
$declaredCodewords = @{}
foreach ($b in $bundled) {
    $iniPath = Join-Path $bookDirs[$b] 'book.ini'
    if (-not (Test-Path $iniPath)) { continue }
    foreach ($c in (Get-IniCodewords $iniPath)) { if ($c) { $declaredCodewords[$c] = $true } }
}
$codewordList = @($declaredCodewords.Keys | Sort-Object -CaseSensitive)
Write-Host ("codewords: {0} declared across the published books" -f $codewordList.Count)

$meta = [ordered]@{
    books      = $bookMeta
    titles     = $allTitles
    codewords  = $codewordList
    rules      = $rulesXml
    quickRules = $quickRulesXml
}
$metaJson = $meta | ConvertTo-Json -Depth 6 -Compress
$metaFile = Join-Path $out 'meta.json'
[System.IO.File]::WriteAllText($metaFile, $metaJson, (New-Object System.Text.UTF8Encoding($false)))
Write-Host ("meta.json -> {0:N0} bytes" -f $metaJson.Length)

# ---- What the PREVIOUS build owned -------------------------------------------
# Read before any copy or rewrite: sw.js's generated inventory is the durable record of the
# last build's outputs, and the reconciler below needs it to recognise the generated copy of a
# source that has since been deleted or renamed. Inferring ownership from surviving sources
# alone left such a copy looking like a manual drop-in, so it shipped forever. (task 344)
$prevInventory = Get-BookInventory (Join-Path $root 'web/sw.js')

# ---- Copy the world map -----------------------------------------------------
$mapSrc = Join-Path $images 'world-map.jpg'
if (Test-Path $mapSrc) {
    Copy-Item $mapSrc (Join-Path $assets 'world-map.jpg') -Force
    Write-Host 'copied world-map.jpg'
}

# ---- Copy per-book regional maps --------------------------------------------
# Each book folder holds its regional map named "<Region>-Map.jpg". Copy it to
# web/assets/maps/book<N>.jpg for the in-game "Maps" viewer. Extra drop-ins in
# images/maps/ are copied too. (Section illustrations go in web/assets/illus/.)
$mapsOut = Join-Path $assets 'maps'
New-Item -ItemType Directory -Force -Path $mapsOut | Out-Null
# The book numbers whose map this build really copied - NOT simply the publish set. A
# published book whose `-Map` source has been deleted or renamed produces no map here, and the
# reconciler has to know that to clear the old one. (task 344)
$mapBooks = @()
foreach ($b in $bundled) {
    $rmap = Get-ChildItem -Path $bookDirs[$b] -File | Where-Object { $_.BaseName -match '-Map$' } | Select-Object -First 1
    if ($rmap) {
        Copy-Item $rmap.FullName (Join-Path $mapsOut ("book{0}.jpg" -f $b)) -Force
        $mapBooks += $b
        Write-Host ("book{0} map: {1}" -f $b, $rmap.Name)
    }
}
$mapsSrc = Join-Path $images 'maps'
if (Test-Path $mapsSrc) { Copy-Item (Join-Path $mapsSrc '*') $mapsOut -Force -ErrorAction SilentlyContinue }

# ---- Copy per-book section illustrations ------------------------------------
# A handful of sections show an in-text illustration via <image file="..."> (or a
# section image="..." attribute): the Forest of the Forsaken map, the map of
# Bazalek Isle, the Black Diptych. Each image file lives beside its book's XML.
# Copy every book-folder image that is NOT the "<Region>-Map" regional map into
# web/assets/illus/ under its own name, so render.js can resolve it there. (task 62)
# The copied names are remembered: they are this build's OWNED art, which the offline
# inventory precaches and the reconciler below uses to tell its own output apart from the
# per-section art a player may have dropped in. (task 209)
$illusOut = Join-Path $assets 'illus'
New-Item -ItemType Directory -Force -Path $illusOut | Out-Null
$illusNames = @()
foreach ($b in $bundled) {
    foreach ($img in (Get-BookIllustrations $bookDirs[$b])) {
        Copy-Item $img.FullName (Join-Path $illusOut $img.Name) -Force
        $illusNames += $img.Name
        Write-Host ("book{0} illustration: {1}" -f $b, $img.Name)
    }
}

# ---- Reconcile build-owned outputs with what this build produced -------------
# The loops above overwrite what they produce; this clears what they no longer do. Two ways
# an output goes stale: a book leaves Published= (task 209), or a still-published book's art
# is deleted or renamed (task 344) - the second needs $prevInventory, because the source that
# would have identified the output as ours is exactly the thing that is gone. Manual
# illustration drop-ins, which no inventory ever listed and no book folder supplies, are
# preserved.
$stale = @(Remove-StaleBookOutputs -root $root -published $bundled -keepIllus $illusNames `
    -mapBooks $mapBooks -prev $prevInventory)
$stale += @(Remove-StaleWorldMap $root)
foreach ($gone in $stale) { Write-Host "removed stale output: $gone" }

# ---- Regenerate the service worker's offline inventory ----------------------
# sw.js used to hand-list six data files, six maps and three illustrations, so a newly
# published book would have worked online and been missing from a fresh offline install.
# (task 209)
$swChanged = Set-BookInventory (Join-Path $root 'web/sw.js') $bundled $illusNames $mapBooks
Write-Host ($swChanged ? 'sw.js: offline book inventory updated' : 'sw.js: offline book inventory already current')

# ---- Refresh the build stamp shown in-game ----------------------------------
& (Join-Path $PSScriptRoot 'stamp-version.ps1') -Root $root

Write-Host 'Done.'
