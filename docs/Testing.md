# Testing

[Home](Home.md) | Prev: [Build Pipeline](Build-Pipeline.md) | Next: [Contributing](Contributing.md)

There is one command, and it is the one to use:

```
pwsh -ExecutionPolicy Bypass -File build/run-tests.ps1
```

It serves the tree, drives Chrome headless, prints the verdict, cleans up, and **exits 0
only on `RESULT ALL PASS`** - so a caller can branch on the exit code instead of reading a
dump. On failure it prints the first 25 `FAIL`/`FATAL` lines and keeps the dump, naming its
path.

Current baseline: **`RESULT ALL PASS pass=3032 fail=0`**. Chrome's USB and GCM chatter on
stderr is unrelated noise.

---

## What the suite covers

`web/_test.html` is only the harness and reporter. The assertions live in focused ES-module
suites under `web/tests/`, each exporting one `async run(ctx)` and rebuilding its own
fixtures:

| Suite | Area |
|---|---|
| `suite-engine` | Conditions, effects, dice, ranges, value expressions. |
| `suite-render` | The section walk and the re-render model. |
| `suite-inventory` | Possessions, equipment, carry limit, tags. |
| `suite-combat` | Attack rounds, initiative, damage, flee, `<fightdamage>`. |
| `suite-economy` | Markets, cargo, ships, crew, caches, transfers. |
| `suite-actions` | Interactive behaviour - rolling, choosing, fighting. |
| `suite-corpus` | Renders **every section of every published book** to confirm none throw. |

Focus a subset with `-Suite` (comma list accepted):

```
pwsh -ExecutionPolicy Bypass -File build/run-tests.ps1 -Suite actions
```

Add assertions to the suite that owns the area.

---

## Fast feedback in Node

The DOM-free rule modules can be imported and checked directly in Node, with no browser.
That seam is itself tested:

```
node web/tests/node-import.mjs
```

No dependencies, exit 0 is a pass. It walks each rule module's import graph, fails on
anything reaching a browser-touching module, then really imports all seven and calls into
them. Run it after changing a rule module's imports. **CI runs it as its own job**, on
Node's stdlib only - a DOM shim here would hide exactly what is being checked.

---

## CI

[`.github/workflows/smoke.yml`](../.github/workflows/smoke.yml) runs on every push and pull
request, in three jobs:

| Job | Checks |
|---|---|
| `build-scripts` | Every `build/*.ps1` is ASCII-only and pins pwsh 7; then the source-XML gate self-test and the edition-manifest self-test, both over fixtures. |
| `rules-import` | The DOM-free seam, in plain Node. |
| `smoke` | Rebuilds the data, **fails on any generated diff**, then serves what the build just produced and renders every section headlessly. |

The rebuild-then-compare step in `smoke` closes two holes at once: the full XML validation
actually runs, and source/generated drift is caught. Before it existed, an XML edit
committed without a rebuild left a stale bundle that CI happily green-lit by testing the
*old* sections.

---

## Three failures that look like passes

Every trap below is now **closed mechanically by the runner**. They are documented because
they explain *why* the runner does what it does, and because a hand-run command still has
every one of them.

> **Prefer the runner. Reach for raw commands only to debug the runner itself.**

### 1. A warm browser profile serves a day-old bundle

The invisible one. `python -m http.server` sends `Last-Modified` but no `Cache-Control` and
no `ETag`, so Chrome applies **heuristic freshness** (roughly 10% of the file's age) and
serves the ES modules from disk cache **without revalidating**.

Point `--user-data-dir` at a profile from an earlier session and the run executes *that
session's* `web/tests/*.js`. Suites the tree no longer contains simply do not run, nothing
throws, and the reporter prints a well-formed `RESULT ALL PASS` - for a **smaller assertion
count than the tree deserves**. One real instance reported `pass=476 fail=0` for a suite of
545 assertions, because the profile predated the tasks that added the missing 69.

Neither guard catches it: the sticky-fatal reporter sees no throw, and the dump-size check
sees a full-size, well-formed dump. Only diffing the count against a known-good run reveals
it.

*Closed by:* `build/serve.py` sends `no-store`, and the runner mints a GUID-named profile
per run and deletes it afterwards. CI was never exposed - it mints its profile with
`mktemp -d`.

### 2. A mistyped suite name runs nothing

`main()` skips every suite not named in the query, so `?suite=action` (for `actions`)
matches none of the seven. With nothing to report, the reporter prints
`RESULT ALL PASS pass=0 fail=0` and sets `TESTS_OK`.

*Closed by:* the runner fails a `pass=0` run. Reading a verdict by hand, **check the count,
not just the words.**

### 3. A leftover server on port 8848 serves a stale tree

Python sets `allow_reuse_address`, so on Windows a *second* `python -m http.server 8848`
binds without complaint while the older process keeps answering. The suite then runs green
against whatever that process's working directory holds.

If a verdict looks unchanged after you edited a suite, check the owner with
`Get-NetTCPConnection -LocalPort 8848 -State Listen`, then look up that PID with
`Get-CimInstance Win32_Process`. A creation time older than your session is the tell.
Confirm what is really being served by fetching a file you just edited.

*Closed by:* `build/serve.py` turns `allow_reuse_address` **off**, so a second bind fails
loudly (exit 2) instead of shadowing.

---

## Two more, when running by hand

### An empty dump is a capture failure, not a page-load failure

`chrome.exe` and `msedge.exe` are Windows GUI-subsystem binaries. Launched directly from
PowerShell they inherit no stdout handle, so a direct `--dump-dom` invocation yields an
**empty string** while the suites run and pass perfectly well.

Running `chrome.exe --version` from the same prompt and getting nothing confirms the
missing handle in one second, and isolates it from the page, the server and the suite. This
is **not** a browser difference - Chrome and Edge behave identically both ways.

*Fix:* `Start-Process ... -RedirectStandardOutput`, which the runner uses. Either way,
**delete the target first and check its write time after** - a missing file is unambiguous
where a stale one is not.

A Git-Bash caller has it worse: MSYS argument conversion rewrites the `cmd` switch into a
path, so `cmd` opens interactively, **exits 0**, and writes no file - leaving whichever
dump the last run left at that path, with a plausible size and a plausible `RESULT ALL
PASS` for a *different* page. Run the raw commands from a **PowerShell** prompt.

### A virtual-time budget that runs out fails in the wrong suite's name

`--virtual-time-budget` is **not a wall-clock timeout**: virtual time leaps forward
whenever the page is idle, so the whole suite finishes in about 13 real seconds and unused
budget costs nothing. What spends it is the number of awaits, which grows with the suite.

When it expires, Chrome dumps the DOM and tears down at once, aborting the fetch in flight.
That arrives in the page as an ordinary suite error - a `TypeError: Failed to fetch`
attributed to whichever suite was loading - and reads as "the last change broke that
suite".

A fixed budget of 90000 set at about 1,700 assertions began cutting runs short at about
2,400, so the default is now **300000**, raisable with `-VirtualTimeBudget`.

Inside the page, an expiry and a real network failure are identical. The runner asks the
question the page cannot: a fetch failure against a server that is **still answering** is
reported as `CUT SHORT, not broken`. A cut-short run also reports how far it got, because
`_test.html` republishes its results element as each suite starts.

---

## Reading a failure

| Verdict | Means |
|---|---|
| `RESULT ALL PASS pass=N fail=0` | Healthy - **if `N` is not suspiciously low**. Page title becomes `TESTS_OK`. |
| `RESULT FAILURES` | Ordinary assertion failures. Other suites still ran. |
| `RESULT FATAL pass=0 fail=1` with a `SyntaxError` | A **parse error in one suite file**, most often a duplicate top-level `const`/`let`. `_test.html` statically imports all seven suites, so this stops the harness evaluating at all - and a focused suite selection does **not** exclude the broken file. Fix the named file, whichever suite you were running. |
| `FATAL [<name>] ...` with other suites still reporting | A **runtime** throw, isolated per suite by `main()`. |
| No `RESULT` line at all | Either the dump never reached you (a capture failure - check its size first, since that failure is silent) or the page never loaded (server down, or a 404 - serve the repo root and request `/web/_test.html`). It **never** means a suite failed quietly. |

The reporter is **sticky-fatal**: an uncaught async error or unhandled rejection captured
mid-run fails the aggregate and can never be overwritten by a later "ALL PASS".

Each suite is its own module scope, so the same identifier may be declared at top level in
two suites without colliding - but that is the **only** isolation it buys.

---

## Leftovers

Prefix any by-hand profile or dump `fl-` under the temp directory and the runner collects
it. On the way *in* it sweeps `fl-*` directories that are browser profiles (they carry a
`Default` child) and `fl-*.html` dumps older than 12 hours - matched by shape, so it keeps
up with whatever name you invent, and leaves an `fl-*` file that is neither. Sweeping on
entry means a run killed mid-flight is collected by the next one.

266 such leftovers had accumulated before this existed, and a 22-hour-old one is what
served the day-old bundle in trap 1.
