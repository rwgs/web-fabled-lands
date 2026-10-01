# Fabled Lands - Repository Review (Codex)

## Engine follow-up review of 2026-10-01

Reviewed commit `f77dfb5`, starting from a clean working tree. Filed nine new
defects as **383-391** in [TASKS.md](TASKS.md). The earlier repository review below
is retained as a dated record; its findings 371-381 and the subsequent task 382
are now marked complete. Task 369 remains open pending its external CI check.

The highest-priority finding is data loss during a failed save-slot claim:
Keep/import correctly refuse another tab's save, then their rollback deletes it.
The remaining findings affect mandatory actions, return-state restoration,
initiation, investment limits, possession selection and blessing protection.

### Scope and method

Read all seven DOM-free engine modules:
[engine.js](web/js/engine.js), [state.js](web/js/state.js),
[combat.js](web/js/combat.js), [market.js](web/js/market.js),
[render-rules.js](web/js/render-rules.js),
[render-gates.js](web/js/render-gates.js) and
[visit-state.js](web/js/visit-state.js), plus constants in
[rules.js](web/js/rules.js). Traced their renderer callers across the section
lifecycle and roll, reward, choice, combat and economy views. Checked relevant
tests, the XML tag contract, current tasks and prior fixes before filing.

The review focused on whether a planner and its mutation agree, whether
mandatory work can be bypassed by click order, whether visit state survives
detours and persistence, and whether item/ship selection preserves the player's
choice. Candidate findings were checked against numeric section files of the
published books declared in [books.ini](books/books.ini), excluding `temp/`
copies and non-section XML. This is an engine review, not a fresh transcription
comparison against the printed books.

Ran the normal browser suite and DOM-free import check on the unchanged tree.
For behavioral reproductions, copied the current JS and bundled data into an
isolated temporary tree and used a small review harness through the unchanged
[run-tests.ps1](build/run-tests.ps1). It used real shipped sections, real renderer
controls, deterministic dice and ephemeral states. No application, corpus,
generated data or standard test source was edited.

### Validation

| Check | Result |
|---|---|
| `pwsh -ExecutionPolicy Bypass -File build/run-tests.ps1` | `RESULT ALL PASS pass=3352 fail=0`, exit 0 |
| `node web/tests/node-import.mjs` | `RESULT ALL PASS pass=35 fail=0`, exit 0 |
| Isolated browser reproductions, asserting correct behavior | `RESULT FAILURES pass=12 fail=17`, exit 1; no fatal error |
| Node probes of rollback, transfer equivalence and empty-god mutation | Confirmed the reported failures directly |

The passing assertion totals are dated observations, not a fixed expectation.
The failing review assertions deliberately demonstrate missing regression
coverage; they do not indicate that the existing suite failed. Controls included
the free decline exit, the initial darkness penalty and weapon lock, and entry
into and return from the real item detour. Both speculative antique-roll checks passed and were
not filed. The slot-claim race was reproduced with a controlled storage
interleaving; simultaneous real browser tabs were not stress-tested.

### Findings by priority

| Task | Priority | Finding |
|---|---|---|
| 383 | HIGH | Failed Keep/import rollback deletes a competing save |
| 384 | MEDIUM | Later destination rolls bypass earlier mandatory checks and losses |
| 385 | MEDIUM | Explicitly forced groups leave onward exits live before committing |
| 386 | MEDIUM | Item detours shed source fight bonuses and equipment locks on return |
| 387 | MEDIUM | Empty-god ticks retain initiation and append an empty deity |
| 388 | MEDIUM | Purse clamping defeats money-cache investment multiples |
| 389 | MEDIUM | Transfers treat materially different possessions as interchangeable |
| 390 | MEDIUM | Immunity to Injury cannot be invoked against damage |
| 391 | MEDIUM | Enemy replies land before the COMBAT-blessing retry decision |

### 383 - A refused slot claim deletes the save it protected

**Evidence.** `nextFreeSlot` in [state.js](web/js/state.js) observes a free
slot. Another tab can claim it before `GameState.save` reads its precondition.
The conflict check correctly refuses to write. `GameState.keep` then
unconditionally removes `fl_save_<slot>`; `importSave` instead calls
`deleteSlot`, removing both metadata and the blob. Cleanup does not establish
that this attempt wrote or still owns the record.

**Reproduction.** An isolated storage stub returned null for the slot search
and published a competing blob before the next read of that same key.
Both Keep and import threw the conflict message, and both left the competing
blob absent. No write by the losing attempt was needed.

**Impact and correction.** A normal concurrent slot claim can destroy the other
adventure despite the newly added first-writer protection. Condition rollback
on ownership of a partial write; a refusal before writing must delete nothing.
Cover Keep, import, remembered Keep retries and replacement before cleanup while
retaining tasks 373/375's recovery cases.

### 384 - A destination die skips the survival or forfeit die

**Evidence.** `computeRollGate` in
[render-gates.js](web/js/render-gates.js) selects its first successful seed,
rather than accumulating prerequisite rolls. Navigation from outcome-table
rows is excluded from that gate. `revealBranch` in
[render-rolls.js](web/js/render-rolls.js) therefore exposes a later roll's
destination without holding it for the earlier obligation.

**Reproduction.** At [book5/510](books/book5/510.xml), rolled the destination
die before the drowning Rank check. "Continue -> 539" was enabled and clicking
it reached 539 with the survival check unmade. The same ordering enabled a fog
destination at [book5/76](books/book5/76.xml) before SCOUTING, and a landing
destination at [book6/373](books/book6/373.xml) before the possession-loss roll.

**Impact and correction.** Players can bypass a death check or retain possessions
the encounter must take. Plan the prerequisites of later rolls and their exits,
including synthesized outcome exits, with each resolved success/failure
alternative releasing only its own path. Test both click orders and partial
save/resume; avoid forcing optional talk-or-fight alternatives.

### 385 - A forced group is still an optional button

**Evidence.** `renderGroup` in
[render-rewards.js](web/js/render-rewards.js) and `groupPlan` in
[render-rules.js](web/js/render-rules.js) do not make `force="t"` an onward
obligation. The XML contract explicitly distinguishes optional unmarked groups
from forced groups.

**Reproduction.** At [book6/496](books/book6/496.xml), started with 100 Shards
and a rope. The "if you agree" exit to 149 was live before the forced donation
group. Clicking it reached 149 with the purse at 100 and the rope still carried.
The intended price is 10 Shards plus one chosen possession. The decline exit to
291 was also live, correctly.

**Impact and correction.** Explicit mandatory prices and consequences can be
skipped. The same markup occurs on equipment confiscation, weapon destruction
and rolled outcome groups. Gate applicable onward actions until the forced group
commits; keep earlier declines, the group's own navigation and optional groups
usable. Test an unanswered picker and completed-group resume.

### 386 - Returning keeps the memo but loses the state it guards

**Evidence.** `Story._captureReturnFrame`/`Story.goBack` in
[render.js](web/js/render.js) and `serializeFrame`/`deserializeFrame` in
[visit-state.js](web/js/visit-state.js) omit fight-bonus and equipment-lock
snapshots. The detour's `Story.begin` clears both. Returning restores the
source ctx, whose granting ticks are already applied and will not re-fire.
The current-visit save format already handles these snapshots; the return frame
does not.

**Reproduction.** Inspected the lacquer box from
[book6/252](books/book6/252.xml), which permits inspection at any time, and clicked
the real return control at [book6/272](books/book6/272.xml). Both source identities
were restored correctly. Returning to
[book6/624](books/book6/624.xml) changed the darkness attack penalty from -2 to
0. Returning to [book6/135](books/book6/135.xml) left the weapon slot unlocked
after its entry had locked it.

**Impact and correction.** A detour can erase a combat penalty or allow switching
to a disposable weapon before destruction. Capture, serialize, coerce and restore
the source snapshots before return autosaves or renders. Test direct return and
save/load during the detour, keeping detour-local state separate.

### 387 - Forsaken leaves the god and its benefit in place

**Evidence.** The "lose initiate status" group in
[book6/589](books/book6/589.xml) contains `<tick god=""/>`.
`applyTick` in [engine.js](web/js/engine.js) passes the empty string to
`GameState.setGod` in [state.js](web/js/state.js), which appends it.

**Reproduction.** As a Sig initiate, rolled 5 and explicitly clicked the Forsaken
group. The resulting gods were `["Sig", ""]`, and Sig's +1 THIEVERY effect
remained. A direct Node mutation confirmed the same result. The group was
committed, so this defect is independent of finding 385.

**Impact and correction.** The punishment retains initiation benefits, and the
empty entry prevents the "worships no god"/safe-initiation gates from opening.
Clear initiation through the normal renunciation path, including associated
effects and tied deals. Preserve future worship; the printed instruction does
not impose permanent godlessness. Cover an already uninitiated player too.

### 388 - An investment accepts a forbidden fractional lot

**Evidence.** The Deposit callback in `renderMoneyCache` in
[render-market.js](web/js/render-market.js) rounds the request to `multiples=`
before clamping it to available funds and maximum capacity. Those clamps can
turn the result into a nonmultiple.

**Reproduction.** [Book1/104](books/book1/104.xml) prints "multiples of 100
Shards" and carries `multiples="100"`. With a purse of 150, entering 200 and
clicking Deposit moved all 150 into cache `1104`.

**Impact and correction.** The investment violates its printed lot size.
Compute a legal multiple within every constraint in the rule layer and use it
in the widget. Test partial purse/headroom, less than one lot, exact lots and
unconstrained caches; check withdrawal semantics against the contract.

### 389 - Transfer identity omits what makes the item valuable

**Evidence.** `itemsAllSame` in [engine.js](web/js/engine.js), shared by
`transferPlan` and `applyTransfer`, compares only kind, normalized name and
bonus. Ability, tags, effects/uses and provenance are omitted. Task 372 repaired
sale identity in [market.js](web/js/market.js), not this predicate.

**Reproduction.** Two same-named rings with three and one uses produced
`needChoice: false`. Applying the one-item transfer did not invoke the supplied
chooser and moved the three-use ring first. The real
[book2/105](books/book2/105.xml) pickpocket widget also rendered no item picker.
Weapon and +1-item offerings share this planner.

**Impact and correction.** A "choose which" loss or offering can silently
remove a more useful possession. Compare all gameplay-relevant identity and
honor the chosen item. The transfer picker also needs labels that expose those
differences; two identical names would not let the player choose safely.

### 390 - Injury immunity is granted but cannot be invoked

**Evidence.** [Book5/365](books/book5/365.xml) explicitly grants Immunity to
Injury and says it can prevent Stamina loss from one source once, or one entire
combat round. `GameState.damageStamina` in [state.js](web/js/state.js),
`applyLose` in [engine.js](web/js/engine.js) and the damage paths in
[combat.js](web/js/combat.js) offer no injury protection. `renderSheet` in
[ui.js](web/js/ui.js) only displays its blessing chip; the combat widgets offer
other blessings but have no injury invocation.

**Reproduction.** Acquired the blessing through the real chapel menu. With it
held, fought the Scorpion Shaman at [book1/105](books/book1/105.xml) with COMBAT
1. One low-roll exchange took 5 Stamina while the blessing remained held. Neither
the sheet nor the fight offered an injury action before or after the round.

**Impact and correction.** A printed reward has no usable benefit. Implement
the damage protection and a player decision for when to invoke it, covering a
standalone wound and a whole round's multiple attacks. Do not silently consume
it on the first minor wound. Verify decline, consumption, fatal damage and
save/resume at the decision.

### 391 - A COMBAT retry arrives after the fatal reply

**Evidence.** `fightRound` in [combat.js](web/js/combat.js) resolves a missed
player-first strike and the enemy's reply together. `drawFight` in
[render-combat.js](web/js/render-combat.js) offers the COMBAT blessing afterwards;
`rerollAttack` refuses when that reply has already killed the player.
[Book4/324](books/book4/324.xml) promises a retry when a COMBAT roll fails.

**Reproduction.** At [book1/105](books/book1/105.xml), gave the character COMBAT
5, 1 Stamina and the blessing. Two ones made an attack total of 7, missing Defence
8. The enemy's total of 7 then beat player Defence 6 and killed the character.
The retry returned false with the enemy at 9 Stamina. Two sixes on that retry
would score 17, deal 9 and defeat the enemy before its reply.

**Impact and correction.** The player can lose the promised retry, or take a
reply that a winning retry should have prevented. Pause a missed strike at the
reroll decision before advancing the round. Keep runs the pending reply once;
retry resolves the new strike first. Cover initiative, groups, multi-attacks,
round/wound hooks and persisted pending rounds. Existing task 91 tests use
harmless enemy replies, so they do not detect this ordering failure.

### Follow-up boundary

These findings are filed for implementation, with owning-suite regressions and
completion checks in [TASKS.md](TASKS.md). No fix has been implemented or marked
complete by this review.

---

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
