# Architecture

[Home](Home.md) | Prev: [The Books](The-Books.md) | Next: [Build Pipeline](Build-Pipeline.md)

Plain HTML, CSS and ES modules. No framework, no bundler, no npm, no runtime
dependencies. The only tooling in the repository is the offline build step, which the
shipped app never needs.

---

## The invariant: keep the rules out of the view

This is the architectural rule everything else follows from.

**Game logic lives in DOM-free modules.** **View construction lives in `render*.js`
modules**, which only build DOM and wire clicks, delegating every rule to a DOM-free
module.

> Do not put game logic in a view module, and do not import a browser or DOM global into a
> rule module.

The payoff is that the rules are testable headlessly - `web/_test.html` exercises combat,
economy, rolls and effects directly, without a DOM. The seam is not merely documented, it
is **enforced in CI**: `node web/tests/node-import.mjs` walks each rule module's import
graph, fails on anything reaching a browser-touching module, then really imports all seven
and calls into them.

The subtlest consequence: a rule module that needs the bundled-book list reads
**`edition.js`**, never `data.js`, because `data.js` constructs a `DOMParser` at module top
level. `edition.js` exists solely to be the import-free registry that `data.js` writes and
the rule modules read.

---

## Module map

The authoritative responsibility table is in [`README.md`](../README.md#how-it-works). This
is the same set grouped by layer.

### Rule modules (no DOM)

| Module | Responsibility |
|---|---|
| `engine.js` | The rules core: dice, `<if>` evaluation, passive effects, die-roll modifiers, roll resolution, rest, resurrection deals. |
| `combat.js` | Combat resolution - building an enemy, attack rounds, initiative, damage, `<fightdamage>`. |
| `market.js` | The economy - buying and selling goods, weapons, armour, ships, cargo, crew upgrades. |
| `state.js` | The Adventure Sheet model, derived stats (affected abilities, Defence), and `localStorage` save slots. |
| `rules.js` | Static constants: abilities, professions, rank titles, ship types, cargo, limits. |
| `edition.js` | Which books this build bundles. Tiny and import-free. |
| `render-rules.js` | Section-render *decisions* the renderer used to encode inline: blessing veto/spend, guarded-loss rules, reward and payment eligibility. |
| `render-gates.js` | Navigation-gate computation - which onward navigations to hold behind an unresolved fight, mandatory roll or forced transfer. |
| `visit-state.js` | The per-visit execution context and return-frame serialisation, so a save resumes the exact visit. |
| `render-util.js` | Dependency-free display helpers shared by the view modules. |
| `sw-cache.js` | The service worker's cache-namespace policy. Loaded by `sw.js` via `importScripts`. |

### View modules

| Module | Responsibility |
|---|---|
| `render.js` | The `Story` facade and the core section walk. Turns a `<section>` tree into interactive DOM. |
| `render-rolls.js` | Dice widgets and the success/failure/outcome reveal. |
| `render-rewards.js` | Passive effects, payments, rewards, item awards. |
| `render-choices.js` | The choices table, `<goto>`/`<return>` links, the sail-ship chooser. |
| `render-combat.js` | Battle widgets and per-round Attack/Flee/blessing controls. |
| `render-market.js` | Markets, inline buy/sell, rest, caches, transfers, resurrection deals. |

Each view module takes the story first and is otherwise a set of plain functions.

### Shell

| Module | Responsibility |
|---|---|
| `app.js` | Bootstrap, screens, routing, character creation, death and resurrection, saves. |
| `ui.js` | Adventure-Sheet panel, dice animation, modals, toasts. |
| `data.js` | Loads the bundled JSON, parses section XML, exposes `getSection(book, n)`. Publishes the book list into `edition.js`. |
| `tts.js` | Narration. Self-contained and optional - every integration point in `app.js` is tagged `[TTS]`, so deleting the module and those lines removes the feature cleanly. |
| `version.js` | The build stamp. **Generated - never hand-edit.** |

---

## How a section becomes a screen

There is **no lossy XML-to-JSON transform**. The build bundles the section XML as text; the
browser parses it with `DOMParser` and walks the tree into DOM, so the mixed
prose-and-logic structure of the books is preserved exactly.

```
books/book1/20.xml            source XML (prose + rules markup)
  -> build-data.ps1           validate, LF-normalise, bundle as text
  -> web/data/book1.json      section text, verbatim
  -> data.js                  DOMParser -> a <section> tree
  -> render.js (Story)        walk the tree, build DOM, wire clicks
       -> render-*.js             build the widgets
            -> engine/combat/market   decide the rules
                 -> state.js             mutate the sheet
                      -> re-render        the whole section, from the top
```

That last arrow is the important one.

---

## The re-render model

Each section is **re-rendered from scratch on every state change**. Rather than patching
the DOM in place, the walk runs again and consults live state at every node.

Correctness then depends on one mechanism: passive effects and completed rolls are
**memoised per visit by a stable node path**. That gives three guarantees:

1. A passive effect applies **exactly once** per visit, however many re-renders happen.
2. Conditionals re-evaluate against **live** state after each roll.
3. A roll's `<success>`/`<failure>`/`<outcome>` branch appears - and applies its effects -
   only once the roll is actually made.

`visit-state.js` owns that record and can flatten it into a save and rebuild it on load,
which is what lets a closed tab resume mid-section instead of replaying the section's
effects.

Two behaviours follow the original Java app rather than a simpler implementation:
**conditionals are greyed out, not hidden**, and **money is spent by choice**. Both are
explained in [Game Rules](Game-Rules.md), and both are load-bearing - a "simplification"
of either breaks printed sections.

---

## Storage and offline

| Key | Holds |
|---|---|
| `fl_save_<slot>` | One save, slots 0-19. |
| `fl_meta` | The slot index the save-picker reads. |

Saves carry a schema version and are sanitised and migrated on load, so an older save still
opens. Every field is re-validated rather than trusted, since a save is a file a player can
hand-edit.

Offline caching is confined to the `fl-` cache namespace. Obsolete caches are pruned **only
after a new install verifiably completes**, so an interrupted upgrade cannot leave a
half-cached game, and a co-hosted app's caches on the same origin are never touched.

---

## Where to add things

| Adding | Goes in |
|---|---|
| A new rule or a rule fix | a DOM-free module, plus assertions in the owning test suite |
| A new widget or layout | a `render-*.js` view module |
| A new tag or attribute in the corpus | the allowlist in `build/validate-source.ps1`, **in the same change** as the engine support |
| A new constant | `rules.js` |
| A new screen or route | `app.js` |
