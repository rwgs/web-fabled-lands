# Project decisions

Closed decisions that constrain future changes, newest first. Entries are
appended and never rewritten; a reversal is recorded by adding a new entry and
marking the old one superseded.

Record a decision only when it constrains future work and its rationale cannot
be recovered by reading the code. Routine implementation choices belong in the
diff.

Dates are the day the decision was settled in the tree. Task numbers point at the detail
in `TASKS-archive.md`.

## 2026-08-26 The effective ability score has no ceiling

Status: Accepted.

### Decision

The 1..12 bound applies only to the **written** score on the Adventure Sheet, the number
`<gain|lose ability=>` moves. The **effective** score a roll or check reads - written score
plus weapon, tool, aura, god and potion terms, minus afflictions - is floored at 1 and
capped at nothing. (task 311)

### Why

The reference engine's `EffectSet.adjustAbility` ends `return Math.max(1, value)`: it pegs
the minimum alone, with the comment that this stops curses dropping an early character
below 1, and caps nothing. The printed limit is a limit on what the sheet can hold.

Capping the sum made every weapon above +4 partly or wholly worthless to a high-Combat
character. Book 4 section 103's white sword is a +8 weapon, and a game does not sell a +8
sword that delivers +4.

### Rejected alternatives

- **Cap the effective score at 12**, as the code did until this date. Rejected because it
  silently made a character *weaker* the better their equipment got, and diverged from the
  engine the port implements.
- **Cap it at some higher number.** Rejected as an invented rule: there is no such number
  in the books or the engine.

### Consequences

Any future clamp on an ability must be explicit about which of the two scores it bounds.
`clampAbility` (written) and `floorAbility` (effective) exist as separate functions so a
call site has to choose, and a comment citing one must not cite the other (task 312).

## 2026-08-25 The XML vocabulary is a closed allowlist, values included

Status: Accepted. Extends the well-formedness gate of 2026-07-27.

### Decision

`build/validate-source.ps1` enumerates every tag, every attribute those tags may carry, and
the legal values of every enumerated attribute. A new tag, attribute or value must be added
there **in the same change** that teaches the engine to read it. (tasks 199, 300, 302)

### Why

Every reader of `modifier=` treats an unknown value as "no modifier at all", which falls
through to the fully bonused score - **the very score a `natural` site exists to exclude**.
A misspelling therefore makes a check *easier* than the printed page, silently, in a way
neither the build nor the tests would notice. The attribute name had been allowlisted from
the start; only the value set was missing, which is how it went unseen across 42 sites.

The same shape had already produced the historical `safeAddGodd` typo and the `tag`/`tags`
confusion. An unknown tag or attribute reaches the browser as missing behaviour, not as an
error.

### Rejected alternatives

- **Well-formedness plus a numeric section-name check**, the gate until task 199. Rejected
  because it accepted every mistake that does not break the parser.
- **An open vocabulary with a warning list.** Rejected because a warning in a build that
  still succeeds is a warning nobody reads, and the failure it guards is invisible at
  runtime.
- **Validating in the browser instead.** Rejected: it moves the failure from the author's
  build to the player's session.

### Consequences

Adding markup is a two-file change by construction, and a genuinely new spec-legal spelling
the engine cannot yet honour becomes a build error rather than a silent no-op - accepted
deliberately (task 301). `validate-selftest.ps1` must keep proving each class of mistake
still fails, because a gate that quietly stopped catching typos would look identical to a
passing build.

## 2026-08-09 The test loop closes its false-pass traps mechanically

Status: Accepted.

### Decision

`build/run-tests.ps1` and `build/serve.py` own the test loop. Each way the loop could report
a pass it had not earned is prevented in code rather than documented as an operator rule: a
GUID-named browser profile per run, `Cache-Control: no-store` on every response, a server
that refuses to share its port, a real stdout handle for the dump, the dump deleted before
and size-checked after, and a `pass=0` run treated as a failure. (task 235)

### Why

Three failure modes all *looked* like passes, and the most dangerous was invisible. A
`--user-data-dir` left over from an earlier session executes that session's test files,
because `python -m http.server` sends no `Cache-Control` and no `ETag` and Chrome applies
heuristic freshness. The suites the tree no longer contains simply do not run, nothing
throws, and the reporter prints a well-formed `RESULT ALL PASS` for a smaller assertion
count than the tree deserves. One real run reported `pass=476 fail=0` for a suite of 545.

Neither existing guard could catch it: the sticky-fatal reporter sees no throw, and a
dump-size check sees a full-size, well-formed dump. Only comparing counts against a
known-good run reveals it - which is not a thing a person reliably does.

### Rejected alternatives

- **Document the rules in `AGENTS.md`**, which is what existed before. Rejected: they were
  documented, and were still missed, because the failure announces itself as success.
- **Add cache headers only.** Rejected as insufficient - it fixes one of the three, and
  leaves the stale-server and empty-capture modes intact.

### Consequences

The raw commands still carry every trap, so the runner is the supported entry point and the
raw commands are for debugging the runner. New traps of this shape belong in the runner,
not in prose. Cross-platform parity matters: CI mints its profile with `mktemp -d` for the
same reason.

## 2026-08-09 An open choice is asked, not assumed

Status: Accepted.

### Decision

Where a section leaves a choice to the player - "lose one possession", "give up a blessing
of your choice", an open ability or cargo forfeit - the port presents a picker and blocks
the section until it is answered. The engine only decides for the player where the printed
page states the rule, and markup says so explicitly (`choose="f"` for page order,
`choose="best"` for highest bonus). (tasks 224-234, 285, 286)

### Why

The alternative in place beforehand took whichever item came first in an internal list.
That is a rule the books do not contain, it is invisible when it happens, and it takes the
player's most valuable possession about as often as their least.

Putting the exception in **markup rather than in the engine** keeps the printed page as the
authority: a page that states which thing goes carries the attribute, and a page that does
not gets the picker.

### Rejected alternatives

- **Take the first match silently.** Rejected as above.
- **Encode the exceptions as engine rules keyed by section.** Rejected: it puts book text
  into code, where nobody editing the section can see it.

### Consequences

Every new open-selector effect needs a picker path, and its absence is a defect rather than
a simplification. Several later tasks are this decision being extended to a family the
first pass missed, which is the expected shape of follow-up work here.

## 2026-07-29 `books.ini`'s `Published=` is the single source of the shipped edition

Status: Accepted.

### Decision

One line in `books/books.ini` decides which books a build ships. It drives validation, the
per-book JSON, the copied maps and art, the service worker's offline inventory, and the
every-section test scan. Publishing or withdrawing a book is a content change to that line,
never a build-script edit. (task 209)

### Why

The publish set had been implicit in several places at once. A set that silently stopped
reaching one of its consumers would look exactly like an intact edition - the books still
play, and only the missing offline entry or the unscanned sections would eventually show
it, long after the change.

### Rejected alternatives

- **A list per consumer.** Rejected: that is the failure mode, not a design.
- **Deriving the set from which book folders exist.** Rejected because a folder can exist
  as an in-progress conversion that must not ship.

### Consequences

`release.ps1` owns the manifest, and `release-selftest.ps1` must exercise a real build of a
temp tree in **both** directions of a transition - adding a book, and withdrawing one
including the removal of its generated outputs. A new consumer of the publish set has to be
added to that self-test.

## 2026-07-27 Bundled section text is LF-normalised

Status: Accepted.

### Decision

The build normalises section text to LF before bundling, so `web/data/*.json` is a pure
function of source *content* rather than of the builder's checkout. Build scripts are kept
ASCII-only and OS-neutral (forward slashes) for the same reason. (task 197)

### Why

A `core.autocrlf=true` checkout bundled `\r\n` where an LF checkout bundled `\n` - about
8,500 differing escapes per book. The committed data therefore could not be checked against
a rebuild in CI, and identical content produced two different version stamps. Nothing is
lost: both `XmlDocument` and the browser's `DOMParser` normalise CRLF to LF while parsing.

### Rejected alternatives

- **A `.gitattributes` rule alone.** Rejected as insufficient - it governs the checkout, not
  what a builder on an unconfigured machine produces.
- **Not comparing generated output in CI.** Rejected: that comparison is what catches an
  XML edit committed without a rebuild, which otherwise leaves CI green-lighting the old
  sections.

### Consequences

CI can run the build on Linux and fail on any generated diff, so a corpus change must
commit its rebuilt output. A path literal with a backslash becomes a *file* named
`web\data` on Linux, so build scripts cannot use them.

## 2026-07-26 The build stamp is a content hash

Status: Accepted.

### Decision

`version.js` and the service-worker cache key are stamped `yy.MM.dd.<hash>` from a hash of
the app source, including `sw.js`. The date is reused while the digest holds. (task 196)

### Why

A stamp that moved on every build made a no-op rebuild dirty the tree, which defeats the
CI check that committed output matches a clean rebuild. A stamp that moved only on a *data*
change left returning players on a cached old app after a pure `web/` commit.

### Rejected alternatives

- **A timestamp.** Rejected: no rebuild is ever a no-op.
- **A manual version.** Rejected: it gets forgotten precisely when it matters, and the
  symptom is a player stuck on an old build.

### Consequences

`version.js` and `sw.js`'s `VERSION` are generated and must never be hand-edited, and a
pure `web/` change still has to run `stamp-version.ps1`. Anything added to the hashed set
changes every future digest, so the set is deliberately narrow: the shipped app, not the
test harness.

## 2026-07-26 The rules stay out of the view, and the seam is tested

Status: Accepted. Consolidates the split completed 2026-07-20 (task 119).

### Decision

Game logic lives in DOM-free modules; the `render*.js` modules only build DOM and wire
clicks, delegating every rule. No rule module may import a browser-touching module, and
`node web/tests/node-import.mjs` proves it in CI. (tasks 2, 119, 195)

### Why

The rules are the part worth testing and the part hardest to test through a DOM. Keeping
them DOM-free lets combat, economy, rolls and effects be exercised directly and headlessly.

The seam needs a *test* rather than a convention because a single stray import breaks it
without failing the browser suite, which has a DOM either way - so the violation is
invisible exactly where it matters.

### Rejected alternatives

- **A documented convention alone.** Rejected for the reason above.
- **A DOM shim in the Node check.** Rejected: it would hide the thing being checked.

### Consequences

A rule module needing the bundled-book list reads `edition.js`, never `data.js`, because
`data.js` constructs a `DOMParser` at module top level. `edition.js` exists solely to be
that import-free registry.

## 2026-07-19 The build requires PowerShell 7

Status: Accepted.

### Decision

`build/*.ps1` carry `#Requires -Version 7.0`, so Windows PowerShell 5.1 refuses to run
them. The web app itself keeps no runtime dependency. (task 121)

### Why

Under 5.1 the outputs diverge **silently**: `ConvertTo-Json` escaping and the
culture-aware `Sort-Object` reformat every book JSON and the version stamp. A refusal is
better than a build that succeeds and produces different bytes.

### Rejected alternatives

- **Writing 5.1-compatible scripts.** Rejected: it constrains every future script to avoid
  cmdlets whose behaviour differs, to prevent a failure that is invisible when it happens.
- **Porting the build to another language.** Rejected as disproportionate; the environment
  is Windows and PowerShell 7 is a single install.

### Consequences

Scripts must also stay ASCII-only, because a non-ASCII byte is misread through 5.1's legacy
code page and breaks parsing before the `#Requires` guard can report anything useful. CI
checks both properties on every `build/*.ps1`.

## 2026-07-02 The rules are a clean-room reimplementation; `java-engine/` is reference only

Status: Accepted.

### Decision

The original Java engine is kept in the repository as the reference *specification* for the
game rules and is never edited, and its code is never copied. The JavaScript rules are
written from the observed behaviour and the XML spec. See `NOTICE`.

### Why

The Java project is the original work of another author under its own licence. Keeping it
readable makes the port checkable against the thing it ports; copying from it would make
the licensing position of this repository something other than what `LICENSE` and `NOTICE`
state.

### Rejected alternatives

- **Translating the Java directly.** Rejected on licensing grounds.
- **Removing it from the repository.** Rejected: it is the only complete statement of how
  several rules actually resolve, and disputes about correct behaviour are settled by
  reading it.

### Consequences

`java-engine/` is read-only for every contributor. The single documented exception is the
`README.txt` to `README.md` rename, for displayability. A rules disagreement is resolved by
citing the engine's behaviour, not by importing its implementation.

## 2026-07-02 Section XML is bundled verbatim and parsed in the browser

Status: Accepted.

### Decision

The build bundles section text as text. The browser parses each section with `DOMParser`
and walks the tree into DOM. There is no XML-to-JSON structural transform.

### Why

The books interleave prose and logic freely - a condition wraps half a sentence, a reward
wraps the words that announce it. Any JSON schema for that is either lossy or a
reimplementation of XML, and the lossy version discards exactly the wrapping that keeps the
printed wording intact.

Parsing in the browser also means the corpus stays the single source of truth, with no
intermediate representation to keep in step.

### Rejected alternatives

- **A structured JSON schema per section.** Rejected as lossy, and as a second grammar to
  maintain alongside the XML one.
- **Server-side rendering to HTML.** Rejected: there is no server, and it would freeze
  rule decisions that must re-evaluate against live state.

### Consequences

The bundle is large (about 2.8 MB across six books), which is accepted because it is cached
once for offline use. Every section is re-rendered on each state change, so per-visit
memoisation by stable node path is what keeps effects applying exactly once - the
correctness of the whole renderer rests on it.

## 2026-07-01 No build toolchain, no runtime dependencies

Status: Accepted.

### Decision

The shipped `web/` tree is plain HTML, CSS and ES modules. No framework, no bundler, no
npm, no package manifest. Tooling exists only for the offline data build.

### Why

The app has to be servable from any static host and playable from a phone with no install
step, and it has to keep working years from now without a dependency tree that has rotted.
A toolchain is also the thing most likely to require maintenance nobody is doing.

### Rejected alternatives

- **A framework plus a bundler**, the default for an app of this size. Rejected: it buys
  ergonomics at the cost of the two properties above.
- **A minimal bundler for the modules only.** Rejected: ES modules are supported everywhere
  the app targets, so it would add a build step for nothing.

### Consequences

Anything a framework would provide is hand-written, which is why the module boundaries and
the re-render model are documented as carefully as they are. Adding a runtime dependency is
a change to what this project is, not an implementation detail - it belongs here as a new
entry superseding this one.
