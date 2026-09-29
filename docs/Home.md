# Fabled Lands - Web Edition Wiki

A faithful, offline web port of the *Fabled Lands* gamebooks. It renders the original
section text and automates the game rules - dice, ability checks, combat, markets,
ships and a live Adventure Sheet - as plain HTML, CSS and ES modules with **no npm, no
build toolchain and no runtime dependencies**.

Play it at **[webfl.rwgs.net](https://webfl.rwgs.net/)**.

---

## Start here

**Playing**

- [Playing the Game](Playing-the-Game.md) - screens, saves, offline install, narration, deep links.
- [Game Rules](Game-Rules.md) - the rules exactly as this port implements them.
- [The Books](The-Books.md) - the six shipped books, their sizes, maps and what is missing.

**Contributing code**

- [Architecture](Architecture.md) - the module map and the DOM-free rules seam.
- [Build Pipeline](Build-Pipeline.md) - how `books/` becomes `web/data/`, and what is generated.
- [Testing](Testing.md) - the headless suite, the runner, CI, and the false-pass traps.
- [Contributing](Contributing.md) - the issue and pull-request workflow, and the rules for editing the corpus.

**Corpus and markup**

- [XML Tag Reference](XML-Tag-Reference.md) - every tag, attribute and enumerated value the corpus may use.
- [Corpus Census](Corpus-Census.md) - real counts, and how to measure them without inflating the total.

**When something is wrong**

- [FAQ and Troubleshooting](FAQ-and-Troubleshooting.md) - the failures that look like successes.

---

## What owns what

This wiki is **navigation and reference**. It does not replace the canonical documents,
and where one of them owns a subject this wiki summarises and links rather than
restating, so the two cannot drift apart:

| Document | Owns |
|---|---|
| [`AGENTS.md`](../AGENTS.md) | Agent and contributor conventions - the single source of truth. `CLAUDE.md` only imports it. |
| [`README.md`](../README.md) | The user-facing project overview and the module responsibility table. |
| [`TASKS.md`](../TASKS.md) | The defect backlog, worked top-down. Detail for closed items moves to `TASKS-archive.md`. |
| [`ROADMAP.md`](../ROADMAP.md) | Feature work, as ordered phases. Defects do not go here. |
| [`DECISIONS.md`](../DECISIONS.md) | Closed decisions that constrain future work. |
| [`books/books.ini`](../books/books.ini) | The edition registry - `Published=` decides which books a build ships. |
| [`build/validate-source.ps1`](../build/validate-source.ps1) | The closed allowlist of source XML vocabulary. |

If a fact here disagrees with one of those, **the table above wins** and this wiki is
the thing to fix.

---

## Project facts, and where each is measured

These figures move, so this page names the file or command that owns each one rather than
copying a number that rots (AGENTS.md, "Don't restate a count another file owns").

| | |
|---|---|
| Books shipped | the `Published=` line of [`books/books.ini`](../books/books.ini) (six of the twelve planned) |
| Section files bundled | [Corpus Census](Corpus-Census.md#sections-per-book), with the command |
| Bundled data | `meta.json` + one `book<N>.json` per shipped book in `web/data/` (a few MB, cached once for offline use) |
| App modules | the ES modules in `web/js/`, listed in [`README.md`](../README.md)'s module table |
| Test assertions | the `pass=` count `build/run-tests.ps1` prints; see [Testing](Testing.md) for how to use it |
| Backlog | the open `- [ ]` lines of [`TASKS.md`](../TASKS.md) |
| Runtime dependencies | none |

---

## Mirroring this wiki to GitHub

Page filenames here are flat and wiki-style on purpose, so `docs/` maps one-to-one onto
the GitHub wiki at `github.com/rwgs/web-fabled-lands/wiki`.

The wiki is enabled on the repository but **has no pages yet**, and GitHub does not create
the backing `web-fabled-lands.wiki.git` repository until the first page is saved through
the web UI - until then `git clone` of it returns `Repository not found`. To mirror:

1. Create any page once at `github.com/rwgs/web-fabled-lands/wiki` through the browser.
2. `git clone https://github.com/rwgs/web-fabled-lands.wiki.git`
3. Copy `docs/*.md` in, and **strip the `.md` suffix from inter-page link targets** - wiki
   pages have no file extension. Links to repository files such as `../AGENTS.md` need
   rewriting to full `github.com` URLs.
4. Commit and push.

Until that mirror exists, `docs/` is the wiki.
