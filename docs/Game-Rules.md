# Game Rules

[Home](Home.md) | Prev: [Playing the Game](Playing-the-Game.md) | Next: [The Books](The-Books.md)

The rules **as this port implements them**. Where the printed books and the original Java
engine (JaFL) differ, the port follows the engine, because the engine is what the books
were played through. The implementation lives in the DOM-free rule modules described in
[Architecture](Architecture.md).

---

## Abilities

Six abilities, each scored 1 to 12 on the sheet:

| Ability | What it is |
|---|---|
| Charisma | the knack of befriending people |
| Combat | the skill of fighting |
| Magic | the art of casting spells |
| Sanctity | the gift of divine power and wisdom |
| Scouting | the techniques of tracking and wilderness lore |
| Thievery | the talent for stealth and lockpicking |

Two different numbers are meant by "your Combat", and confusing them is the most common
source of rules bugs in this codebase:

- The **written score** is the number in the box on the sheet. It is what
  `<gain>`/`<lose ability=>` moves, and it is **clamped to 1..12**.
- The **effective score** is the written score plus every bonus in play - weapon or tool,
  item aura, god, potion - minus affliction penalties. It has a **floor of 1 and no
  ceiling**: the 12 is a limit on what the sheet can hold, not on what a weapon can add.
  A Warrior at Combat 8 wielding book 4's white sword (+8) fights at 16.

Markup can ask for a specific reading through `modifier=`, and all six modes are honoured
by every reader (see [XML Tag Reference](XML-Tag-Reference.md)):

`affected` (the default), `natural`, `current`, `noarmour`, `notool`, `noweapon`.

An unknown `modifier=` value would silently fall through to the full affected score - the
very score a `natural` site exists to exclude - which is why the value set is a closed
allowlist in the build gate.

---

## Rolls

| Roll | Rule |
|---|---|
| **Ability check** | `2d6 + affected ability > Difficulty` succeeds. Equalling the Difficulty fails. |
| **Rank check** | `dice + add + adjust <= current Rank` succeeds. |
| **Training** | `2d6 > your natural score` succeeds, and permanently raises that ability by +1. It is checked against the **natural** score, so bonuses cannot buy training. |
| **Outcome table** | Roll `N`d6 and map the total onto ranges - `0-4`, `1,2`, `11`, `14+`. |

`<adjust>` nodes attached to a roll modify it conditionally - on crew, ship, god, item,
codeword or rank - and are read by `<random>`, `<difficulty>`, `<rankcheck>`, and by
`<gain>`/`<lose>` for their amount ("subtract your armour from the wound").

`?seed=` in the URL makes every roll on that page load deterministic, which is how a bug
report becomes reproducible.

---

## Combat

You attack with `2d6 + Combat` against the foe's Defence. **The excess is the damage**;
equalling the Defence does nothing.

The foe strikes back against your Defence:

```
Defence = Combat (including weapon bonus)
        + Rank
        + best armour bonus
        + item auras that boost Defence directly
        - affliction penalties naming Defence
        + god-granted Defence effects
```

Defence is **derived, never stored**, so it moves the instant anything feeding it moves.

Other combat rules in force: initiative and `playerFirst`, multiple attacks per round,
group battles, fleeing (only where the section allows it), `<fightdamage>` effects that
fire when the enemy wounds you, and per-fight attack or Defence bonuses that never survive
the fight or a save. **Stamina 0 is death.**

Death is not always final - some sections offer a resurrection deal with a god, which the
engine models as a standing arrangement rather than a one-off.

---

## Economy

- **Markets** buy and sell items, weapons, armour, tools, ships, cargo and crew upgrades.
  Crew improves **one grade at a time** through poor, average, good, excellent. A crewless
  ship exists in exactly one place in the corpus and sits deliberately off that scale.
- **Inline `<buy>`/`<sell>`** work in prose as well as in a market, including cargo grants
  and cargo-for-cargo barter.
- **Eight commodities** are tradable: grain, furs, metals, minerals, spices, textiles,
  timber, slaves. Ports abbreviate them ("grai", "meta", "timb"), which the engine folds by
  prefix, so the buy-low/sell-high loop between ports works as printed.
- **Three ship types** by cargo capacity: barque (1), brigantine (2), galleon (3).
- **Carry limit is 12 items.** Money is unlimited.
- **Only the best bonus of a kind counts.** Two swords do not stack.

### Money is spent by choice

This is a deliberate departure from a naive reading, and it follows the original engine. A
`<lose>` of Shards or goods in a section that lets you decline - one that offers an
optional "turn back" link - is **not deducted on arrival**. It becomes a click-to-pay
action that blocks the rest of the section until resolved, so turning back costs nothing.

Unavoidable payments and narrative losses (Stamina, codewords, blessings) still apply
automatically.

---

## Bookkeeping

The sheet tracks **codewords, blessings, curses, diseases, poisons, gods, titles, flags,
variables, visit boxes, caches and resurrection deals** - everything the printed game asks
the player to record by hand.

**Ranks** run from 1st upward, titled by rank and gender: Outcast, Commoner, Guildmember,
Master/Mistress, Gentleman/Lady, Baron/Baroness, Count/Countess, Earl/Viscountess,
Marquis/Marchioness, Duke/Duchess, and Hero/Heroine at 11th and above.

**Blessings** are a small fixed set - the six abilities plus defence, disease/poison,
injury, luck, storm(s), travel and wrath. Some are permanent; most are spent on use. A
blessing can be vetoed by the player rather than auto-spent.

---

## Conditionals are shown, not hidden

An `<if>`/`<elseif>`/`<else>` branch whose condition is not met is **greyed out and
disabled, not removed**. This matters for readability: "*If you have the codeword
Ravayne...*" has to stay on screen for the following "If not..." to read correctly. Its
effects do not apply and its links are inert until a later state change makes the
condition hold - at which point the section re-renders and it becomes live.

---

## Per-visit execution

Each section is **re-rendered on every state change**. Passive effects and completed rolls
are memoised per visit by a stable node path, which guarantees:

- a passive effect (money, codewords, stamina) applies **exactly once** per visit;
- conditionals re-evaluate against **live** state after each roll;
- a roll's `<success>`/`<failure>`/`<outcome>` branch appears, and applies its effects,
  only once the roll is actually made.

That per-visit record is serialised into the save, so closing the tab mid-section and
returning resumes the exact visit rather than replaying its effects.
