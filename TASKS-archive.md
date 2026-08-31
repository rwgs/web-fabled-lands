# Fabled Lands — Web Edition · Completed Task Archive

Detail sections for completed tasks (stable IDs 1–321), moved verbatim out of [`TASKS.md`](TASKS.md) by task 141 (IDs 1–114), task 165 (IDs 115–165), task 211 (IDs 166–211), task 255 (IDs 212–255), task 274 (IDs 256–274), task 318 (IDs 275–318), task 319 (ID 319), task 320 (ID 320) and task 321 (ID 321). Each section keeps its original `## <N>.` heading and stable task number; sections remain in their original filed order, not numeric order. The live checklist, any open-task details and the Review log stay in `TASKS.md`.

---

## Contents

The completed tasks archived in this file (stable IDs 1–321). Detail sections follow below in their original filed order; find one by its `## <N>.` heading.

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
- [x] 320. `ROADMAP.md` phase 1 cites two moved locations and undercounts its own dock sites
- [x] 321. The two task files are the repo's only CRLF blobs, so a tool edit rewrites them whole

---

## 1. Gate combat progression / model fight outcomes  — **done**

Fights no longer let the player skip past them, and win/loss now route correctly
(first spotted in `books/book1/570.xml`; fixed engine-wide). In `render.js` +
`combat.js`:
1. **`flee="N"` win threshold** — `makeFight` reads it as `winThreshold`;
   `fightRound` wins when enemy Stamina ≤ N (not only 0). Fixes 570's "reduce the
   Tree Guard to 5". (The 4 `flee="N"` sections; distinct from the 20 `<flee>`
   *child* Flee buttons, which already worked.)
2. **Gating** — `computeFightGate` finds the navigation that follows a `<fight>`;
   `applyFightGate` disables it (tooltip "Defeat the … first") while the fight is
   unresolved, then on a win enables everything **except** the lose-branch.
3. **Win vs lose branch** — the "if you lose…" goto is detected by conservative
   prose cues (WIN cues veto, so under-marking just falls back to death — never
   strands a win). On a loss it's the only branch enabled.
4. **Non-death loss** — reaching 0 Stamina in a fight that has a lose-branch sets
   `outcome='lose'` and **defers death**, so the player takes that branch (e.g.
   570 → 195, which restores Stamina) instead of dying. No lose-branch ⇒ death.

Verified: 18 targeted fight assertions (570 initial-gate / win / threshold, a
synthetic non-death loss with death-deferral, a no-lose-path death, flee child) +
the full render-every-section smoke test (all 165 fight sections render clean).

---

## 2. Finish the logic/view split (started with combat/market/rest)  — **done**

Every game rule now lives in a headless, DOM-free module; `render.js` builds the
widget and wires the button, then calls the rule and displays the result:
- **Training** → `engine.rollTraining()` (roll beats natural score ⇒ +1 ability).
- **Rank check** → `engine.rollRankCheck()` (success iff roll ≤ Rank; returns `margin`).
- **Difficulty** → `engine.rollDifficulty()` (already extracted; now also returns `margin`).
- **Resurrection** deal purchase → `engine.buyResurrectionDeal()`.
- (Combat → `combat.js`, economy → `market.js`, rest → `engine.applyRest` — earlier.)

`<random>` needs no extraction: it has no pass/fail rule at the roll site (it
sums `rollDice` + `childAdjustment`, both already in `engine.js`; outcome ranges
are matched later by `engine.matchRange`).

Remaining: add the unit tests these now enable — see item #12.

---

## 3. Fix multi-attribute `<if>` conditions  — **done**

`engine.evaluateCondition` used an `else if` chain, so a node such as
`<if codeword="Dove" title="Arena Champion">` checked only the first recognized
attribute and ignored the rest.

**Correction to the original task text:** the task said to combine the recognized
attributes as an *AND*. That is wrong — the canonical JaFL semantics is *OR*.
The original Java `IfNode.meetsConditions()` (`java-engine/flands/IfNode.java`)
returns `true` as soon as **any** present attribute is satisfied and applies
`not` to that final result; and every cited example's prose confirms OR:
book4/122 "codeword Dove **or** the title Arena Champion", book1/184 "codeword
Axe **or** … a black dragon shield", book3/222 "codeword Aid **or** … a ship
docked at Smogmaw", book6/160 "blessing … **or** a catastrophe certificate",
book1/460 light-source **or** Mage. Combining as AND would have broken all five.

Fix (`web/js/engine.js`): `evaluateCondition` now OR-combines every recognized
attribute (each is a disjunct; comma/pipe *within* a codeword or title list keep
their own AND/OR meaning), then negates with `not="t"`. A node with no recognized
attribute still defaults to true (task 17 tightens that to a warning + adds the
missing handlers — `weapon`/`armour`/`tool`/`disease`/`poison`/`cache`/`using`,
docked-at-location, natural-score, empty-god). Verified: 8 new engine assertions
in `web/_test.html` (codeword|title OR both ways + neither; item|profession OR;
`not` over the whole OR) + full render-every-section smoke test
(`RESULT ALL PASS pass=100 fail=0`).

---

## 4. Prevent silent save-slot overwrite  — **done**

`state.nextFreeSlot()` returned `0` when all 20 slots were occupied, so starting a
new game, opening a demo link, or importing a save could overwrite slot 0.

Fix:
- `nextFreeSlot()` (`state.js`) now returns **`null`** when all 20 slots are full.
- `importSave()` throws a clear "All 20 save slots are full…" error instead of
  landing on slot 0.
- New-game start (`app.js`) checks `nextFreeSlot()` first; if full it shows a
  `slotsFullModal()` ("Delete or export one to free a slot") and refuses to start
  rather than clobbering slot 0.
- **Demo / preview (`?demo=`) mode** no longer creates a persistent save: a new
  `GameState.ephemeral` flag makes `save()` a no-op, so a preview never occupies
  (or overwrites) a slot. The in-game menu offers **"Keep this adventure"** for an
  ephemeral game, which calls `GameState.keep()` — it grabs the first free slot,
  clears the flag and persists, or throws if full.

Verified: 5 new headless assertions (`nextFreeSlot()===null` when full; import
throws when full; ephemeral game writes nothing to storage; `keep()` assigns a
real slot, clears the flag and persists) plus a real-app boot check — title
screen and `?demo=1.1` game screen both render with no fatal error and no save
written. Full smoke test `RESULT ALL PASS pass=105 fail=0`.

---

## 5. Implement `<items group … limit="N">` "choose up to N" pickup  — **done**

Grouped award rows now enforce the "choose up to N" cap. In `render.js`:
- **Pre-scan** — `begin()` scans the section for every `<items group="X"
  limit="N"/>` controller and records `group → limit` in `ctx.groupLimits`, so the
  cap is known regardless of whether the controller sits before or after the award
  rows (both orders occur in the corpus).
- **Controller** — a new `case 'items'` → `renderItemsController` renders a small
  live status pill (`.items-pick-status`: "Choose up to N — M left" / "Chosen all
  N") so the player sees how many picks remain.
- **Award rows** — `renderItemAward` reads the row's `group=`; when the group has
  a limit it consults a per-visit `ctx.groupPicks` tally. Taking a row increments
  the tally; once the tally reaches the limit the remaining (untaken) rows disable
  with a "You may choose only N" tooltip. The 12-item carry cap still applies on
  top. A group with award rows but no controller (limit unknown) falls back to the
  prior per-row behaviour, so nothing regresses.

Affected sections: `book1/16`, `book4/113`, `book4/137`, `book4/218`,
`book5/671`, `book5/709`.

Verified: 9 new headless assertions (§218 limit=1 — six rows, all enabled, status
pill, one pick takes exactly one item and locks the other five with the cap
tooltip; §671 limit=2 — after one pick more remain, exactly two taken, then the
rest lock) + full render-every-section scan. `RESULT ALL PASS pass=220 fail=0`.

---

## 6. Harden save import and migration  — **done**

`importSave()` only checked for an object with `abilities` and `stamina`, and
`migrate()` did a shallow `{...base, ...data}` merge, so a malformed file could
still land wrong array/object shapes (a string `items`, junk affliction/ship
entries, non-numeric stats) that later broke rendering or the sheet.

Fix (`web/js/state.js`):
- **`sanitizeData(raw)`** (exported) deeply coerces every field of the known
  schema and **drops** bad entries rather than trusting them: strings→numbers
  with min/max/int clamps (Stamina clamped to its max, Rank/Shards floored,
  abilities `clampAbility`'d 1–12); `items`/`caches.items` filtered to well-formed
  possessions (nameless ones dropped); `titles`/`ships`/`curses`/`diseases`/
  `poisons`/`resurrections`/`effects` each element-validated; `codewords` kept
  only when truthy; `boxes` kept only when > 0; `vars`/`codewordValues` kept only
  when finite; `book`/`section`/`startBook`/`history`/`turns` coerced. Unknown
  top-level keys are discarded (the schema is fully known via `freshData()`).
- **`migrate()`** now simply delegates to `sanitizeData()`, so both **load** (from
  localStorage) and **import** are hardened by the same path.
- **`importSave()`** rejects non-save shapes up front with a clear error: not an
  object, an array, or `abilities` not being a (non-array) object, or missing
  Stamina.

Verified: 23 new headless assertions (field-by-field coercion/clamp/drop of a
deliberately hostile object; a junk save loaded into a live `GameState` renders
and computes derived stats without throwing; `importSave` rejects an array and a
non-object `abilities`) + the existing round-trip/exhaustion tests still pass +
full render-every-section scan. `RESULT ALL PASS pass=243 fail=0`.

---

## 7. Surface persistence failures to the player  — **done**

`GameState.save()` swallowed `localStorage` failures (logged only), so gameplay
continued as if progress was saved.

Fix:
- **`state.js`** — `save()` now **returns `true`/`false`** and sets a new
  `state.lastSaveError` to a player-facing message on failure (cleared on the next
  success). A `describeSaveError()` helper distinguishes a full store
  (`QuotaExceededError` / code 22 / Firefox 1014 → "Storage is full… export…
  delete an old save") from blocked storage ("…private-browsing mode… export to a
  file"). An ephemeral preview game reports success without writing.
- **`app.js`** — a `surfaceSaveError()` helper shows a modal ("Progress not
  saved") with a one-click **Export now** option; it is shown once per failure
  streak and re-arms once saving recovers. It is wired into the `onChange`
  listener (so any gameplay change that fails to persist warns), and the two
  "Save & quit to title" buttons + new-game start now check `save()`'s result and
  warn (with `force`) instead of silently proceeding as if saved.

Verified: 6 new headless assertions (normal save returns true / clears error;
simulated `QuotaExceededError` → false + "full" message; blocked-storage →
private-browsing message; recovery re-clears; ephemeral save reports success
without writing) + full render-every-section scan. `RESULT ALL PASS pass=249
fail=0`.

---

## 8. Make service-worker upgrades atomic  — **done**

`sw.js` used `cache.add(url).catch()` for every asset, so a missing **required**
file didn't abort the install; `activate` then deleted *all* old caches, so a
partial install could discard the last complete offline cache.

Fix (`web/sw.js`):
- **Split the precache list** into `REQUIRED` (app shell + all six books' data —
  the game can't run offline without these) and `OPTIONAL` (the large map/world
  images, fetched lazily on demand otherwise).
- **Install is all-or-nothing for REQUIRED** — `cache.addAll(REQUIRED)` rejects
  if any required asset fails, so the install fails and the previous complete
  cache lives on; we never activate an incomplete shell. `OPTIONAL` assets are
  added best-effort (`.catch`), so a map miss can't abort the upgrade.
- **Activate deletes old caches only after verifying completeness** — it
  re-checks that the new cache holds every `REQUIRED` asset (`cache.match`) before
  deleting any older cache; if incomplete, it keeps the old caches as an offline
  fallback. `skipWaiting`/`clients.claim` are preserved.

The `const VERSION = '…';` line kept its shape so `stamp-version.ps1`'s cache-key
rewrite still matches. Verified: `sw.js` compiles cleanly in headless Chrome
(`new Function(source)` syntax check) + full render-every-section scan unaffected.
`RESULT ALL PASS pass=249 fail=0`.

---

## 9. Centralise tag dispatch into a registry  — **done**

Tag handling was spread across two hand-rolled switches (`render.js`
`renderElement`, `engine.js` `applyEffect`). Both are now table-driven:

- **`engine.js`** — an `EFFECT_APPLIERS` map (`tag → (el, state, opts) => note`)
  replaces the `applyEffect` switch; `applyEffect` is now a one-line lookup
  (unknown tag → `''`, as before). This is the DOM-free "factory" half.
- **`render.js`** — a module-level `TAG_RENDERERS` map (`tag → Story method
  name`, all methods sharing the `(container, node, path)` signature) replaces the
  `renderElement` switch; the four cases that had inline bodies were extracted
  into methods (`renderParagraph`, `renderTextWrapper` for `<text>`/`<desc>`,
  `renderChoiceElement` for a bare `<choice>`, `renderReroll`) so every tag maps
  to a named handler. The `INLINE_STYLE` pre-check and the `PASSIVE_TAGS` / prose
  fallback in the default path are unchanged.

**Design note (deviation from the original single-table sketch):** the task text
suggested *one* unified table `{render, applyEffect, condition}`. Kept as **two
per-module tables** instead, deliberately — a single table holding both a DOM
renderer and a headless applier would couple the view to the rules and break the
architecture invariant (rules live in DOM-free modules). The task's own
parenthetical — "mirror the factory, *minus the UI coupling*" — asks for exactly
this split. `condition` isn't tag-dispatched at all (it's attribute-based OR
matching inside `evaluateCondition`, reached via the `if`/`elseif`/`else` render
entries), so it has no place in a tag table and is left as-is.

Adding a tag is now a one-line change per concern (a `TAG_RENDERERS` entry + its
method for the view; an `EFFECT_APPLIERS` entry for a passive effect). Pure
refactor — no behaviour change. Verified: full render-every-section scan (4369
sections, every tag exercised). `RESULT ALL PASS pass=570 fail=0`.

---

## 10. Dice RNG quality / reproducibility  — **done**

`engine.js` rolled with `Math.random()` — unbiased for 1–6 but **not seedable**.
Added a central, optionally-seedable RNG so runs can be made reproducible:

- **`engine.js`** — a module-level `_rng` now backs all *game* randomness. `rng()`
  returns its float in [0,1); `rollD6`, `rollDiceExpr` and the probabilistic
  `chance="x/y"` item loss all call it. Unseeded, `_rng` defers to the **live**
  `Math.random` (`() => Math.random()`, evaluated per call — so a test that stubs
  the global still steers the dice, and there's no bias). `seedRng(seed)` installs
  a deterministic **mulberry32** PRNG (a string seed is hashed to 32 bits via
  **xmur3**; a finite number is used directly), returning the numeric seed; pass
  `null`/`''` to revert to `Math.random`. Both helpers are exported.
- **`app.js`** — a `?seed=<value>` boot hook seeds the RNG for that page load and
  toasts the applied seed; unset ⇒ random as before. Documented in `README.md`
  beside `?demo=`.
- Deliberately **not** seeded: the dice-spin animation (`ui.js`) and DOM id
  suffixes (`state.js`) — cosmetic/structural, kept on `Math.random` so they can't
  perturb the outcome stream.

`crypto.getRandomValues` (higher entropy) was considered unnecessary — mulberry32
is ample for dice and, unlike crypto, is seedable, which is the point here.

Verified: 8 new headless assertions (same numeric seed reproduces the sequence;
seeded rolls in 1..6; different seeds diverge; string seed deterministic; string
vs numeric differ; `seedRng` returns the applied seed / null on revert;
`rollDiceExpr` reproduces with its modifier) + the full render-every-section scan
(the existing `Math.random`-stub roll tests still steer the dice, confirming the
live-deferral). `RESULT ALL PASS pass=578 fail=0`.

---

## 11. Harden the per-visit memoization assumption  — **done**

`render.js` memoises applied effects / rolls by a positional node path
(`basePath + '.' + idx`). This is safe today because the parsed section tree is
static per visit, so a node keeps the same sibling index across re-renders. The
assumption is now both **documented** and **guarded**:

- **Comment** — `appendChildren` (`render.js`) carries a block comment spelling
  out the invariant: every memo key (`fx@`/`roll@`/`grp@`/`pay@`/`chain@`) is
  derived from the positional path, so *conditionally reordering, inserting, or
  removing* siblings between renders would slide a node's path onto another node's
  memo slot — re-firing an applied effect or losing a resolved roll.
- **Tripwire** — a per-visit `ctx.pathNodes` map (`path → node`, reset each visit
  in `begin`) records the node first seen at each path; if a later re-render sees
  a *different* node at the same path, it `console.warn`s pointing at this task.
  It never fires under the static-tree model (a dev aid, ~1 map op/node, not a
  hot-path cost).

Verified: 3 new headless assertions (a real mixed section re-rendered twice trips
no warning; `pathNodes` populates on first render; the tripwire *does* fire when a
path is forced to map to a new node — proving it's live) + the full
render-every-section scan raising no reorder warning across all 4369 sections.
`RESULT ALL PASS pass=581 fail=0`.

---

## 12. Add headless unit tests for the extracted rules  — **done**

Audited the listed cases against the current suite first — most were already
covered, so this filled only the genuine gaps:
- **Already covered** (left as-is): over-Defence miss (a Def=COMBAT+12 wall never
  scratched, §task-49 block), `<fightdamage type="add">` + `type="replace">`
  (§105/hangman), cargo capacity (galleon 3-unit cap, 4th refused), and fixed /
  full / blank rest with cost charging (task-31 block).
- **New assertions** (6, at the end of `run()` in `web/_test.html`): a **decisive
  win** (a defenceless enemy falls, hero survives, `outcome==='win'`); a
  **decisive death** (an enemy that strikes first for lethal damage and can't be
  beaten kills the hero — `isDead()`, not a win); the **12-item carry cap on a
  buy** (`buyTrade` refused with the "carry only 12" note and *no* Shards spent,
  then succeeds and charges once a slot is freed); and a **dice rest** (`applyRest`
  with `"2d"`, `Math.random`-forced deterministic, heals the rolled total).

Note: the new block initially collided with an existing `let gw` in the same
`run()` scope — a duplicate declaration is a parse-time `SyntaxError`, which
silently aborts the whole module (page stuck at "running…", not a test failure).
Renamed to `gw12`. Verified: `RESULT ALL PASS pass=587 fail=0`.

---

## 13. Optional: build-time XML validation  — **done**

`build/build-data.ps1` bundled section XML unchecked, so a malformed file only
surfaced as a render throw in the browser (caught late, by the smoke test). Added
a **validation pre-pass** (`build/build-data.ps1`) that runs before anything is
written:

- A `Test-XmlDoc($xml, $label, $expectRoot)` helper parses a fragment with
  `System.Xml.XmlDocument.LoadXml` (strict XML — stricter than the runtime
  `DOMParser`) and, when `$expectRoot` is given, checks the root element. (Uses
  `.get_Name()` — PowerShell's XML type adapter overrides plain `.Name` to return
  the `name` *attribute*, a gotcha that made an early root check misreport.)
- The pre-pass validates **every section** (well-formed **and** rooted at
  `<section>`), plus each book's `Adventurers.xml` and the two rules files. Any
  failure prints the offending file(s) and **throws** (`$ErrorActionPreference =
  'Stop'`), aborting *before* JSON is written — so broken data never ships.
- Chosen over wiring the whole render-every-section smoke test into the build: it
  needs no browser/server, runs in-process, and pinpoints the bad file by name.

Confirmed the corpus is strict-XML clean first (4369 sections + 6
`Adventurers.xml` + 2 rules = **4377 files, 0 malformed**), so the gate never
fires spuriously; the failure path was unit-checked against an unclosed tag, a
stray `&`, and a wrong root. Full build runs clean (`XML OK: 4377 files
well-formed.`), the six book JSONs are byte-identical (no reformat), and the
headless suite is green (`RESULT ALL PASS pass=587 fail=0`). README's
"Regenerating the data" section documents the new gate.

---

## 14. Fix save-card button overflow on mobile  — **done**

On the saves screen each `.save-card` laid out the info and a `.save-btns` row of
three full-size buttons (Play / Export / Delete) side by side; `.save-btns` is
`flex-shrink: 0`, so on a narrow phone the buttons overflowed the card (Delete
clipped off-screen). Fixed in `css/style.css` inside the `@media (max-width:600px)`
block: the card stacks (`flex-direction: column`), and the button row goes
full-width with each `.btn` `flex: 1; min-width: 0` and reduced side padding, so
the three buttons share the row and all stay visible. CSS-only; verified visually
at a 360px viewport and with the full render-every-section smoke test
(`RESULT ALL PASS`).

---

## 15. Fix `<gain>`/`<lose>`/`<tick>` ability effects (rank, stamina, "?", "*", fatal)  — **done**

`firstAbility` accepted only the six core abilities, so `ability="rank"`,
`ability="stamina"`, `ability="?"` and `ability="*"` were dropped by `applyLose`/
`applyTick`, and in a `<gain>`/`<tick>` the dropped effect left `did` false so the
bare-tick fallback **ticked the visit box instead** (39 rank-ups did nothing and
corrupted tick state; book2/157 wheel of fortune, etc.).

Fix (`web/js/engine.js` + `web/js/state.js` + `web/js/render.js`):
- New `applyAbilityChange()` routes any ability spec: core abilities, `rank`,
  `stamina` (permanent max+current move via `state.adjustAbilityStamina`), `*`
  (all six), and `?`/`a|b` (via `opts.chooser`). `applyLose`/`applyTick` now enter
  the branch on `ability=` alone and set `did`, so a recognized ability effect
  never falls through to the box tick.
- `fatal="t"` honoured in `adjustAbility`/`adjustRank`/`adjustAbilityStamina`:
  reducing an ability/rank/current-Stamina to 0 drops Stamina to 0 (death);
  non-fatal Stamina floors current at 1 (book2/157, book5/356 hangman).
- `effect="+fixed|+cursed|-…"` stored as per-ability flags (`data.abilityFlags`);
  a new `state.abilityForCheck()` (used by `rollDifficulty` and the `ability=`
  `<if>` path) treats fixed as 1 and cursed as auto-fail, with JaFL's **mask
  exception** for CHARISMA. The displayed/derived score is left untouched
  (matches JaFL's PURPOSE_TESTING split) — book2/643, book6/78/332.
- **Choosers** (`render.js`): `renderAbilityChoice` defers `<lose|gain|tick
  ability="?"/"a|b">` to pick buttons instead of auto-applying; `renderTraining`
  offers a chooser for a bare/`?`/`a|b` `<training>` (fixes the phantom `''`/`'?'`
  key — book5/59, etc.); `renderDifficulty` offers a chooser for multi-ability
  rolls (`combat|magic`, 14×; book1/344).

Verified: 17 new assertions (rank gain w/o box-tick; bare `<tick/>` still ticks;
permanent stamina gain/loss; fatal stamina & fatal core-ability death; `*`; `?`
via chooser; fixed/cursed + mask; cursed auto-fails difficulty; §344 chooser→roll;
§59 six-ability chooser) + full render-every-section scan. `RESULT ALL PASS
pass=122 fail=0`.

Deferred (tracked elsewhere, not this task): `<lose>`'s `<adjust>` child
modifiers on ability/stamina damage → **task 25**; the flag-gated wheel spins in
book2/157 (`<random flag=…>`) still default the "?" choice to the first eligible
ability until **task 30** wires the payment gate; and book6/332's
`12-charisma modifier="natural"` raise depends on **task 25**'s `<set modifier>`
fix (the `-fixed`/`-cursed` clearing itself works).

---

## 16. Make wildcard/choice losses actually take things  — **done**

Robbery, imprisonment, disarming and death-cleanup sections left the player
untouched. Fixed in `web/js/engine.js` (`applyLose`/`applyShipLose`/new
`loseEquipment`) and `web/js/state.js` (`removeCurse`):
- `shards="*"` now empties the purse; `item="*"` removes every possession
  (honouring `chance="x/y"` probabilistic loss — book §…, and never taking a
  `keep`-tagged item) — book1/218, book1/157, book5/7.
- `blessing="*"` removes all blessings; `blessing="?"` removes one (via
  `opts.chooser`, else the first) — book2/157 outcome 5, book2/394.
- New `weapon=`/`armour=`/`tool=` loss handling: `"*"` = all of that kind,
  `"?"`/name = one (chooser/first), `using="t"` = the wielded weapon / worn
  armour; `bonus=`/`tags=` narrow the candidates (~15 confiscation nodes).
- `cargo="?"` removes one cargo unit (chooser or first) instead of the old
  `indexOf('?')` no-op (18×).
- `resurrection="t"` clears **all** arrangements (book2/394, book6/230);
  `removeCurse('*')` now lifts **every** matching curse (state.js).

Verified: 10 new headless assertions (lose-all Shards; lose-all possessions with
a surviving keep item; blessing "?"/"*"; weapon/armour `using="t"`; weapon "*";
resurrection clear-all; curse "*"; cargo "?") + full render-every-section scan
(`RESULT ALL PASS pass=132 fail=0`).

Deferred: an interactive weapon/armour/cargo chooser (the engine `opts.chooser`
hook is in place but unwired in the view, so a "?" confiscation defaults to the
wielded/first item — consistent with the §521 item-theft model). `curse="?"`
(3×) needs the named curses from **task 19**; `<lose item="?" cache=…>` is
**task 20**.

---

## 17. Recognise all spec'd `<if>` attributes; stop defaulting unknown conditions to true  — **done**

`evaluateCondition` (`web/js/engine.js`) had no handlers for `weapon=`, `armour=`,
`tool=`, `disease=`, `poison=`, `cache=`, `using=` or `bonus=`-filtered forms, so
those conditions silently passed/failed; and `docked=`, `modifier="natural"` and
empty-`god=` were mis-evaluated.

Fix (all OR-combined with the task 3 disjuncts):
- **weapon/armour/tool** conditions via a new `matchEquipment()`: `"?"`/`"*"`/empty
  = any of that kind; a name or `*glob*` (pipe-separated) matches by name;
  `bonus=` ("N"/"N+") and `tags=` narrow; `using="t"` restricts to the wielded
  weapon / worn armour (book2/90, book6/614, the book-6 weapon-type checks).
- **docked="<place>"** now needs a ship berthed at that place (`docked="t"` =
  anywhere), instead of matching any ship (book3/53/222/345).
- **modifier="natural"** compares the written ability score (`abilityForCheck(ab,
  true)`), not the item-boosted one (book2/554, book5/435).
- **god=""** = "worships no god" (`gods.length===0`) — book2/578.
- **cache=** redirects the shards/item/equipment lookups to a named stash
  (`state.cacheMoney`/`cacheItems`); **task 20** stocks those caches.
- **disease=/poison=** read `state.hasDisease`/`hasPoison`; **task 19** populates
  the affliction store.
- The source-XML typo `safeAddGodd` is accepted as an alias of `safeAddGod` (see
  new task 37).
- Genuinely unrecognized condition attributes now **`console.warn` once** and
  make the condition default to **false** (negated to true under `not="t"`)
  rather than silently passing; every attribute currently used on `<if>`/`<elseif>`
  in the corpus is whitelisted, so no existing section changes behaviour.

Verified: 17 new assertions (weapon "?"/glob/using; docked location; natural vs
boosted; empty-god; unknown-attr default; disease) + full smoke test
(`RESULT ALL PASS pass=149 fail=0`).

---

## 18. Preserve item `tags` and support tag-filtered item conditions  — **done**

`makeItem` accepts a `tags` parameter but no caller passed it, so all tagged
awards lost their tags and every `<if item="?" tags="light">` check was
permanently false (the Yellowport sewers questline was unenterable for
non-mages — book1/460 → §164).

Fix — tags now flow through all four call sites:
- **Awards** (`render.js` `renderItemAward`) read the node's `tags=`.
- **Market buys** (`market.js` `goodsFrom`→`buyTrade`) and **inline buys**
  (`applyInlineBuy`, wired from `renderInlineBuy`) read `buytags=` (falling back
  to `tags=` — the candle rows use `buytags`).
- **Starting items** (`data.js` `parseAdventurers` → `GameState.create`) carry
  their `tags=`.
- A shared `parseTags()` helper (state.js) does the comma/pipe split; the item
  **condition** now supports `item="?"` + `tags=` (any possession carrying every
  listed tag), mirroring the lose-path wildcard.

Verified: 6 new assertions (award preserves `light`; `if item="?" tags="light"`
true/false; the §460 non-mage-with-light gate; a market buy preserves
`light,useonce`) + full smoke test (`RESULT ALL PASS pass=155 fail=0`).

---

## 19. Implement the curse / disease / poison system end-to-end  — **done**

The affliction system now works end-to-end. Afflictions are stored uniformly as
`{name, type, effects:[{ability,bonus}], cumulative, lift}` (state.js
`addAffliction`/`removeAffliction`, backing `data.curses`/`diseases`/`poisons`):
- **Inflict** (`engine.js` `applyAffliction` + `readEffects`): the
  `<curse>`/`<disease>`/`<poison>` element's `name=` and `<effect ability=…
  bonus=…>` children are stored; `<disease>`/`<poison>` were added to the
  `applyEffect` switch and to `PASSIVE_TAGS` so they inflict on render (book4/31
  Curse of Tambu, book1/196 Ghoulbite, book1/532 Scorpion Poison).
- **Suffer**: `state.afflictionBonus(ability)` sums the effects and is folded into
  `ability()`, so the penalty hits derived stats (Defence) and checks until cured;
  clamps keep abilities ≥1.
- **Detect**: `hasCurse`/`hasDisease`/`hasPoison` match **by name**; the task-17
  `<if curse|disease|poison=…>` paths use them (book4/111/231, §532).
- **Cure**: `<lose curse|disease|poison="name"|"*"|"?">` removes the affliction
  (and its penalty), with `*` = all and `?` = the first (book4/12; the 11
  `<lose disease="*">`, 4 `<lose poison="*">`, 3 `<lose curse="?">`).
- **cumulative="t"** stacks; a non-cumulative re-infection has "no further effect".

Verified: 10 new assertions (curse inflict→detect→Defence penalty→cure; disease
non-cumulative + `<lose disease="*">`; poison by name; cumulative stacking) +
full smoke test (`RESULT ALL PASS pass=165 fail=0`).

Deferred: the curse-flavoured `special=` effects (armourlock/weaponlock,
difficultyCurse/difficultyRestore) remain **task 36**.

---

## 20. Implement caches, banks, `<adjustmoney>` and `<transfer>`  — **done**

The whole stash/bank economy now works. A cache is a named stash the books
address by key (`state.data.caches[name] = {money, items, locked}`): an
investment box, a bank account (`MerchantBank`), a gambling pot, or a villa
strongroom.

- **Cache store** (`state.js`): `_cache`/`cacheMoney`/`cacheItems`,
  `deposit/withdrawCacheMoney` (the latter with a `withdrawCharge` fee, rounded
  in the house's favour), `set/adjust/multiplyCacheMoney` (all floored, ≥0),
  `cacheAddItem`/`cacheRemoveItem`, and `lock/unlock/isCacheLocked`.
- **`<adjustmoney multiply="N">`** (`engine.js applyAdjustMoney`, added to
  `applyEffect` + `PASSIVE_TAGS`): scales a named cache (`name=`/`cache=`) or,
  with no name, the purse — book1/91 gamble (×5/×2/×0), book2/107/108,
  book5/116, and "lose half your money" (book6/139 et al.).
- **`<transfer>`** (`engine.js applyTransfer`): moves shards/weapon/armour/
  tool/item between the sheet and a cache — `to=` deposits, `from=` withdraws;
  `*`/`?`/name select; `limit=`/`x<kind>=` narrow. Confiscate-and-return
  (book2/462 vampire). A `force="f"` transfer is opt-in (a click in the view);
  a forced one applies on view.
- **lock/unlock** (`engine.js applySpecial`): `<tick special="lock|unlock"
  cache=…>` toggles a cache's `locked` flag.
- **`cache=` routing**: `<if cache=…>` already read the stash (task 17) and now
  it is populated; `<lose … cache=…>` and `<tick … cache=…>` (deposit / item
  enchant via `addtag`/`addbonus`) redirect to the cache. **The `cache=`-on-lose
  corruption is fixed first** — `<lose item="?" cache="4.468">` (book4/468) now
  takes from the villa stash, never the player's carried possessions.
- **Widgets** (`render.js`): `renderMoneyCache` (deposit/withdraw, honouring
  `max=`/`multiples=`/`withdrawCharge=`) and `renderItemCache` (store/take
  possessions, honouring `itemlimit=` and the 12-item carry cap), plus CSS.

Known limitation: because the section re-renders in a single memoized pass, the
lock/unlock bracket used by book1/91's gamble doesn't gate the widget's
interactivity (the primitive exists and is tested, but the widget stays live).
This affects only the "can't change your bet after rolling" nicety; deposits,
withdrawals, investments, banking and the villa stash all work. §91 renders
clean.

Verified: 18 new headless assertions (deposit/withdraw incl. bank fee; named-
cache multiply incl. ×0 wipe; purse-multiply floor; `if cache` threshold; the
§4.468 stash-not-inventory loss; `lose shards="*" cache`; lock/unlock; `tick
shards cache` deposit; transfer disarm/return round trip; `transfer shards="*"`;
§49 money-cache widget deposit; §468 item-cache widget renders) + full
render-every-section scan. `RESULT ALL PASS pass=187 fail=0`.

---

## 21. Fix `<flee>`/`<fightdamage>`: no render-time auto-apply, find them anywhere, honour `flee="t"`, `type="replace"`  — **done**

All four defects fixed:
1. **Render-time auto-apply (worst):** `renderElement` now has explicit
   `case 'flee'`/`case 'fightdamage'` → `renderInert`, which shows the prose but
   applies **no** effects and disables any controls it produces (using the same
   `this.inactive` suppression as an untaken branch). Entering book2/207 no
   longer costs the flee wound, and book1/105's ScorpionSting is no longer set on
   view (nor double-applied).
2. **Discovery:** `findSibling` (forward same-level only) is replaced by
   `findInSection(tag)` (`sectionEl.querySelector`), so a `<flee>`/`<fightdamage>`
   is found wherever it sits — inside a `<p>`, or before the `<fight>`
   (book2/152/207/297/313).
3. **Gate:** `computeFightGate` now skips `<choice flee="t">` (never added to
   `navNodes`), so book3/662's "flee at any time" stays live mid-fight. The
   flee="t" choice itself applies the `<flee>` consequence on click.
4. **Semantics:** the enemy-attack branch in `combat.js` honours
   `type="replace"` (no Stamina loss; apply the body instead — book5/356 hangman)
   vs the default `type="add"` (Stamina loss **plus** the body — book1/105), and
   a new headless `engine.applyEffectBody` walks the **whole** `<fightdamage>`/
   `<flee>` subtree per wound (all children, rolling any `<random>`/`<rankcheck>`/
   `<difficulty>` and honouring `<if>`/`<elseif>`/`<else>` chains), not just
   `firstElementChild`.

The Flee button and any `flee="t"` choice both call `applyEffectBody(fleeNode)`
on the flee event (a fatal parting wound routes to death), then navigate to the
flee's inner `<goto>`, else the `flee="t"` choice's section, else re-render so a
box-gated flee choice unlocks (book2/207 → §22).

Verified: 9 new assertions (§207 no auto-apply + Flee button applies wound +
codeword; §105 ScorpionSting unset on render; fightdamage type=add effect +
Stamina loss per wound; type=replace loses an ability not Stamina; §662 normal
post-fight choice gated while flee="t" stays live and applies its wound → §407) +
full render-every-section scan. `RESULT ALL PASS pass=196 fail=0`.

---

## 22. Render `<success>`/`<failure>`/`<outcome>` children of `<choices>`  — **done**

`renderChoices` kept only `<choice>` children, silently dropping the roll-branch
elements the books place inside choice tables (book1/123's swim SCOUTING roll led
nowhere). Fix (`render.js`): `renderChoices` now iterates *all* children in order
and routes `<success>`/`<failure>`/`<outcome>`/`<outcomes>` through `renderBranch`
(alongside the `<choice>` buttons), so the branch reveals its goto once the
prose's `<difficulty>`/`<random>` resolves. `renderBranch` gained a lone-
`<outcome>` case matching on `flag=` (no roll needed — the paid-offering idiom in
book4/456), `range=`/`var=` (vs the roll) or `codeword=`. Covers book1/123/554,
book2/53/61/122/138/190, book3/533, book4/456/457, book5/333, book6/735.

Verified: 4 new assertions on §123 (roll button + 4 plain choices render; branch
hidden until rolled; a swim outcome →53/→76 revealed after rolling) + full smoke
test (`RESULT ALL PASS pass=169 fail=0`).

---

## 23. Make inline `<buy>`/`<sell>` functional (ships, tools, quantity, item sells)  — **done**

**Buys:** `market.applyInlineBuy` now returns `{ok, note?}` and handles every
inline-buy kind — crew upgrade, **ship** (type canonicalised via a new
`rules.canonShipType`, with `name=`/`initialCrew=`), **tool** (with `ability=`/
`bonus=`), **item**, and **cargo** (routed through `buyTrade` so ship capacity is
enforced). `renderInlineBuy` reads `ship=`/`tool=` and honours `quantity=` as a
per-visit purchase cap, memoised in a new `ctx.buys` counter so a buy can no
longer repeat forever (book1/30 map, book1/359 "up to three lanterns"). The
plot-critical ships (book2/663, book3/393/406/710, book4/114/559/658, book5/192)
and priced tools (book1/299 mandolin, book5/548 wands, book6/421 talismans) are
granted; `buy ship="brig"/"gall"` canonicalise to brigantine/galleon.

**Sells:** `renderInlineSell` now handles `item=` + `shards=` sells (book 5's
rime-ice / selenium-ore income at book5/141/446/457/594; the book1/30 treasure-
map buy-back), repeatable while owned, via a new `market.sellInlineItem`. The
misleading "non-cargo sells unused" branch is gone.

**Rules-out-of-view (task 34 slice):** the inline cargo→Shards transaction moved
from `renderInlineSell`'s click handler into `market.sellCargo` (the view keeps
only the barter-reward wiring); the crew-upgrade grade check uses `CREW_LEVELS`
from `rules.js`.

Verified: 15 new assertions (buy ship grants a named ship; galleon holds 3 cargo
units, 4th refused; `brig`→brigantine + `none`→poor crew; buy tool grants a
bonus tool and charges; buy refused when short; sell-item round trip; §359
lantern quantity-3 cap with the light tag preserved; §30 treasure-map buy
memoised at quantity 1 + buy-back sell round trip) + full render-every-section
scan. `RESULT ALL PASS pass=211 fail=0`.

---

## 24. Canonicalise ship types (`brig`, `gall`) and fix crew-upgrade steps  — **done**

The books abbreviate ship types (`<trade ship="brig">` / `"gall"` — book4/141,
book5/145/225), so `type:'brig'/'gall'` fell through `shipCap` to the default 1
cargo unit (instead of brigantine 2 / galleon 3), and none of the 27
`<if ship="brigantine|galleon">` checks (nor `<elseif ship="brig">` on a
brigantine bought under its full name — book4/11/161) matched, since the raw
strings were compared. A crew *upgrade* (`<lose crew="-1">`, 4×, plus one
`crew="-2">`) on an excellent crew also indexed past the array end and silently
reset the crew to `'poor'`.

Fix:
- **`rules.js`** — a `SHIP_TYPE_ALIASES` map + `canonShipType()` fold
  `brig→brigantine`, `gall`/`galley`→`galleon` to the canonical `SHIP_TYPES`
  key.
- **`market.js`** — `shipCap`, `ownsGoods`, `buyTrade`, `sellTrade` and
  `applyInlineBuy` all canonicalise the ship type at purchase/sale and compare
  canonically; a new `canonCrew()` normalises `initialCrew=` (`none`→poor,
  blank/`oldcrew`→average).
- **`engine.js`** — a new `matchShipType()` canonicalises **both** the stored
  type and every listed alternative before comparing, wired into
  `evaluateCondition` (`<if ship=…>`) and `adjustApplies` (`<adjust ship=…>`);
  and `applyShipLose` now shifts the crew grade along `CREW_LEVELS` with a clamp
  on **both** ends (positive N demotes, negative N promotes; never wraps).
- **`ui.js`** — the Adventure Sheet ship line canonicalises the type so legacy
  saves holding an abbreviation still show the right label and capacity.

Verified: 12 new headless assertions (`<trade ship="brig">` stores a brigantine
with crew poor; a brigantine matches `<if ship="brig">`/`"brigantine">` and
rejects barque/galleon; a legacy `gall` ship matches `galleon`/`gall`; crew
upgrade past excellent stays excellent; `crew="-2"` from good clamps to
excellent; demotion below poor stays poor; average→good moves one step) + full
render-every-section scan. `RESULT ALL PASS pass=260 fail=0`.

Note: the prior session's test additions had shipped with a duplicate `const
gca` (colliding with the §... cargo test), a `SyntaxError` that had silently
broken the *entire* headless suite; renaming the new binding to `gcma` restored
it and confirmed all 260 assertions pass.

---

## 25. Fix value/expression parsing: vars containing "d", unary minus, division  — **done**

`resolveValue` tested `isDiceExpr` with `/d/i`, so any variable whose name merely
*contained* a "d" was misparsed — `<adjust amount="d">` rolled a die instead of
reading var `d` (book6/696/527/742), and `deduct`/`defence`/`shards` were all
treated as dice. `"-bonus"`/`"-s"`/`"-a"` looked up a var literally named
`-bonus` → 0 (book2/726/750/770/579). `evalExpression` tokenized only
`[A-Za-z_]+|\d+|[+\-*]` — no `/`, no parens, no unary minus — so
`"(shards+9)/10"`, `"shards/1000"`, `"(x+1)/2"`, `"(900-shards)/100"` and
`"-armour"`/`"-defence"` (book2/665, book4/679, book6/306/527/696/742) returned
garbage or 0. And `applyLose`/`applyAbilityChange` never applied
`childAdjustment`, so `<lose stamina="3d"><adjust .../></lose>` gave no damage
reduction (book4/556/679, book6/306/527/696/742; the spec lists `<gain>`/`<lose>`
as adjust-modifiable).

Fix (`web/js/engine.js`):
- **`isDiceExpr`** now matches a real dice pattern only —
  `/^\d+\s*d\s*\d*\s*([+-]\s*\d+)?$/i` (a leading digit is required), so `1d`/`2d`/
  `3d6`/`1d6+2` roll but `d`/`deduct`/`defence`/`shards` are variables. (Every
  `="d"` in the corpus is the variable `d`, never a bare die.)
- **`resolveValue`** is now *variable-first* (matching Java `Node.getAttributeValue`
  — int | `-var` | var, undefined → 0), with a fallback to `evalExpression` for
  any richer expression. An `<adjust amount="armour"/>` therefore reads the
  *variable* `armour` (sections set it to `-armourbonus`), not the sheet rating.
- **`evalExpression`** is a proper recursive-descent parser over the original Java
  `Expression` grammar: identifiers, integers, `+ - * /` (integer division,
  truncating toward zero) and parentheses, with a leading unary minus. Idents
  resolve *keyword-first* (armour/weapon/defence/stamina/shards/rank/crew + ability
  names, then stored vars) — the `<set value=>` contract.
- **`applyLose`** (stamina) and **`applyAbilityChange`** now add
  `childAdjustment(el, state)` to the amount; `adjustAmount` learned the `stamina`
  keyword (→ the natural/unwounded `staminaMax`) so book2/579's "reset your
  unwounded Stamina to the 2d roll" idiom works.

Verified: 29 new headless assertions (isDiceExpr on real dice vs "d"/"deduct"/
"defence"/"shards"; resolveValue reads `d`/`deduct` as vars and negates `-s`/
`-bonus`; integer-division/parens/unary-minus/keyword forms of evalExpression;
`<set var="d" value="-armour"/>` → armour-reduced stamina loss; book4/556 Three
Fortunes −1; a plain loss unchanged; book2/579 unwounded-Stamina reset) + full
render-every-section scan (4369 sections). `RESULT ALL PASS pass=289 fail=0`.

---

## 26. Implement the remaining `<fight>` attributes  — **done**

`makeFight` read only name/combat/defence/stamina/flee/playerFirst; every other
documented `<fight>` attribute in the corpus was silently ignored. All are now
implemented (`web/js/combat.js`, wired in `web/js/render.js`):

- **`attackDice="N"`** — the player rolls N dice to attack instead of 2 (Haniwa
  Warrior, book6/473).
- **`attacks="N"`** — the enemy strikes N times per round (Tripling, book5/345).
- **`modifiers="noarmour"`** — the player's armour bonus is dropped from their
  Defence for this fight (Water Drake, book6/718).
- **`playerDefence="V"`** — a value/variable replaces the player's Defence
  (Chimerical Beast `"s"`, Talanexor `"d"`), resolved each round via
  `resolveValue` (variable-first).
- **`abilityDamaged="S"`** — the enemy's hit reduces that ability instead of
  Stamina; `"stamina"` is a *permanent* max+current cut (`adjustAbilityStamina`,
  fatal) — the Big Boy / Giant fights (book6/460/563).
- **`preDamage="V"`** — damage inflicted on the enemy up front (from a codeword,
  else a like-named var), which may fell it before the first blow.
- **`staminaLost="S"`** — reset the codeword to 0 at fight start and accumulate
  the (overkill-capped) damage the player deals into it. The pair drives the
  Dawatsu Morituri fights (book6): the first stores `MorDamage`, the second reads
  it via `preDamage`.
- **`useCache="S"`** — the enemy fights with the best weapon/armour stashed in
  the named cache (their bonuses add to the enemy's Combat/Defence) — the Warrior
  Maid, book6/635.
- **`group="S"`** — a *simultaneous* multi-enemy fight: a combined widget
  (`renderGroupFight`/`drawGroupFight` + `combat.groupFightRound`) where the
  player strikes one foe and every still-standing foe strikes back
  (book6/192/273/291/618). A shared `sectionFight` proxy drives the existing
  fight-gate / death-defer machinery (win when all are down; lose→branch when the
  player is slain and the section has an "if you lose…" path).

`makeFight(node, state)` now runs the pre-fight setup (staminaLost reset,
useCache loadout, preDamage) once when state is supplied; `fightRound`/
`groupFightRound` default `attackDice`/`attacks` so a bare fight literal still
resolves.

Verified: 15 new headless assertions (attribute parsing; preDamage carry-over &
pre-kill; staminaLost reset + accumulation; attackDice=1 miss-cap; attacks=3
strike count; playerDefence override; noarmour armour-drop; abilityDamaged max
cut; useCache loadout; a group fight resolving; §6.192 drawing one combined
widget) + the three pre-existing fight tests still green + full
render-every-section scan (4369). `RESULT ALL PASS pass=303 fail=0`.

---

## 27. Cap visit-box ticks and make `ticks=` guards robust  — **done**

`state.addTick` had no cap at the section's `boxes=` count. In book1/16
(`boxes="1"`): visit 1 ticks the box; on visit 2 the `<if ticks="1">` guard
matches (goto 251) but the sibling bare `<tick/>` still fires → count 2; from
visit 3 on the guard (strict `==`) never matches again and the one-time
dragon-hoard loot is re-offered. The `ticks="N"` guard pattern appears in ~30
sections in book 1 alone.

Resolution: the guard stays strict equality — the Java engine's
`IfNode.meetsConditions()` also uses `getTickCount(section) == ticks`, so `>=`
would diverge. The real fix is the **cap**, mirroring JaFL's
`SectionNode.addTicks`, which only fills *unselected* boxes (never exceeding the
`boxes=` count) — its guarded `<goto>` also fires immediately and short-circuits
the sibling `<tick/>`, which the JS single-pass render can't. Changes:
- **`state.js`** — a transient `setSectionBoxes(n)` records the current section's
  `boxes=` count (not persisted), and `addTick` caps the current section's total
  at it (`Math.min`). A boxless section (cap 0) or a tick aimed at another section
  is left uncapped, so nothing else changes.
- **`render.js`** — `render()` calls `state.setSectionBoxes(nBoxes)` before the
  section body renders, so the bare `<tick/>` is capped as it fires.

Verified: 5 new headless assertions (three successive visits to §1.16 each leave
the count at 1, not 2; the `<if ticks="1">` guard still matches on a repeat
visit; a boxless section stays uncapped) + full render-every-section scan (4369).
`RESULT ALL PASS pass=308 fail=0`.

---

## 28. Honour `dead="t"` on `<goto>`/`<choice>`  — **done**

61 `<goto dead="t">` and 11 `<choice dead="t">` rendered as normal enabled
navigation for a living player, so a book4/16 trample *survivor* could click the
link "7" into the you-are-dead section (whose dead-end fallback then funnelled
them into real death). Only `dead="t"` occurs in the corpus (no `dead="f"`), but
both are handled.

Fix (`web/js/render.js`):
- A new **`deadGate(node, btn)`** disables a nav button whose `dead=` doesn't
  match the player's state — `dead="t"` is blocked while alive ("Only if you are
  dead."), `dead="f"` while dead. Wired into `renderGoto` (button disable) and
  `renderChoice` (a gating reason). A dead player can still take a `dead="t"`
  link, and a living player still takes the normal (`dead`-less) branch — book4/16
  survivor → §666, not §7.
- **`computeFightGate`** now marks any post-fight `dead="t"` goto/choice as a
  lose-branch node directly, preferring that precise "you are killed" marker over
  the prose heuristic; it's disabled on a win and is the branch offered on a loss
  (and makes `hasLosePath` true so death is deferred to it).

Death routing itself (the `handleDeath` resurrection/undo modal) is unchanged, so
resurrection deals still take priority — this task only stops the living from
using death-only links and sharpens the fight gate's lose-branch detection.

Verified: 5 new headless assertions (§4.16 dead="t" §7 disabled while alive but
enabled when dead; living §666 stays enabled; a dead="t" choice disabled while
alive; the fight gate marking a dead="t" goto as the lose-branch) + existing
fight/resurrection tests still green + full render-every-section scan (4369).
`RESULT ALL PASS pass=313 fail=0`.

---

## 29. Market & item polish: currency items, pipe names, headers  — **done** (parts 1/3/4; 2 & 5 split out)

This item bundled five loosely-related market/item divergences. The three
contained, high-confidence display/award fixes are done here; the two that are
really subsystems (alternate-currency markets, and the item `<effect>` /`<sold>`
system) were split into tasks **40** and **41** so each gets focused treatment.

Done (`web/js/state.js` helpers `currencyAward`/`splitItemName`, wired into
`render.js` + `market.js`):
1. **Currency items** — an award named `"N Shards"` (dragon hoard book1/16 and
   the 150–2000-Shard picks) now grants N Shards instead of burning a carry slot
   on a valueless possession; it still counts as one grouped "choose up to N" pick.
3. **Pipe-name rows** — a `name="fur cloak|wolf pelt"` good (book4/417,
   book5/101/416) is stored under its first name with the alternatives as tags, so
   the Sell button enables and `<if item="wolf pelt">` matches under either name
   (`matchItems` already matches a name against tags); the row displays the first
   name.
4. **`header1=` titles** — the market heading now prefers the explicit `header1=`
   column title (book4/111 "Potions"/"Artifacts"), falling back to the `type=`
   keyword label then a generic heading, instead of always "Goods for sale".

Verified: 6 new headless assertions (currencyAward parsing; §1.16 "500 Shards"
award adds money and no item; splitItemName; a pipe-name buy matched by either
name incl. `<if item="wolf pelt">`; header1= heading) + full render-every-section
scan (4369). `RESULT ALL PASS pass=319 fail=0`.

Split out (were parts 2 and 5): **task 40** `<market currency="Mithral">`
(book2/495) — needs a named-currency pool rather than deducting Shards; **task 41**
the ~54 item `<effect>` children (`type="use"` potions/Vade Mecum use-goto,
`aura`/`wielded` passives, `ability`) plus `<sold>` sell-hooks (book3/86/318),
which is a sheet-UI + effect subsystem.

---

## 30. Gate `<random flag=…>` rolls behind their payment  — **done**

`renderRandom` ignored `flag=`, so a pay-gated roll was free, and the paired
`<lose … price="k">` (routed through `renderOptionalPay`) applied **every**
`[flag="k"]` node on payment — in book2/157 that fired *all six* wheel outcomes
at once (lose an ability *and* gain one *and* lose Stamina *and* lose all
blessings…). The whole "pay to spin" idiom now works, faithful to the Java
engine (`RandomNode`/`LoseNode`/`GotoNode` flag listeners + `canUse`):

- **Roll gate** (`renderRandom`): a `<random flag="k">` paired with a
  `[price="k"]` cost (`isRollGate`) is disabled until the payment sets flag `k`;
  rolling **consumes** the flag (`setFlag(k,false)`), and a fresh payment
  re-arms it (armed-with-a-stale-result ⇒ drop the result, show the button
  again) — the per-visit "spin again" cycle.
- **Payment** (`renderRollPayment`, split from `renderOptionalPay`): paying a
  roll-gate cost deducts Shards/an item and sets flag `k` **only** — it no longer
  fires the outcome effects. Gated purely on the flag (no one-shot memo), so it
  re-enables once the roll clears the flag; repeatable per-day/-attempt
  (book3/314, book5/674, book6/628). Handles item costs (book6/50 dragon mask).
- **Outcome effects** (`renderPassive`): a roll-gated `flag="k"` reward (a
  `<lose>/<gain>` inside a `<random>`-fed `<outcome>` — book2/157, book5/674)
  is no longer suppressed as a "dependent reward"; it applies when its outcome is
  revealed by the roll (an `ability="?"` outcome offers its chooser).
- **`<goto>/<choice>` gate** (`flagGate`, JaFL `canUse`): a `<goto price="k">`
  exit is withheld while the payment is armed (paid, unrolled) and reopens once
  the roll clears the flag (book2/157 → 19, book6/628 → 8, book3/680 → 407); a
  `<goto flag="k">` is the mirror. Never strands — the roll button always keeps a
  way forward, and the dead-end guard counts disabled controls.
- **Stale-flag reset** (`begin`): a section's `price=`/`flag=` coordination flags
  are cleared on entry (only if set), so leaving mid-transaction can't pre-arm a
  roll or reveal a paid outcome for free on the next visit (also hardens the
  book4/456 paid-offering idiom). Flags are always section-local in the corpus.

Covers book2/157, book3/314, book5/674, book6/171/50/587/628 (every
`<random flag=>` in the corpus; all pair with a `[price=]`).

Known limitation (per-visit memo, task 11): a *repeated identical* outcome
within one visit (e.g. rolling dysentery twice in book3/314) doesn't re-apply its
memoized narrative effect — the roll re-arms and re-reveals, but `fx@<path>` is
still deduped. The primary bug (free rolls / pay firing every outcome) is fixed.

Verified: 19 new headless assertions (`isRollGate` true/false; `<goto price>`
open-while-clear / shut-while-set; §157 roll-disabled-until-paid, pay deducts 20
and fires **no** outcome, roll armed + exit withheld, spin reveals exactly one
outcome + reopens the exit, re-pay re-arms; §314 pay→roll→re-pay repeat cycle;
§674 flag-"c" gate + pay charges 25 with Stamina intact) + full
render-every-section scan (4369). `RESULT ALL PASS pass=338 fail=0`.

---

## 31. `<rest>` with no `stamina=` should restore to full  — **done**

`renderRest` defaulted a missing `stamina=` to `'1'`, so a "heal you of all lost
Stamina points" safe house / temple / healer (62 such tags in the corpus) only
restored **one** point per click. Fixed to match JaFL `RestNode`, which treats a
missing `stamina` attribute as `-1` ⇒ heal *all* Stamina ("restore all your
Stamina" in its own tooltip):
- **`engine.applyRest`** gained a restore-to-full mode: a `null`/blank `perUse`
  heals `staminaMax` (clamped ⇒ back to full); a numeric/dice `perUse` heals that
  amount as before. Any `shards=` cost is still charged first. Returns the amount
  actually healed.
- **`render.js renderRest`** now passes `null` (not a defaulted `'1'`) when the
  node has no `stamina=` attribute, and labels the button **"Rest (heal all
  Stamina)"** vs **"Rest (+N Stamina)"** for the fixed/dice form. The already-at-
  full disable and the affordability check are unchanged.

Verified: 7 new headless assertions (`applyRest(null)`/`applyRest("")` restore to
full; a fixed `applyRest("3")` heals 3 clamped to max; a full-restore rest still
charges its cost; the `<rest stamina="2">` label vs the bare-`<rest>` "heal all"
label; §1.114 safe house heals all lost Stamina on click) + full
render-every-section scan (4369). `RESULT ALL PASS pass=345 fail=0`.

---

## 32. Implement or explicitly stub the remaining unhandled tags  — **done**

Every previously-unhandled tag now has an explicit renderer (`TAG_RENDERERS` in
`render.js`), so the default recursion no longer silently swallows them. Two are
implemented per spec; three are explicit passthroughs whose *automation* is
deferred (their prose still renders, exactly as the default recursion did — no
behaviour change):

- **`<field name= label=>`** (book4/93, book5/401, book6/117/731) — **implemented.**
  `renderField` shows a live codeword-counter readout (`label: value`, 0 if unset),
  re-read each render so it tracks `<tick name=>` (the bribery/offering bonus, the
  Uttaku court status).
- **`<extrachoice>`** (book1/122/327, book5/535/625/722, book6/448/448a) —
  **implemented** end-to-end. A persisted, keyed choice store
  (`state.extraChoices` + `add/removeExtraChoice`/`extraChoicesFor`, sanitised and
  save-safe): a section registers a choice available either at a specific
  `atbook`/`atsection` or at any section with a matching `tag=` (only `"temple"` in
  the corpus), jumping to `book`/`section` when taken; a same `key=` replaces, and
  `remove="key"` lifts it. `renderExtraChoice` registers/removes once per visit
  (silent book-keeping) and shows the note's inline prose; `surfaceExtraChoices`
  renders the active ones at their target section as `.extra-choice` buttons that
  navigate like a `<goto>`. Fixes book1/122's "Enter the sewers" surfacing at §1.10
  and the temple-only Recall/curse-removal options.
- **`<while var=>`** (book5/218, book6/700), **`<fightround pre=>`** (book5/24/383/689),
  **`<sectionview>`** (book5/114) — **explicit passthrough** (`renderChildrenOnly`):
  the inner prose/rolls render as before, but the *automated* mechanic is deferred
  — a true repeat-until-var loop, per-combat-round rolls, and the random-section
  "trance" viewer, respectively. These render one pass and progression is
  unaffected (each section's onward `<goto>` is outside the deferred mechanic).
  Kept as passthrough rather than inert precisely to avoid regressing the rolls the
  default recursion already showed.

Verified: 10 new headless assertions (`<field>` value+label; `<extrachoice>`
register → surface at its target → navigate → key-replace → `remove`; the
`tag="temple"` mode surfacing only at temple sections; a sanitize round-trip) +
the full render-every-section scan (all 5 tags exercised, no throw).
`RESULT ALL PASS pass=597 fail=0`.

Deferred follow-ups (filed mentally against their tags, not new tasks unless they
bite): true `<while>` looping, `<fightround>` per-round automation, and the
`<sectionview>` random-paragraph viewer. (`<adjustmoney>`/caches → task 20,
`<poison>`/`<disease>` → task 19, `<sold>` → task 29 — all already done.)

---

## 33. Narrate sections without `<p>` wrappers (TTS)  — **done**

`tts.js` `prepare()` wrapped sentences only inside `.flow` `<p>` elements, but
~1,544 of 4,389 sections render their prose as bare text nodes directly in
`.flow` — the 🔊 button and auto-narrate silently did nothing there (e.g.
book4/16, book2/745): `chunks` was empty and `play()` returned before setting
`playing`, with no user feedback.

Fix:
- **`tts.js`** — after the `<p>` pass, `prepare()` now also calls a new
  `wrapFlowRuns(flowEl)` that wraps runs of bare inline prose (text nodes +
  inline elements) sitting directly in `.flow` into the same `.tts-s` sentence
  spans (via the existing `wrapSentences`, so listeners on any moved controls are
  preserved). Block widgets — `<p>`, the choices/fight/market/roll `<div>`s,
  tables, etc. (a `FLOW_BLOCK` tag set) — end the current run and are left in
  place, so they are never swept into a sentence span. Chosen over "normalise
  into paragraphs at render time" to keep the change entirely inside the optional
  TTS module (no view-layer churn across 1,544 sections).
- **Disabled state** — a non-mutating `Narrator.canNarrate(flowEl)` reports
  whether a section has any prose worth reading (clones the flow, strips the same
  non-prose regions `prepare` excludes — `CONTROL_SEL` + `.choices` + `table` —
  and tests for alphanumerics). `app.js`'s new `syncNarrateBtn()` runs on every
  (re)render (wired into the Story `onRender` hook, beside `handleRerender`) and
  disables the 🔊 button (title "Nothing to read aloud here") when there is
  genuinely nothing. `.icon-btn:disabled` gets a dimmed style; the hover rule is
  now `:not(:disabled)`. Wrapping stays lazy (only on play) — `canNarrate` leaves
  the DOM pristine, confirmed in a real-app boot.

Verified: 7 new headless assertions (book4/16 bare-text → chunks > 0 and the
prose captured; book2/745 active-`<else>` prose narrates; a choices-only section
→ 0 chunks; `canNarrate` true/false agreeing with `prepare`; a `<p>` section
still narrates and `prepare` is idempotent) + a real-app boot at `?demo=4.16`
(story renders, no fatal, the narrate button is enabled with no eager `.tts-s`
wrapping) + full render-every-section scan. `RESULT ALL PASS pass=607 fail=0`.

---

## 34. Finish moving rules out of the view layer  — **done**

Known strays that violated the architecture invariant (rules live in DOM-free
modules), each now moved into `market.js`/`engine.js` with the view reduced to
reading attributes + wiring the click:

- **Cargo transaction** — already resolved by task 23: `renderInlineSell`'s
  cargo→Shards move lives in `market.sellCargo` (the view only keeps the
  view-linked barter-reward wiring, `applyLinkedCargoBuys`). Re-verified, no
  change needed.
- **Crew "one grade at a time" rule** — extracted to a new
  `market.canUpgradeCrew(state, crew)` (`{ok, reason}`), which `applyInlineBuy`
  now *enforces* (a two-grade jump is refused and spends nothing) rather than the
  rule being computed only in the view's disabled-button gate. `renderInlineBuy`
  just consumes the verdict for its disable/tooltip; `CREW_LEVELS` no longer
  needs importing into `render.js`.
- **Choice cost** — the paid-`<choice>` transaction (deduct Shards / foreign
  currency, consume the required item) moved from `renderChoice`'s click handler
  into `market.payChoiceCost(state, {pay, cost, currency, foreignCoin, item})`.
- **Resurrection revive** — the "revive at half max Stamina" rule moved from
  `app.js`'s `handleDeath` into `engine.reviveWithResurrection(state)`, which
  consumes the earliest deal, heals to `max(1, floor(staminaMax/2))`, and returns
  its `{book, section}` for the app to navigate to (or `null` if none).

Verified: 12 new headless assertions (crew: one-grade allowed, two-grade jump
refused by both `canUpgradeCrew` and `applyInlineBuy` with no Shards spent,
one-grade applies + charges, no-ship refusal; `payChoiceCost` pay=false no-op,
Shards deduct, item consume, foreign-currency debit; `reviveWithResurrection`
half-heal + target + consume, and null when none) + the existing §400/§740/pay="f"
choice-cost and crew tests still green + a real-app boot (`?demo=1.1`, no fatal,
no module-load error) + full render-every-section scan. `RESULT ALL PASS pass=619
fail=0`.

---

## 35. iOS home-screen icons: provide PNG apple-touch-icon  — **done**

`web/index.html` pointed `apple-touch-icon` at an SVG, and the manifest offered
only SVG icons — iOS Safari does not accept SVG touch icons, so installed
home-screen icons fell back to a page screenshot.

Fix:
- **Generated three PNGs** from `assets/icon.svg` and committed them under
  `web/assets/`: `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png`.
  Rasterised with headless Chrome (`--screenshot` at the icon's native 512 on the
  `#2b1a0f` theme background, so the icon is a full opaque square — ideal for
  iOS's own masking), then downscaled 512→192/180 with high-quality bicubic
  (`System.Drawing`). No build toolchain or dependency was introduced. (Chrome's
  headless-new minimum window size crops direct screenshots below ~500px, hence
  the render-at-512-then-downscale approach.)
- **`index.html`** — `apple-touch-icon` now references `assets/apple-touch-icon.png`
  with `sizes="180x180"`.
- **`manifest.webmanifest`** — added PNG icon entries at 192×192 and 512×512
  (`purpose:"any"`) alongside the existing scalable SVGs.
- **`sw.js`** — the three PNGs join the `REQUIRED` precache next to the icon
  SVGs, so they are available offline. (Task 64 already makes `web/assets/**` part
  of the build stamp, so replacing an icon now busts the cache.)

Verified: 4 new headless assertions (apple-touch-icon href is a `.png`; manifest
lists PNG icons at 192 and 512; the touch-icon PNG is fetchable and decodes at
exactly 180×180) + task 64's precache-fetchability test now also covers the three
PNGs + a visual check of the rendered 512 and 180 icons + full render-every-section
scan. `RESULT ALL PASS pass=623 fail=0`.

---

## 37. Fix the `safeAddGodd` typo in the source XML  — **done**

The single `<if safeAddGodd="Elnir">` in `books/book2/67.xml` (Elnir initiation)
is corrected to `safeAddGod`; the data was rebuilt so `web/data/book2.json`
carries the fixed attribute. With the source true, the task-17 engine alias was
removed: `evaluateCondition` reads only `safeAddGod` and `safeAddGodd` is dropped
from `KNOWN_IF_ATTRS`, so a future stray `safeAddGodd` now correctly warns as an
unknown attribute instead of silently working. Verified: 3 new headless
assertions (safeAddGod true with no god / false when already an initiate; §2.67
still offers the Elnir initiation group) + full render-every-section scan.
`RESULT ALL PASS pass=529 fail=0`.

---

## 36. Minor rule divergences (grab-bag)  — **done**

Swept the confirmed `applySpecial`/`useCache` divergences in one pass:
- **`special="godless"`** (book6/118) now renounces every current god (via
  `removeGod`, so god-granted effects are stripped) before setting the godless
  flag — "cross the Gods Box off … you can never be an initiate of any deity".
- **`special="difficultyCurse"`** (book3/91) / **`difficultyRestore"`** (book2/102)
  are implemented via a persisted `data.oneDieRolls` flag: `rollDifficulty` rolls
  **one** die instead of two while cursed (and the roll-button label reflects it),
  lifted at the Three Fortunes' temple. Survives a save round-trip.
- **`useCache`** (combat.js) now adds a cached **weapon's** bonus to the enemy's
  Combat **and** Defence (JaFL `FightNode` adds `combatRaise` to both), plus a
  cached armour's bonus to Defence — §6.635 Warrior Maid with a +3 sword / +2 mail
  is Combat 11 / Defence 21, not 11/18. (The prior task-26 test asserting 11/18
  encoded the bug; updated.)
- **`special="weaponlock"`/`"armourlock"`** (book6/135, book2/290): JaFL locks the
  broken weapon / melted armour so it can't be swapped to dodge the loss; here the
  sibling `<lose weapon|armour using="t">` takes it and equipment auto-reconciles,
  so there is nothing extra to enforce — recognised as an explicit no-op.
- **`bonus="s"`** (book6/183) was already resolved: `applySpecial` reads the bonus
  through `resolveValue` (variable-aware), so this grab-bag point was stale.

Verified: 5 new headless assertions (godless renounces the god + sets the flag;
difficultyCurse → one-die roll + save round-trip; difficultyRestore → two dice;
useCache weapon→Combat+Defence) + the updated task-26 useCache assertion + full
render-every-section scan. `RESULT ALL PASS pass=555 fail=0`.

---

## 38. Gate cache widgets on `lock`/`unlock` under the single-pass render  — LOW

`<tick special="lock|unlock" cache=…>` now toggles a cache's `locked` flag
(task 20), and the flag is exposed via `isCacheLocked`, but the money/item cache
widgets do **not** disable their deposit/withdraw controls while locked. The
reason is the section re-renders in one memoized pass: in book1/91 the gamble
brackets the roll between a `lock` (inside a `force="t"` group, applied on click)
and an `unlock` (a passive applied once on entry), so reading the live lock state
at widget-render time is unreliable and would leave the widget stuck locked. The
practical loss is only the "you can't change your bet after rolling" nicety;
deposits, withdrawals, banking, investments and villa stashes all work, and §91
renders clean. To do it properly, pre-scan the section for its net lock state (or
make lock/unlock re-render-aware) and gate the widget on that. Add a §91 test.

**Was blocked on task 42; now unblocked (2026-07-08).** §91's `<random dice="2">`
sat inside the same `force="t"` group as the `<tick special="lock">`, so the roll
was swallowed. Task 42 fixed that — the gamble now rolls and its `<outcomes>`
resolve (a §91 test covers it). What remained for THIS task is only the widget
nicety: while the cache is locked, the money-cache widget's deposit/withdraw should
disable so the bet can't change after rolling.

**Done (2026-07-09).** The tricky part was distinguishing the two lock/unlock
patterns in the corpus so the fix couldn't regress the stash sections:
- *Gamble* (book1/91, book2/134): the `<tick special="lock" cache=X>` sits **inside
  the roll `<group>`** — "freeze the bet on the roll." Its widget should lock.
- *Stash* (book1/177, book2/211, the townhouse/apartment sections): a **top-level**
  lock/unlock brackets a freely-editable `<itemcache>`; disabling that widget would
  be a real regression.

Fix (`render.js` + a CSS cue):
1. **Pre-scan** in `begin()` records every cache whose lock is bundled in a roll
   group into `ctx.rollLockCaches`, and resets those (and only those) to unlocked
   on entry, so a fresh visit re-opens the bet. Stash caches are never in the set.
2. **`renderGroupWithRoll`** now *defers* a hidden `special="lock"`/`"unlock"` tick
   to fire on the roll (not on entry) — §91's lock was the lone hidden-lock-in-a-
   roll-group. Hidden price-flag arming (book3/680, book2/138) still fires on entry
   as before (only `special="lock|unlock"` is redirected).
3. **`renderMoneyCache`** disables its input/deposit/withdraw (and adds a
   `.cache.locked` dim) only when the cache is in `ctx.rollLockCaches` **and**
   `isCacheLocked` — so exactly the gamble bet locks after the dice; stash widgets
   are untouched. (`<itemcache>` is deliberately not gated: no gambling cache uses
   one, so adding it would be untested dead code.)

Verified: 3 new headless assertions (§91 bet editable before the roll; the bet's
deposit/withdraw disable + `.money-cache.locked` after rolling; a synthetic
top-level stash lock leaves its money-cache editable) + the existing §91
roll-resolves-outcome test + full render-every-section scan (all 26 lock/unlock
sections render clean). `RESULT ALL PASS pass=626 fail=0`.

---

## 39. Defer confiscate-and-return `<transfer … from=>` until a fight resolves  — LOW

`<transfer>` is implemented (task 20), but in book2/462 the return leg
(`<if dead="f"><transfer item="*" from="2.462"/></if>`) was active from entry —
the player is "not dead" throughout the fight, not only after winning — so the
weapons/armour stashed at the top were handed straight back and the vampire was
fought armed.

**Done (2026-07-09).** This turned out to be a broader bug: *every* post-fight
`<if dead="f">` in the corpus is an "if you win…" outcome (11 sections —
book1/21/297/634, book2/413/462/469/514, book3/7, book6/55/186/348/718), and
because the player is "alive" all through the fight, each one fired its rewards on
**entry** — book6/348 handed over 12,000 Shards, book2/413/55/718 ticked their
win codewords, book1/634/3.7 gave Shards, all before a blow was struck.

Fix (`render.js`): the `if/elseif/else` chain walker now recognises a *fight-outcome
chain* — an `<if>` carrying a `dead=` attribute positioned after a fight — via a new
`isDeferredDeadChain(node)`, and holds the **whole** chain inactive (so the `<else>`
lose-branch can't slip active either) until `aggregateFightOutcome` reports `win`
or `lose`. Once resolved the ordinary `dead=` test is correct: a win → alive →
the "if you win" branch applies its rewards / the §462 confiscate-return; a loss →
dead → the `<else>` (or plain death). Nothing before a fight, and no non-`dead=`
conditional, is affected. The suppression reuses the existing grayed-branch
`this.inactive` path, so `<transfer>`/`<gain>`/`<tick>` apply nothing and reward
`item`/`weapon` awards render as disabled Take buttons until the win.

Verified: 4 new headless assertions (§462 confiscates gear to the cache on entry;
the return branch stays grayed mid-fight; no weapon/armour returns to the sheet
while fighting; winning returns the stashed gear and empties the cache) + the full
fight/branch suite and render-every-section scan unchanged. `RESULT ALL PASS
pass=630 fail=0`.

---

## 40. `<market currency="…">` alternate-currency markets  — **done**

Split from task 29 (part 2). `<market currency="Mithral">` (book2/495, the Trau
trader) deducted **Shards**, and the paired `<choice shards="1" currency="Mithral">`
(book2/545, the parting toll) charged Shards too. Implemented option (a) — a
named-currency pool kept separate from the Shards purse:

- **`state.js`** — `freshData()`/`sanitizeData()` gain a `currencies` map
  (`name → amount`, sanitised like `boxes`); `currencyBalance(name)`,
  `adjustCurrency(name, delta)` and `multiplyCurrency(name, factor)` manage a
  named pool (floored at 0, integer). A new exported `isShardsCurrency(name)`
  treats `null`/blank/`"Shards"`/`"Shard"` (case-insensitive) as the default purse
  so only genuinely foreign coin lives in a pool.
- **`market.js`** — `buyTrade`/`sellTrade` take an optional `currency` argument;
  small `walletBalance`/`walletSpend`/`walletEarn` helpers route the
  payment/receipt to the Shards purse (default) or the named pool. Inline buys are
  always Shards in the corpus, so they pass none.
- **`render.js`** — `renderMarket` reads `currency=` and threads it to
  `renderShopRow`, which prices/labels the Buy/Sell buttons in that coin
  (`Buy 25 Mithral`), checks affordability against the pool, and passes it to
  `buyTrade`/`sellTrade`. `renderChoice` reads a `<choice currency=>`: the cost
  chip, the affordability gate and the click-time deduction all use the named
  pool. Because the player can hold no Mithral in the shipped corpus, every
  Mithral Buy is correctly disabled (Shards can no longer be spent there).
- **`engine.js`** — `applyAdjustMoney` honours `currency=` (grant/scale a foreign
  coin), so approach (a) is genuinely general — a future section can stock a
  Mithral pool via `<adjustmoney currency="Mithral" add="N"/>`. No corpus section
  uses this yet, so behaviour is unchanged for existing sections.

Covers book2/495 (Trau market) and book2/545 (Mithral toll choice) — the only two
`currency=` uses in the corpus.

Verified: 14 new headless assertions (buy refused with 0 Mithral + Shards
untouched; `currencyBalance` 0; `<adjustmoney currency>` grants a pool; buy
succeeds once held and debits **Mithral** not Shards; sell credits Mithral;
blank-currency buy still spends Shards; `multiplyCurrency` floors; §2.495 renders
Mithral-priced Buy buttons all disabled with 0 Mithral; §2.545 pay-Mithral choice
priced in Mithral and disabled with 0 Mithral) + full render-every-section scan.
`RESULT ALL PASS pass=359 fail=0`.

---

## 41. Item `<effect>` system (use/aura/wielded/ability) and `<sold>` sell-hooks  — **done**

Split from task 29 (part 5). Item `<effect>` children were discarded at award/buy
(`applyItemEffect` was a stub) and `<sold>` rows were unhandled. All are now
implemented, modelled on JaFL's `Effect`/`UseEffect`/`EffectSet` (reference read,
not copied):

- **Storage** — `makeItem` now carries an `effects[]` array; a new
  `engine.readItemEffects(node)` reads an item's `<effect>` children into
  serialisable records `{type, ability, bonus, uses, verb, text, body}` (the action
  children are serialised into `body` for later replay; a `<desc>` child is dropped).
  All four call sites pass them through: awards (`renderItemAward`), market buys
  (`goodsFrom`→`buyTrade`), inline buys (`renderInlineBuy`→`applyInlineBuy`), and
  the sanitiser (`sanitizeItem`+`sanitizeEffect`) so effects survive save/load.
- **`type="aura"`** (carried) / **`type="wielded"`** (only while it is the wielded
  weapon / worn armour) — a new `state.auraBonus(key)` sums matching effects and is
  folded into `ability()` and `defence()`, with `ability="*"` boosting every core
  ability. Covers the eight elemental swords, the sword of stone / ring of guarding
  (Defence), the ring of ultimate power (`*`+1), and the Jade Defender (wielded).
- **`type="use"`** — a **Use/Drink/Consult** button on the Adventure Sheet
  (`ui.js renderSheet` gained an `onUse` callback, wired from `app.js onUseItem`).
  `engine.useItemEffect` applies the effect: an action body (rest/cure/…) via
  `applyEffectBody` (which now also handles `<rest>`), else a bare potion's +N
  ability boost; it follows an inner `<goto>` use-target (the Vade Mecum consult,
  book5/549) and consumes a charge — `uses="N"` decrements and removes the item at
  0; an ability potion defaults to one use; a use effect with no `uses=` (Vade
  Mecum) is reusable. Covers book4/111 & book1/342 potions and the potion of
  restoration (`<rest/>`+cure poison/disease).
- **`type="ability"`** (2×) — these are the Red Ague disease's effects (book4/332),
  already applied by the affliction system (task 19); verified via a `<disease>`
  with `type="ability"` children still landing its penalty.
- **`<sold>`** (book3/86 item-level, book3/318 market-level `item="?"`/`tags=`) —
  `renderShopRow` runs the matching `<sold>` body (via `applyEffectBody`) after a
  successful sell (`runSoldHooks`/`soldMatches`), marking the codeword.

Potion bonuses are **section-scoped** — folded into `ability()` (so they flow into
difficulty rolls, combat and Defence) and cleared on entering a new section
(`Story.begin`→`clearPotionBonuses`). JaFL consumes the bonus after the exact
roll/fight; here it lasts the current section (which normally holds one relevant
roll/fight) — a small, bounded simplification (it can't carry across sections).
Known limitation: the ring of ultimate power's `Rank`+2 / `Stamina`+10 auras are
not folded in (only its `*`+1 abilities part is); `Rank`/`Stamina` aren't derived
through `ability()`, so wiring them would touch every rank/stamina read for one
legendary item — deferred.

Verified: 22 new headless assertions (aura Defence/COMBAT/`*` raises; wielded adds
while wielded and drops when not; use-potion parse + Drink → +1 COMBAT + consumed;
potion bonus clears on section change; potion of restoration heals to full + cures
poison + consumed; Vade Mecum parse + Consult → goto 5/550, reusable;
`type="ability"` disease penalty; market buy preserves effects; §3.86 item `<sold>`
and §3.318 market `<sold>` fire on sell; the sheet shows one Use button for a
potion and none for an aura sword and fires `onUse`) + full render-every-section
scan. `RESULT ALL PASS pass=381 fail=0`.

---

## 42. Inner `<difficulty>`/`<random>`/`<rankcheck>` rolls inside a `<group>` are unrun  — **done**

`renderGroup` collected only `lose, tick, gain, set, curse` (+ `rest`, task 61) as
a group's on-click effects, so when a group ALSO rendered as a button (label + an
effect), its `<difficulty>`/`<random>`/`<rankcheck>` child was swallowed into the
label and never rendered — the section's `<success>`/`<failure>`/`<outcomes>`
never resolved. This hit **25 built sections**: book1/91, 554; book2/53, 134, 138,
273, 438; book3/273, 389, 503, 629, 680; book6/24, 48, 94, 215, 239, 293, 320,
564, 567, 691, 707, 735, 741. (A group with a roll but no effect/goto already fell
through to the inline path and rendered its roll — untouched.)

Fix (`web/js/render.js`): `renderGroup` now detects a roll child up front and, if
present, delegates to a new **`renderGroupWithRoll`** which renders the group's
`<text>` label and the roll widget inline (binding the section's shared
success/failure/outcomes to that roll via `this.activeRoll`, which `appendChildren`
does for top-level rolls but a group-nested roll needs done explicitly). The
group's non-roll effects are applied **exactly once the roll resolves** (memoised
`grp@<path>`), mirroring JaFL's "the roll is the group's action" — so a bundled
cost/consequence (lose shards/item/god, a codeword marker, a rest that heals the
roll's own `var`) fires on the *attempt*, never on entry. **Hidden** bundled
effects (an armed price flag / cache lock — book3/680, book1/91, book2/138) still
apply on entry through `renderPassive`, since those are silent book-keeping.

This preserves effect timing so a marker can't clobber sibling gating: book2/53
sets codeword `2.53.1` on entry and the swim group clears it only when the SCOUTING
roll is attempted (the `box="2.53.1"` sibling choices show the right ☑/☐). And a
real cost (book6/215's 35-Shard blessing, book3/273's item loss, book6/691's god
renunciation) is never charged just by visiting.

Verified: 13 new headless assertions across 6 representative sections — §3.680
(roll renders as a widget not a button; the hidden price arms the "leave" option on
entry; a success ticks the box and reveals →644), §2.438 (the rest heals the
roll's own var, and nothing before the roll), §3.273 (a `force="t"` group loses the
rolled number of possessions on the roll, none on entry), §6.215 (the 35-Shard cost
is paid on the roll, not entry, and success grants the blessing), §1.91 (the gamble
renders a roll and its `<outcomes>` resolve against it), §2.53 (the codeword marker
clears on the attempt, not entry) — plus the full render-every-section scan.
`RESULT ALL PASS pass=570 fail=0`.

Follow-on: this unblocks task 38 (the §91 gamble now rolls; the lock/unlock widget
nicety is still separate).

---

## 43. price/flag "choose one" purchases over-apply every linked reward  — **done**

`renderOptionalPay` applied **every** `[flag="k"]` node on a single payment and
then permanently memoised `'pay@'+path`, so a "choose one" menu granted the whole
list and a repeatable bonus was capped at one purchase per visit. Both are fixed
by gating on the engine's existing flag cycle (a `price=` pay sets flag `k`;
applying a `flag=k` reward clears it — engine.js:404/405/532/533) and splitting
the reward shapes (`web/js/render.js`):

- **"Choose one"** — a `price="k"` cost with **two or more** linked *effect*
  rewards (`tick`/`lose`/`gain`). `isChooseOne(k)` routes the cost to
  `renderChooseOnePay` (paying only *arms* the choice — deducts the cost, sets
  flag `k`, no auto-reward) and each reward node to `renderChoosableReward` (an
  inline pick button, live only while armed; clicking applies **just that one**,
  which clears the flag). So one payment grants exactly one, and the cost
  re-enables for another round. A blessing already held, or a curse/disease/poison
  "lift" for an affliction you don't have, is disabled so a payment is never
  wasted. Fixes **book6/171** (`price="y"`, 60 Shards → one of six blessings),
  **book5/152** (`price="curse1"` 200 Shards *or* a +1 item → lift one of seven
  curses, repeatable), and **book6/690** (35/20 Shards → one of four blessings —
  was silently granting all four). Barter awards (`<item>`/`<weapon>` `flag=…`,
  book4/634) are excluded from choose-one so their existing handling is untouched.
- **Repeatable counter** — a single `<tick name="X" count|amount=…>` reward
  (`isCounterReward`) is the "add one per payment" idiom, so `renderOptionalPay`
  no longer memoises it: pay again to add again. Fixes **book4/93** crew bribe,
  **book6/117**, and **book6/731**'s `price="y"` donation bonus. (Relies on task
  52's `removeCodeword` clearing the counter value, so re-entering the section
  resets the bonus to 0.)
- **Everything else unchanged** — a single non-counter reward stays a one-shot
  purchase (permanent memo), preserving town-house buys, faith renunciations, and
  the single-blessing "only one at a time" gate (book2/202 storm, book3/390).
  Roll-gated payments (`isRollGate`) still route to `renderRollPayment` (tasks
  30/51), untouched.

Verified: 21 new headless assertions (§171 pays 60 → picks are dead until paid,
then grants exactly one blessing for no extra Shards; §152 arms on 200, only a
held curse is pickable, lifts exactly one and repeats for the second, a curse you
lack stays disabled; §690 one payment → one blessing; §4.93 two payments → bonus
2 and re-entry resets to 0) + full render-every-section scan (4369).
`RESULT ALL PASS pass=461 fail=0`.

---

## 44. Fold the ring of ultimate power's `Rank`/`Stamina` auras (book5/564)  — **done**

The item aura system (`state.auraBonus`) folded aura effects into
`ability()`/`defence()`, covering every aura in the corpus **except** the ring of
ultimate power (book5/564), whose three auras are `ability="*" bonus="1"` (all
abilities — already handled), `ability="Rank" bonus="2"` and `ability="Stamina"
bonus="10"`. Rank and Stamina aren't derived through `ability()`, so those two
auras did nothing.

Fix:
- **`state.js`** — new `rankValue()` = `data.rank + auraBonus('rank')`;
  `effectiveStaminaMax()` (task 60) now also folds in `auraBonus('stamina')`, so
  the ring's +10 rides the same accessor the sheet/fight display, healing and rest
  already use. `defence()` reads `rankValue()` (so the +2 Rank adds +2 Defence).
  `reconcileEquipment()` — run on every item add/remove — re-clamps current
  Stamina to the (possibly lower) effective max, so dropping the ring can't leave
  Stamina above the restored total.
- **`engine.js`** — `rollRankCheck` compares against `rankValue()`; `adjustAmount`
  and `evalExpression` resolve the `rank`/`stamina` keywords through
  `rankValue()`/`effectiveStaminaMax()`.
- **`ui.js` / `render.js`** — the Adventure-Sheet rank line and the rank-check
  result readout show `rankValue()`.

Verified: 9 new headless assertions (§564 grants the ring; Rank +2; Stamina total
+10; all abilities +1; Defence +3; a rank check uses the boosted Rank; healing
fills the boosted total; dropping the ring restores Rank and the Stamina total and
re-clamps current Stamina) + full render-every-section scan. `RESULT ALL PASS
pass=550 fail=0`.

---

## 45. Multi-fight sections: the fight gate & death-deferral track only the *last* `<fight>`  — **done**

`renderFight` did `this.sectionFight = fight` for **every** fight in document
order, so in a sequential multi-fight section the last one won; `applyFightGate`
and the death-deferral check read only that single `sectionFight`. In the ~18
sequential (non-`group`) multi-fight sections — book1/96, 121, 210, 297, 371,
479, 569; book2/128, 582, 726, 770; book3/73, 587, 675, 685; book5/80; book6/116,
186 — all fight widgets were live at once, and winning **only the last** unlocked
the exit (the earlier fights could be skipped). Worse, dying to a non-last fight
set `outcome='lose'` on *that* fight object while the death-deferral read the last
fight (outcome still null), so real death fired even when the section had an
"if you lose…" branch.

Fix (`web/js/render.js`):
- **Track every fight.** A new `this.sectionFights[]` collects each sequential
  (non-`group`) fight drawn this pass, in document order (skipping fights inside
  an untaken `this.inactive` branch, which are display-only). A new
  `aggregateFightOutcome()` returns the section's outcome: **lose** if any fight
  is lost, **fled** if any fled, **win** only once **every** fight is won, else
  unresolved (`null`). `this.sectionFight` is now a small settable proxy over that
  aggregate (its `name` getter names the first not-yet-won foe for the gate
  tooltip; a settable `outcome` lets a `flee="t"` choice mark it fled without
  throwing on a getter). `applyFightGate` and the death-deferral guard read the
  proxy unchanged, so the exit opens only after **all** fights are won and a loss
  on any fight now defers death to the "if you lose…" branch.
- **Sequential locking.** `renderFight` computes `locked = ` any earlier fight not
  yet won and passes it to `drawFight`, which renders a locked foe's stats with
  "Defeat the previous foe first." and **no** controls — so only the current foe
  can be engaged. `drawFight` also gained an explicit `lose` display case ("You are
  defeated by the …") instead of falling through to a stray Attack button.

The group-fight path (task 26) is untouched — it already uses its own aggregate
proxy and does not populate `sectionFights`.

Verified: 10 new headless assertions (§1.121 — three widgets, exit gated on entry,
only the first foe active, exit **stays** gated when only the first is won, the
second unlocks after the first, exit opens once all three are won; §5.80 —
hasLosePath, a loss on fight 1 defers death instead of firing `onDeath`, the
`dead="t"` §7 lose-branch is the enabled route and the §123 win exit is disabled)
+ full render-every-section scan (4369). `RESULT ALL PASS pass=391 fail=0`.

---

## 46. `<set var … modifier="natural">` discards the value — book-2 rank ceremonies auto-succeed  — **done**

`applySet` treated `modifier=` as an *additive amount*:
`val = state.getVar(name) + resolveValue(state, get('modifier'))` — overwriting
the already-computed `value=` expression. `resolveValue(state,'natural')` was a
var lookup → 0, so the var was set to 0. In JaFL (`SetVarNode.resolveIdentifier`,
`Adventurer.getAbilityValue`) `modifier="natural"/"affected"` selects **how
ability/stamina identifiers inside `value=` resolve** (written score vs
item-boosted), never an addend. 30 occurrences in 29 sections: book2/270, 345,
362, 529, 536, 563, 584, 614, 637, 683, 752 (`<set var="r" value="rank"
modifier="natural"/>` then "roll 2d > r to gain a Rank" — with r=0 **every book-2
rank-up ceremony auto-succeeded**); book3/104, 179, 267, 379, 412, 455, 492, 559,
583, 696; book6/17, 50, 118, 332, 344, 402, 479, 738 (book6/332's
`value="12-charisma"` raise was a no-op).

Fix (`web/js/engine.js`):
- **`evalExpression(expr, state, mode)`** gained a `mode` param. A `<set
  modifier="natural">` resolves ability identifiers via `abilityForCheck(ab,
  true)` (the written score) and `stamina` as the **unwounded max**;
  `modifier="affected"` uses `abilityForCheck(ab, false)` (item-boosted) and the
  affected max; with no modifier the historical behaviour holds (abilities read
  the boosted score, a bare `stamina` reads *current* Stamina — the JaFL
  `stamina && modifier==null` special case). Verified against the Java
  `getAbilityValue(ability, modifier)`: NATURAL→`stat.natural`,
  AFFECTED→`stat.affected`, and the stamina current/max split.
- **`applySet`** drops the additive `modifier` branch entirely and threads the
  mode (`setValueMode()` maps `natural`/`affected`, ignores anything else — the
  corpus never uses a numeric `<set modifier>`) into `evalExpression`.

This also makes book3/104's wound check work: `curr = stamina` (current) vs
`max = stamina modifier="affected"` (unwounded max) now differ when wounded.

Verified: 9 new headless assertions (§2.752 r = the real Rank not 0, and the 2d>r
check is a genuine test; §6.332 c = 12 − natural CHARISMA; a `modifier="natural"`
read ignores a +tool ability bonus while `modifier="affected"` includes it;
§3.104 bare `stamina` = current and affected `stamina` = unwounded max, wound
detected; `evalExpression('rank', state, 'natural')` reads the Rank) + the
existing task-25 `12-charisma` (no-modifier) test still green + full
render-every-section scan (4369). `RESULT ALL PASS pass=400 fail=0`.

---

## 47. `<choice item="?" tags=…>` is never enabled — light-gated passages hard-locked  — **done**

`renderChoice` gated on `this.state.hasItem(itemReq)`, but `matchItems`
(state.js) has **no** `"?"` wildcard handling (that special case lived only in
`evaluateCondition`'s item path), and `tags=` on a `<choice>` was never consulted
— so the button was permanently disabled with tooltip "needs ?". Nine sections
hard-locked: book2/291 (`<choice section="440" item="?" tags="light">Enter the
castle`), book2/720, book3/11, book3/414, book3/471, book4/6, book4/35, book4/405,
book6/530 — all `item="?" tags="light"` (a lantern/candle gate).

Fix: extracted the `"?"`-plus-tags matcher into a shared **`matchItemQuery(items,
pattern, tags)`** (state.js) — `"?"`/blank = any possession, narrowed to those
carrying every listed tag; a concrete name/glob defers to `matchItems`. Both the
`<if item=…>` path (`evaluateCondition`, engine.js) and the `<choice>` item gate
now go through it: `evaluateCondition` calls `matchItemQuery` directly, and a new
`GameState.hasItemMatch(pattern, tags)` backs `renderChoice`'s gate (the choice
also reads its own `tags=`, and the disabled tooltip now reads "needs light"). The
two matchers can no longer diverge.

Verified: 4 new headless assertions (§2.291 "Enter the castle" locked without a
light source, unlocks once a `light`-tagged lantern is carried; `hasItemMatch("?",
"light")` true with a lantern / false without) + full render-every-section scan
(4369). `RESULT ALL PASS pass=404 fail=0`.

---

## 48. Group fights: Surrender/flee throws a TypeError; no Flee button; no target choice  — **done**

Three gaps in the task-26 group-fight widget, all fixed:
1. **Surrender throws.** The group `sectionFight` proxy defined `outcome` as a
   getter only, but a `flee="t"` choice's click handler assigns
   `this.sectionFight.outcome = 'fled'` — ES modules are strict mode, so the
   assignment threw a `TypeError` and aborted before `navigate()`. book6/618
   (three `group="a"` fights + `<choice flee="t" section="452">Surrender`): the
   player could not surrender. **Fix:** the proxy's `outcome` is now a
   getter/setter over an `_override` (mirrors the task-45 sequential proxy), so a
   `'fled'` assignment is honoured and never throws.
2. **No Flee button.** `drawGroupFight` rendered only Attack; only `drawFight`
   wired a `<flee>` node. **Fix:** `renderGroupFight` now finds the section's
   `<flee>` and passes it in; `drawGroupFight` renders a Flee button that applies
   the flee body, marks the group fled, and follows the flee's `<goto>` (else a
   `flee="t"` choice's section) — book6/291's "flee back to your ship" → §745.
3. **No target choice.** `groupFightRound` always struck the first undefeated
   member. **Fix:** `groupFightRound(state, fights, dmgNode, target)` takes the
   chosen foe (falling back to the first undefeated), and `drawGroupFight` renders
   one **Attack ‹name›** button per still-standing foe, so the player picks their
   target each round (book6/192's Combat-12 Third Spider can be saved for last;
   book6/618 Jiro no longer soaks free rounds).

Verified: 6 new headless assertions (§6.192 one Attack button per foe; a group
round strikes the chosen member 3 while sparing 1 & 2; §6.618 Surrender is live
and navigates to §452 with no TypeError; §6.291 shows a Flee button that
navigates to §745) + the existing group-fight tests still green + full
render-every-section scan (4369). `RESULT ALL PASS pass=410 fail=0`.

---

## 49. `special="attack|defence"` grant permanent, save-persisted bonuses  — **done**

`applySpecial` pushed `{ability:'combat', bonus, type:'blessing', uses:1}` into
`data.effects` for both kinds — but **nothing ever consumed or expired those
entries** (`effectBonus` just summed them forever, and `sanitizeData` persisted
them), and because `defence()` includes `ability('combat')` an attack bonus also
raised Defence and vice versa. The books are explicit that every case is a
**per-fight** modifier: "add 3 to your dice rolls *for this fight*" (rat poison,
book1/42/145/247/428), "subtract 2 *for this fight*" (book1/238, book6/624
"−2 to COMBAT"), book6/490 (−1 for a weaponless fight), and `special="defence"`
"add 4 to your Defence *for the duration of that combat only*" (book4/434 ring)
/ book6/183 (Thunder Beast).

Fix:
- **`GameState`** gains a **transient** `_fightBonus = {attack, defence}` (state.js)
  — deliberately kept OFF `data`, so it is never serialised and cannot survive a
  save. `fightAttackBonus()`/`fightDefenceBonus()`, `addFightBonus(kind, n)` and
  `clearFightBonuses()` manage it. It is section-scoped: `Story.begin` clears it
  on entering a section (beside `clearPotionBonuses`), matching the "for this
  fight" wording (a section holds one fight).
- **`applySpecial`** (engine.js) now routes `attack`→`addFightBonus('attack',…)`
  and `defence`→`addFightBonus('defence',…)` instead of a permanent `data.effects`
  blessing, and **resolves a variable bonus** (`bonus="s"` → `resolveValue`, was
  NaN→0 — the book6/183 gap noted under task 36).
- **`combat.js`** applies each to the right stat only: `playerStrike` adds
  `fightAttackBonus()` to the attack roll's COMBAT (never via `ability('combat')`,
  so it can't leak into Defence); `playerDefenceFor` adds `fightDefenceBonus()` to
  the player's Defence (over a `playerDefence=` override too).

Verified: 15 new headless assertions (attack bonus set / no Defence leak / not in
persisted data / dropped on a save round-trip; defence bonus set / no COMBAT leak;
`clearFightBonuses` resets; §6.183 `bonus="s"` variable resolves; a would-always-
miss wall is scratched only once a +10 attack bonus is added; §1.42 rat poison
grants +3 for the fight, consumes the poison, leaves Defence untouched, and the
bonus clears on entering §423) + full render-every-section scan (4369).
`RESULT ALL PASS pass=425 fail=0`.

---

## 50. Var-keyed `<success>/<failure>` branches fire on entry (unset/stale vars)  — **done**

`renderBranch` skipped the "wait until the roll is made" guard whenever the
branch carried `var=`, and `branchSuccess` read `state.getVar(...) > 0`
immediately. Vars are global and persist in the save, so on **first entry** (var
unset → 0) every `<failure var=…>` revealed and **applied its effects** (memoised
under `fx@`, never undone) — book3/437's failure tick fired before either
Difficulty-17 roll; same in book2/419, book3/476, book6/442, book6/691 — and a
**stale** `s>0` from an earlier section made book6/691's `<success var="s">`
apply for free. book5/24's `<failure var="hang"><lose stamina="-hang"/>` drained
0 on entry and memoised it forever.

Fix (`web/js/render.js`): a var-keyed branch now waits until that var has actually
been **written this visit**, tracked in a new `ctx.wroteVars` set:
- Both **roll** handlers (`renderDifficulty`/`renderRandom`/`renderRankcheck`) and
  an active **`<set var>`** application add the var to `ctx.wroteVars`.
- A new `branchResolved(node, roll)` gates `<success>`/`<failure>`/`<outcome>` and
  the `<outcomes>` loop: a var-keyed branch is ready only when `wroteVars` holds
  its var; a plain (roll-fed) branch still waits for its roll. `branchSuccess`
  (var sign) is only consulted once resolved.
- This preserves the **set-sentinel** idiom (book2/138 key-of-stars, book3/43
  Chill → a `<set var="X" value="1"/>` resolves the branch with no roll) while a
  stale/unset var keeps the branch pending — so a `<success>/<failure>` never
  fires or applies effects on entry.
- Also hardened `pendingRollVar` to strip a leading sign (`"-hang"` → the `hang`
  roll var) so a signed-var quantity above its roll defers correctly.

Full `<fightround>` per-round rolls (book5/24's drain magnitude) remain task 32;
this task stops the spurious entry-fire.

Verified: 7 new headless assertions (§3.437 no codeword ticked before the rolls,
the inner SANCTITY branch stays pending after only the MAGIC roll, exactly one
outcome codeword after both rolls; §2.138 the key set-sentinel resolves "Open the
door"→69 with no roll, and without the key neither outcome shows on entry; §5.24
the per-round Hangman drain does not fire on entry) + full render-every-section
scan (4369). `RESULT ALL PASS pass=432 fail=0`.

---

## 51. `<difficulty|rankcheck flag=…>` roll gates unimplemented; shared `<success>` binds only the last roll  — **done**

Task 30 built the pay-to-roll gate **only into `renderRandom`**. `isRollGate`
matches `difficulty[flag]`/`rankcheck[flag]`, so the paired cost rendered as a
roll-payment — but `renderDifficulty`/`renderRankcheck` ignored `flag=`: the
payment was decoration and the roll was free (book6/731 CHARISMA boon). And when
two rolls shared one flag+`<success>` ("make a MAGIC roll…or a SCOUTING roll",
book2/122/book6/630), the shared `<success>` bound to `this.activeRoll` — the
document-order **last** roll — so a successful *first-listed* roll was silently
ignored (a MAGIC-built character couldn't reach §2.376 via MAGIC).

Fix (`web/js/render.js`):
- **Flag gate in `renderDifficulty`/`renderRankcheck`** via a shared
  `rollGateState(node, key)`: a `flag=` roll paired with a `[price=]` cost is
  disabled ("Pay first…") until the payment sets the flag; rolling **consumes**
  the flag (`setFlag(k,false)`), and a fresh payment re-arms it (dropping a stale
  result) — one paid attempt per payment, matching the `<random>` gate.
- **Shared-branch binding**: `appendChildren` now binds `this.activeRoll` to
  whichever roll has actually **resolved** (has a stored result), only falling
  back to the last-listed roll when none has resolved yet. So a shared
  `<success>`/`<failure>` fed by two rolls reads the one the player rolled. (Var-
  keyed branches are unaffected — they bind by var via task 50.)

The hidden `<tick price>` that arms book2/122/630's rolls still renders a phantom
Pay button until **task 56** makes it arm silently; task 51 makes the gate and
binding correct once armed.

Verified: 6 new headless assertions (§6.731 the CHARISMA roll is disabled until
the 100-Shard donation is paid; a synthetic two-roll section — both rolls
disabled before payment, a pay button arms them, payment deducts the cost and
enables them, a first-listed MAGIC success reveals the shared `<success>`→376,
and the second roll is disarmed after the one paid attempt) + full
render-every-section scan (4369). `RESULT ALL PASS pass=438 fail=0`.

---

## 52. `removeCodeword` leaves the codeword's *value* behind — bonus counters never reset  — **done**

`removeCodeword` deleted `data.codewords[cw]` but not `data.codewordValues[cw]`.
In JaFL a codeword and its value are one entry, so `<lose codeword="X">` zeroes
the counter — the books rely on that as a counter-reset idiom: book6/117 and
book6/731 open with a hidden `<lose codeword="CharismaBonus"/>` (and reset inside
every outcome) so each visit's donation bonus starts at 0; book4/93's crew-bribe
counter likewise; book6/47 resets SpiderDamage. Before the fix, `<adjust
name="…">` (which reads `codewordValue`) still saw the old total, so **every
bonus ever bought was a permanent, save-persisted roll modifier** — and
`CharismaBonus` even leaked between books 4 and 6 (shared name).

Fix (`web/js/state.js`): `removeCodeword(cw)` now also deletes
`codewordValues[cw]`. The sole caller is `<lose codeword>` (`applyLose`) — the
JaFL "zero the counter" path — so nothing relies on the value surviving. Feeds
task 43's repeatable-cycle semantics.

Verified: 2 new headless assertions (a codeword's counter value accumulates via
`adjustCodewordValue`, then `<lose codeword>` clears both the codeword and its
value to 0) + full render-every-section scan (4369). `RESULT ALL PASS pass=440
fail=0`.

---

## 53. `<difficulty modifier="noweapon">` still counts the weapon bonus  — **done**

`renderDifficulty` resolved `modifier=` numerically (`resolveValue(state,'noweapon')`
→ unknown var → 0) and the roll then used `abilityForCheck('combat')`, which
**includes** the wielded weapon's bonus — so the four unarmed-combat rolls
(book3/235/271/290, book5/516) let a wielded weapon help a bare-knuckle fight.

Fix — route the modifier keyword into the ability lookup instead of treating it
as an addend (shared plumbing with task 46):
- **`state.js`** — new `abilityForMode(ability, mode)` centralises the check-value
  logic (cursed/fixed flags + CHARISMA mask first), then dispatches on the JaFL
  modifier: `natural`→written score, `noweapon`/`notool`→affected score **minus**
  the weapon/tool bonus (new `abilityNoWeapon`, computed **pre-clamp** so a 1..12
  ceiling hit doesn't distort it), `affected`/none→full affected score.
  `abilityForCheck(ability, natural)` now just delegates (`natural?'natural':null`),
  so every existing caller (the `<if>` path, `evalExpression`, `rollDifficulty`) is
  unchanged.
- **`engine.js`** — `rollDifficulty(state, ability, level, modifier, mode)` takes a
  `mode` and resolves the ability via `abilityForMode`.
- **`render.js`** — `renderDifficulty` recognises the keywords
  (`natural`/`noweapon`/`notool`/`affected`) and passes them as `mode`; any
  non-keyword `modifier=` keeps the historical numeric/var addend behaviour (none
  occur in the corpus today, but the path is preserved). `<rankcheck>` rolls
  against Rank with no ability score, so a modifier keyword is inapplicable there
  (and none appears in the corpus) — left as-is.

Verified: 5 new headless assertions (a +3 weapon lifts affected COMBAT but not the
noweapon score; `rollDifficulty(..,'noweapon')` uses the bare COMBAT while the
default counts the weapon; the pre-clamp edge — COMBAT 11 + a +2 weapon reads 12
affected, 11 bare; the §3.235 rendered+rolled COMBAT excludes the weapon bonus) +
full render-every-section scan (4369). `RESULT ALL PASS pass=466 fail=0`.

---

## 54. Mid-fight escape brackets (tick…lose codeword) collapse — surrender/flee routes unreachable  — **done**

The JaFL idiom brackets a fight between `<tick codeword="X"/>` (top) and
`<lose codeword="X"/>` (after the fight); a `box="X"`-gated choice is the
mid-fight escape, valid only *while the fight is unresolved*. The single-pass
render applied both passives in the same pass, so the box was already un-ticked
by the time choices rendered — and `applyFightGate` disabled post-fight nav
anyway. All three fixes landed in `web/js/render.js`:

- **Escape-codeword detection** — a new `computeEscapeCodewords(sectionEl)` (run
  before the fight gate, stored on `this.escapeCodewords`) finds codewords that are
  BOTH `<tick codeword="X">`'d in the section AND used as a `box="X"` on a choice —
  the surrender/flee signature (book2/582, book3/211 tick at the top; book2/442,
  book2/207 tick inside a flee `<group>`/`<flee>`). Empty unless the section has a
  fight.
- **Defer the closing `<lose codeword>`** — `isDeferredEscapeClear(node)` +
  `renderPassive` skip a `<lose codeword="X">` that sits **after** a fight (so
  `sectionFights` is non-empty) and clears an escape codeword, until the fight is
  **won**. So the box stays ticked while the fight is unresolved or the player is
  fleeing; on a win the clear applies and the escape closes. An entry-clear
  `<lose codeword>` before the fight (book2/207/442) is untouched.
- **Escape choices bypass the fight gate** — `computeFightGate` no longer adds a
  `<choice box="X">` (X an escape codeword) to `navNodes` (like a `flee="t"`
  choice), so `applyFightGate` never disables it; its own `box=` check governs it,
  making it live exactly while the codeword is ticked (book2/442 becomes reachable
  once the `<group>` ticks 2.442.1).
- **`fled` disables the win exit** — `applyFightGate` now disables **all** nav on
  `outcome==='fled'` (not just lose-role), and the never-strand-a-win safety is
  scoped to `outcome==='win'`. So begging for mercy in book2/582 (a bare `<flee>`
  Flee button with no goto → `fled` + re-render) no longer enables "Defeat them
  all" (§654); only the ungated Surrender remains.

Verified: 16 new headless assertions (§2.582 Surrender live mid-fight while §654 is
gated, fleeing keeps §654 gated and Surrender live, winning clears the codeword →
Surrender off / §654 on; §3.211 "Run back" live vs "Kill the creature" gated, win
closes the escape; §2.442 "If you flee" gated until the group is taken, the group
ticks the codeword + forfeits the Paladin title, the escape then navigates to 118)
+ the §207/§662 flee tests still green + full render-every-section scan (4369).
`RESULT ALL PASS pass=482 fail=0`.

---

## 55. `<choice item=… pay="t">` doesn't consume the item  — **done**

`renderChoice` computed `pay` only when `shards=` was present, so `pay="t"` on an
item-only choice was ignored and the removal branch never ran — the player kept
the given-away item (and it still satisfied later `<if item=…>` checks).

Fix (`web/js/render.js`): `pay` is now `payExplicit === true || (payExplicit ==
null && shards != null)` — an explicit `pay="t"` consumes the choice's
requirement (both a `shards=` cost and an `item=` requirement) regardless of
whether Shards are involved, while the historical defaults are unchanged: a
`shards=` cost with no `pay=` still deducts, `pay="f"` never deducts, and a bare
`item=` gate is still just a requirement (kept, not consumed). The existing
`if (pay && itemReq)` removal branch now fires for book2/400 (green gem) and
book6/740 (rope). Corpus audit: the only `pay="t"` choices are those two
item-only cases; every other `pay=` is `shards= pay="f"` (a "can you afford it"
travel gate whose cost is paid at the destination), all preserved.

Verified: 8 new headless assertions (§400 gem choice enabled while held, giving
consumes it + navigates to 288, gated without the gem; §740 rope choice consumes
+ navigates to 513; a `pay="f"` shards choice still doesn't deduct) + full
render-every-section scan (4369). `RESULT ALL PASS pass=490 fail=0`.

---

## 56. `hidden="t"` payments render a phantom "Pay" button instead of arming silently  — **done**

The price routing in `renderPassive` never checked `hidden=`, so a
`<tick price="k" hidden="t"/>` rendered a bare "Pay"/"Confirm" button the player
had to discover — and, gated purely on the flag, it could be re-clicked to re-arm.

Fix (`web/js/render.js`): a new guard at the top of the price/flag handling — when
`price != null && hidden` — fires the node once per visit (memoised on
`'pay@'+path`) and renders **nothing**. It calls `applyEffect(node)` to set the
flag (and apply any real cost), and if the price has **exactly one** linked
reward that isn't a roll gate, applies that reward too. This covers every shape:
- **roll gates** (book6/630 SCOUTING|SANCTITY, book2/122 MAGIC|SCOUTING) — arm the
  either-or `<difficulty flag=…>` rolls on entry (task 51); no button, both rolls
  live at once, and re-arming is capped at once per visit.
- **choose-one menus** (book4/127 bet on a contestant, book5/365 pick a blessing) —
  arm the flag so the task-43 pick buttons go live; the picks do the granting.
- **a lone linked reward** (book3/472 — a SCOUTING success sets the hidden flag →
  gain the codeword Chance) — granted directly.

Left as-is: book3/680's hidden `<gain price="x">` lives inside a `<group>` (applied
on click, never a standalone widget → no phantom button; the roll-in-a-group is
task 42). book1/597's reward is a *heterogeneous* choose-one (tool / 500 Shards /
resurrection) that `isChooseOne` can't model — the phantom button is gone and the
flag arms, but proper mutual exclusivity is filed as new task **63**.

Verified: 7 new headless assertions (§630 no Pay button, flag armed on entry, both
rolls enabled; a synthetic single-reward hidden price grants its reward with no
button; §127 no button + both bet picks live + no bet auto-placed) + full
render-every-section scan (4369). `RESULT ALL PASS pass=497 fail=0`.

---

## 57. Adventure Sheet: curses all display as "curse"; diseases/poisons invisible  — **done**

`renderSheet` chipped curses by `c.type` (the literal word "curse" for every
entry) and rendered nothing for `d.diseases`/`d.poisons`, so a player afflicted
with Ghoulbite (book1/196) or Scorpion Poison (book1/532) saw nothing while the
penalty silently depressed their abilities, and multiple curses were
indistinguishable.

Fix (`web/js/ui.js`): a shared `afflictionNames(list)` maps each entry to
`a.name || a.type`; Curses now chip by name, and new **Diseases** and **Poisons**
sections render the same way beside Curses.

Verified: 3 new headless assertions (a curse chips by its name not "curse"; a
Diseases section lists Ghoulbite; a Poisons section lists Scorpion Poison) + full
render-every-section scan (4369). `RESULT ALL PASS pass=500 fail=0`.

---

## 58. Market `<sold>` hooks match the shop row's tags, not the sold item's  — **done**

`soldMatches` tested the *row descriptor's* tags (built from `buytags=`), not the
tags on the possession actually sold. In book3/318 the free-goods rows carry
`buytags="318.free"` and the hook is `<sold item="?" tags="318.free">
<tick codeword="3.318.sold"/></sold>`, so selling *any* bonus-1 armour or bonus-0
weapon through those generic rows (e.g. a starting leather jerkin) fired the hook
— and book3/20 → book3/372 punished the "sale" (cobblestones, `<lose stamina="1d">`,
loss of the Saviour title).

Fix — match the sold **possession's** own tags/name:
- **`market.js`** — `sellTrade` now returns `{ ok, item }`, where `item` is the
  possession actually removed (for a carried good; ship/cargo sales carry none).
- **`render.js`** — the sell handler passes `res.item` to `runSoldHooks`, and
  `soldMatches(soldNode, soldItem)` tests `soldItem.tags`/`soldItem.name` (a null
  item — a ship/cargo sale — never matches). The row's own `<sold>` child still
  fires unconditionally (book3/86 pirate captain's head — that *is* the row's sale).

Verified: 3 new headless assertions (§3.318 selling a starting leather jerkin does
NOT tick 3.318.sold; selling an armour carrying the 318.free tag does; the
existing §3.86 row-hook and §3.318 candle-hook tests still pass) + full
render-every-section scan (4369). `RESULT ALL PASS pass=503 fail=0`.

---

## 59. `<tick god=…>` drops `<effect>` children — Sig initiates never get +1 THIEVERY  — **done**

`applyTick`'s `god=` path never read the `<effect>` children, so becoming an
initiate of Sig (book1/437, book2/334 — `<tick god="Sig"><effect ability="thievery"
bonus="1"/></tick>`, "add 1 to your THIEVERY score") granted no bonus. The
previously-unused top-level `data.effects` store is now the home for god-linked
effects:

- **`state.js`** — `setGod(g, effects)` folds any granted effects into
  `data.effects` tagged `source: "god:<g>"`, guarded against double-adding (the "no
  double THIEVERY bonus" rule); `removeGod(g)` strips every `source: "god:<g>"`
  effect on renunciation. `sanitizeData` now preserves the effect's `source` so the
  bonus survives a save round-trip. `effectBonus` already folds `data.effects` into
  `ability()`, so the +1 flows into the score and every check.
- **`engine.js`** — the `<tick|gain god=…>` path passes `readEffects(el)` to
  `setGod`. This flows through the `<group>` initiation button too (it applies the
  `<tick god>` element via `applyEffect`).

Verified: 6 new headless assertions (initiation grants +1 THIEVERY; re-initiating
doesn't stack; renouncing restores it; the effect survives a save round-trip; the
§1.437 group initiation grants Sig +1 THIEVERY and costs 50) + full
render-every-section scan (4369). `RESULT ALL PASS pass=509 fail=0`.

---

## 60. Affliction `<effect>` forms `divide`/`target`/`stamina` inert; item `<curse>` children never attach  — **done**

`readEffects` read only `ability` + `bonus`, and `firstAbility` rejected
`stamina`, so four book-5 afflictions did nothing. All four now work:
- **book5/198** `<effect ability="combat" divide="2"/>` (Champion's Curse) —
  "fight at half your COMBAT (round up)".
- **book5/705** `<effect ability="charisma" target="1"/>` — "CHARISMA falls to 1
  until the curse is lifted".
- **book5/306** `<poison><effect ability="stamina" bonus="-6"/></poison>` —
  "lose 6 Stamina permanently … until you find a cure".
- **book5/238** the stone-bracelet trap carries its curse as an `<item><curse…>`
  child; taking the bracelet now attaches the curse.

Fix:
- **`engine.js`** — a new `afflictionAbility()` accepts the six core abilities
  **plus `stamina`**; `readEffects` now emits exactly one of `{bonus | divide |
  target}` per `<effect>` (mirroring JaFL `AbilityEffect`'s ADJUST/DIVIDE/TARGET
  modify-types), still falling back to a penalty carried on the element itself.
- **`state.js`** — `afflictionMod(ability, value)` applies the non-additive
  transforms after the additive `afflictionBonus`: a `divide` halves the summed
  score rounding up (`Math.ceil`, = JaFL `(v+mod-1)/mod`), a `target` pins it.
  Wired into `ability()` and `abilityNoWeapon()` (so it flows into `defence()`
  and every check) but **not** `abilityNatural()` — a curse is an aura, disabled
  under `modifier="natural"`. A new `afflictionStaminaMod()`/`effectiveStaminaMax()`
  fold `ability="stamina"` affliction penalties into the Stamina total (reversible
  on cure); `addAffliction` caps current Stamina to the reduced max and
  `healStamina` clamps to it. `sanitizeAffliction` round-trips the new
  `divide`/`target` effect fields.
- **`ui.js` / `render.js`** — the Adventure-Sheet Stamina bar, both fight-widget
  Stamina headers and the `<rest>` "already full" check all read
  `effectiveStaminaMax()` so a Stamina-cutting affliction shows and gates
  correctly. `renderItemAward`'s Take handler applies any `<curse>`/`<disease>`/
  `<poison>` child of the item node once the item is taken (a trapped treasure).

Verified: 10 new headless assertions (§198 COMBAT halved round-up + restore on
lift; §705 CHARISMA pinned to 1 + restore; §306 poison −6 Stamina total + current
cap + save round-trip + cure restore; §238 the bracelet's Take button attaches
the curse and halves MAGIC) + full render-every-section scan. `RESULT ALL PASS
pass=519 fail=0`.

---

## 61. book6/628: the rerunnable `<set>` clobbers the roll's var — inn rest/dysentery never fires  — **done**

Task 25 made an absolute `<set value=…>` re-evaluate on every render so
roll-derived vars stay correct — but book6/628 uses `<set var="y" value="7"/>` as
a *sentinel* ("not yet rolled"; JaFL sets it once on entry) before a pay-gated
`<random dice="1" flag="x" var="y">`, then branches `<if var="y" lessthan="6">`
(rest +1 Stamina) / `equals="6"` (dysentery). After paying and rolling, the
rerender re-applied `y=7` **before** the if-chain evaluated, so neither branch
ever activated: the player paid 1 Shard a day and rolled, but never healed (nor
risked dysentery). This is the only corpus collision — every other `<set>`
sharing a var with a roll sits in a mutually exclusive branch (book2/138,
book3/43/102/149/304/642/653, book6/480).

Fix (`web/js/render.js`):
- A new per-visit **`ctx.rolledVars`** set records which vars a *roll* has written
  this visit (populated at all three roll sites — difficulty/random/rankcheck —
  alongside the existing `ctx.wroteVars`). The rerunnable-`<set>` branch in
  `renderPassive` now treats a var a roll owns as **frozen**: `rollOwned` short-
  circuits the re-apply entirely (not merely flipping `rerunnable`, which the
  first-render "not memoised" path would otherwise still re-run), so the die
  result stands. A `<set>` whose var *no* roll has touched still re-evaluates
  every render (task 25), and a `<set>` sentinel that feeds a `<success>`/branch
  still records into `wroteVars` (task 50). `rolledVars` is kept distinct from
  `wroteVars` precisely because the `<set>` itself writes `wroteVars`.
- Making §628 actually heal also required `renderGroup` to apply a `<rest>` child
  on the group click (via `engine.applyRest`) — it previously collected only
  `lose/tick/gain/set/curse`, so the "regain 1 Stamina" `<group force="t">`
  cleared its flag but never healed. This is the `<rest>`-in-`<group>` half of
  task 42 (the inner-*roll*-in-group half — book3/680's MAGIC-roll group — is
  still open there).

Verified: 7 new headless assertions on §6.628 (sentinel y=7 on entry; no active
rest/dysentery action before the roll; the "1 Shard a day" pay button arms the
gated roll; a forced die of 3 writes y=3 and the sentinel does **not** re-clobber
it; a 3 activates exactly the rest action, not dysentery; taking it heals 1) +
full render-every-section scan. `RESULT ALL PASS pass=526 fail=0`.

---

## 62. Render `<image file=…>` and use-effect images (map of Bazalek, book3/75)  — **done**

The `<image>` handler read `src|name`, but the corpus uses `file=` (+ `title=`/
`book=`), so inline images never rendered; and `useItemEffect` had no `<image>`
handling, so the map of Bazalek's `<effect type="use" verb="Read">…<image/></effect>`
Read button was a no-op. All four image sites now work (book1/200, book3/75,
book5/410, and the section `image=` attribute).

Fix:
- **`build/build-data.ps1`** — now copies each book folder's section
  illustrations (any image file that is neither the `<Region>-Map` regional map
  nor a `-cover` cover) into `web/assets/illus/`, so `render.js` can resolve them
  there. The three referenced illustrations (Forest of the Forsaken, Map of
  Bazalek Isle, TheBlackDiptych) land there.
- **`render.js`** — a new `renderImage` reads `file=` (falling back to `src`/
  `name`): an inline `<image>text</image>` keeps its prose as a clickable
  `.image-link` that opens the illustration in a modal (`showImageModal`), while a
  self-closing `<image/>` drops in the figure. `makeIllustration` now
  URL-encodes the (space-bearing) filename, sizes the image and adds an optional
  `<figcaption>`.
- **`engine.js` / `app.js`** — `useItemEffect` returns an `image` descriptor when
  the use-body carries an `<image>`; `onUseItem` opens it in a modal
  (`showIllustration`), leaving a reusable map unconsumed.
- **book5/410** — the source referenced `The Black Diptych.jpg` but the asset is
  `TheBlackDiptych.jpg`; corrected the `file=`/`image=` to match so the Diptych
  actually loads.

Verified: 6 new headless assertions (§75 inline image link keeps its prose; the
taken map carries a Read use-effect whose body holds the `<image>`; Reading
surfaces the Bazalek illustration and does not consume the reusable map; §200
inline treasure-map link) + an HTTP probe confirming all three
`assets/illus/*.jpg` serve 200 + full render-every-section scan. `RESULT ALL PASS
pass=535 fail=0`.

---

## 63. Heterogeneous "choose one" rewards (item / Shards / resurrection) over-apply (book1/597)  — **done**

The task-43 "choose one" machinery only handled *effect*-node rewards
(`tick`/`lose`/`gain`) sharing one flag; a menu that mixes an item award, a Shards
tick and a resurrection deal was not modelled. In **book1/597** the reward for the
ghoul's head is "choose only one of these three": an `<tool name="amber wand" …
flag="x"/>`, `<tick shards="500" flag="x"/>`, and a `<resurrection … flag="x">`.
`renderItemAward`/`renderResurrection` ignored `flag=`, so the wand's Take button
and the resurrection widget were always live while the 500-Shards reward showed
nothing, and nothing enforced the "only one" cap.

Fix (`web/js/render.js`):
- `isChooseOne(key)` now accepts item-family (`item/weapon/armour/tool`) and
  `resurrection` reward nodes in addition to effect nodes, **but** requires the
  set to be *heterogeneous* (at least one non-item-family node). A pure
  item/weapon set stays a barter (book4/634 "give one, take one" is untouched);
  the pure-effect task-43 menus still qualify.
- `renderItemAward` and `renderResurrection` route a `flag=`-linked node to
  `renderChoosableReward` when it belongs to a choose-one. A new
  `grantChoosableReward` grants the picked reward — an item via
  `addItem`/`makeItem` (currency awards credit Shards), a resurrection via
  `buyResurrectionDeal` — and clears the flag; effect rewards still clear their
  own flag through `applyEffect`. `rewardLabel`/`rewardWasteReason` gained
  item-family + resurrection cases (a Take label with the bonus tail; disabled
  when the carry cap is full or a resurrection deal is already held), and an
  unarmed pick under a *hidden* price now reads "You may choose only one" rather
  than "Pay first".

Verified: 6 new headless assertions (§597 three armed picks, nothing auto-applied;
taking the wand grants it and blocks the Shards + resurrection; taking
resurrection blocks the wand + Shards; §634 barter still renders Take buttons,
not reward picks) + full render-every-section scan. `RESULT ALL PASS pass=541
fail=0`.

---

## 64. Asset-only releases do not invalidate the PWA cache  — **done**

`build/stamp-version.ps1` hashed JavaScript, CSS, generated JSON, `index.html`,
and the manifest, but not any files beneath `web/assets/`. Because the
service-worker cache name is `fl-<stamp>`, replacing only an icon, map, or
illustration left the stamp — and therefore the cache name — unchanged, so
existing installs kept serving the old asset indefinitely. Separately, the three
`web/assets/illus/` files were in *no* precache list, so an installed player who
went offline before viewing them (e.g. book3/75's map of Bazalek) never got them.

Fix:
- **`build/stamp-version.ps1`** now folds `web/assets/**` (recursive, `-File`)
  into the content-hash input alongside js/css/json/html/manifest. Any change to
  an icon, map, or illustration moves the stamp (and thus the SW cache key), so
  the change reaches installed players instead of stranding them on the stale
  cached asset. `sw.js` stays excluded — it lives in `web/`, not `web/assets/`,
  and hashing the file whose cache key we rewrite would be circular (the note's
  explicit warning). Verified with a reversible probe: adding one file under
  `web/assets/` moved the stamp (`a6d86f8`→`2b5542c`) and removing it restored it.
- **`web/sw.js`** adds the three section illustrations to the `OPTIONAL` precache
  list (best-effort, so an offline miss can't abort the upgrade). They are stored
  **URL-encoded** (`Forest%20of%20the%20Forsaken.JPG`, …) to match render.js's
  runtime request (`'assets/illus/' + encodeURIComponent(name)`) so the precached
  response actually matches the fetch cache key.

Chose stamp-input hashing over emitting revisioned asset URLs (the alternative
the task floated): it needs no rewriting of `<img src>`/`manifest` references and
keeps the single-stamp cache-busting model already in place.

Verified: 3 new headless assertions (sw.js declares a `fl-yy.MM.dd.<hash>` cache
key; the precache lists all three illustrations built with the *same*
`encodeURIComponent` render.js uses; every precached `./` asset/data/css/js/html
URL is HEAD-fetchable — catching a misnamed or mis-encoded entry) + the reversible
stamp probe above + full render-every-section scan. `RESULT ALL PASS pass=600
fail=0`.

---

## 65. Rules modal emits invalid table heading markup  — **done**

`renderStatic()` (`app.js`) handled every `h1`–`h6` element before its later,
identical condition that created a `<th>`, so the `<th>` branch was unreachable.
In `rules/QuickRules.xml`, `<h3>Quick Rules</h3>` is a direct child of `<tr>`, so
the modal produced an `<h3>` nested illegally inside a table row.

Fix (`app.js`): the heading case is now context-aware — a heading whose DOM parent
is a `<tr>` renders as a `<th>` that spans the table's widest row (colspan computed
from the source table's row cell counts, ≥1); a heading anywhere else stays a real
`<hN>`. The dead duplicate branch was removed. To make it testable, `renderStatic`
is now `export`ed and the module's auto-`boot()` is guarded on the presence of
`#app` (index.html has it; the headless harness does not), so importing `app.js`
from `_test.html` has no side effects.

Verified: 4 new headless assertions (QuickRules renders a `<tr>`; its heading is a
`<th>` with no nested `<hN>`; the header cell keeps the "Quick Rules" text; a
heading outside a table stays an `<hN>`) + a real-app boot (`?demo=1.1`, still
auto-boots, no fatal) + full render-every-section scan. `RESULT ALL PASS pass=634
fail=0`.

---

## 66. Add a CI workflow that runs the headless smoke suite  — LOW (infra)

*(From the 2026-07-09 external review's recommendations.)* The repository has no
`.github/workflows/` at all, so the comprehensive `web/_test.html` suite (597
assertions + render-every-section over all 4,369 sections) only runs when someone
remembers to run it locally. A regression pushed without the local loop would
ship silently.

Add a GitHub Actions workflow that, on push/PR:
1. Serves the repo root (`python -m http.server 8848 &`).
2. Runs headless Chrome against `http://localhost:8848/web/_test.html` with
   `--headless=new --dump-dom --virtual-time-budget=90000` and a fresh
   `--user-data-dir` (Chrome is preinstalled on `ubuntu-latest` runners).
3. Fails unless the dumped `#results` starts with `RESULT ALL PASS`.

**Done (2026-07-09).** Added `.github/workflows/smoke.yml` — one small workflow,
one job (`ubuntu-latest`), no build toolchain: checkout → serve the repo root with
`python3 -m http.server` → wait for it → drive `google-chrome --headless=new
--dump-dom --virtual-time-budget=90000` with a fresh `--user-data-dir` (so no stale
service-worker cache reports a false pass) → the step exits non-zero unless the
dumped DOM contains `RESULT ALL PASS`, echoing the first `FAIL` lines otherwise.
The script uses `set -euo pipefail` with an `if`-guarded wait loop and `|| true`
on Chrome so only a genuine suite failure reds the job.

Deliberately **omitted** the optional regenerate-and-diff of `web/data/*.json`:
[[build-needs-pwsh7]] shows JSON formatting is sensitive to the PowerShell build
that produced it, so a cross-platform (Linux `pwsh`) regenerate could diff
spuriously and red the job for no real defect. The smoke suite already loads the
committed JSON and renders every section, so a malformed/hand-broken bundle fails
the suite anyway. (Cannot be executed from this environment — validated for
structure: no tabs, well-formed `on:`/`jobs:`, `set -e`-safe shell.)

---

## 67. README: align the illustration docs with the shipped build  — LOW (docs)

`README.md` ("What's included & known limits") says *"Section illustrations are
not part of this repository, so inline art is skipped gracefully."* That is now
half-wrong: since task 62, three bespoke illustration files live in `books/`
(book1 "Forest of the Forsaken", book3 "Map of Bazalek Isle", book5
"TheBlackDiptych") and `build/build-data.ps1` copies every non-map, non-cover
book-folder image into `web/assets/illus/`, where `render.js` displays them.
The general per-section art (e.g. `142.jpg`) is indeed still absent.

Fix: reword the bullet to say the three `<image>`-referenced illustrations are
included and shipped by the build, while the remaining per-section art is not
(the drop-in instructions for `web/assets/illus/` stay). Doc-only change — but
still run `stamp-version.ps1`? **No:** README is not hashed by the stamp and not
served by the app, so no stamp/test loop is needed beyond a sanity read.

**Done (2026-07-09).** Reworded the "What's included & known limits" bullet: the
three `<image>` illustrations — book 1 *Forest of the Forsaken*, book 3 *Map of
Bazalek Isle*, book 5 *The Black Diptych* (confirmed to live in `books/book1|3|5/`)
— ship via the build into `web/assets/illus/` and are shown by `render.js`, while
the general per-section art (`142.jpg`, …) is still absent and skipped gracefully;
the drop-in instructions stay. Also tightened the repo-tree comment on `images/`
from "Section illustrations are NOT included" to "General per-section art is NOT
included," since that folder never held the bespoke illustrations (they come from
the book folders). Doc-only; no stamp/test loop run, as noted above.

---

## 68. `<if ability="rank|stamina">` conditions always read 0 — Rank gates never open  — HIGH (engine)

*(Filed 2026-07-10 from playtesting §416.)* `evaluateCondition`'s `ability=`
handler (`engine.js`) resolves the ability through `firstAbility()`, which only
recognizes the **six core abilities** and returns `null` for `rank`/`stamina`.
The value therefore falls to `0`, so every `<if ability="rank" …>` comparison is
against 0 regardless of the character's real Rank. `resolveValue`/`evalExpression`
and `adjustAmount` already special-case `rank`→`state.rankValue()` and
`stamina`→ the (effective-max) score; the condition path just never got the same
routing.

Effect: `greaterthan`/`equals` Rank gates never fire (the branch stays greyed and
its links disabled — e.g. §416's south-west/south-east ship routes are dead even
at Rank 10), and `lessthan` Rank gates fire *always* (§b4/255's "Rank less than 4"
branch shows for everyone). Affects **12 sections**: book1/13, 249, 312, 364, 366,
416, 502; book2/95, 480; book4/255, 294, 465.

Fix: in the `add(get('ability'), …)` branch, route `rank`→`state.rankValue()` and
`stamina`→ the effective/written score (per the `modifier`) before falling back to
`firstAbility`, mirroring `evalExpression`. Add a focused headless assertion (a
Rank-N character passing/failing a `greaterthan`/`lessthan` Rank gate) and re-run
the every-section scan.

**Done (2026-07-10).** Routed `rank`→`state.rankValue()` and `stamina`→
`effectiveStaminaMax()` (with a `modifier`) / current Stamina (without) in the
`ability=` condition handler, before the `firstAbility` fallback — parity with
`evalExpression`/`adjustAmount`. Added seven `_test.html` assertions (Rank-10 vs
Rank-2 characters across `greaterthan`/`lessthan`/`equals`, plus a `stamina`
read). Suite green: `RESULT ALL PASS pass=641 fail=0`.

---

## 69. Bare post-fight `<lose>/<gain>` apply on entry, not on the fight outcome  — HIGH (render)

*(Filed 2026-07-10 from playtesting §570.)* When a fight's win/lose consequence is
written as **bare prose** after the `<fight>` (not wrapped in `<if dead=…>` /
`<success>` / `<failure>`), the inline `<lose>`/`<gain>` effects auto-apply on
render (`renderPassive`), before the fight is fought. The fight gate only disables
*navigation* buttons, not effects. §570 sets you to 1 Stamina **and strips all
your Shards the instant you enter**, then makes you fight the Tree Guard.

An XML-aware scan (see scratchpad) finds **8 player-facing cases** (bare,
non-`hidden` `<lose>/<gain>` after a `<fight>`, outside any gating wrapper):
book1/199 (`gain shards="200"` win reward), book1/570 (`lose staminato/shards`
lose penalty), book2/476 (`lose codeword="Brisket"` on win), book2/601
(`gain shards="25"` on win), book3/500 (`lose item` on win), book5/162
(`gain shards="15"` on win), book5/198 (`lose curse="Champion's Curse"`),
book6/490 (`gain shards="15"` unconditional post-fight). The other matches are
`hidden="t"` bookkeeping codewords already deferred by task 54's escape-clear
machinery. **§198 is also silently broken today**: its `<lose curse>` runs as a
no-op on entry (curse not yet applied), memoizes, and never lifts the Champion's
Curse the player picks up mid-fight — COMBAT stays halved.

Approach (chosen after scope check — 8 cases over 5 books favours a general engine
fix over 8 XML edits): defer a bare, **non-`hidden`** `<lose>/<gain>` that sits
after a `<fight>` (outside any conditional wrapper) until the fight resolves,
classifying it win/lose/unconditional by the surrounding prose (reuse
`computeFightGate`'s LOSE/WIN heuristic + `aggregateFightOutcome`), and applying it
only on the matching branch (win/uncond → on win; lose → on loss). Excluding
`hidden="t"` keeps task 54 untouched. Add a headless test (enter §570, assert
Shards/Stamina unchanged pre-fight; lose → 1 Stamina + 0 Shards; §199 win → +200)
and re-run the every-section scan.

**Done (2026-07-10).** `computeFightGate` now also builds an `effectNodes` map:
each bare, non-`hidden` `<lose>/<gain>` seen after a `<fight>` and outside any
`WRAP` wrapper (`if`/`elseif`/`else`/`success`/`failure`/`outcomes`/`group`/
`choice`) is classified `win`/`lose`/`uncond` by the same LOSE/WIN prose heuristic
that marks nav nodes. `renderPassive` checks that map before applying: while the
fight is unresolved (or fled) it holds the effect (shows the words, applies
nothing, does not memoise); once resolved it applies only on the branch taken
(`win`/`uncond` → win, `lose` → loss). Four `_test.html` assertions cover §570
(entry keeps 45 Shards / 20 Stamina; lose → 1 Stamina + 0 Shards) and §199 (entry
pays nothing; win → +200). Surfaced task **71** en route (§570's `staminato` had
never fired). Suite green: `RESULT ALL PASS pass=649 fail=0`.

---

## 71. `<lose staminato="N">` never applies — handler gated on a missing `stamina=` attr  — HIGH (engine)

*(Surfaced 2026-07-10 while fixing task 69's §570.)* `applyEffectBody`'s Stamina
branch is `if (get('stamina') != null) { … if (get('staminato') != null) … }` — the
`staminato` case lives *inside* a guard that requires a `stamina=` attribute. But
`<lose staminato="N">` ("you are beaten down to N Stamina", e.g. §570 "wake up on 1
Stamina") never carries `stamina=`, so the block is skipped and the reduction never
happens. A corpus scan shows **16 sections** use `staminato` and **none** pair it
with `stamina=`, so the effect is dead everywhere: book1/21, 157, 297, 308, 488,
498, 551, 570; book4/169, 338, 420; book5/66, 398, 521, 540, 669 (two use
`staminato="prestamina"` — "back to your pre-fight Stamina").

Fix: widen the guard to `get('stamina') != null || get('staminato') != null`; the
`staminato` arm already computes the damage as `current − target`. Add a direct
`applyEffect` assertion (15 → 1 on `staminato="1"`).

**Done (2026-07-10).** One-line guard widened; existing `staminato` arm unchanged.
Added a unit assertion (Stamina 15 → 1) plus the §570 integration coverage from
task 69. Suite green: `RESULT ALL PASS pass=649 fail=0`.

---

## 70. Visit box renders unticked on the visit it ticks; bare `<tick/>` prints a dangling comma  — MEDIUM (render)

*(Filed 2026-07-10 from playtesting §496.)* Two defects in the standard box idiom
`<if ticks="1">…goto…</if> If not, <tick/>, and read on.` (book1/160, 496, 199, …;
the `<tick/>, and read on` phrasing appears in **45 sections**):

1. **Box shows empty on the ticking visit.** The section box row is drawn
   (`render.js` ~L168) from `tickCount()` *before* `appendChildren` (L207) runs the
   `<tick/>`, so on the first visit the box still renders ☐ even though the tick is
   applied to state; it only shows ☑ on a later visit. Reads as "the box isn't
   being ticked." Fix: build/populate the box row *after* `appendChildren` (re-read
   `tickCount()`), keeping it in the same visual slot (insert before `.flow`).
2. **Wording.** A bare `<tick/>` renders no text, so `If not, <tick/>, and read on.`
   comes out as **"If not, , and read on."** (dangling comma). Fix: render a bare
   section-box `<tick/>` (no codeword / meaningful attrs) as its printed words —
   "tick the box" — so the sentence reads naturally, matching the gamebooks.

Add a headless assertion (first visit to a `boxes="1"` section shows ☑ after
render and the prose contains "tick the box", no ", ,") and re-run the scan.

**Done (2026-07-10).** (1) `render()` now runs `setSectionBoxes` before the walk
(keeps the tick cap) but *draws* the box row after `appendChildren`, inserted above
`.flow`, so a `<tick/>` applied this visit reads ☑ immediately. (2) A new
`isBareBoxTick()` guard (a `<tick>` with no words and no attribute beyond `count=`)
makes `renderPassive` print "tick the box" for the otherwise word-less box tick, so
"If not, <tick/>, and read on" renders as "If not, tick the box, and read on".
Added three `_test.html` assertions rendering §1.496 (state ticked, box shows ☑,
prose reads naturally with no ", ,"). Suite green: `RESULT ALL PASS pass=644
fail=0`.

---

## 72. "codeword gained" notification fires even when the codeword was already held  — LOW (engine)

*(Filed 2026-07-10 from a bug report.)* `applyTick`'s codeword branch
(`engine.js` ~L574) unconditionally pushed `'codeword gained'` onto the note list
and returned it, so `<tick codeword="X"/>` popped the "codeword gained" toast even
when the player already held X. Codewords are a set (`state.data.codewords[cw] =
true`), so re-granting one is a no-op on state — but the user still saw a reward
message for nothing gained. Common because books re-assert a codeword on a section
the player may revisit.

Fix: check `state.hasCodeword(cw)` before adding and only push the note when at
least one listed codeword was actually new; `did` stays `true` regardless so a
pipe-listed re-grant still never falls through to the bare visit-box tick.

**Done (2026-07-10).** Guarded the note with a `gained` flag over the split list;
state write and `did` unchanged. Suite green over three runs: `RESULT ALL PASS
pass=649 fail=0` (the one intermittent "fight attack produces a log line" failure
is the pre-existing 900 ms animation-timing flake, confirmed present on the
stashed pristine build too).

---

## 73. Ship dock/current-vessel state is not maintained — any owned ship can sail or trade from anywhere  — HIGH (state/market/navigation)

*(Filed 2026-07-10 from the repository review.)* The corpus has **94** numeric
sections with `dock=`, **15** sailing gotos and **2** `todock=` sections, but
`Story.begin` ignores both section attributes. A bought ship is created with
`docked: null`; `renderGoto` enables `sail="t"` when `state.ships.length > 0`
without checking the section's dock; clicking it neither chooses a ship nor
marks one as the current vessel/"at large". Cargo grants/losses, crew changes,
ship losses, cargo markets and `<if cargo|crew|ship>` likewise use the first or
any owned ship rather than a vessel present at the current location. A ship left
at Smogmaw can therefore sail from Kunrir, and a newly purchased vessel never
acquires its purchase port for the three working `docked="Smogmaw"` conditions.
This contradicts the checked-in tag specification: section `dock=` enables only
ships at that dock, `sail="t"` selects one and puts it at large, and `todock=`
moves other at-large ships when leaving.

Implement explicit current-vessel/location rules in a DOM-free module/state API:

1. Give ships stable identities and track which one is currently being sailed.
   Buying/receiving a ship at a `dock=` section must berth it there.
2. A sail action must offer only ships at the current dock (or the current ship
   while already at sea); choose one when several qualify, then mark it at large.
   Reaching a dock with the current ship berths that ship there. Honour `todock=`
   for other at-large vessels.
3. Route cargo/crew/ship transactions and location-sensitive conditions through
   the current/local ship instead of `ships[0]`/`ships.some(...)`. Preserve rules
   that genuinely mean any owned ship.
4. Thread only location/selection data through `render.js`; keep the mutations
   and eligibility checks headless in `state.js`/`market.js`/`engine.js`.

Add focused tests: two ships at different docks cannot sail/trade from the wrong
port; buying at a dock records that dock; sailing one of two ships changes only
the chosen ship; arrival re-docks it; `todock=` moves the other at-large ship;
book3/53's Smogmaw condition follows the actual berth. Re-run all sections.

**Done — core (2026-07-11).** Implemented the location model headlessly. A ship's
`docked` field is now maintained (a dock name, or `null` = "at large"), and a new
`data.location` tracks where the *player* is:
- **state.js** — ships gain a stable `id`; `arriveAtDock(x)` records the location and
  berths any at-large ship here (sailed in — JaFL `ShipList.setAtDock`); `shipsHere()`
  (`docked === location`), `currentShip()` (a ship here, else the first owned),
  `shipDockedAt(x)`, `sailShip(id)` (set at large). A `sameDock` helper matches
  null==null (at large) or case-insensitive dock names. `sanitizeData` migrates
  `location` and back-fills ship `id`s.
- **render.js** — `Story.begin` calls `arriveAtDock(section dock=)`, so entering a
  dock berths the arriving ship and a `dock`-less section clears the location. A
  `sail="t"` goto is enabled only when `shipsHere()` is non-empty (a ship left at
  Smogmaw can no longer sail from Kunrir); clicking it sets the ship at large then
  navigates, **prompting a choice** (`sailThenGo` → `.ship-choice`) when several ships
  share the dock; `force` now defaults optional for a sail goto.
- **engine.js** — `applyShipLose`, the `<tick crew|cargo>` grants, the adjust-crew
  path, `<set dock="X">` and the `crew` expression identifier route through
  `currentShip()`; `<if docked="X">` uses `shipDockedAt`.
- **market.js** — a ship bought inline or in a market berths at the current port;
  cargo loads onto / sells from a ship *here* first; `canUpgradeCrew` uses the local
  ship.
- **ui.js** — the sheet shows each ship's berth ("docked at X" / "at large").

`<if ship="type">` (65 uses) is left as **any-owned** (ownership, not location), as
the task requires. Deferred to **task 81**: `todock=` (book1/176, book4/114) and a
persistent "which at-large ship am I sailing" pointer across sea sections (needed so
`todock` and multi-at-large arrivals berth correctly). Added 22 assertions
(berth-on-arrival, here/current routing, cargo-to-local-ship, buy-berths-at-dock,
sail-gated-and-at-large, multi-ship sail chooser, §3.53 branch by real berth, save
migration). Web-only — stamped `26.07.11.a06e630`. Suite green:
`RESULT ALL PASS pass=723 fail=0`.

---

## 74. Standalone `force="f"` effects auto-apply — optional missions/initiations cannot be declined  — HIGH (render)

*(Filed 2026-07-10 from the repository review.)* `renderPassive` auto-applies
every standalone `lose`/`tick`/`gain`/`set`/`adjustmoney` unless it happens to
match a price gate, chooser, fight deferral or economic-decline heuristic. It
never reads `force=`. The XML corpus has **35** non-transfer standalone effects
with `force="f"` (the three optional transfers already have a proper button in
`renderTransfer`). Concrete failures:

- book1/25, 75, 191, 256, 290, 331, 411, 471, 472 and others grant mission
  codewords on entry even when the player declines;
- book1/636, book2/135 and book5/435 automatically initiate every qualifying
  visitor into Tyrnai;
- book6/160 removes both Safety from Storms and the catastrophe certificate when
  the player owns both, although its prose says to choose one;
- book3/405 executes all twelve optional `<set dock=…>` actions in sequence, so
  the successful ship always ends at Yellowport; and
- book6/163 automatically surrenders the ivory-handled katana.

Render a standalone `force="f"` action as an explicit, once-per-visit action
instead of applying it on entry. Preserve conditional/roll gating and the
existing specialised transfer/payment controls. For sibling actions that form a
single choice (book6/160 and book3/405), enforce one selection; either add a
small generic choice controller or make the choice explicit in the source XML.
Forced/default narrative effects should keep the current automatic behaviour.

Add DOM/state tests for declining/accepting a mission, optional Tyrnai
initiation, choosing exactly one book6/160 protection, and selecting a non-final
dock in book3/405. Re-run all sections.

**Done (2026-07-10).** `renderPassive` now checks `force=` before the auto-apply
path: a visible `force="f"` passive node (`tick`/`gain`/`lose`/`set`/`adjustmoney`)
routes to a new `renderForcedOptional`, which renders it as a **once-per-visit opt-in
button** (`applyEffect` fires only on click, memoised by a `force@path` key) instead
of applying on entry. The check sits **after** the price/flag/hidden/payment gates so
the specialised controls still win; a survey confirmed no `force="f"` passive node
carries `hidden`/`price`/`flag`/`ability="?"`, so none are mis-routed. This fixes the
19 single opt-ins (mission codewords, the three Tyrnai initiations, the katana
surrender, book4/263's win/loss payouts) — they are no longer applied when declined.

Choose-one enforcement (`forcedChoiceGroup` + a per-visit `ctx.forcedChosen` map):
`<set dock=…>` `force="f"` siblings share one `'dock'` token (a ship docks at ONE
place — book3/405), and two-or-more `force="f"` `<lose>` under a shared parent form a
group keyed by that parent (book6/160's "cross off one"). Taking any member records
the choice and disables the untaken members ("You may choose only one"), so exactly
one option applies — book3/405 no longer runs all twelve docks to Yellowport, and
book6/160 no longer strips both protections. Forced/default effects (no `force=`, or
`force="t"`) keep auto-applying.

Pure render-layer change (no engine/state edits). Added 17 DOM assertions
(§1.25 accept/record + not-on-entry, §1.636 optional Tyrnai, §6.163 katana,
§6.160 choose-one + lock, §3.405 no auto-dock + pick-one + lock). Web-only — stamped
`26.07.10.1ab77d7`. Suite green: `RESULT ALL PASS pass=701 fail=0`.

---

## 75. Live `<tick>` forms for equipment, profession changes and patterned titles are incomplete/inert  — MEDIUM (engine/render/state)

*(Filed 2026-07-10 from the repository review.)* `applyTick` only modifies
equipment when `item=` is present with `addbonus`/`addtag`. It does not recognise
`weapon=`/`armour=`/`tool=`, `removetag`, `profession`, `titlePattern` or
`titleAdjust`; a recognized-looking tick with none of its handled attributes
falls through to the bare visit-box tick. Live effects broken by this include:

- six equipment ticks: book5/386 cannot select/tag/upgrade/clean up Targdaz's
  weapon, book6/731's +1 weapon boon is inert, and book6/135 cannot remove a
  `keep` tag from the weapon it breaks;
- book6/118 cannot make a former Priest choose a new profession and book6/731's
  Priest reward does nothing; and
- the three bokh mastery grants (book5/119, 172, 235) increment an internal
  `bokh` value only by coincidence (`titleValue=1`) and display `bokh (N)` rather
  than `titlePattern="Circle {0} Master of bokh"`. Book5/235 also misspells
  `titleAdjust` as `titalAdjust` in the source.

Extend the headless effect API to select the correct equipment kind using
`?`/name/tags/`using`, apply `addbonus`/`addtag`/`removetag`, and return a chooser
request when several possessions qualify. Support a single profession and a
pipe-list profession picker. Persist enough title pattern/value metadata to
render the current formatted title and honour `titleAdjust`; fix the XML typo.
Do not put these mutations in `render.js`.

Add focused tests for book5/386's full tag→bonus→cleanup cycle, book6/731's
weapon/profession outcomes, the five-way former-Priest choice in book6/118, and
two successive bokh grants displaying Circle 2. Rebuild data and run all sections.

**Done (2026-07-11).** Three parts, rules kept headless:
- **Equipment** — a shared `selectEquipment(el, state, eqAttr, cacheN, opts)` (engine.js)
  replaces the old item-only enchant. It selects by `item`/`weapon`/`armour`/`tool`
  (kind-filtered), narrowed by `tags=` and `using=` (wielded/worn), from the sheet or a
  `cache`; `*` = all, a name = those named, `?`/blank = one (the `opts.chooser` pick when
  several qualify, else the first). `applyTick` now applies `addbonus`/`addtag`/**`removetag`**
  to the selection — so book5/386 can tag → up/down-bonus → clean up Targdaz's weapon,
  book6/731's +1 boon works, and book6/135's `using="t" removetag="keep"` frees the broken
  weapon. `render.js` adds `needsEquipmentChoice`/`renderEquipmentChoice`: a bare
  `weapon="?"`/`item="?"` (no tags/using/cache) with >1 candidate shows an inline picker
  instead of defaulting.
- **Profession** — `state.setProfession` + an `applyTick` branch for a single
  `<tick profession="priest">` (book6/731); a pipe-list (`mage|rogue|…`) routes to a new
  `needsProfessionChoice`/`renderProfessionChoice` picker (book6/118 former Priest).
- **Patterned titles** — `state.adjustPatternedTitle(name, pattern, init, adjust)` +
  an `applyTick` `titlePattern` branch: a NEW title starts at `titleValue` (default 1),
  an existing one advances by `titleAdjust` (default 1), and the title record carries the
  `pattern` ({0}=value). `ui.js` renders it ("Circle 2 Master of bokh", not "bokh (2)");
  `sanitizeData` round-trips `pattern`. Fixed the `titalAdjust`→`titleAdjust` typo in
  `book5/235.xml` and rebuilt (only `book5.json` changed — 1 line; `meta.json` restamped).

Added 15 assertions (bokh Circle 1→2 + sheet render + titleValue≠titleAdjust + migration;
the §386 tag/bonus/removetag cycle; §135 `using` removetag; §731 profession=priest; DOM
two-weapon enchant picker; DOM five-way profession picker). Rebuilt data (pwsh 7) —
stamped `26.07.11.b048106`. Suite green: `RESULT ALL PASS pass=761 fail=0`.

---

## 76. Blessings are stored as inert labels — their reroll/combat benefits cannot be used  — HIGH (engine/combat/render/state)

*(Filed 2026-07-10 from the repository review.)* The corpus grants **95**
blessings and repeatedly defines their use, but the state stores only strings
and the sheet renders non-interactive chips. Roll/combat widgets never consult
them. As a result:

- CHARISMA/COMBAT/MAGIC/SANCTITY/SCOUTING/THIEVERY blessings cannot reroll a
  failed roll (e.g. book1/107, book2/13, book6/171/587/690);
- Luck cannot reroll any dice result, and Safe Travel cannot reroll a
  `random type="travel"` encounter (explicitly required by
  `JaFL-XML-Tags.html`);
- Defence through Faith cannot add +3 Defence for one chosen combat, and Divine
  Wrath cannot inflict its 1d pre-fight damage (book5/248/692/89, book6/94);
- ordinary blessings are never consumed by those uses; and
- book6/159's `permanent="true"` Safety from Storms is indistinguishable from an
  ordinary one, so permanence cannot be honoured when the blessing is used.

Model blessing metadata/consumption headlessly and migrate existing string-only
saves. After a failed relevant roll, offer a one-click blessing reroll that
replaces the result and consumes the blessing unless permanent; Luck applies to
all player dice and Safe Travel to travel rolls. Before/during combat, expose
the Defence and Wrath choices and consume them exactly once. Keep the existing
XML-driven storm/disease avoidance paths working and distinguish using a
permanent blessing from punitive "lose all blessings" effects. The view should
only render choices and dice, with eligibility/consumption in engine/combat/state.

Add unit/DOM tests for an ability reroll success/failure replacement, Luck on a
random roll, Safe Travel, +3 Defence for one fight, Wrath pre-damage, ordinary
consumption, permanent storm retention, save migration and duplicate prevention.
Re-run all sections.

**Done — core rerolls (2026-07-10).** Landed the metadata/consumption model and the
ability/Luck/Safe-Travel rerolls; the combat Defence-through-Faith / Divine-Wrath
choices were split into their own follow-up (**task 80**, fight-widget buttons)
per the agreed scope.

- **state.js** — blessings keep their string shape in `data.blessings`, with a new
  parallel `data.permanentBlessings` (canonical names). `addBlessing(b, permanent)`
  records/upgrades permanence and de-dupes; `removeBlessing` drops the marker too;
  `removeAllBlessings()` clears both (a punitive `<lose blessing="*">` removes even
  permanent ones); `isBlessingPermanent`; `useBlessing(b)` consumes unless permanent;
  `rerollBlessings({ability,success,kind,travel})` returns the spendable blessings —
  an ability blessing on a FAILED check of that ability, Luck on any roll, Safe
  Travel on a `random type="travel"`. `sanitizeData` migrates string-only saves
  (⇒ `permanentBlessings: []`) and keeps only canonicalised markers for held
  blessings (orphans dropped).
- **engine.js** — the grant path reads `permanent=` (`addBlessing(name, boolAttr(permanent))`
  — book6/159); the `<lose blessing="*">` path routes through `removeAllBlessings()`.
- **render.js** — a shared `appendBlessingReroll(widget, opts, reroll)` shows a
  one-click "Use your blessing of X to reroll" beneath a resolved roll; clicking
  consumes the blessing (unless permanent) and re-runs the SAME roll, overwriting the
  memoised result (so a pay-to-roll gate's flag is not re-consumed). Wired into
  `renderDifficulty` (ability + Luck on failure), `renderRankcheck` (Luck on failure),
  `renderTraining` (Luck on failure), and `renderRandom` (Luck always; Safe Travel on
  `type="travel"`). Only appears when the blessing is actually held, so the
  render-every-section scan (a blessing-less character) is unaffected.
- **ui.js** — a permanent blessing chips as "X (permanent)" so it reads distinctly.

Storm/disease/poison/injury immunity paths are untouched (still `<if blessing=…>` +
XML-driven `<lose>`). Added 22 assertions (metadata/permanence/consumption, alias
upgrade, lose-all, engine grant + lose-all, save migration + orphan drop,
`rerollBlessings` eligibility across ability/Luck/Safe-Travel, and a synthetic §T76
DOM reroll: a failed THIEVERY roll offers THIEVERY+Luck buttons, using THIEVERY
consumes it and re-rolls to success). Web-only — stamped `26.07.10.264f3fa`. Suite
green: `RESULT ALL PASS pass=684 fail=0`.

---

## 77. Selector-aware `<set item|cache …>` expressions ignore their selected item/cache  — HIGH (engine)

*(Filed 2026-07-10 from the repository review.)* `applySet` reads only `dock`,
`var`, `modifier`, `value` and `codeword`, then evaluates `value=` against the
player's global sheet. It ignores `item`/`weapon`/`armour`/`tool`, `tags` and
`cache` selectors. All **21** selector-aware set nodes therefore compute the
wrong value:

- sixteen light-source counters use `<set item="?" tags="…"
  value="matches">` across eight sewer/cave sections. `matches` resolves as an
  unset variable (0), so both counters compare equal and a candle is consumed
  even when a reusable light is available;
- book2/322's treasure risk reads purse Shards instead of cache `2.322.t`, so
  the vampire-bat roll does not reflect how much treasure was taken;
- book2/665's smithy payment and cached weapon/armour bonuses read the purse and
  currently equipped gear, producing the wrong roll modifier/upgrade cap; and
- book5/386 reads the wielded weapon bonus rather than the weapon tagged `Tz`.

Implement the checked-in SetNode selector semantics in `engine.js`: `matches`
counts matching items in the selected inventory/cache, `weapon`/`armour`/`tool`
resolve the selected possession's bonus, and sheet identifiers such as `shards`
resolve against `cache=` when supplied. Reuse `matchItemQuery`/the shared item
matcher and define deterministic/chooser behaviour for `?`; keep expression
parsing itself unchanged.

Add direct tests for item/tag match counts and cached Shards/equipment, plus
integration tests for book1/164 (lantern + candle does not burn the candle),
book2/322's risk modifier, book2/665's upgrade cap and book5/386's selected
weapon. Re-run all sections.

**Done (2026-07-10).** Implemented the checked-in SetNode selector semantics in
`engine.js`. `applySet` now builds a selector context (`setSelector`) from the
node's `item`/`weapon`/`armour`/`tool` + `tags`/`bonus` + `cache` and threads it
into `evalExpression(value, state, mode, sel)`. A new `sel` branch in the
identifier resolver mirrors JaFL `SetVarNode.resolveIdentifier`:
- `matches` → count of items matching the selector in the selected pool
  (`setSelectorMatches`, drawn from the named cache or the sheet, narrowed by
  kind/name/tag/bonus and reusing the shared `matchItemQuery`);
- `weapon`/`armour`/`tool` → the single selected possession's bonus
  (`setSelectorBonus`); when the selection is missing, ambiguous or the wrong
  kind it falls back to the wielded weapon / worn armour, **but only for a sheet
  lookup** — a cache lookup that misses reads 0 (no equipment fallback);
- `shards` → the named cache's money when `cache=` is set, else the purse.

When the node carries neither an item selector nor a cache, `setSelector`
returns `null` and resolution is unchanged (existing `<set>` behaviour and the
`resolveValue → evalExpression(str, state)` 2-arg callers are untouched).

The sixteen light counters now compare correctly (a reusable lantern gives
`lights > candles`, so §1.164's candle is not burned); §2.322's risk reads the
cache treasure taken; §2.665's `MoneyBonus`/`weaponbonus`/`armourbonus` read the
cache and the deposited item, capping the upgrade at `6 − bonus`; and §5.386
reads the `Tz`-tagged weapon rather than the wielded one. Added 14 `_test.html`
assertions (match counts; §5.386 selected-vs-wielded weapon; §2.665 cached
money/weapon/armour + upgrade cap + armour mirror; §2.322 risk modifier; §1.164
render — the "cross it off" block active only when candles == lights; a
no-cache-shards regression) covering the direct and integration cases the filing
asked for. Web-only change — stamped `26.07.10.fdc8a51`. Suite green:
`RESULT ALL PASS pass=663 fail=0`.

---

## 78. Validate numeric `<section name>` against its filename; fix five mismatched source files  — LOW (data/build)

*(Filed 2026-07-10 from the repository review.)* `build-data.ps1` validates that
each numeric source is well-formed and rooted at `<section>`, but does not check
the root's `name=` against the filename used as the JSON/navigation key. Five
ordinary numeric files currently disagree:

- `book4/461.xml` says `name="451"`;
- `book5/119.xml` says `name="172"`;
- `book5/270.xml` says `name="406"`;
- `book5/276.xml` says `name="137"`; and
- `book6/288.xml` says `name="287"`.

The contents are distinct from each namesake file, so these are metadata copy
errors, not intentional duplicates. The app currently labels sections from the
JSON key, masking the problem. Correct the five source attributes and extend the
build validator so a purely numeric filename must match `section@name`. Allow a
lettered continuation to use its printed parent number (`book5/609a.xml` has
`name="609"`) or document/validate that convention explicitly. Add a build-time
assertion, rebuild data and run all sections.

**Done (2026-07-11).** Corrected the five source `<section name>` attributes to match
their filenames (`book4/461` 451→461, `book5/119` 172→119, `book5/270` 406→270,
`book5/276` 137→276, `book6/288` 287→288). Extended the `build-data.ps1` validation
pre-pass: `Test-XmlDoc` now takes `$expectNames` and, for every bundled section file,
asserts `<section name>` matches its filename key. A purely numeric file must match
exactly; a lettered continuation may use **either** its full name or its numeric
prefix — the corpus is inconsistent (`book5/609a` uses `name="609"`, `book6/448a`
uses `name="448a"`), so both are accepted rather than rewriting those intentional
continuations. The gate caught `448a` on the first run, which is how the two-convention
split was found. Rebuild under **pwsh 7** left book1–3 JSON byte-identical (only
book4/5/6 changed, in the five sections + task 85's tag). `XML OK: 4377 files`;
suite green: `RESULT ALL PASS pass=778 fail=0`. README's "Regenerating the data" gate
note updated.

---

## 79. Keeping a preview or importing a save reports success when persistence fails  — MEDIUM (state/app)

*(Filed 2026-07-10 from the repository review.)* Task 7 made `save()` return
`false` and set `lastSaveError`, and new-game/save-and-quit callers surface it.
Two later entry points ignore that contract:

- `GameState.keep()` clears `ephemeral`, assigns a slot, calls `save()` and
  returns the slot even when the write failed. `keepDemo()` then toasts
  "Adventure saved."; because no `changed()` event fires, the existing save-error
  modal is not shown. The preview is also no longer ephemeral, so retrying is
  awkward.
- `importSave()` calls `gs.save()` without checking the result and returns
  `{slot, meta: loadSlotMeta()[slot]}`. The UI toasts `Imported “undefined”.`
  even though no save exists.

Make both operations transactional with respect to persistence: on failure,
preserve/revert the preview's ephemeral state and slot, and throw or return a
failure that the existing modal can display; an import must not claim a slot or
success without both save data and metadata. Reuse `lastSaveError`'s player-facing
message. Add tests with a throwing `localStorage.setItem` for keep/import, plus
recovery/retry tests. No app stamp is needed for the TASKS-only filing; when the
fix is implemented, stamp and run the full suite.

**Done (2026-07-11).** Both entry points are now transactional with respect to
persistence, reusing `save()`'s `lastSaveError` contract (task 7):
- **`GameState.keep()`** (`state.js`) captures the previous slot, promotes the
  game, then checks `save()`'s result. On failure it **reverts** (`slot` back to
  the old value, `ephemeral` back to `true` so the preview can be retried or
  exported) and **throws** `lastSaveError`. It only returns the new slot on a
  confirmed write.
- **`importSave()`** (`state.js`) now checks `gs.save()`; on failure it rolls back
  any partial write (`deleteSlot`, guarded) so no slot is half-claimed and
  **throws** `lastSaveError`, instead of returning `{slot, meta: undefined}` and
  letting the UI toast `Imported "undefined"`. It reads `meta` only after a
  successful save.
- **`app.js`** — `keepDemo()`'s existing catch now shows the storage message with
  a one-click **Export now** (the reverted game is still in memory, so export
  works); `importSaveFile()` already routed the throw to its "Import failed"
  modal.

Added 9 headless assertions (`_test.html`): with a throwing `localStorage.setItem`,
`keep()` throws, reverts to an ephemeral preview on its old slot, raises the "full"
message and writes nothing, then recovers once storage works; `importSave()` throws,
raises the message, claims no slot / writes nothing, then recovers with a real slot
and named meta. Web-only — stamped `26.07.11.27bfd95`. Suite green:
`RESULT ALL PASS pass=770 fail=0`.

---

## 80. Combat blessings: expose Defence through Faith and Divine Wrath on the fight widget  — MEDIUM (combat/render/state)

*(Split from task 76 on 2026-07-10.)* Task 76 landed the blessing
metadata/consumption model (`useBlessing`, `permanentBlessings`, migration) and the
ability/Luck/Safe-Travel rerolls, but deferred the two **combat** blessing benefits,
which the books define but the engine cannot yet apply:

- **Defence through Faith** (`blessing="defence"`, optional `bonus=` defaulting to 3)
  — add its bonus to the player's Defence for **one chosen combat**, then consume it
  (book5/248/692, book6/…); and
- **Divine Wrath** (`blessing="wrath"`) — inflict **1d** pre-fight damage on the enemy,
  then consume it (book5/89, book6/94).

The plumbing already exists to build on: `combat.js` reads a transient
per-fight Defence/attack bonus (`state.fightDefenceBonus()`/`fightAttackBonus()`,
task 49, cleared each section in `begin`), and enemy up-front damage has a
`preDamage` path (task 26). The agreed UX (from the task-76 scoping) is **buttons on
the fight widget**: when the player holds `defence`/`wrath` and a fight is unresolved,
show "Use Divine Wrath (1d damage)" / "Use Defence through Faith (+N Defence)"; a
click applies the effect (Wrath → reduce enemy Stamina by a 1d roll once; Defence →
set the per-fight Defence bonus for this fight) and consumes the blessing via
`state.useBlessing(...)` unless permanent. Keep the rules headless (a
`combat.js`/`state.js` helper decides eligibility and applies the effect; the view
only renders the buttons and the dice), and guard against using each benefit more
than once per fight.

Add DOM/headless tests: Wrath cuts enemy Stamina by the rolled 1d exactly once and
is then consumed; Defence raises the player's fight Defence by +3 (or `bonus=`) for
that fight only and clears on leaving the section; the buttons appear only while a
fight is unresolved and only when the blessing is held; a permanent such blessing is
not consumed. Stamp and re-run all sections.

**Done (2026-07-11).** Added two headless helpers to `combat.js`:
`useWrathBlessing(state, fight)` rolls 1d, cuts the enemy's Stamina (and any
`staminaLost` tally), fells it if that reaches the win threshold, marks `fight.wrathUsed`
and consumes the blessing (via `useBlessing`, so a permanent one survives — task 76);
`useDefenceBlessing(state, fight, bonus=3)` adds a per-fight Defence bonus through the
existing `addFightBonus('defence', …)` store (task 49, cleared on leaving the section —
so it lasts exactly one combat), marks `fight.defenceUsed` and consumes the blessing.
Both are once-per-fight (guarded by the fight-object flags) and no-ops without the
blessing. `render.js` `drawFight` renders "Use Divine Wrath (1d damage)" / "Use Defence
through Faith (+3 Defence)" buttons on an unresolved single-fight widget only when the
player holds the blessing — so a blessing-less character (the every-section scan) never
sees them; the "Your Defence" line now includes the per-fight bonus so the boost is
visible. Rules stay in `combat.js`/`state.js`; the view only renders the button and the
result. Added 13 assertions (Wrath 1d damage + fell + once + consume; Defence +3 + once
+ consume; inert without the blessing; DOM buttons shown-only-when-held, click applies +
consumes + removes the button, and the boosted Defence displays). Web-only — stamped
`26.07.11.54c1322`. Suite green: `RESULT ALL PASS pass=746 fail=0`.

Deferred (not needed by the corpus uses, which are single fights): the buttons are on
the single-fight widget only, not group fights — a group-fight Wrath would need a target
choice among foes. File a follow-up only if a group section is found to need them.

---

## 81. Ships: honour `todock=` and track which at-large ship is being sailed  — MEDIUM (state/render)

*(Split from task 73 on 2026-07-11.)* Task 73 landed the core dock/location model
(`data.location`, ship `docked`/`id`, `arriveAtDock`/`shipsHere`/`currentShip`/
`sailShip`, sail gating + chooser, buy-berths-at-dock, cargo/crew/dock routing). Two
pieces were deferred because they need a persistent "current vessel" pointer:

1. **`todock="X"`** (book1/176, book4/114) — "when the character leaves this section,
   any ships at sea the character isn't in move to dock X." This is only meaningful
   once we track *which* at-large ship the player is currently sailing (the others get
   sent to X). `Story.begin` reads the attribute but does nothing with it yet.
2. **Sailing-ship identity across sea sections** — `arriveAtDock` currently berths
   *every* at-large ship at the arrival dock (JaFL's own default). If the player gains
   a second ship while at sea (so two are at large), arriving berths both together
   instead of leaving the non-sailed one to be moved by `todock`. A
   `data.sailingShipId`, set by the sail action and cleared on docking, would let
   `arriveAtDock` berth only the sailed ship and let `todock` relocate the rest.

Implement a `sailingShipId` on state (set in `sailShip`, cleared when that ship
docks), make `arriveAtDock` berth only the sailed vessel (or all, if none is marked —
the single-ship common case is unchanged), and apply a section's `todock=` on leaving
to move other at-large ships. Keep it headless in `state.js`; thread only the
`todock` value through `render.js` (apply it in the navigate-away path). Add tests:
gain a ship at sea, sail one, arrive at a dock — only the sailed ship berths there and
`todock=` sends the other to the named port; a single-ship voyage is unaffected. Stamp
and re-run all sections.

**Done (2026-07-11).** Added `data.sailingShipId` (set by `sailShip`, cleared when the
ship reaches a dock). `arriveAtDock` now berths **only** the sailed ship while a voyage
is active (else every at-large ship — the single-ship case + loaded saves), and ends
the voyage on landfall. `applyTodock(dock, exemptId)` moves at-large ships to the dock
except the exempted one; `sanitizeData` keeps `sailingShipId` only when it names an
at-large ship.

The exit type drives the exemption, which the two `todock` sections need to differ on:
`Story.begin` records `sectionTodock`, and navigation is wrapped once in the
constructor — a **sail exit** (`sailThenGo`) sets `_sailExempt` to the ship taken, so
`todock` relocates only the OTHERS and the voyage continues (book4/114: pick one of two
ships, the other sails to Yarimura); a **non-sail exit** (gone ashore) exempts nothing,
so every at-large ship docks and the voyage ends (book1/176: go ashore → your ship is
noted at Yellowport; or sail on → it stays at large). Added 10 assertions (applyTodock
exemption, sail-marks/arrive-clears, save migration, and DOM §4.114 two-ship split +
§1.176 ashore-vs-sail). Web-only — stamped `26.07.11.05cddc7`. Suite green:
`RESULT ALL PASS pass=733 fail=0`.

---

## 82. Test harness: a duplicate top-level `const` in `run()` silently aborts the whole suite  — LOW (test infra)

*(Filed 2026-07-11 from experience adding tasks 73/81/75.)* Every assertion in
`web/_test.html` lives in one `async function run()` scope. Adding a test block that
reuses a `const`/`let` name already declared **anywhere** in `run()` is a *parse-time*
`SyntaxError` (e.g. "Identifier 'g53' has already been declared"), which aborts the
**entire** module before `run()` is ever called. The symptom is misleading: the page
stays at `#results = "running…"` with title `FL tests` (not `TESTS_OK`/`TESTS_FAIL`), so
the headless smoke check reports "no RESULT line" and it reads as a hang, not a failing
assertion. Diagnosing it requires re-running Chrome with `--enable-logging=stderr --v=1`
and grepping the console for the `SyntaxError`. This bit three times in one session
(g53/c53, g114/c114, and a near-miss), each costing a diagnostic round-trip.

Make the harness fail loudly and locally instead:
- Wrap each task's test block in its own block scope `{ … }` (or an IIFE) so its
  `const`s are local and a collision is impossible across blocks — the cheapest fix and
  it also documents block boundaries; **or**
- keep one scope but add a lightweight guard/step that surfaces a top-level parse error
  as a visible `FATAL` (e.g. load the module via a small bootstrap that catches the
  `error` event and writes it into `#results`), so the smoke check sees a failure rather
  than a hang; **and/or**
- add a build/CI check that the test module parses (a Node `--check`-style pass, or run
  it headless and assert the title becomes `TESTS_OK`/`TESTS_FAIL`).

No engine/data change. Add a note in `AGENTS.md`'s build+test section about the
symptom so the next contributor recognises "stuck at running…" as a duplicate
declaration. Re-run the suite to confirm the guard reports a synthetic collision as a
visible failure.

**Done (2026-07-12).** Added a small **classic** `<script>` in `web/_test.html`, placed
*before* the `type="module"` block (so it is registered even when the module fails to
compile), that listens for the window `error` event (bubble phase → catches script/parse
errors, not resource 404s). On a top-level abort it writes a visible
`RESULT FATAL pass=0 fail=1 / FATAL the test module did not load: <message> (file:line)`
into `#results` and sets the title to `TESTS_FAIL`, with a guard so it never clobbers a
suite that already reported. Verified by temporarily inserting a duplicate
`const SYNTHETIC_DUP_82` — the run reported
`RESULT FATAL … Identifier 'SYNTHETIC_DUP_82' has already been declared (_test.html:36)`
with title `TESTS_FAIL` (previously a hang at `running…`); reverted, and the healthy run
is unchanged (`RESULT ALL PASS pass=785 fail=0`, `TESTS_OK`). Also documented the symptom
in `AGENTS.md`'s build+test notes. Chose the bootstrap over wrapping every block in `{}`
(the cheapest generic safety net; many blocks are already block-scoped). Test-only, no
stamp.

---

## 83. Combat blessings (Wrath/Defence) buttons appear only on the single-fight widget  — LOW (render)

*(Split from task 80 on 2026-07-11.)* Task 80 added the "Use Divine Wrath (1d damage)"
and "Use Defence through Faith (+3 Defence)" buttons in `drawFight` (the single-fight
widget), where every corpus grant's *intended* use lives. But the blessings are
player-held and mechanically usable in **any** fight, so a player who holds one and
enters a simultaneous **group fight** (`drawGroupFight` — §6.192/273/291/618) cannot
use it: the buttons aren't rendered there. Divine Wrath is granted in book6 (§94) and
the group fights are all in book6, so the scenario is reachable, if uncommon.

Add the buttons to `drawGroupFight` too. Defence through Faith is target-agnostic —
reuse `useDefenceBlessing` unchanged. Divine Wrath needs a target among the living
foes: either extend `useWrathBlessing` to accept a specific `fight` (render one Wrath
button per still-standing foe, mirroring the per-foe Attack buttons) or let the player
pick. Keep the once-per-combat guard across the whole group (a single `wrathUsed`/
`defenceUsed` marker on the group, not per-foe). Add a DOM test: a group fight with a
Wrath holder shows the option, using it damages the chosen foe once and consumes the
blessing. Stamp and re-run all sections.

**Done (2026-07-12).** `drawGroupFight` (`render.js`) now renders the combat-blessing
controls, mirroring `drawFight`: one "Divine Wrath on <foe> (1d)" button per still-living
foe (target chosen like the per-foe Attack buttons), and one target-agnostic "Use
Defence through Faith (+3 Defence)". The once-per-combat guard lives on the group proxy
(`this.sectionFight.wrathUsed`/`defenceUsed`), not per-foe — `useWrathBlessing(state,
target)` damages the chosen foe while the click sets `sectionFight.wrathUsed`, and
`useDefenceBlessing(state, this.sectionFight)` marks the proxy; both consume the blessing
(so a non-permanent one also hides the buttons). Also folded in the task-87 counterpart
for the group `.you` line: it now shows `defence() + fightDefenceBonus()` (both single
and group resolution fold the bonus in via `playerDefenceFor`). Added 7 headless DOM
assertions (Wrath button per living foe; damages the chosen foe by 1d; consumed +
once-per-combat; Defence +3 + consumed + boosted display; blessing-less character sees
no buttons). Web-only — stamped `26.07.12.896c1f5`. Suite green on the first run:
`RESULT ALL PASS pass=785 fail=0`.

---

## 84. De-flake the "fight attack produces a log line" test  — LOW (test infra)

*(Filed 2026-07-11 from repeated flakes this session.)* The `web/_test.html`
assertion **`fight attack produces a log line`** (§105: click the fight `.btn-roll`,
`await` 900 ms, assert a `.fight-log div` exists) fails intermittently under headless
Chrome `--virtual-time-budget`: `rollButton`'s click handler `await animateDice(box)`
before `fightRound` runs, and the fixed 900 ms wait occasionally elapses (in virtual
time) before the log line is written. It failed on ~half the smoke runs this session
with no code change, so a genuine regression here could be dismissed as "the flake",
eroding suite trust (see the [[flaky-fight-log-test]] memory for the operational
"just re-run" guidance).

Make it deterministic: either stub/short-circuit `animateDice` in the test environment
(a hook or a near-zero duration), or drop the wall-clock `await` and assert on the
resolved state instead — e.g. after the click settles, check `fight.log.length` /
`state` directly rather than polling the DOM after a timeout. Confirm the assertion
passes on repeated headless runs. No engine change; test-only.

**Done (2026-07-11).** Investigating turned up **two** causes, not the one filed. (1)
`animateDice` is a `setInterval(70ms)×8`, which `--virtual-time-budget` occasionally
starves so the promise never resolves — fixed by using the existing
`window.__FL_INSTANT_DICE__` hook (animateDice returns `Promise.resolve()` with no
timer). (2) The deeper cause: the test reused the shared `gs`, whose Stamina had been
drained by earlier tests, so an unlucky `fightRound` roll sometimes **killed the player**
in one round; the handler then `rerender()`s the section and the running `.fight-log`
is gone (`log=0`). `drawFight` always renders `.fight-log` — including for a *won* fight
— so only the death path clears it. Fixed by giving the test a **fresh, 99-Stamina
state** that cannot die in one round (and dropping the 900 ms wall-clock wait for a
short poll). Verified deterministic: **5/5** clean runs at the default
`--virtual-time-budget=90000` (previously ~50% failure). Test-only, no stamp;
`RESULT ALL PASS pass=778 fail=0` each run. The [[flaky-fight-log-test]] "just re-run"
guidance is now obsolete — a failure here is a real regression.

---

## 85. book6/135 source: `tag="keep"` is a stray/misnamed attribute  — LOW (data)

*(Filed 2026-07-11 from task 75.)* `book6/135.xml` has
`<tick weapon="?" using="t" tag="keep" removetag="keep"/>`. `tag=` is not a recognised
tick attribute (the item-tag filter is `tags=`), so the engine ignores it. The effect
is nonetheless correct — `using="t"` already selects the wielded weapon and
`removetag="keep"` strips its `keep` tag — so this is cosmetic, not a bug. Clean it up
for clarity: drop `tag="keep"` (redundant with `using="t"`) or, if a filter was
intended, change it to `tags="keep"` (which would narrow to a keep-tagged wielded
weapon — verify that matches the section's intent before changing semantics). Since it
edits source XML, fold it into task 78's rebuild pass rather than a standalone build.
Confirm §6.135 still renders and removes the tag after the change.

**Done (2026-07-11, folded into task 78's rebuild).** Dropped the stray `tag="keep"`
from `book6/135.xml`, leaving `<tick weapon="?" using="t" removetag="keep"/>`. The
section comment ("modified so that even 'kept' weapons can be broken") confirms the
intent is to strip `keep` from the *wielded* weapon so the sibling
`<lose weapon="?" using="t"/>` can take it — which `using="t"` + `removetag="keep"`
already do; `tag=` was never a recognised attribute, so this is purely cosmetic. The
existing `§6.135 <tick weapon="?" using="t" removetag="keep">` assertion still passes.
Rebuilt with task 78; suite green (`RESULT ALL PASS pass=778 fail=0`).

---

## 86. Add a full-section render integration test for book5/386  — LOW (test coverage) — **done**

*(Filed 2026-07-11 from task 75.)* Task 75's equipment-tick tests exercise the
tag→+bonus→−bonus→removetag cycle with **synthetic** `<tick weapon="?" …>` nodes, which
covers the engine mechanics §386 depends on. It does not render the actual §386 section
end-to-end (tag one weapon → roll 2d vs the tagged weapon's bonus → the outcome table's
addbonus/removetag/destroy branches → the final `removetag="Tz"` cleanup). Add a DOM
integration test that begins §5.386 with a known weapon and drives the roll (stubbed
RNG) through a representative outcome, asserting the weapon's bonus/tags and the Shard
refund at bonus ≥ 6. This guards the wiring (visible vs hidden ticks, the `tags="Tz"`
selection after the first tag) that the synthetic tests don't. Test-only; re-run all
sections.

**Done (2026-07-11).** Added a DOM integration test for §5.386 (`_test.html`, five
assertions) that begins the real section and drives the roll. It pins two things:
(correct) the hidden `<tick shards="150">` refund fires **only** at bonus ≥ 6 (a +6
weapon → +150 Shards, and is not enchanted past its cap; a +2 weapon → no refund),
and the section renders its visible "one weapon" tick, two roll buttons and the goto
to 245. Driving the roll (stubbed 2d = 12) does **not** throw. It also documented a
real defect the end-to-end render surfaced that the synthetic ticks could not: the
weapon-enchant cycle never lands — see **task 88**. The test asserts the current
(unchanged-weapon) behaviour with a comment to update part (c) once 88 is fixed.
Test-only (no new stamp). Suite green: `RESULT ALL PASS pass=778 fail=0`.

---

## 87. Fight widget "Your Combat" omits the per-fight attack bonus  — LOW (render)

*(Filed 2026-07-11 from task 80.)* `drawFight`'s "you" line shows
`Your Combat ${state.ability('combat')}` but combat resolution adds
`state.fightAttackBonus()` (the `special="attack"` per-fight bonus — task 49; e.g.
book1/42's rat poison +3). Task 80 made the sibling Defence display accurate
(`state.defence() + state.fightDefenceBonus()`) but left Combat showing only the base,
so a player with an attack bonus sees a "Your Combat" value lower than what their rolls
actually use. Cosmetic — the resolution already uses the bonus (`playerCombat` in
`combat.js`). For parity, show `Your Combat ${state.ability('combat') + state.fightAttackBonus()}`
in both `drawFight` and `drawGroupFight`. Add/extend a DOM assertion that the displayed
Combat reflects a `special="attack"` bonus. Web-only; stamp and re-run all sections.

**Done (2026-07-11).** Both `drawFight` and `drawGroupFight` (`render.js`) now show
`Your Combat ${state.ability('combat') + state.fightAttackBonus()}` (single-fight
via a `shownCombat` local mirroring the existing `shownDef`), so the displayed
Combat matches `playerCombat` in `combat.js`. Added 3 headless assertions
(`_test.html`): a `<tick special="attack" bonus="3">` before a single `<fight>`
sets the bonus on entry and the widget's `.you` line shows base + 3; the group-fight
widget likewise shows base + 2. Web-only — stamped `26.07.11.4781047`. Suite green:
`RESULT ALL PASS pass=773 fail=0`.

---

## 88. book5/386: the hidden `removetag="Tz"` cleanup fires on entry, defeating the enchant roll  — LOW (render/engine)

*(Filed 2026-07-11 from task 86's end-to-end render.)* §5.386 (Targdaz the
weaponsmith) is meant to: tag one weapon (`<tick weapon="?" addtag="Tz">`), roll 2d
against its current bonus, and on the roll's success/`<outcomes>` branches raise,
lower or destroy **that tagged weapon** — then a final hidden
`<tick weapon="?" tags="Tz" removetag="Tz" hidden="t"/>` cleans up the tag. In the
single-pass render every passive/hidden effect applies **on entry**, so the cleanup
`removetag="Tz"` runs immediately after the `addtag`, stripping the tag *before* the
interactive roll resolves. When the roll's `addbonus="1"` (success) and the
`<outcomes>` `addbonus="-1"` / `<lose weapon>` (destroy) ticks later fire, their
`weapon="?" tags="Tz"` selector matches **no** weapon, so nothing happens — the
weapon never changes no matter what is rolled (verified end-to-end: a +2 weapon stays
+2 on a roll of 12 *and* on a roll of 2, and is never destroyed). The `<set var="bonus">`
and the bonus ≥ 6 Shard refund still work (they run before the strip / don't depend on
the tag). A secondary quirk seen in the same render: the roll buttons still show for a
bonus-6 weapon even though `<if var="bonus" lessthan="6">` should hide them (the roll
does nothing regardless). Fix: defer the hidden cleanup `removetag` until the section
is actually left (or until after the roll/outcomes resolve) so the tagged weapon
survives long enough for its own outcome ticks — likely a shared mechanism for
"end-of-section cleanup" hidden ticks. Related single-pass ordering limitations:
task 20 (lock/unlock bracket), task 61 (rerunnable `<set>` clobbers a roll var).
Then update `_test.html`'s §5.386 part (c) to expect the enchant/outcome to land.

**Done 2026-07-13.** A hidden `<tick removetag="X">` is now recognised as an
end-of-section tag cleanup (`isDeferredTagCleanup` in render.js) and **deferred to
the section exit** rather than applied on entry: `renderPassive` records it in
`this.deferredCleanups` (reset per visit), and the `navigate` wrapper (the single
"leaving" hook, alongside `todock=`) applies each recorded cleanup once on the way
out. So Tz stays on the chosen weapon for the whole visit — the `<if var="x"
greaterthan="bonus">` +1, the `<outcomes>` −1/`<lose weapon>` destroy all now match
it — and the tag is stripped exactly once when the player leaves, never leaking onto
the weapon for a later re-visit. §5.386 test rewritten: (c) a low roll (2-6) now
destroys the tagged weapon; (d) a high roll raises then the 7-12 outcome lowers
(net unchanged), the Tz tag survives mid-visit, and leaving via →245 strips it. The
secondary quirk (roll widgets shown grayed/disabled for a bonus-6 weapon under the
inactive `<if var="bonus" lessthan="6">`) is left as-is — it is the app's standard
inactive-branch rendering and does nothing. Suite green: `RESULT ALL PASS pass=966
fail=0`.

---

## 89. Ship actions still use remote vessels, and `<choice sail>` does not sail one  — HIGH (state/engine/market/render)

*(Filed 2026-07-12 from a full repository review.)* Tasks 73 and 81 added dock
state and made `<goto sail="t">` choose a local vessel, but the same invariant is
not applied consistently. All 29 live `<choice sail="t">` links go through
`renderChoice`, which neither requires a ship at the current dock nor calls
`sailThenGo`; a player can therefore leave port without a ship and a real ship is
not marked as the voyage's `sailingShipId`. `GameState.currentShip()` also falls
back to `ships[0]`, while `shipsHere()` treats `location === null` as matching every
at-large ship. As a result, inland/sea sections can act on an unrelated vessel.
The same leak appears in `market.js` (cargo buy/sell falls back from a local ship
to any ship; ship sales and inline cargo sales search all ships) and in
`evaluateCondition` (`ship`, `crew` and `cargo` search all owned ships, and the
`cargo` test ignores the requested cargo name). This changes rules, not just UI:
e.g. §1.586's storm dice can follow the type of a ship left elsewhere instead of
the one being sailed.

Define one current-vessel rule: at a dock use a vessel berthed there; during a
voyage use `sailingShipId`; inland with no explicit dock/current voyage has no
current vessel. Route ship/crew/cargo conditions, adjustments, inline actions and
market transactions through it, while preserving explicit `docked=` checks for
other ports. Make `<choice sail>` use the same gate/chooser/action as `<goto
sail>`. Add headless coverage with two ships at different docks and at sea:
remote cargo cannot be bought/sold, remote crew/cargo/type cannot satisfy a local
condition, the named cargo must match, the sailed ship drives §1.586, and both
choice/goto sailing set and later berth only that ship. Stamp and run all sections.

**Done (2026-07-12).** One rule, in `state.currentShip()`: at a dock → the first
vessel *berthed there* or **null** (the `ships[0]` fallback is gone); away from a
dock → the sailed ship (`sailingShipId`), else the first at-large ship (JaFL's
at-sea default — covers §4.658's replacement bought after a wreck and pre-pointer
saves), else null. `shipsHere()` keeps its JaFL shape (at a dock = berthed here;
at sea = the at-large flotilla, which §4.114's chooser needs) — the leak was the
*fallbacks*, not the flotilla. `arriveAtDock` now tolerates a stale voyage pointer
(sailed ship wrecked mid-voyage) by berthing all at-large ships. Routed through
the rule: `<if ship|crew|cargo>` (with `cargo` now matching the **named**
commodity, JaFL `Ship.hasCargo`; also added `cargo` to `KNOWN_IF_ATTRS` — it
warned as unrecognized), `<adjust ship|crew>`, `<tick crew|cargo>` (a recognized
attr with no vessel is inert, no box-tick fallthrough), and in `market.js` the
cargo buy/sell, ship sale, `ownsGoods` and inline `sellCargo` all scope to
`shipsHere()` — no any-owned-ship fallback. `<choice sail="t">` (29 live) now
gates on a ship here ("you need a ship here") and routes through the same
`sailThenGo` chooser/action as `<goto sail>`, so a real vessel is set at large,
`todock=` exemption applies, and landfall berths only it. Explicit `<if docked=>`
checks other ports as before.

Found while testing: **prose between branches broke the if/elseif/else chain** —
`appendChildren` reset the chain on any non-whitespace text, so §1.586's
"`</if>, <elseif>…, or <else>`" idiom re-armed the `<else>` after a *matched*
`<if>`, offering the barque's 1-die storm roll AND the galleon's 3-dice roll at
once (day-one bug, invisible to the shipless smoke scan). JaFL binds each
elseif/else to the nearest preceding if regardless of interleaved text; the
reset is removed (elements still break the chain). Also filed **task 103**
(§4.658 `initialCrew="oldcrew"` resets the salvaged crew to average).

Tests: +27 assertions (block-scoped) — two-dock isolation (conditions, market
buy/sell, ship sale, inline sellCargo), local-hold-full refusal, inland
no-vessel, named-cargo match, voyage-vs-prize pointer, §4.658 wreck→replacement→
landfall, DOM §1.586 both directions (sailed galleon rolls 3 dice; sailed poor
barque rolls 1 die and the remote excellent crew adds no bonus), DOM §2.33
choice-sail gate/sail/berth-only-that-ship, and a two-ship choice-sail chooser.
§3.405's setup modernised (the ship is mid-voyage there, not berthed at a third
port). Web-only — stamped `26.07.12.d70c943`. Suite green:
`RESULT ALL PASS pass=812 fail=0`.

---

## 90. Permanent Safety from Storms is deleted by storm-avoidance `<lose blessing>` nodes  — MEDIUM (engine/state)

*(Filed 2026-07-12 from a full repository review.)* Task 76 preserves a permanent
blessing only when callers use `state.useBlessing()`. `applyLose`, however, sends
every named `<lose blessing="…">` to `removeBlessing()`, which also deletes its
`permanentBlessings` marker. The live storm-avoidance paths (including
§5.232/502/716 and §6.160) use `<lose blessing="storm">`, so the permanent Safety
from Storms granted by §6.159 is consumed the first time it protects the player,
contrary to “you can use it any number of times” / “never used up”. Treat a named
blessing spent for its benefit as a use (permanent survives), while the explicitly
punitive `<lose blessing="*">` must still clear everything. Add a direct state
test plus an end-to-end permanent-storm path; retain coverage that an ordinary
Storms blessing is consumed. Web-only; stamp and run all sections.

**Done (2026-07-12).** `applyLose` (engine.js) now routes a NAMED
`<lose blessing="…">` through `state.useBlessing()` — a corpus audit confirmed
all 70 named nodes (storm/storms/disease/poison) are the blessing being spent
for its protection, so a permanent one survives ("never used up") and an
ordinary one is crossed off as before. The punitive forms are unchanged: `"*"`
(`removeAllBlessings`) and the `"?"` robbery pick still remove even a permanent
blessing. Tests: +7 — direct state (permanent survives the named spend incl.
the "storms" alias; `"*"` clears it; ordinary consumed) and end-to-end §1.586
(a permanent blessing protects through two consecutive storms with the →85
branch live; an ordinary one is used up by the first). Web-only — stamped
`26.07.12.f3b1db2`. Suite green: `RESULT ALL PASS pass=836 fail=0`.

---

## 91. COMBAT blessing cannot reroll an attack, and Defence blessing leaks between fights  — MEDIUM (combat/render/state)

*(Filed 2026-07-12 from a full repository review.)* Ability/training/random roll
widgets expose task 76's blessing reroll control, but combat attacks are resolved
inside `fightRound()` and never offer the COMBAT blessing described in §4.324
(“try again when you fail a COMBAT roll”). Separately,
`useDefenceBlessing(state, fight)` marks one fight as used but writes +3 to the
section-global `_fightBonus.defence`; if a section contains sequential fights,
later enemies inherit a blessing promised for “THIS fight only”. Make failed
player strikes rerollable exactly once through the COMBAT blessing without
duplicating the enemy turn or damage, and store the Defence blessing bonus on the
relevant fight/encounter (a simultaneous group remains one encounter), not the
whole section. Test failed/successful attack behaviour, permanent versus ordinary
COMBAT blessings, sequential fights, and group combat. Stamp and run all sections.

**Done (2026-07-12).** Two changes, both headless in `combat.js`:
- **COMBAT retry** — `playerStrike` flags a miss (`fight.lastStrikeMissed`); a new
  exported `rerollAttack(state, fight)` retries that strike once per round
  (`fight.attackRerolled`, both flags reset at the top of `fightRound`/
  `groupFightRound`) with NO repeated enemy reply, consuming the blessing via
  `useBlessing('combat')` (a permanent one survives and re-arms next round). The
  fight widgets offer "Use COMBAT blessing (retry your attack)" after a miss —
  in a group, against the foe that was missed.
- **Defence scoping** — `useDefenceBlessing` now stores the +3 on the fight
  itself (`fight.defenceBonus`, read by `playerDefenceFor` and the widget
  display) instead of the section-global `_fightBonus`, so sequential fights in
  one section no longer inherit a blessing promised for "THIS fight only". A
  simultaneous group stays one encounter: the view passes the members, each
  carries the bonus, and the members' stored bonus doubles as the durable
  once-per-combat guard (the group proxy is rebuilt every rerender).
  `<tick special="defence">` bonuses keep the per-section store (task 49) —
  unchanged.

Tests: +12 and three §80/§83 assertions updated to the per-fight model (the
global store now asserted UNtouched) — miss→retry (enemy stamina falls, the
player's does not, blessing spent), no second retry per round, a hit is not
retryable, a permanent blessing re-arms across rounds, +3 lands on the blessed
fight only (a same-section second fight takes the unblocked blow), and DOM
single + group retry flows. Web-only — stamped `26.07.12.e91b370`. Suite green:
`RESULT ALL PASS pass=848 fail=0`.

---

## 92. Eight live `<adjust>` variants are ignored or applied unconditionally  — MEDIUM (engine/books)

*(Filed 2026-07-12 from a full repository review.)* `adjustAmount()` understands
only `value`/`amount`, core abilities, rank/stamina and named counters;
`adjustApplies()` understands only god/profession/item/codeword/crew/ship. The
remaining live forms therefore produce wrong difficulties:

- §5.343/432 `titleVal="bokh" default="-1"` adds 0 instead of the title value or
  default;
- §4.411 and §5.527 rank `greaterthan=` bonuses apply unconditionally (and
  §4.411's `profession="1"` contradicts its Warrior prose and needs an XML fix);
- §4.63's `title="Nightstalker"` bonus applies to everyone;
- §5.79 `modifier="noweapon"` includes the weapon bonus, while §2.579
  `modifier="natural"` uses the effective rather than natural Stamina value;
- §6.736 `item="?" tags="light"` looks for a literal item named `?`, so its +2
  never applies.

Implement the attributes according to `JaFL-XML-Tags.html`, normalize the §4.411
source typo, and add focused calculation tests plus integration renders for these
eight nodes. Rebuild generated data, stamp, and run all sections.

**Done (2026-07-12).** Both halves implemented per the spec (engine.js):
- **`adjustAmount`** — `titleVal="T" [default="N"]` adds the title's stored value
  (bokh circles of mastery) or the default when unheld; `ability=` now honours
  `modifier=`: the six abilities resolve through `abilityForMode` (noweapon/
  notool/natural — §5.79's unarmed COMBAT), and `stamina` distinguishes
  `natural` (the written unwounded score — §2.579's reset) and `current` (the
  wounded value) from the default effective max.
- **`adjustApplies`** — `greaterthan=`/`lessthan=` turn the `ability=`/`name=`
  VALUE into the condition, with the contribution coming from `value=` (§4.411
  Rank > 3, §5.527 Rank > 5 — previously unconditional); `title=` is a has-title
  gate (§4.63 Nightstalker — previously everyone); `item="?" [tags=…]` routes
  through `hasItemMatch` (§6.736's any-light-source +2 — previously a literal
  item named "?"), name lists keep the exact match.
- **§4.411 source** — `profession="1"` normalized to `profession="Warrior"`
  (matching its prose); data rebuilt under pwsh 7 (book4.json + meta only).

Tests: +18 — unit (titleVal held/default, rank greaterthan/lessthan both ways,
title gate, noweapon vs full score with a +2 weapon, stamina natural=20 vs
current=5 vs effective=22 under a +2 aura) and integration on the shipped nodes
(§6.736 with/without a light source, §4.411 Warrior/Rank 5/good crew = +3 vs
Rogue/Rank 1/poor crew = −1, §5.343 bokh −1/+3, §5.527 galleon/excellent/Rank 6
= +3). Stamped `26.07.12.6aa9e84`. Suite green: `RESULT ALL PASS pass=866
fail=0`.

---

## 93. Item group provenance and rolled `itemAt=` losses are not represented  — MEDIUM (state/engine/render/books)

*(Filed 2026-07-12 from a full repository review.)* Awarded possessions discard
their XML `group=`, and item conditions/losses ignore that selector. Thus
§5.118's `<if item="?" group="5.238" greaterthan="1">` counts unrelated carried
items, §3.132/413 can consume the wrong same-named treasure map, and §5.578's
required donation can remove an unrelated possession instead of one of that
mission's three rewards. The two rolled `<lose itemAt="x">` nodes (§6.63/168) are
also unsupported; because `itemAt` is absent from the pending-variable check they
can memoize a no-op before the roll resolves. Finally §5.14 has the lone source
typo `<lose items="*" shards="*">`, so its total confiscation leaves every item.

Persist award provenance, honor `group=` in possession count/selection/removal,
defer `itemAt` until its variable exists and remove the one-based Adventure Sheet
entry, and normalize §5.14 to the supported singular attribute. Add tests for
same-named items from different groups, group-restricted `?` choice/removal,
rolled indices including out-of-range values, and §5.14. Rebuild, stamp, and run
all sections.

**Done (2026-07-13).** Awarded possessions now carry their XML `group=`:
`makeItem()` gained a `group` field (state.js), threaded from both award sites in
`render.js` (`renderItemAward`, `grantChoosableReward`) and preserved by
`sanitizeItem()` across save/load. `matchItemQuery(items, pattern, tags, group)`
applies a final group filter to *both* the `?`/blank and concrete-name branches;
`applyLose` group-filters its item candidates the same way, and `evaluateCondition`'s
item path passes `group=` through. So §5.118's `<if item="?" group="5.238"
greaterthan="1">` counts only the §5.238 tomb haul, §3.132's `<lose>` crosses off
just the §3.94 map (not a same-named map from elsewhere), and §5.578's donation is
drawn from that mission's three rewards. Rolled `<lose itemAt="x">` (§6.63/168) is
a new `applyLose` branch that removes the 1-based sheet entry at the rolled index
(out-of-range → no-op, per §6.168 "the compass without losing anything"); `itemAt`
was added to `pendingRollVar`'s QTY list so the loss defers until the `<random
var="x">` rolls instead of memoizing a no-op with x=0. §5.14's lone source typo
`<lose items="*" shards="*">` was normalized to the supported singular `item="*"`.

Tests: +19 (block-scoped) — group round-trips through `makeItem`/`sanitizeData`;
the §5.118 count is group-scoped (1 vs 2 group items, 2 unrelated ignored);
same-named §3.94 vs other-island maps don't collide on `<if>` or `<lose>`; §5.578
donation removes one of three group items (chooser offered only those three, and
the no-chooser default) while the unrelated heirloom survives; `itemAt` removes the
x-th entry and no-ops out of range; §6.63 renders inert until the die rolls then
forfeits exactly one possession; §5.14 source uses singular `item="*"` and the
botched teleport empties both possessions and cash. Rebuilt (book5.json +1 line),
stamped `26.07.13.08a83f4`. Suite green: `RESULT ALL PASS pass=886 fail=0`.

---

## 94. `quantity=` is ignored on rewards, cargo ticks and market stock  — MEDIUM (engine/market/render)

*(Filed 2026-07-12 from a full repository review.)* Quantity caps exist for
inline `<buy>`, but `renderItemAward` grants only one possession and memoizes it
even on the 14 live item/weapon/armour awards with `quantity=`. This includes
variable rewards such as §1.561's `x` fish and §4.425's `x` lots of 1000 Shards,
which currently award only one. §3.569's `<tick cargo="textiles" quantity="2">`
loads one unit, and §6.655's one available barque can be purchased repeatedly
because `<trade quantity="1">` does not cap stock.

Resolve numeric/variable quantities consistently: award or load the requested
number subject to carry/cargo capacity, keep uncollected units available where
the player must choose capacity, and enforce trade stock per visit. Test fixed
and rolled item quantities, quantity currency items, partial capacity, two cargo
units, and a one-ship market row. Stamp and run all sections.

**Done (2026-07-13).** `renderItemAward` (render.js) now honours `quantity=` as a
per-visit countdown: each click takes ONE unit (tallied in a new `ctx.awardCounts`
keyed by path) up to the resolved quantity, so a possession award can be picked up
partially when the 12-item cap bites and the rest stay available (§6.257 twelve
nuggets, §3.16/339 three swords, §6.375 two axes). A rolled quantity (§1.561 x
fish, §4.425 x·1000 Shards) waits for its `<random var>` — `quantity` was added to
`pendingRollVar`'s QTY list, and the award renders a disabled "Roll first" button
until the die resolves, rather than granting x=0 and memoising it. Currency awards
(§4.425) bank their value per click with no slot cost; the choose-one grant path
(`grantChoosableReward`) honours quantity too (§4.634's two-ink-sac barter option).
`<tick cargo>` (engine.js) loads `quantity=` units onto the current vessel, capped
by hold capacity — §3.569 loads 2 textiles, and a full hold refuses the overflow
(imported `SHIP_TYPES` for the capacity). `renderShopRow` (render.js) enforces a
per-visit stock cap via a new `ctx.stock` tally: §6.655's lone salvaged barque
sells once then shows "Sold out" instead of being re-buyable. (Inline `<buy
quantity=>` caps were already handled by task 23's `ctx.buys`.)

Tests: +19 (block-scoped) — §6.375 two-axe countdown (one/two taken, then closed);
partial capacity (1 free slot takes 1 axe, holds the 2nd, re-arms when a slot frees);
§1.561 fish award disabled pre-roll then live for exactly x units; §4.425 gold lots
bank x·1000 Shards using no slots; `<tick cargo quantity=2>` loads 2 on a brigantine
and 1 on a barque (cap); §6.655 barque bought once then sold out. Web-only; stamped
`26.07.13.c6bb64c`. Suite green: `RESULT ALL PASS pass=905 fail=0`.

---

## 95. Item `replace=` rewards add a duplicate instead of transforming the possession  — MEDIUM (state/render)

*(Filed 2026-07-12 from a full repository review.)* All five live replacement
awards are rendered as ordinary additions. §5.118 therefore leaves the bag of
gold/plain silver flute/plain black axe in inventory while adding their converted
forms; §6.207 leaves the old royal sceptre; and §6.448a leaves the cursed sword.
The conversion can also be refused at the 12-item cap even though it should not
consume an extra slot. Implement JaFL `replace=` atomically: a named value replaces
that matching possession, while empty `replace=""` replaces the same-named item,
preserving the new node's kind/bonus/ability/tags and not changing slot count.
Disable/refuse only when the required source item is absent, and make the action
visit-safe. Add coverage for all three shapes above and a full-inventory case.
Stamp and run all sections.

**Done (2026-07-13).** `renderItemAward` (render.js) now detects `replace=` and hands
off to a new `renderReplaceAward`, which transforms the matching possession in place
rather than adding a duplicate. The target is the named `replace="X"` or, for empty
`replace=""`, the reward's own name (the same-named item is upgraded). On click the
old possession is removed and the new one added — or, for a "N Shards" reward
(§5.118 bag of gold → 2000 Shards), its value banked — so the slot count never rises
and the 12-item carry cap can't refuse the conversion. The row is disabled while the
source item is absent (you cannot transform what you do not hold), and is memoised
(`ctx.applied`) so a re-render never re-transforms. The transformed item keeps its
provenance group (the reward's own, else the source's) so §5.118's group-scoped
count stays stable across the swap. Covers §5.118 (flute/axe `replace=""`, bag of
gold → currency), §6.207 (sceptre → +5 tool), §6.448a (cursed −2 sword → clean +2 —
removing the −2 blade is itself the curse lift, per §6.677's forced weapon).

Tests: +12 (block-scoped) — §5.118 all three transforms (in-place, no duplicate,
slot count steady, currency banked and a slot freed, rows checked-off after);
§6.207 same-name sceptre upgrade; §6.448a cursed→clean sword; a full (12-item)
inventory still allowing the net-zero replace; and a source-absent row disabled.
Web-only; stamped `26.07.13.1f6b585`. Suite green: `RESULT ALL PASS pass=917 fail=0`.

---

## 96. Hidden item rewards inside `<group>` choices are never granted  — MEDIUM (render)

*(Filed 2026-07-12 from a full repository review.)* The group-choice effect
collector applies `lose`, `tick`, `gain`, `set`, `curse`, `rest` and `goto`, but
not the item family. Consequently the hidden quest rewards in §1.228 and §1.509
(`gold chain mail of Tyrnai`) and §4.189 (`mirror of the Sun Goddess`) record the
group choice/codeword but never enter inventory. Extend group resolution so hidden
`item`/`weapon`/`armour`/`tool` rewards use the normal award transaction exactly
once, including capacity handling, without showing a second independent Take
button. Add end-to-end tests for these three choices. Stamp and run all sections.

**Done (2026-07-13).** `renderGroup` (render.js) now collects the group's
`item/weapon/armour/tool` children alongside its `lose/tick/gain/set/curse/rest`
effects, and grants them on the group-action click through a new headless
`grantItemNode` helper (mirrors `renderItemAward`'s grant minus the widget): a "N
Shards" reward banks its value, a possession is added when a slot is free (12-item
cap), and any `<curse>/<disease>/<poison>` child bites on pickup. Because the group
collapses to a single button, the hidden reward never renders its own Take button,
so there is no double-grant. A corpus check confirmed the only item-family-in-group
cases are exactly the three hidden quest prizes (§1.228/509 gold chain mail of
Tyrnai, §4.189 mirror of the Sun Goddess), so the change is surgical. The
roll-bundled group variant (`renderGroupWithRoll`) needs no change — none of these
sit inside a rolled group.

Tests: +10 (block-scoped) — for each of §1.228/509/189: the group action renders,
the reward is ungranted until clicked, there is no separate Take button, and the
click grants the item exactly once and sets the quest codeword; plus a full-pack
case proving the 12-item cap is respected (no 13th item) while the codeword still
records. Web-only; stamped `26.07.13.f82fedd`. Suite green: `RESULT ALL PASS
pass=927 fail=0`.

---

## 97. Molhern's `itemcache` ignores its `<include>` / `<exclude>` filters  — LOW (render/state)

*(Filed 2026-07-12 from a full repository review.)* §2.617 is the only filtered
item cache: it should store one weapon or suit of armour for the smith, excluding
already `Molherned` equipment and items at bonus 6+, before §2.665 returns it.
`renderItemCache` currently offers every possession and ignores both include and
exclude children, so ordinary items, already-worked equipment and maxed equipment
can all enter the flow. Apply the declared type/tag/bonus filters to the eligible
list while preserving `itemlimit="1"` and the existing return path. Add a focused
DOM/state test with eligible and rejected possessions. Stamp and run all sections.

**Done 2026-07-13.** `renderItemCache`'s deposit list now honours the cache's
`<include>`/`<exclude>` children (JaFL `Node.modifyItemMatches`): with includes
present it starts each item out and lets includes add, then excludes remove — later
filters win, per document order. An eligible possession gets an enabled *Store*
button; a *candidate* of the right kind that an exclude rejects shows a **disabled**
button titled with that filter's `reason=` ("Molhern has already worked on this
item!", "This item is good enough already!"); an item that matches no include at all
(an ordinary item) is not offered. `itemlimit="1"` and the §2.665 return path are
unchanged. The kind/tag/bonus matching is a new DOM-free `engine.filterMatches(pool,
el)`, factored out of the existing `<set>`-selector matcher (`matchesSelectorPool`)
so both share one implementation. Focused DOM/state test on §2.617 covers an
eligible weapon + armour, a Molherned and a bonus-6 rejection (each with its reason),
a hidden ordinary item, and storing one weapon hitting the itemlimit. Suite green:
`RESULT ALL PASS pass=972 fail=0`.

---

## 98. Resurrection arrangements ignore replacement, supplemental and hidden semantics  — MEDIUM (state/render)

*(Filed 2026-07-12 from a full repository review.)* Every Arrange click blindly
pushes another entry. Ordinary arrangements should replace the prior ordinary
deal, while §6.355's `supplemental="t"` arrangement should append; the attribute is
currently ignored. The same offer can be clicked repeatedly, buying duplicate
lives, and §1.616's `hidden="t"` resurrection is rendered as a manual offer rather
than registered automatically by its death flow. Implement standard-versus-
supplemental replacement, once-per-visit purchase/registration and hidden auto-
registration, with costs/effects applied exactly once. Verify revival consumes
the intended arrangement and leaves valid supplemental deals in order. Stamp and
run all sections.

**Done (2026-07-13).** Semantics taken from the original engine
(`java-engine/flands/ResurrectionNode.java` + `Adventurer.addResurrection`, reference
only): a resurrection with `book`+`section` ARRANGES a deal; one with no section is a
"use your deal" trigger. `GameState.addResurrection` (state.js) now replaces any
existing *standard* deal when a new standard one is arranged, while a
`supplemental="t"` boon (§6.355) is appended and never displaces the standard — so at
most one standard deal coexists with any number of supplementals. The `supplemental`
flag is threaded through `buyResurrectionDeal` (engine.js) and persisted by
`sanitizeData`. `renderResurrection` (render.js): a visible arrange offer is armed
once per visit (memoised `res@path`, button becomes "☑ Resurrection arranged") so it
can't be re-clicked to stockpile duplicate lives; a `hidden="t"` offer with a section
(§3.351 Island of Rebirth) auto-registers on entry exactly once with no button; a
no-section resurrection is left as narrative prose. The five death-revival groups
(§3.123/560/6.140/1.680 erase-all, §1.616 lose-ship) — a `<group>` bundling a
no-section `<resurrection/>` with the price of return — now, on the group action,
apply the losses, consume the earliest deal (`reviveWithResurrection` → half max
Stamina) and turn to that deal's own section, instead of ignoring the resurrection
child and stranding the erased player. The choose-one grant path also passes
`supplemental`.

Tests: +15 (block-scoped) — standard-replaces-standard, supplemental-appends, a
further standard replacing only the standard while keeping the supplemental, revival
consuming the earliest and leaving the rest ordered, and a save round-trip of the
supplemental flag; §4.428 arrange armed once (spent button, no duplicate lives);
§3.351 hidden auto-registration on entry with no button and re-entry keeping exactly
one; and the §3.123 revival group erasing possessions/money/ship, consuming the deal,
reviving at half Stamina and navigating to the deal's section. Web-only; stamped
`26.07.13.6da614c`. Suite green: `RESULT ALL PASS pass=942 fail=0`.

---

## 99. `<fightround>` effects are detached manual widgets instead of combat-round rules  — HIGH (combat/engine/render)

*(Filed 2026-07-12 from a full repository review; split from task 32's explicit
passthrough list.)* The three live `<fightround>` sections (§5.24/383/689) attach
rolls and conditional effects to each exchange of a fight. The generic recursive
renderer instead exposes their children as independent widgets, so the player can
skip, repeat or resolve them at the wrong point; combat outcomes and potentially
lethal Stamina changes diverge from the book. Parse these nodes into the DOM-free
combat model and execute their body at the specified phase of every completed
round, exactly once per round, with variables/branches resolved in that round's
context. Add deterministic headless tests for all three sections plus a render
test proving there is no detached manual roll. Stamp and run all sections.

**Done (2026-07-12).** `applyEffectBody` (engine.js) grew into a full round-body
executor: it now honours `<success>/<failure>` branches — matched by their `var=`
(the margin an earlier roll stored; an unwritten var fires nothing, task 50's
rule) or by the walk's last roll — and a `<goto>` ends the walk and is *returned*
(`{goto}`) for the caller to navigate; rolls and effect notes stream into a
supplied log. `combat.fightRound(state, fight, dmgNode, roundNode)` executes the
section's `<fightround>` exactly once per round — `pre="t"` before the exchange
(§5.24's choking, which can kill before a blow lands), else after it, and only
while the fight is undecided — recording any `fight.roundGoto`. The view
(render.js) finds the node like `<fightdamage>`, renders it **inert** (prose, no
live widgets — `renderInert` replaces `renderChildrenOnly`), threads it through
`drawFight`/redraws, and follows `roundGoto` (single and group fights).

Two adjacent live bugs fixed by the same walker upgrade: **§5.489/565/631's
per-wound SANCTITY save** — the old walker descended into `<failure>`
unconditionally, so the Avenger's Bite curse landed on *every* wound regardless
of the roll (now gated); and **§4.238's "if you get wounded, →184"** — the
`<fightdamage>` goto was inert (now redirects the fight).

Tests: +17 (block-scoped) — §5.24 pre-round choke (margin damage, `hang` var,
log line, successful-save no-damage), §5.383 post-round save (after the
exchange; skipped once the demon falls), §5.689 failed save records →7 with the
armour penalty applied, §5.489 curse gated both ways, §4.238 wound redirect, and
DOM: both §5.24/§5.689 fightrounds render inert (no detached/enabled roll), the
§5.24 Attack applies the round rule through the widget with the save in the
fight log, §5.689's Attack navigates to §7. Web-only — stamped
`26.07.12.a2cabcb`. Suite green: `RESULT ALL PASS pass=829 fail=0`.

---

## 100. The two live `<while>` loops execute only one rendered pass  — MEDIUM (engine/render)

*(Filed 2026-07-12 from a full repository review; split from task 32's explicit
passthrough list.)* §5.218 and §6.700 rely on `<while>` to repeat their rules until
the encoded condition changes. The default recursive renderer walks the body once,
so repeated damage/roll/escape logic can stop early. Implement loop evaluation in
the DOM-free engine, advancing effects in order and re-evaluating the condition
after each iteration; interactive rolls must resume the loop rather than creating
all iterations at render time. Add deterministic termination tests for both live
sections and an iteration guard that reports malformed non-progressing content
instead of freezing the page. Stamp and run all sections.

**Done 2026-07-13.** `renderWhile` (render.js) walks one iteration per completed
pass plus the current live one, each under its own `~i` path namespace so its
roll/effects/branches memoise independently; `activeRoll` is reset per pass so a
shared `<success>/<failure>` binds to that pass's roll. A pass advances only when
its interactive roll resolves (the roll renderers set `whileIterPending`), and a
resolved `<random>` re-asserts its var each render (`state.restoreVar`) so §6.700's
per-iteration `<lose stamina="x">`/`<if var="x" equals="6">` read *that* six even
after the live value moves on; `pendingRollVar` treats a var re-rolled this pass as
stale (via `whileIterPendingVars`). The terminal test is the DOM-free
`engine.whileLoopDone` (loop until the var is *assigned*, per JaFL WhileNode). A
live, unterminated loop sets `this.blocked` (JaFL holds execution until the loop
ends — §5.218 hides the troll fight until you wriggle free; §6.700 hides the →529
exit until the six-damage stops), and a 100-iteration guard `console.warn`s and
aborts a non-progressing body. Variables are now cleared on section entry
(`state.clearVars`) so the loop var starts undefined (JaFL vars are section-local).
Headless end-to-end tests drive both sections deterministically (§5.218 via a
cursed/boosted COMBAT ability, §6.700 via forcing seeds 4→6 and 7→1). Suite green:
`RESULT ALL PASS pass=963 fail=0`.

---

## 101. §5.114's `<sectionview>` oracle cannot display its referenced section  — LOW (render)

*(Filed 2026-07-12 from a full repository review; split from task 32's explicit
passthrough list.)* The lone `<sectionview>` is currently reduced to its child
text, so the oracle feature in §5.114 cannot show the requested section while
keeping the player in place. Implement a read-only section preview that resolves
the requested book/section, renders its prose in an isolated view, and cannot
apply effects, mutate navigation/history, expose interactive controls or change
the current visit. Add a DOM test confirming both preview content and zero state
mutation. Stamp and run all sections.

**Done 2026-07-14.** `renderSectionview` (render.js) renders the tag's inner words
as a `.sectionview-link` (text taken via `textContent`, never `appendChildren`, so
its own body applies nothing) that opens `openSectionView` — an isolated popup
(built directly, not via `modal()`, which closes on any button) revealing one random
section's prose at a time, up to the `random=` count, then a Close. Section prose is
rendered by a new exported `previewProse(el)` that walks the parsed element keeping
only paragraphs and inline emphasis (`<b>/<i>/<u>`) and recurses every other tag for
its words alone — mirroring `app.renderStatic` but kept in the view layer (no
app-shell import cycle) and operating on the shared cached parse without mutating it.
The oracle touches no game state: it reads no `state`, calls `getSection`/`loadBook`
(data layer) and `bookTitle` only, arms no controls, and never navigates or changes
the current visit. DOM test on §5.114: the link renders; `previewProse` shows the
section prose ("priestess") with `<p>`s and zero controls; opening the oracle yields
an isolated popup (caption + prose, no controls) while the player's section,
navigation and full state JSON are unchanged. Suite green: `RESULT ALL PASS pass=979
fail=0`.

---

## 102. §1.338's standalone `<price>` does not charge for or complete the poison cure  — LOW (books/render)

*(Filed 2026-07-12 from a full repository review.)* This is the only `<price>`
element in the six books and it has no renderer/effect handler; generic recursion
shows its text but never arms a payment, deducts Shards or activates the linked
flagged cure. The healer therefore cannot complete the advertised transaction.
Check the source against the JaFL tag reference and normalize §1.338 to the
project's supported payment/flag nodes (prefer an XML correction over a one-off
view rule if `<price>` is invalid legacy markup). Add an end-to-end test for
insufficient funds, one successful 25-Shard payment and poison removal exactly
once. Rebuild, stamp, and run all sections.

**Done 2026-07-14.** `<price>` is legacy JaFL markup — `PriceNode.java`'s own
comment says `LoseNode` (a `<lose>` with a `price=` attribute) "handles pretty much
everything… so this class can be removed". So this was an XML correction, not a new
view rule: §1.338's `<price shards="25" flag="p">25 Shards</price>` became `<lose
price="p" shards="25">25 Shards</lose>` — the project's standard paid-purchase cost
form (65 such nodes in the corpus), armed by the existing `renderOptionalPay`. The
linked `<lose poison="?" flag="p">` cure was previously applying **free on entry**
(its `flag=` reward branch only defers when a `[price="k"]` **attribute** node
exists, and the old `<price>` was a tag, not an attribute); now the cost node
carries `price="p"`, so the cure is correctly deferred and applied only on payment.
End-to-end test: with < 25 Shards the Pay button is disabled ("Not enough Shards")
and nothing happens on entry; paying deducts exactly 25, cures the poison and
restores the ability; the button then locks so the cure can't be bought twice. Data
rebuilt with pwsh 7 (only book1.json's §338 line changed). Suite green: `RESULT ALL
PASS pass=986 fail=0`.

---

## 103. §4.658: `initialCrew="oldcrew"` ignores the `oldcrew` variable — the salvaged barque's crew resets to average  — LOW (market)

*(Filed 2026-07-12 while implementing task 89.)* §4.658 (the Disaster Bay wreck)
stores the lost ship's crew with `<set var="oldcrew" value="crew"/>` — the `crew`
expression keyword yields a 1-based `CREW_LEVELS` index — and then buys the
replacement with `<buy ship="barque" initialCrew="oldcrew" …>`. But
`market.canonCrew()` treats any string that is not a literal crew grade as a
keyword and maps `"oldcrew"` (and blanks) straight to `'average'`, so a poor,
good or excellent crew is silently reset to average, and the section's follow-up
one-grade upgrade (`<if crew="poor">…` / `<elseif crew="average">…`) then starts
from the wrong grade. This is the only `initialCrew="oldcrew"` in the corpus.
Fix: in `canonCrew` (or at the `applyInlineBuy`/`goodsFrom` call sites), resolve
the value as a variable/number first — `resolveValue` → `CREW_LEVELS[n-1]` —
and only then fall back to the keyword mapping (`none`→poor, blank→average).
Add a headless §4.658 end-to-end test: wreck a GOOD-crew brigantine at sea, buy
the barque, assert it starts with a good crew and that the upgrade offer shown
is good→excellent. Web-only; stamp and run all sections.

**Done 2026-07-14.** `market.canonCrew` now takes an optional `state` and, when the
value is not a literal grade or `none`, resolves it as a variable/number first
(`resolveValue` → `CREW_LEVELS[n-1]`) before the `average` fallback — so
`initialCrew="oldcrew"` (a 1-based crew index that `<set var="oldcrew" value="crew"/>`
captured from the wrecked ship) maps back to its grade. `state` is threaded through
the two `initialCrew` call sites (`buyTrade`, `applyInlineBuy`); the crew-*upgrade*
sites keep their literal grades. `none`→poor / blank→average / literal-grade
fallbacks are unchanged. Tests: `applyInlineBuy` with `oldcrew`=3 yields a good crew
and the fallbacks still hold; the §4.658 end-to-end wrecks a good-crew brigantine at
sea, salvages the barque (keeps GOOD, not average), shows the good→excellent upgrade
(not from average), and applying it makes the crew excellent. Web-only. Suite green:
`RESULT ALL PASS pass=993 fail=0`.

---

## 104. Travel rolls don't gate the section's onward choices; a "get lost" outcome doesn't suppress them  — **done**

*(Filed 2026-07-14 from playtesting §1.278 and §1.82.)* The overland/river/sea
travel idiom is a **mandatory** `<random>` → `<outcomes>` → a sibling `<choices>`
block of onward destinations. `render.js` drew the `<choices>` independently of
the roll, so (1) the destinations were live *before* the encounter die was
rolled — you could leave without rolling — and (2) a "get lost" outcome carrying
its own `<goto>` (§1.278 → 82, §1.548 → 474) didn't stop the player ignoring it
and picking a destination anyway.

**Scope — the whole corpus, keyed structurally, not on `type="travel"`.** There
are exactly 20 sections with both `<outcomes>` and `<choices>`: 14 book-1
`type="travel"` sections **plus** five with an untyped mandatory `<random>` that
have the identical bug — book1/668 (mining), book2/136 (lepers), book3/335 &
book3/607 (safe-keeping "each time you return, roll"), book5/136 (rent, where a
choice's `shards="rent"` cost is *set by the roll*). The 20th, **§5.674**
(physician cure), is the counter-example that must **not** be gated: its roll is
optional — pay-gated (`<random flag="c">`, a "pay to spin" cost) and inside an
`<if shards="25">` — so declining and leaving via a choice has to stay possible.
The ~185 other travel sections resolve entirely via outcome-`<goto>`s (no onward
`<choices>`), so there is nothing to gate there.

Fix — a general roll gate mirroring `fightGate` (`web/js/render.js`):
- **`computeRollGate(sectionEl)`** (run in `render()`) returns a gate only when a
  section has an `<outcomes>` table fed by a **mandatory** `<random>` before it —
  one with no `price=`/roll-gate `flag=` (excludes §674's pay-to-spin) and not
  inside an `<if>`/branch/`<group>` wrapper (`ROLLGATE_OPTIONAL_WRAP`, also
  excludes §674) — *and* there is onward `choice`/`goto`/`return` nav after the
  roll that sits **outside** the `<outcomes>` (`ROLLGATE_OUTCOME_WRAP`) and isn't
  a `flee="t"` choice. Empty nav ⇒ null (pure roll-to-goto travel is untouched).
- **Tagging** — `renderRandom` records the gate roll's positional `rollPath`;
  `renderBranch`'s `<outcomes>` case records the `matchedOutcome`; the three nav
  renderers (`renderGoto`/`renderReturn`/`renderChoice`) call a new
  `tagRollNav` (beside `tagFightNav`) to mark `data-rollnav`.
- **`applyRollGate(flow)`** (after `applyFightGate`) disables the tagged nav while
  the roll is unresolved; once resolved it stays suppressed iff the matched
  outcome carries a redirect (a `<goto>` child or `section=`), else it unlocks.
  It only ever *adds* a disable, so it composes with the fight gate — a
  fight-in-outcome section (§1.87/§1.299/§1.60/§1.673) stays gated on **both** the
  roll and the fight.

Verified: 11 new headless assertions — §278 (four choices gated pre-roll; roll of
1 → only the `→82` redirect, destinations suppressed; a fresh visit rolling 4 →
all four unlock, no forced goto), §1.668 (a non-travel mandatory roll gates its
choices too, then unlocks), and §5.674 (`rollGate === null`; its three choices
stay live and untagged beside the optional cure roll) — plus the full
render-every-section scan. `RESULT ALL PASS pass=1004 fail=0`.

---

## 105. `<if ticks="N">` reads the live count — this visit's own `<tick/>` flips the guard on a mid-visit rerender  — **done**

*(Filed 2026-07-14 from playtesting §1.496; §1.310 is the same idiom.)* The
standard box idiom is `<if ticks="1">…goto X immediately…</if> If not, <tick/>,
and read on.` `evaluateCondition`'s `ticks=` handler (`engine.js` ~L211) tested
the **live** `state.tickCount()`. On entry the `<if>` (first child) is walked
before the bare `<tick/>`, so it correctly saw `tickCount = 0`, hid the redirect,
and the `<tick/>` then set `tickCount = 1` (task 27 caps it; task 70 draws the
box ☑ this visit — intended).

The defect appeared on any **mid-visit rerender**: §496 lets you take a
`<weapon name="magic spear">`, whose Take button calls `rerender()` → `render()`
(not `begin()`, so `tickCount` stays 1). On that re-walk `<if ticks="1">` now
matched, so *"If there is a tick in the box, [→317] immediately."* wrongly
appeared on the **same visit**, alongside the loot and the real `→85`. §310 shows
*only* the box-ticked-on-entry display (task 70's intended behaviour) because it
has no rerender trigger — no functional defect there; that display is by design.

Root cause: JaFL processes the section sequentially (the `ticks` guard is read
once, before the `<tick>`, and the section is never re-run within a visit); the
port's rerender-in-place re-evaluated the guard against the now-incremented count.

Fix — evaluate the guard against an **entry snapshot**:
- **`state.js`** — new transient `setEntryTicks(n)` / `entryTickCount()`. The
  snapshot is null/undefined ⇒ `entryTickCount()` falls back to the live
  `tickCount()`, so direct headless `evaluateCondition` calls (task 27's
  guard-eval) are unchanged.
- **`render.js`** — `begin()` snapshots `setEntryTicks(this.state.tickCount())`
  once per visit (before `render()` walks the children / runs the `<tick/>`), so
  it survives in-place rerenders but a genuine re-entry re-snapshots. Uses the
  no-args box key — the same one `addTick` and the guard use — and the position
  is already current (navigate calls `goTo` before `begin`).
- **`engine.js`** — the `ticks=` handler now reads `state.entryTickCount()`.

Verified: 5 new headless assertions on §496 (entry ticks the box yet the ticks=1
redirect stays inactive; taking the spear rerenders without flipping the guard;
the spear is taken; a genuine second visit *does* activate the →317 redirect) +
the existing task-27/task-70 tick tests still green + the full every-section
scan. `RESULT ALL PASS pass=1009 fail=0`.

---

## 106. Light mode is force-darkened on Chrome/Edge — Chromium "Auto Dark Theme" not opted out  — MEDIUM (css)

*(Filed 2026-07-14 from a mobile bug report; narrowed after the reporter
confirmed light mode is correct in Firefox but wrong in Chrome **and** Edge.)*
The theme *mechanism* is fine: `index.html` sets `data-theme` before first paint,
the header toggle persists `fl-theme`, and the reading surfaces re-skin via the
`--reading-bg`/`--card`/`--field`/`--ink` tokens overridden under
`:root[data-theme="dark"]`. Firefox (Gecko) renders light mode correctly.

Chrome and Edge are both Chromium (Blink), and both wrongly darken light mode:
**Chromium's "Auto Dark Theme" (force-dark)** algorithmically darkens the page
when the OS/browser is in dark mode, unless the page opts out. `style.css` *tried*
to opt out — `:root { color-scheme: light }` with a comment to that effect — but
that value does **not** disable force-dark: Chromium only skips a page whose
declared `color-scheme` **contains `dark`** or uses the **`only`** keyword. A bare
`color-scheme: light` marks the page light-*only* and is exactly what force-dark
targets, so the light surfaces got inverted/darkened. The app's *dark* theme was
unaffected (`color-scheme: dark` contains `dark`, so it was already opted out) —
which is why only light mode looked broken.

**Fixed 2026-07-14.** Changed the light `:root` declaration to
`color-scheme: only light;` (the documented Chromium opt-out) and rewrote the
comment to explain the `only` keyword is required. Dark theme's `color-scheme:
dark` is unchanged. Web-only, so `stamp-version.ps1` bumped the build/SW cache
key (→ `26.07.14.edcd53d`) — the reporter must let the Chrome/Edge PWA pull the
new bundle (close/reopen or clear site data) for the fix to take. Suite green:
`RESULT ALL PASS pass=993 fail=0`. (Force-dark is a browser-chrome feature the
headless scan can't exercise; the run only confirms the CSS change renders
cleanly — verify the actual light/dark appearance on-device.)

Not part of this fix, kept as a design note: the `.game-header`, adventure sheet
`.sheet-pane`, `.toast`, and title/create/saves screens are hard-coded
leather-dark in **both** themes by design (they don't use the re-skinnable
tokens). On mobile the sheet is a full-screen drawer, so opening it still shows
dark even in light mode. If lightening the chrome in light mode is wanted, file a
follow-up: tokenize those surfaces (a `--chrome-bg`/`--chrome-fg` pair per
`data-theme`), and optionally make `<meta name="theme-color">` follow the theme.

---

## 107. Visible `<transfer>` actions auto-execute and ignore chooser/filter/price semantics — **done**

*(Filed 2026-07-14 from a second full repository review.)* `renderTransfer`
equates “forced” with “automatic”: unless a node explicitly has `force="f"`, it
calls `applyEffect` while the section is rendering. The XML contract is different:
only `hidden="t"` is automatic; a visible transfer is an action, and `force`
(true by default) says whether progression must wait for the player to activate
it. The corpus has 23 transfers — nine hidden and 14 visible — so the distinction
is live, not theoretical.

The most damaging case is §4.456. Its visible
`<transfer item="?" bonus="1" limit="1" price="1" to="4.641">` is meant to let
the player choose a +1 offering and then arm outcome 641. On entry the current
code instead moves the first possession to the cache without consent, ignores
`bonus="1"`, never sets price flag `1`, and therefore never enables the outcome.
The same incomplete selector path makes §2.105 (pick what the thief stole),
§6.310 (choose an item to present), and §6.635 (choose a weapon) always take the
first matching inventory entry. `applyTransfer` also ignores `bonus`/`tags`/
`group` selectors and most `x…` exclusions: §2.639's `xarmour="?" xgroup="2.639"`
does not express the intended “lose any *other* armour” rule.

Fix the action lifecycle and selector semantics together:

- auto-run only hidden transfers; render every visible transfer as an action;
  default/`force="t"` must gate later progression until it succeeds, while
  `force="f"` remains optional;
- gather candidates with the shared item matcher (kind/name, `bonus`, `tags`,
  `group`) and apply the corresponding `x…` matcher before `limit`;
- when more candidates match than the limit, show a real item chooser and pass
  its selection into the DOM-free transfer operation instead of taking array
  position zero;
- honour `price=` as a clear-flag gate and set the flag only after a successful
  transfer; do nothing/continue when no eligible item exists, per the action
  contract.

Add headless tests for §4.456 (no entry-time loss; an ineligible/unselected item
is untouched; choosing a +1 item sets flag 1 and reveals →641), §2.105 or §6.310
(the selected, not first, item moves), §6.635 (`force="f"` remains optional), and
§2.639's exclusion filters. Web-only; stamp and run all sections.

**Done (2026-07-14).** Rebuilt `applyTransfer` around a shared item matcher
(`transferSelector`/`transferMatch`/`transferMovers` in `engine.js`): include and
`x…` exclude selectors now honour kind, name/glob, `bonus` (`N`/`N+`), `tags` and
`group`; a plain `item="*"` from the player spares `keep`-tagged possessions
(cache→player recovery does not, matching JaFL `getItemIndices`). The effective
limit is an explicit `limit=`, else 1 for the bare `"?"` "choose one" wildcard,
else unlimited. `renderTransfer` now treats a visible transfer as an *action*:
only `hidden="t"` auto-runs on entry; a real choice (more qualify than the limit
and not interchangeable) renders inline pick buttons that pass the selection
through `opts.chooser`; `price=` is a clear-flag offering (enabled only while the
flag is clear and it can pay in full, sets the flag on success — revealing the
linked `<outcome flag=>`); a default/`force="t"` transfer gates the onward
navigation (new `computeTransferGate`/`tagTransferNav`/`applyTransferGate`, mirroring
the roll gate — no prose truncation) until it runs, while `force="f"` and a no-op
(nothing eligible) neither gate nor auto-apply. A `<transfer>` bundled in a
`<group>` applies on the group's own action button (§6.490). New headless tests
cover §4.456 (no entry loss, +1 offering sets flag 1 → reveals →641, +0 item
untouched, disabled with nothing eligible), §6.310 (the *chosen* possession moves,
not the first), §6.635 (`force="f"` keeps →677 live), §2.639 (the group-2.639 suit
is spared and →342 gates until the transfer runs) and keep-tag protection. Filed
the pre-existing `<lose … bonus=>` gap the same section relies on as task 113.
`RESULT ALL PASS pass=1027 fail=0`.

---

## 108. `<outcome blessing="…">` ignores Safety from Storms and exposes the capsize/storm redirect — **done**

*(Filed 2026-07-14 from a second full repository review.)* `renderBranch` matches
outcomes by flag/range/codeword/var, but never reads `blessing=`. All six live
uses are book-5 travel hazards: §200/250/60 send an 11–12 roll to storm §527,
and §232/502/716 send the protected ship to capsize §510. Each section then has
a sibling blessing path that consumes an ordinary Safety from Storms (or keeps
the permanent version from task 90) and goes safely onward or rerolls.

The source structure and reference engine agree on the unusual contract: after
the range matches, holding the named blessing short-circuits that outcome's
actions/redirect; it does **not** consume the blessing there, because the sibling
`<lose blessing="storm">` owns that step. The port currently reveals the dangerous
`Continue` link even for a protected traveller. In sections covered by task 104's
roll gate, recording that redirect as the matched outcome can additionally keep
the sibling safe navigation suppressed.

Implement the blessing veto for both lone `<outcome>` and `<outcomes>` tables,
without changing normal range selection or consuming anything. A vetoed redirect
must not count as the roll gate's forced redirect, so the section's explicit
blessing branch can resolve. Test ordinary and permanent blessings against the
11–12/6 hazards (including one reroll form), plus the unblessed case where the
dangerous redirect remains the only result. Web-only; stamp and run all sections.

**Done (2026-07-15).** `renderBranch` now reads `blessing=` on `<outcome>` and on
`<outcomes>` branches (`blessingVeto`): when the range/var matches but the player
holds the named blessing (ordinary or the permanent Safety from Storms), the
branch is skipped — the dangerous redirect is neither revealed nor recorded as the
roll gate's `matchedOutcome`, so the sibling safe path resolves. The veto consumes
nothing. A probe first confirmed the port was *also* consuming the blessing on
entry in §200/250/60 (their `<lose blessing="storm">` is bare, non-hidden prose),
which would have defeated the veto; so a non-hidden `<lose blessing="X">` that
guards one of the section's `<outcome blessing="X">` hazards now renders as inert
words (`isGuardedBlessingLoss`) instead of auto-applying, and the safe `<goto>`
spends the blessing on click (`blessingSpendForGoto` — the roll gate only leaves
that goto clickable in the protected state, so the spend matches "lose the blessing
and turn to N"). The reroll-form sections (§232/502/716) keep their existing
`keepblessing`-var + hidden-loss mechanism and needed only the veto. New headless
tests cover §200 (ordinary blessing vetoes →527 and the blessing survives until the
safe →619 is taken, which then spends it; a permanent blessing vetoes but is never
used up; unblessed rolls into the storm with →619 suppressed; a 4–10 roll keeps the
blessing) and §232 (ordinary blessing vetoes the →510 capsize and offers the
reroll). Probing the reroll form showed it never consumes the blessing (the
rerunnable `<set keepblessing="1">` resets the guard each render before the hidden
loss reads it) — filed as task 114, since consuming is out of scope here.
`RESULT ALL PASS pass=1040 fail=0`.

---

## 109. Multi-ability success routing ignores `<success ability="…">` — §2.37 always takes SANCTITY — **done**

*(Filed 2026-07-14 from a second full repository review.)* §2.37 is the corpus's
one multi-route ability check: the player chooses SANCTITY or MAGIC for
`<difficulty ability="sanctity|magic">`, then the outcomes contain a SANCTITY
success →60 and a MAGIC success →129. `renderDifficulty` correctly stores the
chosen ability on the roll result, but `branchSuccess` checks only the success
boolean. The outcomes loop therefore accepts the first successful branch every
time, sending a successful MAGIC roll to the SANCTITY destination.

When a success/failure node has `ability=`, require it to match the feeding
roll's chosen ability in addition to the success state (the reference result
node performs the same ability-type check). Preserve the existing behaviour for
single-ability rolls, var-keyed branches, and nodes without `ability=`. Add a
deterministic §2.37 integration test for successful SANCTITY →60, successful
MAGIC →129, and failure →83. Web-only; stamp and run all sections.

**Done (2026-07-15).** Added `branchAbilityMatches(node, roll)` to `render.js` and
required it alongside the success/failure state in both `renderBranch` sites (the
top-level `<success>/<failure>` handler and the `<outcomes>` loop). A branch with
`ability=` now matches only when the feeding roll's chosen ability (`roll.ability`,
already stored by `rollDifficulty`) is in the node's pipe-list; a branch without
`ability=` is unconstrained, and when the roll carries no chosen ability the check
does not over-filter — so single-ability rolls and var-keyed branches are
unchanged. §2.37 is the corpus's only `ability=`-tagged branch set, so the change
is tightly scoped. New deterministic §2.37 test: a successful SANCTITY roll →60
(not 129/83), a successful MAGIC roll →129 (not 60/83), and a failed roll →83.
`RESULT ALL PASS pass=1043 fail=0`.

---

## 110. `<return>` starts a fresh visit instead of restoring the section at the point it was left — **done**

*(Filed 2026-07-14 from a second full repository review.)* The spec defines
`<return>` as reversing the last goto and restoring the prior section at the
point it was left, with its variables intact. `Story.goBack()` currently reads
the last `{book, section}` history record and calls ordinary `navigate()`.
`state.goTo()` then pushes the temporary section back onto history and increments
turns, while `Story.begin()` clears section variables and per-visit state and
re-applies entry effects/ticks. The visible target number is right, but the
navigation lifecycle is not a return.

There are 16 live returns, including item-use/detour flows in §5.306/356/410/550
and §4.231 → §4.12, plus four `revisit="t"` choices and one `visit="t"` goto.
Re-entering as a fresh visit can repeat one-shot rewards/costs or ticks, lose a
roll/variable that the player was meant to resume with, reset market stock, and
leave a history bounce (`A → B → A` rather than popping `B`). Treating every
source choice as newly enabled also erases the distinction that `revisit="t"`
is meant to express.

Add a transient return frame for the immediately previous visit (the format only
promises one level): preserve its section identity, variables and visit/render
memo state when leaving; on `<return>`, run the temporary section's normal leave
hooks, pop history, restore that frame, and render it without `goTo()`/`begin()`.
State changes legitimately made during the detour must remain. Honour `revisit`
when restoring which source navigation actions remain usable; `visit=` may mark
the expected temporary jump but must not be required for item-effect detours.
Test that `A → B → return` preserves A's variable/roll and used-action state,
does not repeat A's entry effect/tick or increment/push a second forward visit,
and keeps only a `revisit="t"` source action immediately reusable. Web-only;
stamp and run all sections.

---

## 111. Rolled `itemAt=` losses can remove `keep`-tagged possessions — **done**

*(Filed 2026-07-14 from a second full repository review; follow-up to task 93.)*
The spec says an `itemAt=` loss addresses a one-based Adventure Sheet/cache
position, skips currency, and leaves an item carrying the `keep` tag in place.
`applyLose` currently indexes `state.data.items[idx - 1]` directly and calls
`removeItemById` with no protection check. A roll can therefore destroy the
royal ring (§1.385) or white sword (§4.103), despite both being explicitly marked
as possessions that cannot be lost. The path also ignores `cache=` even though
that is part of the defined `itemAt` operation. The two live rolls are §6.63 and
§6.168; ordinary inventory ordering makes the protected-item case reachable.

Make the DOM-free loss respect `keep`, the selected possession/cache pool, and
the spec's one-based/currency rules; retain task 93's out-of-range no-op and
pending-roll deferral. Add tests with an ordinary item, a protected item at the
rolled position, an out-of-range index, and a synthetic cache-targeted loss.
Web-only; stamp and run all sections.

---

## 112. The Adventure Sheet stores but cannot activate a curse's `lift=` prompt — **done**

*(Filed 2026-07-14 from a second full repository review.)* Task 19 persists the
`lift` question on affliction records, but `ui.js` renders curses as inert text
chips. The only live use, §5.505 Skunk-juice, explicitly allows the player to
lift it at a river/village/town/city by opening the curse and honestly answering
“Are you at a river, village, town or city?” Until another scripted cure happens,
the current UI leaves its −1 CHARISMA effect permanently stuck.

For a curse record with non-empty `lift`, expose a keyboard/touch-accessible
“Lift…” action on its Adventure Sheet chip. Show the exact stored question in a
confirmation modal; affirmative removes that one matching curse and refreshes/
saves the sheet, while cancel leaves it and its effects unchanged. Curses without
`lift` remain inert. Test §5.505 through a save round-trip, both modal answers,
and restoration of CHARISMA after confirmation. Web-only; stamp and run all
sections.

---

## 113. `<lose item="?" bonus="N">` ignores `bonus=` — §4.456 accepts any item as a +2/+3 offering — **done**

*(Filed 2026-07-14 while completing task 107.)* §4.456's Tambu offering routes its
+2 and +3 gifts through `<lose item="?" bonus="2" price="2">` / `<lose item="?"
bonus="3+" price="3">`, whereas the +1 path (a `<transfer>`) was fixed under task
107. `applyLose`'s item block (`engine.js`) matches on name/tags/`group`/`multiple`
but never reads `bonus=`, so `item="?" bonus="2"` matches *any* possession and the
chooser/first-match then removes an arbitrary item while setting the offering's
price flag. A player can therefore present a worthless +0 item as a "+2" or "+3"
offering and still be sent to §404/§568 (Tambu's favour/Rank reward) — the bonus
requirement the section's prose spells out ("an ability bonus … of at least +1")
goes unenforced on the loss path. The reference `Item.matchBonus` applies the same
exact/`N+` bonus test the task-107 `transferMatch` now uses.

Give `applyLose`'s item selection the same bonus filter (exact `N`, `N+` for
"N or greater"), reusing the shared matcher so lose and transfer agree. Only the
matching-eligible items should be offered to the chooser / taken; when nothing
qualifies the loss (and its price flag) must not fire, so an ineligible offering
cannot open §404/§568. Add a headless test that a +2 `<lose item="?" bonus="2">`
skips a +0/+1 item and takes only a +2, and that §4.456's +2/+3 offer buttons are
inert with no qualifying item. Web-only; stamp and run all sections.

---

## 114. Reroll-form storm sections never consume the blessing — the rerunnable `keepblessing=1` set resets the guard each render — **done**

*(Filed 2026-07-15 while completing task 108, and confirmed by probe.)* §232/502/716
avoid a storm/capsize on an 11–12/6 roll by spending Safety from Storms, but unlike
§200/250/60 they express the spend with a `keepblessing` variable and a hidden
`<lose blessing="storm" hidden="t">` gated on `<if not="t" var="keepblessing"
equals="1">`. On entry `<set var="keepblessing" value="1" hidden="t"/>` marks the
blessing "kept"; the safe branch sets it to `0` and offers a `<reroll>`. The intent
is that, once `keepblessing=0`, the hidden loss fires and the blessing is spent, so
only one reroll's worth of protection is granted.

The absolute `<set keepblessing value="1">` is *rerunnable* (task 46/61 semantics:
a modifier-less `<set value=>` re-applies on every render). It sits above the
hidden loss in document order, so each render resets `keepblessing` to `1` before
the `<if not keepblessing==1>` guard reads it — the hidden loss therefore never
fires. A probe confirmed that after rolling 11–12, rerolling, and rolling 11–12
again, `hasBlessing('storm')` is still `true` (with `keepblessing=0`). Task 108's
new veto exposes this: the player now gets *unlimited* storm protection in these
three sections (before the veto they simply capsized, so the reroll branch's spend
was never the operative path).

Make the reroll-form spend actually consume the blessing exactly once per storm
avoided — e.g. freeze/one-shot the entry `<set keepblessing="1">` so the mid-section
`<set keepblessing="0">` survives to the render that fires the hidden loss (mirror
task 61's rolled-var freeze), or drive the loss from the reroll action directly.
Add a headless test: §232 with an ordinary storm blessing, roll 11–12 → reroll →
the blessing is gone and a second 11–12 capsizes (→510), while a permanent blessing
survives. Web-only; stamp and run all sections.

---

## 115. Adventure-Sheet item detours bypass `Story.navigate`, so `<return>` still re-enters the source section — HIGH (app/render)

*(Filed 2026-07-15 from a third full repository review; follow-up to task 110.)*
Task 110 fixed normal choices/gotos by wrapping the app router in
`Story.navigate`: it captures the source visit's return frame, runs leave hooks,
then calls the raw async navigation function. `app.js:onUseItem`, however, sends
an effect's `res.goto` straight to the raw app-level `navigate()`. The destination
therefore has history but no `_returnFrame`; its `<return>` takes `goBack()`'s
fallback and re-enters the origin through `goTo()`/`begin()` — exactly the fresh-
visit bug task 110 was meant to eliminate.

This is live in the treasure map (§1.30 → §1.200), Black Diptych (§5.412/712 →
§5.410), Vade Mecum (§5.549 → §5.550), blue potion (§5.698 → §5.306), and
lacquer box (§6.252 → §6.272). Returning can repeat the source's entry rewards/
costs/ticks, discard its variables/rolls/action state, and add an `A → B → A`
history bounce. The existing task-41 test checks only that `useItemEffect` returns
a target; task 110's synthetic test leaves through a Story-rendered link, so
neither covers the app seam.

Route every in-game navigation source through one public Story/controller entry
point (item use included), leaving only that entry point able to call the raw app
router. Preserve the item effect/removal before capturing/leaving so the detour's
legitimate state changes remain. Add an app/Story integration test using one live
item detour: return restores the exact source visit, does not repeat its entry
effect/tick or add a forward visit, and marks the source action consistently with
task 110. Web-only; stamp and run all sections.

*Correction (2026-07-16 fourth review):* the dominant failure mode is worse than
the fresh-visit fallback described above. `begin()` (render.js:218-278) never
clears `_returnFrame`, and only `goBack()` consumes it (render.js:1950-1958) — so
after arriving at the source section via a normal choice, the detour destination
holds a **stale** frame and its `<return>` restores the section *before* the
source, with the wrong position/vars, while `restoreReturn` (state.js:852-860)
pops the source off history leaving a duplicate top. The null-frame fallback only
occurs when the item is used right after a load. The fix (single entry point)
cures both modes, but the test must assert against the stale-frame mode too. The
sweep must also cover `app.js:649` (death → resurrection navigation), another raw
caller that skips leave hooks and leaves a stale frame; the fresh-start/load
callers at app.js:58/613/619/622 are safe (frame is null there).

---

## 116. Save/load restarts the current visit — effects can repeat and rolls/return state disappear — HIGH (state/app/render)

*(Filed 2026-07-15 from a third full repository review.)* Every state mutation
autosaves (`GameState.changed()` → `save()`), but all per-visit execution state is
held only in `Story.ctx` / `_returnFrame`. Loading a slot builds a new `Story` and
`loadCurrent()` calls `story.begin()` on the already-mutated current section.
`begin()` creates an empty memo, clears variables and temporary bonuses, resets
price/flag coordination, resets rolls/fights/market stock/action picks, and walks
the section's passive effects again. A save made after receiving Shards/items,
ticking a box, paying, rolling, or entering an item detour can therefore reload
as a different visit: one-shot effects can repeat, interactive progress vanishes,
and a later `<return>` falls back to fresh navigation.

Persist a versioned, serializable current-visit record alongside the game state:
at minimum the section identity, variables, applied/action memo, resolved rolls
and fights, stock/pick state, used source action, entry tick baseline, deferred
leave bookkeeping, and the one-level return visit needed by task 110. Store stable
node paths/IDs rather than DOM nodes and rebuild their references from the parsed
section on load. Loading must resume the current visit without `begin()`'s entry
side effects; new/legacy saves without the record need a conservative migration
that cannot duplicate rewards. State changes earned during a detour must remain
when its source frame is restored.

Add a real save-slot round-trip test: save after a synthetic gain+tick and resolved
roll/action, reconstruct `GameState` and `Story`, and prove the effect/tick do not
repeat and the roll/action remains resolved. Add a second round trip while inside
a live return detour and prove return restores the source variables/memo/history
without incrementing turns. Web-only; schema/migration may change; stamp and run
all sections.

---

## 117. Priced equipment/cargo losses can arm their reward without taking the required payment — HIGH (engine/render)

*(Filed 2026-07-15 from a third full repository review; follow-up to task 113.)*
Task 113 made `renderOptionalPay` and `applyLose` validate `item=` offerings, but
the equivalent equipment/cargo selectors still bypass that contract. The view's
eligibility guard looks only at `item=` and Shards; the price branch also runs
before the renderer's equipment-choice path. In `applyLose`, the `price` flag is
set before `loseEquipment` / `applyShipLose`, and is unconditional whenever there
is no `item=` attribute.

Two live consequences are exploitable:

- §2.90 offers `<lose weapon="?" price="x">` or `<lose armour="?" price="x">`.
  Either button stays enabled without that kind of equipment, sets `x`, and the
  linked loss renounces Elnir; with several matches it silently takes the first
  instead of asking which one to forfeit.
- §3.569 exchanges one named Cargo Unit for two textiles. A named-cargo button
  remains enabled when the current ship lacks that cargo; it sets `x` anyway and
  the linked textile gain can run for free.

Create one DOM-free loss plan/matcher shared by eligibility, chooser candidates,
and commit. It must cover item/equipment/cargo selectors, bonus/tags/using/cache,
current-ship locality, required quantities, and report whether the requested loss
actually completed. A priced action may set its flag/apply linked rewards only
after the full payment is taken. Wire visible `?` equipment/cargo losses to choose
the exact candidate rather than silently defaulting; keep deterministic/all forms
headless. Test both live sections with no eligible payment, wrong cargo, multiple
equipment choices, and a successful payment/reward. Web-only; stamp and run all
sections.

*Scope note (2026-07-16 fourth review):* the shared plan has one more consumer —
`renderPayment` (render.js:1452-1482), the forced economic payment with a decline
path. Its only ownership guard today is the Shards balance: a forced, unpriced
`<lose item=/cargo=/ship=>` payment with the possession absent still renders an
enabled Pay button, and clicking it memoizes `pay@` and unblocks the section
having taken nothing. Route its eligibility and commit through the same matcher.

---

## 118. Choice/equipment losses can remove `keep`-tagged possessions — HIGH (engine/render)

*(Filed 2026-07-15 from a third full repository review as MEDIUM; moved to HIGH
2026-07-16 to sit immediately after task 117 — it implements the keep-tag rules
inside 117's shared loss matcher, and doing the two back-to-back keeps that
design context warm instead of rebuilding it four tasks later; the consequence
— irreversibly losing a plot item the books say cannot be lost — also supports
HIGH. Follow-up to tasks 16 and 111.)* `applyLose(item="*")` and `itemAt=` protect `keep`, but
`loseItemMatches()` still includes protected possessions for `item="?"` /
`multiple=`, while `loseEquipment()` includes them for weapon/armour/tool `?` and
`*`. A generic theft/confiscation can therefore offer or silently select the royal
ring (§1.385) or white sword (§4.103), whose source text says they cannot be lost
or stolen. The current default-first behavior makes the bug reachable even
without a chooser.

The reference semantics first match while respecting `keep`; only when an
explicit *named* item has no ordinary match may that exact kept item be handed
over deliberately. The open `?` form never falls back to protected possessions,
and all-of-kind removal also skips them. Implement that distinction in the shared
loss matcher/plan from task 117 (not as a renderer-only filter), preserving valid
scripted named handovers. Add tests for `item="?"`, `multiple=`, equipment `?`/`*`,
only-protected inventories, mixed protected/ordinary inventories, and an explicit
named kept-item handover. Web-only; stamp and run all sections.

---

## 119. Re-establish the rules/view boundary and split the 4,060-line renderer by responsibility — DONE (architecture)

*(Filed 2026-07-15 from a third full repository review.)* The overall module map
is still sound: state, combat, economy, data, shell, UI and TTS have recognizable
homes, and the core modules do not depend on browser UI globals. `render.js` has
nevertheless grown to 4,060 lines and now owns section lifecycle/return state,
XML traversal, payment and reward semantics, roll/branch/fight/transfer gates,
storm-blessing veto/spend rules, caches, markets, combat widgets and modal choices.
Recent fixes added bespoke rule decisions such as `isGuardedBlessingLoss`,
`blessingSpendForGoto` and reroll consumption directly to this DOM class. That no
longer matches the documented invariant that the renderer wires controls while
DOM-free modules decide and execute rules; the duplicated eligibility seam behind
tasks 113/117 and the raw-navigation seam behind task 115 are concrete costs.

Refactor incrementally, preserving `render.js` as the small public facade that
exports `Story`/`previewProse`. Move composite rule planning and transactions
(loss/payment eligibility, blessing outcomes, branch/gate resolution, return-
visit serialization) into tested DOM-free helpers. Split DOM construction into a
few responsibility-based ES modules — section/lifecycle, actions/rolls, combat
view, and market/cache view are the current natural seams — without introducing a
framework, build tool, speculative abstraction, or circular dependency. DOM code
may call a state/engine operation from a click handler, but must not independently
encode the rule or mutate several rule fields as its own transaction.

Keep the existing `Story` API so `app.js` and tests do not churn unnecessarily;
update README's module table and service-worker inputs for any new files. Add
focused unit tests for every extracted planner before moving the corresponding
view. Success: no behavior change beyond the filed fixes, no browser globals in
the rule modules, the all-section suite stays green after each extraction, and no
single replacement file simply inherits the same god-object role. Web-only;
stamp and run all sections.

*Trap (2026-07-16 fourth review):* `build/stamp-version.ps1:32` collects
`web/js/*.js` **non-recursively**. If the split puts modules in a subdirectory,
they silently drop out of the version hash (stale PWA caches on deploy) — extend
the stamp collector alongside the sw.js precache list and README table.

*Progress (2026-07-19, user scope = phases 1+2; view-file split deferred):* the
rules/view boundary is re-established — the composite rule logic the DOM class
had grown to encode inline now lives in three new DOM-free, unit-tested modules,
each added to `sw.js` REQUIRED + the README table (kept FLAT in `web/js/` so the
non-recursive stamp collector still hashes them — trap avoided):
- **1a** `render-rules.js` — blessing veto / spend / guarded-loss rules.
- **1b** `render-rules.js` (cont.) — reward/payment eligibility (choose-one,
  priced-item award, roll-gate, forced/optional action, reward-waste) + the
  shared `ITEM_FAMILY_TAGS`/`CHOOSE_ONE_TAGS` sets.
- **1c** `render-gates.js` — fight/roll/transfer navigation-gate computation +
  post-fight deferral decisions (the `tag*`/`apply*` DOM helpers stay in the view).
- **2** `visit-state.js` — per-visit ctx factory + ctx/return-frame serialization.

`render.js` keeps the `Story`/`previewProse` API unchanged (app.js and tests
un-churned) and shrank from ~4,450 to under 4,000 lines after phases 1-2. Smoke
suite RESULT ALL PASS after each slice. The core "rules out of the view"
invariant is met.

*Phase 3 partial (2026-07-19; user then chose to stop):* began the physical DOM-
view split via prototype mixins (each module exports a methods object mixed onto
`Story.prototype` with `Object.assign`). Done + verified (smoke RESULT ALL PASS
1288 each), added to `sw.js` + README:
- `render-util.js` — shared display helpers so view modules avoid importing render.js.
- `render-combat.js` — the fight view (single/group battle widgets, round controls).
- `render-market.js` — the economy view (markets, buy/sell, rest, caches, transfer, resurrection).

`render.js` is now ~2,900 lines (from ~4,450) and dropped the combat.js import +
most of market.js. `render-combat.js` / `render-market.js` currently use prototype
mixins (`Object.assign(Story.prototype, …)`); they are correct and fully tested.
**Decided (2026-07-19):** the rest of task 119 follows the fifth-review guidance
below — plain functions taking the story as first argument, rule pockets extracted
to tested planners first — and the combat/market mixins get converted to that same
style **as part of** that effort (a standalone mixin→function conversion is pure
churn with no behaviour or boundary gain, so it is not done on its own). See the
resume checklist after the guidance note.

*Phase-3 guidance (2026-07-19, fifth review — renderer sweep):* the boundary
claim is ~80% true: the extracted predicates are clean, but several
composition/transaction pockets still in the view ARE rule semantics, and a
file-only split would fossilise them. Extract these as DOM-free planners
FIRST (each unit-tested, per this task's own rule), then move the DOM:
- `renderPassive`'s decision cascade (render.js:1196-1412) — the ordering IS
  JaFL's execution model; extract a `classifyPassive(node, view) → {mode,…}`
  verdict the view merely switches on.
- `grantChoosableReward` (render.js:1803-1836) — a full award transaction
  (currency/possession branch, quantity loop, resurrection deal, flag
  consumption) in the view; it duplicates the engine applier `grantItemNode`
  already delegates to. Belongs in engine/market behind a chooser-style API.
- `renderChoice`'s eleven inline eligibility gates + the `pay=` default
  (render.js:2274-2311) — extract `choiceGate(state, node, view) → reasons[]`
  into render-rules.js (unit tests there would also catch task-133-style
  revalidation drift).
- Branch resolution (render.js:2636-2760) — `branchSuccess`/`branchResolved`/
  the `<outcomes>` matcher are pure functions of (node, roll record, state,
  wroteVars); the natural fourth block of render-rules.js.
- The `renderGroup` planner family (render.js:994-1161) — extract a
  `groupPlan(sectionEl, node)` classification.
Plan a FOURTH view module for rolls+branches (~530 lines, render.js:2365-2778)
alongside combat/market/actions — rolls are the heart of the render/rules
interplay and belong to none of those three. On the TBD structure question:
prefer plain functions taking the story as first argument (the pattern the
render-rules delegates already use) over prototype mixins (keep the god object
and hide dependencies) or collaborator objects (two-way reference ceremony);
converting TAG_RENDERERS' string values to imported function references makes
the moves mechanical. Keep new files flat in `web/js/` (stamp trap above) and
extend sw.js REQUIRED + the README table per file, as phases 1-2 did.
Also: begin() re-implements visit-state's `rebuildVisitScaffold` inline
(render.js:258-273 vs visit-state.js:65-78) — fold that into whichever slice
touches begin() first, or take it with task 152.

*Resume checklist (2026-07-19 — the accepted route for the remaining Phase 3;
start fresh here).* One planner/module per commit; after EACH, `pwsh
-ExecutionPolicy Bypass -File build/stamp-version.ps1` then the full every-section
smoke = `RESULT ALL PASS` before committing. Line numbers above are pre-move and
will drift — re-grep.
1. **Extract the in-view rule pockets to DOM-free planners FIRST**, each unit-
   tested (in `suite-actions`, beside the existing task-119 planner tests) before
   its DOM is touched: `classifyPassive(node, view)`, `choiceGate(state, node,
   view) → reasons[]`, and branch resolution (`branchSuccess`/`branchResolved`/
   the `<outcomes>` matcher) → **render-rules.js**; `groupPlan(sectionEl, node)` →
   render-rules.js; `grantChoosableReward` → **engine.js/market.js** behind a
   chooser-style API (dedupe against what `grantItemNode` already delegates to).
2. Fold begin()'s inline scaffold rebuild into `visit-state.rebuildVisitScaffold`.
3. **Split the remaining view into plain-function modules** (`story` as first arg),
   flat in `web/js/`, each added to `sw.js` REQUIRED + the README table:
   `render-rolls.js` (rolls/branches, ~530 lines), `render-rewards.js`
   (passive/payments/rewards/item-awards/groups), `render-choices.js`
   (choices/goto/return/navigation). Convert `TAG_RENDERERS` string values to
   imported function references so dispatch becomes `fn(this, container, node,
   path)` — this makes the moves mechanical.
4. **Convert `render-combat.js` / `render-market.js` from mixins to the same
   plain-function style** and drop the `Object.assign` wiring, so the whole view
   is one convention.
5. Keep `render.js` as the facade: class decl + exports, lifecycle
   (begin/render/rerender/resume/useItem/navigate/serializeVisit/deserializeFrame),
   the core walk (appendChildren/renderElement/if-chain/text/image/table), and the
   gate `tag*`/`apply*` DOM helpers.
Success (unchanged): no behaviour change, no browser globals in the rule modules,
the all-section suite green after each extraction, the `Story` API stable, and no
single replacement file inheriting the god-object role.

*Done (2026-07-20 — Phase 3 completed on the accepted route above; one
planner/module per commit, full every-section smoke `RESULT ALL PASS` before
each).* The in-view rule pockets were extracted DOM-free FIRST, each unit-tested
in `suite-actions`, then the DOM moved:
- **1** `classifyPassive(node, view)` — the renderPassive execution cascade →
  render-rules.js (with `pendingRollVar` + the `needsAbility/Equipment/Profession`
  predicates). `isRollGate` moved to render-gates.js (re-exported) so the two rule
  modules stay one-way.
- **2** `choiceGate(state, node, view) → {reasons, payment, …}` (+ `flagGate`,
  `isSpentSource`) → render-rules.js.
- **3** branch resolution `branchPlan(state, ctx, node, roll)` (branchSuccess/
  Resolved/AbilityMatches + the `<outcomes>` matcher) → render-rules.js.
- **4** `groupPlan(sectionEl, node)` + `groupRollDefers` → render-rules.js.
- **5** `grantChoosableReward` → engine.js `grantChosenReward(state, node, key,
  book)`, routing item awards through the existing `applyItemAward` applier (a
  chosen item's curse/disease/poison child now bites on pickup, matching every
  other award path).
- **6** begin()'s inline scaffold rebuild folded into
  `visit-state.rebuildVisitScaffold(ctx, sectionEl, state?)` (state ⇒ fresh entry
  resets roll-lock caches; omitted ⇒ resume keeps a locked bet).
- Then the view split into plain-function modules (`story` first arg), flat in
  `web/js/`, each in `sw.js` REQUIRED + the README table: **render-rolls.js**
  (rolls/branches), **render-rewards.js** (passive/payments/rewards/item-awards/
  groups), **render-choices.js** (choices/goto/return/navigation). `TAG_RENDERERS`
  now dispatches `fn(story, container, node, path)`.
- **render-combat.js** / **render-market.js** converted from `Object.assign`
  mixins to the same plain-function style; the `Object.assign(Story.prototype…)`
  wiring is gone, so the whole view is one convention.
`render.js` is the facade at **~1,090 lines** (from ~4,450): class decl + exports,
lifecycle, the core walk, conditionals, `previewProse`, and the fight/roll/transfer
nav `tag*`/`apply*` helpers + `goBack`. `Story`/`previewProse` API unchanged; no
browser globals in the rule modules; smoke `RESULT ALL PASS 1377` throughout.

---

## 120. Split the 4,790-line single-scope browser test into focused ES-module suites — HIGH (tests)

*(Filed 2026-07-15 from a third full repository review as LOW; moved to HIGH
2026-07-16, positioned after the quick severe fixes 122–124 and before the
test-heavy 115–117 chain: every open task adds test blocks, and doing the split
first means they land in focused suites instead of deepening the single-scope
monolith — and the async silent-pass gaps below get closed before the results of
the big fixes are trusted.)* `web/_test.html` now
contains about 4,790 lines inside one `async function run()`. The repository's own
instructions warn that reusing any top-level `const`/`let` is a parse-time fatal;
task 82 only made that failure visible, and newer blocks already need manual `{}`
scopes to avoid collisions. The single function also makes it hard to find a rule's
coverage or run a focused subset, while mixing pure engine assertions, DOM
integration, persistence, and the every-section scan.

Keep `_test.html` as the zero-dependency browser harness and result reporter, but
move suites into plain ES modules grouped by responsibility (engine/state,
combat, market, render/app integration, corpus scan). Export one async runner per
suite and pass a tiny shared assertion/context object; do not add npm or a test
framework. Preserve the fatal bootstrap handler, deterministic RNG controls,
`RESULT ALL PASS`/`TESTS_OK` contract, fresh-profile compatibility, and the final
render of all six books. Document the suite map next to the README test command.
Web-only; stamp and run the aggregate and at least one focused suite.

*Harness gaps to close in the same rework (2026-07-16 fourth review):* (a) there
is no `unhandledrejection` handler — a rejected un-awaited promise in exercised
app code fails nothing; (b) a mid-run async `window.error` fires the task-82
bootstrap handler and writes `RESULT FATAL`, but `run()`'s unconditional final
report (_test.html:4786-4788) then **overwrites** it — potentially as `ALL PASS`.
Make the fatal state sticky and fail the aggregate on any captured async error.

*Done 2026-07-17:* `_test.html` is now only the harness + reporter; the former
`run()` body was split verbatim (order preserved, so behaviour is unchanged) into
seven ES-module suites under `web/tests/` — `suite-engine`, `suite-render`,
`suite-inventory`, `suite-combat`, `suite-economy`, `suite-actions`, and
`suite-corpus` (the six-book scan, run last). Each exports one `async run(ctx)`
taking the shared `{ok, parse}`, rebuilds its own fixtures (so `?suite=<name>` runs
any subset hermetically), and is its own module scope (a duplicate top-level
`const` now aborts only that suite). Gap (a): added an `unhandledrejection`
listener; gap (b): the reporter honours a sticky `window.__FL_ASYNC_FATAL__` flag,
so a captured async error/rejection forces a failure that a later "ALL PASS" can
never overwrite (verified by fault injection). Aggregate `RESULT ALL PASS pass=1098
fail=0`; every suite also passes in isolation (147+87+293+226+266+78+1 = 1098). No
version stamp: the stamp hashes shipped app source only and deliberately excludes
`_test.html`/`web/tests/`, so a test-only change must not bust the PWA cache.

---

## 121. The documented `powershell` build command no longer parses `build-data.ps1` on Windows PowerShell 5.1 — MEDIUM (build/docs)

*(Filed 2026-07-15 while verifying the third full repository review.)* Both
README and `AGENTS.md` prescribe:
`powershell -ExecutionPolicy Bypass -File build/build-data.ps1`. Running that
exact command with Windows PowerShell 5.1 fails at parse time around lines 48/162.
The script is BOM-less UTF-8 and contains em dashes in double-quoted messages;
5.1 reads those bytes through its legacy code page, and the mojibake smart-quote
byte is treated as a string delimiter. `pwsh` 7 reads the same file correctly,
which is why recent builds passed there, but PowerShell 7 is not declared as a
dependency and the documented built-in Windows command is currently unusable.

Keep the no-dependency Windows workflow working: make both build scripts parse
under Windows PowerShell 5.1 (prefer ASCII punctuation in `.ps1` source/messages,
or a deliberately BOM-encoded file if the repository can preserve it), then run
the exact README command as well as `pwsh` if available. Add a lightweight CI or
documented verification step that exercises the prescribed command so script
encoding cannot silently regress. Do not merely change the docs to require an
undeclared tool. Build-only; confirm XML validation, generated output and stamp,
then run all sections.

*Rescope (2026-07-16 fourth review, verified by live runs):* (a)
`stamp-version.ps1` already parses **and runs** under 5.1 — only
`build-data.ps1`'s two em dashes (lines 48/162) need the punctuation fix. (b)
Parsing is not sufficient: the **outputs are engine-dependent**. `Sort-Object
FullName` (stamp-version.ps1:48) is culture-aware — .NET Framework (NLS) and
.NET Core (ICU) order the hyphenated asset names differently, so 5.1 produced
stamp `e9c6e17` from the identical content that pwsh 7 stamps `ca63008`; and
`ConvertTo-Json` escaping differences reformat all six book JSONs wholesale
under 5.1. Either make the outputs engine-invariant (ordinal sorts, stable JSON
escaping) or make an explicit decision to require pwsh 7 and update README,
AGENTS.md and CI to match — full 5.1 output parity is substantially more work
than the punctuation fix. Any added verification step must pin the engine it
runs under, or it will "verify" engine-dependent output.

*Resolution (2026-07-19, user-decided):* **require pwsh 7.** Normalising
`ConvertTo-Json` escaping across engines is fragile, high-effort work for a
Windows-dev edge case end-users never hit (they load the static site; no build).
Instead: (1) fixed the two em dashes and cleaned every remaining non-ASCII
comment byte so `build-data.ps1` is pure ASCII and parses under any code page;
(2) added `#Requires -Version 7.0` to **both** scripts so 5.1 *refuses to run*
(clear message, exit 1) rather than silently emitting a divergent build —
verified live; (3) README + AGENTS.md now prescribe `pwsh -File …`, noting only
the offline build needs pwsh 7 (the web app stays dependency-free); (4) a new CI
job (`build-scripts` in smoke.yml) lints both `.ps1` for non-ASCII bytes and the
`#Requires` guard — a pure source check that never runs the engine-dependent
build. Verified: pwsh 7.6.3 regenerates byte-identical book JSONs (only the
meta.json `generated` date + stamp move), smoke suite RESULT ALL PASS.

---

## 122. Roll-less `<outcome codeword=…>` decision tables never resolve — eight sections render as dead ends — HIGH (render)

*(Filed 2026-07-16 from a fourth full repository review; verified live in the
running app.)* `branchResolved` (render.js:2563-2566) returns `!!roll` for any
branch without a `var=` attribute, and both branch renderers gate on it before
ever reaching the codeword test: the `<outcomes>` loop at render.js:2666 and the
lone-outcome path at render.js:2641 (whose codeword check at :2643 is therefore
unreachable without a roll). But the books use `<outcome codeword=…>` as a
roll-less dispatch idiom — "Which of these codewords do you have?" with a bare
`<outcome section=…>None of them</outcome>` default. With no `<random>` in the
section, `activeRoll` stays null (render.js:307, only set at :512-514), so **no
row reveals — including the default**, and the app's no-navigation fallback
renders the "Your tale ends here — accept your fate ▸" death button (confirmed
headlessly at `?demo=4.2`: prose plus the fate button, zero links).

Live sections: §2.12, §2.68, §2.301, §4.2, §4.132, §4.184, §5.303 (tables;
§4.184 has *no* default row), and §4.457 (lone `<outcome codeword="4.457">`
inside `<choices>` — not a softlock, but the Initiate route never shows). §4.2
and §4.132 are book 4 hub dispatches; §5.303 is the Hall of Heroes parlour;
§2.301/§4.457 key on a *box codeword* ticked `hidden="t"` earlier in the same
visit (the entry tick renders before the table, so same-visit writes must be
visible to the match).

Fix in `branchResolved`/`renderBranch`: a `codeword=`-keyed branch (like a
`flag=` one, task 113's §4.456 precedent) needs no roll — evaluate it against
live codewords; a bare default `<outcome>` in a table whose every keyed sibling
is roll-less must also resolve without a roll, while roll-fed tables keep
waiting. Test §4.2 (no codewords → default reveals §97; with Defend → §57),
§4.184 (either codeword reveals; nothing else), §2.301 (initiate tick this visit
→ §269), and §4.457 (Initiate row only for Tambu initiates), plus a regression
that rolled tables still wait. Web-only; stamp and run all sections.

---

## 123. "Immunity to Disease and Poison" is stored under two un-aliased names — the blessing never protects — HIGH (state/engine)

*(Filed 2026-07-16 from a fourth full repository review.)* It is one blessing in
the books ("Immunity to Disease and Poison") but the XML grants it under two
spellings, and the engine treats them as unrelated: `BLESSING_ALIASES`
(state.js:19) maps only `storms → storm`, and `hasBlessing` (state.js:630) does
literal canon-name matching. JaFL's `Blessing.getBlessing()` maps any type
containing "disease" **or** "poison" to the same `DISEASE_TYPE`.

Corpus: granted as `blessing="poison"` at §2.133 (`<tick blessing="poison"
flag="x">Immunity to Disease and Poison</tick>`) and as `blessing="disease"` in
9 places (§1.481, §2.402, …); tested/spent under the *other* name throughout —
`<if blessing="poison">` ×15 (§2.377, §2.430, §3.162, §6.191, …) with paired
`<lose blessing="poison">` ×17, and `<if blessing="disease">` ×8 / `<lose>` ×9.
A player holding the §2.133 blessing gets no protection at any disease check
(and vice versa): the death/damage branch fires while the sheet still shows the
blessing.

Fix: alias `poison` and `disease` to one canonical name in `BLESSING_ALIASES`
(mirroring the storm/storms precedent), and sanitize existing saves so a stored
blessing under either name survives as the canonical one. Test: grant under
"poison", check `<if blessing="disease">` passes and `<lose blessing="disease">`
consumes it (and the reverse); confirm §5.365's storm/disease/injury menu still
grants three distinct blessings. Web-only; stamp and run all sections.

---

## 124. Loading/importing a save clamps Stamina to the written max — aura Stamina is silently stripped — HIGH (state)

*(Filed 2026-07-16 from a fourth full repository review; reproduced headlessly.)*
`sanitizeData` clamps `out.stamina` with `max: out.staminaMax`
(state.js:1017-1018) — the *written* maximum, not `effectiveStaminaMax()`
(state.js:221), which adds aura Stamina. The ring of ultimate power (§5.564,
`<effect type="aura" ability="Stamina" bonus="10">`) legitimately lets
`healStamina` (state.js:518-521) fill to staminaMax+10, but `migrate()` runs
`sanitizeData` on **every** `GameState.load` (state.js:889-899) and on import —
so a ring-holder saved at 30/20 reloads at 20/20. Repro confirmed in Node: the
ring's effects round-trip intact while `stamina` drops from 30 to 20. The
service worker's `controllerchange → location.reload()` (app.js:116-123) even
triggers it with no player action after a deploy.

Fix: clamp against `staminaMax` plus the summed aura-Stamina of the sanitized
items (or defer the clamp to a post-construction reconcile pass that can use
`effectiveStaminaMax()`), keeping the conservative floor for hand-edited
imports. Test a save/load round trip at 30/20 with the ring (survives), the same
save without the ring (clamps to 20 — reconcileEquipment's drop rule, task 44),
and an import of both. Web-only; stamp and run all sections.

---

## 125. Flag-linked item rewards outside choose-one menus are free, and paying can never grant them — HIGH (render/engine)

*(Filed 2026-07-16 from a fourth full repository review; follow-up to tasks 43/63
and sibling of open task 117's cost side.)* `renderItemAward` honours a `flag=`
only when `isChooseOne(flag)` says the flag feeds a choose-one menu
(render.js:2022-2023); a **single** flag-linked reward falls through to the
ordinary always-enabled Take button, the flag dropped. The payment side cannot
compensate: `renderOptionalPay`'s click applies linked rewards via
`applyEffect` (render.js:1520-1524), but `EFFECT_APPLIERS` (engine.js:406-418)
has **no entry for `item`/`weapon`/`armour`/`tool`** — an item reward is a
silent no-op there.

Live: §3.346 — pay `<lose item="pirate captain's head" price="x">` (or witch's
hand) for `<item name="200 Shards" flag="x"/>`; the Take button is live with no
payment, and since `begin()` resets flags and the `take@` memo is per-visit,
looping the §44 hub makes it a **repeatable free 200 Shards**, while clicking a
cost button destroys the trophy and grants nothing. §1.342/§4.111 — the potion
of restoration (`<item … flag="x">` behind a `<group>` of `<lose shards="250"
price=""/>` + `<lose item="ink sac" price="x"/>`) is free to take while merely
*holding* the ingredients, and paying yields nothing. (§4.634's Take-button
status quo is documented under task 63 — supersede it here.)

Fix: gate every flag-linked award on its flag (armed → live, taken → consumed),
not only choose-one menus, and give the item family a real applier (reuse the
award transaction `grantItemNode` uses, capacity-checked) so payment-side
rewards land. Test §3.346: no trophy → Take disabled; pay head → medallion
granted once, not repeatable on re-entry; and §1.342: potion only after the
group payment. Web-only; stamp and run all sections.

---

## 126. A collapsed `<group>` action never executes its `<buy>` children — §5.192's ship and §4.622's cargo are unobtainable — HIGH (render)

*(Filed 2026-07-16 from a fourth full repository review; follow-up to tasks 96/
107/61.)* `renderGroup` collects a collapsed group's click effects with
`querySelectorAll('lose, tick, gain, set, curse, transfer')` plus item-family
awards and `<rest>` (render.js:912-922) — `<buy>`/`<sell>` are in neither list,
and a collapsed group renders only its label, so the trade never runs. JaFL's
`BuyNode` is an `Executable` that runs with its group (`TradeNode.java:248`,
with a `GroupNode` special case at :403).

Live: §5.192 — `<group><text>50 Shards</text><buy ship="brig" name="Wrath of
God" shards="50" initialCrew="none" quantity="1"/><lose item="deed to the Wrath
of God"/></group>`: clicking destroys the deed, charges nothing, and **the ship
is never added** — permanently unobtainable. §4.622 (×3) — `<group><text>Metals
</text><buy cargo="metals" quantity="1" shards="0" force="t"/><tick
codeword="4.622.1"/></group>`: the codeword hides the option forever, the free
salvage Cargo Unit never loads.

Fix: include `buy`/`sell` in the group's executable collection, routing them
through the same `buyTrade`/inline-buy transaction as standalone rows (price
charged from the group click, ship-here/cargo-space checks enforced, `force=`
and `quantity=` honoured). Test §5.192 (deed + 50 Shards → ship exists, docked
here, crew poor) and §4.622 (click Metals → cargo aboard + codeword ticked).
Web-only; stamp and run all sections.

---

## 127. Abbreviated cargo names are never canonicalised — the trans-book trading economy is broken — HIGH (market/engine/rules)

*(Filed 2026-07-16 from a fourth full repository review.)* Three whole markets
sell cargo under abbreviated names — §4.252 and §5.145/§5.225 use `grai`,
`meta`, `mine`, `spic`, `text`, `timb`, `slav` — and §5.447 sells `mineral`
(vs `minerals` everywhere else). The port stores the raw attribute on the
manifest (`buyTrade`, market.js:101) and matches exactly everywhere:
`ownsGoods`/`sellTrade`/`sellCargo` via `Array.includes` (market.js:73/126/217)
and `matchCargo` via normalized equality (engine.js:377-383). JaFL's
`Ship.getCargo` matches by **prefix** and stores a canonical enum.

Consequence: cargo bought at those ports can never be sold at any full-name
market and vice versa; §5.447's units are unsellable anywhere; `<if cargo=>` /
`<lose cargo=>` full-name checks miss the abbreviated units; the manifest
displays raw `meta`. The buy-low/sell-high shipping loop between books is dead
through those ports.

Fix: one canonical cargo list (rules.js, mirroring `SHIP_TYPE_ALIASES`, task 24)
with prefix matching applied at every entry point — trade-row parsing, manifest
writes, `matchCargo`, and ship-loss/transfer paths — plus a save sanitize that
canonicalises already-stored names. Test: buy `meta` at §4.252, sell `metals` at
a full-name port; `<if cargo="minerals">` sees a §5.447 unit; round-trip a save
holding `grai`. Web-only; stamp and run all sections.

---

## 128. A bare `ability=` disjunct on `<if>` is always true — §5.680 gives away the ring of ultimate power — HIGH (engine)

*(Filed 2026-07-16 from a fourth full repository review.)* `evaluateCondition`
ORs its recognized attributes (engine.js:191-192), and the `ability=` condition
with no `equals/greaterthan/lessthan` comparator defaults to `v > 0`
(engine.js:250) — always true, since abilities floor at 1. In JaFL an ability
condition without a comparator never matches, and in `<if tool="…" ability="…"
bonus="…">` the ability/bonus attributes belong to the *item pattern* (a
MAGIC+6 tool), not a standalone test (`IfNode.java:110`, :335-339).

The only live no-comparator ability `<if>` is the one that matters most:
§5.680's `<if tool="hyperium wand" ability="magic" bonus="6">…<goto
section="564"/></if>` — the always-true ability disjunct forces the branch open
with no wand, §5.564's `<lose item="hyperium wand"/>` removes nothing, and
Targdaz forges the ring of ultimate power (+2 Rank, +10 Stamina auras, task 44):
the entire Akatsurai tomb quest is skippable and the game's best item free.

Fix: a no-comparator `ability=` condition must not match (mirror JaFL), and when
an equipment selector (`tool=`/`weapon=`/`armour=`) is present, fold `ability=`/
`bonus=` into that selector's pattern instead of treating them as disjuncts
(`matchEquipment` already receives the element — engine.js:252-254). Test §5.680
with no wand (branch inert, "If not" live), with a plain hyperium wand vs the
MAGIC+6 one if distinguishable, and a regression that comparator forms
(`<if ability="rank" greaterthan=…>`, task 68) still work. Web-only; stamp and
run all sections.

---

## 129. Free fixed-amount `<rest stamina="N">` is infinitely repeatable — every hospitality rest heals to full — MEDIUM (render/engine)

*(Filed 2026-07-16 from a fourth full repository review.)* `renderRest`
(render.js:3706-3728) keeps the button clickable until Stamina is full, with no
per-visit memo. JaFL's `RestNode` defaults `useOnce = (shards == 0)`: an
**unpriced** rest may be used once per visit; only priced rests (pay per day)
repeat. The corpus never sets `once=`, so the Java default is the operative rule
everywhere.

Live: §2.61 ("you are allowed to stay **one night**", `stamina="2"`), §1.518
(+3), §1.614 (+5), §2.385/§2.519/§2.662/§3.153 (+1), §2.481/§2.677/§3.150
(`1d`), §2.739 (`2d`), §3.314's per-day `<rest stamina="1">` — all currently
click-to-full free heals.

Fix: memoize an unpriced rest per visit (`rest@path` in ctx, like other one-shot
actions); priced rests and the no-`stamina=` heal-to-full form (task 31) keep
their current behaviour. Test: §2.61 heals 2 once then disables until re-entry;
a priced rest still repeats; `<rest/>` still fills. Web-only; stamp and run all
sections.

---

## 130. Inline `<buy>` allows one purchase per visit; JaFL's default is unlimited — MEDIUM (render)

*(Filed 2026-07-16 from a fourth full repository review; adjusts a task-23
default.)* `renderInlineBuy` defaults `quantity` to 1 (render.js:3576); JaFL's
default is −1 = infinite (`TradeNode.java:319`; spec: quantity = "the number of
times this action may be used", absent ⇒ no limit). Task 23 chose 1 "so a buy
can no longer repeat forever", but three sections sell in bulk by prose:
§1.342 and §5.639 ("You can buy as many as you can afford — each one costs 50
Shards", six potions each) and §5.447 ("It costs you 350 … for every such Cargo
Unit"). Players must leave and re-enter per unit today.

Fix: default inline `<buy>` to unlimited-per-visit (disabled only by funds/
capacity), honouring an explicit `quantity=` as the cap — matching the reference
and the prose — and keep the §4.658-style `quantity="1"` rows one-shot. Test
§1.342: buy the same potion twice in one visit while affordable; §4.658's
barque still buys once. Web-only; stamp and run all sections.

---

## 131. Cache `max=` semantics: `max="0"` must bar deposits, and item caches must store Shards — MEDIUM (render)

*(Filed 2026-07-16 from a fourth full repository review; follow-ups to tasks
20/38.)* Two `max=` divergences from the spec ("Use '0' to bar money from this
cache"; "an `<itemcache>` may contain both" items and money — JaFL `CacheNode`
uses −1 as its no-limit default and renders a Shards field on item caches):

- `renderMoneyCache` treats `max="0"` as *no cap* (`if (max > 0)` —
  render.js:3764). §4.263's arena Winnings cache (`<moneycache name="4.127"
  text="Winnings" max="0"/>`) therefore accepts fresh deposits at the result
  section, and its sibling `<adjustmoney name="4.127" multiply="2">` becomes a
  repeatable **money-doubling exploit**: deposit anything, double it, withdraw.
  With `max="0"` honoured, only the bet locked in at §4.127 is doubled.
- `renderItemCache` (render.js:3793-3882) ignores `max=` entirely and offers no
  money controls, so §6.512's lacquer cabinet ("store up to 5000 Shards and six
  possessions", `<itemcache … itemlimit="6" max="5000"/>`) cannot hold Shards.

Fix: parse `max` with 0 = barred / absent = unlimited in both cache widgets, and
add deposit/withdraw money controls (capped by `max=`) to item caches. Test
§4.263: deposit refused, the ×2 still applies to the §4.127 bet; §6.512: deposit
5000 accepted, 5001st refused, items still capped at 6. Web-only; stamp and run
all sections.

---

## 132. `<if blessing="?">` never matches — §5.365's chapel stacks blessings — MEDIUM (engine/state)

*(Filed 2026-07-16 from a fourth full repository review.)* `evaluateCondition`
delegates to `state.hasBlessing('?')` (engine.js:229), which looks for a
blessing literally named "?" (state.js:630) — always false. JaFL maps `"?"` to
`MATCHANY_TYPE` (any blessing held). The only live use is §5.365: `<if
blessing="?">If you already have a blessing of any sort, he cannot give you
another.</if><else>…choose storm/disease/injury…</else>` — the `<else>` always
renders, so a player already blessed takes another, violating "only one blessing
at a time" (and, with task 123 unfixed, can hold several spellings at once).

Fix: special-case `"?"` (and `"*"` for symmetry with the item matcher) in
`hasBlessing` or at the condition site: any stored blessing matches. Test §5.365
blessed (menu blocked) and unblessed (menu live); `<lose blessing="?">`'s
existing chooser behaviour unchanged. Web-only; stamp and run all sections.

---

## 133. Adventure-Sheet mutations leave the story pane stale — item-gated choices stay live after the item is gone — MEDIUM (app/render/market)

*(Filed 2026-07-16 from a fourth full repository review.)* Choice gating is
render-time only: eligibility (incl. `hasItemMatch`) is computed when the choice
renders (render.js:2219), and the click handler's `payChoiceCost`
(market.js:198-203) never re-validates — a missing item is silently skipped
(`if (it) state.removeItemById(…)`) and navigation proceeds; `adjustMoney`
floors at 0 likewise. Sheet-initiated mutations only refresh the sheet:
`state.onChange` (app.js:522) never rerenders the story, and the Drop handler
(ui.js:163-168) and curse-lift (ui.js:240-263, task 112) mutate state directly —
unlike `onUseItem` (app.js:553-564), which already calls `story.rerender()`.

Repro: enter a section with `<choice item="X" pay="t">` (task 55's §2.400 green
gem / §6.740 rope) holding X; Drop X from the sheet; the choice is still
enabled — click it and cross for free. Curse-lift similarly leaves
`<if curse=>`-gated content stale on screen.

Fix (both belts): make `payChoiceCost` return success and block navigation when
the cost cannot be taken in full, and rerender the story after sheet-initiated
mutations (drop/move/lift) the way `onUseItem` does. Test: drop-then-click pays
nothing and refuses; the rerendered choice greys out; lifting a curse reveals
its gated content without re-entering. Web-only; stamp and run all sections.

---

## 134. Market sells with several candidates silently take the first match — MEDIUM (market)

*(Filed 2026-07-16 from a fourth full repository review as LOW; moved to MEDIUM
2026-07-20 — the wrong-possession sale is irreversible, the same severity logic
that moved task 118 to HIGH, and task 117/118's shared loss matcher it must
reuse is now done, so it is unblocked.)* `sellTrade` picks the
first ship of the type (market.js:122 — a **cargo-laden** ship can be sold,
destroying its cargo, while an empty same-type ship sits in the same berth), and
generic weapon/armour/item rows pick the first bonus/name match
(market.js:131/137). JaFL prompts ("You have multiple ships of this type.
Select one…", "Please select which one you want to sell") whenever matches are
non-identical. Any generic `<weapon bonus="1" sell=…>` row (e.g. §1.215) with a
mixed inventory, or any ship sale with two same-type ships, can take the wrong
possession irrevocably.

Fix: when candidates are non-identical, surface the same chooser UI the loss
path uses (tasks 93/107; open 117/118 build the shared matcher — reuse its
candidate enumeration), preferring cargo-empty ships and unnamed duplicates as
the no-prompt fast path. Headless callers keep first-match determinism via an
explicit chooser callback. Test: two brigantines (one laden) — sell offers a
choice / defaults to the empty one headlessly; two bonus-1 weapons — the named
one survives unless chosen. Web-only; stamp and run all sections.

---

## 135. Renouncing a god keeps that god's resurrection deal — LOW (state/engine)

*(Filed 2026-07-16 from a fourth full repository review.)* `removeGod`
(state.js:730-738) strips god-sourced effects but leaves `data.resurrections`
untouched; JaFL's `removeAGod` cancels resurrections tied to the god, and a deal
bought while *not* a worshipper is stored god-less (`Adventurer.java:518-534`,
:833-843 — the port stores `god` unconditionally, engine.js:1333-1336). Seven
live god-linked deals (§1.33/§1.478/§1.599 Tyrnai/Nagil, §2.41/§2.204/§2.316,
§4.268); renounce paths: `<lose god=>` (engine.js:567) and `special="godless"`
(§6.118, engine.js:809-811). A renouncer keeps a free extra life the rules
forfeit.

Fix: cancel resurrections whose `god` matches on renounce (both paths), and only
stamp `god` on a deal when the buyer worships that god at purchase time. Test:
buy the Tyrnai deal as a worshipper, renounce → deal gone; buy it godless →
renouncing anything leaves it. Web-only; stamp and run all sections.

---

## 136. Engine grab-bag #2: five small reference divergences — LOW (engine/render)

*(Filed 2026-07-16 from a fourth full repository review; precedent task 36.)*
Each verified against code, corpus and the Java reference; none shares a fix
seam with the others, all are a few lines:

1. **`<transfer shards="tenth">` hardcodes floor(purse/10)** (engine.js:972),
   shadowing §6.496's own `<set var="tenth" value="(shards+9)/10"/>` (rounded
   *up*). JaFL has no `tenth` keyword — delete the special case and let the var
   resolve; the tithe stops under-paying by 1 on non-multiples of 10.
2. **Named `<lose cargo="grain">` removes one unit; JaFL removes every unit** of
   the commodity (`LoseNode.java:600`). §5.634's salvage ("they are lost")
   leaves extras aboard. Remove-all for plain named losses only — §3.569's
   priced one-for-one exchange (open task 117) must stay single-unit.
3. **`<effect description="+5 Stamina">` is dropped** — `readItemEffects`
   (engine.js:1195-1216) reads only `text=`; §5.638 is the sole `description=`
   corpus-wide. Accept it as a `text=` fallback so the sheet shows the effect.
4. **`<set>` identifier edges**: `value="rank"` ignores `modifier="natural"`
   (engine.js:1275 always returns `rankValue()` incl. the ring's +2 aura) and
   the keyword shadows a same-named var — §2.270-style book 2 ceremonies
   (`<set var="rank" value="rank" modifier="natural"/>` then `lessthan="rank"`)
   misjudge ring-holders; and a **cursed** ability read under
   `modifier="natural"/"affected"` returns the `CURSED_ABILITY` −1000 sentinel
   (state.js:302-303) where JaFL's value-purpose read returns 0 — §6.332's
   `value="12-charisma"` would yield 1012 under a CHARISMA curse. Resolve
   value-context reads like JaFL (natural honours the modifier; cursed → 0).
5. **`<buy force="t">` is not forced** — §4.658's free barque ("Note it on your
   Adventure Sheet", the section's only ship) renders as an optional button a
   player can walk past; JaFL blocks onward execution while an enabled forced
   buy is pending. Gate the section's onward goto until the forced buy runs
   (the task-104 gate pattern).

Test each with a focused headless assertion (§6.496 tithe of 995 → 100; §5.634
with 2 grain → 0 left; §5.638 effect text visible; §2.270 with +2 aura ring —
natural rank compared; §6.332 under a charisma curse → 12−0; §4.658 goto gated
until the barque is taken). Web-only; stamp and run all sections.

---

## 137. A save blob can persist without its `fl_meta` entry — the orphaned slot turns invisible and gets overwritten — MEDIUM (state/app)

*(Filed 2026-07-16 from a fourth full repository review as LOW — the seam tasks
4/7 missed; moved to MEDIUM 2026-07-20 — silently overwriting a whole adventurer
is a high-consequence save-integrity loss (tasks 4/7/79 family), and it was
parked behind task 116, which rewrote the persistence schema and is now done, so
it is unblocked.)* `save()` writes `fl_save_<slot>` then `fl_meta` (state.js:866-887); if
the meta write throws (quota reached between the writes) the blob **is**
persisted while `nextFreeSlot()` (state.js:1247-1251), the title screen's
`hasSaves` (app.js:167-168) and the save list consult only `fl_meta` — the
adventurer vanishes from "Your Adventurers" and the next New Adventure or import
claims the slot and silently overwrites it. `loadSlotMeta` also degrades corrupt
meta JSON to `{}` wholesale, orphaning every slot at once; and `readSlotData`
(state.js:1216-1219) has no try/catch, so exporting a corrupt-but-present slot
throws uncaught from the click handler.

Fix: make `nextFreeSlot` (and the overwrite confirm) probe
`localStorage.getItem(SAVE_PREFIX + i)` as well as meta; on load, rebuild
missing meta entries from readable blobs; guard `readSlotData`. Test: delete the
meta entry for an occupied slot → the slot still lists (reconstructed) and is
not offered as free; corrupt blob → export fails with the task-7 toast, no
throw. Web-only; stamp and run all sections.

---

## 138. Offline navigations with a query string bypass the service-worker cache — LOW (sw)

*(Filed 2026-07-16 from a fourth full repository review.)* The fetch handler
uses `caches.match(req)` with no `ignoreSearch` (sw.js:99); the precache stores
`./` and `./index.html` without queries, so an offline navigation to
`./?demo=1.10` or `./?seed=42` (both documented hooks — README's deep-link
section) misses, `fetch` rejects, and the `.catch(() => cached)` fallback
(sw.js:107) returns `undefined` → a network-error page instead of the cached
shell. Installed launches (`start_url: "./"`) are unaffected.

Fix: for navigation requests, fall back to `caches.match(req, { ignoreSearch:
true })` (or explicitly to `./index.html`). Test in the harness by faking a
query-string navigation against the cache contract, and manually: install,
offline, open `?seed=1`. Web-only; stamp and run all sections.

---

## 139. The Adventure Sheet never shows foreign-currency balances — LOW (ui)

*(Filed 2026-07-16 from a fourth full repository review; completes task 40.)*
`renderSheet` (ui.js:79-228) shows Shards only; `state.data.currencies`
round-trips saves (state.js:1075-1076) but surfaces nowhere outside a
same-currency market/choice widget. Sell a boar's tusk for 15 Mithral at §2.495
and the wealth is invisible until the player happens into another Mithral
widget (§2.545 toll) — a paper-sheet player would have it written down.

Fix: list non-zero foreign balances under the Shards line (name + amount, same
styling as ability rows). Test: adjustCurrency('Mithral', 15) → sheet shows
"Mithral 15"; zero balances hidden. Web-only; stamp and run all sections.

---

## 140. Docs/CI accuracy: AGENTS.md's smoke-test URL 404s and the CI grep misses `RESULT FATAL` — HIGH (docs/ci)

*(Filed 2026-07-16 from a fourth full repository review as LOW; moved to second
position the same day, on the same logic as task 141: zero-risk, no
dependencies, and it corrects the build-and-test instructions every subsequent
task follows — the misleading docs should be fixed before the burn-down, not
after.)* Two verified
discrepancies that mislead exactly when something is failing:

- AGENTS.md says "serve from the repo root" then drives Chrome at
  `http://localhost:8848/_test.html` — a 404 from a root-rooted server (the file
  is at `/web/_test.html`), producing the "no RESULT line" symptom the same doc
  then misattributes to "server/Chrome never loaded the page". CI (smoke.yml:38)
  uses the correct `/web/_test.html`. README's Testing section is internally
  consistent (serve `web/` itself) but disagrees with AGENTS.md's serving
  directory — align both on one recipe (serve repo root, test at
  `/web/_test.html`) and fix the misattribution note.
- smoke.yml:41 greps `RESULT (ALL PASS|FAILURES) …` — the task-82 bootstrap's
  `RESULT FATAL pass=0 fail=1` line (_test.html:17) is unmatched, so a module
  parse failure prints CI's "(no RESULT line — the suite did not run)": the
  precise misleading diagnosis task 82 was built to eliminate (the job still
  fails, via the ALL PASS check). One-line pattern fix; add a FATAL branch with
  its own message.

Docs/CI-only; no stamp needed; run the suite once to confirm the documented
commands work as written. *(Related but filed separately: task 121 owns the
`powershell` vs `pwsh` build-command question — keep the two consistent.)*

---

## 141. Archive completed task details out of TASKS.md — HIGH (process)

*(Filed 2026-07-16 from a fourth full repository review as LOW; moved to the top
of the list the same day: it is zero-risk cut-and-paste, has no dependencies,
and every subsequent task pays the cost of reading this file — do it first.)* TASKS.md is ~290KB /
4,500+ lines and ~88% of it is detail sections for the 100+ **done** tasks; the
workflow makes every agent read the file each task, and new open details land
thousands of lines deep. Move the done detail sections verbatim to
`TASKS-archive.md`, keyed by the same stable task numbers; keep in TASKS.md the
header, the full checklist (open **and** done lines unchanged — they are the
stable IDs commit messages reference), the open-task detail sections, the Review
log, and a one-line pointer to the archive. Invariants: task numbering stays
stable, new filings still append to TASKS.md, the Review log stays in the main
file, and a moved section is never edited in transit (pure cut-and-paste).
Docs-only; no build or test impact; verify by grepping a sample of done task
numbers in both files (checklist line in TASKS.md, detail in the archive).

---

## 142. CI's smoke verdict greps the whole DOM dump — failing runs are misdiagnosed as bootstrap FATALs — LOW (ci)

*(Filed 2026-07-19 from a fifth full repository review; the residue of task
140's fix.)* smoke.yml decides the outcome with `grep -q 'RESULT ALL PASS'` /
`elif grep -q 'RESULT FATAL'` over the whole dumped DOM (smoke.yml:68/70) — but
`--dump-dom` includes _test.html's inline script SOURCE, which contains the
literal `RESULT FATAL pass=0 fail=1` (the bootstrap's provisional-fatal string,
_test.html:27). On any genuinely failing run the ALL PASS check misses, the
FATAL check matches that source string, and CI prints "aborted before running
(module parse/bootstrap error)" — a wrong diagnosis for an ordinary assertion
failure (the job still exits 1, so nothing false-passes today). Verified
against a real dump: a passing dump matches `RESULT FATAL` via the source
literal, and sed-flipping the live result line to FAILURES routes the verdict
to the FATAL branch. The dual risk: any future page comment containing
`RESULT ALL PASS` would make failing runs pass. Fix: compute the verdict from
the FIRST extracted result line — the display grep at smoke.yml:67 already
computes exactly this; capture it in a variable and case on it. CI-only; no
stamp; verify the branch logic against a passing dump and a hand-flipped one.

---

## 143. A failing `ok()` fired after the report is silently lost — LOW (tests)

*(Filed 2026-07-19 from a fifth full repository review; same family as task
120's async gaps a/b.)* The sticky-fatal bootstrap flips the aggregate for
thrown errors and unhandled rejections that arrive after report()
(_test.html:17-31), but a plain failing `ok()` fired from un-awaited async work
after the reporter has printed only mutates counters and an `out` array nobody
re-reads (_test.html:55-58) — the title stays TESTS_OK and the RESULT line
stays ALL PASS. No suite currently asserts after its `run()` resolves, so this
is latent, but it is the one remaining silent-pass vector in the harness. Fix:
set a `reported` flag in report() and make `ok()` route a post-report failure
through `flFatal` (or re-render the report). Dev-only — _test.html is excluded
from the stamp; run the suite once.

---

## 144. meta.json embeds the build date — a no-op rebuild busts every installed player's cache — LOW (build)

*(Filed 2026-07-19 from a fifth full repository review.)* build-data.ps1:217
writes `generated = (Get-Date).ToString('yyyy-MM-dd')` into meta.json; nothing
in web/js reads the field (verified by grep). stamp-version.ps1 hashes
`web/data/*.json` (stamp-version.ps1:39), so rebuilding with UNCHANGED
books/rules on a later day still changes meta.json → new stamp → new
service-worker cache key → every installed PWA re-downloads the entire
precache (all six book JSONs + assets) for a byte-identical app. It also makes
"did the data rebuild change anything?" unanswerable from `git status`. Fix:
drop the field, or derive it from content (e.g. the corpus hash). Build-only;
verify by rebuilding twice — the second run must leave `web/data/` and
`version.js` byte-identical.

---

## 145. payChoiceCost validates a tag/wildcard item payment it can never consume — LOW (market, latent)

*(Filed 2026-07-19 from a fifth full repository review.)* `payChoiceCost`
gates on the tag-aware `hasItemMatch(item, itemTags)` but consumes via the
name-only `findItems(item)[0]` (market.js:204-211), and `matchItems` treats
`?` as a literal name (state.js:1241-1248). A paid `<choice item="?"
tags="…">` would validate, deduct any Shards cost, then silently skip the item
consumption (`if (it)` guards the undefined lookup). Latent: the corpus holds
only two paid item-choices, both concrete names, no tags/wildcards (verified
by grep) — but the checker/taker disagreement is one data update from live,
and the same call shape serves every future paid choice. Fix: consume via
`matchItemQuery(state.data.items, item, itemTags)[0]` so both sides share one
matcher. Web-only; unit assertion in suite-economy; stamp and run all sections.

---

## 146. A roll's dice animation leaves other controls live — the pending result lands on the wrong visit — MEDIUM (render/ui)

*(Filed 2026-07-19 from a fifth full repository review — renderer sweep;
verified against the code by a second reader.)* `rollButton` disables only
itself, awaits the ~560ms `animateDice`, then runs `onRoll`
(render.js:2598-2608; ui.js:6-29). Only a mandatory `<random>`→`<outcomes>`
roll gates navigation, so during the animation the section's other navs stay
clickable: click Train/Attack, then a live choice within ~0.6s, and
`Story.navigate`→`begin()` swaps `this.ctx` BEFORE the pending `onRoll`
executes. `rollTraining`/`fightRound` then mutate state after the player has
left the section, `this.ctx.rolls.set('roll@'+path, …)` writes the stale
result into the NEW visit's memo (a node at the same positional path renders
as already-rolled with the old result), and the autosave persists all of it.
The onRoll closures (e.g. render.js:2591-2593) resolve `this.ctx` at
post-await execution time; nothing compares it to the click-time ctx. The
suite can't see this — `__FL_INSTANT_DICE__` collapses the window. Fix:
capture the ctx when the roll is clicked and bail from `onRoll` when
`this.ctx` differs (belt: disable the pane's other controls during the
animation). Test with a fake delayed `animateDice`. Web-only; stamp and run
all sections.

---

## 147. Navigation has no in-flight guard — a double-click double-runs leave hooks and entry effects — MEDIUM (app/render)

*(Filed 2026-07-19 from a fifth full repository review — renderer sweep;
verified against the code by a second reader.)* Goto/choice buttons are never
disabled on click and `app.navigate` awaits `data.getSection` with no
re-entrancy token (app.js:586-600), while the `Story.navigate` wrapper runs
frame capture + leave hooks synchronously PER CLICK (render.js:149-162,
214-227). Same-book the await is a microtask, but a cross-book goto fetches an
entire book JSON — hundreds of ms cold. A double-click in that window: (1) the
leave hooks run twice — `_sailExempt` is consumed by the first pass, so the
second re-applies `applyTodock` and the ship you just sailed with is docked
back at the departure port; (2) both fetches resolve, so `state.goTo` runs
twice — `turns` double-counts and history gains a self-entry
(state.js:872-878); (3) `begin()` runs twice with a fresh ctx each time, so
the destination's on-entry `<lose>`/`<gain>`/`<tick>` apply twice. Related
wart: the hooks fire before the fetch is known to succeed, so a missing
section (app.js:589-592 toasts and returns) leaves the player in a section
whose todock already fired and whose `_returnFrame` was overwritten. Fix: an
in-flight flag in `app.navigate` that ignores clicks until `begin()` completes,
and/or defer the leave hooks until the section element has resolved. Web-only;
stamp and run all sections.

---

## 148. undo() leaves a stale return frame — a post-undo `<return>` re-enters a pre-undo visit — LOW (app/render)

*(Filed 2026-07-19 from a fifth full repository review — renderer sweep.)*
`app.undo` calls `story.begin(el, …)` directly (app.js:602-613) and `begin()`
never touches `this._returnFrame`, so the frame captured when the PRE-undo
timeline left its previous section survives the undo. If the section the
player lands in via undo carries a `<return>`, `goBack()`
(render.js:2023-2042) consumes the stale frame: `restoreReturn` pops a
legitimate history entry and re-hydrates the visit with a pre-undo ctx/vars —
rolls the undo reverted render as resolved. Verified by enumerating the
`_returnFrame` writers (navigate wrapper, goBack, resume, resumeStale) — undo
is the one entry path that doesn't reset it. Fix: null `story._returnFrame` in
`app.undo`, and audit `handleDeath`'s load/new paths for the same gap.
Web-only; stamp and run all sections.

---

## 149. A priced sail choice pays before the ship chooser — an abandoned chooser eats the payment — LOW (render)

*(Filed 2026-07-19 from a fifth full repository review — renderer sweep.)*
`payChoiceCost` deducts the Shards / consumes the item, and only THEN, for
`sail="t"` with two or more ships at the dock, `sailThenGo` shows the
which-ship picker (render.js:2342-2347, 1995-2013). Dismiss the picker — or
let a task-133 sheet-change rerender rebuild the pane — and the payment is
gone with nothing memoized as paid: the re-rendered choice charges again. The
same shape exists at render.js:1975-1983, where a storm-guarded goto spends
the blessing (`useBlessing`) before its chooser. Requires a priced sail choice
with multiple ships docked, so rare — but a real money/blessing leak. Fix: run
the chooser first and commit cost + blessing inside the final `go()`.
Web-only; stamp and run all sections.

---

## 150. renderIfChain's list path runs `<else>`/`<elseif>` unconditionally — LOW (render, latent)

*(Filed 2026-07-19 from a fifth full repository review — renderer sweep.)*
When if/elseif/else reach the renderer through `renderElement` — which happens
only from `appendChildrenList` (choice labels, render.js:2357-2363) and
`renderGroupWithRoll`'s child loop (render.js:1143) — `<else>` renders (and
applies effects) unconditionally and `<elseif>` evaluates independently of
whether its `<if>` matched (render.js:974-988), diverging from the correct
chain walker at render.js:583-607. Corpus-verified unreachable today: no
`<else>`/`<elseif>` inside `<choice>` or `<group>`, and no `<if>` inside
`<choice>` at all — but it is a second, wrong implementation of the chain
semantics sitting one data update from live. Fix: route those two call sites
through the real chain walker, or make the `renderElement` path treat non-`if`
chain members as inert. Web-only; stamp and run all sections.

---

## 151. The dead-end fallback counts disabled controls — an unaffordable forced payment can softlock — LOW (render)

*(Filed 2026-07-19 from a fifth full repository review — renderer sweep.)* The
"accept your fate" fallback filters candidate controls only by
`.cond-inactive`, not `disabled` (render.js:480-488). A forced economic
payment sets `this.blocked`, so nothing after it in document order renders
(render.js:1573-1612); if the player cannot afford the cost, the Pay button
renders disabled — and the fallback counts that disabled button as a way
forward and stays hidden, leaving only Undo. No live corpus section was proven
(whether a decline exit ever sits after its payment was not exhaustively
checked), so this is filed as a robustness fix to the fallback predicate: also
require `!c.disabled`, taking care not to fire during live fight/roll gates
(their Attack/Roll buttons are enabled anyway). Web-only; stamp and run all
sections.

---

## 152. View-layer polish grab-bag #1 — LOW (render/app/tts)

*(Filed 2026-07-19 from a fifth full repository review — renderer sweep; each
verified individually, none player-visible beyond the noted edges.)*
- `begin()` re-implements visit-state's `rebuildVisitScaffold` inline
  (render.js:258-273 vs visit-state.js:65-78; the latter's comment documents
  the drift risk) — call the shared helper plus the lock-flag reset pass.
  *(Also noted on task 119 — whichever lands first takes it.)*
- `showGameMenu`'s `close()` removes the overlay behind `modal()`'s back, so
  the modal's promise never resolves (app.js:706-707) — harmless today; give
  `modal()` a programmatic close/resolve handle.
- `startDemo` with a bad spec (`?demo=9.99999`) builds the game screen, toasts
  "Section not found", and strands a blank story pane (app.js:51-59) — return
  to the title screen instead.
- `Narrator.stop()` ends in `if (was) this._emit(); else this._emit();` — a
  dead branch (tts.js:136-142); and `handleRerender` leaves `this.chunks`
  referencing the previous section's detached DOM until the next `play()`
  (tts.js:24/105) — clear it.
- `runBuyNode` duplicates `renderInlineBuy`'s buy-option parsing
  (render.js:1180-1193 vs 3481-3489) — extract one DOM-free
  `buyOptions(node)` helper (natural home: market.js) used by both.
Web-only; stamp and run all sections.

---

## 153. Accessibility quick wins: live regions and dialog semantics — LOW (ui)

*(Filed 2026-07-19 from a fifth full repository review — renderer sweep.)*
Screen readers never hear toasts — codeword gained, save failed, blessing
spent — because the toast host has no live region (ui.js:33-40): one line,
`aria-live="polite"`. `modal()` lacks `role="dialog"`/`aria-modal`, never
moves focus into the dialog (Tab reaches the obscured background), and ignores
Escape even when dismissable (ui.js:51-76) — focusing the primary button plus
an Escape handler is ~6 lines; a full focus trap can wait. Roll results and
the fight log replace content with no live region — `aria-live="polite"` on
the `.roll` widget and fight log, one line each. Icon buttons, curse-lift
buttons and the theme toggle already carry proper labels (checked clean).
Web-only; stamp and run all sections.

---

## 154. begin() autosaves the NEW section paired with the OLD visit ctx — resume aliases foreign memos onto the new section — HIGH (render/state)

*(Filed 2026-07-19 from a fifth full repository review — engine/state sweep;
premise re-verified line-by-line by a second reader. The systemic follow-up to
task 116: the persisted visit record is not atomic with the live visit; tasks
155/156 share the cause and likely the fix.)* `begin()` sets `this.section`
to the NEW section (render.js:234), then calls `clearPotionBonuses()`,
`clearFightBonuses()`, `clearVars()` and `arriveAtDock()` (237-249) — each of
which fires `changed()` → `save()` → the visit provider — while `this.ctx` is
still the PREVIOUS section's ctx (replaced only at render.js:252) and the
entry-tick snapshot is still the old one (reset later still). The persisted
record passes `sanitizeVisit`'s section-match guard and `resumeOrBegin`'s
check (app.js:638) while carrying a foreign memo, and `clearVars()` fires
after virtually every roll-bearing section, so the malformed record is written
on almost every navigation — corrected only by the NEXT save, which in a
section with no passive entry effects never comes until the player acts. Close
the tab (or hit the SW `controllerchange` reload) during such a visit and
`resume()` rebuilds the visit from the old ctx: positional keys (`fx@…`,
`roll@…`, `buy@…`, fights, stock) alias onto the new section's nodes — rolls
and fights appear pre-resolved with the wrong result, one-shot actions appear
consumed (or their memos vanish), and the `<if ticks=>` baseline is wrong.
Sub-defect in the same seam: `arriveAtDock` (state.js:825-837) mutates
`data.location` WITHOUT `changed()` when no ship berths and no voyage ends,
so a reload during a save-free visit restores a stale location into
`shipsHere()`/`currentShip()` (the task-73/89 locality rules). Fix direction:
make the record atomic with the visit — swap in the fresh ctx + entry ticks
BEFORE the state-clearing calls, or suppress/defer the provider until
`begin()` completes and force one save at its end; and make `arriveAtDock`
call `changed()` whenever `data.location` actually changes. Web-only; needs a
focused resume test (save mid-begin ordering) in suite-actions; stamp and run
all sections.

---

## 155. One-shot memos are written after the state mutation they guard — a reload repeats rests, buys, and failed rolls — MEDIUM (render/state)

*(Filed 2026-07-19 from a fifth full repository review — engine/state sweep;
rest-handler ordering re-verified by a second reader. Shares task 154's
systemic cause; re-opens 129/130 via save-scumming.)* The autosave fires from
INSIDE the state mutation (`applyRest` → `healStamina` → `changed()`), but the
ctx memo is added only after it returns — and ctx mutations never trigger a
save: rest at render.js:3608-3611 (`applyRest` then `ctx.applied.add(memo)`),
inline buy at render.js:3482-3492, roll handlers at render.js:2404-2405,
2428-2429, 2507-2508, 2520-2521, 2544. The last persisted record therefore
says the action never happened while its state effects ARE saved. Concretely:
click a task-129 hospitality rest, reload → the rest is live again (infinite
heal restored via reload); buy §4.658's `quantity="1"` barque, reload → a
second barque; fail a `<difficulty>` roll whose var write was the only save,
reload → free reroll. The passive-effect path already does this correctly —
`ctx.applied.add(key)` BEFORE `applyEffect` (render.js:1391-1392) — so the fix
is that ordering in the click handlers, or a deferred end-of-handler save
(which would also close 154). Web-only; focused reload assertions per handler
family; stamp and run all sections.

---

## 156. A mid-visit reload silently drops armed `<tick special="attack|defence">` bonuses and penalties — MEDIUM (render/state)

*(Filed 2026-07-19 from a fifth full repository review — engine/state sweep.
Task 116's regression on task 49; shares 154's cause.)* `_fightBonus` is
deliberately transient ("never survives a save", state.js:141-147, 287-304) —
safe when a reload re-ran `begin()` and re-applied the granting tick. After
task 116, `resume()` restores `ctx.applied` (the `fx@` memo says the tick
already ran) onto a fresh `GameState` whose `_fightBonus` is zero, and nothing
re-applies it (render.js:355-365). Combat autosaves every round, so mid-fight
reloads are normal. Live both ways: §1.42/§1.145/§1.247/§1.428 rat poison +3
(item crossed off, paid bonus gone), §4.434 +4 Defence, §6.183 — and
exploitably §1.238/§6.624 (`<tick special="attack" bonus="-2" hidden="t"/>`:
reload to shed the penalty). Fix: persist the per-fight bonus in the visit
record (it is per-visit state — exactly what the record is for) or re-apply
special ticks on resume. Web-only; resume assertion in suite-combat; stamp and
run all sections.

---

## 157. Item-name glob patterns never match — §4.482/§6.201 unreachable, §6.144's trophy head never taken — MEDIUM (state/engine)

*(Filed 2026-07-19 from a fifth full repository review — engine/state sweep;
§4.482's pattern re-verified in source by a second reader.)* `matchItems`
compares exact normalized names/tags only (state.js:1241-1248); JaFL
wildcard-matches item names (java-engine/flands/Item.java:425-432), and the
port itself already globs equipment (`globMatch`, engine.js:315-319) — item
names were just never routed through it (`matchItemQuery`'s comment even
claims "name/glob", state.js:1250-1255). Live triggers, each verified against
granted items in the corpus: §4.482 `<if item="*flute|*whistle">` never true
(flute/silver flute/centaur flute/enchanted flute exist) — the §632 shortcut
is unreachable and flute-owners must sing; §6.201 `<if item="*mask">` never
true (courtier's mask, dragon mask) — §248 unreachable; §6.144 `<lose
item="* head">` removes nothing (dead head, ghoul's head, severed head…) —
the handed-over trophy survives and can be reused. Fix: route `matchItems`'
name comparison through the shared `globMatch` (moving it to state.js/rules.js
to avoid an import cycle). Web-only; unit tests for the three patterns; stamp
and run all sections.

---

## 158. Two written-max Stamina clamps still strip aura headroom — MEDIUM (state/engine)

*(Filed 2026-07-19 from a fifth full repository review — engine/state sweep.
Task 124's remaining siblings.)* Task 124 fixed load/import; two more clamps
remain: (1) `adjustAbilityStamina` (state.js:531-540) clamps current Stamina
to the WRITTEN `staminaMax`, where JaFL moves natural/affected/current
together with no upper clamp (Adventurer.java:283-297) — a
ring-of-ultimate-power holder at 30/20 who hits any `<gain|lose
ability="stamina">` (72 nodes corpus-wide; ~18 files in books 5-6 where the
ring is held) silently loses up to 10 Stamina. (2) `applyRest`'s
restore-to-full form heals BY `staminaMax` clamped to the effective max
(engine.js:1449-1451), so a ring-holder below 10 ends below full (1 → 21 of
30) where JaFL's missing-stamina rest is heal-to-affected (RestNode +
StaminaStat.heal) — pass the effective max instead. Noted, not in scope:
`adjustStaminaMax` (state.js:551-555) shares the clamp but is dead code (no
callers). Web-only; aura-holder assertions for both paths; stamp and run all
sections.

---

## 159. Resurrection revives at half Stamina — the book and JaFL both say full — MEDIUM (engine/app)

*(Filed 2026-07-19 from a fifth full repository review — engine/state sweep;
the half rule predates task 34 — moved verbatim from app.js, never checked
against the reference.)* `reviveWithResurrection` sets `stamina = max(1,
floor(staminaMax/2))` (engine.js:1468-1474). JaFL `Resurrection.activate()`
is documented "Heals the player entirely" and heals to full
(java-engine/flands/Resurrection.java:41-46), and the book agrees — §1.640:
"Your Stamina is back to its normal score." Also uses the written max (task
158's aura issue — use the effective max). Secondary, same seam: with several
deals held, JaFL lets the player CHOOSE which resurrection to use; the port
consumes `resurrections.shift()` and the death modal shows only
`resurrections[0]` (app.js:658) — a supplemental boon (task 98) bought before
a standard deal is consumed in the wrong order. *(Distinct from open task 135,
which owns renounce/god-linkage.)* Web-only; death-flow assertion in
suite-engine; stamp and run all sections.

---

## 160. Loss-matcher follow-ups: named equipment losses never filter by name; `losePaymentPlan` ignores `multiple=` — LOW (engine, latent)

*(Filed 2026-07-19 from a fifth full repository review — engine/state sweep;
both latent, both verified un-triggered in the current corpus.)* (1)
`loseEquipmentCandidates` (engine.js:694-705) filters by bonus/tags/using but
never by the name pattern, so a future `<lose weapon="oaken staff">` would
enumerate ALL weapons — and `applyKeepRule`'s "explicit named handover may
take a kept item" branch (engine.js:1012-1018) is reachable only through this
unfiltered path, so the first named equipment loss would misbehave twice over.
Every equipment loss in all six books today is `?`/`*` (verified by grep). (2)
`losePaymentPlan` (engine.js:742-766) treats `eligible` as "any candidate",
ignoring `multiple=` quantity, and `applyLose` arms the price flag when ANY
item was taken (engine.js:626-634) — task 117's spec says the plan must cover
required quantities; `multiple=` and `price=` never co-occur today (the 12
`multiple=` nodes are all unpriced). Fix both inside the shared task-117
matcher: apply `matchItems`/`globMatch` to the spec before the keep rule, and
make the plan quantity-aware. Web-only; unit tests with synthetic nodes; stamp
and run all sections.

---

## 161. Visit transitions can persist a destination position with the source visit memo — reload drops exact return/undo state — HIGH (state/app/render)

*(Filed 2026-07-21 from a sixth full repository review; follow-up to tasks 110,
116, 154 and 155.)* The persisted game position and the persisted `Story` visit
are still not committed as one transition. `app.navigate()` calls
`state.goTo()` before `story.begin()` (app.js:594-605); `goTo()` autosaves while
the Story still names the source section. `begin()` establishes the correct
destination identity before any *possible* entry autosaves, but ends with only
`this.render()` (render.js:247-300). A prose-only destination can therefore make
no second save at all, leaving `{data: destination, visit: source}` on disk.
`sanitizeVisit()` rejects that mismatch on load (state.js:1091-1108), so the
conservative stale-resume path loses the exact ctx and one-level return frame.
This is live for pure/no-save `<return>` destinations including §4.69,
§5.410 and §6.448a: reload before returning falls back to a fresh source visit,
re-opening the task-110 class of repeated entry effects, lost rolls and history
bounces.

The reverse transition has the same ordering flaw. `goBack()` clears the frame
and calls `state.restoreReturn(frame)` — which autosaves — *before* replacing
`Story.book/section/ctx` with the restored source (render.js:1025-1043). Its
saved record therefore pairs the restored state position with the detour's visit
and remains mismatched because the final render does not save. `undo()` likewise
autosaves before its awaited section load and correcting `begin()`.

Make position + visit changes atomic at every entry path: ensure a successful
`begin()`/stale migration always persists the fully-established destination
visit, and make return/undo save only after the Story identity, ctx, frame and
state position agree. Also audit the navigation wrapper's slow cross-book fetch
window: it applies leave hooks and installs the new return frame before the raw
router has resolved the destination, but does not persist that coherent source
state itself. Prefer one explicit transition commit over relying on incidental
entry effects to call `changed()`. Add save-slot round trips for (1) A → a
prose-only B with `<return>`, (2) B → return to A with A's resolved roll/action
memo intact, and (3) undo to a save-free section; assert every written visit's
identity matches `data.book/section`. Web-only; stamp and run all sections.

*Done 2026-07-21:* made every entry path commit position + visit atomically, in
render.js:
- **begin()** now ends with an explicit `this.state.save()` (the "one explicit
  transition commit"). goTo()/undo() set the position and autosave while the Story
  still names the source, and begin()'s state-clearing calls only save
  incidentally — so a prose-only destination previously made no coherent save,
  leaving `{data: destination, visit: source}` on disk. The commit persists the
  fully-established destination visit. This also cures undo() (its correcting
  begin() now commits) with no app.js change.
- **resumeStale()** ends with the same commit, so a legacy/rejected-record
  migration persists its adopted ctx immediately rather than leaving the stale
  record until the next action.
- **goBack()** now restores the Story identity (book/section/sectionEl/ctx/frame/
  todock) BEFORE `restoreReturn(frame)`, whose `changed()` autosaves — so that
  save pairs the restored source position with the source's own ctx and a null
  frame (coherent), instead of the detour's still-live visit. `_applyLeaveHooks()`
  still runs first so it reads the detour's todock.
- **serializeVisit()** gained an atomicity guard: it returns null whenever the
  Story identity disagrees with the persisted `data.book/section` (the transient
  goTo/undo/restoreReturn window) — so no mismatched record is *ever* written; the
  transition's own commit writes the coherent one the instant they agree.
- Audited the navigate wrapper: its leave-hook todock save and the source's own
  return frame keep the on-disk record a coherent source visit throughout the slow
  cross-book fetch; the new destination frame is in-memory only and is committed by
  begin(). Documented, no behaviour change.
Added three save-slot round-trip tests to `suite-actions` (task 161-1/2/3) driving
the full wrapper/goBack/undo seams and asserting every persisted record's identity
matches its position. Smoke `RESULT ALL PASS pass=1480`; focused `suite=actions`
also green.

---

## 162. Continuing combat redraws without persisting the updated fight memo — reload rewinds the round — MEDIUM (combat/render/state)

*(Filed 2026-07-21 from a sixth full repository review; follow-up to tasks 116,
155 and 156.)* A fight is part of `Story.ctx`, not `GameState.data`. A continuing
single round mutates enemy Stamina, log and reroll flags in `fightRound()`, then
calls `drawFight()` directly (render-combat.js:310-332); a continuing group round
does the same through `drawGroupFight()` (lines 151-171). Neither path calls
`story.rerender()` or `state.save()`. If the player wounds the enemy and every
enemy misses, no persistent state mutation occurs at all, so reload restores the
enemy's pre-round Stamina. If an enemy hits, its `damageStamina()` autosave lands
*during* the round and captures only a partial fight/log. The direct-redraw
COMBAT-reroll and blessing branches (lines 199-243 and 359-397) have the same
ordering problem; notably `rerollAttack()` consumes/saves the blessing before it
records the retry result.

Persist the visit after every completed combat action, once all fight and player
mutations are final, without forcing a full section render merely to save. Keep
the existing full rerender for win/lose/death so navigation gates still
re-evaluate. Add deterministic single- and group-fight tests where the player
damages a surviving foe and the replies miss, then inspect the provider-written
visit record and resume it into a fresh state; cover a continuing COMBAT blessing
retry too. The restored enemy Stamina, log and once-per-round flags must exactly
match the live widget. Web-only; stamp and run all sections.

*Done 2026-07-21:* a fight already rides in `story.ctx.fights`, which
`serializeVisit` persists — the gap was only that the eight continuing-round
handlers in render-combat.js (single + group: attack, COMBAT reroll, Divine
Wrath, Defence through Faith) redrew the widget directly without persisting. Each
now calls `story.state.save()` immediately after its continue-redraw, once all
fight + player mutations are final — no full section render (win/lose/fled/death
still take `story.rerender()`, which saves, so the navigation gates re-evaluate).
The reroll case notably re-persists after the retry result is recorded, correcting
`rerollAttack()`'s pre-retry blessing autosave. Added deterministic single- and
group-fight tests to `suite-combat` where the player wounds a surviving Combat-0
foe (so the replies always miss and no incidental `damageStamina` autosave can
mask the fix), plus a continuing COMBAT-blessing retry: each inspects the
provider-written visit record, resumes it into a fresh state, and asserts the
restored enemy Stamina/log/once-per-round flags match the live widget exactly.
Smoke `RESULT ALL PASS pass=1493`; focused `suite=combat` also green.

---

## 163. Post-refactor module/docs cleanup: break the roll/choice cycle and align the architecture contract — LOW (architecture/docs)

*(Filed 2026-07-21 from a sixth full repository review — organization pass.)*
Task 119 produced a much healthier renderer split, but left one direct ES-module
cycle: `render-rolls.js` imports `renderChoices`, while `render-choices.js`
imports `renderBranch`. It currently works because both are function exports used
only after module initialization, but it makes two view modules order-coupled and
turns future top-level setup into a temporal-dead-zone risk. Route nested content
through the Story dispatcher or extract the genuinely shared branch/choice seam;
do not move rules back into the views.

Align the written contract with the implemented (reasonable) design. AGENTS.md
still says game logic lives only in `engine.js`, `combat.js`, `market.js` and
`state.js`, while README.md correctly identifies DOM-free rule planners in
`render-rules.js` and `render-gates.js` (plus visit state in `visit-state.js`).
Either include those planners in the invariant or relocate/rename them; the
simpler choice is to state that rule logic belongs in *DOM-free rule modules*,
and view construction in `render*.js` view modules. During the same surgical
cleanup remove the accidental empty class field `f` at render.js:208; correct the
stale "revive at half Stamina" comments in `render-rewards.js`/`render-rules.js`
after task 159; correct `state.js`'s claim that combat already autosaves every
round; and change both build scripts' embedded example commands from Windows
`powershell` to required `pwsh` (their `#Requires` guards are already right).
No production redesign beyond breaking the cycle. Stamp and run the focused
render/actions suites plus the full smoke test.

*Done 2026-07-21:* surgical grab-bag, no production redesign.
- **Cycle broken:** `render-rolls.js` no longer imports `renderChoices` and
  `render-choices.js` no longer imports `renderBranch`; the two mutually-recursive
  view functions now reach each other through two thin Story-facade methods
  (`dispatchBranch`/`dispatchChoices` in render.js, which already imports both).
  Neither view module imports the other (or render.js), so the ES-module cycle is
  gone with no rule logic moved into a view.
- **Contract aligned:** AGENTS.md's "Architecture invariant" now names the DOM-free
  rule modules as the core four **plus** `render-rules.js`/`render-gates.js`/
  `visit-state.js`, and calls out the `render*.js` view modules — matching README
  and the implemented design.
- **Stale bits fixed:** removed the accidental empty class field `f` in render.js;
  corrected the "revive at half Stamina" comments in render-rewards.js/render-rules.js
  to "full Stamina (task 159)"; updated state.js's mid-fight comment to reflect that
  combat now persists every round (task 162); and changed both build scripts' embedded
  example commands from `powershell` to `pwsh` (the `#Requires` guards were already
  right; both scripts still parse with zero non-ASCII bytes).
No new files (facade methods only), so sw.js/README module tables are unchanged.
Focused render/actions/combat suites + full smoke `RESULT ALL PASS pass=1493`.

---

## 164. Focused test suites still import the old whole-harness dependency set and boot unrelated app code — LOW (tests/organization)

*(Filed 2026-07-21 from a sixth full repository review — organization pass;
follow-up to task 120.)* The suite extraction copied the original harness import
block into nearly every `web/tests/suite-*.js`. Most suites consequently import
engine, combat, market, renderer, TTS, UI and `app.js` whether they use them or
not. The clearest case is the 31-line corpus suite: it uses only `data`,
`GameState` and `Story`, but imports nine modules and dozens of symbols. Its
unused `renderStatic` import evaluates `app.js`, whose module tail calls `boot()`
when `#app` exists, so `?suite=corpus` performs unrelated metadata, service-worker
and title-screen work. A focused suite can therefore fail from a subsystem it
does not test, and the import lists obscure its real ownership.

Prune every suite to the symbols it actually uses and verify that no suite needs
the side-effectful app entry module merely for a helper. If `renderStatic` needs
isolated testing, move that pure formatter to an import-safe UI module or expose
an explicit no-boot entry rather than weakening `app.js`'s production boot.
Keep fixtures local unless two or more suites truly share a stable helper; this
task is dependency hygiene, not a test-framework rewrite. Run every suite alone
via `?suite=<name>` and then the aggregate smoke test.

*Done 2026-07-21:* dependency hygiene only, no test-framework change.
- **`renderStatic` relocated** from `app.js` to `ui.js` (the import-safe UI module,
  which already had the `el` helper; added a `parseXml` import from data.js — no
  cycle, data.js imports only state.js). `app.js` now imports it from ui.js for the
  rules modal; `previewProse`'s "sibling" comment in render.js updated to point at
  `ui.renderStatic`. So **no test suite imports the side-effectful `app.js` any more**
  — its unused `renderStatic` import is gone from six suites, and the one genuine
  user (economy) imports it from ui.js.
- **Every suite pruned to the symbols it actually uses** (a zero-occurrence report
  drove the cuts, so only truly-unreferenced imports were removed — nothing used
  could break). The flagship corpus suite drops from nine modules to three
  (`data`, `GameState`, `Story`); the others shed the copy-pasted whole-harness
  block (unused combat/market/tts/state symbols, etc.).
Fixtures left local (each suite still rebuilds its own). No new files, so
sw.js/README module tables are unchanged. Every suite passes alone via
`?suite=<name>` and the aggregate smoke is `RESULT ALL PASS pass=1493`.

---

## 165. Re-archive completed task details 115–160 and clear them out of the priority buckets — LOW (process/docs)

*(Filed 2026-07-21 from a sixth full repository review; recurring maintenance
after task 141.)* Task 141 archived completed details 1–114, but the subsequent
burn-down completed every detailed task 115–160. Their checked items still fill
the HIGH/MEDIUM/LOW work queues, and roughly 1,280 lines of completed detail now
sit in the active backlog before the Review log. That makes the "first open task"
workflow harder to scan and leaves TASKS.md close to its pre-archive size.

Move completed detail sections 115–160 into TASKS-archive.md under their stable
IDs, move their summary rows into **Done**, and leave only open-task detail plus
the current Review log in TASKS.md. Update the archive-range note without losing
completion notes or historical review text. Documentation-only; validate every
checklist ID has exactly one detail heading across the two files, then commit.

*Done 2026-07-21:* documentation-only re-archive. Scope extended from the filed
115–160 to **115–165**, because tasks 161–164 were completed in the same session
(and 165 is this maintenance task) — leaving their completed detail in the active
buckets would have re-created the very clutter this task removes. Moved every
detail section 115–165 verbatim (completion notes intact) into TASKS-archive.md
under its stable `## <N>.` heading, extended the archive intro/Contents to IDs
1–165, and moved all their summary rows into **Done** (numeric order). The
HIGH/MEDIUM/LOW buckets are now empty (no open tasks); TASKS.md keeps the intro,
the full **Done** checklist, the archive-range note (now 1–165), and the Review
log. Validated that every checklist ID 1–165 has exactly one `## <N>.` detail
heading across the two files. No code or tests touched.

---

## 166. Direct visit commits bypass persistence observers — save failures stay silent and activity timestamps go stale

**Priority: HIGH — reopens the player-facing guarantee from task 7 on every
ctx-only save path.**

`GameState.changed()` updates `data.updated`, calls `save()`, then notifies the
listeners through which `app.js` runs `surfaceSaveError()`. The explicit visit
commits added for tasks 155, 161 and 162 call `save()` directly instead:
`Story.begin()`, `resumeStale()`, `rerender()`, and eight continuing-combat or
blessing branches in `render-combat.js`. `save()` only sets `lastSaveError`; it
does not publish the result. A quota failure that occurs on the final, larger
visit write can therefore go unwarned even when the preceding state mutation
saved successfully. A pure combat round can have no `GameState` mutation at
all, making its direct visit save the only persistence attempt. Direct commits
also leave `data.updated` unchanged, so the save-card timestamp/order does not
reflect ctx-only combat or roll progress.

Implement one semantic current-visit commit path at the state/persistence
boundary and route every raw renderer/combat `save()` through it. It must:

1. advance the persisted `updated` time for real player progress (without
   causing a sheet rerender or a recursive save);
2. publish both failure and recovery so the existing warning/export UI shows a
   direct-commit failure and re-arms after a successful retry; and
3. retain the provider-written visit record and ephemeral-game behaviour.

Add focused persistence tests that force storage to fail only on a direct
visit commit, assert that a save-status observer receives the failure and later
recovery, and verify that a ctx-only combat/roll commit advances the persisted
metadata timestamp. Keep the existing normal/quota/ephemeral save tests green,
then run the full build + browser suite.

## 167. Mutation-bearing navigation is not atomic — a failed/pending cross-book load can consume payment without completing the move

**Priority: MEDIUM — an uncommon fetch/reload window can irreversibly take
Shards, an item, a blessing, or a ship action while leaving the source live.**

The task-161 transition commit makes the destination coherent *after*
`begin()`, but the source-side transaction is still split. `renderChoice()`
calls `payChoiceCost()` first (which autosaves the deduction), then records
`_pendingSourceNode` and starts `Story.navigate()`. The wrapper installs the
spent-action return frame only in memory and does not save again until the
destination fetch resolves. If the tab closes during that fetch, the persisted
source visit has paid but still presents the same unspent choice on reload. If
`data.getSection()` rejects, the move never completes, the payment is already
gone, and `_navInFlight` is never released because the wrapper neither returns
nor catches the raw navigation promise. This is live on paid cross-book routes,
including §1.123 (1 Shard), §1.495 (50 Shards), §1.656 (100 Shards), §2.190,
§5.333 and several Book 6 voyages. The same ordering must be audited for flee
effects, blessing spends, sailing, item-use detours and any combat/action branch
that mutates state immediately before navigating.

Make a mutation-bearing move transactional across target validation and the
source/destination visit hand-off. A rejected or missing target must leave the
source's resources, action availability, return frame and navigation guard in a
coherent recoverable state; a successful target must apply the mutation once,
run leave hooks once and persist the destination plus its source frame once.
Do not solve this with a second uncoordinated save that merely chooses a
different half-finished state.

Add focused navigation tests with a controllable pending/rejected raw navigate:
cover a paid cross-book choice and at least one other mutation-before-navigation
path, inspect the persisted source record while pending and after rejection,
then resolve successfully and verify one deduction, one turn, one return frame
and a released `_navInFlight` guard. Run the full build + browser suite.

## 168. An open navigation transaction leaves unrelated UI live and globally suppresses its saves

**Priority: MEDIUM — the task-167 transaction is global while the rest of the game
remains interactive, so a slow cross-book load can lose, misroute or falsely report
unrelated progress even when the original move succeeds.**

`beginTxn()` snapshots the whole `GameState.data` and sets one global `_txnSuppress`
flag. Until the target settles, **every** `save()` refreshes the in-memory visit, clears
`lastSaveError` and returns `true` without touching storage. `_navInFlight` blocks only a
second `Story.navigate()` call; it does not disable the current section's non-navigation
actions, Adventure-Sheet controls, app header or game menu. During a slow cross-book
fetch the player can therefore drink/drop/use an item, buy/rest/resolve another immediate
action, or press **Save & quit**:

- on rejection, `rollbackTxn(snap)` replaces the whole data object and discards every
  concurrent mutation along with the move's price;
- on success, a concurrent mutation can be committed at the destination even though its
  source-visit memo/return frame was captured before it; an item use that tries its own
  detour applies/consumes first, then has that second navigation silently ignored by the
  guard; and
- explicit Save & quit sees the suppressed `save()` return `true` and can leave the game
  screen claiming success despite no write for that action.

This is broader than the originally filed failed-fetch/drop intersection. Same-book
moves still have only a microtask-sized window because their book is cached, but a slow
or failing cross-book request leaves the live controls exposed long enough to matter.

Make the transition isolate only its own tentative mutations, or enter one explicit
app-wide transition state that blocks every state-mutating story/sheet/menu action until
the move settles. A raw persistence primitive must never report a successful explicit
save merely because a transaction suppressed it. Keep destination+price atomicity,
failure refund, return-frame semantics and the navigation guard from task 167. While
touching the commit path, have `commitTxn()` reuse the identical timestamp/save/status
logic in `commitVisit()` rather than maintaining a second four-line copy.

Add focused tests for a pending cross-book move plus (a) a concurrent non-navigation
mutation on rejection and success, (b) a charged item whose own detour is attempted, and
(c) an explicit save attempt. Assert that no action is silently lost/misrouted, no save
claims success without a write, the original move still commits/rolls back once, and all
controls/guards recover. Run the full build + browser suite.

## 169. Durable-consequence navigation has no abort/retry contract — failed resurrection, flee, combat or item detours can strand the action

**Priority: MEDIUM — a target-load failure is uncommon, but these paths can consume a
resurrection or item, apply a wound/reward, and then leave no way to reach or retry the
section that consequence was meant to open.**

Task 167 transacts only the move's deferred `opts.pay`. Several callers deliberately
apply and autosave a legitimate consequence **before** calling `Story.navigate()`, so
`beginTxn()` snapshots the already-mutated state and `abort()` restores only to that
post-consequence point:

- `handleDeath()` and `renderGroup()` call `reviveWithResurrection()` first, consuming
  the chosen deal and healing, then navigate to its recorded section. A deal from another
  book makes this a real cross-book fetch whenever the player dies elsewhere.
- `Story.useItem()` applies the effect, decrements/removes its charge, then follows an
  inner goto (Vade Mecum/books/boxes). A failed target can leave the charge spent with no
  durable pending detour.
- the duplicated single/group flee handlers apply the parting consequence and mark the
  fight fled before navigating; a failed target rerenders a spent/fled source with no
  retry control.
- combat `roundGoto` and group-action goto paths clear or memoise the triggering action
  before navigation, so abort can retain the effect while losing the redirect.

Define an abort policy for consequence-bearing moves. Either validate/enter the target
before committing the consequence, roll the whole action back safely, or persist a
pending transition/retry control that reaches the target without reapplying the effect.
Different actions may need different policies (a flee wound may be durable while its
redirect remains retryable); do not treat them all as refundable prices. Audit every
`story.navigate()`/`this.navigate()` caller, including resurrection, item use, combat and
group actions, and document the chosen boundary.

Add rejected/missing-target tests for at least a cross-book resurrection and a charged
item or flee/round redirect. After failure the player must be in one coherent state:
either the full action is restored, or the consequence is present exactly once with a
working retry that cannot repeat it. Success must still consume/apply once and preserve
the return frame. Run the full build + browser suite.

## 170. Centralise duplicated display helpers already owned by `render-util.js`

**Priority: LOW — small exact copies have already drifted in null/type and bonus-label
behaviour, but this is presentation/maintenance debt rather than a rules defect.**

The duplication scan found two string helpers in both `ui.js` and
`render-util.js`: `titleCase()` and `escapeHtml()`. The escape variants already differ
(`render-util` safely stringifies numbers/null; `ui` assumes a truthy value has
`.replace`). Item bonus suffixes are also hand-built three times (`ui.js`,
`render-market.js`, `render-rewards.js`) despite `render-util.itemLabel()` owning the
same weapon/armour/tool vocabulary; the copies disagree about title casing and whether
zero bonuses print as `+0`.

Keep `render-util.js` dependency-free and make the view/shell import one canonical
escape/title implementation. Extract/reuse the smallest bonus-label helper that preserves
each caller's intentional item-name casing while standardising bonus text; do not force
all item rendering through one DOM builder. Add direct string tests covering null,
numbers, HTML metacharacters, weapon/armour/tool bonuses and zero bonus, then keep the
sheet, award and market render assertions green. Stamp and run the full browser suite.

## 171. Deduplicate the single/group combat control shell without merging their rules

**Priority: LOW — the current duplication works, but it has repeatedly produced parity
bugs and doubles every persistence/blessing/flee maintenance change.**

`drawGroupFight()` and `drawFight()` correctly use different headless combat rules, but
their view shells duplicate player stats, live log setup, animated attack guards, flee
target routing, COMBAT retry, Divine Wrath, Defence through Faith, redraw and
`commitVisit()` tails. Tasks 83, 87, 91, 162 and 166 all had to repair or update the two
branches separately; the current file still carries eight parallel commit calls and two
nearly identical flee handlers. This is now a demonstrated drift risk, not a reason to
merge `fightRound()` with `groupFightRound()`.

Extract only small local view helpers inside `render-combat.js`: shared player/log rows,
the animation/visit guard, flee-target routing, and/or a control builder driven by
explicit callbacks for “living targets”, “resolved”, “redraw” and “commit”. Keep target
selection, outcome aggregation, group proxy state and the single/group headless rule
calls visibly separate. Do not create a generic combat framework or move rules into the
view. Add parity assertions that both widgets expose/consume each blessing, route a flee
once, drop a stale animated strike and persist a continuing action once. Stamp and run
the full browser suite.

## 172. Deduplicate roll-widget/gate/memo scaffolding without building a generic roll renderer

**Priority: LOW — bounded view duplication is currently correct, but gate and memo
changes must be repeated across four roll types and have already diverged.**

`renderDifficulty`, `renderRandom`, `renderRankcheck` and `renderTraining` repeat the
same keyed `.roll`/`aria-live` widget construction; difficulty/random repeat description
rendering; difficulty/rankcheck use `rollGateState()` while random reimplements its three
lines; and result-to-var writes repeat the `setVar` + `wroteVars` + `rolledVars` sequence.
The exact-window scan found the widget block at four sites and the gate block at two.
The roll calculations and labels are genuinely different and should remain explicit.

Extract narrow helpers for widget creation, pay-gate/re-arm state and result/memo writes.
Do not replace the four renderers with a configuration-driven generic roll function —
that would hide the meaningful differences (ability picker/mode, random var replay and
travel blessing, rank comparison, training gain). Add focused parity tests for a gated
difficulty/random/rank check, while-loop pending state, var memo sets and blessing reroll,
then stamp and run the full browser suite.

## 173. Durable-navigation retry targets disappear on reload — the spent consequence can become a permanent dead end

**Priority: MEDIUM — a destination failure is uncommon, but reloading is a natural
recovery attempt; it currently keeps the irreversible wound/item/group/combat effect
while deleting the only control that can finish the move.**

Task 169 keeps an already-applied consequence and arms `Story._pendingRetry` when its
destination rejects or is missing. `abort()` then calls `rerender()`, whose
`commitVisit()` correctly persists the post-consequence state. The retry target itself
is only a transient Story field, however: `serializeVisit()` writes the ctx/frame but no
pending target, `sanitizeVisit()` only whitelists the existing visit fields, and
`resume()` never restores `_pendingRetry`. Closing/reloading at the retry screen therefore
resumes the source with the item charge gone, flee/combat outcome resolved or group action
memoised, but with neither the original action nor “Try again” available. Task 169's tests
exercise an in-memory retry only and do not cover this persisted boundary.

Add an optional, validated `{ book, section }` durable-retry field to the v1 visit record
(or an equivalently coherent persisted transition record), serialise it while the retry
screen is armed, pass it through `sanitizeVisit()`, and restore it before `resume()` renders.
Keep the existing boundaries: a fresh/successful `begin()` clears it; refundable failures
do not create it; a malformed/imported target is discarded; clicking the restored retry
captures the current source as the return frame and must not re-apply the consequence.
Do not persist `_navInFlight` or reopen a navigation transaction on load.

Extend the task-169 charged-item or flee fixture through a real save/sanitize/new-Story
resume: reject the target, assert the saved visit contains the retry, reload and assert the
retry-only screen is restored, then succeed and verify the target/return frame plus exactly
one spent charge/wound. Add malformed-field sanitisation coverage and keep a legacy v1
record without the optional field resumable. Run the full build + browser suite.

## 174. The controllable async-navigation test fixture is copied three times in one suite

**Priority: LOW — test-only maintenance duplication; behaviour is correct, but the mock
defines the transition contract and can drift when that contract changes again.**

The fresh eight-line window scan finds three overlapping duplicate windows in
`suite-actions.js`, all from the same `controllable(g, storyRef, dstEl)` helper copied into
the task-167, task-168 and task-169 blocks (currently near lines 920, 1014 and 1135). Each
copy builds the identical pending Promise with `ok()` performing `goTo()`/`snapshot()`/
`begin()` and `reject()` simulating a failed book fetch. This is not intentional suite
isolation: all three copies are inside the same module and test the same navigation seam.

Move that mock to one suite-local helper and reuse it from the three blocks. Keep each
scenario's GameState/Story/destination independent, retain the explicit success/rejection
controls and do not introduce a production abstraction or a shared cross-suite fixture
framework. Run the focused `actions` suite and the full browser suite.

## 175. Blessing rerolls keep the rejected roll's branch effects — damage/rewards can survive or stack

**Priority: HIGH — a core blessing rule can permanently damage or kill the player even
when the replacement roll succeeds, and random-result rewards/consequences can apply twice.**

`render-rolls.js` reveals the matched `<success>`/`<failure>`/`<outcome>` immediately;
`revealBranch()` walks that branch through `Story.appendChildren()`, which applies its
passive effects and records their visit memos. `appendBlessingReroll()` subsequently only
consumes the chosen blessing, replaces `ctx.rolls[key]` and rerenders. It neither defers
the first branch nor restores its state/memos. Live consequences include §5.104's 7
Stamina loss, §5.282's permanent all-ability loss and §6.607's permanent SANCTITY loss.
The sharpest proof is §6.49: the failed branch removes every blessing before the already
rendered ability/Luck reroll button can call `useBlessing()`, so the offered reroll cannot
run at all. A random reroll can likewise retain one outcome's automatic reward/penalty and
then apply the replacement outcome too.

Make a rerollable result a decision boundary: no result-dependent branch effect, award,
redirect or control may become committed until the player keeps that result or exhausts
the available rerolls. Prefer a pending-result/accept-result lifecycle over broad rollback
of arbitrary state after the branch has already become interactive. Keep the rule/planning
decision DOM-free; the view may render the dice, reroll choices and a clear “Keep this
result” action. Persist the pending/accepted decision in the visit record so reload neither
auto-accepts nor re-applies it. A result with no eligible reroll must retain today's immediate
branch behaviour, and chained eligible blessings after another failed reroll must remain
well-defined.

Add deterministic regressions that prove:

1. a failed difficulty branch containing `<lose stamina>` changes nothing while the result
   is pending, and a successful blessing reroll never applies that loss;
2. §6.49 still holds the offered blessing before the decision, rerolls successfully when
   chosen, and removes all blessings exactly once only when the failure is kept;
3. a Luck reroll between two random outcomes applies only the final outcome's automatic
   effect/reward;
4. save/resume preserves a pending result and an accepted result without losing controls or
   replaying effects; and
5. a roll with no eligible blessing still reveals/applies its branch immediately.

Run the focused render/inventory/action suites and the full build + browser suite.

## 176. Unavailable-book demo links and imported saves reject outside the recoverable UI

**Priority: MEDIUM — malformed but user-controlled input can leave a blank game screen and
an imported slot that cannot be played; valid saves and book data are not at risk.**

`startDemo()` calls `data.getSection(book, section)` as its validation step, but an
unavailable book rejects in `loadBook()` rather than returning `null`. `boot()` starts that
async function without awaiting/catching it, so `?demo=999.1` becomes an unhandled rejection
instead of the documented title-screen fallback. The import path has the same boundary gap:
`sanitizeData()` accepts any integer book ≥1, writes the save, and `loadCurrent()` later
awaits `getSection(state.data.book, sec)` without a rejection handler. Clicking Play on such
a slot first builds the game screen and then strands it when the unavailable-book fetch
rejects. A hand-edited/corrupt localStorage blob can reach the same path even after import
validation is tightened.

Validate a demo/import's current book against `data.availableBooks()` before fetching or
persisting it, without importing the data/UI module into the DOM-free state model. Reject an
unavailable-book import before allocating/writing a slot and show the existing Import failed
UI. Also make `startDemo()` and `loadCurrent()` catch book-load failures and return to a
usable title/save screen with an actionable message; do not overwrite, relocate or delete
the bad save implicitly. Preserve the existing Book 1 fallback for a missing section inside
an available book unless the new tests demonstrate a safer explicit message.

Add regressions for an unavailable `?demo=` target, an import whose current book is not
bundled (including no slot write), and a pre-existing invalid slot whose Play action fails
recoverably. Keep valid imports and invalid-section-in-valid-book behaviour covered. Run the
focused state/app-facing coverage and the full browser suite.

## 177. Complete modal keyboard isolation/focus restoration, including the section-view oracle

**Priority: MEDIUM — dialogs are widely used and currently let keyboard focus escape into
obscured controls or disappear when the focused button is removed.**

Task 153 added dialog semantics, initial focus and dismissable Escape handling to
`ui.modal()`, but it does not trap Tab/Shift+Tab, make the obscured page non-interactive, or
restore focus to the element that opened the dialog. Closing removes the focused subtree,
usually leaving focus on `<body>`. The §5.114 section-view oracle builds a separate modal in
`render.js`; it has none of the shared dialog role/name, initial focus, Escape handling,
keyboard containment or focus restoration.

Bring both paths to one consistent modal contract with the minimum reusable shell needed:
remember and safely restore the invoking focus, keep sequential focus inside the topmost
dialog, prevent assistive technology/pointer interaction with the obscured app, preserve the
existing dismissable versus non-dismissable Escape rule, and clean every listener/temporary
attribute on every close path. Prefer routing the oracle through the shared contract (or a
small shared dialog primitive) without turning `ui.js` into a framework; its Reveal another
button must update content without closing the dialog.

Add DOM regressions for initial focus, Tab and Shift+Tab wrapping, Escape behaviour,
non-dismissable dialogs, focus restoration after button/backdrop/programmatic close, and the
oracle's role/name/focus/reveal/close flow. Run the focused render/inventory suites and the
full browser suite.

## 178. Direct `choice[flee="t"]` navigation omits the durable retry contract

**Priority: LOW — the live targets are valid same-book sections, so a rejection is rare,
but the consequence-first path can reapply an irreversible wound/codeword if entry fails.**

The fight widget's Flee button applies the `<flee>` body and routes its target with
`{ durable: true }`, correctly preserving the consequence while arming the task-169/173
retry screen on a missing/rejected destination. Clicking the section's visible
`<choice flee="t">` directly applies the same body and marks the fight fled, but calls
`Story.navigate()` with only `pay` and `sourceNode`. Abort therefore restores the already
post-consequence state without setting `_pendingRetry`; the source rerenders with the flee
choice still available and another click can apply the wound again. §6.305 is a concrete
parting-wound example; fifteen direct flee choices exist across books 3, 4 and 6.

Route the direct choice through the same durable consequence policy as the fight widget and
retain its source-node return semantics. Do not pass contradictory refundable and durable
policies merely because `renderChoice()` currently supplies a no-op payment callback for
every move; make the actual payment/consequence order explicit and revalidate any real paid
flee form before mutation (the current corpus has none).

Extend the controllable navigation fixture with a direct `choice[flee="t"]`: reject the
target, assert one consequence plus a retry-only screen, retry successfully, and prove no
second wound/codeword. Cover a fatal parting wound (no navigation/retry) and keep the widget
Flee regression green. Run the focused actions/combat suites and the full browser suite.

## 179. Lazy service-worker cache writes can be terminated before `cache.put()` completes

**Priority: LOW — required and known optional assets are precached correctly; the race only
weakens later caching of same-origin cache misses.**

The fetch handler returns the network `Response` while launching
`caches.open(VERSION).then(cache => cache.put(req, copy))` as an unobserved side promise.
Neither the `respondWith()` promise nor `event.waitUntil()` owns that write, so the service
worker may be terminated after delivering the response but before the cache entry lands.
An optional/general illustration fetched successfully online can therefore still be absent
on the next offline visit.

Tie a successful basic-response cache write to the fetch event lifetime. Either await the
write in the response chain with a deliberate cache-write failure fallback, or attach the
write to a valid `waitUntil()` promise before the event settles; do not turn a cache-storage
failure into a failed network response. Keep cache-first lookup, cross-origin exclusion,
query-string navigation fallback and the required/optional install policies unchanged.

Add a source-contract regression alongside the task-64/138 service-worker checks and, if
stable in headless Chrome, a CacheStorage round-trip proving an initially uncached
same-origin resource is present after the fetch completes. Record a short manual online →
offline verification if browser lifecycle control remains unsuitable for automation. Run
the focused economy suite and the full browser suite.

---

## 180. Imported visit/combat memos can execute HTML/JavaScript on resume

**Priority: HIGH — task 6 treats imported saves as untrusted, but this path can execute
attacker-controlled script with access to every save on the origin.**

`sanitizeVisit()` passes `visit.ctx` and its return frame through as arbitrary objects;
`deserializeCtx()` then accepts every two-element `fights` entry verbatim. Group combat
interpolates the restored `fight.name`, Combat, Defence and Stamina fields into
`stats.innerHTML`; the single-fight row does the same for its numeric fields. A crafted
Book 6 §192 import whose `fightgrp@s.0` memo contains an `<img onerror=…>` name therefore
creates and executes that element when the visit resumes.

Validate imported visit/frame memos field by field against the current section tree. Rebuild
static fight identity from the source node where possible, bound/coerce the genuinely dynamic
fields, and construct every fight-stat row with elements and `textContent`; do not rely on
sanitizing one string before another state-derived field is interpolated.

Add malicious group- and single-fight import regressions: no injected element, handler or
sentinel side effect may appear, while an ordinary mid-fight save must still resume the same
opponents, Stamina, outcome, bonuses and log. Re-run the focused persistence/combat suites
and the full browser suite.

## 181. Finish task 175: a blessing-reroll result is still observable before Keep

**Priority: HIGH — rejected Luck/blessing results can still grant rewards, inflict permanent
losses, reveal choices or let the player leave before accepting a result.**

Task 175 protects direct random→`<outcomes>` effects, but the provisional-result boundary is
not general. Ordinary `<if>/<elseif var>` chains evaluate the live roll variable directly:
§2.389 can grant 150 Shards, or expose a Take control, before Keep. A stored pending roll lets
`<while>` advance: at §5.218 the player can start later attempts and escape without accepting
earlier 3-Stamina failures. `_scanPendingRerolls()` also tracks only the direct roll variable,
so a following `<set value="roll*100">` commits a derived value; §2.698 pays it immediately
and leaves its plain goto live, while §2.684 reveals the derived success/failure branch.

Define one DOM-free invariant: an eligible reroll result is wholly provisional until Keep or
the replacement roll settles. Propagate dependency through `<set>` expressions and suppress
dependent conditions, passive effects, controls, redirects, loop completion and onward
navigation. Persist the boundary in the visit record; do not patch each view widget with a
different special case.

Test §2.389 (no reward/control until final), §5.218 (one pending iteration; Keep applies one
loss; a successful reroll exits), §6.700 (a rejected non-six cannot set `y`, damage or stop
the loop), §2.698 (no Shards/live goto before Keep; final amount exactly once), §2.684
(branches hidden until final), and save/resume at each pending state. Run all sections.

**Done.** One DOM-free dependency trace now decides the whole boundary in `render-rules.js`:
`expressionVars` reports what an attribute value reads, `provisionalVarClosure` grows a seed
through the section's derived `<set>`s transitively, and three refusal points consume the
result — `conditionPending` (an `<if>/<elseif>` reading a provisional var holds the WHOLE
chain, so no `<else>` slips active), `setPending` (a `<set>` deriving from one writes nothing)
and `pendingRollVar`/`branchResolved` (effects and var-keyed branches wait). `render()`
pre-scans the section into `rerollPendingVars` before the walk, so document order is
irrelevant; `markWhilePending` holds a `<while>` pass on a resolved-but-provisional roll (a
loop roll's var is scoped to its own pass, per task 100, so §6.700's loop-entry gate still
reads the roll that opened it); and `applyPendingRerollGate` disables every rendered exit while
the decision's own controls are on screen. The boundary still rides in the roll memo's
`accepted` flag alone — nothing new is persisted.

Tracing the dependency through `<set>` also exposed and fixed a pre-existing leak with no
connection to rerolls: a derived `<set>` ran on ENTRY with its roll var unset, so `<gain
shards="s">`/`<lose amount="y">` applied against **0** and memoised that no-op — the award
could never arrive. Seven sections were silently paying nothing (§2.266, §2.698, §6.17,
§6.352, §6.488, §6.625, §6.86). `unsettledRollVars` closes over the roll vars a section has
still to fill so those effects wait for the real value; `setPending` deliberately tests only
the READ side, leaving task 61's set-sentinel idiom (§6.628 `y=7`, §2.138 `open=1`) applying on
entry as before. Two residual gaps filed as tasks 204 and 205. Full browser suite:
RESULT ALL PASS pass=1791 fail=0, all 4,369 sections rendering.

## 182. Delayed rolls and attacks can mutate a save after Save & quit

**Priority: HIGH — a detached action can overwrite the explicit quit save and advance or
damage an adventurer while the title or another game is visible.**

`rollButton()` and `animatedStrike()` capture only `story.ctx` while awaiting the dice
animation. Save & quit removes the game DOM but does not replace that context, so the guard
still passes when the animation resolves: the old roll/round mutates state, rerenders the
detached Story and commits over the save made immediately before `showTitle()`. Task 146
tests a section-context swap and therefore misses this same-visit shell disposal.

Give Story/app actions an active-screen generation or disposal token in addition to the
visit identity, and invalidate it whenever the game shell is left, replaced or rebound.
Keep controls locked for the action lifetime and release them in `finally`; normal rolls and
task-146 navigation cancellation must retain their current behavior.

With a controllable dice promise, start a roll and a single/group attack, invoke Save & quit
or replace the game screen, then resolve the promise. Assert no variable, fight, Stamina,
death UI or persisted slot changes after the quit save. Also prove a normal action resolves
once and navigation to a new ctx still drops the stale callback.

**Done.** The Story now carries a screen-lifetime token beside its visit identity: `dispose()`
sets `disposed` (and releases both transition locks, which gate app.js's shell guard and would
otherwise stay latched over the title screen), and `app.js`'s new `releaseGameScreen()` calls it
from every shell teardown — `showTitle`, `showCreate`, `showSaves` and `buildGameScreen`'s
rebuild. Both delayed actions were funnelled through one arming point, `Story.beginAction()`,
which freezes the pane, takes the `_actionInFlight` lock and returns `live()` — false once the
ctx has been swapped (task 146's navigation case, unchanged) **or** the Story disposed —
plus `end()`, released in each handler's `finally`. `animatedStrike` resolves to the armed
action or `null`, so `drawFight`/`drawGroupFight` wrap their whole round in that `try/finally`.
The lock is also honoured by app.js's capture guard, so "Save & quit" can no longer even be
clicked between a strike and the round it is about to resolve; being a counter and not DOM
state, releasing it cannot re-enable a control the render deliberately disabled.

Tests use deliberately lethal fixtures so the silence is not vacuous — §6.700 at Stamina 1
(its die is always ≥ 1, so a landed roll always kills through `<lose stamina="x">`) and a
Combat-30 foe with 99 Stamina against Stamina 1 — with a real save slot byte-compared across
the quit. Each control proves the action still lands (and kills) with the screen live, resolves
exactly once and releases the lock; the quit/teardown cases then assert no roll memo, no var,
no fight-log or foe-Stamina movement, no player Stamina change, no `onDeath`, and an unchanged
persisted slot. Task 146's navigation drops still pass through the new guard, now also
asserting the lock is released on the dropped path. Full browser suite: RESULT ALL PASS
pass=1806 fail=0, all 4,369 sections rendering.

## 183. Disease/poison immunity blessings do not prevent infection

**Priority: HIGH — blessings explicitly bought for immunity are consumed by neither the
rules engine nor the affliction model, so permanent penalties land anyway.**

`GameState.addAffliction()` always adds a disease or poison and `applyAffliction()` delegates
to it without consulting blessings. Several source nodes rely on the affliction rule itself,
not an enclosing XML guard: §2.136 says Maka's blessing negates Leprosy; §5.306 and §5.620
say Immunity to Disease/Poison is crossed off instead of taking the poison/disease. Task 123
aliased the two blessing names but did not implement this admission rule.

Centralize immunity in affliction admission so both canonical aliases protect against either
`disease` or `poison`. Spend an ordinary blessing through the existing blessing API, retain a
permanent blessing, and add neither the record nor any effect/Stamina clamp when protected.
Curses remain unaffected.

Test grant/check under both aliases and both affliction types, ordinary consumption,
permanent retention, absence of every penalty/record, and unchanged unprotected infection.
Exercise the three live sections and persistence, then run all sections.

**Done.** Immunity now lives in one place — `GameState.addAffliction()`, the single admission
point every disease/poison passes through (`applyAffliction` for `<disease>`/`<poison>`, and
any direct caller). A `disease`/`poison` admission spends the blessing via the existing
`useBlessing('disease')` and returns *before* the record is pushed, so no record, no ability
effect and no Stamina-total cut/clamp land. Because task 123 canonicalises `poison` → `disease`,
either spelling of the grant protects against either affliction type. `useBlessing` already
retains a permanent blessing, so a permanent immunity protects indefinitely; curses never
consult it. The "already afflicted" no-op check was hoisted above the immunity check so a
re-infection with an affliction already held cannot burn the blessing, and a `cumulative="t"`
re-application still stacks without spending it — the same ordering as the reference
`CurseList.addCurse`, where immunity is only tested inside the not-already-held branch.

32 new assertions: all four alias × type combinations (no record, no penalty, blessing spent),
the §5.306-style `ability="stamina"` cut leaving `effectiveStaminaMax()` and current Stamina
untouched, permanent retention across two infections and a save round-trip, the unprotected
infection still landing its penalty, a curse still landing with the blessing intact, and the
re-infection-keeps-the-blessing case. The three live sections run through a real `Story`:
§5.306 (immune → no poison, blessing crossed off, total unchanged and persisted through
`sanitizeData`; unprotected → −6 from the total), §5.620 (immune → no Red Ague and no
COMBAT/CHARISMA loss; unprotected → both penalties), and §2.136 driven on a seeded die into
the 1–3 branch (immune → Leprosy negated and the blessing used up; unprotected → contracted).
Full browser suite: RESULT ALL PASS pass=1838 fail=0, all 4,369 sections rendering.

## 184. Named removal leaves stacked cumulative curses behind

**Priority: HIGH — a temporary per-wound COMBAT drain can survive its explicit cleanup and
become a permanent penalty.**

Every `cumulative="t"` application is stored as a separate record, but
`removeAffliction(type, name)` splices only the first match. §5.489 can stack Avenger's Bite
once per wound; the hidden named loss on entering §5.565 is intended to clear the first
fight's entire temporary drain, yet it removes only one copy. The reference model aggregates
same-name cumulative curses before named removal.

Either aggregate compatible cumulative records or make named removal clear the complete
same-name aggregate. Preserve `?` as removal of one arbitrary affliction and `*` as removal
of all; do not accidentally collapse unrelated same-name records with incompatible metadata
without defining their merge.

Test two or more Avenger wounds stacking, §5.565 restoring the whole prior COMBAT loss, new
drains in the second fight, named/`?`/`*` semantics and a save/load round trip.

**Done.** Took the second option — `removeAffliction(type, name)` now filters out every
same-name record instead of splicing the first, so a named removal clears the complete
aggregate. This needs no merge rules and no save migration (a legacy save already holding N
stacked records is cured correctly on load), and it cannot collapse unrelated records: only a
`cumulative="t"` stack can ever hold two records under one name, because a repeat application
of a non-cumulative affliction is already a no-op in `addAffliction`. `?` still drops one
arbitrary affliction and `*` still clears the list; matching stays case-insensitive via
`normalize`, so the sheet's "Lift…" action and `<lose curse|disease|poison>` all inherit the
fix. All four cumulative afflictions in the corpus (§5.203 Vampire's Kiss, §5.489/§5.565/§5.631
Avenger's Bite) carry only additive `bonus` effects, so no divide/target aggregate arises.

12 new assertions, driving the real §5.489 `<curse>` node as a wound: three wounds stack three
records and −3 COMBAT, the stack survives a `sanitizeData` round trip, one named removal
reports true and restores the full score, a second reports false. Live, two wounds then
`Story.begin(§5.565)` — whose hidden `<lose curse="Avenger's Bite">` fires on entry — clears
every record and restores COMBAT, after which the second fight's own drain still lands. `?`
removes exactly one of three curses, `*` clears all, and a case-insensitive named removal
leaves an unrelated Skunk-juice curse and its CHARISMA penalty untouched. Full browser suite:
RESULT ALL PASS pass=1850 fail=0, all 4,369 sections rendering.

## 185. Wildcard affliction effects (`ability="*"`) are discarded

**Priority: MEDIUM — §2.136 records Leprosy but silently omits its stated one-point penalty
to all six abilities.**

`afflictionAbility()` accepts the six named abilities and Stamina but returns null for `*`,
so `readEffects()` drops Leprosy's sole `<effect ability="*" bonus="-1"/>`. The state-side
affliction calculations likewise match only an exact ability key. The prose explicitly says
to reduce every ability down to a minimum score of 1.

Preserve a wildcard affliction effect through parsing, sanitization and persistence, and
apply it to each core ability (not Rank/Stamina unless separately named). Keep the existing
minimum-one rule and natural/affected semantics.

Test all six scores before/after Leprosy, the floor at 1, save/load, duplicate infection
semantics and full restoration on cure.

**Done.** Three small changes on one rule: `afflictionAbility()` now returns `*` alongside
`stamina` and the six named abilities, so `readEffects()` keeps the wildcard; a new
`afflictionHits(e, ability)` helper in `state.js` states the match rule once (exact key, or
`*` against any of the six core abilities) and both `afflictionBonus()` and `afflictionMod()`
use it, so a wildcard `divide`/`target` cannot become a new silent drop now that `*` parses.
`sumAfflictionStamina()` deliberately still requires the explicit `ability="stamina"` key, so
the wildcard reaches neither the Stamina total nor Rank — the same boundary as the item-aura
wildcard (`sumAuraBonus`). `sanitizeAffliction` already accepted any non-empty ability string,
so the wildcard persists without a schema change, and the "minimum score of 1" is the existing
`clampAbility` floor in `ability()`/`abilityNoWeapon()`. §2.136's Leprosy is the corpus's only
wildcard affliction effect; §5.564's `type="aura"` wildcard was already handled.

9 new assertions taken from the real §2.136 `<disease>` node: the wildcard effect is stored on
the record as `{ability:'*', bonus:-1}`, all six affected scores drop by exactly one, an ability
seeded at 1 floors at 1, Rank and `effectiveStaminaMax()` are untouched, the wildcard survives a
`sanitizeData` round trip with the same six scores, a duplicate infection adds nothing further,
and `removeDisease('Leprosy')` restores all six. Live, §2.136 driven on a seeded die into the
1–3 branch contracts Leprosy and drops every score by one. Full browser suite: RESULT ALL PASS
pass=1859 fail=0, all 4,369 sections rendering.

## 186. Automatic highest-bonus equipment can select a worse loadout

**Priority: MEDIUM — a numerically stronger weapon can disable a lower-bonus weapon whose
wielded effect produces the better or required rules outcome.**

`wieldedWeapon()`, `wornArmour()` and `reconcileEquipment()` always select the highest numeric
bonus; the Adventure Sheet only decorates those computed flags. The Jade Defender is a
+3 weapon with a +3 wielded Defence effect (§5.628/§5.672), explicitly worth +6 Defence.
Owning any plain +4 weapon automatically unwields it, lowering Defence and changing which
possession a `using="t"` loss can target. The player has no way to choose the legal loadout.

Store explicit selected weapon/armour IDs and provide compact Sheet controls to change them.
Reconciliation should choose a sensible default only when selection is absent/invalid, and
the selected items must be the single source for base bonuses, wielded effects, display and
`using="t"` matching. Migrate old saves deterministically.

Test choosing either Jade Defender or a plain +4 weapon, the resulting COMBAT/Defence and
loss target, selection persistence, and fallback after dropping the selected item. Cover
armour and equipment-lock behavior too.

**Done.** `data.equipped = {weapon, armour}` stores the chosen item ids. One pair of readers,
`wieldedWeapon()`/`wornArmour()`, resolves the choice — the stored id while it still names a
carried item of that kind, else the strongest of that kind as the default — and everything
else already went through them: `using="t"` matching (`matchEquipment`, `selectEquipment`,
`loseEquipmentCandidates`), `setSelectorBonus`, the `type="wielded"` effects in
`sumAuraBonus`, and the sheet's ⚔/🛡 markers. `itemBonus('combat')` and `armourBonus()` now
read that one weapon/armour instead of scanning for the biggest number, so the selection is
the single source for base bonuses too. `reconcileEquipment()` writes the resolved pick back,
so a stale id self-heals and a *new* stronger weapon no longer steals the wield — matching
JaFL's `ItemList.addItemEffects`, which wields a newly acquired weapon only when nothing is
wielded. `setEquipped(kind, id)` is the sheet's entry point (rejects an unknown id, the wrong
kind, or a locked slot); each weapon/armour row gained a `Wield`/`Wear` button (`aria-pressed`,
disabled when it is the current pick or the slot is locked), and `onSheetChange` already
rerenders the story so a `<if weapon="*sword*" using="t">` gate (§2.267) re-evaluates at once.

Migration is deterministic: `sanitizeData` keeps a stored id only while it names a carried
item of that kind, else falls back to the legacy per-item `wielded`/`worn` flag — which every
pre-186 save carries on the piece the old reconcile had picked — so an old save loads exactly
the loadout it was showing; with neither, the default applies.

This also makes `<tick special="weaponlock|armourlock">` real. It was documented as a
justified no-op *because* selection was automatic; now that the player can swap, §6.135's
"Remove that weapon" group (a click-to-apply button) leaves a window to dodge the loss. The
locks are transient (`_equipLock`, never saved), released on entering a section — JaFL clears
both on its NEW_SECTION event — or when the locked possession itself goes.

27 new assertions. From the real §5.628 `<weapon>` node: the Jade Defender arrives with its
`type="wielded"` Defence effect, a later plain +4 does not steal the wield, switching to it
trades 2 Defence for 1 COMBAT, switching back restores both the effect and the flags; a
`<lose weapon="?" using="t">` takes the *chosen* weapon and the slot then falls back to the
strongest remaining; the choice survives a `sanitizeData` round trip, a stale id falls back to
the flag, and a save with neither defaults to the strongest. Armour repeats the shape
(default = best Defence, choosing the lesser is honoured by `defence()`, a `using="t"` armour
loss takes the worn piece) plus `setEquipped` rejections. Live: §6.135 locks the weapon slot
on entry, refuses a swap, renders every `Wield` control disabled, breaks the weapon actually
in hand when its group is clicked, releases the lock with that loss, and the lock is gone
after entering another section; §2.290's `armourlock` holds the armour slot only, and its acid
takes the worn jerkin while sparing the better mail with no Stamina lost. The pre-existing
"wielded aura drops when the item is not wielded" check in `suite-economy` was updated: it
asserted the old auto-unwield, and now proves the aura survives the acquisition and drops only
on an explicit switch. Full browser suite: RESULT ALL PASS pass=1886 fail=0, all 4,369
sections rendering.

## 187. Named market sales ignore item kind and equipment stats

**Priority: MEDIUM — a cheap/plain possession can be sold as a distinct enchanted tool or
weapon merely because its display name matches.**

For named non-armour goods, `ownsGoods()` falls through to `hasItem(name)` and
`sellCandidates()` to `findItems(name)`, ignoring `kind`, `ability`, `bonus` and tags.
§5.238 awards a plain item named “silver flute”; §5.244 sells a CHARISMA +2 tool with the
same name for 360 Shards, and the ordinary tomb trinket currently satisfies that row.

Match named equipment sale candidates by descriptor kind plus the relevant ability, bonus
and tags as well as name. Retain the intentional armour-by-Defence-tier rule and unnamed
weapon-by-bonus rule; keep the task-134 candidate picker for genuinely interchangeable or
ambiguous matches.

Test that the plain silver flute cannot be sold on the tool row, the exact tool can, and
same-name equipment with the wrong kind/ability/bonus/tags cannot. Audit the corpus for other
cross-kind name collisions and run the economy/full suites.

**Done.** One predicate, `matchesNamedGoods(it, goods)`, now decides whether a possession
satisfies a named non-armour row: same kind, the stated `ability`, at least the stated `bonus`,
and every stated tag. `ownsGoods()` and `sellCandidates()` both call it (and `sellTrade`/
`sellPlan` go through `sellCandidates`), so a row can no longer advertise a sale it cannot
complete. The armour-by-Defence-tier and unnamed-weapon-by-bonus branches are untouched, as is
task 134's picker — it still sees only genuine matches.

The one deliberate looseness: a `kind="item"` row accepts a possession of any kind. The corpus
audit (every named row carrying `sell=`, compared against every other declaration of that
name) found exactly three cross-kind collisions, and two of them are the books being loose with
`item` for something they elsewhere declare a weapon — §1.452/§2.493 sell a "pickaxe" awarded
as `<weapon>` in §3.376/§3.396/§4.248 (book4/248 even carries the comment "is the pickaxe a
weapon or just an item?"), and §3.715 sells a "golden katana" that every award declares as a
weapon. Requiring strict kind equality there would have made two legitimate sales impossible.
The third is the reported bug: §5.238's plain `<item name="silver flute">` tomb trinket against
§5.244/§4.417/§5.101's CHARISMA +2 `<tool>` row (§5.118 is where the trinket becomes the real
tool). A second audit pass found **no** tag mismatches at all, so requiring the row's tags is
safe. Using `bonus >= row.bonus` rather than equality keeps a stronger same-kind piece
sellable at the row's price, matching the pre-existing behaviour for named rows.

17 new assertions in `suite-economy`: the plain trinket yields no candidate, no sale and no
Shards while staying in the pack; the real tool sells for 360; same-name pieces with a lower
bonus, the wrong ability or the wrong kind are all refused, while a better same-kind piece is
accepted; §3.480's `tags="light"` lantern row rejects an untagged lantern and accepts a tagged
one; the weapon pickaxe and weapon golden katana still sell on their `<item>` rows; armour
still sells by tier (and the wrong tier still cannot), and an unnamed weapon row still takes
any weapon of that bonus. Live §5.244 renders the silver-flute row with `Sell 360`, disabled
("You have none to sell") while holding only the trinket, enabled with the real tool, and the
click pays exactly 360 and removes it. Full browser suite: RESULT ALL PASS pass=1903 fail=0,
all 4,369 sections rendering.

## 188. `<rest hidden="t"/>` is optional instead of automatic

**Priority: MEDIUM — the sole live hidden rest lets the player leave wounded despite the
section stating that every injury has already been healed.**

Book 6 §479 contains `<rest hidden="t"/>` followed by “All your injuries are mysteriously
healed.” `renderRest()` never reads `hidden`; it always creates a Rest button and therefore
turns the mandatory full heal into an optional action.

Auto-apply a hidden rest once on entry, render no control, and memoize the action before its
state mutation so reload/rerender ordering cannot repeat it. Use the effective Stamina
maximum and preserve ordinary priced/fixed visible-rest behavior.

Test wounded entry to §6.479 (full Stamina, no button), damage plus rerender/resume during the
same visit (no re-heal), a fresh visit (heal again), and entry while already full.

**Done.** `renderRest()` now takes an early branch for `hidden="t"`: it adds the `rest@<path>`
memo, calls `applyRest` and returns no DOM. The memo is added **before** the mutation because
`applyRest` → `changed()` → autosave can rerender this very node, and an unset memo would heal
(and, for a hypothetical priced hidden rest, charge) twice. `applyRest` already heals to
`effectiveStaminaMax()` (task 158), so aura headroom is included. The branch is skipped while
`story.inactive`, so a hidden rest inside an untaken `<if>` cannot fire — the same rule the
passive renderers follow. Visible rests keep every existing behaviour: the heal-to-full form,
the task-129 once-per-visit lock on an unpriced fixed amount, and repeatable priced nights.
§6.479 is the corpus's only hidden rest.

10 new assertions against the real §6.479: a wounded arrival is restored to full with no Rest
control rendered; taking damage and rerendering inside the same visit does not heal again;
neither does a reload — `serializeVisit` → `sanitizeData` → `Story.resume` carries the memo, and
the resumed render still draws no control; a fresh `begin()` of the section heals again;
entering already whole is a no-op. Plus a hidden rest inside an untaken `<if>` branch that must
not fire, and a visible `<rest>` that is still an opt-in button which heals on click. Full
browser suite: RESULT ALL PASS pass=1913 fail=0, all 4,369 sections rendering.

## 189. A failed initial adventure load strands a new save on a blank game screen

**Priority: MEDIUM — a transient first-book fetch failure leaves an unhandled rejection,
blank shell and already-claimed slot with no recovery action.**

The Begin Adventure handler creates and saves the character, then calls `startGame(1)`
without awaiting it. `startGame()` builds the game screen before `navigate()`; a rejected
book fetch escapes the click handler, while a missing §1 returns false and leaves the empty
story pane. The demo/load/import paths already recover these failures.

Await and handle both rejected and false initial navigation. Show an actionable retry/back
state instead of a blank game, keep at most one successfully persisted new adventurer, and
do not report a failed storage write as a recoverable saved slot. Reuse the existing
load-failure language/policy rather than adding another screen framework.

Test failed fetch, missing start section, successful retry and normal creation. Assert no
unhandled rejection, duplicate/ghost slot or unusable blank game.

**Done.** `startGame()` now returns its `navigate()` result, and the Begin Adventure handler
awaits a new `openNewAdventure()` that owns both failure modes: `open()` resolving false (the
start section is not in the book) and `open()` rejecting (the book fetch failed, which used to
escape the click handler as an unhandled rejection). It loops on "Try again", so a retry
re-opens **this** character — the creation handler, and therefore `nextFreeSlot()`/`save()`, run
exactly once, so no second or ghost slot can appear. The dialog (`askNewAdventureRecovery`)
reuses the load-failure language and is driven by whether `state.save()` actually succeeded:
"Back to saves" is offered only for a persisted character, and `openNewAdventure` ignores a
`saves` answer when `persisted` is false, so a blocked/full storage write is never reported as
a recoverable slot. Backing out to the title screen is always available; both exits tear down
the shell via task 182's `releaseGameScreen`, so the blank game screen cannot be left behind.

`openNewAdventure` takes its collaborators as parameters and is exported, which is what makes
this testable at all — app.js's screens are unreachable from the harness, and importing app.js
is side-effect free because it only auto-boots when a `#app` element exists (task 65). 11 new
assertions in `suite-economy`: a normal start opens once with no dialog; a rejected fetch is
caught (nothing thrown out of the call) and its message is passed to the dialog; a retry
re-opens and succeeds while `loadSlotMeta()` is byte-identical before and after; a missing start
section reports its own reason and survives two retries; a persisted character can be routed to
the saves screen; an unpersisted one is routed to the title screen instead, with the dialog told
which case it is; and backing out returns to the title. The app page was also loaded headlessly
to confirm the title screen still renders after the handler became async. Full browser suite:
RESULT ALL PASS pass=1924 fail=0, all 4,369 sections rendering.

## 190. Service-worker activation and lookup touch unrelated origin caches

**Priority: MEDIUM — hosting another scoped app on the same origin can have its offline data
deleted or returned through Fabled Lands' cache lookup.**

Fabled Lands cache names use the `fl-` prefix, but activation deletes every cache key except
the current version. Fetch handling also calls origin-global `caches.match(req)`. CacheStorage
is shared by origin, not service-worker scope, so these operations can delete an unrelated
app's cache or select its matching URL.

Restrict cleanup to obsolete `fl-*` caches. Implement current/older Fabled Lands fallback
lookup without searching unrelated namespaces, preserving task 8's incomplete-upgrade
fallback, task 138's query navigation behavior and task 179's event-owned lazy write.

In a service-worker contract test, seed `other-app-v1`, the current cache and an obsolete
`fl-*` cache. Prove the unrelated cache survives and is never read, obsolete FL cache is
removed only after a complete install, and all required/optional/offline paths remain green.

**Done.** The namespace policy now lives in `web/js/sw-cache.js`, a dependency-free file that
publishes `self.FLCache` and is loaded two ways: `importScripts('./js/sw-cache.js')` from
`sw.js` (classic worker) and `await import('../js/sw-cache.js')` from the suite (it has no
import/export, so the same source is a valid bare module). It exposes `obsolete(keys,
current)` — older `fl-*` keys only, newest first; `match(cacheStorage, req, current, opts)` —
current cache then older `fl-*` caches, never the origin-global lookup; and `prune(cacheStorage,
current, required)` — deletes obsolete `fl-*` keys only once the current cache verifiably
holds every required asset, else returns `null` and keeps them. `sw.js` activate delegates to
`prune()` (was: delete every key that isn't `VERSION`) and the fetch handler to `FLCache.match`
(was: origin-global `caches.match(req)`), keeping task 8's incomplete-upgrade fallback, task
138's `ignoreSearch` navigation retry and task 179's `waitUntil`-owned lazy write byte-for-byte.
`./js/sw-cache.js` joined `REQUIRED`, so task 64's "every precached URL is fetchable" check
covers it, and the file is under `web/js/` so the build stamp hashes it.

Because live CacheStorage I/O hangs under headless Chrome (task 138), the policy is driven
against an in-memory `CacheStorage` double that logs every `open`/`match`/`delete` — which is
also the only way to prove the foreign cache is never *opened*, not merely never returned.
Thirteen new assertions in `suite-economy`: `other-app-v1` (holding the same URLs, including
`./?seed=42`), `fl-cur` and `fl-old` are seeded; the current cache wins, a URL only `fl-old`
has still resolves, a URL only the stranger has is a miss, the `ignoreSearch` retry serves our
shell rather than theirs, `other-app-v1` is never opened/read and `CacheStorage.match()` is
never called; an incomplete `fl-cur` prunes nothing, a complete one deletes exactly `fl-old`
and leaves `other-app-v1` standing. Task 179's now-obsolete `caches.match(req)` assertion was
retargeted at the scoped lookup. The app page was also loaded headlessly to confirm the title
screen renders with no `importScripts`/service-worker load error. Full browser suite:
RESULT ALL PASS pass=1937 fail=0, all 4,369 sections rendering.

## 191. Speech-enabled narrow headers clip critical controls

**Priority: MEDIUM — at common 320/360 px widths the non-wrapping action strip exceeds the
viewport, while horizontal overflow is hidden.**

Below 600 px the title disappears and icons shrink, but the header still contains the menu,
four general quick actions, three speech controls, Save and Adventure Sheet. Their fixed
widths, gaps and header padding require roughly 388 px, so trailing critical controls can be
clipped on narrow phones when Speech API support enables the full set.

Define a narrow-chrome policy: keep only the essential reachable controls in the header and
move duplicated quick/speech actions into the existing More menu or another compact control.
Do not shrink touch targets below an accessible size.

At 320 and 360 CSS pixels with speech support enabled, verify in a real browser that
`scrollWidth <= clientWidth`, every visible control is inside the viewport, and
Menu/Save/Sheet plus narration remain keyboard- and touch-reachable. Keep desktop layout and
speech-disabled widths covered. A connected browser was unavailable during filing, so retain
this explicit live layout check as acceptance evidence.

**Done.** Narrow-chrome policy: a header control that duplicates a ☰ More entry now carries
`.in-menu` and `display: none`s below 600px, leaving the four a phone must reach directly —
More, narration play/stop, Save & quit and the Adventure Sheet. The six that drop out stay
reachable: Undo / Rules / Maps / Light-Dark mode are More-menu entries, and auto-narrate +
narration speed are in its Narration settings. `iconBtn()` gained an optional class argument
so each call site declares its own classes (the three existing `classList.add` lines for
`sheet-toggle` / `theme-toggle` / `speed-btn` folded into it). Because four controls fit where
ten did not, the narrow breakpoint now *grows* the touch targets from 2.2rem (35.2px) to
2.75rem (44px) instead of shrinking them, and the action gap from 0.15rem to 0.25rem.
`display: none` (rather than an off-screen translate) is what keeps the dropped controls out of
the tab order — no phantom focus stops.

Live layout measured in headless Chrome via an iframe, which is its own viewport, so
`css/style.css`'s media queries evaluate against the width under test — and no app boot means
no service worker or CacheStorage is involved (16 assertions in `suite-economy`). Measured
`.header-actions` and `.game-header` `scrollWidth`/`clientWidth`, every visible control's
rect, and computed `display`:

| viewport | visible controls | required width | min touch target | all inside |
|---|---|---|---|---|
| 320 / 360 (ten unmarked controls — the bug) | all ten | 484.8px | 40px | **no** |
| 320 | ☰ 🔊 💾 📜 | 200.8px | 44px | yes |
| 360 | ☰ 🔊 💾 📜 | 200.8px | 44px | yes |
| 600 (breakpoint edge) | ☰ 🔊 💾 📜 | 200.8px | 44px | yes |
| 320, speech unsupported | ☰ 💾 📜 | 152.8px | 44px | yes |
| 601 | all ten | 481.2px min | 40px | yes |
| 900 | all but 📜 (permanent aside) | fits | 40px | yes |

The control experiment (ten controls with the markers stripped) is kept as an assertion so the
overflow metric is shown to detect the original bug rather than passing vacuously; it reads
484.8px because it inherits the new 44px sizing — under the old 35.2px sizing the same ten
controls needed ~393px, and both overflow 320 and 360. Wide layouts are unchanged, and there
is no clipped band left between the breakpoints: the ten-control header fits from 482px up.
Source contracts assert the header still builds exactly ten controls with exactly six markers,
that the four essentials carry none, and that the More menu and its Narration settings still
offer everything the narrow header drops. Full browser suite: RESULT ALL PASS pass=1953
fail=0, all 4,369 sections rendering.

## 192. The mobile Adventure Sheet is visually hidden but remains keyboard-exposed

**Priority: MEDIUM — keyboard and assistive-technology users can tab through off-screen
controls, with no announced drawer state or reliable way back.**

`toggleSheet()` changes only `body.sheet-open`; the closed `aside` is translated off-screen
but remains in the accessibility tree and tab order. The toggle has no `aria-expanded` or
`aria-controls`, opening does not move focus or isolate the story, and there is no Escape,
explicit Close or focus restoration behavior. Task 177 fixed modal isolation, not this
separate drawer.

Give the mobile Sheet a drawer lifecycle: synchronize `inert`/`aria-hidden`, expanded state
and control relationship; move focus on open, support Close/Escape/backdrop, restore the
invoker, and isolate the background while open. Clear mobile-only state cleanly on the
desktop breakpoint so the permanent aside remains usable.

Add keyboard tests for closed/open Tab order, Escape/backdrop/button close, focus restoration
and mobile↔desktop transitions, plus touch behavior and the existing sheet mutation tests.

**Done.** `syncSheetDrawer()` is now the single place that reconciles everything that must
agree, so no caller can set half the state: the pane's `inert` + `aria-hidden` (set while the
drawer is closed on mobile, cleared while open), the header's and story pane's `inert` +
`aria-hidden` (the mirror image — the shell behind an open drawer is frozen), and the toggle's
`aria-expanded` / `aria-controls`. At the desktop breakpoint every one of those attributes is
removed and `body.sheet-open` dropped, so the permanent aside is an ordinary tabbable column
again. `toggleSheet()` records the invoker, moves focus to a new drawer-only `.sheet-close`
button on open, and restores the invoker on close — skipping a target that is no longer
rendered, since the toggle itself is `display: none` at the desktop breakpoint.

Three ways out, all restoring focus: the ✕ button (rendered by `renderSheet` via a new
`onClose` option so it survives every pane rerender, and hidden by CSS at ≥900px), a backdrop
tap, and Escape. The Escape listener is bubble-phase and `defaultPrevented`-aware, so a dialog
opened over the drawer — which handles Escape in the capture phase (task 177) — is dismissed
without also collapsing the drawer under it. `keepSheetFocus()` wraps the pane rerender: a
drop/use from inside the open drawer destroys the focused control, and focus is put back in the
drawer instead of falling to `<body>`. `installSheetDrawer(root, { isMobile })` owns the
backdrop, Escape and `matchMedia` wiring and takes an injectable breakpoint probe, since a
headless page cannot resize its own window; `syncSheetBreakpoint()` is the exported transition.

26 assertions in `suite-economy` drive the real lifecycle against the same markup
`buildGameScreen()` builds: closed/open tab-order membership (computed by excluding anything
sealed in an `[inert]` subtree) and, as a live check that `inert` is doing the work rather than
just being present, that Chrome actually *refuses* `.focus()` on a control inside the closed
drawer and on a story control behind an open one; open via the toggle; close via Escape,
backdrop tap and the ✕ button, each asserting focus lands back on the invoker; a real `modal()`
over the drawer surviving its own Escape; a rerender from inside the open drawer keeping focus;
and both breakpoint crossings, including that `toggleSheet(true)` and Escape are no-ops on
desktop. Source contracts cover the game-screen wiring and the CSS visibility rules. The live
app was loaded headlessly at 360px — `aside#sheet-pane … inert aria-hidden="true"` with the
toggle carrying `aria-controls="sheet-pane" aria-expanded="false"` — and at 1200px, where the
aside carries none of it. Full browser suite: RESULT ALL PASS pass=1979 fail=0, all 4,369
sections rendering.

## 193. Stale speech callbacks can advance or cancel a newer narration

**Priority: MEDIUM — a delayed callback from cancelled speech can skip the first chunk of a
new section or stop its playback.**

`Narrator.stop()`/`play()` cancel utterances without changing a session identity.
`onend`/`onerror` guard only on `playing` and the numeric chunk index. If an old index-0
utterance fires after a new index-0 narration starts, it satisfies both checks and advances
the new session to chunk 1. Navigation, rerender and autoplay make this hand-off routine.

Increment a narration generation on play, stop and rerender; capture it in each utterance
callback and ignore older generations. Keep the existing chunk/highlight/state behavior and
normal completion sequence.

With a speech-synthesis stub, begin a new narration and then fire the cancelled utterance's
late start/end/error callbacks. Assert the new first chunk and highlight remain current;
verify ordinary multi-chunk completion, manual stop and autoplay navigation.

**Done.** `Narrator` carries a `_gen` narration-session counter, bumped by `play()`, `stop()`
and `handleRerender()`. `_speakFrom()` captures it when it builds the utterance and all three
callbacks are gated on `gen === this._gen` in addition to the existing `playing` / `index`
checks, so nothing queued by a retired session can act. Chunk advancement within a session
keeps the same generation, so the normal chain, the highlight moves and the `_finish()`
sequence are untouched.

Ten assertions in `suite-economy` (last block in the suite, so its stub can never be visible to
another) install a stubbed `speechSynthesis` / `SpeechSynthesisUtterance` — restored in a
`finally` — which records each utterance so its callbacks can be fired by hand. They cover the
routine hand-off (`handleRerender()` then `autoplayIfEnabled()` on the new flow) followed by the
old utterance's late `start`/`end`/`error`; ordinary two-chunk completion with the highlight
following each chunk and then clearing; a manual `stop()` whose own late callbacks speak nothing
more; and navigating on from a stopped narration.

Verified as a real regression test by removing the `gen === this._gen` guard: three of the ten
fail, and the detail is exactly the filed bug — `index=1` (the new narration advanced past its
own first chunk, `spoken=3/2`) with the new highlight cleared to `null`. With the guard back:
RESULT ALL PASS pass=1989 fail=0, all 4,369 sections rendering.

## 194. SPA section transitions provide no focus target or announcement

**Priority: MEDIUM — after activating a choice, keyboard and screen-reader focus falls off
the removed control without conveying the newly loaded section.**

The Story article has no focus target/live-region labeling and the rendered section number
is a plain `div`. Navigation, undo and return only reset scroll position. When the activated
button is replaced, focus commonly falls to the document body; same-section rerenders make
it important not to solve this with an indiscriminate focus steal.

Expose an accessible section heading/story target and focus or announce it exactly once for
real navigation, undo and return. Preserve the user's focus during rolls, markets, combat
redraws and other same-section rerenders; narration/autoplay should not duplicate the
announcement.

Add DOM/browser regressions for choice, goto, undo and return transitions, plus negative
checks for roll, inventory and market rerenders.

## 195. DOM-free rule modules are not directly importable in Node

**Priority: MEDIUM — the documented architecture/test seam fails before any test can run and
rule modules acquire a browser-data dependency.**

`engine.js` and `render-rules.js` import `availableBooks()` from `data.js`, whose module top
level constructs `new DOMParser()`. Direct Node import therefore throws
`ReferenceError: DOMParser is not defined`; the dependency also reaches the engine/combat/
market chain despite the rule-module invariant forbidding browser globals.

Move bundled-book availability behind a DOM-free registry or an explicit value supplied by
the app/planner. Keep XML parsing/fetching in `data.js`; do not make the rules query the view
or install a Node DOM dependency merely to mask the coupling.

Add a direct Node import check for `engine`, `combat`, `market`, `state`, `render-rules`,
`render-gates` and `visit-state`, plus browser tests for every available/unavailable-book
condition and navigation gate.

## 196. The build stamp is date/EOL dependent and omits service-worker code

**Priority: MEDIUM — identical deployed content can get a new cache key, while a real
service-worker-only release can keep the old version identity.**

`stamp-version.ps1` culture-sorts absolute paths, hashes raw checkout bytes, excludes all of
`sw.js`, and prefixes `Get-Date`. With `core.autocrlf=true` and mixed working EOLs, the same
tracked content hashes differently: this review's no-source-change build changed
`26.07.22.5eb892d` to `26.07.26.a39de8b`; canonical-LF content yields a third digest,
`5143ac4`. Task 144 removed the same no-op date churn from `meta.json`, but the stamp itself
still has it.

Hash ordinal-sorted repo-relative paths plus LF-normalized content. Include `sw.js` after
replacing only its generated VERSION assignment in memory with a fixed placeholder, avoiding
the circularity noted in task 64. Preserve the existing date when the digest is unchanged
(or remove the date component); choose a new date only for a genuine content change.

Verify LF/CRLF checkouts and a later-day no-op yield the identical full stamp and clean tree;
a service-worker body edit and ordinary app edit change the digest/cache key; changing only
the generated VERSION line does not; repeated builds are byte-identical.

## 197. CI tests committed bundles without rebuilding their XML source

**Priority: MEDIUM — source-of-truth XML can be malformed or changed without regenerated
JSON, while CI passes by exercising the old committed bundle.**

The workflow's `build-scripts` job only checks ASCII/`#Requires`; the smoke job immediately
serves `web/data`. It never runs `build-data.ps1`, so neither its 4,377-file validation nor a
source/generated drift check protects a pull request.

After task 196 makes output machine-stable, run the PowerShell 7 build in CI and fail on any
generated diff (`web/data`, copied assets, `version.js`, `sw.js`) before running smoke against
the newly built files. Keep the dependency-free runtime and current full-section browser
test.

Verify clean HEAD builds with zero diff, malformed source fails validation, a valid XML-only
edit fails generated-drift, and the same edit with regenerated output passes build plus
smoke.

## 198. A failed save deletion can leave an unrecoverable ghost slot

**Priority: LOW — the failure needs a storage exception at one narrow point, but it can lose
the save blob while permanently reserving its slot.**

`deleteSlot()` removes `fl_save_<slot>` before rewriting `fl_meta`. If the metadata write
throws, the blob is already gone while its stale card remains. `reconcileSlotMeta()` repairs
only blob-without-meta, not the inverse, and `nextFreeSlot()` treats the ghost metadata entry
as occupied. The async Delete handler neither catches nor reports the error.

Write the metadata deletion first and remove the blob only after it succeeds, so interruption
leaves the task-137 recoverable blob-only form. Catch both storage operations and surface the
existing persistence warning without redrawing a false-success list.

Force the metadata write to throw: the blob and visible slot must remain and no rejection may
escape. Then retry successfully and prove both records disappear and the slot is reusable.

## 199. Build validation misses source-schema typos and bundled-book dangling targets

**Priority: LOW — the corpus is currently clean, but the validation step would accept the
same tag/attribute mistakes that caused earlier player-facing tasks.**

`Test-XmlDoc` checks well-formedness and numeric section root/name only; Adventurers/Rules
even pass no expected root. Unknown live tags/attributes, invalid enumerated values, malformed
referenced pregen biographies and explicit missing targets inside Books 1–6 can reach output.
Historical `safeAddGodd` and `tag`/`tags` source typos illustrate the silent failure mode.

Before writing any generated file, validate required roots, live tag/attribute/value
allowlists (including documented project extensions), referenced pregen XML, and explicit
targets whose destination book is bundled. Continue to allow intentional Books 7–12 links,
computed targets and missing optional artwork.

Add small mutation fixtures for wrong root, unknown tag/attribute, bad enum, dangling
bundled target and malformed referenced bio. The unmodified 4,377-file corpus must pass with
byte-identical output.

## 200. AGENTS.md overstates test-suite parse-error isolation

**Priority: LOW — the false troubleshooting advice can waste time precisely when a focused
suite refuses to start.**

AGENTS.md says separate module scopes mean a duplicate top-level declaration aborts only
that suite. `_test.html` statically imports all seven suites, so a syntax error in any
dependency prevents the harness module from evaluating and the classic bootstrap reports one
global `RESULT FATAL`; `?suite=` does not isolate an unselected suite from parse failure.
Separate scopes only prevent declarations in different valid modules from colliding.

Correct the paragraph to match the current static import/bootstrap behavior. This is a
docs-only change; verify the revised troubleshooting text agrees with `_test.html` and CI.

## 201. A service-worker update can erase an unsaved character-creation draft

**Priority: LOW — the race is infrequent, but every creation field exists only in local
variables until Begin Adventure.**

On `controllerchange`, `registerSW()` reloads immediately because game progress normally
autosaves. The creation screen's selected book/profession, edited name and gender are not
state yet, so an update that activates while the form is open silently resets the entire
draft. `skipWaiting()` makes that timing possible without a user reload.

Defer the reload while an unsaved screen is active (or preserve and restore the minimal
draft), then apply it once the user safely leaves/commits. Keep the one-reload guard and
automatic update behavior for title/saved gameplay.

Mock `controllerchange` during edited creation: no immediate reload and every field survives;
after Begin/Back, exactly one deferred reload may occur. A controller change during normal
autosaved play should keep the existing behavior.

## 202. Complete remaining form, selection and progress semantics

**Priority: LOW — the controls work visually, but several common interactions expose no
programmatic label or selected/value state.**

Starting book, name and gender render adjacent `<label>` elements without `for`/nesting;
voice and speed repeat the pattern. Profession cards and map tabs show selection only by
class. Cache amount inputs lack names, and the Stamina meter is only styled divs rather than
a value-bearing progress object. Task 153/177 covered live regions and dialogs, not these
semantics.

Associate labels/inputs, expose profession and map selection with the appropriate
pressed/tab state and keyboard model, name numeric cache controls from their action/context,
and give Stamina current/max progress semantics. Preserve the current visual design and avoid
inventing a generic component system.

Add focused DOM/accessibility assertions for each control family and keyboard selection,
then check creation, narration settings, maps, caches and the mobile/desktop Sheet manually.

## 203. An imported return frame restores unvalidated vars, ticks and location

**Priority: MEDIUM — a `<return>` from an imported save can push non-numeric variables and a
bogus tick baseline into live state, bypassing `sanitizeData`'s own rules for those fields.**

Found while doing task 180. `sanitizeVisit()` keeps `visit.frame` as a bare `asObj`, and
`Story.deserializeFrame()` then copies its payload verbatim: `vars` is spread as-is,
`entryTicks`/`book` are passed through unconverted, and `location`/`sectionTodock` are taken
without coercion. `restoreReturn()` writes all of them straight into `data.vars`,
`data.location` and the entry-tick snapshot — so until the next load re-sanitizes, a string or
object var feeds `resolveValue()` arithmetic and every `<if var=>` gate, and a negative or
fractional `entryTicks` skews the `<if ticks=>` comparison. The frame's `book`/`section` are
already effectively validated (`data.getSection` must return a real element), and task 180
now rebuilds the frame's fight memo, so this is the remaining unvalidated slice.

Coerce these frame fields on the way in, mirroring `sanitizeData`: keep only finite numeric
vars, floor `entryTicks` to a non-negative integer, force `book` to a positive integer and
`location`/`sectionTodock` to a string or null. `serializeFrame` lives in `visit-state.js`, so
put its inverse there too and let the Story method delegate — keep the pair in one place
rather than validating in the view module.

Test a crafted frame (string/object/NaN vars, a negative fractional `entryTicks`, a non-string
location) resuming and then returning: no non-numeric var reaches `data.vars`, the tick gate
compares against a sane baseline, and an ordinary detour-and-`<return>` still restores its
exact vars, location, todock and used action. Run the focused persistence suites and the full
browser suite.

## 204. A derived `<set>` inside a `<while>` body is not traced per iteration

**Priority: LOW — latent: no section in the corpus derives a value inside a loop body, so
today nothing reaches the gap. It is a hole in an otherwise complete invariant.**

Found while doing task 181. The provisional-dependency trace has two seeds. The
section-scoped one (`rerollPendingVars`, and `unsettledVars` for not-yet-rolled vars) is run
through `provisionalVarClosure`, so a derived `<set>` defers with its source. The per-pass one
is not: `whileIterPendingVars` collects only the roll var the current `<while>` iteration
re-rolls — deliberately, because a loop roll's var must not suppress the loop-entry gate that
is showing it (§6.700 reads `x` both inside and outside) — and `viewPendingVars` unions that
raw set. So a `<set var="s" value="x*5">` inside a loop body, with `x` re-rolled per pass,
would apply against the PREVIOUS pass's `x` (or 0 on the first), and an effect keyed on `s`
would not defer. All seven derived-`<set>` sections (§2.266, §2.698, §6.17, §6.352, §6.488,
§6.625, §6.86) sit outside any loop, which is why `viewPendingVars` documents the limit rather
than paying for it.

Close it without re-introducing the leak the scoping prevents: the closure must be computed
over the pass's own vars and confined to the loop body, so a derived var inside the loop
defers while the same names outside it stay readable. Prefer growing the per-pass set (the
`<set>` nodes within the `<while>` subtree) over widening the section-scoped one, and keep the
computation DOM-free in `render-rules.js`.

Add a synthetic `<while>` whose body derives a value from its per-pass roll: prove the derived
effect applies once per pass with THAT pass's value, that an unrolled pass defers it entirely,
and that a loop-entry gate outside the body still reads the roll that opened the loop (§6.700
stays green). Run the focused render/inventory suites and the full browser suite.

## 205. The provisional-result gate locks a flee exit the fight gate deliberately leaves open

**Priority: LOW — latent: no section pairs a `<choice flee="t">` with a die roll, so no live
combat can currently be reached through it.**

Found while doing task 181. Every other navigation gate exempts fleeing: `computeRollGate`,
`computeTransferGate` and `computeBuyGate` each skip a node with `flee="t"`, and
`computeFightGate` leaves both the flee choice and the mid-fight escape `box=` choice ungated,
because abandoning a fight must stay available. `applyPendingRerollGate` (task 181) works on
rendered buttons instead of nodes and disables every `.goto`/`.choice`, so a direct
`<choice flee="t">` would be locked behind a provisional roll while the fight widget's own
Flee button (a `.btn-secondary`) stays live — the same escape offered twice, gated once. There
is no softlock (Keep is one click away), but the two paths disagree.

Bring the gate in line with the established convention: leave a flee/escape exit clickable and
gate only the ordinary onward navigation. That needs the flee/escape role to be legible to the
gate — tag the rendered button the way `tagFightNav`/`tagRollNav` already tag theirs, rather
than re-deriving the rule in the view.

Add a fixture with a rerollable roll beside a `<choice flee="t">`: the ordinary exits lock
while the result is provisional, the flee choice stays live, and taking it still routes through
the task-178 durable consequence contract. Run the focused actions/combat suites and the full
browser suite.

## 206. The service worker's precache list has drifted from `web/js` and nothing checks it

**Priority: MEDIUM — `edition.js` is already missing, so an update-then-go-offline sequence
can leave an installed player with a broken app.**

Found while doing task 197. `sw.js`'s `REQUIRED` array names 21 of the 22 modules in `web/js`:
`edition.js` (added by task 195) was never added to it. The list is hand-maintained and
unverified, so the omission is invisible — the browser suite loads over HTTP, and task 138
deliberately keeps live CacheStorage I/O out of the suites.

It is not merely a missed nicety. `install` calls `addAll(REQUIRED)`, which succeeds, and
`activate` calls `FLCache.prune(caches, VERSION, REQUIRED)`, which judges the new cache
complete against that same short list and therefore deletes the previous cache — the only
place `edition.js` was held (the fetch handler had cached it opportunistically under the old
version key). A player who takes an update and goes offline before the next page load fetches
`edition.js` again has no copy of a module the rule modules import, so the app fails to boot
offline. This is exactly the partial-cache hazard tasks 179/190 closed elsewhere.

Add `./js/edition.js` to `REQUIRED`, then close the class of bug rather than the instance:
assert against the `sw.js` **source text** (the task-138 pattern — fetch and parse it, no
CacheStorage I/O) that every `web/js/*.js` file appears in `REQUIRED` or is explicitly
exempted, so the next added module fails the suite instead of shipping. The module list has to
come from somewhere the test can see; deriving it from the same `web/js` sweep the build
already does is one option, an explicit exemption list in the test is another.

Note the same hand-maintained-coverage shape in `stamp-version.ps1`: its digest sweep is a
non-recursive `web/js/*.js` (plus fixed extension filters), so a module added in a new
subdirectory would ship without moving the stamp or the cache key. `web/js` is flat today, so
this is latent — decide whether to recurse it or leave it and document the constraint.

Verify: the new assertion fails on the current `sw.js`, passes once `edition.js` is listed, and
fails again if any other `web/js` module is removed from `REQUIRED`. Full browser suite green.

## 207. A `<while>` pass's provisional vars are position-sensitive within the body

**WITHDRAWN — the reported behaviour is correct, not a defect.** Filed while working task 204
and tested straight away; the fixture disproved it.

The claim was that because `whileIterPendingVars` starts each pass empty and grows as the pass's
rolls are walked, a statement placed ABOVE its own pass's roll reads the previous pass's value
and commits it. It does — and that is what JaFL does. A section executes SEQUENTIALLY, so in
iteration 2 a line above the roll really does run before that roll and really does see iteration
1's value. Making the set position-blind (seeding the whole body at pass start) is strictly
wrong: such a read would defer forever, because its own roll can never re-assert in time. The
attempted fix showed exactly that — the derived charge either used the stale value anyway or
never applied.

Kept as a test instead of a task: `task204b` in `suite-inventory` drives a loop body whose
derived `<set>` and `<lose>` sit above the roll and pins the sequential reads (the entry roll on
pass 1, pass 1's roll on pass 2, once each), and `viewPendingVars` documents why the per-pass set
is position-sensitive on purpose.

## 208. The documented headless-test command captures no DOM under PowerShell

**Priority: LOW — the failure is silent and mimics the documented "page never loaded"
symptom, so it misdirects at exactly the moment the suite result is what you need.**

`chrome.exe` is a Windows GUI-subsystem binary, so it inherits no stdout handle when
PowerShell launches it. The step-2 command in AGENTS.md therefore captures an empty string and
any `Select-String 'RESULT'` over it finds nothing. `chrome.exe --version` prints nothing
either, which isolates the cause to the missing handle rather than to the page, the server or
the suite. The tests do run and pass meanwhile — the static server logs the full request set
and the reporter reaches its aggregate — so an empty capture is indistinguishable from the
documented "a 'no RESULT line' therefore means the page never loaded (server down, or a 404
from the wrong path)". Redirecting through `cmd` gives the process a real handle and the same
command yields the full dump (135,029 bytes, `RESULT ALL PASS pass=2100 fail=0`, title
`TESTS_OK`).

Document a capture form that works from PowerShell — redirect via `cmd /c "… > <file>"`, then
read the RESULT line out of that file — and extend the troubleshooting notes so an empty dump
is listed as a *capture* failure and not only as a page-load failure. While there, check
whether "headless Edge occasionally dumps empty DOM" is describing this same missing-handle
symptom rather than a browser difference; if it is, correct that attribution too.

Docs-only, no app or build change. Verify by copying the documented command verbatim into a
fresh PowerShell session: it must produce a non-empty dump containing `RESULT ALL PASS` and
title `TESTS_OK`.

**Done.** Step 2 of the build+test loop now dumps to a file redirected through `cmd` and reads
the verdict back with `Select-String`, and the "no RESULT line" note lists a failed *capture*
ahead of a failed page load — check the dump's size first, because that failure is the silent
one. `README.md` carries the same command and a matching capture note. The documented command
was run verbatim from a fresh PowerShell session: 135,029 bytes, `RESULT ALL PASS pass=2100
fail=0`, title `TESTS_OK`, against the reproduced empty capture (0 chars) from the old form.

The Edge attribution was wrong and is corrected rather than reworded. "Headless Edge
occasionally dumps empty DOM" described this same missing-handle symptom: `chrome.exe` and
`msedge.exe` are both GUI-subsystem binaries and behave identically in both directions — run
directly from PowerShell each prints nothing even for `--version`, and through the `cmd`
redirect each produces the same 135,029-byte dump with the same `RESULT ALL PASS pass=2100
fail=0`. The docs no longer prefer one browser over the other; they require the redirect.

## 209. `Published=` does not produce a complete, clean offline edition

**Priority: MEDIUM — the current six-book edition is intact, but publishing or withdrawing
a book through the new registry can leave an online-only or stale offline bundle, and the
supposedly edition-wide corpus check can pass without scanning the added book.**

Found while re-reviewing the unnumbered `184f566` refactor after task 208. That change made
`books/books.ini`'s `Published=` line drive source validation, JSON generation and the map /
illustration copy loops, with the explicit goal that publishing a book become a content-only
change. Three release/test consumers still hard-code Books 1–6: `sw.js` lists six
`data/book<N>.json` files and six regional maps (plus today's three illustrations), and
`suite-corpus.js` loops `for (b = 1; b <= 6; b++)`, while `suite-engine.js` asserts the
published count is exactly six. Adding a book is therefore not content-only: the aggregate
first fails at a stale count assertion; after that obvious assertion is updated, the added
book can appear in `meta.json` and work online while its data/art are absent from a fresh
offline install and every one of its sections remains outside the final render scan.

The reverse transition is also not clean. `build-data.ps1` overwrites outputs for listed
books but never removes build-owned `web/data/book<N>.json`, regional maps or copied
illustrations for a book removed from `Published=`. CI's rebuild-and-diff gate cannot expose
those stale tracked files because the rebuild leaves them in place. Configuration mistakes
are similarly quiet: a missing published directory is `continue`d in validation and all
three build loops, duplicate numbers survive the parse, and a missing title silently becomes
`Book N`. A typo can thus produce a partial edition rather than fail before generated files
are written.

Finish the single-source contract. Validate `Published=` as a unique positive set whose
entries have the required title/path and source directory, before the build writes anything.
Make its normalized set drive the generated book inventory, service-worker required/optional
inventory and the corpus scan. Generate or stamp the offline inventory from the registry
instead of maintaining another six-book list by hand. Reconcile build-owned outputs on each
run so withdrawing a book removes its stale JSON/map/copied art, but preserve unrelated
manual illustration drop-ins documented by the README (stage/replace owned outputs or track
their ownership; do not wipe `web/assets/illus/`).

Add fixture coverage for malformed/duplicate/missing entries and for both directions of a
synthetic added-book transition: adding it reaches meta, required offline data and the
meta-driven every-section scan; removing it deletes only its build-owned outputs. Prove the
current `Published=1,2,3,4,5,6` rebuild remains byte-for-byte unchanged, then run the source
validator self-test, Node import boundary and full browser suite.

**Done.** The edition manifest now lives in one place, `build/release.ps1`, dot-sourced by
`build-data.ps1` and driven over fixtures by the new `build/release-selftest.ps1` (CI runs it
beside the source-gate self-test). `Get-BookRegistry` parses *and* validates `books.ini`
before the build writes anything: `Published=` must be a unique set of positive numbers, and
each entry must carry a non-blank `<N>.Title=`, a `<N>.Path=`, and a source directory that
exists. All four used to fail quietly — the old parse cast every token straight to `[int]`
(so a typo aborted with a raw cast exception rather than a diagnosis), duplicates survived,
a missing title became `Book N`, and a missing directory was `continue`d by validation and by
each of the three copy loops, yielding a partial edition. `Path=` is now honoured rather than
decorative: `Test-SourceTree` takes the publish set as number → directory, so the gate and
the build iterate one resolved set (its error labels name the actual folder, which is
byte-identical to the old `book<N>/…` for today's tree).

The two release consumers that duplicated the line follow it now. `sw.js` has one generated
region between `BEGIN`/`END GENERATED BOOK INVENTORY` markers holding `BOOK_DATA`,
`BOOK_MAPS` and `BOOK_ILLUS`, spread into `REQUIRED`/`OPTIONAL`; `Set-BookInventory` rewrites
it from the publish set and the illustrations the copy loop actually copied, throwing if the
markers are gone rather than shipping an inventory that no longer tracks the edition. The
illustration URLs are escaped to match `encodeURIComponent` exactly (`Uri.EscapeDataString`
additionally escapes `!'()*`, which are put back) because a precache URL *is* the cache key.
`suite-corpus.js` scans `data.availableBooks()` instead of `1..6` and now also asserts the
edition is non-empty and that every published book has bundled section data — so a book that
reached `meta.json` with no JSON fails the suite instead of only a player's browser. The
`suite-engine.js` count assertion checks the registry against `meta.json`'s own book list
rather than a literal `6`, and derives its unpublished example from the same list; a literal
count would have failed first and invited "bump the 6" instead of noticing the other two
consumers had not followed.

`Remove-StaleBookOutputs` reconciles build-owned outputs on every run, so a withdrawal
removes `web/data/book<N>.json`, `web/assets/maps/book<N>.jpg` and that book's copied
illustrations. Ownership of `illus/` is decided by scanning every book folder for the art the
copy loop could have produced (one shared `Get-BookIllustrations`, so the copier and the
reconciler cannot disagree): the general per-section art the README invites players to drop
in matches no book folder and is never touched, so nothing wipes `web/assets/illus/`.

Coverage: `release-selftest.ps1` is **`RESULT ALL PASS pass=47 fail=0`** — fourteen registry
cases (missing/empty/non-numeric/zero/duplicate `Published=`, missing and blank titles,
missing `Path=`, missing directory, plus the shapes that must still pass: padding, ordering,
a `\uXXXX` title escape, and a non-conventional `Path=`), the inventory writer (encoding, an
untouched surround, a no-op re-run, a marker-loss throw), and a **real build of a fixture
tree in both directions** — `build-data.ps1` gained a `-Root` parameter (passed through to
`stamp-version.ps1`) so publishing an added book is checked to reach `meta.json`, its bundled
data and the offline inventory, and withdrawing it to delete exactly its own outputs while the
base book's outputs and a manual `142.jpg` drop-in survive.

The transition runs once per number in a `$ADDED` list — a book inside the series and one
(99) outside it — with every path, title, meta and inventory assertion written against the
number under test. `suite-engine.js`'s unpublished example is derived the same way: the
lowest book in `meta.titles` this build does not bundle. (`meta.titles` deliberately keeps
all twelve series titles in either direction, so an unpublished book can still be named in
the "not in this edition" message; only `meta.books` tracks the publish set.) Both directions
were mutation-checked: stubbing out the reconcile call turns the six "removes its …"
assertions red for both numbers rather than passing vacuously.

Verified: the `Published=1,2,3,4,5,6` rebuild leaves `web/data` and `web/assets`
**byte-for-byte unchanged** (only `version.js`/`sw.js` moved, and only because `sw.js`'s own
source changed), and the hand-written inventory region matched the generated one exactly on
the first run (`sw.js: offline book inventory already current`). Source validator self-test
**`RESULT ALL PASS pass=23 fail=0`**; Node import boundary **`RESULT ALL PASS pass=35
fail=0`**; fresh-profile Chrome aggregate **`RESULT ALL PASS pass=2102 fail=0`** (2100 + the
two new corpus assertions), title `TESTS_OK`.

One process note worth keeping, added to `AGENTS.md`: the first browser run reported a
byte-identical `pass=2100` dump *after* the suite edits, because a leftover
`python -m http.server 8848` from a previous session still owned the port. Python sets
`allow_reuse_address`, so the new server bound without error on Windows while the old process
kept answering — a stale tree served under a confident `RESULT ALL PASS`. Checking the port's
owning process (a `CreationDate` predating the session) and `curl`ing an edited file exposes
it in seconds.

## 210. Game teardown leaves the mobile Sheet drawer open across screens

**Priority: LOW — a recovery/death transition can make the next game start with its story
and header inert and the Sheet unexpectedly open; it is recoverable with Close, but leaks
accessibility and focus state between SPA screens.**

Task 192 made `body.sheet-open` the drawer's source of truth and correctly preserves it when
a dialog opens above the Sheet. `releaseGameScreen()`, which every title/create/saves/game
shell transition calls, only disposes the `Story`; it does not close the drawer, clear
`sheetOpener`, or retire the old drawer root. On mobile, `syncSheetDrawer()` removes the body
class only at the desktop breakpoint. A modal path that leaves the game while the Sheet is
open (the death/recovery routes can call `showSaves()` or `showCreate()`) therefore clears the
old markup but leaves the global class. The next `installSheetDrawer()` sees that class,
announces `aria-expanded="true"` and makes the new header/story inert before the player has
opened anything.

Add a small drawer teardown/reset operation to the existing game-shell release lifecycle.
It should remove `sheet-open`, clear the stale opener/root reference and leave the outgoing
shell unisolated without trying to focus a control that is about to be removed. Keep the
document-level Escape/breakpoint listeners single-install as they are; this is state cleanup,
not repeated listener churn. Installing a genuinely new mobile shell should also establish a
closed state defensively, while ordinary Sheet rerenders must continue preserving an open
drawer and focus.

Extend the task-192 lifecycle fixture: open the mobile drawer, emulate a transition to a
non-game screen, then install a second game shell. Assert the body class is gone between
screens, the new toggle starts collapsed, the new Sheet is closed/inert, the new header/story
are live, and no detached opener receives focus. Keep the existing dialog-over-drawer,
mobile↔desktop and in-drawer rerender tests green; run the full browser suite.

---

## 211. Re-archive completed task details 166–210 and clear them out of the priority buckets — LOW (process/docs)

*(Filed 2026-08-02; recurring maintenance after tasks 141 and 165.)* Task 165
archived completed details 1–165, but the 166–210 burn-down has since completed
every detailed task again. Their checked rows fill the HIGH/MEDIUM/LOW work
queues while ~1,480 lines of completed detail sit between the checklist and the
Review log, so TASKS.md is back to roughly its pre-archive size and the "first
open task" workflow is harder to scan.

Move completed detail sections 166–210 into TASKS-archive.md under their stable
IDs, consolidate their summary rows into a single numeric **Done** list, and
leave only open-task detail plus the Review log in TASKS.md. Extend the archive
intro/Contents range without losing completion notes or historical review text.
Documentation-only; validate every checklist ID has exactly one detail heading
across the two files, then commit.

*Done 2026-08-02:* documentation-only re-archive, scope 166–210 as filed plus
this task's own detail (211), matching how task 165 archived itself. Moved every
detail section 166–210 verbatim (completion notes intact, headings unchanged)
into TASKS-archive.md, extended the archive intro/Contents to IDs 1–211, and
merged the HIGH/MEDIUM/LOW rows into the **Done** checklist in numeric order —
including 207's `[~]` withdrawn row, which keeps its pointer to the Review log.
The **HIGH**/**MEDIUM**/**LOW** headings stay in place (kept deliberately, so new
work is filed under an existing bucket) and are now empty; TASKS.md keeps the
intro, those three headings, the full **Done** checklist, the archive-range note
(now 1–211) and the Review log, dropping from 2,093 to 609 lines. Validated that
every checklist ID 1–211 has
exactly one `## <N>.` detail heading across the two files and no duplicate Done
rows (180 was previously listed both in **Done** and in the HIGH bucket). No
code, data, build or test files touched, so no rebuild or stamp change is
implied.

---

## 212. `titleCase` capitalises the letter after an apostrophe ("Ghoul'S Head")

**Priority: LOW — cosmetic, but it is in the shared display helper, so it affects every book.**

`titleCase` in `web/js/render-util.js` was `s.replace(/\b\w/g, (c) => c.toUpperCase())`. A word
boundary sits after an apostrophe, so a possessive item name rendered with a stray capital:
book1/517's `<item name="ghoul's head"/>` showed as "Ghoul'S Head", as did `pirate captain's head`
and `boar's tusk`. It surfaced anywhere `itemLabel`/`bonusSuffix` runs — award buttons, the
Adventure Sheet, market rows.

Fixed by matching the word-initial letter with its preceding character instead of a bare word
boundary — `/(^|[^\w'’])(\w)/g`, upper-casing only the captured letter — so a `\w` directly after
an apostrophe, straight or curly, is skipped and everything else is unchanged. `suite-render`
pins both halves: "ghoul's head" → "Ghoul's Head" and "merchant’s cloak" → "Merchant’s Cloak",
while "silver holy symbol", "fur cloak" and hyphenated "half-elf charm" title-case as before.

Found during conversion work on an unpublished book, whose `merchant's cloak` renders the same
way. The corpus has carried possessive item names since book 1.

---

## 213. The post-fight gate does not hold an item award, so loot is takeable before the fight

**Priority: MEDIUM — a live rules leak in books 1–6 today, and it blocks conversion work.**

Task 69's fight gate holds a *bare post-fight effect* until the fight resolves, then applies only
the branch actually taken. `computeFightGate` (`web/js/render-gates.js`) builds that hold from two
node sets: `navNodes` — every `goto`/`choice`/`return` after the `<fight>` — and `effectNodes`,
which it populates from **`lose` and `gain` only**:

```js
if (seenFight && !skip && !gated && (tag === 'lose' || tag === 'gain') && …)
```

The item family is absent. `renderItemAward` (`web/js/render-rewards.js`) never consults
`story.fightGate` either, so an `<item>`/`<weapon>`/`<armour>`/`<tool>` award written after a
`<fight>` in the same section renders a **live Take button before the fight is fought**. The
navigation is correctly held, so the player cannot leave — but they can pocket the loot and then
lose.

Books 1–6 have carried this since book 1. Confirmed against a real `GameState`: book1/55 is
`<fight name="Cultist" …/> If you win, you find a <item name="bag of pearls"/> on his body.` —
its `<goto section="10">` renders disabled, its Take button renders **enabled**, and clicking it
puts the pearls on the sheet with the cultist untouched. book5/162's magic lockpicks have the same
shape (its `<gain shards="15"/>` in the same sentence *is* held, so one half of the reward waits
and the other does not). book2/469 shows the corpus already works around it by hand, wrapping the
dragon's-head award in `<if dead="f">`.

The fix is symmetrical with the existing hold: classify item-family awards into `effectNodes`
alongside `lose`/`gain`, and give `renderItemAward` (and `renderReplaceAward`) the held state —
a disabled Take rather than an omitted one, matching how a held `<lose>`/`<gain>` still shows its
words. Regression coverage belongs in `suite-combat`: book1/55's Take is disabled while the fight
is unresolved, live after a win, and never live after a loss.

Fixed exactly that way. `computeFightGate` now classifies `FIGHT_EFFECT_TAGS` — `lose`/`gain`
plus the item family — under the same `!skip && !gated && !hidden` guard, so a wrapped award
(book2/469's `<if dead="f">`) is still left alone and the existing win/lose/uncond prose roles
are unchanged. The take/hold decision moved out of `classifyPassive` into an exported
`isFightHeld(view, node)` in `render-rules.js`, which `renderItemAward` now consults before it
builds the button: held → a disabled `Take <item>` titled "Fight first" (or "The fight went the
other way" once the fight has resolved against it). The check sits above the `replace=` branch,
so `renderReplaceAward` inherits it. `ITEM_FAMILY_TAGS` moved to `render-gates.js` — the gate
needs it and the two rule modules' dependency stays one-way — and `render-rules.js` re-exports
it, exactly as it already does for `isRollGate`, so every existing import site is unchanged.

`suite-combat` pins book1/55 end to end: the Take is disabled on entry beside the (already
disabled) `<goto 10>`, goes live after a win and really banks the pearls, and after a loss stays
disabled with nothing on the sheet — plus two DOM-free gate assertions for the bare and the
`<if>`-wrapped shapes. book5/238's trapped stone bracelet (task 60) turned out to be the same
idiom — "If you win, the treasures of the tomb are yours" — so its `suite-inventory` test now
asserts the hold first and wins the wight before taking the bracelet, which is the fix working
rather than a test accommodation.

Found during conversion work on an unpublished book, which has four sections of the same shape
held back until this is fixed — converting them first would add new instances of the leak rather
than expose the old ones.

---

## 214. A visit-box redirect does not hold the section body, so a one-time reward is re-takeable

**Priority: MEDIUM — a live rules leak in books 1–6 today; it makes one-time treasure farmable.**

The corpus's standard once-only-reward idiom puts a redirect at the head of a `boxes=` section and
the reward below it, both as siblings:

```xml
<section name="16" boxes="1">
  <p><if ticks="1">If there is a tick in the box, <goto section="251"/> immediately.</if>
     If not, <tick/> and read on.</p>
  …
  <p>You may choose up to three of the following treasures: <items group="1.16" limit="3"/></p>
  …eight <weapon>/<armour>/<tool>/<item> awards…
</section>
```

The box exists precisely to make the haul one-time, and the printed redirect is the book's way of
saying "leave now". But the port renders the **whole** section: nothing ties the body to the
`<if ticks="0">` branch, so on a revisit the redirect goes live *and the reward does too*.

Confirmed against a real `GameState`. **book1/16** (the sea dragon's hoard): a first visit ticks the
box and takes three treasures; entering again with the box ticked renders the live `<goto 251>`
redirect **and all eight Take buttons live again**. The simpler single-award form of the same shape
behaves the same way: a first visit ticks the box and takes the award, and a revisit re-offers a
live Take that really banks a **second** copy (measured: 1 → 2). Neither is caught by task 27's
`addTick` cap, which only stops the tick *count* from running past `boxes=`; the body was never in
scope for that fix.

book1/16 has carried this since book 1. It is **not** the same thing as an untaken `<if>` branch
rendering greyed-but-visible (deliberate, so the reader keeps the context): here the *taken* branch
says leave, and the section keeps handing out rewards anyway.

Two shapes of fix, and the choice is a design decision rather than an obvious repair:

1. **Source-side** — move each such body inside the `<if ticks="0">` branch. Faithful and needs no
   engine change, but it restructures the paragraph layout of every affected section across the
   whole corpus, and would have to be told apart from the sections where reading on after the
   redirect is genuinely intended.
2. **Engine-side** — treat a `<goto>` inside a *matched* `<if ticks=>` at the head of a section as a
   redirect that holds the rest of the section's effects and awards, the way task 69's fight gate
   holds a post-fight effect. Cheaper and uniform, but it needs a rule for which redirects count, so
   an optional "you may return to X" link is not mistaken for a mandatory one.

Worth settling as part of the same pass: whether `<items group … limit="N">`'s limit persists across
visits or is re-armed per visit. book1/16's first visit correctly stopped at three of eight; what a
*second* visit's allowance should be follows directly from whichever fix above is chosen.

Found during conversion work on an unpublished book, whose sections inherit this idiom rather than
introducing it.

Fixed **engine-side (option 2)**, because the original engine settles it. `GotoNode.execute()`
defaults `force` to **true** and then returns false — *"User must follow this goto - block further
execution"* — with a 2007 comment recording that relaxing it *"allowed the player to ignore the goto
in 5.113"*, the same bug class; `IfNode.execute()` propagates that halt out of a matched branch. So
in JaFL the body below a taken redirect never executed, and the sections are correctly written as
they stand. Option 1 would have rewritten published book text in 89 files to work around a gap the
original engine did not have.

New DOM-free planner `computeRedirectGate(sectionEl, state)` in `render-gates.js`: it returns the
matched head `<if ticks=…>` whose branch carries a **mandatory** redirect, and the walk holds
everything after that node. `isMandatoryRedirect` encodes JaFL's `canUse()`/force rules — an explicit
`force="f"`, a `flee`/`sail` exit, a `price=`/`flag=` gated one, or a `<goto>` inside a
`<choice>`/`<choices>`/`<group>` is the player's to pick and halts nothing (today every one of the
corpus's 152 `<if ticks>` gotos carries `section=` alone, so the guards are there for conversion
work). The gate is scoped to the section **head** — only prose and `hidden="t"` book-keeping, which
JaFL runs before it reaches the goto, may precede the `<if>` — which is what admits book5/697 (a
hidden curse cleanup sits above its redirect) and excludes book1/10: Yellowport's `ticks="4"`
redirect sits under two codeword guards after a live `<tick>`, and holding its body would strip the
`StillInYellowport` book-keeping that stops the hub redirecting to §273 forever.

Held content gets the treatment of the untaken branch it really is — `Story.renderHeldNode` greys
the words, suppresses the effects and disables the controls, exactly as `renderConditionalBranch`
does — rather than vanishing, so the reader keeps the printed context. That reproduces what the
sections already written with an explicit `<else>` (book5/592) render today, and `render()` clears
`redirectHeld` per draw so a mid-visit rerender re-decides it.

`suite-render` pins six planner cases (matched / read-on visit / effect-before-head / hidden-before-
head / `force="f"` / in-`<choices>`) and four sections end to end: **§1.16** — first visit takes one
of eight treasures with §251 inactive, revisit activates §251 and disables all eight Takes, the
read-on exit to §135 and further clicks bank nothing; **§1.542** — the single-award form can no
longer bank a second potion (measured 1 → 1, was 1 → 2); **§1.160** — the revisit holds the MAGIC
roll and leaves §461 as the only live exit, so the leak's routing half is closed too; plus
non-regressions for **§1.10** (hub choices stay live on the fourth visit, gate is null) and **§5.592**
(the already-`<else>`-wrapped section's display is unchanged). Aggregate: `RESULT ALL PASS
pass=2149 fail=0`.

The `<items group … limit="N">` sub-question needs no change: the limit lives in the per-visit
`ctx.groupLimits`/`groupPicks`, so it re-arms each visit — and with the body held on a revisit
there is nothing left for a re-armed allowance to grant. The visit box, not the limit, is what
makes the haul one-time, which is how the book reads it.

Two neighbours were found while scoping this and filed rather than folded in: the post-tick count
reading (**216**) and the non-head redirect (**217**).

---

## 215. A self-closing effect tag renders no words, so published sentences print with a hole

**Priority: LOW — cosmetic, but it silently deletes printed words from books 1, 2, 3 and 6 today.**

`renderPassive`'s plain-effect path (`web/js/render-rewards.js`) builds a `span.fx`, fills it with
the node's own children, and then drops it when it is empty:

```js
if (!span.textContent.trim() && isBareBoxTick(node)) span.textContent = 'tick the box';
if (span.textContent.trim()) container.appendChild(span);
```

A **bare section-box `<tick/>`** gets synthesised filler (task 70). Nothing else does. So a
self-closing effect tag written *inline in a printed sentence* — where the sentence's own words are
the thing the tag names — renders **nothing at all**, and the sentence loses those words.

Measured against a real `GameState`: **8 of the 10** inline self-closing title tags in the corpus
print no text.

| section | printed line | renders as |
| --- | --- | --- |
| book1/61 | `Write <gain title="Unspeakable Cultist"/> in the Titles and Honours box` | "Write  in the Titles and Honours box" |
| book1/255 | `awards you the title <gain title="Protector of Sokara"/>.` | "awards you the title ." |
| book1/256 | `He rewards you with the title <gain title="King's Champion"/>.` | "with the title ." |
| book2/405 | `<gain title="Chosen One of Nagil"/>.` | the sentence is only the tag |
| book3/393 | `<gain title="Saviour of Vervayens Isle"/> on your Adventure Sheet.` | " on your Adventure Sheet." |
| book6/12 | `<gain title="Junior Court Rank"/>,` | "," |
| book6/324 | `Lose the title <lose title="Junior Court Rank"/>` | "Lose the title" |
| book6/479 | `<gain title="Enlightened One"/>.` | the sentence is only the tag |

The **rules half is unaffected** — §1.255 really grants the title and §6.324 really removes it; only
the words are lost, which is why it has never shown up as a rules failure. The same rule bites
`<gain shards="500"/>` (confirmed: "He pays you <gain shards='500'/> for it." renders "He pays you
for it." while the 500 Shards are credited).
The **wrapping** form the corpus uses elsewhere is unaffected — book4/228's
`note the title <gain title="Arena Champion">Arena Champion</gain>` prints correctly, as do
book4/444, book4/568, book5/662, book6/339 and book6/384.

Two shapes of fix:

1. **Source-side** — rewrite the ~10 inline tags into the wrapping form the same books already use
   elsewhere. Smallest blast radius and no engine change, but it edits published book text (adding
   back only the words the tag swallowed, so the tag-stripped prose is restored, not altered).
2. **Engine-side** — extend the `isBareBoxTick` synthesis so an empty `span.fx` falls back to a
   label derived from the effect (`rewardLabel` already builds "500 Shards" and a title name for
   choose-one buttons). Uniform, but it invents wording where the author wrote a name, and it must
   not start printing labels for the many *deliberately* wordless tags — the mechanic-only
   `<lose title=…/>` nodes sitting alone inside `<if>`/`<outcome>` wrappers in book1/187,
   book2/18, book2/293, book2/442, book5/148, book5/376, book6/114, book6/118 and book6/589, which
   correctly render nothing today.

Distinguishing those two populations is the actual work: an inline tag has sibling text in its
parent, a mechanic-only one does not. Regression coverage belongs in `suite-render`.

Found during conversion work on an unpublished book, which uses the wrapping form throughout for
exactly this reason. book1/255 has carried the defect since book 1.

Fixed **engine-side (option 2)**, and the original engine both settles the choice and supplies the
discriminator the filing was missing. `TickNode`/`LoseNode.handleContent` carry an explicit
`!hadContent` branch that fills in a **default label per attribute** — a codeword reads "tick/erase
the codeword X" (capitalised by `isNewSentence` when it opens a sentence), Shards "N Shards", a
title/curse/item its own name, a `<lose stamina>` "lose N Stamina points", a blessing its printed
description (`Blessing.getContentString`), and a bare box tick "put a tick there now" (which the
port already had as task 70's "tick the box"). So the sections are correctly written as they stand
and the words belong to the engine, not to the source.

The filing's proposed test — sibling text in the parent — is not what JaFL uses, and would have
mis-sorted the population. Its rule is `hidden || getParent().hideChildContent()`, and
`hideChildContent()` is true for exactly `GroupNode`, item `EffectNode` and `TradeEventNode`: a
`<group>` prints its own `<text>` label instead of its children, which is precisely what keeps the
nine "deliberately wordless" nodes silent — every one of them is a `<group>` member ("delete Nagil
from the God box" + `<lose god>` + `<lose title>`), bar book6/118's, which is `hidden="t"`.

The scope is much wider than the ~10 title tags the filing measured. A corpus scan for childless,
non-hidden `<gain>`/`<lose>`/`<tick>` nodes outside a `<group>`/`<effect>` found **422** across the
six books, of which the biggest families are 176 `shards`, 55 bare box ticks (already handled), 37
`blessing`, 38 `codeword`, 31 `item`, 10 `title` and 5 `stamina`. They are holes in the printed
sentence, not decoration: book1/18 read "they give you !", book1/303 "Cross the  from your Adventure
Sheet", book1/4 "you have returned the .", and book4/26's entire paragraph was "**.**".

New DOM-free rule `defaultEffectWords(node, state, atSentenceStart)` in `render-rules.js` (with a
`BLESSING_WORDS` table mirroring `Blessing.getContentString`); the view calls it from the single
`appendFxWords` helper, which both the `inert` and `apply` verdicts now share, with `atSentenceStart`
read off the container's text so far. It returns `''` for anything with no JaFL default — an
ability/god/special/profession effect, a `?`/`*` wildcard selector — so no wording is invented for a
form the rule does not know. Priced/flagged effects are unaffected: they never reach this path, since
`classifyPassive` routes them to their own payment and choose-one widgets, which keep `rewardLabel`.

`suite-render` pins the eleven label forms directly off the planner (including the two that must stay
silent), the sentence-position capitalisation both ways, the rendered inline sentence for a Shards
award and an item loss, the two silence rules (`hidden="t"`, a `<group>` member not printing its name
twice), and three real sections end to end — **§1.255** ("the title Protector of Sokara"), **§1.186**
("hands you over 75 Shards") and **§4.26** ("Tick the codeword Dread."). The every-section scan
covers the remaining ~400. Aggregate: `RESULT ALL PASS pass=2187 fail=0`.

---

## 216. `<if ticks="N">` after an in-section `<tick>` reads the pre-tick count, so "now ticked" branches never fire

**Priority: MEDIUM — four sections in books 1, 2 and 4 route to the wrong place on every visit today,
and one codeword is unobtainable.**

*(Filed 2026-08-08 while scoping task 214.)* Task 105 made `<if ticks=>` read an **entry snapshot**
(`state.entryTickCount()`, `engine.js` ~L213) so this visit's own `<tick/>` cannot flip the guard on
a mid-visit rerender. That is right for the idiom it was filed against — book1/496's redirect, where
the `<if>` sits **above** the `<tick/>` and asks "was the box already ticked?".

The corpus also carries the mirror idiom, where the `<tick>` comes **first** and the `<if>` asks about
the count *now*. Against a fixed entry snapshot those branches are permanently off by one visit:

| section | printed line | should route | routes |
| --- | --- | --- | --- |
| book1/19 | `<tick>Put a tick</tick> in an empty box. <if ticks="3">If all three boxes are now ticked, <tick codeword="Anvil">…` | 3rd visit gains **Anvil** | entry=2, never matches — the codeword is **unobtainable** |
| book4/467 | `<tick>Tick one now</tick>. <if ticks="1">If this is your first visit, <goto 516/></if><elseif ticks="2">…</elseif><else>…<goto 284/>` | 1st → §516, 2nd → §397 | entry=0/1, so the `<else>` wins: **every** visit → §284 |
| book2/542 | `<if not="t" ticks="3"><tick>Put a tick in the first empty box</tick>. <if ticks="1">…<goto 490/>` | 1st → §490, 2nd → §565, 3rd → §613 | all three visits → §613 |
| book1/10 | `<tick>tick the first empty box</tick> … <if ticks="4">If this is your fourth visit, <goto 273/>` | 4th visit → §273 | entry=3, never matches — §273 unreachable from the hub |

The outer `<if not="t" ticks="3">` in book2/542 is the *entry* reading ("if they weren't all ticked
already") and is correct as it stands, so the two readings genuinely coexist inside one section — a
per-section override would not do.

Both readings are the same rule in JaFL: a section executes **sequentially**, so a `ticks=` guard sees
the count as of its own position. The fix is to evaluate against **entry ticks plus the ticks this
visit has already applied above this node**, rather than either a frozen entry snapshot or the live
total. That keeps task 105's guarantee (a `<tick/>` *below* the guard still cannot flip it, on the
first draw or a rerender) while letting a guard below a tick see it. It needs a walk-position input
that `evaluateCondition` does not have today, so the count belongs on the per-visit record
(`visit-state.js`) alongside the other position-sensitive state, in the manner of task 204's
per-pass vars. Regression coverage belongs in `suite-render` (book4/467's three routes, book2/542's
inner/outer split) and `suite-inventory` (book1/19's Anvil on the third visit), plus a pin that
book1/496 still behaves exactly as task 105 requires.

Fixed as filed: the guard now reads its **own position**, not a frozen snapshot. A corpus scan for
an `<if|elseif ticks=>` sitting below a bare box `<tick>` found a **fifth** affected section beyond
the four above — **book6/164**, whose "if you have just ticked the *N*th box" choices are gated on
codewords that post-tick guards set. Off by one, the first visit set **none** of them, so the tengu
king's section offered no live choice at all and the player could only Undo out of it.

`evaluateCondition(el, state, opts)` takes an optional `opts.ticksNow`; without it the `ticks=`
disjunct still reads `state.entryTickCount()`, so the headless effect-body walk, `computeRedirectGate`
and direct use are unchanged. The renderer supplies it: `render()` seeds `story.walkTicks` from the
entry snapshot beside `redirectHeld`, `appendChildren` calls the new `noteBoxTick(path, before)` as
the walk passes each `<tick>`, and the three view-side `evaluateCondition` calls (the if/elseif chain
and the per-node `renderIfChain`) pass the running value. `noteBoxTick` compares this section's box
count either side of the node: when it moved, this visit's tick landed there, so the resulting count
is memoised on the per-visit record (`ctx.boxTicks`, `visit-state.js`) under the node's positional
path and replayed by every later draw — the tick itself cannot re-fire, its `fx@` memo being in
`ctx.applied`. The memo is serialised with the rest of the ctx and coerced back through `frameNum`
(non-negative integer, string key) on load, since it feeds a routing comparison straight from an
untrusted save. A tick inside an untaken branch, or below a taken task-214 redirect, never applies
and so never advances the position.

That keeps task 105 exactly: a guard **above** a tick reads the entry count on the first draw and on
every rerender, because the walk has not passed the tick when it is evaluated. Scope limit: only
ticks the section walk itself passes advance the position — one bundled inside a roll `<group>`'s
deferred effects would not — which no section in the corpus needs today.

`suite-render` pins **§4.467** (four visits → 516 / 397 / 284 / 284, all four of which used to be
284), **§2.542** (490 / 565 / 613, then the fourth visit's §390 — the outer `not ticks="3"` entry
reading and the inner post-tick one coexisting in one section, all three of which used to be 613),
**§6.164** (the first visit offers exactly the "just ticked the first box" choice, where it used to
offer none), **§1.496** end to end as the task 105 idiom (first visit reads the box empty and keeps
reading it empty across a mid-visit rerender after taking the spear; the second takes the §317
redirect), and a save/reload of §4.467's second visit that still routes to §397. `suite-inventory`
pins **§1.19**'s Anvil arriving on the third visit and not before. Aggregate: `RESULT ALL PASS
pass=2167 fail=0`.

---

## 217. A visit-box redirect below the section head still leaves both exits live (book1/91)

**Priority: LOW — one section, a routing shortcut rather than a re-takeable reward.**

*(Filed 2026-08-08 while scoping task 214.)* Task 214's redirect gate is scoped to the section
**head** so it can never catch a mid-section option, which deliberately leaves one section of the
same family unfixed. book1/91 (the Gambler's Den) puts its redirect in the closing paragraph, after
the `<group>` bet and the `<outcomes>` table:

```xml
<p>
  <tick special="unlock" cache="1.91" hidden="t"/>
  When you are ready to leave,
  <if ticks="0"><tick>put a tick in the box</tick> and <goto section="109"/>,</if>
  unless the box is already ticked, in which case <goto section="100"/>.
</p>
```

On a first visit the `<if ticks="0">` matches, so §109 is offered **and** the trailing §100 is live
beside it: the player can leave to §100 without ticking the box, and come back. The book offers one
exit or the other, never both. It is the same JaFL rule as task 214 (the matched branch's forced
`<goto>` blocks what follows), just not at the head, and the *other* half of the section — the
`<moneycache>` bet, its `lock`/`unlock` ticks (task 38) — is what makes widening the head rule
delicate enough to keep separate.

Two shapes of fix: widen task 214's gate to any matched `<if ticks=>` redirect and let the head rule
survive only as the exclusion that keeps book1/10 out (needs re-checking against the cache lock, and
against task 216 once that lands, since book1/91's guard sits below a hidden tick); or wrap the
trailing sentence in an `<else>` in the source, which is the form book2/443 and book2/160 already use
for exactly this pair of exits and is a one-line, section-local change. Regression coverage belongs
in `suite-render` beside the task 214 cases.

Fixed by **widening the gate**, for the reason task 214 chose the engine over the source: in JaFL the
matched `<if>`'s forced `<goto>` blocks the rest of the section wherever it sits, so book1/91 is
correctly written as it stands and an `<else>` wrap would work around a gap the original engine did
not have. Editing one file rather than 89 does not change which side the defect is on.

The scan that scoped it found the section count is **four, not one**. Classifying every
`<if|elseif ticks=>` in the corpus that carries a mandatory redirect: **146 head** (already gated),
**6 mid-section** in 5 sections, **5 nested inside another condition**, 0 inside a player-optional
wrapper. The mid-section six are book1/91, **book2/465** (the SCOUTING training), **book3/57** (the
island rest) and **book3/84** (Lose the codeword Cosy) — all four printing the same "…and →A, unless
the box is already ticked, in which case →B" pair — plus book4/467's `<if ticks="1">`/`<elseif
ticks="2">`, where holding the rest of a chain whose other branches are already inactive is a no-op.

So the head window is gone, replaced by the exclusion it was really standing in for: a redirect is
eligible when it is reached **unconditionally** — no `<if>/<elseif>/<else>/<success>/<failure>/
<outcome>` and no `<choice>/<choices>/<group>` above it. That keeps book1/10 out (its `ticks="4"`
redirect sits under two codeword guards) and book2/542's inner chain out (its own outer `<if>` is
already the section's head gate), which is every one of the five nested cases.

`computeRedirectGate(sectionEl)` consequently stopped taking `state`: eligibility is a **structural**
property, and whether one matches this visit is the walk's call, made by the same if/elseif chain
evaluation it runs anyway. That also removes a disagreement task 216 would otherwise have introduced
— the planner read `ticks=` against the entry snapshot while the walk reads it at its own position,
which for book4/467 named a branch the walk does not activate. The planner now returns the Set of
eligible nodes and the walk holds after whichever it renders active.

book1/91's gamble is untouched: its `<moneycache>` bet, the roll `<group>` and the `lock`/`unlock`
ticks (task 38) all sit **above** the redirect, so only the closing sentence is held.

`suite-render` pins the planner's three structural rules (eligible below a live effect, not eligible
nested in a condition, not eligible for an optional/`<choice>` goto) and all four sections end to end
— empty-box visit leaves only the ticking exit live and still prints the words above the redirect;
ticked visit leaves only the other exit — plus §1.91's bet widget and roll surviving on the empty-box
visit. Aggregate: `RESULT ALL PASS pass=2200 fail=0`.

---

## 218. The Adventure Sheet chips a blessing by its XML key, not the name the book prints

**Priority: LOW — cosmetic, but the Sheet and the section prose now disagree with each other.**

*(Filed 2026-08-08 while working task 215.)* Blessings are stored under the canonical key the XML
uses — `storm`, `disease`, `magic` — and `renderSheet` (`ui.js` ~L335) chips `d.blessings` verbatim,
so the Blessings row reads "storm", "disease", "magic". The books never call them that: they are
*Safety from Storms*, *Immunity to Disease/Poison* and a MAGIC blessing, which is what JaFL prints
from `Blessing.getContentString()` — the six ability blessings as the ability in caps, the rest by
their printed name.

Task 215 gave the *section prose* those names (`BLESSING_WORDS` in `render-rules.js`), so a section
that reads "Write Safety from Storms in the Blessings box" now sends the player to a Sheet listing
"storm". The two should agree, and the Sheet is the half that is wrong.

The fix is to move that table to a shared display helper and use it in `renderSheet` as well —
`render-util.js` is the natural home (pure label formatting, already shared by the view modules),
leaving `render-rules.js` to import it the way `render-rewards.js` does. Worth checking the same
pass: `rewardLabel`'s choose-one button, which shows `titleCase(blessing)` ("Storm", "Magic"), and
the `(permanent)` suffix the Sheet appends (book6/159), which must survive the rename. The stored
key must NOT change — saves, `<if blessing=…>` and the alias folding all key on it; only the
display does.

Fixed exactly that way. The table and its lookup moved to `render-util.js` as an exported
`blessingLabel(spec)` — the module's dependency-free rule is kept by normalising with a plain
trim/lower-case (which is what `state.js`'s `canonBlessing` does anyway) instead of importing
`normalize`. `render-rules.js` now imports it; the Sheet, `rewardLabel` and the reroll offer
call it too, so all four displays print one table.

The reroll button in `render-rolls.js` turned out to be a **third** copy of the same rule
(`name === 'luck' ? 'Luck' : name === 'travel' ? 'Safe Travel' : name.toUpperCase()`), output-
identical over the reroll-eligible set — abilities plus Luck and Safe Travel — so folding it in
changed nothing on screen but removed the drift the task is about. Two displays did change:
the Sheet chip (`storm` → `Safety from Storms`, `magic` → `MAGIC`), and the choose-one pick
button, which was `titleCase` — §6.171's six picks now read `CHARISMA`…`THIEVERY` rather than
`Charisma`…`Thievery`, agreeing with the prose beside them. A wildcard `blessing="*"` labels
nothing, so `rewardLabel` falls through to its `Choose` default rather than showing an empty
button. `(permanent)` is appended to the new label, and the stored key is untouched.

`suite-render` pins all of it: the four lookup rules (printed name, alias spelling, ability in
caps, wildcard/empty → `''`); a book6/159-shaped sheet chipping `Safety from Storms (permanent)`
and `MAGIC` with no chip starting "storm", while `data.blessings` still reads `storm,magic` and
`hasBlessing('storms')` still matches; §6.171's real pick buttons; and the reroll offer's exact
two lines.

---

## 219. `<sold>` fires on a sale but its documented twin `<bought>` does nothing on a purchase

**Priority: LOW — no shipped book uses it, so nothing is broken today; it is a half-implemented
tag that leaves "mark this when the player BUYS X" with no vocabulary at all.**

*(Filed 2026-08-08 during conversion work on an unpublished book, whose market must record that a
particular item was just purchased.)* `rules/JaFL-XML-Tags.md` documents `<bought>` and `<sold>`
together, as one pair with identical *item attributes*: both may sit directly inside a `<market>`
(matching by attributes) or inside one `<trade>`/`<item>` row (firing for that article), and both
carry an action that runs when they activate.

The port implements only half of it. `render-market.js`'s `runSoldHooks` is called from the **Sell**
button's commit path and consults the row's own `:scope > sold` plus the market-level `<sold>`
filters; the **Buy** button's click handler (`buyTrade` → `story.rerender()`) fires no hook of any
kind. `<bought>` is not read anywhere, and `build/validate-source.ps1`'s child allowlist carries
`'sold' = 'item tags'` with no `bought` entry — so a book that wrote one would fail the source gate
before it ever reached the renderer.

Evidence that the implemented half works and shows the shape the missing half needs: `book3/318`
(a market-level `<sold item="?" tags="318.free">` marking a codeword when a *free* item is resold)
and `book3/86` (a row-level `<sold>` on the pirate captain's head). Both are sale-side; the corpus
contains **no** `<bought>`, which is why the gap has never surfaced.

The fix is symmetric with `runSoldHooks` and small: fire a `runBoughtHooks` from the Buy click
after `buyTrade` succeeds, matching the row's own `:scope > bought` and any market-level `<bought>`
whose *item attributes* match the goods actually bought, then add `'bought' = 'item tags'` to the
allowlist in the same change (task 199). Two details differ from the sale side and are worth
pinning: a purchase has no *existing* possession to match against, so the filter must read the
**goods descriptor** (and the `buytags=` the row stamps on the new item), not a pre-owned item's
tags; and a `quantity=` row can fire the hook more than once per visit, where a sale cannot, so the
hook must be idempotent or the action it wraps must tolerate repeats (`addCodeword` already does).

`suite-economy` is the natural home for the coverage: a market-level `<bought>` that fires only for
the matching row, a row-level one that fires for its own article, neither firing on a *sale* of the
same goods, and a `quantity="3"` row firing its hook on each of the three buys.

Fixed exactly that way. `render-market.js` now collects the market-level `<bought>` children beside
the `<sold>` ones, threads them into `renderShopRow`, and fires a `runBoughtHooks` from the Buy
click once `buyTrade` reports `ok` — the row's own `:scope > bought` unconditionally, plus every
market-level filter that matches. `'bought' = 'item tags'` joins the allowlist in
`build/validate-source.ps1` (task 199), so a book may now write one.

Two details of the buy side shaped the code. The filter has no pre-owned possession to read, so a
new `boughtItem(goods)` builds the descriptor of what the row *adds* — `splitItemName`'s stored
name plus its `|` alternatives, and the `buytags=` `goodsFrom` already folded in, which is exactly
what `buyTrade` puts on the Sheet. A ship/cargo buy adds no possession and so returns `null`,
mirroring a ship *sale* carrying no sold item: in both directions the row's own hook still fires
and the market-level filter cannot match. `soldMatches` is now `hookMatches`, since one predicate
serves the possession sold and the descriptor bought; nothing else about the sale path changed.

The one real asymmetry is left to the book rather than papered over: a `quantity=` row can fire the
hook once per buy where a sale fires at most once, so the wrapped action must tolerate repeats —
which `<tick codeword>` does, and which the new coverage pins with a `<gain shards>` counter rather
than a codeword, so a second firing would be visible instead of idempotent. No shipped book writes
a `<bought>`, so the ten new `suite-economy` assertions build a synthetic market modelled on
book3/318's market-level filter and book3/86's row-level hook.

---

## 220. The documented headless-dump command runs nothing from an MSYS shell, so a stale dump reads as a pass

**Priority: LOW — a documentation gap, not a code defect. But it produces the one failure mode the
build+test loop is least able to survive: a confident, plausible, *wrong* `RESULT ALL PASS`.**

*(Filed and fixed 2026-08-08, hit twice in one session while running the loop from a POSIX shell.)*
Task 208 added step 2's `cmd`-mediated redirect because a GUI-subsystem `chrome.exe` launched
straight from PowerShell inherits no stdout handle. That fix is correct **for a PowerShell caller**,
which is the only caller the note imagined. Run the same line from an MSYS/Git-Bash prompt and it
does something worse than fail: it runs nothing, reports success, and leaves whatever file the last
run wrote sitting at the redirect target.

Two independent hazards, both reproduced in isolation:

- **The switch is path-mangled.** MSYS argument conversion rewrites a lone `/c` as a path, so
  `cmd` never sees a switch. It opens *interactively*, prints its banner and prompt to stdout,
  **exits 0**, and writes no file. `cmd /c 'echo hello > "%TEMP%\q.txt"'` and the full Chrome line
  behave identically — banner, exit 0, no file.
- **The redirect target then fails anyway.** With the switch preserved (`//c`, or
  `MSYS_NO_PATHCONV=1`), `> "%TEMP%\out.html"` fails with *"The filename, directory name, or volume
  label syntax is incorrect"* and exit 1. A literal `> C:\…\out.html` works and exits 0.

The first hazard is the dangerous one, because the caller's next step is
`Select-String -Path "$env:TEMP\fl-dump.html" -Pattern 'RESULT'` — which happily reads a **leftover
dump from an earlier run**. That file has a plausible size and a plausible `RESULT ALL PASS`, for a
different page, possibly from a different session. Task 208's own guard ("check the dump's size
first, since that failure is silent") catches an *empty* capture and cannot catch a *stale* one: the
byte count is the reassuring part.

Fixed in `AGENTS.md` beside task 208's note rather than by changing the command, since the command
is right for the shell it was written for. The note now records both hazards, the two verified ways
to get a real handle — run step 2 from PowerShell as written, or skip `cmd` entirely with
`Start-Process chrome.exe -ArgumentList … -RedirectStandardOutput "$env:TEMP\fl-dump.html"
-NoNewWindow -Wait` — and the guard that distinguishes the two failures: **delete the target before
the run and check its `LastWriteTime` after**, because a missing file is unambiguous where a stale
one is not.

This is a sibling of the leftover-`http.server` note already in `AGENTS.md`: both are ways the loop
reports green while measuring something other than the tree under test, and in both the tell is a
timestamp older than the session.

---

## 221. A single flag-linked `<resurrection>` ignores the payment and renders a free Arrange button

**Priority: LOW — no shipped book hits it, because every book 1–6 resurrection is either free or
priced in Shards via the tag's own `shards=`. It is latent, and it is the resurrection-shaped
instance of the leak task 125 closed for the item family.**

*(Filed 2026-08-08 during conversion work on an unpublished book, whose temples charge something
other than money to arrange a deal.)*

`renderResurrection` (`web/js/render-market.js`) reads `flag=` exactly once, at the top:

```js
const resFlag = node.getAttribute('flag');
if (resFlag != null && isChooseOne(story.sectionEl, resFlag)) return renderChoosableReward(...);
```

`isChooseOne` (`render-rules.js`) requires **two or more** rewards on the key. So `flag=` works only
inside a multi-reward pick — book1/597's amber wand | 500 Shards | resurrection is the corpus's
only use, and it works. A **single** `<lose … price="x"/>` + `<resurrection … flag="x">` pair falls
straight past that line into the ordinary visible-offer path below, whose only guard is
`btn.disabled = done || (cost > 0 && story.state.data.shards < cost)` — with no `shards=` on the
tag, `cost` is 0, so the button is **enabled regardless of whether the flag was ever set**. The
player can arrange the deal without paying, and paying is separately a silent no-op because nothing
ever consumes the flag.

This is exactly the shape task 125 fixed for items: `isPricedItemAward` was added precisely because
a *single* priced item reward "otherwise renders a free Take button and grants nothing when paid".
`<resurrection>` is a `CHOOSE_ONE_TAGS` member and `grantChosenReward` already knows how to grant
one and clear its key — the arm-then-take path simply never routes to it.

`<group>` is not an available workaround, and it is worth stating so the fix is not deferred to it:
`groupPlan`'s effect list is `lose, tick, gain, set, curse, transfer`, and its `resNode` handling
sets `isRevival` only for a **no-`section=`** resurrection (the death-revival trigger). A
`<resurrection book= section=>` child of a group is therefore neither applied as an effect nor
recognised as a revival — the group would charge its `<lose>` and arrange nothing at all.

The fix mirrors task 125: extend the arm-then-take predicate (or add a `isPricedResurrection`
sibling) to cover a lone flag-linked `<resurrection>` carrying a `[price=key]` cost elsewhere in the
section, render it as a `renderChoosableReward` so it draws "Pay first to choose this." until the
flag is set, and let `grantChosenReward`'s existing resurrection branch do the granting and clear
the key. Note the payment need not be money: `<lose ability="?" amount="1" price="x">` already
renders an ability chooser that applies on click, which is the case that surfaced this.

`suite-economy` is the natural home for the coverage, alongside task 125's: a lone
`<resurrection section= flag="x">` behind a `<lose shards="N" price="x">` is LOCKED before payment,
arms on payment, grants exactly one deal pointing at the right book/section, and is spent
afterwards; the same behind a `<lose ability="?" amount="1" price="x">`; and book1/597's three-way
pick still behaves as it does today.

Fixed with the sibling predicate rather than by widening `isPricedItemAward`, since the two families
grant through different code: `isPricedResurrection(sectionEl, key)` (`render-rules.js`) is true for
a `[price=key]` cost whose linked rewards are all `<resurrection>`. `renderResurrection` consults it
directly after its `isChooseOne` line, and `renderOptionalPay` joins it to the routing that sends a
cost to `renderChooseOnePay` — so the payment only ARMS the key and `grantChosenReward`'s existing
resurrection branch does the arranging and clears it. Nothing else about the ordinary visible-offer
path changed, so §4.428's free arrange and §3.351's hidden auto-registration are untouched.

Two details worth recording. The predicate requires `section=` on every linked node: a section-less
`<resurrection>` is the death-revival trigger (task 98), and routing one through the pick would
arrange a deal pointing nowhere. And `rewardLabel` now names a wordless `<resurrection section=…/>`
"Arrange resurrection" instead of falling through to a bare `Choose` — the same hole task 215 closed
for self-closing effect tags; a node with words (§1.597's "resurrection deal") is unaffected.

`classifyPassive`'s hidden-price `fireReward` was deliberately left alone: it excludes the item
family but not a resurrection, and firing one through `applyEffect` is a no-op (there is no
`resurrection` entry in `EFFECT_APPLIERS`), so it neither grants the deal nor disturbs the key the
new pick reads. Eleven `suite-economy` assertions cover the two payment shapes, the §1.597 boundary
and the section-less guard.

---

## 222. `ownsSoleLinkedBlessing` reads a linked `<lose blessing>` as a purchase, so a payment that STRIPS a blessing is refused

**Priority: LOW — latent, but only just. The one shipped section carrying the miscategorised shape
(book2/157) is saved by a routing accident rather than by the guard being right; see below. The bug
is in the predicate's reading of the attribute, not in any book.**

*(Filed 2026-08-09 during conversion work on an unpublished book, whose temples charge a fee to
leave a faith and strip the blessing that faith granted in the same act.)*

`renderOptionalPay` (`web/js/render-rewards.js`) disables a cost when

```js
} else if (ownsSoleLinkedBlessing(node, key, story.sectionEl, story.state)) {
  btn.disabled = true; btn.title = 'You already have this blessing';
```

and the predicate (`render-rules.js`) collects `blessing=` off the cost node plus every
`[flag="key"]` sibling, then returns true when there is exactly one such blessing and the player
holds it:

```js
nodes.forEach((el) => { const b = el.getAttribute && el.getAttribute('blessing'); if (b) blessings.add(b); });
if (blessings.size !== 1) return false;
return state.hasBlessing([...blessings][0]);
```

The guard's stated purpose is a **re-buy**: "refuse a re-buy that `addBlessing` would just dedupe
away, so no Shards are spent for nothing". That reasoning holds only when the linked node GRANTS the
blessing. A `<lose blessing="X">` linked to the same key means the opposite — the payment exists in
order to take X away — and there the predicate fires precisely when the transaction is *most*
worthwhile, leaving the button permanently disabled for every player who actually holds X and live
only for those it would no-op on. `rewardWasteReason` reads a bare `blessing=` the same way
(`if (bl && state.hasBlessing(bl)) return 'You already have this blessing.'`), so a choose-one
option that spends a blessing would be greyed out by the same reasoning.

Of the 24 flag-linked `blessing=` nodes in books 1–6, 23 are grants — book2/133's
`<lose shards="cost" price="x">` + `<tick blessing="poison" flag="x">`, book2/178's Safety from
Storms, and the rest of that family — so the guard does what it says for all of them. The 24th is
book2/157, and it is worth reading before assuming the bug is unreachable: the golden wheel's
`<lose shards="20" price="x"/>` links a `<lose blessing="*" flag="x">` ("Displeasure of the
goddesses"), the exact miscategorised shape, and a player carrying any blessing satisfies
`hasBlessing("*")`. It escapes only because its key also arms a `<random flag="x">`, so
`classifyPassive` routes it to `roll-payment` — and `renderRollPayment` carries no blessing guard at
all. One routing decision, not one book, is the whole margin. (The storm blessings spent by
`blessingSpendForGoto`/`blessingSpendForReroll` are separate paths and unaffected.)

The fix is one clause in each: consider only blessing-granting nodes — skip any node whose tag is
`lose` when collecting into `blessings` (`ownsSoleLinkedBlessing`), and gate
`rewardWasteReason`'s blessing branch on the node not being a `lose`, alongside the `curse`/
`disease`/`poison` handling directly below it, which already reads a `lose` as a *cure* and checks
that the affliction is present. That asymmetry — a linked `lose curse=` is understood as a removal,
a linked `lose blessing=` is not — is the clearest statement of the defect.

`suite-economy` is the natural home for the coverage: a `<lose shards="N" price="x">` linked to a
`<lose blessing="storm" flag="x">` is LIVE for a player holding Safety from Storms, charges exactly
N on the click and removes the blessing; a `<lose shards="N" price="x">` linked to a
`<tick blessing="storm" flag="x">` is still refused with "You already have this blessing" for a
holder and live for everyone else (the existing behaviour, unchanged); and book2/157's wheel is
still spinnable by a blessed player, which is the regression the routing accident currently
provides for free.

Fixed exactly that way, one clause each. `ownsSoleLinkedBlessing` now skips any node whose tag is
`lose` before collecting `blessing=`, and `rewardWasteReason` reads its `blessing=` only off a
non-`lose` node — so both predicates now agree with the curse/disease/poison branch that already
treats a `lose` as a removal. Nothing else moved: a linked `<tick blessing>` / `<gain blessing>` is
still refused to a holder with the same "You already have this blessing" and still live for everyone
else, which is what all 23 grant-shaped uses in books 1–6 need.

Skipping the *cost* node too (it is a `lose` in every corpus use) is deliberate rather than
incidental: a `<lose blessing="X" price="k">` would be the payment spending X, so counting it would
disable the click for the only players who can make it. No shipped section carries `price=` and
`blessing=` on one node, so nothing changes today.

Two things left alone on purpose. The mirror check — refusing a `<lose blessing="X">` option to a
player who does NOT hold X, the way the curse branch says "You don't have that curse." — is not
added: `hasBlessing` treats `*`/`?` as match-any (task 132), so a punitive "lose all blessings"
would read as ineligible for an unblessed player rather than as a no-op, and no book needs the
check. And §2.157 keeps its `roll-payment` routing; the coverage now pins the wheel as spinnable by
a blessed player through the predicate being right, not through that routing.

Nine `suite-economy` assertions: the removal shape live and charging exactly N, the grant shape
refused to a holder and live-and-granting to everyone else, `rewardWasteReason` split across a
`<lose blessing>` and a `<tick blessing>` option, and §2.157 spinnable with the predicate returning
false for its key.

---

## 223. A choose-one cost is payable when every linked reward is refused, so the payment is deferred rather than spent

**Priority: LOW — nothing is lost. `state.data.flags` is never bulk-cleared (no section entry, no
save round-trip resets it), so the armed key survives and the reward can still be claimed once the
blocker lifts. What the player gets is a payment taken now for a reward they cannot collect now,
with no warning that this is what the click does.**

*(Filed 2026-08-09 while fixing task 221, which routes a lone priced `<resurrection>` down the same
path. Pre-existing: it applies to task 125's item family exactly as much.)*

`renderChooseOnePay` (`web/js/render-rewards.js`) gates its cost button on affordability alone —
Shards on hand, or a matching possession for an item forfeit. It never asks whether any linked
reward is currently takeable, which is precisely the question `rewardWasteReason` (`render-rules.js`)
already answers for the pick side: a full 12-slot pack refuses an item Take with "No room", and a
held deal refuses a resurrection pick with "You already have a resurrection deal." So a player with
a full pack can pay 250 Shards for §1.342's potion and find the Take disabled; a player already
holding a deal can pay a temple and find the pick disabled.

The resurrection case is the sharper of the two because `addResurrection` REPLACES the standard deal
rather than stacking it (task 98), so "you already have one" is not a reason to refuse a *better*
deal at all — the player would be trading up. It stays refused until the held deal is spent by dying.

Note the asymmetry that makes this a real gap rather than a stylistic one: a *single-reward*
purchase (`renderOptionalPay`'s ordinary path) already refuses an unaffordable or ineligible click
in three separate ways — `plan.present && !plan.eligible`, `ownsSoleLinkedBlessing`, and the Shards
check — while the choose-one cost, which is the one whose reward is deferred to a second click,
checks the least.

The obvious fix is one clause in `renderChooseOnePay` — when `linkedRewards(sectionEl, key)` is
non-empty and `rewardWasteReason` refuses every one of them, disable the cost — and it is **wrong as
stated**, which is the part worth recording before anyone writes it. **A possession forfeit frees the
slot it is refused for.** §4.634's barter is "give one, take one": a player carrying twelve items
including the bag of pearls is refused the magic trident by `rewardWasteReason` *today*, yet handing
over the pearls frees a slot and the Take then works — exactly as it should, and as the existing
coverage asserts. A naive "every reward refused ⇒ disable" guard would break that live, shipped
barter to fix a case no book reaches.

So the guard must refuse only a reason the payment itself cannot clear:

- a carry-limit refusal is clearable when the cost gives up a possession — `losePaymentPlan(node,
  state)` reporting `present` with an item/weapon/armour/tool `kind` and `eligible` true;
- "You already have a resurrection deal." is never clearable by paying (no cost arranges or spends a
  deal), and neither is a blessing/affliction reason.

`suite-economy` is the natural home, alongside tasks 125's and 221's: a full pack cannot pay
§1.342's 250 Shards for the potion; a deal-holder cannot pay a lone priced resurrection; a full pack
CAN still trade at §4.634 because the forfeit frees the slot (the regression guard); and a synthetic
menu of `<resurrection>` + `<item>` stays payable for a deal-holder because the item is still
takeable — the "every, never some" rule.

Weigh the added branching against the payoff before taking it: nothing is lost today, no shipped
section reaches the unclearable case, and the cost of getting it wrong is breaking §4.634.

Fixed with the clearable split above, as a rule and not a view check: `menuWasteReason(costNode,
key, sectionEl, state)` (`render-rules.js`) is the cost-side twin of `rewardWasteReason` — it walks
every `[flag=key]` reward and returns null the moment one is takeable, so the "every, never some"
rule is structural rather than remembered. `renderChooseOnePay` consults it between the `armed`
branch and the affordability checks, matching the order `renderOptionalPay` already uses for its own
waste guards (`plan.eligible`, `ownsSoleLinkedBlessing`, then Shards).

The clearable case needed no reason-string matching, which would have been brittle. A carry-limit
refusal is the ONLY reason `rewardWasteReason` can give an item-family award — read the function: the
resurrection, blessing and affliction branches cannot fire for an `<item>`/`<weapon>`/`<armour>`/
`<tool>` — so "item-family reward + a cost that frees a slot" is exactly the clearable case, tested
structurally. The private `costFreesCarrySlot` asks `losePaymentPlan` for a `present`, `eligible`
possession `kind`; cargo and a ship live off the 12-item list and Shards were never on it, so only a
possession forfeit qualifies. An ineligible forfeit frees nothing, which is the case the cost's own
eligibility gate already refuses.

Ten `suite-economy` assertions, and the §4.634 one is the point of the exercise: a full pack is
refused a Shards-priced item (the Shards stay in the purse) and a deal-holder is refused a second
deal, while the same deal-holder may still pay a menu that also offers a takeable item, and a
FULL-packed player still trades pearls for the magic trident at §4.634 — pearls out, trident in,
pack still full. That last one fails against the naive guard this task was originally filed with.

---

## 224. A `price=`/`flag=` key strips an open ability loss of its chooser, so the engine picks which ability the player forfeits

**Priority: LOW — latent in books 1–6, and saved by the same routing accident task 222 turned on.
The one shipped section carrying an open ability loss (book2/157) keeps its picker only because its
key arms a `<random>`; move that key to a plain price and the picker is gone. The bug is in the
order of `classifyPassive`'s cascade, not in any book.**

*(Filed 2026-08-09 during conversion work on an unpublished book, whose two resurrection sites are
each bought with an ability point the player is told to choose.)*

`<lose ability="?">` means "lose 1 point from **any** ability — you choose which". Two separate
mechanisms exist so the player, not the engine, names what leaves: `needsAbilityChoice` →
`renderAbilityChoice` for abilities (task 75), and `losePaymentPlan.needsChoice` →
`showForfeitPicker` for possessions (task 117). **A payment reaches only the second.**

`classifyPassive` (`web/js/render-rules.js`) tests `price=` and `flag=` well before it asks whether
the node needs a chooser:

```js
if (price != null) {
  return { mode: isRollGate(view.sectionEl, price) ? 'roll-payment' : 'optional-pay', key: price };
}
...
if (flag != null && view.sectionEl && view.sectionEl.querySelector(`[price="${flag}"]`)
    && !isRollGate(view.sectionEl, flag)) {
  ...
  return { mode: 'inert', showWords: !hidden };   // applies with the linked cost
}
...
if (!hidden && needsAbilityChoice(node)) return { mode: 'ability-choice' };   // never reached
```

So an open ability loss carrying either half of the price/flag idiom never reaches
`needsAbilityChoice`. Both landing paths then call the engine with no chooser —
`renderOptionalPay`'s `commit(null)` and `renderChooseOnePay`'s `applyEffect(node, story.state, {})`
— and `abilityTargets` (`engine.js`) falls back to the first candidate:

```js
const picked = opts.chooser ? opts.chooser(cands, 1, 'ability') : null;
const chosen = (picked && picked.length) ? picked[0] : cands[0];
```

`cands` is `ABILITIES` order filtered to those above 1, so the forfeit is silently taken from
CHARISMA for almost every character. Task 117's picker cannot cover for it either: `losePaymentPlan`
enumerates `item`/`weapon`/`armour`/`tool`/`cargo`/`ship` and falls through to
`{ present: false, needsChoice: false }` for an ability, which is correct for its own purpose
(shards/god/blessing/crew are not possession payments) and simply means no ability ever asks for a
picker there.

Measured in books 1–6, all four legs on a real `GameState`: book2/157's
`<lose ability="?" amount="1" flag="x">` classifies `ability-choice` and renders its picker — but
only because its key also arms `<random dice="1" flag="x"/>`, so the `flag=` branch above is skipped
by `!isRollGate`. The same tag re-keyed to a plain `<lose shards="20" price="k"/>` classifies
`inert`, renders no `.ability-pick` at all, and paying docks CHARISMA. Used as the *cost* node
itself (`<lose ability="?" amount="1" price="k">`) it classifies `optional-pay`, same result. This
is the identical margin task 222 recorded on the identical section — one routing decision, not one
book — which is why the two are worth reading together.

The fix is to let an open ability spec ask for its chooser on the payment paths rather than to
reorder the cascade (`price=` must keep winning: the payment has to arm its key). The natural shape
is the ability twin of `showForfeitPicker` — when the cost or an inert linked node satisfies
`needsAbilityChoice`, reveal `abilityChoiceOptions(spec, state, /*forLoss*/ true)` as pick buttons
and bind each to `commit(() => [ability])`, exactly as the possession forfeit already does. Note
`abilityChoiceOptions`'s `forLoss` already drops anything at 1, which is the printed "you cannot
choose an ability that already has a value of 1", so the eligibility rule needs no new code.

`suite-economy` is the natural home: a `<lose ability="?" amount="1" price="k">` offers one pick
button per eligible ability and none for an ability already at 1; picking COMBAT takes the point
from COMBAT and from nothing else; the linked reward is granted on that pick and not before; the
same shape as a `flag=`-linked loss behaves identically; and book2/157's wheel still resolves its
range-1 outcome through `renderAbilityChoice` unchanged, which is the regression the current
routing provides for free.

Fixed as described — the picker is offered on the payment paths, and the cascade keeps its order.
`openAbilityNode(costNode, rewards)` (`render-rules.js`) names the node that has to ask: the cost
itself, or a linked effect the payment applies with it, because the open spec can sit on either
half of the price/flag link. `showAbilityPicker` (`render-rewards.js`) is the ability twin of
`showForfeitPicker`, reusing `story.appendAbilityPicker` and `abilityChoiceOptions`'s `forLoss`,
so "you cannot choose an ability that already has a value of 1" needs no code of its own.

`renderOptionalPay`'s `commit` grew a second parameter — `forNode`, the node the chooser answers
for, defaulting to the cost. That is the whole reason the two pickers can share one commit: a
forfeit picker's chooser names the cost's own possession and an item candidate is not a valid
answer for an ability, so the chooser reaches exactly one node instead of every node.
`renderChooseOnePay` asks `needsAbilityChoice` directly, between the item-availability check and
the plain arming click — the same "give up a point" shape task 221 already covers for a lone
priced `<resurrection>`.

Fourteen `suite-economy` assertions across the three landings (a priced cost, a `flag=`-linked
loss, a priced resurrection) plus the §2.157 regression: the wheel still charges 20 Shards with no
ability question, and its range-1 outcome still picks through `renderAbilityChoice`. Task 221's
own ability-priced oath fixture now names its point before the key arms — the assertion moved by
exactly the defect this task fixes, since the point it used to lose silently was CHARISMA's.

---

## 225. The "pay to spin" cost is the third payment path that commits an open ability loss with no chooser

**Priority: LOW — unreached by books 1–6, and the same latency task 224 carried before it. No
shipped section keys an open ability spec to a `price=` at all (the corpus holds one such pair,
book2/157's, and it is `flag=`-keyed on both sides).**

*(Filed 2026-08-09 while completing task 224.)*

Task 224 recorded "both landing paths" for a payment that commits an open ability spec —
`renderOptionalPay` and `renderChooseOnePay` — and fixed those two. There is a **third**:
`classifyPassive` routes a `price=` cost whose key arms a roll to `roll-payment`, and
`renderRollPayment` (`render-rewards.js`) commits it the same blind way:

```js
btn.addEventListener('click', () => {
  applyEffect(node, story.state, {}); // deduct the cost + set flag key (arms the roll)
  story.rerender();
});
```

So `<lose ability="?" amount="1" price="k"/>` beside a `<random flag="k"/>` — "give up a point of
any ability to spin" — still docks whatever `abilityTargets` finds first, which is CHARISMA for
almost every character. Note this is the *cost* side only: book2/157 proves the reward side is
already safe, because a roll-gated `flag=` node falls through `classifyPassive`'s flag branch to
`needsAbilityChoice` and gets `renderAbilityChoice`.

The fix is task 224's, reused verbatim: `needsAbilityChoice(node)` as a branch above the plain
click, revealing `showAbilityPicker` and arming with `{ chooser }` once the player answers. Both
helpers already exist and are already exported/private in the right modules; the branch is the
only new code. `suite-economy` beside task 224's block is the natural home — a synthetic
`<lose ability="?" price="k"/>` + `<random dice="1" flag="k"/>`: the spin cost offers a pick per
ability above 1, picking COMBAT takes the point from COMBAT and arms the roll, and the roll then
resolves normally.

Left open rather than folded into task 224 because it is a separate landing path with its own
regression surface (`renderRollPayment` is the repeatable pay↔roll cycle — the flag is consumed by
the roll, not memoised — so its picker must not survive into the next round), and the workflow
files findings instead of widening the task in hand.

Fixed as described, and task 224's fix really did transfer verbatim: `needsAbilityChoice(node)` as a
branch above `renderRollPayment`'s plain arming click, revealing `showAbilityPicker` and arming with
`{ chooser }` once the player answers. Both helpers already existed in the right modules and
`render-rewards.js` already imported them, so the branch is the only new code — eleven lines,
no signature change anywhere.

The repeatable-cycle worry it was filed for turned out to need no code of its own: the picker is
appended to the payment's own container and every commit ends in `story.rerender()`, so the pick
that arms the roll takes the picker with it and the next round's cost builds a fresh one. Both
halves are pinned by assertions rather than left to inspection.

Eight `suite-economy` assertions beside task 224's block, on a synthetic
`<lose ability="?" amount="1" price="k">` + `<random dice="1" flag="k"/>`: the spin cost is live
with the roll gated and no picker yet; clicking it offers one button per ability above 1 (MAGIC at
its minimum is absent) while the roll stays gated and nothing is taken; picking COMBAT docks COMBAT
alone, arms the roll and leaves no picker behind; the roll then resolves one outcome and grants it;
and the spent flag re-enables the cost, which asks again and takes only the ability the second round
newly named.

---

## 226. An open `<lose item="?">` forfeit is taken with no picker, so the engine chooses which possession leaves

**Priority: MEDIUM — live in two shipped sections (book4/456, book5/152). Nothing is over-charged
(one qualifying item leaves either way), but the player does not choose which, where the identical
open form on a weapon, armour, tool or cargo asks.**

*(Filed 2026-08-09 during conversion work on an unpublished book, which prices several offers at a
sum of money *or* one possession of the player's choosing, with no `bonus=` to narrow the pool.)*

Task 117 gave an open `"?"` forfeit a which-one picker so the exact item the player names is what
leaves. `losePaymentPlan` (`engine.js`) builds that verdict through a shared helper:

```js
const plan = (kind, spec, candidates) => ({
  present: true, kind, candidates,
  eligible: candidates.length > 0,
  needsChoice: openForm(spec) && candidates.length > 1,
});
```

`weapon`, `armour`, `tool` and `cargo` all go through it. The **`item` branch does not** — it
returns its own object with `needsChoice: false` hard-coded, so a possession forfeit never asks.
Both landings then commit blind: `renderOptionalPay` and `renderForcedOptional`
(`render-rewards.js`) reveal `showForfeitPicker` only on `plan.needsChoice`, and `applyLose` falls
through to `toLose = matches.slice(0, count)` — first in inventory order.

The engine half is already there. `applyLose` consults `opts.chooser` whenever
`matches.length > count`, exactly as the equipment path does; only the view's plan refuses to
offer one, so the chooser it would honour is never built.

Two shipped sections reach it. book4/456's Tambu offering is
`<lose item="?" bonus="2" price="2">a +2 item</lose>` and a `bonus="3+"` sibling; book5/152's
Holyamu is `<lose price="curse1" item="?" bonus="1+">any object with a +1 or greater bonus</lose>`
and its `bonus="2+"` twin. A player carrying two qualifying items loses whichever is first in the
pack. The `bonus=` filters narrow the pool but do not close the gap — and an *unfiltered*
`item="?"` price would put the player's best possession first in line.

The fix is to route `item` through the same `plan()` helper. Three things it must keep:
`openForm` has to stay false for a named pattern (`item="red acorn"` is not a choice), `item="*"`
must keep its own branch (a "lose all your possessions" sweep is not a choice either, and it
already has the keep-item filter), and the quantity-aware eligibility task 160 added means a
`multiple=` loss wants `candidates.length > count`, not `> 1`. `<transfer item="?" limit=>` has its
own selection path and is out of scope.

`suite-actions` beside task 117's forfeit-picker block is the natural home: a synthetic
`<lose item="?" price="k">` with two possessions offers one button per possession and takes exactly
the one clicked; with a single possession it commits without a picker as it does today; a named
`<lose item="…">` still takes that item with no picker; and book4/456 still filters to genuinely +2
items, which is the regression the current routing provides for free.

Fixed as described. `losePaymentPlan`'s `plan()` helper (`engine.js`) grew a fourth parameter —
`count`, how many the forfeit takes, defaulting to 1 — so `eligible` is `candidates.length >= count`
and `needsChoice` is `openForm(spec) && candidates.length > count`. At the default those are exactly
the old `> 0` / `> 1`, so weapon/armour/tool/cargo are byte-for-byte unchanged; the `item` branch now
returns `plan('item', g('item'), loseItemMatches(el, state), count)` and inherits the picker. The
`item="*"` sweep keeps its own branch above (it is a sweep, not a choice, and carries the keep-item
filter), and a named pattern keeps `openForm` false.

The engine half really was already there — `applyLose` consults `opts.chooser` whenever
`matches.length > count` — so `renderPayment` and `renderOptionalPay` needed no change at all. But
**book5/152 lands on neither**: its seven `flag="curse1"` lifts make the cost a `isChooseOne` menu,
so it renders through `renderChooseOnePay`, which consulted no plan. That path now computes the plan
for a `<lose>` cost and reveals `showForfeitPicker` between the item-availability check and
`needsAbilityChoice` — the same place and the same shape task 224 used for the ability twin. Without
it one of the two sections this task was filed for would still have committed blind.

Sixteen `suite-actions` assertions beside task 117's block: the synthetic open forfeit asks with two
possessions and takes only the one clicked (granting the linked reward with it), commits with no
picker on a lone possession, and asks nothing for a named `<lose item="rope">`; the DOM-free plan
keeps `item="*"` choiceless and only asks for a `multiple=` loss with a spare, with task 160's
eligibility threshold pinned unchanged; §4.456's +2 offering still filters a +1 charm out of the
pool it offers and arms outcome flag `2` with the item named; and §5.152's Holyamu asks which object
he takes before the curse menu arms.

---

## 227. A wordless `<curse>`/`<disease>`/`<poison>` prints no name, so its printed sentence has a hole

**Priority: LOW — task 215's defect one tag family later, in 14 nodes across books 1, 4 and 5.**

*(Filed 2026-08-09 during conversion work on an unpublished book, which prints its afflictions the
same way and only avoided the hole by wrapping the printed words in every one of them.)*

Task 215 gave a wordless effect tag JaFL's own default label, because the corpus writes many
effects with no words of their own — the printed sentence is made *of* what the tag names. Its
`LABELLED_EFFECT_TAGS` is `tick`/`gain`/`lose`. The affliction tags have the same JaFL default and
did not get it: `rules/JaFL-XML-Tags.md` states it under `<lose>`'s curse attributes ("The name of
the curse will be used for the default text, if present") and again under `<curse>` itself.

So `defaultEffectWords` returns `''` for `<curse>`, `<disease>` and `<poison>`, and every wordless
one renders a gap in the middle of its sentence. There are 14 of them and all 14 are written around
the tag:

- book4/78 — "Note you have the **`<curse name="Blight of Nagil">`**, and reduce your CHARISMA and
  COMBAT by one until you can find a cure." → *"Note you have the , and reduce…"*
- book1/625 — "Note that you are under '**`<curse name="Tyrnai's Curse">`**, −1 COMBAT.'"
- book5/620 — "Note that you have the **`<disease name="Red Ague">`** (causing a blotchy rash that
  itches like the devil)."
- book5/374 — "Note you have a **`<curse name="Curse of Donkey's Ears">`**, CHARISMA −2."
- book4/215 — "Note you are **`<poison name="poisoned">`** and reduce your CHARISMA and COMBAT
  abilities by one until you can find a cure."

The rest are book1/45, book1/196, book4/31, book4/505, book5/198, book5/203, book5/238, book5/464
and book5/638. Note book2/136 is the counter-example that shows the shape is deliberate: it writes
`<disease name="Leprosy">contract the disease…</disease>`, so it reads correctly today.

The fix is to add the three tags to `LABELLED_EFFECT_TAGS` and return `get('name')` for them. The
existing guards carry over unchanged and matter here: `hidden="t"` stays silent, and
`hasAncestorTag(node, SILENT_CONTENT_WRAP)` keeps a nested one quiet. The regression to pin is
**book5/238's stone bracelet**, the corpus's only affliction nested inside an item award
(`<item name="stone bracelet"><curse name="Curse of Blighted Magic">…</curse></item>`): that child
is applied by `applyItemAward` on pickup and is not walked as a passive, so the label must not
appear beside the Take button.

`suite-render` beside task 215's default-words block is the natural home — a wordless
`<curse name="X"/>` prints "X", a `hidden="t"` one prints nothing, book4/78's sentence reads whole,
and book5/238's bracelet award still shows one button and no stray curse name.

Fixed as described, in `defaultEffectWords` (`render-rules.js`): the three tags join
`LABELLED_EFFECT_TAGS` and a new `AFFLICTION_TAGS` branch returns `get('name')`. The branch sits
*above* the attribute cascade rather than inside it, because an affliction names itself off its own
`name=` and shares none of the `codeword`/`item`/`shards` keys the cascade reads — and the
allowlist confirms it, permitting only `cumulative`/`lift`/`name` on `<curse>` and `name` alone on
the other two. It returns the name as written rather than `cap`-ing it, matching the `<lose curse=>`
attribute form directly below: `cap` is for the two verb-led labels, not for a name.

The two guards really did carry over untouched, and the `<item>` regression needed no guard at all —
`renderItemAward` builds its own Take button and never walks the node's children, so book5/238's
nested curse was already silent there. No book XML changed and no allowlist entry was needed: the
14 nodes were correctly written all along.

Seven `suite-render` assertions beside task 215's block: a wordless `<curse>` prints its name and
`<disease>`/`<poison>` do the same; the label is printed as written even at a sentence start; a
`hidden="t"` affliction stays wordless; §2.136's counter-example — an affliction that *has* words —
keeps them and does not gain the name as well; §4.78 reads "Note you have the Blight of Nagil, and
reduce your CHARISMA…" behind its codeword gate; and §5.238's bracelet still shows one Take button
with no stray curse name.

---

## 228. `showForfeitPicker` can only answer for one item, so a `multiple=` forfeit it offers would under-charge

**Priority: LOW — latent: no section in the six published books can reach it today.**

*(Filed 2026-08-09 while working task 226, which is what makes the shape reachable at all.)*

Task 226 routed the possession forfeit through `plan()`, whose `needsChoice` is
`openForm(spec) && candidates.length > count`. With `multiple="2"` and three candidates that is
true — but `showForfeitPicker` (`render-rewards.js`) builds one button per candidate and commits
`() => [cand]`, a chooser naming exactly **one** item. `applyLose` then does
`toLose.slice(0, count)` over that single-element array and takes **one** item where the section
demands two, so the player under-pays and the price flag arms anyway.

Nothing in the corpus reaches it. `multiple=` and `price=` never co-occur (so `renderOptionalPay`
and `renderChooseOnePay` are out), and the eight sections carrying an open `multiple=` item loss —
book2/248, book2/521, book3/273, book3/629, book3/640, book4/131, book6/373 (plus the 248temp
sibling) — none carry a `<goto force="f">`, so `view.hasDecline` is false and `classifyPassive`
never returns `'payment'` for them. They auto-apply as plain effects, where no picker is built.
Two of them (book2/248 "the ones listed first on your Adventure Sheet", book3/640 "take the first
two possessions listed") are explicitly *not* choices; book4/131's "up to six items (your choice)"
is one the app does not currently offer at all.

Two ways to close it, and the choice is the task: either make `showForfeitPicker` count-aware
(accumulate `count` picks before committing, with a running "2 of 6 chosen" label — which would
also let book4/131 honour "your choice" if it ever gained a decline route), or keep the picker
single-answer and add `count === 1` to `needsChoice`, which makes the plan's promise and the
picker's capability agree at the cost of leaving a multi-item forfeit engine-chosen. The cheap
option is the second; the first is what the books actually ask for.

`suite-actions` beside task 226's block: a `<lose item="?" multiple="2" price="k">` fixture over
three possessions must take **two** — the assertion fails today whichever way `needsChoice` is
read, because a picker is offered and only one item leaves.

Closed the first way — the count-aware picker — on the user's call, so the picker's capability
matches what the books ask rather than the promise being narrowed to fit it. Two small changes.
`losePaymentPlan`'s `plan()` helper (`engine.js`) now reports `count` alongside the verdict it
already derived from it, so the view knows how many answers it owes. `showForfeitPicker`
(`render-rewards.js`) collects that many before committing: each click strikes its candidate off
the remaining buttons and redraws with a running "(1 of 2 chosen)" count, and only the last one
calls `commit`. At `count === 1` the first click still commits immediately and the lead-in is the
unchanged "Give up which? ", so tasks 117 and 226 are untouched in both behaviour and wording.

The engine half again needed nothing: `applyLose` already passes `count` to the chooser and
slices the chooser's own array to it, so an array of `count` items is exactly what it wanted.
Choices are held as **indices** into `plan.candidates`, not as the candidates themselves — with
identity the two Units of one cargo good, or two possessions of the same name, would be struck
off together and one click would answer for both. That costs nothing and removes the trap.

Nine `suite-actions` assertions beside task 226's block: a `multiple="2"` forfeit over three
possessions offers all three and counts from zero; the first pick takes nothing, strikes that item
off and counts up; the second takes **both** named possessions and pays out once; naming one of two
identically-named items leaves the other on offer and naming it too takes both; and the plan reports
count 1 for an ordinary forfeit and for the equipment kinds, 2 for `multiple="2"`.

Note book4/131's "up to six items (your choice)" is now reachable in the picker, but still not
offered: it has no `<goto force="f">`, so `view.hasDecline` is false and `classifyPassive` never
returns `'payment'` for it. That is the same gap the task recorded and is untouched here.

---

## 229. A `<group>` commits an open `<lose item="?">` with no picker, so a printed "decide which item" is ignored

**Priority: MEDIUM — live in book6/496, whose page prints "decide which item you are handing over"
and is then given no way to decide. Not latent and not narrowed by a `bonus=` filter: the pool is
every possession, so the first one in pack order is what leaves.**

*(Filed 2026-08-09 during conversion work on an unpublished book, which prices an offer at two
possessions of the player's choosing. The evidence below is all in the published books.)*

Tasks 117, 226 and 228 gave an open `"?"` forfeit a which-one picker on the three payment paths
that route through a plan: `renderPayment`, `renderOptionalPay`/`renderForcedOptional` and
`renderChooseOnePay`. `<group>` is the fourth, and it consults no plan at all. `renderGroup`
(`render-rewards.js`) applies every child effect with an empty options object:

```js
plan.effects.forEach((fx) => applyEffect(fx, story.state, {}));
```

`renderGroupWithRoll` does the same for the effects it defers to the roll. `applyLose` then falls
through to its no-chooser branch — `toLose = matches.slice(0, count)`, first in inventory order —
even though the pool it just built has a surplus and the engine would honour a chooser if one
were passed.

Two shipped sections reach it, and the first is the reason for the priority:

- **book6/496** — "The priests will accept a donation of 10% of your cash and any one possession
  listed on your Adventure Sheet. If you agree, **decide which item you are handing over**,
  `<group force="t">`… `<lose item="?"/>`…". The one instruction the page gives the player is the
  one the app does not implement. The group also carries the money transfer and a `<goto>`, so it
  is the collapsed-to-one-button shape, not an inline one.
- **book3/273** — `<group force="t">` with `<random dice="1" var="x"/>` and
  `<lose item="?" multiple="x"/>` ("lose the first 1-6 possessions"). This one goes through
  `renderGroupWithRoll`, so the fix has to cover both group paths, not just the button one. Its
  page says "the first", so its behaviour is arguably correct today — but it is the count-aware
  case, and whatever lands must not start asking where the book says "first".

The pieces already exist. `losePaymentPlan` computes `candidates`/`needsChoice`/`count` for the
item kind (task 226) and `showForfeitPicker` collects `count` answers before committing (task 228).
What is different here is sequencing: a group is **one** button that applies several effects and
may then navigate, so revealing the picker on the click means the rest of the group's work — the
other effects, `itemNodes`/`buyNodes`/`linkedAwards`/`restNodes`, and `gotoNode`/`returnNode`/
`isRevival` — must wait until the picker commits. Firing the `<goto>` first would leave the section
before the forfeit is named. Note the group applies losses before its award for a reason (a recipe
frees the slot its reward needs), so the deferral has to preserve that order.

Scope it to what actually needs asking: an open `?`/blank spec with more candidates than the loss
takes. A named `<lose item="rope">` must not ask, `item="*"` is a sweep and not a choice, and
book3/273's "the first 1-6" is the case to decide explicitly rather than convert by accident —
either leave `multiple=` groups engine-chosen or honour the picker there too, but say which and why.

`suite-actions` beside tasks 226/228's block: a synthetic `<group>` carrying `<lose item="?"/>` and
a `<goto>` over two possessions must offer one button per possession, take only the one clicked,
and **not navigate until it is chosen**; with a single possession it commits and navigates on the
click as it does today; a named `<lose item="rope">` in a group still asks nothing; and book6/496
really asks which possession the priests receive while still transferring the 10% and reaching 149.

**Done 2026-08-09.** `groupForfeitChoice` (`render-rewards.js`) finds the one bundled `<lose>` whose
`losePaymentPlan` reports `needsChoice`, and `renderGroup` moves its **whole** body — the other
effects, `buyNodes`/`itemNodes`/`linkedAwards`/`restNodes`, and the `<goto>`/`<return>`/revival
tail — into a `commit(chooser)` the picker calls, so nothing runs until the item is named and the
losses still precede the awards. The click reveals `showForfeitPicker` and disables the button;
with no choice to make it calls `commit(null)` and behaves exactly as before.

**The `multiple=` decision: engine-chosen, no picker.** The corpus has five open forfeits inside a
`<group>`. book1/370 and book6/135 are `using="t"` (one candidate, so `needsChoice` was already
false). book6/496 is the fixed case. The other two — book3/273 and book3/629 — are both
`<random dice="1" var="x"/>` + `<lose item="?" multiple="x"/>`, and 273's page says "lose **the
first** 1-6 possessions". Asking there would contradict the printed instruction, and the count is a
rolled var, so a `count===1` rule would ask on a roll of 1 and not otherwise. `groupForfeitChoice`
therefore skips any `multiple=` forfeit outright — which is also why `renderGroupWithRoll` needed no
change: both `multiple=` groups are the only open forfeits on that path, and neither asks. (A
*payment* `multiple=` forfeit still asks, per task 228 — those are priced offers where the player
chooses what to hand over, not a random sweep.)

Eleven new `task229` assertions in `suite-actions`, including §6.496 end to end. Full suite
`RESULT ALL PASS pass=2314 fail=0` (title `TESTS_OK`), Node import suite `pass=35 fail=0`.

---

## 230. A collapsed `<group>` drops its `<adjustmoney>` child, so §2.134's whole gamble pays nothing

**Priority: MEDIUM — live in book2/134 (four payouts) and book6/496 (a cache reset). Not latent:
§2.134 is the Gamblers' Guild wager, and today staking money there can neither lose nor win.**

*(Filed 2026-08-09 while fixing task 229, whose §6.496 fixture is one of the two sections.)*

`groupPlan` (`render-rules.js`) collects a collapsed group's effects with

```js
const effects = Array.from(node.querySelectorAll('lose, tick, gain, set, curse, transfer'));
```

`adjustmoney` is missing from that list, and a `kind:'action'` group renders **only** a button — it
never walks its children — so the tag is silently dropped. Every other effect table in the app
includes it: `PASSIVE_TAGS` in both `render.js` and `render-rewards.js`, and `PASSIVE_BODY_TAGS` in
`engine.js`. `renderGroupWithRoll` uses `PASSIVE_TAGS`, so the roll path applies it correctly; only
the button path loses it.

Two shipped sections reach it:

- **book2/134** — the wager. Each `<outcomes>` branch is a `<group force="t">` bundling the payout
  with the cache unlock: `<adjustmoney name="2.134" multiply="0"/>` (lose the stake),
  `multiply="0.5"`, `1.5`, `2`. The `<tick special="unlock">` sibling **is** in the list, so the
  group classifies as an action and its button applies the unlock and nothing else: the stake
  returns intact on every roll. Gambling is a no-op — no loss on 2-4, no winnings on 10-12.
- **book6/496** — `<adjustmoney cache="6.496.1" multiply="0"/>` zeroes the donation cache before the
  group's `<transfer>` fills it. Harmless per visit (the cache is a sink), but it means the cache
  accumulates across revisits instead of being reset.

Fix: add `adjustmoney` to `groupPlan`'s selector. Check `disease`/`poison` in the same change —
they are in all three `PASSIVE_*` sets and equally absent here; a scan of the corpus finds no
collapsed group carrying either today, so decide whether to add them for consistency or leave the
selector to what actually ships, and say which.

`suite-actions`: a synthetic collapsed `<group>` with `<adjustmoney multiply="2"/>` over a money
cache doubles it on the click; and §2.134 end to end — stake 10 Shards, drive the roll to a 2-4
outcome and confirm the stake is gone, then to a 12 and confirm it comes back doubled.

**Done 2026-08-09.** One selector: `groupPlan` now collects
`lose, tick, gain, set, curse, disease, poison, adjustmoney, transfer`.

**`disease`/`poison` added too, for consistency.** No collapsed group in the corpus carries either
today, so this ships no behaviour — but they sit in all three `PASSIVE_*` sets, `applyEffect`
already routes them exactly like `curse`, and a *silently dropped* effect is precisely the failure
being fixed. A comment on the selector now names the three sets it must stay in step with. The
addition cannot reclassify an existing group either: `kind` only widens from `'inline'` to
`'action'`, and every group that gained a tag here (§2.134's four outcome groups, §6.496) already
had a `<tick>`/`<lose>` and was an action.

Six new `task230`/§2.134 assertions in `suite-actions`. Verified as real regression cover by
restoring the old selector: three of them fail with `pot=10` untouched. Full suite
`RESULT ALL PASS pass=2320 fail=0` (title `TESTS_OK`), Node import suite `pass=35 fail=0`.

---

## 231. A plain `<lose item="?">` effect commits with no picker, so six printed "(your choice)" instructions are ignored

**Priority: MEDIUM — live in six published sections, all of which print the choice in so many
words: book1/259, book4/116, book4/131, book4/468, book5/66 and book6/373. Nothing is narrowed by
a `bonus=`/`using=` filter, so the pool is every possession and the first in pack order is what
leaves.**

*(Filed 2026-08-09 during conversion work on an unpublished book, whose page carries the same
sentence. The evidence below is all in the published books.)*

Tasks 117, 226, 228 and 229 gave an open `"?"` forfeit a which-one picker on four paths: the
plain payment (`renderPayment`), the optional/forced payment
(`renderOptionalPay`/`renderForcedOptional`), the choose-one menu (`renderChooseOnePay`) and the
`<group>` click (`groupForfeitChoice`). Every one of those routes through a plan. The **fifth** path
is the ordinary passive effect — a `<lose>` with no `price=`, no `flag=`, no `force="f"` and no
`<group>` around it — and it consults no plan at all. `classifyPassive` falls through to its
`apply` verdict and `renderPassive` (`render-rewards.js`) commits it with the chooser explicitly
nulled:

```js
const note = applyEffect(node, story.state, { chooser: null });
```

`applyLose` then takes its no-chooser branch — `toLose = matches.slice(0, count)`, first in
inventory order (or first in the named cache when `cache=` is set) — even though
`losePaymentPlan` would report `needsChoice: true` for the same node and the engine honours a
chooser whenever one is passed.

There is one earlier gate that could have caught these and does not:
`classifyPassive`'s `payment` verdict turns an economic `<lose>` into a click-to-apply control, and
`isEconomicPayment` does accept an `item=` spec. But it is guarded by `view.hasDecline`, which is
true only when the section carries a `<goto force="f">` — an optional "turn back" exit. **None of
the six has one** (checked: `grep -c 'goto[^>]*force="f"'` is 0 in all six), which is right, since
none of these losses is a purchase the player could decline. They are hazards, and hazards are
exactly what this path renders.

This is the path the books use most, because it is the one a hazard row is written on. Every
instance below prints the instruction the app ignores:

- **book1/259** — a travel-encounter row: "Thief `<lose item="?">steals one item from you</lose>`
  **(your choice)**".
- **book4/468** — a town-house theft row over a named cache: "A thief.
  `<lose item="?" cache="4.468">Lose one possession</lose>` **(your choice)** if any, that you left
  here". The cache pool makes the wrong pick more visible, not less: the player deliberately chose
  what to leave there.
- **book5/66** — the troll's forfeit when you cannot pay: "`<lose item="?">lose one item</lose>`
  **(your choice)**".
- **book4/116** — "you have lost some possessions. Cross **three** items **(your choice)** off your
  Adventure Sheet", written as three separate `<lose item="?">` nodes. Each takes the first, so it
  strips the first three in list order. Worth handling as one three-item pick rather than three
  one-item picks, or the fix asks three times for one printed sentence.
- **book4/131** — "up to six items **(your choice)** have been stolen.
  `<lose item="?" multiple="6">Cross them off</lose>".
- **book6/373** — "1-6 of them are torn away by the raging wind. (`<random dice="1" var="x"/>`; **you
  decide** `<lose item="?" multiple="x">which possessions to lose</lose>`.)"

The last two carry `multiple=`, and task 229 deliberately left `multiple=` forfeits inside a
`<group>` engine-chosen. That decision does not transfer, and the reason is the printed sentence,
not the attribute: 229's two group cases are book3/273 and book3/629, whose pages say "lose **the
first** 1-6 possessions", whereas book4/131 and book6/373 say "(your choice)" and "you decide". So
the rule to implement is the count-aware picker task 228 already built (it collects `count`
answers), applied on this path for both the single and the `multiple=` shapes — and 229's note
should be re-read as "the corpus's *group* `multiple=` forfeits are sweeps", which it is.

What must NOT start asking:

- `tags="light,useonce"` candle burns (book1/164, book2/440, book2/744, book3/25, book3/196,
  book3/395, book4/157, book4/598, book6/584) — the tag filter is the choice, and several of these
  are `hidden="t"` book-keeping.
- The "listed first" sweeps: book2/248 ("the items stolen are the ones listed first"), book2/521,
  book3/640 ("take the first two possessions listed on your Adventure Sheet"). Their pages state the
  order, so a picker would contradict them. There is no attribute distinguishing these from
  book4/131 — both are `<lose item="?" multiple=…>` on the plain path — so whatever lands must pick
  a rule and pin the three sweeps with assertions, or state plainly that they are being changed.
  Narrowing by "the node carries its own descriptive words that name a choice" is not a rule; a
  candidate rule is to keep the sweeps engine-chosen by giving them an explicit marker in the source
  and treating an unmarked open forfeit as a choice.
- `hidden="t"` losses generally: there is no control to hang a picker on.

Sequencing is easier than task 229's: a passive effect has no bundled awards and no `<goto>` to
hold, so the node can render its words, offer the picker in place of applying, and commit on the
answer — the shape `renderAbilityChoice` and `renderEquipmentChoice` already use for the same
problem in the ability and equipment families (both are `classifyPassive` verdicts of their own).
The natural fix is a sixth verdict beside those two rather than a special case inside `apply`.
Note that `applyLose`'s memo key is `fx@<path>`, so the deferral must not mark the node applied
until the pick commits, or the loss is voided by the re-render.

`suite-actions` beside tasks 226/228/229's block: a synthetic section whose `<outcome>` row carries
`<lose item="?"/>` over two possessions must offer one button per possession, take only the one
clicked, and take nothing until it is clicked; with one possession it commits with no picker as
today; `tags=`-narrowed and `hidden="t"` forfeits still ask nothing; a `multiple="2"` open forfeit
collects two answers; and book4/468 really asks which stored possession the thief takes while
leaving the carried pack alone, book6/373 asks for `x` of them after its die lands, and book2/248
still takes the ones listed first.

**Done 2026-08-09.** A sixth `classifyPassive` verdict, `'forfeit-choice'`, decided by
`needsForfeitChoice` (`render-rules.js`) and built by `renderForfeitChoice` (`render-rewards.js`)
out of the same `showForfeitPicker` the other five paths use — so a `multiple=` forfeit collects
that many answers here too. The memo stays `fx@<path>` and is only added **on commit**, so the
loss is not voided by the re-render, and a forfeit that stops needing a choice falls back through
`'apply'` already applied.

**The rule picked is the narrowing, and the three sweeps are pinned in the source.** An open
`"?"`/blank `item=` forfeit that names no filter offers the whole pack, so which one leaves is the
player's; one narrowed by `tags=`/`bonus=`/`using=`/`group=` has been chosen BY the filter (the
candle burns, §4.456's "+2 item"), so it asks nothing. Nothing in the markup separates §4.131's
"up to six items (your choice)" from the sweeps whose pages state the order, so book2/248,
book2/521 and book3/640 now carry an explicit **`choose="f"`** — a new port attribute, added to
`validate-source.ps1`'s `<lose>` allowlist and its truth-flag list in the same change (task 199).
The verdict also sits **below** the fight gate, unlike its `'ability-choice'`/`'equipment-choice'`
siblings: a forfeit written after a `<fight>` must stay held until that fight resolves rather than
committing a loss on a branch that may never be taken.

**book4/116 is now one node.** Its three consecutive `<lose item="?">` tags printed one sentence
("Cross three items (your choice)") and would have stood up three separate one-item pickers, so
they are merged into a single `<lose item="?" multiple="3">Cross three items</lose>` — identical
printed text, one three-item pick.

27 new `task231` assertions in `suite-actions`, including book4/468, book6/373, book2/248 and
book4/116 end to end. Full suite `RESULT ALL PASS pass=2347 fail=0` (title `TESTS_OK`), Node
import suite `pass=35 fail=0`, validator self-test `pass=23 fail=0`.

Filed **232**: the same bare-hazard path leaves `<lose cargo="?">` and the one `group=`-narrowed
possession forfeit engine-chosen, in 13 further published sections that print the choice.

---

## 232. The same bare-hazard picker is missing on `<lose cargo="?">` and a `group=`-narrowed forfeit, so 13 more printed choices are ignored

**Priority: MEDIUM — 13 published sections, 12 of which print the choice in so many words.**

*(Filed 2026-08-09 while implementing task 231, whose scope was deliberately `item=` only.)*

Task 231 gave the ordinary passive `<lose>` a which-one picker but scoped `needsForfeitChoice` to
`item=` — the attribute its six sections use — so the same bare hazard row still commits with no
picker in two other shapes:

- **`<lose cargo="?">` on the plain path (12 sections).** book1/67, book1/70, book1/83,
  book1/397, book1/530, book1/583, book4/106, book4/358, book4/386, book4/453 and book4/489 all
  print "you lose 1 Cargo Unit, if you had any, **of your choice**"; book2/534 spells it out
  further — "(If you had several cargo units, **you choose** which was lost.)". `losePaymentPlan`
  already reports `kind:'cargo'` with `needsChoice`, and `showForfeitPicker` already labels a
  cargo candidate, so the five payment paths ask — this one does not. Which Unit leaves is an
  economic decision (the goods sell for different prices per port), so the engine taking the
  first aboard is not neutral. book3/231, book3/581, book3/616, book3/670 and book3/718 print
  only "Lose 1 Cargo Unit (if you have any cargo)" and name no choice: decide whether those get
  the picker too, or a `choose="f"` marker like task 231's sweeps.
- **book5/578, the one `group=`-narrowed possession forfeit.** Task 231 treats a narrowing filter
  as the choice, and `group=` is one — but `group=` narrows by *provenance*, not by a property
  the sentence names, so it can still leave a genuine choice among like candidates. §5.578 is
  exactly that: the Brotherhood's cut is "**one of the items** you found" out of the three that
  mission awarded (a silver holy symbol, a fine sabre and an Uttakin telescope), and the page
  ends "Note **which items you want to keep** on your Adventure Sheet." The engine hands over the
  holy symbol every time. Either drop `group` from `FORFEIT_NARROWERS` (it is the only such node
  in the corpus, so nothing else moves) or state why provenance is a filter.

`<lose weapon="?">`/`<lose armour="?">` on this path need no change and are the useful contrast:
book6/36 ("she strips you of your **best** armour, your **best** weapon"), book1/370 and
book6/135 (`using="t"` — the one you are wielding) and book5/386 (`tags="Tz"`) each name what
leaves, which is the same narrowing rule task 231 settled on.

`suite-actions` beside task 231's block: a synthetic section whose bare `<lose cargo="?">` sits
over a two-Unit manifest must offer one button per Unit and move only the one clicked; a one-Unit
ship commits with no picker; and book5/578 really asks which of its three rewards the Brotherhood
takes while the rest of the pack stays out of the offer.

**Done 2026-08-09.** `needsForfeitChoice` now admits a `cargo=` node beside `item=`, and `group`
leaves `FORFEIT_NARROWERS`. Nothing else moved: `losePaymentPlan` already reported
`kind:'cargo'` with `needsChoice`, `showForfeitPicker` already labelled a cargo candidate, and
`applyLose`'s `cargo="?"` branch already honoured a chooser (it splices the named Unit's index,
so two Units of one good lose exactly one). The count is 13, not 12 — book3/629's
`<lose cargo="?">` sits inside an `<if cargo="?">` and prints "if you have more than one Unit,
**you can choose** which is lost", which the first filing missed.

**The five silent book3 rows get the picker too** (book3/231, book3/581, book3/616, book3/670,
book3/718 — "Lose 1 Cargo Unit (if you have any cargo)"). They name no order at all, so the
task-231 rule applies as written: unmarked is a choice, and a `choose="f"` marker would be
inventing a sweep the page never states.

**The weapon/armour/tool kinds stay out, and the comment now says why:** every open one in the
corpus names what leaves — `using="t"`, a `tags=`/`bonus=` filter, or book6/36's "best".

12 new `task232` assertions in `suite-actions`, including book1/397 end to end. Verified as real
cover: restoring the old `item=`-only guard fails the first cargo assertion with `picks=0` and
crashes the rest of the suite. Full suite `RESULT ALL PASS pass=2359 fail=0` (title `TESTS_OK`),
Node import suite `pass=35 fail=0`.

**book5/578 does NOT yet ask, and the reason is not the narrowing rule** — filed as **233**. Its
three rewards are `Take` buttons, so when the donation node renders the pool is empty, `applyLose`
takes nothing and `renderPassive` memoises `fx@<path>` anyway; the plan change is a prerequisite
for that fix, not the whole of it. book6/36's "best" is filed as **234**.

---

## 233. §5.578's donation applies against an empty pool and memoises the no-op, so the Brotherhood's cut is never taken

**Priority: MEDIUM — one published section, but the whole payment is silently skipped.**

*(Filed 2026-08-09 during task 232, which made the section's forfeit a choice in principle.)*

book5/578 awards three items under `group="5.578"` (a silver holy symbol, a fine sabre and an
Uttakin telescope), then charges `<lose shards="100"/>` and
`<lose item="?" group="5.578">one of the items</lose>` as the Brotherhood's cut.

An item-family award renders a **`Take` button** (`renderItemAward`), so nothing is in the pack
on the render that walks the `<lose>`. `loseItemMatches` returns `[]`, `applyLose` removes
nothing — and `renderPassive`'s `'apply'` branch has *already* added `fx@<path>` to
`ctx.applied`, so the re-render after each Take skips the node. The donation is a complete no-op:
the player keeps all three items and pays only the 100 Shards.

Task 232 dropped `group` from `FORFEIT_NARROWERS`, so the node now *classifies* as
`'forfeit-choice'` — but only when a candidate is already held, which on entry it is not, so it
still falls through to `'apply'` and memoises. The plan change is a prerequisite, not the fix.

The rule to settle: **an open forfeit that took nothing because its pool was empty must not
memoise.** That is the general shape (a hazard row over an empty pack behaves the same way), so
weigh it against the reason the memo exists — an effect must not re-apply on every render. A
candidate is to memoise only when the effect actually took something, which `applyLose` already
knows (`itemTaken`/`paymentTaken`) but does not report to the view; another is to defer an open
forfeit whose pool is empty while an untaken award in the same section could still fill it.

`suite-actions`: book5/578 end to end — take all three rewards, then confirm the section asks
which one the Brotherhood receives and that exactly that one leaves; and a synthetic bare
`<lose item="?"/>` over an empty pack must not lock itself out of a possession gained later in
the same section. Check the reverse too: an effect that legitimately takes nothing must still not
re-fire on every render.

**Done 2026-08-09.** Settled as a **deferral, not a conditional memo**: `classifyPassive` gains a
`forfeitPoolPending` gate that returns `'inert'` — words only, nothing applied and nothing
memoised — while an open forfeit's pool is not yet the pool the section describes. It is the same
shape as the pending-roll-var deferral directly above it (task 181: an effect whose input has not
arrived must not bank a 0), which is why it beat the "memoise only when something was taken"
candidate: reporting `itemTaken` back to the view would leave a *combined* node (a `<lose>` that
also spends Stamina, or arms a `price=`) re-applying its other halves on every render. Nothing in
`engine.js` moved.

Two clauses, both needed, and §5.578 is both at once:
- **The pool is empty.** A forfeit that took nothing has not happened. `cache=` is excluded —
  book4/468's villa thief takes what was left there *before* the roll ("lose one possession, if
  any, that you left here"), so a deposit made after the theft rolled must not be swept up by a
  loss left standing open.
- **A `group=` forfeit whose award is still untaken.** Needed on its own: with only the first
  clause, taking the silver holy symbol makes the pool eligible with one candidate, so the node
  falls straight through to `'apply'` and donates that one unasked, never seeing the other two.
  Scoped by `group=`, it reaches exactly this section — the corpus has two `<lose group=>` and
  book3/132's names its item, so it is not an open forfeit. Matching *any* award in the section
  would have broken book1/259, whose helmet sits in a mutually exclusive `<outcome>` and would
  hold the thief's theft for ever.

`needsForfeitChoice`'s shape test is extracted as `isOpenForfeit` and shared, so the two gates
cannot drift on what "open" means. Once the cut is paid, clause two reads pending again (the
donated item has left the pack) — harmless: the node carries its `fx@` memo by then and renders
the same inert words either way, so nothing re-fires and nothing asks twice.

The 12-item carry cap can still strand it: a player with fewer than three free slots cannot take
all three, so the donation never fires. That is exactly today's outcome for every player, so it is
a corner left uncovered rather than a regression.

14 new `task233` assertions in `suite-actions` (book5/578 end to end, the synthetic empty-pack
forfeit, the `item="*"`/named no-ops that must stay spent, and the planner). Verified as real
cover: disabling the one gate line fails "§5.578 asks which of the three the Brotherhood receives"
with `picks=0` and the pack still reading `silver holy symbol,fine sabre,Uttakin telescope`. Full
suite `RESULT ALL PASS pass=2375 fail=0`, Node import suite `pass=35 fail=0`.

---

## 234. §6.36 strips "your **best** armour, your **best** weapon" and the engine takes the first of each instead

**Priority: LOW — one published section, and the wrong piece is taken only when the pack holds more than one.**

*(Filed 2026-08-09 during task 232, while establishing why the equipment kinds stay out of the
open-forfeit picker.)*

book6/36 reads "She strips you of your `<lose armour="?">best armour</lose>`, your
`<lose weapon="?">best weapon</lose>` and `<lose shards="*">any cash you are carrying</lose>".
`loseEquipmentCandidates` applies no ordering, so `loseEquipment` takes `cands[0]` — the first of
that kind in acquisition order. A player carrying a rusty sword and a +3 blade loses the rusty
one.

It is the only "best" wording on a `<lose>` in the corpus (`rg 'best' books/**/*.xml` over the
loss tags returns book6/36 alone), so this is a one-section rule and not a family. Two shapes
worth weighing: a source marker naming the ordering (the `choose="f"` precedent from task 231),
or a general "the open equipment forfeit takes the highest bonus" rule — the second is a
behaviour change everywhere `<lose weapon="?">` is unnarrowed, which today is only this section,
so the two are equivalent in effect and differ in what a future section inherits.

Note this is deliberately *not* the task-231/232 picker: the page states a rule, so the player
does not choose. `suite-actions`: book6/36 with a +0 and a +3 weapon (and likewise armour) must
lose the +3 of each, and a single piece of a kind must still be taken.

**Done 2026-08-09.** Settled as the **source marker**, `choose="best"` on both loses in
`books/book6/36.xml` — the first of the two shapes, taken because it is the one the repo already
has: `choose=` is this port's marker for "the page states which possession leaves, so the player
does not", and `"best"` sits beside task 231's `"f"` (the "the items stolen are the ones listed
first" sweeps) as a second way a page can state it. The general rule was rejected on what a
future section inherits: an unnarrowed `<lose weapon="?">` that meant "she grabs a weapon" would
silently start taking the best, and the marker makes the page's own wording the reason.

`loseEquipmentCandidates` sorts by descending bonus when the marker is present, so the ordering
lands once and the plan, the picker and the commit cannot disagree about what "best" is; `sort`
is stable, so equal bonuses keep acquisition order, and `applyKeepRule` runs first, so the white
sword (§4.103) is still spared. `loseEquipment` is untouched — it takes `cands[0]` as before.

The marker moves out of `validate-source.ps1`'s `FL_BOOL_ATTRS` into `FL_ENUMS` as
`t f true false best` (task 199: a new attribute VALUE is added to the allowlist in the same
change). The truth spellings stay legal, so the three `choose="f"` sweeps are unaffected, and a
misspelled `choose="worst"` now fails the gate through the same enum path the ability/cargo/crew
fixtures already cover.

Scope check: §6.36 is the only unnarrowed open equipment forfeit in the corpus — every other
`<lose weapon|armour|tool="?">` carries `using="t"` (§1.370, §2.290, §6.135), a `bonus=`/`tags=`
filter (§1.354, §5.386) or a `price=` that already routes through the task-226 picker (§2.90).
None of them gains the marker, so none of them changes.

7 new `task234` assertions in `suite-actions`. Verified as real cover: disabling the sort leaves
§6.36's victim holding `runeblade,dwarf mail` — the rusty sword and the leather jerkin taken
instead. Full suite `RESULT ALL PASS pass=2382 fail=0`, validator self-test `pass=23 fail=0`.

---

## 235. A warm Chrome profile serves a day-old test bundle, so the headless loop reports a false `ALL PASS`

**Priority: MEDIUM — every task in this file is verified through this loop, and the failure is silent.**

*(Filed 2026-08-09, out of order and closed the same day: it is the loop 233 and 234 will be
verified through. Observed live during task 231's negative check.)*

A focused run reported `RESULT ALL PASS pass=476 fail=0` while the entire tasks 226–231 block —
69 assertions — never executed. An identical rerun minutes later, same server and same tree,
correctly reported `RESULT FAILURES pass=308 fail=2`. The difference was the **profile**:
`%TEMP%\fl-test-profile2` had been created at 22:28 the previous evening, before any of those
tasks existed.

`python -m http.server` sends `Last-Modified` but no `Cache-Control` and no `ETag`, so a browser
falls back to **heuristic freshness** (roughly 10% of the file's age) and serves the ES modules
from its disk cache **without revalidating**. The run therefore executed the previous session's
`web/tests/*.js`. No service worker was involved — only `app.js` registers one and `_test.html`
never loads it.

**Why every existing guard missed it.** The sticky-fatal reporter catches *errors*, and a stale
but perfectly valid file throws none. The "check the dump's size first" rule (task 220) catches
an empty capture, not an old one — the dump was full-size and well-formed. The suite ran, passed,
and reported honestly on the code it was given. The only tell was an assertion count 69 lower
than the tree deserved, which nothing was comparing. AGENTS.md's "use a fresh `--user-data-dir`"
already named this hazard; it was an operator rule with nothing enforcing it, and a run that
picks a profile name which happens to already exist violates it silently.

**CI was never exposed:** `.github/workflows/smoke.yml` mints its profile with `mktemp -d`. This
was a local-loop defect only, which is why it survived so long.

**Done 2026-08-09.** Two new scripts, and no change to the harness or any suite:

- **`build/serve.py`** — the static server for the loop, with caching off. `Cache-Control:
  no-store` on every response closes the vector for *every* run whatever profile is in use, and
  covers app modules, suites, `data/*.json` and the `fetch('./sw.js')` source assertions in
  `suite-economy`. It also sets `allow_reuse_address = False`, so a second bind **fails loudly**
  (`exit 2`) instead of shadowing a forgotten server — task 209's trap, closed at the source.
- **`build/run-tests.ps1`** — serve, drive Chrome, read the verdict, clean up. A GUID-named
  profile per run, deleted afterwards, so there is never a warm one to reuse; the dump deleted
  first and size-checked after; `-RedirectStandardOutput` for a real stdout handle (task 208);
  the verdict read from the FIRST `RESULT` line (task 142); the server stopped on every exit
  path. **Exit 0 only on `RESULT ALL PASS`**, so a caller can branch on the code.

**A second false-pass shape found while testing the first, and closed with it:** a mistyped
`?suite=` name matches none of the seven, `main()` skips them all, and the reporter — with
nothing to report — prints `RESULT ALL PASS pass=0 fail=0` and sets `TESTS_OK`. Verified live
with `-Suite nosuchsuite`. The runner now fails any `pass=0` run.

**The artifacts are swept, not just avoided.** Cleaning up after itself only covers the paths
this run controls — a hard-killed browser, a crashed shell, a by-hand `chrome.exe` from the raw
commands, or a dump deliberately kept from a failing run all leave litter nothing owns. By the
time this task went looking, `%TEMP%` held **266 leftovers** going back to 2026-07-28, and it
was a 22-hour-old member of that pile that served the day-old bundle. So the runner sweeps them
**on the way in**, which means a run that dies badly is collected by the next one rather than
never.

**Matched by shape, not by name.** The first cut enumerated `fl-test-*`/`fl-dump*`/`fl-probe*`
and immediately proved itself wrong: every session that drove the browser by hand had invented
its own prefix — `fl-udd*` (54 of them), `fl-suite*`, `fl-163-*`, `fl-review*`, `fl-final*` — so
a name list goes stale the first time someone types a new one. What they have in common is what
they *are*: a Chromium user-data-dir always carries a `Default\` child, and a dumped DOM is
always an `.html`. The sweep takes `fl-*` directories with that child plus `fl-*.html` files,
over 12h old. Narrow enough that `fl-validate.ps1` and two `fl-shard-*.txt` scratch files sat
untouched through a sweep that removed 149 items around them, and the 12h floor means a
concurrent run is never touched. `AGENTS.md` now asks only that a by-hand profile start `fl-`.

Verified: `no-store` present on a served suite file; a second `serve.py` on a held port exits 2
with its own message; `-Suite nosuchsuite` exits 1 ("No assertions ran"); the runner leaves no
`fl-test-<guid>` profile and no listener on 8848; the sweep removed a planted 3-day-old profile
and dump while keeping a freshly-made one, then collected the real 266-item backlog across two
runs while leaving the three non-profile `fl-*` files alone; and the full suite through it reads
`RESULT ALL PASS pass=2359 fail=0`, exit 0. `AGENTS.md` step 2 and `README.md`'s Testing section
now lead with the runner; the hard-won trap notes are kept, marked as what the runner closes,
because a hand-run command still has every one of them. `.github/workflows/smoke.yml` is
deliberately untouched — it is already immune, and the one green gate is not worth the churn.

---

## 236. A virtual-time budget that runs out reports as a suite FAILURE, with nothing saying it was the clock

**Priority: LOW — it fails loudly and a rerun passes, but the message names the wrong culprit.**
**Status: done.** The budget carries headroom, and both shapes a cut-short run takes are now
named as the clock rather than as the code. See the closing notes at the end of this section.

*(Filed 2026-08-09 during task 234, observed live: one run of an unchanged tree reported
`RESULT FAILURES pass=2061 fail=1` / `FATAL [economy] TypeError: Failed to fetch`, and an
immediate rerun of the same tree reported `RESULT ALL PASS pass=2382 fail=0`.)*

`run-tests.ps1` passes `--virtual-time-budget=90000`. When that budget expires Chrome dumps the
DOM and tears down immediately, aborting whatever `fetch` is in flight — which surfaces as an
ordinary suite failure (`TypeError: Failed to fetch`, whichever suite happened to be loading a
section) rather than as "the run was cut short". The Chrome stderr in that run said so
(`Can't perform OS integration while the browser is shutting down`), but that channel is the
same place the unrelated USB/GCM chatter lives, so it reads as noise.

Nothing here is unsound — the run fails, the runner exits 1, and no false pass is possible. The
cost is diagnosis: the first reading is "task 234 broke the economy suite", and the assertion
count is the only tell (`pass=2061` against a tree that owes 2382). That tell needs a known-good
number to compare against, which is exactly what task 235 established nobody has.

The budget is also a fixed 90s against a suite that has grown ~700 assertions since it was set,
with the every-section corpus scan the heaviest part, so this will bite more often.

Worth weighing: raise the budget (cheap, and buys time rather than fixing the reading); have the
reporter print the suite count it *expected* so a short run is obvious in the verdict line; or
have the runner treat a `Failed to fetch` FATAL as a distinct "run cut short — rerun" message. A
budget expiry and a real network failure look identical from inside the page, so any fix that
distinguishes them has to come from the runner, not the harness.

**Measuring it first changed the fix.** `--virtual-time-budget` is not a wall-clock timeout:
virtual time leaps forward whenever the page is idle, so the whole suite spends only **~13.5s of
it** (the pass/fail boundary sits between `-VirtualTimeBudget 13000` and `14000`, and the real
run takes ~10s either way). 90000 was therefore never the ceiling in normal operation — a stall
long enough to force virtual time past it is what cut task 234's run short. Two consequences:
headroom is **free** (raising the default to 300000 changed the wall clock by nothing), and a
fixed number was always going to be the wrong lever on its own.

**And it exposed a second, more misleading shape of the same bug.** Cutting real runs short at
`-VirtualTimeBudget 13500` never once produced the reported `RESULT FAILURES`; all six attempts
produced **`RESULT FATAL pass=0 fail=1` with no detail lines at all**. The dump explains it:
`#results` still reads `running…`, so the first `RESULT` line in the file is the literal in
`_test.html`'s own inline *source* showing through — the string that everywhere else means a
**bootstrap abort**, which both the runner and CI spell out as "module parse error, e.g. a
duplicate top-level const". That sends the reader hunting a syntax error that does not exist,
which is worse than blaming the wrong suite. It is also **exactly decidable**: a real bootstrap
abort has `flFatal` *replace* the placeholder, so `running` surviving in `#results` can only mean
the page was still working when the dump was taken.

**What the runner does now** (`Get-CutShortDiagnosis` in `build/run-tests.ps1`, returning `$null`
for an ordinary failure so nothing is ever claimed about a real one):
- placeholder intact → `CUT SHORT, not a bootstrap abort`, naming the budget, and honest that a
  genuine hang looks the same from here;
- a `FAIL`/`FATAL` line carrying `Failed to fetch`/`NetworkError`/`net::ERR_` → ask the one
  question the page cannot. The server is this script's own child and is still up at that point,
  so **if it answers**, the network was fine and the page lost it on the way down (`CUT SHORT,
  not broken`); if it does not, the failures really are the server dying, and it says so.

Both messages name `--virtual-time-budget=<n>` and print the doubled value to pass next time.

**Verified live, both arms, on real runs rather than crafted dumps.** `-VirtualTimeBudget 13500`
reproduces the placeholder case and prints the cut-short diagnosis. Killing `serve.py` 3.3s into
a run reproduces the *reported* case precisely — `RESULT FAILURES pass=2061 fail=1` /
`FATAL [economy] TypeError: Failed to fetch`, the same two numbers task 234 recorded — and prints
the dead-server arm; killing it and restarting a server before the browser exits prints the
`CUT SHORT, not broken` arm. Killing at 5s or 9s instead changes nothing (`ALL PASS pass=2382`):
the data is fetched and cached inside the first ~4s, which is why the fetch shape is the rare one.
Full suite at the new default: **`RESULT ALL PASS pass=2382 fail=0`**, exit 0, 10s wall.
`node web/tests/node-import.mjs`: `RESULT ALL PASS pass=35 fail=0`. No generated-file drift, and
`build/*.ps1` stays ASCII-only (the placeholder's ellipsis is non-ASCII, so the match is on
`<pre id="results">running` alone).

**`.github/workflows/smoke.yml` is included this time**, where task 235 deliberately left it
alone. That call was right for the false-*pass* traps — CI was already immune to every one. This
defect is not one of those: CI runs the same 90000 against the same growing suite and prints the
same two wrong culprits, and a misread red build costs more than a misread local one. It gets the
budget, both splits, and no more.

---

## 237. `run-tests.ps1` selects an unusable WindowsApps Python alias and never reaches the real interpreter

**Priority: MEDIUM — the documented verification command fails before it starts the server on a
configured Windows development machine, even though working Python is installed.**
**Status: done.** Discovery now probes every candidate and selects the first that really runs as
Python 3, naming what it rejected if none does. See the closing notes at the end of this section —
including what re-measuring the reported symptom showed.

*(Filed 2026-08-10 during the post-task-236 review.)*

`Find-Python` returns the first name that `Get-Command` resolves from `python`, `python3`, and
`py`. On the reviewed machine all three first hits are zero-byte WindowsApps execution aliases
under `C:\Users\rob_s\AppData\Local\Microsoft\WindowsApps`; PowerShell can resolve their paths,
but `Start-Process` reports that the file cannot be accessed. A working interpreter exists later
on `PATH` at `C:\Users\rob_s\AppData\Local\Python\bin\python.exe`, but the runner never considers
it. Putting that directory first temporarily makes the unchanged full suite pass:
**`RESULT ALL PASS pass=2382 fail=0`**.

Fix Python discovery without adding a dependency or weakening the existing process cleanup:

- consider every `Get-Command ... -All` candidate (deduplicated by source), not only the first
  resolvable command name;
- prove that a candidate can actually launch as Python before selecting it, skipping execution
  aliases and other broken shims rather than failing the whole run at `Start-Process`;
- fail only after exhausting the candidates, with a message that identifies the rejected paths.
  An explicit `-Python` override analogous to `-Browser` is reasonable only if it keeps this
  automatic path simple and its invalid-path failure clear.

Regression/verification: with the reviewed `PATH` order unchanged, the default runner must skip
the aliases, select the later real interpreter, clean up its server/profile, and finish the full
suite at non-zero assertion count. Cover the all-candidates-invalid diagnostic without relying on
the machine's installed aliases. Keep `build/*.ps1` ASCII-only.

**The reported symptom does not reproduce today, and that is worth recording rather than quietly
fixing.** Re-measured before any change, all five candidates on the reviewed machine
(`python`/`python3`/`py`, WindowsApps aliases and the `AppData/Local/Python/bin` install alike)
launch through `Start-Process` and answer `--version` with `Python 3.14.5`, and the unchanged
runner completed at **`RESULT ALL PASS pass=2382 fail=0`** — so the aliases here are working
app-execution aliases onto that install, not the dead shims the filing describes. What was
observed was real (`Start-Process` reporting the file cannot be accessed) but was machine state,
not a permanent property of the path: a WindowsApps alias is dead whenever its Store package is
absent or the alias is switched off, and it looks *identical* to a working one from
`Get-Command`. The defect the task names is therefore in the discovery, not in the machine, and it
is fixed as filed; the priority is closer to LOW than MEDIUM in hindsight.

**What `Find-Python` does now** (`build/run-tests.ps1`): walk every candidate `Get-Command -All
-CommandType Application` resolves for the three names, in `PATH` order, deduplicated by source
(case-insensitively); ask each one `--version` through the *same* `Start-Process` shape the server
launch uses, so anything that cannot start that way is rejected here rather than at the server
start; accept the first that exits 0 *and* reports a Python 3, since a shim can also launch and
answer without being an interpreter. Give up only after all of them, listing each rejected path
with its reason. The chosen interpreter is printed (`Using Python <path>`) — without it, "which
one did it pick?" is unanswerable from the output, which is half of why the original failure was
confusing. No `-Python` override was added: the automatic path now covers the reviewed shape, and
an override would only be a second way to say the same thing.

The rejection list is written with `Write-Host` rather than carried in the thrown message. That is
not a style preference: the error view re-wraps a multi-line exception into a gutter-prefixed
paragraph and breaks the paths mid-word, which is unreadable for exactly the text the operator has
to read (it also broke the first draft of the self-test's assertions, which is how it was noticed).

Only the `Start-Process` call is inside a `catch`, not the whole probe. The first draft guarded the
lot, and duly reported a bug in its *own* empty-output handling as `cannot launch (Method
invocation failed ...)` — a broad catch around a diagnosis turns any mistake in the diagnosis into
a plausible-looking finding about the thing being diagnosed.

**New: `build/run-tests-selftest.ps1`.** A probe that quietly stopped rejecting broken shims would
look identical to a healthy machine, where the first candidate is fine and nothing is ever
rejected — so both directions are driven over shims the script creates, never over whatever
aliases the machine carries. Case 1 puts four broken shims alone on `PATH`, one per shape
(zero-byte `python.exe` that cannot launch, a `.cmd` exiting 9009 like the Store stub, a `.cmd`
that exits 0 saying `Perl 5.38`, and a `.bat` that exits 0 saying nothing at all): the run must
fail before the server starts and name all four with distinct reasons. The fourth was added last
and immediately failed, which is how the empty-output mistake above was found rather than shipped
(`Get-Content -Raw` yields nothing whatsoever for a 0-byte file, so the reason string was built
from an array) — an argument for covering the emptiest case even when it looks like a duplicate of
the one beside it. Case 2 is the reviewed shape — a broken shim first, the machine's real
interpreter after it — and asserts the shim is skipped, a focused suite really passes through the
selected interpreter, and neither a browser profile nor a listening server is left behind.
Windows-only, like the runner itself (Chrome under Program Files, `.cmd` shims), so it is not in
the CI matrix; CI drives the browser suite directly and never runs `run-tests.ps1`.

Verified: `run-tests-selftest.ps1` **`RESULT ALL PASS pass=13 fail=0`**; the full default runner
**`RESULT ALL PASS pass=2382 fail=0`**, exit 0, selecting and reporting its interpreter;
`node web/tests/node-import.mjs` **`RESULT ALL PASS pass=35 fail=0`**; `validate-selftest.ps1`
**`RESULT ALL PASS pass=23 fail=0`**; `release-selftest.ps1` **`RESULT ALL PASS pass=47 fail=0`**.
`build/*.ps1` stays ASCII-only with the `#Requires -Version 7.0` guard on every file, including
the new one. Nothing under `books/` or `web/` changed, so no rebuild or stamp was due.

---

## 238. §5.152's bonus-filtered item payment stays enabled when no carried item qualifies

**Priority: MEDIUM — a shipped payment presents a live action that silently does nothing for a
normal character state.**
**Status: done.** The control's eligibility now comes from the plan that commits the loss. See the
closing notes at the end of this section.

*(Filed 2026-08-10 during the post-task-236 review.)*

The cursed-price branch in §5.152 asks the player to surrender a weapon, armour, or magic item
with a combat bonus of **+1 or greater**. `renderChooseOnePay` already computes the shared
`losePaymentPlan`, but uses it only to decide whether a picker is needed; its availability guard
then calls the broader `state.hasItemMatch(item, tags)`, which ignores the payment's bonus filter.
A cursed player carrying only a matching +0 possession therefore sees the payment enabled. On
click the engine correctly finds no eligible loss, spends nothing, and does not arm the price
flag, so the apparent action simply rerenders unchanged.

Make the control's eligibility come from the same payment plan that commits the loss. In
particular, an item payment whose plan is present but ineligible must be disabled before a click
handler is wired; bonus, group, keep, multiple, cargo, and any other shared matcher constraints
must not be reimplemented in the view. Preserve task 223's full-pack barter path and task 226's
open-item picker behavior.

Add focused `suite-actions` coverage beside the task-226 cases:

- §5.152-equivalent payment, curse set, only a +0 matching item: disabled with an explanatory
  title, no loss, no armed flag;
- no matching item: disabled;
- exactly one eligible +1 item: payment commits directly and arms the flag;
- two eligible items: the picker opens and the selected loss arms the flag;
- §4.634's full-pack choose-one barter remains live.

This is a `web/` change: stamp the version and finish the aggregate browser suite before closing.

**The fix is one branch** in `renderChooseOnePay` (`web/js/render-rewards.js`): the guard that read
`state.hasItemMatch(item, node.getAttribute('tags'))` now reads `armPlan.present &&
!armPlan.eligible`, the same test the other two payment paths (`renderPayment`,
`renderOptionalPay`) already used and the same plan whose `needsChoice` this function was already
consulting two branches later. Nothing is reimplemented in the view: `bonus=`, `group=`,
`multiple=`, `cache=`, the keep rule and the cargo/ship kinds all arrive through
`losePaymentPlan`, so the button is live exactly when `applyEffect` would take something.

**The old broad matcher is not dead code that happened to be wrong — it was the *only* guard for a
non-`<lose>` cost, so removing it needed the corpus checked, not assumed.** `renderChooseOnePay`
only ever sees a `PASSIVE_TAGS` node (`lose`/`tick`/`gain`/`set`/`curse`/`disease`/`poison`/
`adjustmoney`), and across all six books the only non-`lose` nodes carrying both `price=` and a
possession attribute are §4.456's `<transfer item="?" bonus="1" price="1">` and §3.538's
`<sell cargo="?" price="x">` — both of which have their own renderers in the tag registry and
never reach this function. So an `item=` cost here is always a `<lose>`, and the plan covers every
case the old branch did.

**Coverage** sits beside the task-226 cases in `suite-actions`, driven through the real §5.152
section: a cursed player with only a +0 possession finds the "+1 or greater" offering disabled and
titled, with nothing taken and `curse1` unarmed; an empty pack gets the same verdict; a single
qualifying +1 object commits with no picker and arms the menu. Each case sets the curse
deliberately, so `menuWasteReason` (task 223) is not what disables the button — the asserted title
says which guard spoke. The two-qualifying-objects picker is the task-226 case immediately above,
and §4.634's full-pack barter is `suite-economy`'s task-223 block; both are left as they were
rather than duplicated here.

**Proved against the old code before being trusted.** With the previous guard restored, the new
block fails exactly one assertion — `task238: §5.152 a +0-only pack cannot pay the +1-or-greater
offering :: dis=false title=` — and the empty-pack case passes, which is the point: the shipped
symptom needed a *qualifying-but-filtered-out* possession to show, so a test that only checked an
empty pack would have passed on the bug.

Verified: `-Suite actions` **`RESULT ALL PASS pass=585 fail=0`**, full aggregate
**`RESULT ALL PASS pass=2387 fail=0`** (2382 + the five new assertions), version stamped
(`26.08.10.4d92e11`, service-worker cache key with it). One earlier full run was cut short by the
virtual-time budget and the runner named it as such (task 236's placeholder arm); the immediate
rerun passed. That run also showed the diagnosis has nothing to say about *where* the suite
stalled, since the harness publishes `#results` only in `report()` — filed as task 240.

---

## 239. The intentional `java-engine/README.md` rename leaves the reference packager looking for `README.txt`

**Priority: LOW — the offline web port is unaffected, but the retained reference packager can no
longer include its own README.**
**Status: done.** The one filename literal now reads `README.md`, exercised in both directions from
an isolated copy. See the closing notes at the end of this section.

*(Filed 2026-08-10 during the post-task-236 review. User decision: retain the Markdown rename for
displayability; it is an approved exception to the otherwise read-only `java-engine/` boundary.)*

`java-engine/Pack.java` still lists `README.txt` in `LocalFiles`, while the tracked file is now
`README.md`. Its packaging path opens each listed filename, so the first stale entry throws
`FileNotFoundException`, aborts the helper, and can leave the newly opened ZIP incomplete.

Make the smallest coherent repair: change that one filename literal to `README.md`. Do not alter,
refactor, or copy any other Java engine code. `AGENTS.md` records this sole exception so the task
is implementable without weakening the clean-room licence boundary.

Verification: `rg README.txt java-engine` has no live filename reference (historical prose, if
any, can remain); inspect or exercise the packager from an isolated temporary copy so no package
output lands in the repository; then run the repository's required verification loop before
closing the task.

**One character-for-character change**: `Pack.java`'s `LocalFiles[0]`, from `"README.txt"` to
`"README.md"`. Nothing else in `java-engine/` was touched, read into the port, or reformatted, and
`README.txt` now appears nowhere in the tree.

**Exercised rather than inspected, in both directions, from a temp fixture** — `javac` and `java`
are both on this machine, so the claim did not have to rest on reading `addFile`. The fixture is a
throwaway copy of `Pack.java` beside stub files named for each of the ten `LocalFiles` entries and
a one-section `book1/`; no compiled class, archive or intermediate ever entered the repository (the
only tracked change is the one line above). With the stale literal, the run reproduces the filing
exactly: `File 0: README.txt`, then `Error in creating file:
java.io.FileNotFoundException: README.txt`, exit 1, and a **0-byte `JaFLtest.zip`** left behind —
the incomplete archive the task predicted, since `zout` is opened before the first entry is read.
With the fix, all ten local files are written in order starting `File 0: README.md`, `book1.zip` is
nested, and it closes cleanly at exit 0; the produced archive lists exactly those eleven entries.

Worth noting for anyone who reaches for this helper: the other nine names (`JaFL.bat`,
`flands.jar`, `user.ini`, the two JPGs, `Rules.xml`, `QuickRules.xml`, `books.ini`, `jafl.ico`) are
**not in this repository either** — `Pack.java` was written to run from the original distribution
directory, not from `java-engine/`. So this repair makes the file list internally consistent with
the tracked rename; it does not make the packager runnable from a checkout, and nothing here should
be read as suggesting it is. That is not a defect of the port (the boundary is reference-only), so
no further task is filed.

Verified: full aggregate **`RESULT ALL PASS pass=2387 fail=0`**, and `stamp-version.ps1` is a
confirmed no-op for a `java-engine/`-only change (`Version already at 26.08.10.4d92e11`), so the
app source hash correctly excludes the reference engine and the tree stayed clean apart from the
one line.

---

## 240. A cut-short run reports no progress at all, because the harness publishes `#results` once

**Priority: LOW — the run fails loudly and correctly; what is missing is any evidence of where it
stopped, which is what would let the underlying stall be diagnosed.**
**Status: done.** The harness republishes `#results` as each suite starts, and both the runner and
CI print how far the run got. See the closing notes at the end of this section.

*(Filed 2026-08-10 during task 238, observed live: a full run reported `RESULT FATAL pass=0 fail=1`
with the runner's task-236 placeholder diagnosis, and the immediate rerun of the same tree reported
`RESULT ALL PASS pass=2387 fail=0`.)*

`_test.html`'s reporter writes `#results` exactly once, in `report()`, after every suite has
finished. A run cut short therefore leaves the `running` placeholder and a ~6 KB dump with **zero
`PASS` lines**, whether it died in the first suite or in the last assertion of the corpus scan.
Task 236 made the runner say *that* a run was cut short rather than blaming a suite, which was the
important half; this is the other half — it cannot say *when*, so there is nothing to compare
between a run that stalled early and one that stalled at 99%.

That matters because the stall itself is still unexplained. Task 236 measured the whole suite at
**~13.5s of virtual time** and raised the budget to 300000 for headroom, so a run reaching that
ceiling is not a suite that grew too large: it is a stall long enough to push virtual time past
twenty times the normal spend. Two occurrences are now on record (task 236's filing and this one),
both intermittent, both passing on an immediate rerun of an unchanged tree — and the dump from
each carries no information about the point of the stall.

The cheap fix is to make progress observable rather than to hunt the stall directly: publish into
`#results` as the run proceeds (or flush the accumulated `out` lines per suite), so a cut-short
dump names the last suite and assertion that completed. The constraint is that this must not
weaken any existing guarantee — in particular the sticky-fatal contract (`flFatal` must still be
able to fail an aggregate, and a provisional `RESULT FATAL` must not be overwritten by a later
partial flush), the "first RESULT line in the dump is the verdict" rule that both the runner and
`.github/workflows/smoke.yml` depend on, and the `pass=0` vacuous-run check. A partial flush that
wrote a well-formed `RESULT` line for an unfinished run would be strictly worse than today's
placeholder, so whatever is written mid-run must not look like a verdict.

Verification: with progress publishing in place, a deliberately cut-short run
(`-VirtualTimeBudget 13500`, task 236's reproduction) must still be diagnosed as cut short, must
still exit non-zero, and its dump must now name the last completed suite; a normal run's verdict
line, counts and title must be unchanged; and a bootstrap abort (a duplicate top-level `const` in
one suite) must still report `RESULT FATAL pass=0 fail=1` naming the file.

**What the harness does now** (`web/_test.html`): `main()` calls a new `progress(current)` before
each suite runs — *before*, so the suite that never returns is the one named — and records
`name(passed/total)` for each one that finishes. It writes `running: <suite> | done: engine(213/213),
render(271/271), …` followed by every assertion line so far. Publishing at suite boundaries rather
than per assertion is deliberate: 14 `textContent` writes instead of ~2,400 rebuilds of a growing
80 KB string, for the diagnostic the task actually asks for.

The message has to satisfy three constraints at once, and each one is load-bearing rather than
stylistic:
- **It must still start with `running`.** Both `run-tests.ps1` and `smoke.yml` decide "cut short vs
  bootstrap abort" by matching `<pre id="results">running` (task 236). Replacing the placeholder
  with a differently-worded progress line would have silently disabled that discrimination in both
  places — the fix would have broken the diagnosis it exists to improve.
- **It must contain no `RESULT` line.** The verdict is the first `RESULT … pass=N fail=N` in the
  dump (task 142); a progress line shaped like one would *become* the verdict of an unfinished run,
  which is worse than today's placeholder.
- **It must never overwrite a provisional fatal.** `progress()` returns early when
  `window.__FL_ASYNC_FATAL__` is set, so once `flFatal` has claimed `#results` the sticky-fatal
  contract (tasks 82/120/143) still owns it.

`run-tests.ps1` and `.github/workflows/smoke.yml` both print the line as `How far it got: …` inside
their existing cut-short arms. CI is included for task 236's reason: the same stall produces the
same unreadable red build there, and a misread CI failure costs more than a local one.

**All four arms exercised live, not reasoned about:**
- cut short (`-VirtualTimeBudget 13500`): exit 1, still `CUT SHORT, not a bootstrap abort`, and now
  `How far it got: running: actions | done: engine(213/213), render(271/271), inventory(475/475),
  combat(289/289), economy(551/551)` — five suites complete, the stall inside `actions`. That is the
  line the two recorded stalls could not produce.
- normal full run: **`RESULT ALL PASS pass=2387 fail=0`**, exit 0, title `TESTS_OK`, counts
  unchanged; focused `-Suite economy` **`pass=551 fail=0`** (the head names only the suites a
  focused run actually visits).
- bootstrap abort (a duplicate top-level `const` appended to `suite-engine.js`, then reverted):
  still **`RESULT FATAL pass=0 fail=1`** with `FATAL uncaught error: Uncaught SyntaxError:
  Identifier 'dup240' has already been declared (suite-engine.js:764)`, and **no** cut-short
  diagnosis — the module never evaluates, so `progress()` never runs and `flFatal` still replaces
  the placeholder.
- mid-run async fatal (an injected `setTimeout` throw inside `suite-render`'s `run`, then
  reverted): **`RESULT FAILURES pass=2387 fail=1`** with the `ASYNC-FATAL uncaught error …
  (suite-render.js:17)` line intact in the final report. This is the arm the change could plausibly
  have broken — a later `progress()` clobbering the provisional fatal — and it does not.

`build/run-tests-selftest.ps1` still passes **`pass=13 fail=0`**. No stamp was due and none was
taken: `stamp-version.ps1` deliberately excludes `_test.html` and `web/tests/` as a dev-only
harness (its own comment says so), and running it confirmed the no-op — so a harness-only change
correctly does not bust a returning player's cache.

**The stall itself is still unexplained, and this task did not set out to explain it.** What changed
is that the next occurrence will name a suite instead of nothing.

---

## 241. A blessing-escape page spends the blessing on entry, then disables the exit it paid for

**Priority: HIGH — 42 shipped sections take the blessing for merely READING the page, and one
re-render later the escape it bought is disabled. The player is charged and then refused.**

*(Filed 2026-08-10, from a headless probe of four shipped books. Found during conversion work on
an unpublished book, whose pages print the same instruction.)*

Books 1-6 write "spend a blessing to skip this hazard" one way — book1/324, and 41 more:

    <if blessing="storm">
      If you have the blessing of Alvir and Valmir, which confers Safety from Storms, you can
      ignore the storm. <lose blessing="storm">Cross off the blessing</lose> and <goto section="559"/>.
    </if>
    Otherwise the storm hits with full fury.
    <if ship="barque"><random dice="1">…</random> if your ship is a barque</if> …
    <outcomes>…</outcomes>

`classifyPassive` sees an ordinary effect: not hidden, no `price=`, no `force="f"`, and — the check
that decides it — not `isGuardedBlessingLoss`, which fires only when the section also carries an
`<outcome blessing="X">` (task 108). So the loss is applied **on entry**, before the player has
chosen between the escape and the printed alternative below it. The hazard roll is still live, so a
player who takes it has paid for an exit they did not use.

**The second half is worse than the over-charge.** The escape's own `<if blessing="storm">` reads
the store the entry spend just emptied, so on the *next* render that branch is inactive and its
`<goto>` renders `disabled`. Any re-render does it, and clicking the hazard roll is a re-render. A
blessed traveller who rolls the dice has by then lost the blessing **and** the exit — the page
offers them nothing the blessing was for.

Measured on a real `GameState` (headless, scratch page, one assertion pair per book): entering
**book1/324**, **book3/139**, **book4/11** or **book6/9** holding Safety from Storms leaves
`state.hasBlessing('storm') === false` on the first render, and after one `story.rerender()` the
escape (559 / 154 / 236 / 247 respectively) is present but `disabled`.

**Scale, counted mechanically rather than sampled.** The shape is an `<if blessing="X">` /
`<elseif blessing="X">` branch holding a plain (non-hidden, no `force=`, no `price=`)
`<lose blessing="X">` beside a `<goto>`: **42 sections across books 1, 2, 3, 4 and 6**, and **not
one** carries an `<outcome blessing="X">` to arm task 108's guard. Book 5 is the only book that
writes the guarded form, and it puts the `<lose>` *outside* the branch as bare prose after the
table (book5/200, book5/250, book5/60) — which is exactly why book 5 escapes and nobody noticed.

Two neighbours in the family are already correct and must stay that way:

* **book6/160** writes the pair as `force="f"` losses ("in the event that you have both, you decide
  which to cross off"), so it routes to the opt-in path and is not charged on entry.
* **book2/377** offers no alternative — its `<else>` is death — so spending on entry is harmless
  there even though the shape matches.

**Both predicates need the same widening, not just the first.** Making `isGuardedBlessingLoss`
accept the in-branch form would stop the entry charge but never spend the blessing at all, because
`blessingSpendForGoto` is gated on the same non-empty `outcomeBlessings` set — an under-charge
replacing an over-charge. The two read one notion of "this loss is the deferred spend for that
goto" and both should recognise it structurally: a plain `<lose blessing="X">` inside a branch
conditioned on `blessing="X"` that also contains the `<goto>` it precedes. `<outcome blessing="X">`
then stays what it is today, the *other* way a section names a guarded hazard.

Coverage to add in `suite-render` beside the existing task-108 cases, driven through real sections:

* book1/324 (or book3/139) entered holding the blessing: still held after the render, escape live;
* the same page re-rendered without clicking anything: escape still live, blessing still held;
* clicking the escape: blessing spent exactly once, navigation to the printed section;
* clicking the hazard roll instead: blessing still held, and the outcome row resolves normally;
* book5/200 unchanged (the `<outcome blessing=>` form must keep working);
* book6/160 unchanged (a `force="f"` pair keeps its decline);
* book2/377 unchanged (its escape is the only non-fatal exit).

This is a `web/` change: stamp the version and finish the aggregate browser suite before closing.

**Done 2026-08-10.** Both predicates were widened through ONE new structural helper in
`render-rules.js` — `branchBlessingEscapeGoto(node)`, which returns the `<goto>` a plain
in-branch `<lose blessing="X">` pays for, or null. It requires the loss to be non-hidden,
unpriced and not `force="f"`, to sit inside an `<if blessing="X">`/`<elseif blessing="X">`, and
to be followed by a `<goto>` **inside that same branch**. `isGuardedBlessingLoss` now returns
true for it as well as for the `<outcome blessing="X">` form, and `blessingSpendForGoto`
attributes the spend to exactly that goto — so the two read one notion of "this loss is the
deferred spend for that goto" from one place, and widening the guard could not become an
under-charge.

**Scoping the goto to the branch is the load-bearing part, and only book6/9 shows why.** Its
"Otherwise `<goto section="222"/>`" *follows* the loss in document order, so task 108's
section-wide precedence rule would have made walking away unblessed cost the blessing. The
in-branch requirement is what keeps that exit free; there is an assertion for it both ways.

The filing's census was re-run mechanically before any code changed and reproduced exactly:
**42 plain branch-shape sections** (book1=6, book2=10, book3=16, book4=5, book6=5), **none**
carrying an `<outcome blessing="X">`, book 5 absent, and book6/160 the *only* `force="f"`
exclusion. Two facts the census added: every one of the 42 is a single `<if>` with exactly
**one** goto after the loss and no nested branch, and none uses a piped blessing list — so the
"first goto in the branch" rule is unambiguous across the whole corpus.

Proved by neutralising the helper and re-running: **13 assertions fail**, showing both halves —
`spends=1` at entry (the over-charge) and `held=false disabled=true` after a single
`rerender()` (the escape the blessing had just bought). The full suite moved 2387 → 2411
(22 new task-241 assertions + 2 in the task-90 block below), which is the number to compare
against when reading a verdict by hand.

Four notes worth carrying forward:

* **The coverage went into `suite-actions`, not `suite-render` as the task says** — the
  task-108 cases it told me to sit beside are in `suite-actions` (§5.200/232's veto,
  entry-hold and safe-goto spend), and `suite-render` has no blessing-guard cases at all. The
  locator was right and the suite name was wrong.
* **§5.200 needed no new assertions.** The adjacent task-108 block already drives exactly the
  "unchanged" case the task asks for, and it still passes through the rewritten
  `blessingSpendForGoto` (which no longer early-returns on an empty `outcomeBlessings`).
* **The task's read of book2/377 was half wrong.** "Spending on entry is harmless there" holds
  for the over-charge (the player has no alternative to be cheated out of) but not for the
  store: the pre-fix run shows the entry charge emptied it there too. Its escape merely
  *looked* fine because the branch's active/inactive decision is made during the walk, before
  the loss applies — so the defect only ever shows from the second render on. That is the same
  reason §1.324's "escape live on entry" assertion passes with the fix neutralised while every
  post-rerender one fails.
* **One shipped test asserted the defect.** `suite-combat`'s task-90 pair used §1.586 — one of
  the 42 — as its end-to-end vehicle, with the comment "spends the blessing on entry". The
  task-90 *rule* is untouched (a permanent blessing survives its spend, an ordinary one does
  not); only the moment of charging moved, so those two assertions now click the →85 escape
  instead of reading the state after `begin()`. A test whose comment states the wrong model is
  worth re-reading, not just re-pointing.

---

## 242. A branch escape's `<lose>` and its `<if blessing=>` must agree on the blessing's spelling

**Priority: LOW — nothing in the shipped corpus is affected today; this is an undocumented
simplification in task 241's new predicate plus a gap in the source gate.**

*(Filed 2026-08-10, while implementing task 241.)*

`branchBlessingEscapeGoto` decides that a `<lose blessing="X">` belongs to its enclosing
`<if blessing="Y">` by comparing the two attributes with `normalize` — case/whitespace only.
But the corpus has **two live spellings for two blessings**: `storms`→`storm` and
`poison`→`disease`, folded by `canonBlessing` in `state.js` precisely because "a grant in one
spelling satisfies an `<if blessing="…">` check (and its paired `<lose>`) in the other"
(tasks 76/123). `canonBlessing` is module-private, so the new predicate cannot reach it.

The census confirms all 42 shipped branch escapes spell it the same way *within* a section
(book1/324 uses `storms` throughout, book2/377 `poison` throughout), so the mismatch is
unreachable now. But a mixed pair — `<if blessing="storms">` around a `<lose blessing="storm">`
— would silently fall back to today's defect: no branch found, charged on entry, escape
disabled one render later. It fails *quietly* and in the wrong direction, which is exactly the
shape task 241 was filed for. It is also the kind of thing a new book's conversion produces,
since the two spellings are interchangeable everywhere else.

Two ways to close it, and they are not exclusive:

* Export a canonicaliser from `state.js` (the alias table's home) and have
  `branchBlessingEscapeGoto` — and `computeOutcomeBlessings`/`isGuardedBlessingLoss`, which
  compare the same way — fold through it instead of bare `normalize`. That makes the rule
  match the engine's own notion of blessing identity.
* Add a check to `build/validate-source.ps1`: inside an `<if|elseif blessing="X">`, a
  descendant `<lose blessing="Y">` with `canon(Y) === canon(X)` but `Y !== X` is a source
  smell worth failing on, since the books never mix spellings inside one section.

Prefer the first (it fixes the rule); the second only stops the source from drifting. Either
way add a scratch-fixture assertion beside the task-241 cases in `suite-actions` driving the
mixed pair — a `<lose blessing="storm">` inside an `<if blessing="storms">` — since no shipped
section can exercise it.

**Done 2026-08-10.** Took the first option only. `state.js` now **exports** `canonBlessing`
(the alias table's home is unchanged; only its visibility moved), and `render-rules.js` folds
through it at every place a blessing *name* is matched against another blessing *name*:
`branchBlessingEscapeGoto`'s loss↔branch comparison, `computeOutcomeBlessings`'s set members,
and the three lookups against that set (`isGuardedBlessingLoss`, `blessingSpendForGoto`,
`blessingSpendForReroll`). The blessing rules now ask the same question `hasBlessing` /
`removeBlessing` have always asked.

**The set and its lookups had to move together.** The task named three functions, but
canonicalising `computeOutcomeBlessings`'s members while leaving `outcomeBlessings.has(normalize(b))`
alone would have turned the *guarded* form's own alias pair into a fresh miss — the same defect
one step sideways. Two of the five sites are therefore not in the task's list and are not
optional; the fold is only sound if the producer and every consumer share it.

**Deliberately skipped the second option (the `validate-source.ps1` check).** Once the rule
folds, a mixed pair is *correct source*, not a smell — a gate failing the build on it would
reject valid XML and, worse, encode the belief that the two spellings are distinct, which is
what tasks 76/123 decided they are not. Nothing is left to drift into.

Proved by neutralising the fold in `render-rules.js` alone (one aliased import, so `state.js`'s
own folding stayed live and the failures could not be noise from `hasBlessing`) and re-running:
**10 of the 12 new assertions fail**, with the filing's predicted signature intact — `spends=1`
at entry and `held=false disabled=true` after one `rerender()`. The two survivors are the
negative controls, which is the point of including them: `<if blessing="luck">` must *not* claim
a `<lose blessing="storm">`, and §6.9's unblessed "Otherwise →222" must stay free. Suite 2411 →
**2423**.

Worth carrying forward: **the `<outcome>` half was reachable too.** The filing framed this as a
gap in task 241's *new* predicate, but `<outcome blessing="storms">` + `<lose blessing="storm">`
missed each other under task 108's older guard the same way, and had since 2024 — unexercised
only because book 5 is the sole book writing that form and spells it consistently. A defect
filed against new code was equally present in the code it was modelled on; when a filing says
"the new predicate compares too narrowly", check whether the thing it was copied from does too.

## 243. A cargo buy stays enabled with a full hold and refuses on click, where every other capacity limit disables

**Priority: LOW — nothing is mis-granted or over-charged; the transaction is refused correctly.
This is an affordance inconsistency, and the one capacity limit in the app that does not explain
itself before the click.**

*(Filed 2026-08-10, during conversion work on an unpublished book.)*

Both cargo-buying paths gate on "is there a ship here", never on "has it room":

* `renderShopRow` (`render-market.js`) disables a Buy for `soldOut || balance < price || noSlot`,
  and `noSlot` is `carryable && freeSlots() <= 0` where `carryable` is weapon/armour/tool/item —
  so a `<trade cargo=>` row never gets a room check at all.
* `renderInlineBuy`'s reason ladder gives a `<buy cargo=>` exactly one refusal,
  `shipsHere().length === 0` → "You need a ship here to carry cargo."

The click itself is safe: `buyTrade` looks for a ship here with
`(s.cargo || []).length < shipCap(s.type)` and returns `{ ok: false, note: 'No cargo space.' }`
**before** spending, so the view toasts a warning and the purse and the hold are untouched.
Measured on a real `GameState`: a barque already carrying one Unit charges nothing and loads
nothing, on both paths.

What is wrong is that the player learns it only by clicking. The 12-item cap — the same limit one
category over — disables both paths with the title "No room (12-item limit)"; funds disable with
"Not enough Shards"; a spent `quantity=` row disables as "Sold out". Cargo alone shows a live
button that does nothing.

The books make it visible. **book3/221** hands you a hold's worth of spices "which you can take if
you have room for it", and **book3/410** prints the same offer. A full-hold player reads a printed
condition, sees an enabled button, clicks, and gets a toast where every neighbouring control would
have answered before the click. The census is 17 sections carrying a `<trade cargo=>` market row
and 21 an inline `<buy cargo=>`, across books 1–5.

**Fix:** `market.js` already owns the rule (`shipCap`, and `buyTrade`'s own search). Export the
predicate it computes — "is there a ship here with room" — and have both view paths use it as a
disable reason, titled with the words the refusal already uses ("No cargo space."), so the button
and the toast cannot disagree. Assert it on both paths: a market row and an inline `<buy cargo=>`,
each with a laden barque here (disabled, titled) and each with room (live).

**Checked and deliberately not filed here:** book3/221 and book3/410 both print "you can, of
course, jettison existing cargo to make room", and **no jettison control exists anywhere** — not in
a market, not on the Adventure Sheet's ship panel. That is a missing feature rather than a defect in
one, so it belongs in `ROADMAP.md`; it is named here because it is what makes a full hold a dead end
today rather than a decision.

**Done 2026-08-10.** `market.js` now exports `hasCargoSpace`, backed by the same
ship-selection helper `buyTrade` uses, so the transaction and the view share one definition of a
local ship with room. Both cargo-buy views disable a full hold with `No cargo space.`; the inline
path keeps its more specific no-ship explanation when no vessel is here.

Four synthetic view assertions cover a laden and an empty barque on both paths. Before the rule
change the two full-hold assertions failed while both room controls stayed live; afterward the
focused economy suite passed **555/555**, the DOM-free import check passed **35/35**, and the full
browser/corpus run passed **2427/2427** (suite 2423 → **2427**).

---

## 244. A dice-table row into an unbundled book answers "please try again", where every other cross-book control names the book

**Priority: LOW — nothing is mis-granted and no state is corrupted; the move is rolled back
correctly. This is the one cross-book control in the app that does not explain why it refused,
and it refuses in the place a player has the least idea what went wrong.**

*(Filed 2026-08-10, during conversion work on an unpublished book.)*

`<outcome>`, `<success>` and `<failure>` all accept `book=` (the source gate's allowlist has it on
each), and a revealed branch with a `section=` renders a "Continue → N" button. `revealBranch`
(`render-rolls.js`) builds that button as:

    const targetBook = node.getAttribute('book') ? Number(node.getAttribute('book')) : story.book;
    btn.addEventListener('click', () => story.navigate(targetBook, section));

with **no edition check** — where the two other controls that cross books both have one.
`renderGoto` refuses before moving:

    if (!bookAvailable) { story.notify(`“${bookTitle(book)}” (Book ${book}) isn’t included in this edition.`, 'warn'); return; }

and `surfaceExtraChoices` (`render.js:1414`) carries the same line.

Measured on a real `GameState` against the shipped six-book edition, with the raw navigate stubbed
so the hand-off is visible:

* **book3/40**, row forced to `x=3` — the `<outcome var="x" range="2-4" book="9" section="84">` row
  reveals `"Continue → 84"`, and the click reaches `navigate(9, 84)`. In the app that is
  `data.getSection(9, 84)` → `loadBook(9)` → a 404 on `web/data/book9.json` → the thrown
  `Book 9 is not available in this edition.` → `Story.navigate`'s `.catch(abort)`, which logs that
  message to the console and toasts the player **"Could not load that section — please try again."**
  The rollback itself is sound (task 167's transaction refunds the move), so the only damage is the
  answer: the one message that names the real cause never reaches the screen, and the one that does
  invites a retry that can never work.
* the same target as a plain `<goto book="9" section="84">turn to 84</goto>` — the click notifies
  **"The Isle of a Thousand Spires" (Book 9) isn't included in this edition.** and never navigates.

The corpus reaches this today in **4 places**: `book3/33` (`range="7" book="9"`), `book3/40`
(`range="2-4" book="9"`), `book5/19` (`range="3" book="8"`) and `book3/464`
(`<failure book="12" section="25"/>`). Three of the four are dice tables where the *page itself*
prints the remedy — book3/33's "If you roll a 7 and are missing book 9, roll again", book3/40's
editorial "[If you roll 2-4 and lack book 9, roll again --Ed]" — so a player who ignores the
printed note and clicks Continue gets told to try again by the app, beside a page telling them to
reroll. `book3/464`'s `<failure>` has no such note and no alternative exit at all.

**Fix:** `revealBranch` should ask the question `renderGoto` already asks. The three call sites want
one shared helper rather than a third copy of the line — the notify text and `bookTitle` lookup are
identical in the two that have it. Assert it on a synthetic section per branch tag: an
`<outcome book="N">`/`<failure book="N">` into an unbundled book notifies with the book's title and
does **not** navigate, and the same row into a bundled book still navigates.

**Also worth deciding with it, not filed separately:** whether such a button should be *disabled*
rather than live-and-refusing. `renderGoto` deliberately keeps it live and answers on the click, so
matching that is the smaller change and the consistent one; disabling would also need the
`<if book=>` branch's gray treatment to stay distinguishable from it.

**Done 2026-08-10.** The edition check now lives once, as `Story.requireBook(book)` on the render
facade — it returns true when the book is bundled and otherwise notifies with the title and refuses.
All three cross-book controls call it: `renderGoto` (`render-choices.js`) and `surfaceExtraChoices`
(`render.js`) lost their duplicated copies of the line, and `revealBranch` (`render-rolls.js`) gained
the check it never had. `render-choices.js`'s now-unused `bookTitle`/`availableBooks` import went
with them. The facade was the right home: `render-rolls` and `render-choices` deliberately don't
import each other (task 163), and the helper needs `story.notify`, which only the facade carries.

Kept live-and-refusing rather than disabled, per the note above — a branch is revealed by a roll, so
a greyed Continue would arrive already dead beside a page telling the player to reroll, and would
collide with the `<if book=>` gray.

Seven synthetic assertions in `suite-render`, on the two corpus shapes: book3/40's var-keyed
`<outcome range= book="9">` row and book3/464's `<outcomes><success/><failure book="12"/></outcomes>`
after a failed ability roll. Each refuses without navigating and names the real book — "The Isle of a
Thousand Spires", "Into The Underworld" — while the same row into book 2 still crosses, and a branch
with no `book=` is untouched. Before the change the two unbundled cases navigated straight through
with no warning. Afterward the DOM-free import check passed **35/35** and the full browser/corpus
run passed **2435/2435** (suite 2427 → **2435**).

One fixture note worth keeping: a multi-ability `<difficulty ability="magic|scouting">` draws the
ability picker first and has **no `.btn-roll` to click**, so the failure fixture uses a single
`ability="magic"`. The first run of these assertions died as
`FATAL [render] TypeError: Cannot read properties of null (reading 'click')` for exactly that reason.

---

## 245. Only a `dead=`-gated branch is held for an unresolved fight, so §6.490 hands back the weapon it just confiscated

**Priority: MEDIUM — a printed cost is voided in a shipped book. §6.490's player opts to fight
bare-handed, the app confiscates the weapons, and the very next render gives them back while the
fight is still unresolved, so the subdual reward is kept and its price is not paid.**

*(Filed 2026-08-10, during conversion work on an unpublished book.)*

Two gates hold a post-fight effect, and between them they leave one shape uncovered.

`computeFightGate` (`render-gates.js`) collects the effects written after a `<fight>` so they cannot
fire until the fight resolves in their favour (task 213). It deliberately collects only **bare**
ones — its walker carries a `gated` flag set by `WRAP = if/elseif/else/success/failure/outcomes/
group/choice`, and the effect test is `!gated`:

    if (seenFight && !skip && !gated && FIGHT_EFFECT_TAGS.has(tag) && !boolAttr(ch.getAttribute('hidden')))

so anything inside an `<if>` is *by design* the conditional's business, not the gate's.

`isDeferredDeadChain` (`render-gates.js:151`) is what makes that safe — task 39 holds a whole
if/elseif/else chain inactive while a fight is unresolved, because "the player is alive throughout
the fight" and a naive `dead="f"` would otherwise fire the win branch mid-fight. But its first line
is:

    if (node.getAttribute('dead') == null) return false;   // only fight-outcome gates

**A post-fight conditional gated on anything else is therefore live from entry**, and every effect in
its body applies on the first render — the one gate skipping it because a conditional owns it, the
other declining because the conditional is not spelled `dead=`.

Mechanical census of the corpus for the shape (every `if`/`elseif`/`else` positioned after a
`<fight>` and carrying a value/possession effect): **32 hits, of which 22 are `dead=` chains** and so
covered. Of the remaining 10, six are book5/356's `<if var=>` rows *inside* a `<fightdamage>` (rendered
inert, so they never apply on render) and three are the `<else>` halves of book1/21 and book1/297's
`<if dead="f">` chains, which task 39 holds because `chainDeferred` rides the whole chain. That leaves
**one live instance: book6/490.**

    <group><text>fight without a weapon</text>
      <transfer weapon="*" to="6.490"/><tick special="attack" bonus="-1"/><tick codeword="6.490.1"/></group>
    …
    <fight name="Ridiculous Rogue" combat="4" defence="16" stamina="30"/>
    …
    <if codeword="6.490.1"><transfer item="*" from="6.490" hidden="t"/>
      Then, if you were fighting to subdue him, <goto section="463"/>.</if>

The `<group>`'s own click ticks `6.490.1`, which opens the `<if>` on the rerender that follows it —
mid-fight. Measured on a real `GameState` (book 6, a Warrior pregen carrying its battle-axe plus a
planted `test sword`, the section rendered and the group clicked):

* `6.490.1` is ticked, `sectionFights` reads `[null]` — the fight has not been fought;
* the weapons on the sheet are **`["battle-axe", "test sword"]`** — both back, from the `<transfer
  item="*" from="6.490">` inside the branch.

So the page's bargain — take a COMBAT penalty and fight unarmed, and you may treat the damage as
subdual — is available with the penalty applied and the weapons in hand. (The `<tick special="attack"
bonus="-1">` does stay, so the player is not strictly better off than before the click; they are
better off than the page allows.)

For contrast, the same section's *bare* post-fight loot is held correctly: its ring mail, knife and
`<gain shards="15"/>` all render a disabled Take titled "Fight first", and book2/514 and book6/186's
`<if dead="f">` loot is grayed by task 39. Only the non-`dead=` branch escapes.

**Fix:** the hold is about "has this fight resolved", not about how the branch is spelled. Widen the
deferral to any conditional chain positioned after an unresolved `<fight>` whose body carries an
effect — i.e. give `isDeferredDeadChain` a second reason to defer, keeping the `dead=` case as-is, or
compute it beside `computeFightGate`, which already knows which nodes follow a fight. Two things to
keep: a branch whose condition is *itself* the fight outcome must still be held for a **fled** fight
(the current rule holds fled as unresolved), and a chain with no effects in it — narration, or a
`<goto>` the fight gate already locks — should not start rendering grayed, or pages that merely
discuss the fight would gray for the whole of it. Assert it on a synthetic section per gate kind
(`codeword`, `item`, `var`) plus book6/490 itself: the weapon must still be in cache `6.490` while
the fight is unresolved and come back only once it is won.

---

## 246. `groupPlan` writes the passive-effect list out a second time, and that copy is the one that already drifted

**Priority: LOW — no shipped section is mis-rendered today. It is filed because this exact
duplication, in this exact function, is what task 230 had to fix: the copy was missing
`<adjustmoney>`, so §2.134's wager applied its cache unlock and none of its four payouts.**

*(Filed 2026-08-10, on closing task 245.)*

`engine.js`'s `PASSIVE_BODY_TAGS` is this port's canonical "writes to the Adventure Sheet" list,
and task 245 exported it so the post-fight chain deferral could borrow it instead of writing a
third. Two other places still answer the same question from their own text:

* `groupPlan` (`render-rules.js:345`) — `querySelectorAll('lose, tick, gain, set, curse, disease,
  poison, adjustmoney, transfer')`, character-for-character the same nine tags. Its own comment
  names the two lists it must track and asks the reader to "keep it in step with them", which is a
  request to a human rather than a mechanism — and the note exists *because* the request was
  missed once (task 230). An action `<group>` renders only its button and never walks its
  children, so a tag missing here is dropped in silence.
* `PASSIVE_TAGS` (`render-rewards.js:200`) — the same set **minus `transfer`**, consulted by
  `renderGroupWithRoll` to spot the effects a roll-bundled group defers to its roll. The omission
  looks like the same drift and is not commented either way, so the next reader cannot tell it
  from a bug. Corpus exposure measured over all six books: **zero `<group>` bundles a roll with a
  `<transfer>`**, so nothing renders wrongly today; it is a trap for the next section that does,
  where the stash would apply on entry instead of on the attempt.

**Fix:** derive `groupPlan`'s selector from the exported set (`[...PASSIVE_BODY_TAGS].join(', ')`
— `querySelectorAll` returns document order, so the result set is unchanged, and `<adjust>` stays
excluded by not being a member). Then either derive `PASSIVE_TAGS` the same way with `transfer`
removed explicitly, or leave the literal and say in one line why it differs. Assert the coupling
rather than the spelling: a synthetic `<group>` carrying one of every `PASSIVE_BODY_TAGS` member
must yield `plan.effects.length === PASSIVE_BODY_TAGS.size`, so adding a tag to the engine's set
without teaching the group about it fails a test instead of losing a payout.

---

## 247. The roll gate is keyed on `<outcomes>`, so a "roll and lose this many" page can be walked past unrolled

**Priority: MEDIUM — the roll gate is the only thing that holds navigation behind a mandatory roll,
and it is keyed on a node that half the corpus's rolls do not have. Nothing is corrupted and nothing
is mis-granted; a player who clicks the exit before rolling simply never pays the printed price.**

*(Filed 2026-08-11, during conversion work on an unpublished book.)*

`computeRollGate` (`render-gates.js:199`) opens with

    const outcomesNode = sectionEl.querySelector('outcomes');
    if (!outcomesNode) return null;

and everything below it — finding the gating `<random>`, collecting the `choice`/`goto`/`return`
nodes that follow it — is reached only past that guard. So the gate exists for exactly one page
shape: a roll whose result is read by a **table**. A roll whose result is read by an **effect**
gets no gate at all, and that is the other half of the corpus:

    <random dice="1" var="r">Lose 1-3 Stamina points</random> (the score of
    <set var="half" value="(r+1)/2"/>
    <lose stamina="half">one die halved</lose>, rounding fractions up).
    …
    <goto book="5" section="321">Turn to 321</goto>

That is **book3/199** verbatim, and its only exit is live from entry. The player who takes it has
lost no Stamina, no ship and no possessions.

Measured on a real `GameState` against the shipped edition:

* **book3/199** — draws its Roll control, takes no Stamina before the roll, and its cross-book
  `<goto>` renders **enabled**.
* **book5/477** — the water drake's `<random dice="1" var="loss">` +
  `<lose stamina="loss" hidden="t"/>` likewise: the `<fight>` below it is startable, and both
  onward `<choice>`s exist, with the jet damage untaken.
* **control, book1/278** — an ordinary `<random>`+`<outcomes>` travel roll still holds all four of
  its choices disabled. The gate works; it is only ever asked.

This is the `<random>` face of a limit already recorded from the `<difficulty>` side: a section
carrying a roll with no `<outcomes>` cannot hold anything behind it, so a conditional cost below
such a roll reads its var as **0** and goes live before the dice are thrown.

**Scope.** 48 numbered sections across books 1–6 carry a `<random>`/`<rankcheck>`/`<difficulty>`
with a `var=`, no `<outcomes>` anywhere in the section, at least one effect or derived `<set>`
reading that var, and navigation of some kind — book1/255, book1/649, book2/205, book2/698,
book3/199, book3/273, book4/664, book5/24, book5/343, book5/477, book6/700 among them. Two were
measured, above. The corpus's *usual* form for a rolled wound is `<lose stamina="2d">`, which
applies on entry and cannot be skipped, so only the pages that need the rolled **value** — a
halving, an armour subtraction, a floor, a scaled award — land in this shape, and every one of them
is exposed.

**Fix:** seed the gate from the roll whose var something below it reads, instead of requiring
`<outcomes>`. The set is already computed — `unsettledRollVars` (`render-rules.js:596`) collects
every `<random|rankcheck|difficulty var=>` the section has not filed yet and grows it through the
derived `<set var= value=>` nodes, which is precisely "this roll's result is still owed to
something". A `<random>` whose var nothing reads should keep gating nothing, and the existing
exclusions must survive unchanged: `ROLLGATE_OPTIONAL_WRAP` (a roll inside an
`if/elseif/else/success/failure/outcome/group` is opt-in), a `price=`/gate-`flag=` roll, and
`flee="t"` navigation. Note the gate would then need to release on the roll *resolving* rather than
on a matched outcome — `applyRollGate` reads `matchedOutcome` today, and there is no outcome to
match here.

**Assert it** on synthetic sections rather than on the shipped ones, since the shipped instances
are the regression risk rather than the specification: a `<random var="x">` + `<lose stamina="x">`
+ `<goto>` holds the goto until rolled and releases after; the same section with the `<lose>`
removed does not gate; and the same roll inside a `<group>` still does not. Then re-run the corpus
scan — this change can only ever *add* locks, so the thing to watch for is a section that becomes
unreachable, not one that stays open.

---

## 248. The roll gate holds the exits but not the `<fight>`, so §5.477's drake is fought before its jet lands

**Priority: LOW — the rolled wound is no longer skippable (task 247 holds the navigation), so
nothing is lost or mis-granted. What is wrong is the ORDER: the player fights at full Stamina a
fight the book says begins already hurt, which in a fight is the difference between surviving
and not.**

*(Filed 2026-08-11, on closing task 247.)*

`applyRollGate` disables tagged `choice`/`goto`/`return` buttons. A `<fight>` widget's Attack
button is none of those — `computeRollGate` never collects it and the gate never sees it — so
in a section shaped "the arrow hits you, THEN fight them", the fight is startable before the
roll that says how hard you were hit. The wound still arrives (the exits are held until the
roll is made, and `pendingRollVar` defers the effect until then), but it arrives *after* the
fight instead of before it.

**Scope.** Two shipped sections, both measured as carrying an effect-seeded roll gate and a
`<fight>` after the roll: **book2/726** (the hidden accomplice's arrow, then three brigands one
after the other) and **book5/477** (the water drake's jet, then the drake). Both spell the order
in the prose. No other published section has both.

The same hole is presumably open for the table-seeded gate (task 104) wherever a `<fight>` sits
below the roll — §1.299 is the section that motivated "the roll gate composes with the fight
gate", so check it, and check whether `applyPendingRerollGate` (which locks `.goto`/`.choice`
and exempts nothing else) has the same blind spot for a provisional result.

**Fix:** give the roll gate the fight's Attack control as well. The fight gate already knows how
to hold a widget (`applyFightGate`), so the cheap version is to have `applyRollGate` disable the
`.fight .btn-roll` of any fight positioned after `rollGate.rollNode` while the gate is shut,
with the same "Resolve the roll above first." title. Mind the interaction the other way round:
a fight the gate disables must not make the section read as a dead end (the `.end-fate`
fallback counts only ENABLED controls, and an unrolled section still has its Roll button), and
`<flee>`/escape routes stay exempt as they are in every other gate (`isEscapeNav`).

**Assert it** on a synthetic `<random var="x">` + `<lose stamina="x">` + `<fight>` + `<choice>`:
the Attack button is disabled before the roll and enabled after, and the section shows no
"tale ends here" fallback in either state. Then re-measure book2/726 and book5/477.

---

## 249. A mandatory check read only by its `<success>`/`<failure>` seeds no roll gate, so §5.198's Champion is fought uncursed — and the roll skipped for good

**Priority: MEDIUM — this is not an ordering wobble like task 248 but a roll the player never has
to make: the section's own mandatory check can be walked past entirely, and every one of the
three instances is a check whose failure COSTS something.**

*(Filed 2026-08-11, on closing task 248.)*

`computeRollGate` has two seeds: a mandatory `<random>` read by an `<outcomes>` table (task 104)
and a mandatory roll whose result an *effect's magnitude* reads (task 247). A check read only by
its own `<success>`/`<failure>` branch is neither, so it seeds nothing — and where the section's
navigation is held by the FIGHT gate instead, nothing else asks for the roll either. Win the
fight and the exits unlock with the check still unmade.

**Scope.** Three shipped sections, measured (every published section carrying an unconditional
`<fight>` below a roll that is not a fight hook):

* **book5/198** — `<difficulty ability="magic" level="13"/>`, whose `<failure>` applies a
  `<curse>` halving COMBAT for the fight. The Champion is fought at full COMBAT, then the
  player takes a sword and leaves; the curse never lands.
* **book5/218** — `<difficulty ability="combat" level="12"/>`, whose `<failure>` is `<lose
  stamina="3">` plus a `<while>` retry loop: you fight the troll without ever escaping its grip.
* **book5/689** — `<difficulty ability="scouting" level="10" var="pre"/>`, whose `<failure var="pre">`
  is `<goto section="7">` — you drowned. The drake is fightable before the section has decided
  whether you are alive. (It HAS a var, so only the "an effect reads it" half of seed 2 misses:
  the var is read by a branch and by an `<adjust value=>`, neither of which is a magnitude.)

book1/21 is deliberately NOT in that list: its `<difficulty force="f">` is the optional "talk
your way out" and fighting is the printed default, so it must never gate. That is what makes
this a third SEED rather than a widening of `isMandatoryRoll`.

**Fix:** a third seed — a mandatory roll (the same `isMandatoryRoll` test) with a `<success>`,
`<failure>` or `var=`-keyed branch reading it, positioned after the roll. Mind that the branch
seed must not fire on a roll the section merely *offers* (`force="f"`, pay-to-spin, `<group>`-
wrapped), and that `<flee>`/`<fightround>`/`<fightdamage>` hooks stay excluded as in task 247 —
book5/689's own `<fightround>` check is exactly the roll that must NOT gate.

**Assert it** on a synthetic `<difficulty var="p">` + `<failure var="p">` + `<fight>` + `<choice>`:
the Attack and the exit are both held before the roll and released after, and the optional
(`force="f"`) spelling gates nothing. Then re-measure the three sections above and re-run the
dead-end census.

---

## 250. `applyPendingRerollGate` locks only `.goto`/`.choice`, so §1.21's thug is fightable while the reroll decision stands

**Priority: LOW — one shipped section, and only for a player holding the matching blessing.**

*(Filed 2026-08-11, on closing task 248.)*

Task 248 gave `applyRollGate` the fight's Attack control; `applyPendingRerollGate` (task 181)
still disables `.goto, .choice` and nothing else, so a fight below a resolved-but-rerollable
roll is startable while the keep-or-reroll decision is open. Where the roll ALSO seeds the roll
gate this is already covered — `applyRollGate` treats a pending reroll as unrolled and now holds
the fight with the exits — so the exposure is the sections whose roll seeds no gate: task 249's
three, and **book1/21**, whose `force="f"` CHARISMA roll is optional and so can never seed one.
There the player can attack the thug with a CHARISMA reroll still pending, and a reroll to
success would have sent them to §10 with no fight at all.

**Fix:** extend the selector the same way task 248 did, or (cheaper) recognise that both gates
now want "every control that commits, except giving up" and name that set once. Keep
`[data-fleenav]` and the fight's own Flee exempt, and never touch the reroll widget's own
`.blessing-reroll`/`.keep-roll` buttons — the gate would otherwise lock the only way to settle it.

**Assert it** on a synthetic rerollable check above a `<fight>` with the blessing held: the
Attack is disabled while the decision stands and enabled once the result is kept.

---

## 251. A standing forfeit picker does not hold the section's exits, so book4/116's "cross three items (your choice)" is skippable

**Priority: MEDIUM — the printed loss is voided outright, and the exit that voids it is the
section's only one.**

*(Filed 2026-08-11, on writing a page of book4/116's shape.)*

Task 231 gave a bare open `<lose item="?">` a picker and task 228 taught it to collect a
`multiple=` count. Neither gave the section's onward navigation anything to wait for.
`renderForfeitChoice` prints the row's words, stands the picker where the effect would have
applied, and returns; the loss commits only inside the picker's own callback, and nothing records
that a decision is outstanding. So on **book4/116** ("you discover you have lost some
possessions … `<lose item="?" multiple="3">Cross three items</lose> (your choice) off your
Adventure Sheet", then a plain `<goto section="676"/>`) the Continue is live from entry: measured
against a real `GameState` carrying five possessions, the picker reads "Give up which? (0 of 3
chosen)" beside an **enabled** →676, and leaving takes nothing. The `fx@` memo is deliberately not
marked until the pick commits — which is what makes the loss correct if the player does pick, and
permanently skipped if they do not.

This is the gate half of task 107's rule, never written. A visible, forced, unpriced `<transfer>`
is a mandatory action and `computeTransferGate` locks the navigation after it until it runs; an
open forfeit whose page prints no choice about *whether* is exactly as mandatory. The three other
standing pickers on the same passive path — `renderAbilityChoice` (tasks 224/225),
`renderEquipmentChoice` and `renderProfessionChoice` — are the same shape and want measuring in
the same change. A `<group>`'s bundled forfeit (task 229) is already safe: the group's one click
applies its whole body, its `<goto>` included, only after the pick.

**Fix:** mirror `pendingTransfer`/`applyTransferGate`. Have `renderForfeitChoice` (and whichever
siblings measure the same) record a pending decision on the view, then disable the rendered
`.goto`/`.choice` while it stands, with the usual exemptions — `[data-fleenav]` stays clickable
(tasks 205/250), and never the picker's own `.btn-mini`s. Only ADD a disable, so it composes with
the fight/roll/transfer/buy gates. The gate must key on the picker actually RENDERING, not on
`needsForfeitChoice` alone: a forfeit inside an untaken (grayed) branch, or one already chosen
this visit, must not lock a section with no way to settle it — the same constraint
`pendingRerollDecision` documents.

**Assert it** on book4/116 with five possessions carried: →676 disabled while "0 of 3 chosen"
stands, three picks take exactly those three, and the exit releases. Add the negative too — a
forfeit with only one candidate needs no choice and must leave the exit alone.

---

## 252. Task 251's choice gate makes §2.157's exit assertion fail on 2 of 6 unseeded die rolls, so the suite is green by luck

**Priority: HIGH — a suite that fails a third of the time makes every future run's verdict
unreadable, which is the one thing every other task's "confirm `RESULT ALL PASS`" step rests on.**

*(Filed 2026-08-11, on running the suite repeatedly against the tree task 251 landed on.)*

`suite-economy.js:169` asserts **`§157 exit (19) reopens once the spin resolves`**, and it does
not seed the die. **book2/157**'s golden wheel is a 1d6 whose outcomes 1 and 2 are
`<lose ability="?" amount="1" flag="x">` and `<gain ability="?" amount="1" flag="x">` — both
`renderAbilityChoice`, which since task 251 sets `story.pendingChoice` as it appends the picker,
so `applyChoiceGate` disables the page's `<goto price="x" section="19"/>`. On a 1 or a 2 the
assertion fails; on a 3–6 it passes. Measured over six consecutive `-Suite economy` runs on a
clean tree at `d763240`: **two failures, four passes**, matching 2/6 exactly, and the preceding
assertion (`§157 rolling shows a die and reveals exactly one outcome`) passes in the failing runs,
so the spin really does resolve and the only thing holding the exit is the new gate.

**The behaviour is right and the assertion is stale** — this is not a request to weaken task 251.
The page's rule is that the wheel's result must be applied, the picker is how it is applied, and
task 251's own census counted this section deliberately ("**27** sections gain a held exit (six
ability awards, …)"). What was missed is that one of those 27 already had a shipped assertion
saying the opposite, and an unseeded die hid the contradiction: the implementation pass recorded
"Full suite 2500", which was a 4-in-6 roll and not a verdict.

The general point is the one worth carrying: **a census of sections whose exits a new gate will
hold is also a census of assertions that may now be wrong**, and the suite cannot be trusted to
say so while any of them roll live dice.

**Fix:** seed the spin the way the suite already does elsewhere (`const _r = Math.random;
Math.random = () => 0;` … restore — `suite-economy.js:1004` and `:2734` are the shipped form), and
assert both halves against a known outcome: on a picker outcome the exit stays disabled with
"Make the choice above first." until the ability is chosen and releases on the pick; on a
non-picker outcome (say roll 3, the permanent Stamina loss) it reopens on the spin alone, which is
what the current assertion was written to check. Keep both — the second is task 30's flag gate and
is still the thing that would regress silently.

**Then sweep for the same shape**: any other assertion that rolls a live die and reads a control
task 251 can now hold. The six ability awards in that census are the candidate set.

---

## 253. A re-armed roll that lands the same outcome twice in one visit applies its effect once, so §3.314's second night at the tavern is paid for and does nothing

**Priority: MEDIUM — it costs the player a real resource for nothing, but only on the
"pay again without leaving" path, and the page is always re-enterable for a clean second go.**

*(Filed 2026-08-11, measured while seeding §2.157's spin for task 252.)*

`rollGate` (`render-rolls.js:138`) drops the *stored roll result* when a `price=` flag is
re-armed — that is what makes "pay again, spin again" work — but the effects that result
already revealed keep their `fx@<path>` entries in `ctx.applied`, which is per **visit**
(`visit-state.js:16`) and is never cleared for a re-armed roll. Land the same outcome twice in
one visit and the second landing renders its words and applies nothing.

Measured on **book3/314**, the tavern that is explicitly repeatable ("Each day you spend
resting at the tavern, `<random dice="1" flag="x"/>`"), with the die pinned to 1 (Dysentery,
`<lose stamina="1">`): two paid days took **2 Shards (10 → 8) and 1 Stamina (5 → 4 → 4)**.
The second night was bought and did nothing. The picker path shows the same thing from the
other side — pinning both of §2.157's spins to outcome 1 leaves the second spin standing **no
picker at all** (`picks=0`, abilities untouched), because the first spin's pick had already
set that node's `fx@` memo.

Not measured, and worth measuring first: the **3-6 "good rest" branch** of the same section
(`<rest stamina="1">`), which is the outcome a player actually repeats and which memoises
through a different renderer (`renderRest`, `render-market.js`), so it may or may not share
the defect.

**Fix:** re-arming a roll must drop the memos of what its outcomes applied, not just the
result — clear the `ctx.applied` entries whose path lies under the roll's `<outcomes>` subtree
at the same point `rollGate` deletes `ctx.rolls`. Two things to keep straight while doing it:
the memo is what stops an effect re-firing on an ordinary **rerender**, so it can only be
dropped on a genuine re-arm; and a repeat must not become a farm — pin the dice and check the
per-visit award caps (`ctx.awardCounts`, `groupLimits`) still hold across two landings.

Also worth deciding separately, and **not** part of this fix: §2.157's page says "You may spin
this wheel **once**", yet the app re-enables its payment and lets the player spin again. The
shipped assertion (`suite-economy.js` §157 "re-paying re-arms the roll") documents the current
behaviour, so changing it is a rules decision, not a bug fix.

---

## 254. A re-armed roll whose result is read by an `<if var=>` chain instead of an `<outcomes>` table keeps its memos, so §6.628's second paid night at the garret heals nothing

**DONE (2026-08-12).**

**Priority: MEDIUM — the same cost-for-nothing as task 253, in the two sections that express the
same idiom the other way; the page is re-enterable for a clean second go.**

*(Filed 2026-08-11, measured while fixing task 253.)*

Task 253 scoped `dropRolledBranchMemos` (`visit-state.js`) to the branches a roll *reveals* —
the `<success>`/`<failure>`/`<outcomes>`/`<outcome>` subtrees after it — deliberately, so a memo
the roll never produced (the payment above it, §6.587's wand market below the table) is untouched.
Two sections read the same gated roll through an **`<if var=>`/`<elseif>` chain** instead, and
their effects therefore sit outside every branch tag and keep their memos across a re-arm:

- **book6/628** — the garret, §3.314's twin ("1 Shard a day … Each day you spend here,
  `<random dice="1" flag="x" var="y"/>`"), whose 1-5 and 6 arms each wrap a `<group force="t">`.
- **book6/50** — `<if var="roll" greaterthan="t">` → `<gain ability="thievery">`. One-shot in
  practice (the price is the **dragon mask**, and there is only one), so the repeat path is
  unreachable; listed because it shares the shape, not because it can be triggered.

Measured on **book6/628** with the die pinned to 1 (the 1-5 "regain 1 Stamina" arm) and Stamina
started at 4: night one paid a Shard (10 → 9) and the group's button healed to 5; re-paying took a
second Shard (9 → 8) and left that button **☑ and disabled**, so Stamina stayed at 5. Two further
details the probe turned up, both worth keeping straight in the fix:

- the memo doing the blocking is `group@<path>` (`render-rewards.js:181`), not the `fx@`/`rest@`
  keys task 253 dealt with, so the drop has to reach a group as well as a leaf effect;
- **between the re-payment and the new roll the chain still shows the PREVIOUS day's arm** — `y`
  stays in `ctx.wroteVars` with the old value, exactly the stale-write half task 253 had to undo
  for a nested roll. So the var write is part of this too, and here it is the *re-armed roll's own*
  var rather than a nested one's.

**Fix:** widen what a re-arm forgets to the roll's result-*readers*, not just its revealed branches —
and keep task 253's two constraints while doing it, since they are what stop the widening becoming
a farm: the per-visit award caps (`ctx.awardCounts`, `groupPicks`, `groupLimits`) must still hold
across two landings, and a memo may only ever be dropped on a genuine re-arm (it is what stops an
effect re-firing on an ordinary rerender). Note the widening is **not** "everything after the
roll": §6.587's market sits below its table and its `buy@`/`sell@` memos must survive, or a re-arm
would re-open a completed purchase.

---

## 255. Re-archive completed task details 212–254 and clear them out of the priority buckets — LOW (process/docs)

*(Filed 2026-08-12; recurring maintenance after tasks 141, 165 and 211.)* Task
211 archived completed details 1–211, but the 212–254 burn-down has since
completed every detailed task again. Their checked rows filled the
HIGH/MEDIUM/LOW work queues while ~2,870 lines of completed detail sat between
the checklist and the Review log, so TASKS.md was back to well past its
pre-archive size (3,898 lines, larger than the 2,093 that triggered task 211)
and the "first open task" workflow was harder to scan.

Move completed detail sections 212–254 into TASKS-archive.md under their stable
IDs, consolidate their summary rows into the single numeric **Done** list, and
leave only open-task detail plus the Review log in TASKS.md. Extend the archive
intro/Contents range without losing completion notes or historical review text.
Documentation-only; validate every checklist ID has exactly one detail heading
across the two files, then commit.

*Done 2026-08-12:* documentation-only re-archive, scope 212–254 as filed plus
this task's own detail (255), matching how tasks 165 and 211 archived
themselves. Moved every detail section 212–254 verbatim (completion notes
intact, headings unchanged) into TASKS-archive.md, extended the archive
intro/Contents to IDs 1–255, and merged the HIGH/MEDIUM/LOW rows into the
**Done** checklist in numeric order. The **HIGH**/**MEDIUM**/**LOW** headings
stay in place (kept deliberately, so new work is filed under an existing bucket)
and are now empty, each carrying the same `*(none open — file new … work here)*`
placeholder task 211 left. TASKS.md keeps the intro, those three headings, the
full **Done** checklist, the archive-range note (now 1–255) and the Review log,
dropping from **3,898 to 1,028 lines**; the archive grows from 7,341 to 10,301.

Two things worth carrying forward. **The buckets and the Done list had already
drifted into duplication**: of the 42 bucket rows, 28 (IDs 213–240) were
*already* listed under **Done** as well, so the merge had to be a set union
rather than an append — only 14 rows (241–254) were bucket-only. This is the
same defect task 211 recorded for a single ID (180) and it had since grown to
28, because closing a task appended it to **Done** without removing its bucket
row. Validated afterwards that every checklist ID 1–255 has exactly one `## <N>.`
detail heading across the two files, that the archive's detail IDs are exactly
1–255 with no gaps and no duplicates, and that no ID appears twice in **Done**.
**The bulk move was done by line-slice with boundary assertions, not by hand**:
the script refused to write unless the first moved line was `## 212.`, the last
was the closing `---`, the next surviving line was `## Review log`, and the block
carried exactly 43 detail headings. That guard earned its keep — a first run
aborted on a bad assertion of my own (PowerShell's `-like` reads the `[x]` in
`- [x] 240.` as a character class, so the pattern never matched), and the file
was left untouched rather than half-spliced. No code, data, build or test files
touched, so no rebuild or stamp change is implied.

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

## 257. A roll revealed inside an `<outcome>` gates nothing, so §3.15's gambling debt is cancelled by not rolling for it

**Priority: MEDIUM — two shipped sections, and unlike task 256's the failure pays the player
rather than merely letting them undo their own page: the losing row's debt is settled for zero.
It is still a deliberate click away from the printed instruction, which is what keeps it off
HIGH.**

*(Filed 2026-08-12, during conversion work on an unpublished book, on writing a table row that
rolls a second die for its magnitude and then asking why the page's exits were live beside it.)*

All three of `computeRollGate`'s seeds funnel through `isMandatoryRoll`
(`render-gates.js:270`), which refuses any roll under `ROLLGATE_OPTIONAL_WRAP` —
`if/elseif/else/success/failure/outcome/group`. For six of those seven that is exactly right: a
roll the player may never reach must not hold the navigation of players who never reach it.
**`outcome` is the one where it is wrong, because an `<outcome>` is not a branch the player
chooses — it is the row the dice just turned up.** Once the table reveals it, a roll inside it is
mandatory in fact, and nothing holds anything until it is made.

**book3/15 and book3/34 are the two shipped sections** (the whole family: a census of rolls under
a conditional wrapper that also carries that wrapper's own navigation reads 5 sections in books
1–6, and the other three — book1/13, book1/523, book5/592 — put their `<goto>` inside a
`<success>`/`<failure>` that the roll itself reveals, so they are sound). Both are the priestess's
card game. Each row of book3/15 is
`<outcome range="2-5" section="52"><random dice="2" var="x">Lose 2-12 Shards</random>
<lose codeword="3.52.Loss" hidden="t"/><tick name="3.52.Loss" amount="x" hidden="t"/></outcome>`
— the row's stake is a **second** roll, and the row carries its own destination, which
`revealBranch` draws as a live "Continue → 52".

**Measured against a real `GameState` (500 Shards, `?suite=`-style scratch page).** Rolling the
table to 2 reveals "Lose 2-12 Shards", offers the magnitude Roll — and the "Continue → 52" button
beside it is **enabled**. Click it without rolling: `3.52.Loss` is still 0 (correctly — task 181's
closure defers the `<tick amount="x">` while `x` is unfilled), so §3.52's
`<choice section="72" shards="loss">Pay her what you owe</choice>` resolves `loss` to **0**,
renders live with no price, and settling the debt leaves the purse at 500. The player wins the
right to walk away from every losing hand. The mirror row is self-punishing and so not a live
exploit — skipping the die on a *winning* row banks `3.72.Gain = 0` — but it is the same hole.
`computeRollGate` returns **null** on both sections, which is correct as far as it goes: every
exit they have lives inside an outcome, and the gate rightly skips those (§1.299's drunken
soldier is what the roll reveals, so holding him after the reveal would lock the fight the roll
just started). The defect is one layer in — the row's own link versus the row's own roll.

Control: book1/278, an ordinary table with no nested roll, still holds all four destinations
before its roll, so the existing seeds are unaffected.

**Fix:** in `computeRollGate`, stop treating `outcome` as an optional wrapper for a roll whose
own outcome-row carries navigation. The narrowest form is a fourth seed rather than a change to
`isMandatoryRoll` (which the other six wrappers rely on): for each `<random|rankcheck|difficulty
var=>` inside an `<outcome>`, hold the `choice`/`goto` nodes **within that same outcome** until
that roll resolves. A revealed row is already the only one rendered, so a gate scoped to the row
cannot leak into the rows the dice did not turn up. **The row's own `section=` needs a second
mark**: `tagRollNav` keys `data-rollnav` off an XML node in `gate.navNodes`, and `revealBranch`'s
"Continue → N" button (`render-rolls.js:436`) is synthesised from the `<outcome>`'s attribute with
no node of its own, so it can only be tagged where it is built. Both are the shape `applyRollGate`
already consumes, and it only ever adds a disable.

Tests: assert book3/15's "Continue → 52" is disabled while the magnitude die is unrolled and
enabled after it, on both a loss row and a win row; assert the same for book3/34; assert
book1/278's four destinations are untouched; and assert the end-to-end consequence — a player who
rolls the stake owes a non-zero sum at §3.52.

---

## 258. A branch's `section=` exit is a button with no XML node, so every node-keyed gate but task 257's is blind to it

**Priority: LOW — one shipped section, and it needs the player to make an optional roll, succeed
at it, and then click past a widget the page is plainly asking them to use. But the failure pays
them (the pickpocket's takings stay in the purse) and the shape is the one task 257 just had to
work around, so it is worth closing while the reasoning is fresh.**

*(Filed 2026-08-12, during task 257's implementation pass — on discovering that the row's
"Continue → N" could only be tagged where it is built, and then asking which OTHER gates key off
an XML node and would therefore miss the same button.)*

`revealBranch` (`render-rolls.js:426`) synthesises a `Continue → N` button from the revealed
branch's `section=` attribute. That button has **no node of its own**, so it is invisible to every
gate that decides by node identity: `tagFightNav`, `tagTransferNav`, `tagBuyNav` and `tagEscapeNav`
each ask `gate.navNodes.has(node)`, and the corresponding `compute*Gate` collects only
`choice, goto, return` **elements**. Task 257 hit this for the roll gate and solved it the only way
available — tagging at the build site (`story.tagOutcomeRollNav(node, btn)`, keyed on the
`<outcome>` itself). The other four gates were not touched, because a gate that holds nothing in
the corpus should not grow code; this task is the measurement that says whether that is still true.

**Measured over books 1–6:** exactly **one** section pairs a node-less branch exit
(`<outcome|success|failure section=>`) with an action one of those gates would hold — **book2/105**,
and it is the transfer gate. The pickpocket "brushes swiftly past you"; the theft is written as a
forced `<transfer shards="*" to="2.105">stolen any money</transfer>` (or, with an empty purse,
`<transfer item="?" limit="1" to="2.105">`), and the page then offers an **optional**
(`force="f"`) SCOUTING 10 check to track him, with `<outcomes><success section="128"/><choice
section="151">Failed (or did not attempt) SCOUTING roll</choice></outcomes>`.
`computeTransferGate` collects the `<choice section="151">` and holds it — an `<if>`-wrapped
transfer is still forced, only a `<group>`-wrapped one is excluded — but `<success section="128"/>`
is a bare attribute, so the Continue it draws is live. Roll SCOUTING, succeed, click it, and the
thief never takes anything. No fight and no `<buy force="t">` section has a node-less branch exit
at all, so those two gates have nothing to hold today.

The census reads the markup, not a running page: confirm against a real `GameState` that §2.105's
optional SCOUTING success really does draw an **enabled** Continue → 128 beside an unrun transfer
widget before changing anything, since a section whose gate turns out to hold it already needs no
fix, only the assertion.

**Fix:** give the three remaining node-keyed nav gates the same second mark task 257 added, at the
same build site — one `story.tagBranchNav(node, btn)` call in `revealBranch` that consults the
fight/transfer/buy gates for the **branch node** (as `tagOutcomeRollNav` consults the row gate),
plus the matching membership: each `compute*Gate` already walks the section for `choice, goto,
return`, so it also needs to collect an `outcome|success|failure` carrying `section=` in the same
positions. `isEscapeNav` needs nothing — a branch attribute cannot carry `flee="t"`.

Tests: assert §2.105's Continue → 128 is disabled while the theft transfer is unrun and enabled
after it, and that the takings really leave the purse either way; assert a fight-then-branch and a
forced-buy-then-branch synthetic in the same shape (neither exists in the corpus, and the point of
the fix is that the rule is the gate's and not the section's); assert a branch exit ABOVE the
gating action is untouched, as every other gate reads position.

---

## 259. A guard above the effect it reads is re-derived against live state on the next draw, so §2.105's pickpocket takes the money *and* a possession

**Priority: MEDIUM — one shipped section is really wrong (the player is robbed twice where the
page says "or"), it arrives unasked rather than being clicked for, and the same shape sits in five
more sections that need checking. It is not HIGH because the takings are recoverable at §2.174 and
the extra loss is one possession, not a softlock.**

*(Filed 2026-08-12, during task 258's implementation pass — the release half of §2.105's assertion
would not go green, and the reason turned out to be the section robbing the player a second time.)*

The walk re-derives every condition from scratch on each draw, so a guard that reads a resource
**above** an effect that changes it sees the pre-effect value on the first draw and the post-effect
value on every draw after. §2.105 is the section where that changes the outcome:

```
<if shards="1"><set var="x" value="1"/></if><else><set var="x" value="2"/></else>
… <if var="x" equals="1"><transfer shards="*" to="2.105">stolen any money</transfer></if> …
… <if var="x" equals="2">(If you had no money, he stole one possession instead -
                          you <transfer item="?" limit="1" to="2.105">choose which</transfer>.)</if>
```

**Measured against a real `GameState`** (Warrior, 40 Shards, leather jerkin + battle-axe + map):
on entry `x = 1`, the money transfer is the only live widget, no possession picker. Click it and the
purse empties — and the redraw re-runs `<if shards="1">`, which is now **false**, so `x` flips to
**2**, the "if you had no money" branch activates, and a live picker offers all three possessions.
Take one (the picker is a forced transfer, so task 107's gate holds the section's exits until you
do) and the sheet has lost 40 Shards **and** the jerkin. The page says the thief takes the money
*or*, failing that, one possession; our engine makes it both, and the second loss is unavoidable.

JaFL runs a section sequentially, top to bottom, once — so a guard above the transfer really does
execute before it. That is the same rule task 216 already implements for the tick count
(`walkTicks`: "the count an `<if ticks=>` guard reached HERE must read", starting from the entry
snapshot and advancing as the walk passes each tick applied this visit), and tasks 253/254 for a
re-armed roll's memos. The purse has no such walk-position reading.

**Corpus reach — 6 sections** carry a resource guard above an effect on the same resource
(`<if|elseif shards=|item=>` above a `<transfer|lose>` on that resource, the effect outside the
guard): **book1/501**, **book1/523**, **book2/105**, **book5/376**, **book6/215**, **book6/49**.
Only §2.105 is confirmed wrong so far; the other five want measuring the same way before anything
changes, since a guard whose branch is *below* its own effect may well be what the page intends
(book6/215's tiered "if you have 35 Shards … 50 Shards" prices read like a genuine cascade, and
book1/523's bribe pays 5 Shards inside a `<group>` whose guard is above it). **Measure first, then
fix only what the measurement condemns.** (Note the census must exclude `books/**/*temp.xml` — see
task 260 — which is why the raw sweep reads 13 rows over 8 files.)

**Fix (shape, to be settled by the measurement):** the narrowest form is a walk-position purse
reading in the same idiom as `walkTicks` — snapshot the entry Shards, let an `<if shards=>` guard
read the entry value until the walk has passed an applied money-moving effect, and only then the
live one. A `<set var>` memo per visit would also close §2.105 but is wider: `<set>` is
deliberately re-derived, and freezing it would break a var recomputed on purpose after a
mid-section change. Whatever the form, it belongs beside `walkTicks` in `render.js`'s per-draw
state, not in a condition evaluator that has no idea where the walk is.

Tests: assert §2.105 with money and possessions loses the money and **nothing else**, that the
possession picker never appears once the money branch has run, and that a player entering with an
empty purse still loses exactly one possession; assert each of the other five sections behaves as
its prose reads, whichever way the measurement lands.

**Measured, and what was done.** All six sections were driven against a real `GameState` before
anything was written, and the measurement moved the answer twice. **Three are really broken**, not
one: §2.105 as filed (40 Shards *and* the leather jerkin, with the possession picker opening
unbidden); **§5.376**, where crossing off the **scroll of Ebron** grays the `<goto section="509"/>`
*inside the same guard* — the exit the initiation is FOR, so the scroll is spent and the church
unreachable; and **§6.215**, which grays the block the player has just paid 35 Shards into. **Two
come out sound**, and the reason is the useful part: §6.49's donation and §6.215's blessing apply
their price as the *walk* passes it, so the guard above is read before the purse moves and the draw
right after the click is already correct — neither ever loses its reward, and what closes them on a
later draw is a different guard (`<if safeAddGod="Juntoku">`, `<if blessing="storm" not="t">`) going
false *because the reward landed*, which is what the page asks for. §1.523 is sound too: its bribe
`<group>` carries its own `<goto>`, so it navigates instead of redrawing.

**The proposed walk-position purse reading was not what got written.** It needs an entry snapshot
per resource *and* a hook at every site that spends outside the walk (a group commit, a pay action,
a transfer, a buy), because on the redraw no effect re-applies and nothing would move the position.
What replaced it is one rule with the same effect and none of the reach: **a spend guard — an
`<if>`/`<elseif>` whose every attribute is a purse/pack test or a modifier of one (`isSpendGuard`,
`render-rules.js`) — stays open once the walk has taken it**, recorded per visit in
`ctx.guardTaken` and serialised with the memo. A first attempt memoised *every* condition, and the
suite refused it in three places that are all correct requirements: task 133's `<if curse=>` must go
false the moment the curse is lifted from the sheet, task 181's `<if var=>` must wait for its roll,
and §5.232's `<if not var="keepblessing">` is rerunnable by design. The attribute whitelist is what
keeps those re-reading live. `not=` is excluded by the same whitelist — see task 261.

---

## 260. 18 tracked `books/**/*temp.xml` working copies declare a live section's `name=`, and every corpus census counts them twice

**Priority: LOW — the build and the app are unaffected (the file filter excludes them), so no
player ever sees one. What they cost is measurement: they silently inflate every corpus census, and
this backlog decides scope by census.**

*(Filed 2026-08-12, during task 259's census — which reported `book1/501` and `book1/501temp` as
two separate hits for the same defect, and `book6/215` three times over.)*

`books/` holds **18** files tracked in git whose names end `temp.xml`: book1/501temp, book1/554temp,
book2/248temp, book2/267temp, book2/542temp, book2/726temp, book3/635temp, book5/386temp,
book6/160temp, book6/171temp, book6/215temp, book6/4temp, book6/533temp, book6/548temp,
book6/628temp, book6/635temp, book6/691temp, book6/731temp. Each is a working copy of its
non-`temp` sibling and — this is the part that bites — each declares the sibling's own section
number inside: `books/book1/501temp.xml` opens `<section name="501">`, differing from `501.xml` only
in an editor's comment.

**Nothing reaches the app.** `build-data.ps1:152` keeps only `$_.BaseName -match '^\d+[a-z]?$'`,
which `501temp` fails (the pattern allows one trailing letter, not four), so no `*temp` file is
bundled and no JSON key collides — verified: no `web/data/*.json` has a key matching `[0-9]*temp`.
It follows that they are **also unvalidated**, since `validate-source.ps1` gates the same file set:
a tag outside the allowlist could sit in one indefinitely. And no section in books 1–6 links to a
`temp` name, so they are unreachable as well as unbundled.

The cost is the census. A sweep written the obvious way — `Get-ChildItem book*/*.xml` — reads a
`temp` file as a section, so a defect present in `501.xml` is reported twice and one present only
in the stale copy is reported as live. Task 259's first sweep did exactly this. Every task in this
backlog that says "measured over every section in books 1–6" was written by hand against this
directory, so the hazard is standing, not hypothetical.

**Fix:** decide what they are, then make the tree say it. Two defensible ends, and the choice is
the whole task: (a) they are stale scratch — delete them, and the hazard is gone for good; or (b)
they are worth keeping as the editor's notes — move them out of `books/book<N>/` (a
`books/notes/` sibling the build never walks) or rename them so no file under `books/` declares a
`name=` that is not its own. **Do not simply extend the build filter**: the filter already excludes
them; the problem is that they LOOK like sections to everything except the filter. Whichever way it
goes, first diff each against its sibling and report which of the 18 carry content the live section
does not — a `temp` copy holding the newer text would be a content bug hiding behind this one.

Tests: this is tree hygiene, not engine behaviour, so the assertion belongs in the build gate —
`validate-source.ps1` should fail on any file under `books/book<N>/` whose `<section name=>` does
not match its own basename, which catches both this and a future mis-named section, and its
fixture self-test (`validate-selftest.ps1`) should cover the mismatch both ways.

---

## 261. Task 259's spend-guard latch excludes `not=`, so §1.501's "if you didn't have enough money" turns itself on the moment you pay

**Priority: LOW — one section, and no way to reach the redraw that exposes it from inside the
section itself, so no player can hit it today. It is filed because it is the exact mirror of a bug
just fixed one line away, and the next section written in that shape will not be so lucky.**

*(Filed 2026-08-12, during task 259's implementation pass — the `not=` exclusion is deliberate and
the residual it leaves was measured in the same run.)*

Task 259 holds a **spend guard** open once the walk has taken it, and `isSpendGuard`
(`render-rules.js`) whitelists the guard's own attributes so that only a plain purse/pack test
qualifies. `not=` is not on that list, on purpose: holding open "if you did **not** have the money"
would be the mirror of the bug — the latch may only keep a branch the player *earned* revealed, and
a negated affordability test earns nothing. The residual is that such a guard still re-derives.

**book1/501 is the one section in the corpus with that shape** (measured: it is the only
`<if not="t" shards=…>` sitting above a `<lose shards=…>` on the same purse in books 1–6):

```
<set var="ransom" value="1"/>
<if not="t" shards="1">If you didn't have enough money … <goto section="288"/>.</if>
<else>Otherwise, your captors <lose shards="ransom">take the money</lose> … <goto section="10"/>.</else>
```

**Measured with exactly 1 Shard.** First draw: the guard reads the purse *before* the `<else>`
below it spends, so it is false, the `<else>` is taken, the Shard is taken, and →10 is live with
→288 grayed — correct. Force a redraw and the purse is 0, the guard flips **true**, →288 goes live
and **→10 grays**: a player who paid the ransom is offered only the "you couldn't pay" route.
**Nothing in §1.501 can trigger that redraw** — the section's only controls are those two `<goto>`s,
and a `<goto>` navigates away — so the flip is latent, which is the whole of its priority. (The
author's own comment in the XML doubts the section is reachable at all: "Unless book 2 links here,
this section is pointless." Worth resolving on the way past — if nothing links to §1.501, that is a
separate content question, not this bug.)

**Fix:** the honest form is the one task 259 rejected as too big for that pass — a walk-position
purse reading in the `walkTicks` idiom (task 216), where a guard reads the sheet as of its own
position whichever way it is phrased, so `not=` needs no special case. That needs an entry snapshot
of the purse in `ctx` plus a way to attribute a spend to the node it happened at, including the
spends that happen on a CLICK rather than during the walk (a `<group>` commit, a pay action, a
transfer, a buy) — the redraw re-applies nothing, so an observational `before`/`after` around each
node sees no movement and the position never advances. That is the real cost, and it is why this is
its own task. **Do not instead add `not=` to `SPEND_GUARD_ATTRS`**: that would hold open the reading
"you cannot afford this", which is the mirror bug and worse than the residual.

Tests: assert §1.501 with exactly 1 Shard keeps →10 live and →288 grayed across a redraw; assert
the paid-nothing case (0 Shards on entry) still routes to →288; and assert the positive form is
unaffected, since a walk-position reading would replace task 259's latch rather than sit beside it
— re-run §2.105, §5.376 and §6.215's assertions against it.

**Measured, and what was done.** The prescribed form is what got written, and the reason to prefer
it over the cheap fix is worth recording, because the cheap fix measured out nearly free and was
still the wrong answer. Adding `not=` to the whitelist and latching the guard's *resource reading*
rather than its verdict — hold a negated guard shut, never open — passes every test above in about
ten lines, and a census says it would change behaviour in **exactly one section**: 15 `not=`
resource guards exist in books 1–6 (13 sections), and book1/501 is the only one whose section
takes money or a possession at all, the other twelve carrying no `<lose>`/`<transfer>`/`<buy>` and
no priced `<rest>`. What rules it out is authenticity, not risk. A latch memoises a verdict and so
is blind to where the walk stands: for a guard BELOW a click-time spend it freezes the pre-spend
answer, which is a reading JaFL never gives. It would buy §1.501 by introducing a smaller
inauthenticity somewhere else.

**The reading is of the SHEET, so it needs no view of how the condition is phrased.** A per-visit
ledger (`ctx.spends`) records what the visit has taken off the sheet and at which node; a condition
at path P is answered against the live sheet with every entry BELOW P added back (`Story.sheetAt`,
feeding `opts.shardsNow`/`opts.itemsNow` beside task 216's `opts.ticksNow`). `isSpendGuard` and
`ctx.guardTaken` are gone. Document order over the positional memo paths is what "below" means
(`comparePaths`), so a prefix precedes its own descendants — the guard that CONTAINS its price is
answered before it, which is §5.376's and §6.215's shape.

**Only takings are booked; a gain is always read live.** That asymmetry is deliberate and is what
makes the reading polarity-free: the sheet is only ever read as richer than it is, never poorer, so
`<if shards="1">` above the price stays open and `<if not="t" shards="1">` above the same price
stays shut, for the one reason. Booking gains as well would freeze an award or a Take out of the
choice that needs it until a re-entry, which nothing asked for.

**Three feeders, and the census that says three is enough.** The walk marks every node it passes,
which covers every effect it applies wherever nested, with an ancestor's mark netted against its
descendants' so no Shard is booked twice (`noteSpend`/`spendSeen`). The two spends the player
CLICKS for run outside any walk and book at their own node: `renderTransfer`'s commit (§2.105's
pickpocket) and `renderGroup`'s (a bundled price). Every other click-time spend books nothing — see
task 263 — and a census of the 14 sections pairing a resource guard with one of those sites found
**no live case**: in all 14 the guard sits below the spend (the tavern `<rest shards="1">` family,
book1/332, book1/342, book3/715, book4/111, book5/548), or tests a resource the spend cannot move
(book3/406, book5/145), or is a `cache=` test, which is never overridden (book6/464).

**It fixes a fourth section task 259's census never asked about.** §5.192's `<if shards="50">` wraps
a `<group>` whose price is a `<buy ship=>`; the census looked for `<transfer|lose>`, so the shape
was missed. A buy runs from the click, so nothing the walk marks would see the maintenance fee
leave — verified by removing the group's booking, which grays the block naming the *Wrath of God* on
the Ship's Manifest and fails that assertion alone.

Every assertion was checked for teeth by neutering `sheetAt`: §1.501's redraw fails exactly as
filed (`10=gray 288=live` — the player who paid offered only the "you couldn't pay" route), and
§2.105, §5.376 and §6.215 fail with it, so the new reading carries task 259's three sections on its
own rather than sitting beside a latch. Suite: 2,592 assertions, `RESULT ALL PASS`.

**The reachability aside is resolved, and the section is not pointless.** The author's comment
("Unless book 2 links here, this section is pointless") is answered from book 1: `books/book1/605.xml`
— the bank — offers `<choice section="501">If paying a ransom</choice>`. Nothing else in books 1–6
links to §1.501 and no cross-book `book="1" section="501"` exists, so §605 is the sole route in.

---

## 262. §1.460 tests a port-invented codeword in place of the printed "codeword *Acid* or a **copper amulet**", which the vocabulary can now express exactly

**Priority: LOW — one section, and the substitute is right on every ordinary route: it diverges only
for a player who parts with the amulet without handing it in. It is filed because it is an
undocumented rewrite of a printed condition — nothing in the XML says why the markup asks a
different question than the prose — and because the exact condition is expressible today.**

*(Filed 2026-08-12, during task 260's diff of the 20 parked working copies. `book1/temp/460old.xml`
is the upstream original, and this condition is the whole of what the live section changed.)*

`books/book1/460.xml` prints "If you have the codeword *Acid* or a **copper amulet**,
`<goto section="327"/>` immediately" and guards it with `<if codeword="1.Skabb">` — a test of
neither named thing. The parked original reads `<if codeword="Acid" item="copper amulet">`, which
task 3 made an **AND**, so it is wrong for an "or" clause: the substitution was a deliberate repair,
not a typo. `1.Skabb` is a port-invented codeword with exactly **one writer and one reader**
(measured): ticked hidden at `book1/554.xml:3`, read only here.

**It is a sound proxy in the ordinary flow.** §554 is where King Skabb dies and the amulet is taken;
§384 takes the amulet back, pays 450 Shards and notes **Acid**; §122 routes an amulet-holder to §384.
The string "copper amulet" occurs in books 1–6 only at book1/122, /384, /460 and /554, and Acid is
granted only at §384 — so the amulet has no other source, Acid has no other source, and `1.Skabb`
implies (amulet OR Acid) on every route that keeps the amulet. **There is no false negative.**

**Where it diverges is that `1.Skabb` records having been to §554, not still holding the proof.**
Lose the amulet without reaching §384 — book 1 carries 2 open `<lose item="?">` forfeits, and the
markets buy — and §460 still sends the player to §327 on a condition the page says they fail.

The printed condition needs no proxy today: `<elseif>` already accepts both `codeword` and `item`
(`validate-source.ps1`'s `FL_TAG_ATTRS`), so an if/elseif pair states the OR directly.

**Fix:** replace the `1.Skabb` guard in `books/book1/460.xml` with
`<if codeword="Acid">…</if><elseif item="copper amulet">…</elseif>`, each branch carrying the same
`<goto section="327"/>`, and split the printed sentence across the two so each reads naturally.
`1.Skabb` then has no reader, so drop its tick at `books/book1/554.xml:3` as an orphan of this
change. `books/` changes, so rebuild and commit the regenerated data.

Tests: assert §1.460 offers →327 with the codeword Acid and no amulet, and again with the amulet and
no codeword; assert that with neither it offers no →327 and reads on to the light-source check; and
assert the case the proxy gets wrong — `1.Skabb` set, amulet gone, no Acid — offers no →327.

**Done as filed.** `<if codeword="Acid">` / `<elseif item="copper amulet">` now carry a `<goto
section="327"/>` each, with the printed sentence split so both read naturally and the untaken half
still shows (grayed), which keeps the page's "or" visible to the reader rather than hiding whichever
condition the player missed. The 1.Skabb tick went from `books/book1/554.xml`, leaving the codeword
with **no writer and no reader** anywhere in `books/` — verified after the change. Five assertions,
and the fourth and fifth are the ones that matter: the sole-writer case (`1.Skabb` set, amulet lost,
no Acid) is now refused, and the both-hold case offers →327 exactly **once** — worth asserting,
because an if/**else**if is what makes that true and an `<if>`/`<if>` pair would have drawn the exit
twice. The gate needed no change: `<elseif>`'s allowlist already carried `codeword` and `item`.
Suite **2597** (2592 + 5).

---

## 263. Four click-time spend sites book nothing into the walk-position ledger, so a future guard above a bare `<buy>`, a paid `<rest>` or a cache Take reads the emptied purse

**Priority: LOW — no section in books 1–6 is affected, measured, so no player can reach it today.
It is filed because the boundary is invisible from the reading it belongs to: the rule reads as
"a guard is answered at its own position" and is that, exactly, for every spend the walk applies and
the two the player clicks for, and silently is not for four more.**

*(Filed 2026-08-12, during task 261's implementation pass — the census that decided which spend
sites to hook is what named these.)*

Task 261 answers a condition against the sheet as of its own position, from a per-visit ledger of
what the visit has TAKEN (`ctx.spends`, keyed by node path — `Story.sheetAt`, `render.js`). The
ledger has three feeders: the walk marks every node it passes, and the two click-time spends that
matter book at their own node (`renderTransfer`'s commit, `renderGroup`'s). A spend the walk does
not apply and that is not one of those two **books nothing**, so it stays invisible to the ledger
and every guard above it reads the emptied purse — task 259's behaviour, and therefore not a
regression, but not the rule the code now states either.

The four, all in the render layer and all applying on a click:

| site | what it takes |
| --- | --- |
| `renderInlineBuy` / crew row (`render-market.js:259`, `:311`) | a standalone `<buy>`'s price, and the item/ship/crew it grants |
| `renderRest` (`render-market.js:427`, `:442`) | a paid `<rest shards=>`'s nightly charge |
| `renderMoneyCache` / `renderItemCache` Take/Store | money and possessions across a stash boundary |
| the priced-pick family (`render-rewards.js` — payment, choose-one, priced roll/choice arming) | a `price=`/`shards=` cost that arms a flag |

**Measured: no live case.** 14 sections in books 1–6 pair a resource guard (`<if|elseif shards=|item=>`)
with a `<buy>`, `<market>`, `<itemcache>`, `<moneycache>` or a priced `<rest>`, and in every one the
guard is unreachable by the gap: it sits **below** the spend, where the live reading is already the
positional one — the four tavern sections' `<rest shards="1">` above `<if shards="3">` (book1/184,
/387, /483, /497, /506), book1/332, book1/342, book3/715, book4/111, book5/548 — or it tests a
resource the spend cannot move (book3/406's `<if item="ship's deeds">` above a ship purchase,
book5/145's deed test above a crew hire), or it is a `cache=` test, which `evaluateCondition` never
overrides because a stash is not the sheet (book6/464). §5.192 is the one section where a guard sits
above a buy, and it is already covered — the buy is bundled in a `<group>`, so the group's booking
carries it (task 261 asserts exactly that).

**Fix:** give each site the two-line `spendMark()`/`noteSpend(path, mark)` pair the transfer and
group commits use, so the ledger's rule holds without a per-site exception. All four have their
node's `path` in scope already. Note the cache pair needs a decision, not just a hook: a Take moves
money ONTO the sheet (a gain, which the ledger deliberately does not book) while a Store moves it
off, so only the Store direction has anything to record.

**Do not widen this into booking gains.** Task 261's asymmetry — only takings are booked, so the
sheet is only ever read as richer than it is — is what makes the reading free of the guard's
phrasing, and it is what keeps an award or a Take opening the choice that needs it on the next draw
instead of on a re-entry.

Tests: no corpus section exercises any of the four, so the assertions have to be synthetic, in the
idiom task 261 already uses for its netting and gain-reads-live cases (`suite-actions.js`) — a guard
above a bare `<buy>` on the same purse, and one above a paid `<rest>`, each asserted across a
redraw. Add the corpus census above as a guard against a future section arriving in that shape.

---

## 264. §6.160's "cross it off and turn to 551" grays →551 the moment either thing is crossed off, so the price is paid and the route it buys is gone

**Priority: MEDIUM — one shipped section, confirmed broken on BOTH of its routes, and the failure
takes the price and withholds what it bought. That is task 259's §5.376 shape (scroll crossed off,
initiation unreachable) rather than task 263's latent one; it is off HIGH only because the player
is not stranded — the "If not, →183" exit is still live, so the visit ends, just on the route for
someone who had neither.**

*(Filed 2026-08-12, during task 263's implementation pass — the census of click-time takings the
four-site list did NOT cover is what found it.)*

`renderForcedOptional` (`render-rewards.js`) applies a `force="f"` opt-in **on the click** and books
nothing into the walk-position ledger, so the guard above it re-derives against the sheet the click
just emptied. book6/160 is the section:

```xml
<if blessing="storm" item="catastrophe certificate">
  If you have a blessing of <lose blessing="storm" force="f">Safety from Storms</lose>
  or a <lose item="catastrophe certificate" force="f"><b>catastrophe certificate</b></lose>,
  cross it off and <goto section="551"/>.
</if>
If not, <goto section="183"/>.
```

The guard is an OR over the two things the block spends, and `<goto section="551"/>` sits **inside**
it. **Measured against a real `GameState` through the rendered page, both halves fail identically:**

| entered holding | before the click | after crossing off |
| --- | --- | --- |
| the certificate only | `551=live 183=live` | `551=gray 183=live` (item gone) |
| the storm blessing only | `551=live 183=live` | `551=gray 183=live` (blessing gone) |

So the player does exactly what the page instructs, loses the certificate or the blessing, and the
destination it was crossed off **for** is disabled on the spot.

**Neither existing rule reaches it, and the reasons differ per half — this is the point of the
task.** Task 259's latch is scoped to a *spend guard* (every attribute a purse/pack test), and
`blessing=` is not one, so the whole `<if>` is excluded. Task 261/263's ledger is phrasing-free and
would cover the **item** half as soon as `renderForcedOptional` booked its taking — two lines, the
same `spendMark()`/`noteSpend(path, mark)` pair. The **blessing** half it cannot reach at all: the
ledger records Shards and possessions only, deliberately (`sheetAt` leaves a `curse=`/`blessing=`
test reading live, because task 133 needs a lift-from-the-sheet to open a choice without re-entry,
and §6.215's `<if blessing="storm" not="t">` must go false the moment the blessing lands).

So the fix needs deciding, not just writing, and the fork is the one task 261 named — **which is
most authentic?** Options: (a) book the item half and treat the blessing half separately; (b) widen
the ledger to any resource a `force="f"` opt-in in this position spends, which risks the §6.215
reading; (c) hold the guarded block open once its own opt-in has been taken this visit — the
narrowest statement of what the page means ("cross it off **and** turn to 551" is one instruction),
and the only one that fixes both halves for the same reason. Measure (c) against §6.215 and §6.49
before writing it.

Census: `force="f"` losses under a resource guard read **1** section in books 1–6 (this one). The
same sweep found three more click-time takings outside task 263's four sites — a market row's
Buy/Sell (`renderShopRow`), an inline `<sell>`, and the open-pick family (`renderForfeitChoice`/
`renderAbilityChoice`/`renderEquipmentChoice`) — and each was measured as unreachable today:
book5/145's `<if item="deed to the Wrath of God">` sits above a ship/cargo market that cannot move
that possession, book3/640's forfeit is `choose="f"` (a sweep, so the walk applies and marks it),
and book5/66's `<if shards="5">` sits above a `<lose item="?">` that cannot move Shards. They want
the two-line booking anyway, on the rule task 263 states, but no section depends on it.

Tests: assert §6.160 both ways — enter holding only the certificate, cross it off, and →551 is still
live on the redraw; the same holding only the storm blessing. Both fail today (measured), so they
are the regression test. Re-assert §6.215's and §6.49's "the reward LANDED, so graying is right"
cases against whichever option is chosen.

---

## 265. Three click-time takings still book nothing into the walk-position ledger — a market row's Buy/Sell, an inline `<sell>`, and the open-pick family

**Priority: LOW — task 264's own census measured all three as unreachable in books 1–6, and
re-measured them here. This is the rule task 263 states being applied where nothing yet depends
on it, so a new section can't arrive on the gap. Nothing is broken today.**

*(Filed 2026-08-12, on closing task 264 — its filing names these three and says they "want the
two-line booking anyway", which option (c) did not do, because (c) fixes §6.160 by holding the
guarded block rather than by booking what the click took.)*

Task 263's rule: **a spend the player CLICKS for books its taking at its own node**, so a guard
above it keeps reading the sheet the walk passed it with. It hooked four sites; task 264's census
found three more that still don't, each applying its effect from a click handler with no
`spendMark()`/`noteSpend(path, mark)` pair around it:

- a market row's **Buy/Sell** (`renderShopRow`, `render-market.js`);
- an inline **`<sell>`**;
- the **open-pick family** — `renderForfeitChoice` / `renderAbilityChoice` /
  `renderEquipmentChoice`, where the player names which thing leaves and the commit runs on the
  pick.

Why no section depends on it today, re-measured on closing 264: **book5/145**'s
`<if item="deed to the Wrath of God">` sits above a ship/cargo market that cannot move that
possession; **book3/640**'s forfeit is `choose="f"` — a sweep, so the WALK applies it and marks it
where it stands; **book5/66**'s `<if shards="5">` sits above a `<lose item="?">` that cannot move
Shards. An ability pick moves nothing the ledger records at all.

**Fix:** the same two lines as task 263's four sites, at each commit. Tests: the synthetic
three-site shape task 263's block already uses (guard above, spend below, click, redraw, guard
still open), plus a corpus census assertion pinning "no live case" the way task 263's does, so a
future section arriving with the guard above one of these lands on a failing assertion.

---

## 266. §4.605 and §4.658 give a poor crew THREE free upgrades: the `<if crew=>` chain above the click steps forward each time it is obeyed

**Priority: HIGH — two shipped sections, and the failure PAYS the player unasked rather than
merely graying something: one printed "you can upgrade Crew Quality one level" becomes
poor → average → good → excellent for 0 Shards, in three clicks, with no deliberate
rule-breaking. §5.145's shipyard charges 25/50/100/150 Shards for exactly those steps, so the
free cascade is worth 300 Shards and a permanently better crew on every sea roll.**

*(Filed 2026-08-12, on closing task 265 — its census asks which resource guards sit above a
click-time taking, and the answer for the purse and the pack is "none reachable". Running the
same question over the resources the ledger does NOT model found this.)*

**Measured through the rendered page**, entering each section with a poor crew and clicking
whatever upgrade the page then offers, until it offers none:

| section | grades reached | verdict |
| --- | --- | --- |
| book4/605 | `poor → average → good → excellent` | **broken** — three upgrades for one instruction |
| book4/658 | `poor → average → good → excellent` | **broken** — same, after its forced `<buy ship>` |
| book3/161 | `poor → average` | sound (the control) |

Both broken sections write the offer as a three-branch chain:
`<if crew="poor">…<buy crew="average" shards="0"/></if>`,
`<elseif crew="average">…<buy crew="good" shards="0"/></elseif>`,
`<elseif crew="good">…<buy crew="excellent" shards="0"/></elseif>`.
A `<buy crew=>` applies from the CLICK (`renderInlineBuy`'s crew branch, `render-market.js:249`),
so the redraw re-derives the chain against a crew that has just changed: the taken branch grays
and **the next elseif becomes the active one**, offering the next grade. `canUpgradeCrew` is no
defence — it enforces one grade *per click*, which each click honestly is. The crew branch also
returns before `renderInlineBuy`'s `quantity=`/`buys` memo, so it carries no per-visit cap
either, and correctly so: §5.145's shipyard is priced and repeatable.

**book3/161 is the control and it says why the shape matters, not the tag.** It has one `<if
crew="poor">` and no elseif, so the click grays its own branch and there is nowhere to step to —
task 264's cosmetic case, not this one. So the population is "a guarded crew offer with a SECOND
branch below it", which is these two.

**This is task 261's family, one resource out of scope.** `sheetAt` supplies `shardsNow`/
`itemsNow` and nothing else, deliberately (a `blessing=`/`var=` test must keep reading live —
§6.215), and task 264's branch hold keys on a `force="f"` **effect** node, which a `<buy>` is
not. So neither existing mechanism reaches a crew grade. Three candidate fixes, and the fork
wants deciding on authenticity rather than on cost, the way task 261's did:

  (a) extend the ledger to the crew grade (a `crewAt(path)` reading, so a guard above the
      upgrade reads the grade the walk passed it with) — states the rule where the other
      walk-position readings live, but grows `sheetAt`'s scope, and the "richer, never poorer"
      asymmetry has to be restated for an ordinal (is a *better* crew richer?);
  (b) hold the whole if/elseif chain once one of its branches' click-time buys has fired this
      visit — closest to task 264's hold, needs no view of what kind of thing moved, and would
      also cover a future guard over any other unmodelled resource;
  (c) memoise a `<buy crew=>` per visit like the item/ship forms, so one upgrade is all a visit
      offers — smallest, but it is a rule about the tag rather than about the page, and it would
      wrongly cap §5.145's priced shipyard unless scoped to `shards="0"`.

**Do not pick one without measuring what else (b) would hold**, since it is the widest: a census
of `<if>`/`<elseif>` chains with a click-time effect inside one branch and a further branch below
it. Tests: assert each of the three sections' full grade sequence from a poor crew (the table
above is the expected output, and §4.605's `poor->average->good->excellent` is what a fix must
turn into `poor->average`), assert §5.145 still sells all four paid grades in one visit, and pin
the census the chosen fix is scoped by.

**Done — (b), scoped by the census to a STANDALONE `<buy>`.** The census asked for was run over
`books/**/*.xml` and the bundled `web/data/*.json` alike, at three widths, and the width is the
whole decision:

| what a branch holds | branches | sections |
| --- | --- | --- |
| a `<buy>` | 4 | **4/605, 4/658** |
| any click-time taking (`sell`/`market`/`rest`/cache/`transfer`/`resurrection`) | 7 | + 4/285, 6/490, 6/628 |
| any click-time control (adding awards and `<group>`) | 10 | + 1/297, 3/165, 5/677 |

The narrow width is exactly the two broken sections and nothing else, and the wider ones are
rejected on what they reach rather than on cost. **§6.628 is the one that would really break:**
its `<if var="y" lessthan="6">`/`<elseif var="y" equals="6">` is keyed on a die roll, so a
re-armed roll (tasks 253 + 254) must re-derive it, and a hold triggered by the `<rest>` inside a
branch would freeze the chain on the stale roll. **§5.677 and §1.297 are already owned** — the
former by task 261's ledger (its `<group>` books `<lose shards="400"/>` at its own path, so
`<if shards="400">` keeps reading the pre-payment purse), the latter by task 245's deferred-fight
chain — so a wider hold would be a second mechanism over a stated rule.

(a) is rejected on the ledger's own terms, not on cost: `noteSpend` records "only a taking — a
gain is always read live", and a crew upgrade is a **gain**. Booking one is the mechanism §6.215
and §6.49 depend on NOT existing. (c) keys on the wrong thing, and needing the `shards="0"` scope
to spare §5.145 is the tell: the defect is the guard re-deriving against what the click changed,
not a free buy repeating.

Implementation: `renderInlineBuy`'s crew branch mints the `buy@<path>` memo the ship/item form
already keeps (read as "bought once", never as a per-visit cap — §5.145 stays repeatable), and
task 264's `forcedOptInTaken` becomes **`branchOptInTaken`**, scanning `force@` *and* `buy@`
under the branch's own path. One rule, one scan: a second copy is where the next clause goes
missing (264's own lesson). A `<buy>` inside a `<group>` runs headlessly through `runBuyNode` and
mints no memo, which is what excludes §4.622's salvage and §5.192's Wrath of God.

Measured after: §4.605 `poor->average` from poor and `average->good` from average, §4.658
`poor->average`, §3.161 (the control) `poor->average`, §5.145 still `poor->average->good->
excellent` for 300 Shards. Suite 2657 (up 10).

---

## 267. `<buy crew="poor">` can never be clicked, so §5.145's and §5.192's printed "25 Shards to hire a poor crew" is a free crew instead

**Priority: LOW — the divergence pays the player 25 Shards, once per ship claimed with no crew,
and the only route to it is §5.192's Wrath of God. Nothing is broken by the dead button itself;
what is wrong is that the page says you must pay and the port has already given it away.**

*(Filed 2026-08-12, on closing task 266 — asserting that §5.145 "still sells every grade in one
visit" needed knowing which of its four crew buys are clickable at all, and the first is not.)*

`canUpgradeCrew` (`market.js:291`) enforces one grade at a time with `have === target - 1`.
`CREW_LEVELS` is `['poor', 'average', 'good', 'excellent']` (`rules.js:73`), so `<buy crew="poor">`
has `target = 0` and needs `have === -1` — which no ship can have, because `canonCrew` maps a
missing or unknown grade (including `initialCrew="none"`) to `'poor'`. The button is therefore
**always disabled**, with the misleading title "Your crew is already at least that good."

Both sites are the same sentence in the books' two harbourmaster scenes: §5.145 "It costs
`<buy crew="poor" shards="25"/>` to hire a poor crew", §5.192 "You will have to pay to hire a
crew. `<buy crew="poor" shards="25"/>` gets a poor crew". §5.192 is the live one: its
`<buy ship="brig" … initialCrew="none">` is the corpus's only crewless ship, and the port hands
that captain a poor crew for nothing.

The fork is whether the model should carry a **crewless** grade at all. Adding one to
`CREW_LEVELS` touches every index-based reading (`<lose crew="N">`'s shift, `value="crew"`'s
1-based index that §4.658's `oldcrew` round-trips through, and the `initialCrew` default), so
measure those before widening the ordinal; the alternative is to special-case a ship whose crew
is absent, and leave the ordinal alone. Tests: assert §5.192's claim leaves the brigantine
crewless and its 25-Shard hire clickable, that paying it yields a poor crew, and that §4.658's
`oldcrew` round trip still carries each grade unchanged.

---

## 268. `applyAdjust`'s crew branch spells the CREW_LEVELS ordinal out a second time and has no crewless guard, so a future bare `<adjust crew= amount=>` grants the grade §5.192 charges for

**Priority: LOW — no corpus section reaches it, measured. What is wrong is that the ordinal is
now written in two places that disagree about how many grades there are, and the copy that is
not `CREW_LEVELS` is the one with no floor.**

*(Filed 2026-08-13, on closing task 267 — deciding whether the new NO_CREW guard belonged on
this branch too needed knowing whether anything reaches it, and nothing does.)*

`applyAdjust` (`engine.js:1261`) shifts the crew grade through a literal
`['poor', 'average', 'good', 'excellent']` rather than through `CREW_LEVELS` — the only such
copy left after task 267 moved the ordinal's own documentation onto the array. It also has no
`NO_CREW` guard, where its sibling `applyShipLose` now does: `indexOf('none')` is -1, so
`Math.max(0, Math.min(3, -1 + amount))` reads a crewless ship as poor and an `amount="1"`
*grants* the grade §5.192 charges 25 Shards for — task 267's defect, one branch over.

**Nothing in books 1–6 reaches it.** The corpus carries 346 `<adjust crew=…>` nodes and every
one is a roll modifier inside a `<random>`/`<difficulty>`/`<rankcheck>` (§1.124's storm: "add 1
if your crew is good"), which the roll machinery consumes via `rollAdjustTotal` — measured over
`books/**/*.xml` by walking each node's ancestors, and the count of bare ones outside a roll is
**0**. `adjust` is also absent from `PASSIVE_BODY_TAGS` and excluded from `groupPlan`'s effect
set by name (`render-rules.js:354`), and no view module dispatches it, so `applyEffect` reaches
this branch only when a caller hands it an `<adjust>` node directly.

The fork is whether the branch should exist at all. Either read `CREW_LEVELS` and add the
`NO_CREW` guard so the two shift sites agree, or delete the branch and let the allowlist in
`validate-source.ps1` refuse a bare `<adjust crew= amount=>` outright — which states "an
`<adjust crew=>` is a roll modifier" as a rule instead of leaving a second, weaker ordinal in
place. Measure whether any *unpublished* book uses the bare form before choosing the second.
Tests: whichever way, assert the 0-section census so a future bare form fails the suite rather
than landing on this branch silently.

---

## 269. `applyAdjust`'s four surviving branches each duplicate a `<gain>`/`<tick>` that already does the job, and no corpus `<adjust>` of any kind is bare — only `crew=` says so

**Priority: LOW — nothing reaches them, measured. What is open is whether the rule task 268
stated for `crew=` is the rule for the whole tag.**

*(Filed 2026-08-13, on closing task 268 — the census that cleared the crew branch counted every
other `<adjust>` on the way past.)*

Task 268 deleted `applyAdjust`'s crew branch because `<adjust crew="good" amount="1"/>` is a
die-roll modifier ("add 1 if your crew is good") and the branch read the same two attributes as
a grade shift, and it gated that one form in `validate-source.ps1` so a bare one fails the
build. The same census answers the wider question it did not ask: books 1-6 carry **569
`<adjust>` nodes and not one of them is bare** — 466 under `<random>`, 89 under `<difficulty>`,
9 under `<lose>` (the wound modifiers, "subtract your armour from the roll") and 5 under
`<rankcheck>`, measured over `books/**/*.xml` by walking each node's ancestors.

So the four branches left in `applyAdjust` (`engine.js:1256`) are reachable exactly as the crew
branch was — only by handing `applyEffect` an `<adjust>` node directly — and each duplicates a
tag that already does the job:

| branch | what it does | the tag that already does it |
| --- | --- | --- |
| `ability=` | `state.adjustAbility(ab, amount)` | `<gain ability="combat" amount="1">` (applyTick) |
| `codeword=` / `name=` | `state.adjustCodewordValue(…)` | `<tick name="X" amount="N">` (`engine.js:930`) |
| `title=` / `titleVal=` | `state.addTitle(…, amount)` | `<tick title="X" titleAdjust="N">` (`engine.js:919`) |

The fork is task 268's, one scope wider: either widen the gate from `crew=` to **every**
`<adjust>` and delete `applyAdjust` with its `EFFECT_APPLIERS` entry — which states "an
`<adjust>` modifies the node above it and is never an effect in its own right" — or keep the
four as a documented fallback and say so in a comment. The case for keeping them is that none
*misreads* its corpus form the way the crew branch did: an `<adjust ability="combat"
amount="1"/>` applied as an effect means what it looks like, so a bare one would be a harmless
duplicate rather than a wrong answer. The case against is that `EFFECT_APPLIERS` is this port's
statement of what writes to the Adventure Sheet, and `<adjust>` does not belong on that list if
the tag is a modifier. Tests: whichever way, pin the 569/0 census beside task 268's 346/0 one.

---

## 270. Every by-hand corpus census globs `books/**/*.xml` and counts the 20 superseded `temp/` working copies, so task 269 was filed with 569 `<adjust>` nodes where the shipped corpus holds 558

**Priority: LOW — no shipped behaviour is wrong. What is wrong is a number in a filing, and the
glob that produced it is how the last four tasks measured the corpus.**

*(Filed 2026-08-13, on closing task 269 — the suite pins its census over the BUNDLED books, so
the two sources had to agree, and they did not.)*

Task 260 moved the superseded working copies into `books/book<N>/temp/`, and `AGENTS.md` records
that "nothing walks" it. That is true of the build — `build-data.ps1` bundles `books/book<N>/*.xml`
and the source gate walks the same set — and false of every census run by hand, which reaches for
`books/**/*.xml` because that is the obvious spelling of "the corpus". The two answers differ by
whatever the 20 temp files happen to contain.

Measured for task 269's tag: `books/**/*.xml` gives **569** `<adjust>` nodes, the shipped corpus
**558**, and the 11 extra live in six temp files — `book2/temp/322old.xml` (1),
`book2/temp/726temp.xml` (1), `book6/temp/215temp.xml` (1), `book6/temp/533temp.xml` (4),
`book6/temp/548temp.xml` (3), `book6/temp/731temp.xml` (1). The parent breakdown moves too
(`random` 466 → 464, `difficulty` 89 → 80), so a filing that quotes either number without saying
which glob produced it cannot be checked against the suite, whose assertions read
`data.loadBook` and therefore only ever see the 558. Task 268's 346 was the same glob and happened
to be identical both ways — no temp copy carries an `<adjust crew=>` — which is exactly why the
trap survived that pass.

Nothing in the code is wrong, so the work is the measurement and the prose:
1. Re-run the censuses whose counts tasks 260–269 pinned **in prose** against the shipped set
   (task 264's 147/42/6 `force="f"` sections, 265's 14, 266's three widths, 268's 346) and correct
   any that moved. The suite's own assertions are already safe by construction — every one of them
   walks `data.availableBooks()` — so this is a docs-accuracy pass, not a test change.
2. Say in `AGENTS.md` what "nothing walks it" means: the build and the gate skip `temp/`, a
   `books/**/*.xml` glob does not, and a census that means "the shipped corpus" must exclude it.

No test is proposed. A suite assertion pinning "the source and the bundle agree" would be a third
statement of what the build already guarantees, and CI's rebuild-and-diff is what enforces it.

---

## 271. A strongroom's Store button is the one taker that ignores a `keep` tag, so §4.103's white sword — "you can never lose this sword" — can be left behind in §1.177's town house

**Priority: LOW — no section arrives at a wrong result unasked, and the move is reversible (Take
puts the sword back). What it breaks is a printed absolute, by a route the player chooses.**

*(Filed 2026-08-13, during conversion work on an unpublished book; reproduced end to end on
books 1–6 alone, which is the evidence below.)*

The `keep` tag is the engine's word for "the books say this cannot be lost or stolen" — the royal
ring (§1.385) and the white sword (§4.103). `isKeep`/`applyKeepRule` (`engine.js:1111-1125`) state
the rule the whole corpus follows: a **generic** selector spares a kept possession while any
ordinary item satisfies it, and only an **explicitly named** selector with no ordinary alternative
may deliberately hand it over — so a scripted "give up the royal ring" works and a generic theft
never reaches it. Four takers honour that: `applyLose`'s `item="*"` sweep (`engine.js:642`),
`itemAt=` (`engine.js:675`), `losePaymentPlan` (`engine.js:833`), and `transferMovers`, whose
`item="*"` form is documented at `engine.js:1081` as "the only form that skips keep-tagged items
when moving from the player".

**`renderItemCache`'s deposit list is the fifth taker and honours nothing.** It is built straight
from `state.data.items` and filtered only by the cache's own `<include>`/`<exclude>` children
(`render-market.js`, the `classify`/`carried` block): with no filters present, `classify` returns
eligible for every carried possession. **Censused over the shipped corpus (the `^\d+[a-z]?$`
basenames of books 1–6, per task 270): 31 `<itemcache>` nodes, of which 30 are bare
`<itemcache name= text=>`.** §2.617 (Molhern's smithy) is the single exception, and its
`include`/`include`/`exclude`/`exclude` filter by kind and bonus, not by `keep`. So the gap is not
a corner of the feature — it is the feature everywhere but one section.

Measured, not inferred — a scratch page under `web/`, a `GameState` carrying §4.103's grant
verbatim (`<weapon name="white sword" bonus="8" tags="keep"/>`), rendering §1.177:

- `Store white sword` **is offered and is enabled**;
- clicking it moves the sword out of the pack and into cache `1.177`;
- **control**: `<lose item="*"/>` applied to the same sheet leaves the white sword carried.

So the two paths disagree about the same possession on the same sheet, and the disagreeing one is
the player-facing button. The consequence is §4.103's own sentence: "You can never lose this
sword; it cannot be stolen from you or lost. **Even if you die and are resurrected elsewhere, the
sword will still be with you.**" A sword parked in a town house does not follow a resurrection —
nothing moves a cache's contents — so the page's last clause is false for a player who used a
button the engine offered them.

The fix is one eligibility test, but the *decision* is which rule the strongroom follows, and that
is the reason this is filed rather than patched:

1. **Refuse** — treat Store as a taker and skip `isKeep` possessions, matching `transferMovers`.
   Simplest, and makes the five takers agree. Costs a player nothing real: a kept item is one they
   were promised they would always have, so shelf space is not the point of it.
2. **Offer disabled with a reason**, reusing the `classify` path's existing
   `store.disabled = true; store.title = reason` branch — the same affordance §2.617 already uses
   for a rejected candidate, so the player learns *why* rather than wondering where the button
   went.

(2) is the recommendation: the machinery is already there and a silently-absent button in an
otherwise-complete list is the kind of thing that reads as a bug.

Not in scope, and worth saying so: `applyKeepRule`'s named-selector escape is **correct** and must
not change. A section that prints "remove the white sword from your Adventure Sheet" writes
`<lose item="white sword">`, whose selector is explicitly named with no ordinary alternative, so it
takes the sword exactly as the page says. Only the *undirected* routes into a stash are wrong.

**Test:** a suite assertion in `suite-inventory` that renders a bare `<itemcache>` for a sheet
carrying a keep-tagged possession and asserts the Store button for it is absent-or-disabled, plus
the control that an ordinary possession's Store button is present and enabled — and a census that
every corpus `<itemcache>` either carries filters or is covered by the rule, so a new bare
strongroom lands on it.

---

## 272. `<transfer>` honours the keep rule for `item="*"` only, where `<lose>` honours every generic selector, so §2.105's pickpocket steals the white sword off a sheet carrying nothing else

**Priority: LOW — the two sections a player opts into are `force="f"`, and the one forced theft
needs a sheet carrying the kept item and nothing else, then hands it back at §2.174. What it
breaks, again, is a printed absolute.**

*(Filed 2026-08-13, closing task 271: the strongroom was the fifth taker, and checking the fourth
against the same doctrine found it disagreeing with the first.)*

Task 271 fixed `renderItemCache` by the rule `applyKeepRule` states (`engine.js:1115-1118`): a
**generic** selector spares a kept possession while any ordinary item satisfies it, and only an
**explicitly named** selector with no ordinary alternative may hand it over. `loseItemMatches`
applies that to every non-`*` selector from the player (`engine.js:1142`), which is why task 118's
own assertion reads "`item="?"` against an only-kept inventory takes nothing".

**`transferMovers` applies it to `item="*"` and nothing else.** `include.all` is
`!kind && pattern === '*'` (`engine.js:1096`), so only that one form reaches the keep filter at
`engine.js:1173`; every other selector falls through to `transferMatch`, which has no keep test at
all. The comment at `engine.js:1163-1165` states this as a decision ("keep protection (plain
`item="*"` from the player only)") — so the defect is that the decision contradicts the doctrine
two modules over, not that the code forgot.

Measured, not inferred — `transferPlan` in Node against a sheet carrying only
`<weapon name="white sword" bonus="8" tags="keep"/>`:

| node | `movers` | `canPay` |
| --- | --- | --- |
| §2.105 `<transfer item="?" limit="1" to="2.105">` | `["white sword"]` | `true` |
| §6.635 `<transfer weapon="?" limit="1" to="6.635" force="f">` | `["white sword"]` | `true` |
| §6.310 `<transfer item="?" to="6.310" force="f">` | `["white sword"]` | `true` |
| control `<transfer item="*">` | `[]` | `false` |

Censused over the shipped corpus (per task 270): **five** player-source `<transfer>` nodes carry a
non-`*` item selector — the three above, §4.456's `item="?" bonus="1"`, and §6.635's second node,
`item="paper sword"`, which is explicitly named and therefore **correct as it stands**.

**Correction, made while fixing this (see the Review log): the census above is filtered on the
symptom and misses a fourth affected form.** §2.639's `<transfer armour="*" xarmour="?"
xgroup="2.639">` selects with `*` and so is not in the five — but `include.all` is
`!kind && pattern === '*'`, so a `kind=` selector is **never** `all`, and `armour="*"` slipped the
old filter too, where `<lose armour="*">` spares a kept suit. The right census is "player-source
transfers not taking the `include.all` path", which is these five **plus** §2.639.

The three that matter differ in how much they cost, and the ordering is not the obvious one:

- **§2.105 is the paradigm case and the only forced one.** "he stole one possession instead" — a
  pickpocketing, which is precisely the generic theft `applyKeepRule` exists to stop. With one
  mover and `limit="1"`, `needChoice` is false, so it applies with no prompt: the player is not
  offered the choice the page says they have ("you choose which"). §2.174 transfers back
  `from="2.105"`, so it is recoverable — and §2.105's own entry `<lose item="*" cache="2.105"
  hidden="t"/>` cannot wipe it in the meantime, since that sweep spares keep items in a cache too
  (`engine.js:642`).
- **§6.310 is the one with no way back.** No section anywhere transfers `from="6.310"`, so an item
  presented to the doorkeeper is gone for good. `force="f"` — the player opts in — but that is
  exactly the strongroom's shape, and task 271 fixed the strongroom.
- **§6.635 is the mildest**: `force="f"`, and §6.746 transfers `from="6.635"`, which is what makes
  the page's "you might get it back" true.

The fix and the fork are 271's: either make `transferMovers` apply `applyKeepRule` to its include
selector (aligning the fourth taker with the first, and letting §6.635's named `paper sword` node
keep working through the named-selector escape), or document at `engine.js:1163` why a transfer
deliberately reads the rule differently from a lose. The first is the recommendation — the
disagreement between `<lose item="?">` and `<transfer item="?">` on the same sheet is not a
distinction any page draws.

**Test:** `suite-actions` assertions over `transferPlan` for the three corpus forms against a
kept-only sheet (movers empty), the control that an ordinary possession still moves, the control
that §6.635's named `item="paper sword"` still moves a kept one, and the census that those five
non-`*` player-source transfers are the whole set — so a sixth lands on it.

---

## 273. The walk-position ledger tracks the purse and the pack but not codewords, so a block that spends the codeword gating it retracts its own exit on the next draw — §2.143 deletes *Bounty* and grays the →601 it deleted it for

**Priority: MEDIUM — the first draw is correct, so this needs a redraw before the player clicks
(a sheet drop, an item Use, a market row, a fight round — every `story.rerender()` site). What it
then costs is a printed destination: the codeword is already spent, and the only live exit left is
the page's "if not" one. 9 shipped sections carry the shape.**

*(Filed 2026-08-13, found during conversion work on an unpublished book.)*

Tasks 259 and 261 established the rule: JaFL runs a section top to bottom exactly once, so a
test is answered where the walk reaches it, **before** the price it gates has been paid. Re-deriving
it against the live sheet on a later draw let the payment retract what it had bought — measured then
in §5.376 (a **scroll of Ebron** crossed off to join the church, whose guard then grayed the
`<goto section="509"/>` the whole initiation is *for*) and §6.215 (35 Shards charged, then the block
the player had just paid into grayed).

**`spendMark` records `shards` and `items` and nothing else** (`render.js:1166`), and `noteSpend`
compares exactly those two (`render.js:1154-1163`). A codeword is neither, so `sheetAt` has nothing
to offer a codeword condition and `<if codeword="X">` is always re-derived live. The same holds for
a codeword *value* — `<if name="X">` over `codewordValues` — which no shipped section pairs with a
spend today, but which the box-tick rule (`walkTicks`, task 216) covers for `ticks=` and this does
not for `name=`.

**Measured in the browser, not inferred.** A `Story` over §2.143 with *Bounty* held:

| draw | `hasCodeword('Bounty')` | →601 (inside the guard) | →625 (the "if not") |
| --- | --- | --- | --- |
| first | false — spent on the walk | **live** | live |
| after `story.rerender()` | false | **dead** | live |

§6.32 (*Dog*, →358 inside the guard, →96 outside) behaves identically. Both pages print the shape
plainly — §2.143 is "If you have the codeword Bounty, delete it and turn to **601**. If not, turn to
**625**" — so after a redraw the player who *had* the codeword has lost it and can reach only the
exit meant for the player who had not.

**The census: 21 such guards across 20 shipped sections gate on a codeword and delete that same
codeword inside the guard; 9 of them enclose a `<goto>`** and are the ones that lose a destination
— §2.143, §2.361, §3.20, §3.48, §3.167, §3.196, §3.433, §5.487, §6.32. The other 12 guards (§1.10,
§1.196, §1.532, §1.657, §2.229, §2.277, §4.78, §4.157, §4.215, §4.263 — which carries two, on
`4.127.1` and `4.127.2` — and §5.152) enclose prose only: those gray a sentence describing what just
happened, which is wrong-to-fact but costs no route. (Counted over the `^\d+[a-z]?$` basenames of
books 1–6 only, per task 270 — `book2/temp/322old.xml` matches the shape and is excluded.)

**Correction, made while fixing this (see the Review log): the census above matches the guard's
codeword ATTRIBUTE against the `<lose>`'s and so misses a tenth goto-carrying section.** §2.633
gates on an OR list — `<if codeword="Bastion|Brush">` — and deletes *Bastion*, *Brush* and *Boysen*
from inside a `<group force="t">`, with `<goto section="657"/>` in the same guard. It is also the
**sharpest** case, because the group is click-driven: the codewords go when the player presses the
button, so the exit grays on the redraw that same click triggers. Re-measured by walking the tags
instead of the attribute text: **26 such guards over 21 sections — 10 enclosing a `<goto>`
(§2.633 added), 16 over 11 further sections enclosing prose only**. The 21/20/9/12 above also
counts §2.229's five-branch `<elseif>` chain, each branch of which deletes the codeword it gates
on, as a single guard.

The fix is 261's, widened: give `spendMark`/`noteSpend` the codewords (and codeword values) the walk
removed, and let `sheetAt` answer a codeword condition from the position the walk had reached, the
way it already answers `shards=`/`item=`. The alternative — rewriting the 8 sections to hoist the
`<lose>` below the `<goto>` — is markup written to defeat the renderer, and would leave the shape
itself a trap for the next section that prints it.

**Test:** `suite-render` assertions over §2.143 and §6.32 — the exit inside the guard is live on the
first draw **and after `rerender()`**, with the codeword spent in both; the control that the "if not"
exit is unaffected; and a `suite-corpus` census pinning those goto-carrying sections, so a further
one arriving lands on it. (Done: §2.633's group click too, per the correction above, plus a
synthetic `name=` guard above the deletion and the control that a codeword GAINED below a guard is
still read live.)

---

## 274. Re-archive completed task details 256–273 and clear them out of the priority buckets — LOW (process/docs)

*(Filed 2026-08-13; recurring maintenance after tasks 141, 165, 211 and 255.)* Task 255 archived
completed details 1–255, but the 256–273 burn-down has since completed every detailed task again.
Their checked rows fill the HIGH/MEDIUM/LOW work queues while ~1,070 lines of completed detail sit
between the checklist and the Review log, so TASKS.md is back past twice the 1,028 lines task 255
left it at and the "first open task" workflow is harder to scan.

Move completed detail sections 256–273 into TASKS-archive.md under their stable IDs, consolidate
their summary rows into the single numeric **Done** list, and leave only open-task detail plus the
Review log in TASKS.md. Extend the archive intro/Contents range without losing completion notes or
historical review text. Documentation-only; validate every checklist ID has exactly one detail
heading across the two files, then commit.

**Note for the pass: the buckets and the **Done** list have drifted into duplication again**, the
defect task 255 recorded at 28 rows. Of the 7 checked bucket rows, 4 (267–270) are *already* listed
under **Done**, so the merge is a set union and not an append; 271, 272 and 273 are bucket-only and
have to be added. Do the bulk move by line-slice with boundary assertions, as task 255 did — the
first moved line is `## 256.`, the last is the closing `---`, and the next surviving line is the
archive-range note.

*Done 2026-08-13:* documentation-only re-archive, scope 256–273 as filed plus this task's own
detail (274), matching how tasks 165, 211 and 255 archived themselves. Moved every detail section
256–274 verbatim (completion notes and the two "Correction, made while fixing this" paragraphs
intact, headings unchanged) into TASKS-archive.md, extended the archive intro/Contents to IDs
1–274, and merged the bucket rows into the **Done** checklist in numeric order. The
**HIGH**/**MEDIUM**/**LOW** headings stay in place, each carrying the `*(none open — file new …
work here)*` placeholder, so new work is still filed under an existing bucket. TASKS.md keeps the
intro, those three headings, the full **Done** checklist, the archive-range note (now 1–274) and
the Review log, dropping from **2,635 to 1,556 lines**; the archive grows from 10,301 to 11,437.

Two things worth carrying forward. **The duplication task 255 recorded is structural, not a
one-off**: it had grown to 28 rows by 255 and was back at 4 (267–270) eighteen tasks later, because
closing a task appends it to **Done** without removing its bucket row — and the three most recent
(271–273) had the opposite drift, sitting in a bucket and never reaching **Done** at all. Both
directions are silent, and the set-union merge is what closes them; a re-archive that appended
would have produced four duplicate rows and left the Done list short by three. **The boundary
assertions are the whole safety of the bulk move**: the script refused to write unless the first
moved line was `## 256.`, the line before the surviving archive-range note was `---`, and the block
carried exactly 19 headings with IDs 256–274 contiguous. Validated afterwards that all 273
checklist IDs (1–274 less 207, withdrawn) have exactly one `## <N>.` detail heading across the two
files, that the archive's detail IDs are exactly 1–274 with no gaps or duplicates, and that no ID
appears twice in **Done**. The archive's Contents list carries 273 rows, not 274: 207 keeps its
archived detail but has no checklist row, which is how the withdrawal has been recorded since task
211. No code, data, build or test files touched, so no rebuild or stamp change is implied.

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

## 317. `rank` ignores `modifier=` on every tag but `<set>`, so `natural` reads the ring's +2 back in

**DONE.** `GameState.rankForMode(mode)` added beside `rankValue()` — `natural` gives `data.rank`,
every other word the full Rank — and all five readers now call it: `evaluateCondition`,
`rollDifficulty`, `adjustAmount`, `adjustApplies`, and `evalExpression`, whose inline ternary was
the one honoured site and is deleted as its first caller. `<rankcheck>` is deliberately untouched:
`FL_TAG_ATTRS['rankcheck']` is `add dice`, so it cannot carry a `modifier=` to honour.

Seven assertions — four in `suite-engine.js` beside the §2.270 fixture that already held a +2 ring
(the `<if>` and `<difficulty>` arms, plus the control that `affected`/`noarmour`/`noweapon`/none all
mean the full Rank), three in `suite-combat.js`'s task-92 block (both `<adjust>` readers). Verified
by reverting `engine.js` and `state.js` together: four fail (`natural=5` where 3 is wanted, twice
over) and the control throws `rankForMode is not a function`, which is the method itself being the
fix. `RESULT ALL PASS pass=3032 fail=0`. Nothing shipped moves, as filed.

**This closes the family 314–317 opened.** Every reader of `modifier=` in the port — `<if>`,
`<set>`, `<difficulty>` and both of `<adjust>`'s — now resolves all six mode words for all nine
words `FL_ENUMS['ability']` allows, through exactly three deciders: `abilityForMode` (the six core
abilities and `defence`), `rankForMode` (`rank`), and the per-reader stamina arms, which differ on
purpose — a `<set>`/`<if>`/`<adjust>` *condition* reads the wounded score bare, an `<adjust>`
*contribution* the unwounded one. Four separate audits reached one reader each; what they had in
common was a stat the widened helper did not compose, which is the thing to check first if a sixth
reader ever appears.

**The original filing.**

**Priority: LOW — latent, and censused to be latent.** Filed 2026-08-28 by the census that closed
task 316. Over the 4,369-file shipped corpus, `rank` is written with a `modifier=` on **`<set>`
only** — 23 sites, all `natural`, all honoured — so nothing is mis-read today.

**What the code does.** Every reader has a `rank` arm, and four of the five hard-code
`state.rankValue()`:

| reader | tag | rank arm |
| --- | --- | --- |
| `evalExpression` | `<set value="rank">` | `mode === 'natural' ? state.data.rank : state.rankValue()` |
| `evaluateCondition` | `<if ability="rank">` | `state.rankValue()` |
| `rollDifficulty` | `<difficulty ability="rank">` | `state.rankValue()` |
| `adjustAmount` | `<adjust ability="rank"/>` | `state.rankValue()` |
| `adjustApplies` | `<adjust ability="rank" greaterthan=>` | `state.rankValue()` |

`rankValue()` adds the **ring of ultimate power's +2**, which is precisely the unwritten bonus
`natural` exists to strip — task 136.4 added the `<set>` arm for exactly that reason (§2.270 stores
`rank modifier="natural"` and then compares against it, "so a ring-holder must be judged by natural
Rank"). The argument is not specific to `<set>`: a `<difficulty ability="rank" modifier="natural">`
would roll against the ring-boosted Rank, and a `<adjust ability="rank" modifier="natural"/>` would
contribute it, both silently two points easier than the page prints — the family's failure shape
with a different stat in it.

This is the last member. Tasks 302/303 gave the derived stats their arms, 314 widened `<set>`/`<if>`
to all six mode words, 315 did `<adjust>`'s condition reader and 316 its value reader — but each of
those routed through `abilityForMode`, and `rank` is the one stat that reader does not compose
(`data.abilities` has no `rank` key and `rankValue()` is not one of its branches), so every fix
walked straight past it.

**Fix.** The narrow form is one shared helper — `rankForMode(mode)` on `GameState`, returning
`data.rank` for `natural` and `rankValue()` otherwise — with the five arms above calling it and
`evalExpression`'s inline ternary deleted as its first caller. Putting it on `GameState` beside
`defenceForMode` is what stops the sixth reader repeating this; `defence()` delegating to
`defenceForMode` is the precedent (task 304's note on drift). Only `natural` is distinguishable:
the three `no-` words and `affected` all mean the full Rank, since no weapon, tool or armour
touches it.

**Test.** A fixture holding the ring (Rank N written, `rankValue()` N+2), asserting
`<difficulty ability="rank" modifier="natural">` scores N and a bare one scores N+2, plus the
`<adjust>` pair. All three read N+2 today. Keep the existing §2.270 `<set>` assertion as the
control that the one honoured site stays honoured.

## 316. `adjustAmount` has no `defence` arm, so an `<adjust ability="defence"/>` contribution reads 0

**DONE.** One routing arm added beside `rank`, mode-aware like the rest —
`if (key === 'defence') return state.abilityForMode('defence', mode);` — so the two readers of
`<adjust>`'s `ability=` finally agree on all nine words the gate allows. Two assertions in
`suite-combat.js`'s task-92 block, on a fixture wearing a +3 armour: the contribution equals
`defence()`, and `modifier="noarmour"` drops it by exactly `armourBonus()`. Verified by reverting
the engine change alone — `FAIL … got=0 defence=12` and `FAIL … noarmour=0`, which is the defect
stated as a number. `RESULT ALL PASS pass=3027 fail=0`. Nothing shipped moves: zero corpus sites,
as filed.

With this, all four `modifier=` tags accept all three derived stats, and every reader resolves the
six mode words **for the six core abilities, `defence` and `stamina`**. One stat is still short and
the census that closed 316 found it: `rank` ignores `modifier=` everywhere except `<set>`, so
`<adjust ability="rank" modifier="natural"/>` returns `rankValue()` — the ring of ultimate power's
+2 included — where the word asks for the written Rank. Filed as task 317; the corpus writes
`rank` with a modifier on `<set>` only (23 sites, all `natural`, all honoured).

**The original filing.**

**Priority: LOW — latent, and censused to be latent.** Filed 2026-08-28 while fixing task 315,
whose census covers it: **zero** `<adjust ability="defence">` nodes over the 4,369-file shipped
corpus, so nothing contributes a wrong number today.

**What the code does.** `build/validate-source.ps1`'s `FL_ENUMS['ability']` is
`charisma combat magic sanctity scouting thievery rank stamina defence` — nine words, and it is
not tag-restricted, so `<adjust ability="defence"/>` validates clean. `engine.js adjustAmount`
then tests `rank`, `stamina` and `ABILITIES.includes(key)`, and **`rules.js` `ABILITIES` is the
six CORE abilities** — `defence` is a derived stat and is not in it. So the `ability=` branch
falls out of every arm, `adjustAmount` runs on to `name=` (absent) and returns **0**: the
modifier contributes nothing and the roll is that many points short, silently.

This is the shape tasks 68/302/303 closed one reader at a time — `firstAbility()` returning null
for a derived stat and the caller scoring 0 — and `defence` is the stat it keeps happening to.
It survives here because `adjustApplies`, the *condition* reader on the same tag six lines below,
routes its else-arm through `abilityForMode`, which composes `defence` properly (task 304's
`defenceForMode`). So `<adjust ability="defence" greaterthan="12" value="1"/>` gates correctly
while `<adjust ability="defence"/>` contributes 0 — the two readers of one attribute disagree,
which is what task 315 found in the other direction.

**Fix.** One arm beside `rank`, mode-aware like the rest: `if (key === 'defence') return
state.abilityForMode('defence', mode);` — `abilityForMode` already dispatches `defence`, so this
is a routing line, not a new rule. `rollDifficulty` has exactly this arm already (task 302), which
is the precedent for where it goes and what it returns.

**Test.** One assertion in `suite-combat.js`'s task-92 block, next to task 315's: the §5.79-style
fixture (weapon + armour) with `<lose><adjust ability="defence"/></lose>` asserting the
contribution equals `defence()`, plus a `modifier="noarmour"` arm asserting it drops by
`armourBonus()`. Both read 0 today.

## 315. `adjustApplies` folds `modifier=` to a boolean on the `<adjust greaterthan|lessthan>` condition, which is the third mode-dropping site

**DONE.** `adjustApplies`'s comparator arm now resolves the mode WORD instead of folding it:
ordinary abilities (and `defence`, which is not in `ABILITIES` and so falls through to the same
call) go to `state.abilityForMode(key, mode)`; `stamina` keeps the condition convention
`<if ability="stamina">` uses — bare and `current` read the wounded score, any other modifier the
unwounded one — with `natural` picking the written maximum as `adjustAmount` does. The two
readers of `<adjust>`'s `ability=`/`modifier=` now agree.

Nothing shipped moves, as filed: the corpus's two `<adjust modifier=>` sites (§2.579, §5.79) carry
no comparator, and there are **zero** `<adjust ability="stamina">` nodes with one. Five assertions
added to `suite-combat.js`'s task-92 block, each pitched exactly between the two scores so only the
fold can move the verdict. Verified by reverting the engine change alone: `FAIL … full=8
noweapon=6` and the `modifier="natural"` stamina arm both fail without it (the three controls pass
either way, which is the point of them). `RESULT ALL PASS pass=3025 fail=0`.

Censusing this turned up a third disagreement on the same tag, in the reader task 315 left alone:
`adjustAmount` has no `defence` arm at all. Filed as task 316.


**Priority: LOW — latent, and censused to be latent.** Filed 2026-08-28 while fixing task 314,
whose census covers it: the corpus's two `<adjust modifier=>` sites are §2.579
(`ability="stamina" modifier="natural"`) and §5.79 (`ability="combat" modifier="noweapon"`), and
**neither carries a `greaterthan=`/`lessthan=`**, so no shipped section reaches the folding line.

**What the code does.** Task 314 routed `<set>` and `<if>` through `state.abilityForMode`, so all
four `modifier=` tags now honour all six words — *through the reader each tag's VALUE goes to*.
`<adjust>` has two readers, not one, and only one was in 314's table. `engine.js adjustAmount`
reads the contribution and calls `abilityForMode(key, mode)` — all six. But when the node carries
`greaterthan=`/`lessthan=` the `ability=` stops being the contribution and becomes the
**condition** (the contribution then comes from `value=`/`amount=`, per task 92), and that arm is
`engine.js adjustApplies`:

```js
v = key === 'rank' ? state.rankValue()
  : key === 'stamina' ? state.data.stamina
  : state.abilityForCheck(key, normalize(get('modifier') || '') === 'natural');
```

which is exactly the boolean fold task 314 removed from `evaluateCondition`, one tag over. So
`<adjust ability="combat" modifier="noweapon" greaterthan="8" amount="2"/>` would gate on the
**weapon-boosted** COMBAT — the score the mode exists to exclude — while the identical
`<adjust ability="combat" modifier="noweapon" amount="…">` two lines away reads it correctly.
`abilityForCheck` is now just `abilityForMode(ab, natural ? 'natural' : null)`, so the fix is the
same one-line substitution, and the `stamina` arm should take `modifier="current"` at the same
time (that value IS legal on `<adjust>`, and here it silently already reads the wounded score,
which is right for `current` and wrong for `natural`).

**Test.** One suite assertion in the shape task 314's used: a fixture with a wielded weapon, one
`<adjust ability="combat" modifier="noweapon" greaterthan="N">` pitched between the unarmed and
the boosted score, asserting the modifier does not fire. It fails today.

## 314. three of `modifier=`'s six values have no reader on `<set>` and two none on `<if>`, and the gate allows all six on both

**DONE.** Fixed by widening the readers, as the analysis below argues, not by narrowing the gate.
`state.abilityForValue` now takes the mode WORD instead of a boolean (its `natural` flag was the
fold); `engine.js setValueMode` keeps the three `no-` words (new `SET_VALUE_MODES` list — `current`
stays out, and the gate still refuses it on `<set>`); `evalExpression`'s ability branch passes the
word to `abilityForValue`; and `evaluateCondition`'s ordinary-ability arm calls `abilityForMode`
instead of folding to `abilityForCheck`. All four `modifier=` tags now agree with the gate and the
JaFL spec. The comment quoted below — which named the right defect one layer above the code that
fixes it — is rewritten to say which call site makes its claim true.

Nothing shipped moves: the census was re-run over the 4,369-file corpus and reproduces exactly
(`<set>` 33 = 32 `natural` + 1 `affected`, `<if>` 2 both `natural`, `<adjust>` 1 `natural` +
1 `noweapon`, `<difficulty>` 4 `noweapon`). Four assertions added to `suite-engine.js`, going
through `applyEffect(parse('<set …/>'))` rather than `evalExpression` directly — which is the whole
point, since the old task-302 assertion tested the branch and not the path. Verified by reverting
the engine fix alone: `FAIL … plain=12 noarmour=12 armour=3`, `FAIL … noweapon=8 plain=8`, and the
`<if>` arm. `RESULT ALL PASS pass=3020 fail=0`. `adjustApplies` is the same fold on a reader 314's
table did not cover — filed as task 315.


**Priority: LOW — latent, and censused to be latent.** No shipped section writes one of the
affected pairs, so nothing is mis-read today. It is filed because the failure mode is the one
task 300 was filed for and the one this gate's own comment already names: an allowlisted
`modifier=` with no reader on the tag it is written on falls through to the FULL affected score
— **the very score the mode exists to exclude** — so the page's rule is silently made easier than
it is printed, and both the gate and the suite stay green.

*(Found during conversion work on an unpublished book, by an author who wanted `<set value="defence" modifier="noarmour">`, read the comment below as a guarantee that it
would work, and measured the opposite.)*

**What the code does.** `FL_ENUMS['modifier']` in `build/validate-source.ps1` is
`affected current natural noarmour notool noweapon`, and exactly one value is restricted by tag:
`current` is refused outside `<adjust>`/`<difficulty>` because "on `<set>`/`<if>` nothing reads
it and it would fall through to the default silently - task 300's failure shape" (task 302's
own comment). The same sentence is true of three more values, and the check stops one short:

| tag | reader | honours |
| --- | --- | --- |
| `<difficulty>` | `rollDifficulty` -> `abilityForMode` | all six |
| `<adjust>` | `adjustAmount` -> `abilityForMode` | all six |
| `<if ability="defence">` | `abilityForMode('defence', mode)` | all six |
| `<if ability="combat">` (and the other five) | `abilityForCheck(ab, natural)` | `natural` only |
| `<set value=…>` | `setValueMode` -> `natural`/`affected` or **null** | `natural`, `affected` |

So `<set value="defence" modifier="noarmour"/>` resolves `defenceForMode(null)`, which *is*
`defence()` — the armoured score — and `<if ability="combat" modifier="noweapon" greaterthan="8">`
compares the weapon-boosted score. (`noarmour` on a non-defence ability is a documented no-op and
is not part of this: `state.js` says so, and it is correct — armour reaches no other score.)

**A comment asserts the opposite, which is how it was believed.** `engine.js`'s expression
resolver reads

```js
// defenceForMode(null) IS defence(), so an unmodified read is unchanged; what this
// buys is that `<set value="defence" modifier="noarmour">` cannot validate clean
// and then hand back the armoured score. (task 302)
if (w === 'defence') return state.defenceForMode(mode);
```

The line is right and the claim above it is exactly wrong: `applySet` passes
`setValueMode(modifier)`, which returns null for `noarmour`, so `mode` never reaches this branch
as anything but null. **A comment naming the failure it prevents is worth re-reading against the
call site that supplies its argument** — this one names the right defect at the wrong layer.

**Censused, so the latency is measured and not assumed.** Over books 1-6: `<set modifier=>` is
written 33 times (32 `natural`, 1 `affected`) and `<if modifier=>` twice (both `natural`) — every
one honoured. The corpus's only "no-" modes are `<difficulty modifier="noweapon">` (4) and
`<adjust modifier="noweapon">` (1), and both tags read it correctly. **The two tags that would
drop a mode are precisely the two the corpus has never given one**, which is why five audits have
walked past it.

**The fix, and it should widen the readers rather than narrow the gate.** Both mode-aware readers
already exist and are already called from the two correct tags: route `evalExpression`'s ability
branch through `abilityForMode` (it hand-rolls `natural` today) and let `setValueMode` keep the
three `no-` modes; do the same for `evaluateCondition`'s ordinary-ability branch, which folds the
mode to a boolean before it gets there. That makes all four tags agree with the gate and with the
JaFL spec, which lists `modifier=` on `<if>`/`<difficulty>`/`<set>`/`<adjust>` without
per-tag exceptions. Narrowing the gate instead would keep the spec and the port apart and would
have to be re-argued the first time a section needs the mode.

**A suite assertion is what makes it stay fixed**, and it is cheap: a fixture wearing armour with
a Defence bonus, one `<set value="defence" modifier="noarmour">` and one plain `<set
value="defence">`, asserting the two differ by exactly `armourBonus()`. Today they are equal.

## 313. eighteen of the nineteen corpus censuses read raw bundled text that keeps XML comments, so a commented-out node counts as a real one

**Priority: LOW — latent, and measured to be latent.** Nothing is mis-measured today: stripping
comments from the bundle before the suites run changes not one assertion, count or label across the
whole run, measured (below). It is filed rather than dropped because the failure mode is
**silent by construction** — these censuses exist to catch things "nothing anywhere says", so a
census fed a phantom node reports a wrong number inside an assertion that may still pass — and
because the input that triggers it is a practice the repository is actively growing: an explanatory
comment that quotes the markup it explains.

*(Filed 2026-08-28 by a reader who wrote such a comment, noticed it before committing, and then
checked whether the corpus already contained any.)*

**What the code does.** Every corpus census walks `data.loadBook(b)` and matches over the raw
section string — nineteen of them, at `suite-actions.js` (11), `suite-corpus.js` (7) and
`suite-inventory.js` (1). `loadBook` returns the bundled JSON verbatim, and **`build/build-data.ps1`
does not strip comments**: book6/135’s

```xml
	<!-- modified so that even 'kept' weapons can be broken -->
```

is in `web/data/book6.json` today. So a census’s regex sees comment text exactly as it sees markup.
Exactly one census already knows this — task 266’s `scan266` opens with
`xml.replace(/<!--[\s\S]*?-->/g, '')` (`suite-actions.js`) — which is the argument that the other
eighteen want it too, not that they are individually wrong.

**The corpus already contains the input.** Five of the 64 shipped comments carry markup a census can
match:

| section | comment holds | seen as |
| --- | --- | --- |
| book2/726 | `<lose codeword="2.726.1" hidden="t"/>`, commented out | a real `<lose codeword>` node |
| book1/605 | `<choice section="501">If paying a ransom</choice>` | a real `<choice>` with a link |
| book2/248, book2/521, book3/640 | `choose="f"` | an attribute pair |

book2/726 is the sharpest: task 273’s census opens `if (!/<lose\b[^>]*\bcodeword=/i.test(xml)) continue;`
and that test passes **on the comment**, so the section is walked; `TAG273` then matches the
commented-out node and counts it as a `<lose codeword>`. The pinned output is unaffected only
because the node happens to sit under no `<if codeword>` guard — an accident of that page, not a
property of the census.

**Why "latent" is a measurement and not an assumption.** Patch `loadBook`’s cache to strip comments
before any suite runs, and diff the whole `#results` block against an unpatched run:

```
with comments    : RESULT ALL PASS pass=3015 fail=0   (3016 result lines)
comments stripped: RESULT ALL PASS pass=3015 fail=0   (3016 result lines)
unified diff of the two blocks: empty
```

Diffing the **whole block** rather than the verdict is the part that matters: several censuses
carry their figure inside a PASSING assertion’s label (task 300’s site count, task 266’s totals),
so a verdict comparison would have proved nothing.

**Fix.** Strip once, where every census gets it, rather than nineteen times. Two options:

1. **In the suites** — a shared `rawSections(b)` helper in the test tree that wraps `loadBook` and
   returns comment-free strings, with the nineteen call sites moved onto it and `scan266`’s own
   `replace` deleted as redundant. Keeps the bundle byte-identical; touches only `web/tests`.
2. **In the build** — drop comments when bundling. No runtime reader needs them (`parseXml` yields
   comment nodes nothing walks, and the renderer never visits them), and it shrinks every
   `book<N>.json`. This regenerates all of `web/data`, so it is the larger diff and it removes a
   maintainer aid from the shipped artefact — the comments stay in `books/`, which is the source.

Option 1 is recommended: the defect is in what the censuses read, and the bundle is not wrong.

**Test.** One assertion in `suite-corpus.js`, pinned at zero over the bundled corpus: no section’s
comment-stripped text differs from its raw text **in the count of tag opens** — i.e. no shipped
comment contains markup. That fails today on book1/605 and book2/726, so pin it instead as "the
censuses see the same tag count with and without comments", which the helper makes true and which
keeps working when a future comment quotes markup. Whichever form, it must be a census of its own
and not a fixture, because the input is the corpus.

**Adjacent, and deliberately not folded in.** `build/validate-source.ps1` parses XML properly, so
the build gate is unaffected — this is a test-tree defect only. And the reverse direction is
already known and unrelated: a *prose* census over section text must strip comments too, which is a
note about ad-hoc `grep`s rather than about the suite.

**Done (option 1, the recommended one).** `web/tests/corpus-text.js` exports `rawSections(b)` —
`loadBook` with every XML comment removed from each section's text, cached per book — and all
nineteen call sites (`suite-actions.js` 11, `suite-corpus.js` 7, `suite-inventory.js` 1) read
through it. `scan266`'s own `replace` is gone as redundant, with a line saying where the strip
moved to. The bundle is untouched: `web/data`, `web/assets` and `version.js` are byte-identical
(the test tree is outside `stamp-version.ps1`'s digest by design), so this is a four-file change
under `web/tests` and nothing else.

**The assertion, and why it is that one.** The filing's first form — "no shipped comment contains
markup" — is a pin on today's corpus that fails on book1/605 and book2/726 and would fail again on
the next explanatory comment that quotes its own markup. So the census rides the task 292/294 pass
(all three want the parsed element, and an extra await over 4,369 sections costs virtual-time
budget) and asks the parser instead: for every section, the count of tag opens in the text the
censuses read must equal `querySelectorAll('*').length + 1`. Comment nodes are not elements, so the
two mechanisms are independent, and the equality is what "the censuses see the same tag count with
and without comments" means operationally. It also asserts the corpus still HAS comments to strip
(61 sections today), because a census with no input is a census that proves nothing.

**Measured both ways.** Restored: `RESULT ALL PASS pass=3016 fail=0` — 3015 plus this one
assertion, and every other census's figure and label unmoved, which is the filing's own
measurement re-confirmed from the other side. Negative control, the census pointed back at
`data.loadBook`: `RESULT FAILURES pass=15 fail=1` naming
`1/605 tags=12 elements=11, 2/726 tags=13 elements=12` — exactly the two sections predicted, one
phantom tag each. A green run with the fix in is not evidence on its own here (the defect was
latent); the failing control is.

## 312. task 311 lifted the effective-ability ceiling and left `ability()`'s doc comment reading "clamped 1..12" — which `abilityNoWeapon`'s new comment then cites as its authority

**Priority: LOW — a comment, not behaviour.** Nothing computes wrongly, no branch changes and no
test can fail on it. It is filed with a number rather than folded into 311 because of its shape:
the commit that made this line wrong also wrote a second comment that **points at it**, so the
stale text is not merely wrong on its own, it is the thing a correct comment defers to.

*(Filed 2026-08-26, one commit after 311 landed, by a reader who had to work out which of
`ability()`'s two comments to believe before extending it.)*

**What the code says.** `state.js:420`, six lines apart:

```js
  /** Affected ability score, including item/effect/affliction bonuses, clamped
   *  1..12. ... */
  ability(ability) {
    ...
    // Floor of 1, no ceiling: the printed 12 bounds the WRITTEN score ... (task 311)
    return floorAbility(this.afflictionMod(ability, sum));
  }
```

The body is right and the doc comment is the pre-311 text, untouched. 311 changed the return
expression and added the explanation beneath it, and did not re-read the four lines above.

**Why the citation is the point.** `abilityNoWeapon` (`state.js:510`), whose comment 311 DID
update, reads: "Floored, not capped, **for the same reason `ability()` is**." A reader who
follows that reference lands on "clamped 1..12" and has two comments by the same author, in the
same commit, saying opposite things about the same rule. The port's own rule is stated correctly
in the place it belongs — `rules.js` documents `clampAbility` as the WRITTEN score (bounded
1..12, with the `Rules.xml` quotation) and `floorAbility` as the EFFECTIVE one (floor of 1, no
ceiling) — so nothing is unresolved, only mis-signposted.

**Scope: exactly one comment.** `abilityForMode` and `abilityForValue` clamp nothing themselves
(they delegate to `ability()`/`abilityNoWeapon()`/`abilityNatural()`), `defenceForMode` composes
an unclamped sum, and the two remaining `clampAbility` call sites — `adjustAbility` and
`sanitizeData` — are the WRITTEN-score path, where the 12 has a source and both comments are
accurate. Censused over `state.js`, `rules.js` and `combat.js`: this is the only line that says
an effective ability score is capped.

**The fix.** Rewrite `ability()`'s doc comment to say what the body says and to point at
`floorAbility` rather than restate its argument, which is what keeps the reasoning in one place
the next time the bound moves. No behaviour changes; the build stamp moves on the comment text,
which is the stamp working.

**The rule worth keeping.** A change to a function's return value has to re-read that function's
OWN doc comment before it re-reads anybody else's — 311 updated a sibling's comment and its own
body while leaving the header between them, which is the one position from which a wrong comment
can mislead a correct one.

**Verified.** `RESULT ALL PASS pass=3015 fail=0`, unmoved from 311's — a comment-only change
cannot move an assertion, and a run that says so is the check that nothing else went with it.

## 311. `ability()` clamps the EFFECTIVE score to 12, so book4/103's white sword is worth +5 to a book4 Warrior and +4 to a book5/6 one — and the attack roll reads the capped number

**Priority: MEDIUM — live in books 4–6, silently and always in the player's disfavour.** Not a
crash and no branch becomes unreachable (measured below), but it is uncorrectable from the sheet
and undetectable from it: the Adventure Sheet shows COMBAT 12 for a character who should be at 15,
so the missing points read as the rules.

*(Filed 2026-08-26 while writing a task 310 assertion. The assertion needed `Math.min(12, cb0 + 7)`
to pass, which is the cap admitting itself.)*

**What the code does.** `ability()` (`state.js:426`) and `abilityForMode()` (`state.js:509`) both
end `clampAbility(...)` applied to the **full sum** — natural score + `itemBonus` (which folds in
the wielded weapon and the best tool) + `effectBonus` + `afflictionBonus` + `auraBonus` +
`potionBonusFor`. `clampAbility` is `Math.max(1, Math.min(12, v))` over `ABILITY_MAX = 12`
(`rules.js:28`, `rules.js:102`).

**The reference engine pegs the minimum only.** `EffectSet.adjustAbility` ends:

```java
// Peg the minimum value for an affected ability at 1.
// This stops curses from lowering an early character's stats below 1.
return Math.max(1, value);
```

No maximum, and the comment says exactly why the one bound it has is there.
`Adventurer.getAbilityValue` does not cap either. So the ceiling is port-introduced, and the floor
— which the port also applies — is the part with a source.

**The port already disagrees with itself about it.** `defence()`/`defenceForMode` is *not* clamped:
COMBAT 8 + Rank 4 + a +6 armour reads **18**. So an effective score has a ceiling on the six core
paths and none on the seventh, and `<if ability="defence" greaterthan="13">` (the corpus's one such
gate) depends on the seventh having none.

**Measured** (Node, `web/js/state.js`; corpus top bonuses first).

The shipped corpus's highest bonuses are `weapon bonus="8"` — **one** item, book4/103's white sword,
where the next-best weapon is +6 — and `tool bonus="6"`, the hyperium wand of book6/23 and
book6/489 (`ability="magic"`). Against the pregen ability rows of the books that can reach them:

```
book4 Warrior   natural COMBAT 7 + white sword 8 = 15  ->  engine 12  (check reads 12)
book4 Wayfarer  natural COMBAT 6 + white sword 8 = 14  ->  engine 12
book4 Rogue     natural COMBAT 5 + white sword 8 = 13  ->  engine 12
bk5/6 Warrior   natural COMBAT 8 + white sword 8 = 16  ->  engine 12
bk5/6 Mage      natural MAGIC  8 + hyperium wand 6 = 14 ->  engine 12
Defence         COMBAT 8 + Rank 4 + armour 6 = 18      ->  engine 18  (not clamped)
```

**It is not display-only.** `abilityForCheck` reads the capped number, so every `<difficulty>` and
`<rankcheck>` roll uses it, and `combat.js:182` builds the attack roll from
`state.ability('combat')` — a book5/6 Warrior with the white sword attacks at 12 where the rules
give 16.

**No branch is lost, and that is worth recording so the next reader need not re-derive it.** Census
of `<if ability=>` gates over the shipped corpus (per task 270): the highest core-ability threshold
is `sanctity greaterthan="8"`, and the only gate above 12 is `defence greaterthan="13"`, on the
unclamped path. So the cap costs points on rolls, never a route — which is what separates this from
task 303.

**Deliberately not measured, and the fix must not assume it.** Whether clamping the **natural**
score to 12 is right is a *different* question on *different* call sites — `adjustAbility`
(`state.js:729`) and `sanitizeData` (`state.js:1394`) — and a natural ceiling may well be the
printed rule. Read the reference's `<gain ability=>` path before touching those two. This filing is
about the effective total alone; the narrow change is to stop clamping the sum at the two reader
sites while leaving the floor of 1, which the reference does have.

**Fixed 2026-08-26.** `rules.js` gains `floorAbility` (floor 1, no ceiling) beside `clampAbility`
(1..12), and the two effective readers — `ability()` and `abilityNoWeapon()` — use it. The two
natural-score sites keep `clampAbility`, so the change is to what a bonus may reach and never to
what a `<gain ability=>` may write. Suite `pass=3004 → 3015`; `web/` only, so a stamp and not a
data rebuild.

**The printed rules settled it, and they nearly settled it the other way.** `rules/Rules.xml` does
cap abilities at 12, twice — which is the first thing the fix had to survive rather than ignore:

> Your **initial score** in each ability ranges from 1 (low ability) to 8. **Ability scores will
> change** during your adventure, but you can never have an ability score lower than 1 or higher
> than 12. *(the character-creation section)*
>
> You abilities (COMBAT, etc) can **increase** up to a maximum of 12. They can never go lower than
> 1. **If you are told to lose a point off an ability which is already at 1, it stays as it is.**
> *("Are there any limits on abilities?")*

Both describe the number in the box: what an *initial score* is, what *increases*, and what
happens when you are told to *lose a point*. Gains and losses are written-score operations — which
is exactly where the port already applies `clampAbility`, correctly. Neither passage mentions a
weapon.

The genuine counter-argument, which is worth recording because a future reader will find it and
should not have to re-weigh it alone: the same file uses "COMBAT score" to mean the
weapon-inclusive number when it defines Defence — "your COMBAT score, **including any weapon
bonus**, plus your Rank, plus the bonus for the armour you're wearing". So "ability score ... higher
than 12" *could* be read as covering the total. Three things outweigh it. **JaFL**:
`EffectSet.adjustAbility` — the function that applies weapon, tool, armour and aura bonuses — ends
`return Math.max(1, value)`, and its comment explains the floor and never mentions a ceiling.
**The corpus's own economy**: initial scores run to 8 and books 5–6 start a Warrior at COMBAT 8, so
a total capped at 12 makes every weapon above +4 partly worthless to them and book4/103's +8 white
sword worth +4 — a game does not sell a +8 sword it has already decided cannot be used. **The
adjacent rule**: "count only the bonus given by your best item for each ability" answers *which*
bonus applies with no ceiling on the result.

**Defence moved with it, which the filing had backwards.** The filing said `defence()` "is not
clamped", contrasting it with the six core paths. Half right: the *sum* is unclamped, but
`defenceForMode` builds its COMBAT term from `this.ability('combat')` — the clamped reader — so the
cap was costing Defence the same four points it cost the attack roll. That makes the defect larger
than filed and the fix's reach wider: lifting the ceiling pays those points back in Defence too,
which is what Rules.xml's "including any weapon bonus" requires. `modifier="noweapon"` still strips
the weapon term exactly, because `abilityNoWeapon` sums its own terms rather than subtracting.

**Two existing assertions were the ceiling's own fixtures**, and one of them was mine. Task 310's
"a better weapon after a loss is still picked up" carried the `Math.min(12, cb0 + 7)` that filed
this task, and is now `cb0 + 7` exactly. `suite-render`'s "noweapon computed pre-clamp (11, not
12−2)" existed to prove the bare score was summed rather than subtracted off a clamped total — the
fixture (COMBAT 11 + a +2 weapon) is the exact shape that hit the ceiling, so it is kept and
re-pointed: the affected score is now the true 13, the bare score is unchanged at 11 (the original
property, still holding), and re-adding the cap fails there first.

**Assertions** (11: nine in `suite-engine`, one in `suite-combat`, the re-pointed one in
`suite-render`). Driven from the shipped nodes, not fixtures: §4.103's white sword and §6.23's
hyperium wand are read out of the corpus and applied, each with a guard arm on its `bonus=` so a
re-worded section fails here rather than silently weakening the test. Then COMBAT 8 + 8 reading 16
through `ability`, `abilityForCheck` and `rollDifficulty`; Defence carrying it; `noweapon` still
stripping it; MAGIC 8 + 6 reading 14 off the tool path; the **floor** surviving a −9 curse (the
bound that has a source); and a control that a written score still stops at 12. The
`suite-combat` arm reads the fight log — `You roll 2+16=18 vs Def 10` — because the log line is
where the number is legible to a player. Verified by reinstating the ceiling in `floorAbility`
alone: seven arms fail across four suites, the log line reading `2+12=14`.

**The natural-score cap: left untouched here, then read afterwards and confirmed correct.** The two
`clampAbility` call sites — `adjustAbility` (`state.js:729`) and `sanitizeData` (`state.js:1394`) —
are unchanged by this task, and the control arm pins them at 1..12. That was deliberate but
unverified when the fix shipped; the check was made immediately after, and it holds. **This is the
mirror image of the defect above**: on the effective path the 12 had no source, and on the written
path it has two.

`rules/Rules.xml` is the first, quoted above. JaFL is the second, and it states the rule in words
before implementing it — `Adventurer.adjustAbility`'s doc comment reads "an ability can only be
lowered to 1, and one of the major six can only go up to 12", and the body is exactly that:

```java
if (abilities[a].natural + delta < 1) { if (fatal) death = true; d = -abilities[a].natural + 1; }
else if (abilities[a].natural + delta > 12) { d = 12 - abilities[a].natural; }
```

The port's `fatal` branch matches too (`if (fatal) death = true` against the drop to Stamina 0), and
`d` is clamped *inside* JaFL's loop, so an `ability="*"` adjustment is bounded per ability — a loss
takes a point off each ability above 1 and nothing off one already at 1. The port resolves `'*'` to
all six (`engine.js:134`) and calls `adjustAbility` per target, each clamping on its own, so the two
agree there as well. **No task: nothing to change, and the 12 on this path is not the unsourced
ceiling that 311 was about.**

**Three adjacent divergences found in the same read, none of them defects.** Recorded here so the
next reader does not file them: (1) JaFL's `adjustAbility` returns the delta actually applied where
the port returns the new score — a real difference, but inert, since all three callers
(`combat.js:171`, `engine.js:172`, `engine.js:1801`) discard the return. (2) JaFL calls
`isAbilityMaxed` from `TickNode.canBeSkipped`/`actionDoesAnything`, so a *forced* ability tick that
would do nothing at 12 is neither presented as an action nor required of the player; the port has no
equivalent and needs none, because all **141** ability-raising nodes in the shipped corpus are
auto-applied on entry — **zero** carry `force="f"` — so there is no control to disable and no forced
click to clear. With six books published and no seventh in the tree, a conversion cannot introduce
the shape either. (3) Where such a tick carries an ability *effect* rather than an amount
(book2/643's `effect="+fixed"`), JaFL's own condition (`!isAbilityMaxed(ability) || abilityEffect !=
null`) exempts it from the maxed check regardless, which is what the port already does by applying
effects separately from the numeric gain.

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

## 318. Re-archive completed task details 275–317 and clear them out of the priority buckets — LOW (process/docs)

*(Filed 2026-08-31; recurring maintenance after tasks 141, 165, 211, 255 and 274.)* Task 274
archived completed details 1–274, but the 275–317 burn-down has since completed every detailed task
again. Their checked rows fill the HIGH/MEDIUM/LOW work queues while ~2,810 lines of completed
detail sit between the checklist and the Review log, so TASKS.md is back to 5,911 lines — nearly
four times the 1,556 task 274 left it at — and the "first open task" workflow is harder to scan.

Move completed detail sections 275–317 into TASKS-archive.md under their stable IDs, consolidate
their summary rows into the single numeric **Done** list, and leave only open-task detail plus the
Review log in TASKS.md. Extend the archive intro/Contents range without losing completion notes or
historical review text. Documentation-only; validate every checklist ID has exactly one detail
heading across the two files, then commit.

**Note for the pass: the drift runs one way this time.** Of the 25 checked bucket rows (293–317),
**none** is listed under **Done**, which ends at 292 — so the set-union merge task 274 needed finds
zero overlap and the whole job is a numeric insert. Do the bulk move by line-slice with boundary
assertions, as tasks 255 and 274 did — the first moved line is `## 275.`, the last is the closing
`---`, and the next surviving line is the archive-range note.

*Done 2026-08-31:* documentation-only re-archive, scope 275–317 as filed plus this task's own
detail (318), matching how tasks 165, 211, 255 and 274 archived themselves. Moved every detail
section 275–318 verbatim (completion notes intact, headings unchanged) into TASKS-archive.md,
extended the archive intro/Contents to IDs 1–318, and merged the 25 bucket rows into the **Done**
checklist in numeric order. The **HIGH**/**MEDIUM**/**LOW** headings stay in place, each carrying
the `*(none open — file new … work here)*` placeholder, so new work is still filed under an
existing bucket. TASKS.md keeps the intro, those three headings, the full **Done** checklist, the
archive-range note (now 1–318) and the Review log, dropping from **5,911 to 3,107 lines**; the
archive grows from 11,437 to 14,359.

Three things worth carrying forward. **Closing a task writes its bucket row and never touches
**Done**, so between re-archive passes the two lists diverge in whichever direction the pass
happens to leave them.** Task 274 found both directions at once (4 rows duplicated, 3 bucket-only);
this pass found the second direction alone, at its full extent — all 25 closed tasks sat in a
bucket and not one had reached **Done**. The set-union merge is still the right shape because it is
safe against either, but the standing lesson is simpler: **the numeric list is only ever written by
a re-archive pass**, so its length is a measure of when the last one ran and not of what is done.

**The intro's status sentence was stale by five tasks, and it is the first thing a reader checks.**
It read "Every filed task through 312 is complete … **313 and 314 are open**" with 313–317 all
closed, because that sentence is maintained by this pass and by nothing that closes a task. Between
passes, read it as a claim to verify against the checkboxes, not as a fact. Fixed here, and the
**Done** list's own stated invariant ("listed by task number") had one violation for the same
reason — task 280's row was appended after 281 and 282 had already closed — now sorted, so the two
files' checklists are both strictly numeric.

**A balanced `git diff --stat` does not prove a bulk move was byte-faithful.** Both files are CRLF
in the working copy, and MSYS `sed -n` strips the CR, so the 2,814-line block landed LF-only inside
a CRLF file. The diff read a perfectly balanced 2,814 insertions / 2,814 deletions with no
line-ending noise at all, because `core.autocrlf=true` normalises both sides to LF in the index —
the only tells were git's own "LF will be replaced by CRLF" warning and a byte count
(`d.count(b'
')` against `d.count(b'
')`). **Count the terminators, not the diff lines**, on
any move done with a text-mode tool; the file was renormalised to uniform CRLF before commit.
Validated afterwards that all 317 checklist IDs (1–318 less 207, withdrawn) have exactly one `##
<N>.` detail heading across the two files, that the archive's detail IDs are exactly 1–318 with no
gaps or duplicates, and that no ID appears twice in **Done**. The archive's Contents list carries
317 rows, not 318: 207 keeps its archived detail but has no checklist row, which is how the
withdrawal has been recorded since task 211. No code, data, build or test files touched, so no
rebuild or stamp change is implied.

---

## 319. The line-ending trap task 318 hit was recorded only in the Review log, where a trap that changes how you run a bulk edit belongs in `AGENTS.md` — and the sharper half of it, a broken shell assertion, turned out not to exist — LOW (process/docs)

*(Filed 2026-08-31, immediately after 318, at the user's request.)* Task 318's bulk move wrote a
2,814-line block with MSYS `sed -n` into a CRLF file and produced LF-only lines inside it, which
`git diff --stat` reported as a perfectly balanced 2,814/2,814 with no line-ending noise. The pass
recorded that in the Review log, which is the right place for *what a pass found* and the wrong
place for *how to run the next bulk edit* — nothing in `AGENTS.md`'s command-execution notes said
it, and that section is where an agent looks before driving files from the shell. Add it there.

**The measurement came first and cut the claim down twice.** Two things were asserted on the way
out of 318 and only one survived contact with a fixture.

- **Which tools strip the CR was a guess, and it is a split.** Over a three-line CRLF fixture,
  `sed`, `awk` and `grep` strip the CR; `head`, `tail`, `cut`, `tr` and `cat` keep it. 318's own
  script mixed the families — `head -n`/`tail -n +` for the surviving halves (byte-faithful) and
  `sed -n` for the moved block (stripped) — which is exactly why the damage was confined to the
  block and the rest of the file stayed CRLF. **A pipeline that uses one family is uniform by
  construction**, which is the whole of the remedy.
- **"It breaks the boundary assertions" was false.** The scarier claim was that a `sed`-based
  `[ "$(sed -n 5p f)" = "---" ]` passes only because sed dropped the byte, so the same check over
  `head` output would compare `---\r` against `---` and fail. It does not: under this Cygwin bash
  (5.3.15) `$(...)` drops the trailing CR too, so **both** forms pass. Verified rather than
  reasoned, and dropped from the note.

**What survived is a cosmetic finding, and the note says so in its first sentence.** The committed
bytes are LF whatever the working copy holds (`core.autocrlf=true`, no `.gitattributes`), the build
LF-normalises the bundled section text before writing the JSON, and `TASKS.md` is read by no build
or test script. The proof that it costs nothing is already in the tree: a survey of every tracked
file found **4,614 of the 4,632 carrying a terminator are all-CRLF, 18 are all-LF and none is
mixed** — those 18 were flipped whole-file by earlier passes (they include `books/book1/597.xml`
and `web/js/render-gates.js`, touched by tasks 296 and 290) with no consequence anyone noticed.
**A note about a harmless thing has to say it is harmless**, or the next agent spends a pass
"fixing" 18 files and adding a `.gitattributes` nobody asked for; the paragraph therefore ends on
*never do that as a drive-by* rather than on the warning.

*Done 2026-08-31:* one paragraph added to `AGENTS.md` under **Command execution**, after the
AV-heuristics bullets and beside the existing "prefer direct file edits over shell-based
search/replace" rule it reinforces. It names the two tool families, the diff that cannot see the
difference and why (index normalisation), the reason it is cosmetic, the 4,614/18/0 survey, the
refuted assertion claim, and the one habit worth keeping — one tool family per pipeline, checked
with a terminator count rather than with the diff. `AGENTS.md` only; the heading keeps its
"(Bitdefender on Windows)" parenthetical, which is now slightly narrower than the section's
contents and was left alone as out of scope. No code, data, build or test files touched, so no
rebuild or stamp change is implied.

---

## 320. `ROADMAP.md` phase 1 cites two moved locations and undercounts its own dock sites — MEDIUM (docs)

**Priority: MEDIUM.** The backlog is otherwise clear, so phase 1 is the next thing anyone
picks up — and these are the three facts they would start from.

### What is wrong

Phase 1 ("A pin at the port you are docked at") states the blocker is data, not code, and
sizes the work against three cited facts. Two of the citations have drifted and the third
is an undercount:

| `ROADMAP.md` says | Actually |
|---|---|
| the Maps modal at `app.js:1142` | `app.js:1142` is the **Narration** modal's closing line; `showMaps` begins at `app.js:1152` |
| `state.data.location` set at `state.js:995` | `state.js:995` is affliction/Stamina-cap code. `location` is declared at `state.js:120` and written by `arriveAtDock` at `state.js:1118` |
| "25 named ports across **96** sections" | 25 names is right. The site count is **97**: 94 sections carry `<section dock=>`, and three more set the location through `<set dock=>` alone — book3/367, book3/405, book5/634 |

`app.js:250` (the Maps button on the title screen) is still correct, and the surrounding
argument — that the modal is reachable before any book is loaded, so coordinates must ride
in `meta.json` rather than a per-book file — is unaffected.

### Why it matters

The third row is the one with consequences. Phase 1's deliverable is a gazetteer keyed by
dock name, and its validation is "a `suite-corpus` assertion that **every** `dock=` value in
the corpus resolves". An author who reads "a section's `dock=`" as meaning `<section dock=>`
writes a census that misses the `<set dock=>` arm, and the assertion then passes over a
corpus it did not fully walk — the same shape as task 313, where eighteen censuses read text
that still contained the nodes they were meant to exclude.

The two stale line numbers cost only the time it takes to discover them, but they are cited
as evidence for the phase's central claim, so a reader checking that claim finds unrelated
code and has to rebuild the argument from scratch.

### This is task 309's shape, one file later

Task 309 corrected `ROADMAP.md` for quoting the 4,437-file glob count instead of the
shipped 4,369. Same document, same failure: a planning file carries verified-looking
figures that no test or build re-checks, so they rot silently while the code moves under
them. Nothing here is a defect in the port.

### Steps

1. Correct the three rows above in `ROADMAP.md`'s phase 1 — the two line references and the
   site count.
2. Where phase 1 says the location is set "from a section's `dock=`", say that **both**
   `<section dock=>` and `<set dock=>` write it, and name the three `<set>`-only sections so
   the gazetteer's census cannot silently skip them.
3. Re-read phases 2 and 3 for the same class of citation and correct any that have drifted.
4. Consider whether a line-number citation earns its keep in a planning document at all, or
   whether naming the function (`showMaps`, `arriveAtDock`) is the durable form. Record the
   answer in the phase, since this is the second time this file has needed it.

### Validation

Documentation only — no rebuild and no suite run is required, and none of the generated
outputs may change. Verify each corrected citation by opening it, and re-run the two census
commands in the table so the 94 / 3 / 97 split is confirmed against the tree at the time of
the fix rather than copied from here.

### Done 2026-08-31

`ROADMAP.md` only. **Two of the three rows above were themselves wrong, and step 2 asked for a
change that would have written a new error into the file** — the filing pass measured attribute
counts without reading the code that consumes them.

- **Row 3 is refuted.** `<set dock="X">` does **not** set the player's location. `applySet` in
  `engine.js` handles it as `const s = state.currentShip(); if (s) { s.docked = get('dock'); }`
  — it berths a **ship** and never touches `data.location`, which is written from exactly one
  place: `arriveAtDock(sectionEl.getAttribute('dock'))` on every section entry in `render.js`.
  So the count of sections that set the player's location is **94**, not 97. The 97 is a real
  figure but of a different set — sections carrying any `dock=`-family attribute — and 96 was
  never reproduced from either definition. Step 2 would have committed "both `<section dock=>`
  and `<set dock=>` write it", so the task's instruction was honoured by contradicting it.
- **Row 1's "actually" is also off by three lines.** `app.js:1142` is `function showRules(…) {`;
  the Narration modal's closing brace is 1139. `showMaps` at 1152 was correct, which is the half
  that mattered.
- **Row 2 checked out exactly:** `state.js:995` closes the Stamina-cap branch, `location` is
  declared at 120, `arriveAtDock` begins at 1118.

The census also found **two more** dock-name readers the filing missed, so the file now carries
all four in a table: `<section todock="X">` (2 sections — berths at-large ships on *leaving*) and
`<if docked="X">` (3 sections — reads a ship's berth). All four draw from the **same closed set
of 25 names** (verified: distinct values over `<section dock=>` alone is 25, and adding the other
three arms leaves it 25), so phase 1's gazetteer is complete either way — but the validation
bullet now says the assertion must walk all four, because today a one-arm census passes for the
wrong reason and would stop catching a typo the moment a name lands elsewhere.

Step 3 found two further drifted citations, both corrected:

- Phase 1 offered `book.ini` as the precedent `places.ini` would sit beside, "that already
  declares `Map=`". **Nothing under `build/` reads `book.ini` at all**, and `Map=` is inert: the
  build selects each regional map by the `-Map$` basename pattern, which is why book 3's
  `Map=Violet Ocean.JPG` names a nonexistent file while `VioletOcean-Map.JPG` ships correctly.
  Filed as **322**.
- Phase 2 called the shipped maps "500px-wide **downscales** of the source `.JPG`s". They are
  byte-for-byte copies (hash-verified) of sources that are themselves 500px wide, so 500px is the
  only resolution in the repo and percentages are the whole insurance policy rather than a way to
  survive a downscale that never happened. Per-book heights differ (627/584/619/612/665/674), now
  stated, since a percentage `y` is not portable between maps.

Step 4's answer, recorded in the file: **cite the function, not the line.** Every `#L` anchor in
`ROADMAP.md` is gone — references now name a function and link the file. A line number rots on
any edit above it, nothing re-checks it, and it fails *quietly* by pointing at plausible wrong
code; a function name fails loudly with no match. `app.js:250` was still correct and was converted
anyway, so the rule holds for the whole file rather than only for the rows that had already broken.

Verified: every link target in the file resolves, `git status` shows `ROADMAP.md` alone, and
`stamp-version.ps1` reports "already at 26.08.28.ba963ea" — no generated output moved, as the
validation required.

---

## 321. The two task files are the repo's only CRLF blobs, so a tool edit rewrites them whole — LOW (repo hygiene)

**Priority: LOW.** Nothing is broken and nothing ships differently. It costs review time, on
the two files this project edits most.

### The fact

Measured over every tracked `.md` blob (`git cat-file blob` on the raw bytes — **not**
`git show`, which applies eol conversion and reports the opposite):

| | Committed blob |
|---|---|
| `TASKS.md` | **CRLF** (3,136 CR) |
| `TASKS-archive.md` | **CRLF** (14,409 CR) |
| every other tracked `.md` | LF (0 CR) |

Worktree copies are CRLF across the board, which is what `core.autocrlf=true` intends and is
not the issue.

### The cost

An edit to either file that gets staged through the normalising path stores an LF blob
against a CRLF parent, so **every line reads as changed**: filing task 320 produced 84 lines
of real change and a **6,348-line diff**. The change is unreviewable, and the file silently
migrates to LF as a side effect of an unrelated edit.

It is avoidable once known - staging with conversion disabled preserves the CRLF blob and
the diff collapses to the real 84 lines - but it is invisible until someone measures raw
bytes, and the obvious check (`git show HEAD:TASKS.md | grep $'\r$'`) reports the wrong
answer because `git show` converts.

### Why this is filed rather than fixed

Task 319 surveyed line endings and concluded the situation was harmless, on the grounds that
"`core.autocrlf=true` makes the committed bytes LF either way". That holds for 4,630-odd
tracked files and **not** for these two. 319 also explicitly warned against a drive-by
`.gitattributes`, and it was right to - which is exactly why this is a filed decision rather
than something to do while passing.

### Steps

1. Decide between: (a) normalise both files to LF in **one deliberate commit** that changes
   nothing else and says so in its message; (b) add a `.gitattributes` pinning the
   convention repo-wide; or (c) leave them and record the staging workaround in `AGENTS.md`
   beside task 319's note.
2. Whichever is chosen, correct 319's claim where it is recorded, since it is the sentence
   that would stop the next person from looking.
3. If (a) or (b): confirm afterwards that `git cat-file blob` reports 0 CR for both files,
   and that no other tracked file changed.

### Validation

Repository hygiene only — no rebuild, no suite run, and no generated output may change.
Verify by raw blob inspection, never by `git show`.

### Done 2026-08-31

Arm **(a)**, chosen by the user from a written comparison of the three. Two commits, plus the
`AGENTS.md` correction step 2 required. **The filed cause was wrong in a way that mattered to
the fix, and the mechanism turned out to be two mechanisms.**

**git was never the thing normalising these files — it was preserving them.** "The cost"
above says an edit "staged through the normalising path stores an LF blob against a CRLF
parent". Measured in a scratch repo on git 2.55.0.windows.5, the opposite holds: a text file
whose index blob already contains CRLF **keeps CRLF** on every later staging, and the diff
stays scoped. Task 320's own pass is the proof — it edited both files, committed 295/84, and
left both blobs CRLF. What actually produced the 6,348-line diff is an **editing tool writing
LF into the worktree copy**; git then stored LF against the CRLF parent and every line read
as changed. The distinction decides the fix: a "staging workaround" would have addressed a
step that was never at fault.

The two files were also non-LF for **different reasons**, and only one of them is the rule the
filing assumed:

- **`TASKS-archive.md` was binary, not CRLF-text.** It held exactly **one lone CR** — a CR not
  followed by LF — at byte offset 980447, and git classifies any file containing one as binary
  (`convert_is_binary` returns 1 on `lonecr`), after which autocrlf converts it in neither
  direction. `git ls-files --eol` reported `i/-text`, which the filing's table read as simply
  "CRLF". The byte sat inside a code span in **task 319's own write-up about CR handling**, and
  it was invisible: the sentence rendered as "would compare `---` against `---` and fail", which
  says nothing. Escaping it to `` `---\r` `` fixed the sentence and the classification in one
  character — `i/-text` became `i/crlf` in that commit.
- **`TASKS.md` was clean CRLF text** (0 lone CR, 0 bare LF) held CRLF by the self-perpetuating
  rule above.

Done as two commits so neither is a mixed diff:

1. **The one-character escape**, staged with `-c core.autocrlf=false` so the commit is that
   change and nothing else (1 insertion, 1 deletion; blob deliberately left CRLF).
2. **The normalisation**, line endings only. Verified *before* staging rather than after: with
   CRs stripped from each `HEAD` blob, both files were byte-identical (`cmp`) to the new
   worktree copies, and each byte count fell by exactly its CRLF count (286,009→282,680 =
   3,329; 989,644→975,123 = 14,521). So no character other than CR moved.

Step 3 verified over the whole tree rather than the two files, via one `git ls-files --eol`
call: **4,643 blobs `i/lf`, 0 `i/crlf`, 0 `i/mixed`**; the 32 `i/-text` are all real images
(checked by extension) and the 8 `i/none` are `CNAME` plus the seven generated single-line
JSON files, which have no terminator at all. Nothing outside the two files changed.

Step 2's correction went into `AGENTS.md` beside 319's paragraph. 319's sentence — "the
committed bytes are LF whatever the working copy holds" — is now **true**, but only because
this task made it so, so the note says that rather than deleting the claim: it names both
CRLF-retention mechanisms, records that every tracked blob is now `i/lf`, and keeps 319's
"never fix endings as a drive-by" rule intact, since this was a filed decision and not a
drive-by. Two **measurement** traps are recorded there too, because both return the
reassuring answer and one of them fired during this pass: `git show` converts (use
`git cat-file blob`), and **`grep -c $'\r$'` reports 0 for a fully-CRLF file** under this
Cygwin bash, since grep strips the CR before the pattern sees it — count bytes instead.

*Mistake worth recording:* the first attempt at the one-byte splice used
`List[byte].AddRange($b[0..980446])`, where PowerShell's range operator yields `Object[]`;
both `AddRange` calls threw while the two `Add` calls succeeded, and `WriteAllBytes`
truncated `TASKS-archive.md` to 2 bytes. It was restored exactly from `HEAD` (`git checkout --`,
989,643 bytes, lone CR back at 980447) and redone with `[byte[]]::new` + `Array.Copy`, written
to a temp file and verified there before overwriting. **Byte-splicing a tracked file is safe
only because it was committed first** — which it was, by task 320 minutes earlier.

No rebuild, no suite run; `AGENTS.md` and the two task files only, so no generated output.

---
