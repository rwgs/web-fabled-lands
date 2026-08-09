# Project roadmap

Ordered outcomes, each one leaving the project in a working state. A phase is a
result rather than a batch of work: if finishing it does not change what the
project can do, it belongs inside another phase. Phases are also the unit that
gets reordered when priorities change, so keep them independent enough to
reorder.

Defects are filed in [`TASKS.md`](TASKS.md) and worked top-down from its priority
buckets. This file carries the *feature* work, which does not fit that backlog: a
phase is picked up from here, and only a defect found while working one gets a
task number.

---

# Player position on the map

Today the Maps modal ([app.js:1142](web/js/app.js#L1142)) shows six regional maps
and the world map as flat images — the player has to work out where they are from
the prose. The three phases below put a marker on the map, each one shipping
something usable on its own.

The blocker is data, not code. Nothing in the corpus carries a position: the
maps are hand-drawn label illustrations with no grid or section numbers, the
4,437 section files have no location attribute, and the reference `java-engine/`
has no map data either. The only positional state that exists is
`state.data.location` — the current dock, set from a section's `dock=`
([state.js:995](web/js/state.js#L995)) — covering 25 named ports across 96
sections. Phase 1 spends that for free; phases 2 and 3 build the datasets that
are missing.

## Phase 1: A pin at the port you are docked at

### Outcome

Opening Maps during play shows a marker on the current book's map at the port the
player is docked at, and the caption names it. Everything else about the modal is
unchanged: other books' tabs, the world map and the not-installed notes all behave
as they do now.

### Included work

- A gazetteer source file per book — `books/book<N>/places.ini`, alongside the
  existing `book.ini` that already declares `Map=` — mapping a place name to `x,y`
  as **percentages** of the map image. Phase 1 only needs the entries for that
  book's dock names.
- Build pass-through into **`meta.json`**, not the per-book JSON: the Maps modal is
  reachable from the title screen before any book is loaded
  ([app.js:250](web/js/app.js#L250)), so the coordinates must be in the payload that
  is always present.
- A `.map-frame` wrapper (`position: relative; display: inline-block`) around the
  `<img>` only, with the caption left outside it, so the marker positions against
  the *rendered* image box. `.map-img` is `max-height: 62vh` with auto width, so the
  rendered size varies with the viewport and percentage offsets must resolve against
  the image, not the modal.
- The marker itself, shown only when the displayed tab is the player's current book.

### Dependencies and risks

- `data.location` is `null` inland and at sea — which is most of the game — so the
  pin is absent far more often than it is present. That is expected here and is what
  phase 3 fixes; it should not be read as the feature being broken.
- Risk: positioning the marker against `.map-view` instead of the image would drift
  as the viewport changes. The `.map-frame` wrapper is the mitigation, and the exit
  criteria below check it at two window sizes.
- No source-XML change and no save-format change in this phase, so nothing here can
  affect existing saves.

### Exit criteria

- Docked at Yellowport in book 1, opening Maps shows the Book 1 tab with a marker
  over Yellowport and a caption naming it; sailing to Marlock City moves it.
- Selecting another book's tab, or the world map, shows no marker.
- The marker stays on its label when the browser window is resized between a tall
  and a short viewport.

### Validation

- `pwsh -File build/build-data.ps1`, then the headless suite to `RESULT ALL PASS`.
- A `suite-corpus` assertion that **every** `dock=` value in the corpus resolves to a
  gazetteer entry — the 25 dock names are a closed set, so this is checkable rather
  than sampled.

## Phase 2: Every named place on the six maps has coordinates

### Outcome

The gazetteer covers every label drawn on all six regional maps — roughly 180
points — not just the 25 ports. Nothing in the app changes yet; this is the dataset
phase 3 needs, and it is independently checkable.

### Included work

- Digitising each map's labels: towns, keeps, forests, rivers, mountains and seas
  (Book 1 alone has ~30 — Yellowport, Marlock City, Devil's Peak, Coldbleak
  Mountain, the Isle of Druids, and so on).
- A throwaway click-to-coordinate helper page to read positions off each image.
  **Not shipped** — it is a scratch tool, kept out of `web/`.
- Extending the source-XML gate ([validate-source.ps1](build/validate-source.ps1))
  to reject a place name with no gazetteer entry, so phase 3's tagging cannot
  introduce a silent typo.

### Dependencies and risks

- The shipped maps are 500px-wide downscales of the source `.JPG`s. Storing
  coordinates as percentages keeps them valid if a higher-resolution scan is
  substituted later; storing pixels would not.
- Book 3 ships two images — `VioletOcean-Map.JPG` is the regional map, while
  `Map of Bazalek Isle.JPG` is a section illustration surfaced by an item's Use
  effect (task 62). Only the former is the Book 3 map; decide explicitly whether
  Bazalek gets its own gazetteer or is out of scope.
- Risk: eyeballed coordinates drift on small labels. The all-pins-at-once visual
  check below is what catches it, and it is cheap to re-run.

### Exit criteria

- Every visible label on each of the six maps has an entry, verified by rendering
  all pins for a book at once over its map and comparing against the image.
- The validator rejects an unknown place name with a message naming the file.

### Validation

- The validator fixture self-test (`build/validate-selftest.ps1`) covers the new
  rejection, keeping it inside the existing CI job.
- Manual: the all-pins overlay, one screenshot per book.

## Phase 3: The pin follows the player inland

### Outcome

The marker tracks the player through the whole game, not just at ports. Entering a
place — a town, keep or named landmark — moves it; ordinary sections leave it where
it was, so it reads as "where you last were" rather than blinking out.

### Included work

- A `place="…"` attribute on `<section>`, added to the closed allowlist in the same
  change (the task-199 rule). The bundled book JSON is `{ "<section>": "<raw xml>" }`,
  so the attribute reaches the client with no other build work.
- `state.data.place`: set on entering a tagged section, **sticky** otherwise, saved,
  restored by undo, and cleared on cross-book travel.
- Tagging the hub sections — roughly 30–60 per book, ~200–350 in total. Only hubs
  need a tag: sub-sections within a town inherit the sticky value. Candidates are
  greppable (section text against the gazetteer names; hubs usually carry `boxes=`
  for their visit counter), but each one needs confirming by eye.
- Caption wording that distinguishes a current position from a stale one, and
  carries the position in text rather than leaving the pin as the only signal.

### Dependencies and risks

- Phase 2 must be complete: a `place=` value with no coordinates cannot be drawn.
- **The tagging is editorial, and it is the largest content change since the
  original transcription.** A wrong tag puts the player somewhere they are not,
  which is worse than showing nothing — so an unsure section is left untagged.
- Teleports, sea voyages and cross-book `<goto book=>` will otherwise strand the
  marker. Clearing on a book change plus "last known" wording is the mitigation.
- Save-schema bump: a save written before this phase has no `place`, and must load
  with the marker simply absent.
- Mild spoiler surface — a pin confirms a location exists once reached. It only ever
  shows where the player *is*, so the exposure is small, but a visited-places trail
  would be a much larger question and is deliberately not in scope.

### Exit criteria

- Playing book 1 from §1 through Yellowport and on to Marlock City moves the pin at
  each hub, and an untagged section in between leaves it in place.
- A cross-book move clears it rather than leaving the previous book's position.
- A save created before this phase loads with no marker and no error.

### Validation

- A `suite-corpus` assertion that every `place=` in every published book resolves to
  a gazetteer entry — it already walks every section, so this is close to free.
- A `suite-render` assertion for the sticky/clear-on-book-change rule over synthetic
  sections, and a save-migration assertion for the pre-phase save.
- Manual: one scripted walk per book against that book's map.
