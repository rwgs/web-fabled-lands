# XML Tag Reference

[Home](Home.md) | Prev: [Contributing](Contributing.md) | Next: [Corpus Census](Corpus-Census.md)

The vocabulary the source XML may use. This is a **closed allowlist**: the build gate
rejects anything not listed, so a typo fails the build instead of shipping as a silent
no-op.

**The authority is [`build/validate-source.ps1`](../build/validate-source.ps1)**, which
carries the tables below plus the reasoning behind individual entries. This page is a
readable index of it. If the two disagree, the script is right and this page needs fixing.

For the *original* JaFL specification - which this port implements a subset of, with a few
deliberate differences - see [`rules/JaFL-XML-Tags.md`](../rules/JaFL-XML-Tags.md) and
[`rules/JaFL-XML-Intro.md`](../rules/JaFL-XML-Intro.md).

---

## How to read this

Each row lists a tag and **every attribute it may carry, across all four kinds of source
file**: book sections, `Adventurers.xml`, the rules prose, and the pregen biographies. It
is a union rather than one table per kind - the root-element check already separates the
kinds, and a stray `<gold>` in a section file is harmless while a **misspelled** tag or
attribute is not.

Attributes are listed alphabetically, as in the source.

---

## Prose and structure

| Tag | Attributes |
|---|---|
| `p`, `b`, `i` | none |
| `h3`, `h4`, `table`, `tr`, `td` | none (used by the rules prose files) |
| `desc`, `text`, `flee`, `reroll`, `else`, `choices` | none |
| `section` | `boxes dock image name profession start tag todock` |
| `sectionview` | `random title` |
| `header` | `header1 header2 header3 type` |
| `image` | `book file title` |
| `field` | `label name text` |

---

## Navigation and conditions

| Tag | Attributes |
|---|---|
| `choice` | `book box currency dead flee god item pay profession revisit sail section shards tags` |
| `goto` | `book dead force hidden price sail section visit` |
| `extrachoice` | `atbook atsection book key remove section tag text` |
| `bookchange` | `name once` |
| `if` | `ability armour blessing bonus book cache cargo codeword crew curse dead dice disease docked equals gender god greaterthan group item lessthan modifier name not poison profession resurrection safeAddGod shards ship tags ticks title tool using var weapon` |
| `elseif` | `codeword crew equals god hidden item lessthan profession ship ticks title var weapon` |
| `group` | `force` |
| `while` | `var` |
| `return` | `force` |
| `include` | `armour weapon` |
| `exclude` | `bonus item reason tags` |

`<bookchange>` registers a standing rule, keyed by `name=`, whose body is the effect a
**change of book** pays - section 5.681's spun-gold hair charges 20 Shards whenever you
travel to another book. `once="t"` makes it fire only once; `<lose bookchange=>` lifts it.

---

## Rolls

| Tag | Attributes |
|---|---|
| `random` | `dice flag force type var` |
| `difficulty` | `ability flag force hidden level modifier var` |
| `rankcheck` | `add dice` |
| `training` | `ability add dice var` |
| `outcomes` | `flag var` |
| `outcome` | `blessing book codeword flag range section var` |
| `success` | `ability book section var` |
| `failure` | `book section var` |

---

## Rewards, costs and state

| Tag | Attributes |
|---|---|
| `gain` | `ability amount blessing codeword crew flag force hidden price shards title` |
| `lose` | `ability amount armour blessing bonus bookchange cache cargo chance choose codeword crew curse disease fatal flag force god group hidden item itemAt multiple poison price resurrection shards ship stamina staminato tags title using weapon` |
| `tick` | `ability addbonus addtag amount blessing bonus cache cargo codeword count crew effect flag force god hidden item name permanent price profession quantity removetag shards special tags title titleAdjust titlePattern titleValue using weapon` |
| `set` | `cache codeword dock force hidden item modifier success tags value var weapon` |
| `adjust` | `ability amount codeword crew default god greaterthan item modifier name profession ship tags title titleVal value` |
| `adjustmoney` | `cache force multiply name` |
| `transfer` | `armour bonus force from hidden item limit price shards to weapon xarmour xgroup xitem` |
| `rest` | `hidden shards stamina` |
| `resurrection` | `book flag god hidden section shards supplemental text unique` |
| `curse` | `cumulative lift name` |
| `disease` | `name` |
| `poison` | `name` |
| `effect` | `ability bonus description divide target text type uses verb` |

`unique="t"` on `<resurrection>` is this port's name for a **printed** exclusion on one
offer - section 1.597's free deal is offered "if you do not have one already". The
engine's default is the sheet's replacement rule (a new deal cancels the old), so only a
page printing the exclusion carries this, never the 14 offers that print the replacement
rule.

---

## Possessions, markets and caches

| Tag | Attributes |
|---|---|
| `item` | `buy buytags flag force group hidden name quantity replace sell tags verb` |
| `items` | `group limit` |
| `weapon` | `bonus buy buytags flag force group name profession quantity replace sell tags` |
| `armour` | `bonus buy buytags group name quantity sell` |
| `tool` | `ability bonus buy flag group name replace sell` |
| `market` | `buy currency sell` |
| `buy` | `ability bonus cargo crew flag force initialCrew item name quantity shards ship tags tool` |
| `sell` | `cargo item price quantity shards` |
| `bought` | `item tags` |
| `sold` | `item tags` |
| `trade` | `buy cargo initialCrew name quantity sell ship` |
| `itemcache` | `itemlimit max name text` |
| `moneycache` | `max multiples name text withdrawCharge` |

`<bought>` is the documented twin of `<sold>` and fires on a purchase.

---

## Combat

| Tag | Attributes |
|---|---|
| `fight` | `abilityDamaged attackDice attacks combat defence flee group modifiers name playerDefence playerFirst preDamage stamina staminaLost useCache` |
| `fightdamage` | `type` |
| `fightround` | `pre` |

`modifiers=` is a token **list**, not an enum. The only token today is `noarmour`, and it
must be kept in step with `combat.js`'s fight parser.

---

## Adventurers.xml

| Tag | Attributes |
|---|---|
| `adventurers`, `starting`, `abilities` | none |
| `adventurer` | `gender name profession` |
| `profession` | `name` |
| `rank` | `amount` |
| `stamina` | `amount` |
| `gold` | `amount` |

---

## Enumerated values

A value may be a `|`-separated union, and `?` / `*` are JaFL's match-any wildcards.

| Attribute | Legal values |
|---|---|
| `ability`, `abilityDamaged` | `charisma combat magic sanctity scouting thievery rank stamina defence` |
| `blessing` | `charisma combat magic sanctity scouting thievery defence disease poison injury luck storm storms travel wrath` |
| `choose` | `t f true false best` |
| `crew` | `poor average good excellent` (or an integer delta) |
| `gender` | `m f male female` |
| `modifier` | `affected current natural noarmour notool noweapon` |
| `profession` | `mage priest rogue troubadour warrior wayfarer` |
| `ship` | `barque brigantine galleon brig gall galley t` (`t` means "any ship") |
| `special` | `armourlock attack defence difficultyCurse difficultyRestore godless lock unlock weaponlock` |
| cargo values | `grain furs metals minerals spices textiles timber slaves`, or an unambiguous prefix |
| `codeword` | any codeword declared in a `books/book<N>/book.ini` `Codewords=` list (all six, unioned) - plus a section-scoped bookkeeping flag (`^\d+[./]...`, e.g. `2.567.1a`, `5/520`), one of the port's own named state flags, or a codeword printed in the unpublished books 7-12. See [Build Pipeline](Build-Pipeline.md#the-source-xml-gate). |

**Truth-flag attributes** - `force hidden dead not using sail start revisit cumulative once
permanent supplemental unique visit playerFirst fatal` - take `t`, `f`, `true` or `false`.
The books write both letters and words.

### `type` means something different on each tag

| Tag | Legal `type=` values |
|---|---|
| `effect` | `ability aura use wielded` |
| `fightdamage` | `add replace` |
| `header` | `armour cargo magic other ship ships shipsale weapon` |
| `random` | `travel` |

---

## Notes on the tricky ones

### `modifier=` is the dangerous attribute

Every reader treats an unknown `modifier=` value as "no modifier at all", which falls
through to the affected score - **the very score a `natural` site exists to exclude**. A
misspelling therefore makes the check *easier* than the page prints it, silently, and
neither the build nor the tests would previously notice. The attribute *name* was
allowlisted from the start; only the value set was missing, which is how it went
unnoticed.

All six modes are honoured on every tag that accepts the attribute, routed through one
reader (`state.js`'s `abilityForMode`) so no tag can drift from the others. `current`
stays tag-restricted, because it means "the wounded Stamina" and only the two tags that
roll or read a stat have anywhere to put it.

One deliberate difference from the JaFL spec: `affected` is **not** in the spec - it is
this port's explicit spelling of the default, and the corpus uses it once.

### `<adjust>` has a fixed set of readers

Only five tags read an `<adjust>` child: the three roll nodes - `<random>`,
`<difficulty>`, `<rankcheck>` - plus `<gain>` and `<lose>`, whose `amount=` and `stamina=`
take the same conditional modifiers ("subtract your armour from the wound"). The build
gate checks this structurally, so an `<adjust>` placed under a tag that would ignore it is
a build failure rather than a silent no-op.

### Ship and cargo abbreviations are legal

Ports abbreviate commodity names on trade rows - `grai`, `meta`, `timb` - and the engine
folds any **unambiguous prefix** to the full name at every buy, sell, match and manifest
point. No two commodities share a four-letter prefix in this corpus. Ship types abbreviate
the same way (`brig`, `gall`).

### Crew has four grades, and one ship has none

`poor average good excellent` is an **ordinal** scale that four separate readings index -
`<lose crew="N">`'s demotion floor most of all, which 14 sections lean on in print ("A
poor crew can't get any worse!", section 3.231). The corpus's one crewless vessel
(section 5.192) is held deliberately **off** that scale rather than as a fifth grade, so
each reading already says "not a grade" without a widened array changing the other three.

---

## Adding to the vocabulary

Add the tag, attribute or value here **in the same change** that teaches the engine to
read it. Then run `build/validate-selftest.ps1`, which drives the gate over mutation
fixtures to prove each class of mistake still fails - the real corpus is clean, so a gate
that quietly stopped catching typos would look identical to a passing build.
