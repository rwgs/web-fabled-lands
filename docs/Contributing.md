# Contributing

[Home](Home.md) | Prev: [Testing](Testing.md) | Next: [XML Tag Reference](XML-Tag-Reference.md)

[`AGENTS.md`](../AGENTS.md) is the single source of truth for conventions here, and
`CLAUDE.md` only imports it. This page is the working summary; when the two disagree,
`AGENTS.md` wins.

---

## The loop

Work here is tracked in **[GitHub Issues](https://github.com/rwgs/web-fabled-lands/issues)**
and lands through **[pull requests](https://github.com/rwgs/web-fabled-lands/pulls)**.

1. **Open an issue first.** Describe the defect or the change and wait for a reply before
   writing code. For a defect, say which section or book reproduces it, what you expected
   and what happened - a section number is worth more than a paragraph.
2. **Branch off `main`.** One branch per issue; keep it small enough to review in one
   sitting.
3. **Make the change.** Every changed line should trace to the issue - see
   [Change discipline](#change-discipline) below and, for the corpus, the rule in
   [Editing the corpus](#editing-the-corpus).
4. **Run the build and test loop and confirm `RESULT ALL PASS`** before you push. The
   commands are under [Before you commit](#before-you-commit); the detail is in
   [Build Pipeline](Build-Pipeline.md) and [Testing](Testing.md).
5. **Open a pull request** referencing the issue (`Fixes #123`). Say what you changed, how
   you verified it, and anything you deliberately left alone. CI must be green to merge.

Found something unrelated on the way through? **Open a separate issue for it** rather than
folding it into the change in flight.

> `TASKS.md`, `TASKS-archive.md` and the review log are the maintainer's internal backlog.
> They are kept in the repository for the history they carry, but they are **not** the
> contribution channel - please do not add entries to them in a pull request.

---

## Where a change goes

**If you are contributing, it goes in an issue or a pull request** - the table below is the
maintainer's routing for what a merged change then updates in the repository.

| It is | Raise it as | It is recorded in |
|---|---|---|
| A defect | An issue, labelled `bug` | [`TASKS.md`](../TASKS.md) *(internal)*, under the HIGH / MEDIUM / LOW bucket that fits. |
| A feature | An issue, labelled `enhancement` | [`ROADMAP.md`](../ROADMAP.md), as an ordered phase that leaves the project working. |
| A question, or an idea not yet a proposal | An issue, labelled `question` | Nothing until it is settled. |
| A closed decision that constrains future work | - | [`DECISIONS.md`](../DECISIONS.md), appended and never rewritten. A reversal is a new entry marking the old one superseded. |
| A requirement or boundary | - | [`SPEC.md`](../SPEC.md). |
| The approach for the change in flight | - | [`PLAN.md`](../PLAN.md), replaced when the next non-trivial change begins. |
| A durable convention | - | [`AGENTS.md`](../AGENTS.md). |

The four documents with no "raise it as" row are written as a change is merged, not
proposed in a pull request. Say what you think belongs there in the issue and the
maintainer will fold it in.

`TASKS.md`, its archive [`TASKS-archive.md`](../TASKS-archive.md) and the Review log at the
end of `TASKS.md` are **internal**: they record what the maintainer has worked, what each
audit pass found, and why. They are readable history, not a queue to pick from - the open
work a contributor can take is
[the issue list](https://github.com/rwgs/web-fabled-lands/issues).

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
