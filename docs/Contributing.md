# Contributing

[Home](Home.md) | Prev: [Testing](Testing.md) | Next: [XML Tag Reference](XML-Tag-Reference.md)

[`AGENTS.md`](../AGENTS.md) is the single source of truth for conventions here, and
`CLAUDE.md` only imports it. This page is the working summary; when the two disagree,
`AGENTS.md` wins.

---

## The loop

1. Read [`TASKS.md`](../TASKS.md) and take the **first open (`- [ ]`) task**.
2. Follow its steps exactly. Each task is self-contained - do not skip steps, and do not
   combine tasks unless told to.
3. Run the build and test loop and confirm `RESULT ALL PASS` **before** marking the task
   `- [x]`. Update `README.md` if the task says to.
4. If you find a model error, missing assumption or undocumented simplification, **file it
   as a new `- [ ]` task at the bottom of `TASKS.md`** before continuing. Do not leave
   findings only in conversation.
5. Commit after every completed task.

The build and test commands are in [Build Pipeline](Build-Pipeline.md) and
[Testing](Testing.md).

---

## Which document takes a change

| It is | It goes in |
|---|---|
| A defect | [`TASKS.md`](../TASKS.md), under the HIGH / MEDIUM / LOW bucket that fits. |
| A feature | [`ROADMAP.md`](../ROADMAP.md), as an ordered phase that leaves the project working. |
| A closed decision that constrains future work | [`DECISIONS.md`](../DECISIONS.md), appended and never rewritten. A reversal is a new entry marking the old one superseded. |
| A requirement or boundary | [`SPEC.md`](../SPEC.md). |
| The approach for the change in flight | [`PLAN.md`](../PLAN.md), replaced when the next non-trivial change begins. |
| A durable convention | [`AGENTS.md`](../AGENTS.md). |

Closed task detail is archived in [`TASKS-archive.md`](../TASKS-archive.md); the Review log
at the end of `TASKS.md` records each audit pass and is where new work is filed. That file
is the only place that knows what is open - read its `- [ ]` lines rather than a count copied
to here, and when the buckets are clear the next pickup is a phase from `ROADMAP.md`.

---

## Change discipline

- **Say what success looks like before editing**, as a check that can fail: the test that
  reproduces the bug, the test for the input that must be rejected, the same tests passing
  either side of a refactor.
- **Make the smallest change that solves the stated problem.** No speculative feature, no
  abstraction for a single call site, no configuration knob nobody asked for, no handling
  for a case that cannot occur.
- **Match the naming, layout and style already in the file**, even where you would do it
  differently in a new project.
- **Leave unrelated changes exactly as you found them.** Every changed line should trace to
  something the request asked for. Raise a simpler approach or an unrelated defect rather
  than acting on it.
- **Remove what your change orphans** - an import nothing uses, a helper nothing calls.
  Leave pre-existing dead code alone unless asked; mention it where it matters.
- **Stop at any ambiguity in the request, before editing anything.** Name what is unclear
  and the readings it admits. An unread fact is not an ambiguity - read the code or run the
  command that settles it.

---

## Editing the corpus

The rule, in full, because it is the one most easily broken by good intentions:

> Edit `books/**/*.xml` - but **only ever to ADD rules markup, never to reword the book.**

The port re-creates the printed gamebook as-is. The section text is the author's, not ours.

**A tag wraps the printed instruction. It never replaces, rewrites, abridges or re-splits
it:**

```xml
<tick>place a tick in it now</tick>
<gain shards="20">gain 20 Shards</gain>
```

Two failure modes to watch:

- **A bare self-closing tag where the book printed words** makes the renderer substitute
  generic filler - a bare `<tick/>` prints "tick the box" - which silently loses the
  wording. Pass the words through.
- **The sentence boundary.** Write `</if> <else>`, not `</if><else>`, or two printed
  sentences run together.

**Check before committing** by stripping tags from the old and new file and diffing the
remaining prose. It should be byte-identical apart from the markup you added. This holds
for every book, including in-progress conversions.

Superseded working copies live in `books/book<N>/temp/`, never in the book folder itself.
A file there declaring a `<section name=>` that is not its own filename **fails the build
gate**, because it reads as a second copy of a live section.

### Adding a tag or attribute

A new tag, attribute or enumerated value must be added to the allowlist in
[`build/validate-source.ps1`](../build/validate-source.ps1) **in the same change** that
teaches the engine to read it. That is the whole point of the closed vocabulary: a typo
cannot ship as a silent no-op. See [XML Tag Reference](XML-Tag-Reference.md).

---

## Code conventions

- **Keep the rules out of the view.** See [Architecture](Architecture.md). This is enforced
  in CI.
- **Never edit `web/data/*.json` or `web/js/version.js`** - they are generated. Change the
  XML and rebuild.
- **Never hand-edit `sw.js`'s generated inventory or `VERSION` line**, and do not drop the
  `BEGIN`/`END GENERATED BOOK INVENTORY` markers.
- **`java-engine/` is reference only.** Never edit it and never copy its code - the JS
  rules are a clean-room reimplementation. See [`NOTICE`](../NOTICE) for the licensing that
  makes this matter.
- **Build scripts stay ASCII-only and OS-neutral.** Forward slashes in path literals; CI
  checks both.
- **Plain ASCII punctuation** in new files unless the format demands otherwise.

---

## Windows and antivirus

The build and tests require PowerShell, and the repository's own vetted scripts are
expected and safe to run. What trips Bitdefender's heuristics is *suspicious automation*:

- **Never use encoded or obfuscated commands.** No `-EncodedCommand`, no base64 payloads,
  no compressed script blobs. These are flagged every time. If an approach requires
  encoding to get through, choose a different approach.
- Prefer **direct file edits** over shell-based search and replace.
- Keep commands short, explicit and readable; do not chain many together.
- Never touch the registry, startup items, scheduled tasks or security settings.

---

## Before you commit

```
pwsh -ExecutionPolicy Bypass -File build/build-data.ps1   # if books/ or rules/ changed
pwsh -ExecutionPolicy Bypass -File build/stamp-version.ps1 # if only web/ changed
pwsh -ExecutionPolicy Bypass -File build/run-tests.ps1
```

Healthy is `RESULT ALL PASS` and exit 0. If you changed `books/` or `rules/`, **commit the
rebuilt output too** - CI fails on any generated diff.
