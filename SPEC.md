# Project specification

What the project must do and the boundaries it stays inside. This document holds
requirements rather than implementation: a change to how something is built does
not belong here, and a change to what counts as correct does.

## Problem

The *Fabled Lands* gamebooks are an open-world series: the player roams freely across six
published books, keeping one character throughout, and the books hand the player the
bookkeeping. A session means tracking six ability scores, Stamina, Rank, Shards, up to
twelve possessions with their bonuses, a ship and its cargo and crew, and an open-ended
list of codewords, blessings, curses, diseases, poisons, gods, titles, ticked boxes,
stored caches and resurrection deals - while also rolling dice, resolving combat round by
round, and pricing market transactions.

Without the project a reader either does that by hand, which is slow and error-prone
enough to end runs, or uses the original Java application (JaFL), which requires a desktop
Java runtime and is not usable on the phone or tablet most reading happens on.

## Users

Readers of the printed books who want to play them without the paperwork. They bring:

- **Any device with a modern browser**, most often a phone or tablet. No install rights,
  no runtime to configure, and frequently no connection while reading.
- **No technical expertise.** The rules must be applied for them, not explained to them.
- **No account and no server they can be asked to trust.** All progress stays on their own
  device.
- **Their own copies of the books.** The project reproduces the section text but is not a
  substitute for owning them.

A second, smaller audience is maintainers deploying the app elsewhere, who need the build
to be reproducible from a checkout with no dependency installation.

## Required behavior

- **Render the original section text faithfully.** The prose is the author's. Markup wraps
  printed instructions; it never replaces, rewrites, abridges or re-splits them.
- **Automate the common rule set**: ability checks, outcome tables, rank checks, training,
  combat, markets, ships, cargo, crew, caches, afflictions and resurrection deals - as the
  original engine resolves them, not as a simplified reading would.
- **Apply each effect exactly once per visit**, and re-evaluate conditionals against live
  state after every roll.
- **Ask the player when the page leaves a choice open.** An open forfeit ("lose one
  possession", "give up a blessing of your choice") presents a picker rather than taking
  whichever item happens to be first, unless the printed page states which thing goes.
- **Persist continuously.** Progress survives a closed tab, a crash, or a reload, resuming
  the exact visit rather than replaying the section's effects.
- **Work offline** after one online load.

### Error, empty, loading and recovery cases

- **A link into a book this build does not ship** (7-12, never digitised) is detected and
  shown as a note naming the book, never a dead end or a silent failure.
- **A save that cannot be written** - storage full, or private browsing - raises a
  player-facing warning, and re-arms silently when a later write succeeds. Progress is
  never discarded quietly.
- **A save from an older build** is sanitised, migrated and loaded. Every field is
  re-validated rather than trusted, since a save is a file a player can hand-edit.
- **A missing section illustration** is skipped without breaking the section.
- **An interrupted offline upgrade** never leaves a partly cached game: obsolete caches are
  pruned only after a new install verifiably completes.
- **A section using a bespoke mechanic the engine does not model** still renders its prose.
  Degrading gracefully is required; failing to render is not.

## User experience

The primary workflow is: create or load a character, read a section, resolve whatever it
asks (a roll, a purchase, a fight, a choice), and follow a link onward. The Adventure Sheet
is visible alongside and updates as state changes.

- **Conditionals are shown disabled, not hidden.** A branch whose condition is unmet stays
  on screen greyed out, so the printed "If not..." that follows still reads correctly.
- **Declinable costs are click-to-pay.** Where a section offers a way to turn back, its
  price is not deducted on arrival; it becomes an action that blocks the section until
  resolved. Unavoidable losses still apply automatically.
- **Narration is optional** and uses the browser's own speech synthesis, so it works
  offline and costs nothing.
- Supported layouts run from phone portrait to desktop. The app is installable to a home
  screen.

## Architecture and data flow

`books/**/*.xml` is the source of truth. The offline build validates it against a closed
vocabulary and bundles the section text **verbatim** into `web/data/*.json`; the browser
parses each section with `DOMParser` and walks the tree into DOM. There is no lossy
XML-to-JSON transform.

Game logic lives in **DOM-free rule modules**; view construction lives in the `render*.js`
modules, which only build DOM and delegate every rule. State is owned by `state.js` and
persisted to `localStorage`.

The only external interface crossed is the static origin the app is served from. There is
no backend, no API and no third-party service at runtime.

## Security and privacy

- **No data leaves the device.** No account, no telemetry, no network calls after the
  assets load. This is a requirement, not a current implementation detail.
- **The trust boundary is the save file.** A save is player-editable and is therefore
  treated as untrusted input: sanitised field by field on load and import, never assumed
  well-formed.
- **Source XML is trusted, and is made trustworthy at build time** by the closed-allowlist
  gate, so a typo cannot reach the browser as silently missing behaviour.
- **The cache namespace is shared.** The service worker confines itself to `fl-` caches and
  never deletes a co-hosted application's caches on the same origin.
- **A secure context is required for offline play**, because service workers are only
  registered over HTTPS (or `localhost`). A deployment served over plain HTTP still plays
  online but silently loses its offline capability.

## Performance and compatibility

- **Supported environments:** current Chrome, Edge, Firefox and Safari, desktop and mobile.
  ES modules, `fetch`, `localStorage`, Cache API and `DOMParser` are required; the Web
  Speech API is optional and its absence only hides the narration control.
- **No runtime dependencies.** The shipped `web/` tree must remain plain HTML, CSS and ES
  modules - no framework, no bundler, no npm.
- **Bundle budget:** the full six-book payload is about 2.8 MB of JSON, cached once for
  offline use.
- **Every section of every published book must render without throwing** - 4,369 today,
  verified on every test run.
- **The build requires PowerShell 7 and Python 3**, but only offline; neither is needed to
  serve or play the app.

## Non-goals

- **Books 7-12.** They were never digitised. Their links are handled gracefully; the text
  is out of scope.
- **General per-section artwork.** Not part of this repository. The app displays it if the
  files are supplied, but shipping them is not a goal.
- **A backend, accounts or cloud saves.** Saves move as exported files.
- **Multiplayer, or any form of shared session.**
- **A rules variant or house-rule engine.** The port implements the original engine's
  rules; configurable rule changes are not offered.
- **Reproducing JaFL's user interface.** Its *rules* are the specification; its UI is not.
- **A build toolchain for the web app.** Adding one is a change to what this project is.

## Acceptance criteria

- `build/run-tests.ps1` exits 0 on `RESULT ALL PASS`, with an assertion count that has not
  fallen. Verified automatically, and in CI on every push.
- Every section of every published book renders without throwing - `suite-corpus`,
  automatic.
- The rule modules import and run in plain Node with no DOM - `node
  web/tests/node-import.mjs`, automatic, its own CI job.
- A clean rebuild produces no diff against committed generated output - automatic, CI.
- The source-XML gate still rejects each class of mistake - `validate-selftest.ps1`,
  automatic, CI.
- Publishing or withdrawing a book reaches every consumer of `Published=` -
  `release-selftest.ps1`, automatic, CI.
- Prose is unchanged by a markup edit: stripping tags from the old and new file leaves
  byte-identical text. **Manual, before committing a corpus change.**
- The app installs and plays through a section offline after one online load. **Manual.**
- Narration reads a section and highlights the current sentence. **Manual**, and only where
  the browser supports speech synthesis.

## Unresolved questions

- **Should the shipped edition ever include per-section artwork?** Answered by whoever can
  establish the licensing position; the loader already supports it.
- **What positions the player on the map?** No section in the corpus carries a location,
  and the reference engine has none either. `ROADMAP.md` phase 1 spends the one positional
  fact that exists (the current dock); phases 2 and 3 depend on datasets that would have to
  be created. Answered by that roadmap work.
