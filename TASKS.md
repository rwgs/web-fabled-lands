# Fabled Lands — Web Edition · Engineering TODO

Backlog of recommended improvements. Open tasks are filed under priority buckets
(**HIGH** / **MEDIUM** / **LOW**) — work the first open (`- [ ]`) item top-down;
each task's detail section carries the same stable ID. Every filed task through
392 appears below: 207 and 326 are withdrawn as misdiagnoses, the `- [ ]` items in
the buckets below are open, and **all others are complete**. File new work
under the priority bucket that fits, and record the pass in the Review log.
Completed detail sections are archived in
[`TASKS-archive.md`](TASKS-archive.md); the Review log at the end of this file
records each audit pass and is where new work is filed. The log keeps only the most recent
`Reviewed` pass and the `Worked` entries since it: when a new `Reviewed` pass is logged,
move the entries below it, verbatim, to the top of `TASKS-archive.md`'s "Review log
(archived)" section (task 368).

This file is for **defects**. New features are scoped in
[`ROADMAP.md`](ROADMAP.md) instead, as ordered phases — pick up a phase from
there once the buckets below are clear.

**HIGH**

*(none open — file new HIGH work here)*

**MEDIUM**

- [ ] 385. Explicitly forced action groups leave onward exits live before their costs or consequences run
- [ ] 386. Returning from an item detour loses the source visit's fight bonuses and equipment locks
- [ ] 387. `<tick god="">` adds an empty god instead of clearing initiation at book6/589
- [ ] 388. Money-cache deposits cease to respect `multiples=` after clamping to the purse
- [ ] 389. Transfer equivalence ignores item effects, tags, ability and provenance, silently choosing an unequal possession
- [ ] 390. Immunity to Injury is awarded and displayed but cannot protect against any damage
- [ ] 391. Combat replies land before the COMBAT-blessing reroll decision and can kill the player before a winning retry

**LOW**

- [ ] 369. `ubuntu-latest` moves to Ubuntu 26 from 2026-10-19 (CI notice); the `smoke` and `build-scripts` jobs rely on the image's preinstalled `pwsh` 7, `google-chrome` and `python3`, so the move could stop CI with no change here
- [ ] 392. A Keep or import refused because another tab claimed the slot first tells the player "this adventure has been saved from another tab" and to load the newer save, which is somebody else's adventure; retrying works

**Done**

*Completed items are listed by task number (the stable ID pointing at the
archived detail section); archived detail sections remain in filed order, not
this order.*

- [x] 1. Gate combat progression / model fight outcomes
- [x] 2. Finish the logic/view split (combat/market/rest)
- [x] 3. Fix multi-attribute `<if>` conditions
- [x] 4. Prevent silent save-slot overwrite
- [x] 5. Implement `<items group … limit="N">` "choose up to N" pickup
- [x] 6. Harden save import and migration
- [x] 7. Surface persistence failures to the player
- [x] 8. Make service-worker upgrades atomic
- [x] 9. Centralise tag dispatch into a registry
- [x] 10. Dice RNG quality / reproducibility
- [x] 11. Harden the per-visit memoization assumption
- [x] 12. Add headless unit tests for the extracted rules
- [x] 13. Optional: build-time XML validation
- [x] 14. Fix save-card button overflow on mobile
- [x] 15. Fix `<gain>`/`<lose>`/`<tick>` ability effects (rank, stamina, "?", "*", fatal)
- [x] 16. Make wildcard/choice losses actually take things
- [x] 17. Recognise all spec'd `<if>` attributes; stop defaulting unknown conditions to true
- [x] 18. Preserve item `tags` and support tag-filtered item conditions
- [x] 19. Implement the curse / disease / poison system end-to-end
- [x] 20. Implement caches, banks, `<adjustmoney>` and `<transfer>`
- [x] 21. Fix `<flee>`/`<fightdamage>`: no render-time auto-apply, find them anywhere, honour `flee="t"`, `type="replace"`
- [x] 22. Render `<success>`/`<failure>`/`<outcome>` children of `<choices>`
- [x] 23. Make inline `<buy>`/`<sell>` functional (ships, tools, quantity, item sells)
- [x] 24. Canonicalise ship types (`brig`, `gall`) and fix crew-upgrade steps
- [x] 25. Fix value/expression parsing: vars containing "d", unary minus, division
- [x] 26. Implement the remaining `<fight>` attributes
- [x] 27. Cap visit-box ticks and make `ticks=` guards robust
- [x] 28. Honour `dead="t"` on `<goto>`/`<choice>`
- [x] 29. Market & item polish: currency items, pipe names, headers *(parts 2 & 5 split → 40, 41)*
- [x] 30. Gate `<random flag=…>` rolls behind their payment
- [x] 31. `<rest>` with no `stamina=` should restore to full
- [x] 32. Implement or explicitly stub the remaining unhandled tags
- [x] 33. Narrate sections without `<p>` wrappers (TTS)
- [x] 34. Finish moving rules out of the view layer
- [x] 35. iOS home-screen icons: provide PNG apple-touch-icon
- [x] 36. Minor rule divergences (grab-bag)
- [x] 37. Fix the `safeAddGodd` typo in the source XML
- [x] 38. Gate cache widgets on `lock`/`unlock` under the single-pass render (book1/91 gamble)
- [x] 39. Defer confiscate-and-return `<transfer … from=>` until a fight resolves (book2/462)
- [x] 40. `<market currency="…">` alternate-currency markets
- [x] 41. Item `<effect>` system (use/aura/wielded/ability) and `<sold>` sell-hooks
- [x] 42. Inner `<difficulty>`/`<random>`/`<rankcheck>` rolls inside a `<group>` are unrun
- [x] 43. price/flag "choose one" purchases over-apply every linked reward *(moved from LOW 2026-07-07; scope grew — see detail)*
- [x] 44. Fold the ring of ultimate power's `Rank`/`Stamina` auras (book5/564)
- [x] 45. Multi-fight sections: the fight gate & death-deferral track only the *last* `<fight>`
- [x] 46. `<set var … modifier="natural">` discards the value — book-2 rank ceremonies auto-succeed
- [x] 47. `<choice item="?" tags=…>` is never enabled — light-gated passages hard-locked
- [x] 48. Group fights: Surrender/flee throws a TypeError; no Flee button; no target choice
- [x] 49. `special="attack|defence"` grant permanent, save-persisted bonuses
- [x] 50. Var-keyed `<success>/<failure>` branches fire on entry (unset/stale vars)
- [x] 51. `<difficulty|rankcheck flag=…>` roll gates unimplemented; shared `<success>` binds only the last roll
- [x] 52. `removeCodeword` leaves the codeword's *value* behind — bonus counters never reset
- [x] 53. `<difficulty modifier="noweapon">` still counts the weapon bonus
- [x] 54. Mid-fight escape brackets (tick…lose codeword) collapse — surrender/flee routes unreachable
- [x] 55. `<choice item=… pay="t">` doesn't consume the item
- [x] 56. `hidden="t"` payments render a phantom "Pay" button instead of arming silently
- [x] 57. Adventure Sheet: curses all display as "curse"; diseases/poisons invisible
- [x] 58. Market `<sold>` hooks match the shop row's tags, not the sold item's
- [x] 59. `<tick god=…>` drops `<effect>` children — Sig initiates never get +1 THIEVERY
- [x] 60. Affliction `<effect>` forms `divide`/`target`/`stamina` inert; item `<curse>` children never attach
- [x] 61. book6/628: the rerunnable `<set>` clobbers the roll's var — inn rest/dysentery never fires
- [x] 62. Render `<image file=…>` and use-effect images (map of Bazalek, book3/75)
- [x] 63. Heterogeneous "choose one" rewards (item / Shards / resurrection) over-apply (book1/597)
- [x] 64. Asset-only releases do not invalidate the PWA cache
- [x] 65. Rules modal emits invalid table heading markup
- [x] 66. Add a CI workflow that runs the headless smoke suite
- [x] 67. README: align the illustration docs with the shipped build
- [x] 68. `<if ability="rank|stamina">` always reads 0 — Rank gates never open (§416 + 11 more)
- [x] 69. Bare post-fight `<lose>/<gain>` apply on entry, not on the fight outcome (§570 + 7 more)
- [x] 70. Visit box renders unticked on the visit it ticks; bare `<tick/>` prints "If not, , and read on" (§496 + widespread)
- [x] 71. `<lose staminato="N">` never applies — the handler is gated on a `stamina=` attr it lacks (16 sections)
- [x] 72. "codeword gained" notification fires even when the codeword was already held
- [x] 73. Ship dock/current-vessel state is not maintained — any owned ship can sail or trade from anywhere *(core done; todock= + sailing-ship pointer split → task 81)*
- [x] 74. Standalone `force="f"` effects auto-apply — missions/initiations cannot be declined; choose-one losses over-apply
- [x] 75. Live `<tick>` forms for equipment, profession changes and patterned titles are incomplete/inert
- [x] 76. Blessings are stored as inert labels — ability/Luck/travel benefits cannot be used *(core rerolls done; combat Defence/Wrath split → task 80)*
- [x] 77. Selector-aware `<set item|cache …>` expressions read the sheet instead of the selected item/cache (21 nodes)
- [x] 78. Validate numeric `<section name>` against its filename; fix five mismatched source files
- [x] 79. Keeping a preview or importing a save reports success when persistence fails
- [x] 80. Combat blessings: expose Defence through Faith (+3, one fight) and Divine Wrath (1d pre-damage) as fight-widget buttons *(split from task 76)*
- [x] 81. Ships: honour `todock=` and track which at-large ship is being sailed *(split from task 73)*
- [x] 82. Test harness: a duplicate top-level `const` in `run()` silently aborts the whole suite (reads as a hang, not a failure)
- [x] 83. Combat blessings (Wrath/Defence) buttons appear only on the single-fight widget, not group fights *(split from task 80)*
- [x] 84. De-flake the "fight attack produces a log line" test (timing-dependent on the 900 ms dice animation)
- [x] 85. book6/135 source: `tag="keep"` is a stray/misnamed attribute (likely meant `tags=`); harmless but should be cleaned
- [x] 86. Add a full-section render integration test for book5/386 (currently covered only by synthetic ticks) *(added; surfaced the §386 enchant-cycle bug → task 88)*
- [x] 87. Fight widget "Your Combat" omits the per-fight attack bonus (`special="attack"`), unlike the Defence line
- [x] 88. book5/386: the hidden `removetag="Tz"` cleanup fires on entry, so Targdaz's weapon-enchant roll/outcomes never land (weapon never changes)
- [x] 89. Ship actions still use remote vessels, and `<choice sail>` does not sail one
- [x] 90. Permanent Safety from Storms is deleted by storm-avoidance `<lose blessing>` nodes
- [x] 91. COMBAT blessing cannot reroll an attack, and Defence blessing leaks between fights
- [x] 92. Eight live `<adjust>` variants are ignored or applied unconditionally
- [x] 93. Item group provenance and rolled `itemAt=` losses are not represented
- [x] 94. `quantity=` is ignored on rewards, cargo ticks and market stock
- [x] 95. Item `replace=` rewards add a duplicate instead of transforming the possession
- [x] 96. Hidden item rewards inside `<group>` choices are never granted
- [x] 97. Molhern's `itemcache` ignores its `<include>` / `<exclude>` filters
- [x] 98. Resurrection arrangements ignore replacement, supplemental and hidden semantics
- [x] 99. `<fightround>` effects are detached manual widgets instead of combat-round rules
- [x] 100. The two live `<while>` loops execute only one rendered pass
- [x] 101. §5.114's `<sectionview>` oracle cannot display its referenced section
- [x] 102. §1.338's standalone `<price>` does not charge for or complete the poison cure
- [x] 103. §4.658: `initialCrew="oldcrew"` ignores the `oldcrew` variable — the salvaged barque's crew resets to average
- [x] 104. Travel rolls don't gate the section's onward choices; a "get lost" outcome doesn't suppress them (§1.278/§1.82 + every travel section)
- [x] 105. `<if ticks="N">` reads the live count — this visit's own `<tick/>` flips the guard on a mid-visit rerender, re-showing the "already ticked → goto" redirect (§1.496)
- [x] 106. Light mode is force-darkened on Chrome/Edge — Chromium "Auto Dark Theme"; `color-scheme: light` doesn't opt out, needs `only light` *(fixed; leather-chrome-in-both-themes remains an intentional design note)*
- [x] 107. Visible `<transfer>` actions auto-execute and ignore chooser/filter/price semantics *(fixed; surfaced the §4.456 `<lose bonus>` gap → task 113)*
- [x] 108. `<outcome blessing="…">` ignores Safety from Storms and exposes the capsize/storm redirect *(fixed; surfaced the reroll-form non-consume → task 114)*
- [x] 109. Multi-ability success routing ignores `<success ability="…">` (§2.37 always takes SANCTITY)
- [x] 110. `<return>` starts a fresh visit instead of restoring the section at the point it was left
- [x] 111. Rolled `itemAt=` losses can remove `keep`-tagged possessions
- [x] 112. The Adventure Sheet stores but cannot activate a curse's `lift=` prompt (§5.505)
- [x] 113. `<lose item="?" bonus="N">` ignores `bonus=` — §4.456 accepts any item as a +2/+3 offering
- [x] 114. Reroll-form storm sections (§232/502/716) never consume the blessing — the rerunnable `keepblessing=1` set resets the guard each render
- [x] 115. Adventure-Sheet item detours bypass `Story.navigate`, so `<return>` still re-enters the source section
- [x] 116. Save/load restarts the current visit — effects can repeat and rolls/return state disappear
- [x] 117. Priced equipment/cargo losses can arm their reward without taking the required payment
- [x] 118. Choice/equipment losses can remove `keep`-tagged possessions *(immediately after 117 — same shared loss matcher)*
- [x] 119. Re-establish the rules/view boundary and split the 4,060-line renderer by responsibility
- [x] 120. Split the 4,790-line single-scope browser test into focused ES-module suites *(before the test-heavy 115–117 chain)*
- [x] 121. The documented `powershell` build command no longer parses `build-data.ps1` on Windows PowerShell 5.1
- [x] 122. Roll-less `<outcome codeword=…>` decision tables never resolve — eight sections render as dead ends
- [x] 123. "Immunity to Disease and Poison" is stored under two un-aliased names — the blessing never protects
- [x] 124. Loading/importing a save clamps Stamina to the written max — aura Stamina (ring of ultimate power) is silently stripped
- [x] 125. Flag-linked item rewards outside choose-one menus are free, and paying can never grant them
- [x] 126. A collapsed `<group>` action never executes its `<buy>` children — §5.192's ship and §4.622's cargo are unobtainable
- [x] 127. Abbreviated cargo names (`grai`, `meta`, …) are never canonicalised — the trans-book trading economy is broken
- [x] 128. A bare `ability=` disjunct on `<if>` is always true — §5.680 gives away the ring of ultimate power
- [x] 129. Free fixed-amount `<rest stamina="N">` is infinitely repeatable — every hospitality rest heals to full
- [x] 130. Inline `<buy>` allows one purchase per visit; JaFL's default is unlimited ("buy as many as you can afford")
- [x] 131. Cache `max=` semantics: `max="0"` must bar deposits (§4.263 money-doubling), and item caches must store Shards (§6.512)
- [x] 132. `<if blessing="?">` never matches — §5.365's chapel stacks blessings
- [x] 133. Adventure-Sheet mutations (drop/lift) leave the story pane stale — item-gated choices stay live after the item is gone
- [x] 134. Market sells with several candidates silently take the first match — JaFL asks which ship/item to sell
- [x] 135. Renouncing a god keeps that god's resurrection deal
- [x] 136. Engine grab-bag #2: `transfer tenth=`, named-cargo loss quantity, `effect description=`, `<set>` identifier edges, `<buy force="t">`
- [x] 137. A save blob can persist without its `fl_meta` entry — the orphaned slot turns invisible and gets overwritten
- [x] 138. Offline navigations with a query string bypass the service-worker cache
- [x] 139. The Adventure Sheet never shows foreign-currency balances
- [x] 140. Docs/CI accuracy: AGENTS.md's smoke-test URL 404s and the CI grep misses `RESULT FATAL`
- [x] 141. Archive completed task details out of TASKS.md
- [x] 142. CI's smoke verdict greps the whole DOM dump — failing runs are misdiagnosed as bootstrap FATALs
- [x] 143. A failing `ok()` fired after the report is silently lost — a latent silent-pass vector
- [x] 144. meta.json embeds the build date — a no-op rebuild busts every installed player's cache
- [x] 145. payChoiceCost validates a tag/wildcard item payment it can never consume *(latent — no corpus trigger)*
- [x] 146. A roll's dice animation leaves other controls live — the pending result lands on the wrong visit
- [x] 147. Navigation has no in-flight guard — a double-click double-runs leave hooks and entry effects
- [x] 148. undo() leaves a stale return frame — a post-undo `<return>` re-enters a pre-undo visit
- [x] 149. A priced sail choice pays before the ship chooser — an abandoned chooser eats the payment
- [x] 150. renderIfChain's list path runs `<else>`/`<elseif>` unconditionally *(latent — no corpus trigger)*
- [x] 151. The dead-end fallback counts disabled controls — an unaffordable forced payment can softlock
- [x] 152. View-layer polish grab-bag #1: begin() scaffold duplication, modal close handle, demo dead end, TTS nits, buy-parse duplication
- [x] 153. Accessibility quick wins: aria-live for toasts/rolls/fight log; dialog semantics + Escape for modals
- [x] 154. begin() autosaves the NEW section paired with the OLD visit ctx — resume aliases foreign memos onto the new section
- [x] 155. One-shot memos are written after the state mutation they guard — a reload repeats rests, buys, and failed rolls
- [x] 156. A mid-visit reload silently drops armed `<tick special="attack|defence">` bonuses and penalties
- [x] 157. Item-name glob patterns never match — §4.482/§6.201 unreachable, §6.144's trophy head never taken
- [x] 158. Two written-max Stamina clamps still strip aura headroom (task 124's remaining siblings)
- [x] 159. Resurrection revives at half Stamina — the book and JaFL both say full
- [x] 160. Loss-matcher follow-ups: named equipment losses never filter by name; `losePaymentPlan` ignores `multiple=` *(both latent)*
- [x] 161. Visit transitions can persist a destination position with the source visit memo — reload drops exact return/undo state
- [x] 162. Continuing combat redraws without persisting the updated fight memo — reload rewinds the round
- [x] 163. Post-refactor module/docs cleanup: break the roll/choice cycle and align the architecture contract
- [x] 164. Focused test suites still import the old whole-harness dependency set and boot unrelated app code
- [x] 165. Re-archive completed task details 115–160 and clear them out of the priority buckets
- [x] 166. Direct visit commits bypass persistence observers — save failures stay silent and activity timestamps go stale
- [x] 167. Mutation-bearing navigation is not atomic — a failed/pending cross-book load can consume payment without completing the move
- [x] 168. An open navigation transaction leaves unrelated UI live and globally suppresses its saves
- [x] 169. Durable-consequence navigation has no abort/retry contract — failed resurrection, flee, combat or item detours can strand the action
- [x] 170. Centralise duplicated display helpers already owned by `render-util.js`
- [x] 171. Deduplicate the single/group combat control shell without merging their rules
- [x] 172. Deduplicate roll-widget/gate/memo scaffolding without building a generic roll renderer
- [x] 173. Durable-navigation retry targets disappear on reload — the spent consequence can become a permanent dead end
- [x] 174. The controllable async-navigation test fixture is copied three times in one suite
- [x] 175. Blessing rerolls keep the rejected roll's branch effects — damage/rewards can survive or stack
- [x] 176. Unavailable-book demo links and imported saves reject outside the recoverable UI
- [x] 177. Complete modal keyboard isolation/focus restoration, including the section-view oracle
- [x] 178. Direct `choice[flee="t"]` navigation omits the durable retry contract
- [x] 179. Lazy service-worker cache writes can be terminated before `cache.put()` completes
- [x] 180. Imported visit/combat memos can execute HTML/JavaScript on resume
- [x] 181. Finish task 175: a blessing-reroll result is still observable before Keep
- [x] 182. Delayed rolls and attacks can mutate a save after Save & quit
- [x] 183. Disease/poison immunity blessings do not prevent infection
- [x] 184. Named removal leaves stacked cumulative curses behind
- [x] 185. Wildcard affliction effects (`ability="*"`) are discarded
- [x] 186. Automatic highest-bonus equipment can select a worse loadout
- [x] 187. Named market sales ignore item kind and equipment stats
- [x] 188. `<rest hidden="t"/>` is optional instead of automatic
- [x] 189. A failed initial adventure load strands a new save on a blank game screen
- [x] 190. Service-worker activation and lookup touch unrelated origin caches
- [x] 191. Speech-enabled narrow headers clip critical controls
- [x] 192. The mobile Adventure Sheet is visually hidden but remains keyboard-exposed
- [x] 193. Stale speech callbacks can advance or cancel a newer narration
- [x] 194. SPA section transitions provide no focus target or announcement
- [x] 195. DOM-free rule modules are not directly importable in Node
- [x] 196. The build stamp is date/EOL dependent and omits service-worker code
- [x] 197. CI tests committed bundles without rebuilding their XML source
- [x] 198. A failed save deletion can leave an unrecoverable ghost slot
- [x] 199. Build validation misses source-schema typos and bundled-book dangling targets
- [x] 200. AGENTS.md overstates test-suite parse-error isolation
- [x] 201. A service-worker update can erase an unsaved character-creation draft
- [x] 202. Complete remaining form, selection and progress semantics
- [x] 203. An imported return frame restores unvalidated vars, ticks and location
- [x] 204. A derived `<set>` inside a `<while>` body is not traced per iteration
- [x] 205. The provisional-result gate locks a flee exit the fight gate deliberately leaves open
- [x] 206. The service worker's precache list has drifted from `web/js` and nothing checks it
- [~] 207. A `<while>` pass's provisional vars are position-sensitive within the body
  — **withdrawn, not a defect** (see the Review log)
- [x] 208. The documented headless-test command captures no DOM under PowerShell
- [x] 209. `Published=` does not produce a complete, clean offline edition
- [x] 210. Game teardown leaves the mobile Sheet drawer open across screens
- [x] 211. Re-archive completed task details 166–210 and clear them out of the priority buckets
- [x] 212. `titleCase` capitalises the letter after an apostrophe ("Ghoul'S Head")
- [x] 213. The post-fight gate does not hold an item award, so loot is takeable before the fight
- [x] 214. A visit-box redirect does not hold the section body, so a one-time reward is re-takeable
- [x] 215. A self-closing effect tag renders no words, so published sentences print with a hole
- [x] 216. `<if ticks="N">` after an in-section `<tick>` reads the pre-tick count, so "now ticked" branches never fire
- [x] 217. A visit-box redirect below the section head still leaves both exits live (book1/91)
- [x] 218. The Adventure Sheet chips a blessing by its XML key, not the name the book prints
- [x] 219. `<sold>` fires on a sale but its documented twin `<bought>` does nothing on a purchase
- [x] 220. The documented headless-dump command runs nothing from an MSYS shell, so a stale dump reads as a pass
- [x] 221. A single flag-linked `<resurrection>` ignores the payment and renders a free Arrange button
- [x] 222. `ownsSoleLinkedBlessing` reads a linked `<lose blessing>` as a purchase, so a payment that STRIPS a blessing is refused
- [x] 223. A choose-one cost is payable when every linked reward is refused, so the payment is deferred rather than spent
- [x] 224. A `price=`/`flag=` key strips an open ability loss of its chooser, so the engine picks which ability the player forfeits
- [x] 225. The "pay to spin" cost is the third payment path that commits an open ability loss with no chooser
- [x] 226. An open `<lose item="?">` forfeit is taken with no picker, so the engine chooses which possession leaves
- [x] 227. A wordless `<curse>`/`<disease>`/`<poison>` prints no name, so its printed sentence has a hole
- [x] 228. `showForfeitPicker` can only answer for one item, so a `multiple=` forfeit it offers would under-charge
- [x] 229. A `<group>` commits an open `<lose item="?">` with no picker, so a printed "decide which item" is ignored
- [x] 230. A collapsed `<group>` drops its `<adjustmoney>` child, so §2.134's whole gamble pays nothing
- [x] 231. A plain `<lose item="?">` effect commits with no picker, so six printed "(your choice)" instructions are ignored
- [x] 232. The same bare-hazard picker is missing on `<lose cargo="?">` and a `group=`-narrowed forfeit, so 13 more printed choices are ignored
- [x] 233. §5.578's donation applies against an empty pool and memoises the no-op, so the Brotherhood's cut is never taken
- [x] 234. §6.36 strips "your **best** armour, your **best** weapon" and the engine takes the first of each instead
- [x] 235. A warm Chrome profile serves a day-old test bundle, so the headless loop reports a false `ALL PASS`
- [x] 236. A virtual-time budget that runs out reports as a suite FAILURE, with nothing saying it was the clock
- [x] 237. `run-tests.ps1` selects an unusable WindowsApps Python alias and never reaches the real interpreter
- [x] 238. §5.152's bonus-filtered item payment stays enabled when no carried item qualifies
- [x] 239. The intentional `java-engine/README.md` rename leaves the reference packager looking for `README.txt`
- [x] 240. A cut-short run reports no progress at all, because the harness publishes `#results` once
- [x] 241. A blessing-escape page spends the blessing on entry, then disables the exit it paid for
- [x] 242. A branch escape's `<lose>` and its `<if blessing=>` must agree on the blessing's spelling
- [x] 243. A cargo buy stays enabled with a full hold and refuses on click, where every other capacity limit disables
- [x] 244. A dice-table row into an unbundled book answers "please try again", where every other cross-book control names the book
- [x] 245. Only a `dead=`-gated branch is held for an unresolved fight, so §6.490 hands back the weapon it just confiscated
- [x] 246. `groupPlan` writes the passive-effect list out a second time, and that copy is the one that already drifted
- [x] 247. The roll gate is keyed on `<outcomes>`, so a "roll and lose this many" page can be walked past unrolled
- [x] 248. The roll gate holds the exits but not the `<fight>`, so §5.477's drake is fought before its jet lands
- [x] 249. A mandatory check read only by its `<success>`/`<failure>` seeds no roll gate, so §5.198's Champion is fought uncursed — and the roll skipped for good
- [x] 250. `applyPendingRerollGate` locks only `.goto`/`.choice`, so §1.21's thug is fightable while the reroll decision stands
- [x] 251. A standing forfeit picker does not hold the section's exits, so book4/116's "cross three items (your choice)" is skippable
- [x] 252. Task 251's choice gate makes §2.157's exit assertion fail on 2 of 6 unseeded die rolls, so the suite is green by luck
- [x] 253. A re-armed roll that lands the same outcome twice in one visit applies its effect once, so §3.314's second night at the tavern is paid for and does nothing
- [x] 254. A re-armed roll whose result is read by an `<if var=>` chain instead of an `<outcomes>` table keeps its memos, so §6.628's second paid night at the garret heals nothing
- [x] 255. Re-archive completed task details 212–254 and clear them out of the priority buckets
- [x] 256. An `<itemcache>` ignores its cache lock, so §4.586's confiscation is undone by clicking Take
- [x] 257. A roll revealed inside an `<outcome>` gates nothing, so §3.15's gambling debt is cancelled by not rolling for it
- [x] 258. A branch's `section=` exit is a button with no XML node, so every node-keyed gate but task 257's is blind to it (book2/105 keeps the pickpocket's takings)
- [x] 259. A guard above the effect it reads is re-derived against live state on the next draw, so §2.105's pickpocket takes the money *and* a possession
- [x] 260. 18 tracked `books/**/*temp.xml` working copies declare a live section's `name=`, and every corpus census counts them twice
- [x] 261. Task 259's spend-guard latch excludes `not=`, so §1.501's "if you didn't have enough money" turns itself on the moment you pay
- [x] 262. §1.460 tests a port-invented codeword in place of the printed "codeword *Acid* or a **copper amulet**", which the vocabulary can now express exactly
- [x] 263. Four click-time spend sites book nothing into the walk-position ledger, so a future guard above a bare `<buy>`, a paid `<rest>` or a cache Take reads the emptied purse
- [x] 264. §6.160's "cross it off and turn to 551" grays →551 the moment either thing is crossed off, so the price is paid and the route it buys is gone
- [x] 265. Three click-time takings still book nothing into the walk-position ledger — a market row's Buy/Sell, an inline `<sell>`, and the open-pick family
- [x] 266. §4.605 and §4.658 give a poor crew THREE free upgrades: the `<if crew=>` chain above the click steps forward each time it is obeyed
- [x] 267. `<buy crew="poor">` can never be clicked, so §5.145's and §5.192's printed "25 Shards to hire a poor crew" is a free crew instead
- [x] 268. `applyAdjust`'s crew branch spells the CREW_LEVELS ordinal out a second time and has no crewless guard, so a future bare `<adjust crew= amount=>` grants the grade §5.192 charges for
- [x] 269. `applyAdjust`'s four surviving branches each duplicate a `<gain>`/`<tick>` that already does the job, and no corpus `<adjust>` of any kind is bare — only `crew=` says so
- [x] 270. Every by-hand corpus census globs `books/**/*.xml` and counts the 20 superseded `temp/` working copies, so task 269 was filed with 569 `<adjust>` nodes where the shipped corpus holds 558
- [x] 271. A strongroom's Store button is the one taker that ignores a `keep` tag, so §4.103's white sword — "you can never lose this sword" — can be left behind in §1.177's town house
- [x] 272. `<transfer>` honours the keep rule for `item="*"` only, where `<lose>` honours every generic selector, so §2.105's pickpocket steals the white sword off a sheet carrying nothing else
- [x] 273. The walk-position ledger tracks the purse and the pack but not codewords, so a block that spends the codeword gating it retracts its own exit on the next draw — §2.143 deletes *Bounty* and grays the →601 it deleted it for
- [x] 274. Re-archive completed task details 256–273 and clear them out of the priority buckets
- [x] 275. `applyTick`'s equipment branch is the one recognised attribute that does not set `did` when it matches nothing, so §5.386's enchant and §6.731's shrine boon tick a section box and toast "box ticked" at a player carrying no weapon
- [x] 276. `applyTick`'s profession branch drops a pipe-list on the floor without setting `did`, so a hidden or effect-body `<tick profession="a|b">` ticks a section box instead of doing nothing — the second half of task 275's guard, with 0 corpus nodes today
- [x] 277. `renderRankcheck`/`renderTraining` never render their node's own words, so 45 shipped sections silently drop the printed roll instruction
- [x] 278. `renderTraining` reads its `var=` to hold a `<while>` pass but never writes it, so §2.554's "lose 1 MAGIC if you roll a two" can never fire
- [x] 279. Sweep the remaining tag families for task 277's shape — a shared helper only some of a sibling set calls *(five gaps found, every one unreachable — documented in place)*
- [x] 280. The market header row renders `header1=` and drops `header2=`/`header3=`, so 23 authored column headings ("To buy", "To sell") never reach the page *(adjudicated a deliberate simplification — documented, not changed)*
- [x] 281. Sweep for renderers whose click handler no assertion ever fires — `renderTraining`'s never was, which is why task 172's parity pass could not see 278 *(9 of 71 cold; 3 covered, 6 filed as 282)*
- [x] 282. Six click handlers still fire for no assertion — three modal-opening renderers and the Adventure Sheet's Wield/Move-down/Drop *(all six now driven; the probe reports cold 6 → 0)*
- [x] 283. The click-coverage probe keys a site by the frame that *registers* the listener, so `rollButton`'s seven callers collapse into one warm frame — the very shape of gap (task 278's cold `<training>` roll) that started the 281/282 sweep is invisible to it *(re-keyed by caller: 78 controls, 74 warm, 3 cold-by-construction; the 71=71 count was a coincidence, and the one real gap is filed as 284)*
- [x] 284. `renderPayment`'s open-forfeit branch is the one in-scope click handler that never registers in the whole suite, so the picker a forced "give up which?" payment opens has never been rendered — and task 279's reachability sweep left it out *(censused UNREACHABLE — the corpus's one candidate, §6.496, is group-bundled; 279's note extended to a fourth case)*
- [x] 285. A `<lose blessing="?">` effect commits with no picker, so book4/641's printed "(your choice)" takes whichever blessing was acquired first *(a fifth player-choice verdict; 20 assertions, and a census pinning the three shipped sections)*
- [x] 286. A `<group>` never asks which ability an open `ability=` spec takes, and its forfeit picker skips a count the page states *(one control, one question — an ability arm and a fixed-count forfeit arm; both census-pinned at 0 for the shipped corpus)*
- [x] 287. The Rules dialog opens scrolled to its last line, and a dialog long enough to scroll has no exit in view *(`preventScroll` on the initial focus, plus a sticky `.modal-head` carrying a ✕ on every dismissable dialog)*
- [x] 288. Task 191's narrow-header block measures an iframe whose stylesheet may not have applied, and fails intermittently *(the fetched `style.css` inlined into each `srcdoc`, so the frame's `load` is an exact barrier and no subresource is left to race)*
- [x] 289. `<lose staminato="N">` can only ever lower Stamina, so book1/297's padded tournament never heals its winner and kills its loser at book1/370 *(a signed delta, plus a narrow freeze on the `<set value=>` nodes that read the live Stamina a fight moves under them)*
- [x] 290. book5/315's `<if var="exp">` reads a variable no node in the section ever writes, so the training courtyard's crippling injury can never fire *(a writer, a natural-score snapshot to compare against, and a not-yet-rolled sentinel — the third of which the filing could not see)*
- [x] 291. book2/270 and book2/362 hand out the god Nagil on entry, because a `lessthan=` guard over a roll var not yet filled matches at 0 *(a two-line sentinel, `x = rank`, on both sections — nine of thirteen assertions fail without it)*
- [x] 292. book4/257 puts its "both rolls failed" exit on the page before either roll is made, because no roll-gate seed reads a condition *(a fourth roll-gate seed — the mandatory roll a CONDITION reads — and the first that awaits a SET of rolls; 28 shipped sections gain the gate)*
- [x] 293. book3/40 shows its editorial reroll note before the roll it describes, and the obvious sentinel would open a live exit
- [x] 294. book4/257 leaves a mixed pair of rolls with no exit at all, so succeeding one check and failing the other ends the adventure
- [x] 295. `renderItemCache` draws no money controls without `max=`, so book4/586 confiscates the player's whole purse and book4/528 can never give it back
- [x] 296. `rewardWasteReason` refuses a new resurrection deal to anyone already holding one, where `addResurrection` implements the replacement the books print — so book1/597's third reward is dead to a deal-holder
- [x] 297. the resurrection waste guard is a blanket engine rule that only book1/597's printed wording justifies, so the first flag-linked offer on a page printing the replacement rule will be refused an option its own text grants
- [x] 298. `renderResurrection`'s `hidden="t"` auto-register path ignores `unique="t"`, so the exclusion task 297 gave the markup is honoured on two of the three paths that arrange a deal
- [x] 299. nothing in the port fires on a change of BOOK, so book5/681's golden hair never pays the 20 Shards it promises on every crossing — and the corpus's only two `TODO` comments say so
- [x] 300. nothing validates a `modifier=`/`modifiers=` value, so one misspelling silently reverts a check to the very score the page says not to use — across 42 shipped sites, and it is task 46's defect from the source side
- [x] 301. closing `modifier=`'s value set also closed the numeric/var addend `renderDifficulty` implements, so a shape the view supports is now a build error — deliberate, and recorded here because nothing else would say so
- [x] 302. the port acts on neither `modifier="noarmour"` nor `modifier="current"` off `<adjust>`, though the JaFL spec defines both — so two spec-legal spellings are build errors this port cannot honour
- [x] 303. `<if ability="defence">` compares against 0, not the player's Defence, so book5/361's §160 route is unreachable at any Defence and book1/313's daggers always hit — task 68's fix for `rank`/`stamina`, never extended to the third stat
- [x] 304. `defence()` sums items, Rank and auras but not afflictions, so book5/638's Curse of Vulnerability subtracts its 3 points from nothing and the curse is inert
- [x] 305. a `<tick god=>` shares `readEffects` with the afflictions, so it accepts `ability="defence"` (task 304) and `ability="stamina"` (task 185) — and `data.effects` is read only by the core-ability paths, so both parse, store and move nothing
- [x] 306. the fight widget's "Your Defence" row re-derives the score instead of asking the resolver, so a `modifiers="noarmour"` fight shows the armoured number the enemy is not rolling against — book5/689 reads 12 while the drake rolls against 7
- [x] 307. a `<group>` that pays for a flag-linked award grants it and leaves the award's own Take button on the page, disabled and captioned "Pay first to choose this." — so book1/342 offers to sell you a potion you are already carrying
- [x] 308. `groupPlan.linkedAwards` grants EVERY item-family award sharing the price flag, where the Take path it stands in for grants one — so a `<group>` paying for a "choose one" menu would hand over the whole item half of it and kill the rest
- [x] 309. `ROADMAP.md` sizes the map-position work against "the 4,437 section files", which is the glob count task 270 was filed to stop anyone quoting — the shipped corpus is 4,369
- [x] 310. `reconcileEquipment` writes the DEFAULT weapon/armour back into `data.equipped`, so an implicit default is stored as an explicit choice and "else the strongest of that kind" can never fire again — a pregen Warrior who buys a magic sword keeps swinging their battle-axe at COMBAT 8 instead of 10
- [x] 311. `ability()` clamps the EFFECTIVE score to 12, where the reference engine pegs only the minimum at 1, so book4/103's white sword is worth +5 to a book4 Warrior and +4 to a book5/6 one — and the attack roll and every `<difficulty>` check read the capped number
- [x] 312. task 311 lifted the effective-ability ceiling and left `ability()`'s own doc comment reading "clamped 1..12" — while the comment 311 wrote six lines below it says "Floor of 1, no ceiling", and the one it wrote on `abilityNoWeapon` says "Floored, not capped, for the same reason `ability()` is", citing the stale line as its authority
- [x] 313. eighteen of the nineteen corpus censuses read the raw bundled section text, which KEEPS XML comments, so a commented-out node is counted as a real one — latent today, and the nineteenth already strips them
- [x] 314. three of the six values `modifier=` may take are silently DROPPED on `<set>` and two of them on `<if>` — the source gate allows all six on both tags, so `<set value="defence" modifier="noarmour">` validates clean and hands back the ARMOURED score, which is task 300's failure shape and what the gate's own comment carves out for `current`
- [x] 315. `adjustApplies` folds `modifier=` to a boolean `natural` on the `<adjust greaterthan|lessthan>` CONDITION, so the third mode-dropping site survives task 314 — the same tag's `adjustAmount` reads all six two lines away
- [x] 316. `adjustAmount` has no `defence` arm, so `<adjust ability="defence"/>` contributes 0 — the gate allows `defence` in `ability=`, and the same tag's `adjustApplies` reads it correctly through `abilityForMode`
- [x] 317. `rank` ignores `modifier=` on every tag but `<set>`, so `<adjust ability="rank" modifier="natural"/>` and `<difficulty ability="rank" modifier="natural">` read the ring of ultimate power's +2 back in — the last stat left out of the 314–316 family
- [x] 318. Re-archive completed task details 275–317 and clear them out of the priority buckets
- [x] 319. The line-ending trap task 318 hit was recorded only in the Review log, where a trap that changes how you run a bulk edit belongs in `AGENTS.md` — and the sharper half of it, a broken shell assertion, turned out not to exist
- [x] 320. `ROADMAP.md`'s phase 1 cites two source locations that have moved and miscounts the dock sites its gazetteer is sized against — `showMaps` is at `app.js:1152` not 1142, `state.js:995` is affliction code rather than the `data.location` write (`arriveAtDock`, `state.js:1118`), and "25 named ports across 96 sections" is 94: `<set dock=>` moves a SHIP, not the player, so the 97 sections carrying a `dock=`-family attribute are not the sites that set the location
- [x] 321. `TASKS.md` and `TASKS-archive.md` were the only two tracked blobs that were not LF — but not for the reason filed: git never normalised them, it PRESERVED their CRLF, and the 6,348-line diff came from an editing tool writing LF into a CRLF worktree file. Two distinct causes: one lone CR in task 319's own write-up made the archive binary, and a text file whose index blob already holds CRLF keeps CRLF on every later staging
- [x] 322. every book's `book.ini` is read by **nothing** — no script under `build/` opens it — so its `Map=` key reads as the live declaration of which image is that book's map while the build actually selects by the `-Map$` basename pattern, and book 3 proves it inert: `Map=Violet Ocean.JPG` names a file that does not exist, yet `VioletOcean-Map.JPG` ships correctly as `book3.jpg`
- [x] 325. `validate-source.ps1` validates codeword **attribute names** but never codeword **values**, so a typo'd `<gain codeword="Anchr">` passes the gate and silently never matches its `<if codeword="Anchor">` — the player just cannot progress, and `book.ini`'s `Codewords=` already holds the authoritative per-book list to check against
- [x] 323. `REVIEW.md` cites `renderStatic` at `app.js:775`/`:781` for a defect that task 65 already fixed and a function that has since moved to `ui.js` — the same fragile-citation class task 320 fixed in `ROADMAP.md` only, leaving `PLAN.md`'s six `#L` citations (all still exact) and `REVIEW.md`'s four (all drifted) carrying the form that pass banned
- [x] 324. the Maps modal captions every regional map with the **book** title from `books.ini` (book 3's map reads "Over the Blood-Dark Sea") when `book.ini` holds a `Map.Title` written for the map itself ("The Ports & Anchorages of the Violet Ocean") — a better caption for all six, sitting unread in the tree
- [~] 326. Task 207 is indexed nowhere, so a completed task survives only as an orphan detail section
  — **withdrawn, not a defect** (see the Review log)
- [x] 327. task 325's unused-codeword note counts a `<lose>` or an `<if>` as "used", so the case it exists to surface — a codeword the port never **awards** — is not reported: book 2's `Beach` and `Bilge` are tested and swept but reachable by no `<gain>`/`<tick>`, which is exactly what that book's `# Unnecessary codewords: Bait,Beach,Bilge` comment records, and the third name is masked by a no-op `<tick>`
- [x] 328. two sections carry a no-op `<tick codeword="X"/>` (book 2 sections 579 and 633), and one of them invents a codeword — `Bogus` — that exists nowhere else in the corpus and in no `Codewords=` list, so task 325 had to add it to the gate's port-flag allowlist to keep the build green: an allowlist entry whose only job is to keep scaffolding alive
  — filed as a `<tick>`/`<lose>` **pair**; §579's `<lose>` is the first entry of a complete 20-codeword sweep, so only three of the four nodes were dead (see the Review log)
- [x] 329. `PLAN.md`'s status header says "the backlog carries one open item (task 320)" and dates itself today, but 320 is closed and the backlog carries four — a stale *status* rather than a stale citation, in the file task 323 had just swept for citations, and a count `PLAN.md` cannot help rotting because it restates a figure another file owns
- [x] 330. `run-tests.ps1` diagnoses an empty dump as a CAPTURE failure ("no stdout handle?"), but a browser that launches and does no work at all writes the same empty file — an Edge mid-update wrote no DOM, no `--screenshot` and no `--version` while still creating its profile, and `AGENTS.md`'s one-second discriminator ("`--version` printing nothing confirms the missing handle") reads that evidence as exactly the wrong cause
- [x] 331. `PLAN.md` says `state.data.location` covers "25 named ports across **97** sections" and that three `<set dock=>` sections "set a dock", but `<set dock=>` berths a *ship* — only the **94** `<section dock=>` sections move the player, which is the figure `ROADMAP.md` already prints after task 320; the two planning files disagree on phase 1's own census, and `ROADMAP.md`'s "97 sections carry at least one of the four attributes" is itself the union of only two (all four: **102**)
- [x] 332. nothing bounds the browser launch by wall clock — `run-tests.ps1` uses `Start-Process -Wait` and CI a bare `chrome … &&`, while `--virtual-time-budget` is explicitly *not* a timeout — so the wedged browser task 330 is about fails the run only because it exits 0: one that hangs instead takes the run (and a CI job with no `timeout-minutes`) with it, and task 330 added a second unbounded wait on the failure path
- [x] 333. `release-selftest.ps1`'s miniature fixture writes no `book.ini`, so task 325's codeword gate — which treats a book declaring no `Codewords=` as an error in its own right, because the lists are checked as a union — aborts the real build the self-test drives, failing the `build-scripts` job on every commit since 325 while the ordinary build-and-test loop stays green
- [x] 334. `release-selftest.ps1`'s `Invoke-FixtureBuild` runs the real build with `6>$null` to keep its progress lines out of the assertions, but that stream also carries the build's *diagnosis* — so when task 333's fixture failed the codeword gate, CI printed a bare `throw` from `build-data.ps1:164` with the two lines naming the offending files discarded, and the log said only "fix the source XML above" above nothing at all
- [x] 335. `books/book1/book.ini` declares **35** of the **36** codewords printed on book 1's own codeword list, omitting `Auric` — and annotates the two it carries out of alphabetical order, `Aloft` and `Altitude`, as "printed on no inside front cover" when both are printed, in alphabetical position; task 325 made that list the authority every book's `codeword=` **value** is checked against, and the check is a union because a codeword may be *tested* in any of the six, so a name the volume prints and its own sections never use still has to be declared
- [x] 336. the `codeword=` value check splits on `|` alone, but `matchCodewords` in `engine.js` documents and implements "comma => AND, pipe => OR" — and `<gain>`/`<tick>`/`<lose>` split on `[|,]` as well — so the AND form the engine supports reads as one long name and is reported undeclared; no shipped section writes it, which is why a gate that rejects valid markup went unnoticed
- [x] 340. saving inside a `<return>` detour lost the source `<choice>` because `serializeFrame` named the clicked node by scanning the render memo map `ctx.pathNodes`, which `renderChoices` never writes — it mints a synthetic `.cN` path and calls `renderChoice` directly — so the frame saved `usedSourcePath: null` and the post-reload `<return>` handed the non-`revisit` choice back live; a revealed `<outcome>`'s own `<goto>` failed the mirror way, recorded under a `.oN` path `resolveNodePath` cannot parse
- [x] 345. `serializeVisit` carried task 156's `fightBonus` snapshot but no equipment-lock snapshot, so a mid-visit reload resumed §6.135 with both slots free while `ctx.applied` still said the hidden `<tick special="weaponlock">` had run — the sheet's Wield controls came back live and `<lose weapon="?" using="t">` broke whichever blade the player had swapped to instead of the one Mister Dragon had already caught
- [x] 343. the three affliction arrays never formed the reference model's disease/poison family, so `<lose disease="?"|"*">` searched diseases alone and the 15 shipped nodes that print "poison or disease" left a poisoned character uncured — at §5.105 after paying 75 Shards for it — while an open cure took the first match with no picker
- [x] 342. the economy layer chose the vessel by ARRAY POSITION — `cargoShipWithSpace` took the first local hull with room and `canUpgradeCrew`/`applyInlineBuy` read `currentShip()`, which at a dock is just the first local ship — so a Cargo Unit could fill a hold the player never meant to fill, and a crew upgrade that was legal on the second hull read as "Your crew must be average first" because only the first was consulted
- [x] 337. book 1 section 460 was the corpus's only prose difference from the import: task 262 replaced the invented `codeword="1.Skabb"` guard correctly but split the printed "codeword *Acid* or a **copper amulet**" into two sentences, on the mistaken belief that `codeword=` and `item=` on one `<if>` are AND'd — `evaluateCondition` documents and implements them as disjuncts, so one `<if>` states the OR and the author's sentence stands
- [x] 338. task 325's codeword-value gate lower-cased both sides of the lookup, so `codeword="anchor"` passed against the declared `Anchor` while `GameState.hasCodeword` and JaFL's `Codewords` (Java `Properties`) both compare case-sensitively — an award under one key and a test under another, leaving a branch that never opens and no diagnostic; the dictionaries are now explicitly ORDINAL, because a plain PowerShell `@{}` folds case and dropping the `ToLowerInvariant()` alone would have changed nothing
- [x] 339. six living documents still carried pre-task-324/327 claims: `ROADMAP.md` said nothing under `build/` reads `book.ini` and treated it as no precedent, `docs/The-Books.md`'s folder sketch contradicted its own paragraph fifteen lines later, `README.md` and `docs/Build-Pipeline.md` collapsed the two codeword-note grades into one and `README.md` called the intentionally renamed Java reference tree UNTOUCHED, `docs/Corpus-Census.md` printed the shipped-section regex without its end anchor, and `CHANGELOG.md` had no entry for task 324's player-visible map captions
- [x] 341. `renderTransfer` answered `applyTransfer`'s N-selection chooser with `chooser: () => [chosen]`, one item, then wrote the `xfer@` memo and rerendered the action done — so a `limit="2"` transfer moved one thing and the rest could never be picked; the picker now collects the whole limit through the same fixed-count collector the possession forfeit uses, and nothing moves, no memo is written and no price flag is set until the last pick lands
- [x] 344. asset ownership was inferred from sources that still EXIST, so a generated illustration stopped looking like output the moment its source was deleted or renamed and the reconciler preserved it as a manual drop-in; a still-published book's map survived its `-Map` source, and `web/assets/world-map.jpg` had no reconciliation path at all — a clean rebuild left every such orphan byte-for-byte unchanged and CI's rebuild-and-diff gate reported a match
- [x] 346. the repository-root `index.html` forwarded with `location.replace('web/')`, building a new relative URL with neither `location.search` nor `location.hash`, so `/?seed=42&demo=1.10` became `/web/` and `app.js` never saw either parameter — the deep links `README.md` and `docs/Playing-the-Game.md` advertise opened the plain title screen when shared from the canonical root
- [x] 347. `renderSheet` filtered codeword keys with `/^\d+\.\d/` alone — "hide internal box-codewords" — which catches only the dot-numeric shape, so the slash-scoped (`5/520`), word-continuing (`5.Aku.leaving`) and explicitly named engine flags (`StillInYellowport`, `HydraDamage`, `CharismaBonus`) were all chipped under "Codewords" beside Anchor; the sheet now shows a codeword only when the edition declares it, from the `Codewords=` union the build folds into `meta.json`
- [x] 348. both sail callers set `story._pendingSourceNode` BEFORE calling `sailThenGo`, but with several local ships that function stands a which-ship picker and returns having navigated nowhere — so the Story claimed the sail choice was taken while the question was open, and an item detour opened in that window (`Story.useItem` passes no source node, correctly) inherited it, its `<return>` crossing off a route no ship had sailed
- [x] 349. two derived-stat readers bypassed the mode-aware helpers beside them: `defenceForMode` stripped the weapon, armour, Defence aura, Defence affliction and god effect for `natural` and then added `rankValue()` unconditionally, so the ring of ultimate power's +2 Rank aura survived into "natural" Defence; and `<if ability="stamina">`/`<set value="stamina">` were two-way — any modifier meant the effective maximum — so `natural` read back the aura-inflated max
- [x] 350. §5.180's potion of restoration says "cure you of any diseases" and carries `disease="*"` alone, where §1.342's twin says "cure poison and disease" and carries both — so task 343's family reading makes it clear poison too; **resolved as correct**, because a printed DENIAL narrows a selector (§1.338) while printed SILENCE does not, and §5.180 nowhere says the potion cannot cure poison
- [x] 351. task 343's affliction family was deliberately asymmetric — `disease=` read both lists, `poison=` read poisons alone — and the sole reason was §1.338's printed "can cure you of poison but is unable to cure disease", so one section's sentence bent a shared function for all six books while task 350's own rule says a page's words decide; the family is now symmetric like the reference `Curse.matches`, the denial is `<lose … family="f">` on §1.338 itself, and the census checks both directions (a denial without the attribute, and the attribute without a denial)
- [x] 352. two AGENTS.md notes still pointed at "step 2's `cmd /c` line", which step 2 has not carried since task 235 made it `run-tests.ps1`; both now describe a by-hand `cmd /c` launch and say the runner is immune
- [x] 353. AGENTS.md's task workflow stopped at "take the first open task" with nowhere to go when the backlog is empty, which it is; step 1 now searches for `- [ ]` and sends the empty case to `ROADMAP.md`/`PLAN.md`, as `TASKS.md`'s header does
- [x] 354. AGENTS.md was ~38 KB loaded into every session, most of it incident history `docs/` already held; it is now ~19 KB of rules, each linking the doc with the why, after moving what the docs lacked (line endings into `Contributing.md`, two by-hand traps into `Testing.md`)
- [x] 355. `docs/Testing.md` stated a "Current baseline" pass count (3032) the suite had outgrown (3223); it now says to note and compare the count and records no figure
- [x] 356. AGENTS.md's closing "Behavioral Guidelines" were generic, non-ASCII boilerplate that partly repeated the task workflow; now four ASCII bullets carrying each distinct rule once
- [x] 357. AGENTS.md's step 4 filed new work "at the bottom of `TASKS.md`" where `TASKS.md` files it under a priority bucket and logs the pass, and no step said how a task is closed; the workflow now files and closes the way `TASKS.md` does
- [x] 358. `TASKS-archive.md`'s header said "stable IDs 1–336" and its Contents list ended at 336 while the file held sections to 357, because the close never added a Contents line; the header and intro no longer state a range, 337–358 are listed, and AGENTS.md's close step names the Contents line
- [x] 359. the service worker precached through the browser's HTTP cache and the CDN (Cloudflare, `max-age=14400` on `web/js`), so a new build's cache could be filled with the previous build's files — a stale or mixed shell kept under the new version key until the next deploy; `FLCache.precache` now fetches every entry at a build-unique `?v=` URL with `cache: 'reload'` and stores it under the plain URL, and the worker registers with `updateViaCache: 'none'`
- [x] 360. the header's 💾 "Save & quit to title" called `state.save(true)`, which returns true for an ephemeral `?demo=` preview without writing, so the preview was discarded while the button said it saved; the header and the menu now share `saveOrKeep`, which keeps a preview (labelled "Keep this adventure") and only saves-and-quits a real slot
- [x] 362. the source gate folded case on tag and attribute names (`FL_TAG_ATTRS` was a plain `@{}`, the root check `-ne`, the attribute check `-notcontains`), so a mis-cased camelCase attribute validated and was then ignored by the exact-case engine; `books/book3/207.xml` shipped `<SECTION>`/`<P>`. The name tables are ordinal dictionaries, the checks `-cne`/`-cnotcontains`, §3.207 is lower-cased, and three selftest fixtures pin it
- [x] 363. `walkEffectBody` dropped `<difficulty modifier=>` and never inferred `<random>` dice, and `groupFightRound` ignores `playerFirst=`, `<fightround>` and a `<fightdamage>` redirect — zero shipped sites, but the gate accepted every such shape; the walk now shares `difficultyModifier` with the page, the gate refuses the other shapes (`Test-HeadlessShapes`), and `suite-corpus` pins today's sites by name
- [x] 364. `sanitizeData` kept a resurrection deal with no section (a phantom deal that loops the death prompt), and defaulted a missing deal or extra-choice `book` to `out.book` before `out.book` was assigned, so always to book 1; the position is now assigned first and a section-less deal dropped
- [x] 365. `GameState.adjustStaminaMax` had no caller, and clamped to the written maximum that task 158 replaced with the effective one in its sibling; deleted
- [x] 366. README said to "set Pages to serve `/web`", which is not a Pages option and not how this site is deployed (root `CNAME` + root redirect); its file tree omitted `edition.js`, and its DOM-free module list omitted `state.js` and `visit-state.js`; the deploy section now describes the root-served Pages site behind Cloudflare, and both lists are complete
- [x] 367. `ROADMAP.md`, `PLAN.md`, `SPEC.md` and three `docs/` pages restated the 4,369 shipped-section count `docs/Corpus-Census.md` owns, and `PLAN.md` carried a dated status sentence; each now points at the owner (which gained its per-book command), and two stale 3,032 pass counts found by the same sweep were retired too
- [x] 361. `smoke.yml` pinned `actions/checkout@v4`, `actions/setup-node@v4` and `node-version: '20'`; GitHub removed Node 20 from its runners on 2026-09-23; now `@v7`/`@v7`/Node 24, and the first pushed run was green in all three jobs
- [x] 368. the Review log was nine-tenths of `TASKS.md`, mostly re-telling closed tasks whose detail is already archived; on the owner's go-ahead, the 123 entries below the latest `Reviewed` pass moved verbatim to `TASKS-archive.md`'s "Review log (archived)", and the header says where later ones go
- [x] 380. a failure captured after a passing report prefixed a header no runner could parse above the old `RESULT ALL PASS` line, so both runners read that line and exited 0 on a page titled `TESTS_FAIL`; `flFatal` now re-runs the reporter, which writes a numeric `RESULT FAILURES` verdict, both runners also require the `TESTS_OK` title for a pass, and `run-tests-selftest.ps1` drives a late rejection and a late failing assertion through the runner
- [x] 371. `loadSlotMeta` returned any parsed JSON, so `fl_meta = null` threw in `reconcileSlotMeta` before the title screen rendered and a junk entry listed a ghost card; it now keeps only a plain object of slot-number keys whose entries are objects with a string `name`, and what it drops is rebuilt from a readable blob or left occupied behind an unreadable one
- [x] 372. `sameCandidate` compared ships by hull, load count and name and items without their effects, so an excellent crew, a different cargo or a potion with uses left could be sold with no picker; it now compares crew, cargo contents (order-free) and effects, and the picker's labels name the crew and the uses left
- [x] 373. `GameState.keep` restored the preview when `save(true)` failed but left the blob a failed `fl_meta` write had already landed, so each retry claimed another slot; it now removes that blob, and if storage refuses the removal it reuses the same slot next time
- [x] 374. `buildGameScreen` released the update gate outright, so a new build could reload away an unkept `?demo=` preview or progress whose autosave had failed; the game screen's hold now follows the save-status channel (`holdUpdateWhileUnsaved`), a successful save or Keep applies the deferred update once, and Keep drops `?demo=` so that reload lands on the title
- [x] 375. two tabs that loaded one slot each wrote complete snapshots, so the staler tab's autosave replaced the other's newer progress; `save()` now refuses to write over a blob that is not the one this game last loaded or wrote (first writer wins), reports a conflict, and the "Progress not saved" modal adds "Load the newer save"
- [x] 376. the source gate skipped a missing `Adventurers.xml` and accepted `<adventurers/>`, so a published book could build with a New Adventure that threw; the gate now requires the file and the fields the creation path reads (`Test-AdventurersData`), and `suite-corpus` creates all six professions from each published book's own data
- [x] 377. `nextFreeSlot` and `GameState.load` read storage unguarded, so a browser blocking reads threw out of New Adventure before any recovery; `nextFreeSlot` now throws `StorageReadError` rather than guess a slot is free, `GameState.load` returns null, and New Adventure offers to play without saving (`newAdventureSlot`)
- [x] 378. the source gate left `<choice pay=>`, `<choice flee=>` and `<fightround pre=>` unvalidated, so a typo read as false (a waived cost, no escape, a late pre-round hook); `Test-AttrValue` now checks them as truth flags on those tags only, and `<fight flee=>` as the whole number it is
- [x] 379. the source gate lower-cased every enum and allowed `|` on all of them, so `special="ATTACK"`, `crew="EXCELLENT"` and `modifier="natural|noarmour"` validated and did nothing; `special` and `crew` are now exact-case, and a union is legal only where the reader splits one (`ability`, `ship`, cargo, and `profession` on `<tick>`)
- [x] 381. README, Game Rules and Playing the Game still said the best armour/weapon counts, Game Rules that fight bonuses never survive a save, and Game Rules and the XML Tag Reference that all six `modifier=` modes work on every tag; they now describe the wielded/worn choice, the visit-resume persistence and `current`'s two tags, and README's Training line says natural, not current
- [x] 382. a service worker never finished installing under `build/serve.py`. The cause was `FLCache.precache`, not the server: it read no body until every fetch had answered, so unread no-store bodies held the browser's six HTTP/1.x connections. `fetchOk` now reads each body as it arrives and stores a fresh copy (which also strips a redirect, as task 370's `unredirect` did), and `docs/Testing.md` records how to drive a real update
- [x] 370. the site moved from GitHub Pages to an assets-only Cloudflare Worker at `webfl.rwgs.net`, deployed by CI after every job passes; the precache strips the Worker's `index.html` redirect, only `CLOUDFLARE_API_TOKEN` turned out to be needed, Pages is off, and an installed copy updated and opens offline
- [x] 383. a Keep or import refused because another tab filled the chosen slot first deleted that tab's save: Keep removed the blob, and import's `deleteSlot` removed its meta too. The rollback now removes a blob only while it is still the one this attempt wrote, and import no longer touches meta, which a failed save never writes. That also fixes an import whose meta write failed, which used to leave its own blob behind
- [x] 384. rolling the destination die first released "Continue → 539" in book5/510 with the drowning check unmade, and did the same past book5/76's SCOUTING check and book6/373's possession-loss die. The roll gate's table seed now awaits every mandatory roll above its table, and an exit waits only for the awaited rolls above it. A revealed branch that sends the player on decides the route and holds the exits after it, so a failed drowning check no longer leaves the destination rows, or 3/157's ransom choices, live

---

> **Every completed task's detail is archived** in [`TASKS-archive.md`](TASKS-archive.md), under the same `## <N>.` heading it had here, so this file stays focused on open work. The checklist above carries every task's stable ID and status. **Status is one of three markers — `- [x]` done, `- [ ]` open, `- [~]` withdrawn — so a census reconciling the checklist against the detail headings must match all three: matching only `- [x]` drops the withdrawn rows (207 and 326) and reports them as missing, which is what filed task 326.** The open tasks' detail sections follow, in filed order; the Review log comes after them.

---

## 385. Forced action groups can be skipped

**Priority: MEDIUM.** Payments and narrative consequences are avoidable.

### What is wrong

`renderGroup` in [render-rewards.js](web/js/render-rewards.js) offers a button
but never uses the group's `force=` to hold progression. `groupPlan` in
[render-rules.js](web/js/render-rules.js) also omits that obligation.

[book6/496](books/book6/496.xml) explicitly puts the donation in
`<group force="t">`. With 100 Shards and a rope, its acceptance exit to 149 is
live before the group runs; clicking it reaches 149 with all 100 Shards and the
rope. The decline exit to 291 correctly stays live. Other explicit forced groups
include [book1/370](books/book1/370.xml)'s equipment loss,
[book6/135](books/book6/135.xml)'s weapon destruction, and forced outcome groups.
The XML spec defaults an unmarked group to optional, so a blanket group gate
would be wrong.

### Steps

1. Add a real-section regression to `suite-actions` for 6.496: decline is free,
   acceptance waits, and the chosen possession plus the cash leave once.
2. Carry explicit forced-group obligations through a DOM-free planner and gate
   the applicable onward controls until the group has committed. Keep earlier
   decline exits and the group's own navigation usable.
3. Cover an unanswered bundled picker, a forced outcome group, a completed
   group's resume, and an unmarked/explicitly optional group.
4. Run the complete build/test loop before closing.

---

## 386. Return frames drop visit-local bonuses and locks

**Priority: MEDIUM.** An item detour can remove a penalty or bypass destruction.

### What is wrong

`Story._captureReturnFrame` and `Story.goBack` in
[render.js](web/js/render.js), and `serializeFrame`/`deserializeFrame` in
[visit-state.js](web/js/visit-state.js), keep the source ctx and variables but
omit its fight-bonus and equipment-lock snapshots. Entering the detour calls
`Story.begin`, which clears both. Returning restores the granting ticks' memos,
so those ticks never reapply.

Browser probes used the lacquer box from [book6/252](books/book6/252.xml), which
can be inspected at any time, and [book6/272](books/book6/272.xml)'s real return
control. Returning to
[book6/624](books/book6/624.xml) changed the darkness attack penalty from -2 to
0; returning to [book6/135](books/book6/135.xml) left its previously locked
weapon slot unlocked. Current-visit save/resume already carries both snapshots;
the return frame does not.

### Steps

1. Add direct-return and detour-save/load/return cases to `suite-actions` or
   `suite-inventory`, using the two source sections above.
2. Capture and serialize the source visit's fight bonuses and equipment locks,
   coerce them on load, and restore them before any return autosave or render.
3. Keep source and detour snapshots distinct; verify the weapon cannot be
   switched after return and that any detour bonus does not leak back.
4. Run the complete build/test loop before closing.

---

## 387. Empty-god ticks retain initiation

**Priority: MEDIUM.** The shipped Forsaken result applies the opposite state.

### What is wrong

The "lose initiate status" group in [book6/589](books/book6/589.xml) contains
`<tick god=""/>`. `applyTick` in [engine.js](web/js/engine.js) forwards the empty
string to `GameState.setGod` in [state.js](web/js/state.js), which appends it to
the gods list. A Sig initiate receiving the result retains Sig and its +1
THIEVERY effect, with an additional empty god entry. The player still fails the
"worships no god" and safe-initiation tests. Browser and Node probes confirmed
this even after explicitly committing the group; task 385 is a separate gap.

### Steps

1. Add a `suite-engine` regression for the empty-god tick and a
   `suite-actions`/`suite-inventory` case that rolls 5 at 6.589 and commits the
   Forsaken group as a Sig initiate.
2. Make the empty-god form clear current initiation through the normal
   renunciation path, including god effects and tied resurrection arrangements.
   Preserve the ability to worship again; it is not `special="godless"`.
3. Verify an already uninitiated player gains no empty deity, ordinary named
   initiation still works, and save/load does not preserve a new bogus entry.
4. Run the complete build/test loop before closing.

---

## 388. Purse clamping breaks investment multiples

**Priority: MEDIUM.** The money-cache widget accepts investments forbidden by
the section's rule.

### What is wrong

The Deposit callback in `renderMoneyCache` in
[render-market.js](web/js/render-market.js) rounds the requested amount to
`multiples=`, then clamps it to the purse and cache headroom without rounding
again. In [book1/104](books/book1/104.xml), which prints "multiples of 100
Shards", requesting 200 with a purse of 150 deposits all 150. A browser probe
confirmed the resulting cache balance.

### Steps

1. Add a `suite-economy` widget regression using 1.104 with 150 Shards and a
   requested deposit of 200; only 100 may move.
2. Compute a legal multiple within all constraints, including purse and any
   cache maximum, in the DOM-free rule layer; use that result in the widget.
3. Cover less than one multiple, an exact multiple, partial headroom and a
   cache with no `multiples=`. Check withdrawal behavior against the spec too.
4. Run the complete build/test loop before closing.

---

## 389. Transfers silently select unequal possessions

**Priority: MEDIUM.** A required "choose which" transfer can take a more useful
item without asking.

### What is wrong

`itemsAllSame`, used by `transferPlan` and `applyTransfer` in
[engine.js](web/js/engine.js), compares only kind, normalized name and bonus.
It ignores ability, tags, effects/remaining uses and award provenance. Two
same-named rings with three and one uses therefore report `needChoice: false`.
The transfer takes the first and does not call a supplied chooser.

The real [book2/105](books/book2/105.xml) pickpocket widget also offered no
picker with those rings. [book6/635](books/book6/635.xml)'s weapon offering and
[book4/456](books/book4/456.xml)'s +1 offering share the same planner. Task 372
fixed sale equivalence, not transfer equivalence.

### Steps

1. Add `suite-engine`/`suite-economy` cases for equal-looking items with different
   effect uses, tags, abilities and groups. Verify the selected item alone moves.
2. Compare all gameplay-relevant identity when deciding whether transfers need
   a choice; a genuinely interchangeable set can retain the one-button path.
3. Update the real transfer picker in
   [render-market.js](web/js/render-market.js) so the labels distinguish the
   relevant differences, and verify selection through the 2.105 widget.
4. Run the complete build/test loop before closing.

---

## 390. Immunity to Injury has no usable protection

**Priority: MEDIUM.** A blessing granted by a shipped section is inert.

### What is wrong

[Book5/365](books/book5/365.xml) grants `blessing="injury"` and explains that it
can prevent Stamina loss from one source once, or for one entire combat round.
`GameState.damageStamina` in [state.js](web/js/state.js), `applyLose` in
[engine.js](web/js/engine.js) and the combat damage paths in
[combat.js](web/js/combat.js) offer no injury protection. The only readers of
`injury` in the app are labels; `renderSheet` in [ui.js](web/js/ui.js) displays
it as a chip, without an invocation control.

A browser probe acquired it through the real 5.365 menu, then fought the
Scorpion Shaman at [book1/105](books/book1/105.xml) with COMBAT 1. A low roll
inflicted 5 Stamina damage, leaving the blessing held. Neither the sheet nor the
fight offered a way to invoke protection before or after the wound.

### Steps

1. Add `suite-combat`/`suite-actions` regressions for a chosen invocation against
   a standalone wound and a full combat round, including multiple enemy attacks.
2. Implement the protection in the DOM-free rule layer and expose a player
   decision at the appropriate damage boundary. Respect the printed choice of
   when to use it; do not automatically spend it on the first minor wound.
3. Consume the blessing once, preserve unrelated penalties/effects, and cover
   declining protection, fatal damage and save/resume around the decision.
4. Run the complete build/test loop before closing.

---

## 391. Combat rerolls are offered after the enemy has already struck

**Priority: MEDIUM.** A promised reroll can become unavailable before the player
gets the chance to use it.

### What is wrong

`fightRound` in [combat.js](web/js/combat.js) resolves the missed player-first
strike and the enemy's reply together. `drawFight` in
[render-combat.js](web/js/render-combat.js) offers the COMBAT reroll afterwards;
`rerollAttack` rejects it when the player has already died. This also applies
the reply's damage/effects even when a successful retry would have defeated the
enemy before it could strike.

[Book4/324](books/book4/324.xml) promises a retry when a COMBAT roll fails.
At [book1/105](books/book1/105.xml), a character with COMBAT 5, 1 Stamina and
that blessing rolls two ones: the attack total 7 misses Defence 8, then the
enemy's total 7 beats player Defence 6 and kills the character. The probe's
retry returns false with the enemy still at 9 Stamina. Rolling two sixes on
the promised retry would score 17, deal 9 and win before the reply.

### Steps

1. Add `suite-combat` regressions for that fatal-reply case and a nonfatal reply
   that a winning reroll should prevent. Existing task 91 tests use harmless
   replies and cannot detect the ordering problem.
2. Make a missed strike with an eligible reroll a decision boundary before
   advancing to the next part of the round. Keeping the miss runs the pending
   reply once; a retry resolves the new strike first.
3. Preserve enemy-first initiative, group fights, multi-attack enemies,
   wound/round hooks and once-per-round retry limits. Save/resume must not
   repeat or bypass a pending reply or reopen a consumed blessing.
4. Run the complete build/test loop before closing.

---

## 369. CI's `ubuntu-latest` image moves to Ubuntu 26 on 2026-10-19

**Priority: LOW.** Nothing is broken. But the move lands without any change to this repository,
and CI is the drift gate (task 361).

### What is wrong

Run 36564906180 (the first run after task 361, green in all three jobs) carries one notice
annotation per job: "The ubuntu-latest label will migrate to Ubuntu 26 beginning October 19,
2026" (actions/runner-images issue 14748). Every job in `.github/workflows/smoke.yml` is
`runs-on: ubuntu-latest`, and the workflow leans on what that image preinstalls:

- `pwsh` 7, for every `shell: pwsh` step and `build-data.ps1`;
- `google-chrome`, called by name in the `smoke` job;
- `python3`, for the `http.server` the suite is served from.

If the Ubuntu 26 image drops or renames any of them, CI stops on the next push with an
environment error, not a code one.

### Steps

1. Read the runner-images issue and the Ubuntu 26 image's software list, and check each of the
   three tools above.
2. Either confirm all three are present (and leave `ubuntu-latest`), or pin `runs-on:
   ubuntu-24.04` with a comment naming the missing tool, or install it in the job.
3. Record the decision in the workflow comment beside the `smoke` job.

**Status 2026-09-29:** steps 1–3 are done. The issue gives the rollout as 2026-10-19 to
2026-11-19. The Ubuntu 26.04 image's software list (`images/ubuntu/Ubuntu2604-Readme.md`)
preinstalls PowerShell 7.6.6, Google Chrome 153.0.8010.52 and Python 3.14.4, where 24.04 has
7.6.6, the same Chrome and 3.12.3. Nothing the jobs call by name is dropped, so every job stays
on `ubuntu-latest`, and the comment beside `smoke` records that. The task stays open until a
pushed run on the new image validates it.

### Validation

- A pushed run on or after 2026-10-19 is green in all three jobs.

---

## 392. A refused slot claim reports a two-tab conflict over the player's own adventure

**Priority: LOW.** Wording only, and nothing is lost. Found while fixing task 383.

### What is wrong

When `GameState.keep` or `importSave` in [state.js](web/js/state.js) picks a free slot
that another tab fills before `GameState.save` reads it, save() refuses the write with
`SAVE_CONFLICT`: "This adventure has been saved from another tab or window since this
one loaded it ... Export this tab's adventure to keep it, or load the newer save to
continue from there." For a preview being kept, or a file being imported, that is wrong.
The newer save in the slot is somebody else's adventure, not a newer copy of this one.
Retrying Keep or the import picks the next free slot and succeeds (task 383's tests show
this), but the message never says so.

### Steps

1. Give the refused claim its own message, for example "Another tab saved an adventure
   into that slot first. Please try again.". It could be set by `keep` and `importSave`
   when save() reports `saveConflict`. Leave the two-tab message for a loaded game.
2. Assert the wording in task 383's block in `suite-economy`.
3. Run the complete build/test loop before closing.

---

## Review log

*Running audit log of the backlog — each pass re-verifies the open items against
the current code and records what was filed, split, or re-confirmed. Task
numbers refer to the contents checklist at the top of the file.*

Worked 2026-10-01 (task 384): closed **384**, filed nothing. `computeRollGate` in
`render-gates.js` now does three things:
- Its table seed awaits every mandatory roll above the table. That changes 5/76, 5/510, 6/86
  and 6/373, the only shipped tables with two such rolls.
- It collects the exits a later roll reveals (a branch's `section=`, the navigation inside a
  table row).
- It names the `<success>`/`<failure>` branches that send the player on.

The new `rollGateHold` decides each exit separately. An exit waits for the awaited rolls above
it. After a revealed redirect branch, the exits that follow are held as "Your route is
decided". A census of shipped branches with a forced redirect and an unconditional exit after
them found 13 sections, among them 1/168, 1/344, 3/157, 4/540 and 5/689, where a failed
survival or escape check used to leave the later exits live. Task 384's block in
`suite-actions` drives 5/510 in both click orders and resumes it with one roll made. It also
covers both 5/76 results, 6/373's possession picker, 3/157 and 4/540. Against the old code it
reported 9 failures and a fatal. Task 292's census now expects the four table sections, and
task 257's §3.15 assertion expects a section gate that awaits only the table die.
`RESULT ALL PASS pass=3390 fail=0`, and `node-import.mjs` passed.

Worked 2026-10-01 (task 383): closed **383**, filed **392**. `keep` and `importSave` now roll
back through `removeOwnBlob` in `state.js`. It removes the slot's blob only while it is still
the one this attempt wrote, and import no longer calls `deleteSlot`. Task 383's new block in
`suite-economy` uses a storage stub to publish a rival save, blob only or blob and meta,
between the slot search and save()'s re-read. It also covers a rival replacing a partial write
before clean-up, and a rival filling the slot that task 373 holds after a refused clean-up.
Against the old `state.js`, 11 of its 19 assertions failed. One of those was a further bug:
an import whose meta write failed left its own blob behind, because `deleteSlot` gave up when
its own meta write failed. **392** (LOW) records that the refused claim reports the two-tab
message, which wrongly calls the rival's save a newer copy of this adventure.
`RESULT ALL PASS pass=3371 fail=0`, and `node-import.mjs` passed.

Reviewed 2026-10-01 (Codex, engine follow-up): filed **383-391**, closed nothing.
The full engine report is [review-codex.md](review-codex.md). **383** is HIGH:
failed Keep/import rollback can delete the competing save that caused the conflict.
Browser probes confirmed skipped sequential survival/forfeit rolls (**384**),
ungated forced groups (**385**), lost fight bonuses and equipment locks on return
(**386**), retained initiation after an empty-god tick (**387**), illegal investment
multiples (**388**), missing unequal-item transfer choices (**389**), inert injury
immunity (**390**) and fatal enemy replies preceding COMBAT rerolls (**391**). The
unchanged full suite passed with `RESULT ALL PASS pass=3352 fail=0`; DOM-free
imports passed with `pass=35 fail=0`. An isolated browser probe intentionally
asserting the correct behavior reported `pass=12 fail=17`, with no fatal error.
The prior current Review log moved verbatim to the top of the archive's Review log.
Existing **369** keeps its external validation requirement. This pass files fixes;
it does not implement or close them.

> Earlier review passes are archived, verbatim and newest first, in [TASKS-archive.md's "Review log (archived)"](TASKS-archive.md#review-log-archived). Passes from 2026-07-15's third full pass and earlier are in [REVIEW.md](REVIEW.md). The most recent `Reviewed` pass and the `Worked` entries since it stay above.
