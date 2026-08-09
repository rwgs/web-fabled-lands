# Fabled Lands — Web Edition · Engineering TODO

Backlog of recommended improvements. Open tasks are filed under priority buckets
(**HIGH** / **MEDIUM** / **LOW**) — work the first open (`- [ ]`) item top-down;
each task's detail section carries the same stable ID. Every filed task through
230 is complete (listed under **Done** below), apart from 207, withdrawn as a
misdiagnosis (see the Review log), so **the backlog is empty** — file
new work under the priority bucket that fits, and record the pass in the
Review log.
Completed detail sections are archived in
[`TASKS-archive.md`](TASKS-archive.md); the Review log at the end of this file
records each audit pass and is where new work is filed.

This file is for **defects**. New features are scoped in
[`ROADMAP.md`](ROADMAP.md) instead, as ordered phases — with the backlog empty, a
phase is picked up from there rather than from the buckets below.

**HIGH**

*(none open — file new HIGH work here)*

**MEDIUM**

- [x] 213. The post-fight gate does not hold an item award, so loot is takeable before the fight
- [x] 214. A visit-box redirect does not hold the section body, so a one-time reward is re-takeable
- [x] 216. `<if ticks="N">` after an in-section `<tick>` reads the pre-tick count, so "now ticked" branches never fire
- [x] 226. An open `<lose item="?">` forfeit is taken with no picker, so the engine chooses which possession leaves
- [x] 229. A `<group>` commits an open `<lose item="?">` with no picker, so a printed "decide which item" is ignored
- [x] 230. A collapsed `<group>` drops its `<adjustmoney>` child, so §2.134's whole gamble pays nothing

**LOW**

- [x] 215. A self-closing effect tag renders no words, so published sentences print with a hole
- [x] 217. A visit-box redirect below the section head still leaves both exits live (book1/91)
- [x] 218. The Adventure Sheet chips a blessing by its XML key, not the name the book prints
- [x] 219. `<sold>` fires on a sale but its documented twin `<bought>` does nothing on a purchase
- [x] 220. The documented headless-dump command runs nothing from an MSYS shell, so a stale dump reads as a pass
- [x] 221. A single flag-linked `<resurrection>` ignores the payment and renders a free Arrange button
- [x] 222. `ownsSoleLinkedBlessing` reads a linked `<lose blessing>` as a purchase, so a payment that STRIPS a blessing is refused
- [x] 223. A choose-one cost is payable when every linked reward is refused, so the payment is deferred rather than spent
- [x] 224. A `price=`/`flag=` key strips an open ability loss of its chooser, so the engine picks which ability the player forfeits
- [x] 225. The "pay to spin" cost is the third payment path that commits an open ability loss with no chooser
- [x] 227. A wordless `<curse>`/`<disease>`/`<poison>` prints no name, so its printed sentence has a hole
- [x] 228. `showForfeitPicker` can only answer for one item, so a `multiple=` forfeit it offers would under-charge

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
- [x] 220. The documented headless-dump command runs nothing from an MSYS shell, so a stale dump reads as a pass

---

> **Completed task details (tasks 1–211) are archived** in [`TASKS-archive.md`](TASKS-archive.md) (tasks 141, 165, 211) to keep this file focused on open work. The checklist above still carries every task's stable ID and status; a done task's detail lives in the archive under the same `## <N>.` heading. The details for tasks 212–220 are still below, awaiting the next re-archive pass; the Review log follows them.

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

## Review log

*Running audit log of the backlog — each pass re-verifies the open items against
the current code and records what was filed, split, or re-confirmed. Task
numbers refer to the contents checklist at the top of the file.*

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
