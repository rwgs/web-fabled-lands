# Fabled Lands — Web Edition · Engineering TODO

Backlog of recommended improvements. Open tasks are filed under priority buckets
(**HIGH** / **MEDIUM** / **LOW**) — work the first open (`- [ ]`) item top-down;
each task's detail section carries the same stable ID. Every filed task through
276 is complete (listed under **Done** below), apart from 207, withdrawn as a
misdiagnosis (see the Review log); **277 is open**. File new
work under the priority bucket that fits, and record the pass in the Review
log. Completed detail sections are archived in
[`TASKS-archive.md`](TASKS-archive.md); the Review log at the end of this file
records each audit pass and is where new work is filed.

This file is for **defects**. New features are scoped in
[`ROADMAP.md`](ROADMAP.md) instead, as ordered phases — pick up a phase from
there once the buckets below are clear.

**HIGH**

*(none open — file new HIGH work here)*

**MEDIUM**

- [ ] 277. `renderRankcheck`/`renderTraining` never render their node's own words, so 45 shipped sections silently drop the printed roll instruction

**LOW**

*(none open — file new LOW work here)*

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

---

> **Completed task details (tasks 1–274) are archived** in [`TASKS-archive.md`](TASKS-archive.md) (tasks 141, 165, 211, 255, 274) to keep this file focused on open work. The checklist above still carries every task's stable ID and status; a done task's detail lives in the archive under the same `## <N>.` heading. No completed detail remains in this file; the Review log follows.

---

## 275. `applyTick`'s equipment branch is the one recognised attribute that does not set `did` when it matches nothing, so §5.386's enchant and §6.731's shrine boon tick a section box and toast "box ticked" at a player carrying no weapon

**Priority: LOW — no shipped section pairs an equipment `<tick>` with `boxes=` or an
`<if ticks=>` guard (censused: 0 overlap), so today the whole cost is one spurious write into
the saved `boxes` map and one wrong toast. It is filed because the write is silent, persistent
and uncapped, and because the guard that prevents it is already written twice in the same
function for other attributes.**

*(Filed 2026-08-15, found during conversion work on an unpublished book.)*

`applyTick` (`engine.js:912`) is a cascade of `if (get('attr') != null)` branches over one
`<tick>`, each setting `did = true`, closed by a fallthrough:

```js
// Bare <tick> (no meaningful attrs): tick the visit box(es) for this section.
if (!did) { state.addTick(null, null, count); notes.push('box ticked'); }
```

The fallthrough is right — a bare `<tick>place a tick in it now</tick>` is how the books write a
section box. What makes it a defect is that **`did` is meant to mean "a recognised attribute was
present", not "the effect changed something"**, and the function says so twice in its own
comments:

* `ability=` (`:948`) — *"mark `did` so a recognized-but-zero effect never falls through to the
  box tick"*.
* `crew=`/`cargo=` (`:959`) — *"a recognized attribute with no vessel present is inert but still
  sets `did` (no bare-tick box fallthrough)"*.

The equipment branch (`:983`) is the exception:

```js
const eqAttr = ['weapon', 'armour', 'tool', 'item'].find((k) => get(k) != null);
if (eqAttr != null && (get('addbonus') != null || get('addtag') != null || get('removetag') != null)) {
  const targets = selectEquipment(el, state, eqAttr, cacheN, opts);
  …
  if (targets.length) { …; did = true; }   // <- only when something matched
}
```

`selectEquipment` returns `[]` whenever the selector matches nothing — no weapon of that kind
carried, a `using="t"` narrowing with nothing wielded or worn, a `tags=` filter that misses, or
an empty `cache=`. Every one of those is an ordinary reachable state, and each falls straight
through to `addTick`.

**Measured in the browser against a real `GameState`, not inferred.** §5.386 (Targdaz's enchant,
whose first node is `<tick weapon="?" addtag="Tz">one weapon</tick>`) entered by a player carrying
no weapon:

| player | `boxes['5.386']` after entry | notification |
| --- | --- | --- |
| no weapon | **1** | **"box ticked"** |
| one sword | absent | none |

**Census of the shape: 12 nodes across 4 sections** — `books/book[1-6]/[0-9]*.xml`, `<tick>`
carrying `addbonus=`/`addtag=`/`removetag=`: **§2.665** (6, all `item="*" cache="2.617"` — the
strongroom, empty for a player who left nothing), **§5.386** (4, `weapon="?"`), **§6.135** (1,
`weapon="?" using="t"` — Mister Dragon snaps "whatever weapon you are using", which a
bare-handed player is not using), **§6.731** (1, the roll-1 shrine boon
`<tick weapon="?" addbonus="1">`). None of the four carries `boxes=`, and no section in the
corpus carries both `boxes=` and an equipment `<tick>` — which is exactly why this is LOW and
exactly why it should not be left: `addTick` deliberately leaves **a boxless section uncapped**
(`state.js:778` caps only when `_sectionBoxes > 0`), so the count grows without bound across
visits, and the first page written with both would read its own `<if ticks="0">` guard wrong.

**The fix is one line** — hoist `did = true` out of the `if (targets.length)` guard, so a
recognised `eqAttr` + modifier pair marks the node handled whether or not it matched, matching
the two branches above. `state.reconcileEquipment()`/`state.changed()` should stay inside the
guard: nothing moved, so nothing needs settling or saving.

---

## 276. `applyTick`'s profession branch drops a pipe-list on the floor without setting `did`, so a hidden or effect-body `<tick profession="a|b">` ticks a section box instead of doing nothing — the second half of task 275's guard, with 0 corpus nodes today

**Priority: LOW — unreachable in the shipped corpus (censused below: the one pipe-list
profession tick is visible prose, which the view intercepts), so nothing misbehaves today. It is
filed because it is the *same* defect task 275 just fixed one line above it, left standing in the
one branch the fix did not cover, and because the shape it needs is a `<tick profession="a|b">`
written as hidden or inside an effect body — both ordinary things for a new book to write.**

*(Filed 2026-08-15, found while fixing task 275.)*

`applyTick` (`engine.js:996`) closes its cascade with:

```js
// Change profession (book6/731 "become a Priest"); a pipe-list ("mage|rogue|…") is a
// player choice handled by the view's picker (book6/118), so apply only a single one here.
if (get('profession') != null && !get('profession').includes('|')) { state.setProfession(get('profession')); did = true; }
```

The comment is right about *why* the pipe-list is skipped, but skipping it also skips `did`, so
the node falls through to the bare-tick box — the exact failure task 275 fixed for `weapon=`/
`armour=`/`tool=`/`item=`, and the exact thing `ability=` (`:948`) and `crew=`/`cargo=` (`:959`)
each carry a comment about avoiding. A recognised attribute the engine deliberately declines to
act on is *inert*, not bare.

**Reachability — two paths, both real, neither exercised by today's corpus.**

* `classifyPassive` gates all three player-choice modes on `!hidden`
  (`render-rules.js:1041-1043`), so `hidden="t"` skips the picker and falls to `mode: 'apply'`,
  which calls `applyTick` with the raw node.
* `applyEffectBody` walks `PASSIVE_BODY_TAGS` — which includes `tick` (`engine.js:484`) — and
  calls `applyEffect` directly with no view and therefore no picker, so a pipe-list profession
  tick written inside a `<fightdamage>`/`<success>`/`<outcomes>` body box-ticks regardless of
  `hidden=`.

**Census (shipped corpus only — `books/book[1-6]/` numeric basenames, per task 270): 2
`<tick profession=>` nodes total.** §6.731 `profession="priest"` (single, handled) and §6.118
`profession="mage|rogue|troubadour|warrior|wayfarer"` — the post-dragon Priest disqualification,
visible prose inside `<if profession="priest">`, so it renders the five-way picker and never
reaches `applyTick` with the list. **0 hidden pipe-lists, 0 inside an effect body.**

**The fix is the same one line** — set `did = true` whenever `profession` is present, and keep
`setProfession` behind the single-value test:

```js
if (get('profession') != null) { if (!get('profession').includes('|')) state.setProfession(get('profession')); did = true; }
```

Add the assertion beside task 275's in `suite-combat.js`: a hidden pipe-list profession tick
leaves `tickCount` at 0 and the profession unchanged.

---

## 277. `renderRankcheck`/`renderTraining` never render their node's own words, so 45 shipped sections silently drop the printed roll instruction

**Priority: MEDIUM — a visible prose loss in 45 sections across five books, with no rules
consequence: the roll itself is correct in every one of them, and the widget's generic label
("Rank check (roll 1 die)") stands where the author's sentence should be. It is filed MEDIUM
rather than HIGH because nothing is mis-adjudicated and no exit is mis-gated; it is not LOW
because the dropped words are load-bearing English — §1.262's paragraph loses its entire roll
instruction and §5.59's loses a clause from the middle of a sentence, leaving a doubled comma.**

*(Filed 2026-08-16, found while reading the roll renderers for an unrelated question about
conditional die counts.)*

Every roll renderer in `render-rolls.js` shares one helper for the descriptive text its node
carries:

```js
// The descriptive text a <difficulty>/<random> node carries before its widget (task 172):
// rendered only when it actually has words, so an empty node adds no stray span.
function appendRollDescription(story, container, node, path) { … }
```

`renderDifficulty` (`render-rolls.js:235`) and `renderRandom` (`:290`) call it.
**`renderRankcheck` (`:332`) and `renderTraining` (`:362`) do not** — and neither reaches the
node's children by any other route: each goes straight to `makeRollWidget`, and the only other
read of the subtree is `childAdjustment(node, state)`, which collects `<adjust>` elements and no
text. `renderElement`'s "unknown element: render children so we don't lose prose" fallback
(`render.js:1397`) cannot help either, because both tags ARE in `TAG_RENDERERS`.

So the words are parsed, walked past, and dropped. The widget's own label is all that renders.

**The clearest instance is §1.262**, whose second paragraph is nothing but the roll:

```xml
<p>
    <rankcheck dice="1" add="-1">Roll a die and subtract one from the result</rankcheck>.
    <success>If you score less than or equal to your Rank, <goto section="546"/>.</success>
    <failure>Otherwise, <goto section="133"/>.</failure>
</p>
```

The player reads `Rank check (roll 1 die).` and is then told "If you score less than or equal to
your Rank" — with the −1 the printed sentence explains applied invisibly. §1.139 is the same
shape with the surrounding clause left behind: it renders `Rank check (roll 1 die), and subtract
one from the score.`, a sentence beginning with a comma.

**§5.59 is the `<training>` half and the more damaging kind**, because the dropped words are
mid-sentence:

```xml
As a reward … Choose the ability of your choice (i.e. COMBAT, CHARISMA, and so on),
<training>roll two dice</training>,
and if the result is higher than that ability, you can add one to it permanently.
```

which renders as `…and so on), , and if the result is higher…`.

**Census (shipped corpus only — `books/book[1-6]/` numeric basenames, per task 270).** 54
`<rankcheck>` nodes, of which **22 carry text**: §1.139, §1.168, §1.260, §1.262, §1.263, §1.284,
§1.467, §4.5, §4.253, §4.306, §4.329, §4.370, §4.521, §4.529, §4.540, §5.65, §5.92, §5.167,
§5.308, §5.357, §5.510, §5.606. 62 `<training>` nodes, of which **23 carry text**: §2.89,
§2.453, §2.631, §2.673, §3.37, §3.316, §3.427, §5.32, §5.59, §5.63, §5.108, §5.187, §5.197,
§5.283, §5.315, §5.347, §5.408, §5.462, §5.484, §5.507, §5.652, §5.668, §6.235. **45 sections in
all**; the other 71 nodes are self-closing or hold only `<adjust>` children and lose nothing.

**The fix is one call in each renderer**, placed exactly as the two working ones place it —
immediately before `makeRollWidget`, so the words precede the widget:

```js
export function renderRankcheck(story, container, node, path) {
  const dice = parseInt(node.getAttribute('dice') || '1', 10);
  const add = parseInt(node.getAttribute('add') || '0', 10);
  appendRollDescription(story, container, node, path); // its own descriptive text
  const { key, widget } = makeRollWidget(story, container, node, path);
  …
```

and the same line in `renderTraining` before its `makeRollWidget`. `appendRollDescription`
already appends nothing for an empty node, so the 71 wordless nodes are untouched.

**Two things to check when writing it, both cheap.** `<training ability="a|b">` renders an
ability picker into the widget when no choice has been made yet — the description belongs
*above* that, which the placement above gives for free. And `childAdjustment` reads `<adjust>`
children directly off the node, so walking the same subtree for text does not consume them
(`renderRandom` has done both since task 172); confirm on §1.324, whose `<random>` carries text
and three `<adjust>`s together.

Assertions for `suite-render.js`, beside the task-172 description tests: a
`<rankcheck dice="1">Roll a die</rankcheck>` renders "Roll a die", a self-closing
`<rankcheck dice="2"/>` adds no stray span, and the same pair for `<training>`.

---

## Review log

*Running audit log of the backlog — each pass re-verifies the open items against
the current code and records what was filed, split, or re-confirmed. Task
numbers refer to the contents checklist at the top of the file.*

Filed 2026-08-16 (reading pass, no code changed): **277**, found while reading `render-rolls.js`
for an unrelated question about conditional die counts during conversion work on an unpublished
book. Nothing was open when the pass started and the defect is not one a test could have caught —
every assertion about these two tags is about the *roll*, and the roll is right. What found it was
comparing the four roll renderers side by side and noticing that two of them call
`appendRollDescription` and two do not; the census that turned one asymmetry into 45 sections took
one command. The lesson worth carrying is that **a shared helper only two of four siblings call is
a defect shape in itself** — the other three roll-adjacent helpers (`rollGate`,
`markWhilePending`, `writeRollVar`) are called by all four, which is why this one reads as an
omission rather than a decision. A sweep of the remaining tag families for the same asymmetry has
not been run and may be worth a pass.

Worked 2026-08-15 (implementation pass, task 276): closed **276**, filing nothing — every bucket
is clear again, so the next pass starts from `ROADMAP.md`. The one line the filing named, plus one
assertion (a `hidden="t"` pipe-list leaves `tickCount` at 0, the profession at Priest, and returns
no note); JS-only, stamp not rebuild; **`RESULT ALL PASS pass=2708 fail=0`**. One thing worth
carrying forward, and it is about the *code*, not the defect: with both halves fixed, **every
branch of `applyTick` now sets `did`, so the flag no longer distinguishes anything** — the
fallthrough fires exactly when the element carries none of the ~18 recognised attributes, which is
a property of the element alone. A future pass could replace the running flag with one predicate
read off the node (and get a testable "is this a bare tick?" out of it), but that is a refactor of
working code with no defect behind it, so it belongs in `ROADMAP.md` if anywhere and is not filed
here. What is worth *keeping* either way are the four comments now standing over those branches:
they are the only record that "recognised but declined" and "recognised and applied" must land in
the same place, which is the rule both 275 and 276 broke.

Worked 2026-08-15 (implementation pass, task 275): closed **275** and filed **276**, its own
second half. The fix is the one line the filing predicted — `did = true` hoisted out of
`if (targets.length)` in `applyTick`'s equipment branch, with `reconcileEquipment()`/`changed()`
left inside it, since an empty match moved nothing and has nothing to settle or save. Three
assertions in `suite-combat.js` beside the task-75 equipment cluster: §5.386's
`<tick weapon="?" addtag="Tz">` at an empty pack ticks no box and returns no note, §6.731's
`<tick weapon="?" addbonus="1">` at a bare-handed player likewise, and — the one that matters for
a `did` change — a genuinely bare `<tick>` still ticks. JS-only, so `stamp-version.ps1` and not a
data rebuild; **`RESULT ALL PASS pass=2707 fail=0`**. Two things worth carrying forward. **The
"one recognised attribute" in 275's title was one short**: `profession=` skips a pipe-list without
setting `did` for a *documented* reason (the view owns the picker), which reads as deliberate and
is why neither the filing's read of the cascade nor its census caught it — the census asked for
`addbonus`/`addtag`/`removetag` and a pipe-list carries none of them. So the generalisation to
keep is that **`did` is broken by any branch that declines to act, whatever its reason**, and the
three comments in the function that spell that rule out are worth more than the two lines of code
they guard. **The second path is the one a `!hidden` audit would miss**: `applyEffectBody` walks
`PASSIVE_BODY_TAGS` — `tick` is in it — with no view at all, so every view-side gate
(`classifyPassive`'s picker modes, the fight gate, the forfeit hold) is absent by construction for
an effect written inside a `<fightdamage>`/`<success>`/`<outcomes>` body. Any future "the view
handles this case" comment in a rule module is therefore a claim about *one* of two callers, and
should say which.

Worked 2026-08-13 (maintenance pass, task 274): filed and closed **274**, the fourth re-archive
(after 141, 165, 211 and 255). Documentation only — no code, data, build or test file touched, so
no rebuild or stamp change is implied. Detail sections 256–274 moved verbatim into
`TASKS-archive.md` (now IDs 1–274), the bucket rows merged into **Done**, and TASKS.md drops from
**2,635 to 1,556 lines** with all three buckets empty and nothing open. Two things worth carrying
forward. **The bucket/**Done** duplication task 255 recorded at 28 rows is structural**: it was back
at 4 (267–270 listed in both) eighteen tasks later, because closing a task appends it to **Done**
without removing its bucket row — while 271–273 had drifted the *other* way, sitting in a bucket
and never reaching **Done**. An append-only merge would have produced four duplicate rows and left
three tasks off the list, so the merge is a set union in both directions. **The line-slice's
boundary assertions are what make a bulk move safe**: the script refused to write unless the first
moved line was `## 256.`, the line before the surviving archive-range note was `---`, and the block
carried exactly 19 headings with IDs 256–274 contiguous — then validated afterwards that all 273
checklist IDs (1–274 less 207, withdrawn) have exactly one detail heading across the two files.
That last check is also what explains the archive's 273-row Contents against 274 detail sections:
207 keeps its detail and has no checklist row, which is how the withdrawal has read since task 211.

Worked 2026-08-13 (implementation pass, task 273): closed **273**, filing nothing — every bucket is
now clear, so the next pass starts from `ROADMAP.md`. Took the filing's own recommendation and
widened task 261's ledger rather than rewriting the sections: `spendMark` also snapshots the
codewords (and their counter values), `noteSpend` books the ones the node crossed off, and
`sheetAt` hands them to `evaluateCondition` as `opts.codewordsNow`, which `codeword=` reads through
`matchCodewords` and `name=` through the value. Three things worth carrying forward, and the first
is that **the filing's census was wrong in the direction that matters — it named 9 goto-carrying
sections and the corpus holds 10.** The missing one is §2.633, and it is missing for a reason worth
keeping: its guard is an OR list (`<if codeword="Bastion|Brush">`) and its four `<lose>` nodes sit
inside a `<group force="t">`, so a scan matching the guard's attribute STRING against the lose's
never paired them. Re-measured by walking the tags instead (26 guards over 21 sections; 10 enclose
a `<goto>`, 16 over 11 further sections enclose prose only, where the filing said 21/20/9/12 — it
also counted §2.229's five-branch `elseif` chain as one guard). §2.633 is also the sharpest case,
because it is **click-driven**: the codewords go when the player presses the group's button, and
the →657 the button is FOR grayed on the redraw that same click triggers, where §2.143 at least
needed some later `rerender()`. **A census that matches attribute text cannot find the guard that
spells its codeword differently** — the same shape as task 272's "a census filtered on the symptom
cannot find the form that shares the cause". Second: **the value has to ride along with the
codeword**, because `removeCodeword` deletes `codewordValues[cw]` too, so restoring the codeword
alone would answer an `<if name="X" greaterthan="1">` above the deletion with 0 — the `ticks=` half
of that pairing is task 216's, and no shipped section pairs `name=` with a spend today (the census
says so), so that assertion is synthetic. Third: the reading stays **asymmetric on purpose** — only
a taking is booked, so a codeword GAINED below a guard is still read live, exactly as a Shard is.
Ten assertions across `suite-render` and `suite-corpus`, four of which fail with the old behaviour
restored (drop `opts.codewordsNow` and §2.143 reports `601=gray 625=live` verbatim); the six that
stay green with it are the first-draw controls, the never-held control, the gain-reads-live rule
and the census. Suite **2694 → 2704**.

Worked 2026-08-13 (implementation pass, task 272): closed **272**, filing nothing — the buckets are
now clear, so the next pass starts from `ROADMAP.md`. Took the recommendation and aligned the fourth
taker with the first: `transferMovers`'s hand-rolled `item="*"` filter is gone and `applyKeepRule`
runs once over the movers when `from` is absent, which is *smaller* than what it replaced. Two
things worth carrying forward, and the first is that **the filing under-counted its own defect —
measuring the fix found a fourth generic form the probe had not asked about.** §2.639's
`<transfer armour="*" xarmour="?" xgroup="2.639">` is generic by any reading, but `include.all` is
`!kind && pattern === '*'`, so a `kind=` selector is **never** `all` and `armour="*"` walked past a
filter written for the bare form — while `<lose armour="*">` spares a kept suit (task 118's own
assertion). The filing's table listed three sections because the probe listed three; the census that
would have caught it, "five non-`*` player-source transfers", was in the filing and `armour="*"` is
not one of them. **A census filtered on the symptom cannot find the form that shares the cause.**
Second: **the one-line fix is exactly equivalent on the path it replaces**, which is what made it
safe to widen — `applyKeepRule(movers, '*')` computes `ordinary` and, finding the spec unnamed,
returns it, which is the old `pool.filter(!isKeep)` to the item. So the `all` case cannot regress by
construction, and the diff is only about the forms that had no rule at all. Ten assertions in
`suite-actions`, six of which fail with the old behaviour restored — the sharpest being §2.105
applied end to end, `carried= cache=1`: the sheet emptied and §4.103's sword sitting in a
pickpocket's stash. Controls pin the three things that must NOT change: a named
`<transfer item="paper sword">` still moves a kept one (§6.635's second node), §6.746 still hands
back what §6.635 took (`from=` is a stash, not a sheet), and an ordinary possession beside a kept one
still moves. Suite **2684 → 2694**.

Worked 2026-08-13 (implementation pass, task 271): closed **271** and filed **272** (LOW). Took the
filing's own recommendation — option (2), offered-but-disabled with a reason — so the deposit list
reuses the `store.disabled = true; store.title = reason` branch §2.617 already had. The rule itself
went nowhere near the view: `isKeep` is now exported from `engine.js` and `classify` splits into
`classifyFilters` plus a keep override, so the strongroom tests the same predicate the other four
takers do rather than growing its own copy. Three things worth carrying forward. **The negative
control is the part that earned its keep** — with the override stubbed out, five of the eleven new
assertions fail, and the §1.177 line prints the defect verbatim (`Store White Sword (Combat
+8):false`, i.e. enabled). A render assertion that only ever ran green against the fix would not
have distinguished "the button is disabled" from "the button was never built". **The keep test has
to run AFTER the filters, not before it**, and the ordering is not cosmetic: `classify` returns
`candidate` separately from `eligible`, and an early return would have made a kept *tool* a
candidate at §2.617, listing a disabled button at a smithy that takes only weapons and armour —
inventing a widget row where the bug was an over-permissive one. The suite pins that
(`§2.617 never offers a kept item of the wrong kind`). Where both apply, keep's reason now wins over
the filter's; both are true, and keep is the more fundamental. **Closing the fifth taker is what
found the fourth disagreeing**, which is 272: `transferMovers` reaches its keep filter only for
`item="*"`, so `<transfer item="?">` from the player moves a kept possession where `<lose item="?">`
spares it — measured through `transferPlan` in Node, `movers=["white sword"]` against a control of
`[]`, for all three of the corpus's generic player-source transfers. §6.310 is the sharpest (nothing
transfers back `from="6.310"`), not §2.105, which is the only forced one but hands back at §2.174.
Census: 31 `<itemcache>` nodes, 30 bare, §2.617 alone filtered — pinned in the suite, so a new
filtered strongroom moves the count and wants reading. Suite **2673 → 2684**.

Worked 2026-08-13 (docs-accuracy pass, task 270): closed **270**, filing nothing. Four things worth
carrying forward, and the first is that the glob is worse than the task says. **`temp/` is only half
of what `books/**/*.xml` over-counts; the other half is 48 files that are not sections at all.** The
shipped corpus is the `^\d+[a-z]?$` basenames of the published books — **4,369** files, because that
is the filter `build-data.ps1` bundles and `validate-source.ps1` checks — while the glob returns
**4,437**: the 20 superseded working copies *plus* `Adventurers.xml`, `New.xml` and six pregen
biographies per book. That second set is the bigger distortion of the two for the census this pass
re-ran: every pregen bio ends `<goto section="1" force="f"/>`, so `force="f"` reads **187** sections
by the glob against the shipped **147** — 36 of the 40 extra sections are bios, only 4 are `temp/`.
The gate already knows the distinction (`validate-source.ps1` step 2b deliberately passes a file
whose `<section name=>` is a person or a book title), so this is a fact about by-hand globs alone,
and it is now in `AGENTS.md` beside "nothing walks it". **Re-running all nine censuses found the
error was units, not the glob — three times out of four.** 263/265's 14-and-4 and 6-and-2, 266's
3-and-2, 267's 14 demotions, 268's 346 and 261's 15 `not=` guards are all identical over both
sources; the only count the glob really moves is 269's, exactly as filed (558 vs 569, `random`
464 → 466, `difficulty` 80 → 89, the 11 extras in the six temp files the task names). **Task 264's
"35 `<goto>` and 12 `<difficulty>`" is a NODE count sitting in a sentence that reads as sections**,
which is why it did not sum: by section the 42 partition as 27 `<goto>`, 8 `<difficulty>`, 1
`<group>` (§1.187) and the 6 effect nodes the hold is scoped to — exactly 42, where 35 + 12 + 6
was 53 and should have been the tell. Corrected in the review log and in the suite comment that
repeats it, with both units named so the next reader can check either. **Two more prose counts were
simply wrong and neither came from the glob.** Task 266's "the JS returns three where the Python
returns four" is **five** — the group exclusion drops §4.622 and §5.192, both of which that same
entry names, so its own list contradicted its number; and task 267's "book 3's ten" is **eleven**
(book 3 carries 11 of the corpus's 14 `<lose crew="N">` demotions, in 11 sections, and book 5
carries none, which is the part the sentence was making). No code changed and no assertion moved:
suite **2673**, unchanged, as a docs pass should leave it.

Worked 2026-08-13 (implementation pass, task 269): closed **269** and filed **270** (LOW). Four
things worth carrying forward, and the first is that the filing argued its own fork the wrong way
round. **The case for keeping the four branches was a claim about the tag, and reading the tag
refuted it.** The filing has it that "none *misreads* its corpus form the way the crew branch did:
an `<adjust ability="combat" amount="1"/>` applied as an effect means what it looks like". It does
not: `adjustApplies` returns true for an unconditional modifier and `adjustAmount` returns its
`value=`, so that node means **"+1 to THIS roll"**, and the branch applied it as a permanent +1
Combat. Three of the four inverted a form the corpus really writes — `codeword=` is the modifier's
CONDITION (40 nodes: `<adjust codeword="Eldritch" value="3"/>` is "+3 if you know Eldritch", and
the branch bumped the Eldritch counter), `title=` likewise (§4.63's one node, and the branch
GRANTED Nightstalker), and `titleVal=` is a value SOURCE (§5.343/§5.432, granted "bokh" at 0).
So option (a) — widen the gate to every `<adjust>`, delete `applyAdjust` and its `EFFECT_APPLIERS`
entry — is not tidiness; it removes the same defect task 268 removed, in four more attributes.
**Two of the four branches were inert over the corpus, and saying so is what keeps the claim
honest.** `ability=` never fired on a corpus node (`firstAbility` rejects `rank`/`stamina`, and
every one of the 66 is one of those), and no `name=` node carries an `amount=`, so the probe's
teeth come from the other three plus the filing's own example. The probe restored all four
verbatim and failed one assertion reading `Eldritch=3 Nightstalker=true bokh=true combat=1` —
four inversions in one line. **The gate had to widen without widening its reader list.** All 558
hang under the same five parents task 268 named, so `FL_ADJUST_READERS` is unchanged and only the
`-and $el.HasAttribute('crew')` came off; the self-test's legal-shapes fixture now exercises all
five readers with non-crew conditions, since the check no longer looks at which attribute the node
carries. **The filing's census did not reproduce, and the disagreement is task 270.** 569 is the
`books/**/*.xml` glob, which counts the 20 superseded `temp/` working copies; the shipped corpus
holds **558** (`random` 464, `difficulty` 80, `lose` 9, `rankcheck` 5), and the suite pins that
one because `data.loadBook` cannot see any other. Task 268's 346 was identical both ways, which is
why the trap survived that pass. Each of the three new assertions was probed to failure one at a
time, the census by a pre-filter matching nothing (`total=0`, non-vacuous). Suite **2673** (up 3);
the gate self-test **29** (up 2).

Worked 2026-08-13 (implementation pass, task 268): closed **268** and filed **269** (LOW). Five
things worth carrying forward, and the first is that the census only *opened* the fork — what
closed it was reading what the tag means. The filing offered "read `CREW_LEVELS` and add the
`NO_CREW` guard so the two shift sites agree" or "delete the branch". **Agreement between two
ordinals is not the same as one right reading.** `adjustApplies` takes `crew=` as the
CONDITION and `amount=` as the contribution, so `<adjust crew="good" amount="1"/>` — the shape
of all 346 in the corpus — means "add 1 to this roll if your crew is good". The branch read
those same two attributes as "shift the grade by 1", which is not a weaker version of the right
answer but a different one, and option (a) would have left it misreading every node the corpus
writes while *looking* correct. That is visible in the probe: restoring the branch failed the
new assertion with `none->poor … excellent->good`, both defects at once — the free crew the
task filed, and a demotion that really applied. **The filing named a function that does not
exist.** It has the roll machinery consuming these through `rollAdjustTotal`; the readers are
`childAdjustment`, `adjustApplies` and `adjustAmount`. The claim was right and the identifier
was invented, so it cost a grep — worth doing before trusting any name a filing hands you.
**The gate had to allow more parents than the corpus uses, and that is the difference between a
census and a rule.** The 346 hang under `<random>` and `<difficulty>` only, but `<gain>` and
`<lose>` read `<adjust>` children too (`engine.js:167` and `:570`, "subtract your armour from
the wound"), so `FL_ADJUST_READERS` names all five. Gating to the two the data happens to use
would have been a tighter fit and a false rule — a future `<lose stamina="4"><adjust crew="good"
amount="-1"/></lose>` is meaningful today. **Only `crew=` is gated, deliberately, and asking why
became 269.** The other four `applyAdjust` branches are live, so refusing every bare `<adjust>`
would refuse forms the engine still handles — but the same walk says none of those is bare
either (558 nodes, 0 bare — recorded here as 569, which is the `books/**/*.xml` glob counting
the superseded `temp/` copies; task 270), and each duplicates a `<gain>`/`<tick>` that already
does the job.
**Each of the three new assertions was probed to failure one at a time**, and the census probe
is the one that mattered: a pre-filter changed to match nothing failed it on `total=0`, which is
what makes the 346-and-parent-breakdown pin non-vacuous rather than decorative — without it a
scan that silently found nothing would have reported "none is bare" and passed. The build gate
was probed the same way, by short-circuiting its `if` to `$false`. Suite **2670** (up 3); the
gate self-test **27** (up 2).

Worked 2026-08-13 (implementation pass, task 267): closed **267** and filed **268** (LOW). Four
things worth carrying forward, and the first is that the fork was settled by *running* the
counterfactual rather than reasoning about it. **Widening `CREW_LEVELS` is a one-line edit and a
test run, and the suite answered in a minute what three paragraphs could not.** With
`['none', 'poor', 'average', 'good', 'excellent']` in place the full suite failed 6, and only 3
of those were the `none→poor` fold this task is about — the other 3 are the ordinal's OWN
pre-existing guard rails. "crew demotion below poor stays poor" returned **`none`**: the floor
that 14 corpus demotions lean on in print ("A poor crew can't get any worse!", §3.231/§3.272/
§4.439) is exactly what a fifth grade at index 0 removes, and `<lose crew="3">` ("reduce to
poor") would undershoot from every grade below excellent as well. `initialCrew="oldcrew"=3
gives a GOOD crew` returned **`average`**: the 1-based index §4.658 round-trips really does
shift. So NO_CREW is held OFF the array, and the filing's "measure those before widening" was
the whole of the decision. **Off the ordinal, the fix needed no rule change at all.**
`canUpgradeCrew`'s `have === target - 1` was already right — a crewless ship indexes to -1,
which IS one below `poor` — so §5.192's printed 25-Shard hire became clickable, and average/
good/excellent stayed refused under "Your crew must be poor first", without touching the
function. The same -1 makes `<if crew=…>` false and `value="crew"` 0. The bug was never in the
rule; it was that the state the rule needed could not be spelled. **Making a crewless ship
expressible opened a NEW free-crew route, and the guard for it is the same shape as the books'
own floor.** `applyShipLose`'s `Math.max(0, indexOf(crew))` reads an off-scale grade as poor, so
a storm's `<lose crew="1">` would *grant* what §5.192 charges 25 Shards for — this task's defect
one node over. Book 5's seas carry no such node; a claimed hull sails into book 3's eleven. Probed
by removing the guard: `one=poor three=poor`. **Three pre-existing assertions pinned the defect,
and only the FULL suite found them.** `-Suite actions` printed a clean pass while `none→poor`
was still asserted twice in `suite-inventory` and once in `suite-economy` (§5.192's own claim,
task 126) — a focused run over the suite you edited says nothing about the suites that own the
same behaviour. Each of the 10 new assertions was probed to failure, one neutered site at a
time. Unrelated and left alone: `CREW_LABEL` (`rules.js`) is exported and read by nothing.
Suite **2667** (up 10).

Worked 2026-08-12 (implementation pass, task 266): closed **266** and filed **267** (LOW). Four
things worth carrying forward, and the first is that the task's own instruction — measure before
picking — is what picked the option. **The fork was decided by the width of the census, not by
the three paragraphs arguing it.** Run at three widths, "a `<buy>` in a branch with a further
branch below" returns exactly the two broken sections; widening to any click-time taking adds
three, and one of them, §6.628, would really break — its chain is keyed on a **die roll** the
player can re-arm (tasks 253 + 254), so a hold would freeze it on the stale result. Widening
again adds §5.677 and §1.297, which task 261's ledger and task 245's deferred-fight chain already
own. The widest option was the one the filing called "closest to task 264's hold"; it is right
only when scoped, and only the census could say where. **Option (a) was rejected on the ledger's
own words rather than on cost.** `noteSpend` records "only a taking — a gain is always read
live", and a crew upgrade is a gain, so `crewAt(path)` would have built the exact mechanism
§6.215 and §6.49 depend on not existing. The task framed this as "is a *better* crew richer?";
the answer is that the question does not arise, because the ledger books what LEAVES the sheet.
**The census scanner was wrong in a way that looked like a corpus finding, and only a second
source caught it.** Its tag regex ended `((?:"[^"]*"|[^">])*)(\/?)>` — the attribute run is
greedy and `[^">]` matches the `/` itself, so the self-close group captured empty every time and
every `<buy …/>` read as an OPEN tag that swallowed its siblings. The assertion duly reported
§3.406, §4.440 and §5.145 as sections with a branch-level buy, none of which has one. Reading
self-closure off the whole match fixed it, and the Python census run over `books/**/*.xml` is
what said the JS was lying rather than the corpus surprising. **The two sources then disagreed a
second time, and that disagreement was the correct answer.** The JS returns three sections where
the Python returns five, because only the JS excludes a `<buy>` inside a `<group>` — a collapsed
group runs its purchase through `runBuyNode`, which mints no per-node memo, so §5.192's Wrath of
God and §4.622's salvage are out of the hold's reach by construction. The expected value tracks
the mechanism, not the tag count. Suite **2657** (up 10).

Worked 2026-08-12 (implementation pass, task 265): closed **265** and filed **266** (HIGH). Four
things worth carrying forward, and the first is the one that nearly shipped a vacuous block.
**The teeth check itself was vacuous first, and only a second attempt found that out.** The neat
way to neuter six hooks at once looked like one line — `if (/265/.test(path)) return;` in
`noteSpend`, keying on the fixtures' own section name — and the suite reported the identical
`pass=770 fail=0`, which reads exactly like "the assertions have no teeth". It was the PROBE that
had none: `render()` seeds the walk path `'r'` (render.js:862), not the section key, so no path
ever contains `265` and the guard never fired. Neutering the six call sites by hand then failed
exactly 5 of the 14 new assertions, one per hook that can book. A probe that changes nothing is
two indistinguishable findings — a toothless test, or a toothless probe — and the cheap one is
worth ruling out first. **The sixth hook is honestly vacuous and its assertion says so instead of
pretending otherwise.** `renderEquipmentChoice` is reached only for a `<tick item="?" addbonus=>`,
which MODIFIES the possession the player names rather than taking it, so it books nothing today;
its assertion pins `ctx.spends.size === 0` — the cache-Take asymmetry, which is a real property
and fails if a gain is ever booked — rather than a guard that would stay open either way. The
ability hook is the mirror case and *does* have teeth, because the node applies whole: a `<lose
ability="?" shards="10">` is charged on the pick. **The cargo form of `<sell>` is deliberately not
hooked**, and that is the one place the rule keeps an exception: a Cargo Unit lives on a ship,
outside the ledger's purse and pack, and the form's price is a gain, so the two lines would be
provably dead. **The census that closes this task is what found 266, and asking it about the
resources the ledger does NOT model is what made it a HIGH.** For the purse and pack the answer is
"no reachable case in books 1-6", reproduced from `books/**/*.xml` and `web/data/*.json` alike (six
pairs, two guards-above, both unreachable). Re-run over crew/cargo/ship guards it returns three
sections, and two of them — §4.605 and §4.658 — hand a poor crew `poor->average->good->excellent`
for nothing, measured through the rendered page, because each click grays its own branch and turns
the next `<elseif>` on. §3.161 has no second branch and is sound, which is what makes the
population "a guarded offer with a further branch below it" rather than "a `<buy crew=>`".
Suite **2647** (up 14).

Worked 2026-08-12 (implementation pass, task 264): closed **264** and filed **265** (LOW). Four
things worth carrying forward, and the first is the fork the task was written to make me decide
rather than write. **Option (c) was picked on the measurement, and the measurement is what made it
safe rather than plausible.** The rule keys on a `force="f"` EFFECT node (what `renderForcedOptional`
draws), so the population is not the 147 sections carrying `force="f"` nor the 42 that put one
inside a branch — 27 of those are an optional `<goto>` exit, 8 a `<difficulty>` roll and 1 a
`<group>` (§1.187). **Six** sections remain, and §6.160 is the only one that loses anything; the other five hold nothing but
the button, so the hold only stops their words graying under a tick just made. §6.215 and §6.49
carry no such node at all, which is why "the reward LANDED, so graying is right" is untouched — the
question the task asked was answerable by census, not by judgement. That census is now an assertion,
so a seventh section arriving in a future book fails the suite instead of changing silently.
**Teeth were checked by neutering the hold, and three of the new assertions passed anyway — they
were vacuous, in a way worth naming.** A grayed branch renders its words and *no button*, so
"the opt-in is not grayed" is satisfied by a lookup that finds nothing; asking for the button
(`!!b && b.disabled && !grayed(b)`) turned 5 failures into 7, one per section the hold reaches.
**A probe is worth more than a reading — and a probe can be vacuous too.** The hold newly exposes
§6.160's choose-one lock (before it, the block grayed after the click and the untaken sibling drew
no button), and `ctx.forcedChosen` keyed that lock by the shared parent ELEMENT, which
JSON-serialises to `{}`. The first probe "confirmed" it and proved nothing: `serializeVisit`'s
atomicity guard (task 161) returns null while the position and the Story disagree, so the resume
rebuilt an EMPTY ctx and the section simply re-rendered fresh. Asserting the record exists is what
made the second probe real — and it *was* real: with the element key a reload offers the second
cross-off, taking the blessing **and** the certificate for one instruction that says "you decide
which". The token is the parent's path now, verified by putting the element key back and watching
it fail. **A verbatim copy of a rule is where the next clause goes missing:** `renderIfChain` held
its own copy of "evaluate an `<if>` at the walk's position" and would have been the third clause's
blind spot, so it calls `decideCondition` now. Suite **2633** (up 23).

Worked 2026-08-12 (implementation pass, task 263): closed **263** and filed **264** (MEDIUM). Four
things worth carrying forward. **The filing's census reproduced exactly, from two different sources,
and that is what made the "no live case" claim checkable rather than trusted.** The same predicate
run over `books/**.xml` and over the bundled `web/data/*.json` returns the identical 14 sections and
the identical 4 with a guard above — so the assertion now in the suite is the filing's own
measurement, not a restatement of it. **The cache pair's decision is the whole of its content.** A
Store books (the possession leaves the sheet) and a Take does not (a gain is read live), and both
directions are asserted, because the asymmetry is the only thing the hook can be wrong about: the
Take case enters with the rope already in the box, so the guard is SHUT and must open on the next
draw. Hooking both directions would have been the tidier-looking code and would have broken task
261's rule. **Teeth were checked by neutering all six hooks at once**, and the actions suite failed
exactly 5 of the new assertions — one per hooked site — each printing the guard's own words now
grayed (`shut=The ferryman will still take you.`). The Take case and the census passed either way,
as intended. **The census of what the four-site list did NOT cover is what found 264, and it is a
confirmed shipped defect rather than another latent one.** Four sections put a resource guard above
an un-hooked click-time taking; three are unreachable for stated reasons (a market that cannot move
the deed above it, a `choose="f"` sweep the walk applies, an item forfeit under a Shards guard), and
the fourth is **§6.160**, where crossing off the certificate — or the blessing — grays the
`<goto section="551"/>` that the crossing-off pays for. Measured through the rendered page both
ways before filing, because the earlier pass's lesson is that a probe is worth more than a reading:
`551=live 183=live` before the click, `551=gray 183=live` after, for each half. The item half is two
lines of this task's own pattern; the blessing half is outside the ledger's deliberate scope, so 264
carries the fork rather than a fix. Suite **2610** (up 13).

Worked 2026-08-12 (implementation pass, task 262): closed **262**, filing nothing. Two things worth
carrying forward. **The proxy was sound and the fix is still a fix, which is the shape of finding to
watch for.** `1.Skabb` implies (Acid OR amulet) on every route that keeps the amulet, so there was no
false negative and no ordinary player was misrouted; what it could not express is *still holding the
proof*, and book 1 carries two open `<lose item="?">` forfeits plus markets that buy. A defect that
needs a player to have lost something to show itself is invisible to a census of routes. **An
if/elseif is load-bearing here, not stylistic.** Two separate `<if>`s would each match when both the
codeword and the amulet are held and draw →327 twice, so the both-hold case is asserted for the
count and not just for reachability. `<elseif>`'s allowlist already carried `codeword` and `item`, so
`validate-source.ps1` needed nothing. Suite **2597**.

Worked 2026-08-12 (implementation pass, task 261): closed **261** and filed **263** (LOW). Four
things worth carrying forward, and the first is the decision the task was written to prevent me
making cheaply. **The cheap fix measured out nearly free and was still the wrong answer, and the
reason is authenticity rather than risk.** Task 261 forbids adding `not=` to task 259's whitelist
because latching "you cannot afford this" OPEN is the mirror of the bug — but latching the guard's
*resource reading* instead of its verdict (resource present ⇒ a negated guard held SHUT, never open)
honours that reason in about ten lines, and a census says it would change behaviour in exactly one
section: of 15 `not=` resource guards in books 1–6, book1/501 is the only one whose section takes
money or a possession at all. What rules it out is that a latch memoises a verdict and so cannot
know where the walk stands: for a guard BELOW a click-time spend it freezes the pre-spend answer,
a reading JaFL never gives. It would buy §1.501 by introducing a smaller inauthenticity elsewhere.
Asking rather than picking silently was right, and the answer — "which is most authentic?" — is the
question that settles this class of fork. **The ledger's asymmetry is the whole trick.** Booking only
what the visit TAKES, never what it grants, means the sheet is read as richer than it is and never
poorer — which is what makes the reading free of the guard's phrasing (`<if shards="1">` above the
price stays open and `<if not="t" shards="1">` stays shut for the *one* reason) while an award or a
Take still opens the choice that needs it on the next draw. Booking gains too would have been the
tidier-looking rule and would have broken that. **Marking every node the walk passes needs the
ancestor netted against its descendants, or a nested price is booked once per level it is wrapped
in** — a 30-Shard toll two levels down reads back as 90, and a guard above asking for 60 opens on
money the player never had. `spendSeen` is that netting, and it is asserted directly, because the
error is invisible in the sections that motivated the change (§1.501's `<lose>` is one level down,
where 1× and 2× both round to "still affordable"). **Hooking two click sites out of six was a census
result, not a shortcut** — 14 sections pair a resource guard with one of the four un-hooked sites and
not one has the guard above the spend, so the gap is unreachable today; it is filed as **263** anyway,
because the rule the code now states does not admit an exception. Every assertion was checked for
teeth by neutering `sheetAt`: §1.501's redraw fails exactly as filed (`10=gray 288=live`), and
§2.105/§5.376/§6.215 fail with it, so the new reading carries task 259's three sections on its own.
It also fixes a **fourth** the earlier census could not see — §5.192, whose `<if shards="50">` wraps a
`<group>` priced by a `<buy ship=>`, missed because the census pattern was `<transfer|lose>`. The
reachability aside resolved in book 1's favour: `book1/605.xml` (the bank) offers
`<choice section="501">If paying a ransom</choice>`, so §1.501 is not pointless and the author's
comment can go. Suite **2592** (2591 − 8 deleted predicate assertions + 9 new).

Worked 2026-08-12 (implementation pass, task 260): closed **260** and filed **262** (LOW). Three
things worth carrying forward. **The filing's census was itself short by two, in exactly the way the
task was filed to stop.** It counted 18 `*temp.xml` and missed `book1/460old.xml` and
`book2/322old.xml`, which are the same shape — a stale working copy declaring a live section's
`name=` — because the sweep that found them matched on the *name* `temp` rather than on what makes
them hazardous. Grouping every non-`^\d+[a-z]?$` file under `books/book<N>/` by its declared
`<section name=>` found all 20 at once and also cleared the genuine non-sections (the pregen bios and
`New.xml` name a person or a book title, never a section id). All 20 moved to `books/book<N>/temp/`,
per the disposition chosen on the day: keep them, out of the section namespace. **The diff the filing
asked for came back clean, which is the answer that mattered.** All 20 are strictly earlier working
states — every one arrived in the single `books add` import of 2026-07-01 and none has been touched
since, while siblings have moved on (book2/248 as recently as 2026-08-09). The only content unique to
a working copy is two editor comments. The one omission that looked real — `460old`'s
`<tick codeword="StillInYellowport">`, dropped by the live section — is harmless, because its
destination §10 sets that codeword itself; **checking the destination is what turned a suspected
content bug into a non-finding**, and doing it before filing saved a wrong task. What the diff did
surface is **262**: the same file's `<if codeword="1.Skabb">` under prose that promises "codeword
*Acid* or a **copper amulet**", a sound proxy for an OR that task 3's AND could not express, but
undocumented and now expressible exactly via `<elseif>`. **The gate's new check is scoped to the
claim, not to the filename.** A `*.xml` sitting directly in a book folder fails only if its
`<section name=>` looks like a section id its filename is not — so `501temp.xml` claiming `501`
fails while `Andriel.xml` and `New.xml` pass untouched, and the check would also catch a working copy
named anything at all. Note the trap in reusing the existing task 78 path for this: its lettered
continuation rule strips `[a-z]+$`, which folds `501temp` to `501` and would have *accepted* the very
file this closes. The walk stays non-recursive, so `temp/` is deliberately outside it — and the
fixture self-test now keeps a parked copy in `book1/temp/` in its **clean** tree, so making that walk
recursive fails the suite rather than quietly re-flagging all 20. Self-test 25 pass; the generated
tree rebuilt byte-for-byte identical (no bundled file moved); suite **2591**, unchanged as expected.

Worked 2026-08-12 (implementation pass, task 259): closed **259** and filed **261** (LOW). Four
things worth carrying forward, and the first two are both corrections the measurement forced on me.
**The census's six sections were three defects, not one and not six — and I had two of them wrong in
both directions.** The filing confirmed only §2.105; measuring found **§5.376** as bad or worse (it
grays the `<goto section="509"/>` *inside its own guard*, so the scroll of Ebron is crossed off and
the church it buys is unreachable) and **§6.215** grays the block a player has just paid 35 Shards
into. Against that, my first probe read §6.49 as "50 Shards gone, no initiate" — and it was reading
`data.god`, a field that does not exist, where the real one is `data.gods`. §6.49 was never broken.
Its price applies as the WALK passes it, so the guard above is read before the purse moves and the
draw after the click is already correct; what closes it later is `<if safeAddGod="Juntoku">` going
false *because the god was written*, which is what the page asks for. **A probe that reads a field
name off the top of your head proves nothing** — the tell was `god=undefined` printing identically
before and after the fix, which is exactly the shape of a field that is never set. **The suite
refused the first fix, in three places that are all correct requirements.** Memoising *every*
condition per visit — the obvious reading of "JaFL evaluates a section once" — broke task 133's
lift-a-curse-from-the-sheet (the `<if curse=>` must go false without re-entering the section), task
181's wait-for-your-roll `<if var=>`, and §5.232's deliberately rerunnable `<if not
var="keepblessing">`. What shipped is narrowed to a **spend guard**: an `<if>` whose *every*
attribute is a purse/pack test or a modifier of one, checked as an attribute whitelist rather than
"does it mention shards", because `evaluateCondition` ORs across attributes and a guard that also
reads a codeword is asking something a payment cannot answer. **The proposed walk-position purse
reading was the right rule and the wrong pass.** It fails on a detail that only shows up in
implementation: on a redraw no effect re-applies, so an observational before/after around each node
sees no movement and the position never advances — every out-of-walk spend (a `<group>` commit, a
pay action, a transfer, a buy) would need its own hook. Task **261** carries it, and with it the one
case the narrow latch cannot reach: `not=` is excluded from the whitelist on purpose (holding open
"you could NOT afford it" is the mirror bug), which leaves §1.501's flip standing — latent, since a
`<goto>` is its only control and a `<goto>` navigates away. Sabotage fails exactly 3 of the 19 new
assertions, one per confirmed section, and the other 16 pass either way. Suite reports **2591**, up 19.

Worked 2026-08-12 (implementation pass, task 258): closed **258** and filed **259** (MEDIUM) and
**260** (LOW). The fix is one shared selector, one condition in the fight walk and one `tagBranchNav`
call, and three things are worth carrying forward. **The measurement was run before the fix and it
found the defect exactly as filed**, which is the point of insisting on it: §2.105 on entry draws a
live theft widget with `pendingTransfer` set and its `<choice section="151">` correctly held, and a
successful SCOUTING roll then drew `Continue → 128` **enabled** with all 40 Shards still in the purse
— so the filing's "confirm against a real GameState before changing anything" was answered yes, and
the assertion for it is now the regression test. **Two of the three gates are dead in the corpus and
were still given the rule**, deliberately: no section in books 1–6 pairs a fight or a forced `<buy>`
with a node-less branch exit, so the fight/buy halves hold nothing today and are asserted with
synthetics. The reason to include them is that the rule is the gate's and not the section's — the
transfer gate had exactly the same hole for years while the corpus happened to contain one section
that exercised it, and the next converted book decides which of the three gets the next one. **The
release half of the assertion is what found task 259**: it would not go green, and the reason was
not this gate at all — §2.105 re-derives `<if shards="1">` on the redraw, so emptying the purse flips
its "if you had no money he stole one possession instead" branch ON and robs the player a second
time. The test now enters carrying nothing so the release is readable, with a comment naming 259;
the guard-above-its-own-effect shape reads 6 sections and only §2.105 is confirmed wrong.
Task **260** came out of 259's census: 18 tracked `*temp.xml` working copies under `books/` each
declare their live sibling's `<section name=>`, so the raw sweep reported book1/501 twice and
book6/215 three times. The build filter excludes them (`'^\d+[a-z]?$'` fails on `501temp`) so no
player is affected — but every "measured over every section in books 1–6" line in this backlog was
written against this directory. Suite reports **2572**, up 9.

Worked 2026-08-12 (implementation pass, task 257): closed **257** and filed **258** (LOW). The fix
is ~40 lines — one DOM-free planner, a tag/note/apply trio, two one-line hooks in the roll view —
and three things are worth carrying forward. **The filing's suggested shape ("a fourth seed" of
`computeRollGate`) does not fit, and the reason is a real constraint on that gate**: it names ONE
`rollNode` and reads ONE `rollPath`, whereas every row of book3/15 has a die of its own and only the
row the dice turned up is ever drawn — a gate keyed on the first row's die would have held nothing
on three of the four rows, which is worse than holding nothing on all four. `computeOutcomeRollGate`
is a sibling gate instead, collecting **every** row's die and keyed on the die actually RENDERING,
which is the `pendingTransfer`/`pendingBuy`/`pendingChoice` idiom and needs no notion of which row
won. **The forced-roll half of `isMandatoryRoll` had to be split out (`isForcedRoll`) rather than
skipped**: task 257's whole claim is that `outcome` does not belong in `ROLLGATE_OPTIONAL_WRAP`, but
`price=`/`force="f"`/a `flag=` payment still do apply — an exit held behind a die the player cannot
make is a softlock, not a rule, and the row gate refuses all three. Sabotage confirms the pass is
load-bearing and nothing else: commenting out the single `applyOutcomeRollGate(flow)` call fails
exactly 3 of the 25 new assertions (§3.15's losing and winning rows and §3.34's) and leaves the
other 22 green. **The census held at 2 sections and closed the family**: only book3/15 and book3/34
put a `var=` die inside an `<outcome>` anywhere in books 1–6, and a matching sweep of the *other* six
`ROLLGATE_OPTIONAL_WRAP` members — a `var=` die nested inside a `<success>/<failure>/<if>/<elseif>/
<else>/<group>` whose own wrapper also carries navigation — returns **zero**, so the three sections
the filing set aside (book1/13, book1/523, book5/592) really are the sound shape (the die reveals
the branch that holds the `<goto>`) and nothing else in the corpus wants this gate. Suite reports
**2563**, up 25. Task **258** came out of the fix rather than the bug: the row's "Continue → N" has
no XML node, so it could only be tagged where it is built — and the same button is invisible to the
fight/transfer/buy gates, which is one shipped section (book2/105's pickpocket).

Filed 2026-08-12 (during conversion work on an unpublished book): **257** (MEDIUM), and nothing
else. Found by writing a table row whose magnitude is a second die and then asking why the page's
exits were live beside the unrolled die — the answer being that `isMandatoryRoll` refuses every
roll under a conditional wrapper, and `outcome` is in that list. Two things worth carrying
forward. **`ROLLGATE_OPTIONAL_WRAP` conflates two different things.** Six of its seven members are
branches the player might never reach, so a roll inside them is genuinely optional; `outcome`
is not a branch at all but the row the dice turned up, and once it is revealed the roll inside it
is as mandatory as one on the page. The set was assembled from the first question ("could this
roll go unreached?") and has been read ever since as answering the second ("must this roll be
made?"). And **the census is again the wrong way round from the obvious one**: counting sections
with a nested roll finds nothing useful, because most put their navigation inside a
`<success>`/`<failure>` the roll itself reveals — the exposed shape is specifically a roll whose
*sibling* is the destination, which is 2 sections, both of them the same card game.

Worked 2026-08-12 (implementation pass, task 256): closed **256**, nothing new filed, and the
buckets are clear again. The fix is 13 lines of gate plus two `data-cachelock` tags, and the
interesting part is entirely in *when* it reads the flag. Three things worth carrying forward.
**The end-of-walk reading is not a convenience, it is the only reading that is a rule.** The
corpus splits almost evenly on where the `<itemcache>` sits relative to its unlock — 4 below
(book1/177, book1/434, book2/665, book6/284) against 3 above (book4/468, book4/509, book6/464) —
so a lock read as the widget draws would seal one town house and leave its neighbour open with
identical markup. Sabotage confirms the pass is load-bearing and nothing else: commenting out
the single `applyCacheLock(flow)` call fails exactly 3 of the 13 new assertions (§4.586's two
Take buttons and its Store, and §6.464's letter branch) and leaves the other 10 green, which is
the shape you want — the untouched cases are asserted by tests that pass either way.
**The count of sections the fix moves was measured before it was written, and it held**: 20
sections pair an `<itemcache>` with a lock on the same cache, 16 carry an unconditional
`hidden="t"` unlock and are untouched, and the four that seal are §4.586, book3/74 and
book6/284 in the branch where fire has just emptied the stash, and book6/464 with a letter
stored. §4.528's unlock is no longer dead markup: it re-opens the very box §586 sealed, cache
key and all, which is what the editor's note in the XML always promised. **The money side was
deliberately left alone** — an `<itemcache max=>`'s Deposit/Withdraw is the same bank
`renderMoneyCache` gates only for a roll-bundled lock (task 38), so extending the seal to it
would have re-opened a rule that was decided on purpose. Suite reports **2538**, up 13.

Worked 2026-08-12 (maintenance pass, task 255): closed **255**, nothing new filed, and the
buckets are empty again. Documentation-only re-archive of completed details 212–254 (plus 255's
own), the fourth such pass after 141, 165 and 211; TASKS.md drops **3,898 → 1,028 lines** and the
archive grows 7,341 → 10,301. Two things worth carrying forward. **The buckets and the Done list
had silently drifted into duplication, and the merge had to be a set union, not an append**: 28 of
the 42 bucket rows (IDs 213–240) were *already* listed under **Done**, so appending them wholesale
would have double-listed every one. Task 211 recorded exactly this for a single ID (180); it has
since grown to 28, which says the drift is systematic and not a slip — closing a task appends its
row to **Done** while its bucket row stays put. Worth a guard: the invariant "every ID appears
exactly once across the buckets and **Done**" is checkable in one pass and nothing checks it today.
**The move was a line-slice with boundary assertions rather than hand-editing**, which is what a
2,866-line verbatim move needs: the script refused to write unless the first moved line was
`## 212.`, the last the closing `---`, the next surviving line `## Review log`, and the block
carried exactly 43 `## <N>.` headings. It paid for itself immediately — the first run aborted on a
bad assertion of my own (PowerShell's `-like` reads the `[x]` in `- [x] 240.` as a character class,
so the pattern never matched) and left the file untouched instead of half-spliced. Validated after
the fact that the archive's detail IDs are exactly **1–255** with no gaps and no duplicates, that
every checklist ID has exactly one detail heading across the two files, and that no ID is listed
twice in **Done**. No code, data, build or test files were touched, so no rebuild or stamp change
is implied; the suite was run anyway and reports **2525**, unchanged.

Worked 2026-08-12 (implementation pass, task 254): closed **254**, nothing new filed, and the
buckets are clear again. The scope widened from "the branches the roll reveals" to "what the
roll's result is READ through", which now also covers an `<if var=>`/`<elseif>` chain on the
roll's own var. Three things worth carrying forward. **The census says a `var=` test is the
whole of it**: intersecting `flag=` rolls with a matching `price=` gives 15 sections, only two
of which give that roll a `var=` at all (§6.628, §6.50) — and both name it directly in the
`<if>`, so `expressionVars` over the comparator attributes (what `conditionPending` needs) buys
nothing here and is not spent. The chain is walked as ONE unit — head plus its `elseif`/`else`
element siblings — matching `chainHasEffect`/`conditionPending`, so an `<else>` reached only
because the roll missed every arm counts as the roll's doing; no shipped section has one yet.
**Where the drop happens turned out to be the load-bearing half.** Dropping the memos alone
makes it worse, not better: §6.628's `<if>` chain reads live state, not `ctx.wroteVars`, so
between the fresh payment and the new die it kept showing the PREVIOUS day's arm — with its
memo now gone, as a *live* button for an outcome no die had produced. What closes it is
forgetting the re-armed roll's own `var=` write, which hands the section's `<set var="y"
value="7">` sentinel back the ownership task 61's `rollOwned` took from it — and that only
works from BEFORE the walk, because the sentinel sits above the roll. So the re-arm moved out
of `rollGate` (mid-walk, per-roll) into `dropReArmedRolls`, called once at the top of
`render()`; `rollGate` is now a pure read. Verified by sabotage three ways: disabling the
`<if>`-chain widening fails 3 assertions (the second night's arm ☑ and disabled, the Shard
gone and no Stamina — the filed defect exactly), disabling the own-var drop fails the
blank-chain assertion alone (`heal=false` — the stale arm live), and moving the call back below
the walk collapses the suite at §157 with a stale die and a null click. **Three consecutive
full runs report 2525.** §6.50 shares the shape and is left as the filing left it — the price
is the dragon mask and there is only one, so its repeat path is unreachable; note that it has
no sentinel, so were it ever re-armable the stale `roll` would still be readable there.

Worked 2026-08-11 (implementation pass, task 253): closed **253**, and filed **254** (MEDIUM). The
re-arm now drops the memos of what the old result applied, scoped to the branch subtrees the roll
reveals and read off `ctx.pathNodes` — the walk's own path→node map — rather than by prefix
arithmetic, which is what lets the synthetic path segments the view mints for a revealed outcome
(`.o<i>`) or a `<choices>` row (`.b<i>`) need no special case at all. Three things worth carrying
forward. **The scope is the whole design**, and it was chosen against a corpus census, not by
taste: only **15** sections carry a `flag=` roll paired with a matching `price=`, and of those only
eight can actually re-arm (§2.122/§6.630's payment is a `<tick price= hidden>`, memoised per visit,
so their shared `<success>` can never re-arm at all). "Everything after the roll" would have been
simpler and wrong — §6.587's wand market sits below its table and its `buy@`/`sell@` memos must
survive. **Widening the drop nearly introduced a worse bug than it fixed**, and the guard against
it is measured: §6.731's boon die is *nested* inside the CHARISMA roll's `<success>`, so clearing
the `<outcomes var="z">` memos alone re-granted the same boon **on the payment alone, with no die
thrown** — because a var-keyed table resolves on the WRITE and not on the roll (`branchResolved`).
Dropping a nested roll's `var=` from `ctx.wroteVars`/`rolledVars` with its stored result is what
closes that, and sabotaging exactly those two deletes fails the two §6.731 assertions while every
other one passes. The award caps (`awardCounts`/`groupPicks`/`groupLimits`) are deliberately left
alone, so a second landing re-applies its effect but a repeat can never become an item farm.
**Both halves of §3.314 are asserted, including the one the filing had not measured**: the 3-6
"good rest" does share the defect, through `renderRest`'s own `rest@` key rather than `fx@` — the
second night's button read "You have already rested here". Verified by sabotage twice: dropping the
`dropRolledBranchMemos` call fails 7 assertions (§157 `picks=0`, §314 both branches, §731 the
replayed die), dropping the var-write undo fails the 2 above. **Three consecutive full runs report
2515.** What the sabotage turned up is **254**: §6.628 is §3.314's twin written as an `<if var=>`
chain, so its effects sit outside every branch tag — measured, its second paid night takes the
Shard and heals nothing.

Worked 2026-08-11 (implementation pass, task 252): closed **252**, and filed **253** (MEDIUM).
§2.157's spin is seeded twice and both halves are asserted: roll **1** stands the six-option
ability picker, holds exit (19) and says so in the button's own title ("Make the choice above
first.") — which is what distinguishes task 251's gate from task 30's flag gate, since a roll
that had not resolved would hold the same button for a different reason — then naming COMBAT
takes the point (6 → 5) and releases the exit; roll **3** (the permanent 1d Stamina loss, seeded
so the amount reads 3 as well) reopens it on the spin alone, which is the assertion the old line
meant to make. Verified by sabotage in both directions: seeding the first spin to 3 fails the
picker assertion (`picks=0 dis=false`), seeding the second to 1 fails the flag-gate one.
**Six consecutive full-suite runs now report the same 2502** where the old line was a 4-in-6;
that repetition, not a single green, is the verdict. The **sweep** the filing asked for is
negative and was done by intersecting the corpus rather than by reading tests: only a section
that stands a picker *inside a roll branch* can have a die decide whether the gate fires — 21
sections in `books/` carry both — and of the ones any suite touches (§4.456/468, §6.373, §2.248,
§2.521, §3.273, §5.386, §6.731/736, §6.164, §6.118) every roll is already seeded and none of the
unseeded ones read a `.goto`/`.choice`. §6.118's ex-Priest, the one other census member with a
held-exit assertion, rolls no die at all. What the sabotage did turn up is **253**: pinning both
spins to the same outcome showed the second landing applying nothing, because `rollGate` drops
the roll's stored result on a re-arm but not the `fx@` memos of what that result applied —
measured on §3.314, where two paid nights cost 2 Shards and 1 Stamina.

Filed 2026-08-11 (drive-by finding, task 252): filed **252** (HIGH), nothing closed. Found by
running `-Suite economy` several times over rather than once — the failure is a 1-in-3 and the
task 251 pass below had recorded a single green run as "Full suite 2500". The finding is not that
task 251 gated the wrong thing (it gated exactly what its own census said it would); it is that
the census of newly-held exits was never crossed against the assertions that already read those
exits, and an unseeded 1d6 in `suite-economy.js:169` meant the contradiction surfaced only two
times in six. **Re-run a suite before trusting a green run that follows a gate change**, and seed
any die an assertion depends on.

Worked 2026-08-11 (implementation pass, task 251): closed **251**, nothing new filed, and the
buckets are clear again. `pendingChoice` + `applyChoiceGate` mirror `pendingTransfer`/
`applyTransferGate`, and the four passive-path pickers raise the flag as they append. Three
things worth carrying forward. **All four siblings were measured, not assumed**: the filing
named them as candidates, and every one turned out to be the same mandatory shape, because
`classifyPassive` reaches a picker verdict only past `view.inactive`, `hidden` and
`isOptionalForce` — a grayed, hidden or `force="f"` effect never renders one, so "the picker
rendered" already IS the "the page prints no choice about whether" test the gate needs. That
is also why the flag is set at the append and never from `needs*Choice`: sabotaging exactly
that (gate unconditionally) fails **50** assertions across nine earlier tasks, which is the
measure of how load-bearing the render-keying is. **The gate stops at `.goto`/`.choice`
deliberately, and that was checked rather than assumed** — no section in the corpus that
stands a picker also carries a `<fight>`, so tasks 248/250's "hold the fight too" has nothing
to hold here; if one is ever written, this gate needs their selector. **Census, dice pinned,
same state either side**: **27** sections gain a held exit (six ability awards, book4/116 and
its 18 forfeit twins, §5.386's weapon pick, §6.118's ex-Priest), and the dead-end count is
**identical, 43 either side with the same sections** — the picker's own `.btn-mini`s are left
enabled, so every gated section still reads as having a way forward. Verified by sabotage
twice: dropping the `applyChoiceGate` call fails exactly the five assertions that name a held
exit; dropping the render-keying fails the 50 above. Full suite 2500.

Filed 2026-08-11 (drive-by finding, task 251): filed **251** (MEDIUM), nothing closed. Found while
writing a page of book4/116's shape and measured on book4/116 itself before filing, which is the
part worth carrying forward — the picker family (tasks 226/228/229/231/232/233/234) was audited
seven times for *which* possession leaves and never once for whether the player has to answer at
all. The picker renders, the exit beside it renders enabled, and the two never meet: `renderForfeitChoice`
holds the `fx@` memo open (correctly) so the loss can commit on the pick, and the section's
`.goto` has nothing to consult. Task 107 had already decided the rule for the mandatory
`<transfer>`; the same sentence was never applied to the mandatory forfeit. Three other standing
pickers sit on the same path and are named in the entry rather than assumed to share the defect.

Worked 2026-08-11 (implementation pass, task 250): closed **250**, nothing new filed, and the
buckets are now clear. The provisional-result gate holds the fight's controls on task 248's
selector, which is the whole change. What is worth carrying forward is how small the residue
was: task 249's third seed had already covered every instance where the roll is the section's
own step, so the one case left for this gate is the roll that is *deliberately* optional —
§1.21's force="f" talk-out, where fighting is the printed default and only a rerolled success
removes the fight. The new fixture asserts both halves in order (the Attack is live on entry,
held only once the reroll decision appears), so it cannot pass by gating the fight outright.
Verified by sabotage: reverting the selector to `.goto, .choice` fails exactly the one assertion
that names the decision. Full suite 2486.

Worked 2026-08-11 (implementation pass, task 249): closed **249**, nothing new filed. The gate has
a third seed — a mandatory roll read by its own `<success>`/`<failure>` — and `isMandatoryRoll`
now reads `force=`. Three things worth carrying forward. **The seed had to be widened and
narrowed in the same change**: `force=` is the tag's own word for "must the player make this to
continue" (default true) and nothing had ever read it, so the branch seed would have demanded
book1/21's *optional* talk-out roll; putting the test in the shared helper rather than in the new
seed also released one section the OLDER seeds were already holding wrongly — book2/440's "if you
want to read a book" table locked the "when you are ready to leave" exit behind a roll whose every
outcome carries the player away. Two definitions of "mandatory" would have left that standing.
**A bare branch is bound the way the WALK binds it** (`render.js`'s `activeRoll`: the nearest roll
above it), so a `<failure>` belonging to a later roll cannot seed an earlier one — the alternative,
"any branch below the roll", seeds on position alone and would gate a roll nothing reads.
**And an existing test failing was the finding, not a regression**: §5.689's DOM test clicked
Attack before the drowning save, which is precisely the play this task removes; it now passes the
save first, and carries an assertion that the drake cannot be engaged before it. Measured either
side with the dice pinned: sections where the gate disables something go **103 → 136** (+34 gained,
−1 released: book2/440), held fights **2 → 5** (the three §5.198/218/689 the filing named), and the
dead-end census is **unchanged at the same 9 sections**. Verified by sabotage twice: dropping the
branch seed fails the five assertions that name it (including §5.689's), dropping the `force=` test
fails exactly the two that name it. Full suite 2482.

Worked 2026-08-11 (implementation pass, task 248): closed **248**, and filed **249** (MEDIUM) and
**250** (LOW) on the way out (entries above). `computeRollGate` now collects the `<fight>`s below
its roll beside the navigation, and `applyRollGate` holds their controls with the exits. Three
decisions worth carrying forward. **The exclusion is the same one the navigation already uses**:
a fight inside the `<outcomes>` table is skipped, because §1.299's drunken soldier IS what the
roll reveals — he cannot be reached early, and holding him after the reveal would lock the fight
the roll had just started. **The gate holds the blessing buttons too, not only Attack**: a combat
blessing redraws the widget in place (`afterAction` → `drawFight`), which hands back an enabled
Attack that a gate running once per render never sees again — Flee stays live, as in every other
gate. And **the census had to be made deterministic before it could be read**: the corpus
dead-end count is state-dependent (the fallback is suppressed for a dead player), so an
unseeded scan moved between 8 and 9 sections on the *same* code and would have convicted this
change of a dead end it did not create; with `Math.random` pinned it is **9 either side, the same
9 sections**, and exactly **2** sections gain a held fight (book2/726, book5/477 — the two the
filing predicted, both with Attack disabled on entry). Verified by sabotage twice: dropping the
fight selector from `applyRollGate` fails the one behavioural assertion, dropping the
outcome-wrap exclusion fails the one unit assertion that names §1.299. Full suite 2471.

Worked 2026-08-11 (implementation pass, task 247): closed **247**, and filed **248** (LOW) on the
way out (entry above). The gate now has a SECOND seed — the mandatory roll whose result an
Adventure Sheet effect reads, directly or through a derived `<set>` — beside the original
"read by an `<outcomes>` table", and the release needed no change: with no table there is no
`matchedOutcome`, and `applyRollGate` already treats a null one as "resolved, let them go".
Three decisions worth carrying forward. **The trace is borrowed, not written again**:
`expressionVars`/`provisionalVarClosure` moved down into `render-gates.js` (re-exported from
`render-rules.js`, the arrangement `isRollGate` and `ITEM_FAMILY_TAGS` already use) and
`pendingRollVar`'s private magnitude-attribute list became the exported
`EFFECT_MAGNITUDE_ATTRS` it now imports — so the gate that HOLDS the exits and the deferral
that holds the EFFECT cannot disagree about what counts as reading a roll's result, which is
the disagreement this defect was made of. **A widened gate needs an exclusion measured, not
guessed**: `<flee>`/`<fightround>`/`<fightdamage>` had to join the opt-in wrappers, because
book2/770's parting crossbow bolt and book5/24's per-round Hangman check are the *fight's*
step and gating on either would have held the win route behind a roll the winner never makes
(book5/356's `<fightdamage>` roll is a third instance, missed today only because its `<lose>`s
carry literal magnitudes). And **the node→path binding moved to the one place every roll kind
passes through** (`makeRollWidget`), since the gate now seeds from a `<rankcheck>`/`<difficulty>`
as readily as a `<random>` and a roll kind that gated the exits without reporting its path would
hold them for ever. Verified by sabotage twice: restoring the `<outcomes>`-only seed fails the
five positive assertions, dropping the fight-hook exclusion fails exactly the two that name it.
Measured either side of the change: **36** shipped sections gain the gate (the same 36 an
independent scan of the XML predicted) and the corpus's dead-end census is **unchanged at 8
sections**, which is the check that matters when a change can only add locks. Full suite 2464.

Filed 2026-08-11 (during conversion work on an unpublished book): **247** (MEDIUM), and nothing
else. Found by writing a floor onto a rolled Stamina loss and then asking why the section's exit was
still live — the answer being that `computeRollGate` had never looked at it, because the page has no
`<outcomes>`. Two things worth carrying forward. **The gate's precondition is a page SHAPE, not a
rule**: "hold the exits until the roll is made" is stated nowhere in terms of `<outcomes>`, and the
node is only there because the first pages that needed the gate happened to be tables — which is why
this went eight passes without being noticed. And **the census is the wrong way round from the
usual one**: the corpus's ordinary rolled wound is `<lose stamina="2d">`, applied on entry with no
control at all, so the exposed sections are exactly the ones that needed the rolled value for
something, and reading "how many sections roll dice" would have said nothing about how many leak.

Worked 2026-08-10 (implementation pass, task 246): closed **246**, nothing new filed. `groupPlan`
now derives its selector from `PASSIVE_BODY_TAGS`, and `render-rewards.js`'s `PASSIVE_TAGS` says in
one line why it omits `<transfer>` instead of leaving the reader to guess drift from difference. The
new assertion states the coupling — a `<group>` carrying one of every member must plan every one —
and was **verified by sabotage** rather than by passing: dropping `adjustmoney` back out of the
selector failed it (`planned=8 set=9`) together with all three of task 230's behavioural
assertions, which is the point worth carrying forward. A guard written for a duplication that has
already drifted is worth nothing until you have watched it fail; a test that only ever passed is
indistinguishable from one that asserts a tautology. Full suite 2450.

Filed 2026-08-10 (on closing task 245): **246** (LOW), and nothing else. Exporting the engine's
passive-effect set for 245's chain deferral showed how many copies of it there are — two besides
the canonical one, and the drift in one of them is task 230. Neither mis-renders a shipped section
(the roll-group/`<transfer>` divergence has zero corpus instances, measured), so it is filed LOW
and as a coupling to assert rather than a rendering to fix: **a comment asking a human to keep two
lists in step is not a mechanism**, and this is the second pass to read that comment after it had
already failed once.

Worked 2026-08-10 (implementation pass, task 245): closed **245**, and filed **246** on the way out
(entry above). The chain
deferral now asks "has this fight resolved" of every post-fight conditional, not only of the ones
spelled `dead=`: `isDeferredDeadChain` became `isDeferredFightChain`, holding a chain whose body
writes to the sheet on any gate. Two decisions worth carrying forward. **The effect list is
borrowed, not written again** — `engine.js`'s `PASSIVE_BODY_TAGS` is now exported and unioned with
`ITEM_FAMILY_TAGS`, because the shape of this defect was two guards disagreeing, and a third private
copy of "what counts as an effect" is how task 230's `<adjustmoney>` went missing. **The test rides
the whole chain, not the head**: an effect in the `<else>` alone defers, since the filing's own
markup put the 800 Shards there. §6.490's failure reproduced first as one assertion (weapon back on
the sheet, cache `6.490` empty, one unresolved fight) and the corpus's effect-free codeword chains
(book6/716/743) are asserted to stay live. Focused economy+actions passed 1188; the full suite 2449.

Filed 2026-08-10 (conversion pass on an unpublished book): **245** (MEDIUM), and nothing else. The
finding came from writing a *conditional* post-fight reward — "if you previously sold them X you can
recover it, along with 100 Shards; if you did not, they are carrying 800 Shards" — and measuring the
markup before committing it: the 800 landed on entry, before the fight. The carry-forward is about
**two gates that each assume the other covers a case.** Task 213's fight gate skips `<if>`-wrapped
effects because task 39's chain deferral owns them; task 39 owns only the spelling it was filed for
(`dead=`). Neither is wrong on its own and the gap is invisible from either side, so when a guard
defers to a second guard, read the second one's *entry condition* rather than its purpose. The census
cost is worth noting too: of ten non-`dead=` hits, six were inside a `<fightdamage>` (rendered inert)
and three were the `<else>` halves of `dead=` chains, so the raw count was 10 where the real number is
1 — count the shape mechanically, then read every hit.

Filed 2026-08-10 (conversion pass on an unpublished book): **244** (LOW), and nothing else. Same
shape as 243 filed hours earlier, one subsystem over, and the repeat is the point worth carrying
forward: **a rule the app already states correctly in one view is missing from a second view that
does the same job.** 243 was a capacity check the transaction owned and one view never asked for;
244 is an edition check `renderGoto` and `surfaceExtraChoices` both make and `revealBranch` does
not. Neither is a correctness bug — both refuse safely — and both were found by walking a control
the corpus reaches only from a *row of a dice table*, which is the part of the renderer with the
fewest eyes on it: a table reveals one row out of five, so four fifths of that code never renders
in a given playthrough. When auditing a view predicate, check every renderer that builds the same
control, not the one the books reach most often.

Worked 2026-08-10 (implementation pass, task 243): closed **243**, nothing new filed. The
capacity rule now has one home in `market.js`, and the two cargo-buy controls expose its refusal
before the click. The focused economy suite passed 555 assertions and the full suite passed 2427;
the defect was reproduced first by the two full-hold assertions while both room controls remained
live.

Filed 2026-08-10 (conversion pass on an unpublished book): **243** (LOW), and nothing else. The
cargo Buy is the only capacity-limited control in the app that stays enabled past its limit and
answers with a toast on the click; the 12-item cap one category over disables and titles itself.
Nothing is mis-granted — `buyTrade` refuses before spending, measured on both view paths — so the
fix is an affordance, not a correctness one. Worth carrying forward: **the rule already exists in
the rule module and only the view is missing it.** `market.js` computes "a ship here with room"
inside `buyTrade`; both view paths ask the weaker question (`shipsHere().length === 0`) because
that is the one the module happens to export. When a view's guard is thinner than the transaction's,
look for the predicate the transaction already computes rather than writing a second one.

Worked 2026-08-10 (implementation pass, task 242): closed **242**, nothing new filed. `state.js`
exports `canonBlessing` and `render-rules.js` folds every blessing-name↔blessing-name comparison
through it, so the blessing rules match the engine's own notion of identity. Two things worth
carrying forward. **The producer and its consumers had to move together**: canonicalising
`computeOutcomeBlessings`'s members while leaving the three `outcomeBlessings.has(normalize(b))`
lookups would have moved the defect one step sideways rather than closing it — two of the five
edited sites are not in the task's list of three. And **the older `<outcome>` guard had the same
gap**: the filing framed it as a simplification in task 241's new predicate, but task 108's form
missed its own alias pair identically, unexercised only because book 5 alone writes it. The
`validate-source.ps1` half was skipped on purpose — once the rule folds, a mixed pair is valid
source, so a gate on it would reject correct XML. 10 of 12 new assertions fail with the fold
neutralised (the 2 survivors are the negative controls); assertions 2411 → 2423.

Worked 2026-08-10 (implementation pass, task 241): closed **241** and filed **242** (LOW).
The widening went into one new structural helper (`branchBlessingEscapeGoto`) that both
predicates read, so the guard and the spend cannot drift apart. Three things worth carrying
forward. The filing's census reproduced exactly when re-run mechanically (42 sections, none
guarded, book6/160 the only `force="f"` exclusion) and added the fact that makes the rule
unambiguous: every one of the 42 is a single `<if>` with exactly one goto after the loss.
**The branch-scoping of that goto is the part with a real trap behind it** — book6/9's
"Otherwise →222" follows the loss in document order, so task 108's section-wide precedence
would have charged a player for walking away unblessed; only book6/9 exposes it, out of 42.
And **one shipped test asserted the defect**: `suite-combat`'s task-90 pair used §1.586 — one
of the 42 — with the comment "spends the blessing on entry". The task-90 rule was untouched;
its two assertions now click the escape instead of reading state after `begin()`. Assertions
2387 → 2411.

Filed 2026-08-10 (single finding, no code touched here): **241** (HIGH) — the "cross off the
blessing and turn to N" escape spends the blessing on entry and then disables the goto it paid
for, because task 108's guard recognises only the `<outcome blessing="X">` form and book 5 is the
only book that writes it. Found while converting an unpublished book that prints the same
instruction, then measured against books 1, 3, 4 and 6 rather than reasoned about: all four fail
the same pair of assertions. The census that sizes it (42 sections, none guarded) is in the task.
Worth carrying forward: **book 5's spelling of an idiom is not evidence that the other five books
share it** — the guard has been correct and unexercised since task 108, and every section it was
written for lives in one book.

Worked 2026-08-10 (implementation pass, tasks 237-240): started clean at `c1c94fb` and closed the
backlog. **237** — the runner now probes Python candidates instead of trusting the first name
`Get-Command` resolves, with `build/run-tests-selftest.ps1` driving both directions over shim
fixtures. Recorded there, because it changes how the filing should be read: the reported symptom
did **not** reproduce (all five candidates on this machine, aliases included, answer
`Python 3.14.5`), so the alias state observed at filing time was machine state and the defect is
the discovery's willingness to trust it. **238** — the choose-one item payment's availability now
comes from `losePaymentPlan` rather than the broader `hasItemMatch`, proved by restoring the old
guard and watching the new §5.152 case fail. **239** — `Pack.java`'s one stale filename literal,
exercised both ways from a temp fixture. **240** was filed *and* closed in this pass: a full run
was cut short mid-flight (the runner correctly named it as task 236's clock arm) and the dump
turned out to carry no progress information at all, so the harness now republishes `#results` per
suite and both the runner and CI print how far the run got.

Two things worth carrying forward. The stall behind a cut-short run is **still unexplained** — two
occurrences are on record against a budget with ~20x headroom, both passing on an immediate rerun;
what changed is that the next one will name a suite. And the assertion count moved 2382 -> 2387,
which is the number to compare against when reading a verdict by hand.

Reviewed 2026-08-10 (post-task pass, after tasks 211–236): started clean at
`cfac58d`. Re-read the completed task details and relevant production/test changes, checked the
build and test entry points against this Windows environment, and traced the remaining payment
availability path against shipped XML. No completed task needs reopening.

Filed **237** (MEDIUM): the runner trusts a resolvable WindowsApps Python alias without proving it
can execute, so it never reaches the working interpreter later on `PATH`. Filed **238** (MEDIUM):
§5.152's bonus-qualified item cost is enabled from a broader matcher than the shared loss plan,
leaving a +0-only player with a silent no-op button. Filed **239** (LOW): the intentional
`java-engine/README.md` displayability rename left `Pack.java`'s packaging literal at
`README.txt`; the user chose to retain the rename, and `AGENTS.md` now records the one-line
packager repair as the sole exception to the reference-only boundary. Also corrected the stale
header, Done checklist, and archive note so tasks 219 and 221–236 are represented accurately.

The default aggregate command exposed task 237 before the server launched. With the real Python
directory placed first temporarily, fresh-profile Chrome completed at
**`RESULT ALL PASS pass=2382 fail=0`**. DOM-free Node imports:
**`RESULT ALL PASS pass=35 fail=0`**. Validator fixtures:
**`RESULT ALL PASS pass=23 fail=0`**. Release fixtures:
**`RESULT ALL PASS pass=47 fail=0`**. This review made no production-code or generated-data
change; the tree was clean before the documentation-only filing.

Reviewed 2026-07-29 (twelfth full pass, after tasks 180–208): started clean at
`9a511ac`. Re-read the completion commits and their regression coverage across imported
state/visit restoration, rule planners, combat/economy, renderer and Story lifecycle,
accessibility, persistence, service-worker ownership, build/CI and workflow documentation.
Rechecked the post-review `Published=` refactor separately because it changed the release
boundary without a task number. No completed rule task needs reopening, and task 207 remains
correctly withdrawn.

Filed **209** (MEDIUM): `Published=` drives only part of a release. The service-worker data /
map inventory and final corpus scan still hard-code six books, the build leaves withdrawn
book outputs behind, and invalid/missing registry entries are skipped or duplicated rather
than rejected. A future book can consequently work online while failing fresh offline play
and escaping the every-section scan. Filed **210** (LOW): task 192's global mobile-drawer
class survives `releaseGameScreen()`, so a modal/recovery transition out of an open Sheet can
make the next game start open with its story and header inert. Both are now closed, so **every
filed task through 210 is complete and the backlog is empty**.

Organization verdict is unchanged: keep the dependency-free ES modules and existing
rule/view boundary. Task 209 belongs at the build/release manifest boundary and task 210 in
the existing app drawer teardown; neither warrants a framework, folder move or broad
refactor. PowerShell 7 build: **4,407 XML files valid**, 4,369 sections generated, **no
generated-file drift**. Validator fixture self-test: **`RESULT ALL PASS pass=23 fail=0`**.
DOM-free Node import suite: **`RESULT ALL PASS pass=35 fail=0`**.
Fresh-profile Chrome aggregate: **`RESULT ALL PASS pass=2100 fail=0`**, title `TESTS_OK`,
including every currently scanned section of all six published books. The connected
interactive browser was unavailable, so this pass does not claim an additional manual visual
inspection; the repository's real-Chrome headless suite completed normally.

Withdrew 2026-07-27: **207**, filed hours earlier while working task 204. It claimed that a
statement above its own `<while>` pass's roll wrongly reads the previous pass's value. Writing
the fixture settled it the other way: a section executes SEQUENTIALLY in JaFL, so in iteration 2
a line above the roll really does run before it and really does see iteration 1's value. The
"fix" (a position-blind pass seed) would defer such a read forever, since its own roll can never
re-assert in time — the attempt either used the stale value anyway or never applied the effect.
The fixture stayed as `task204b` in `suite-inventory`, pinning the sequential reads, and
`viewPendingVars` now documents why the per-pass set is position-sensitive on purpose. Nothing in
the corpus is written this way either, so no behaviour changed. With that, **every filed task
through 206 is complete and the backlog is empty**.

Reviewed 2026-07-26 (eleventh full pass, after tasks 175–179): started clean at
`d8e8c59`. Re-read the rule/state/economy modules, every renderer and app lifecycle,
service worker/build/CI paths, focused suites and workflow docs; compared live rule seams
against the XML/reference implementation; and checked source/generated parity, all explicit
bundled-book targets and every live tag/condition family. Filed **180–184** (HIGH):
untrusted fight memos reach `innerHTML`; task 175 leaves ordinary/derived/loop/navigation
consumers of a provisional reroll live; dice callbacks survive Save & quit; disease immunity
does not block affliction admission; and named cleanup removes only one stacked cumulative
curse.

Filed **185–197** (MEDIUM): wildcard affliction penalties, explicit equipment selection,
descriptor-correct market sales, hidden rest, failed-new-game recovery, cache namespace
ownership, narrow header and mobile-Sheet behavior, speech callback generations, transition
focus, the DOM-free import boundary, canonical app stamping and CI source/generated
verification. Filed **198–202** (LOW): deletion failure ordering, stronger source validation,
accurate suite-fatal documentation, creation-draft survival across SW activation, and the
remaining bounded accessibility semantics. The optional full-art basename collision was
reviewed but not filed: all three shipped illustrations are unique and broader art import is
not current scope.

Organization verdict remains the same: no framework, dependency, folder move or wholesale
module split is warranted. The fixes have existing owners; task 181 belongs in the DOM-free
planner/visit boundary, 180 at import rehydration plus safe DOM construction, 182 in Story
lifecycle, and the accessibility items are small app/view contracts. PowerShell 7 build:
**4,377 XML files valid**, 4,369 sections generated, with source/data parity intact. The
build exposed task 196 by changing only the generated stamp/cache identity on unchanged
tracked content. Fresh-profile aggregate smoke: **`RESULT ALL PASS pass=1692 fail=0`**,
including every section of all six books. The review changed only this backlog.

Reviewed 2026-07-22 (tenth full pass, after tasks 173–174): started clean at
`2245eae`. Reviewed every first-party runtime/rule/view/persistence module, the web shell
and service worker, build scripts, focused suites, XML integration and generated/reference
boundaries. Rechecked the architecture/import graph and sampled the corpus at each suspected
rule seam. Filed **175** (HIGH): blessing rerolls occur after branch effects have committed;
§6.49 removes the offered blessing before its button can work, while damage/permanent losses
and random rewards can survive a replacement result. Filed **176–177** (MEDIUM): unavailable
book input rejects outside the demo/import/load recovery UI; and the shared/custom modal
paths still lack complete keyboard isolation/focus restoration. Filed **178–179** (LOW): the
direct flee-choice path missed task 169's durable retry option, and lazy service-worker cache
writes are not held by the fetch event lifetime.

Organization verdict remains unchanged: these are bounded lifecycle and accessibility
contracts, not evidence for a framework, directory move or broad module split. Task 175's
pending-result rule belongs in a DOM-free planner/visit record with the view limited to its
controls; 176 belongs at the app/data validation boundary; 178 should reuse the existing
navigation policy; and 179 is a local service-worker promise fix. PowerShell 7 build:
**4,377 XML files valid**, 4,369 sections generated, **no generated-file drift**.
Fresh-profile aggregate smoke: **`RESULT ALL PASS pass=1619 fail=0`**, including every
section of all six books. The review itself changed no production/generated files.

Reviewed 2026-07-22 (ninth full pass): started clean at `68f7b8f` after tasks
168–172. Re-read the five implementations and their regressions line-by-line,
re-traced every navigation consequence/transaction/save/resume boundary, then
rechecked the unchanged engine/state/combat/market ownership, renderer split,
production/test imports, source/generated boundary, build/SW inputs and docs.
Filed **173** (MEDIUM): task 169 persists the durable consequence after a failed
target but leaves its retry in `Story._pendingRetry`; the v1 visit serializer,
sanitizer and resume path all omit it, so a reload at the recovery screen keeps
the spent item/wound/outcome and permanently loses the destination. Existing
tests prove only the same in-memory Story instance.

Duplication verdict remains **bounded**. A fresh normalized eight-line scan now
finds one production clone: the local click/append/return tail shared by the
equipment and profession pickers in `render-rewards.js`; extracting that tail
would obscure two short, policy-specific controls, so it stays. The only
actionable copy is the identical controllable navigation Promise repeated three
times inside `suite-actions.js`; filed as test-only LOW task **174**. Tasks
170–172 otherwise removed the display/combat/roll copies without creating a
generic framework, and their rules remain explicit.

Organization verdict: the flat dependency-free ES-module structure is still the
right shape. The production import graph has no direct cycle; rules modules do
not construct UI DOM; `render.js` remains a lifecycle/walk facade while the five
focused view modules own their named controls; and the large `engine.js` and
`state.js` are well-sectioned single owners rather than candidates for a
line-count split. Every shipped module is documented and precached. No folder
move, framework, build layer or broad refactor is recommended. PowerShell 7
build: **4,377 XML files valid**, 4,369 sections generated, **no generated-file
drift**. Fresh-profile aggregate smoke: **`RESULT ALL PASS pass=1605 fail=0`**,
including every section of all six books.

Reviewed 2026-07-21 (eighth full pass, including duplication audit): started
clean at `eac1790` after tasks 166–167 and the initial filing of 168. Re-read
both implementations line-by-line, traced every `Story.navigate` caller and
save/commit/status boundary, checked all story/sheet/menu interactions that stay
live during an async move, and re-audited engine/state/combat/market, renderer
ownership, production/test imports, content/source-generated boundaries,
build/SW inputs and documentation. Task **168** is confirmed but upgraded LOW →
MEDIUM and materially rescoped: `_txnSuppress` is global while unrelated story,
sheet and explicit Save & quit controls remain active, so the risk includes
successful moves, ignored secondary detours and false-success explicit saves —
not only a dropped sheet mutation on a rejected fetch. Filed **169** (MEDIUM):
task 167 transacts prices but consequence-first resurrection/item/flee/combat
paths have no rollback-or-retry contract; a cross-book resurrection proves a
live target can fail after the deal is already consumed.

Duplication verdict: there is **bounded duplication, not repository-wide
copy-paste sprawl**. A normalized exact-window scan found no eight-line clones
across the seven focused test suites and only four production windows at that
size. The actionable copies are filed as LOW maintenance tasks **170–172**:
canonicalise the duplicated `titleCase`/`escapeHtml` and three item-bonus label
implementations (170); extract small shared controls from the parallel
single/group combat views, whose drift already caused tasks 83/87/91/162/166
(171); and share roll widget/gate/memo primitives while keeping the four roll
algorithms explicit (172). `commitTxn()`'s exact copy of `commitVisit()` is
folded into 168 because that transaction must change anyway. Deliberately left
alone: the purpose-specific `previewProse`/`renderStatic` tree walkers, the
forced-buy/transfer gate collectors and small market/reward button tails — their
similarity is local, their policies differ, and another abstraction would cost
more clarity than it saves. Test fixture rebuilding is intentional suite
isolation; generated JSON and ignored `*temp.xml`/`*old.xml` source files are not
production-code duplication.

Organization verdict: the flat dependency-free ES-module structure remains the
right shape. Rules still live in DOM-free engine/state/planner modules, view
files remain responsibility-based, the production import graph has no direct
cycle, and `engine.js`/`state.js` are large but cohesive. No directory move,
framework, build layer or broad file split is recommended; the targeted tasks
above are enough. PowerShell 7 build: **4,377 XML files valid**, 4,369 sections
generated, **no generated-file drift**. Fresh-profile aggregate smoke:
**`RESULT ALL PASS pass=1526 fail=0`**, including every section of all six books.

Reviewed 2026-07-21 (seventh full pass): started clean at `793ab8e` after tasks
161–165. Re-traced the cumulative transition/combat persistence changes,
renderer lifecycle, state/save API and live navigation call sites; rechecked the
production/test import graph, rules/view boundary, module ownership, source vs
generated files, build/SW inputs, documentation and the new Markdown rule-doc
copies; and scanned the corpus for concrete triggers before filing tasks
**166–167**. Task 166 (HIGH) is a direct regression in task 7's safety contract:
the new explicit visit saves bypass `changed()`'s listeners, so final quota
failures are silent, recovery is not observed, and ctx-only progress does not
advance the save-card timestamp. Task 167 (MEDIUM) is the remaining pre-arrival
atomicity gap: paid cross-book choices persist the deduction before the target
fetch is accepted or the spent source frame is durable, and rejected promises
also strand the navigation guard. Live paid routes prove this is not synthetic.

Organization verdict: the repository is still arranged the right way. The flat
dependency-free ES-module layout remains appropriate; the task-119 view split is
cohesive, task 163 removed the one direct roll/choice module cycle, task 164's
focused suites no longer boot `app.js`, and rules still live behind DOM-free
engine/state/planner modules. `engine.js` and `state.js` remain large but have
single, well-sectioned ownership, so a directory reshuffle or line-count split
would add indirection rather than clarify responsibilities. The two findings
are persistence protocol defects, not evidence that the file layout needs a
redesign. PowerShell 7 build: **4,377 XML files valid**, 4,369 sections
generated, **no generated-file drift**. Fresh-profile aggregate smoke:
**`RESULT ALL PASS pass=1493 fail=0`**, including every section of all six books.

Reviewed 2026-07-21 (sixth full pass): started clean at `cb082e1` after the
task-115–160 burn-down. This pass reviewed the cumulative persistence and
renderer changes since the fifth audit, traced every visit-transition/combat
save boundary against the provider-written record, checked the production and
test import graphs, re-read the module/build/SW/docs contracts, rebuilt all
bundled data, and ran the aggregate browser suite on a fresh Chrome profile.
Filed tasks **161–165**. The severe finding is the remaining visit-transition
atomicity hole (161, HIGH): `goTo()`/`restoreReturn()`/`undo()` can autosave the
new state position while Story still serializes the old visit, and neither
`begin()` nor `goBack()` guarantees a final correcting save. A no-entry-effect
destination therefore reloads through stale migration; pure `<return>` sections
§4.69/§5.410/§6.448a lose their frame and can fresh-re-enter the source. The
independent combat gap (162, MEDIUM) is the same invariant at an action boundary:
continuing single/group rounds and blessing retries redraw directly without a
post-mutation visit save, so reload can heal the foe or restore a partial round.

Organization verdict: the production layout is still fundamentally sound. The
task-119 split made `render.js` a 1,210-line lifecycle/dispatch facade and left
cohesive view modules; `engine.js` and `state.js` are large but internally
sectioned around one rule engine and one aggregate game model, so splitting them
for line count alone would add indirection without a cleaner ownership boundary.
No directory reshuffle or framework/build layer is warranted. The concrete
post-split debts are bounded: break the direct `render-rolls` ↔ `render-choices`
ES-module cycle and align AGENTS/README plus stale comments/help text (163); prune
the copied whole-harness imports so focused suites stop evaluating unrelated
`app.js` boot code (164); and repeat task 141's archive maintenance now that
115–160 are complete (165). Source/generated ownership, the flat no-dependency
module scheme, core rules/view separation, service-worker required-module list,
content-hash inputs and licence boundary all checked clean. PowerShell 7 build:
**4,377 XML files valid**, 4,369 sections generated, **no generated-file drift**.
Fresh-profile smoke: **`RESULT ALL PASS pass=1462 fail=0`**, including every
section of all six books.

Re-prioritised 2026-07-20 (backlog re-review — no new code audit; the fifth-pass
verdicts stand). The burn-down cleared every HIGH and MEDIUM task, leaving all 17
open items in LOW. Two were under-ranked and are moved LOW → MEDIUM: **134** (a
multi-candidate market sell irreversibly destroys the wrong ship+cargo, or the
named weapon over a generic one — the same irreversible-loss severity that moved
118 to HIGH; its dependency, the 117/118 shared loss matcher, is now done) and
**137** (a save persisted without its `fl_meta` entry silently overwrites a whole
adventurer — a high-consequence save-integrity loss, unblocked now that 116 has
rewritten the persistence schema). 134 leads the MEDIUM block, then 137. The
remaining LOW bucket — never impact-ranked before (it carried filing order) — is
reordered: zero-risk signal protection first (**142** CI verdict grep, **143**
post-report silent-pass, **144** no-op rebuild cache-bust — the logic that moved
140/141 up), then the real-but-rare player-facing bugs (**149**, **148**, **138**),
a11y + info UX (**153**, **139**), the divergence/robustness/polish grab-bags
(**135**, **136**, **151**, **152**), and the three latent, no-corpus-trigger
items last (**145**, **150**, **160**). Everything else was re-confirmed LOW.
Work order is now 134 → 137 → 142 → 143 → 144 → 149 → 148 → 138 → 153 → 139 →
135 → 136 → 151 → 152 → 145 → 150 → 160.

Reviewed 2026-07-19 (fifth full pass): started clean at `383aede` (task 119
phases 1+2 freshly landed), suite green on a fresh profile at the reviewed
tree (`RESULT ALL PASS pass=1288 fail=0`). Method: two deep subsystem sweeps
(engine/state core; renderer/view), each finding verified against the code,
the live XML and the JaFL reference, with the highest-severity premises
re-verified line-by-line by a second reader; combat/market, build/CI/SW/docs
and the test harness were reviewed inline (three further parallel sweeps were
started and deliberately stopped; their scopes were re-covered inline). Filed
tasks **142–160**. The headline is a save/load atomicity family that is the
systemic successor to task 116 — the persisted visit record is not atomic with
the live visit: `begin()` autosaves the new section against the OLD ctx on
almost every navigation (154, HIGH — work this first); one-shot rest/buy/roll
memos are written after the saving mutation, so a reload repeats them,
re-opening 129/130 via save-scumming (155); and a mid-visit reload drops armed
`<tick special=>` fight bonuses/penalties (156) — one deferred-save fix likely
closes all three. Independent rules divergences: item-name globs never match —
§4.482/§6.201 unreachable, §6.144's trophy head never taken (157); two
written-max Stamina clamps still strip aura headroom, 124's siblings (158);
resurrection revives at half Stamina where the book and JaFL say full, a rule
that predates task 34 and was never reference-checked (159). View-layer races:
the dice-animation window lands pending rolls on the wrong visit (146) and
navigation has no in-flight guard — double-clicks double-run leave hooks and
entry effects (147); plus undo's stale return frame (148), pay-before-chooser
leaks (149), the latent renderIfChain else/elseif divergence (150), the
dead-end fallback counting disabled controls (151), a view polish grab-bag
(152) and a11y quick wins (153). Infra/tests: CI's verdict grep matches the
whole DOM dump — failing runs are misdiagnosed as bootstrap FATALs today, and
a source literal could false-pass tomorrow (142, proven against a real and a
hand-flipped dump); a failing `ok()` after report() is the harness's one
remaining silent-pass vector (143); meta.json's embedded build date busts
every installed player's cache on a no-op rebuild (144); payChoiceCost
validates a tag/wildcard payment it can never consume, latent (145); and the
task-117 loss matcher's two latent gaps (160). Task 119 gained a phase-3
guidance note: extract the remaining rule pockets (renderPassive's cascade,
grantChoosableReward, renderChoice's gates, branch resolution, the group
planner) as tested DOM-free planners BEFORE moving view files, and plan a
fourth rolls+branches view module. Checked clean this pass: task-115 detours
(every navigation routes through `Story.navigate`), 116's ctx serialization
round-trip, the memo-path tripwire, listener/XSS hygiene, a 4,437-section
corpus scan for the mixed flag-reward double-grant seam (zero fall-throughs),
`sanitizeData` field coverage, `canonCargo` folding, the task-128 equipment
fold (the real hyperium wand matches), combat.js blessing/reroll/group-fight
semantics, market transactions (the sole `currency=` market, book2/495, holds
no inline buys), the build scripts (validation-first, deterministic, the stamp
covers everything the SW precaches), the README module table, regression
coverage for all sixteen recent fixes, the every-section corpus suite, and
the NOTICE/licence split. Open items 134–139 were deliberately not re-verified
this pass (the fourth-pass verdicts stand); 119's progress claim was assessed
(~80% true) and extended rather than re-litigated.

Reviewed 2026-07-16 (fourth full pass): started clean at `b012eff` (no code
changes since the third pass — this pass was an independent re-audit with fresh
eyes: six parallel subsystem sweeps over engine/render/state/app/combat/market/
corpus/build, each finding verified against code, live XML, the JaFL reference
and TASKS.md before filing; the sweep was interrupted mid-run by an org spend
limit and resumed, so its coverage is recorded per area below). All seven open
premises re-verified: **115** confirmed but corrected (the live failure mode is
a *stale* return frame, not the fresh-visit fallback; the death→resurrection
path at app.js:649 added to the sweep), **116/117/118/119/120** confirmed as
filed (scope notes added: 117 gains the forced-payment seam, 119 the
non-recursive stamp collector trap, 120 two async-error harness gaps), and
**121** confirmed by live repro but rescoped — stamp-version.ps1 already runs
under 5.1, and the real blocker is engine-dependent output (culture-aware
`Sort-Object` changed the stamp hash; `ConvertTo-Json` escaping reformats the
book JSONs), so 5.1 parity is more than the punctuation fix. Filed tasks
**122–141**: roll-less `<outcome codeword=>` tables dead-end eight sections —
confirmed live at `?demo=4.2`, which renders the accept-your-fate button (122);
the disease/poison blessing's two un-aliased names (123); load/import stripping
aura Stamina (124); ungated flag-linked item rewards — §3.346's repeatable free
200 Shards (125); collapsed groups dropping `<buy>` — §5.192's Wrath of God
unobtainable (126); un-canonicalised abbreviated cargo names breaking the
shipping economy (127); §5.680's always-true bare-ability disjunct handing out
the ring of ultimate power (128); repeatable free fixed rests (129); inline-buy
quantity default (130); cache `max=` semantics incl. §4.263's money-doubling
(131); `<if blessing="?">` (132); stale story pane after sheet mutations (133);
market-sell first-match (134); renounce keeping god-tied resurrections (135); an
engine grab-bag — `tenth`, cargo-loss quantity, `description=`, `<set>`
identifier edges, `<buy force>` (136); save/meta orphan slots (137); offline
query-string navigations (138); foreign currencies missing from the sheet (139);
AGENTS.md's 404 test URL + CI's unrecognised `RESULT FATAL` (140); and archiving
done details out of this file (141). A fresh strict corpus pass re-confirmed
**4,369 sections, 0 parse errors, 0 name mismatches, 0 dangling Book 1–6
targets** (11 sections with no inbound markup link are inherited data quirks,
e.g. book4/69's own text says so). Checked and deliberately **not** filed:
market-level `buy=/sell="f"` column flags are ignored but harmless (no
opposite-side prices exist in any of the 9 affected markets); `inferDice`'s
1-die inference is correct for the corpus's only all-≤6 table (book3/411); the
six non-storm `<reroll>`s carry no effect children; `<outcomes var="z">`
(book6/731) works because every child repeats the `var=`; `<goto visit="t">`
(§4.231) is a spec'd no-op; `<trade name=>` ship rows and `header type="ships"`
are handled/display-only; task 30's documented repeat-outcome limitation was
re-examined (§5.674's pay-per-attempt cure is its worst live case) and left as
documented. Suite green at the reviewed tree, fresh profile:
`RESULT ALL PASS pass=1076 fail=0`.

Re-prioritised 2026-07-16 (same day, follow-up): tasks **141** and **120** moved
LOW → HIGH. 141 (archive done details) goes **first** — zero-risk, no
dependencies, and every subsequent task pays the cost of reading this file. 120
(test split + async-gap hardening) slots after the quick severe fixes 122–124
and **before** the test-heavy 115–117 chain, so the ~20 open tasks write their
tests into focused suites rather than deepening the single-scope monolith, and
the silent-pass vectors are closed before the big fixes' green runs are trusted.
A second ordering pass the same day moved **140** LOW → HIGH second position
(same logic as 141: zero-risk, and it corrects the test instructions every task
follows) and **118** MEDIUM → HIGH immediately after 117 (hard dependency on
117's shared loss matcher — back-to-back keeps the design context warm; the
irreversible plot-item loss also supports HIGH). Checked and deliberately left:
119 stays after the bug burn-down (the fixes build its planners and their tests
de-risk the refactor); 121 stays MEDIUM (dev-only, and its rescope made it a
decision + larger job, not a quick win); 132 stays MEDIUM despite sharing 123's
blessing seam (that seam is trivial to re-enter, unlike 117's matcher); 137
stays after 116 (116 rewrites the persistence schema 137 would touch); 134/136
stay after the matcher and buy-transaction work they reuse. Work order is now
141 → 140 → 122 → 123 → 124 → 120 → 115 → 116 → 117 → 118 → 125–128.

> Older audit passes (the 2026-07-15 third full pass and everything before it) are archived in [`REVIEW.md`](REVIEW.md), alongside the 2026-07-09 external repository review. The most recent pass stays above.
