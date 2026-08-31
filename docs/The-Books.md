# The Books

[Home](Home.md) | Prev: [Game Rules](Game-Rules.md) | Next: [Architecture](Architecture.md)

Twelve *Fabled Lands* books were planned; six were published and digitised, and those six
are what this port ships. The registry is [`books/books.ini`](../books/books.ini), whose
`Published=` line is the **single source** of which books a build ships - see
[Build Pipeline](Build-Pipeline.md).

---

## Shipped

| # | Title | Region | Sections | Regional map |
|---|---|---|---|---|
| 1 | The War-Torn Kingdom | Sokara | 680 | `Sokara-Map.JPG` |
| 2 | Cities of Gold and Glory | Golnir | 786 | `Golnir-Map.JPG` |
| 3 | Over the Blood-Dark Sea | The Violet Ocean | 718 | `VioletOcean-Map.JPG` |
| 4 | Devils & Howling Darkness | The Great Steppes | 709 | `GreatSteppes-Map.JPG` |
| 5 | The Court of Hidden Faces | Uttaku | 724 | `Uttaku-Map.JPG` |
| 6 | Lords of the Rising Sun | Akatsurai | 752 | `Akatsurai-Map.JPG` |
| | | | **4,369** | |

All six are fully playable end to end, and every section of every one of them is rendered
on each test run (see [Testing](Testing.md)).

Section counts are the `^\d+[a-z]?\.xml` files in each book folder. The lettered suffixes
are real - the books contain sections such as `12a` - and any census that assumes plain
integers will undercount.

---

## Registered but not shipped

| # | Title |
|---|---|
| 7 | The Serpent-King's Domain |
| 8 | The Lone and Level Sands |
| 9 | The Isle of a Thousand Spires |
| 10 | Legions of the Labyrinth |
| 11 | The City in the Clouds |
| 12 | Into The Underworld |

These are listed in `books.ini`'s `Books=` line but not in `Published=`, and no XML exists
for them. The corpus links into them anyway, because the printed books do. Such a link is
**detected and shown as a friendly "not included in this edition" message** rather than a
dead end - the engine reads which books a build bundles from `edition.js`, so this needs no
XML loader and works from any rule module.

Publishing a book is a **content change to `Published=`**, never a build-script edit. That
one line drives validation, the per-book JSON, the copied maps and art, `sw.js`'s offline
inventory and the every-section test scan.

---

## What is in a book folder

```
books/book1/
  1.xml, 2.xml, ... 680.xml   the sections - SOURCE OF TRUTH
  Adventurers.xml             the six pre-made characters and starting profile
  New.xml                     new-character text
  Andriel.xml, Astariel.xml,  the six pregen biographies (names vary per book)
    Chalor.xml, ...
  book.ini                    inherited metadata - read by NOTHING (see below)
  Sokara-Map.JPG              the regional map
  book1-cover-large.jpg       cover art
  temp/                       superseded working copies - nothing walks this
```

Only the `^\d+[a-z]?\.xml` files are sections. The other XML files are **not** sections,
and counting them inflates any census by 48 across the six books - see
[Corpus Census](Corpus-Census.md), which exists because two filed tasks quoted inflated
numbers.

`temp/` holds superseded working copies. A file declaring a `<section name=>` that is not
its own filename **fails the build gate** if it sits in the book folder itself, because
such a file reads as a second copy of a live section.

`book.ini` is inherited from the reference `java-engine/` data format and **nothing in this
port reads it yet** - no script under `build/` opens the file, so `Map`, `Map.Title`, `Death`,
`Codewords` and `Icon` currently reach neither the build nor the app.

Do not read `Map=` as the declaration of that book's regional map: the build picks the map by
the **`-Map$` basename pattern** instead, which is why book 3's `Map=Violet Ocean.JPG` names
no file on disk while `VioletOcean-Map.JPG` ships as `book3.jpg`. That one stays
pattern-driven on purpose (task 322) - a pattern is re-checked against the directory on every
build, so it cannot drift the way that value did.

The rest of the file is a different matter, because unread is not the same as worthless:
`Map.Title` holds a written-for-the-map caption the Maps modal does not use (book 3's is "The
Ports & Anchorages of the Violet Ocean", where the modal shows the book title "Over the
Blood-Dark Sea"), and `Codewords=` holds the authoritative per-book codeword list that no
build check consults. Both are filed - tasks 324 and 325.

---

## Art

**Regional maps** for all six books ship, copied by the build to
`web/assets/maps/book<N>.jpg` and shown in the in-game Maps viewer alongside the world map.

**Section illustrations**: exactly three are referenced by an `<image>` tag in the shipped
corpus, and all three ship -

| Illustration | Section |
|---|---|
| Forest of the Forsaken | 1.200 |
| Map of Bazalek Isle | 3.75 (referenced twice in that section) |
| The Black Diptych | 5.410 |

**General per-section art** (e.g. `142.jpg`) is *not* part of this repository, so that
inline art is skipped gracefully. If you obtain those files, drop them in
`web/assets/illus/` named as the XML references them and they appear automatically - no
code change needed.

---

## Editing a book

The one rule that matters, from [`AGENTS.md`](../AGENTS.md):

> Edit these - but **only ever to ADD rules markup, never to reword the book.**

The port re-creates the printed gamebook as-is; the section text is the author's, not
ours. A tag **wraps** the printed instruction and never replaces it:

```xml
<tick>place a tick in it now</tick>
<gain shards="20">gain 20 Shards</gain>
```

A bare self-closing tag where the book printed words makes the renderer substitute generic
filler - a bare `<tick/>` prints "tick the box" - which silently loses the wording. Watch
the sentence boundary too: write `</if> <else>`, not `</if><else>`, or two printed
sentences run together.

**Check before committing** by stripping tags from the old and new file and diffing the
remaining prose. It should be byte-identical apart from the markup you added. Full detail
is in [Contributing](Contributing.md) and the tag vocabulary is in
[XML Tag Reference](XML-Tag-Reference.md).
