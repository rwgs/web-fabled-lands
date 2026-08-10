#Requires -Version 7.0
<#
.SYNOPSIS
  Runs the headless browser suite end to end: serve, drive Chrome, read the verdict, clean up.

.DESCRIPTION
  The test loop has three failure modes that all LOOK like a pass, and all three used to be
  operator rules in AGENTS.md rather than anything enforced. This script makes each of them
  impossible instead of memorable (task 235):

    * A warm browser profile. Chrome caches the ES modules heuristically (build/serve.py
      explains why), so a --user-data-dir left over from an earlier session can execute a
      day-old copy of web/tests/*.js and report ALL PASS for assertions the working tree no
      longer contains. This script mints a GUID-named profile per run and deletes it after,
      so there is never a warm one to reuse.
    * A forgotten server. build/serve.py refuses to share the port, so a stale tree cannot
      answer for the current one; this script also stops the server it started, on every exit
      path, including Ctrl-C and a browser that never returns.
    * An empty capture. chrome.exe is a GUI-subsystem binary with no stdout when launched
      from PowerShell, so `& chrome --dump-dom` yields nothing while the suite passes
      perfectly well. Start-Process -RedirectStandardOutput hands it a real handle, and the
      dump is deleted first and size-checked after, so a missing capture cannot be read as a
      missing failure.

  A fourth mode fails loudly but names the wrong culprit: a run cut short by the virtual-time
  budget reports as a suite failure, with nothing saying it was the clock. Get-CutShortDiagnosis
  below recognises both shapes it takes and says so. (task 236)

  The verdict is taken from the FIRST RESULT line in the dump. --dump-dom includes
  _test.html's inline script SOURCE, which carries the literal "RESULT FATAL pass=0 fail=1";
  the live verdict lives in <pre id="results"> at the top of <body> and is therefore always
  the first match. The source literal only wins when #results never populated, which means the
  page never finished - correctly a FATAL, but NOT the bootstrap abort that string otherwise
  denotes, which is the task 236 case. (task 142, mirrored from .github/workflows/smoke.yml)

  Exit code is 0 only on RESULT ALL PASS.

.PARAMETER Suite
  Optional comma list of focused suites (engine, render, inventory, combat, economy, actions,
  corpus) appended as ?suite=. Omit to run the whole harness.

.PARAMETER Port
  Port for the local server. Default 8848.

.PARAMETER Browser
  Full path to a Chromium-family browser. Auto-detected (Chrome, then Edge) when omitted.

.PARAMETER KeepDump
  Keep the dumped DOM after a passing run (it is always kept on failure).

.PARAMETER VirtualTimeBudget
  Chrome's --virtual-time-budget in virtual milliseconds. This is NOT a wall-clock timeout:
  virtual time leaps forward whenever the page is idle, so the whole suite finishes in ~13s of
  real time and the unused remainder costs nothing. What consumes it is the number of awaits
  the suite performs, which grows with the suite - a fixed 90000 was set at ~1,700 assertions
  and started cutting runs short at ~2,400. The default therefore carries deliberate headroom;
  raise it if a run is still cut short.

.EXAMPLE
  pwsh -ExecutionPolicy Bypass -File build/run-tests.ps1
.EXAMPLE
  pwsh -ExecutionPolicy Bypass -File build/run-tests.ps1 -Suite actions
#>
[CmdletBinding()]
param(
    [string]$Suite,
    [int]$Port = 8848,
    [string]$Browser,
    [switch]$KeepDump,
    [int]$VirtualTimeBudget = 300000
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $PSScriptRoot

function Find-Python {
    foreach ($n in @('python', 'python3', 'py')) {
        $c = Get-Command $n -ErrorAction SilentlyContinue
        if ($c) { return $c.Source }
    }
    throw 'No python on PATH - the test loop needs it to serve the tree.'
}

function Find-Browser {
    if ($Browser) {
        if (-not (Test-Path $Browser)) { throw "Browser not found: $Browser" }
        return $Browser
    }
    # Built from whichever roots this machine actually defines: ProgramFiles(x86) is absent on
    # some installs, and Join-Path would throw on the null rather than skip the candidate.
    $roots = @($env:ProgramFiles, ${env:ProgramFiles(x86)}, $env:LOCALAPPDATA) | Where-Object { $_ }
    $relatives = @('Google/Chrome/Application/chrome.exe', 'Microsoft/Edge/Application/msedge.exe')
    foreach ($rel in $relatives) {
        foreach ($root in $roots) {
            $p = Join-Path $root $rel
            if (Test-Path $p) { return $p }
        }
    }
    throw 'No Chrome or Edge found - pass -Browser <path to chrome.exe>.'
}

# A failing verdict says WHAT broke but not WHY, and both ways a run gets cut short read as
# something else entirely (task 236):
#
#   * The page never finished. Chrome dumps the DOM mid-run and #results still holds the
#     "running" placeholder, so the FIRST RESULT line in the dump is the one in _test.html's
#     inline SOURCE - "RESULT FATAL pass=0 fail=1" - which everywhere else means a bootstrap
#     abort (a duplicate top-level const in a suite). Entirely different fix. The tell is
#     exact: a real bootstrap abort has flFatal REPLACE that placeholder, so "running"
#     surviving in #results can only mean the page was still working when the dump was taken.
#   * The page finished, but a fetch died on the way down. Tear-down aborts whatever fetch is
#     in flight, which arrives as an ordinary suite error ("TypeError: Failed to fetch", in
#     whichever suite happened to be loading a section) and reads as a regression there. From
#     inside the page that is indistinguishable from a genuinely broken server. From out here
#     it is not, because this script owns the server, so ask it: still answering means the
#     network was fine and the page lost it while shutting down.
#
# Returns $null for an ordinary failure, so nothing is ever claimed about a real one.
function Get-CutShortDiagnosis([string]$DumpPath) {
    $rerun = "Rerun to confirm; if it repeats, raise it: -VirtualTimeBudget $($VirtualTimeBudget * 2)."
    # Matched on '<pre id="results">running' alone: the placeholder ends in a non-ASCII
    # ellipsis and build/*.ps1 must stay ASCII-only (CI enforces it, for 5.1's sake).
    if (Select-String -Path $DumpPath -Pattern '<pre id="results">running' -SimpleMatch -Quiet) {
        return @(
            'CUT SHORT, not a bootstrap abort: #results never reported, so the page was still working',
            "when --virtual-time-budget=$VirtualTimeBudget expired and the DOM was dumped. The RESULT",
            "line above is the placeholder in _test.html's own source showing through, not a verdict.",
            'Either the budget is too small for the suite, or something in the page genuinely hangs.',
            $rerun
        ) -join [Environment]::NewLine
    }
    if (Select-String -Path $DumpPath -Pattern '^(FAIL|FATAL|ASYNC-FATAL) .*(Failed to fetch|NetworkError|net::ERR_)' -Quiet) {
        $alive = $false
        try { Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 5 | Out-Null; $alive = $true } catch { }
        if ($alive) {
            return @(
                'CUT SHORT, not broken: a fetch failed while the server was still answering, which is what',
                "--virtual-time-budget=$VirtualTimeBudget expiring mid-run looks like from inside the page.",
                $rerun
            ) -join [Environment]::NewLine
        }
        return @(
            'A fetch failed AND the server has stopped answering, so the failures above are the server',
            'dying mid-run rather than the suite. Check what else is on the port, then rerun.'
        ) -join [Environment]::NewLine
    }
    return $null
}

# Collect what earlier runs left behind. This run cleans up after itself, but only the paths
# it controls: a hard-killed browser, a crashed shell, a hand-run chrome.exe from the raw
# commands in AGENTS.md, or a kept dump from a failing run all leave artifacts nothing owns.
# Left alone they accumulate silently - 117 profiles and 16 dumps (0.38 GB) had built up in
# %TEMP% by the time task 235 went looking, and one of them was old enough to serve a day-old
# test bundle and report a false pass. Sweeping on the way IN (not out) means a run that dies
# badly is still collected by the next one. Only this project's own names, only when stale,
# so a concurrent run is never touched. (task 235)
function Clear-StaleArtifacts([int]$OlderThanHours = 12) {
    $cutoff = (Get-Date).AddHours(-$OlderThanHours)
    $tmpDir = [System.IO.Path]::GetTempPath()
    # Matched by SHAPE, not by an enumerated list of names. Every session that ran the browser
    # by hand invented its own prefix - fl-udd*, fl-suite*, fl-163-*, fl-review*, fl-probe* -
    # so a name list would go stale the first time someone typed a new one. What they all have
    # in common is what they ARE: a Chromium user-data-dir always carries a Default\ child, and
    # a dumped DOM is always an .html. That pair is narrow enough that an unrelated fl-* temp
    # file (not a browser profile, not an .html) is never touched.
    $stale = @()
    $stale += Get-ChildItem $tmpDir -Directory -Filter 'fl-*' -ErrorAction SilentlyContinue |
        Where-Object { Test-Path (Join-Path $_.FullName 'Default') }
    $stale += Get-ChildItem $tmpDir -File -Filter 'fl-*.html' -ErrorAction SilentlyContinue
    $stale += Get-ChildItem $tmpDir -File -Filter 'fl-serve-*.log' -ErrorAction SilentlyContinue
    $stale = @($stale | Where-Object { $_.LastWriteTime -lt $cutoff })
    if (-not $stale.Count) { return }
    $stale | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "Swept $($stale.Count) stale test artifact(s) older than ${OlderThanHours}h from TEMP."
}

Clear-StaleArtifacts

$python  = Find-Python
$browser = Find-Browser

$tmp        = [System.IO.Path]::GetTempPath()
$profileDir = Join-Path $tmp ('fl-test-' + [guid]::NewGuid().ToString('N'))   # never reused
$dump       = Join-Path $tmp ('fl-dump-' + [guid]::NewGuid().ToString('N') + '.html')
$srvErr     = Join-Path $tmp ('fl-serve-' + [guid]::NewGuid().ToString('N') + '.log')

$url = "http://127.0.0.1:$Port/web/_test.html"
if ($Suite) { $url += "?suite=$Suite" }

$server = $null
try {
    Write-Host "Serving $repo on port $Port (no-store)..."
    $server = Start-Process -FilePath $python `
        -ArgumentList @((Join-Path $repo 'build/serve.py'), '--port', $Port, '--directory', $repo) `
        -WorkingDirectory $repo -PassThru -NoNewWindow -RedirectStandardError $srvErr

    # Wait for it to answer. A server that exits instead is almost always the port being held
    # by another process - surface its own message rather than a bare timeout.
    $ready = $false
    foreach ($i in 1..40) {
        if ($server.HasExited) {
            $why = if (Test-Path $srvErr) { (Get-Content $srvErr -Raw).Trim() } else { '' }
            throw "The server exited before it could answer.`n$why"
        }
        try {
            Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 2 | Out-Null
            $ready = $true
            break
        } catch { Start-Sleep -Milliseconds 250 }
    }
    if (-not $ready) { throw "The server never answered $url." }

    Write-Host "Running $(Split-Path -Leaf $browser) headless against $url"
    Start-Process -FilePath $browser -ArgumentList @(
        '--headless=new', '--disable-gpu', '--no-sandbox',
        '--no-first-run', '--no-default-browser-check',
        '--dump-dom', "--virtual-time-budget=$VirtualTimeBudget",
        "--user-data-dir=$profileDir", $url
    ) -RedirectStandardOutput $dump -NoNewWindow -Wait

    # An absent or empty dump is a CAPTURE failure, not a page failure - never a pass.
    if (-not (Test-Path $dump)) { throw "The browser wrote no dump to $dump." }
    $size = (Get-Item $dump).Length
    if ($size -eq 0) { throw "The browser wrote an EMPTY dump to $dump (no stdout handle?)." }

    $result = Select-String -Path $dump -Pattern 'RESULT (ALL PASS|FAILURES|FATAL) pass=\d+ fail=\d+' |
        Select-Object -First 1
    if (-not $result) {
        throw "No RESULT line in the ${size}-byte dump: $dump`nThe page never loaded (wrong path, or the harness threw before reporting)."
    }
    $verdict = $result.Matches[0].Value
    Write-Host ''
    Write-Host $verdict

    # A run that asserted NOTHING is not a pass. main() skips every suite whose name is not in
    # ?suite=, so one typo ("-Suite action") runs zero of them and the reporter - with nothing
    # to report - prints a well-formed `RESULT ALL PASS pass=0 fail=0`. Same family as the
    # stale-bundle failure this script exists to close: green, plausible, and vacuous. (task 235)
    $counted = if ($verdict -match 'pass=(\d+)') { [int]$Matches[1] } else { 0 }
    if ($verdict -match 'ALL PASS' -and $counted -eq 0) {
        Write-Host ''
        Write-Host 'No assertions ran. Check the -Suite name (engine, render, inventory, combat, economy, actions, corpus).'
        Write-Host "Full dump: $dump"
        exit 1
    }

    if ($verdict -notmatch 'ALL PASS') {
        Write-Host ''
        Select-String -Path $dump -Pattern '^(FAIL|FATAL) ' | Select-Object -First 25 |
            ForEach-Object { Write-Host $_.Line }
        $why = Get-CutShortDiagnosis $dump
        if ($why) { Write-Host ''; Write-Host $why }
        Write-Host ''
        Write-Host "Full dump: $dump"
        exit 1
    }

    if ($KeepDump) { Write-Host "Full dump: $dump" } else { Remove-Item $dump -ErrorAction SilentlyContinue }
    exit 0
}
finally {
    if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue }
    Remove-Item $profileDir -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item $srvErr -Force -ErrorAction SilentlyContinue
}
