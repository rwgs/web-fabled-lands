# Fabled Lands — Web Edition · Engineering TODO

Backlog of recommended improvements. Open tasks are filed under priority buckets
(**HIGH** / **MEDIUM** / **LOW**) — work the first open (`- [ ]`) item top-down;
each task's detail section carries the same stable ID. Every filed task through
382 appears below: 207 and 326 are withdrawn as misdiagnoses, the `- [ ]` items in
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

*(none open — file new MEDIUM work here)*

**LOW**

- [ ] 369. `ubuntu-latest` moves to Ubuntu 26 from 2026-10-19 (CI notice); the `smoke` and `build-scripts` jobs rely on the image's preinstalled `pwsh` 7, `google-chrome` and `python3`, so the move could stop CI with no change here
- [ ] 370. Move hosting from GitHub Pages to a Cloudflare Worker (owner's request), keeping the root layout and the `/web/` URLs; the Worker's asset server 307s `index.html` to `./`, which the service worker's precache stored as a redirected response that a navigation refuses

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

---

> **Every completed task's detail is archived** in [`TASKS-archive.md`](TASKS-archive.md), under the same `## <N>.` heading it had here, so this file stays focused on open work. The checklist above carries every task's stable ID and status. **Status is one of three markers — `- [x]` done, `- [ ]` open, `- [~]` withdrawn — so a census reconciling the checklist against the detail headings must match all three: matching only `- [x]` drops the withdrawn rows (207 and 326) and reports them as missing, which is what filed task 326.** The open tasks' detail sections follow, in filed order; the Review log comes after them.

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

## 370. Host the site on a Cloudflare Worker instead of GitHub Pages

**Priority: LOW.** This is the owner's request (2026-09-29), not a defect. Pages works, but it
publishes the whole repository, and Cloudflare already sits in front of it.

### What is wrong

GitHub Pages serves `main` from the repository root under the root `CNAME`, so `books/`,
`java-engine/` and the task files are public, and only Jekyll's `_`-prefix rule keeps
`web/_test.html` off the site. The move has to keep the root layout and `/web/`. Installed
copies are registered at `/web/`, and a service worker whose script moves or redirects can no
longer update.

Checked under `wrangler dev` (4.144.0), the asset server differs from Pages in one way that
matters. It answers `/web/index.html` (and `?v=`) with a 307 to `/web/`. `FLCache.precache`
fetched `./index.html` through that redirect and cached the response still marked redirected,
and a browser refuses a redirected response as the answer to a navigation, so opening
`/web/index.html` from the cache would fail.

### Steps

1. Add `wrangler.jsonc` (an assets-only Worker over `.`) and a root `.assetsignore` that
   publishes only `index.html` and `web/`, less `web/_test.html`.
2. Make `FLCache.precache` store a redirected response as a non-redirected copy, with a
   `suite-economy` test that fails without it.
3. Update README's deploy section; ignore `.wrangler/`.
4. Deploy from CI: a `deploy` job in `smoke.yml` that needs the other three jobs, runs only
   for a push to `main`, and runs a pinned `npx wrangler deploy`. `wrangler.jsonc` declares
   `webfl.rwgs.net` as a custom-domain route, so the deploy creates the DNS record.
5. *(Owner.)* Add the repository secrets `CLOUDFLARE_API_TOKEN` (the "Edit Cloudflare
   Workers" template) and `CLOUDFLARE_ACCOUNT_ID`, remove the old DNS record for the hostname
   (done 2026-09-29), push, and turn Pages off.
6. Delete the root `CNAME` (the owner did, `ef568b4`), then close once the Validation below
   holds.

**Status 2026-09-29:** steps 1–3 are done. Under `wrangler dev`, `/`, `/?demo=1.10`, `/web/`,
the data, the illustrations and `web/tests/` answer 200. `/web/_test.html`, `README.md`,
`books/`, `java-engine/`, `.git/`, `CNAME`, `wrangler.jsonc` and `.assetsignore` answer 404,
and `sw.js` is sent with `public, max-age=0, must-revalidate` and an ETag. So `.assetsignore`
honours `!` negation. Running wrangler with its default `.wrangler/` state inside the assets
directory reloads in a loop, and `--persist-to` outside the repository fixes that (README says
so). `RESULT ALL PASS pass=3248 fail=0`. The new test fails on the old `precache`. Step 4 is done too.
The owner chose GitHub Actions over Workers Builds, so a build CI rejects is never deployed.
Wrangler runs through `npx` on Node 24 rather than `cloudflare/wrangler-action`, whose
runtime we did not check against the runners' removal of Node 20 (task 361). The owner has
removed the old DNS record, so `webfl.rwgs.net` does not resolve until the first deploy.

### Validation

- `https://webfl.rwgs.net/web/` is served by the Worker (a `/README.md` request answers 404).
  An installed copy updates to the next build, and it opens `/web/index.html` offline.

---

## Review log

*Running audit log of the backlog — each pass re-verifies the open items against
the current code and records what was filed, split, or re-confirmed. Task
numbers refer to the contents checklist at the top of the file.*

Worked 2026-10-01 (task 382): closed **382**, filed nothing. A cut-down probe isolated the
trigger to `serve.py`'s `Cache-Control: no-store`. With it removed the worker installed;
dropping `Pragma`, sharing the port or binding the stock server to 127.0.0.1 changed nothing.
The cause was in `FLCache.precache`, which fetched every REQUIRED entry and read no body until
all had answered. Over HTTP/1.x the browser allows six connections per host, and an unread
no-store body is never drained by the HTTP cache, so the connections stayed taken. `fetchOk`
now reads each body as it arrives and returns a fresh `Response`, which also does what
`unredirect` did for task 370, so that helper is gone. A new `suite-economy` test holds one
fetch back and requires the others' bodies to have been read; it fails on the old code. Under
the unmodified `serve.py` the worker now activates after all 48 precache requests, and task
374's full update probe passes on it. `docs/Testing.md` gained the recipe. The full suite
reported `RESULT ALL PASS pass=3352 fail=0`.

Worked 2026-10-01 (task 381): closed **381**, filed nothing. Documentation only. README's
Combat summary and Game Rules' Defence formula now say worn armour, chosen on the sheet with
the strongest as the default. Game Rules and Playing the Game keep the no-stacking rule as
wielded weapon, worn armour and best tool. Game Rules says fight bonuses clear on a new
section and survive a reload of the same visit, and that `current` is read only on `<adjust>`
and `<difficulty>`. The sibling sweep found the same `current` claim in the XML Tag Reference,
and README's Training line saying "current ability" where `rollTraining` reads the natural
score; both are fixed. Three code comments in `state.js` still say "best armour" or "never
survives a save". They are noted here, not changed.

Worked 2026-10-01 (task 379): closed **379**, filed nothing. Each enum's reader was
checked for case and list handling. `special` and `crew` compare exactly, so the gate now
requires the listed spelling for them. Eight attributes take one value: `special`, `crew`,
`modifier`, `gender`, `choose`, `family`, `blessing` and `abilityDamaged`. So does
`profession` everywhere except `<tick>`, which the picker splits. A union stays legal for
`ability`, `ship` and cargo. A corpus census found every shipped shape still legal. The
gate selftest gained six mutations, which the old gate missed, and a control; it now reports
`pass=89`. `suite-engine` gained runtime controls showing the accepted spellings act and the
refused ones were inert. The full suite reported `RESULT ALL PASS pass=3350 fail=0`.

Worked 2026-10-01 (task 378): closed **378**, filed nothing. `Test-AttrValue` now checks
`pay` and `flee` on `<choice>` and `pre` on `<fightround>` against the truth set. It checks
`<fight flee=>` as a whole number, the threshold `combat.js` parses. The gate selftest gained
four mutation cases, which the old gate missed, and a control covering every supported
spelling plus `flee="5"`; it now reports `pass=82`. The real corpus passes and the rebuild is a
no-op. The full suite reported `RESULT ALL PASS pass=3341 fail=0`.

Worked 2026-10-01 (task 377): closed **377**, filed nothing. `nextFreeSlot` reads storage
strictly and throws `StorageReadError` when a read fails, because an unreadable slot is not a
free one. `loadSlotMeta` stays lenient for display, so the title still renders.
`GameState.load` returns null for an unreadable save, and the saves screen's Play reports
that. New Adventure picks its slot through `newAdventureSlot`, which offers "Play without
saving" on a blocked read. That gives an unsaved in-tab adventure that can be exported, or
kept once storage works. `suite-economy` gained 15 assertions with reads, not writes,
throwing. In the real app, with reads of `fl_*` keys made to throw from page load, Begin
Adventure showed the dialog. Playing without saving reached the game screen, and Keep
reported the storage message with Export, with no uncaught error. The full suite reported
`RESULT ALL PASS pass=3341 fail=0`.

Worked 2026-10-01 (task 376): closed **376**, filed nothing. The source gate now fails a
published book with no `Adventurers.xml` or with unusable creation data, through
`Test-AdventurersData` in `validate-source.ps1`. `validate-selftest.ps1` gained 10 mutation
cases, none of which the old gate caught. Its fixture and `release-selftest.ps1`'s now carry
full creation data. `suite-corpus` creates all six professions from each published book's own
data. With book 2's Wayfarer row stripped from a probe copy of `meta.json`, the check named
the gap; the file was restored with `git checkout`. The real corpus passes the gate and the
rebuild is a no-op. Validate selftest `pass=77`, release selftest `pass=59`, and the full
suite `RESULT ALL PASS pass=3326 fail=0`.

Worked 2026-10-01 (task 375): closed **375**, filed nothing. First writer wins.
`GameState` remembers the exact blob it last loaded or wrote, and `save()` refuses to write
over any other blob. That sets `saveConflict`, and the failure is reported through the
existing save-failure path. The "Progress not saved" modal then also offers "Load the newer
save". `suite-economy` gained 11 assertions over two states loaded from one slot. Against the
old `save()`, 6 of them failed, and the stale write replaced the 150-Shard save with 100, as
filed. Two real tabs were driven in headless Chrome over DevTools. Tab 1 moved first and
stayed saved. Tab 2's move was refused and it showed the modal. "Load the newer save" resumed
tab 2 from tab 1's section, and it then played on and saved normally. The full suite reported
`RESULT ALL PASS pass=3314 fail=0`.

Worked 2026-10-01 (task 374): closed **374**, filed **382**. The game screen's update hold
now follows the save-status channel through `holdUpdateWhileUnsaved` in `app.js`. An unkept
preview or a failed save holds, a successful save releases, and `GameState.keep` now
publishes save status on success. Keep also drops `?demo=` from the URL. Otherwise the
deferred reload booted a fresh preview over the adventure just kept. `suite-economy` gained
13 behavioral assertions with real `GameState`s, plus an updated source contract. A real
controller change was driven in headless Chrome over a scratch copy of `web/`. The update
waited out preview play, Keep applied it once and landed on the title, and an update during
kept play reloaded at once. That check needed `python -m http.server`, because under
`build/serve.py` the worker never finishes installing. That is filed as **382**. The full
suite reported `RESULT ALL PASS pass=3303 fail=0`.

Worked 2026-10-01 (task 373): closed **373**, filed nothing. A failed `keep()` now removes
the blob its attempt wrote to the slot it had just claimed, which was free when claimed. If
storage refuses that removal too, the next attempt reuses the same slot, so failures never
claim a second one. `suite-economy` gained 8 assertions. They make `fl_meta` writes fail
three times, refuse the clean-up, then let storage recover. Against the old code they left
blobs in slots `0,1,2`, the bug as filed. The full suite reported
`RESULT ALL PASS pass=3291 fail=0`.

Worked 2026-10-01 (task 372): closed **372**, filed nothing. `sameCandidate` in
`market.js` now also compares crew grade, cargo contents (order-free) and item effects, using
`sanitizeEffect`'s defaults so a live item and its reloaded copy still match. The sale
picker's labels now name each ship's crew and each item's uses left; otherwise the new
prompt would have shown two identical buttons. `suite-economy` gained 12 assertions, which
cover the plan and the real widget: it asks, removes only the pick and credits the price
once, and two truly identical barques still sell with no picker. Against the old code, 6
of them failed. The full suite reported `RESULT ALL PASS pass=3283 fail=0`.

Worked 2026-10-01 (task 371): closed **371**, filed nothing. `loadSlotMeta` now validates
the index's shape and drops malformed entries, which `reconcileSlotMeta` rebuilds from a
readable blob. `suite-economy` gained 23 assertions; against the old function the `null`
case threw exactly as filed. The real app, driven headless over DevTools with `fl_meta` set
to `null`, `[]` and an object of junk entries over an intact `fl_save_3`, rendered the title
with Continue and listed the adventure, with its blob unchanged and no page error. A
well-formed entry with no blob behind it still lists a card. That is the ghost task 198
prevents by deleting meta first, and only a hand edit of storage produces it now, so it was
left alone. The full suite reported `RESULT ALL PASS pass=3271 fail=0`.

Worked 2026-10-01 (task 380): closed **380**, filed nothing. A failure captured after a
passing report now re-runs the reporter, so the verdict line itself reads `RESULT FAILURES
pass=N fail=M`, and both runners pass only an `ALL PASS` line whose page title is `TESTS_OK`.
`run-tests-selftest.ps1` gained cases 6 and 7 (a late rejection and a late failing assertion,
via the runner's new `-LateFailure` and the harness's `?latefail=`) and reported
`pass=33 fail=0`. With the old `flFatal` restored, the runner's title check alone failed the
page while the HEAD `smoke.yml` verdict step, run on the same dump, exited 0 and the new one 1.
A cut-short run and a bootstrap parse error kept their own diagnoses. The full suite reported
`RESULT ALL PASS pass=3248 fail=0`. CI's verdict step was exercised locally on saved dumps,
not on a pushed run.

Reviewed 2026-10-01 (Codex, whole repository): filed **371-381**, closed nothing.
The full report is [review-codex.md](review-codex.md). **380** is HIGH: the harness's
own late-fatal handler marks the page failed but both runners can extract its older
`ALL PASS` line. Direct probes confirmed malformed metadata recovery, unequal sale
candidates, partial preview promotion, conflicting save writers and blocked storage
reads. Call-site review confirmed the unsaved-update gap; temporary source-gate
fixtures confirmed missing/empty Adventurers data and unsupported attribute values
passing validation. Player-rule documentation drift is **381**. The full browser
suite reported `RESULT ALL PASS pass=3248 fail=0`; the Node/import, source-gate,
release and Windows runner fixture checks also passed. The rebuild left generated
output unchanged. Interactive browser and live-deployment checks were not completed.
Tasks **369** and **370** retain their existing external validation requirements.
The prior current Review log moved verbatim to the top of the archive's Review log.

> Earlier review passes are archived, verbatim and newest first, in [TASKS-archive.md's "Review log (archived)"](TASKS-archive.md#review-log-archived). Passes from 2026-07-15's third full pass and earlier are in [REVIEW.md](REVIEW.md). The most recent `Reviewed` pass and the `Worked` entries since it stay above.
