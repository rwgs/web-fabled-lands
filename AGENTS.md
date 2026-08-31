# AGENTS.md

## Project Overview

A faithful, offline web port of the *Fabled Lands* gamebooks: it renders the
original section text and automates all the game rules (dice, ability checks,
combat, markets, ships, live adventure sheet). Plain HTML/CSS/ES modules —
**no npm, no build toolchain, no dependencies.** Windows + PowerShell environment.

## Repository map — what is source, what is generated
- **`books/book<N>/*.xml`** — section text + rules markup. **SOURCE OF TRUTH**
  (~4,400 sections). Edit these — but **only ever to ADD rules markup, never to reword the
  book.** The port re-creates the printed gamebook as-is, so the section text is the author's,
  not ours: a tag WRAPS the printed instruction (`<tick>place a tick in it now</tick>`,
  `<gain shards="20">gain 20 Shards</gain>`) and never replaces, rewrites, abridges or
  re-splits it. A bare self-closing tag where the book printed words makes the renderer
  substitute generic filler (a bare `<tick/>` prints "tick the box"), which silently loses the
  wording — so pass the words through. Watch the sentence boundary too: write `</if> <else>`,
  not `</if><else>`, or two printed sentences run together. **Check before committing** by
  stripping tags from the old and new file and diffing the remaining prose — it should be
  byte-identical apart from the markup you added. This holds for every book, including
  in-progress conversions.
  Superseded working copies live in
  **`books/book<N>/temp/`**, which nothing walks — keep them out of the book folder itself,
  where a file declaring a `<section name=>` that is not its own filename now fails the
  build gate, because such a file reads as a second copy of a live section to any by-hand
  census of the corpus (task 260).
  **"Nothing walks it" means the build and the gate, not your glob.** The shipped corpus is
  the **`^\d+[a-z]?$` basenames of the published books only** — 4,369 files today — because
  that is the filter `build-data.ps1` bundles and `validate-source.ps1` checks, and it is
  what `data.loadBook`/`availableBooks()` can see. A `books/**/*.xml` glob returns **4,437**:
  it adds the 20 superseded `temp/` copies *and* the 48 files that are not sections at all
  (`Adventurers.xml`, `New.xml` and the six pregen biographies, per book). Both inflate a
  census — task 269 was filed with 569 `<adjust>` nodes where the corpus holds 558, and the
  `force="f"` census reads 187 sections by that glob against the shipped 147, because every
  pregen biography ends in `<goto section="1" force="f"/>`. **A census that means "the
  shipped corpus" must exclude both**, and a filing that quotes a count must say which set it
  measured (task 270).
- **`books/books.ini`** — the edition registry. `Published=` is the **single source** of
  which books a build ships: it drives validation, the per-book JSON, the copied maps and
  art, `sw.js`'s offline inventory and the every-section scan. Publishing/withdrawing a
  book is a content change to this line, never a build-script edit (task 209).
- **`books/book<N>/book.ini`** — inherited from the reference `java-engine/` data format, and
  **two keys of it are live: `Codewords=` and `Map.Title=`.** `validate-source.ps1` parses the
  first (Java Properties — backslash line continuations and `\uXXXX` escapes, both of which
  the six books use) and checks every `codeword=` VALUE in the corpus against the union
  of the six lists, because a misspelled codeword is invisible to every other check: the engine
  cannot tell one the player never earned from one the port never awards, so the `<if>` it
  guards simply stays shut (task 325). Three things are legitimately absent from those lists
  and are exempted in the gate, not in the `.ini`: section-scoped bookkeeping flags
  (`2.567.1a`, `5/520` — matched by shape), the port's own named state flags
  (`StillInYellowport`, `HydraDamage` — an explicit list), and codewords printed in the
  unpublished books 7–12 (`Hill`, `Judas`). The reverse direction is reported as a **note**,
  never a failure, in two grades that must not be collapsed: a declared codeword **no section
  mentions at all** (usually nothing to fix — the printed books do list spare names), and one
  sections test or sweep but no `<gain>`/`<tick>`/`<set>`/`<outcome>` ever gives, which means a
  transcription dropped an award. Only those four tags mark a codeword awarded; `if`, `elseif`,
  `lose` and `adjust` mark it merely seen, and counting those as use is what hid book 2's
  `Beach` and `Bilge` until task 327. `Map.Title=` is the second, read
  by `Get-IniMapTitle` in `build-data.ps1` and passed through `meta.json` so the Maps modal can
  caption — and alt-text — each regional map with the map's own subject ("The Ports &
  Anchorages of the Violet Ocean") rather than the volume title ("Over the Blood-Dark Sea");
  a book without the key falls back to the book title, because a caption is decoration and must
  never fail a build (task 324). `Map`, `Death` and `Icon` reach neither the build nor the app.
  What is settled (task 322) is the one key that looks most like configuration: `Map=` is
  **not** the source of truth for that book's regional map. The build selects it by the
  **`-Map$` basename pattern**, and book 3 proves the key dead — `Map=Violet Ocean.JPG` names
  no file on disk, while `VioletOcean-Map.JPG` ships correctly as `book3.jpg`. That stays
  pattern-driven on purpose: a pattern is re-checked against the directory on every build and so
  cannot drift, where a declaration of the same fact can and did. Contrast `books.ini` above,
  which is read *because* `Published=` carries an editorial decision the filesystem cannot
  answer — **the test for a live `.ini` key here is whether it holds something you cannot
  derive.** That is the same test `Codewords=` and `Map.Title=` pass and `Map=` fails, which is
  why two are now read and the third is not. So **do not cite `Map=` as build configuration or as
  a precedent for one**, and do not rename a `.JPG` to satisfy it — but do read the file before
  assuming a fact about a book is unrecorded.
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
  reimplementation (licensing: see `NOTICE`). The intentional `README.txt` →
  `README.md` rename is the sole displayability exception; task 239 may update
  `Pack.java`'s matching filename literal so the reference packager stays coherent.
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
  Its Python discovery — which probes each candidate instead of trusting the first name that
  resolves, since a WindowsApps execution alias resolves like an interpreter and may not
  launch — is driven over shim fixtures by `run-tests-selftest.ps1`, which also drives the
  empty-dump diagnosis below over a pair of browser shims that exit 0 without writing a DOM
  (task 330). That one is Windows-only (Chrome under Program Files, `.cmd` shims), so **CI
  does not run it**; run it by hand after touching either probe (task 237).
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
- **An empty dump is never a page-load failure — but it has *two* environmental causes, and
  the fix for one cannot help the other.** Either the capture was lost or the browser did no
  work, so `run-tests.ps1` asks before it answers: its empty-dump branch re-launches the
  browser once with `--screenshot` over a `data:` URL — no server, no suite — and lets the
  result choose the message (`Test-BrowserWritesOutput`). (task 330)
  - **The capture was lost.** `chrome.exe` and `msedge.exe` are Windows GUI-subsystem
    binaries: launched directly from PowerShell they inherit no stdout handle, so
    `$dump = & chrome.exe … --dump-dom …` yields an empty string and any
    `Select-String 'RESULT'` over it finds nothing — while the suites run and pass perfectly
    well (the static server logs the full request set). Redirecting through `cmd` as in
    step 2 gives the process a real handle. This is **not** a browser difference: Chrome and
    Edge behave identically both ways — direct from PowerShell both print nothing, and
    through `cmd` both produce the same dump and the same verdict (task 208's run: a
    135,029-byte dump reading `RESULT ALL PASS pass=2100 fail=0`; both numbers move as suites
    grow, so treat them as that run's figures and not as today's expected output). (task 208)
  - **The browser did no work.** Task 324's machine carried only Edge 151.0.4129.107 with
    152.0.4191.53 staged for restart (`new_msedge.exe` beside `msedge.exe` in `Application/`)
    and a 3-day-old session holding 28 live processes. Every headless launch **exited 0**,
    created a complete `--user-data-dir` profile, and wrote nothing at all — no DOM, no
    `--version` text, no `--screenshot` file. Not the handle: the same nothing came back
    through `Start-Process -RedirectStandardOutput`, through `cmd >`, from `--headless=old`
    and from the version-directory binaries. No redirection fix reaches this; point
    `-Browser` at another Chromium. `Find-Browser` returns the first browser that *exists*
    (Chrome, then Edge) and does not probe it, so a working Chrome hides a wedged Edge while
    the reverse looks like a repo failure.
  - **`--version` printing nothing does not tell the two apart.** It is silent under both, so
    the one-second check this note used to offer as proof of a missing handle fires positive
    for the wedged browser as well, and sends the reader to the `cmd`/handle fix that cannot
    help. `--screenshot` is the discriminator because it is the one output that never travels
    over stdout: a screenshot written beside an empty dump is the capture failure above; no
    screenshot either means the browser did nothing.
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
  rather than left looking like a regression. (task 236) A cut-short run also now says **how far
  it got** — `_test.html` republishes `#results` as each suite starts, so the diagnosis carries
  `running: <suite in flight> | done: engine(213/213), …` where before every unfinished run left
  the same placeholder whether it died in the first suite or the last assertion. The stall behind
  such a run is still unexplained; that line is the evidence for the next one. (task 240)
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

**A shell-driven bulk edit can split a file's line endings, `git diff` will never
show it, and the commit is safe anyway — so know the shape, don't chase it.** On a
CRLF file `sed`, `awk` and `grep` strip the CR while `head`, `tail`, `cut`, `tr`
and `cat` keep it, so a pipeline mixing the two families writes LF-only lines into
a CRLF file. Task 318 moved a 2,814-line block with `sed -n` and the diff still
read a perfectly balanced `2814 insertions(+), 2814 deletions(-)` with no
line-ending noise at all, because `core.autocrlf=true` with no `.gitattributes`
normalises both sides to LF in the index; the only tells were git's own "LF will
be replaced by CRLF" warning and a byte count. **That same normalisation is why
this is cosmetic**: the committed bytes are LF whatever the working copy holds,
the build LF-normalises the bundled section text, `TASKS.md` is read by no script
— so **never "fix" a file's endings as a drive-by**, and don't read the git
warning as a defect. Shell assertions are not at risk either: `$(...)` drops a
trailing CR under this Cygwin bash, so a `sed`-based boundary check and a
`head`-based one both pass. The one habit worth keeping is **one tool family per
pipeline**, so a file you rewrite wholesale comes out uniform; verify with a
terminator count (how many CRLF against how many LF, over the whole file) rather
than with the diff, which cannot answer the question.

**"The committed bytes are LF either way" is true today only because task 321 made
it true, and autocrlf has two documented ways to keep CRLF that are worth knowing
before you trust it.** When 319 wrote that sentence it held for 4,649 of the
4,651 tracked **text** files (of 4,683 tracked in all) and failed on the two this
project edits most — `TASKS.md` (`i/crlf`) and `TASKS-archive.md` (`i/-text`) —
for two different reasons:
- **One lone CR** (a CR not followed by LF) anywhere in a file makes git classify
  the whole file binary, and a binary file is never converted in either direction.
  `TASKS-archive.md` had exactly one, inside a code span in 319's own note about
  CR handling, which is what made it `-text` for 14,521 CRLF lines.
- **Once a text file's index blob contains CRLF, git keeps CRLF** on every later
  staging instead of normalising. So a CRLF blob is self-perpetuating: it does not
  heal on the next commit, and `git status` stays clean because both sides match.

Both are fixed — every tracked blob is now `i/lf` (4,643 files; the 32 `i/-text`
are real images and the 8 `i/none` are single-line files) — so a tool writing
either ending now produces a scoped diff. **Two measurement traps survive the fix**,
and both report the reassuring answer: `git show` applies eol conversion, so it
tells you the opposite of what the blob holds — use **`git cat-file blob`**. And
`grep -c $'\r$'` returns **0 for a fully-CRLF file** under this bash, because grep
strips the CR before the pattern sees it; count bytes instead. The whole-file diff
this all caused, incidentally, was never git's staging path normalising — it was an
**editing tool writing LF into a CRLF worktree file**, after which git stored LF
against a CRLF parent and every line read as changed.

## Documentation — cite the function, not the line
**A code reference you write in a document names the function, selector, key or
attribute and links the file** — `showMaps` in `app.js`, the `.map-img` rule in
`style.css`, `<tick special="lock">` in `books/book1/91.xml` — with **no `file:line` or
`#L` anchor**. A line number is stale the moment anything above it is edited, and it rots
*invisibly*: nothing in the build or the suite re-checks a number in prose, so it keeps
reading as verified evidence long after it points at unrelated code. A symbol name costs
one search to resolve, survives every edit that does not rename it, and fails **loudly**
(no match) rather than quietly (a plausible wrong line).

This binds the **living** documents — `ROADMAP.md`, `PLAN.md`, `REVIEW.md`, `README.md`,
`SPEC.md`, `DECISIONS.md`, `docs/`, and an open task's steps in `TASKS.md`. It is **not**
retroactive over the dated records: `TASKS-archive.md` and the review logs hold hundreds
of line citations that were correct when written, and rewriting a record of what a pass
found is worse than leaving a number that is legibly historical. Nor does it forbid
quoting a *broken* citation as evidence — the passes below all do, and `ROADMAP.md`'s
copy of this rule does too. Cite live code by name; quote a rotted number only to show
that it rotted.

Three passes re-derived this rule before it was written down here, which is why it now
lives in `AGENTS.md` rather than inside one document: task 320 (`ROADMAP.md` — one
citation had drifted onto `showRules` and another onto an affliction's Stamina cap, both
offered as proof of that phase's central claim), task 322 (the same sweep problem across
`PLAN.md` and `docs/The-Books.md`) and task 323 (`REVIEW.md` — every one of its four code
line numbers had drifted; one resolved to `export function keepSheetFocus` and was
offered *twice* as evidence for a defect task 65 had already fixed, in a function that
had since moved from `app.js` to `ui.js`).

Two habits follow from it. **Fix the claim everywhere it appears, not only in the
document the task names** — each of the three passes above found a sibling document still
repeating a claim retired weeks earlier, and found it only because an unrelated `grep`
happened to run. And in a **dated record** such as `REVIEW.md`'s findings or `TASKS.md`'s
review log, note the later fix rather than deleting the finding: the honest form of a
review record is what was true then plus what happened since.

**The same test covers a derivable figure: don't restate a count another file owns.** A
line number rots invisibly; a dated status sentence rots *reassuringly*, because the date
reads as freshly verified and no `grep` for a symbol can ever catch it. `PLAN.md` said "the
backlog carries one open item (task 320)" on a day when 320 was closed and four were open,
and `docs/Contributing.md` said "**318** tasks are closed and none are open" with two open
(task 329). Point at the file that owns the fact — `TASKS.md`'s open `- [ ]` lines — or, if
the figure has to be stated, print the command that measures it, as `docs/Corpus-Census.md`
does.

## Task workflow
The backlog is `TASKS.md`. Open items are `- [ ]`, done items `- [x]`, and a filing
withdrawn as a misdiagnosis keeps its stable ID as `- [~]` (a summary checklist is at
the top of the file; the detail for each is in the sections below). **A census that
reconciles the checklist against the detail headings must match all three markers** —
matching only `- [x]` drops the withdrawn rows and reports them as missing, which is
how two separate passes (tasks 274 and 326) both mis-measured task 207.
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
