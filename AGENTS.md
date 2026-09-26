# AGENTS.md

## Project Overview
A faithful, offline web port of the *Fabled Lands* gamebooks: it renders the
original section text and automates all the game rules (dice, ability checks,
combat, markets, ships, live adventure sheet). Plain HTML/CSS/ES modules —
**no npm, no build toolchain, no dependencies.** Windows + PowerShell environment.

This file holds the **rules**. The reasons behind them — and the incidents that taught
each one — live in `docs/`: [Build Pipeline](docs/Build-Pipeline.md),
[Testing](docs/Testing.md), [The Books](docs/The-Books.md),
[Corpus Census](docs/Corpus-Census.md) and [Contributing](docs/Contributing.md). Read the
relevant page before changing the area it covers.

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
- **`books/book<N>/temp/`** — superseded working copies, which neither the build nor the gate
  walks. Keep them out of the book folder itself: there a file declaring a `<section name=>`
  that is not its own filename fails the build gate (task 260).
- **The shipped corpus is the `^\d+[a-z]?$` basenames of the published books only** — the
  filter `build-data.ps1` bundles and `validate-source.ps1` checks. A `books/**/*.xml` glob
  over-counts: it adds the `temp/` copies and the non-section files (`Adventurers.xml`,
  `New.xml`, the pregen biographies). **A census that means "the shipped corpus" must exclude
  both, and a filing that quotes a count must say which set it measured** — see
  [Corpus Census](docs/Corpus-Census.md) for the filter and the commands (task 270).
- **`books/books.ini`** — the edition registry. `Published=` is the **single source** of
  which books a build ships (validation, per-book JSON, maps and art, `sw.js`'s offline
  inventory, the every-section scan). Publishing/withdrawing a book is a content change to
  this line, never a build-script edit (task 209).
- **`books/book<N>/book.ini`** — inherited from the reference `java-engine/` format. **Two keys
  are live: `Codewords=` and `Map.Title=`**; `Map`, `Death` and `Icon` reach neither the build
  nor the app. See [The Books](docs/The-Books.md) and
  [Build Pipeline](docs/Build-Pipeline.md#the-source-xml-gate).
  - `Codewords=` is the authority for every `codeword=` value in the corpus, matched on the
    **exact spelling, case included** (both rule engines are case-sensitive). Keep the gate's
    dictionaries **ordinal** — a plain PowerShell `@{}` folds case (task 338). The legitimate
    absences (section-scoped flags, the port's named state flags, codewords from the
    unpublished books 7–12) are exempted **in the gate, not in the `.ini`**. Only
    `<gain>`/`<tick>`/`<set>`/`<outcome>` mark a codeword awarded (task 327).
  - `Map=` is **not** the source of truth for a book's regional map — the build selects it by
    the `-Map$` basename pattern, and book 3's value names no file on disk. **Do not cite
    `Map=` as build configuration or as a precedent for one, and do not rename a `.JPG` to
    satisfy it** (task 322).
  - **The test for a live `.ini` key is whether it holds something you cannot derive** — the
    test `Codewords=` and `Map.Title=` pass and `Map=` fails. Read the file before assuming a
    fact about a book is unrecorded.
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
  reimplementation (licensing: see `NOTICE`). The sole exceptions are the intentional
  `README.txt` → `README.md` rename and `Pack.java`'s matching filename literal (task 239).
- **`build/*.ps1`** — data build + version stamp, the source-XML gate
  (`validate-source.ps1`, run before the build writes anything) and its fixture self-test
  (`validate-selftest.ps1`, run by CI). **Adding a new tag/attribute/value to `books/` means
  adding it to that allowlist in the same change** (task 199). The edition manifest lives in
  `release.ps1`, driven by `release-selftest.ps1` (also CI). Both self-tests touch nothing
  under `books/` or `web/`. The test loop is `run-tests.ps1` over `serve.py` (a no-cache
  static server, the one non-PowerShell script). `run-tests-selftest.ps1` drives the runner's
  environment probes over shims; it is Windows-only, so **CI does not run it — run it by hand
  after touching `run-tests.ps1`** (task 237). Per-script roles:
  [Build Pipeline](docs/Build-Pipeline.md#what-each-script-does).
- **`TASKS.md`** — the backlog (see workflow below); completed detail lives in
  `TASKS-archive.md`.

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
the Windows `powershell` (5.1), under which the outputs diverge silently. Keep every
`build/*.ps1` **ASCII-only and OS-neutral** (forward slashes in path literals): CI checks
both. The *web app itself* has no runtime dependencies. (tasks 121, 197)
1. If you changed `books/` or `rules/`, rebuild the bundled data (this also
   stamps `version.js`):
   `pwsh -ExecutionPolicy Bypass -File build/build-data.ps1`
   If you only touched `web/` (JS/CSS/HTML — no data rebuild needed), still
   refresh the build stamp so the in-game version and the service-worker cache
   key move (otherwise returning players keep the cached old build):
   `pwsh -ExecutionPolicy Bypass -File build/stamp-version.ps1`
   Never hand-edit `version.js`/`sw.js`'s `VERSION`. A rebuild with no source change is a
   byte-for-byte no-op. **CI rebuilds on Linux and fails on any generated diff**
   (`web/data`, `web/assets`, `version.js`, `sw.js`) — so if you touch `books/` or `rules/`,
   commit the rebuilt output. (tasks 196, 197)
2. Run the headless smoke test (serves `web/`, exercises the engine, and renders
   **every section of every published book** to confirm none throw):
   `pwsh -ExecutionPolicy Bypass -File build/run-tests.ps1`
   Add `-Suite actions` (comma list ok) for a focused subset. It **exits 0 only on
   `RESULT ALL PASS`**; on a failure it prints the first 25 `FAIL`/`FATAL` lines and keeps
   the dump, naming its path. Chrome's own USB/GCM chatter on stderr is unrelated noise.
3. Healthy when the runner prints **`RESULT ALL PASS`** and exits 0. **Check the count,
   not just the words** — a short count is the only tell of a stale bundle.

**Prefer the runner; reach for raw browser commands only to debug it.** It closes
mechanically several traps that make a hand-run command report a confident false pass — a
warm browser profile serving an old bundle, a mistyped `?suite=` running nothing, a leftover
server on :8848 answering from a stale tree — and it diagnoses an empty dump, a run cut
short by the virtual-time budget (`-VirtualTimeBudget`) and a hung browser
(`-BrowserTimeoutSeconds`). Each is written up in [Testing](docs/Testing.md). If you do run
by hand:
- use a **fresh `--user-data-dir`**, prefixed `fl-` under `%TEMP%` so the runner sweeps it;
- **stop any server you start**, and if a verdict looks unchanged after an edit, check who
  owns :8848 first;
- run from a **PowerShell** prompt, not Git Bash (which mangles `cmd /c` and exits 0 having
  written nothing), and **delete the dump first and check its `LastWriteTime` after** — a
  stale dump reads like a fresh pass;
- an empty dump is an environment failure, never a page-load failure; the runner's
  `--screenshot` probe says which, and a browser that did no work needs `-Browser` pointed at
  another Chromium (tasks 208, 330).

Notes:
- Pure-logic modules can be imported directly in Node. `node web/tests/node-import.mjs`
  (no dependencies, exit 0 = pass) walks each rule module's import graph and fails on
  anything reaching a browser-touching module — run it after changing a rule module's
  imports; CI runs it as its own job. A rule module needing the bundled-book list reads
  `edition.js`, **never `data.js`**, whose module top level constructs a `DOMParser`.
  (task 195)
- **Never edit `web/data/*.json` to make a test pass — fix the XML or the engine.**
- `web/_test.html` is only the harness + reporter; the assertions live in the seven ES-module
  suites under `web/tests/` (`suite-engine`, `suite-render`, `suite-inventory`,
  `suite-combat`, `suite-economy`, `suite-actions`, `suite-corpus`), each exporting one
  `async run(ctx)` and rebuilding its own fixtures. **Add new assertions to the suite that
  owns the area.** `_test.html` statically imports all seven, so a **parse error in any one**
  (most often a duplicate top-level `const`/`let`) aborts every suite with one global
  `RESULT FATAL pass=0 fail=1` naming the file — fix that file, whichever suite you were
  running; `?suite=` does not exclude it. A **runtime** throw is isolated per suite
  (`FATAL [<name>] …`). The reporter is sticky-fatal. What each verdict means:
  [Testing — Reading a failure](docs/Testing.md#reading-a-failure).

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

**Line endings are cosmetic here — don't chase them.** Every tracked text blob is LF
(task 321) and the build LF-normalises the section text, so a mixed-ending worktree file
commits safely. Use **one tool family per pipeline** (on a CRLF file `sed`/`awk`/`grep` strip
the CR, `head`/`tail`/`cut`/`tr`/`cat` keep it), **never "fix" a file's endings as a
drive-by**, and don't read git's "LF will be replaced by CRLF" warning as a defect. To measure,
use `git cat-file blob` or `git ls-files --eol` (not `git show`, which converts) and count
bytes (not `grep -c $'\r$'`, which reads 0 on a CRLF file). Why:
[Contributing — Line endings](docs/Contributing.md#line-endings).

## Documentation — cite the function, not the line
**A code reference you write in a document names the function, selector, key or
attribute and links the file** — `showMaps` in `app.js`, the `.map-img` rule in
`style.css`, `<tick special="lock">` in `books/book1/91.xml` — with **no `file:line` or
`#L` anchor**. A line number rots *invisibly*: nothing re-checks a number in prose, so it
keeps reading as verified evidence long after it points at unrelated code. A symbol name
survives every edit that does not rename it, and fails **loudly** (no match) when it does.
(Tasks 320, 322 and 323 each found citations that had drifted onto unrelated code.)

This binds the **living** documents — `ROADMAP.md`, `PLAN.md`, `REVIEW.md`, `README.md`,
`SPEC.md`, `DECISIONS.md`, `docs/`, and an open task's steps in `TASKS.md`. It is **not**
retroactive over the dated records (`TASKS-archive.md`, the review logs), and it does not
forbid quoting a *broken* citation to show that it rotted.

- **Fix the claim everywhere it appears, not only in the document the task names** — a
  sibling document still repeating a retired claim is the usual miss.
- In a **dated record** such as `REVIEW.md`'s findings or `TASKS.md`'s review log, note the
  later fix rather than deleting the finding.
- **Don't restate a count another file owns.** A dated status sentence rots *reassuringly*,
  because the date reads as freshly verified (task 329). Point at the file that owns the
  fact — `TASKS.md`'s open `- [ ]` lines — or, if the figure has to be stated, print the
  command that measures it, as `docs/Corpus-Census.md` does.

## Task workflow
The backlog is `TASKS.md`. Open items are `- [ ]`, done items `- [x]`, and a filing
withdrawn as a misdiagnosis keeps its stable ID as `- [~]` (a summary checklist is at
the top of the file; the detail for each is in the sections below). **A census that
reconciles the checklist against the detail headings must match all three markers** —
matching only `- [x]` drops the withdrawn rows and reports them as missing, which is
how two separate passes (tasks 274 and 326) both mis-measured task 207.
1. Take the **first open (`- [ ]`) task** in `TASKS.md` — search for `- [ ]` rather than
   reading the file whole; most of it is the Review log. **If none is open**, the next work is
   the first unfinished phase of `ROADMAP.md`, planned in `PLAN.md` where that file covers
   the phase — as `TASKS.md`'s own header says.
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

These bias toward caution over speed; for trivial tasks, use judgment.

- **Think before coding.** State your assumptions. If a request admits more than one
  reading, present them rather than picking silently; if something is unclear, stop, name
  it and ask. If a simpler approach exists, say so and push back.
- **Simplicity first.** No features, abstractions for a single use, configurability or error
  handling for impossible cases beyond what was asked. If it could be much shorter, rewrite
  it. Don't use multiple agents without asking first, and say why.
- **Surgical changes.** Every changed line traces to the request. Don't "improve" adjacent
  code, comments or formatting, or refactor what isn't broken; match the existing style.
  Remove what your change orphans; mention unrelated dead code rather than deleting it,
  unless asked.
- **Goal-driven execution.** Turn the task into a check that can fail: a test that
  reproduces the bug, one for the input that must be rejected, the same tests passing either
  side of a refactor. For multi-step work, state a brief plan with the check for each step,
  and loop until they pass.
