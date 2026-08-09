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

  The verdict is taken from the FIRST RESULT line in the dump. --dump-dom includes
  _test.html's inline script SOURCE, which carries the literal "RESULT FATAL pass=0 fail=1";
  the live verdict lives in <pre id="results"> at the top of <body> and is therefore always
  the first match. The source literal only wins when #results never populated - a true hang,
  correctly a FATAL. (task 142, mirrored from .github/workflows/smoke.yml)

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
    [switch]$KeepDump
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
        '--dump-dom', '--virtual-time-budget=90000',
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
