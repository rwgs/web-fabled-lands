// rules.js — static game constants for Fabled Lands.
// Character starting data is data-driven (parsed from each book's Adventurers.xml);
// this file only holds things that never change.

export const ABILITIES = ['charisma', 'combat', 'magic', 'sanctity', 'scouting', 'thievery'];

export const ABILITY_LABEL = {
  charisma: 'Charisma',
  combat: 'Combat',
  magic: 'Magic',
  sanctity: 'Sanctity',
  scouting: 'Scouting',
  thievery: 'Thievery',
};

export const ABILITY_BLURB = {
  charisma: 'the knack of befriending people',
  combat: 'the skill of fighting',
  magic: 'the art of casting spells',
  sanctity: 'the gift of divine power and wisdom',
  scouting: 'the techniques of tracking and wilderness lore',
  thievery: 'the talent for stealth and lockpicking',
};

export const PROFESSIONS = ['Priest', 'Mage', 'Rogue', 'Troubadour', 'Warrior', 'Wayfarer'];

export const ABILITY_MIN = 1;
export const ABILITY_MAX = 12;

// Rank titles (index 0 => 1st Rank). 11th Rank and above are "Hero/Heroine".
const RANK_TITLES = [
  ['Outcast', 'Outcast'],
  ['Commoner', 'Commoner'],
  ['Guildmember', 'Guildmember'],
  ['Master', 'Mistress'],
  ['Gentleman', 'Lady'],
  ['Baron', 'Baroness'],
  ['Count', 'Countess'],
  ['Earl', 'Viscountess'],
  ['Marquis', 'Marchioness'],
  ['Duke', 'Duchess'],
  ['Hero', 'Heroine'],
];

export function rankTitle(rank, male) {
  const idx = Math.min(Math.max(rank, 1), RANK_TITLES.length) - 1;
  const pair = RANK_TITLES[idx];
  return male ? pair[0] : pair[1];
}

export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Ship types: capacity (cargo slots)
export const SHIP_TYPES = {
  barque: { label: 'Barque', capacity: 1 },
  brigantine: { label: 'Brigantine', capacity: 2 },
  galleon: { label: 'Galleon', capacity: 3 },
};

// The books abbreviate ship types on some rows (<trade ship="brig">, "gall").
// Canonicalise to the full SHIP_TYPES key so capacity and <if ship=…> checks
// agree. (Task 24 wires this into the trade rows and conditions too.)
const SHIP_TYPE_ALIASES = { brig: 'brigantine', gall: 'galleon', galley: 'galleon' };
export function canonShipType(t) {
  const k = String(t || '').trim().toLowerCase();
  return SHIP_TYPE_ALIASES[k] || k;
}

export const CREW_LEVELS = ['poor', 'average', 'good', 'excellent'];
// A ship with NO crew — §5.192's <buy ship="brig" initialCrew="none"/>, the corpus's only
// crewless vessel, whose harbourmaster then charges 25 Shards to hire a poor one. Held
// deliberately OFF the ordinal rather than as a fifth CREW_LEVELS entry: four readings index
// that array, and widening it would move every one of them — <lose crew="N">'s demotion floor
// most of all, which 14 sections lean on in print ("A poor crew can't get any worse!", §3.231),
// and value="crew"'s 1-based index that §4.658's oldcrew round-trips. Off the scale, indexOf
// returns -1 and each reading already says "not a grade": <if crew="poor"> is false,
// value="crew" is 0, and canUpgradeCrew's `have === target - 1` makes poor — and only poor —
// the grade a crewless captain may hire. (task 267)
export const NO_CREW = 'none';
export const CREW_LABEL = { poor: 'Poor', average: 'Average', good: 'Good', excellent: 'Excellent' };

// The eight tradable commodities (JaFL's Cargo enum). Markets and the Ship's Manifest
// store the canonical name; several ports abbreviate their trade rows (§4.252, §5.145/
// §5.225 use "grai"/"meta"/"mine"/"spic"/"text"/"timb"/"slav"; §5.447 sells "mineral"),
// and JaFL's Ship.getCargo matches by prefix — so canonCargo folds any prefix to the full
// name at every buy/sell/match/manifest point, keeping the buy-low/sell-high loop between
// ports alive. Unambiguous in this corpus: no two commodities share a 4-letter prefix. (task 127)
export const CARGO_TYPES = ['grain', 'furs', 'metals', 'minerals', 'spices', 'textiles', 'timber', 'slaves'];
export function canonCargo(name) {
  const n = String(name || '').trim().toLowerCase();
  if (n === '' || n === '?' || n === '*') return n; // wildcards / "any cargo" pass through
  if (CARGO_TYPES.includes(n)) return n;
  return CARGO_TYPES.find((c) => c.startsWith(n)) || n; // unknown: leave as-is
}

export const MAX_ITEMS = 12;

/** The WRITTEN ability score — the number in the box on the Adventure Sheet, which
 *  `<gain|lose ability=>` moves. Bounded 1..12: "your abilities can increase up to a
 *  maximum of 12. They can never go lower than 1" (`rules/Rules.xml`, "Are there any
 *  limits on abilities?"). Use this only where the written score is being SET. */
export function clampAbility(v) {
  return Math.max(ABILITY_MIN, Math.min(ABILITY_MAX, v));
}

/** The EFFECTIVE score — the written score plus the weapon/tool, aura, god, potion and
 *  affliction terms, as a roll or a check reads it. Floor of 1, and NO ceiling: the 12 is
 *  a limit on what the sheet can hold, not on what a weapon can add to it, so a book5/6
 *  Warrior at COMBAT 8 with book4/103's white sword (+8) fights at 16. JaFL agrees —
 *  `EffectSet.adjustAbility` ends `return Math.max(1, value)`, pegging the minimum alone
 *  ("this stops curses from lowering an early character's stats below 1") and capping
 *  nothing. Capping the sum instead made every weapon above +4 partly or wholly worthless
 *  to a high-COMBAT character, which is not a game that sells a +8 sword. (task 311) */
export function floorAbility(v) {
  return Math.max(ABILITY_MIN, v);
}
