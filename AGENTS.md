# AGENTS.md

## Project Overview

A faithful, offline web port of the *Fabled Lands* gamebooks: it renders the
original section text and automates all the game rules (dice, ability checks,
combat, markets, ships, live adventure sheet). Plain HTML/CSS/ES modules —
**no npm, no build toolchain, no dependencies.** Windows + PowerShell environment.

## Repository map — what is source, what is generated
- **`books/book<N>/*.xml`** — section text + rules markup. **SOURCE OF TRUTH**
  (~4,400 sections). Edit these.
- **`books/books.ini`** — the edition registry. `Published=` is the **single source** of
  which books a build ships: it drives validation, the per-book JSON, the copied maps and
  art, `sw.js`'s offline inventory and the every-section scan. Publishing/withdrawing a
  book is a content change to this line, never a build-script edit (task 209).
- **`web/data/*.json` and `web/js/version.js`** — **GENERATED** from `books/` +
  `rules/` by the build. **Never hand-edit them;** change the XML and rebuild.
- **`web/sw.js`** — hand-written, *except* the `BOOK_DATA`/`BOOK_MAPS`/`BOOK_ILLUS` lists
  between its `BEGIN`/`END GENERATED BOOK INVENTORY` markers and the `VERSION` line, which
  the build owns. Don't hand-edit those or drop the markers (the build then fails loudly).
- **`web/js/*.js`** — the app (vanilla ES modules; see the module table in `README.md`).
- **`rules/`** — the original JaFL XML spec, for reference: `JaFL-XML-Tags.html`
  (full tag list), `JaFL-XML-Intro.html`, `Rules.xml`, `QuickRules.xml`. The two
  `.html` docs also have readable Markdown copies (`JaFL-XML-Tags.md`,
  `JaFL-XML-Intro.md`) — prefer those for reading.
- **`java-engine/`** — the original Java engine (JaFL). **Reference only — never
  edit it and never copy its code.** The JS rules are a clean-room
  reimplementation (licensing: see `NOTICE`).
- **`build/*.ps1`** — data build + version stamp, plus the source-XML gate
  (`validate-source.ps1`) the build runs before writing anything and its fixture
  self-test (`validate-selftest.ps1`, run by CI). Adding a new tag/attribute/value
  to `books/` means adding it to that allowlist in the same change (task 199).
  The edition manifest — `Published=`'s validation, the service-worker inventory and the
  reconciliation of a withdrawn book's outputs — lives in `release.ps1`, driven over
  fixtures (including a real build of a temp tree) by `release-selftest.ps1`, also run by
  CI. Both self-tests touch nothing under `books/` or `web/`.
  The test loop is `run-tests.ps1` (serve, drive Chrome, read the verdict, clean up) over
  `serve.py`, the one non-PowerShell script here — a no-cache static server, because the
  browser's own HTTP cache is what made a stale bundle report a false pass (task 235).
  **`TASKS.md`** — the backlog (see workflow below).

## Architecture invariant — keep the rules out of the view
Game logic lives in **DOM-free rule modules**: the core `engine.js`, `combat.js`,
`market.js`, `state.js`, plus the extracted rule planners `render-rules.js`,
`render-gates.js` and the per-visit `visit-state.js` (task 119). View construction
lives in the **`render*.js` view modules** (`render.js` — the `Story` facade +
core walk — and `render-rolls.js`/`render-rewards.js`/`render-choices.js`/
`render-combat.js`/`render-market.js`): they only build DOM and wire clicks,
delegating every rule to a DOM-free module. **Do not put game logic in a view
module,** and do not import a browser/DOM global into a rule module. This is what
keeps the rules testable headlessly in `web/_test.html`.

## Build + test loop — run after every change
The build scripts **require PowerShell 7 (`pwsh`)** — invoke them with `pwsh`, not
the Windows `powershell` (5.1). Under 5.1 the outputs diverge silently (`ConvertTo-Json`
escaping and the culture-aware `Sort-Object` reformat every book JSON and the stamp), so
both scripts carry `#Requires -Version 7.0` and 5.1 refuses to run them. The *web app
itself* still has no runtime dependencies; only the offline build step needs pwsh 7. (task 121)
1. If you changed `books/` or `rules/`, rebuild the bundled data (this also
   stamps `version.js`):
   `pwsh -ExecutionPolicy Bypass -File build/build-data.ps1`
   If you only touched `web/` (JS/CSS/HTML — no data rebuild needed), still
   refresh the build stamp so the in-game version and the service-worker cache
   key move (otherwise returning players keep the cached old build):
   `pwsh -ExecutionPolicy Bypass -File build/stamp-version.ps1`
   The stamp is a content hash of the app source (including `sw.js`), so it changes on any
   edit — and only on an edit: paths sort ordinally, text is LF-normalised, and the date is
   reused while the digest holds, so a rebuild with no source change is a byte-for-byte
   no-op and leaves the tree clean. Never hand-edit `version.js`/`sw.js`'s `VERSION`. (task 196)
   The bundled section text is **LF-normalised**, so the JSON depends on the source *content*
   and not on your checkout's line endings. **CI runs `build-data.ps1` on Linux and fails on
   any generated diff** (`web/data`, `web/assets`, `version.js`, `sw.js`) before it runs the
   browser suite — so if you touch `books/` or `rules/`, commit the rebuilt output or the
   build fails. Keep both `.ps1` scripts OS-neutral: forward slashes in path literals (a
   `'web\data'` literal becomes a *file* named `web\data` on Linux). (task 197)
2. Run the headless smoke test (serves `web/`, exercises the engine, and renders
   **every section of every published book** — six today — to confirm none throw):
   `pwsh -ExecutionPolicy Bypass -File build/run-tests.ps1`
   Add `-Suite actions` (comma list ok) for a focused subset. It serves the tree through
   `build/serve.py`, drives Chrome headless, prints the verdict, and **exits 0 only on
   `RESULT ALL PASS`** — so a caller can branch on the exit code instead of reading a dump.
   On a failure it prints the first 25 `FAIL`/`FATAL` lines and keeps the dump, naming its
   path. Chrome's own USB/GCM chatter on stderr is unrelated noise.
3. Healthy when the runner prints **`RESULT ALL PASS`** and exits 0 (the page title
   becomes `TESTS_OK`).

**Every trap in the notes below is one the runner now closes mechanically** (task 235): a
GUID-named profile per run deleted afterwards, `Cache-Control: no-store` on every response,
a server that refuses to share the port, `-RedirectStandardOutput` for a real stdout handle,
the dump deleted first and size-checked after, and a vacuous `pass=0` run treated as a
failure. They are kept because they say *why* — and because a hand-run command still has
every one of them. **Prefer the runner; reach for the raw commands only to debug it.**

Notes:
- **A warm browser profile serves a day-old bundle and reports a false `ALL PASS`.** This is
  the one that is invisible: `python -m http.server` sends `Last-Modified` but no
  `Cache-Control` and no `ETag`, so Chrome applies *heuristic* freshness (~10% of the file's
  age) and serves the ES modules from its disk cache **without revalidating**. Point a
  `--user-data-dir` at a profile from an earlier session and the run executes that session's
  `web/tests/*.js`: the suites it no longer contains simply do not run, nothing throws, and
  the reporter prints a well-formed `RESULT ALL PASS` — for a *smaller* assertion count than
  the tree deserves. Task 235's run: a suite of 545 assertions reported `pass=476 fail=0`
  because the profile predated tasks 226–231, and the missing 69 were invisible without
  diffing counts against a known-good run. The sticky-fatal reporter cannot catch it (a stale
  file throws nothing) and the dump-size check cannot either (the dump is full-size and
  well-formed). `build/serve.py` sends `no-store`, and the runner never reuses a profile.
  **CI was never exposed** — `.github/workflows/smoke.yml` mints its profile with `mktemp -d`.
- **A mistyped `?suite=` name runs nothing and still says `ALL PASS`.** `main()` skips every
  suite not named in the query, so `?suite=action` (for `actions`) matches none of the seven
  and the reporter, with nothing to report, prints `RESULT ALL PASS pass=0 fail=0` and sets
  `TESTS_OK`. The runner fails a `pass=0` run for this reason; reading a verdict by hand,
  **check the count, not just the words**. (task 235)
- Use a **fresh `--user-data-dir`** so neither a stale service-worker cache nor the HTTP
  cache above can serve an old bundle and report a false pass. **Prefix any by-hand profile or
  dump `fl-` under `%TEMP%`** and the runner collects it: on the way *in* it sweeps `fl-*`
  directories that are browser profiles (they carry a `Default\` child) and `fl-*.html` dumps
  older than 12h — matched by shape, so it keeps up with whatever name you invent, and leaves
  an `fl-*` file that is neither. Sweeping on entry means a run killed mid-flight is collected
  by the next one. 266 such leftovers had accumulated before this existed, and a 22-hour-old
  one is what served the day-old bundle. (task 235)
- **An empty dump is a capture failure, not a page-load failure.** `chrome.exe` and
  `msedge.exe` are Windows GUI-subsystem binaries: launched directly from PowerShell they
  inherit no stdout handle, so `$dump = & chrome.exe … --dump-dom …` yields an empty string
  and any `Select-String 'RESULT'` over it finds nothing — while the suites run and pass
  perfectly well (the static server logs the full request set). `chrome.exe --version`
  printing nothing from the same prompt confirms the missing handle in one second, and
  isolates it from the page, the server and the suite. Redirecting through `cmd` as in
  step 2 gives the process a real handle. This is **not** a browser difference: Chrome and
  Edge behave identically both ways — direct from PowerShell both print nothing, and
  through `cmd` both produce the same dump and the same verdict (task 208's run: a
  135,029-byte dump reading `RESULT ALL PASS pass=2100 fail=0`; both numbers move as suites
  grow, so treat them as that run's figures and not as today's expected output). (task 208)
- **Step 2's `cmd /c` line is written for a POSIX shell that does not mangle it — from an
  MSYS/Git-Bash prompt it silently runs nothing and leaves an OLD dump in place.** Two
  independent hazards, and the first is the dangerous one. (a) MSYS argument conversion
  rewrites the leading `/c` as a path, so `cmd` never sees a switch: it opens interactively,
  prints its banner and prompt, **exits 0**, and writes no file. (b) Even with the switch
  intact (`//c`, or `MSYS_NO_PATHCONV=1`), a `"%TEMP%\out.html"` redirect target fails with
  "The filename, directory name, or volume label syntax is incorrect"; a literal
  `C:\…\out.html` works. So a Bash-tool caller gets **exit 0 and no dump written** — and then
  reads whichever file the last run left at that path, which has a plausible size and a
  plausible `RESULT ALL PASS` for a *different* page. That defeats the "check the dump's size
  first" guard above, which only catches an empty capture, never a stale one. Two fixes, both
  verified: run step 2 from a **PowerShell** prompt as written, or skip `cmd` altogether with
  `Start-Process chrome.exe -ArgumentList … -RedirectStandardOutput "$env:TEMP\fl-dump.html"
  -NoNewWindow -Wait`, which hands the process a real handle directly. Either way **delete the
  target first and check its `LastWriteTime` after** — a missing file is unambiguous where a
  stale one is not.
- **A leftover `http.server` on :8848 serves a stale tree and reports a confident false
  pass.** Python sets `allow_reuse_address`, so on Windows a *second* `python -m http.server
  8848` binds without complaint while the older process keeps answering — the suite then runs
  green against whatever that process's working directory holds. It looks exactly like a
  normal pass, including a plausible `RESULT ALL PASS`, so always **stop the server when you
  are done**, and if a verdict looks unchanged after you edited a suite, check the owner
  first: `Get-NetTCPConnection -LocalPort 8848 -State Listen` then
  `Get-CimInstance Win32_Process -Filter "ProcessId=<pid>"` — a `CreationDate` older than
  your session is the tell. A one-line `curl` of a file you just edited
  (`curl -s http://localhost:8848/web/tests/suite-corpus.js`) confirms what is really being
  served. (task 209) `build/serve.py` turns `allow_reuse_address` **off**, so a second bind
  fails loudly (`exit 2`, "something is already listening there") instead of shadowing — but
  only for servers started through it. (task 235)
- **A virtual-time budget that runs out fails the run in the wrong suite's name.** When
  `--virtual-time-budget` expires Chrome dumps the DOM and tears down at once, aborting the
  `fetch` in flight — which arrives in the page as an ordinary suite error (`FATAL [economy]
  TypeError: Failed to fetch`, whichever suite happened to be loading a section) and reads as
  "the last change broke that suite". Nothing is unsound (the run fails, the runner exits 1),
  but the only other tell is a short assertion count, and that needs a known-good number to
  compare against. The budget is **not** a wall-clock timeout: virtual time leaps forward
  whenever the page is idle, so the whole suite finishes in ~13s real and unused budget costs
  nothing — what spends it is the number of awaits, which grows with the suite. A fixed 90000
  set at ~1,700 assertions began cutting runs short at ~2,400, so the default is now
  **300000**, with `-VirtualTimeBudget` to raise it. Inside the page an expiry and a real
  network failure are identical, so the runner asks the question the page cannot: a fetch
  failure against a server that is **still answering** is reported as `CUT SHORT, not broken`
  rather than left looking like a regression. (task 236)
- Pure-logic modules (`engine.js`, `combat.js`, `market.js`, `state.js`) can also
  be imported and unit-checked directly in Node for fast feedback. That seam is itself
  tested — `node web/tests/node-import.mjs` (no dependencies, exit 0 = pass) walks each
  rule module's import graph, fails on anything reaching a browser-touching module, then
  really imports all seven and calls into them. Run it after changing a rule module's
  imports; CI runs it as its own job. A rule module needing the bundled-book list reads
  `edition.js` — the DOM-free registry `data.js` publishes into — and **never `data.js`**,
  whose module top level constructs a `DOMParser`. (task 195)
- **Never edit `web/data/*.json` to make a test pass — fix the XML or the engine.**
- `web/_test.html` is only the harness + reporter; the assertions live in focused ES-module
  suites under `web/tests/` (`suite-engine`, `suite-render`, `suite-inventory`, `suite-combat`,
  `suite-economy`, `suite-actions`, `suite-corpus`), each exporting one `async run(ctx)` and
  rebuilding its own fixtures. Add new assertions to the suite that owns the area; append
  `?suite=<name>` (comma list ok) to run a focused subset. Each suite is its **own module
  scope**, so the same identifier can be declared at top level in two different suites without
  colliding — but that is the *only* isolation it buys. `_test.html` **statically imports all
  seven suites**, so a **parse error in any one of them** (most often a duplicate top-level
  `const`/`let` *within* one suite) stops the harness module from evaluating at all: nothing
  runs, and `?suite=` does **not** exclude the broken file. The classic bootstrap then reports
  one global **`RESULT FATAL pass=0 fail=1`** with `FATAL uncaught error: Uncaught SyntaxError:
  Identifier 'x' has already been declared (suite-<name>.js:<line>)` (title `TESTS_FAIL`)
  instead of hanging at `running…` — so fix the named file, whichever suite you were running.
  A **runtime** throw is isolated by contrast: `main()` catches it per suite, reporting
  `FATAL [<name>] …` while the other suites still run (aggregate `RESULT FAILURES`). A "no
  RESULT line" therefore means either the dump never reached you (the capture note above —
  check the dump's size first, since that failure is silent) or the page never loaded (server
  down, or a 404 from the wrong path — serve the repo root and request `/web/_test.html`);
  what it never means is that a suite failed quietly. The reporter is
  **sticky-fatal**: an uncaught async error or unhandled promise rejection captured mid-run
  fails the aggregate and can never be overwritten by a later "ALL PASS".

## Command execution (Bitdefender on Windows)
The build and tests **require PowerShell**; running the repo's own vetted scripts
(`build/*.ps1`) and the documented Python/Chrome commands above is expected and
safe. What to avoid is *suspicious* automation, which AV heuristics may block.

**NEVER use encoded or obfuscated commands — Bitdefender flags them every time.**
This is the single most common cause of blocked commands here, so treat it as a
hard rule:
- **Do not** use PowerShell `-EncodedCommand` / `-enc`, base64-encoded payloads,
  `[Convert]::FromBase64String`, compressed/gzipped script blobs, or any
  string-obfuscated command. Always pass plain, human-readable command text.
- **Do not** let any tool or wrapper base64-encode a command on your behalf. If
  an approach would require encoding to get through, choose a different approach
  (a direct file edit, a short readable command, or a small `.ps1` script) —
  never encode it to make it run.
- No long generated one-liners that rewrite files — **prefer direct file edits**
  (Edit/Write) over shell-based search/replace.
- Keep commands short, explicit, and readable; don't chain many together.
- Never touch the registry, startup items, scheduled tasks, or AV/security settings.
- If a command is blocked or likely to trip AV heuristics, stop and propose the
  smallest safe manual alternative.

## Task workflow
The backlog is `TASKS.md`. Open items are `- [ ]`, done items `- [x]` (a summary
checklist is at the top of the file; the detail for each is in the sections below).
1. Read `TASKS.md` and take the **first open (`- [ ]`) task**.
2. Follow its steps exactly — each task is self-contained. Don't skip steps and
   don't combine tasks unless explicitly instructed.
3. Run the build + test loop and confirm `RESULT ALL PASS` **before** marking the
   task `- [x]`. Update `README.md` if the task instructs it.
4. If you identify a model error, missing assumption, or undocumented
   simplification, add it as a new `- [ ]` task at the bottom of `TASKS.md` before
   continuing. Do not leave findings only in conversation.
5. Commit after every completed task.

---

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if
  any.

## Behavioral Guidelines

**Tradeoff:** These guidelines bias toward caution over speed. For trivial
tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.
- Don't use multiple agents without asking first - explain why it's needed.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes,
simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it
work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer
rewrites due to overcomplication, and clarifying questions come before
implementation rather than after mistakes.