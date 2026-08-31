# FAQ and Troubleshooting

[Home](Home.md) | Prev: [Corpus Census](Corpus-Census.md)

Organised by what you observed, not by what is wrong - because in this project the most
expensive failures are the ones that look like successes.

---

## Playing

**The page is blank, or the story never loads.**
The app loads its book data with `fetch`, so it must be served over HTTP. Opening
`index.html` from the filesystem will not work. See [Playing the Game](Playing-the-Game.md).

**A link says the book is not included in this edition.**
Working as intended. Books 7 to 12 were never digitised, and the corpus links into them
because the printed books do. See [The Books](The-Books.md).

**My saves vanished.**
Saves live in this browser's `localStorage` under `fl_save_<slot>`. They are per-browser
and per-device, and clearing site data deletes them. Export a save to JSON to back it up or
move it between devices.

**The game says it can no longer save.**
Storage is full, or private-browsing mode is blocking writes. The warning is deliberate -
the alternative is silently discarding progress. Export your save, then free storage.

**An option is greyed out but the text still describes it.**
Working as intended. A condition that is not met is **shown disabled rather than hidden**,
so the following "If not..." still reads correctly. It becomes live if a later state change
makes the condition hold. See [Game Rules](Game-Rules.md).

**A section says I pay something, but nothing was deducted.**
Also intended, where the section lets you decline. Such a payment becomes a click-to-pay
action rather than an automatic deduction, so turning back costs nothing.

**A section has no illustration.**
General per-section art is not part of this repository. Only three illustrations ship. Drop
the files into `web/assets/illus/` named as the XML references them and they appear with no
code change.

**I am still seeing an old version after an update.**
The service worker caches the whole game for offline play. A hard reload, or closing every
tab of the site and reopening, picks up the new build.

---

## Building

**`build-data.ps1` refuses to run.**
It requires PowerShell 7. Invoke it with `pwsh`, not the Windows `powershell` (5.1). The
`#Requires -Version 7.0` guard is deliberate: under 5.1 the outputs diverge *silently*.

**The build fails naming a section file.**
The source-XML gate rejected it before writing anything. The message names the file and the
problem - an unknown tag or attribute, an invalid enumerated value, a `<section name>` that
disagrees with the filename, a link to a section that does not exist, or a wrong root
element. See [XML Tag Reference](XML-Tag-Reference.md) for the allowlist.

**The build fails on a tag I just added.**
Correct behaviour. The vocabulary is a closed allowlist, and a new tag, attribute or value
must be added to `build/validate-source.ps1` **in the same change** that teaches the engine
to read it. That is what stops a typo shipping as a silent no-op.

**A file in a book folder fails the gate for declaring the wrong section name.**
Superseded working copies belong in `books/book<N>/temp/`, not in the book folder. In the
folder itself, such a file reads as a second copy of a live section.

**CI fails with "a clean rebuild changed generated files".**
You edited `books/` or `rules/` without committing the rebuilt output. Run
`build/build-data.ps1` and commit the result. Never hand-edit `web/data` or `version.js`.

**A path literal works on Windows and breaks in CI.**
Use forward slashes. A `'web\data'` literal becomes a *file* named `web\data` on Linux.

**CI fails saying a build script has non-ASCII bytes.**
Build scripts are ASCII-only. A non-ASCII byte is misread through PowerShell 5.1's legacy
code page and breaks parsing.

---

## Testing

**`RESULT ALL PASS` but the count looks low.**
Take this seriously. It is the signature of a **warm browser profile** serving a day-old
bundle: suites the tree no longer contains simply do not run, nothing throws, and the
verdict is well-formed. Use `build/run-tests.ps1`, which mints a fresh profile per run.
Full explanation in [Testing](Testing.md).

**`RESULT ALL PASS pass=0 fail=0`.**
Nothing ran. Almost always a mistyped focused-suite name - `action` for `actions` matches
none of the seven. The runner fails this case; reading a verdict by hand, check the count.

**`RESULT FATAL pass=0 fail=1` with `Identifier 'x' has already been declared`.**
A parse error in one suite file, usually a duplicate top-level `const`/`let`. `_test.html`
statically imports all seven suites, so this stops the harness evaluating entirely - and
selecting a different suite does **not** exclude the broken file. Fix the file named in the
error, whichever suite you were running.

**`FATAL [economy] TypeError: Failed to fetch` right after an unrelated change.**
Probably the virtual-time budget expiring mid-run, not a regression in that suite. When it
expires, Chrome tears down and aborts the fetch in flight, which reaches the page as an
ordinary suite error. The runner distinguishes the two by asking whether the server is
still answering, and says `CUT SHORT, not broken`. Raise `-VirtualTimeBudget` if it repeats.

**No `RESULT` line at all.**
Either the dump never reached you or the page never loaded. **Check the dump's size first** -
a capture failure is silent. An empty dump has two causes: launching Chrome directly from
PowerShell gives it no stdout handle, so the dump is empty while the suite passes fine - or
the browser launched and did no work at all, which writes the same empty file and no
redirection will fix. `--version` is silent under both; the runner probes with `--screenshot`
and names whichever it is. What an absent `RESULT` never means is that a suite failed quietly.

**The runner printed "Running chrome.exe headless against ..." and never came back.**
The browser hung rather than exited, which is the one shape `--virtual-time-budget` cannot
catch - it bounds what the page spends, and a browser stuck before the page never spends it.
The runner kills the browser after `-BrowserTimeoutSeconds` (default 300) and fails naming
the hang, so a wait longer than that is something else. Try `-Browser <path to another
Chromium>`; raise the bound only if the machine is genuinely that slow.

**The verdict has not changed since I edited a suite.**
Check who owns port 8848. Python's `allow_reuse_address` lets a second server bind while an
older process keeps answering from a different directory. `build/serve.py` turns that off,
so a second bind fails loudly - but only for servers started through it.

**An empty dump appeared and the command exited 0, from Git Bash.**
MSYS argument conversion mangles the `cmd` switch, so `cmd` opens interactively, exits 0
and writes no file - leaving whichever dump the last run left there, with a plausible size
and a plausible verdict for a *different* page. Run the raw commands from PowerShell, or
just use `build/run-tests.ps1`.

---

## Contributing

**Where does this change go - `TASKS.md` or `ROADMAP.md`?**
Defects go in `TASKS.md` under a priority bucket. Features go in `ROADMAP.md` as ordered
phases. A defect found *while working a roadmap phase* gets a task number.

**Can I reword an awkward sentence in a section?**
No. The section text is the author's, and the port reproduces the printed book as-is.
Markup **wraps** printed instructions and never replaces them. See
[Contributing](Contributing.md) for the check to run before committing.

**Can I copy a method from `java-engine/`?**
No. It is reference only. The JS rules are a clean-room reimplementation, and the licensing
in [`NOTICE`](../NOTICE) is why that matters.

**My census number disagrees with a documented one.**
Check your filter before filing. `books/**/*.xml` returns 4,437; the shipped corpus is
4,369. See [Corpus Census](Corpus-Census.md), which exists because two tasks were filed
with inflated counts.

**A command was blocked by antivirus.**
Never encode or obfuscate a command to get it through - that is what triggers the block.
Prefer a direct file edit or a short readable script. See [Contributing](Contributing.md).
