# Fabled Lands — Web Edition · Engineering TODO

Backlog of recommended improvements. Open tasks are filed under priority buckets
(**HIGH** / **MEDIUM** / **LOW**) — work the first open (`- [ ]`) item top-down;
each task's detail section carries the same stable ID. Every filed task through
350 appears below: 207 and 326 are withdrawn as misdiagnoses, 339, 341, 344 and
346-350 are open, and all others are complete (see the Review log). File new
work under the priority bucket that fits, and record the pass in the Review log.
Completed detail sections are archived in
[`TASKS-archive.md`](TASKS-archive.md); the Review log at the end of this file
records each audit pass and is where new work is filed.

This file is for **defects**. New features are scoped in
[`ROADMAP.md`](ROADMAP.md) instead, as ordered phases — pick up a phase from
there once the buckets below are clear.

**HIGH**

*(none open — file new HIGH work here)*

**MEDIUM**


**LOW**

- [ ] 339. The living docs still repeat pre-task-324/327 claims about `book.ini` and codeword notes, omit task 324 from the player changelog, call the intentionally renamed Java reference tree untouched, and print one shipped-corpus regex without its end anchor
- [ ] 341. A visible `<transfer limit="N">` with more than N non-identical candidates offers one-item buttons and marks the action done after one pick, even though the DOM-free chooser contract asks for N selections
- [ ] 344. The build copy passes never remove a generated map/illustration whose source was deleted or renamed; for illustrations the reconciler then mistakes the orphan for a manual drop-in, so clean-rebuild CI green-lights an asset the source tree no longer ships
- [ ] 346. The repository-root `index.html` redirects with `location.replace('web/')` and drops `?demo=`/`?seed=`, so advertised deep links fail when opened at the canonical root instead of an already-`/web/` URL
- [ ] 347. The Adventure Sheet hides only internal codewords shaped like `1.10.1`, so slash-scoped and named engine flags such as `5/520`, `5.Aku.leaving`, `StillInYellowport` and `HydraDamage` are displayed to the player as printed codewords
- [ ] 348. Opening a multi-ship sail picker records its choice as `_pendingSourceNode` before a ship is selected, so abandoning the picker and taking an item `<return>` detour crosses off a sail route the player never took
- [ ] 349. Natural derived-stat reads still include unwritten bonuses: `defenceForMode` adds aura-raised `rankValue()`, while the `<if>` and `<set>` Stamina readers return the effective aura/affliction maximum instead of the written score
- [ ] 350. Book 5 section 180's potion of restoration says "cure you of any diseases" but is transcribed `<lose disease="*"/>`, which task 343 made read the disease/poison family, so the potion now also cures poison — more than its printed sentence promises, and unlike book 1 section 342's twin potion which says "cure poison and disease" and carries both attributes

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

---

## 339. Reconcile the living documentation with tasks 239, 324 and 327

**Priority: LOW.** No runtime reads these sentences, but several sit in the documents used
to plan the next feature or maintain the build. They contradict the current tree and, in
two cases, contradict another paragraph in the same document.

### What is wrong

- `ROADMAP.md` phase 1 says nothing under `build/` reads `book.ini` and treats it as no
  precedent. `validate-source.ps1` now reads `Codewords=` (task 325), and
  `build-data.ps1` reads `Map.Title=` (task 324). `PLAN.md` and `AGENTS.md` already carry the
  correct distinction: `Map=` remains inert because the filesystem derives it; the other two
  keys are live because they hold facts the filesystem cannot answer.
- The folder sketch in `docs/The-Books.md` says "only Codewords= is read", while the detailed
  paragraph fifteen lines later correctly says **two** keys are live.
- `README.md` and `docs/Build-Pipeline.md` collapse task 327's reverse codeword report into
  one note. The build intentionally distinguishes "declared but wholly unreferenced" from
  "tested or cleared but never awarded"; `AGENTS.md` says those grades must not be collapsed.
- The bold "one rule" in `docs/Corpus-Census.md` prints `^\d+[a-z]?` without the terminal
  `$`, although the commands below it and `AGENTS.md` use the actual shipped-section filter
  `^\d+[a-z]?$`.
- `README.md` labels `java-engine/` "UNTOUCHED" and says it is left exactly as found. The
  reference-only rule is correct, but task 239 intentionally renamed `README.txt` to
  `README.md` and updated `Pack.java`'s matching filename literal; `AGENTS.md` records that
  narrow exception.
- `CHANGELOG.md` has no 2026-08-31 entry for task 324's player-visible regional-map captions,
  although the project keeps this file specifically for player/deployer-visible changes.

### Steps

1. Correct each claim above using the current symbol/key names, with no code line numbers.
   Keep `Map=` explicitly inert and do not turn the correction into a proposal to read it.
2. Describe both codeword-note grades and the exact-spelling rule task 338 establishes.
3. Describe the Java reference tree as read-only with the already-completed rename/packager
   exception, not as historically byte-identical.
4. Add the map-caption change to the changelog under its actual deployment date/build.
5. Sweep the sibling living documents for the same exact claims. Do not rewrite dated
   findings in `REVIEW.md`, `TASKS-archive.md` or the Review log; those are historical records.

### Validation

Check every local Markdown link target, scan the living docs for the retired phrases, and
run `git diff --check`. This is documentation-only and does not require a data rebuild or
version stamp; the final diff must not touch generated app files.

---

## 341. A multi-item transfer collects only one selection

**Priority: LOW.** The selector contract is implemented incorrectly for `limit>1`, but all
three explicit `limit=` transfers in the six published books use `limit="1"`; this is latent
until new markup uses a larger limit.

### What is wrong

`transferPlan` in `web/js/engine.js` reports `needChoice` when more non-identical movers
qualify than the effective limit, and `applyTransfer` calls a chooser with
`(candidates, limit, 'transfer')`. That is an N-selection contract.

`renderTransfer` in `web/js/render-market.js` renders one button per candidate and commits
immediately with `chooser: () => [chosen]`. `applyTransfer` receives one item even when the
limit is 2 or 3, then the view adds the transfer memo and rerenders it as done. The remaining
required items can never be selected. The current corpus does not expose it: book 2 section
105, book 4 section 456 and book 6 section 635 are the only explicit-limit transfers, and
all three say 1.

### Steps

1. For a non-identical `limit=N` transfer, collect N distinct candidates before applying any
   state change. Reuse the fixed-count forfeit collector's small interaction pattern rather
   than inventing a second multi-select framework.
2. Keep the forced transfer gate standing and the price flag clear until the final required
   choice commits the whole transfer. Cancelling or leaving the picker incomplete changes
   nothing.
3. Preserve the current fast paths: `limit=1` remains a one-click choice; identical movers
   need no question; fewer than or exactly N candidates move as the current plan specifies.
4. Add a DOM-free chooser test and a rendered `limit="2"` mixed-item regression, plus controls
   for the three shipped limit-1 sections.

### Validation

Run the focused economy/actions suites, the DOM-free import check and the full browser suite.
The shipped-corpus census must still report exactly three explicit transfer limits, all 1.

---

## 344. Removing a source asset leaves its generated copy shipping forever

**Priority: LOW.** Asset removal/rename is rare and no stale file exists today, but this
breaks the source/generated ownership contract and defeats the clean-rebuild CI gate at the
moment an asset is deliberately withdrawn - potentially including a licensing-driven removal.

### What is wrong

`build/build-data.ps1` copies the world map, each published book's regional map and its
book-folder illustrations when a source exists. A missing source is only skipped; the old
file under `web/assets/` is not removed.

`Remove-StaleBookOutputs` in `build/release.ps1` closes only part of that gap:

- a `book<N>.jpg` map is removed only when book N leaves `Published=`, not when the still-
  published book's `-Map` source disappears;
- an illustration is considered build-owned only if its name is found in a **current** book
  folder. Once that source is deleted or renamed, the old generated filename is absent from
  `$fromBooks`, so the reconciler classifies it as a manual drop-in and preserves it;
- `web/assets/world-map.jpg` has no reconciliation path at all.

A clean rebuild therefore leaves the tracked orphan byte-for-byte unchanged, and CI reports
that generated output matches even though the declared source no longer contains it. A book
withdrawal test passes because its fixture keeps the unpublished book folder and image in
place, which lets the current ownership heuristic recognise the old output; deleting the
folder exposes the same bug.

### Steps

1. Reconcile copied assets from a durable record of what the **previous build** owned (for
   example the generated service-worker inventory before it is rewritten, or an explicit
   generated manifest), not solely from source files that still exist.
2. Remove an old generated regional map or illustration when its source is deleted/renamed,
   and the world-map output when its source is absent. Continue preserving genuine manual
   illustration/map drop-ins that no build inventory ever owned.
3. Keep paths and ordering OS-neutral and deterministic; do not turn the inert `book.ini Map=`
   key into the map source.
4. Extend `release-selftest.ps1` with a real fixture build followed by (a) deletion/rename of
   a published book illustration, (b) deletion of its map, (c) removal of a withdrawn book
   folder, and (d) a manual drop-in control. Each former generated output must disappear and
   the manual one must remain.

### Validation

Run the release self-test, a real build twice (second run byte-for-byte no-op), and the full
browser suite. Confirm `git status --porcelain -- web/assets web/sw.js` is empty after the
no-op rebuild.

---

## 346. The root redirect discards deep-link query parameters

**Priority: LOW.** Normal play is unaffected, and a URL already under `web/` works. The
repository root and deployed canonical entry point silently ignore the documented demo/seed
feature, so a shared link opens the title screen with ordinary random dice instead.

### What is wrong

The root `index.html` exists to forward a repository-root deployment into the self-contained
`web/` app. Its script is `location.replace('web/')`, which constructs a new relative URL
without `location.search` or `location.hash`. Thus:

```
/?seed=42&demo=1.10  ->  /web/
```

`app.js` never sees either parameter. `README.md` and `docs/Playing-the-Game.md` advertise
both for testing and sharing, and the wiki links the public site at its root. The static meta
refresh has the same limitation, but the JavaScript path is the normal modern-browser route
and can preserve the URL exactly.

### Steps

1. Build the redirect target from `web/` plus `location.search` and `location.hash`, then use
   `location.replace` as today. Keep the plain `<a href="web/">` fallback.
2. Add a source-level browser assertion that the root redirect preserves both parameters (and
   a hash, since preserving the incoming URL costs nothing). Do not execute the redirect in the
   test harness; inspect or exercise it in an isolated page.
3. Verify the target remains correct when the repository is served from a subpath rather than
   the origin root.
4. Clarify the README example with the public/root form once it genuinely works; coordinate
   that edit with task 339's living-doc sweep.

### Validation

Serve the repository root and open `/?seed=42&demo=1.10`; the resulting `/web/` URL must keep
both parameters and create the preview. Run the full browser suite. Root `index.html` is
outside the service-worker scope and app stamp inputs, so confirm no generated file changes.

---

## 347. Internal state flags leak into the Adventure Sheet's Codewords list

**Priority: LOW.** Gameplay state is correct, but the live sheet exposes implementation
machinery as player-facing book content, making it harder to distinguish the codewords the
printed rules actually ask the player to use.

### What is wrong

`renderSheet` in `web/js/ui.js` filters codeword keys with only `/^\d+\.\d/`, described as
"hide internal box-codewords". The corpus uses a wider bookkeeping namespace that
`validate-source.ps1` now documents precisely:

- section-scoped keys can use dot **or slash** (`2.567.1a`, `5/520`, `6/68`);
- some scoped keys continue with words (`5.Aku.leaving`, `3.318.sold`);
- the port has explicitly named state flags such as `StillInYellowport`, `HydraDamage`,
  `SpiderPoison` and `YarimuraProtection`.

Many are stored in `data.codewords`, so every key not matching digit-dot-digit appears under
"Codewords" on the Adventure Sheet. The player sees engine state that is absent from the
inside-cover lists, while genuine printed codewords such as Anchor share the same chips.

### Steps

1. Derive the displayable codeword set from the authoritative `Codewords=` union already read
   by the build, preferably passing it through generated metadata rather than copying the
   validator's exemption lists into `ui.js`.
2. Render only official printed codewords (including legitimate cross-book ones) and hide
   section-scoped/named machinery. Decide and document how a legacy save's unknown key is shown;
   do not silently treat every unknown as official.
3. Keep codeword counters available through their authored `<field>` widgets; hiding their
   backing key from the sheet must not alter state or conditions.
4. Add sheet tests with Anchor as the visible control and `5/520`, `5.Aku.leaving`,
   `StillInYellowport` and `HydraDamage` hidden. Include the accented codeword decoding the
   build already performs.

### Validation

Rebuild metadata, run the focused inventory suite, the DOM-free import check and the full
browser suite. Manually inspect a Yellowport save after `StillInYellowport` is set: the printed
codewords remain and no internal flag chip appears.

---

## 348. An abandoned sail picker contaminates the next return frame

**Priority: LOW.** No payment or ship is lost, but a route the player did not take can be
marked spent after an unrelated item detour, contradicting the source-action contract task 110
uses to decide whether a choice remains available.

### What is wrong

Both sail callers in `web/js/render-choices.js` assign `story._pendingSourceNode = node` before
calling `sailThenGo`. With one ship, the chooser commits synchronously and that happens to be
correct. With several ships, `sailThenGo` appends an inline "Sail which ship?" picker and
returns; no navigation has happened, but the Story already says the sail choice was taken.

The picker has no cancel control and is ordinary section DOM. A sheet mutation can rerender it
away, or the player can simply use a reusable Adventure-Sheet item whose effect opens a section
detour. `Story.useItem` correctly calls `navigate` without a source node - an item action is not
a section choice - so `_captureReturnFrame` falls back to the stale pending sail node. On the
detour's `<return>`, `ctx.usedSource` points at that sail route and `isSpentSource` disables it,
even though no ship sailed and no sail payment was made.

### Steps

1. Keep the prospective source node local to the sail picker. Pass it to
   `story.navigate(..., { sourceNode })` only inside the selected ship's commit, beside the
   deferred payment and `sailShip` mutation.
2. Remove the two eager `_pendingSourceNode` assignments. A one-ship sail must still capture
   its source in the same commit; an abandoned picker must leave no Story field behind.
3. Add a regression with two local ships: open the picker, abandon it via a same-section
   rerender, take a source-less item detour, return, and require the sail choice to remain live.
   Then choose a ship for real and require the returned non-`revisit` source to be spent.
4. Keep task 149's guarantee that abandoning the picker consumes neither its Shards/blessing
   nor a ship move.

### Validation

Run the focused actions/economy suites and the full browser suite. Include the save/load return
round-trip once task 340 supplies a canonical source path, so the two fixes compose.

---

## 349. Natural derived-stat reads still include aura/affliction terms

**Priority: LOW.** The reader contradicts its own documented mode contract, but no published
section currently asks for `defence` under `modifier="natural"`; this is latent until new
markup uses the supported combination.

### What is wrong

Two special-case derived-stat readers bypass the mode-aware helpers around them:

- `GameState.defenceForMode` correctly strips the weapon/tool contribution, armour, Defence
  aura, Defence affliction and god effect when mode is `natural`. Its final sum still adds
  `this.rankValue()` unconditionally, so a ring of ultimate power contributes its +2 Rank to
  "natural" Defence.
- `evaluateCondition` in `web/js/engine.js` reads any modified Stamina condition as
  `effectiveStaminaMax()`, and `evalExpression` does the same for any mode. Under `natural`,
  both should read the written `data.staminaMax`; `affected` is the mode that keeps the item
  aura/affliction-adjusted maximum. `rollDifficulty` and `<adjust>` already make that
  distinction.

These are the exact terms tasks 302/314/317 say natural mode removes. The current corpus has
no `ability/value="defence" modifier="natural"` node and no natural Stamina condition/set;
its one mode-qualified Stamina set is `modifier="affected"` in book 3 section 104 and is
correct. That is why the mode tests pass without composing these cases.

### Steps

1. Make Defence's Rank term mode-aware (`rankForMode(mode)` or the equivalent), leaving every
   non-natural mode on the full affected Rank.
2. Route Stamina through one mode-aware helper shared by condition, expression, difficulty and
   adjust reads: no modifier means current Stamina where the tag's contract says so,
   `natural` means written maximum, and `affected` means effective maximum.
3. Add a state test with written Rank 3 plus the ring's +2 aura: ordinary/noarmour Defence
   includes Rank 5, natural Defence includes Rank 3 and also strips the existing weapon,
   armour and aura controls.
4. Test written Stamina 10 under a +10 aura and a negative affliction through `<if>` and
   `<set>`: natural stays 10, affected reads the effective maximum, and an unmodified set keeps
   reading current Stamina. Retain book 3 section 104 as the affected control.
5. Add corpus census assertions documenting that the natural combinations have zero shipped
   sites today; a future first site should force its expected behavior to be reviewed.

### Validation

Run the focused engine/combat suites, the DOM-free import check and the full browser suite.

---

> **Completed task details (tasks 1–336) are archived** in [`TASKS-archive.md`](TASKS-archive.md) (tasks 141, 165, 211, 255, 274, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336) to keep this file focused on open work. The checklist above still carries every task's stable ID and status; a done task's detail lives in the archive under the same `## <N>.` heading. **Status is one of three markers — `- [x]` done, `- [ ]` open, `- [~]` withdrawn — so a census reconciling the checklist against the detail headings must match all three: matching only `- [x]` drops the withdrawn rows (207 and 326) and reports them as missing, which is what filed task 326.** No completed detail remains in this file; the Review log follows.

## 350. §5.180's potion cures more than its printed sentence promises

**Priority: LOW.** A rounding error in the player's favour on one item, and the reference engine
behaves the same way — but it is a divergence from the printed text, which this port treats as
the authority, so it is recorded rather than left as folklore in a code comment.

### What is wrong

Task 343 made `afflictionFamily('disease')` read diseases **and** poisons, because 15 of the 16
shipped `<lose disease=>` nodes sit in a section whose own words promise both. The 16th is
§5.180's potion of restoration, which says "The potion can be used once only to restore all
lost Stamina points and cure you of any **diseases**" and is transcribed
`<lose disease="*"/>` inside its `<effect type="use">`. Under the family reading, drinking it
also clears every poison.

Book 1 section 342 is the control that shows the transcription is deliberate rather than
accidental: the same potion of restoration there says "cure poison and disease" and carries
**both** `<lose poison="*"/>` and `<lose disease="*"/>`. So the corpus does distinguish the two
potions, and §5.180's single attribute is the narrower one on purpose.

The reference model reads §5.180 the same way this port now does — `Curse.matches` makes a
DISEASE selector match a POISON with no exception — so nothing here is a regression against
JaFL. What is unresolved is which authority wins for this one node: the printed sentence, or the
attribute the transcription chose.

`suite-corpus` pins §5.180 by name as the single `disease="*"` node whose section never mentions
poison, so this cannot quietly become a class of nodes.

### Steps

1. Decide the authority for this node and say so in `afflictionFamily`'s comment either way: the
   printed "any diseases" (narrow it) or the family attribute (keep it, and stop calling it an
   exception).
2. If it is narrowed, do it WITHOUT weakening the family reading the other 15 nodes need — a
   per-node opt-out has to be markup the validator allowlist knows about, not a section-number
   special case in a rule module.
3. Check §1.342's twin potion stays unaffected either way, and keep the `suite-corpus` census
   assertion honest: if the exception goes away, that assertion's expected list changes with it.

### Validation

Run the focused inventory and corpus suites, the DOM-free import check and the full browser
suite. If step 2 adds markup, add it to `build/validate-source.ps1`'s allowlist in the same
change (task 199) and rebuild the bundled data.

---

---

## Review log

*Running audit log of the backlog — each pass re-verifies the open items against
the current code and records what was filed, split, or re-confirmed. Task
numbers refer to the contents checklist at the top of the file.*

Worked 2026-09-02 (task 338): closed **338**, filed nothing. The codeword authority and the
`codeword=` value lookup now compare the **exact** spelling: three ordinal
`Dictionary[string,int]`s in place of PowerShell hashtables, and the `ToLowerInvariant()` on
both sides of the lookup gone. `GameState.hasCodeword`/`addCodeword` use ordinary object keys
and JaFL's `Codewords` uses Java `Properties` keys, so `<gain codeword="anchor">` never
satisfies `<if codeword="Anchor">` — task 325's failure mode reached by a different typo, and
just as invisible.
**The trap the filing warned about is real and is the thing to remember: a plain PowerShell
`@{}` is case-INSENSITIVE, so removing the lower-casing without changing the container fixes
nothing.** That was verified, not assumed — reverting only `$declared = New-CodewordSet` to
`$declared = @{}`, with every `ToLowerInvariant()` still absent, fails all three new negative
assertions. A fix that had looked complete in the diff would have been a no-op.
Dropping the fold also removed a variable rather than adding one: `$spelling`, the parallel
lowercased-key→declared-casing map the two-grade report needed, is gone because the dictionary
key IS the declared spelling now. The six informational notes come out byte-identical in their
two grades, and the corpus stays clean — 1,225 codeword tokens over 327 names with no case
variants, which is why this was latent rather than a live bad section. Documented in
`AGENTS.md`'s `Codewords=` paragraph, including the `@{}` trap, since that is the maintained
build documentation the gate's contract belongs in; the wider living-docs sweep stays task 339.

Worked 2026-09-02 (task 337): closed **337**, filed nothing. One `<if>` where there were two, and
the author's sentence back. §1.460 now reads `<if codeword="Acid" item="copper amulet">` around
the printed "If you have the codeword *Acid* or a **copper amulet**, [327] immediately.", and a
tag-stripped comparison against the import commit `7386eed` is byte-identical again — which was
the whole claim of the filing, and it was the corpus's only prose difference from the import
across all 30 numeric section files ever edited.
**What made this worth a task rather than a typo fix is why the split happened.** Task 262's own
note gives the reason: "task 3 makes `codeword= item=` on one `<if>` an AND, which is wrong for
an 'or'". That is false. `evaluateCondition`'s contract, stated in its own header comment, is
that every recognised attribute is a **disjunct** — the condition holds as soon as any one of
them does — and it was confirmed by running the real function over the real pair rather than by
re-reading the comment: Acid alone true, amulet alone true, both true, neither false. So a belief
about the engine, written down in a test comment and never checked against the engine, cost the
author's sentence for four months. The comment now records that it was wrong, because the next
reader of that block would otherwise inherit the same reason for re-splitting it.
The routing assertions task 262 wrote needed no change, which is the useful property: they test
the four states of the gate and are indifferent to how the markup expresses it. The two new ones
test the thing they could not — that the rendered text is the printed sentence — and both were
confirmed to fail against the pre-fix bundle (`pass=892 fail=2`, reporting the old "…codeword
Acid, 327 immediat[ely]" split) by checking the old `book1.json` back in on its own, without
touching the XML. The generated diff is one section of one bundle, verified by parsing both JSON
blobs and diffing keys rather than by reading a 900KB textual diff.

Worked 2026-09-02 (task 342): closed **342**, filed nothing. Three DOM-free plans in
`market.js` — `cargoBuyPlan`, `crewUpgradePlan`, `cargoSellPlan` — each returning `sellPlan`'s
`{ candidates, needsChoice }` shape plus an `{ ok, reason }` verdict, with one shared
`showVesselPicker` over them. The reference model already draws this boundary in words
("You have multiple ships with free space docked here. Select one."); it can afford to refuse
outright because its ship table carries a persistent selection, and the port's equivalent is to
ask inline.
**The half of this that is not a picker is the half worth recording.** `canUpgradeCrew` read
`state.currentShip()`, so eligibility was decided by ONE hull: with a poor-crewed barque and an
average-crewed brigantine both at Kunrir, §5.145's average→good upgrade answered "Your crew must
be average first" — a legal purchase refused, not merely mis-targeted. That is a rule bug, and
it is invisible from the picker's side: no amount of asking which ship helps if the offer is
disabled before the question. The plan filters the FLEET, which is what the reference's
`findShipsWithCrew(toCrew-1)` does.
Two decisions the filing left open. **The barter reward goes back into the hold that gave**
(§3.538's swap), rather than asking a second question: the give has already committed by then,
so an abandoned second answer would strand the barter half done — and one hold is what the
printed sentence describes ("a Cargo Unit of minerals in his hold … in exchange for one Cargo
Unit of any other commodity"). And **the no-prompt default now follows `currentShip()`** rather
than plain array order, for the two buy plans: at a dock they are the same hull, but at sea
`currentShip()` is the ship under SAIL and array order could be a prize taken alongside. Without
that, "the default is unchanged" would have been false for exactly the case the sail pointer
exists to fix, and the default would have disagreed with the `<if crew=>` gate reading the same
section.
Both halves were confirmed to discriminate by reverting them separately: array-position
selection fails 6 assertions (`A=spices B=` — the Unit in the wrong hold; `A=average B=poor` —
the grade on the wrong hull), and a `currentShip()`-only crew plan fails 6 more, reporting the
filed symptom verbatim. The narrow-layout inspection the task asks for was done with a
throwaway probe page screenshotted at a 360px pane: the first shots looked clipped and were
not — `--window-size=360` gave a 500px layout viewport, so a 360-wide screenshot of a 500-wide
page cut the panels off. Measured rather than eyeballed, `body.scrollWidth === clientWidth` and
each button fits its row; the picker needed one CSS rule (one button per row, `min-width: 0`) to
get there, because these labels carry hull, name, crew and hold together.

Worked 2026-09-02 (task 343): closed **343**, filed **350**. The three affliction arrays now
form the reference model's disease/poison family through one DOM-free plan
(`afflictionFamily`/`afflictionMatches`/`removeAffliction`), which every reader shares by
delegation — the `<if>` conditions, `rewardWasteReason`'s payment gate and `applyLose` all
changed behaviour without three parallel edits. An open `?` cure now asks which affliction
leaves, through the picker seams tasks 224/285 already built.
**The judgement call the filing left open, and the one thing worth reading this entry for:
whether the union is symmetric.** The reference makes it so — `Curse.matches` lets a POISON
selector match a DISEASE as readily as the reverse — and the filing's own step 1 says "a disease
or poison selector searches the union of both lists", while its step 5 asks for §1.338 as a
"poison-only control". Those cannot both hold. It is resolved for the printed text, which this
port treats as the authority over the reference: `disease=` reads the family, `poison=` does not,
because §1.338's healer "can cure you of poison but **is unable to cure disease**" and the
symmetric reading would charge a diseased-only player 25 Shards and cure them anyway. An explicit
printed denial outranks the reference's own hedge, which sits on that very line ("I think poisons
and diseases are usually treated the same … until I'm sure, I'll leave them separated").
What makes that defensible rather than curve-fitting is that it is **measured, in the suite, from
the sections' own words**: of the 16 shipped `<lose disease=>` nodes, 15 sit in a section naming
poison; the corpus writes an OPEN `poison=` exactly once, and that section is the one that denies
curing disease. Three `suite-corpus` assertions read those figures out of the raw XML, so a node
breaking the pattern fails a build rather than silently curing the wrong list. The 16th node —
§5.180's potion, "cure you of any diseases", which the family reading now also un-poisons — is
**task 350** rather than a section-number special case in a rule module. It is also the reason
the corpus assertion names §5.180 explicitly: an exception you have to list is one you cannot
forget.
One semantic change went beyond the filing and it is task 184's own argument carried forward: `?`
removes one AFFLICTION, not one RECORD, so an open cure of a cumulative stack lifts the whole
aggregate where 184's `?` spliced a single copy and left the rest as a permanent penalty. The
picker requires it — a button reading "Avenger's Bite" that leaves the curse standing is
incoherent — and 184's assertion was rewritten to state the sharper rule rather than quietly
updated to match. Both halves of the fix were confirmed to discriminate by reverting them
separately: without the family, 12 assertions fail (§5.105 reporting `poisons=1 shards=100` —
the money moved, the poison stayed); without the chooser, 4 fail, every one showing the disease
cured where the player had named the poison.

Worked 2026-09-02 (task 345): closed **345**, filed nothing. `equipLockSnapshot`/
`restoreEquipLocks` on `GameState`, carried by the visit record and restored in `Story.resume`
and by `resumeStale`'s probe, beside the per-fight bonus task 156 put there — the filing
identified the shape correctly and the fix is that shape, four call sites and a sanitizer field.
Nothing needed inventing, which is the point worth recording: **the transient-state-plus-memo
hazard has a known form and a known remedy, and the remedy is cheap enough that the honest
question is which other transient fields are still missing.** `GameState` keeps exactly three
fields off `data` — `_fightBonus`, `_equipLock` and `_undo` — so with this closed, both
game-meaningful transients are snapshotted and the third is session-only by design (a reload
starting with an empty undo stack is correct). The near-miss worth naming is
`clearPotionBonuses`, which `begin` calls alongside `clearEquipLocks` and which looks like the
same mechanism: it is not. `potionBonus` lives **in** `data`, persisted and sanitized, so it
is a per-section reset of saved state rather than a transient that a reload could drop.
The direction the coercion fails matters here and the opposite of the usual choice is right.
Every other field restored from an untrusted blob fails *closed*; this one fails **open** — only
a literal `true` locks — because the lock is a gate on the player's own Adventure Sheet
controls, so the conservative state is the one a fresh entry gives. A crafted save that locks
its own weapon slot is self-harm, not an exploit.
Four of the 14 new assertions fail against the pre-fix resume, confirmed by disabling the
restore rather than assumed: the swap succeeds (`wielded=broadsword`) and the forced group then
breaks the broadsword while the Jade Defender survives — the exploit the filing describes,
reproduced exactly. §2.290's armour twin is the useful control because its loss resolves during
the entry walk, so the lock is already released when the visit is saved: it pins that the
snapshot records absence as faithfully as presence, which is the same code path a pre-345 save
takes.

Worked 2026-09-02 (task 340): closed **340**, filed nothing. The saved source-action path now
comes from `nodePathIn`, which walks a node's real DOM ancestry to the section root, instead of
from a reverse lookup in `ctx.pathNodes`. The filing named the `<choices>` hole; the pass found
that the memo map is the wrong authority for this in **both** directions, which is why the fix
replaces the lookup rather than adding a writer to `renderChoices`. A `<choice>` is missing from
the map outright, and a `<goto>` inside a revealed `<outcome>` **is** in it — under a `.oN`
segment `resolveNodePath` cannot parse, so it round-tripped to null just the same. One derived
path answers for every source form and needs no cooperation from any view, so a future view that
mints its own memo key cannot reintroduce the defect.
What the pass changes about how a saved node reference is trusted: **a memo key and a persisted
identity are different things, and only one of them may be synthetic.** `ctx.pathNodes` exists
so a re-render can find what a node already applied; within one visit a `.cN` or `.oN` key is
perfectly good for that, because nothing has to resolve it back. The moment such a key is
written to disk it has to survive a re-parse, and the two purposes had been sharing one map.
`resolveNodePath` was also loose enough to answer the wrong question rather than refuse — a
hand-edited `1x` read as index 1 through `parseInt` — so it now requires a bare digit run per
component and fails closed, which is the one failure mode worse than dropping the marker.
All 22 new assertions were run against the pre-fix lookup rather than assumed to
discriminate, and **nine** of them fail (`RESULT FAILURES pass=910 fail=9`) — `path=null` for
the two choice forms, `path="r.1.o0.1"` for the outcome `<goto>`; the other thirteen are
controls that a null source satisfies too. The shipped routes the
filing named — §1.220 → §411 and §5.721 → §601 — are driven end to end in `suite-corpus`, not
just shape-checked, because a real `<choices>` table is indented and its buttons are therefore
not its first child *nodes*: the whitespace text nodes are exactly what a hand-written index
would get wrong. Task 348, still open, is the same frame's other defect (an abandoned sail
picker recording `_pendingSourceNode` before a ship is chosen) and is untouched by this.

Reviewed 2026-09-02 (thirteenth full pass, begun 2026-09-01, and the first proper full pass
since July): started clean on synchronized `main` at
`7c80239958fc2d6e54c9ad0c41eb4b57db743a35` and
used the twelfth review's clean `9a511ac` as the primary boundary. That delta is **188 commits,
112 changed files and about 28,000 added lines**. Re-read `AGENTS.md`, `SPEC.md`, `ROADMAP.md`,
`PLAN.md`, `DECISIONS.md`, `REVIEW.md`, the backlog and the complete post-boundary history;
then audited the cumulative current tree across source content, engine/state/combat/market,
all view modules, navigation/visit persistence, app/UI/TTS, data/build/release/validation,
service worker/CI/tests and the living documentation.

No critical or HIGH defect was found. Filed six **MEDIUM** tasks: return-frame save/load loses
a source choice (**340**); equipment locks lose their transient state on exact resume (**345**);
disease selectors fail to match poison and open cures do not ask (**343**); multi-ship cargo/
crew transactions silently alter the first vessel (**342**); section 1.460 rewrites the
author's sentence (**337**); and the codeword gate accepts case variants the engines do not
(**338**). Filed seven **LOW** tasks: stale living-doc claims (**339**); multi-item transfer
selection (**341**); copied-asset deletion reconciliation (**344**); root deep-link query loss
(**346**); internal flags shown as codewords (**347**); abandoned sail-picker source leakage
(**348**); and incomplete natural derived-stat mode reads (**349**). The detail sections above
carry the evidence, corpus triggers, steps and validation for each.

Two findings received independent failing evidence rather than code inspection alone. A
tag-stripped comparison from the original `books add` commit over every numeric section ever
edited (30 files) found exactly one prose change: task 337. A temporary save/resume/return
assertion for task 340 failed the focused actions suite exactly as predicted (`pass=878
fail=1`, `usedSourcePath=null`); the assertion and retained failure dump were removed, and the
unmodified actions suite then returned `RESULT ALL PASS pass=878 fail=0`. The current 1,225
`codeword=` tokens contain 327 case-folded names and zero case variants, making task 338 a
gate defect rather than a live bad token.

Organization remains sound: keep the flat dependency-free ES modules and the current
rule/view boundary. All 22 app modules resolve, the production import graph has no cycle,
every module is in the service-worker inventory, the seven rule modules still import and run
without a DOM, and an exact normalized eight-line scan found no cross-file production clone.
No framework, directory move, broad engine/state split or build toolchain is recommended.
The planning/backlog structure also reconciles: **349 checklist rows, 349 unique detail
headings, no gaps/duplicates/orphans**, with 207/326 withdrawn and 337-349 open. All local
Markdown link targets exist, and the review scan found no credential-shaped text.

Validation against the reviewed HEAD: `build/build-data.ps1` validated **4,407 files** and
generated all **4,369 sections** with no generated drift; validator self-test
`RESULT ALL PASS pass=53 fail=0`; release self-test `pass=48 fail=0`; Windows runner self-test
`pass=25 fail=0`; DOM-free Node import `pass=35 fail=0`; full fresh-profile Chrome suite
`RESULT ALL PASS pass=3035 fail=0`; and the post-reproduction focused actions run
`pass=878 fail=0`. `git diff --check 9a511ac..HEAD` is clean. Current-head GitHub Actions run
33443272028 is green in `build-scripts`, `rules-import` and `smoke`. The runner stopped its
server and port 8848 has no listener.

Manual limitation: the in-app browser runtime reported no available browser, so this pass
does not claim a separate screenshot, console or network-panel inspection. The real-Chrome
headless suite is the browser evidence available. The only retained working-tree change from
the review is this `TASKS.md` filing; `review-prose.mjs` and every other temporary diagnostic
file are absent, and `web/tests/suite-actions.js` is byte-equivalent to HEAD.

Worked 2026-08-31 (tasks 335, 336): filed and closed both. Found during conversion work on an
unpublished book, which is why neither shows up in a run over the six: **both are ways task
325's value check rejects markup that is correct**, and the published corpus writes neither
shape. 335 is the authority being one name short — book 1 prints 36 codewords and declared 35,
omitting `Auric` — and 336 is the reader being one separator short, `'\|'` where
`matchCodewords` documents "comma => AND, pipe => OR". The pair is worth reading together
because the check's own comment already contains the answer to both: it says the lists are
checked as a **union** rather than per book, because the alphabetical rule says where a
codeword is *earned* and not where it may be *tested*. A name a volume prints and its own
sections never use is exactly the case that union exists for, and 335 is that case going
undeclared for want of anyone reconciling the list against the printed page — the more so
because the file carried a note claiming two of its entries were unprinted when both are
printed, which reads as evidence the reconciliation had happened.
What the pass changes about how this check is trusted: **a green gate over the six books is not
evidence that the gate accepts the vocabulary the engine implements.** 336's fix is one
character; finding it needed a comparison of the checker's split against `engine.js`'s, which
no assertion made until now. Both directions are asserted in `validate-selftest.ps1` (53, from
51), and the two new assertions were run against the pre-fix split to confirm they fail
(`pass=51 fail=2`) rather than being assumed to. Nothing else was filed; the remaining
list-valued attributes were checked and are correctly `|`-only.

Worked 2026-08-31 (task 334): closed **334**, filed nothing. `Invoke-FixtureBuild` captures the
build's stream 6 into a list rather than discarding it, and prints the captured lines one at a
time before re-throwing, so the CI log that showed a bare "fix the source XML above" now shows
the gate's heading and the file it named above it. Folding the log into the thrown message was
tried first and rejected: PS7's error view reflows a multi-line message onto continuation
lines and collapses the indent that separates the heading from its file list.

The new assertion drives the real failure path rather than a stand-in — the fixture is rebuilt
with `book1/book.ini` deleted and `Invoke-FixtureBuild 6>&1` collects what the replay
*prints*, so what the test reads is what CI would show. `release-selftest.ps1` reports
`RESULT ALL PASS pass=48 fail=0`; nothing under `books/` or `web/` changed, so no rebuild or
stamp was needed.

Also in this pass: the archive's own index was one task behind. Task 333's detail was moved to
`TASKS-archive.md` without a **Contents** row, and its intro still read "stable IDs 1–332",
so adding 334's row beside a missing one would have carried the gap forward. Both rows are
present now and both ranges read 1–334. Nothing else was found; the backlog is empty, so the
next pass takes a phase from `ROADMAP.md`.

Worked 2026-08-31 (task 333): closed **333** and filed **334**. CI had been red on `main` for
four commits (329, 330, 331, 332) — the `build-scripts` job, in the step that drives
`release-selftest.ps1`. Every one of its 25 registry assertions passed and then the real build
it drives threw from `build-data.ps1:164`. **It was not a Linux-only failure**: it reproduced
on Windows on the first run, and had done so since task 325 landed. What hid it is that the
file touches nothing under `books/` or `web/`, so `build-data.ps1` and `run-tests.ps1` both
stay green on a tree in exactly this state — the ordinary loop cannot see this job.

The cause was task 325's own strictness working as designed against a fixture written before
it: `New-E2EFixture` builds a miniature repo with no `book.ini`, and 325 treats a book
declaring no `Codewords=` as an error, because the lists are checked as a union and an
incomplete authority would report valid codewords as unknown. The gate is right — the real
corpus passes it — so the **fixture** was fixed, not the gate.

**Filed 334:** `Invoke-FixtureBuild`'s `6>$null` keeps the build's progress lines out of the
assertions, but the same stream carries its diagnosis, so the CI log showed a bare `throw`
with the two lines naming the offending files discarded. Reproducing the fixture by hand to
recover a message the build had already written is the whole cost of that suppression.

Also in this pass, at the maintainer's request and outside the task numbering: the wiki under
`docs/` now routes contributors to GitHub issues and pull requests rather than to `TASKS.md`,
which is stated to be internal (`Contributing.md`'s loop and routing table,
`FAQ-and-Troubleshooting.md`'s entry, `Home.md`'s description), and the content-rights blocks
in `README.md` and `NOTICE` were trimmed to the books this port actually ships.

Worked 2026-08-31 (task 332): closed **332**, filed nothing. Every wait on the browser is now
bounded by a wall clock: `run-tests.ps1` launches with `-PassThru` and waits with
`Wait-Process -Timeout`, killing the browser at `-BrowserTimeoutSeconds` (default 300, against a
~13s healthy run) and throwing a message distinct from either empty-dump cause, because a hang
is neither. `Test-BrowserWritesOutput`'s probe on the failure path — the second unbounded wait,
which task 330's pass added — carries a flat 30s, and `.github/workflows/smoke.yml`'s `smoke`
job carries `timeout-minutes: 20`.

**The self-test case is where the pass spent its time, and it is the reason to trust the
bound.** Case 5 asserts the run's *duration* as well as its message, since a bound that quietly
stopped working satisfies every text assertion and only arrives late. Its first shim slept with
`ping -n 60` and the case took 61 seconds while printing the correct message: `Stop-Process`
kills one process, not a tree, and the orphaned `ping` held an inherited copy of the self-test's
capture pipe, so `Invoke-Runner` kept reading after the runner had exited (60.7s through a pipe,
3.7s with the same run redirected to a file). The shim now spins in `cmd` with no child. That
was checked against a **real** browser before being dismissed: Chrome killed at
`-BrowserTimeoutSeconds 1` returned the piped capture in 3.1s and left no process behind, so the
orphan is the shim's problem and not the runner's — nothing filed.

The four documents repeating "the budget is not a wall-clock timeout" now say what the wall
clock is (`AGENTS.md`, `README.md`, `docs/Testing.md`, `docs/FAQ-and-Troubleshooting.md`), and
`docs/Build-Pipeline.md`'s self-test row, still describing Python discovery alone, now names all
three probes it drives. `run-tests.ps1` `RESULT ALL PASS pass=3035 fail=0`, exit 0; the
self-test `RESULT ALL PASS pass=25 fail=0` in 14s; `stamp-version.ps1` "already at".

Worked 2026-08-31 (task 331): closed **331**, filed nothing. `PLAN.md` and `ROADMAP.md` now
print the same figure for the same census, and each says which attribute set it measured: 94
sections set `data.location` (`<section dock=>`, the one arm `arriveAtDock` reads), 97 carry an
attribute *named* `dock` (that arm plus `<set dock=>`, which berths a ship), and 102 carry any
of the four in `ROADMAP.md`'s table. Task 329's "where a figure here disagrees with
`ROADMAP.md`" caveat has been removed, having done its job.

Two more `PLAN.md` figures were this census restated and moved with it — the rejected
section-XML alternative would edit 94 files, and its `suite-corpus` bullet asked for a census of
two attributes where `ROADMAP.md` asks for all four. Step 4's re-measurement is recorded as a
runnable command in the archived write-up, along with the trap that produces the wrong number:
`todock="` contains `dock="`, so a pattern with no boundary before `dock` reads 94 as 96, while
the boundary that fixes it reads 3 `<set dock=>` sections as 1, because `<set ` has already
eaten the space. Neither error shows in a total, only in the filenames.

Documentation only — the four `.md` files, no rebuild, `stamp-version.ps1` "already at".

Worked 2026-08-31 (task 330): closed **330** and filed **332**. `run-tests.ps1`'s empty-dump
branch no longer asserts a cause — `Test-BrowserWritesOutput` re-launches the browser once with
`--screenshot` over a `data:` URL (no server, no suite) and the result picks the message: a
screenshot written keeps "no stdout handle?", none gives "The browser produced no output at all"
with `-Browser` as the way out. Failure path only, so a passing run pays nothing. Step 3 was
honoured: `Find-Browser` still returns the first browser that exists and probes nothing.

The self-test grew two cases (20 assertions, `RESULT ALL PASS pass=20 fail=0`), one shim per
cause, both exiting 0 with no DOM so the branch is always reached. The screenshot-writing
direction is what keeps the probe honest: a probe that stopped finding its screenshot would
report "no output at all" for every empty dump forever, which is the mirror of the bug fixed.

**The wrong claim had spread to three more documents**, all corrected in the same pass:
`README.md`'s troubleshooting blockquote, `docs/Testing.md`'s "An empty dump is a capture
failure" section and `docs/FAQ-and-Troubleshooting.md`'s "No `RESULT` line at all" entry. Each
repeated the `--version` discriminator, which is silent under *both* causes and is the sentence
that cost task 324's session six ways of redirecting stdout.

**Filed 332:** nothing puts a wall-clock bound on the browser launch, here or in CI —
`Start-Process -Wait` waits forever and `--virtual-time-budget` is explicitly not a timeout — so
a browser that hangs rather than exits 0 hangs the run instead of failing it. This pass added a
second unbounded wait on the failure path, which is why it is worth writing down.

Worked 2026-08-31 (task 329): closed **329** and filed **331**. `PLAN.md`'s status paragraph
now states only what it owns — not started, next feature is `ROADMAP.md`'s phase 1 — and sends
the reader to `TASKS.md`'s open `- [ ]` items rather than counting them. Step 2's sweep found
one real sibling: `docs/Contributing.md` said "As of 2026-08-31, **318 tasks are closed and
none are open**" against 328 filed and two open, and now defers the same way. `REVIEW.md`'s
dated "every finding below is closed" was deliberately left — it counts findings in its own
file. `docs/Corpus-Census.md` and `docs/Home.md` date their figures but print the command for
each, which is the other acceptable form. Step 3's one sentence is in `AGENTS.md` under
"Documentation — cite the function, not the line": a line number rots invisibly, a dated status
sentence rots *reassuringly*, and no `grep` for a symbol catches either.

**The stale status was hiding a stale figure, which is task 331.** `PLAN.md` says
`state.data.location` covers "25 named ports across **97** sections" and counts three
`<set dock=>` sections as setting the location — but the `dock` arm of `applySet` in `engine.js`
moves a *ship's* berth and never touches `data.location`, so the figure is **94**, which is what
`ROADMAP.md` has printed since task 320. Two planning documents, one census, different numbers.
Re-measured over the shipped 4,369 files: `<section dock=>` 94, `<set dock=>` 3 sections / 14
nodes, `todock=` 2, `<if docked=>` 3, 25 names. That same count also catches `ROADMAP.md`
claiming "97 shipped sections carry at least one of them" for a union that is **102** — its
table is right, the sentence above it is not. Both are filed as 331 rather than fixed here;
`PLAN.md`'s constraint block meanwhile says which of the two files to trust.

Archiving turned up an index gap of its own: **task 328's detail was moved to
`TASKS-archive.md` without a Contents row**, and that file's header still read "stable IDs
1–327". Both corrected alongside 329's row. Documentation only — `git status` shows `.md` files
and nothing else, and `stamp-version.ps1` reports "already at" its current stamp.

Worked 2026-08-31 (task 328): closed **328** — but **three nodes, not four**. Both no-op
`<tick codeword=>` carriers are gone (book 2 sections 579 and 633) along with section 633's
`<lose codeword="Bogus"/>`, and `'Bogus'` is out of `$script:FL_PORT_FLAGS`, which now holds
sixteen entries that each name engine state. Section 579's `<lose codeword="Bait"/>` was
**kept**, against step 2: it is not the tick's pair partner but the first entry of a complete
sweep — `book.ini` declares 24 codewords, the printed text excepts four, and the group holds
exactly the other 20 in alphabetical order, `Bait` at the head. The `<tick>` had been bolted on
above a `<lose>` that was already there, reusing the name it found; deleting both would have
left the "lose all codewords in this book" group covering 19 of the 20 the printed instruction
names. Unreachable today, and latent only once a missing `<gain codeword="Bait">` is restored,
which is precisely when it would matter and precisely when nobody would be looking.

The task's own rationale is what settles it. "Why it matters" wanted `Bait` surfaced as book 2's
**third never-awarded** codeword, and only the kept `<lose>` produces that grade — the build now
notes it beside `Beach` and `Bilge` as *"tested or cleared but no section awards it"*. Deleting
the `<lose>` too demoted it to *"declared but no section awards or tests it"*, the grade for a
name the book never uses at all, which task 327 had just gone to some trouble to separate.
Task 327's archived detail had already read it correctly — "a no-op `<tick codeword="Bait"/>`
immediately before **its** `<lose codeword="Bait"/>`" — and 328 generalised that one sentence
into a symmetric "pair" that section 633 has and section 579 does not.

Step 1's instruction to confirm against the engine rather than against the write-up earned its
keep twice. It corrected the write-up (a `<group force="t">` does not apply on render; it renders
a `button.group-action` the player clicks, and a first pass that measured the sheet without
clicking saw *nothing* removed, sweep included), and only then confirmed the pairs inert: with
the codewords pre-held and the button clicked, both groups leave the sheet identical whether or
not the ticked name was held beforehand, `codewordValues` empty and no trace in the rendered
text. The lesson generalises past this task — **a "no-op" argued from document order is a claim
about the walk, and the walk here has a click in it.**

`web/data/book2.json` was the only generated file to move, as the task predicted;
`validate-selftest.ps1` passes 51, the suite passes 3,035, and the re-run build is a
byte-for-byte no-op.

Worked 2026-08-31 (task 327): closed **327** — the reverse codeword report now grades what it
finds. `validate-source.ps1` keeps a second set, `FL_CODEWORD_AWARDED`, filled only from the
four tags that GIVE a codeword (`gain`, `tick`, `set`, `outcome`); the other four carriers
(`if`, `elseif`, `lose`, `adjust`) still mark it seen but no longer mark it awarded. Step 5
reports "declared but no section awards or tests it" as before, and a new second note,
"tested or cleared but no section awards it — a missing `<gain>`?", for the set difference.
Both stay **notes**: book 2's two are like that in the printed book too. `validate-selftest.ps1`
gains three assertions and one fixture edit (51 pass, was 48); the build validates the same
**4,407 files** and produces **no** generated diff, as the task predicted.

**The build now prints four notes, and two of them are new**: `Avert` and `Dark` unchanged,
plus `book2/book.ini : codeword "Beach"` and `"Bilge"` — both reachable only by section 579's
"lose every codeword in this book" sweep. That is the whole of the transcriber's
`# Unnecessary codewords: Bait,Beach,Bilge` note except `Bait`, which section 579 hides behind
a no-op `<tick codeword="Bait"/>` and which task 328 removes.

**The `<adjust>` classification was checked against the corpus rather than assumed.** Forty
`<adjust codeword=>` sites bump a counter and read as awards to the eye, so putting them on
the wrong side would have been invisible; every codeword they touch is awarded elsewhere by
one of the four real award tags, so the choice changes no note today and the classification
rests on what the tag means, not on what happened to pass.

**Step 5's reconciliation found both stale comments as filed, and they were rewritten rather
than deleted.** Book 1's `# Extra, unlisted codewords: Aloft,Altitude` and book 4's
`# Extra, unlisted codewords: Dispel` name codewords now present in those files' own
`Codewords=` lines — appended out of alphabetical order at the end of book 1's, folded into
alphabetical place in book 4's. The *reason* those two lines exist is still true and still
worth knowing (neither codeword is printed on its book's inside front cover, which is why
book 1's list ends non-alphabetically), so each comment now records that fact and says the
gap has since been closed. Deleting them would have left book 1's out-of-order tail
unexplained. Book 2's comment is untouched and gains a line noting which two of its three
names the gate now reports and why the third does not.

The fixture pair is the half that matters: book 1's `Relic` is `<lose>`-swept and never
awarded (new note), `Ready` is `<tick>`-ed (no note of either kind). An award set read as
"any `codeword=` site" — the defect — passes the first assertion and fails the second.
Headless suite green at **`RESULT ALL PASS pass=3035 fail=0`**. Nothing new filed.

Worked 2026-08-31 (bookkeeping, task 326): **withdrew 326** — the gap it reports does not exist.
Both indexes carry 207. The row reads `- [~] 207.` rather than `- [x] 207.`, and has done since the
withdrawal commit in this file and since task 211 in the archive's Contents, whose completion note
records putting it there in as many words; `git log -S` over that row finds two commits, both
adding it and neither removing it. Its detail section moved to `TASKS-archive.md` rewritten as a
withdrawal, mirroring 207's own, with a `- [~] 326.` row in both indexes.

**The task's own step 2 disproved it, and it is the census that was broken, not the index.** Run
over all three markers instead of `- [x]` alone: **330 checklist rows against 330 detail headings**
(326 archived, 4 open here), `comm -3` empty in both directions, and the archive's Contents holding
one row per detail heading, both ways. The 321-against-322 mismatch the filing could not account for is that one
withdrawn row, counted by neither side of its own comparison.

**This is the second pass to make the same measurement, so the fix goes where a pass looks the
marker up.** Task 274's re-archive wrote "207 keeps its detail and has no checklist row" into this
log on 2026-08-13, where it stood eighteen days as corroboration for anyone who repeated the grep.
The marker set is now spelled out in three places — the archive pointer above, the archive's
Contents heading, and `AGENTS.md`'s task workflow, which had defined only `- [ ]` and `- [x]`.
Task 274's claim keeps its place with a correction note appended rather than being rewritten: a
dated record is what was true then plus what happened since.

**A false filing earns the same close as a true one.** Following step 1 literally would have added
a duplicate `- [x] 207.` beside the `- [~]` row and relabelled a withdrawn task as done, so it was
not run; step 2, which the filing itself calls the whole check, was. Fixed one stale line found
while editing it: the archive intro still listed its provenance only through task 325 and still
described 323, 324 and 326 as open, three commits after 323 and 324 archived themselves.
Documentation only — `git status` shows three `.md` files, no rebuild and no suite run, and
`stamp-version.ps1` reports "already at" the current stamp.

Worked 2026-08-31 (task 324): closed **324** — every regional map is now captioned, and
alt-texted, with `book.ini`'s `Map.Title` (the map's own subject: "The Ports & Anchorages of the
Violet Ocean") instead of the volume title from `books.ini` ("Over the Blood-Dark Sea"). The build
reads the one key with a targeted match (`Get-IniMapTitle` in `build-data.ps1`) and passes it
through `meta.json`'s per-book entry, since the Maps modal opens before any book loads;
`data.bookMapTitle` falls back to the book title, so a book folder without the key still captions
its map and no build fails over decoration. Generated diff confined to `meta.json` plus the stamp
and `sw.js`'s `VERSION` — no book JSON, no map or art copy moved.

**`Map.Title` is the counter-example task 322 predicted.** That pass left `Map=` dead because the
filesystem already answers it, and scoped its conclusion to that key precisely because the file
holds something else no other file knows. This is that something: six hand-written captions,
read by nothing until now, and the second `book.ini` key to go live after `Codewords=` (task 325).
Three keys have now been weighed against `AGENTS.md`'s test — two read, one deliberately not.

**Validation ran the modal, not just the data.** Three assertions went into `suite-corpus`
(every published book bundles a `mapTitle`; at least one differs from its book title; an unknown
book falls back), and the task's own step — read the six captions, then break the image — was done
by serving the tree and driving the real `showMaps` headlessly from a throwaway page, since a
caption is a view concern the DOM-free suites cannot reach. All six read as the map title, the
world map still reads "The Fabled Lands", and a broken image still replaces the caption with the
missing-map note. `RESULT ALL PASS pass=3035 fail=0`.

Filed **330**. The suite could not run at first: the machine's only browser was an Edge with an
update staged and a 3-day-old session, and it answered every headless launch by exiting 0 having
done nothing — no DOM, no screenshot, no `--version`. The runner reported that as
"EMPTY dump … (no stdout handle?)" and `AGENTS.md`'s one-second discriminator agreed, which is
the wrong cause and a fix that cannot work. (Unblocked by installing Chrome.)

Worked 2026-08-31 (task 323): every code line citation is gone from `REVIEW.md` and
`PLAN.md`, replaced by the function, selector or key. Documentation only — `git status`
shows `.md` files alone and `stamp-version.ps1` reports "already at
26.08.31.6415baf" — so no rebuild and no suite run, per the task's own validation. All
**27** replacement symbols were checked to resolve against the tree. Filed **329**.

**The filing undercounted `REVIEW.md` five-fold, and the four it named were the least of
them.** 323 was filed as "`REVIEW.md`'s four (all drifted)", counting only the citations
inside the two New Findings. The file carried **20 distinct line numbers across 22
citations** — `grep -o` over the whole file, which is the census that matters here — and
nearly all of the other sixteen had drifted too: `stamp-version.ps1:32`–`:37` now lands
inside the script's comment block, `sw.js:42` on `// END GENERATED BOOK INVENTORY`,
`render.js:2568` past the end of a file that is 2,124 lines long, and
`README.md:226` onto the *stamp* documentation, three
sections away from the illustration text it was cited for. This is task 270's rule
arriving in a documentation filing rather than a corpus census: a count has to say which
set it measured. The four were the ones a reader would notice; the census that matters is
"every `file:line` in the file", and it takes one `grep`.

**Every finding in `REVIEW.md` is closed, which the document nowhere said.** Checking the
citations meant resolving each claim, and all of them are fixed: both New Findings (64, 65),
all five Confirmed Backlog items (33, 34, 35, 38, 39) and both Recommendations (66, 67).
`index.html`'s apple-touch icon is a PNG, the stamp folds `web/assets` in, `prepare` calls
`wrapFlowRuns`, `renderMoneyCache` reads `isCacheLocked`. Converting a citation while
leaving the prose asserting a live defect would have produced something worse than the
drift — a *correct* pointer to code that contradicts the claim — so each finding now carries
a dated `Resolved`/`Done` note naming the task and where the fixed code lives. That is a
scope extension beyond the task's step 1, which named only the rules-modal finding; it is
the same mechanical operation applied consistently, and step 1's own instruction ("mark it
as such rather than deleting it — the document is a dated review record") is the rule it
follows.

**`PLAN.md`'s six were all still exact**, as filed, including the pair that looks swapped:
`showMaps` really is at `app.js:1152` and the title-screen Maps button at `:250`. (`sed -n
'1152p;250p'` prints in *file* order regardless of argument order, which briefly read as
drift.) They were converted anyway, for 320's reason.

**Step 3's rule is now in `AGENTS.md`** ("Documentation — cite the function, not the line"),
with `ROADMAP.md`'s copy pointing at it. Scoped deliberately: it binds the **living**
documents and an open task's steps, and is **not** retroactive over `TASKS-archive.md` or
the review logs, which hold hundreds of citations that were correct when written — rewriting
a record of what a pass found is worse than a number that is legibly historical. It also
does not forbid quoting a rotted citation *as* the evidence that it rotted, which this
entry, the rule itself and `ROADMAP.md` all do.

Worked 2026-08-31 (task 325): the gate now checks codeword **values**, not just the attribute
name. `validate-source.ps1` parses each `books/book<N>/book.ini`'s `Codewords=` as Java
Properties — backslash continuations and `\uXXXX` escapes, both of which the six books really
use — and checks every `codeword=` in the corpus against the **union** of the six lists.
`validate-selftest.ps1` gains seven assertions and two fixture `.ini` files (48 pass, was 41);
the corpus build stays green at **4,407 files validated**, and the headless suite at
**`RESULT ALL PASS pass=3032 fail=0`**. Filed **327** and **328**.

**It found one, and the one it found is why the exemption needs a shape rather than a prefix.**
Book 4 section 345 clears `codeword="4457"` where section 457 sets `4.457` — the bookkeeping
flag for "you are a Tambu initiate", never cleared because of one missing dot. Had the
section-scoped exemption been "starts with a digit", `4457` would have read as machinery and
passed; requiring `^\d+[./]` is what makes it fail. That is the task's stated defect class
arriving in the corpus rather than in a fixture, so it is fixed here — which means this task
**does** carry a generated diff (one line of `web/data/book4.json`), against the "no source
XML changes" the write-up predicted. Allowlisting a typo to preserve that prediction would
have defeated the check.

**The task's premise about the alphabetical rule was wrong, and a per-book check would have
been unusable.** "Every codeword in book 1 begins with A, book 2 with B" describes where a
codeword is *earned*, not where it may be *tested*: book 1 alone tests `Barnacle`, `Crag`,
`Defend` and `Eldritch`, and `Almanac` reaches all six books. Checking each book against its
own list would have failed some 60 valid sites and been switched off within the hour. The
authority has to be the union.

**Three populations are legitimately absent from every `Codewords=` list**, and separating
them is most of the work: 117 section-scoped bookkeeping flags (`2.567.1a`, `5/520`,
`5.Aku.leaving` — matched by shape), 16 of the port's own named state flags
(`StillInYellowport`, `HydraDamage`, `CharismaBonus` — an explicit list, because nothing in
their spelling distinguishes them from a codeword, which is exactly why a typo among *them*
must still fail), and 5 codewords printed in the unpublished books 7–12 (`Hill`, `Ink`,
`Iota`, `Judas`, `Kink` — the same leniency the dangling-link check already gives a jump into
books 7–12). Of 329 distinct values in the corpus, those 138 plus 191 declared codewords
account for all of them.

**The reverse direction is a note, not a failure, and it agrees with the transcriber exactly.**
A declared codeword no section awards or tests prints as `note:` after the build's XML-OK
line. Today that is `Avert` (book 1) and `Dark` (book 4) — precisely book 1's hand-written
`# Unused codewords: Avert` and book 4's `# Unnecessary codewords: Dark`. Reproducing a
by-eye pass and landing on the same two names is the evidence that the parse is right; the
count is also asserted in the self-test, because a reader that silently returned an empty list
would accept every value in the corpus and look exactly like a clean run.

**Carry forward: a "the authority already exists" task should be costed by what the authority
does *not* cover.** The write-up assumed the only gap was the transcriber's annotated
exceptions, and those turned out to be already reconciled into the lists. The real gap was
five times larger and of three different kinds, none of them mentioned.

Worked 2026-08-31 (docs pass, task 322): closed **322** by the **"mark it dead"** arm, the user's
choice after a written comparison. `AGENTS.md`'s repository map gains a `book.ini` entry,
`docs/The-Books.md` and `PLAN.md` are corrected. Documentation only — `stamp-version.ps1`
reported "already at 26.08.28.ba963ea" and `git status` showed no generated file. Filed **323**,
**324**, **325** and **326**.

**The reason to keep `Map=` dead is not that it is cheaper — it is that the key duplicates a fact
the filesystem already answers.** `books.ini`'s `Published=` is read *because* it carries an
editorial decision nothing can derive; `build-data.ps1`'s own comment says it is deliberately a
list and not a `book*/` glob, so a half-transcribed folder is not bundled the moment it appears.
`Map=` names which file is the map, and the directory already knows. A `-Map$` pattern is
re-checked against the directory on every build and cannot drift; a declaration of the same fact
can, and book 3's did. **That test — does the key hold something you cannot derive? — is now in
`AGENTS.md`**, because it decides the next such question without re-running this argument.

**The task's framing was too narrow, and taking "all five keys are equally inert" at face value
would have buried two real findings.** Inert is not the same as worthless, and the user's push
("would it be better live?") is what forced the file to be read as a whole rather than one key at
a time. Two of the other four hold things **no other file in the repo knows**:
`Map.Title` is a caption written for the map ("The Ports & Anchorages of the Violet Ocean") where
`showMaps` currently shows the *book* title ("Over the Blood-Dark Sea"), and it is the `alt` text
too — filed as **324**. `Codewords=` is the authoritative per-book codeword list, and
`validate-source.ps1` validates codeword **attribute names** but never **values**, so a typo'd
`<gain codeword="Anchr">` passes the gate and silently never matches `<if codeword="Anchor">` —
filed as **325**, the only MEDIUM of the three, because it is a latent correctness bug rather
than polish. The strongest case for a live `book.ini` was never the key the task was filed about.

**Carry forward: a "nothing reads this" finding needs the whole file read, not the named key.**
322 was filed off a `grep` for `book.ini` and inherited that grep's scope. The same shape as 320,
which was filed off a `grep` of `dock=` without opening the handler — one level up again.

**Carry forward: book 4 disproves the tidy version of the story.** `books/book4/book.ini` carries
a commented-out `#Map=SteppesSmaller.jpg` beneath its live `Map=`, which is the inherited format's
override mechanism in visible use. So `Map=` is not merely decorative — the honest reason to leave
it dead is that **this port has no second candidate image in any book folder**, not that an
override could never be wanted. If one ever is, the shape is `Map=` as an *optional* override with
an unresolvable value a **build error**, never a silent fallback to the pattern.

**Carry forward: the docs sweep problem is now three passes old.** 320 corrected `ROADMAP.md`'s
`book.ini` claim; `PLAN.md` and `docs/The-Books.md` carried the same claim untouched for four
weeks and were found only because this task's grep happened to run. Checking the siblings turned
up `REVIEW.md` citing `renderStatic` at `app.js:775`/`:781` — a function that has since **moved to
`ui.js`**, for a defect **task 65 already fixed** (`ui.js` tests `parent.tagName === 'TR'` first),
with `render.js:2568` now a blank line. Filed as **323**. A correction applied only to the
document a task names is not finished.

**Checking this pass's own edit found a hole predating it.** Reconciling the two task indexes
after moving 322's detail — `comm -3` over the `- [x] <N>` IDs here against the `## <N>.` IDs in
the archive — turned up **207** in neither index: no Done row in this file and no Contents entry
in the archive, so it survives only as an orphan detail section. Present at `HEAD` before this
pass, with 206 and 208 both indexed, so it is an old dropped line. Filed as **326**. The
reconciliation itself is one command and is now step 2 of that task.

Worked 2026-08-31 (repo hygiene, task 321): closed **321** by arm **(a)**, the user's choice from
a written comparison of the three. Two commits — a one-character escape, then a line-endings-only
normalisation — plus the `AGENTS.md` correction step 2 required. Every tracked blob is now `i/lf`
(4,643), with 0 `i/crlf` and 0 `i/mixed`.

**The filed cause was backwards, and correcting it is what made the fix the right one.** 321 said
an edit "staged through the normalising path" stores an LF blob against a CRLF parent. git does the
opposite: a text file whose index blob already holds CRLF **keeps** CRLF on every later staging,
scoped diff and all — task 320's pass proved it by committing 295/84 and leaving both blobs CRLF.
The 6,348-line diff came from an **editing tool writing LF into the worktree**. Arm (c) would
therefore have documented a workaround for a step that was never at fault.

**Two files, two different mechanisms, and the filing's table flattened them into one.**
`TASKS-archive.md` was not CRLF-text at all — it was **binary**, because of exactly one lone CR at
byte offset 980447, and git treats any file containing one that way (`i/-text`), after which
autocrlf touches it in neither direction. The byte was inside a code span in **task 319's own
write-up about CR handling**, where it rendered as nothing: the sentence read "would compare `---`
against `---` and fail". One character fixed the prose and the classification together.
`TASKS.md`, by contrast, was clean CRLF text (0 lone CR, 0 bare LF) held by the self-perpetuating
rule above.

**Carry forward: two line-ending measurements in common use return the reassuring answer.** 319
already recorded that `git show` converts and `git cat-file blob` does not. This pass added the
second, by hitting it: **`grep -c $'\r$'` reports 0 for a fully-CRLF file** under this Cygwin bash,
because grep strips the CR before the pattern sees it — it read 0 for a `ROADMAP.md` holding 222
CRLF and no bare LF. Count bytes. Both are now in `AGENTS.md`.

**Carry forward: verify a mechanical rewrite before it lands, not after.** The normalisation was
checked by stripping CRs from each `HEAD` blob and `cmp`-ing against the new worktree copy
(identical) and by confirming each byte count fell by exactly its CRLF count — so "line endings
only" is a measurement rather than an intention. Also: a `List[byte].AddRange($b[0..n])` splice
truncated `TASKS-archive.md` to 2 bytes, because PowerShell's range operator yields `Object[]` and
only the two `Add` calls survived. `git checkout --` restored it exactly, which it could only do
because task 320 had committed the file minutes earlier. **Byte-splice a tracked file only when it
is committed**, write to a temp copy, and verify there first.

Worked 2026-08-31 (docs pass, task 320): closed **320** — `ROADMAP.md`'s three phases now cite
functions instead of line numbers, and its dock census says which set it measured. `ROADMAP.md`
only, so no rebuild; `stamp-version.ps1` confirmed "already at 26.08.28.ba963ea" and
`git status` showed the one file. Filed **322**.

**The task's own third row was wrong, and following its step 2 would have written a fresh error
into the file.** 320 said `<set dock=>` "sets the location too", making the site count 97. It does
not: `applySet` in `engine.js` berths a **ship** (`s.docked = get('dock')`) and never touches
`data.location`, which has exactly one writer — `arriveAtDock(sectionEl.getAttribute('dock'))` on
every section entry in `render.js`. The sites that set the player's location are **94**. The 97 is
real but is the count of sections carrying any `dock=`-family attribute, and the original 96 was
never reproduced from either definition. Row 1's replacement was also three lines out
(`app.js:1142` is `showRules`, not the Narration modal's closing brace at 1139); only row 2 was
exact.

**Carry forward: an attribute census is not a behaviour census, and only the second one can be
cited for what the code does.** 320 was filed against `ROADMAP.md` for quoting figures nothing
re-checks, and was itself filed on a `grep` of `dock=` without opening the handler — the same
failure one level up. The census also missed two further readers of the same names
(`<section todock=>`, `<if docked=>`), found only by asking the *allowlist* which attributes exist
rather than the corpus which ones appear. **Read the consumer before quoting the count**: for a
tag, that is the `applyX` in `engine.js` or the `getAttribute` in `render.js`, and it is one grep.

Step 3 turned up two more drifted citations in the same file, so the class is not confined to the
rows a task happens to name: `book.ini`'s `Map=` was offered as an existing build-read precedent
when nothing under `build/` opens the file (filed as **322** — book 3's `Map=Violet Ocean.JPG`
names no file on disk, while `VioletOcean-Map.JPG` ships fine), and phase 2 called the shipped
maps "downscales" of the source `.JPG`s when they are hash-identical copies of 500px originals,
so the repo holds no higher resolution at all.

Step 4 is answered in the file rather than left to the next pass: **cite the function, not the
line.** Every `#L` anchor is gone from `ROADMAP.md`, including `app.js:250`, which was still
correct — a rule that only applies to the citations already broken does not survive the next edit.
A line number fails quietly by pointing at plausible wrong code; a function name fails loudly with
no match.

Filed 2026-08-31 (planning-docs pass, no code): filed **320** while filling the four
baseline templates left unwritten since they were added on 2026-08-02 — `SPEC.md`,
`DECISIONS.md`, `CHANGELOG.md` and `PLAN.md` — and adding a `docs/` wiki.

**The finding came out of writing `PLAN.md`, which is the only one of the four that had to
be checked against the code rather than assembled from it.** `SPEC.md` and `DECISIONS.md`
are statements about what the project already is, and `CHANGELOG.md` reconstructs from git
history; `PLAN.md` names the next change, so its three cited facts got opened — and two had
moved while a third was never right. Nothing else in the four needed a task: every other
figure written into them was re-measured against the tree first.

**Carry forward: a planning document's citations rot silently, because nothing re-checks
them.** This is the second time `ROADMAP.md` has needed exactly this correction (task 309
was the first, for a corpus count), which is why 320's step 4 asks whether a line number
belongs in a planning file at all rather than just fixing these three.

Also filed **321**, found while committing 320: this file and `TASKS-archive.md` are the
only two tracked blobs that are CRLF, so staging an edit through the normalising path
rewrote the whole file — 6,348 lines for 84 lines of change. Task 319 concluded the
opposite ("the committed bytes are LF either way"), which is true everywhere except here.

**Carry forward: `git show` is the wrong tool for this question.** It applies eol conversion,
so `git show HEAD:TASKS.md` reports CRLF where the blob is LF and vice versa; three
measurements in a row disagreed with each other before `git cat-file blob` settled it. Any
future line-ending claim in this log should say which of the two it used.

Worked 2026-08-31 (docs pass, task 319): closed **319** — the CRLF trap 318 found is now a
paragraph in [`AGENTS.md`](AGENTS.md)'s **Command execution** notes, beside the "prefer direct file
edits over shell-based search/replace" bullet it reinforces. `AGENTS.md` only, so no rebuild.

**Writing it down cost the claim half its content, because the fixture disagreed with the pass that
filed it.** Two assertions came out of 318; one was a guess and one was wrong.

- *Which tools strip the CR* is a split, not a property of "text-mode tools": over a CRLF fixture
  `sed`, `awk` and `grep` strip it while `head`, `tail`, `cut`, `tr` and `cat` keep it. 318's script
  mixed the families, which is precisely why only the `sed`-extracted block was damaged and the
  `head`/`tail` halves stayed CRLF. **One family per pipeline is uniform by construction.**
- *"It breaks the boundary assertions"* is false. `$(...)` drops a trailing CR under this Cygwin
  bash, so a `sed`-based `[ "$(sed -n 5p f)" = "---" ]` and a `head`-based one both pass. The
  scariest sentence in the 318 write-up did not survive a two-line test, and is not in the note.

**So the surviving finding is cosmetic, and the note leads with that.** A survey of every tracked
file: **4,614 of the 4,632 carrying a terminator are all-CRLF, 18 are all-LF, none is mixed** — the
18 were flipped whole-file by earlier passes (`books/book1/597.xml`, `web/js/render-gates.js` among
them, from tasks 296 and 290) with no consequence, because `core.autocrlf=true` makes the committed
bytes LF either way, the build LF-normalises the section text, and `TASKS.md` feeds no script.
**A note about a harmless thing must say it is harmless**, or it invites a pass spent "fixing" 18
files and adding a `.gitattributes` nobody asked for — so it ends on *never as a drive-by*.

**Carry forward: a trap belongs where it changes behaviour, not only where it was found.** The
Review log records what a pass found; `AGENTS.md` is what the next pass reads first. 318 put a
how-to-run-a-bulk-edit lesson in the log alone, which is why this needed a second number.

Worked 2026-08-31 (archive pass, no code): closed **318** — moved completed detail sections
275–317 into [`TASKS-archive.md`](TASKS-archive.md) (plus this task's own detail, as 165, 211, 255
and 274 each did), merged the 25 checked bucket rows into the numeric **Done** list, and restored
the three priority buckets to their "none open" placeholders. TASKS.md 5,911 → 3,107 lines; the
archive 11,437 → 14,359. Documentation-only, so no rebuild or stamp change.

**The two checklists drift apart between archive passes, and this pass caught the drift at full
extent in one direction.** Closing a task writes its bucket row and never appends to **Done**, so
all 25 tasks closed since 274 (293–317) sat in a bucket with **Done** still ending at 292: the
set-union merge 274 needed found zero overlap. Task 280's row was also out of numeric order in
**Done** — appended after 281 and 282 had closed — against the list's own stated invariant. **The
numeric list measures when the last archive pass ran, not what is done**; the checkboxes are the
record.

**The intro's status sentence read "313 and 314 are open" with 313–317 all closed.** It is
maintained by the archive pass and by nothing that closes a task, so it was wrong by five tasks in
the one paragraph a reader checks before picking up work. Between passes, treat it as a claim to
verify against the checkboxes.

**A balanced `git diff --stat` does not prove a bulk move was byte-faithful.** MSYS `sed -n` strips
the CR from these CRLF files, so the 2,814-line block landed LF-only inside a CRLF file — and the
diff still read 2,814 insertions / 2,814 deletions with no line-ending noise, because
`core.autocrlf=true` normalises both sides to LF in the index. The tells were git's own "LF will be
replaced by CRLF" warning and a terminator count. **Count `
` against `
`, not diff lines**,
after any move done with a text-mode tool.

Worked 2026-08-28 (filing pass, no code): filed **314** — three of the six values `modifier=` may
take have no reader on `<set>` and two none on `<if>`, while `validate-source.ps1` allows all six
on both, so a mode word that is dropped falls through to the FULL affected score: the page's rule
silently becomes easier than it is printed. Found during conversion work on an unpublished book,
by an author who wanted `<set value="defence" modifier="noarmour">` and had to spell it
`value="defence-armour"` instead.

**What makes it worth a number rather than a workaround is that a comment in the code asserts the
opposite.** `evalExpression`'s `defence` branch carries "what this buys is that `<set
value="defence" modifier="noarmour">` cannot validate clean and then hand back the armoured
score" (task 302) — and it does exactly that, because `applySet` filters the word through
`setValueMode` before this branch ever sees it. The comment names the right defect one layer above
where the argument is supplied. **Re-read a comment that claims to PREVENT something against the
call site that feeds it**; this one has been quoted as a guarantee since 302.

**And task 302's own gate comment is the precedent, one value short.** It restricts `current` to
`<adjust>`/`<difficulty>` because "on `<set>`/`<if>` nothing reads it and it would fall through to
the default silently — task 300's failure shape". That sentence is true of `noarmour`, `notool`
and `noweapon` on the same two tags, and the check stops at the one value the author had in hand.
**A tag-restriction written for one enum value is a census question about the whole enum**, and it
costs one table to answer.

Censused rather than inspected: over the six shipped books `<set modifier=>` is written 33 times
(32 `natural`, 1 `affected`) and `<if modifier=>` twice (both `natural`), every one honoured, while
the corpus's only `no-` modes are `<difficulty modifier="noweapon">` (4) and `<adjust
modifier="noweapon">` (1) — both on tags that read them correctly. **The two tags that would drop
a mode are exactly the two the corpus has never given one**, which is why the suite is green and
five audits have walked past it. Filed LOW and latent on that measurement.

Worked 2026-08-28 (filing pass, no code): filed **313** — the corpus censuses read raw bundled
text that keeps XML comments, so a commented-out node counts as a real one. Found while writing an
explanatory comment that quoted the markup it explained, during conversion work on an unpublished
book; the interesting half is that the repository’s own recorded remedy did not cover it.

**The recorded rule was "a comment that quotes MARKUP is markup to a raw-text census, so write it
without its closing `>`" — and that remedy is keyed on the wrong token.** The comment that prompted
this filing contained no `<` at all; it quoted an attribute PAIR (`modifier="natural"`), and task
300 matches `\bmodifiers?="([^"]*)"`. So the rule generalises to **quote a bare attribute NAME in a
comment, never a `name="value"` pair**, and the check is one `grep` for `[A-Za-z]+="` inside
`<!-- ... -->` over the diff. A remedy phrased against one syntactic form expires against the next
census keyed on a different one.

**Filed as latent on a measurement, not an inspection.** The cheap version of this pass was to read
the six shipped comments, see that none currently changes a pinned number, and drop it. What makes
the filing worth its number is the experiment: patching the book cache to strip comments and
diffing the entire `#results` block (3,016 lines, byte-identical) proves latency across all nineteen
censuses at once, including the ones whose figures ride inside PASSING assertion labels and which
no reading of the failing set could have covered. **Prove a "nothing changes" claim by diffing the
whole output, not the verdict** — a verdict comparison here would have been vacuous.

**One census already had the fix and that is the argument for the task.** Task 266’s `scan266`
strips comments in its first line, for the same reason, written when its own tag-walk needed it.
Eighteen siblings written before and after it do not. A guard-rail that one of nineteen instances
gets right is a shared-helper defect rather than nineteen oversights.

Worked 2026-08-26 (implementation pass, task 311): closed **311** — the effective ability score is
floored at 1 and no longer capped at 12, via a new `floorAbility` beside `clampAbility`, which keeps
the written-score sites bounded 1..12. Suite `pass=3004 → 3015`; `web/` only.

**The printed rules said "12" twice and still meant the other thing — reading them was the whole
task.** `rules/Rules.xml` caps abilities at 12 in two places, so the cheap version of this pass was
to read either passage, conclude the port was right, and withdraw the filing. What decides it is
*which noun* the cap attaches to: both passages describe the number in the box — the *initial
score*, what *increases*, and what happens when you are *told to lose a point* — and gains and
losses are written-score operations, which is precisely where the port already clamps. **The
counter-argument is real and is now recorded in the task rather than left for the next reader to
rediscover**: the same file defines Defence as "your COMBAT score, *including any weapon bonus*",
so "COMBAT score" is an overloaded phrase in the source and the cap's noun is genuinely ambiguous
in isolation. Three independent things break the tie — JaFL's `EffectSet.adjustAbility` pegging the
minimum alone with a comment explaining only the floor, the corpus selling a +8 sword to characters
who start at COMBAT 8, and the adjacent "count only your best item's bonus" rule having no ceiling
on its result. **A spec that states a number twice can still be silent on the question you are
asking**, and the tell was that neither passage mentions a weapon.

**The filing got Defence backwards, and the fix is bigger for it.** 311 was filed saying `defence()`
"is not clamped", offering that as evidence the port disagreed with itself. The sum is indeed
unclamped — but `defenceForMode` builds its COMBAT term from `ability('combat')`, the clamped
reader, so the cap was quietly costing Defence the same four points as the attack roll. The
port's inconsistency was narrower and the defect wider than filed. **A filing that contrasts two
code paths is worth re-reading for whether one path calls the other** — this one did, one line down
from the claim.

**The most useful assertion in the last two passes is the one I weakened to get green.** Task 310's
arm needed `Math.min(12, cb0 + 7)`; writing that and moving on would have buried this defect
permanently, since nothing else in the suite exercised a score above 12. It is now `cb0 + 7`. The
generalisation for the next pass: **when an expected value needs a clamp, a floor or a `Math.min`
to match, the clamp is a claim about the system and should be justified or filed, not absorbed into
the expectation.** `suite-render`'s "noweapon computed pre-clamp" was the same shape from the other
direction — an assertion whose fixture existed only because of the ceiling — and it survives,
re-pointed, as this task's tightest regression guard.

**Closed the loop the task left open, and filed nothing for it.** 311 shipped saying the
**natural**-score cap was "untouched and unexamined" — an honest scope line, but a standing invitation
to re-derive it. The read was made straight afterwards and the port is correct: `Rules.xml` and
JaFL's `Adventurer.adjustAbility` both bound the written score 1..12, the latter stating it in its
doc comment before implementing it, and JaFL clamps per ability inside its loop just as the port
does by calling `adjustAbility` once per resolved target, so `ability="*"` is bounded per ability on
both sides. The task's detail section now records that, with the
three adjacent divergences the same read turned up — a discarded return value, `isAbilityMaxed`
having no port equivalent (and needing none: all 141 ability-raising nodes in the corpus are
auto-applied, zero carry `force="f"`), and the `abilityEffect` exemption the port already honours.
**The point of writing them down is that all three look like defects and none are**; an unexamined
scope line costs the next reader the same hour twice, and the backlog is for defects, so the place
for a confirmed-correct finding is the task that deferred it.

Worked 2026-08-26 (implementation pass, task 310; filed 311): closed **310** — `reconcileEquipment`
persisted whatever `wieldedWeapon()`/`wornArmour()` returned, so the "strongest of that kind"
fallback was written back as a choice on turn one and the fallback branch could thereafter fire only
when the stored item *left* the pack. The fix is subtraction: clear a stale entry, write nothing
else. Suite `pass=2991 → 3004`; `web/` only, so a stamp and not a data rebuild.

**The load path had to move with the engine, and the filing did not see that — a one-site fix that
was really two.** `sanitizeData` migrates a loadout from the legacy per-item `wielded`/`worn` flag
whenever the stored id is absent or stale. That was written for a pre-186 save, where the flag is
the only record; after this fix the flag marks the **default**, and an empty `equipped` is the
normal state of an unchosen slot — so the migration would have re-frozen the default into a choice
on **every load**. The engine fix would have held for one session and the bug returned on the next
refresh, service-worker reload or import. **A change to what a field MEANS is a change to every
reader that infers the field, not only to its writers** — the same enumerate-the-readers move task
305 recorded, arriving this time on the deserialiser rather than on a getter. The discriminator is
the presence of the `equipped` object itself, since a pre-186 save has no such key at all.

**Two existing fixtures asserted the bug, which is how big the blind spot was.** `suite-inventory`'s
`mk186` and `suite-economy`'s Jade Defender case both relied on the Defender *arriving first* to be
wielded, and both passed only because the write-back had promoted that default to a stored choice.
So "a stronger later weapon does not steal the wield" — task 186's headline assertion — was testing
the defect. Both fixtures now call `setEquipped`, which is what task 186 was always about. The
lesson generalises past this task: **a fixture that reaches its precondition by side effect is
asserting the side effect.** Task 310's filing predicted the shape of this ("the two have been the
same code path until now") without predicting that the tests had already been written on the wrong
side of it.

**Filed 311 from the assertion that would not go green.** The task 310 arm for "a better weapon
after a loss is still picked up" needed `Math.min(12, cb0 + 7)` to pass, which is `clampAbility`
capping the *effective* score. The reference's `EffectSet.adjustAbility` pegs only the minimum, with
a comment saying why — so the ceiling is port-introduced, and it costs a book5/6 Warrior four points
of COMBAT on every attack roll with book4/103's white sword. Two measurements kept it a MEDIUM
rather than a HIGH and are recorded in the filing so they need not be redone: the corpus's highest
`<if ability=>` core threshold is `sanctity greaterthan="8"`, so no route is lost, and `defence()`
is on the *unclamped* path, which is where the port's disagreement with itself shows. The natural-
score clamp is a different question on different call sites and is explicitly left unmeasured.
**The most productive probe this pass was an assertion I had to weaken to make pass** — the
weakening is the finding, and writing `Math.min` instead of asking why is how it stays hidden.

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
*(Corrected by task 326: 207 does have a checklist row in both files — `- [~] 207.`, in this file
since the withdrawal and in the archive's Contents since this very pass's predecessor, task 211.
This census missed it by matching `- [x]` alone.)*

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
