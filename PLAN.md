# A pin at the port you are docked at

**Status: not started.** Nothing is in flight as of 2026-08-31, and the next feature is
`ROADMAP.md`'s phase 1, planned here so the work can begin without rederiving it. For the
state of the defect backlog, read `TASKS.md`'s open `- [ ]` items — this file deliberately
does not restate a count that file owns, because a figure copied into a document that is
replaced only when the next change begins is guaranteed to rot between replacements
(task 329).

Replaced when the next non-trivial change begins, so anything that must outlive this change
is promoted first: decisions that constrain future work to `DECISIONS.md`, and verified
facts that change how the project is understood to `AGENTS.md` or `SPEC.md`.

## Problem

The Maps modal (`showMaps` in `web/js/app.js`) shows the six regional maps and the world
map as flat images. Nothing on them says where the player is, so the player works out their
own position from the prose - which the printed books support with a paper map and a finger,
and this port currently does not support at all.

The blocker is data rather than code. Nothing in the corpus carries a position: the maps are
hand-drawn label illustrations with no grid or section numbers, none of the 4,369 shipped
section files has a location attribute, and the reference `java-engine/` has no map data
either.

One positional fact does exist. `state.data.location` is the current dock - declared in
`web/js/state.js`'s starting `data` shape and written by `arriveAtDock` in the same file -
covering **25 named ports across 94 sections**. This phase spends that and adds nothing to the
corpus; roadmap phases 2 and 3 build the datasets that do not exist yet.

## Constraints discovered

Verified against the tree on 2026-08-31.

- **94 sections move the player, and they do it one way - `<section dock=>`.** That is the
  attribute `arriveAtDock` reads, and the only thing that writes `data.location`. Three
  further sections carry `<set dock=>` and no `<section dock=>` - `books/book3/367.xml`,
  `books/book3/405.xml`, `books/book5/634.xml` - but the `dock` arm of `applySet` in
  `web/js/engine.js` berths the **current ship** and returns without touching
  `data.location`, so a pin never follows them. A census of "every section with a `dock=`
  attribute" counts those three in and reaches 97; the pin's census is 94.
- **25 unique dock names**, which is the whole gazetteer phase 1 has to supply.
- **The Maps modal is reachable before any book is loaded** - the title-screen Maps button
  (`bMap` in `web/js/app.js`, whose handler calls `showMaps(null)`). Coordinates must
  therefore ride in `meta.json`, the payload that is always present, and **not** in a
  per-book JSON.
- **`.map-img` is `max-height: 62vh` with automatic width** (the `.map-img` rule in
  `web/css/style.css`), so the rendered image box changes size with the viewport. Percentage
  offsets have to resolve against the image, not against `.map-view`, whose rule in the same
  file makes it a plain `text-align: center` wrapper.
- **`data.location` is `null` inland and at sea**, which is most of the game.
- **`book.ini`'s `Map=` is not a precedent for a build-read key.** It sits in each book folder
  and declares `Map=`, but that key is inert - the build picks each regional map by the
  `-Map$` basename pattern, which is why book 3's `Map=Violet Ocean.JPG` names no file that
  exists. The file is not wholly unread: `validate-source.ps1` parses its `Codewords=` list
  (task 325) and `build-data.ps1` its `Map.Title=` caption (task 324), so a Java Properties
  reader with continuation and `\uXXXX` handling already exists under `build/` and
  `places.ini` can follow its shape. Two live keys still do not make `Map=` live - each was
  read because it holds something the filesystem cannot answer, which is the test `Map=` fails.

## Approach

1. **A gazetteer source file per book** - `books/book<N>/places.ini`, alongside the existing
   `book.ini`. It maps a place name to `x,y` as **percentages** of that book's map image.
   Phase 1 only needs the entries for that book's dock names.
2. **Build pass-through into `meta.json`** in `build/build-data.ps1`, for the
   reachable-before-load reason above. `places.ini` is new source, so
   `build/validate-source.ps1` gains its shape in the same change - it is not XML, so this is
   a new check rather than a vocabulary row.
3. **A `.map-frame` wrapper** (`position: relative; display: inline-block`) around the
   `<img>` only, with the caption left outside it, so the marker positions against the
   rendered image box.
4. **The marker itself**, drawn only when the displayed tab is the player's current book,
   with the caption naming the port.

Reuse rather than re-derive: `arriveAtDock` is already the single writer of
`data.location`, so nothing new needs to track position.

## Trade-offs

- **The pin is absent more often than it is present**, because `data.location` is null
  inland and at sea. That is expected here and is what roadmap phase 3 addresses; it should
  not be read as the feature being broken. Worth stating in the UI copy rather than leaving
  the player to wonder.
- **Positioning the marker against `.map-view` instead of the image would drift** as the
  viewport changes. The `.map-frame` wrapper is the mitigation, and the exit criteria check
  it at two window sizes.
- **Coordinates are hand-measured**, so they are approximate by construction and a wrong one
  is invisible to any automated check. The corpus assertion below catches a *missing* entry,
  never a misplaced one.
- **`places.ini` is a second source format** alongside the XML corpus and `books.ini`.
  Rejected alternative: putting coordinates in the section XML, which would mean editing 94
  section files to add data the printed book does not contain - against the rule that markup
  only wraps what is printed.
- No source-XML change and no save-format change, so nothing here can affect existing saves.

## Verification

Automated:

- `pwsh -File build/build-data.ps1`, then `build/run-tests.ps1` to `RESULT ALL PASS`, with
  an assertion count no lower than today's **3,032**.
- A `suite-corpus` assertion that **every** dock value in the corpus resolves to a gazetteer
  entry. It must census **all four** dock-bearing attributes - `<section dock=>`,
  `<section todock=>`, `<set dock=>`, `<if docked=>`, as `ROADMAP.md`'s phase 1 table lists
  them - catching the failure where the arms a `<section dock=>` census cannot see are
  silently skipped and the assertion passes over a corpus it did not fully walk.
- A `release-selftest.ps1` case if `places.ini` becomes a per-book output, so a withdrawn
  book's gazetteer is reconciled like its map.

Manual, because they are visual:

- Docked at Yellowport in book 1, opening Maps shows the Book 1 tab with a marker over
  Yellowport, captioned with its name; sailing to Marlock City moves it.
- Selecting another book's tab, or the world map, shows no marker.
- The marker stays on its label when the window is resized between a tall and a short
  viewport. This is the check that would catch the `.map-view` mistake above.

Cannot be verified here: that a hand-measured coordinate sits on the right label. Only
looking at the map proves that.
