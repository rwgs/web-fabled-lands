#Requires -Version 7.0
<#
  run-tests-selftest.ps1
  ----------------------
  Drives run-tests.ps1's Python discovery over fixture shims, so the discovery is tested
  instead of trusted (task 237).

  The failure it exists to prevent is silent in the worst way: Get-Command resolves a zero-byte
  WindowsApps execution alias exactly like a real interpreter, so the runner used to hand
  Start-Process a file no process can launch and die before the server started - on a machine
  with a working Python further along PATH that it never looked at. Discovery now probes each
  candidate, and a probe that quietly stopped rejecting broken shims would look identical to a
  healthy machine, where the FIRST candidate is usually fine and nothing is ever rejected.

  So both directions are covered with shims this script creates, never with whatever aliases the
  machine happens to carry (on a machine whose aliases work, the interesting path never runs):

    1. Every candidate broken - one of each shape (unlaunchable, non-zero exit, answers but is
       not Python 3). The run must fail before the server starts, naming all three.
    2. A broken shim FIRST, the machine's real interpreter after it - the reviewed PATH shape.
       The runner must skip the shim, serve from the real one, pass a focused suite, and leave
       neither a profile nor a listening server behind.

  Windows-only, like run-tests.ps1 itself (Chrome under Program Files, .cmd shims); CI drives the
  browser suite directly instead, so this is not part of the CI matrix. Run it after touching
  discovery:

  Run: pwsh -ExecutionPolicy Bypass -File build/run-tests-selftest.ps1   (exit 0 = pass)

  Touches nothing under books/ or web/: the shims live in a temp directory and are removed
  afterwards. ASCII-only, like the other build scripts.
#>
$ErrorActionPreference = 'Stop'

$runner = Join-Path $PSScriptRoot 'run-tests.ps1'
$pwshExe = [Environment]::ProcessPath          # not "pwsh": case 1 empties PATH
$tmpRoot = [System.IO.Path]::GetTempPath()

$pass = 0
$fail = 0
function Assert([string]$label, [bool]$cond, [string]$detail) {
    if ($cond) { $script:pass++; Write-Host "PASS $label" }
    else { $script:fail++; Write-Host "FAIL $label$(if ($detail) { " - $detail" })" }
}

# ---- The fixture -----------------------------------------------------------------------
# Three shims, one per way a resolvable command fails to BE a usable Python. Get-Command finds
# all three (PATHEXT covers .cmd), so each must be rejected by launching it, not by its name.
$shimDir = Join-Path $tmpRoot ('fl-pyshims-' + [System.Guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force -Path $shimDir | Out-Null
# Zero bytes: what a WindowsApps execution alias looks like to Start-Process when it cannot be
# launched - the case that used to abort the run.
[System.IO.File]::WriteAllBytes((Join-Path $shimDir 'python.exe'), @())
# Launches, but refuses: the shape of the Store stub that offers to install Python instead.
[System.IO.File]::WriteAllText((Join-Path $shimDir 'python3.cmd'), "@echo off`r`nexit /b 9009`r`n")
# Launches and succeeds, but is not an interpreter this loop can serve from.
[System.IO.File]::WriteAllText((Join-Path $shimDir 'py.cmd'), "@echo off`r`necho Perl 5.38`r`nexit /b 0`r`n")
# Succeeds and says nothing at all, which is the emptiest way a shim can pass for working.
[System.IO.File]::WriteAllText((Join-Path $shimDir 'python.bat'), "@echo off`r`nexit /b 0`r`n")

$realPath = $env:PATH
function Invoke-Runner([string]$Path, [string[]]$RunnerArgs) {
    $env:PATH = $Path
    # A failing child is the POINT of case 1, and both a non-zero exit and a line on stderr are
    # terminating errors under the 'Stop' preference this script otherwise wants. Function scope,
    # so it is back to 'Stop' the moment the call returns.
    $ErrorActionPreference = 'Continue'
    try {
        $out = & $pwshExe -NoProfile -ExecutionPolicy Bypass -File $runner @RunnerArgs 2>&1
        return @{ Code = $LASTEXITCODE; Text = ($out | Out-String) }
    } finally { $env:PATH = $realPath }
}

try {
    # ---- 1. Every candidate broken ------------------------------------------------------
    $r = Invoke-Runner $shimDir @()
    Assert 'a tree of broken shims fails the run' ($r.Code -ne 0) "exit=$($r.Code)"
    Assert 'it fails before the server is started' ($r.Text -notmatch 'Serving ') $r.Text
    Assert 'the unlaunchable shim is named and diagnosed' `
        ($r.Text -match 'python\.exe - cannot launch') $r.Text
    Assert 'the shim that exits non-zero is named and diagnosed' `
        ($r.Text -match 'python3\.cmd - --version exited 9009') $r.Text
    Assert 'the shim that answers but is not Python 3 is named and diagnosed' `
        ($r.Text -match 'py\.cmd - --version reported .Perl 5\.38., not a Python 3 version') $r.Text
    Assert 'the shim that answers with nothing is named and diagnosed' `
        ($r.Text -match 'python\.bat - --version reported nothing') $r.Text
    Assert 'the message says what to do about it' ($r.Text -match 'Install Python 3') $r.Text

    # ---- 2. A broken shim first, the real interpreter after it --------------------------
    # The reviewed machine's shape. A focused suite on a spare port is enough to prove the
    # selected interpreter really served the tree.
    $port = 8849
    $before = @(Get-ChildItem $tmpRoot -Directory -Filter 'fl-test-*' -ErrorAction SilentlyContinue).Count
    $r = Invoke-Runner "$shimDir;$realPath" @('-Suite', 'engine', '-Port', "$port")
    Assert 'the run succeeds with a broken shim ahead of a working Python' ($r.Code -eq 0) $r.Text
    $chosen = if ($r.Text -match 'Using Python (.+)') { $Matches[1].Trim() } else { '' }
    Assert 'the chosen interpreter is reported' ($chosen -ne '') $r.Text
    Assert 'the broken shim was skipped, not selected' ($chosen -notlike "$shimDir*") "chose $chosen"
    $counted = if ($r.Text -match 'RESULT ALL PASS pass=(\d+) fail=0') { [int]$Matches[1] } else { 0 }
    Assert 'the focused suite really ran and passed' ($counted -gt 0) $r.Text

    # Cleanup is part of the contract: a profile left warm is what task 235's stale bundle came
    # from, and a server left listening blocks the next run.
    $after = @(Get-ChildItem $tmpRoot -Directory -Filter 'fl-test-*' -ErrorAction SilentlyContinue).Count
    Assert 'the run left no browser profile behind' ($after -le $before) "profiles before=$before after=$after"
    $listening = $true
    try { Invoke-WebRequest -Uri "http://127.0.0.1:$port/" -UseBasicParsing -TimeoutSec 2 | Out-Null }
    catch { $listening = $false }
    Assert 'the run left no server listening' (-not $listening) "something still answers on $port"
}
finally {
    $env:PATH = $realPath
    Remove-Item $shimDir -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host ''
Write-Host ("RESULT {0} pass={1} fail={2}" -f $(if ($fail) { 'FAILURES' } else { 'ALL PASS' }), $pass, $fail)
exit $(if ($fail) { 1 } else { 0 })
