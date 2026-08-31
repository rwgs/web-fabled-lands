#Requires -Version 7.0
<#
  run-tests-selftest.ps1
  ----------------------
  Drives the environment probes in run-tests.ps1 over fixture shims, so each is tested instead
  of trusted: Python discovery (task 237), the empty-dump diagnosis (task 330) and the
  wall-clock bound on the browser (task 332).

  The failure the first exists to prevent is silent in the worst way: Get-Command resolves a zero-byte
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

  The second probe answers a question with two indistinguishable causes: an empty dump means
  either the stdout handle was lost (the browser ran the suite and the output went nowhere) or the
  browser launched and did no work at all. run-tests.ps1 tells them apart with --screenshot, and
  the direction that matters here is the one it used to get WRONG - a browser writing nothing
  anywhere, which the old message blamed on the handle and sent the reader to redirect stdout six
  ways. Both shims exit 0 and write no DOM, so only the screenshot separates them:

    3. A browser that writes nothing at all. The message must NOT say "no stdout handle".
    4. A browser that writes a screenshot but no DOM. The message must say the handle, because
       that is the real capture failure - and a probe that had quietly stopped finding the
       screenshot would otherwise report case 3's cause for every empty dump forever.

  The third is the one failure that reports nothing at all, because it never finishes: a browser
  that HANGS rather than exits used to sit in Start-Process -Wait forever. So the case has to be
  timed as well as asserted - a bound that silently stopped working would still "pass" every text
  assertion below, whenever the browser eventually gave up:

    5. A browser that never exits. The run must fail naming the hang and the wall clock, must
       not read as an empty dump, and must come back in seconds rather than in the shim's time.

  Windows-only, like run-tests.ps1 itself (Chrome under Program Files, .cmd shims); CI drives the
  browser suite directly instead, so this is not part of the CI matrix. Run it after touching
  discovery, the empty-dump branch or the browser's wall-clock bound:

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

# Two browsers, one per cause of an empty dump. Neither writes a DOM, so the runner reaches its
# empty-dump branch both times and only the screenshot can tell them apart. Passed with -Browser,
# so their names never matter to Find-Python above.
$muteBrowser = Join-Path $shimDir 'browser-mute.cmd'
$shotBrowser = Join-Path $shimDir 'browser-shot.cmd'
# The wedged browser: launches, exits 0, writes nothing anywhere.
[System.IO.File]::WriteAllText($muteBrowser, "@echo off`r`nexit /b 0`r`n")
# The lost handle: no DOM on stdout, but --screenshot lands. Args are walked with shift rather
# than matched out of %*, because cmd splits a batch argument on '=' as well as on space - so the
# runner's "--screenshot=<path>" arrives as the two tokens this loop pairs up.
[System.IO.File]::WriteAllText($shotBrowser, @(
    '@echo off'
    'setlocal'
    'set "shot="'
    ':loop'
    'if "%~1"=="" goto done'
    'if /i "%~1"=="--screenshot" set "shot=%~2"'
    'shift'
    'goto loop'
    ':done'
    'if defined shot echo x>"%shot%"'
    'exit /b 0'
) -join "`r`n")

# The hung browser: launches and never comes back. It spins in cmd itself rather than sleeping,
# because the batch sleep (`ping -n 60`) is a CHILD PROCESS and the runner kills only the browser
# it started. The orphan then outlives it holding an inherited copy of this script's capture pipe
# - so Invoke-Runner sat reading for the shim's full minute while the runner had returned in
# under four seconds, which reads exactly like the bound not working. Two seconds of one core is
# the cheaper answer, and it leaves nothing behind. (`timeout /t` is no help either: it refuses
# to run when stdin is not a console, which is how the runner launches it.)
$hangBrowser = Join-Path $shimDir 'browser-hang.cmd'
[System.IO.File]::WriteAllText($hangBrowser, "@echo off`r`n:loop`r`ngoto loop`r`n")

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

    # ---- 3. A browser that writes nothing at all ----------------------------------------
    $r = Invoke-Runner $realPath @('-Browser', $muteBrowser, '-Port', "$port")
    Assert 'a browser that writes nothing fails the run' ($r.Code -ne 0) "exit=$($r.Code)"
    Assert 'it is diagnosed as no output at all' `
        ($r.Text -match 'produced no output at all') $r.Text
    Assert 'it does NOT blame the stdout handle' `
        ($r.Text -notmatch 'no stdout handle') $r.Text
    Assert 'it says what to try instead' ($r.Text -match '-Browser <path to another Chromium>') $r.Text

    # ---- 4. A browser that writes a screenshot but no DOM -------------------------------
    $r = Invoke-Runner $realPath @('-Browser', $shotBrowser, '-Port', "$port")
    Assert 'a browser that writes only a screenshot fails the run' ($r.Code -ne 0) "exit=$($r.Code)"
    Assert 'it is diagnosed as a lost stdout handle' ($r.Text -match 'no stdout handle') $r.Text
    Assert 'it does NOT blame the browser' ($r.Text -notmatch 'produced no output at all') $r.Text

    # ---- 5. A browser that hangs instead of exiting -------------------------------------
    # -BrowserTimeoutSeconds is what makes this case fast: the shim never exits on its own, the
    # bound is two seconds, and the run has to come back inside them plus the server it starts.
    # Without the bound this assertion block is unreachable - the runner would still be in -Wait.
    $started = Get-Date
    $r = Invoke-Runner $realPath @('-Browser', $hangBrowser, '-Port', "$port", '-BrowserTimeoutSeconds', '2')
    $took = [int]((Get-Date) - $started).TotalSeconds
    Assert 'a browser that hangs fails the run' ($r.Code -ne 0) "exit=$($r.Code)"
    Assert 'the runner gives up rather than waiting the browser out' ($took -lt 30) "took ${took}s"
    Assert 'it is diagnosed as a hang, naming the wall clock' `
        ($r.Text -match 'still running 2 seconds after launch') $r.Text
    Assert 'it does NOT read as an empty dump' `
        ($r.Text -notmatch 'no stdout handle|produced no output at all') $r.Text
    Assert 'it says what to try instead of hanging again' `
        ($r.Text -match 'raise -BrowserTimeoutSeconds') $r.Text
}
finally {
    $env:PATH = $realPath
    Remove-Item $shimDir -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host ''
Write-Host ("RESULT {0} pass={1} fail={2}" -f $(if ($fail) { 'FAILURES' } else { 'ALL PASS' }), $pass, $fail)
exit $(if ($fail) { 1 } else { 0 })
