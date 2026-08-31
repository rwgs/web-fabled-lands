# Build Pipeline

[Home](Home.md) | Prev: [Architecture](Architecture.md) | Next: [Testing](Testing.md)

The web app has **no build step at runtime**. The build is an offline step that turns the
XML corpus into bundled JSON, and it is the only part of the repository that needs tooling.

---

## Source versus generated

Getting this wrong is the most expensive mistake available here, so it is worth stating
plainly.

| Path | Status |
|---|---|
| `books/**/*.xml` | **SOURCE OF TRUTH.** Edit these. |
| `books/books.ini` | **SOURCE.** The edition registry. |
| `rules/` | **SOURCE.** The original JaFL XML spec, for reference. |
| `web/js/*.js`, `web/css/`, `web/index.html` | **SOURCE.** The app. |
| `web/sw.js` | **SOURCE**, except the generated inventory and `VERSION` - see below. |
| `web/data/*.json` | **GENERATED.** Never hand-edit. |
| `web/js/version.js` | **GENERATED.** Never hand-edit. |
| `web/assets/maps/`, `web/assets/illus/`, `web/assets/world-map.jpg` | **GENERATED** (copied by the build). |
| `web/assets/icon*.png`, `icon*.svg` | **SOURCE.** Hand-committed; the build never touches them. |

> **Never edit `web/data/*.json` to make a test pass - fix the XML or the engine.**

CI enforces this: it runs a clean build on Linux and **fails on any generated diff**. If
you touch `books/` or `rules/` and do not commit the rebuilt output, the build fails.

---

## PowerShell 7 is required

The build scripts **require `pwsh` 7**, not the Windows PowerShell 5.1. Both carry
`#Requires -Version 7.0`, so 5.1 refuses to run them - which is the point. Under 5.1 the
outputs diverge *silently*: `ConvertTo-Json` escaping and the culture-aware `Sort-Object`
reformat every book JSON and the stamp.

The *web app itself* still has no runtime dependencies. Only this offline step needs pwsh.

The scripts are also kept **ASCII-only and OS-neutral**, and CI checks both. A non-ASCII
byte breaks 5.1's parsing through its legacy code page, and a `'web\data'` path literal
becomes a *file* named `web\data` on Linux. Use forward slashes.

---

## The commands

**Changed `books/` or `rules/`** - rebuild the bundled data (this also stamps the version):

```
pwsh -ExecutionPolicy Bypass -File build/build-data.ps1
```

**Changed only `web/`** (JS, CSS, HTML) - still refresh the stamp, or returning players keep
the cached old build:

```
pwsh -ExecutionPolicy Bypass -File build/stamp-version.ps1
```

Then run the tests - see [Testing](Testing.md).

---

## What each script does

| Script | Role |
|---|---|
| `build-data.ps1` | Bundles `books/` + `rules/` into `web/data/`, copies maps and illustrations into `web/assets/`, rewrites `sw.js`'s inventory, and calls `stamp-version.ps1`. Runs the gate below **before writing anything**. |
| `validate-source.ps1` | The source-XML gate, and the reader both phases share. Dot-sourced by the build. |
| `validate-selftest.ps1` | Drives the gate over mutation fixtures. **CI runs it.** |
| `release.ps1` | The edition manifest - validating `Published=`, generating the service-worker inventory, and reconciling a withdrawn book's outputs. |
| `release-selftest.ps1` | Drives that over fixtures, including a real build of a temp tree. **CI runs it.** |
| `stamp-version.ps1` | Writes the build stamp into `version.js` and `sw.js`. |
| `run-tests.ps1` | The test loop. See [Testing](Testing.md). |
| `serve.py` | A no-cache static server. The one non-PowerShell script here. |
| `run-tests-selftest.ps1` | Drives the runner's Python discovery over shim fixtures. **Windows-only; CI does not run it** - run it by hand after touching discovery. |

Neither self-test touches anything under `books/` or `web/`.

---

## The source-XML gate

`validate-source.ps1` is a **closed allowlist** of the tags, attributes and enumerated
values the corpus and engine use today. That is deliberate:

> A genuinely new tag/attribute/value must be added here in the same change that teaches
> the engine to read it - which is the point: a typo cannot ship as a silent no-op.

Before it existed, well-formedness was all that was checked, which accepted every mistake
that does not break the parser - an unknown tag, a misspelled attribute (the historical
`safeAddGodd` typo), an invalid enumerated value, a link to a section that does not exist,
a malformed pregen biography, a wrong root element. Each of those reaches the browser as
**silently missing behaviour** rather than a build failure.

The failure mode it closes best is worth understanding, because it is invisible: every
reader of `modifier=` treats an unknown value as "no modifier at all", which falls through
to the affected score - **the very score a `natural` site exists to exclude**. A
misspelling therefore makes the check *easier* than the page prints it, silently.

The full vocabulary is in [XML Tag Reference](XML-Tag-Reference.md).

One attribute is checked by **value** as well as by name: `codeword=`. The authority is the
`Codewords=` list in each `books/book<N>/book.ini` - the printed list from that volume's
inside front cover - and the check is against the **union** of the six, because the
alphabetical rule (book 1's codewords all begin with A) says where a codeword is *earned*,
not where it may be tested. The same invisible failure applies as above: an unknown codeword
is indistinguishable from one the player has not earned, so a typo'd `<gain codeword="Anchr">`
leaves its `<if codeword="Anchor">` shut for the whole game. Three shapes are legitimately
absent from those lists and exempt: section-scoped bookkeeping flags (`2.567.1a`, `5/520`),
the port's own named state flags (`StillInYellowport`), and codewords printed in the
unpublished books 7-12 (`Hill`, `Judas`). The reverse direction is reported as a **note**
rather than a failure - the printed books really do list a codeword they never use.

---

## `books.ini` and the edition

`Published=` is the **single source** of which books a build ships. It drives:

- validation,
- the per-book JSON,
- the copied maps and art,
- `sw.js`'s offline inventory,
- the every-section test scan.

Publishing or withdrawing a book is a **content change to that line**, never a build-script
edit. `release-selftest.ps1` drives a real build of a temp tree in both directions of a
next-book transition, because a publish set that quietly stopped reaching one of those
consumers would look exactly like today's intact six-book edition.

---

## The build stamp

The stamp is a **content hash of the app source**, including `sw.js`. It changes on any
edit, and *only* on an edit: paths sort ordinally, text is LF-normalised, and the date is
reused while the digest holds. A rebuild with no source change is therefore a byte-for-byte
no-op and leaves the tree clean - which is what makes CI's "generated output matches its
committed source" check meaningful.

**Never hand-edit `version.js` or `sw.js`'s `VERSION`.**

`sw.js` is hand-written *except* for the `BOOK_DATA`/`BOOK_MAPS`/`BOOK_ILLUS` lists between
its `BEGIN`/`END GENERATED BOOK INVENTORY` markers and the `VERSION` line, which the build
owns. Do not hand-edit those and do not drop the markers - the build then fails loudly.

---

## LF normalisation

The bundled section text is **LF-normalised**, so the JSON depends on the source *content*
and not on your checkout's line endings.

Without it, a `core.autocrlf=true` checkout bundles `\r\n` where an LF checkout bundles
`\n` - about 8,500 differing escapes per book. The committed data could then not be checked
against a rebuild in CI, and the same content would produce two different version stamps.
Nothing is lost: both `XmlDocument` and the browser's `DOMParser` normalise CRLF to LF
while parsing, so this only strips the builder's platform out of the output.
