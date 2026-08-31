# Corpus Census

[Home](Home.md) | Prev: [XML Tag Reference](XML-Tag-Reference.md) | Next: [FAQ and Troubleshooting](FAQ-and-Troubleshooting.md)

Real counts over the shipped corpus, and - more importantly - **how to measure them
without inflating the total**. This page exists because two tasks were filed with wrong
numbers taken from an over-broad glob.

Figures were measured on 2026-08-31. Every one has its command below, so it can be
re-checked rather than trusted.

---

## The one rule

> The shipped corpus is the **`^\d+[a-z]?` basenames of the published books only**.

That is 4,369 files today, because it is exactly the filter `build-data.ps1` bundles and
`validate-source.ps1` checks, and it is what `data.loadBook` and `availableBooks()` can
see.

**A `books/**/*.xml` glob returns 4,437**, and both extras are real:

| | Count | Why it is not a section |
|---|---|---|
| `books/book<N>/temp/` copies | 20 | Superseded working copies. Nothing walks them. |
| Non-section XML | 48 | `Adventurers.xml`, `New.xml` and six pregen biographies, per book. |

Both inflate a census. Two consequences that actually happened:

- A task was filed quoting **569 `<adjust>` nodes** where the corpus holds **558**.
- A `force="f"` census read **187 sections** against the shipped **147**, because every
  pregen biography ends in `<goto section="1" force="f"/>`.

**A census that means "the shipped corpus" must exclude both, and a filing that quotes a
count must say which set it measured.**

---

## The correct filter

PowerShell:

```powershell
Get-ChildItem books/book1, books/book2, books/book3,
              books/book4, books/book5, books/book6 -File -Filter *.xml |
  Where-Object { $_.BaseName -match '^\d+[a-z]?$' }
```

`-File` without `-Recurse` is what excludes `temp/`; the `BaseName` match is what excludes
the eight non-section files per book. Note the **optional letter suffix** - the books
really do contain sections such as `12a`, and a filter assuming plain integers silently
undercounts.

POSIX equivalent:

```
find books/book1 books/book2 books/book3 books/book4 books/book5 books/book6 \
     -maxdepth 1 -type f -regextype posix-extended -regex '.*/[0-9]+[a-z]?\.xml'
```

---

## Sections per book

| Book | Title | Sections |
|---|---|---|
| 1 | The War-Torn Kingdom | 680 |
| 2 | Cities of Gold and Glory | 786 |
| 3 | Over the Blood-Dark Sea | 718 |
| 4 | Devils & Howling Darkness | 709 |
| 5 | The Court of Hidden Faces | 724 |
| 6 | Lords of the Rising Sun | 752 |
| | **Total** | **4,369** |

---

## Tag frequency

Every element occurrence across the 4,369 shipped section files.

| Tag | Count | | Tag | Count |
|---|---|---|---|---|
| `p` | 8,270 | | `rest` | 146 |
| `section` | 4,368 | | `buy` | 106 |
| `choice` | 4,042 | | `effect` | 95 |
| `goto` | 3,386 | | `market` | 89 |
| `lose` | 1,499 | | `adjustmoney` | 89 |
| `if` | 1,394 | | `training` | 62 |
| `outcome` | 1,351 | | `resurrection` | 60 |
| `choices` | 1,266 | | `elseif` | 55 |
| `tick` | 839 | | `rankcheck` | 54 |
| `outcomes` | 789 | | `itemcache` | 31 |
| `random` | 587 | | `moneycache` | 25 |
| `b` | 572 | | `transfer` | 23 |
| `adjust` | 558 | | `flee` | 20 |
| `item` | 509 | | `return` | 16 |
| `success` | 503 | | `curse` | 16 |
| `failure` | 494 | | `fightdamage` | 14 |
| `difficulty` | 470 | | `desc` | 13 |
| `gain` | 380 | | `reroll` | 9 |
| `i` | 297 | | `items` | 7 |
| `set` | 274 | | `extrachoice` | 7 |
| `tool` | 269 | | `sell` | 6 |
| `weapon` | 239 | | `poison` | 5 |
| `else` | 217 | | `disease` | 5 |
| `fight` | 208 | | `image` | 4 |
| `armour` | 206 | | `field` | 4 |
| `text` | 203 | | `fightround` | 3 |
| `group` | 196 | | `while` | 2 |
| `trade` | 178 | | `sold` | 2 |
| `header` | 170 | | `include` | 2 |
| | | | `exclude` | 2 |
| | | | `sectionview` | 1 |
| | | | `bookchange` | 1 |

Two things in that table are worth reading twice:

- **`section` counts 4,368, not 4,369.** One file - [`books/book3/207.xml`](../books/book3/207.xml)
  - spells its root element `<SECTION>` in upper case, and carries the three `<P>` tags for
  the same reason. XML is case-sensitive, so any grep-based census that assumes lower case
  will miss them. The build gate accepts the file because PowerShell compares strings and
  looks up hashtable keys **case-insensitively** by default, so both the root check and the
  tag allowlist match. Your `grep` will not be so forgiving.
- **The long tail is where the bugs are.** Nine tags appear five times or fewer, and one
  (`<bookchange>`) appears exactly once - in section 5.681. A rule with a single call site
  in the whole corpus is easy to break and hard to notice, which is why `suite-corpus`
  renders every section on every run.

Reproduce with:

```
find books/book1 books/book2 books/book3 books/book4 books/book5 books/book6 \
     -maxdepth 1 -type f -regextype posix-extended -regex '.*/[0-9]+[a-z]?\.xml' -print0 |
  xargs -0 grep -ohE '<[a-zA-Z][a-zA-Z0-9]*' | sed 's/<//' | sort | uniq -c | sort -rn
```

This counts opening tags textually, so it is a census of markup as written, not of a
parsed tree. That is the right unit for "how much of the corpus would this change touch",
and the wrong one for "how many nodes does the engine build".

---

## Generated output

| File | Size |
|---|---|
| `web/data/meta.json` | 41 KB |
| `web/data/book1.json` | 479 KB |
| `web/data/book2.json` | 479 KB |
| `web/data/book3.json` | 459 KB |
| `web/data/book4.json` | 468 KB |
| `web/data/book5.json` | 452 KB |
| `web/data/book6.json` | 460 KB |

`meta.json` carries what the title screen needs before any book is loaded - the book list,
titles, section counts and each book's `Adventurers.xml`. Anything a rule needs before a
book is chosen belongs there, not in a per-book file.

Section text is bundled **verbatim as text**, not transformed into JSON structure, which
is why these files are large and why there is no lossy conversion step to debug. See
[Architecture](Architecture.md).

---

## Other measurements

| Thing | Count |
|---|---|
| App modules in `web/js/` | 22 |
| Test suites in `web/tests/` | 7 (plus the Node import check) |
| Test assertions | 3,032 |
| Build scripts in `build/` | 8 PowerShell + 1 Python |
| Sections with an `<image>` tag | 3 (four references; section 3.75 has two) |
| Save slots | 20 |
| Carry limit | 12 items |
