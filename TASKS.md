# Fabled Lands — Web Edition · Engineering TODO

Backlog of recommended improvements. Open tasks are filed under priority buckets
(**HIGH** / **MEDIUM** / **LOW**) — work the first open (`- [ ]`) item top-down;
each task's detail section carries the same stable ID. Every filed task through
307 is complete (listed under **Done** below or in the buckets), apart from 207,
withdrawn as a misdiagnosis (see the Review log); **no task is open**. File new
work under the priority bucket that fits, and record the pass in the Review
log. Completed detail sections are archived in
[`TASKS-archive.md`](TASKS-archive.md); the Review log at the end of this file
records each audit pass and is where new work is filed.

This file is for **defects**. New features are scoped in
[`ROADMAP.md`](ROADMAP.md) instead, as ordered phases — pick up a phase from
there once the buckets below are clear.

**HIGH**

- [x] 295. `renderItemCache` draws no money controls without `max=`, so book4/586 confiscates the player's whole purse and book4/528 can never give it back

- [x] 294. book4/257 leaves a mixed pair of rolls with no exit at all, so succeeding one check and failing the other ends the adventure

**MEDIUM**

- [x] 310. `reconcileEquipment` writes the DEFAULT weapon/armour back into `data.equipped`, so an implicit default is stored as an explicit choice and "else the strongest of that kind" can never fire again — a pregen Warrior who buys a magic sword keeps swinging their battle-axe at COMBAT 8 instead of 10

- [x] 303. `<if ability="defence">` compares against 0, not the player's Defence, so book5/361's §160 route is unreachable at any Defence and book1/313's daggers always hit — task 68's fix for `rank`/`stamina`, never extended to the third stat

- [x] 304. `defence()` sums items, Rank and auras but not afflictions, so book5/638's Curse of Vulnerability subtracts its 3 points from nothing and the curse is inert

- [x] 299. nothing in the port fires on a change of BOOK, so book5/681's golden hair never pays the 20 Shards it promises on every crossing — and the corpus's only two `TODO` comments say so

- [x] 296. `rewardWasteReason` refuses a new resurrection deal to anyone already holding one, where `addResurrection` implements the replacement the books print — so book1/597's third reward is dead to a deal-holder

**LOW**

- [x] 309. `ROADMAP.md` sizes the map-position work against "the 4,437 section files", which is the glob count task 270 was filed to stop anyone quoting — the shipped corpus is 4,369

- [x] 308. `groupPlan.linkedAwards` grants EVERY item-family award sharing the price flag, where the Take path it stands in for grants one — so a `<group>` paying for a "choose one" menu would hand over the whole item half of it and kill the rest

- [x] 307. a `<group>` that pays for a flag-linked award grants it and leaves the award's own Take button on the page, disabled and captioned "Pay first to choose this." — so book1/342 offers to sell you a potion you are already carrying

- [x] 306. the fight widget's "Your Defence" row re-derives the score instead of asking the resolver, so a `modifiers="noarmour"` fight shows the armoured number the enemy is not rolling against — book5/689 reads 12 while the drake rolls against 7

- [x] 305. a `<tick god=>` shares `readEffects` with the afflictions, so it accepts `ability="defence"` (task 304) and `ability="stamina"` (task 185) — and `data.effects` is read only by the core-ability paths, so both parse, store and move nothing

- [x] 302. the port acts on neither `modifier="noarmour"` nor `modifier="current"` off `<adjust>`, though the JaFL spec defines both — so two spec-legal spellings are build errors this port cannot honour

- [x] 301. closing `modifier=`'s value set also closed the numeric/var addend `renderDifficulty` implements, so a shape the view supports is now a build error — deliberate, and recorded here because nothing else would say so

- [x] 300. nothing validates a `modifier=`/`modifiers=` value, so one misspelling silently reverts a check to the very score the page says not to use — across 42 shipped sites, and it is task 46's defect from the source side

- [x] 297. the resurrection waste guard is a blanket engine rule that only book1/597's printed wording justifies, so the first flag-linked offer on a page printing the replacement rule will be refused an option its own text grants

- [x] 298. `renderResurrection`'s `hidden="t"` auto-register path ignores `unique="t"`, so the exclusion task 297 gave the markup is honoured on two of the three paths that arrange a deal

- [x] 293. book3/40 shows its editorial reroll note before the roll it describes, and the obvious sentinel would open a live exit

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
- [x] 281. Sweep for renderers whose click handler no assertion ever fires — `renderTraining`'s never was, which is why task 172's parity pass could not see 278 *(9 of 71 cold; 3 covered, 6 filed as 282)*
- [x] 282. Six click handlers still fire for no assertion — three modal-opening renderers and the Adventure Sheet's Wield/Move-down/Drop *(all six now driven; the probe reports cold 6 → 0)*
- [x] 280. The market header row renders `header1=` and drops `header2=`/`header3=`, so 23 authored column headings ("To buy", "To sell") never reach the page *(adjudicated a deliberate simplification — documented, not changed)*
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

## 278. `renderTraining` reads its `var=` to hold a `<while>` pass but never writes it, so §2.554's "lose 1 MAGIC if you roll a two" can never fire

**Priority: HIGH — this one *is* mis-adjudicated, which is the line task 277's filing drew
between HIGH and MEDIUM. The player escapes a printed penalty entirely. It is one section, not
45, and the stake is small (1–2 MAGIC), so a reader who weighted blast radius over correctness
could argue MEDIUM; the rubric weights correctness, so it is filed HIGH.**

*(Filed 2026-08-16 while closing task 277, from a claim in 277's own filing that turned out to
be wrong — see the Review log.)*

Task 277's filing asserted that "the other three roll-adjacent helpers (`rollGate`,
`markWhilePending`, `writeRollVar`) are called by all four" roll renderers, and used that as the
evidence that `appendRollDescription` was an omission rather than a decision. **Two thirds of
that is false.** `renderTraining` (`render-rolls.js:362`) calls `markWhilePending` but neither
`rollGate` (deliberate and documented — "`<training>` has no pay gate — a plain memo lookup")
nor `writeRollVar`. So the real asymmetry is 3-of-4 twice over, and one of the two is a defect.

`renderTraining` reads its `var=` — once:

```js
const stored = story.ctx.rolls.get(key);
markWhilePending(story, stored, path, node.getAttribute('var')); // hold a <while> pass
…
story.ctx.rolls.set(key, rollTraining(story.state, ability, dice, add));
```

It reads the attribute to declare the var *pending*, and then never assigns it. The other three
renderers all follow their `ctx.rolls.set` with `writeRollVar(story, node.getAttribute('var'), …)`.

**§2.554 is the one shipped node that carries a `var`** (census over the shipped corpus: 62
`<training>` nodes, exactly 1 with `var=`, 0 with `flag=` — so the missing `rollGate` call is
unreachable and needs no change):

```xml
<training ability="magic" var="x"/>. Gain 1 on MAGIC if you get higher than your current score, but
<if var="x" equals="2">
    <lose ability="magic" amount="deduct"><i>lose</i> 1 MAGIC</lose> if you roll a two.
</if>
```

`x` is never assigned, so the guard reads an unwritten var. That does **not** throw and does not
warn: `engine.js:262` resolves it through `state.getVar`, which returns `0` for an undefined var
(`engine.js:1538`), and `0 === 2` is false. The snake-eyes penalty is silently unreachable, and
the printed sentence "if you roll a two" describes a rule the engine cannot apply.

**The fix is one line**, mirroring the other three renderers, in both places `renderTraining`
stores a result (the first roll and the Luck reroll). `rollTraining` already returns `total` —
the 2-dice sum, which is exactly what `equals="2"` tests:

```js
const res = rollTraining(story.state, ability, dice, add);
writeRollVar(story, node.getAttribute('var'), res.total);
story.ctx.rolls.set(key, res);
```

**Note the value differs from its siblings and that is correct**: `renderDifficulty` and
`renderRankcheck` write `res.margin` (a success *margin* is what their sections test), where
`<training>`'s section tests the raw dice total. Do not copy the margin line.

Assertions for `suite-render.js`: a `<training ability="MAGIC" var="x"/>` assigns `x` after the
roll and memoises it (`wroteVars`/`rolledVars`, as the task-172 gated cases assert for the other
three), and — driving §2.554 itself with a forced seed — a rolled 2 fires the `<if var="x"
equals="2">` and takes the MAGIC loss, where a higher roll does not. `suite-render.js` already
seeds the RNG this way for §6.700.

---

## 279. Sweep the remaining tag families for task 277's shape — a shared helper only some of a sibling set calls

**Priority: LOW — an audit, not a known defect. It is filed rather than left in the Review log
because the one family that *has* been swept produced a HIGH defect (278) on the first look, so
"probably nothing" is not a safe assumption to leave unrecorded.**

*(Filed 2026-08-16. Suggested in the Review log by task 277's filing pass, repeated by its
implementation pass, and filed as a task only on the third mention — see the Review log.)*

Task 277's defect shape: a module-private helper factored out for a family of sibling renderers,
which only some of the family calls. It is invisible to tests, because every assertion about the
siblings is about what they *do* rather than what they share, and invisible to reading one
renderer at a time — it only shows up when the siblings are read side by side.

**The roll family (`render-rolls.js`) is done** — swept while closing 277, which found the
`appendRollDescription` gap (277) and the `writeRollVar` gap (278), and confirmed the missing
`rollGate` call in `renderTraining` is deliberate and unreachable (0 `<training flag=>` in the
corpus). **The other families have not been swept.** In rough order of how much rule they carry:

- **`render-rewards.js`** — the chooser family (`renderAbilityChoice`, `renderEquipmentChoice`,
  `renderForfeitChoice`, `renderProfessionChoice`) against `atSentenceStart`, `fillDefaultWords`,
  `showForfeitPicker`, `showAbilityPicker`; and the payment family (`renderPayment`,
  `renderOptionalPay`, `renderChooseOnePay`, `renderRollPayment`, `renderForcedOptional`).
- **`render-market.js`** — `renderShopRow` against `runSoldHooks`/`runBoughtHooks`/`hookMatches`.
- **`render-combat.js`** — `drawFight` against `drawGroupFight`, over `statsRow`,
  `playerStatsRow`, `logRow`, `makeFleeButton`, `afterAction`.
- **`render-choices.js`** — `deadGate`/`targetBook` across the goto/choice renderers.

Method that worked, and it is cheap: list each module's `^function ` declarations (one `grep`),
then for each helper count its call sites against the size of the family it serves. A helper
called by *all* of its family, or by exactly *one*, is uninteresting. **The 2-of-4 and 3-of-4
cases are the whole yield.** For each, decide whether the gap is deliberate — say so in a comment
where it is, as `renderTraining` already does for its pay gate — and, where it is not, census the
corpus for a node that reaches it *before* filing, since an unreachable gap (the `rollGate` one)
warrants a comment and nothing more.

---

## 280. The market header row renders `header1=` and drops `header2=`/`header3=`, so 23 authored column headings ("To buy", "To sell") never reach the page

**Priority: MEDIUM — task 277's shape and task 277's rubric: authored words that never reach
the page, with no rules consequence (every price, buy and sell control works). Smaller than 277
at 23 nodes rather than 45 sections, but the same call.**

*(Filed 2026-08-16 while closing task 277, from an "allowlisted attribute the app never reads"
census — a different sweep from task 279, and the only real finding in it. See the Review log.)*

`renderMarket` (`render-market.js:36`) reads one of the three:

```js
const h1 = child.getAttribute('header1');
const title = (h1 && h1.trim()) || MARKET_TITLES[child.getAttribute('type')] || 'Goods for sale';
```

so `<header header1="Item" header2="To buy" header3="To sell"/>` (§1.292) renders the single
heading `Item` and drops the other two. Census over the shipped corpus: **15 `header2=` and 8
`header3=`**, always on `<header>` inside a market.

**This may be a defect or an undocumented simplification, and deciding which is most of the
work.** The three attributes are *column* titles for a three-column price table — item, buy
price, sell price — where this app renders a market as a list of rows carrying their own
buy/sell buttons, so there is no column for a column heading to sit over. If that layout stands,
the right change is a comment at the `header1` read saying the other two are deliberately dropped
and why (the same courtesy `renderTraining` already pays its missing pay gate). If the headings
should show, the natural place is the `.market-head` row, and the labels then need to survive a
narrow screen — check `web/css/` for how `.market-row` wraps on mobile before adding two more
strings to that line. **Do not add a three-column table for this**; that is a layout change well
beyond a dropped-heading fix, and belongs in `ROADMAP.md` if it is wanted at all.

Assertion for `suite-economy.js` (which owns the market views), once the decision is made: either
§1.292's market shows "To buy"/"To sell", or a regression test is not warranted and the comment
is the whole deliverable — say which in the Review log.

**Two riders from the same census, neither filed as its own task, both cheap to settle while
here.** `<goto visit="t">` (§4.231, 1 node) is unread, and the JaFL spec says it may stay that
way — "*whether the section being jumped to is one that will be returned from. At the moment this
is unnecessary, but is probably good practice*" (`rules/JaFL-XML-Tags.md:87`). `<section start="t">`
(6 nodes, section 1 of every book) is unread because its spec meaning — "*the first section of a
new book … whichever character the player has chosen will be finalised*" — describes a JaFL
character-selection step this app completes on its own creation screen before section 1 is ever
entered. Both are correctly unread; a one-line comment naming each as deliberate would stop the
next census re-finding them.

---

## 281. Sweep for renderers whose click handler no assertion ever fires — `renderTraining`'s never was, which is why task 172's parity pass could not see 278

**Priority: LOW — an audit of the suite, not a known defect, filed for the same reason as 279:
it ends either in defects or in a recorded "checked, clean", and both are worth a task.**

*(Filed 2026-08-16 while closing task 278.)*

Task 172 was explicitly a *parity* pass over the four roll renderers, and it did not find 278.
The reason is mechanical and confirmed: **before task 278 no assertion in the suite had ever
clicked a `<training>` roll button**, so `renderTraining`'s click handler — the only place the
missing `writeRollVar` could have shown — never ran in the browser at all.

Two independent things hid it, and each is worth looking for elsewhere:

- **The shared selector silently does not match.** The task-172 block's helper is
  `rollBtn = (c) => Array.from(c.querySelectorAll('.roll .btn-roll')).find((b) =>
  /Roll|Rank check/.test(b.textContent))`. A `<training>` button reads `Train MAGIC (roll two
  dice)` — lower-case `roll`, so the case-sensitive alternation misses it and `rollBtn` returns
  `undefined`. Nothing warns; the cases that would have used it simply were not written.
- **The one parity list `<training>` is absent from is the one that clicks.** `gatedCases` covers
  `<difficulty>`/`<random>`/`<rankcheck>` and rolls each, and excluding `<training>` is correct
  and documented (it has no pay gate). But that exclusion removed it from the *only* list in the
  block whose body calls `.click()` — `descCases`/`bareCases` include `<training>` and assert on
  static DOM. So the tag was present in the parity block throughout and still never driven.

The rest of the suite does not cover the gap: `suite-engine` exercises `eng.rollTraining` — the
*rule*, which is correct and was never in question — and `suite-render:130` drives §5.59's bare
`<training>` only as far as the six-ability picker, stopping before the roll. `suite-corpus`
renders every section but clicks nothing.

**The sweep**: for each `render*` view module, list the handlers passed to `rollButton`,
`appendChild`-ed `button`s and `addEventListener('click', …)`, and check whether any assertion
reaches each one. A cheap first cut is to instrument — set a flag in each handler, run the full
suite, report the handlers still unset — which needs no static analysis and cannot be fooled by
a selector that does not match. Record the clean ones so the next pass does not re-derive them.

Two candidate fixes fall out whatever the sweep finds, neither of them urgent: widen `rollBtn`'s
regex (or match on `.btn-roll` alone, as this task's `trainBtn` does) so a renamed button label
cannot silently drop a case, and give the parity block a `rollCases` list that every roll tag
joins, separate from `gatedCases` which only the gated three can join.

---

## 282. Six click handlers still fire for no assertion — three modal-opening renderers and the Adventure Sheet's Wield/Move-down/Drop

**Priority: LOW — the tail of task 281's sweep, filed rather than left in the Review log because
it is a concrete list with a measurement behind it, not a suspicion. Every one is a control a
player uses; none is known to be broken.**

*(Filed 2026-08-16 while closing task 281.)*

Task 281 instrumented `addEventListener` and ran the full suite: **71 click-handler sites, 9 of
which no assertion ever fired.** Three were covered while closing it. These six remain, and they
fall into two groups that want different work.

**The three that open a modal** — the reason they were skipped is the same for all three, and it
is the interesting part: each hands off to `ui.js`'s `modal()`, which returns a promise resolved
by a button in a dialog appended to `document.body`, so an assertion has to drive a control
*outside* the story container and `await` a result. Nothing in `web/tests/` does that yet, which
is why the gap is uniform rather than incidental:

- `render-market.js:422` — the inline `<sell cargo>` click (1 registration). Its `cargo="?"` form
  asks *which* commodity through `modal()`; the single-commodity path resolves without one, so
  even a partial test is worth more than none.
- `render.js:999` — the `<image>` inline link (6), which opens the illustration modal (§3.75's
  map of Bazalek, task 62).
- `render.js:1574` — the `<sectionview>` oracle link (2). Task 101 records it as pure divination
  flavour that "arms no controls and never touches the player's section/history/state" — so the
  assertion worth writing is exactly that: click it and prove the sheet, section and history are
  untouched.

**The three on the Adventure Sheet** (`ui.js`, outside the `render*` modules 281 scoped itself
to, which is why they are listed and not fixed): `ui.js:293` Wield/Wear (33 registrations),
`ui.js:307` Move down (55) and `ui.js:310` Drop (55, also modal-gated). **Move *up* is warm and
move *down* is cold**, which is the sharpest single result in the sweep — the pair is written as
one control and covered as half. The order matters to a rule, not just to tidiness: §1.521/§248's
theft takes "possessions listed first", so the reorder buttons decide what a robbery costs.

Method, unchanged from 281 and cheap to repeat: wrap `EventTarget.prototype.addEventListener` in
a classic script ahead of the modules, key each `click` registration by the `/web/js/…:line:col`
frame in `new Error().stack`, wrap the listener to count firings, and report the sites with
`fired === 0` after the suite. **It has one blind spot worth knowing**: a handler on a branch the
suite never *renders* registers zero times and so never appears at all — `renderPayment`'s
forfeit-picker branch is one such, invisible to both this method and the report.

---

## 283. The click-coverage probe collapses a shared registering helper's callers into one frame, so a cold caller reads as warm

**Priority: LOW — an accuracy limit in an audit tool, not in the app. Nothing a player touches is
known to be broken; what is wrong is a number two tasks have now been steered by.**

*(Filed 2026-08-16 while closing task 282.)*

The probe tasks 281 and 282 both ran keys each `click` registration by **the first `/web/js/…`
frame in `new Error().stack`** — which is the frame that *called* `addEventListener`, not the
frame that supplied the listener. Where a module registers a handler on its own line those are
the same thing, and for 69 of the 71 sites they are. Where a **shared helper** builds the control
and attaches a handler passed in by its caller, they are not: every caller collapses into the
helper's single frame, and that frame is warm the moment *any one* caller is clicked.

Two such helpers exist today, and the first is the one that matters:

- **`render-rolls.js:33`, inside `rollButton(story, label, widget, onRoll)` — seven callers**
  (`renderDifficulty` ×2, `renderRandom` ×2, `renderRankcheck` ×2, `renderTraining`). One frame,
  one warm/cold bit, seven distinct controls. **This is exactly the gap that started the whole
  line of work**: task 278 was a `<training>` roll button no assertion had ever clicked, and had
  the probe existed then it would have reported `render-rolls.js:33` warm and moved on. Task 281
  found 278 by reading the parity lists, not by measuring — the measurement could not have found
  it, and 281's write-up does not say so.
- **`render-combat.js:188`, inside `makeFleeButton(story, fleeNode, markFled)` — two callers**
  (the section-fight and the standalone-fight control rows). Two controls, one bit.

So the honest figure is **78 controls behind 71 frames**, and `cold=0` means "no frame is cold",
which is a weaker statement than the one tasks 281 and 282 were read as making. Nothing found by
either task is retracted by this — every site they covered is genuinely covered, and 282's
before/after `6 → 0` is a true measurement of the frames it measured. What is wrong is only the
denominator, and the confidence "0 cold" invites.

Two things this task should settle, in order:

1. **Key by the caller, not the registrar.** Walk the stack past frames belonging to the module
   that called `addEventListener` and record *both* frames — `render-rolls.js:394 →
   render-rolls.js:33` — so the seven roll buttons separate. A cheaper variant that needs no
   stack heuristics: have the probe additionally key on the control's own `className` +
   `textContent`, which distinguishes `Train MAGIC (roll one die)` from `Roll two dice` without
   caring where the listener came from.
2. **Then re-run and re-report the real cold list.** With the seven `rollButton` callers
   separated, some may well be cold — a cold caller is what 278 was. Whatever it finds is the
   next task, and if it finds nothing that is the "checked, clean" worth recording.

Also worth confirming while there, since it is one command and settles 282's recorded blind spot
rather than leaving it a suspicion: the seven view modules hold exactly **71** static
`addEventListener('click'` sites (`app.js`'s 19 are out of scope — `_test.html` never imports it),
and the probe saw 71 frames. Those two numbers matching is consistent with every in-scope site
registering at least once, i.e. with the "a branch the suite never renders never appears at all"
blind spot **not** biting today — but it is not proof, since two sites sharing a line would
collapse and a genuinely-never-registered site could be masked by a coincidence in the totals.
Diff the probe's full frame list against the static line numbers and the point is settled either
way.

---

## 284. `renderPayment`'s open-forfeit branch is the one in-scope click handler that never registers in the whole suite, so the picker a forced "give up which?" payment opens has never been rendered

**Priority: LOW — an untested branch of shipped code, not a known defect. Whether a player can
reach it at all is precisely the open question; if none can, the outcome is a comment.**

*(Filed 2026-08-16 while closing task 283.)*

Task 283's re-keyed probe run settled the count question 282 left open, and settled it the other
way. The seven view modules hold **71** static `addEventListener('click'` sites and the probe
observed **71** frames — but one of the observed frames is **`app.js:837`** (the Adventure Sheet
backdrop, registered because `suite-economy.js` imports `installSheetDrawer` from `../js/app.js`),
so only **70** in-scope sites ever register. The equal totals were a coincidence, and it hid
exactly the failure they were quoted as ruling out. Diffing the two lists names the missing one:

**`render-rewards.js:445`** — the `plan.needsChoice` arm of `renderPayment`:

```js
} else if (plan.needsChoice) {
  btn.addEventListener('click', () => { btn.disabled = true; showForfeitPicker(story, container, plan, commit); });
} else {
  btn.addEventListener('click', () => commit(null));   // :447 — covered by task 282
}
```

A **forced** economic payment whose cost is an open `"?"` possession/equipment/cargo forfeit with
more candidates than it takes. Its two siblings are covered — the ineligible arm is asserted
disabled (task 117, §2.90) and the plain commit was driven by task 282 — and `showForfeitPicker`
itself is exercised, but only through `renderOptionalPay` (`:515`) and the §2.90 route. Nothing in
the suite has ever rendered *this* call to it.

Task 281 named this shape as the probe's blind spot ("a handler on a branch the suite never
renders registers zero times and so is invisible to the probe entirely") and named this very
branch as its example — but could only assert it, since a registration probe cannot see what does
not register. The static diff is the proof, and it is now known to be the **only** in-scope
instance.

Task 279's sweep note lives in `render-rewards.js` immediately above `showForfeitPicker` and
adjudicates three picker gaps as unreachable. It lists `renderPayment` among the renderers that
**do** ask, so this branch fell outside the sweep entirely — it is a fourth case, and the sweep's
own rule (census the corpus *before* filing) has not been applied to it.

What to settle, in order:

1. **Can a shipped section reach it?** Per 279's note the corpus's only open-forfeit costs are
   **§2.90, §4.456 and §5.152**. For each, check which payment renderer the `dispatch` in
   `render-rewards.js:269` picks — `isEconomicPayment` routes to `'payment'`, and the optional /
   choose-one / roll arms take the rest — and whether `losePaymentPlan` can report
   `needsChoice: true` there (an open selector *and* more candidates than `multiple=` takes).
2. **Then act on the answer.** Reachable: a fixture in `suite-actions` beside the task 117/226
   block that renders the forced payment, clicks it, and asserts the picker appears, that the
   button disables itself first (this branch is the only one that does), and that the chosen
   candidate — not whatever the engine finds first — is what leaves. Unreachable: extend the 279
   block's comment to a fourth case naming why, in the same terms as the other three.

Note for whoever runs the probe again: it is throwaway (`web/_coverage.html`, deleted after each
use) and it must be **caller-keyed** to be worth trusting — see task 283 for the shape, and for
which of its "cold" results are artifacts rather than gaps.

---

## 285. A `<lose blessing="?">` effect commits with no picker, so book4/641's printed "(your choice)" takes whichever blessing was acquired first

**DONE** — a fifth player-choice verdict, exactly as the filing scoped it. `needsBlessingChoice`
(`render-rules.js`) reports a `<lose blessing="?">` with two or more blessings held, and
`classifyPassive` routes it to `blessing-choice` **below the fight gate**, beside `forfeit-choice`
and for its reason: a blessing charged through a picker on a branch that may never be taken cannot
be given back. `renderBlessingChoice` (`render-rewards.js`) prints the effect's words through the
shared `appendFxWords`, then stands a `.ability-choice` row of `blessingLabel`-labelled buttons —
so §4.641 reads "− COMBAT / − SCOUTING" and §6.159's permanent reads "− Safety from Storms", the
name the book prints rather than the stored key — and commits `applyEffect(node, state,
{ chooser: () => [b] })` on the click, on the **same `fx@` memo** the plain path uses. Sharing
that key is what makes a state which stops needing a choice fall back through `apply` already
applied, and what stops the loss being voided by the re-render.

The spec is compared **raw** (`getAttribute('blessing') !== '?'`), exactly as `applyLose` compares
it, so the classifier and the engine can never disagree about which nodes are open. The three
forms the filing ruled out stay ruled out, each with a rendered assertion of its own: the `"*"`
sweep, the named spend (task 90's blessing invoked for its protection, 70 nodes), and
`<if blessing="?">` (task 132's test). Fewer than two held still commits on entry, so §1.333's and
§1.377's hazard rows grow no pointless button.

20 new assertions in `suite-actions`, and the suite moves `2756 → 2776`. The filing's table is the
first of them: §4.641 rendered on two blessings held in one order and the other, same answer both
ways, where before it took whichever was acquired first. The permanent case is asserted too —
`removeBlessing` splices `permanentBlessings`, so an unasked forfeit destroyed a Safety from Storms
bought before an ordinary Luck; naming the Luck now keeps it. The census is re-measured over the
bundled corpus per task 270: **3** open forfeits in `1/333 1/377 4/641`, and **0** open
`gain`/`tick` blessing selectors, so no grant path needs the same treatment.

`render-rewards.js`'s task-279 sweep note is extended rather than left stale: there are five
player-choice renderers now, two of which call `appendFxWords`, and the blessing route's own
default is `''` because `blessingLabel("?")` names nothing to print.

**Priority: MEDIUM — task 231's finding on a different currency, and the same call. Live in three
published sections (book1/333, book1/377, book4/641), one of which prints the choice in so many
words. Nothing is over-charged (one blessing leaves either way) and it only bites a player holding
two or more, but which one leaves is decided by acquisition order and the player is never asked.**

*(Filed 2026-08-16 during conversion work on an unpublished book, whose page prints "you choose
which" on the same construct. The evidence below is all in the published books.)*

**The engine is already right; the view never asks.** `applyLose`'s open-blessing branch takes a
chooser and only falls back when it is given none (`engine.js:602-612`):

```js
} else if (b === '?') {
  if (state.data.blessings.length) {
    const pick = opts.chooser ? opts.chooser(state.data.blessings.slice(), 1, 'blessing') : null;
    const chosen = (pick && pick.length) ? pick[0] : state.data.blessings[0];
    if (state.removeBlessing(chosen)) notes.push('lost blessing');
  }
}
```

No caller ever supplies one. `classifyPassive` (`render-rules.js`) offers three player-choice
verdicts — `ability-choice`, `equipment-choice`, `profession-choice` — and a fourth,
`forfeit-choice`, whose test is `needsForfeitChoice` → `losePaymentPlan(...).kind` ∈
`ITEM_FAMILY_TAGS`. **`losePaymentPlan` enumerates `item`/`weapon`/`armour`/`tool`/`cargo`/`ship`
and returns `present: false` for a blessing** (`engine.js:827-861`), so none of the four fires and
the node falls through to `apply`, which commits it with the chooser explicitly nulled — the same
line task 231 quotes:

```js
const note = applyEffect(node, story.state, { chooser: null });
```

`state.data.blessings[0]` is therefore what leaves, and that array is append-ordered by
`addBlessing`, so **the blessing the player has held longest is the one taken**.

Measured on a real `GameState` rendering book4/641 through `Story`:

| blessings held at entry | after the render | pickers drawn |
| --- | --- | --- |
| `["combat","scouting"]` | `["scouting"]` | `.ability-choice=0 .ability-pick=0` |
| `["scouting","combat"]` | `["combat"]` | — |

Same page, same two blessings, opposite outcome — decided by which was acquired first.

The three shipped sections:

- **book4/641** — the rejected offering: "Tambu is displeased!
  `<lose blessing="?">Lose a blessing</lose>` **(your choice)**, if you have one." The printed
  instruction the app ignores, verbatim.
- **book1/333** — a travel-encounter row: "A water sprite curses you —
  `<lose blessing="?">lose a Blessing</lose>`, if you have one".
- **book1/377** — a hazard row: "Bad omen — `<lose blessing="?">lose one Blessing</lose>`".

The last two print no choice, but they are the same tag on the same path, and the engine's own
comment above the branch calls all three "punitive robbery" — so whatever the fix does, it should
do it once for the form rather than once for the sentence.

**One sharper consequence than task 231's.** `removeBlessing` splices the name out of
`permanentBlessings` as well, so a permanent blessing (task 90's "never used up" Safety from
Storms) acquired before an ordinary one is what an unasked `?` forfeit destroys. A player who
bought the permanent early and picked up a Luck later loses the permanent and keeps the Luck,
which is the exact inverse of what anyone would choose.

**The fix is a fifth verdict, not a new picker widget.** `needsAbilityChoice` is the shape to
copy: a `needsBlessingChoice(node)` — a non-hidden, unpriced, unflagged `<lose blessing="?">` with
two or more blessings held — routing to a `blessing-choice` verdict that renders the existing
`story.appendAbilityPicker` row with `blessingLabel` (`render-util.js`) for the button text and
commits `applyEffect(node, state, { chooser: () => [b] })` on click, exactly as
`renderAbilityChoice` does. One held blessing needs no picker and must keep falling through to
`apply`, or a hazard row grows a pointless button.

What must **not** start asking:

- **`<lose blessing="*">`** — "lose all your blessings" is a sweep, and `applyLose` handles it
  through `removeAllBlessings`. There is nothing to choose.
- **A named `<lose blessing="X">`** — task 90's spend, and by far the commonest form (70 nodes):
  the blessing being *invoked* for its protection. It names itself; a picker would be wrong.
- **`<if blessing="?">`** — task 132's *test* ("if you already have a blessing of any sort"), not
  a loss. book5/365 is the only instance and it must stay a condition.

Census for the fixture: `<lose blessing="?">` is **3** nodes in **3** sections corpus-wide, and
there is no open `gain`/`tick` blessing selector at all (`0`), so no grant path needs the same
treatment. The assertion to write is the table above — render book4/641 on a state holding two
blessings in each order and check that the picker appears and that the *named* blessing is the one
that leaves.

**Why neither task 279 nor task 284 could see this.** Both swept the question "which renderers
call the pickers that exist" — `showForfeitPicker` and `showAbilityPicker` — and adjudicated four
gaps as unreachable. A currency with **no picker at all** is invisible to that question: there is
no call site to find cold, and `render-rewards.js`'s sweep note is complete and correct as written.
The census that finds this one runs the other way round — over the *engine's* `opts.chooser` hooks,
asking which of them any view ever supplies.

---

## 286. A `<group>` never asks which ability an open `ability=` spec takes, and its forfeit picker skips a count the page states

**DONE** — `groupForfeitChoice` becomes `groupBundledChoice` (`render-rewards.js`), which answers
"what must this button ask before it commits?" instead of "which forfeit must it ask about?". Two
arms, in that order: an open possession/equipment/cargo `<lose>` whose `losePaymentPlan` reports
`needsChoice` — now including a `multiple=` count that is a **literal integer**, per the new
`fixedForfeitCount` — and, failing that, an open `needsAbilityChoice` node whose
`abilityChoiceOptions` leaves more than one eligible ability. `renderGroup`'s click dispatches to
`showAbilityPicker` or `showForfeitPicker` accordingly; everything else is unchanged, because task
229 had already moved the group's whole body — effects, awards, buys, rests, `<goto>`/`<return>`/
revival — behind a `commit(chooser)` the picker calls, and a second kind of picker calls the same
one.

Exactly **one** question is asked and the forfeit wins where both are present: no corpus group
carries two open selectors, so chaining pickers would be machinery for a shape nobody has authored.
A single eligible ability commits straight through, matching the lone-possession case task 229
already had — `abilityTargets`' own `cands[0]` *is* that option, so a one-button row would decide
nothing. The printed floor ("you cannot choose an ability that already has a value of 1") needed no
code here at all: `abilityChoiceOptions`' `forLoss` filter drops those before the picker sees them,
which is also what makes "more than one eligible" the right test rather than "more than one listed".

`renderGroupWithRoll` is untouched, for task 229's reason unchanged: both var-count groups live
there and neither asks. The two stale comment references to the old helper name are updated, and
`render-rewards.js`'s task-279/284 sweep note gains the one line that keeps its caller census
complete — outside the payment family both pickers have exactly one more caller, and it is
`renderGroup` for both.

17 new assertions in `suite-actions`, and the suite moves `2776 → 2793`. Task 229's `multiple=`
assertion is re-pinned rather than deleted: it now drives a `<set var="x" value="2"/>` outside the
group so the walk writes the count before the group is classified, and asserts the var form is
still engine-chosen — the fixed form is asserted the other way in the new block. The census is
re-measured in the suite over `data.availableBooks()` (per task 270) and pinned at **0** groups with
a fixed-count open forfeit and **0** with an open ability selector, so a section arriving in either
list lands here and wants measuring.

**Priority: LOW — latent on both arms. Censused over the bundled corpus: no group in the six
published books carries an open ability selector, and none carries a fixed-count open forfeit. Like
task 228 this is a shape the renderer cannot serve rather than a page it serves wrongly, and it is
filed so it is closed before something authors it rather than after.**

*(Filed 2026-08-16 during conversion work on an unpublished book, one of whose pages prices an
opt-in rite at an ability point the player chooses and bundles two further consequences onto the
same click, and another of which prices an offer at two possessions of the player's choosing. The
evidence below is all in the published books.)*

**One control, and more than one chooser hook under it.** `renderGroup` (`render-rewards.js`)
collapses a `<group>` to a single button and applies the whole body on the click:

```js
plan.effects.forEach((fx) => applyEffect(fx, story.state, chooser && fx === forfeit.node ? { chooser } : {}));
```

Task 229 gave that click **one** picker — `groupForfeitChoice`, an open `"?"`/blank
possession/equipment/cargo `<lose>` with a candidate to spare. Every other effect in the bundle is
still applied with `{}`, and `applyEffect` reaches more than one place that would have taken an
answer. Two of them matter, and this is the run of task 285's census (the *engine's* hooks, not the
view's call sites) over the one control that was never on it.

**(a) The ability hook has no group picker at all.** `abilityTargets` (`engine.js:132`) takes
`opts.chooser` for a `"?"`/`"a|b"` spec and falls back when it gets none:

```js
const picked = opts.chooser ? opts.chooser(cands, 1, 'ability') : null;
const chosen = (picked && picked.length) ? picked[0] : cands[0];
```

`cands` is `abilityChoiceOptions`, which is `ABILITIES` order — `charisma` first — minus anything
already at 1 on a loss. So a bundled `<lose ability="?">` takes **CHARISMA** from almost every
character, and the player is never asked. `classifyPassive`'s `ability-choice` verdict cannot save
it: `renderGroup` consumes the node as one of `plan.effects` and it never reaches the classifier at
all — structurally the same reason task 284 gave for `renderPayment`'s branch being unreachable on
§6.496.

**(b) The forfeit hook skips a count the page states, on evidence about a count it does not.**
`groupForfeitChoice` reads:

```js
if (fx.tagName.toLowerCase() !== 'lose' || fx.hasAttribute('multiple')) continue;
```

Task 229 argued that exclusion from §3.273/§3.629 — `<random dice="1" var="x"/>` bundled with
`<lose item="?" multiple="x"/>`, "lose **the first** 1-6 of your possessions". That argument is
sound and still is: the page names no choice, and a **var** count cannot be asked about coherently
(a roll of 1 would ask and a roll of 6 would not). But it was written as `hasAttribute('multiple')`,
which also silences a count the page prints as a constant — and that is the *opposite* case, task
228's priced offer, where the number is the author's and the items are the player's. Task 228 built
the count-aware picker for exactly it; the group is the one path that then refused to call it.
The two var groups both live in `renderGroupWithRoll`, which asks nothing at all, so that path needs
no change now for the same reason it needed none then.

**The census, over the bundled corpus (per task 270).** Both arms are inert for the published
edition, and the near-misses are worth recording because each looks like a hit:

- **`<lose multiple=>` inside a group: 4 nodes.** book3/273 and book3/629 are the `multiple="x"`
  rolled sweeps above. book6/191 carries **two** with a literal `multiple="12"` — but on *named*
  items (`item="dead head"`, `item="ghoul's head"`), so `losePaymentPlan`'s `openForm` is false and
  `needsChoice` was already false whatever this task does. **0** fixed-count *open* forfeits.
- **`ability=` inside a group: 36 nodes across 24 sections, all named.** book3/165 and book6/664
  bundle five apiece. The only *open* spec inside any group is book6/741's
  `<difficulty ability="combat|sanctity" level="16"/>` — a roll's ability alternation, not an
  effect, and `needsAbilityChoice` admits only `<lose>`/`<gain>`/`<tick>`, so it is out by
  construction rather than by luck.
- The corpus's one open `<lose ability="?">` is **book2/157**, and it is not in a group: it carries
  `flag=`, so `openAbilityNode` routes it and task 224's picker already asks.

**The fix is two reads of state that already exists, not a new widget.** `losePaymentPlan` already
reports `count` and `needsChoice` for a `multiple=` forfeit (task 228) and `showForfeitPicker`
already collects `count` answers; `showAbilityPicker` already exists and already commits
`applyEffect(node, state, { chooser: () => [ab] })`. So: narrow the `multiple=` skip to a count that
is **not** a literal integer, and give the group a second arm that finds an open
`needsAbilityChoice` node with more than one eligible option and opens the ability picker instead.
Ask **one** question — no corpus group carries two open selectors, so chaining pickers would be
machinery for a shape nobody has authored — and let a single eligible ability commit straight
through, because `cands[0]` *is* that option and a one-button row decides nothing.

`suite-actions` beside the task 226/228/229 block, and one edit inside it: task 229's own
`multiple=` assertion is written with a fixed `multiple="2"`, which reads its rule off the wrong
half of its evidence, and must be re-pinned to the var form it was actually arguing for.

---

## 287. The Rules dialog opens scrolled to its last line, and a dialog long enough to scroll has no exit in view

**DONE** — two one-line causes in `ui.js`, both in the shared dialog shell, and both only visible
on a dialog long enough to scroll. Reported from the title screen: **Rules** opens showing the end
of the rules, and there is nothing at the top to close it.

**The scroll.** `.modal` is its own scroll container (`max-height: 88vh; overflow-y: auto`), and
`mountDialog` ends with `(initialFocus || box).focus()`. For `modal()` that target is the primary
button — or, failing one, the first button in `.modal-buttons`, which is the LAST thing in the box.
The browser then does exactly what focus asks and scrolls it into view, so every dialog taller than
the viewport mounted at its bottom. `focus({ preventScroll: true })` moves focus without the scroll,
and a freshly built box is already at `scrollTop` 0. The a11y contract is untouched: focus still
lands where it did, and the Rules dialog's own Close button is still the first Tab stop after the ✕.

**The exit.** `modal()` put the title in a bare `<h2>` and every control in the bottom bar, so on a
long body the only ways out were Escape, a backdrop click, and a button below the fold — two of them
undiscoverable and the third off-screen. The title now sits in a `.modal-head` row that also carries
a labelled `.modal-close` ✕ **whenever the dialog is dismissable**, i.e. exactly when Escape and the
backdrop already close it: the ✕ adds no new way out, it makes the existing one visible. A
non-dismissable dialog (the death screen, `dismissable: false`) keeps the title alone — there the
buttons ARE the exit, and a ✕ would offer a way past a choice that has to be made.

**The CSS holds one trap worth keeping.** `.modal-head` is `position: sticky` so the ✕ survives
scrolling, and negative margins pull the row out to the box's padding edges. `top: 0` then rests it
**1.3rem too low** — a sticky offset positions the *margin* box, and this row's top margin is
negative — leaving a gap at the top of the dialog that scrolled text slid up into. The offset is
`top: -1.3rem`, cancelling `.modal`'s `padding-top`; the test pins both numbers together, because
they are only correct as a pair.

6 new assertions in `suite-render`, and the suite moves `2793 → 2799`. The scroll one is the load-
bearing one and it is written to be able to fail: the test page loads no stylesheet, so it mounts
its own inline-styled scroll container (80px tall, 600px of content, the focus target at the bottom)
through `mountDialog` and asserts `scrollTop === 0`. Reverting `preventScroll` reports it as
`scrollTop=541`. Task 177's two focus-trap assertions are updated rather than deleted: the wrap
targets move to the ✕, which is now the box's first focusable, while initial focus stays on the
primary button. Both states were also confirmed in a real browser against the real stylesheet — the
dialog at the top on open, and the header still pinned with the ✕ reachable after scrolling.

**Priority: MEDIUM — user-reported, on the title screen, on the one dialog every new player is
told to read. Nothing is lost or mis-computed, and Escape always worked, but a reader who does not
know that meets the rules from the wrong end with no visible way back out.**

*(Filed and closed 2026-08-17 in one pass, from a user report rather than an audit.)*

---

## 288. Task 191's narrow-header block measures an iframe whose stylesheet may not have applied, and fails intermittently

**DONE** — a defect in a test, not in the app. Task 191's block in `suite-economy.js` builds each header strip in an iframe of a given
CSS width, links the real `web/css/style.css` into it, waits for the frame's `load` event, and then
measures. Observed once in a run that had changed nothing outside `books/`:

```
FAIL task191: at 360px exactly More / narration / Save / Sheet remain :: ☰ ↩️ 📖 🗺 🌙 🔊 🔁 1× 💾 📜
FAIL task191: at 360px the remaining touch targets are at least 44px :: min side=21
```

An identical re-run of the same command against the same tree passed. **Both values are the
signature of a frame measured before `style.css` applied**, not of a stylesheet rule being wrong:
all ten controls visible is the DOM with no `@media (max-width: 600px)` narrow-chrome rules, and
`min side=21` is an unstyled `<button>`'s default height. The 320px call immediately before it, and
the 601px/900px calls after, were fine in the same run — so it is per-frame, not per-run.

**Two of the block's four assertions at that width pass VACUOUSLY in exactly that state, which is
why the failure reads like a real regression.** With no stylesheet applied, `.header-actions` is a
plain block, its buttons wrap in normal flow and nothing overflows, so "does not overflow" passes;
and no control is hidden, so `hiddenAllNone` is `[].every(…)` — true. The companion assertion also
confirms `r.vw === 360`, so the iframe width is not what moved. Only the two assertions that
actually depend on the stylesheet fail, and they fail with values a reader has to know the fix's CSS
to recognise.

**The seam is `await new Promise((res) => frame.addEventListener('load', res, {once: true}))`.** The
frame's `load` is the block's only barrier, and it does not guarantee that a linked stylesheet was
fetched *and applied* — a subresource that errors or is aborted still lets the event fire, and the
suite issues these seven frame loads back-to-back alongside the rest of its fetching. Nothing here
is a defect in the app or in the stylesheet: it is a test that measures rendered geometry across an
unsynchronised subresource boundary.

**Fixed by taking the subresource out of the frame.** `css/style.css` is fetched **once** at the
top of the block and inlined into each `srcdoc` as a `<style>` element, so the document the `load`
event announces is already styled and there is nothing left to race. The seven frames now issue
zero subresource requests between them. That keeps what the block is for — the assertions still
run against the real shipped stylesheet, fetched from the served tree rather than copied into the
suite — while making the barrier exact. (The weaker alternative, spinning on a sentinel computed
style before measuring, trades a silent flake for a timeout and was not taken.)

**Inlining is only safe because this stylesheet has no relative references.** A `<style>` element's
`url()` and `@import` resolve against the *document's* base URL, not the stylesheet's, and a srcdoc
frame inherits its parent's base — so a `url(../assets/…)` that resolved correctly through the
`<link>` would silently 404 once inlined. `style.css` contains no `url(`, no `@import` and no
`</style>`, checked before the change; a future rule that adds one has to be weighed against this
block.

The seventh assertion added to the block is the guard the old form did not have: the fetched text
must contain both `@media (max-width: 600px)` and `.icon-btn.in-menu { display: none; }`. A fetch
that quietly returned a 404 body would otherwise reproduce the exact unstyled state this task is
about, and `await (await fetch(…)).text()` does not throw on one. The suite moves `2799 → 2800`.

**Priority: LOW — no player-visible behaviour is involved and the run fails loudly rather than
falsely passing.** What it cost was a wasted run plus the reading time to work out that the failure
named a suite the change could not have touched.

*(Filed 2026-08-17 during conversion work on an unpublished book, from a run whose only change was
section XML. Closed 2026-08-17.)*

---

## 289. `<lose staminato="N">` can only ever lower Stamina, so book1/297's padded tournament never heals its winner and kills its loser at book1/370

`applyEffect`'s `staminato` branch computes the wound as `Math.max(0, state.data.stamina - target)`
and hands it to `damageStamina` (`engine.js:591`, `:596`), so a target **above** the current score
resolves to a wound of 0 and the score does not move. `JaFL-XML-Tags.md:416` documents the attribute
as "The value to **set** the current stamina to. This may be a number or a variable name. **This may
actually restore stamina, if it is currently lower than the value given.**" The restoring half has
never been implemented, and the comment above the branch shows why nobody noticed — it describes the
attribute as "beaten down TO N Stamina", which is what 15 of the corpus's 17 nodes do.

**The other two are book1/297, and they are the whole point of the page.** The Dragon Knights'
tournament sets `<set var="prestamina" value="stamina"/>` above the fight, prints "Because it is not
a duel to the death, your weapons are padded, so any Stamina you lose is not permanent - it is
recovered after the fight", and then puts `<lose staminato="prestamina"/>` inside **each** of the two
`<group>`s that leave the page — the `<if dead="f">` win group to 19 and the `<else>` group to 370.
Those are the only `staminato` nodes in the corpus whose target can exceed the current score (the
other 15 are `staminato="1"` ×14 and `staminato="3"` ×1), so this is the one shipped page the missing
direction reaches, and it reaches it on both of its exits.

Measured against a real `GameState` (a scratch page under `web/`, deleted after):

* wounded to 3 of 12 with `prestamina` = 12, `<lose staminato="prestamina"/>` leaves **3**;
* at **0** Stamina it leaves 0, and `isDead()` reads true;
* controls, so the finding is this branch's arithmetic and nothing else: `staminato="1"` from 9 beats
  the score down to **1** correctly, and `healStamina(9)` from 3 reaches **12**;
* end to end on §1.297 — the page saves `prestamina` correctly, the win group renders, and clicking
  it leaves the wound in place.

**The loser's case is a spurious character death, and the engine's own machinery for avoiding one is
what makes it reachable.** §1.297's `<else>` prints "If you are reduced to 0 Stamina, you pass out,
turn to **370**", which is exactly the non-death "if you lose…" branch `hasLosePath` exists for
(`render.js:914`), so the death is deferred correctly and the player really does get the →370 button.
§1.370 then opens "You come round, back to your Stamina score before the fight started" — and
because the restore was a no-op the sheet still reads 0, so `render.js:916` fires `onDeath` on
arrival. Measured: entering §1.370 on 0 Stamina fires `onDeath` exactly once while that sentence is
on the page; the control at a restored score fires none. So a tournament the book says is not to the
death ends the character, or spends a resurrection deal, at the very section that says it does not —
and the win branch quietly keeps a wound the same paragraph promises is temporary.

**Fix:** honour the documented semantics. `staminato` *sets* the score, so the branch has to move it
in either direction — compute the signed delta against the target and heal when it is positive
(`healStamina` already clamps at `effectiveStaminaMax()`, which is the right ceiling for a restore
that may be read while an aura or a Stamina-cutting affliction is in play). Keep the lowering path
byte-identical for the 15 nodes that use it, and keep the note text honest in both directions rather
than always printing `−N Stamina`.

**Tests:** both directions of the tag as unit assertions in `suite-engine.js` beside the existing
task-71 one (`staminato` down from a healthy score, up from a wound, up from 0, and a no-op when the
score already equals the target), plus one over the real §1.297/§1.370 pair — wound, take the win
group, assert the score is back; and enter §1.370 on the restored score and assert no death. The
second is what makes the regression un-writable again: the unit assertion alone passed for a year
because it only ever tested the direction the corpus mostly uses.

**Priority: HIGH — a silent, unavoidable character death on a shipped page**, with no diagnostic
of any kind: the player reads "you pass out" and "You come round", and the app kills them. The
winner's case is milder but is the same one line.

*(Filed 2026-08-18 during conversion work on an unpublished book, from a census of what `<lose>`
carries besides `stamina=`.)*

---

## 290. book5/315's `<if var="exp">` reads a variable no node in the section ever writes, so the training courtyard's crippling injury can never fire — task 278's twin from the reader's side

**Priority: HIGH — the player escapes a printed penalty entirely, which is the line task 278 drew
between HIGH and MEDIUM.** It is one section and the stake is 2 maximum Stamina, so a reader
weighting blast radius could argue MEDIUM; the rubric weights correctness.

*(Filed 2026-08-23 during conversion work on an unpublished book, from a census of every `var=`
reference against the writers in its own section.)*

`books/book5/315.xml` in full:

```xml
<p>
    <training ability="combat">Roll two dice</training>.
    If the roll exceeds your current COMBAT score, increase it by 1.
    <if var="exp" lessthan="0">
        If the roll is less than your current COMBAT, however, then you take a
        <lose ability="stamina" amount="2">crippling injury</lose>
        that permanently reduces your Stamina by 2 points.</if>
</p>
```

Nothing in the section writes `exp`. The `<training>` carries no `var=` at all, so
`renderTraining`'s `writeRollVar` (task 278's fix) has no attribute to write, and
`evaluateCondition` resolves the guard through `state.getVar('exp')` → `0`. `0 < 0` is false, so
the branch is suppressed on every render: the printed sentence never appears and the 2-point
maximum-Stamina loss never applies. Same failure mode as 278 — silent, no warning, no throw.

**Two things are wrong, not one, and fixing only the obvious half leaves the branch just as
dead.** Adding `var="exp"` to the `<training>` makes the var live, but `rollTraining` writes
`res.total` — the raw 2-dice sum, as 278's filing says in as many words ("do not copy the margin
line") — which is never negative, so `lessthan="0"` still never matches. The comparator has to
name the score the page names.

**`lessthan="combat"` is not it either, and the reason is the one asymmetry the format has here.**
`resolveValue` is *variable-first* (`engine.js:105`), so a bare `combat` in a comparator reads the
variable `combat` and gets 0; only the `<set value=>` side is keyword-first (`evalExpression`).
So the score has to be snapshotted into a var first:

```xml
<set var="pre" value="combat" modifier="natural" hidden="t"/>
<training ability="combat" var="exp">Roll two dice</training>.
…
<if var="exp" lessthan="pre">
```

`modifier="natural"` because `rollTraining` already judges success against the *natural* score
(`engine.js:1719`'s own comment), so the penalty must be judged against the same one or the two
halves of the printed sentence disagree for anyone wearing a COMBAT-boosting item.

**The re-render hazard that bit task 289 is present here and is harmless, which is worth writing
down so the implementer does not design around it.** An absolute `<set value=>` is `rerunnable`
(task 61), so after a successful roll `pre` re-reads a COMBAT that the training just raised. That
cannot produce a false positive: a success means `exp > pre_old`, i.e. `exp >= pre_old + 1 = pre_new`,
so `exp < pre_new` is false either way. On a failure the score is unchanged and the test is exactly
the printed one. Assert both directions rather than reasoning about it a second time.

**Why the task-278 pass could not see this.** That census asked the writer-side question — "how
many `<training>` nodes carry a `var=`" — and answered 1 of 62. The reader-side question is a
different set, and it is the one that finds a var with no writer at all. Over the shipped corpus
it returns exactly one file:

```python
import re, glob
R = re.compile(r'<(random|difficulty|rankcheck|training|set)\b[^>]*\bvar="([^"]+)"')
T = re.compile(r'<(if|elseif|while|outcomes|outcome|success|failure)\b[^>]*\bvar="([^"]+)"')
for f in sorted(glob.glob('books/book[1-6]/[0-9]*.xml')):
    s = open(f, encoding='utf-8').read()
    w = {m.group(2) for m in R.finditer(s)}
    for m in T.finditer(s):
        if m.group(2) not in w:
            print(f, m.group(2))
```

`books/book5/315.xml exp`, and nothing else. Vars are section-local — `Story.begin` calls
`clearVars()` (`render.js`) — so "written in this section" is the whole of the question and the
predicate needs no cross-file pass.

Assertions: a unit case in `suite-render.js` driving §5.315 with a forced seed — a roll under the
natural COMBAT applies the 2-point maximum-Stamina loss and prints its words, a roll over it
raises COMBAT and applies neither — and a corpus census in `suite-corpus.js` pinning the predicate
above at **0** files, so a future section cannot reintroduce a read of a var nothing writes. The
census is the part that generalises, and one caveat comes with widening it: a version that also
scans the *expression* attributes (`value=`, `amount=`, `bonus=`, `level=`, `equals=`, …) for bare
identifiers must exclude `modifier=`, whose keyword values (`natural`/`affected`/`noweapon`) are
not variables — they account for **38** hits across books 2, 3, 5 and 6, and read as the whole
finding if they are not filtered out.

---

## 291. book2/270 and book2/362 hand out the god Nagil on entry, because a `lessthan=` guard over a roll var not yet filled matches at 0

**Priority: HIGH — a permanent religious allegiance, awarded with no roll at all**, on two pages
whose whole point is a trial you can fail. Both books branch on the God box afterwards.

*(Filed 2026-08-23 while implementing task 290, from the census that fix's own pre-roll assertion
forced into existence. Split from a wider filing — see 292 and 293 — once each of the four hits
turned out to want a different answer.)*

`render-rules.js`'s `effectPendingVars` comment states the design in as many words:

> A *condition* deliberately does NOT consult the unfilled set — an unwritten var reads as 0 and
> its branch simply doesn't match, which is the long-standing behaviour — whereas an effect that
> applies against 0 memoises its own award away. (task 181)

"An unwritten var reads as 0 and its branch simply doesn't match" is true of `equals=` (§2.554's
`equals="2"`) and of a bare `var=` (which tests `!= 0`). It is **false of `lessthan=`**, where 0 is
the smallest value there is and matches every positive bar. So a `<random|difficulty|rankcheck|
training var="V">` with an `<if var="V" lessthan="N">` beneath it has that branch open on entry,
effects and exits included. Task 290's §5.315 was one; the census over the shipped 4,369 — roll
writers, readers whose comparator matches at `V == 0`, minus the sections carrying a `<set var="V">`
sentinel — returns four more, each driven in a real `Story` to see what the open branch does.

**These two.** §2.270 and §2.362 are the same Nagil trial, `<random dice="1" var="x">roll under your
Rank on one die</random>` under `<if var="x" lessthan="rank">`, and the branch holds
`<tick god="Nagil">`. Driven on entry, before the roll: `gods=["Nagil"]`. `pendingRollVar` cannot
help — it inspects only the effect's own **magnitude** attributes (`EFFECT_MAGNITUDE_ATTRS`), and
`<tick god="Nagil">` names no var at all, so the guard's verdict is the whole of what admits it.

**The fix is the corpus's own idiom, and the engine alternative was measured and rejected.**
§6.628 puts `<set var="y" value="7"/>` above its `<random var="y">`, out of range of the
`lessthan="6"` beneath, precisely so an unrolled 0 cannot match; task 290 did the same for §5.315
with `<set var="exp" value="pre"/>`. Here it is `<set var="x" value="rank" modifier="natural"/>` —
`x == rank` pre-roll, so `x < rank` is false by construction for any Rank, and `rollOwned`
(task 61) freezes it the moment the roll takes the var. The engine alternative — let a condition
consult `unsettledVars` so an `<if var="V">` over an unfilled roll var defers like an effect —
was censused rather than argued:

- **138** readers over a roll var across **112** sections would change how they resolve pre-roll.
- **8** of those sit in an if/else chain with an `else`/`elseif`, whose `<else>` activates pre-roll
  today and would be held instead (a pending condition holds the WHOLE chain, `render.js`).
- **21** readers have every writer of their var inside a conditional they are outside of, so a
  branch never taken would leave them pending **forever**. All but one are `<success>`/`<failure>`
  or `<outcome>`, which already gate on the var being written this visit (`branchResolved`); the
  exception is book3/149's `<if x>`.

That is a deliberate task-181 decision reversed for a wide blast radius, against a two-line markup
change for the two sections that actually lose something. Take the markup.

Assertions: both sections driven on entry (no god, and the guard grayed) and in both roll directions
with a forced seed (a die under Rank writes Nagil, a die at or above it does not), plus the census
above pinned in `suite-corpus.js` at exactly the sections 292 and 293 own, so it moves when either
bucket does and a fifth such section lands here. Task 290's §5.315 block is the shape to copy: it
asserts the pre-roll state *and* both post-roll directions, and the pre-roll one is what found this.

---

## 292. book4/257 puts its "both rolls failed" exit on the page before either roll is made, because no roll-gate seed reads a condition

**Priority: HIGH — a live, clickable route past two mandatory checks**, and it is the route that
costs the player nothing to take.

*(Filed 2026-08-23, split out of 291's census: the same `lessthan=`-matches-0 trigger, but the only
one of the four where no sentinel can fix it.)*

§4.257 makes two Difficulty-14 rolls (`var="s"`, `var="m"`) and routes on the pair:

```xml
<if var="m" greaterthan="0"><if var="s" greaterthan="0">If both rolls were successful, <goto section="216"/>.</if></if>
<elseif var="m" lessthan="1"><if var="s" lessthan="1">If both rolls failed, <goto section="374"/>.</if></elseif>
<else>If one roll was successful, <goto section="413"/>.</else>
```

Driven on entry: `216[OFF] 374[ON] 413[OFF]`. Both margins read 0, so `greaterthan="0"` is false and
`lessthan="1"` is true — the both-failed arm matches and its →374 is live. The other two are off
only because they sit in unmatched branches, not because anything gates them.

**A sentinel cannot fix this one, which is what separates it from 291.** A `<difficulty>` var holds
the margin, where 0 *means* failure — there is no out-of-range "not yet rolled" value. And whatever
the sentinel makes true, some arm of an if/elseif/else chain always matches, so some exit is always
live. (A pair chosen to exploit the chain — `m=1`, `s=0`, so the outer `if` matches and its inner
one does not, closing all three — works, and is an incantation no reviewer could read.)

**The real gap is in the roll gate, and it is the next member of a family already twice extended.**
`computeRollGate` (`render-gates.js`) seeds from three questions about what a mandatory roll's
result FEEDS: an outcome table (`tableRoll`), a sheet effect's magnitude (`owedRoll`, task 247, 36
sections), or a `<success>`/`<failure>` branch (`branchedRoll`, task 249). §4.257 has no table, no
effect at all, and uses `<if var=>` rather than `<success>` — so all three miss and **none** of its
gotos is gated. The missing seed is the mandatory roll whose result a **condition** reads: the same
`provisionalVarClosure` trace the other two use, applied to `if`/`elseif`/`while` `var=` and the
comparator attributes.

Measure the blast radius the way task 247 did (it reported "36 shipped sections gain the gate,
measured") before committing: 138 readers over a roll var across 112 sections is the outer bound,
but most of those sections are already gated by one of the three existing seeds, and a seed that
holds navigation the player currently reaches is a regression in the other direction.

Assertions: §4.257 driven on entry — all three exits gated — then each pair of roll outcomes routed
to the right one; the count of sections that gain the gate, pinned; and 291's census, which this
takes one hit closer to zero.

---

## 293. book3/40 shows its editorial reroll note before the roll it describes, and the obvious sentinel would open a live exit

**Priority: LOW — prose and an inert button**, on the only one of 291's four hits that costs the
player nothing. It is filed because the fix that works for the other three is *actively unsafe*
here, and that is worth writing down before someone applies it.

*(Filed 2026-08-23, split out of 291's census.)*

§3/40's `<random type="travel" var="x"/>` feeds an `<outcomes>` table, and above it sits
`<if var="x" lessthan="5">` wrapping an editor's note — "[*If you roll 2-4 and lack book 9,*
`<reroll>`*roll again*`</reroll>` *--Ed*]". Pre-roll `x` reads 0, so the note shows and its button is
armed before the roll it would reroll. The button is inert (`blessingSpendForReroll` finds no storm
blessing to charge, and there is no stored roll to delete) and the table's own exits are gated by
`tableRoll`, so nothing is lost — it is a sentence in the wrong place.

**The sentinel that fixes 291 breaks this section, and it was measured, not assumed.** An applied
`<set>` adds its var to `ctx.wroteVars` (`render-rewards.js`), and `branchResolved`
(`render-rules.js`) reveals an `<outcome>` row as soon as its var is written this visit. So
`<set var="x" value="5"/>` above the roll marks `x` written, the `range="5-8"` row resolves, and the
section renders **`Continue → 59[ON]`** — "A peaceful voyage", live and clickable, before the dice.
Verified by driving it: the sentinel grays the reroll button (`roll again[OFF]`) and opens a route,
trading a cosmetic defect for a real one. **Any sentinel on a var an `<outcomes>` table reads does
this**, which is the general rule to carry out of here; §5.315 and §6.628 are safe only because
neither has a table.

So this one needs a different answer, and the choice is the task: gate the reroll control on its
roll having happened, drop the `lessthan="5"` and let the note stand unconditionally (its own words
already say "if you roll 2-4", so it reads correctly either way), or leave it and pin it as known.
Whichever, 291's census must stop naming it.

---

## 294. book4/257 leaves a mixed pair of rolls with no exit at all, so succeeding one check and failing the other ends the adventure

**Priority: HIGH — the page offers nothing and the renderer draws "Your tale ends here"**, on two
of the four outcomes of a mandatory pair of rolls.

*(Filed 2026-08-23 while implementing task 292, from driving all four pairs of that section's roll
outcomes rather than only the two the filing named.)*

The chain §4.257 routes on branches its OUTER arms on `m` alone:

```xml
<if var="m" greaterthan="0"><if var="s" greaterthan="0">If both rolls were successful, <goto section="216"/>.</if></if>
<elseif var="m" lessthan="1"><if var="s" lessthan="1">If both rolls failed, <goto section="374"/>.</if></elseif>
<else>If one roll was successful, <goto section="413"/>.</else>
```

`m > 0` and `m < 1` between them cover every value, so the `<else>` is **unreachable** and §413 —
the destination the section's own comment says it was written for ("last paragraph is my own
invention, to handle outcomes of two difficulty rolls") — can never be reached. A mixed pair lands
in whichever outer arm `m` selects and then fails that arm's inner `<if>`, so the paragraph prints
nothing: measured, with SCOUTING passing and MAGIC failing, the page renders
`216[OFF] 374[OFF] 413[OFF]` and the renderer's no-way-forward fallback appears
(`FATE[ON]` — "Your tale ends here — accept your fate"). Both mixed directions do this; the two
matched pairs route correctly. Task 292's gate is what makes this visible rather than harmless: the
exits are now held until both dice are thrown, so a player who reaches the mixed case has nothing
left to click, where before they could have taken the wrongly-live →374.

The fix is a chain whose arms are mutually exclusive *and* exhaustive, without re-splitting or
duplicating the three printed sentences — each belongs to exactly one arm, and markup wraps the
author's text rather than rewriting it (AGENTS.md). **What is available was checked, and it rules
out the two obvious answers:**

* A conjunction cannot be written on one tag. `evaluateCondition` (engine.js) OR-accumulates every
  recognised attribute (`result = result || cond()`), and there is one `var=` per tag, so
  `<if var="s" greaterthan="0" …>` can never mean "and `m` too".
* Nesting the pair the other way round (`s` outside, `m` inside, an `<else>` in each arm) is
  exhaustive, but it puts the "if one roll was successful" sentence in **both** arms — the printed
  text twice, which the markup rule forbids.

That leaves a derived flag per roll, tested by a chain over one var, and the arithmetic is
narrower than it looks: `evalExpression` is `+ - * /` with parens and *truncating* integer division
(no `min`/`max`, no comparison operators), so "did this margin succeed" has to be expressed as
something like `(s+999)/1000` — 1 for a margin of 1 or more, 0 for 0 or less. That reads as an
incantation, which is the objection task 291's notes raised against exactly this kind of trick, so
weigh it against the alternative: give the engine a readable way to say it (a `<set>` that captures
a roll's own success, which `rollDifficulty` already computes as `res.success` and throws away).
Whichever, the three sentences must each stay in one place, and §413 must become reachable.

Assertions: the two mixed pairs route to §413, both matched pairs still route where task 292 pinned
them (that block's last two assertions invert from "reaches no exit" to `413[ON]`), and a census of
the corpus for the same shape — an if/elseif chain whose outer comparators are exhaustive over one
var with an inner `<if>` inside each arm — so a second section written this way is found rather than
waited for.

---

## 295. `renderItemCache` draws no money controls without `max=`, so book4/586 confiscates the player's whole purse and book4/528 can never give it back

**Priority: HIGH — an unrecoverable loss of every Shard the player is carrying**, on a section
whose own next page says "You can reclaim your gear."

*(Filed 2026-08-24 from a census of the cache family run in one direction nothing had run it in:
every printed money loss *from* a cache against every route by which money can *reach* one.)*

`renderItemCache` parses `max=` exactly as the spec asks — absent is −1, "no limit"
(`render-market.js:598`) — and then gates the widget on `if (moneyMax > 0)`, so a bare
`<itemcache>` renders no Shards balance, no Deposit and no Withdraw. `renderMoneyCache` gates the
same value with `if (max >= 0)` and therefore honours the −1. **The parse is right in both
widgets and only one of them acts on it.**

Task 131 asked for the other reading in as many words — "parse `max` with 0 = barred / absent =
unlimited **in both cache widgets**" — quoting JaFL `CacheNode`, which "uses −1 as its no-limit
default and renders a Shards field on item caches". The code comment records the deviation as a
decision ("Absent `max=` ⇒ item-only (the town-house caches)"), which is why it has survived: it
reads as settled rather than as unfinished.

**What it costs, measured.** §4.586 is the confiscation task 256 was filed for. Its
`<transfer to="4.586" item="*" xitem="*key*" shards="*">` moves the purse as well as the gear, and
§4.528 — the matching unlock, reusing the same cache key — hands back only what the item widget
can reach. Driven on a real `GameState` (Warrior, 500 Shards, a sword and a pyramid key):

```
§4.586 moves the whole purse into cache 4.586 :: purse=0 cache=500
§4.586 renders NO money control on the sealed box (bare <itemcache>) :: n=0
§4.528 unlocks cache 4.586, and holds the confiscated 500 Shards
§4.528 renders NO money control either :: n=0
§4.528 after clicking every live control the purse is still empty :: purse=0 cache=500
control: §6.512 (max="5000") DOES draw Deposit/Withdraw :: n=2
```

The control matters: the money half of the widget works, it is simply withheld. So the 500 Shards
are on no sheet and in no reachable box — they leave the game.

**And the same gate makes 16 printed sentences unable to fire.** A cache's money can only be
non-zero if something puts it there: a `<moneycache>` of the same name, an `<itemcache max="N">`, a
`<transfer to=>` carrying `shards=`, an `<adjustmoney name=>`, or a `<tick|gain shards= cache=>`.
Censused over the `^\d+[a-z]?$` sections of books 1–6, **16 word-carrying
`<lose shards=… cache=X>` nodes name a cache with none of those**:

| section | cache | printed words that can never apply |
| --- | --- | --- |
| book1/177 | 1.177 | "Any money left here has gone" |
| book1/273, book1/300 | 1.300 | "cross off anything you had stored there", "has gone" |
| book1/434 (×2) | 1.434 | "All the money you left here has gone", "Lose all possessions you left here" |
| book2/171 | 2.171 | "gone" |
| book2/211 | 2.211 | "all the money you left here has gone" |
| book2/278 | 2.278 | "gone" |
| book2/348 | 2.348 | "all the money" |
| book2/641, book2/665 | 2.617 | "Cross them off", "The money has gone" |
| book3/74 | 3.74 | "taken any money" |
| book4/509 | 4.509 | "Lose everything you left here" |
| book6/284 | 6.284 | "all the money" |
| book6/414 | 6.414 | "all the money" |
| book6/576 | 6.576 | "cross off any money and possessions" |

Every one of them is a break-in roll on a town house whose own paragraph offers the storage, and
the family is wider than the losses: **28 of the 30 sections in books 1–6 that carry a bare
`<itemcache>` mention money or Shards** — book1/177, book1/300, book1/327, book1/434, book2/171,
book2/211, book2/278, book2/348, book2/617, book2/661, book2/665, book3/74, book3/335, book3/607,
book4/450, book4/468, book4/509, book4/586, book5/245, book5/560, book5/586, book5/624, book6/238,
book6/284, book6/414, book6/453, book6/464, book6/576 — against **2 that mention neither**
(book4/528, book6/276). So the printed offer — "You can leave possessions and money here to save
having to carry them around with you" — is half implemented in 28 places, and the *risk* the book
attaches to using it never arrives. Measured on three of them: §1.177, §2.211 and §6.414 each draw
no way to store money and hold a stash of 0 with 400 Shards in the purse.

**The obvious fix reopens task 256 on the money side, and that was measured too.** `applyCacheLock`
disables `[data-cachelock]` elements (`render.js:2040`), which is what `renderItemCache` stamps on
its Take and Store buttons and *not* on its money buttons — deliberately, per the comment above it
("an `<itemcache max=>`'s Shard controls are deliberately left alone … that bank is the same
thing"), which is sound for §6.512's cabinet and not for a confiscation. Driven on a fixture section
that locks a cache and gives it `max=`:

```
seal probe: the Take/Store buttons ARE sealed :: n=3
seal probe: the money Withdraw is NOT sealed :: disabled=false
seal probe: a click on it empties the sealed stash into the purse :: purse=500 stash=0
```

So today's `moneyMax > 0` is the only thing keeping §4.586 from being undone by a Withdraw the
moment the controls appear.

The fix is therefore two changes and a decision:

* Gate the controls on `moneyMax !== 0` and apply the deposit cap only when `moneyMax > 0`
  (`amt = Math.min(amt, moneyMax - cacheMoney)` computes a negative ceiling at −1 and would bar
  every deposit — copy `renderMoneyCache`'s `if (max >= 0)`).
* Extend the seal to an item cache's money controls, or §4.586's confiscation is clickable straight
  back. Task 38's "a plain stash lock leaves a bank editable" is about a `<moneycache>`, which no
  confiscation uses; an `<itemcache>` whose items are sealed has no case for leaving its money loose.
* Decide whether the two sections that mention no money (book4/528, book6/276) should carry an
  explicit `max="0"`. Both are retrieval/storage pages where a Shards field is merely odd, so this
  is taste, not correctness — but `max="0"` is the vocabulary that says so.

Assertions: §4.586 seals the money controls as it seals the Takes; §4.528 draws a live Withdraw and
returns the confiscated purse in full; §1.177 stores 400 Shards, and its 10–11 break-in outcome
empties the stash and leaves the purse alone; §6.512's existing max-cap assertions are unmoved
(absent and `5000` must not become the same thing); §4.263's `max="0"` still bars deposits; and a
corpus census pinning **0** word-carrying `<lose shards= cache=X>` nodes whose cache has no deposit
route, so the next section written this way is found rather than waited for.

## 296. `rewardWasteReason` refuses a new resurrection deal to anyone already holding one, where `addResurrection` implements the replacement the books print — so book1/597's third reward is dead to a deal-holder

**Priority: MEDIUM — a reward the printed page offers, silently withdrawn.** Nothing is lost or
double-charged; an option the book puts on the page simply cannot be taken.

*(Filed 2026-08-24 from a probe of the two paths that offer a resurrection deal, run because they
answer the same printed rule differently. Found during conversion work on an unpublished book.)*

`rewardWasteReason` exists so a payment is never taken for a reward the player then cannot pick up
(task 223), and its first clause is `if (tag === 'resurrection' && state.hasResurrection()) return
'You already have a resurrection deal.'` (`render-rules.js:237`). **That is the one refusal in the
list the corpus's own rule contradicts.** A blessing you already hold really is a wasted grant and
an affliction you do not suffer really cannot be lifted — but a deal is *replaceable*, and this
engine already implements the replacement: `addResurrection` drops any standard deal when a new
standard one arrives, "you can only have one resurrection arranged at a time; a new deal cancels the
old" (task 98, `state.js:981`). **11 of the corpus's 15 offer pages print that rule in so many
words** ("If you arrange another resurrection elsewhere the original one is cancelled — cross it off
your Adventure Sheet"), and the deals land in different places, so swapping one for another is a
real choice and not a no-op. book1/597 — the one page this defect actually reaches — is not one of
the 11, which is part of why the mismatch has stayed invisible: its own text says nothing, so only
the sheet rule applies, and the sheet rule is the one `addResurrection` implements.

**Two paths, one rule, opposite answers — which is what makes this a defect rather than a policy.**
An ordinary `<resurrection section=>` draws its own Arrange button with no waste check at all, so a
deal-holder arranges freely and the old deal is cancelled exactly as printed. Only the *flag-linked*
paths consult `rewardWasteReason`: `renderChoosableReward` for the pick, and `menuWasteReason` for
the cost. Measured on a real `GameState` (a Warrior holding the book1/350 Temple of Nagil deal):

```
plain offer, no deal held:      Arrange resurrection [dis=false] -> deals=["2.339"]
plain offer, another deal held: Arrange resurrection [dis=false] -> deals=["2.339"]   (replaced)
book1/597, no deal held:            picks = Amber Wand [dis=false] | 500 Shards [dis=false] | resurrection deal [dis=false]
book1/597, another deal held:       picks = Amber Wand [dis=false] | 500 Shards [dis=false] | resurrection deal [dis=true "You already have a resurrection deal."]
book1/597, supplemental boon only:  picks = Amber Wand [dis=false] | 500 Shards [dis=false] | resurrection deal [dis=true "You already have a resurrection deal."]
lone priced deal (task 221), no deal held:      Pay 30 Shards [dis=false]  menuWasteReason=null
lone priced deal (task 221), another deal held: Pay 30 Shards [dis=true "You already have a resurrection deal."]  menuWasteReason="You already have a resurrection deal."
addResurrection over a held deal -> ["2.339"]              (the swap the guard forbids)
addResurrection over a boon      -> ["1.350*","2.339"]     (the coexistence the guard forbids)
```

**The supplemental case has no defence at all.** `rewardWasteReason` asks `state.hasResurrection()`,
which is true for a player holding only a supplemental boon (§6.355) — and `addResurrection` never
lets a supplemental displace a standard deal, so the two would simply coexist, as the last line
above measures. A player carrying a boon and no standard deal is refused a deal they could plainly
have, and no payment could ever change the answer.

**Reach.** 15 sections across books 1–6 offer a deal and exactly **one** is flag-linked —
book1/597, where the cost is a hidden `<tick price="x" hidden="t"/>`, so the menu stays live and
only its third pick dies. That is the whole cost today, and it is why this has gone unnoticed: the
14 plain offers all behave correctly. The lone-priced shape (task 221) has no instance in books 1–6
yet, so its refusal of the payment itself is latent rather than live — recorded because it is the
same clause and fails harder, refusing the page rather than one option on it.

**Suggested fix.** Refuse only what a payment truly cannot change. A new standard deal always
changes something (the landing site), and it is never wasted on a supplemental-only holder, so the
clause should either go or narrow to "the deal already held is this same book+section". Whichever is
chosen, the plain Arrange path is the reference behaviour: the two paths must agree, and today only
one of them reads the rule `addResurrection` implements.

Assertions: book1/597's deal pick is live for a player already holding the book1/350 deal, and
taking it leaves exactly one deal, at the new site; a supplemental-only holder is offered the
standard deal and ends holding both; a lone priced deal's payment is live for a deal-holder; and the
plain unflagged Arrange path is unmoved, since it is the behaviour the other two are being brought
into line with.

**Closed in part (2026-08-24), and the part left undone is filed as 297.** The filing's premise
about book1/597 — "its own text says nothing, so only the sheet rule applies" — is contradicted by
the file: §1.597 offers "a free `<resurrection …>resurrection deal</resurrection>`, **if you do not
have one already**". That clause is authorial (`597.xml` has one commit, the original books import),
and it is the printed source for exactly the refusal the guard implements. So the first assertion —
a deal-holder gets the pick, and taking it lands the deal at the new site — was **not** implemented:
it would make the engine grant an option the page conditions away. What was implemented is the
supplemental half, which stands under §1.597's wording too, since a boon is not a deal.

---

## 297. The resurrection waste guard is a blanket engine rule that only book1/597's printed wording justifies, so the first flag-linked offer on a page printing the replacement rule will be refused an option its own text grants

**Priority: LOW — latent: no corpus instance, and the one live instance is right by accident.**
Nothing in books 1–6 misbehaves. This is a trap laid for the next conversion.

*(Filed 2026-08-24 while closing 296, from reading all 15 offer pages rather than the guard.)*

`rewardWasteReason`'s first clause refuses a `<resurrection>` reward to a standard-deal holder
(`render-rules.js:241`), and `menuWasteReason` refuses the payment for one. **The corpus does not
speak with one voice about whether that is right, and the guard cannot hear the difference.** Of the
15 sections offering a deal, 11 print the *replacement* rule ("If you arrange another resurrection
later at a different temple, the original one is cancelled — cross it off your Adventure Sheet. You
do not get a refund") — under which a deal-holder may always arrange another, and `addResurrection`
implements exactly that. book1/597 prints the opposite: its deal is free "if you do not have one
already", a printed *exclusion*.

**Only the flag-linked and lone-priced shapes consult the guard**, and book1/597 is the corpus's
only instance of either — so today the blanket rule is right on the one page it reaches, and the 14
plain `<resurrection>` offers draw their own Arrange button with no waste check and replace as
printed. The two paths disagree, and in books 1–6 that disagreement is **authorial**, not a defect:
two pages, two printed rules, two behaviours.

**What breaks.** The first book-7+ section that puts a `<resurrection>` behind a `flag=`/`price=`
key while printing the replacement rule gets the wrong answer, and the lone-priced shape (task 221)
fails harder than book1/597 would: `menuWasteReason` refuses the *payment*, so the whole page is
dead to a deal-holder rather than one option on it. Nothing is lost or double-charged either way.

**Suggested fix.** The exclusion is a printed condition on one offer, so it belongs on the node, not
in a blanket engine rule — something the markup states (an attribute on `<resurrection>`, or the
existing `<if resurrection>` gate the vocabulary already allows) with the engine defaulting to the
sheet rule `addResurrection` implements. Whatever is chosen, `<if resurrection>` is worth checking in
the same pass: it also reads `hasResurrection()` (`engine.js:259`), so it counts §6.355's
supplemental boon as an arrangement — which is arguably right for a gate asking "is anything written
in the box" and arguably not, and no corpus section pins it either way.

Assertions: a flag-linked offer whose page prints the replacement rule is live for a deal-holder and
replaces the old deal; a lone priced deal on such a page keeps its payment live; §1.597's exclusion
still refuses its deal-holder (it is the page the default must not break); and whichever way
`<if resurrection>` is settled, a boon-only holder gets a pinned answer from it.

**Closed (2026-08-24).** The exclusion is now stated by the markup: `<resurrection unique="t">`,
which book1/597 carries and no other section does, and the engine defaults to the sheet's
replacement rule everywhere else. `rewardWasteReason` reads the attribute instead of asking the
state alone, so `menuWasteReason` follows on the cost side for free, and the plain Arrange path
reads it too — the attribute cannot mean one thing behind a `flag=` key and nothing at all on the
button 14 pages draw. `<if resurrection>` keeps `hasResurrection()`, boon included, and now says
why: all eight corpus gates are death-revival gates, and §6.355's boon does revive you.

---

## 298. `renderResurrection`'s `hidden="t"` auto-register path ignores `unique="t"`, so the exclusion task 297 gave the markup is honoured on two of the three paths that arrange a deal

**Priority: LOW — latent: no corpus instance, and the attribute exists on one section that is
neither hidden nor plain.** Nothing in books 1–6 misbehaves.

*(Filed 2026-08-24 while closing 297, from the path that closing it did not touch.)*

Task 297 moved the "if you do not have one already" exclusion out of `rewardWasteReason` and onto
the node as `unique="t"`, and taught two paths to read it: the flag-linked pick (via
`rewardWasteReason`, which `menuWasteReason` composes for the cost side) and the plain Arrange
button (`render-market.js:898`). `renderResurrection` has a **third** path — `section && hidden`,
which registers the deal automatically on entry with no button at all (§3.351's Island of Rebirth
re-arms it each visit) — and that path calls `arrange()` without asking anything about what the
player already holds.

**What breaks.** A book-7+ section written as a hidden registration *and* printing an exclusion
("if you have no resurrection arrangements, write X in the box") would silently replace a held deal
instead of leaving it. Nothing is lost that the sheet rule would not also lose, and no corpus
section has the combination — `unique="t"` appears once (book1/597, a visible flag-linked pick) and
the hidden path's one user (§3.351) prints no exclusion — so this is a trap laid for the next
conversion, of exactly the species 297 closed on the other two paths.

**Suggested fix.** One condition in the `section && hidden` branch: skip the automatic
registration when `unique="t"` and `state.hasStandardResurrection()`. Consider at the same time
whether the gate belongs above `arrange()` for all three paths rather than in each of them — a
single `resurrectionExcluded(state, node)` helper in a DOM-free module would let the view ask once,
and would be the natural home for the printed-condition question if a second such attribute ever
arrives.

Assertions: a hidden `unique="t"` registration leaves a deal-holder's existing deal untouched and
adds nothing; the same node registers normally for a player holding no deal, and for one holding
only §6.355's supplemental boon; §3.351's hidden re-arming (no `unique=`) is unmoved for a
deal-holder, since it is the behaviour the corpus actually depends on.

**Closed (2026-08-24).** The exclusion is asked once, above every branch that arranges: one
`excluded` const in `renderResurrection`, read by the silent `hidden="t"` registration and by the
plain Arrange button that task 297 had taught separately. An excluded registration writes nothing
and memoises nothing, so a page that loses the held deal before re-rendering may still arrange
this one — which is what its own printed condition says. §3.351, the hidden path's only corpus
user, prints no exclusion and is unmoved.

---

## 299. Nothing in the port fires on a change of BOOK, so book5/681's golden hair never pays the 20 Shards it promises on every crossing — and the corpus's only two `TODO` comments say so

**Priority: MEDIUM — a printed reward the port never grants, reachable in normal play, in two live
sections of a published book.** Not severe (20 Shards a crossing), but it is the "narrates a reward
it never grants" species rather than a latent trap, and the source files admit it in as many words.

*(Filed 2026-08-24 during conversion work on an unpublished book, where the same printed event has
further sites. Books 1–6 evidence only, below.)*

Holyamu turns the player's hair to spun gold at **book5/681**: the section ticks the codeword *Elk*
and prints "Note that whenever you travel to another book in the *Fabled Lands* series you can add
20 Shards to your Adventure Sheet. This represents your hair growing, and you cutting it and selling
the gold!" **book5/587** is the undo — Holyamu "has turned your hair back to normal", the codeword is
lost, and it prints "You can no longer receive 20 Shards every time you travel to another book."

Both sections carry `<!-- TODO: implement gold-hair effects -->`, and

```
grep -rn "TODO\|FIXME\|XXX" --include='*.xml' books/
```

returns **exactly those two lines** across the whole shipped corpus. So this is not a defect that
had to be found: it is the only one the source files themselves flag, and it has been sitting behind
a codeword that is granted, tested and lifted correctly.

**Why it cannot be tagged today.** The rule is keyed on an *event* — travelling to a different book
— and no node in the format fires on one. `state.goTo(book, section)` (`state.js`) is the single
choke point for every move, and it sets `data.book` without anyone reading the delta;
`app.js`'s `navigate()` is its only caller. There is no per-book entry hook, and the shipped tags
all fire where they are written: a `<tick>`/`<gain>` applies on the page, an `<extrachoice>` waits at
a named section or a section `tag=`, an item `<effect type="use">` waits for a button. The closest
shipped thing is `<extrachoice>` — a keyed, persistent, sheet-carried rule the books "note on your
Adventure Sheet" — and it is persistent *navigation*, with no way to carry an effect.

**Suggested fix — a standing rule the sheet carries, fired on the crossing.** A `<bookchange
name="X" [once="t"]>` at effect position, whose body is an ordinary effect body, registered where
the page prints it and applied when the book number changes:

```xml
<!-- book5/681 -->
<bookchange name="5.681"><gain shards="20"/></bookchange>
<!-- book5/587 -->
<lose bookchange="5.681">You can no longer receive 20 Shards every time you travel to another book</lose>
```

Four notes on the shape, each of which has a shipped precedent to copy rather than a decision to
take:

- **Store the body as markup and re-parse it at firing time.** That is `readItemEffects`'
  contract for an `<effect type="use">` body (task 41) — serialise the element children with
  `XMLSerializer`, keep the string on the sheet, and let the VIEW parse it back
  (`app.js` already does exactly this for a Use button). It is the only way a rule module can hold
  markup without a DOM, which the module-seam test (`web/tests/node-import.mjs`) enforces.
- **Key it by `name=`, and replace on re-registration.** `addExtraChoice`'s contract: a second visit
  to the granting section must not register a second copy, and a cancel needs a handle. book5/587's
  cancel is the same shape as `<extrachoice remove=>`.
- **`once=` is the difference between the two halves of the family.** Hair keeps growing; a rule that
  fires and then stops needs to deregister itself. book5/681 wants no `once=`.
- **Fire before the arriving section renders and before `state.snapshot()`.** The page you land on
  must already see the change, and undo must restore the previous section's entry state, which is
  taken before the crossing. Both fall out of putting the call between `state.goTo()` and
  `state.snapshot()` in `navigate()`.

An inner `<goto>` in such a body should be ignored: the rule fires *during* a move the player has
already committed to, so it has no navigation of its own to offer.

**Assertions.** A registered rule is written to the sheet and its body does NOT apply on the page
that prints it; a crossing to a different book fires it (and a move within the same book does not);
`once="t"` deregisters after the first firing while a plain rule pays on every crossing; a second
registration under one name replaces rather than duplicates, and a rule with no `name=` is refused;
the rules survive a save round trip, bodies and all; `<lose bookchange="X">` lifts a standing rule
and stops it paying; and book5/681 → another book → book5/587 → another book pays exactly once.
Add the tag and its attributes to `build/validate-source.ps1`'s allowlist in the same change
(task 199's rule), and delete both `TODO` comments with the markup that answers them.

---

## 300. Nothing validates a `modifier=`/`modifiers=` value, so one misspelling silently reverts a check to the very score the page says not to use — across 42 shipped sites, and it is task 46's defect from the source side

**Priority: LOW — a latent trap, not a live defect.** All 42 values in the shipped corpus are legal
today; what is missing is anything that would say so if one were not. It is filed because the
failure mode is silent in every direction — no build error, no console warning, no failing
assertion, and a game that plays on with a check made easier than the page prints it — and because
the build already has the mechanism to close it.

*(Filed 2026-08-25 during conversion work on an unpublished book. Books 1–6 evidence only, below.)*

**The two attributes and where they sit.** `modifier=` is the ability-resolution mode and appears
**41** times across books 1–6: `<set>` ×33, `<difficulty>` ×4, `<if>` ×2, `<adjust>` ×2, spelled
`natural` ×35, `noweapon` ×5 and `affected` ×1 (`notool`, a legal fourth, is unused). `modifiers=`
is the fight mode and appears **once** — `book5/689`'s Water Drake, `modifiers="noarmour"`. Both
attribute NAMES are already on `validate-source.ps1`'s allowlist; neither VALUE is checked by
anything.

**Four readers, and every one of them treats an unknown value as "no modifier at all".**

- `state.js abilityForMode` — `natural` → `abilityNatural`, `noweapon`/`notool` → `abilityNoWeapon`,
  **anything else → `ability()`**, the full affected score.
- `engine.js setValueMode` — returns `natural`/`affected` or **`null`**, and `null` is the current /
  affected reading. This is the `<set>` path, and so 33 of the 41 sites.
- `engine.js`'s condition path — `const natural = normalize(get('modifier')) === 'natural'`, so a
  typo means "affected". One exception worth knowing: for `ability="stamina"` the test is the
  *truthiness* of `modifier=`, so there a misspelling still selects the unwounded maximum and
  changes nothing. It is the only place in the family where a typo is harmless.
- `combat.js makeFight` — `modifiers.includes('noarmour')` on the raw lower-cased attribute. That is
  a **substring** test rather than a parse, so it fails open in both directions: `noarmor` matches
  nothing, and any string *containing* `noarmour` matches.

**Why the harm is one-directional.** Every one of the 35 `natural` sites exists because the page
says the roll is made before item bonuses. Falling through to the affected score adds the weapon or
tool bonus back, which makes each of those checks **easier than printed** — the player never
notices, and neither does anything else.

**This is already a filed defect from the other side.** Task 46 fixed `modifier=` being *misread by
the engine*: `<set>` treated it as an additive amount, so `resolveValue(state,'natural')` looked up a
non-existent variable, returned 0, and every book-2 rank ceremony's `<set var="r" value="rank"
modifier="natural"/>` stored `r=0` — making "roll 2d over r to gain a Rank" auto-succeed. The
comment above `setValueMode` records it. The engine side is correct now; the **source** side has
never had a guard, and the same attribute misspelled in a section produces the same class of silent
auto-success.

**Suggested fix — the tables that already exist.** `build/validate-source.ps1` closes value sets in
two places: `FL_ENUMS`, with nine keys (`ability`, `abilityDamaged`, `choose`, `blessing`, `crew`,
`gender`, `profession`, `ship`, `special`), and `FL_TYPE_VALUES` (`type`, per tag). Neither lists
these two.

- Add `'modifier' = 'affected natural noweapon notool'` to `FL_ENUMS`. That table splits on `|`,
  which costs nothing here — no shipped site unions two modes.
- `modifiers=` is not an enum, because the engine matches it as a substring list. Give it its own
  check: split on whitespace and commas and require every word to be a known mode (today,
  `noarmour` alone). Consider making the engine parse the same token list rather than calling
  `includes()`, so the two agree; the substring match is the part that makes a typo undetectable in
  both directions, and it is a one-line change with one shipped site to re-verify.
- Add one corpus assertion pinned to the **word set** rather than to a section list, so it survives
  the edition growing: every `modifier=`/`modifiers=` value under `data.availableBooks()` is one the
  engine acts on. A section-list pin would have to be re-pinned by every book that ships.

**Assertions.** The gate rejects `modifier="naturel"` on each of the four tags that carry it and
`modifiers="noarmor"` on `<fight>`, and accepts all four legal `modifier=` spellings and `noarmour`;
`build/validate-selftest.ps1` drives both directions over fixtures; the corpus census reads zero.
No allowlist name to add — both attributes are already listed, which is exactly how they were
missed.

---

## 301. Closing `modifier=`'s value set also closed the numeric/var addend `renderDifficulty` implements, so a shape the view supports is now a build error

**Priority: LOW — filed as a deliberate narrowing, closed as a non-issue.** Nothing is broken
today: the shape has **zero** uses anywhere under `books/`, published or not, `temp/` included —
and, it turns out, no standing in the format either.

*(Filed 2026-08-25 while implementing task 300; resolved the same day against `rules/`.)*

**The fifth reader task 300 did not count.** That task listed four readers of `modifier=` and
concluded the legal set is four mode words. `web/js/render-rolls.js` `renderDifficulty` is a fifth,
and it reads the attribute differently: a keyword routes into the ability lookup, and **anything
else is a numeric or var ADDEND** resolved through `resolveValue` (task 53's comment says so in as
many words). So before task 300, `<difficulty ability="combat" level="10" modifier="3">` and
`<difficulty … modifier="myvar">` were both live markup. After it, `FL_ENUMS['modifier']` rejects
both at build time.

**RESOLVED the same day, by reading the spec this filing had not.** `rules/JaFL-XML-Tags.md`
declares `modifier` as `"S"` on every tag that carries it and closes its value list to
`noweapon | noarmour | notool | natural`, plus `current` for `ability="stamina"`. **There is no
numeric or var addend in the format at all.** `renderDifficulty`'s addend path is this port's own,
and task 53's comment calling it "the historical numeric-modifier behaviour" is the tell that was
there to be read. So nothing spec-legal was closed off, and there is no escape to add: the premise
above — "a shape the view supports" — is true of the view and false of the format.

**The reasoning against an escape stands on its own anyway**, and is worth keeping for the next
attribute. A var-name addend is character-for-character indistinguishable from a misspelled mode
word — `modifier="naturel"` is a perfectly good var name — so admitting one admits the other, and
task 300's guard would catch nothing on `<difficulty>`, the tag where all four shipped
`<difficulty modifier=>` sites sit. Where a page really wants a number, the idiomatic route exists
and is already validated: `<difficulty …><adjust value="3"/></difficulty>`, one of
`FL_ADJUST_READERS`' five readers, which `childAdjustment` sums into exactly the same total.

**What reading the spec did turn up is filed as 302** — two spellings the format defines and this
port does not act on. That is the real divergence, and it points the other way: not markup the gate
wrongly rejects, but markup it must **keep** rejecting until the engine catches up.

**Assertions.** None — there is nothing to assert about a shape the format does not have. The two
cases the spec did earn are in 302.

---

## 302. The port acts on neither `modifier="noarmour"` nor `modifier="current"` off `<adjust>`, though the JaFL spec defines both — so two spec-legal spellings are build errors this port cannot honour

**Priority: LOW — a capability gap, not a live defect.** No shipped section uses either spelling,
and the source gate now rejects both **loudly**, which is the safe half of the trade. What is filed
is that the rejection is a workaround for a missing engine branch, so that a later reader does not
"fix" the gate by widening its table and quietly reopen task 300's defect.

*(Filed 2026-08-25 while implementing task 300, from `rules/JaFL-XML-Tags.md`.)*

**What the spec says.** `modifier` is declared `"S"` on `<if>`, `<difficulty>`, `<set>`, `<adjust>`
(and `<training>`), and its value list is closed:

> This may be 'noweapon', 'noarmour', 'notool' or 'natural'; these exclude (respectively) the
> ability bonuses of a weapon, armour, a tool, or any of these things. The default is to include
> these bonuses.

with, on `<difficulty>` and `<training>`, a fifth: *"A final value, 'current', can be used with
`ability="stamina"` to make a roll against the current Stamina value."*

**The two gaps.**

- **`noarmour` has no branch anywhere.** `state.js abilityForMode` handles `natural` and
  `noweapon`/`notool` (both routed to `abilityNoWeapon`) and returns the full `ability()` for
  everything else. There is no `abilityNoArmour`. A page reading "roll against DEFENCE, not
  counting your armour" would therefore resolve *with* the armour bonus — task 300's fall-through
  exactly, and toward the easier check as always.
- **`current` is read in one place only** — `engine.js adjustAmount`, for `ability="stamina"`.
  `renderDifficulty`'s keyword list is `natural|noweapon|notool|affected`, so `current` misses it,
  falls to the numeric-addend path, resolves as a var name, reads **0**, and the mode is lost with
  no trace. (`<difficulty ability="stamina">` does not work in this port regardless: `rollDifficulty`
  goes through `firstAbility`, which knows only the six core abilities and returns `null` → an
  ability score of 0. No corpus section rolls it, so this has never mattered.)

**What the gate does about it now (task 300).** `FL_ENUMS['modifier']` omits `noarmour` outright,
and `Test-AttrValue` rejects `current` on any tag but `<adjust>`. Both carry a comment saying the
omission is deliberate and pointing here. `affected` — which this port added as the explicit
spelling of the default, and which one corpus section uses — is likewise **not** in the spec; that
direction is harmless, since the engine does act on it.

**The fix, if a book ever needs it.** `noarmour` wants an `abilityNoArmour(ability)` beside
`abilityNoWeapon` (the armour's Defence bonus is already separable — `combat.js` subtracts it for
the Water Drake's `modifiers="noarmour"`, so the arithmetic exists), a branch in `abilityForMode`,
and the word added to `FL_ENUMS`. `current` wants adding to `renderDifficulty`'s keyword list and
routing to `state.data.stamina`, and its tag guard relaxed — and that is only worth doing alongside
making `<difficulty ability="stamina">` resolve at all.

**Assertions.** The gate rejects `modifier="noarmour"` on `<difficulty>` and `modifier="current"`
on any tag but `<adjust>`, both driven by `build/validate-selftest.ps1`; `<adjust ability="stamina"
modifier="current">` stays accepted. Whichever gap is closed, its case here inverts from a
rejection to an acceptance, and the engine gains the assertion that the mode changes the score.

---

## 303. `<if ability="defence">` compares against 0, not the player's Defence, so book5/361's §160 route is unreachable at any Defence and book1/313's daggers always hit

**Priority: MEDIUM — live, on two shipped pages, wrong on every visit.** Not an edge case and not a
latent trap: both sections take the wrong branch for every character in every playthrough, and one
of them charges Stamina for it.

*(Filed 2026-08-25 while implementing task 302, which needs this route to exist.)*

**The bug is one missing `else if`.** `engine.js evaluateCondition` routes an `ability=` comparison
through `firstAbility`, and `ABILITIES` (`rules.js`) is **the six core abilities only** — `rank`,
`stamina` and `defence` are derived stats, not members. Task 68 saw this and added arms for `rank`
and `stamina`:

```js
if (spec === 'rank') v = state.rankValue();
else if (spec === 'stamina') v = get('modifier') ? state.effectiveStaminaMax() : state.data.stamina;
else { const ab = firstAbility(get('ability')); v = ab ? state.abilityForCheck(ab, natural) : 0; }
```

`defence` falls to the `else`, `firstAbility('defence')` returns `null`, and **`v = 0`**. Task 68's
own comment names the failure — *"else the comparison ran against 0: every `<if ability="rank"
greaterthan=N>` gate stayed shut"* — and it is the third stat's turn.

**Measured, not read.** A character with COMBAT 8 and Rank 3 has `defence() = 11`, and
`ability('defence')` reads **1** (0 clamped) because `defence` is not a key in `data.abilities`:

- **book5/361** — *"If your Defence is 14 or more, `<goto section="160"/>`."* Markup:
  `<if ability="defence" greaterthan="13">`. Evaluates `0 > 13` → false. Raising the character to
  Defence **17** and re-evaluating still returns **false**: §160 is unreachable at *any* Defence,
  and every player falls through to §271.
- **book1/313** — *"If the total is higher than your Defence, a dagger hits you and you lose 1-6
  Stamina."* Markup: `<if ability="defence" lessthan="x">` with `x` the 2-dice total. Evaluates
  `0 < x`, true for every roll of 2-12, so **the daggers always hit** and the `<else>` ("the daggers
  all miss") is unreachable. The printed odds are roughly even for a mid-game Defence; the port
  charges 1-6 Stamina unconditionally.

**The fix.** One arm, resolving it the way `evalExpression` already does (`engine.js`: `if (w ===
'defence') return state.defence();`) — which is precisely the rule task 68 wrote down: *route them
the way evalExpression/adjustAmount do*. `adjustAmount` and `rollDifficulty` have the same hole for
`defence`, but **no corpus section uses `<adjust ability="defence">` or `<difficulty
ability="defence">`** (the census is `<if>` ×2 and `<effect>` ×5, nothing else), so extending them
is task 302's business where it needs a roll path, not this one's.

**Assertions.** `<if ability="defence" greaterthan="N">` is true exactly when `defence()` exceeds N
and false when it does not — pinned at a Defence that clears the threshold, since that is the case
the bug makes indistinguishable from failure; `<if ability="defence" lessthan="var">` matches only
when the var beats Defence; and the two shipped sections evaluate the branch the printed sentence
describes. A control on `rank` keeps task 68's arm honest.

---

## 304. `defence()` sums items, Rank and auras but not afflictions, so book5/638's Curse of Vulnerability subtracts its 3 points from nothing and the curse is inert

**Priority: MEDIUM — live, and the rule does literally nothing.** One shipped page, one curse, zero
effect: the player is told they are cursed, the sheet shows the curse, and no number moves.

*(Filed 2026-08-25 while implementing task 302, alongside 303 — same method, same family.)*

**Every other contributor is there.** `state.js defence()` reads:

```js
return this.ability('combat') + this.rankValue() + this.armourBonus() + this.auraBonus('defence');
```

`ability('combat')` folds in `itemBonus`, `effectBonus`, `afflictionBonus`, `auraBonus` and
`potionBonusFor` — **for COMBAT**. `rankValue()` adds the ring's aura. `armourBonus()` is the worn
armour. `auraBonus('defence')` catches the `type="aura"`/`type="wielded"` effects that name Defence
directly (the sword of stone, ring of guarding, Jade Defender — 4 of the corpus's 5
`<effect ability="defence">` sites). What is missing is **`afflictionBonus('defence')`**, the fifth.

**The one site, and it is a curse.** `books/book5/638.xml`:

```xml
<curse name="Curse of Vulnerability">
    <effect ability="defence" bonus="-3"/>
```

Measured: with COMBAT 8 and Rank 3, `afflictionBonus('defence')` returns **-3** correctly — the sum
is computed and then never read. `defence()` is **11** before the curse and **11** after; the book
says 8. Because `combat.js` takes the player's Defence from `state.defence()`, the curse is inert in
fights too, which is the only place a Defence penalty was ever going to bite.

**Why it reads as an oversight rather than a decision.** `effectiveStaminaMax()` and `rankValue()`
— the two sibling derived stats — both fold in their affliction/aura contributions, and
`afflictionBonus` is written to take any ability key including `defence`. Nothing in the file argues
for the exclusion.

**The fix.** Add `+ this.afflictionBonus('defence')` to `defence()`. Watch the double-count
question and answer it in a comment: a `<curse><effect ability="combat">` is already inside
`ability('combat')`, so only effects naming `defence` itself are added here, which is exactly what
`afflictionBonus('defence')` returns. Consider `afflictionMod` too — a `divide`/`target` transform
naming `defence` would have the same problem — but no corpus affliction does, so leave it and say
so.

**Assertions.** Applying book5/638's curse drops `defence()` by exactly 3 and lifting it restores
the original; a curse naming COMBAT moves Defence by its COMBAT effect once and not twice; and a
fight against a cursed player reads the reduced Defence.

---

## 310. `reconcileEquipment` writes the DEFAULT weapon/armour back into `data.equipped`, so an implicit default is stored as an explicit choice

**Priority: MEDIUM — live in every published book, from the first purchase.** Not a crash and the
player can correct it from the Adventure Sheet, but nothing tells them there is anything to
correct: the sheet shows the weaker weapon as the wielded one and the COMBAT score agrees with it,
so the loss reads as the rules rather than as a stuck selection.

*(Filed 2026-08-26, found while writing an assertion about a section that consumes the weapon the
player is wielding and then grants a replacement. The assertion was wrong and the engine was
right, which is how the wider case came out.)*

**The design task 186 wrote.** `_equipped(kind)` is documented as "the player's explicit choice
(`data.equipped`) while it still names a carried item of that kind, else the strongest of that kind
as the default" (`state.js`), and the reason the choice wins is real: book5/628's +3 Jade Defender
carries a wielded Defence effect no plain +4 blade can match, so the port must not auto-switch away
from a deliberate pick.

**What the code does instead.** `reconcileEquipment` ends with `eq.weapon = w ? w.id : null` where
`w = this.wieldedWeapon()` — i.e. it *persists whatever the reader just returned*, including the
"strongest of that kind" fallback. It runs from `GameState.create`, `addItem`, `removeItemById`,
`setEquipped` and the load path, so `data.equipped` is populated for every character from turn one
and the two cases the comment distinguishes become indistinguishable. The fallback branch can then
only ever fire when the stored item has LEFT the pack — never when a better one arrives.

**Measured** (Node, `web/js/state.js` only):

```
items: battle-axe (+2)            -> wielded battle-axe, COMBAT 8   (correct)
add magic sword (+4)              -> wielded battle-axe, COMBAT 8   (should be 10)
lose battle-axe                   -> wielded magic sword, and the sword is now the STORED choice
add holy sword (+7)               -> wielded magic sword, COMBAT 10 (should be 13)
```

Every pregen starts with a weapon, so the first line is every character: book1/16's market, or any
of the corpus's weapon awards, is enough to reproduce it. The second half is the same fault one
step on — book6/635's Warrior Maid confiscates a weapon, book4/103's white sword and book1/385's
royal ring are the keep-protected pieces around it, and after any such loss the fallback is written
back and sticks in turn.

**The fix.** Keep `data.equipped` for explicit choices only. `setEquipped` writes it; the reconcile
should CLEAR a stale entry rather than replace it with the fallback, leaving `_equipped` to
default afresh on each read. That is what the existing comment already describes, so no behaviour
the corpus depends on changes: a player who has chosen still keeps their choice (the Jade Defender
case), and a player who has not gets the strongest, which is what the sheet already implies.
Worth asserting in both directions — an explicit pick surviving a better acquisition, and an
unchosen loadout following the best piece — since the two have been the same code path until now.

**Armour has the identical shape** through `wornArmour`/`armourBonus`, and Defence is where it
compounds, because `defence()` reads the worn armour and the Rank together.

**Fixed 2026-08-26.** `reconcileEquipment` now clears a stale entry — one naming an item that has
left the pack — and writes nothing else, so `data.equipped` holds deliberate picks only and the
per-item `wielded`/`worn` display flags are rewritten from the readers as before. The sheet is
unchanged: `ui.js` shows the pressed Wield/Wear button from those flags, so an unchosen default
still reads as the piece in hand, and clicking another still makes the choice explicit.

**The load path had to move with it, and the filing did not see that.** `sanitizeData` migrates a
loadout from the legacy per-item flag whenever the stored id is absent or stale — written for a
pre-186 save, where the flag is the one record of what reconcile had picked. After this fix that
flag marks the **default**, and `equipped: {weapon: null}` is the normal state of an unchosen slot,
so the migration would have frozen the default into a choice on **every load**: the engine fix
would hold for one session and the bug would return on the next page refresh, service-worker
reload or import. The discriminator is the presence of the `equipped` object itself — a pre-186 save
has no such key at all — so the flag is now read only when the key is missing. A post-186 save's
stale id is dropped instead, which is what reconcile does in play. A pre-310 save's populated
`equipped` is still honoured verbatim: its stored id is indistinguishable from a real choice and
names the loadout the sheet was showing, the same reasoning the pre-186 migration rests on.

**Two existing fixtures asserted the bug**, which is the "they have been the same code path"
warning above arriving in the tests. `suite-inventory`'s `mk186` and `suite-economy`'s Jade Defender
case both relied on the Defender *arriving first* to be wielded, and both passed only because the
write-back had promoted that default to a stored choice — so "a stronger later weapon does not
steal the wield" was testing the defect, not task 186's rule. Both now call `setEquipped` to take
it in hand, which is what task 186 was always about; the two §186 assertions that read
`data.equipped` after a loss or a stale load were rewritten to the new invariant.

**Assertions** (13, `suite-inventory`, both directions since they were one path): the measured
four-line table as live arms — a lone weapon wielded with nothing stored, a better one taking over
an unchosen slot, a loss falling back, and a better weapon *after* that loss still picked up (the
half that the write-back's second-order case broke); the sheet flags following the reader; an
explicit pick surviving a better acquisition; the same four for armour through `armourBonus`/
`defence()`, plus the lesser piece still honoured when chosen; and the load path both ways —
unchosen reloads unchosen and keeps following the best piece, a choice reloads as the same choice,
a pre-186 save still migrates from the flag. Verified as regression tests by reinstating each half
of the fix alone: the write-back alone fails 10 arms (reporting `wielded=battle-axe combat=8/6`,
the filed table), and removing the load-path guard alone fails the three reload arms.

## 309. `ROADMAP.md` sizes the map-position work against "the 4,437 section files", the glob count task 270 was filed to stop anyone quoting

**Priority: LOW — one number in a planning document.** Filed because task 270 exists precisely to
stop it, and because the number is load-bearing for the phase it appears in.

*(Filed 2026-08-26 on reading `ROADMAP.md` after the defect buckets came clear; fixed the same
day.)*

**The claim.** The Player-position roadmap's "the blocker is data, not code" paragraph reads "the
4,437 section files have no location attribute", sizing phases 2 and 3 — which must give every
section a position — against that figure.

**Measured.** `books/**/*.xml` returns **4,437**; the `^\d+[a-z]?$` basenames of the published
books, which is what `build-data.ps1` bundles and `data.loadBook`/`availableBooks()` can see,
return **4,369**. The 68-file gap is the 20 superseded `temp/` working copies plus the 48 files
that are not sections at all (`Adventurers.xml`, `New.xml` and the six pregen biographies, per
book) — exactly the two inflations `AGENTS.md` names. So the paragraph both overstates the work by
68 files and counts six pregen biographies per book as sections needing a map position.

**The fix.** `4,369 shipped section files`, which says which set it measured, as task 270 requires
of any filing that quotes a count.

**Not touched.** The Review log's older passes quote 4,437 as well ("a 4,437-section corpus scan").
Those are historical records of what a past pass did, not live claims about the corpus, and
rewriting them would falsify the record rather than correct it.

## 308. `groupPlan.linkedAwards` grants EVERY item-family award sharing the price flag, where the Take path it stands in for grants one

**Priority: LOW — inert in the published edition.** No shipped section has the shape, so this is a
latent case to close before it ships, not a live defect. Filed the way task 286's census arms were:
a section arriving in the list wants measuring, not assuming.

*(Filed 2026-08-26 while implementing task 307, which read the same seam from the view side, and
closed the same day — the fix section records where implementing it moved the line.)*

**The asymmetry.** `renderItemAward` routes a flag-linked award two ways and the two are mutually
exclusive by construction: `isChooseOne` (two or more linked rewards, at least one of them NOT
item-family) means one payment must grant only the reward the player picks, and `isPricedItemAward`
(every linked reward item-family) means arm-then-take. `groupPlan.linkedAwards` makes no such
distinction — it collects every item-family node carrying the price flag that sits outside the
group:

```js
sectionEl.querySelectorAll(`[flag="${k}"]`).forEach((r) => {
  if (ITEM_FAMILY_TAGS.has(r.tagName.toLowerCase()) && !node.contains(r)) linkedAwards.push(r);
});
```

`renderGroup` then grants all of them on one click and consumes the flag once. On a choose-one menu
that is two wrongs at once: the player is handed the whole item half of a menu he was meant to pick
one row of, and the non-item rows (a blessing, a resurrection) are left permanently dead, because
their own Take reads the flag the group just consumed. Task 307's `linked@<flag>` marker inherits
the same key, so it would then caption both wrongly-granted items as taken — correctly describing
state that should never have been reached.

**Census (shipped corpus, per task 270).** Every non-roll `<group>` carrying a `price=`, against the
`[flag=]` rewards outside it: **two sections, one reward each, both item-family** — `book1/342` and
`book4/111`, the same potion of restoration on the same shape. No group in the published edition
pays for a menu of any kind, so nothing is mis-granted today and the guard changes no shipped page.

**The fix, and why it is not the one first sketched.** The obvious guard is `isChooseOne` — skip
the key when the menu is heterogeneous. Implementing it showed that helper is the wrong line to
draw: `isPricedItemAward` covers a *pure item-family barter* too, and §4.634 is one — three goods
on one flag, where taking one clears the flag and re-locks the other two. `isChooseOne` is false
there (no non-item row), so an `isChooseOne` guard would still have let a group hand over all
three. The invariant is not "is this menu heterogeneous" but **how many rewards the key names**:
every Take path a payment arms grants ONE reward and consumes the flag, so the group can stand in
for it only where there is exactly one to stand in for. The shipped guard is
`linkedRewards(sectionEl, k).length !== 1 → skip`, which subsumes both shapes and reads as what it
means.

The open question — whether a skipped menu then has any live pick, since the group collapses to a
button — settles by reading `engine.js`: the group's own `<lose price=>` **arms the flag**
(`applyEffect`, `state.setFlag(get('price'), true)`), and task 307 established that the branch
holding the picks is not re-decided mid-visit. So the picks are on the page and armed on the
redraw, and the player names his own reward. Nothing needed adding for that.

**Assertions.** Three fixtures, since the corpus drives none of it: a group paying a key carrying
two items plus a blessing plans no linked awards (and `isChooseOne` confirms the fixture is the
shape claimed); a pure two-item barter likewise (with `isPricedItemAward` confirming it); and a
lone reward on the key is still planned with a second key beside it, so the guard is narrowing by
count and not by "is there more than one key". Plus the census as a standing assertion in the task
286 idiom — exactly `1/342 4/111` pair a group price with an item award outside it, and neither
names a second reward on that key — so a book conversion that introduces the shape fails here
rather than shipping it. Verified as regression tests by disabling the guard alone: both
`task308` fixture arms fail, the census arms do not.

## 307. a `<group>` that pays for a flag-linked award grants it and leaves the award's own Take button on the page, disabled and captioned "Pay first to choose this." — so book1/342 offers to sell you a potion you are already carrying

**Priority: LOW — display only. The grant is correct and the payment is correct;** what is wrong
is a control that survives the transaction it belongs to and then describes it backwards.

*(Filed 2026-08-26, found while probing an item award for unrelated work.)*

**The shape.** book1/342's alchemist: a pair of guards, a `<group>` that pays, and the reward
outside it, linked by the payment flag.

```
<if shards="250"><if item="ink sac">
  If you pay the money, and have an <b>ink sac</b>
  (<group><text>cross it off</text>
     <lose shards="250" price=""/><lose item="ink sac" price="x"/></group>
  your Adventure Sheet) he will make you a
  <item name="potion of restoration" flag="x" verb="Drink">…</item>.
</if></if>
```

`groupPlan` collects flag-linked item awards rendered OUTSIDE the group (task 125's
`linkedAwards`) and grants them on the group's click, consuming the flag, because the group is the
real payment. Its comment says the award's own Take button "vanishes" before it can be clicked —
the affordability `<if shards="250">` is expected to flip false the moment the money is spent.

**It does not vanish.** The taken branch stays rendered for the rest of the visit — deliberately,
because that is what keeps the paid group's own `☑` on the page — so the Take is redrawn beside
it. `classifyRewardNode` sees a `flag=` whose `[price=]` partner exists and returns a gated award;
the flag has already been consumed, so `flagGate` reports `not yet available` and the button
renders disabled with `title="Pay first to choose this."`.

**Measured on book1/342**, a Warrior holding an ink sac and 250 Shards, clicked once:

```
BEFORE:    [ ] ☐ cross it off        [x] Take Potion Of Restoration «Pay first to choose this.»
AFTER PAY: [x] ☑ cross it off        [x] Take Potion Of Restoration «Pay first to choose this.»
ITEMS: leather jerkin|battle-axe|map|potion of restoration
```

The potion is on the sheet and the ink sac and money are gone — the transaction is right in every
particular. The button beneath it says the player has not paid yet.

**Why it matters more than it looks.** The caption is not merely stale, it is the *inverse* of the
state: the one thing the player has certainly done is pay. On a page where the group's label is
generic ("cross it off", "adjust your Adventure Sheet accordingly") the disabled Take is the only
control naming the reward, so it is the one a player reads to find out whether the deal went
through.

**The fix.** `renderGroup`'s `linkedAwards` loop already consumes the flag; it now also records the
grant against that flag in the visit memo (`ctx.applied`, key `linked@<flag>`), and
`renderChoosableReward` reads it: a granted item-family award renders the `☑ Potion Of Restoration`
done form every other taken award uses, before the un-armed branch that would have captioned it.
The award node's own path is not available where the group commits, so the flag is the key — which
is exact, because the awards `groupPlan.linkedAwards` grants are precisely the item-family nodes
carrying that flag outside the group. The `ITEM_FAMILY_TAGS` guard on the read keeps a non-item
sibling sharing the flag (none in the corpus) from being marked taken when it was not granted.
`rewardLabel`'s item branch is split so the Take prefix and the done tick draw the same display
string (`itemAwardDisplay`) rather than two spellings of it. Suppressing the node was rejected: the
reward's name is printed prose on these pages and would disappear from the sentence.

Both stale comments are corrected in place — `groupPlan`'s claim that the Take "vanishes before it
can be clicked", and the §342 test's copy of the same premise. A conditional branch is not
re-decided mid-visit, which is the point of the taken branch and is why the button is still there.

**Where it does not reach.** `ctx.applied` is per-visit, so a fresh landing on §1.342 draws the
offer again — correct, since a player who has bought another ink sac may buy another potion. The
census behind the flag-keyed marker: exactly two sections in the shipped corpus pair a `<group>`
with an item-family award linked outside it (§1.342 and §4.111), each with one reward on one flag.

**Where it bites.** Every section pairing a `<group>` with a flag-linked item award outside it, of
which book1/342 is the corpus's own cited precedent for task 125 (book4/111 is the same potion on
the same shape). Nothing about the shape is unusual; it is simply that the two mechanisms — a
group that grants on behalf of a linked award, and a taken branch that stays on the page — were
built for different reasons and have never been rendered together in a test.

**Assertions.** In `suite-inventory`'s existing §1.342 block, after the group's click: the potion
is possessed exactly once (already asserted); no enabled control offers it a second time; the
control naming it reads `☑ …` and is not captioned "Pay first"; and the paid group still shows its
own `☑` beside it — the last pins the redraw the whole defect depends on, so a future change that
made the branch vanish would have to say so rather than silently satisfying the caption assertion.
Verified as a regression test by disabling the writer alone: `FAIL §342 the potion control reads as
taken, not as unpaid (task 307) :: text=Take Potion Of Restoration title=Pay first to choose this.`

## 306. The fight widget's "Your Defence" row re-derives the score instead of asking the resolver, so a `modifiers="noarmour"` fight shows the armoured number the enemy is not rolling against

**Priority: LOW — display only, and the resolution was always right.** No save is wrong and no
outcome changes; what changes is whether the player can see why he lost.

*(Filed and closed 2026-08-25, found while probing a fight widget for unrelated work.)*

**Two numbers for one thing.** `combat.js playerDefenceFor` computes the Defence an enemy rolls
against: a `playerDefence=` override wins outright, else the sheet Defence less the worn armour's
bonus when `modifiers="noarmour"`, plus the section's `<tick special="defence">` boon and the
fight's own Defence-through-Faith raise. `render-combat.js playerStatsRow` computed its own —
`state.defence() + fightDefenceBonus() + defenceBonus` — which has the two section/fight bonuses
and **neither fight-local term**.

**Measured, on shipped pages.** book5/689 (the Water Drake, the corpus's one
`modifiers="noarmour"` fight) with a +5 armour: the row prints **Your Defence 12** and the log
line beneath it prints **vs your Def 7**. The two `playerDefence=` fights, book6/473 and
book6/718, have the same shape — the row shows the sheet score while the enemy rolls against the
override, and there the gap can run either way.

**The row's own comment names the invariant it was breaking.** It says the transient bonuses are
folded in "so the shown values match what resolution uses". They were, and the fight-local terms
were not — because the row re-implements the sum rather than calling it. A view that re-computes
what a resolver computes is a lie waiting for the resolver to gain a branch, and this one gained
two.

**The fix.** `playerDefenceFor` is exported as `playerFightDefence(state, fight)` and
`playerStatsRow` takes the FIGHT rather than a bonus number, so there is one implementation and
the row cannot drift again. Both call sites already hold the fight (the group row passes
`fights[0]`, which may be absent when every member is defeated — a null fight reads as no
fight-local term, which is the honest answer for a row with no fight left to describe). No rule
module changes; `combat.js` gains an export and `render-combat.js` loses a computation. This is
the architecture rule in `AGENTS.md` applied to a number rather than to a decision: the view
builds DOM, the rule module owns the arithmetic.

**Assertions.** A `modifiers="noarmour"` fight shows the unarmoured Defence and it equals the
`vs your Def N` the log prints; a `playerDefence="7"` fight shows 7 where the sheet says
otherwise, and again matches the log; an ordinary fight is unchanged, armour included. The log is
the independent witness in each case, since it is printed by the resolver and not by the row.

## 305. a `<tick god=>` shares `readEffects` with the afflictions, so it accepts `ability="defence"` (task 304) and `ability="stamina"` (task 185) — and `data.effects` is read only by the core-ability paths, so both parse, store and move nothing

**Priority: LOW — no corpus site either way.** Filed as a hole task 304 *opened*; implementing it
found the `stamina` half, which has been live since task 185 and is nobody's regression.

*(Filed 2026-08-25 while implementing task 304. Widened and closed the same day — the heading and
the census below are the corrected ones; the original filing named `defence` only.)*

**One function serves two callers.** `engine.js readEffects` is called from `applyAffliction`
(a `<curse>`/`<disease>`/`<poison>` body) and from `applyTick`'s `<tick god="…">` branch, and
both filter their `ability=` through `afflictionAbility`. Task 304 added `defence` to that filter
so §5.638's curse would stop being discarded at parse time. The affliction side then reads it —
`state.js defenceForMode` sums `afflictionBonus('defence')`. The god side does not: `setGod`
pushes its effects into `data.effects` tagged `source: 'god:<name>'`, and `defence()` sums
`itemBonus`/`auraBonus`/`armourBonus`/`afflictionBonus` but **never `effectBonus`** for Defence.
So `<tick god="Nagil"><effect ability="defence" bonus="2"/></tick>` would now validate, parse,
store, display nothing and change nothing.

**It was two words, not one — and the second is older than the task.** `afflictionAbility` admits
`stamina` as well, and has since task 185. `effectiveStaminaMax()` reads
`afflictionStaminaMod() + auraBonus('stamina')` and **never `effectBonus`**, so a
`<tick god="X"><effect ability="stamina" bonus="5"/></tick>` has always parsed, stored and moved
nothing. `effectBonus` has exactly one writer (`setGod`) and had two readers (`ability`,
`abilityNoWeapon`) — both core-ability paths — so *every* non-core word the parser accepts on the
god path was dead, not just the one 304 added.

**Census: zero, both words.** Books 1-6 hold two `<tick god=>` sites carrying an `<effect>`
(§1.437, §2.334 — Sig's initiate `+1 THIEVERY`), and both name a core ability that has always
worked. None names `defence` or `stamina`. And the spec settles the shape question: `<effect>` is
defined there as "an effect of an item or curse", so the god-effect form is port-local
(task 59) and the spec neither blesses nor restricts which abilities it may name.

**Closed by widening the engine, per the choice made 2026-08-25.** The alternative on the table
was task 301's rule — *where the engine has no branch for a value, the gate must reject it* — with
`validate-source.ps1` refusing `<effect ability="defence|stamina">` under a `<tick|gain god=>`. It
was rejected because it removes a capability with no workaround for a shape the spec does not
restrict, and because widening is where 301→302 already pointed: rejecting first and widening later
is two changes where one does.

**The fix.** `defenceForMode` gains `+ this.effectBonus('defence')` and `effectiveStaminaMax()`
gains `+ this.effectBonus('stamina')`, both guarded like the aura term. Two consequences have to
travel with them or the fix is worse than the hole:
- **`sanitizeData`'s Stamina ceiling recomputes `effectiveStaminaMax` by hand** and must gain the
  god term too, or a god-raised save is clamped back down on every load. That means moving the
  `out.effects` sanitize above the clamp, since the clamp now reads it.
- **`removeGod` must cap current Stamina to the new ceiling**, the way `reconcileEquipment` does
  when a Stamina-raising aura item is dropped. Renouncing used to strip a number nothing read.

**Assertions.** A god granting Defence moves `defence()` by exactly 2 and back to 0 on
renunciation, is kept by `noarmour` and stripped by `natural`; one granting COMBAT still moves
Defence once, not twice; a god granting Stamina raises the effective maximum, survives a
save/load round-trip un-clamped, and takes current Stamina down with it when renounced; and
§1.437's shipped Sig grant still reaches THIEVERY and nothing else.

---

## Review log

*Running audit log of the backlog — each pass re-verifies the open items against
the current code and records what was filed, split, or re-confirmed. Task
numbers refer to the contents checklist at the top of the file.*

Worked 2026-08-25 (filed and closed, task 306): filed and closed **306** — the fight widget's
"Your Defence" row re-derived the score rather than asking the resolver, so the two fight-LOCAL
terms were invisible to it: book5/689's Water Drake row reads `Your Defence 12` with a +5 armour
while the log line beneath it reads `vs your Def 7`, and book6/473 and book6/718's
`playerDefence=` overrides have the same shape. Found while probing a fight widget for unrelated
work, which is the second time a probe written for one page has returned a defect in the widget it
happened to use. Fixed by exporting `combat.js playerDefenceFor` as `playerFightDefence` and
having `playerStatsRow` take the FIGHT instead of a bonus number, so one implementation serves the
resolver and the row and the row cannot drift again — the `AGENTS.md` architecture rule applied to
a number rather than to a decision. Five assertions in `suite-combat`, each reading the widget and
the resolver's own log line in the same run. No rule-module logic changed; `combat.js` gains an
export and `render-combat.js` loses a computation. The reusable half is the smell, not the bug:
**a view that re-computes what a resolver computes is a lie waiting for the resolver to gain a
branch**, and this one gained two before anyone looked.

Worked 2026-08-25 (implementation pass, task 305): closed **305** by widening the engine — a god's
`<effect>` naming `defence` or `stamina` now lands. Four changes in `state.js`: `defenceForMode`
sums `effectBonus('defence')`, `effectiveStaminaMax()` sums `effectBonus('stamina')`,
`sanitizeData`'s hand-recomputed Stamina ceiling gains the same term (which meant moving the
`out.effects` sanitize above it), and `removeGod` caps current Stamina to the new ceiling. Eleven
assertions in `suite-engine`. The suite moves `RESULT ALL PASS pass=2967 fail=0` →
`pass=2978 fail=0`; `web/` only, so a stamp and not a data rebuild.

**The task was one word short, and the word it missed was four months older than the task.** 305
was filed as "task 304 opened this". Half true: `afflictionAbility` has admitted `stamina` since
**task 185**, and `effectiveStaminaMax()` has never read `effectBonus` — so a `<tick god=>`
granting Stamina has parsed, stored and done nothing that whole time. The generalisation is the
useful bit: `effectBonus` had **one writer** (`setGod`) and **two readers** (`ability`,
`abilityNoWeapon`), both core-ability paths, so *every* non-core word the shared parser accepted
on the god path was dead. Enumerating a function's readers is what 302 said to do when widening a
value set; doing it for `effectBonus` — rather than for the one word I had just added — is what
turned a one-line task into the right two-line one. **A filing that blames the previous commit is
worth re-deriving from the readers before you believe it.**

**The spec dissolved the harder half of the choice, as it did for 301.** `rules/JaFL-XML-Tags.md`
defines `<effect>` as "an effect of an item or curse" — the `<tick god=><effect>` form is
port-local (task 59), so the spec neither blesses it nor restricts which abilities it may name.
That killed the gate-rejection option on its merits rather than on taste: task 301's rule is
*where the engine has no branch for a **spec-legal** value, the gate must reject it*, and it does
not reach a shape the spec never defines. Rejecting would have removed a capability with no
workaround, and 301→302 had already established that the end state is a widened engine — so
rejecting first would have been two changes where one does.

**Two things had to travel with the terms, and both are the same failure the last three tasks
were about.** (a) `sanitizeData` recomputes the Stamina ceiling **by hand**, because it works on a
plain object and not a `GameState`; adding the god term to `effectiveStaminaMax` without adding it
there would have clamped a god-raised save back down on **every load** — the mirror drifting from
the method, which is precisely what 304 fixed in `defence()` by delegating. (b) `removeGod` never
capped current Stamina, because before this the term it strips was unread; now renouncing a
Stamina-granting god can leave the player above the new maximum unless it does what
`reconcileEquipment` already does for a dropped aura item. Neither is visible from the diff of the
two terms themselves. **Adding a term to a derived stat means finding every place that stat is
recomputed by hand and every event that can now lower it.**

**Five of the eleven assertions fail without the fix; six pass either way, deliberately.** The six
are the controls — the mode agreement, the `natural` strip, the COMBAT-once double-count guard,
and §1.437's shipped Sig grant still reaching THIEVERY and nothing else. The one worth naming is
the fifth failure: `renouncing lowers the maximum again and takes current Stamina with it` reported
`max=9 stam=14` against the unpatched tree, which is the `removeGod` hole stated as a number. An
assertion suite built only from "the new term adds up" would have shipped that.

Worked 2026-08-25 (implementation pass, task 304): closed **304** — §5.638's Curse of
Vulnerability now takes its 3 points off Defence. It took **two** fixes, not the one the task
described: `engine.js afflictionAbility` accepts `defence`, and `state.js defenceForMode` sums
`afflictionBonus('defence')` while `defence()` delegates to it. Nine assertions (eight in
`suite-engine`, one in `suite-combat`). The suite moves `RESULT ALL PASS pass=2958 fail=0` →
`pass=2967 fail=0`; `web/` only, so a stamp and not a data rebuild. **305** filed.

**The task's own measurement was of a fixture, not of the shipped page, and that hid half the
bug.** 304 stated that `afflictionBonus('defence')` "returns **-3** correctly — the sum is
computed and then never read". It does, for a curse built by hand in a test. For the curse the
book actually prints it returns **0**, because `readEffects` filters every `ability=` through
`afflictionAbility`, which admitted `stamina`, `*` and the six `ABILITIES` — so §5.638's
`<effect ability="defence" bonus="-3"/>` was dropped at **parse** time and never reached the
sheet at all. Shipping the described one-line fix would have left `RESULT ALL PASS` and an
inert curse, and the passing suite would have said the task was done. **The rule: a filing that
quotes a measured number has to say what it measured it on, and an implementer re-measures
against the shipped markup before trusting it** — which is why two of this pass's assertions
apply the real §5.638 `<curse>` element out of the bundled data rather than a transcription.

**This is the third face of task 303's lesson, and it is the one that bites hardest.** 303 wrote
down that `ABILITIES` is a six-element list and every read of it is a place a derived stat can
fall through; it fixed the *condition* reader and named `adjustAmount`/`rollDifficulty` as the
others (302 then did those). Nobody looked at the **parser**. A fall-through in a reader gives
you the wrong number; a fall-through in the parser gives you no data, which is strictly worse —
`afflictionBonus` cannot be wrong about an effect it was never handed. Worth enumerating the
*writers* of a stat as well as the readers next time this shape appears.

**Both halves were checked to be load-bearing, separately.** With only the `state.js` term the
same three assertions fail (the effect is still discarded); with only the `afflictionAbility`
widening they fail identically (the sum is still unread). Six of the nine pass either way — the
mode controls, the double-count guards — and a suite made only of those would have reported a
clean pass over both defects at once.

**`defence()` now delegates to `defenceForMode(null)` instead of re-summing.** The two were
byte-equivalent when 302 wrote the second one, and 302's log asserted that equivalence in prose;
one term added to one of them is all it would ever have taken to break it silently, since no
assertion compared them. Delegation makes the invariant structural, and matches how
`abilityForCheck` already delegates to `abilityForMode` in the same file. The affliction term
rides with the aura term — stripped by `natural`, kept by `noarmour`/`noweapon` — because a curse
is not a bonus the written score carries.

**The double-count question is answered by the wildcard's scope, and that is worth saying out
loud.** `afflictionHits` expands `ability="*"` over `ABILITIES` only, so §2.136's Leprosy reaches
Defence exactly once, through the COMBAT term, and never again through the new one. A derived
stat is only ever hit **by name** — which is precisely why `defence` had to be added to
`afflictionAbility` as an explicit word rather than by widening the list `*` expands over.

**One hole opened, filed rather than papered over.** `readEffects` serves `<tick god=>` too, and
a god's effects land in `data.effects`, which `defence()` does not read — so that path now
accepts the word and drops it. Zero corpus sites, so **305** records both ways to close it (add
the `effectBonus` term, or make the gate refuse the word on that path) and says to pick one.
Task 302's rule again: **widening what a value may be is a promise every reader honours it, and
the readers have to be enumerated again** — this time the widening was in a parser, so the
readers to enumerate were the parser's *callers*.

Worked 2026-08-25 (implementation pass, task 302): closed **302** — `modifier="noarmour"` and
`modifier="current"` are now words the engine acts on rather than words the gate has to refuse.
`state.js` gains `defenceForMode`, `abilityForMode` routes `defence` into it, `engine.js
rollDifficulty` routes all three derived stats so a `<difficulty>` may name one, `evalExpression`'s
`defence` read honours the mode, and `renderDifficulty`'s keyword list and `FL_ENUMS['modifier']`
both gain the two words. Fifteen assertions; the two gate cases invert from rejections to
acceptances and two new ones keep `current` off the tags that still cannot read it. The suite moves
`RESULT ALL PASS pass=2943 fail=0` → `pass=2958 fail=0`; `web/` and `build/` only, so a stamp and
not a data rebuild — `web/data` byte-identical.

**`noarmour` is a Defence-only mode, and saying so out loud is most of the design.** In this port
armour reaches exactly one score: `itemBonus()` covers tools and the wielded weapon, and
`armourBonus()` feeds `defence()` alone. So a mode word that means "without the armour" has one
place to bite, and `abilityForMode` sends `defence` to a new `defenceForMode` while every core
ability falls through unchanged. **That fall-through is correct, not a shortcut** — excluding a
bonus the armour never granted leaves the score where it was — and there is an assertion whose only
job is to say so, because a reviewer's first instinct is that a no-op branch is an unfinished one.

**It could not be built until `defence` resolved at all, which is why 303 came first.** Defence
never reached `abilityForMode`: the condition path compared 0 (303's live defect) and
`rollDifficulty` scored 0. Shipping `noarmour` on top of that would have added a branch nothing
could reach and a gate word that still silently meant "the full score" — precisely the fall-through
300 and 302 exist to close. **A capability task that depends on a defect task is worth spotting
before writing code, not after:** the tell here was that the census found zero sites for the
feature *and* zero working reads of the thing it modifies.

**The change re-opened one hole while closing another, and the gate is what surfaced it.** Adding
`noarmour` to `FL_ENUMS` makes it legal on `<set>` too — and `evalExpression`'s `defence` branch
read `state.defence()` flat, ignoring the mode. So `<set var="d" value="defence"
modifier="noarmour"/>` would have validated clean and handed back the armoured score: a *new*
silent fall-through, created by the fix for silent fall-throughs. `defenceForMode(null)` is
`defence()` by construction, so the one-line correction changes nothing that exists today. **The
rule this leaves behind: widening a value table is not a table edit — it is a promise that every
reader of that attribute honours the new word, and the readers have to be enumerated again.**

**What stayed rejected, and why that is not a compromise.** `current` means "the wounded Stamina",
so it is only meaningful where a stat is rolled or read: `adjustAmount` and `rollDifficulty`, i.e.
`<adjust>` and `<difficulty>`. On `<set>`/`<if>` nothing reads it, so the tag guard keeps refusing
it there and two fixtures pin both directions. `affected` remains the one word in the table the
spec does not define — this port's explicit spelling of the default, used once in the corpus.

**Scope kept honest.** No shipped section uses either word, so this is capability rather than
repair; it was implemented because it was asked for after being described that way. One boundary is
recorded in the code rather than papered over: a `type="wielded"` aura on armour naming some *other*
ability is not stripped by `noarmour`, because `auraBonus()` cannot separate it and no corpus item
has one.

Worked 2026-08-25 (implementation pass, task 303): closed **303** — `<if ability="defence">` routes
through `state.defence()` instead of falling to `firstAbility`, which knows the six core abilities
only and returned `null`, making the comparison run against **0**. One `else if` in
`engine.js evaluateCondition`, nine assertions in `suite-engine`. The suite moves
`RESULT ALL PASS pass=2935 fail=0` → `pass=2943 fail=0`; `web/` only, so a stamp and not a data
rebuild.

**Two shipped pages were wrong on every visit, in opposite directions.** §5.361 prints *"If your
Defence is 14 or more"* and marks it `greaterthan="13"`: against 0 that is false, so the §160 route
was shut for **every character at every Defence** — a character measured at Defence 17 still fell
through to §271. §1.313 prints *"if the total is higher than your Defence, a dagger hits you"* and
marks it `lessthan="x"`: against 0 that is true for every 2-dice total of 2-12, so the daggers
**always** hit and the printed "the daggers all miss" `<else>` was unreachable. The first silently
removes a route; the second silently charges 1-6 Stamina on a coin-flip the player was supposed to
be able to win.

**This is task 68 finishing.** That task found the same hole for `rank` and `stamina` and wrote the
rule down in the comment it left — *route them the way `evalExpression`/`adjustAmount` do* — and
`evalExpression` has resolved `defence` to `state.defence()` the whole time. What it did not do is
enumerate the derived stats: there are **three**, and the fix listed two. The lesson worth keeping
is that **`ABILITIES` is a six-element list and every read of it is a place a derived stat can fall
through** — the same shape may still be open in `adjustAmount` and `rollDifficulty`, which is left
alone here because no shipped section uses `<adjust ability="defence">` or `<difficulty
ability="defence">` (the census is `<if>` ×2 and `<effect>` ×5, nothing else).

**The assertions were checked against the broken engine before being trusted.** Removing the new
`else if` and re-running fails exactly four of the nine and passes the other five, which is the
point: the five that survive (Defence *not* clearing the bar, the dice total *beating* Defence, the
`rank` control) are the cases where 0 and the true Defence happen to agree, and an assertion suite
made only of those would have reported a clean pass over the bug. The `greaterthan` case is
deliberately pinned at a Defence that **clears** its threshold, because that is the only side the
defect makes indistinguishable from an honest failure. Two of the nine evaluate the real §5.361 and
§1.313 elements out of the bundled data rather than a transcription, so a re-worded section is
caught rather than silently passing against a fixture nobody updated.

**Found while implementing 302, and it blocked it.** `modifier="noarmour"` excludes the armour's
bonus, and in this port armour reaches no core ability — `itemBonus` covers tools and the wielded
weapon, and `armourBonus()` feeds `defence()` alone. So `noarmour` is only ever observable on
Defence, and Defence did not reach `abilityForMode` at all. Implementing 302's half without this
would have shipped a branch nothing could reach and a gate word that still silently meant "full
score" — the exact fall-through 302 exists to prevent. **304** was filed on the same pass and is
independent.

Worked 2026-08-25 (implementation pass, task 301): closed **301** as a non-issue and filed **302**
in its place. The whole pass is one lesson: **301 was filed without reading `rules/`, and reading
`rules/` dissolved it.** The spec declares `modifier` as `"S"` with a closed keyword list and has
**no numeric or var addend at all**, so the "shape the view supports" 301 was written to protect
does not exist in the format — it is a port-local path, and task 53's own comment calling it "the
historical numeric-modifier behaviour" was the tell sitting there the whole time. Nothing was
implemented for 301; the two `validate-selftest.ps1` cases added this pass belong to 302.

**Reading the spec cost one command and moved three separate conclusions**, which is the reusable
part. `AGENTS.md` says `rules/` is reference material to read "when a task points at it" — and
neither 300 nor 301 pointed at it, because both were reasoning from the READERS in `web/js` and the
values in `books/`. Those two sources answer "what is implemented" and "what is used". Only the
spec answers **"what is legal"**, and a validation table is a claim about exactly that. So: **when
a change closes a value set, read the format's own definition of that set before writing the table
down.** Three things it turned up that no amount of grepping the port would have:
- `noarmour` is spec-legal `modifier=` on all four tags, and `state.js abilityForMode` has no
  branch for it — it falls through to the full affected score, armour bonus included. Task 300's
  defect, still live, for a value the format defines.
- `current` is spec-legal on `<difficulty ability="stamina">`, not only `<adjust>` as task 300's
  own comment (and my first draft of the `FL_ENUMS` row) claimed.
- `affected`, which the corpus uses once and all the port's readers handle, is **not in the spec**
  — this port's own explicit spelling of the default. Harmless, but the table now says so.

**The gate change that came out of it is small and points the other way from 301.** `noarmour`
stays OUT of `FL_ENUMS['modifier']` and `current` is now rejected on any tag but `<adjust>`, both
with comments saying the omission is deliberate and citing 302. That is the correct trade and worth
stating plainly: **where the engine has no branch for a spec-legal value, the gate must reject it,
not admit it.** Admitting it produces markup that looks right, validates clean and silently
resolves to the affected score; rejecting it produces a build error naming the file and the value.
Loud-and-wrong beats quiet-and-wrong, and 302 exists so the next reader widens the engine rather
than the table. Seven fixture cases became nine (36 → 38 gate assertions); the browser suite is
unchanged at `RESULT ALL PASS pass=2935 fail=0`, and `web/tests/` is outside the stamp digest, so
this pass moves neither `version.js` nor `sw.js`.

**One hole this closed was one the previous commit had opened.** Task 300 made `current` legal on
all four tags where the port reads it on one, turning "unvalidated" into "validated wrong" for
three of them — a 1-in-4 silent fall-through introduced by the very change that existed to stop
them. It survived a green suite because the corpus has zero `current` sites, which is precisely the
condition under which a census reads clean and proves nothing. The corpus assertion is word-level
by design and does not see tags; the gate owns that dimension, and both now say so in comments.

Worked 2026-08-25 (implementation pass, task 300): closed **300** — a `modifier=`/`modifiers=` value
is now checked against the words the engine acts on, in the gate and again over the corpus.
`FL_ENUMS` gains a `modifier` row, `modifiers=` gets its own token check beside it
(`FL_FIGHT_MODIFIERS`), and `combat.js makeFight` parses the same tokens instead of asking
`includes('noarmour')` of the raw string. Seven fixture cases in `validate-selftest.ps1` (29 → 36)
and one corpus census; the census reads **42 sites, zero unknown**. The suite moves
`RESULT ALL PASS pass=2934 fail=0` → `pass=2935 fail=0`; `web/` and `build/` only, so this is a
stamp and not a data rebuild — `web/data` is byte-identical. **301** filed.

**The suggested word set was one short, and the reason is worth keeping.** Task 300 named four
modes; the shipped set is **five**. `<adjust ability="stamina" modifier="current">` reads the
*wounded* value against `natural`'s written score — `engine.js adjustAmount` documents it in a
comment two lines long and nothing else mentions it. Shipping the four would have made the gate
reject markup the engine implements, which is the same class of error in the other direction. The
lesson is the cheap one: **when closing a value set, enumerate it from the READERS, not from the
corpus** — the corpus tells you what is used, and only the readers tell you what is legal.

**And there was a fifth reader.** `render-rolls.js renderDifficulty` treats a non-keyword
`modifier=` as a numeric/var addend (task 53). Closing the enum closes that too, deliberately —
a var name and a misspelled mode word are the same string, so no guard can admit one and catch the
other. Zero files under `books/` use it and the idiomatic `<adjust value=>` already does the job,
so it was narrowed rather than escaped, and **301** records the one-line reopening if a book ever
needs it.

**`modifiers=` is a list, so it could not be an enum row.** `FL_ENUMS` splits on `|`; the fight
attribute is whitespace/comma separated, and `combat.js` was matching it as a **substring**, which
failed open both ways — `noarmor` matched nothing and any string containing `noarmour` matched. The
gate and the engine now split the same way, so the two agree on what a mode is; §5.689's Water
Drake is the one shipped site and it re-verifies. The fixture that earns its place is the mixed
list: `modifiers="noarmour nosheild"`, legal first word and bad second, which the old substring read
accepted outright.

**The census guards itself against reading zero for the wrong reason.** Its site count rides inside
the assertion (`sites300 > 0 && bad300.length === 0`), so a corpus that stopped carrying the
attribute — or a regex that stopped matching it — fails instead of reporting a clean zero. It is
pinned to the word set and not to a section list, so a seventh book is checked on arrival rather
than re-pinning the assertion.

Filed 2026-08-25 (single finding, no implementation): **300** in LOW — nothing validates a
`modifier=`/`modifiers=` value. Found during conversion work on an unpublished book, which needed a
mode word and went looking for where mode words are checked; the answer is nowhere. Measured before
filing: `modifier=` reads 41 sites in books 1–6 (33 `<set>`, 4 `<difficulty>`, 2 `<if>`, 2
`<adjust>`; `natural` ×35, `noweapon` ×5, `affected` ×1) and `modifiers=` exactly one
(`book5/689`), and all 42 are legal today, so nothing is broken — which is why it is LOW rather
than not filed at all.

**Two things make it worth an integer.** The fall-through is *toward* the score the page excludes:
all four readers treat an unknown value as "no modifier", so a misspelling on any of the 35
`natural` sites silently adds the item bonus back and makes that check easier than printed. And it
is **task 46 from the other side** — that task fixed `modifier=` being misread by the *engine* (a
`<set>` stored 0 and every book-2 rank ceremony auto-succeeded); the engine is right now and the
source has never had a guard, so the identical silent auto-success is one typo away. The comment
above `setValueMode` records the old bug and does not notice that.

**The gap is a missing table entry, not a missing mechanism.** `validate-source.ps1` already closes
nine value sets in `FL_ENUMS` and `type` per tag in `FL_TYPE_VALUES`; these two attributes are on
the *name* allowlist and in neither value table, which is how they were missed — a name that
validates looks validated. Worth a habit rather than only a fix: **when adding an attribute whose
value selects a BEHAVIOUR, put it in a value table in the same change**, because the name allowlist
will accept every misspelling of it forever. `modifiers=` additionally wants its engine read
looked at — `includes('noarmour')` is a substring test, so it fails open in both directions.

Worked 2026-08-24 (implementation pass, task 299): closed **299** — `<bookchange name="X"
[once="t"]>` is now a standing rule the sheet carries and a change of book pays.
`books/book5/681.xml` registers `5.681` with a `<gain shards="20"/>` body and
`books/book5/587.xml` lifts it with `<lose bookchange="5.681">`; both `TODO` comments are gone,
the corpus census is back to zero, and a tag-stripped diff of each file is byte-identical.
Seventeen assertions. The suite moves `RESULT ALL PASS pass=2917 fail=0` → `pass=2934 fail=0`;
`books/` changed, so this is a data rebuild. Nothing new filed.

**The event had exactly two writers, and only one of them is a journey.** `data.book` is
assigned in two places — `goTo` (every move) and `restoreReturn` (a `<return>` reversing a
detour) — so "fires on a crossing" had one honest home: between `goTo()` and `snapshot()` in
`app.navigate`, which is where the arriving page can see the change and undo still restores
the departing section's entry state. A `<return>` deliberately counts no turn and pushes no
history, so it fires nothing; that is an asymmetry (travelling back IS travelling to another
book) but an **unreachable** one — of the 15 sections carrying a `<return>`, none is the target
of a genuine cross-book `<goto>` in the shipped corpus. Recorded here rather than filed.

**The body is markup, and the printed sentence stays outside the tag.** The rule fires long
after its page is gone, so the body cannot be a live node — it is serialised at registration
and re-parsed by the view at firing time, `readItemEffects`' contract for an item's Use body
and the only way a rule module holds markup without a DOM. That makes the registration silent
(a bare `<gain shards="20"/>` inside it would otherwise print filler on the granting page), so
book5/681's own three sentences sit beside the tag, not inside it, and `renderBookChange`
prints nothing at all.

**The negative controls are what the assertions are really for.** Three of the seventeen say
what must NOT happen: the body does not apply on the page that prints it, a move within the
same book fires nothing, and a `once="t"` rule that has fired pays nothing on the next
crossing. The end-to-end arc — §5.681 → another book → §5.587 → another book — is one
assertion that the whole family composes: exactly one 20-Shard payment.

Filed 2026-08-24 (finding pass, no code): **299** — nothing fires on a change of book, so
book5/681's printed 20-Shards-per-crossing is never paid and book5/587's cancel has nothing to
cancel. Found by censusing the printed EVENT rather than a resource: `(different|another|any
other|the next) book` and `in the series` over the shipped `^\d+[a-z]?$` basenames. The finding that
makes it worth reading twice is the corroboration — `grep -rn "TODO\|FIXME\|XXX" --include='*.xml'
books/` returns **exactly two lines in the whole corpus** and both are these sections'
`<!-- TODO: implement gold-hair effects -->`. **A corpus-wide `TODO` census is one command and had
never been run**; it is worth running on any pass with time for the cheap structural checks, and it
is the only census in this project whose hits were written by somebody who already knew the answer.
Nothing else was filed and nothing was changed.

Worked 2026-08-24 (implementation pass, task 298): closed **298** — the `hidden="t"` registration
reads the exclusion too, so `unique="t"` now means the same thing on all three paths that arrange a
deal. The check is hoisted above the branch rather than repeated in it: one `excluded` const, asked
once, used by the silent registration and the plain button alike. Four assertions. The suite moves
`RESULT ALL PASS pass=2913 fail=0` → `pass=2917 fail=0`; `web/` only, so this is a stamp and not a
data rebuild. Nothing new filed.

**Hoisting the check was the whole fix, and it is smaller than the version 297 shipped.** Task 297
put the condition inside the plain-button branch, which is where it was needed and nowhere else that
day; 298 needed it one branch earlier, so the two call sites became one expression above both. That
is the tell for this shape of change: an attribute the view asks about in more than one place wants
asking once, at the point where every path can see the answer.

**An excluded registration memoises nothing, which is deliberate.** The `applied` memo exists to
stop a hidden node re-arming on every re-render within a visit; a registration that never happened
has nothing to remember, and a page that loses the held deal before re-rendering may then arrange
this one — which is what its own printed condition says. Marking it applied would have made the
exclusion permanent for the visit, and no page asks for that.

**One of the four assertions fails against the unfixed path, and the three survivors are the
controls.** The negative control reads 1 of 4: only the deal-holder's deal being replaced. The
others — the same node registering for a player holding nothing, registering beside §6.355's boon
(no deal, so no exclusion), and §3.351's own `unique=`-less re-arming still replacing a held deal —
pin the behaviour the fix must not move, and §3.351 is the one the corpus actually depends on. The
silent path throws nothing in either state, so all four were measured.

Worked 2026-08-24 (implementation pass, task 297): closed **297** — the resurrection exclusion is
now a property of the page, not of the engine. `books/book1/597.xml` carries `unique="t"` (markup
only; the printed sentence is untouched, and a tag-stripped diff of the file is byte-identical), the
allowlist gained the attribute and the bool-value list gained its name, and `rewardWasteReason`
consults the node instead of the state alone. One attribute, three call sites, nine assertions. The
suite moves `RESULT ALL PASS pass=2904 fail=0` → `pass=2913 fail=0`; `books/` changed, so this is a
data rebuild and not a stamp. Filed **298** for the third path.

**The fix is one line of markup and one condition, because the disagreement was never in the code.**
14 of the 15 offer pages print the replacement rule and one prints an exclusion, so no single
engine-wide answer could be right for both; a blanket refusal made §1.597's wording the rule for
pages that print its opposite. Putting the exception on the node leaves the default where
`addResurrection` and the plain Arrange button already were, and `menuWasteReason` needed no edit at
all — it composes `rewardWasteReason` per linked reward, so the cost side followed for free. That is
the shape to prefer when the corpus disagrees with itself: the pages differ, so let the markup differ.

**The plain Arrange path reads the attribute too, and that is not scope creep but the point of a
closed allowlist.** Had it been left alone, `unique="t"` would mean a refusal behind a `flag=` key
and a silent no-op on the button 14 pages draw — the exact "a typo cannot ship as a silent no-op"
failure `validate-source.ps1` exists to prevent, except worse, because the attribute would be spelled
correctly. Four lines, inert on every section shipping today.

**Two older assertions pinned the blanket rule, and both were fixtures rather than corpus.** Task
223's "a deal-holder cannot pay for a second deal they cannot pick up" and its "one takeable option
keeps the cost live" twin both used a scratch `<resurrection>` with no printed exclusion; under the
new default the second deal is takeable, so the first would fail and the second would pass
vacuously. Giving both fixtures `unique="t"` keeps what they were written to test — that
`menuWasteReason` blocks a payment for a reason no payment can clear, and that one live option keeps
the cost open — and now says on the page why the reason is unclearable. Task 296's direct
`rewardWasteReason` read needed the same attribute for the same reason.

**Six of the nine new assertions fail against the unfixed guard, and the three that pass in both
states are the ones that had to.** The negative control (blanket refusal restored, plain path
ignoring the attribute) reads 6 of 9: both halves of the flag-linked replacement page, both halves of
the lone priced page, the plain button's refusal, and the guard read directly. The three survivors
are §1.597's own refusal — the page the new default must not break, now pinned to its markup rather
than to the engine — the plain button staying live for a boon-only holder, and `<if resurrection>`
answering yes to a boon. Every assertion survived the broken state long enough to be measured: the
defect only disables a button, and clicks are guarded by `!disabled`, so nothing threw and none of
the nine went unreported.

**`<if resurrection>` is settled as "any arrangement in the box", with the reason written down.** All
eight corpus gates are death-revival gates ("unless you have a resurrection deal", "turn to the entry
marked for it"), and §6.355's boon does revive you — at §6.710 — so a boon-only holder must pass one.
It stays `hasResurrection()`; the comment at `engine.js` now says it is deliberately not
`hasStandardResurrection()`, which answers the different question the offer pages ask.

Filed 2026-08-24 (**298**): the `hidden="t"` auto-register path arranges a deal with no button and
no question, so it ignores the `unique="t"` exclusion the other two paths now read. Latent: the
attribute exists on one section, which is neither hidden nor plain, and the hidden path's only
corpus user (§3.351) prints no exclusion. Left undone deliberately rather than written blind - the
same reasoning that put the attribute on the node says the third path should read it, but a
condition with no page to answer to is a guess about wording nobody has written yet.

Worked 2026-08-24 (implementation pass, task 296): closed **296 in part** — a supplemental boon no
longer reads as a resurrection deal to the waste guard, so §1.597's third reward and a lone priced
deal's payment are both live for a player holding nothing but §6.355's boon. One accessor
(`hasStandardResurrection`), one call site, ten assertions. The suite moves
`RESULT ALL PASS pass=2894 fail=0` → `pass=2904 fail=0`; `web/` only, so this is a stamp and not a
data rebuild. Filed **297** for what was left.

**The filing's central premise was wrong, and reading the section was all it took to see it.** 296
said book1/597's "own text says nothing, so only the sheet rule applies". The page actually offers
"a free resurrection deal, **if you do not have one already**" — an authorial clause (`597.xml`
carries a single commit, the original books import) that is the printed source for the very refusal
the task called a defect. So the headline assertion, that a deal-holder should get the pick, was not
implemented: it would have made the engine grant an option the page conditions away, in the name of
a sheet rule that page does not invoke. **A filing that quotes what a section does not say is worth
opening the section over** — the probe that produced 296 measured the engine on scratch fixtures and
never read the one page it names.

**What survived the correction is the half that holds under either reading.** §6.355's boon is
explicitly not a deal — the deity grants it "even if you have another resurrection deal arranged",
and `addResurrection` lets the two coexist — so a boon-only holder has no deal under the sheet rule
*and* none under §1.597's wording. That is the case with no defence, and it is the one that changed.

**Six of the ten assertions pass in both states, and that is the point of them.** The negative
control reads 4 of 10: the two §1.597 boon assertions, the boon-only payment, and
`rewardWasteReason` read directly. The six controls — `hasResurrection`/`hasStandardResurrection`
disagreeing on a boon, §1.597 still refusing a deal-holder with its other two picks live, and
§2.316's plain Arrange replacing a held deal — are what pin the behaviour the fix must NOT move, and
§1.597's refusal is now pinned *with its printed reason in the assertion text*, so the next pass to
read task 296 finds the correction before it acts on it. Every assertion survives the broken state
long enough to fail or pass (task 295's lesson): the defect only disables a button, and a click on a
disabled button is a silent no-op, so nothing throws.

Filed 2026-08-24 (**296**): the resurrection family's two offer paths answer the same printed rule
differently. `rewardWasteReason` refuses a new deal to anyone already holding one, so book1/597's
third reward is dead to a deal-holder — and to a player holding only §6.355's supplemental boon,
whom `addResurrection` would let hold both. The plain unflagged Arrange button, which is 14 of the
15 offer pages, has no such check and replaces the old deal exactly as the books print it. Measured
on a scratch page (both paths, three holdings, plus `addResurrection`'s own behaviour in each). No
code changed; the probe was deleted. Found during conversion work on an unpublished book, which is
what put a lone flag-linked deal in front of the guard for the first time — books 1–6 have no
instance of that shape, so the payment-side half of the clause is latent there.

Worked 2026-08-24 (implementation pass, task 295): closed **295** — an `<itemcache>` with no `max=`
now stores Shards, so the town houses' printed offer works, their break-in rolls have something to
take, and §4.586's confiscated purse comes back at §4.528. Two lines of renderer, one seal, eleven
assertions. The suite moves `RESULT ALL PASS pass=2883 fail=0` → `pass=2894 fail=0`; `web/` only, so
this is a stamp and not a data rebuild. Nothing new filed.

**Six of the eleven fail against the unfixed renderer, and the control is what set the count.** The
first run of the block threw on the first missing widget (`Cannot set properties of null`), which the
harness reports as one `FATAL [economy]` — so eight assertions written to be measured were never
measured, in the run whose whole purpose is measuring them. Made null-safe, the control reads
6 of 11. **A negative control needs every assertion in it to survive the broken state long enough to
fail**, which means no `find(…).click()` and no `querySelector(…).value` on a widget the defect
removes.

**One of the five survivors was vacuous and is now the sixth failure.** "The break-in empties the
stash and leaves the purse alone" passed against a renderer that could never bank anything —
`cacheMoney === 0` is true before the deposit and after the theft. Pinning the transition
(`banked === 400 && stash === 0`) is what makes it fail there. The four that legitimately still pass
are the ones that were always true: the §4.586 transfer itself, §6.512's `max="5000"` cap (the
control that says absent and 5000 must not become the same thing), and `max="0"` drawing nothing.

**The corpus census passes in both states, deliberately, and that is worth saying out loud.** It pins
the MARKUP — no section names a cache nothing can pay into — and its route table counts a bare
`<itemcache>` as payable, which is only true after this fix. So it cannot detect the renderer bug and
was never meant to; the eleven behavioural assertions do that. What the census catches is the next
section written with a loss over a cache no widget serves, and its own control (a `max="0"` fixture
against a bare one) is what shows it still discriminates.

**The obvious fix reopened task 256, exactly as the filing said, and the seal is the interesting
half.** Task 38's rule — a plain stash lock leaves a bank editable — is about a `<moneycache>`, and
every corpus lock over one is a bet bundled with a roll. No confiscation uses a money cache: §4.586
seals an ITEM cache holding the purse it just took. So the money buttons now carry
`data-cachelock` like the Takes, which over books 1–6 seals money at the same four boxes as items and
leaves every town house editable, because their unlock is unconditional. **A rule about one tag does
not transfer to another tag that happens to render the same control.**

Worked 2026-08-24 (filed from a census, no code change): filed **295** (HIGH) — a bare
`<itemcache>` renders no money controls, so §4.586 takes the player's whole purse and §4.528 can
never hand it back. Nothing closed; the buckets were clear and are not now.

**The census that found it runs a family in the direction the family's own name does not suggest.**
Every previous cache pass asked what a widget *offers*; this one asked, for each printed money loss
*from* a cache, whether anything in the corpus can ever put money *into* that cache — a
`<moneycache>` of the same name, an `<itemcache max="N">`, a `<transfer to=>` with `shards=`, an
`<adjustmoney name=>`, or a `<tick|gain shards= cache=>`. Sixteen nodes in books 1–6 name a cache
with none of the five. A widget census cannot ask that question, because the widget is fine: the
money half of `renderItemCache` works and is measurably live at §6.512. What is broken is the gate
in front of it, and only pairing the losses against the deposits shows a gate at all.

**Task 131's own acceptance text is the evidence, and it had been read as satisfied for a month.**
It says "parse `max` with 0 = barred / absent = unlimited **in both cache widgets**", quoting JaFL
`CacheNode`'s −1 default. `renderItemCache` does the parse and then gates on `moneyMax > 0`,
throwing the −1 away one line later; `renderMoneyCache` gates the same value on `max >= 0` and
honours it. A task whose title names one section (§6.512) closes when that section works, and the
half of its own fix statement that was general went with it. **Read a closed task's fix text, not
its title, when auditing what it left behind.**

**The obvious fix reopens task 256, and the negative control is what says so.** Turning the controls
on for a bare `<itemcache>` gives §4.586's sealed confiscation a live Withdraw — `applyCacheLock`
stamps `data-cachelock` on Takes and Stores and not on money buttons, deliberately, on reasoning
that is right for a bank and wrong for a confiscation. Measured on a locked fixture cache with
`max=`: three Take/Store buttons sealed, the Withdraw `disabled=false`, and one click moving the
sealed 500 Shards into the purse. So the filing carries the second half of the fix rather than
leaving it to be discovered by the run that closes the first.

Worked 2026-08-23 (implementation pass, task 290): closed **290** — §5.315's crippling injury now
fires when the printed sentence says it does. The suite moves `RESULT ALL PASS pass=2819 fail=0` →
`pass=2828 fail=0`; `books/` changed, so this is a data rebuild. 289's checklist line also moves
into **Done**, which its own commit left in the HIGH bucket. Filed **291**.

**The filing named two defects and there were three; the third is the one that mattered, and only
the negative-control habit found it.** Adding `var="exp"` and `lessthan="pre"` made the guard
readable and made it match — *on entry*, before the roll, because `exp` reads 0 and 0 is less than
any COMBAT. The intermediate run reported `max=18` on a page nobody had rolled on: the fix had
turned a penalty that could never fire into a penalty that always fired, for 2 maximum Stamina the
player never earned. That is strictly worse than the bug, and it passed every assertion the filing
asked for. The answer was already in the corpus — §6.628 puts `<set var="y" value="7"/>` above its
`<random var="y">` precisely so the `lessthan="6"` beneath cannot match an unrolled 0 — so §5.315
gets `<set var="exp" value="pre"/>`, the same move on a bar that is not a literal. `rollOwned`
(task 61) freezes it the moment the roll takes the var, which is what makes the idiom safe.

**The filing's re-render analysis was wrong in its premise and right in its conclusion, which is
worth separating.** It reasoned that `pre` would be `rerunnable` and then proved the drift harmless.
`rerunnable` excludes any `<set>` carrying `modifier=` (`render-rules.js`), so a
`modifier="natural"` snapshot never re-runs at all — it is frozen after its first application. The
assertion the filing asked for (assert both directions rather than reason twice) is what settles it
either way, and it is why the premise being wrong cost nothing.

**One of the four new assertions passed in the broken state, and it is the one the block is for.**
"Before the roll the guard is grayed and costs nothing" passes vacuously against the original
markup — a guard that can never match is also a guard that does not match yet — so on its own it
proves nothing. Pinning the sentinel's *value* (`exp === 7 && pre === 7`, not `exp === pre`) is what
makes it fail there: `0 === 0` is true in exactly the state the assertion exists to reject, and
strengthening it moved the control from 6 of 9 failing to **7 of 9**. The control run is the only
way that shows up, and knowing *which* assertions survive the broken state is the whole value of
running it. The two that legitimately still pass are the guard-is-grayed one (vacuous there, and it
is the assertion that caught the mid-fix regression above) and "the injury prints the words the book
printed for it" — an untaken `<if>` prints its words grayed, so that text is in the DOM either way.

Worked 2026-08-23 (implementation pass, task 291): closed **291** — the Nagil trial no longer writes
the god before the die is rolled. Two lines of markup, thirteen assertions, and nine of them fail
against the unsentinelled files. The suite moves `RESULT ALL PASS pass=2828 fail=0` → `pass=2841
fail=0`; `books/` changed, so this is a data rebuild. 290's checklist line also moves into **Done**,
which its own commit left in the HIGH bucket. Nothing new filed — 292 and 293 came out of the split
above, before this was worked.

**The broken state contradicted itself on the next render, and that is what the assertion caught.**
The expectation was that a pre-roll award would simply be an early award. What actually happens is
worse: §2.270 opens with `<if not="t" safeAddGod="Nagil">` ("not possible if you are already an
initiate") over an `<else>` holding the trial, so writing Nagil on entry makes that first branch
TRUE on the following render — the trial and its result go grayed and the page tells the player they
cannot become an initiate of the god it just gave them. The assertion reads the branch's own
`.cond-inactive` state rather than the God box alone, which is why it fails for that reason instead
of passing on a technically-present god.

**The seed pair was chosen from the PRNG rather than guessed, and it is pinned.** One die and Rank 3
needs a roll strictly under and strictly over 3; seeds 9 and 2 give 2 and 5. Both are asserted
before the branch is driven, so a change to `seedRng`/`rollDice` fails as "seed 9 no longer rolls a
2" and not as a mystery in the Nagil branch three assertions later — the habit task 278's block set.

Worked 2026-08-23 (implementation pass, task 293): closed **293**, and with it **every open
bucket** — the next work comes from [`ROADMAP.md`](ROADMAP.md). §3.40's editorial reroll note is no
longer offered before the roll it describes, and a `<reroll>` control anywhere in the corpus is
disabled until there is a roll for it to throw away. The suite moves
`RESULT ALL PASS pass=2875 fail=0` → `pass=2883 fail=0`.

**The filing offered three answers; reading the code deleted one of them and suggested a fourth.**
"Drop the `lessthan="5"` and let the note stand unconditionally" is not safe: `renderReroll` deletes
the stored roll and rerenders, and `blessingSpendForReroll` finds no `<lose blessing hidden>` in
§3.40, so nothing is charged. That guard is the only thing confining the free reroll to a 2-4
result — without it the note also shows after a 5-8 or 9-12 roll, with a live button that rerolls a
peaceful voyage as often as the player likes. The fourth answer is that **nesting is AND**: one tag
ORs its recognised attributes, but a nested pair conjoins, which is the shape task 294 had just
finished removing from §4.257 and the shape this section needed *adding*. `<if var="x"
greaterthan="1">` around the existing `<if var="x" lessthan="5">` reads as the printed range 2-4, is
false at an unrolled 0, and needs no engine change at all.

**Both halves were kept, and the control run shows they cover different sections.** Reverting only
the markup leaves the note rendering `live+disabled` before the dice — live prose, which is the
filing's headline defect, with the button held by the engine alone. Reverting only the engine gate
leaves §4.287 and §5.19 armed: both print "if you haven't got the book listed, roll again" as loose
prose *under* their outcome table, with no guard at all, so the walk reaches it on entry. Six of the
nine `<reroll>` sections were already safe — inside an `<outcome>` row, or under an
`equals=`/`greaterthan=` guard that cannot match an unrolled 0 — and none of them changes.

**291's census needed a tag stack to tell the truth, because nesting is exactly what it could not
see.** Matching each opening tag alone, it still reported §3.40's inner `lessthan="5"` — a guard no
unrolled visit can now reach. It now walks with an enclosing-frame stack (task 273's census in the
same file does the same) and skips a guard whose ancestor on the same var cannot match at 0. Only
`if`/`elseif`/`while` shut their children: a var-keyed `<outcome>` row is unreachable pre-roll too
(task 50's `branchResolved` waits for the write), but no shipped section is written that way, so it
stays reported — over-reporting sends a human to look, where under-reporting hides a live branch,
which is the failure the census exists to catch. Both halves are driven over fixtures beside the
pin, so its **zero** cannot come from a census that quietly stopped matching.

**One thing checked and left alone.** A 2-4 roll reveals a live `Continue → 84` into book 9, which
is unpublished. That is deliberate and already documented: a branch's `book=` asks the shared
edition gate on the CLICK rather than at render (task 244, `revealBranch`). It is pinned in the
assertion so the note's premise — that the reroll beside it is the way forward — reads as a fact
about the page and not an oversight.

Worked 2026-08-23 (implementation pass, task 294): closed **294** — §4.257's chain routes on ONE
derived count, `<set var="passed" success="s|m">`, whose three values are mutually exclusive *and*
exhaustive, so §413 is reachable and each of the section's three printed sentences stays in exactly
one arm. The two mixed pairs now route there instead of reaching nothing; the two matched pairs go
where 292 pinned them. `books/` changed, so this is a data rebuild. The suite moves
`RESULT ALL PASS pass=2862 fail=0` → `pass=2875 fail=0`. 292's checklist line moves into **Done**,
and the HIGH bucket is empty for the first time since 289.

**The filing offered two answers and both were tried; the arithmetic one is worse than it reads.**
`(s+999)/1000` does work — `evalExpression`'s truncating integer division makes it 1 for a margin of
1 or more and 0 for 0 or less — and it needs no engine change at all, because `provisionalVarClosure`
already follows `set[var][value]`, so §4.257's gate would have kept working untouched. That is a real
advantage and it was still declined: the expression's correctness rests on a bound nothing states
(no margin reaches ±1000), and a reviewer cannot read it. So the engine gained the readable
spelling instead — `<set var="D" success="V|W">`, the number of the named roll-result vars holding a
success, where "success" is `> 0`: the rule `<difficulty>`/`<rankcheck>` already store their margin
by, and the one `branchSuccess` already reads for a `<success var=>` branch. One attribute, one
new function, no new grammar.

**A pipe list rather than a boolean, because the section needs a COUNT and the boolean form needs
three `<set>`s to build one.** `success="s"` reads 1 or 0, so the list form is a strict
generalisation of the single-var one and the corpus's own `a|b` idiom; spelling it that way turns
three hidden nodes and three invented var names into one of each. Only a count makes the chain
writable at all: a decision tree over the two margins has four leaves and the "if one roll was
successful" sentence sits at two of them, which is the printed text twice.

**The trace change is the load-bearing half, and the control run proves it.** `success=` is a var
READ exactly as `value=` is, so `provisionalVarClosure` and `setPending` both consult it through one
new helper (`setReadVars`). With that helper narrowed back to `value=` alone, ten assertions fail
and the first of them is `374[ON]` on entry — §4.257 loses its gate outright and **292's defect is
back**, because the condition now names `passed` and reaches the two rolls only through the `<set>`.
The same helper is what holds the count unwritten until both dice are thrown; a count that read 0
early would put the both-failed exit back on the page. Reverting only the markup fails five
assertions, including the corpus census, which reports `4/257 m`.

**The census found the shape once in 4,369 sections, so no wider repair is warranted.** An if/elseif
chain whose outer comparators are exhaustive over one var — leaving a dead `<else>` — occurs in
§4.257 and nowhere else, measured over the parsed corpus rather than the XML text, since the shape is
about sibling arms and nested children. It is pinned at **zero**, with a two-fixture assertion beside
it (§4.257 as written, §4.257 as repaired) so the zero cannot come from a census that quietly stopped
matching. 291's own census loses both its §4.257 hits and now names only §3/40, task 293's.

Worked 2026-08-23 (implementation pass, task 292): closed **292** — the roll gate has a fourth
seed, the mandatory roll whose result a CONDITION reads, and §4.257's three exits are held until
both its Difficulty-14 rolls are thrown. **28 shipped sections gain the gate, measured before the
seed was committed and pinned in `suite-corpus.js`** — twenty of them the "roll higher than your
Rank" pages, whose exit was live beside the undecided die, and §4.257/§5.343/§5.432 the sharper kind,
where an `<if>` arm's own `<goto>` was clickable on entry. `books/` is untouched, so this is a stamp,
not a data rebuild. The suite moves `RESULT ALL PASS pass=2841 fail=0` → `pass=2862 fail=0`. 291's
checklist line also moves into **Done**, which its own commit left in the HIGH bucket. Filed **294**.

**One seed, but the first that awaits more than one roll — and the single-roll version passed every
assertion the filing asked for.** `computeRollGate` named ONE `rollNode` and read ONE `rollPath`, so
the gate lifted when *whichever* of §4.257's two rolls the player made first resolved. Entry was
then correct and the intermediate state was not: fail the SCOUTING roll, leave MAGIC unrolled at 0,
and the "if both rolls failed" arm matches again — the original defect, one click later. The filing's
assertion list ("driven on entry … then each pair of roll outcomes") does not reach that state; a
per-pair drive that clicks one button and looks does. So the gate now carries `rollNodes`/`rollPaths`
and holds until every awaited roll has resolved, and the census pins that §4.257 is the only shipped
section with two of them — a table matches one row, an effect owes one magnitude and a branch belongs
to one check, so seeds 1-3 each still name exactly one and their behaviour is unchanged.

**Driving all four pairs is what found task 294, and only the fourth pair shows it.** Both-succeed
routes to §216 and both-fail to §374, exactly as printed. A MIXED pair reaches **no exit at all**: the
chain's outer arms test `m` alone and `m > 0`/`m < 1` are exhaustive, so the `<else>` holding "if one
roll was successful" is unreachable and §413 can never be reached — the page renders
`216[OFF] 374[OFF] 413[OFF]` and the renderer draws its "Your tale ends here" fallback. That is a
worse outcome than the defect 292 fixed, on the same section, and it is filed rather than folded in
(294): 292 owns *when* an exit may open, 294 owns *which*. The two mixed pairs are pinned here as
they behave today, with the assertion naming 294 so that task inverts them rather than discovering
them.

**The control run failed 10 of the 21 new assertions, and the ones that survived are worth naming.**
The corpus census, every synthetic seed assertion with a positive expectation, and the three §4.257
state assertions (gate shape, entry, one-roll-made) fail with the seed disabled — including
`374[ON]` on entry, the defect reproduced. The eleven that pass are the whole negative half of the
seed block (a roll no condition reads, a `force="f"` check, a pay-to-spin die, a `<group>`-wrapped
roll, a codeword guard: `null` either way, so they only ever guard against the seed *widening*), the
two both-matched routing assertions (the destination was always right, only its timing was wrong),
the two task-294 pins (independent of the gate), "both margins read 0 on entry" (the broken state's
own fact, kept because it is the premise the whole defect rests on) and "each earlier seed still
awaits exactly one roll" (an invariant of the generalisation, true before it). Knowing which is which
is the point of running it — and the control earned one fix of its own: the census's second assertion
dereferenced the gate it had just failed to find, so a *missing* gate reported `FATAL [corpus]` and
took the rest of the suite's corpus assertions with it. Made null-safe, it now says
`no gate on 4/257`.

**`conditionPending` and the new seed now read the same list.** "This condition reads a roll's
result" is asked in two places — by the refusal that holds an undecided branch (render-rules.js) and
by the gate that holds the exits until the roll is made — so the attribute list and the var
extraction live once in `render-gates.js` (`CONDITION_VALUE_ATTRS`, `conditionVars`) and are imported
back, the arrangement `EFFECT_MAGNITUDE_ATTRS` already uses for seed 2. The bar is traced as well as
the subject, which is what catches §5.315's `lessthan="pre"` shape where the roll is the bar.

Split 2026-08-23 (same pass, before any of it was worked): **291** as filed named four sections and
one fix. Driving each of the four in a real `Story` — rather than trusting the shared trigger —
turned up **three different correct answers**, so it is now 291 (the two Nagil sections, a
two-line sentinel), **292** (book4/257, where no sentinel can work and the roll gate needs a fourth
seed) and **293** (book3/40, LOW, where the sentinel that fixes the others *opens a live exit*).

**A shared trigger is not a shared fix, and the filing had already assumed it was.** All four hit
the same predicate — a `lessthan=` guard reading a roll var at 0 — and the filing offered exactly
two options for all four, markup or engine. §4.257 admits neither: a `<difficulty>` margin has no
out-of-range "not yet rolled" value, and some arm of an if/elseif/else chain always matches, so a
sentinel can only move which exit is wrongly live. §3/40 is worse than that — the sentinel *works*
and is still wrong, because an applied `<set>` marks its var written and `branchResolved` then
reveals the `<outcomes>` row it feeds: driving the "fix" put **`Continue → 59[ON]`** on the page
before the dice. The general rule that falls out is worth more than either fix: **a sentinel is
only safe on a var no `<outcomes>` table reads.** §6.628 and §5.315 satisfy that; §3/40 does not.

**The engine alternative was censused rather than argued, and the numbers are why it was declined:**
138 readers over a roll var across 112 sections change how they resolve pre-roll; 8 sit in a chain
whose `<else>` activates pre-roll today and would be held; 21 have every writer of their var inside
a conditional they sit outside, so a branch never taken would hold them pending forever (all but
book3/149's `<if x>` already gate on the write through `branchResolved`). Two lines of markup
against that is not a close call — but the seed §4.257 needs (task 292) is an engine change either
way, so the census is recorded there rather than thrown away.

Filed 2026-08-23 (census pass, no code changed): **290** — a `var=` census run in the direction
task 278's could not go. 278 asked which `<training>` nodes carry a `var=` (1 of 62, and it fixed
the writer); this asks which `var=` *readers* name a variable their own section never writes, which
is a set the writer-side count cannot produce. One hit across the shipped corpus, and it is the same
`<training>` family — book5/315, whose crippling-injury branch is guarded by an unwritten `exp` and
so has never rendered. **A fix's own census is scoped to the shape the fix touched**, and the twin
of a defect can sit one predicate away from the pass that closed it. The reader-side predicate is
cheap, section-local (vars are cleared on entry) and belongs in `suite-corpus.js` as a pinned zero;
nothing else was filed and nothing else in the corpus reads an unwritten var.

Worked 2026-08-18 (implementation pass, task 289): closed **289** — `<lose staminato="N">` now moves
the score in **both** directions, and the `<set>` that feeds book1/297's restore survives the fight
that would otherwise erase it. The suite moves `RESULT ALL PASS pass=2800 fail=0` → `pass=2819
fail=0`; `web/` only, so the change is a stamp and no data rebuild. 288's checklist line also moves
into **Done**, which its own commit left in the LOW bucket. Nothing new filed.

**The filed fix was half the bug, and the half it named could not be seen from the engine.** Making
`staminato` heal is four lines, and every unit assertion for it passed immediately — restore up,
restore from 0, no-op at the target, clamp at `effectiveStaminaMax()`, the `var` form. §1.297 still
kept the wound. `<set var="prestamina" value="stamina"/>` is classified `rerunnable`
(`render-rules.js`, task 61: an absolute `<set value=>` re-evaluates every render so a var derived
from a roll updates when the roll resolves), and `render-combat.js` rerenders on **every round** —
so the padded bout overwrote the pre-fight snapshot with the wound as it was being inflicted, and
`staminato="prestamina"` then correctly restored the player to exactly where they already were. Two
independent mechanisms, each defensible alone, composing into one silent death.

**`stamina` is the input a section moves under its own feet, which is what makes it the exception.**
The freeze is narrow on purpose: a `<set value=>` whose expression reads the bare `stamina` keyword
(word-bounded, so `prestamina` is untouched; `modifier=` forms read the unwounded max and were never
rerunnable) applies once per visit. That is 2 of the corpus's 3 stamina-reading `<set>` nodes and
0 of everything else, so task 61's rule is otherwise exactly as it was.

**The second node the freeze reaches was a free permanent stat gain, and only the negative control
found it.** book3/104 snapshots `curr` before a `<rest>` heals you, compares it to `max` to set
`wounded`, and gates "if you were **not** wounded you can permanently increase your Stamina by 1-6"
on the answer. Re-evaluating `curr` after the heal flipped `wounded` to 0 and opened that branch —
measured with the fix disabled: enter §3.104 at 5/12, take the rest, and the sheet reads **17**.
Nobody filed it; it fell out of asking what else the one-line rule change touched.

**The control run is the method, not a formality — my first §3.104 assertions passed without the
fix.** They asserted `curr`/`wounded` across a rerender, but the section's `<rest>` is a control the
player takes, not an on-entry heal, so with the score unmoved the re-evaluation was a no-op and the
block proved nothing. Task 288's log says to look for an assertion that *fails* in the broken state;
the cheapest way to actually know is to break it and watch. Both §1.297 assertions and both
classifier assertions failed as expected — §3.104's did not, and that is the only reason the real
one exists.

Worked 2026-08-17 (implementation pass, task 288): closed **288** — task 191's seven header frames
inline the stylesheet fetched once at the top of the block instead of `<link>`ing it, so the frame's
`load` event is an exact barrier and there is no subresource left to race. Nothing outside
`web/tests/` changed, and the stamp deliberately excludes the harness (`stamp-version.ps1` skips
`_test.html` and `web/tests/`), so this pass moves no build stamp at all — the first task in a while
whose correct outcome is an unchanged `version.js`. The suite moves `RESULT ALL PASS pass=2799
fail=0` → `pass=2800 fail=0`; nothing new filed.

**The passing run is itself the proof.** The two assertions that flaked — the glyph list and the
44px touch target at 320/360px — are exactly the two that cannot pass without the stylesheet
applied, so a green run of this block is a positive statement that every frame was styled when it
was measured. That is the check to keep in mind for the class: when a fixture races a subresource,
look for an assertion that *fails* in the unsynchronised state, and if every assertion in the block
would pass vacuously there, the block has no barrier at all — it just has not been unlucky yet.

Worked 2026-08-17 (filed from a run, no code change): filed **288** — task 191's narrow-header block
measures an iframe across an unsynchronised stylesheet load and can fail intermittently with the two
assertions that depend on the stylesheet, while the other two in the same block pass vacuously.
Nothing in the app is involved; the fix is to inline the fetched `style.css` into each `srcdoc` so
the frame's `load` event is an exact barrier. Left OPEN and unfixed: the failure is loud rather than
silent, and it was seen once, so the fix wants a run of its own rather than riding on the pass that
found it. **Filed as a defect in a test, which this backlog has not had before** — the previous
entry's lesson was that a test can pass while the app is wrong; this one is that a test can fail
while the app is right, and the tell is the same in both directions: read what the assertion's own
output *means* before reading it as a verdict on the change in hand.

Worked 2026-08-17 (user report, filed and closed in one pass, task 287): closed **287** — the Rules
dialog opened at its last line with no exit in view. `mountDialog` focuses with `preventScroll`, and
`modal()` grows a sticky `.modal-head` carrying a ✕ on every dismissable dialog. The suite moves
`RESULT ALL PASS pass=2793 fail=0` → `pass=2799 fail=0`; `web/` only, so the change is a stamp and
no data rebuild. 286's checklist line also moves into **Done**, which its own commit left in the LOW
bucket.

**A defect no test could have caught, in code the tests cover heavily.** Task 177's block asserts
the whole dialog contract — initial focus, the trap, the freeze, the restore — and every assertion
still passed while the dialog opened at its own last line, because `web/_test.html` loads no
stylesheet: with no `max-height`/`overflow-y` there is no scroll container, and `scrollTop` is 0 for
the trivial reason. **A DOM-only harness cannot see a bug whose cause is a layout property**, so the
new assertion brings its own geometry inline rather than waiting for CSS the page will never load.
That is the pattern for the next one: if the behaviour under test needs layout, the fixture has to
carry it.

**The two symptoms had one root, which is why the ✕ is not just a button.** Focus scrolled the box
to the bottom *because* the only control was at the bottom. Anything that makes the top of a long
dialog self-sufficient — a header exit — is the same fix as suppressing the scroll, and the pair is
what makes the dialog usable from the first line. Worth remembering where a "cosmetic" report and a
"behavioural" one arrive together: they were one bug reported twice.

Worked 2026-08-16 (implementation pass, task 286): closed **286** — the group's one picker becomes
the group's one *question*, with an ability arm and a fixed-count forfeit arm — and filed nothing
new. The suite moves `RESULT ALL PASS pass=2776 fail=0` → `pass=2793 fail=0`; `web/` only, so the
change is a stamp and no data rebuild.

**Both arms are inert for the shipped corpus, and that is the deliverable.** The suite's own census
pins **0** and **0**, so nothing in six published books renders differently — this closes a latent
case before something authors it, which is task 228's shape rather than task 229's. The value is in
the pin: the two census assertions are tripwires, and a section arriving in either list is a page
whose printed choice the app would otherwise ignore.

**Re-pinning task 229's assertion cost more thought than the fix did.** Deleting it would have lost
the rule it was really defending (a rolled count stays engine-chosen); leaving it would have failed.
The var form needs a var, and a group's classification happens on the render — so the `<set>` goes
*outside* the group, where the walk reaches it first. That is worth knowing generally: a bundled
`<random>` writes its var on the roll path, but a plain group is classified before its own button is
ever clicked, so anything its plan reads must already be written.

Filed 2026-08-16 (filing pass, no task open at the time): filed **286** (LOW) — a `<group>` never
asks which ability an open `ability=` spec takes, and its forfeit picker skips a count the page
states. Documentation only; no code, no stamp, and the suite is unmoved at `RESULT ALL PASS
pass=2776 fail=0`. 285's checklist line also moves into **Done**, which its own commit left in the
MEDIUM bucket.

**This is task 285's census run once more, over the one control it could not see.** That census —
the engine's `opts.chooser` hooks, asking which the view supplies — is a question about *renderers*,
and it was answered renderer by renderer. `renderGroup` is not one renderer: it is a control that
applies an arbitrary bundle, so "does the group supply a chooser?" has as many answers as there are
hooks in `applyEffect`, and task 229 answered it for exactly one of them. **Where a single control
applies a whole body, census the body's tags against the hooks, not the control against the
question.** The ability hook was the miss; `<transfer>`'s and the blessing one are worth the same
look the moment a group is authored carrying either.

**The second half is a lesson about an exclusion's evidence.** Task 229 skipped every `multiple=`
forfeit and gave a *correct* reason for it — §3.273's rolled count cannot be asked about — but wrote
the skip as `hasAttribute('multiple')`, one generalisation wider than the evidence. Its own test
then pinned the wider rule with a **fixed** `multiple="2"` fixture, so the assertion documents a
case the argument never made. An exclusion is worth re-reading against the sentence that justified
it: the fixture is where the drift shows, because it has to name a concrete value the prose left
abstract.

Worked 2026-08-16 (implementation pass, task 285): closed **285** — the fifth chooser hook now has
a view that supplies it — and filed nothing new. The suite moves `RESULT ALL PASS pass=2756 fail=0`
→ `pass=2776 fail=0`; `web/` only, so the change is a stamp and no data rebuild.

**The fix is smaller than the finding, and that is the point.** No new picker widget: a
`needsBlessingChoice` predicate beside `needsForfeitChoice`, one `blessing-choice` line in
`classifyPassive`'s cascade, and a `renderBlessingChoice` that open-codes the same
`.ability-choice` row `renderEquipmentChoice` and `renderProfessionChoice` already do. The filing
suggested `story.appendAbilityPicker`, but that helper labels through `ABILITY_LABEL[ab] ||
ab.toUpperCase()`, which prints a blessing key raw — "STORM" where the book says "Safety from
Storms". The two siblings that also carry non-ability labels open-code the box for exactly that
reason, so this is the third, not a new pattern.

**Placement in the cascade was the only real decision.** `needsAbilityChoice` sits ABOVE the
fight gate and `needsForfeitChoice` deliberately below it, so a loss written after a `<fight>`
stays held rather than committing through a picker on a branch that may never be taken. A blessing
is a forfeit off the sheet, not an ability point, so it went below — even though no corpus node
can tell the two placements apart today (all three live in plain prose or a travel outcome). The
comment says which of those two it was copying, so a future node in fight prose lands the way the
rule intends rather than the way the corpus happened not to test.

**And the order of the fixture's own setup is the assertion.** Every probe holds two blessings in
a named order and picks the *second*; a single-blessing fixture would have shown the correct
blessing leaving and read as a pass, which is why nothing before this caught it.

Filed 2026-08-16 (filing pass, no task open at the time): filed **285** (MEDIUM) — a
`<lose blessing="?">` effect commits with no picker, so book4/641's printed "(your choice)" takes
whichever blessing was acquired first. Documentation only; no code, no stamp, and the suite is
unmoved at `RESULT ALL PASS pass=2756 fail=0`.

**The census runs the opposite way to 279's and 284's, and that is the whole finding.** Those two
asked "which renderers call the pickers we have?" and adjudicated four gaps as unreachable — a
sound sweep, and it cannot see a currency with **no** picker. `applyLose` takes `opts.chooser` for
five things (ability, item/equipment, cargo, profession, blessing) and the view supplies it for
four; the fifth was never on any list because there is no cold call site to find. So: **census the
engine's chooser hooks and ask which the view supplies**, rather than censusing the view's picker
calls and asking which fire. It costs one grep for `opts.chooser` in `engine.js`.

Measured before filing, on a real `GameState` rendering book4/641 through `Story`: two blessings
held in one order and the other, same page, opposite blessing taken, no picker drawn either way.
**A picker gap is the one defect class where the order of the fixture's own setup is the
measurement** — a single-blessing probe would have shown the correct blessing leaving and read as
a pass.

Worked 2026-08-16 (implementation pass, task 284): closed **284** as **unreachable — the outcome
is a comment**, and filed nothing new. The suite stands at `RESULT ALL PASS pass=2756 fail=0`,
unmoved: the only code change is the extended sweep note in `render-rewards.js`, plus the build
stamp it moves.

**The census 279 never ran on this branch says no shipped section can reach it.** Working the
filing's step 1 back from `classifyPassive`: `'payment'` wants a non-hidden `<lose>` with no
`price=`, in a section holding an optional `<goto>`, and `isEconomicPayment` admits only
`shards`/`item`/`cargo`/`ship` — so the open `"?"`/blank spec `losePaymentPlan` needs for
`needsChoice` has to sit on `item=` or `cargo=`. That rules the equipment kinds out **twice
over**: `weapon`/`armour`/`tool` alone make `isEconomicPayment` false, and all **10** open ones
in the corpus (§1.354, §1.370 ×2, §2.90 ×2, §2.290, §5.386, §6.36 ×2, §6.135) carry no economic
attribute to rescue them. `shards` and `ship` never report `needsChoice` at all.

That leaves **38** priceless open `item`/`cargo` forfeits across **37** shipped sections, and
**exactly one** sits in a section with an optional goto: **§6.496**, "if you refuse to hand these
over, turn to 291". Its `<lose item="?"/>` is inside a `<group force="t">`, so `renderGroup`
takes it as one of `plan.effects` and it never reaches `classifyPassive` — and its picker is
already `groupForfeitChoice`, which names §6.496 in its own comment (task 229). The one section
whose page says "decide which item you are handing over" is served by a *different* call to
`showForfeitPicker` than the one under audit. §2.90/§4.456/§5.152 — 279's open-forfeit costs —
all carry `price=`, so they route to `optional-pay`/`choose-one` above the payment gate.

So the 279 block gains a fourth case, phrased in the same terms. It differs from the other three
in kind, and that is why the sweep missed it: those are pickers a renderer **never calls**, this
is a call that **exists and never fires**. 279's shape was "which renderers ask?" — a question
`renderPayment` answers *yes* to, which put it on the safe side of the list while one of its two
`showForfeitPicker` call sites was as dead as the renderers that ask nothing. **The lesson for
the next sweep: ask per call site, not per renderer.**

Worked 2026-08-16 (implementation pass, task 283): closed **283** as **measured, and the number
was wrong twice over**; filed **284** (LOW). No app or suite code changed — the whole task is a
measurement — and the suite stands at `RESULT ALL PASS pass=2756 fail=0`, unmoved.

Rebuilt the throwaway `web/_coverage.html` (deleted again) with the filing's first fix: key each
`click` registration by the **pair** (registrar frame, caller frame) — the first two `/web/js/…`
frames of `new Error().stack` — instead of the registrar alone. The registrar roll-up is kept
alongside so the new run is comparable with the old, and it reproduced 282's finished state
exactly: **71 frames, 0 cold**. Under pair keying: **99 pairs, 18 cold**.

**The seven-caller split is real, and all seven are accounted for.** `rollButton` showed exactly
the seven caller frames 283 predicted from static reading, and `makeFleeButton` exactly two — so
**78 controls behind 71 frames** is confirmed as measured, not inferred. Three of the seven are
cold: `render-rolls.js:262`, `:324` and `:349`. All three are the same thing — the
`gated && !armed` arm of `<difficulty>`/`<random>`/`<rankcheck>`, which builds the button with
`onRoll = () => {}` and immediately sets `btn.disabled = true`. **Cold by construction**: an
unclickable control whose handler is a deliberate no-op, and whose *rendered* state is already
asserted both ways by `suite-render`'s `gatedCases` (disabled unpaid, armed on payment) and by
`suite-combat`'s task-51 block. Both `makeFleeButton` callers are warm. So the honest tally is
**78 controls: 74 warm, 3 unclickable-by-design, 1 that never renders at all** (below).

**The other 15 cold pairs are all artifacts of the new keying, and the pattern is worth recording
so the next run does not chase them.** Every one has a warm sibling with the same registrar — the
same handler source reached down a different call path — in two flavours. Ten are a renderer
called both directly and from its own in-place redraw: `render-combat.js:371/:418/:429` are
`drawFight` reached from `renderFight` (`:63`) or from its `redraw` (`:332`), `:314` the same for
`drawGroupFight`, `render.js:907` the end-fate fallback reached from four render paths, and
`render-rolls.js:451` `revealBranch` from either of its two call sites. Five have a caller frame
of `-`: the stack held **one** `/web/js/` frame because an `await` upstream truncated it, so the
identical call site appears twice under two shapes (`ui.js:195` registers twice via `app.js:783`
and twice with the frame gone). **Pair keying trades a false-warm for a false-cold**, and the
false-colds are mechanical: a cold pair whose registrar has a warm sibling is only interesting
where the caller supplies the *handler*, which is `rollButton` and `makeFleeButton` and nothing
else. Judgement, not a filter — the discriminator (does the registrar close over a
caller-supplied callback?) is not observable from outside.

**The count check 282 recorded as "consistent, not proof" was a coincidence, and it hid the thing
it was quoted as ruling out.** 71 static in-scope sites against 71 observed frames — but one
observed frame is `app.js:837`, the sheet backdrop, which registers because `suite-economy.js`
imports `installSheetDrawer` from `../js/app.js`. `app.js` is therefore not wholly out of scope
(1 of its 19), only **70** in-scope sites ever register, and the diff names the missing one:
**`render-rewards.js:445`**, `renderPayment`'s open-forfeit arm. That is 281's stated blind spot,
proven rather than suspected, and now known to be the only in-scope instance. Filed as **284**,
with the reachability census 279's sweep never applied to it — 279's note lists `renderPayment`
among the renderers that *do* ask `showForfeitPicker`, so this branch fell outside that sweep.

Two conclusions for the method. **The pair list is the honest denominator and the frame list is
the honest one to diff** — the split found the real controls, the diff found the real gap, and
neither would have been found by the other. And **a coverage probe over registrations still only
bounds what is untested from below**: the diff closes that gap for the seven view modules today,
but only because the static line list is a cheap independent census. Where no such census exists,
the bound stands.

Worked 2026-08-16 (implementation pass, task 282): closed **282** and filed **283** (LOW).
Rebuilt 281's throwaway probe (`web/_coverage.html`, deleted again) and ran
it first as a baseline: it reproduced the filing exactly — **71 sites, 6 cold**, at the same six
`/web/js/…:line:col` frames and the same registration counts. Seventeen assertions later it
reports **cold 6 → 0** with the suite at `RESULT ALL PASS pass=2756 fail=0` (from 2739). Measuring
before and after is the point: the count is what proves the new assertions reach the handlers the
task named rather than merely passing.

The filing's premise — "an assertion has to drive a control *outside* the story container, and
nothing in `web/tests/` does that yet" — was **half wrong, and the wrong half is why these six
survived 281**. The suite already drives `document.body` dialogs: task 112's curse-Lift and
task 133's rerender both click a `.modal-overlay .modal-buttons .btn` and `await` a settle. The
capability was there; what was missing was reaching for it from a *renderer's* test, where the
established habit is to query the story container the fixture owns. So no new harness was needed
and none was written — every one of the six is driven with the idiom already in the file.

What each one now asserts, and what it was worth:

- **`render-market.js:422`** (`suite-economy`, §3.538 — the corpus's only `<sell cargo>`): the
  captain's barter, driven three ways. Two commodities aboard and the click asks which hold to
  break into, then the chosen Unit leaves and the linked `[flag=x] <buy cargo="minerals">` reward
  arrives (`timber,furs` → `furs,minerals`) — the reward side had never been exercised through
  the click that applies it. A single-commodity hold resolves with **no modal at all** (asserted
  by overlay count, not by absence of a click), and an empty hold leaves the offer disabled with
  the task-89 title. The one-shot memo is checked on the rerender, not just in the state.
- **`render.js:999`** (`suite-inventory`, §3.75): the `<image>` link opened its modal and the
  assertion reads the `figure.illus img` src back through `decodeURIComponent`, which is the part
  that matters — the filename carries spaces and the encode is the thing that could rot.
- **`render.js:1574`** (`suite-engine`, §5.114): the oracle *link*. `openSectionView` was already
  called directly further down the same block, so what was untested was the only route a player
  has to it.
  It waits for the first vision to land before judging — the reveal is the step that would touch
  state if anything did — then asserts the whole of `data`, the current section, the history and
  `navigate` are all exactly as before.
- **`ui.js:293`** (`suite-inventory`, §186): every `setEquipped` assertion in that block called
  the rule directly, and the only sheet the block rendered was §6.135's **locked** one, where all
  the controls are disabled — so the button was covered precisely in the state where it cannot be
  pressed. An unlocked sheet now shows the wielded blade pressed (`aria-pressed`) and the other
  live, and clicking Wield moves the wield, drops the Jade Defender's +3 aura and fires
  `onSheetChange` once.
- **`ui.js:307` and `ui.js:310`** (`suite-inventory`, the reorder block): ▼ and ✕. ▲ was warm
  through task 133's `onSheetChange` unit and ▼ cold, though the two are written as one control.
  Drop is asserted both ways — Cancel keeps the item and fires nothing, Drop removes it — because
  a confirm dialog whose Cancel is untested is a dialog you cannot trust.

One property of the probe worth recording for whoever runs it next: **it is stable enough to
diff**. Two independent runs a change apart agreed on `sites=71` and on the identity of every
cold frame, so the cold list is a comparable measurement and not a sample.

That reliability is what made the second look worth taking, and it turned up **283**: the probe
keys a site by the frame that *registers* the listener, so a shared helper that attaches a
caller-supplied handler shows its callers as one frame. `rollButton` has **seven** callers behind
`render-rolls.js:33`, and `makeFleeButton` two behind `render-combat.js:188` — **78 controls
behind 71 frames**. The sting is that this hides precisely the shape of gap the sweep was started
to find: task 278's cold `<training>` roll button is one of those seven, so a probe run before 281
would have called that frame warm. Nothing 281 or 282 covered is retracted — only the
denominator, and the confidence "cold 0" invites. The blind spot 282 recorded (a handler on a
branch the suite never *renders* never appears at all) looks, on a count taken this pass, not to
be biting: the seven view modules hold exactly 71 static `addEventListener('click'` sites against
71 observed frames, with `app.js`'s 19 out of scope. Consistent, not proof; 283 says how to
settle it.

Worked 2026-08-16 (implementation pass, task 281): closed **281** and filed **282** (LOW).
Instrumented as the filing suggested rather than read statically, and the instrumentation is what
made it worth doing: a throwaway `web/_coverage.html` (deleted again) wrapping
`EventTarget.prototype.addEventListener`, keying each `click` registration by the `/web/js/…`
frame of `new Error().stack` and counting firings. **71 handler sites, 9 never fired.** Three
covered here, six filed as 282. `RESULT ALL PASS pass=2739 fail=0` (from 2724: +8 roll parity,
+5 at task 151, +2 at §6.512), and the probe re-run on the finished tree reports **cold 9 → 6**
with exactly the three targeted now warm — which is the check that the new assertions do the
thing the task was about, and not merely pass.

The three closed, each a genuine hole rather than a technicality: **`render.js:907`**, the
"accept your fate" dead-end fallback — registered **148 times** across the suite and clicked by
nothing, though it is the only way out of a section with no live control; **`render-rewards.js:447`**,
`renderPayment`'s plain commit, so no assertion had ever *paid* a forced economic payment (the
task-151 block builds one and deliberately cannot afford it, and every other `.pay-action` click
in the suite lands on `renderOptionalPay`/`renderChooseOnePay`); and **`render-market.js:672`**,
the item cache's money Withdraw, whose Deposit twin was covered — §6.512's cabinet could be paid
into and never drawn from.

Both of the filing's suggested fixes were taken. `rollBtn` now matches on structure
(`.roll .btn-roll`) instead of `/Roll|Rank check/`, which retires the local `trainBtn` task 278
had to add, and a new **`rollCases`** list joins all four roll tags in a body that clicks —
separate from `gatedCases`, which only the gated three can join and which was the only clicking
list before.

**Two things this method taught that the static reading in the filing could not.** First, the
sharpest result was a *pair*: the Adventure Sheet's Move-up is warm and Move-down is cold, both
halves of one control, which no amount of listing handlers per module would have surfaced —
counting firings does. Second, and it belongs in 282 as a caveat on the method: **a handler on a
branch the suite never renders registers zero times and so is invisible to the probe entirely**.
`renderPayment`'s forfeit-picker branch is exactly that, and it does not appear in the cold list
or anywhere else. A coverage report over registrations can only ever be a lower bound on what is
untested.

Worked 2026-08-16 (implementation pass, task 279): closed **279** as **checked, clean — five
gaps of exactly 277's shape, every one unreachable**, so the deliverable is five comments and no
code change. `RESULT ALL PASS pass=2724 fail=0`, node-import clean, stamp only. The four
families, with the call-site count against the family size:

- **`render-rewards.js`, choosers (`appendFxWords` 1-of-4)** — only `renderForfeitChoice` calls
  it; `renderAbilityChoice`/`renderEquipmentChoice`/`renderProfessionChoice` open-code the same
  span and so skip `fillDefaultWords` (task 215's default label). Inert, and for a reason worth
  keeping: `defaultEffectWords` returns `''` for exactly the selectors those three route on — an
  `ability=` effect, a `profession=` list, a wildcard possession — so there is no label to lose.
  All 11 corpus nodes on the three routes (8 open-ability, 2 equipment, 1 profession) write their
  own words and carry no second labelled attribute. Two of the three also drop the `fx` class,
  which is an empty CSS rule selected by no JS and no assertion.
- **`render-rewards.js`, payments (both pickers 3-of-5)** — `showForfeitPicker` is missing from
  `renderRollPayment` and `renderForcedOptional`; `showAbilityPicker` from `renderPayment` and
  `renderForcedOptional`. **The three reasons are not the same kind, and one is much stronger than
  the other two.** `renderPayment` can never hold an ability at all: `isEconomicPayment` returns
  false the moment `ability=` is present, so the node routes to `'ability-choice'` — structural,
  and it stays true however the books are edited. The other two are corpus facts and could expire:
  `renderRollPayment` needs an open `?` forfeit whose price key is a roll gate, and the only
  open-forfeit costs (§2.90's weapon/armour, §4.456's two, §5.152's two) sit in sections holding
  no `random`/`rankcheck`/`difficulty`; `renderForcedOptional` needs `force="f"` on an open
  selector, and all 21 `force="f"` `gain`/`tick`/`lose` nodes name a concrete item, codeword, god
  or blessing.
- **`render-market.js` (hooks 1-of-3)** — only `renderShopRow` fires `runSoldHooks`/
  `runBoughtHooks`; the inline `<buy>`/`<sell>` pair never does. The corpus holds two `<sold>`
  nodes, both inside a `<market>` (§3.318 market-level, §3.86 row child), and **zero `<bought>`**
  — task 219 built the documented twin ahead of any node using it — so an inline sell can never
  carry a hook to fire.
- **`render-combat.js` (clean on the named helpers; one gap a rank above them)** — `statsRow`,
  `playerStatsRow`, `logRow`, `makeFleeButton` and `afterAction` are 2-of-2, which is task 171
  holding. The gap is in the *callers*: `renderFight` looks up three section nodes and
  `renderGroupFight` two, so a group fight ignores `<fightround>` (task 99). Disjoint in the
  corpus — `<fightround>` only in §5.24/383/689, every group fight in §6.192/273/291/618.
- **`render-choices.js` (`deadGate`/`targetBook` 1-of-3, and neither is a gap)** — a `<choice>`
  takes its `dead=`/`book=` rulings from `choiceGate`, the DOM-free planner, which is a different
  seam rather than a missing call, and no corpus `<return>` carries either attribute.
  `renderChoice` does duplicate `targetBook` as a local `const` **of the same name**, shadowing
  the module function; identical in result, but it makes `sailThenGo(…, targetBook, …)` read at a
  glance as if the function were being passed. Left alone as out of scope for a comment pass.

**Method note for the next sweep, because the counting is the cheap part and the adjudication is
not.** All five gaps were found in about one grep per module; every one then cost a corpus census
to settle, and the censuses are what the comments record. Two of the five turned on a fact the
call-site count cannot see — `isEconomicPayment` refusing `ability=`, and `defaultEffectWords`
returning `''` for the very selectors its non-callers route on — so **a helper's absence is only
a defect if the node that would reach it can exist**, and that is a question about the *routing
predicate*, not about the family. The comments say which unreachability is structural and which
is merely a corpus fact today, since only the second kind can expire.

Worked 2026-08-16 (implementation pass, task 280): closed **280** as **an undocumented
simplification, now documented — no behaviour change and no regression test**, which is the
call its own filing set up and left to this pass. Comments only, in three places; nothing was
filed. **`RESULT ALL PASS pass=2724 fail=0`** (unchanged, as it must be when no assertion is
added), `node web/tests/node-import.mjs` clean, `stamp-version.ps1` and not a data rebuild.

**The evidence that decided it is in the corpus, not in the layout argument.** The filing framed
the choice as "does the row layout stand", which is a matter of taste; two facts settle it
without appealing to taste. First, **the information is not actually dropped**: `header2=`/
`header3=` are always "To buy"/"To sell"/"Sale price", and this app puts the verb on the button
beside the price — `Buy 60`, `Sell 55` — so every row carries its own column's word already.
That is what makes this *unlike* task 277, whose dropped words had no substitute anywhere on the
page; the rubric match in the filing's own header ("authored words that never reach the page")
is real but the consequence is not, and 277's precedent does not carry. Second, **a fixed pair of
headings would be wrong for some rows**: §4.111's Artifacts block sits under `header2="To buy"
header3="To sell"` and its Shadar scroll row is sell-only, so a "To buy" heading would claim a
column that row has not got. The JaFL spec confirms the shape it was written for — `<trade>` "is
arranged as a table with aligned columns" (`rules/JaFL-XML-Tags.md:834`) — and this app is not
that shape. Census re-ran exactly as filed: **15 `header2=`, 8 `header3=`, 23 across 12 sections**
(§4.111 carries two headers), all in published books, all on `<header>` inside a `<market>`.

**Both riders were settled here too**, as the filing suggested: `<goto visit="t">` (§4.231, 1
node) is commented at `renderGoto` — the spec calls it optional and `renderReturn` walks the
navigation history, so there is nothing for an advance declaration to feed — and `<section
start="t">` (6 nodes, section 1 of each book) at `begin()`'s `todock=` read, where the section
element's own attributes are taken. Both had been checked and passed over before (the 2026-07-16
pass records `visit="t"` as "a spec'd no-op") without leaving a mark in the code, which is
exactly how a census re-finds them; **a decision recorded only in this log gets re-derived, so
the comment is the deliverable, not the note.** Worth carrying for the next such census: the
useful question about an unread attribute is not whether it is read, but whether anything it
would have carried is missing from the page — for all three settled here the answer was no, and
that is a cheaper test than reasoning about the layout it was written for.

Worked 2026-08-16 (implementation pass, task 278): closed **278** and filed **281** (LOW). The
fix is the one line the filing predicted, at both sites `renderTraining` stores a result (the
roll button and the Luck reroll), writing `res.total` and not the `res.margin` its siblings
write; eight assertions in `suite-render.js`, appended to the same task-172 parity block that
holds 277's. JS-only, so `stamp-version.ps1` and not a data rebuild; **`RESULT ALL PASS
pass=2724 fail=0`**, and `node web/tests/node-import.mjs` clean. **The census re-ran exactly** —
4,369 shipped files, 62 `<training>` nodes, 1 with `var=`, 0 with `flag=` — so the documented
missing `rollGate` call stays unreachable and untouched, as filed.

Two things worth carrying forward, and the first is a correction to the filing's own test plan.
**"A rolled 2 fires the `<if>`" cannot be read off the rendered text, and the first attempt to
assert it failed.** This app follows JaFL in *showing* an untaken `<if>` branch rather than
hiding it — `renderConditionalBranch` grays it (`.cond-inactive`), disables its buttons and
suppresses its effects — so "lose 1 MAGIC if you roll a two" is on the page before the roll, in
the broken build and the fixed one alike. The assertion that the penalty was "hidden" pre-roll
was therefore wrong about the engine, not about the fix, and a `textContent` probe here would
have been unable to tell the defect from the repair in either direction. The rule: **in this
app "printed" never implies "applied" — assert a conditional off `.cond-inactive` or off the
sheet, never off the words.** That is the same shape as 277's note about anchoring to DOM
position rather than `textContent`, arrived at from the opposite side.

**The negative check is what made the assertions worth having.** Backing the single line out and
re-running reproduced the filed defect exactly — `x=0`, MAGIC still 6 after snake eyes, the guard
still grayed — with 4 of the 8 failing and the other 4 (the pre-roll baseline, the `+1` training
gain) correctly indifferent. Worth doing because two of the new assertions genuinely do *not*
bind to this defect: §2.554's "a ten trains +1" passes either way, since the training gain never
depended on the var. Without the backed-out run that would have looked like coverage it is not.

Worked 2026-08-16 (implementation pass, task 277): closed **277** and filed **278** (HIGH),
**279** (LOW) and **280** (MEDIUM). The fix is the two lines the filing
predicted, one `appendRollDescription` call immediately before each renderer's `makeRollWidget`;
eight assertions in `suite-render.js` inside the task-172 parity block, which is where the
"all four roll renderers do X" claims already live. JS-only, so `stamp-version.ps1` and not a data
rebuild; **`RESULT ALL PASS pass=2716 fail=0`**. Three things worth carrying forward. **The census
re-ran exactly** — 54 `<rankcheck>`/22 with text, 62 `<training>`/23 with text, 45 sections — which
is the first filing since task 270 whose count survived re-measurement unchanged, and it did
because the filing said which set it measured. **The element-children census is the check the
filing did not name and the one that made the fix safe**: walking a subtree for prose renders
whatever elements it holds, so "does text render?" is only half the question. Across both tags the
corpus holds exactly 5 element children, all `<adjust>` on `<rankcheck>` and all self-closing, so
the walk adds text and nothing else — had a `<success>` lived inside one of these nodes the same
two lines would have drawn a branch inside the description span. **The assertions are anchored to
DOM position, not to `textContent`**: each checks `.roll`'s `previousElementSibling` is the span
carrying the words, because a `textContent.includes()` test would have passed just as happily with
the description appended *below* the widget — and "the words come first" is the whole defect.

Two process notes, both corrections to this pass rather than to the code. **The sweep 277's filing
suggested was left in this log for a third time and only became task 279 when challenged** — the
filing pass wrote it here, this pass repeated it here and then restated it in conversation, which
is exactly the "findings only in conversation" the workflow forbids. The reasoning for not filing
it was that an audit with no confirmed defect is not a defect and so belongs in the log (the
precedent being task 276's declined refactor). That reasoning is wrong for an audit specifically:
a refactor of working code ends in no defect by construction, where a sweep ends in defects or in
a recorded "checked, clean" — and either is worth a task. **The rule to carry: if a finding is
worth repeating in a second Review log entry, it was worth filing in the first.**

And the thing that makes that concrete: **277's filing contained a false claim, and checking it
before repeating it produced task 278.** The filing argued the omission was an omission because
"`rollGate`, `markWhilePending`, `writeRollVar` are called by all four" — but `renderTraining`
calls only the second. One of the two gaps is documented and unreachable (no `<training flag=>`
in the corpus); the other is a live HIGH defect, §2.554's unwritten `x`. The claim was load-bearing
for the filing's own argument and had gone unchecked through two passes. **A supporting claim in a
filing is not evidence until it is re-read** — this one cost nothing to check and was worth a task.

Asked afterwards whether anything else had gone unfiled, this pass ran a second and different
sweep — **allowlisted attribute the app never reads**, distinct from 279 in that it finds an
attribute *no* renderer honours, where 279 finds a helper only *some* siblings call. Method:
extract `FL_TAG_ATTRS` from `validate-source.ps1` (129 attributes), subtract everything appearing
as a quoted string anywhere in `web/js`, census the remainder against the shipped corpus. Yield:
7 candidates, 33 corpus nodes, **one real finding** (280). The other six are worth recording so
the next census does not re-open them: `xitem`/`xarmour`/`xgroup` ARE implemented —
`transferSelector(el, prefix)` builds the name as `prefix + a`, so they never appear as literals;
`visit` is spec'd as unnecessary; `start` describes a JaFL character-finalisation step this app
does on its creation screen.

**The lesson is about the method, and it is the same lesson twice in one pass.** A string search
for attribute names has **false positives wherever the name is built dynamically**, and on the
strength of that search alone this pass came within one read of filing a HIGH defect claiming
`<transfer>` ignores its exclusion filters — which would have been wrong, and wrong in the
alarming direction (§4.586's own XML comment says it excepts keys, so the filing would have
"confirmed" itself against the corpus while the code was correct all along). What caught it was
opening `engine.js` at the line the *comments* mentioned. **A census over source text is a list
of candidates, never a list of findings; every candidate is confirmed by reading its owner.**
Also worth carrying: §2.554's `deduct` looked wrong on the way past (`2` where the printed text
says "lose 1 MAGIC") and is right — a roll of 2 beats a natural 0 or 1, so the training succeeds
and the extra point cancels the `+1`, netting the printed −1 either way.

Not filed, and named here so the decision is visible: the gate allowlists an attribute without
requiring anything to read it, so "passes `validate-source.ps1`" does not mean "honoured". A
cross-check — every allowlisted attribute is read somewhere, with an explicit opt-out list for
the deliberate no-ops — would have found 280 mechanically. That is a build-tooling *feature*, so
per `AGENTS.md` it belongs in `ROADMAP.md`, not here.

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
