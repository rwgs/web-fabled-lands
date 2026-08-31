# A pin at the port you are docked at

**Status: not started.** Nothing is in flight as of 2026-08-31. The backlog carries one
open item (task 320, a documentation correction to the very phase planned below), and the
next feature is `ROADMAP.md`'s phase 1, planned here so the work can begin without
rederiving it.

Replaced when the next non-trivial change begins, so anything that must outlive this change
is promoted first: decisions that constrain future work to `DECISIONS.md`, and verified
facts that change how the project is understood to `AGENTS.md` or `SPEC.md`.

## Problem

The Maps modal (`showMaps`, `web/js/app.js:1152`) shows the six regional maps and the world
map as flat images. Nothing on them says where the player is, so the player works out their
own position from the prose - which the printed books support with a paper map and a finger,
and this port currently does not support at all.

The blocker is data rather than code. Nothing in the corpus carries a position: the maps are
hand-drawn label illustrations with no grid or section numbers, none of the 4,369 shipped
section files has a location attribute, and the reference `java-engine/` has no map data
either.

One positional fact does exist. `state.data.location` is the current dock - declared at
`web/js/state.js:120` and written by `arriveAtDock` at `web/js/state.js:1118` - covering
**25 named ports across 97 sections**. This phase spends that and adds nothing to the
corpus; roadmap phases 2 and 3 build the datasets that do not exist yet.

## Constraints discovered

Verified against the tree on 2026-08-31. The first three correct figures `ROADMAP.md`
currently prints, which is what task 320 is filed to fix.

- **97 sections set a dock, not 96, and they do it two ways.** 94 carry `<section dock=>`;
  three more set it through `<set dock=>` alone - `books/book3/367.xml`,
  `books/book3/405.xml`, `books/book5/634.xml`. A census written against `<section dock=>`
  misses those three. Confirmed by grep over the shipped corpus.
- **25 unique dock names**, which is the whole gazetteer phase 1 has to supply.
- **The Maps modal is reachable before any book is loaded** - the title-screen Maps button
  at `web/js/app.js:250`. Coordinates must therefore ride in `meta.json`, the payload that is
  always present, and **not** in a per-book JSON.
- **`.map-img` is `max-height: 62vh` with automatic width** (`web/css/style.css:507`), so the
  rendered image box changes size with the viewport. Percentage offsets have to resolve
  against the image, not against `.map-view`, which is a plain `text-align: center` wrapper
  (`style.css:506`).
- **`data.location` is `null` inland and at sea**, which is most of the game.
- **`book.ini` is not a precedent for a build-read `.ini`.** It sits in each book folder and
  declares `Map=`, but nothing under `build/` opens it, so that key is inert - the build picks
  each regional map by the `-Map$` basename pattern, which is why book 3's
  `Map=Violet Ocean.JPG` names no file that exists. `places.ini` needs a reader written for
  it, and writing one does not make `Map=` live.

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
  Rejected alternative: putting coordinates in the section XML, which would mean editing 97
  section files to add data the printed book does not contain - against the rule that markup
  only wraps what is printed.
- No source-XML change and no save-format change, so nothing here can affect existing saves.

## Verification

Automated:

- `pwsh -File build/build-data.ps1`, then `build/run-tests.ps1` to `RESULT ALL PASS`, with
  an assertion count no lower than today's **3,032**.
- A `suite-corpus` assertion that **every** dock value in the corpus resolves to a gazetteer
  entry. It must census **both** `<section dock=>` and `<set dock=>` - catching the failure
  where the three `<set>`-only sections are silently skipped and the assertion passes over a
  corpus it did not fully walk.
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
