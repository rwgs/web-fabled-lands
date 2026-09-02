// market.js — headless economy rules: buying/selling goods, ships, cargo, crew.
//
// Pure game logic operating on a GameState. Each transaction mutates state and
// returns { ok, note? } so the renderer can decide whether to redraw and what
// (if anything) to toast. No DOM — unit-testable headlessly.

import { makeItem, parseTags, splitItemName, isShardsCurrency, normalize } from './state.js';
import { SHIP_TYPES, CREW_LEVELS, NO_CREW, canonShipType, canonCargo } from './rules.js';
import { resolveValue, readItemEffects } from './engine.js';

const shipCap = (type) => SHIP_TYPES[canonShipType(type)]?.capacity || 1;
/** How many Cargo Units a hull of `type` holds — the view needs it to caption a vessel's
 *  remaining space in the which-ship picker. (task 342) */
export function shipCapacity(type) { return shipCap(type); }

// ---- which vessel changes: the buy-side selection boundary (task 342) --------
// The reference model treats this as a QUESTION, not a default. With several local ships
// eligible, TradeNode.actionPerformed refuses to guess and says so — "You have multiple ships
// with free space docked here. Select one.", the same for a crew grade and for the hold a
// cargo sale comes out of. It can afford to, because its ship table carries a persistent
// selection; this port has none, so the equivalent is an inline picker, and these three plans
// are what it asks about.
//
// All three return the sellPlan shape — { candidates, needsChoice } — plus an { ok, reason }
// verdict, because unlike a sale these offers can be refused outright (no ship here, no space,
// no crew one grade below) and the view already gates its button on that reason.
//
// The two BUY plans list currentShip() first when it qualifies, so the answer a caller that
// asks nothing gets is the vessel the rest of the section is already talking about — the same
// hull `<if crew=>` and `<if cargo=>` read, and literally the one the old code picked. At a
// dock that is shipsHere()[0] either way; at sea it is the ship being SAILED rather than a
// prize taken alongside, which is the case the plain array order would have quietly changed.
// The sell plan keeps sellCandidates' emptiest-hold-first order instead, for the reason that
// ordering exists: the least damaging hold to trade out of.
const currentFirst = (state, ships) => {
  const cur = state.currentShip();
  const at = cur ? ships.indexOf(cur) : -1;
  return at > 0 ? [cur, ...ships.filter((s) => s !== cur)] : ships;
};

/** The vessels HERE that could take one more Cargo Unit. */
export function cargoBuyPlan(state) {
  const here = state.shipsHere();
  const candidates = currentFirst(state, here.filter((s) => (s.cargo || []).length < shipCap(s.type)));
  if (!candidates.length) {
    return { candidates, needsChoice: false, ok: false, reason: here.length ? 'No cargo space.' : 'You have no ship here.' };
  }
  return { candidates, needsChoice: candidates.length > 1, ok: true, reason: null };
}

/** Whether a ship at the player's current location has room for one Cargo Unit. */
export function hasCargoSpace(state) {
  return cargoBuyPlan(state).ok;
}

/** The vessels HERE whose crew is exactly one grade below `crew` — the ones this upgrade can
 *  legally be spent on (crews improve one grade at a time, task 24; the reference picks the
 *  same set with findShipsWithCrew(toCrew-1)). Reading the FLEET rather than currentShip() is
 *  the fix: two local ships of different grades used to make a valid upgrade look unavailable,
 *  because only the first vessel was consulted — and when it did apply, it applied to that
 *  first vessel whether or not it was the eligible one. A crewless ship (NO_CREW, off the
 *  ordinal) indexes to -1, one below `poor`, so §5.192's printed "25 Shards gets a poor crew"
 *  is the one hire it can make. (tasks 267 + 342) */
export function crewUpgradePlan(state, crew) {
  const here = state.shipsHere();
  if (!here.length) return { candidates: [], needsChoice: false, ok: false, reason: 'You have no ship.' };
  const target = CREW_LEVELS.indexOf(canonCrew(crew));
  if (target < 0) return { candidates: [], needsChoice: false, ok: false, reason: 'Unknown crew grade.' };
  const candidates = currentFirst(state, here.filter((s) => CREW_LEVELS.indexOf(s.crew) === target - 1));
  if (!candidates.length) {
    // Both refusals keep their pre-342 wording, which stays accurate for a fleet: either every
    // local vessel already has that grade or better, or none has yet reached the grade below.
    const reason = here.every((s) => CREW_LEVELS.indexOf(s.crew) >= target)
      ? 'Your crew is already at least that good.'
      : `Your crew must be ${CREW_LEVELS[target - 1]} first.`;
    return { candidates, needsChoice: false, ok: false, reason };
  }
  return { candidates, needsChoice: candidates.length > 1, ok: true, reason: null };
}

/** The vessels HERE a `<sell cargo>` could take a Unit out of: those carrying the named
 *  commodity, or — for the open `cargo="?"` of §3.538's swap — any with a non-empty hold.
 *  Emptier holds first, matching sellCandidates' cargo ordering. (task 342) */
export function cargoSellPlan(state, cargoType) {
  const open = cargoType == null || cargoType === '?' || cargoType === '';
  const want = open ? null : canonCargo(cargoType);
  const candidates = state.shipsHere()
    .filter((s) => (open ? (s.cargo || []).length > 0 : (s.cargo || []).some((c) => canonCargo(c) === want)))
    .sort((a, b) => shipLoad(a) - shipLoad(b));
  if (!candidates.length) return { candidates, needsChoice: false, ok: false, reason: 'You have no cargo here to give.' };
  return { candidates, needsChoice: candidates.length > 1, ok: true, reason: null };
}

// The chooser hook every one of the three commits shares, so a headless caller and the view's
// picker speak the same contract as sellTrade's: `chooser(candidates, 1, 'ship')` returns the
// player's answer, and with no chooser (or a single candidate) the first candidate stands.
function chosenShip(plan, opts) {
  if (!plan.candidates.length) return null;
  const pick = (opts && opts.chooser && plan.candidates.length > 1)
    ? (opts.chooser(plan.candidates.slice(), 1, 'ship') || [])[0] : null;
  return pick || plan.candidates[0];
}

// A market's currency= (task 40): Shards is the default purse; any other name is a
// foreign-coin pool (e.g. Mithral). These route a trade's payment/receipt to the
// right store so a <market currency="Mithral"> spends Mithral, never Shards.
const walletBalance = (state, currency) => (isShardsCurrency(currency) ? state.data.shards : state.currencyBalance(currency));
const walletSpend = (state, currency, amount) => { if (isShardsCurrency(currency)) state.adjustMoney(-amount); else state.adjustCurrency(currency, -amount); };
const walletEarn = (state, currency, amount) => { if (isShardsCurrency(currency)) state.adjustMoney(amount); else state.adjustCurrency(currency, amount); };
// Normalise an initialCrew= value from the books to a real crew grade. A literal
// grade maps directly and "none" stays NO_CREW; otherwise (given `state`) resolve it
// as a variable or number first — §4.658 stores the wrecked ship's crew with <set
// var="oldcrew" value="crew"/> (a 1-based CREW_LEVELS index, 0 for a crewless or
// absent vessel) and buys the barque with initialCrew="oldcrew", so the salvaged crew
// must be carried over, not reset to average — including when there was none to
// salvage. A blank or unresolved value falls back to average. (tasks 103, 267)
const canonCrew = (c, state = null) => {
  const raw = String(c || '').trim();
  const k = raw.toLowerCase();
  if (CREW_LEVELS.includes(k)) return k;
  if (k === NO_CREW) return NO_CREW;
  if (state && raw) {
    const n = resolveValue(state, raw);
    if (n === 0) return NO_CREW;
    if (Number.isInteger(n) && n >= 1 && n <= CREW_LEVELS.length) return CREW_LEVELS[n - 1];
  }
  return 'average'; // blanks / unresolved: a serviceable default
};

/** Classify a shop-row element into a goods kind. */
export function shopKind(node) {
  const tag = node.tagName.toLowerCase();
  if (tag !== 'trade') return tag; // armour | weapon | tool | item | cargo
  if (node.hasAttribute('ship')) return 'ship';
  if (node.hasAttribute('cargo')) return 'cargo';
  if (node.hasAttribute('weapon')) return 'weapon';
  if (node.hasAttribute('armour')) return 'armour';
  if (node.hasAttribute('tool')) return 'tool';
  return 'item';
}

/**
 * A plain descriptor of a shop row, so the transaction functions never touch
 * the DOM. `kind` is one of ship|cargo|weapon|armour|tool|item.
 */
export function goodsFrom(node, kind, name, bonus) {
  return {
    kind,
    name,
    bonus: bonus || 0,
    named: node.getAttribute('name') != null, // false => generic goods sold by COMBAT/Defence bonus
    ability: node.getAttribute('ability') || null,
    tags: parseTags(node.getAttribute('buytags') || node.getAttribute('tags')),
    shipType: node.getAttribute('ship') || null,
    // Fold an abbreviated market row (§4.252 "meta", §5.447 "mineral") to the canonical
    // commodity so the manifest, the buy label and cross-port sales all agree. (task 127)
    cargoName: node.getAttribute('cargo') != null ? canonCargo(node.getAttribute('cargo')) : null,
    initialCrew: node.getAttribute('initialCrew') || null,
  };
}

/** Does the player own an item matching this goods descriptor (for selling)?
 *  Ship/cargo sales need the vessel HERE (at this dock / sailing with you) — a ship
 *  or hold berthed at another port cannot be sold remotely (task 89). */
export function ownsGoods(state, goods) {
  const { kind, name, bonus, named, shipType, cargoName } = goods;
  if (kind === 'ship') return state.shipsHere().some((s) => canonShipType(s.type) === canonShipType(shipType));
  if (kind === 'cargo') { const want = canonCargo(cargoName || name); return state.shipsHere().some((s) => (s.cargo || []).some((c) => canonCargo(c) === want)); }
  // Armour is valued purely by its Defence bonus (its tier), so any owned armour of
  // that bonus can be sold at a named row's price — the starting "leather jerkin", a
  // "leather armour", and an armourer's "leather" are all the same bonus-1 leather.
  // A generic (unnamed) weapon is likewise sold by bonus, so you must own one of that
  // bonus — not merely any weapon (else a +0 weapon could be sold at the +3 price).
  if (kind === 'armour' || (kind === 'weapon' && !named)) {
    return state.data.items.some((it) => it.kind === kind && (it.bonus || 0) === bonus);
  }
  return state.findItems(name).some((it) => matchesNamedGoods(it, goods));
}

/** Does an owned possession satisfy a NAMED (non-armour) sale row? The name alone is not
 *  enough: §5.244/§4.417 sell a "silver flute" that is a CHARISMA +2 tool for 360 Shards,
 *  while §5.238's tomb chest holds a plain `<item>` of the same name (upgraded to the real
 *  tool only in §5.118). The row's descriptor is the contract — the possession must be that
 *  kind, carry the stated ability, hold at least the stated bonus, and bear the stated tags.
 *  The books do use the generic `item` kind loosely for things they elsewhere declare as
 *  weapons (§1.452/§2.493 sell a "pickaxe" awarded as a weapon in §3.376/§3.396/§4.248;
 *  §3.715 sells a "golden katana" awarded as a weapon), so an `item` row accepts any kind —
 *  a weapon/tool row does not. A corpus audit found these three names to be the only
 *  cross-kind collisions on a named sale row, and no tag mismatches at all. (task 187) */
function matchesNamedGoods(it, goods) {
  if (goods.kind !== 'item' && it.kind !== goods.kind) return false;
  if (goods.ability && normalize(it.ability || '') !== normalize(goods.ability)) return false;
  if ((it.bonus || 0) < (goods.bonus || 0)) return false;
  const have = (it.tags || []).map(normalize);
  return (goods.tags || []).map(normalize).filter(Boolean).every((t) => have.includes(t));
}

/** Buy `goods` for `price` in `currency` (Shards by default). Mutates state.
 *  Returns { ok, note? }. */
export function buyTrade(state, goods, price, currency = null, opts = {}) {
  if (walletBalance(state, currency) < price) return { ok: false };
  const { kind, name, bonus, ability, tags, effects, shipType, cargoName, initialCrew } = goods;
  if (kind === 'ship') {
    walletSpend(state, currency, price);
    // Berth the new ship at the port it is bought in, so <if docked="…"> sees it (task 73).
    state.addShip({ type: canonShipType(shipType), name: 'Ship', crew: canonCrew(initialCrew, state), cargo: [], docked: state.data.location ?? null });
  } else if (kind === 'cargo') {
    // Load onto a ship HERE (berthed at this port / sailing with you) that has cargo
    // space — never onto a vessel left at another dock (task 89) — and onto the one the
    // player NAMED when several qualify, rather than whichever is first (task 342).
    const plan = cargoBuyPlan(state);
    if (!plan.ok) return { ok: false, note: plan.reason };
    const ship = chosenShip(plan, opts);
    walletSpend(state, currency, price);
    (ship.cargo ||= []).push(canonCargo(cargoName)); // store the canonical commodity (task 127)
    state.changed();
  } else {
    if (state.freeSlots() <= 0) return { ok: false, note: 'You can carry only 12 items.' };
    walletSpend(state, currency, price);
    // A "fur cloak|wolf pelt" row is one item: store it under its first name, with
    // the alternatives as tags so <if item="wolf pelt"> and re-selling match (task 29).
    const { name: itemName, alts } = splitItemName(name);
    state.addItem(makeItem(kind, itemName, bonus, ability, [...tags, ...alts], effects || []));
  }
  return { ok: true };
}

// --- Selling with several candidates: ask which, don't silently take the first (task 134) ---
// JaFL refuses a sell whose matches are non-identical and asks the player to pick ("You have
// multiple ships of this type. Select one…" / "…which one you want to sell."). Taking the
// wrong one is irreversible — a laden ship is sold with its cargo, a quest weapon is gone —
// so we enumerate the matches safest-default first, let the view surface a picker for the
// ambiguous cases (sellPlan.needsChoice), and let headless callers name the exact one via
// opts.chooser.

const shipLoad = (s) => (s.cargo || []).length;
// A "least likely to matter" weight so the no-prompt default keeps the significant item:
// a plain possession outranks one bearing an ability, an <effect>, tags, or an award group.
const itemWeight = (it) => (it.ability ? 1 : 0) + ((it.effects || []).length ? 1 : 0) + ((it.tags || []).length ? 1 : 0) + (it.group ? 1 : 0);

/** Are two sale candidates interchangeable, so which one leaves makes no difference?
 *  Mirrors JaFL Item.matches (name+bonus+tags+group) for carried goods, and adds cargo
 *  load for ships (an empty and a laden vessel of one type are NOT the same sale). */
function sameCandidate(kind, a, b) {
  if (kind === 'ship') {
    return canonShipType(a.type) === canonShipType(b.type)
      && shipLoad(a) === shipLoad(b)
      && normalize(a.name || '') === normalize(b.name || '');
  }
  const tagSet = (it) => (it.tags || []).map(normalize).sort().join(' ');
  return normalize(a.name) === normalize(b.name)
    && (a.bonus || 0) === (b.bonus || 0)
    && (a.ability || null) === (b.ability || null)
    && (a.group || null) === (b.group || null)
    && tagSet(a) === tagSet(b);
}

/** The possessions a sell of `goods` could take, safest-default first. Ships/cargo need the
 *  vessel HERE (task 89). Bonus-valued armour/generic weapon rows draw from every owned item
 *  of that kind+bonus (plainest first); a named row from its name matches; cargo from the
 *  ships HERE carrying the commodity (emptier holds first). */
export function sellCandidates(state, goods) {
  const { kind, name, bonus, named, shipType, cargoName } = goods;
  if (kind === 'ship') {
    const type = canonShipType(shipType);
    return state.shipsHere().filter((s) => canonShipType(s.type) === type).sort((a, b) => shipLoad(a) - shipLoad(b));
  }
  if (kind === 'cargo') {
    const want = canonCargo(cargoName || name);
    return state.shipsHere().filter((s) => (s.cargo || []).some((c) => canonCargo(c) === want)).sort((a, b) => shipLoad(a) - shipLoad(b));
  }
  if (kind === 'armour' || (kind === 'weapon' && !named)) {
    return state.data.items.filter((it) => it.kind === kind && (it.bonus || 0) === bonus).sort((a, b) => itemWeight(a) - itemWeight(b));
  }
  // A named row takes only possessions its descriptor actually describes (task 187) — the
  // same predicate ownsGoods uses, so the row can never offer a sale it cannot complete.
  return state.findItems(name).filter((it) => matchesNamedGoods(it, goods));
}

/** What a sell needs from the view: the `kind`, the ordered `candidates`, and whether the
 *  player must be asked which one — more than one match and they are not all interchangeable
 *  (JaFL's "select which one"), or, for cargo, more than one ship carries it. (task 134) */
export function sellPlan(state, goods) {
  const cands = sellCandidates(state, goods);
  const needsChoice = goods.kind === 'cargo'
    ? cands.length > 1
    : cands.length > 1 && !cands.every((c) => sameCandidate(goods.kind, cands[0], c));
  return { kind: goods.kind, candidates: cands, needsChoice };
}

/** Sell `goods` for `price` in `currency` (Shards by default). Mutates state.
 *  Returns { ok, item? } — `item` is the possession actually removed (for a
 *  carried good), so the caller can fire <sold> hooks against its real tags/name
 *  rather than the shop row's descriptor (task 58). Ship/cargo sells carry no item.
 *  `opts.chooser(candidates, 1, kind)` names the exact possession when several match;
 *  with no chooser the sale takes the safest default (empty ship / plainest item). */
export function sellTrade(state, goods, price, currency = null, opts = {}) {
  const { kind, name, cargoName } = goods;
  const cands = sellCandidates(state, goods);
  if (!cands.length) return { ok: false };
  const pick = (opts.chooser && cands.length > 1) ? (opts.chooser(cands.slice(), 1, kind) || [])[0] : null;
  const target = pick || cands[0];
  if (kind === 'ship') {
    // Sell a vessel that is HERE — one berthed at another port can't change hands (task 89).
    state.ships.splice(state.ships.indexOf(target), 1); walletEarn(state, currency, price); state.changed();
  } else if (kind === 'cargo') {
    const want = canonCargo(cargoName || name);
    target.cargo.splice(target.cargo.findIndex((c) => canonCargo(c) === want), 1); walletEarn(state, currency, price); state.changed();
  } else {
    // Armour (any name) and generic weapons are valued by bonus; a named row by name.
    state.removeItemById(target.id); walletEarn(state, currency, price);
    return { ok: true, item: target };
  }
  return { ok: true };
}

/** Parse a <buy> node into the option bag applyInlineBuy consumes (task 152). The single
 *  home for buy-node parsing, shared by the inline-buy widget (render-market) and a
 *  group's forced buy (runBuyNode) so the two can't drift — both resolve the price against
 *  `state`, canonicalise an abbreviated cargo (task 127) and read |-alt buytags. Reads the
 *  parsed section node; builds no DOM. quantity= is the caller's concern. */
export function buyOptions(node, state) {
  const shards = node.getAttribute('shards');
  const cargo = node.getAttribute('cargo');
  return {
    price: shards != null ? resolveValue(state, shards) : 0,
    crew: node.getAttribute('crew'),
    ship: node.getAttribute('ship'),
    shipName: node.getAttribute('name'),
    initialCrew: node.getAttribute('initialCrew'),
    tool: node.getAttribute('tool'),
    item: node.getAttribute('item'),
    cargo: cargo != null ? canonCargo(cargo) : null,
    bonus: node.getAttribute('bonus') ? parseInt(node.getAttribute('bonus'), 10) : 0,
    ability: node.getAttribute('ability'),
    tags: parseTags(node.getAttribute('buytags') || node.getAttribute('tags')),
    effects: readItemEffects(node),
  };
}

/**
 * Apply an inline <buy> in prose: a crew upgrade, a ship, a tool, a carried
 * item, or a cargo unit. Charges `price`, grants one unit, and returns
 * { ok, note? } so the view can toast a refusal (no money / no room / no ship).
 * The view enforces the quantity= cap (max buys per visit).
 */
export function applyInlineBuy(state, opts = {}) {
  const { price = 0, crew, item, tool, ship: shipType, shipName, initialCrew,
    cargo, bonus = 0, ability = null, tags = [], effects = [] } = opts;
  if (price > 0 && state.data.shards < price) return { ok: false, note: 'Not enough Shards.' };

  if (crew) {
    const up = crewUpgradePlan(state, crew); // one-grade-at-a-time rule (task 34), fleet-wide (342)
    if (!up.ok) return { ok: false, note: up.reason };
    // The grade goes to the vessel the player named, not to currentShip() — which at a dock is
    // simply the first local hull, and so could be a ship the upgrade was never legal on.
    const ship = chosenShip(up, opts);
    if (price) state.adjustMoney(-price);
    ship.crew = canonCrew(crew);
    state.changed();
    return { ok: true };
  }
  if (shipType) {
    if (price) state.adjustMoney(-price);
    state.addShip({ type: canonShipType(shipType), name: shipName || 'Ship', crew: canonCrew(initialCrew, state), cargo: [], docked: state.data.location ?? null });
    return { ok: true };
  }
  if (cargo != null) {
    // capacity — and which hold, when several have room — are both settled in buyTrade
    return buyTrade(state, { kind: 'cargo', cargoName: cargo, name: cargo }, price, null, opts);
  }
  // a carried possession: a tool (with its ability/bonus) or a plain item
  if (state.freeSlots() <= 0) return { ok: false, note: 'You can carry only 12 items.' };
  if (price) state.adjustMoney(-price);
  state.addItem(makeItem(tool ? 'tool' : 'item', tool || item, bonus || 0, ability || null, tags || [], effects || []));
  return { ok: true };
}

/** Whether a crew upgrade to `crew` is allowed right now — the { ok, reason } verdict the view
 *  gates and tooltips its offer on, kept as its own name because that is all most callers want.
 *  crewUpgradePlan holds the rule (and the candidate vessels a picker needs). (tasks 24, 267,
 *  342) */
export function canUpgradeCrew(state, crew) {
  const plan = crewUpgradePlan(state, crew);
  return plan.ok ? { ok: true } : { ok: false, reason: plan.reason };
}

/** Apply the cost of taking a paid <choice>: deduct its Shards (or foreign
 *  currency) and consume the required item, but only when the choice actually
 *  `pay`s (pay="t", or a bare shards= cost). The view reads the attributes; the
 *  transaction lives here (task 34). Returns { ok }: the cost is re-validated
 *  against the LIVE sheet before anything is taken, so a possession dropped (or
 *  funds spent) after the choice rendered can't cross for free — the caller
 *  blocks navigation and refreshes on { ok:false }. (task 133) */
export function payChoiceCost(state, { pay, cost = 0, currency = null, foreignCoin = false, item = null, itemTags = null }) {
  if (!pay) return { ok: true };
  const have = cost ? (foreignCoin ? state.currencyBalance(currency) : state.data.shards) : 0;
  if (cost && have < cost) return { ok: false };
  if (item != null && !state.hasItemMatch(item, itemTags)) return { ok: false };
  if (cost) { if (foreignCoin) state.adjustCurrency(currency, -cost); else state.adjustMoney(-cost); }
  // Consume through the SAME tag/"?"-aware matcher the gate validated with (task 145):
  // a name-only findItems would silently take nothing for a `item="?" tags=…` payment.
  if (item != null) { const it = state.findItemMatch(item, itemTags)[0]; if (it) state.removeItemById(it.id); }
  return { ok: true };
}

/** Sell one carried item by name for `gain` Shards. Returns { ok }. */
export function sellInlineItem(state, name, gain) {
  const it = state.findItems(name)[0];
  if (!it) return { ok: false };
  state.removeItemById(it.id);
  if (gain) state.adjustMoney(gain);
  return { ok: true };
}

/** Give up one Cargo Unit of `cargoType` (from a ship HERE carrying it — the hold
 *  must be present to trade from, task 89), optionally for `gain` Shards. `opts.chooser`
 *  names which hold when several carry it (task 342); the barter-reward side stays in the
 *  view. Returns { ok, ship? } — `ship` is the hull the Unit actually left, so a barter can
 *  put the goods received back into the same hold. */
export function sellCargo(state, cargoType, gain, opts = {}) {
  const want = canonCargo(cargoType);
  const plan = cargoSellPlan(state, cargoType);
  if (!plan.ok) return { ok: false };
  const ship = chosenShip(plan, opts);
  const at = ship.cargo.findIndex((c) => canonCargo(c) === want);
  if (at < 0) return { ok: false }; // the named hull does not carry it (a stale/crafted pick)
  ship.cargo.splice(at, 1);
  if (gain) state.adjustMoney(gain);
  state.changed();
  return { ok: true, ship };
}
