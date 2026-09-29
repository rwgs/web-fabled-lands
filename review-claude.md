# Fabled Lands — Repository Review (Claude)

Review text lives in this file from 2026-09-29 on. `REVIEW.md` is the earlier dated review
(2026-07-09, every finding closed) and is left as written. Each pass below is a dated record:
findings stay as written, and a later fix is noted against the finding rather than replacing it.
Every finding is filed in [`TASKS.md`](TASKS.md) under the stable ID given. Citations name the
function, key or selector and link the file, per AGENTS.md's documentation rule.

---

## Pass 1 — 2026-09-29, whole repository

**Scope.** The rule modules (`state.js`, `engine.js`, `combat.js`, `market.js`), the app shell
(`app.js`), the renderer's lifecycle and persistence (`render.js`), `data.js`, the service worker
(`sw.js`, `sw-cache.js`), the build and gate scripts (`build-data.ps1`, `stamp-version.ps1`,
`validate-source.ps1`), CI (`.github/workflows/smoke.yml`), the living documents (`README.md`,
`ROADMAP.md`, `PLAN.md`, `SPEC.md`, `docs/`), and the live deployment's HTTP headers.

**Baseline.** The working tree was clean at the start. `build-data.ps1` is a byte-for-byte no-op,
and `run-tests.ps1` prints `RESULT ALL PASS pass=3223 fail=0`, the same count the 2026-09-26 pass
recorded. `main` is 8 commits ahead of `origin/main`. The last CI run was 2026-09-03 and passed.

**Summary.** The rules layer is in very good shape. The areas earlier passes worked hardest
(affliction families, modifier modes, visit persistence, transactional navigation) held up under
reading, and several suspicions dissolved on inspection (see *Checked and cleared*). The most
serious finding sits outside the rules, in the deployment path: the service worker can fill a
new build's cache with the previous build's files. The rest are one real UI bug, a CI runtime
problem that surfaces on the next push, and a set of Low hardening and documentation items.

### High

**359 — The service worker can install a stale or mixed shell under a new version key.**
`sw.js`'s `install` listener precaches with `cache.addAll(REQUIRED)` and `cache.add(url)`. Both
use the default request cache mode, so every precache request can be answered by the browser's
HTTP cache or by the CDN. The live host is Cloudflare in front of GitHub Pages. Measured on
2026-09-29:

| URL | `Cache-Control` | `cf-cache-status` |
|---|---|---|
| `web/js/engine.js` | `max-age=14400` | `HIT` |
| `web/js/version.js`, `web/sw.js` | `max-age=14400` | `MISS` |
| `web/data/book1.json` | `max-age=600` | `DYNAMIC` |

The browser re-fetches the worker script itself past its own cache, so a new `sw.js` is noticed,
but the worker's precache can then be filled with the previous build's bytes for up to four
hours. The consequences:

- **The new cache holds old files.** `FLCache.prune` then deletes the previous cache, so the
  player keeps an old build (or a mix of two) labelled with the new version until the next
  deploy.
- **A mix of modules from two builds can fail at module link.** A new module importing an export
  the stale one lacks stops the app booting at all while offline.

`importScripts('./js/sw-cache.js')` has the same exposure under the default
`updateViaCache: 'imports'`. No earlier task considered this: tasks 8, 64, 138, 179, 190 and 206
all assume `addAll` fetches the deployed bytes. `cache: 'reload'` alone is not enough, because it
bypasses the browser's cache but not Cloudflare's. The precache has to fetch a URL unique to the
build and store the response under the plain URL the app requests.

### Medium

**360 — The header's "Save & quit" discards a `?demo=` preview while saying it saved.**
`buildGameScreen`'s 💾 handler in `app.js` calls `state.save(true)` and goes to the title screen
when that returns true. `GameState.save` returns true for an ephemeral game *before* it looks at
`explicit`, so the preview is dropped without a word. The ☰ menu gets this right: it offers
"Keep this adventure" when `state.ephemeral` is set. The header button is one of the controls the
narrow-chrome policy keeps on phones (task 191), so it is the one a mobile player reaches for.

**361 — CI pins the Node 20 runtime that GitHub removed on 2026-09-23.** `smoke.yml` uses
`actions/checkout@v4` (all three jobs) and `actions/setup-node@v4` with `node-version: '20'`.
GitHub's changelog of 2025-09-19 moved runners to Node 24 by default on 2026-06-16 and removed
Node 20 on 2026-09-23. Node 20 itself reached end of life on 2026-04-30. Nothing has run on the
new runners yet, so the next push of the 8 local commits is the first test.

### Low

**362 — The source gate folds case on tag and attribute names.** `validate-source.ps1`'s
`FL_TAG_ATTRS` is a plain `@{}` hashtable, `Test-XmlDoc` checks the root with `-ne`, and
`Test-XmlVocabulary` checks attributes with `-notcontains`. All three are case-insensitive. The
engine is not: XML-DOM `getAttribute` and `querySelectorAll` are exact-case, and 16 attributes
are camelCase (`playerFirst`, `safeAddGod`, `titlePattern`, `useCache`, `initialCrew`…). So
`<fight playerfirst="f">` or `<goto Section="5"/>` validates and is then silently ignored. That
is the class task 338 closed for codeword values, and the shape of task 37's `safeAddGodd` typo.
A census of the shipped corpus finds exactly one affected file: `books/book3/207.xml`, whose root
is `<SECTION>` with three `<P>`. It renders only because `renderElement` lowercases the tag;
every other spelling in the corpus is unique by case.

**363 — Two engine paths ignore attributes the corpus has not used yet, and nothing pins that.**
The headless `walkEffectBody` in `engine.js` has two gaps:

- **`<difficulty>`:** it calls `rollDifficulty` with no mode and drops a numeric `modifier=`.
  `renderDifficulty` honours both.
- **`<random>` with no `dice=`:** it rolls 2 dice, where `renderRandom` infers 1 die from a
  following 1–6 outcomes table.

`walkEffectBody` runs the bodies of `<fightdamage>`, `<fightround>`, `<flee>`, item Use effects
and `<bookchange>`.

`groupFightRound` in `combat.js` ignores `playerFirst=`, never runs a `<fightround>`, and lets
enemies keep striking after a `<fightdamage>` has recorded a redirect. `fightRound` handles all
three.

Neither gap has a shipped site today. The corpus has 8 roll nodes inside effect bodies, all with
`dice=` and none with `modifier=`, and 4 group fights (book 6 §192, 273, 291, 618) that carry only
`combat/defence/group/name/stamina`. But the gate accepts every one of these shapes, so a future
node would validate cleanly and then behave differently inside a body than on the page.

**364 — `sanitizeData` keeps malformed resurrection deals, and defaults a missing book to 1.**
`sanitizeData` maps `resurrections` without dropping anything, so an imported `[{}]` becomes a
deal with a null section. On death, "Use resurrection" then navigates nowhere, refunds the deal,
and re-prompts in a loop. Separately, the `resurrections` and `extraChoices` entries default a
missing `book` to `out.book` before `out.book` is assigned further down, so the default is always
book 1. Only a hand-edited or imported save reaches either path. It still breaks the function's
own promise that bad entries are dropped.

**365 — `GameState.adjustStaminaMax` is dead, and clamps to the wrong ceiling.** It has no
caller anywhere in `web/`. Its clamp uses the written maximum, which task 158 corrected to the
effective maximum in its sibling `adjustAbilityStamina`, so a future caller would reintroduce
that bug.

**366 — README's deploy guidance and file tree disagree with the repository.** Three problems:

- **The Pages instruction doesn't exist.** README says "publish the `web/` folder (or set Pages
  to serve `/web`)", but Pages serves a branch root, `/docs` or an Actions artifact, not `/web`.
  This site is actually served from the repository root: the root `CNAME` names
  `webfl.rwgs.net`, and the root `index.html` redirects into `web/` (task 346).
- **The file tree omits `edition.js`**, although the module table below it lists it.
- **The DOM-free module list is short.** The architecture paragraph names five modules and omits
  `state.js` and `visit-state.js`, both of which AGENTS.md's invariant includes.

**367 — Living documents restate the shipped-section count that `docs/Corpus-Census.md` owns.**
`4,369` appears in `ROADMAP.md`, `PLAN.md`, `SPEC.md` ("4,369 today"), `docs/Home.md`,
`docs/The-Books.md` and `docs/FAQ-and-Troubleshooting.md`. AGENTS.md's "Don't restate a count
another file owns" is exactly this, and task 355 applied it to the pass count. `PLAN.md`'s
"Nothing is in flight as of 2026-08-31" is the dated-status shape the same rule warns about. The
dated records (`CHANGELOG.md`, `REVIEW.md`) are exempt.

**368 — `TASKS.md` is nine-tenths Review log.** Of its 4,165 lines, 3,763 are the Review log
(123 entries). The workflow already works around this by searching for `- [ ]`, but most entries
re-tell a closed task whose detail is already archived. Whether to archive the older entries is
the owner's call. The task records the proposal and how to do it without losing anything.

### Checked and cleared

These looked wrong on first reading and are not:

- **`sellCargo` with `cargo="?"`** would fail if called directly, but `renderInlineSell` resolves
  the open form to a concrete commodity first, and task 282's §3.538 test drives that path.
- **Undo while the Story still names the undone section.** `Story.serializeVisit` refuses to
  write a record whose section disagrees with `state.data`, so the gap before `begin()` cannot
  persist a mismatched visit.
- **Save-data text reaching `innerHTML`.** Every modal body built from save data goes through
  `escapeHtml`, and modal button labels use `textContent`. An item effect's stored `body` is
  parsed as XML into a detached document and walked by the engine, never inserted.
- **`rankcheck` dice default.** The headless walk and `renderRankcheck` both default to one die.
- **`stamp-version.ps1`** is content-addressed, ordinal-sorted and LF-normalised, and covers
  `web/assets` and `sw.js` without circularity.
