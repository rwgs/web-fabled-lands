#Requires -Version 7.0
<#
  release.ps1
  -----------
  The edition manifest: everything that decides WHICH books a build ships, and everything
  that keeps the generated files matching that decision. Dot-sourced by build-data.ps1
  (which owns the bundling) and by release-selftest.ps1 (which drives it over fixtures).

  books/books.ini's Published= line is meant to be the single source of that decision, so
  that publishing a book is a content change (drop in the folder, add the number) rather
  than a build-script edit. Three release consumers used to duplicate it and two failure
  modes fell out of that (task 209):

    * sw.js hand-listed six data files, six regional maps and three illustrations, so a
      newly published book could work online while being absent from a fresh offline
      install;
    * the build overwrote outputs for the listed books but never removed the JSON, map or
      copied art of a book taken OFF the line, so a withdrawal left a stale bundle that
      CI's rebuild-and-diff gate could not see;
    * a malformed, duplicated or dangling Published= entry was skipped or silently
      defaulted rather than reported, so a typo produced a partial edition.

  ASCII-only and OS-neutral (forward slashes) like the other build scripts: CI runs them on
  Linux and greps them for non-ASCII bytes, which break Windows PowerShell 5.1 parsing.
#>

# ---- The publish set -------------------------------------------------------------------
# Parse AND validate books.ini. Returns @{ Errors; Published; Titles; Dirs }:
#   Errors    - every problem found, as "books.ini : ..." strings
#   Published - the normalised publish set: unique, positive, ascending
#   Titles    - number -> title for every <N>.Title= line (meta.json ships all twelve; the
#               Books= line is the series registry, not the publish set, and is not read)
#   Dirs      - number -> source directory, for each published book that resolved
# Nothing is thrown and nothing is written: the caller decides what an error means (the
# build aborts before generating anything, the self-test asserts).
function Get-BookRegistry([string]$iniPath, [string]$booksDir) {
    $errors = [System.Collections.ArrayList]::new()
    $titles = @{}
    $paths  = @{}
    $dirs   = @{}
    $published = @()

    if (-not (Test-Path $iniPath)) {
        [void]$errors.Add("books.ini : not found at $iniPath")
        return @{ Errors = @($errors); Published = @(); Titles = $titles; Dirs = $dirs }
    }

    $publishedLine = $null
    foreach ($line in Get-Content -Encoding UTF8 $iniPath) {
        if ($line -match '^\s*(\d+)\.Title\s*=\s*(.*?)\s*$') {
            # books.ini stays ASCII and writes the odd apostrophe as a \uXXXX escape.
            $t = [regex]::Replace($Matches[2], '\\u([0-9A-Fa-f]{4})', { param($m) [char][int]('0x' + $m.Groups[1].Value) })
            if ($t) { $titles[[int]$Matches[1]] = $t }
        }
        elseif ($line -match '^\s*(\d+)\.Path\s*=\s*(.*?)\s*$') {
            if ($Matches[2]) { $paths[[int]$Matches[1]] = $Matches[2] }
        }
        elseif ($line -match '^\s*Published\s*=\s*(.*?)\s*$') {
            $publishedLine = $Matches[1]
        }
    }

    if ($null -eq $publishedLine) {
        [void]$errors.Add('books.ini : no Published= line - nothing to bundle')
        return @{ Errors = @($errors); Published = @(); Titles = $titles; Dirs = $dirs }
    }

    # Unique, positive, ascending. A four-digit cap keeps the [int] cast safe and is far
    # above any real book number; a bad token is reported rather than cast (the old parse
    # cast every token straight to [int], so a typo aborted with a raw cast exception).
    $seen = @{}
    foreach ($tok in @($publishedLine -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })) {
        if ($tok -notmatch '^\d{1,4}$' -or [int]$tok -lt 1) {
            [void]$errors.Add("books.ini : Published= entry `"$tok`" is not a book number (expected a positive integer)")
            continue
        }
        $n = [int]$tok
        if ($seen.ContainsKey($n)) {
            [void]$errors.Add("books.ini : Published= lists book $n more than once")
            continue
        }
        $seen[$n] = $true
        $published += $n
    }
    if ($published.Count -eq 0 -and $errors.Count -eq 0) {
        [void]$errors.Add('books.ini : Published= is empty - nothing to bundle')
    }
    $published = @($published | Sort-Object)

    # Every published book needs the title the picker shows, the Path= its source lives
    # under, and that directory actually present. All three used to fail quietly: a missing
    # title became "Book N", and a missing directory was `continue`d by validation and by
    # each of the three copy loops, producing a partial edition instead of a failure.
    foreach ($n in $published) {
        if (-not $titles.ContainsKey($n)) {
            [void]$errors.Add("books.ini : published book $n has no $n.Title= entry")
        }
        if (-not $paths.ContainsKey($n)) {
            [void]$errors.Add("books.ini : published book $n has no $n.Path= entry")
            continue
        }
        $dir = Join-Path $booksDir $paths[$n]
        if (-not (Test-Path -PathType Container $dir)) {
            [void]$errors.Add("books.ini : published book $n : source directory books/$($paths[$n]) not found")
            continue
        }
        $dirs[$n] = $dir
    }

    return @{ Errors = @($errors); Published = $published; Titles = $titles; Dirs = $dirs }
}

# ---- Build-owned art -------------------------------------------------------------------
# Every image in a book folder that the build copies to web/assets/illus/: an image that is
# neither the regional "<Region>-Map" nor a cover. ONE definition, shared by the copy loop
# and by the reconciler that decides which illus/ files are build-owned - if those two ever
# disagreed, a withdrawal would either orphan a file or delete a player's drop-in.
function Get-BookIllustrations([string]$dir) {
    if (-not (Test-Path $dir)) { return @() }
    return @(Get-ChildItem -Path $dir -File | Where-Object {
        $_.Extension -match '^\.(jpg|jpeg|png|gif)$' -and $_.BaseName -notmatch '-Map$' -and $_.BaseName -notmatch 'cover'
    })
}

# ---- The service worker's offline inventory --------------------------------------------
$script:FL_SW_BEGIN = '// BEGIN GENERATED BOOK INVENTORY'
$script:FL_SW_END   = '// END GENERATED BOOK INVENTORY'

# encodeURIComponent's escaping. render.js and app.js request an illustration as
# 'assets/illus/' + encodeURIComponent(name), and a precache URL IS the cache key, so a
# differently-escaped URL here would precache a file the runtime never asks for.
# EscapeDataString follows RFC 3986 and also escapes !'()*, which encodeURIComponent leaves
# alone, so those five are put back.
function ConvertTo-UriComponent([string]$text) {
    $e = [System.Uri]::EscapeDataString($text)
    foreach ($pair in @(@('%21', '!'), @('%27', "'"), @('%28', '('), @('%29', ')'), @('%2A', '*'))) {
        $e = $e.Replace($pair[0], $pair[1])
    }
    return $e
}

# Read the generated inventory BACK: the names the PREVIOUS build owned, before this build
# rewrites the region. This is the durable record the reconciler needs and the reason it needs
# one at all (task 344). Ownership used to be inferred from sources that still exist - an
# illus/ file was build-owned only if some current book folder supplied that name - so the
# moment a source was deleted or renamed, its generated copy stopped looking like output and
# was preserved as though a player had dropped it in. A clean rebuild then left the orphan
# byte-for-byte unchanged and CI's rebuild-and-diff gate reported a match.
#
# Returns @{ Data; Maps; Illus } as plain output NAMES ('book3.json', 'book3.jpg',
# 'TheBlackDiptych.jpg'), with the illustration URLs unescaped back through the inverse of
# ConvertTo-UriComponent. A missing file, missing markers or an empty region all yield empty
# lists rather than throwing: nothing to reconcile against is the correct answer for a fresh
# tree, and it is also the rule that keeps a genuine manual drop-in - which no inventory ever
# listed - out of the reconciler's reach. The THROW on missing markers stays with the writer,
# where it protects the thing that matters.
function Get-BookInventory([string]$swPath) {
    $empty = @{ Data = @(); Maps = @(); Illus = @() }
    if (-not (Test-Path $swPath)) { return $empty }
    $sw = [System.IO.File]::ReadAllText($swPath).Replace("`r`n", "`n")
    $i = $sw.IndexOf($script:FL_SW_BEGIN)
    $j = $sw.IndexOf($script:FL_SW_END)
    if ($i -lt 0 -or $j -lt $i) { return $empty }
    $region = $sw.Substring($i, $j - $i)
    $pick = {
        param([string]$prefix)
        $names = @()
        foreach ($m in [regex]::Matches($region, "'\./" + [regex]::Escape($prefix) + "([^']+)'")) {
            $names += [System.Uri]::UnescapeDataString($m.Groups[1].Value)
        }
        return @($names)
    }
    return @{
        Data  = & $pick 'data/'
        Maps  = & $pick 'assets/maps/'
        Illus = & $pick 'assets/illus/'
    }
}

# Rewrite the generated inventory region of sw.js from the publish set: each published
# book's bundled data (REQUIRED there - offline play is impossible without it) plus its
# regional map and illustrations (OPTIONAL - large, and lazily fetchable). Returns $true if
# the file changed. Throws if the markers are gone, rather than silently shipping an
# inventory that no longer matches the edition.
#
# `mapBooks` is the books whose regional map the build really COPIED, which is not always the
# publish set: a published book whose `-Map` source was deleted has no map to precache, and
# listing one would have the service worker fetch a 404 on install. It defaults to `published`,
# the pre-344 behaviour, so a caller that has not been updated is unchanged. (task 344)
function Set-BookInventory([string]$swPath, [int[]]$published, [string[]]$illusNames, [int[]]$mapBooks = $null) {
    if ($null -eq $mapBooks) { $mapBooks = $published }
    if (-not (Test-Path $swPath)) { return $false }
    $sw = [System.IO.File]::ReadAllText($swPath).Replace("`r`n", "`n")
    $i = $sw.IndexOf($script:FL_SW_BEGIN)
    $j = $sw.IndexOf($script:FL_SW_END)
    if ($i -lt 0 -or $j -lt $i) {
        throw "sw.js : generated inventory markers missing - restore '$($script:FL_SW_BEGIN)' and '$($script:FL_SW_END)'."
    }

    $lines = @('const BOOK_DATA = [')
    foreach ($b in $published) { $lines += ("  './data/book{0}.json'," -f $b) }
    $lines += @('];', 'const BOOK_MAPS = [')
    foreach ($b in $mapBooks) { $lines += ("  './assets/maps/book{0}.jpg'," -f $b) }
    $lines += @('];', 'const BOOK_ILLUS = [')
    foreach ($n in $illusNames) { $lines += ("  './assets/illus/{0}'," -f (ConvertTo-UriComponent $n)) }
    $lines += '];'

    $new = $sw.Substring(0, $i + $script:FL_SW_BEGIN.Length) + "`n" + (($lines -join "`n") + "`n") + $sw.Substring($j)
    if ($new -eq $sw) { return $false }
    [System.IO.File]::WriteAllText($swPath, $new, (New-Object System.Text.UTF8Encoding($false)))
    return $true
}

# ---- Reconciling build-owned outputs ---------------------------------------------------
# Clear the generated files this build did NOT produce, so a withdrawal - or the deletion or
# rename of a still-published book's art - cannot leave a stale output behind. The copy loops
# overwrite what they produce; nothing used to clear what they no longer do, and CI's
# rebuild-and-diff gate cannot see a file a rebuild simply leaves in place.
#
# **A file is build-OWNED iff a build inventory listed it, or a book folder supplies its name.**
# That is the whole rule, and the first half of it is task 344's fix: ownership inferred only
# from sources that still exist means a deleted or renamed source's output stops looking like
# output, and the reconciler then preserves it as though a player had dropped it in. The
# previous build's inventory is read out of sw.js before Set-BookInventory rewrites it
# (Get-BookInventory), so what the last build owned is known even when its source is gone. The
# second half is kept as a widening union, not replaced: a name a book folder supplies is ours
# whatever the inventory says, which covers a tree whose sw.js region was reset by hand.
#
# The general per-section art the README invites players to drop into web/assets/illus/ (e.g.
# 142.jpg) is in neither set, so it survives - the property the union has to preserve.
#
# `owned*` are what THIS build produced: the published books, the book numbers whose regional
# map was actually copied (a published book whose `-Map` source vanished is NOT among them),
# and the illustration names copied. `prev` is Get-BookInventory's record. Returns what was
# removed, as repo-relative paths sorted ordinally so a log line is deterministic.
function Remove-StaleBookOutputs {
    param(
        [string]$root,
        [int[]]$published,
        [string[]]$keepIllus,
        [int[]]$mapBooks = $null,
        [hashtable]$prev = $null
    )
    # A build that does not say which maps it copied is taken at its word that every published
    # book has one - the pre-344 contract, so a caller that has not been updated is unchanged.
    if ($null -eq $mapBooks) { $mapBooks = $published }
    if ($null -eq $prev) { $prev = @{ Data = @(); Maps = @(); Illus = @() } }
    $removed = @()

    # web/data/book<N>.json is produced for every published book, so "not published" is the
    # whole test. web/assets/maps/book<N>.jpg needs the second clause as well: the book may be
    # published while its `-Map` source has been deleted or renamed, which is the case the
    # publish set alone cannot see.
    foreach ($spec in @(@('web/data', 'book*.json', $published), @('web/assets/maps', 'book*.jpg', $mapBooks))) {
        $dir = Join-Path $root $spec[0]
        if (-not (Test-Path $dir)) { continue }
        foreach ($f in @(Get-ChildItem -Path $dir -Filter $spec[1] -File | Sort-Object Name)) {
            if ($f.BaseName -notmatch '^book(\d+)$') { continue }
            if ($spec[2] -contains [int]$Matches[1]) { continue }
            Remove-Item -LiteralPath $f.FullName -Force
            $removed += "$($spec[0])/$($f.Name)"
        }
    }

    $illusDir = Join-Path $root 'web/assets/illus'
    if (Test-Path $illusDir) {
        $owned = @{}
        foreach ($n in @($prev.Illus)) { $owned[$n] = $true }
        $booksDir = Join-Path $root 'books'
        if (Test-Path $booksDir) {
            foreach ($d in @(Get-ChildItem -Path $booksDir -Directory | Sort-Object Name)) {
                foreach ($img in (Get-BookIllustrations $d.FullName)) { $owned[$img.Name] = $true }
            }
        }
        foreach ($f in @(Get-ChildItem -Path $illusDir -File | Sort-Object Name)) {
            if (-not $owned.ContainsKey($f.Name)) { continue }
            if ($keepIllus -contains $f.Name) { continue }
            Remove-Item -LiteralPath $f.FullName -Force
            $removed += "web/assets/illus/$($f.Name)"
        }
    }

    return @($removed | Sort-Object -CaseSensitive)
}

# The world map is the one copied asset with no inventory entry and no per-book identity, so
# it needs its own line rather than a rule: its source path is fixed and singular, and the
# README documents web/assets/world-map.jpg as generated (drop-ins go in illus/), so an absent
# source means the output is an orphan. Returns what was removed. (task 344)
function Remove-StaleWorldMap([string]$root) {
    $src = Join-Path $root 'images/world-map.jpg'
    $out = Join-Path $root 'web/assets/world-map.jpg'
    if ((Test-Path $src) -or (-not (Test-Path $out))) { return @() }
    Remove-Item -LiteralPath $out -Force
    return @('web/assets/world-map.jpg')
}
