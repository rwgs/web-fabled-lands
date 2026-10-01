# Fabled Lands - Repository Review (Codex)

## Review of 2026-10-01

Reviewed commit `5f0de66`, starting from a clean working tree. This pass records
findings and proposed validation; it does not change the app, book prose, rules,
build scripts or generated data. New findings are filed as tasks 371-381 in
[TASKS.md](TASKS.md). Existing tasks 369 and 370 remain open.

The existing checks pass and the rebuild produces no generated drift. The most
important finding is a false-pass path in the test infrastructure: a late
asynchronous failure can leave both runners reporting success. Seven medium
findings concern persistence, unsaved updates, asset selection and incomplete
character-creation data. Three low findings concern source-value validation and
documentation that no longer matches the implementation.

### Scope and method

- Read the repository instructions, working-tree state, current backlog and prior
  review before editing.
- Inspected the rule layer in [state.js](web/js/state.js),
  [engine.js](web/js/engine.js), [combat.js](web/js/combat.js),
  [market.js](web/js/market.js) and [rules.js](web/js/rules.js).
- Reviewed the app/data shell, renderer lifecycle, transaction and return-frame
  handling, visit serialization, navigation gates, roll/reward/economy/combat
  views, modal handling and narration integration.
- Reviewed the service worker, cache policy, manifest, build/stamp/source gate,
  release reconciliation, local test runner, CI and static deployment configuration.
- Ran the complete browser suite, DOM-free import check and all three script
  fixture suites. Ran the data build and checked generated output for changes.
- Used independent Node probes for persistence and market failures, a temporary
  PowerShell fixture for source-gate omissions, and the harness's own error
  handler for the late-fatal failure. These probes did not modify game sources.
- Checked the player/maintainer guides against the code paths reviewed. Source
  references below name symbols and link files, without line-number anchors.

This is a review of the repository's shipped edition. The shipped-section set
and its reproducible census are owned by
[Corpus Census](docs/Corpus-Census.md#sections-per-book). The build and corpus
scan used the published edition, excluding parked `temp/` copies and non-section
XML. This pass did not compare every printed sentence with an original book or
exercise every branch and character state in every section.

### Validation results

All commands below completed successfully with exit code 0. The PowerShell
checks ran with PowerShell 7 after sandboxed access to the installed executable
failed; the ordinary approval path allowed the documented scripts to run.

| Check | Command | Observed result |
|---|---|---|
| Full browser suite | `pwsh -ExecutionPolicy Bypass -File build/run-tests.ps1` | `RESULT ALL PASS pass=3248 fail=0` |
| DOM-free import boundary | `node web/tests/node-import.mjs` | `RESULT ALL PASS pass=35 fail=0` |
| Source-gate fixtures | `pwsh -ExecutionPolicy Bypass -File build/validate-selftest.ps1` | `RESULT ALL PASS pass=67 fail=0` |
| Release/build fixtures | `pwsh -ExecutionPolicy Bypass -File build/release-selftest.ps1` | `RESULT ALL PASS pass=59 fail=0` |
| Windows runner fixtures | `pwsh -ExecutionPolicy Bypass -File build/run-tests-selftest.ps1` | `RESULT ALL PASS pass=25 fail=0` |
| Source build | `pwsh -ExecutionPolicy Bypass -File build/build-data.ps1` | Source validation passed; stamp/inventory already current; generated output unchanged |

These are dated observations, not a permanent expected assertion count. The
source build checked sections plus starting-character/biography/rules files;
its checked-file total is not a shipped-section count.

The full suite's passing report does not invalidate finding 380: the independent
probe deliberately triggers a post-report error that the normal run did not
deliberately inject. The runner fixtures cover environment failures but do not
cover this verdict-extraction failure.

The final run retained a fresh DOM dump. Its live title was `TESTS_OK`, its
results element held the reported numeric passing verdict, and that element
contained no `FAIL`, `FATAL` or `ASYNC-FATAL` entries. The corpus rendering check
also reported success over the section set recorded in Corpus Census.

An interactive browser connection was unavailable. Visual inspection, keyboard
walkthroughs and viewport checks were therefore not completed. The repo's
automated Chromium suite did run. Live hosting, dashboard settings, a real
service-worker update across deployed builds and mobile installation were not
verified; task 370's cutover checks remain outstanding.

### Findings by priority

| Task | Priority | Finding |
|---|---|---|
| 380 | HIGH | Late asynchronous test failures can still pass both runners |
| 371 | MEDIUM | Wrong-shaped metadata can prevent intact saves being recovered |
| 372 | MEDIUM | Sales silently choose between meaningfully different assets |
| 373 | MEDIUM | Failed preview promotion consumes another slot on each retry |
| 374 | MEDIUM | Automatic updates can reload away unsaved play |
| 375 | MEDIUM | Concurrent tabs silently overwrite the same save |
| 376 | MEDIUM | Missing or empty starting-character data passes the source gate |
| 377 | MEDIUM | Blocked storage reads escape the recovery path |
| 378 | LOW | Several boolean attributes bypass value validation |
| 379 | LOW | Accepted enum forms disagree with their runtime readers |
| 381 | LOW | Player rule summaries describe superseded behavior |

### 380 - Late asynchronous failures can pass the release gate

**Evidence.** After a completed passing report, `flFatal` in
[web/_test.html](web/_test.html) changes the title to `TESTS_FAIL` and prepends:

```text
RESULT FAILURES (async error after report) pass=? fail=1
ASYNC-FATAL late rejection
RESULT ALL PASS pass=3248 fail=0
```

The old passing result remains underneath. The verdict extraction in
[run-tests.ps1](build/run-tests.ps1) and `RESULT_LINE` in
[smoke.yml](.github/workflows/smoke.yml) requires the exact numeric form
`RESULT (ALL PASS|FAILURES|FATAL) pass=N fail=N`. It skips the new failure header
and selects the old `ALL PASS`. Neither success branch checks `TESTS_FAIL`.

**Verification.** Executed the actual classic bootstrap script from the harness
in Node's `vm` with a completed passing results element, then invoked `flFatal`.
The title became `TESTS_FAIL`; the runners' matching pattern still extracted
`RESULT ALL PASS pass=3248 fail=0`. A delayed rejected promise or a post-report
failing `ok` reaches this handler.

**Impact.** Local validation and the CI job that gates deployment can accept a
page the harness has marked failed. This compromises the intended sticky-fatal
contract, rather than merely mislabeling a failure.

**Recommended correction.** Keep the failure verdict machine-readable and make
the runners read the current live report. Add end-to-end runner cases for a late
rejection and a late assertion failure, retaining the existing bootstrap and
cut-short distinctions. Address this before relying on new regression checks.

### 371 - Valid JSON can still break save-index recovery

**Evidence.** `loadSlotMeta` in [state.js](web/js/state.js) catches parse errors
but accepts every successfully parsed shape. `reconcileSlotMeta` immediately
indexes the result. `showTitle` in [app.js](web/js/app.js) calls this on boot.

**Verification.** With an intact `fl_save_0` in an isolated storage stub and
`fl_meta` set to the literal `null`, reconciliation throws
`Cannot read properties of null (reading '0')`. A JSON string also survives
unchanged as the alleged metadata index; its character entries can appear as
meaningless save cards rather than recovering the real slot.

**Impact.** Otherwise readable adventures can become inaccessible through the
normal title/save UI. The existing repair mechanism cannot start from an index
of the wrong shape.

**Recommended correction.** Validate both index and slot-entry shapes before
using them, then reconstruct readable metadata from blobs. Cover null,
primitives, arrays and malformed entries. Preserve unreadable blobs as occupied.

### 372 - Sale candidates are not always interchangeable

**Evidence.** `sameCandidate` and `sellPlan` in
[market.js](web/js/market.js) compare ships by hull type, cargo count and name.
They omit crew quality and cargo contents. The item comparison omits effects
and their remaining uses. `renderShopRow` in
[render-market.js](web/js/render-market.js) shows its picker only when
`needsChoice` is true.

**Verification.** Two empty barques named `Ship`, with excellent and poor crews,
produce `needsChoice: false`. Selling with the excellent vessel first in the
fleet removes it and retains the poor one. Two otherwise equal items carrying
three-use and one-use effects also produce `needsChoice: false`.

**Impact.** A normal sale can silently discard upgraded crew, a different cargo
holding or a more useful possession. The equal default ship names make this
reachable without editing a save. Existing sale tests distinguish empty/laden
ships and named equipment but omit these differences.

**Recommended correction.** Include meaningful crew, cargo and effect state in
the equivalence decision. Test the real picker and verify that only the player's
chosen asset is removed, while genuinely equal assets still need no picker.

### 373 - Failed Keep retries fill slots with duplicate previews

**Evidence.** `GameState.keep` in [state.js](web/js/state.js) restores the old
slot and ephemeral flag when saving fails. It does not roll back a blob written
before the metadata write failed. `nextFreeSlot` correctly treats that blob as
occupied, and `reconcileSlotMeta` can later list it.

**Verification.** An isolated storage stub allowed `fl_save_<slot>` writes and
threw `QuotaExceededError` on `fl_meta`. Three Keep attempts left
`fl_save_0`, `fl_save_1` and `fl_save_2`, while the current adventure remained
ephemeral and every attempt reported failure.

**Impact.** Retrying the recovery action can consume all available slots and
leave duplicate adventures, making the storage problem harder to recover from.

**Recommended correction.** Handle partial promotion coherently. Repeated
failures must not claim additional slots; recovery should leave one current,
discoverable adventure and preserve export of the live preview on failure.

### 374 - Update reloads assume all game progress is saved

**Evidence.** `buildGameScreen` in [app.js](web/js/app.js) unconditionally calls
`swUpdateGate.hold(false)`. `registerSW` sends `controllerchange` to
`makeUpdateGate.apply`, which reloads immediately while the gate is released.
Only the creation draft currently takes a hold.

**Verification.** The actual gate reloads once after `hold(false)` and `apply`.
Tracing its callers shows that this is also the policy for an ephemeral demo
and for an adventure whose save-status channel reports failure. The preview's
`GameState.save` deliberately writes nothing. This was a logic replay and call
site review; no real deployed controller-change was induced.

**Impact.** An update can restart an unkept preview or restore an older save
over newer in-memory progress. The player did not choose to abandon that play.
The existing gate tests explicitly assert release for the entire game screen,
so they encode the missing assumption rather than detect it.

**Recommended correction.** Hold updates while the live adventure is unsaved,
then release after coherent persistence or deliberate abandonment. Cover Keep,
failed autosave and recovery as behavioral cases in the app shell.

### 375 - Two writers silently replace each other's progress

**Evidence.** `GameState.load` and `GameState.save` in
[state.js](web/js/state.js) use whole-state snapshots with no stored-revision or
ownership check. [app.js](web/js/app.js) has no handling for a save changed by
another tab.

**Verification.** Loaded two independent states from a slot containing 100
Shards. The first earned 50 and persisted 150. The second lost one Stamina;
its autosave restored the purse to 100 and persisted the damage, silently
discarding the first writer's progress.

**Impact.** Playing the same adventure in two tabs, or a tab and an installed
copy sharing the origin, creates silent lost updates. Whole game histories
cannot safely be merged as independent numeric deltas.

**Recommended correction.** Detect stale writes or conflicting ownership and
offer reload/export recovery before replacing the stored adventure. Verify with
two independent states and actual tabs; preserve both live snapshots.

### 376 - The source gate accepts unusable starting data

**Evidence.** `Test-SourceTree` in
[validate-source.ps1](build/validate-source.ps1) checks `Adventurers.xml` only
when it exists and validates its vocabulary rather than its required shape.
The build can emit null or empty starting data. `showCreate` uses the result of
`getAdvData` in [app.js](web/js/app.js), and its creation path and
`GameState.create` in [state.js](web/js/state.js) assume professions and items
exist. The corpus suite initializes its scanner
from book 1, rather than checking creation for every published book.

**Verification.** A temporary book-2 fixture with one valid section and
`Codewords=Bounty` produced zero gate errors with no Adventurers file. Replacing
that absence with `<adventurers/>` also produced zero errors. Passing missing
starting data to creation throws while accessing profession scores.

**Impact.** A book can pass the source gate and, when it is not the scanner's
initial book, escape the creation-data assumption in the smoke tests. Players
then fail when selecting that book for New Adventure. The current edition's
files are present; this is a confirmed build-contract gap.

**Recommended correction.** Require usable Adventurers data for each published
book. Validate the fields the app reads and exercise each book's offered
professions with that book's own data. Add missing/empty mutation fixtures.

### 377 - Storage-read failures bypass player recovery

**Evidence.** `nextFreeSlot` in [state.js](web/js/state.js) performs an unguarded
storage read. `GameState.load` performs its first read before the `try` block.
New Adventure calls slot discovery before creating a character or reaching the
app's save-failure warning.

**Verification.** A storage reader throwing `SecurityError` makes both
functions throw. The guarded metadata and blob readers elsewhere do not contain
these exceptions.

**Impact.** A browser that denies storage reads prevents the intended
warn-and-continue/export path, despite write failures having such recovery.

**Recommended correction.** Treat unavailable storage as an explicit state and
provide a recovery action. Do not mistake unreadable storage for free slots;
recovery must not overwrite unknown adventures. Add read-failure cases.

### 378 - Some boolean typos pass validation and change rules

**Evidence.** `FL_BOOL_ATTRS` and `Test-AttrValue` in
[validate-source.ps1](build/validate-source.ps1) omit `choice.pay`,
`choice.flee` and `fightround.pre` value checking.

**Verification.** The validator accepts `pay="tru"`, `flee="tru"` on a choice
and `pre="tru"` on a round hook. `choiceGate` in
[render-rules.js](web/js/render-rules.js) treats the first as explicit false:
the 20-Shard requirement remains, but `payChoiceCost` returns success with a
100-Shard purse still holding 100. The other readers similarly treat their
misspellings as false.

**Impact.** An authoring typo can waive a cost, suppress a flee action or move a
pre-round consequence after the exchange. This is a fixture-level validation
gap, not a reported typo in a shipped section.

**Recommended correction.** Validate by tag where attribute meanings differ.
In particular, `fight.flee` is a numeric victory threshold and must remain
legal; a global boolean restriction on `flee` would break it.

### 379 - Enum validation promises forms readers do not understand

**Evidence.** `Test-AttrValue` in
[validate-source.ps1](build/validate-source.ps1) folds enum casing and allows
pipe unions generally. Several consumers read a single exact token.

**Verification.** Direct gate and engine probes gave these results:

| Accepted value | Actual runtime behavior |
|---|---|
| `tick.special="ATTACK"` | `applySpecial` grants no attack bonus; `attack` grants the expected 3 |
| `tick.special="difficultycurse"` | Does not set the one-die curse; `difficultyCurse` does |
| `if.crew="EXCELLENT"` | Does not match a ship with an excellent crew |
| `difficulty.modifier="natural\|noarmour"` | `difficultyModifier` returns no mode and a zero addend |

The readers are `applySpecial`, `evaluateCondition` and `difficultyModifier` in
[engine.js](web/js/engine.js). No mis-cased shipped node was identified as a
current gameplay defect in this pass.

**Impact.** These authoring errors survive the gate as silent no-ops or altered
checks, including an affected score where a modifier was intended to remove
bonuses.

**Recommended correction.** Align accepted casing and list shapes with each
reader. Retain legitimate unions on selectors that support them, and add
negative fixtures plus positive runtime controls.

### 381 - Player documentation describes older rule behavior

**Evidence.** The Combat summary in [README.md](README.md) and Defence formula
in [Game Rules](docs/Game-Rules.md) say "best armour". Game Rules and
[Playing the Game](docs/Playing-the-Game.md) say only the best bonus of a kind
applies. `setEquipped`, `wieldedWeapon` and `wornArmour` in
[state.js](web/js/state.js) honor an explicit player selection even when it is
weaker; strongest equipment is the fallback.

Game Rules also says fight bonuses never survive a save, while
`fightBonusSnapshot`, `restoreFightBonus` and the visit record preserve them
for a mid-fight reload. Its statement that all six modifier modes are honored
by every reader conflicts with `Test-AttrValue` restricting `current` to
`adjust` and `difficulty`.

**Impact.** The guides give players and future maintainers the wrong expected
Defence, equipment-selection and resume behavior.

**Recommended correction.** Correct these claims across sibling living docs.
Keep the separate no-stacking rule, describe the distinction between a fresh
section and resuming its saved visit, and state the modifier restriction.

### Areas that held up under review

- **Rule/view dependency boundary.** The Node check imports the seven rule
  modules without a browser shim and verifies their import graphs. The edition
  registry keeps book availability out of the DOMParser-owning data module.
- **Generated-data discipline.** The source build validates the published set,
  succeeds over the real corpus, and leaves bundled JSON, copied assets,
  inventory and stamp unchanged. No generated file was hand-edited.
- **Navigation and visit persistence.** Refundable and durable moves have
  distinct transaction/retry paths. Return frames, roll decisions, equipment
  locks and fight bonuses have explicit serialization. The normal regression
  suite exercises these paths; the new persistence findings concern surrounding
  slot/update ownership and failure cases.
- **Core rules.** The inspected difficulty, rank, training, damage and derived
  stat code delegates to the rule layer. Effective abilities keep their floor
  without imposing the written-score ceiling. The source gate already rejects
  unsupported group-fight hooks and dice-less headless body rolls.
- **Offline installation.** Required responses are fetched before writes,
  optional asset failures are separate, pruning checks required completeness,
  and cache reads/deletes stay in the `fl-` namespace. Fresh versioned requests
  and redirected-response copying address the prior review's precache findings.
  A live upgrade/installation check remains necessary for the hosting cutover.
- **State-derived display.** Reviewed fight statistics and save/card labels use
  text nodes or escaping rather than directly inserting save-provided text as
  HTML. Restored fight identity is rebuilt from the section's fight node. This
  pass found no concrete injection defect in those inspected paths.
- **Corpus notes.** The unused/unawarded codeword messages are informational.
  `Bait`, `Beach` and `Bilge` are already discussed in the source and archive as
  names swept by book 2's section 579. Their notes do not establish a newly
  missing award; no duplicate task was filed for them.
- **Deployment scope.** Static review found the root redirect, `/web/` layout,
  explicit asset allowlist and CI prerequisite jobs consistent with task 370's
  intended design. The live cutover was not reclassified as complete.

### Follow-up order and limits

Fix task 380 first, then add regression cases for the medium findings through
the owning suites. The source-value cases should enter the validator's mutation
fixtures; the documentation task should correct every living copy of each claim.
Follow the existing backlog order when implementing these tasks.

The every-section scan is a useful rendering smoke check. It uses a scanner
character and is not proof of every route, purchase, combat state or printed
bespoke mechanic. Source vocabulary checks likewise do not establish that all
required rule instructions were transcribed. This report distinguishes observed
runtime defects, confirmed authoring/validation gaps and unperformed deployment
or UI checks rather than treating a passing aggregate as full behavioral proof.
