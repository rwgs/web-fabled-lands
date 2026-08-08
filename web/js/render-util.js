// render-util.js — small, dependency-free display helpers shared by the renderer and
// its responsibility-split view modules (task 119). Kept separate so a view module
// (render-combat/market/actions) can import these without importing render.js, which
// would create a cycle. Pure string/label formatting — no DOM, no state.

// Column titles for a <market>'s <header type="…"> dividers.
export const MARKET_TITLES = {
  ship: 'Ships for sale', shipsale: 'Sell a ship', cargo: 'Cargo', armour: 'Armour',
  weapon: 'Weapons', magic: 'Magical equipment', other: 'Goods for sale',
};

// Title-case each word, but NOT the letter after an apostrophe: a word boundary sits there,
// so a plain /\b\w/ turns the corpus's possessive item names into "Ghoul'S Head". (task 212)
export function titleCase(s) { return (s || '').replace(/(^|[^\w'’])(\w)/g, (m, pre, c) => pre + c.toUpperCase()); }

export function diceWord(n) { return n === 1 ? '1 die' : `${n} dice`; }

export function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

// The parenthetical bonus tier shown after an item's name: " (Combat +2)" for a weapon,
// " (Defence +1)" for armour, " (Thievery +1)" for an ability tool, " (+N)" otherwise. Empty
// for a zero/absent bonus (a plain item shows just its name). The single canonical bonus-text
// builder — callers keep their OWN name casing (raw on the sheet, title-cased in shops/awards)
// and only fold in this suffix, so the wording and the omit-zero rule can't drift. (task 170)
export function bonusSuffix(kind, bonus, ability) {
  const b = Number(bonus) || 0;
  if (!b) return '';
  if (kind === 'weapon') return ` (Combat +${b})`;
  if (kind === 'armour') return ` (Defence +${b})`;
  if (kind === 'tool' && ability) return ` (${titleCase(ability)} +${b})`;
  return ` (+${b})`;
}

// A short display label for a stored item (name + its bonus tier, like an award).
export function itemLabel(it) {
  return titleCase(it.name || it.kind || 'item') + bonusSuffix(it.kind, it.bonus, it.ability);
}

// The name a book prints for a blessing the XML (and the save) names only by its canonical
// key. JaFL's Blessing.getContentString: the six ability blessings show the ability in caps,
// the rest their printed name. Keyed on the canonical spellings state.js folds the aliases
// into, and on the aliases themselves so a raw XML spelling ("storms", "poison") reads the
// same. The single canonical blessing-label builder — section prose, the Adventure Sheet, a
// choose-one reward and a reroll offer all print through it, so they cannot drift apart.
// The STORED key never changes (saves, `<if blessing=…>` and the alias folding all key on
// it); only the display does. (task 215, shared in task 218)
const BLESSING_WORDS = {
  storm: 'Safety from Storms', storms: 'Safety from Storms',
  disease: 'Immunity to Disease/Poison', poison: 'Immunity to Disease/Poison',
  defence: 'Defence through Faith', injury: 'Immunity to Injury',
  luck: 'Luck', travel: 'Safe Travel', wrath: 'Divine Wrath',
};
export function blessingLabel(spec) {
  const k = String(spec == null ? '' : spec).trim().toLowerCase();
  if (!k || k === '*' || k === '?') return ''; // a wildcard names no blessing to print
  return BLESSING_WORDS[k] || k.toUpperCase(); // an ability blessing — MAGIC, SCOUTING…
}
