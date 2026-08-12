# Fabled Lands — Web Edition · Engineering TODO

Backlog of recommended improvements. Open tasks are filed under priority buckets
(**HIGH** / **MEDIUM** / **LOW**) — work the first open (`- [ ]`) item top-down;
each task's detail section carries the same stable ID. Every filed task through
256 is complete (listed under **Done** below), apart from 207, withdrawn as a
misdiagnosis (see the Review log) — the buckets are clear, so file new work
under the priority bucket that fits, and record the pass in the Review
log. Completed detail sections are archived in
[`TASKS-archive.md`](TASKS-archive.md); the Review log at the end of this file
records each audit pass and is where new work is filed.

This file is for **defects**. New features are scoped in
[`ROADMAP.md`](ROADMAP.md) instead, as ordered phases — pick up a phase from
there once the buckets below are clear.

**HIGH**

*(none open — file new HIGH work here)*

**MEDIUM**

*(none open — file new MEDIUM work here)*

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

---

## 256. An `<itemcache>` ignores its cache lock, so §4.586's confiscation is undone by clicking Take

**Priority: MEDIUM — one section is really broken by it and the section is a set piece, but the
markup that depends on it is rare and the failure is a player choosing to defeat their own page,
not a wrong result arriving unasked.**

*(Filed 2026-08-12, on reading the cache vocabulary end to end while converting an unpublished
book's confiscation scene.)*

`renderItemCache` (`render-market.js:528`) never reads `isCacheLocked`. Its sibling
`renderMoneyCache` does — line 514, and deliberately only for a lock bundled with a roll, which
is task 38's rule that a plain stash lock leaves a bank editable. The item widget got no lock
handling of either kind, so `<tick special="lock" cache="X">` is a no-op over an `<itemcache>`
and every Take/Store button stays live.

**book4/586 is the section that depends on it.** It prints "You cannot carry any of your
possessions, except for any **keys** you might have… Nor can you wear any armour", moves
everything into `4.586` with `<transfer to="4.586" item="*" xitem="*key*" shards="*">`, locks that
cache with `<tick special="lock" cache="4.586" hidden="t"/>` — and carries **no unlock at all**.
**book4/528** holds the matching `<tick special="unlock" cache="4.586" hidden="t"/>`, immediately
above its own `<itemcache name="4.586">`, with an editor's note saying the cache key is reused so
the gear can be reclaimed there. The pair is written as lock-here, unlock-there across two
sections; today the widget at §586 offers a live **Take** for every item the transfer just moved,
so the player empties the box on the spot and walks into §377 fully equipped and armoured. The
whole point of the scene is lost, and §528's unlock is dead markup.

**The fix cannot read the lock while the widget draws — it has to read it after the walk.** The
corpus places an item cache on *both* sides of its unlock: book1/177, book1/434, book2/665 and
book6/284 put the `<itemcache>` **below** the unlock, while book4/468, book4/509 and book6/464 put
it **above**. A sequential reading would therefore lock half the town houses shut and leave the
other half open, which is not a rule. The end-of-walk state is the one that separates the cases,
and it is the pattern the render layer already uses for exactly this (`applyTransferGate`,
`applyBuyGate`, `applyPendingRerollGate` — post-walk passes that only ever ADD a disable).

Measured over every section in books 1–6 that pairs an `<itemcache>` with a lock on the same cache
(20 of them), by whether the unlock is reachable unconditionally:

| shape | sections | end-of-walk verdict |
| --- | --- | --- |
| lock + unconditional `hidden="t"` unlock | 16 (book1/177, book1/300, book1/434, book2/171, book2/211, book2/278, book2/348, book2/665, book3/335, book3/607, book4/450, book4/468, book4/509, book6/238, book6/414, book6/576) | unlocked — **unchanged**, every town house stays editable |
| lock + unlock inside an `<if codeword=>` | 2 (book3/74, book6/284) | locked only in the branch where fire has just emptied the stash — a sealed empty box |
| lock, no unlock | 1 (book4/586) | **locked, which is the fix** |
| conditional lock, no unlock | 1 (book6/464) | locked only when a **sealed letter** is stored, and that branch sends the player to §28 "at once" |

So the live effect is §4.586 → §4.528, plus book6/464's one letter-stored state; nothing else in
the corpus moves. Both of those want asserting either way, since they are the only two the fix
can be wrong about.

**Fix:** tag the widget's Take/Store buttons with their cache name in `renderItemCache`, add an
`applyCacheLock(flow)` post-walk pass beside the other gates in `render()`, and disable a tagged
button whose cache is still locked when the walk ends, with `renderMoneyCache`'s tooltip idiom.
It must run **before** the dead-end fallback's control census (`render.js:858`), which filters out
disabled controls — book4/586's own `<goto section="377"/>` keeps it from firing, but a section
whose only control is a locked Take would otherwise read as a narrative death.

Tests: assert §4.586's Take is disabled after the transfer and that §4.528's unlock re-enables
it on the same cache; assert a town house with an unconditional unlock is untouched (book1/177 and
book4/509, one widget either side of the unlock); assert book6/464 both ways.

---

> **Completed task details (tasks 1–255) are archived** in [`TASKS-archive.md`](TASKS-archive.md) (tasks 141, 165, 211, 255) to keep this file focused on open work. The checklist above still carries every task's stable ID and status; a done task's detail lives in the archive under the same `## <N>.` heading. No completed detail remains in this file; the Review log follows.

---

## Review log

*Running audit log of the backlog — each pass re-verifies the open items against
the current code and records what was filed, split, or re-confirmed. Task
numbers refer to the contents checklist at the top of the file.*

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
