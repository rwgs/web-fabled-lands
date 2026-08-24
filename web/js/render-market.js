// render-market.js — the economy view (task 119).
//
// Plain functions taking the story as first argument (no prototype mixin): markets,
// inline buy/sell, rest, money/item caches, transfers and resurrection deals. render.js's
// TAG_RENDERERS dispatches the public renderers; renderShopRow/runSoldHooks/runBoughtHooks/
// boughtItem/hookMatches/applyLinkedCargoBuys are internal helpers. The economy RULES live
// in market.js / engine.js; this only builds the widgets and wires the clicks.

import { applyEffect, applyEffectBody, boolAttr, resolveValue, applyRest, buyResurrectionDeal, readItemEffects, filterMatches, transferPlan, isKeep } from './engine.js';
import { shopKind, goodsFrom, ownsGoods, hasCargoSpace, buyTrade, sellTrade, sellPlan, applyInlineBuy, buyOptions, sellInlineItem, sellCargo, canUpgradeCrew } from './market.js';
import { normalize, parseTags, splitItemName, isShardsCurrency } from './state.js';
import { canonCargo } from './rules.js';
import { modal } from './ui.js';
import { MARKET_TITLES, titleCase, escapeHtml, itemLabel, bonusSuffix } from './render-util.js';
import { isChooseOne, isPricedResurrection } from './render-rules.js';
import { renderChoosableReward } from './render-rewards.js';

export function renderMarket(story, container, node, path) {
  const box = document.createElement('div');
  box.className = 'market';
  // A currency="Mithral" market trades in a foreign coin, not Shards (book2/495) —
  // prices/buttons and the wallet check use that named pool (task 40).
  const currency = node.getAttribute('currency');
  // Market-level <sold item="?" tags="…"> hooks fire when a matching good is sold
  // (book3/318 marks a codeword when a free item is resold) — task 41. <bought> is the
  // documented twin, firing on a matching purchase instead — task 219.
  const marketSolds = Array.from(node.children).filter((c) => c.tagName.toLowerCase() === 'sold');
  const marketBoughts = Array.from(node.children).filter((c) => c.tagName.toLowerCase() === 'bought');
  let hasHeader = false;
  Array.from(node.children).forEach((child, i) => {
    const tag = child.tagName.toLowerCase();
    if (tag === 'header') {
      hasHeader = true;
      // Prefer the explicit header1= column title (book4/111 "Potions"/"Artifacts");
      // fall back to the type= keyword's label, then a generic heading (task 29).
      // header2=/header3= are DELIBERATELY unread (23 nodes: "To buy", "To sell",
      // "Sale price"). They head the price columns of the aligned table JaFL lays a
      // market out as; this app renders one row per good with the price on its own
      // button ("Buy 60"/"Sell 55"), so every row already carries its column's word
      // and there is no column for a heading to sit over. Rows within one market also
      // differ in which prices they carry — §4.111's Shadar scroll is sell-only under
      // a header naming both — so a fixed pair of headings would claim a column some
      // rows lack. Adding the table is a layout change, not a heading fix. (task 280)
      const h1 = child.getAttribute('header1');
      const title = (h1 && h1.trim()) || MARKET_TITLES[child.getAttribute('type')] || 'Goods for sale';
      const h = document.createElement('div');
      h.className = 'market-head';
      h.textContent = title;
      box.appendChild(h);
    } else if (tag === 'trade' || tag === 'armour' || tag === 'weapon' || tag === 'tool' || tag === 'item' || tag === 'cargo') {
      box.appendChild(renderShopRow(story, child, path + '.r' + i, currency, marketSolds, marketBoughts));
    }
  });
  if (!hasHeader) {
    const h = document.createElement('div');
    h.className = 'market-head';
    h.textContent = 'Market';
    box.insertBefore(h, box.firstChild);
  }
  container.appendChild(box);
  return box;
}

function renderShopRow(story, node, path, currency = null, marketSolds = [], marketBoughts = []) {
  const kind = shopKind(node);
  const rawName = node.getAttribute('name') || node.getAttribute(kind) || node.getAttribute('item') || (kind === 'weapon' ? 'weapon' : kind);
  // An abbreviated cargo row (§4.252 "meta") shows and stores the canonical name. (task 127)
  const name = kind === 'cargo' ? canonCargo(rawName) : rawName;
  const bonus = node.getAttribute('bonus') ? parseInt(node.getAttribute('bonus'), 10) : 0;
  const ability = node.getAttribute('ability');
  const buy = node.getAttribute('buy');
  const sell = node.getAttribute('sell');
  const carryable = kind === 'weapon' || kind === 'armour' || kind === 'tool' || kind === 'item';
  const goods = goodsFrom(node, kind, name, bonus);
  goods.effects = readItemEffects(node); // carry any <effect> onto the bought item (task 41)
  // Foreign-currency market (Mithral): prices/wallet use that pool, not Shards (task 40).
  const foreign = !isShardsCurrency(currency);
  const coin = foreign ? ` ${currency}` : '';
  const balance = foreign ? story.state.currencyBalance(currency) : story.state.data.shards;

  const row = document.createElement('div');
  row.className = 'trade';
  const label = document.createElement('span');
  label.className = 'trade-name';
  // Title-case the shop name (the first of a "a|b" label); the bonus suffix is canonical (task 170).
  label.textContent = titleCase(splitItemName(name).name) + bonusSuffix(kind, bonus, ability);
  row.appendChild(label);

  // quantity= caps how many of this row are in stock this visit — §6.655's lone
  // salvaged barque is a one-off sale, not an unlimited shipyard, so it can be
  // bought only once per visit rather than repeatedly. (task 94) The per-visit
  // tally lives on ctx; a direct renderMarket() with no visit context (some tests)
  // simply has no cap.
  const stockAttr = node.getAttribute('quantity');
  const stockLimit = stockAttr != null ? resolveValue(story.state, stockAttr) : null;
  const bought = (story.ctx && story.ctx.stock.get(path)) || 0;
  const soldOut = stockLimit != null && bought >= stockLimit;

  const actions = document.createElement('span');
  actions.className = 'trade-actions';
  if (buy != null) {
    const price = resolveValue(story.state, buy);
    const b = document.createElement('button');
    b.className = 'btn-mini';
    b.textContent = soldOut ? 'Sold out' : `Buy ${price}${coin}`;
    const noSlot = carryable && story.state.freeSlots() <= 0;
    const noCargoSpace = kind === 'cargo' && !hasCargoSpace(story.state);
    b.disabled = soldOut || balance < price || noSlot || noCargoSpace;
    b.title = soldOut ? 'None left' : (balance < price ? `Not enough ${foreign ? currency : 'Shards'}` : (noSlot ? 'No room (12-item limit)' : (noCargoSpace ? 'No cargo space.' : '')));
    b.addEventListener('click', () => {
      // A market row trades from the CLICK, so it books its taking at its own row — a resource
      // guard ABOVE the stall keeps reading the purse the walk passed it with (tasks 261, 263).
      // Nothing is booked when the transaction is refused, and a foreign-currency price moves
      // no Shards, so the ledger's purse-and-pack reading is untouched by it.
      const mark = story.spendMark();
      const res = buyTrade(story.state, goods, price, currency);
      if (!res.ok) { if (res.note) story.notify(res.note, 'warn'); return; }
      story.noteSpend(path, mark);
      if (stockLimit != null && story.ctx) story.ctx.stock.set(path, bought + 1);
      runBoughtHooks(story, node, goods, marketBoughts); // <bought> twin of the sale hook (task 219)
      story.rerender();
    });
    actions.appendChild(b);
  }
  if (sell != null) {
    const price = resolveValue(story.state, sell);
    const owned = ownsGoods(story.state, goods);
    const s = document.createElement('button');
    s.className = 'btn-mini';
    s.textContent = `Sell ${price}${coin}`;
    s.disabled = !owned;
    s.title = owned ? '' : 'You have none to sell';
    s.addEventListener('click', () => {
      // Commit the sale (optionally with the player's pick) and fire <sold> hooks on the
      // possession actually removed (tasks 41, 58).
      const commit = (chooser) => {
        // A sale hands over the possession here and pays for it, so the row books what LEFT the
        // sheet; the price is a gain, which the ledger deliberately reads live (tasks 261, 263).
        const mark = story.spendMark();
        const res = sellTrade(story.state, goods, price, currency, chooser ? { chooser } : {});
        if (!res.ok) return;
        story.noteSpend(path, mark);
        runSoldHooks(story, node, res.item, marketSolds);
        story.rerender();
      };
      // Several non-identical matches (two same-type ships, one laden; a mixed weapon rack):
      // ask which one leaves rather than silently taking the first. (task 134)
      const plan = sellPlan(story.state, goods);
      if (plan.needsChoice) { s.disabled = true; showSellPicker(story, row, plan, commit); }
      else commit(null);
    });
    actions.appendChild(s);
  }
  if (buy == null && sell == null) {
    const na = document.createElement('span');
    na.className = 'trade-na';
    na.textContent = 'not available';
    actions.appendChild(na);
  }
  row.appendChild(actions);
  return row;
}

// Only renderShopRow fires these; the inline <buy>/<sell> pair below never does. UNREACHABLE
// rather than missed (swept task 279): the corpus holds exactly two <sold> nodes — §3.318's
// market-level filter and §3.86's row child — both inside a <market>, and no <bought> at all
// (task 219 implemented the documented twin ahead of any node using it). An inline sell can
// therefore never carry a hook to fire. Wire them here if one is ever authored outside a market.
//
// Fire the <sold> side-effects when a good is sold: the row's own <sold> child
// always fires (book3/86 pirate captain's head — it is the sale of that row), plus
// any market-level <sold item="?" tags="…"> whose filter matches the possession
// ACTUALLY SOLD — its own tags/name, not the shop row's descriptor. So selling a
// starting leather jerkin at book3/318's generic "leather" row (buytags="318.free")
// no longer fires 3.318.sold; only an item that carries the 318.free tag does. (tasks 41, 58)
function runSoldHooks(story, rowNode, soldItem, marketSolds) {
  const own = rowNode.querySelector(':scope > sold');
  if (own) applyEffectBody(own, story.state);
  (marketSolds || []).forEach((s) => { if (hookMatches(s, soldItem)) applyEffectBody(s, story.state); });
}

// The mirror for a purchase: rules/JaFL-XML-Tags.md documents <bought>/<sold> as one pair,
// but only the sale half was implemented (task 219). The row's own <bought> child always
// fires (it IS the purchase of that row), plus any market-level <bought item="?" tags="…">
// whose filter matches the goods actually bought. Two things differ from the sale side: a
// purchase has no pre-owned possession to match against, so the filter reads a descriptor of
// what the row ADDS (boughtItem); and a quantity= row can buy several times in one visit, so
// this can fire more than once where a sale cannot — the wrapped action must tolerate the
// repeat (<tick codeword> already does).
function runBoughtHooks(story, rowNode, goods, marketBoughts) {
  const own = rowNode.querySelector(':scope > bought');
  if (own) applyEffectBody(own, story.state);
  const gained = boughtItem(goods);
  (marketBoughts || []).forEach((b) => { if (hookMatches(b, gained)) applyEffectBody(b, story.state); });
}

// What a purchase puts on the Adventure Sheet, in the shape hookMatches reads: the stored
// name of a "fur cloak|wolf pelt" row plus its alternatives, and the buytags= that goodsFrom
// already folded in — exactly what buyTrade adds. A ship/cargo buy adds no possession, so it
// has nothing to match, just as a ship sale carries no sold item.
function boughtItem(goods) {
  if (goods.kind === 'ship' || goods.kind === 'cargo') return null;
  const { name, alts } = splitItemName(goods.name);
  return { name, tags: [...(goods.tags || []), ...alts] };
}

// Does a market-level <sold>/<bought> filter (item="?"/name + tags=) match the article that
// changed hands — the possession sold, or the descriptor of the one bought? A ship/cargo
// trade carries no such article, so it never matches.
function hookMatches(hookNode, article) {
  if (!article) return false;
  const item = hookNode.getAttribute('item');
  if (item && item !== '?' && item !== '*' && normalize(item) !== normalize(article.name)) return false;
  const tags = parseTags(hookNode.getAttribute('tags'));
  const have = article.tags || [];
  return tags.every((t) => have.some((g) => normalize(g) === normalize(t)));
}

// Reveal a "sell which?" picker when a sale has several non-identical matches, so the exact
// ship/item the player names is what leaves — not whatever the engine finds first (JaFL
// "Please select which one you want to sell"). Each button commits with a chooser bound to
// that candidate; the picker sits just below its market row. (task 134)
function showSellPicker(story, rowEl, plan, commit) {
  const box = document.createElement('div');
  box.className = 'ship-choice sell-choice';
  box.appendChild(document.createTextNode('Sell which? '));
  plan.candidates.forEach((cand) => {
    const b = document.createElement('button');
    b.className = 'btn-mini';
    b.textContent = sellCandidateLabel(plan.kind, cand);
    b.addEventListener('click', () => commit(() => [cand]));
    box.appendChild(b);
  });
  (rowEl.parentNode || rowEl).insertBefore(box, rowEl.nextSibling);
}

// A short label for a sale candidate: a ship shows its type/name and whether its hold is
// laden (so selling the wrong vessel — and its cargo — is an informed choice); a cargo pick
// names the carrying vessel; a carried good uses its item label.
function sellCandidateLabel(kind, cand) {
  if (kind === 'ship' || kind === 'cargo') {
    const named = cand.name && cand.name !== 'Ship' ? ` "${cand.name}"` : '';
    const load = (cand.cargo || []).length ? ` — carrying ${cand.cargo.map((c) => titleCase(c)).join(', ')}` : ' — empty';
    return titleCase(cand.type) + named + load;
  }
  return itemLabel(cand);
}

// Inline <buy> in prose: a crew upgrade, a ship, a tool, a carried item, or a
// cargo unit. Charges shards= and grants one unit; quantity= caps how many
// times it can be bought per visit (each buy memoised so it can't repeat
// forever). Ships/tools/items/cargo route through market.applyInlineBuy.
export function renderInlineBuy(story, container, node, path) {
  const shards = node.getAttribute('shards');
  const price = shards != null ? resolveValue(story.state, shards) : 0;
  const crew = node.getAttribute('crew');
  const flag = node.getAttribute('flag');

  // A flag-linked buy is the *reward* side of a barter whose cost is a matching
  // [price=flag] <sell> elsewhere in the section (e.g. §538 "exchange a cargo
  // unit for minerals"). It's applied when that cost is taken, so here we only
  // show its words — the <sell> click adds the cargo (see applyLinkedCargoBuys).
  if (flag != null && story.sectionEl && story.sectionEl.querySelector(`[price="${flag}"]`)) {
    const span = document.createElement('span');
    span.className = 'fx';
    story.appendChildren(span, node, path);
    if (span.textContent.trim()) container.appendChild(span);
    return null;
  }

  // Crew upgrade: one grade at a time (poor→average→good→excellent). The rule
  // lives in market.canUpgradeCrew (task 34); the view just gates on its verdict.
  if (crew) {
    const up = canUpgradeCrew(story.state, crew);
    // The buy memo the ship/tool/item form keeps below, minted here too — but read only as
    // "this node has bought once this visit", never as a per-visit CAP. §5.145's shipyard is
    // priced and repeatable, and a grade is capped by canUpgradeCrew instead. It is what
    // Story.branchOptInTaken keys the held branch on (task 266) and what marks the button done.
    const memo = 'buy@' + path;
    const bought = story.ctx.buys.get(memo) || 0;
    const btn = document.createElement('button');
    btn.className = 'btn-mini' + (bought ? ' done' : '');
    const inner = document.createElement('span');
    story.appendChildren(inner, node, path);
    btn.textContent = (bought ? '☑ ' : '')
      + (inner.textContent.trim() || (price ? `Hire ${titleCase(crew)} crew (${price} Shards)` : `${titleCase(crew)} crew`));
    btn.disabled = (price > 0 && story.state.data.shards < price) || !up.ok;
    if (!up.ok) btn.title = up.reason;
    btn.addEventListener('click', () => {
      // A buy runs from the CLICK, not during the walk, so it books its taking at its own node —
      // a resource guard ABOVE the offer must keep reading the purse the walk passed it with
      // (tasks 261, 263). Nothing is booked when the transaction is refused.
      const mark = story.spendMark();
      const res = applyInlineBuy(story.state, { price, crew });
      if (!res.ok) { if (res.note) story.notify(res.note, 'warn'); return; }
      story.noteSpend(path, mark);
      story.ctx.buys.set(memo, bought + 1);
      story.rerender();
    });
    container.appendChild(btn);
    return btn;
  }

  // ship / tool / item / cargo — capped at quantity= buys per visit.
  const shipType = node.getAttribute('ship');
  const tool = node.getAttribute('tool');
  const item = node.getAttribute('item');
  // Canonicalise an abbreviated cargo (§5.447 "mineral") so the label, memo and stored
  // Unit all read the full commodity name. (task 127)
  const cargo = node.getAttribute('cargo') != null ? canonCargo(node.getAttribute('cargo')) : null;
  // Absent quantity= means unlimited-per-visit (JaFL TradeNode default −1): §1.342/§5.639
  // "buy as many as you can afford", §5.447 "for every such Cargo Unit". An explicit
  // quantity= is the per-visit cap (§4.658's one-shot barque, quantity="1"). Unlimited
  // buys are gated only by funds/capacity below, never by the buy memo. (task 130)
  const quantity = node.getAttribute('quantity') ? Math.max(1, parseInt(node.getAttribute('quantity'), 10) || 1) : Infinity;
  const kind = shipType ? 'ship' : (cargo != null ? 'cargo' : (tool ? 'tool' : 'item'));
  const memo = 'buy@' + path;
  const bought = story.ctx.buys.get(memo) || 0;
  const done = bought >= quantity;

  // Label from the buy's own prose (direct text only, ignoring an <effect> child
  // — task 29), else a generated one; show the price and any remaining count.
  const directText = Array.from(node.childNodes).filter((c) => c.nodeType === Node.TEXT_NODE).map((c) => c.nodeValue).join(' ').replace(/\s+/g, ' ').trim();
  const thing = directText || titleCase(tool || item || cargo || shipType || 'it');
  let label = price > 0 ? `Buy ${thing} (${price} Shards)` : `Take ${thing}`;
  if (Number.isFinite(quantity) && quantity > 1) label += ` — ${Math.max(0, quantity - bought)} left`;

  const btn = document.createElement('button');
  btn.className = 'btn-mini' + (done ? ' done' : '');
  btn.textContent = (done ? '☑ ' : '') + label;

  let reason = '';
  if (done) reason = 'done';
  else if (price > 0 && story.state.data.shards < price) reason = 'Not enough Shards';
  else if ((kind === 'tool' || kind === 'item') && story.state.freeSlots() <= 0) reason = 'No room (12-item limit)';
  else if (kind === 'cargo' && story.state.shipsHere().length === 0) reason = 'You need a ship here to carry cargo.';
  else if (kind === 'cargo' && !hasCargoSpace(story.state)) reason = 'No cargo space.';
  btn.disabled = !!reason;
  if (reason && reason !== 'done') btn.title = reason;

  // A force="t" buy is mandatory (§4.658's free barque, the section's only ship): hold the
  // onward navigation until it runs. Only an enabled, not-yet-done forced buy gates —
  // computeBuyGate already excludes group-wrapped optional pickups (§4.622). (task 136.5)
  if (boolAttr(node.getAttribute('force')) && !done && !reason) story.pendingBuy = true;

  if (!reason) {
    btn.addEventListener('click', () => {
      const mark = story.spendMark(); // the price leaves the sheet HERE (tasks 261, 263)
      const res = applyInlineBuy(story.state, buyOptions(node, story.state)); // shared buy-node parse (task 152)
      if (!res.ok) { if (res.note) story.notify(res.note, 'warn'); return; }
      story.noteSpend(path, mark);
      story.ctx.buys.set(memo, bought + 1);
      story.rerender();
    });
  }
  container.appendChild(btn);
  return btn;
}

// Inline <sell> in prose. Two forms:
//  • item="X" shards="N" — sell a carried possession for Shards (book 5's rime
//    ice / selenium ore income, the §30 treasure-map buy-back). Repeatable while
//    you own one.
//  • cargo="X" — give up a Cargo Unit for Shards, or (price="<flag>") barter it
//    for the linked [flag] <buy> reward (§538). One-shot per visit.
export function renderInlineSell(story, container, node, path) {
  const item = node.getAttribute('item');
  if (item != null) {
    const gain = node.getAttribute('shards') != null ? resolveValue(story.state, node.getAttribute('shards'))
      : (node.getAttribute('price') != null ? resolveValue(story.state, node.getAttribute('price')) : 0);
    const owned = story.state.hasItem(item);
    const btn = document.createElement('button');
    btn.className = 'btn-mini';
    btn.textContent = gain ? `Sell ${titleCase(item)} (${gain} Shards)` : `Sell ${titleCase(item)}`;
    btn.disabled = !owned;
    btn.title = owned ? '' : `You have no ${item} to sell`;
    btn.addEventListener('click', () => {
      // The possession leaves on the CLICK, so it books at this node — a guard above the offer
      // keeps reading the pack the walk passed it with (tasks 261, 263). The cargo form below
      // needs no hook: a Cargo Unit lives on a ship, outside the ledger's purse and pack, and
      // its price is a gain.
      const mark = story.spendMark();
      if (!sellInlineItem(story.state, item, gain).ok) return;
      story.noteSpend(path, mark);
      story.rerender();
    });
    container.appendChild(btn);
    return btn;
  }

  const cargo = node.getAttribute('cargo');
  const priceAttr = node.getAttribute('price');
  const isFlag = priceAttr != null && !/^\d/.test(String(priceAttr).trim());
  const shardsGain = (priceAttr != null && !isFlag) ? resolveValue(story.state, priceAttr) : 0;
  const memo = 'sell@' + path;

  const inner = document.createElement('span');
  story.appendChildren(inner, node, path);
  const label = inner.textContent.trim() || (shardsGain ? `Sell for ${shardsGain} Shards` : 'Give a Cargo Unit');

  if (story.ctx.applied.has(memo)) {
    const span = document.createElement('span');
    span.className = 'fx paid';
    span.textContent = label;
    container.appendChild(span);
    return null;
  }
  if (cargo == null) { // no item= and no cargo= — nothing to transact; show prose
    const span = document.createElement('span');
    story.appendChildren(span, node, path);
    container.appendChild(span);
    return null;
  }

  const btn = document.createElement('button');
  btn.className = 'btn-mini';
  btn.textContent = label;
  // Only a hold that is HERE (with you at sea / berthed at this dock) can trade (task 89).
  const shipWithCargo = story.state.shipsHere().find((s) => (s.cargo || []).length > 0);
  btn.disabled = !shipWithCargo;
  btn.title = shipWithCargo ? '' : 'You have no cargo here to give.';
  btn.addEventListener('click', async () => {
    const ship = story.state.shipsHere().find((s) => (s.cargo || []).length > 0);
    if (!ship) return;
    let type = cargo;
    if (cargo === '?') { // give any one commodity — let the player choose which
      const kinds = [...new Set(ship.cargo)];
      type = kinds.length === 1 ? kinds[0]
        : await modal({ title: 'Give which cargo?', body: 'Choose a Cargo Unit to give up:', buttons: kinds.map((k) => ({ label: titleCase(k), value: k })) });
      if (!type) return; // cancelled
    }
    // The cargo→Shards transaction now lives in market.js (task 34); the barter
    // reward (adding the linked commodity) stays here as it's view-linked.
    if (!sellCargo(story.state, type, shardsGain).ok) return;
    if (isFlag) applyLinkedCargoBuys(story, priceAttr);
    story.ctx.applied.add(memo);
    story.rerender();
  });
  container.appendChild(btn);
  return btn;
}

// Apply the reward side of a barter: every [flag=key] <buy cargo> in the section
// (the commodity received in exchange for the cargo just given up).
function applyLinkedCargoBuys(story, key) {
  story.sectionEl.querySelectorAll(`[flag="${key}"]`).forEach((b) => {
    if (b.tagName.toLowerCase() === 'buy' && b.getAttribute('cargo') != null) {
      buyTrade(story.state, { kind: 'cargo', cargoName: b.getAttribute('cargo'), name: b.getAttribute('cargo') }, 0);
    }
  });
}

// ---- rest ------------------------------------------------------------------
export function renderRest(story, container, node, path) {
  // A <rest> with no stamina= restores Stamina to full ("heal all lost Stamina" —
  // safe houses, temples, healers); with stamina= it heals that fixed/dice amount.
  // Passing null (not a defaulted "1") tells applyRest to restore to full. (task 31)
  const hasAmt = node.hasAttribute('stamina');
  const perUse = hasAmt ? node.getAttribute('stamina') : null;
  const cost = node.getAttribute('shards') ? resolveValue(story.state, node.getAttribute('shards')) : 0;
  // JaFL's RestNode defaults useOnce = (shards == 0): an unpriced fixed-amount rest
  // is one night's hospitality — heal once per visit. Priced rests (pay per day)
  // repeat, and the no-stamina= heal-to-full form already self-limits at full. (task 129)
  const onceOnly = hasAmt && cost === 0;
  const memo = 'rest@' + path;
  // A HIDDEN rest is not an offer: §6.479's prose ("All your injuries are mysteriously
  // healed") states the heal has already happened, so apply it once on entry and render no
  // control — a Rest button turned that mandatory full heal into something the player could
  // decline and walk away wounded. Memoise BEFORE the mutation: applyRest → changed() →
  // autosave can rerender this very node, and an unset memo would heal (and charge) twice.
  // Suppressed inside an untaken branch, like every other effect there. (task 188)
  if (boolAttr(node.getAttribute('hidden'))) {
    if (!story.inactive && !story.ctx.applied.has(memo)) {
      story.ctx.applied.add(memo);
      applyRest(story.state, perUse, cost);
    }
    return null;
  }
  const used = onceOnly && story.ctx.applied.has(memo);
  const box = document.createElement('span');
  const btn = document.createElement('button');
  btn.className = 'btn-secondary';
  const healLabel = hasAmt ? `+${/d/i.test(perUse) ? perUse : parseInt(perUse, 10)} Stamina` : 'heal all Stamina';
  btn.textContent = cost ? `Rest (${healLabel}, ${cost} Shards)` : `Rest (${healLabel})`;
  const full = story.state.data.stamina >= story.state.effectiveStaminaMax();
  btn.disabled = used || full || (cost > 0 && story.state.data.shards < cost);
  if (used) btn.title = 'You have already rested here';
  else if (full) btn.title = 'Already at full Stamina';
  btn.addEventListener('click', () => {
    // The nightly charge is taken from the CLICK, so it books at its own node — a guard above
    // the offer reads the purse the walk passed it with (tasks 261, 263). A hidden rest applies
    // as the walk passes it instead, and is marked there.
    const mark = story.spendMark();
    applyRest(story.state, perUse, cost);
    story.noteSpend(path, mark);
    if (onceOnly) story.ctx.applied.add(memo);
    story.rerender();
  });
  box.appendChild(btn);
  container.appendChild(box);
  return box;
}

// ---- caches: banks / investment boxes / villa strongrooms ------------------
// A <moneycache> is a deposit/withdraw widget for a named money stash: a bank
// account (MerchantBank), a guild investment box, or a gambling pot. Deposits
// may be capped (max=) and constrained to multiples= of N; withdrawals may
// levy a withdrawCharge= fee. The stashed sum persists across sections.
export function renderMoneyCache(story, container, node, path) {
  const name = node.getAttribute('name');
  if (!name) return null;
  const text = node.getAttribute('text') || 'Money stashed';
  // max: absent ⇒ unlimited (JaFL CacheNode default −1); "0" ⇒ deposits barred
  // ("Use '0' to bar money from this cache"); N>0 ⇒ cap the stash total at N. (task 131)
  const max = node.hasAttribute('max') ? (parseInt(node.getAttribute('max'), 10) || 0) : -1;
  const mult = node.getAttribute('multiples') ? parseInt(node.getAttribute('multiples'), 10) : 1;
  const charge = node.getAttribute('withdrawCharge') ? parseFloat(node.getAttribute('withdrawCharge')) : 0;

  const box = document.createElement('div');
  box.className = 'cache money-cache';
  const bal = document.createElement('div');
  bal.className = 'cache-balance';
  bal.innerHTML = `<span class="cache-label">${escapeHtml(text)}</span><span class="cache-sum">${story.state.cacheMoney(name)} Shards</span>`;
  box.appendChild(bal);

  const controls = document.createElement('div');
  controls.className = 'cache-controls';
  const input = document.createElement('input');
  input.type = 'number'; input.min = '0'; input.step = String(mult > 0 ? mult : 1);
  input.value = String(mult > 0 ? mult : 1);
  input.className = 'cache-amount';
  // Named and labelled from its own cache, so the spinner is not an anonymous number box: the
  // visible balance line describes the stash, not what typing here does. (task 202)
  input.name = 'cacheAmount:' + name;
  input.setAttribute('aria-label', `Shards to deposit or withdraw - ${text}`);
  controls.appendChild(input);

  const roundMult = (n) => (mult > 1 ? Math.floor(n / mult) * mult : Math.floor(n));
  const dep = document.createElement('button');
  dep.className = 'btn-mini';
  dep.textContent = 'Deposit';
  dep.addEventListener('click', () => {
    let amt = roundMult(Number(input.value) || 0);
    if (max >= 0) amt = Math.min(amt, max - story.state.cacheMoney(name)); // 0 bars deposits; N caps the total
    amt = Math.min(amt, story.state.data.shards);
    if (amt > 0) {
      // A deposit moves money OFF the sheet on a click, so it books its taking at this node
      // (tasks 261, 263). A withdrawal is a GAIN, which the ledger deliberately leaves reading
      // live — the same asymmetry that lets an award open the choice that needs it.
      const mark = story.spendMark();
      story.state.depositCacheMoney(name, amt);
      story.noteSpend(path, mark);
      story.rerender();
    }
  });
  const wd = document.createElement('button');
  wd.className = 'btn-mini';
  wd.textContent = charge ? `Withdraw (−${Math.round(charge * 100)}%)` : 'Withdraw';
  wd.addEventListener('click', () => {
    const amt = roundMult(Number(input.value) || 0);
    if (amt > 0 && story.state.cacheMoney(name) > 0) { story.state.withdrawCacheMoney(name, amt, charge); story.rerender(); }
  });
  controls.appendChild(dep); controls.appendChild(wd);
  // A max="0" cache is withdraw-only (§4.263 arena "Winnings"): bar deposits so the
  // paired <adjustmoney ×2> can only double the stake already locked at §4.127, not
  // fresh coin — closing the deposit-double-withdraw money exploit. The input and
  // Withdraw stay live so the doubled winnings can still be collected. (task 131)
  if (max === 0) {
    dep.disabled = true;
    dep.title = 'You cannot pay into this cache.';
  }
  // A gambling bet locks once rolled (task 38): disable the controls so it can't
  // be changed after the dice. Only caches whose lock is bundled with a roll are
  // gated this way — a stash cache stays freely editable.
  if (story.ctx.rollLockCaches.has(name) && story.state.isCacheLocked(name)) {
    input.disabled = true; dep.disabled = true; wd.disabled = true;
    dep.title = wd.title = 'Your bet is locked in — you can’t change it now.';
    box.classList.add('locked');
  }
  box.appendChild(controls);
  container.appendChild(box);
  return box;
}

// An <itemcache> is a strongroom: possessions left here persist across visits.
// Lists what's stored (with Take-back buttons) and lets the player deposit a
// carried item (respecting an optional itemlimit= on the stash and the 12-item
// carry cap on retrieval).
// A <tick special="lock" cache="X"> seals the box (§4.586's confiscation): the Take/Store
// buttons carry their cache name for Story.applyCacheLock, which reads the lock AFTER the
// walk — the corpus puts the widget on both sides of its unlock, so only the end-of-walk
// state tells a sealed box from an ordinary town house. (task 256)
export function renderItemCache(story, container, node, path) {
  const name = node.getAttribute('name');
  if (!name) return null;
  const text = node.getAttribute('text') || 'Stored here';
  const limit = node.getAttribute('itemlimit') ? parseInt(node.getAttribute('itemlimit'), 10) : 0;
  // An <itemcache> stores Shards as well as possessions (JaFL CacheNode renders a Shards
  // field on an item cache; its no-limit default is −1). max="0" bars money, a positive
  // max= caps the stash (§6.512's cabinet: "store up to 5000 Shards and six possessions"),
  // and ABSENT max= is unlimited — which is the town houses, whose own paragraph offers
  // the storage ("You can leave possessions and money here") and whose break-in rolls
  // <lose shards="*" cache=> the money they hold. Reading absent as item-only left those
  // sixteen printed sentences unable to fire and stranded §4.586's confiscated purse, which
  // §4.528 gives back through this widget and nothing else. Same parse as renderMoneyCache,
  // and now the same gate. (tasks 131, 295)
  const moneyMax = node.hasAttribute('max') ? (parseInt(node.getAttribute('max'), 10) || 0) : -1;
  const stored = story.state.cacheItems(name);

  const box = document.createElement('div');
  box.className = 'cache item-cache';
  const head = document.createElement('div');
  head.className = 'cache-label';
  head.textContent = text;
  box.appendChild(head);

  const list = document.createElement('div');
  list.className = 'cache-list';
  if (!stored.length) {
    const e = document.createElement('span');
    e.className = 'cache-empty';
    e.textContent = '(nothing stored)';
    list.appendChild(e);
  }
  stored.slice().forEach((it) => {
    const row = document.createElement('div');
    row.className = 'cache-item';
    row.appendChild(document.createTextNode(itemLabel(it)));
    const take = document.createElement('button');
    take.className = 'btn-mini';
    take.textContent = 'Take';
    take.dataset.cachelock = name; // sealed-strongroom gate, read after the walk (task 256)
    const noRoom = story.state.freeSlots() <= 0;
    take.disabled = noRoom;
    if (noRoom) take.title = 'No room (12-item carry limit)';
    take.addEventListener('click', () => {
      const removed = story.state.cacheRemoveItem(name, it.id);
      if (removed) story.state.addItem(removed);
      story.rerender();
    });
    row.appendChild(take);
    list.appendChild(row);
  });
  box.appendChild(list);

  // Shards storage (every cache but a max="0" one): a balance line plus Deposit/Withdraw
  // capped at a positive max=, mirroring the money cache. (tasks 131, 295)
  if (moneyMax !== 0) {
    const bal = document.createElement('div');
    bal.className = 'cache-balance';
    bal.innerHTML = `<span class="cache-label">Shards stored</span><span class="cache-sum">${story.state.cacheMoney(name)} Shards</span>`;
    box.appendChild(bal);
    const mc = document.createElement('div');
    mc.className = 'cache-controls';
    const input = document.createElement('input');
    input.type = 'number'; input.min = '0'; input.step = '1'; input.value = '0';
    input.className = 'cache-amount';
    input.name = 'cacheAmount:' + name;   // named + labelled from its cache (task 202)
    input.setAttribute('aria-label', `Shards to deposit or withdraw - ${text}`);
    mc.appendChild(input);
    const dep = document.createElement('button');
    dep.className = 'btn-mini';
    dep.textContent = 'Deposit';
    dep.addEventListener('click', () => {
      let amt = Math.max(0, Math.floor(Number(input.value) || 0));
      // Only a positive max= is a ceiling: at −1 this subtraction is negative and would bar
      // every deposit, which is renderMoneyCache's `if (max >= 0)` guard. (task 295)
      if (moneyMax > 0) amt = Math.min(amt, moneyMax - story.state.cacheMoney(name));
      amt = Math.min(amt, story.state.data.shards);
      if (amt > 0) { // books the deposit at this node, as the money cache does (task 263)
        const mark = story.spendMark();
        story.state.depositCacheMoney(name, amt);
        story.noteSpend(path, mark);
        story.rerender();
      }
    });
    const wd = document.createElement('button');
    wd.className = 'btn-mini';
    wd.textContent = 'Withdraw';
    wd.addEventListener('click', () => {
      const amt = Math.max(0, Math.floor(Number(input.value) || 0));
      if (amt > 0 && story.state.cacheMoney(name) > 0) { story.state.withdrawCacheMoney(name, amt, 0); story.rerender(); }
    });
    // Sealed with the Take/Store buttons, not left loose like a bank's: task 38's "a plain
    // stash lock leaves a bank editable" is about a <moneycache>, and no confiscation uses
    // one. §4.586 seals cache 4.586 and prints no unlock, so an unsealed Withdraw would hand
    // the confiscated purse straight back — task 256's hole on the money side. (task 295)
    dep.dataset.cachelock = name;
    wd.dataset.cachelock = name;
    mc.appendChild(dep); mc.appendChild(wd);
    box.appendChild(mc);
  }

  // Deposit a carried possession (unless the stash is at its item limit). The cache's
  // <include>/<exclude> filters (JaFL Node.modifyItemMatches) decide which possessions
  // may be stored: §2.617 (Molhern's smithy) takes one weapon or armour, excluding
  // already-Molherned or bonus-6+ equipment. An item is eligible if the include set
  // accepts it and no exclude rejects it; with includes present, start out and let each
  // include add, then excludes remove (carrying their reason= for the tooltip). A
  // rejected candidate (right kind, but excluded) shows a disabled button with the
  // reason; an item of the wrong kind entirely is simply not offered. (task 97)
  const filters = Array.from(node.children).filter((c) => /^(include|exclude)$/i.test(c.tagName));
  const classifyFilters = (it) => {
    if (!filters.length) return { eligible: true, candidate: true, reason: null };
    let member = filters[0].tagName.toLowerCase() === 'exclude'; // exclude-first ⇒ start included
    let candidate = member, reason = null;
    for (const f of filters) {
      if (!filterMatches([it], f).length) continue;
      if (f.tagName.toLowerCase() === 'include') { member = true; candidate = true; }
      else { member = false; reason = f.getAttribute('reason') || reason; }
    }
    return { eligible: member, candidate, reason };
  };
  // A strongroom is the fifth taker, and it obeys the keep rule like the other four
  // (applyLose's item="*", itemAt=, losePaymentPlan, transferMovers): a keep-tagged
  // possession is one the books promise cannot be lost, and §4.103's white sword must
  // still be with you after a resurrection — which nothing parked in a cache ever is,
  // since nothing moves a cache's contents. Offered but disabled with the reason, the
  // way §2.617 already refuses a candidate, because a button missing from an otherwise
  // complete list reads as a bug. A NAMED <lose item="white sword"> is untouched: that
  // escape is applyKeepRule's and stays correct. (task 271)
  const classify = (it) => {
    const c = classifyFilters(it);
    if (c.candidate && isKeep(it)) return { eligible: false, candidate: true, reason: 'You can never be parted from this.' };
    return c;
  };
  const atLimit = limit > 0 && stored.length >= limit;
  const carried = story.state.data.items;
  if (carried.length && !atLimit) {
    const dep = document.createElement('div');
    dep.className = 'cache-deposit';
    carried.slice().forEach((it) => {
      const { eligible, candidate, reason } = classify(it);
      if (!candidate) return; // not the kind of thing this cache accepts — don't offer it
      const store = document.createElement('button');
      store.className = 'btn-mini';
      store.textContent = 'Store ' + itemLabel(it);
      store.dataset.cachelock = name; // sealed-strongroom gate, read after the walk (task 256)
      if (!eligible) {
        store.disabled = true;
        store.title = reason || 'This cannot be stored here.';
      } else {
        store.addEventListener('click', () => {
          // Storing takes the possession OFF the sheet here (tasks 261, 263); Take puts one back
          // on, and a gain is always read live.
          const mark = story.spendMark();
          const removed = story.state.removeItemById(it.id);
          if (removed) story.state.cacheAddItem(name, removed);
          story.noteSpend(path, mark);
          story.rerender();
        });
      }
      dep.appendChild(store);
    });
    box.appendChild(dep);
  }
  container.appendChild(box);
  return box;
}

// <transfer> — move money/equipment between the Adventure Sheet and a named
// cache. A forced transfer (default) applies once on view (confiscate-and-return
// scenes, hidden="t"); an optional one (force="f") becomes a click-to-apply
// button so the player opts in to stashing.
// A <transfer> is a player ACTION, not an on-entry effect (JaFL TransferNode):
// only hidden="t" auto-runs; a visible transfer arms as a button. force (default
// true) gates the onward navigation until it runs; force="f" is optional; price=
// is a clear-flag offering that reveals its linked outcome (§4.456). When more
// items qualify than the limit, the player picks which via a chooser. (task 107)
export function renderTransfer(story, container, node, path) {
  const hidden = boolAttr(node.getAttribute('hidden'));
  const memo = 'xfer@' + path;
  const appendWords = () => {
    if (hidden) return;
    const s = document.createElement('span'); s.className = 'fx';
    story.appendChildren(s, node, path);
    if (s.textContent.trim()) container.appendChild(s);
  };

  // Inside an untaken conditional branch: show the words, apply/gate nothing.
  if (story.inactive) { appendWords(); return null; }

  // hidden="t" activates automatically on entry, exactly once (the confiscate/
  // recover round trips in §2.462/§3.441/§6.273/§6.490): no widget, no words.
  if (hidden) {
    if (!story.ctx.applied.has(memo)) { story.ctx.applied.add(memo); applyEffect(node, story.state, {}); }
    return null;
  }

  const price = node.getAttribute('price');
  const forced = node.getAttribute('force') == null || boolAttr(node.getAttribute('force'), true);
  const gate = forced && price == null; // a priced action never gates progression
  const plan = transferPlan(node, story.state);
  const done = price != null ? story.state.getFlag(price) : story.ctx.applied.has(memo);

  // A plain (unpriced) action with nothing eligible and not yet done is a no-op:
  // show its words, don't arm a control and don't gate. (A priced action still
  // shows a disabled offer so the player sees why it's unavailable.)
  if (price == null && !plan.doesAnything && !done) { appendWords(); return null; }

  // The author's words become the control's label.
  const label = document.createElement('span');
  story.appendChildren(label, node, path);
  const text = label.textContent.trim() || 'Transfer';

  const commit = (chosen) => {
    // This runs on the CLICK, not during the walk, so the transfer books its own taking at its
    // own node — §2.105's `<if shards="1">` sits above the pickpocket's `<transfer shards="*">`
    // and must keep reading the purse the player walked in with (task 261).
    const mark = story.spendMark();
    applyEffect(node, story.state, chosen ? { chooser: () => [chosen] } : {});
    story.noteSpend(path, mark);
    if (price == null) story.ctx.applied.add(memo);
    story.rerender();
  };
  const markPending = () => { if (gate && !done) story.pendingTransfer = true; };

  // A real choice (more qualify than the limit and they are not interchangeable):
  // one pick button per candidate; clicking transfers that one.
  if (!done && plan.needChoice && (price == null || plan.canPay)) {
    const box = document.createElement('span');
    box.className = 'ability-choice';
    const lead = document.createElement('span'); lead.className = 'fx';
    if (text && text !== 'Transfer') { lead.textContent = text + ': '; box.appendChild(lead); }
    plan.movers.forEach((it) => {
      const btn = document.createElement('button');
      btn.className = 'btn-mini ability-pick';
      btn.textContent = it.name + (it.bonus ? ` (${it.bonus >= 0 ? '+' : ''}${it.bonus})` : '');
      btn.addEventListener('click', () => commit(it));
      box.appendChild(btn);
    });
    container.appendChild(box);
    markPending();
    return box;
  }

  // A single action button.
  const btn = document.createElement('button');
  btn.className = 'btn-mini pay-action' + (done ? ' done' : '');
  btn.textContent = (done ? '☑ ' : '') + text;
  if (done) {
    btn.disabled = true;
  } else if (price != null && !plan.canPay) {
    btn.disabled = true; btn.title = 'Nothing eligible';
  } else {
    btn.addEventListener('click', () => commit(null));
  }
  container.appendChild(btn);
  markPending();
  return btn;
}

// ---- resurrection ----------------------------------------------------------
export function renderResurrection(story, container, node, path) {
  // A flag-linked resurrection inside a "choose one" reward menu renders as a
  // pick (book1/597: taking it consumes the single choice). (task 63)
  const resFlag = node.getAttribute('flag');
  if (resFlag != null && isChooseOne(story.sectionEl, resFlag)) return renderChoosableReward(story, container, node, path, resFlag);
  // A LONE flag-linked deal behind a [price=key] cost gates the same way (task 125's
  // arm-then-take, for the resurrection family): the payment arms the key and this pick
  // arranges the deal and consumes it — never a free Arrange button. (task 221)
  if (resFlag != null && isPricedResurrection(story.sectionEl, resFlag)) return renderChoosableReward(story, container, node, path, resFlag);
  const section = node.getAttribute('section');
  const shards = node.getAttribute('shards');
  const supplemental = boolAttr(node.getAttribute('supplemental'));
  const hidden = boolAttr(node.getAttribute('hidden'));
  const arrange = () => buyResurrectionDeal(story.state, {
    book: node.getAttribute('book') ? Number(node.getAttribute('book')) : story.book,
    section, text: node.getAttribute('text') || (node.textContent || '').trim(), god: node.getAttribute('god'),
    cost: shards ? resolveValue(story.state, shards) : 0, supplemental,
  });
  const memo = 'res@' + path;
  // A resurrection with book+section ARRANGES/registers a deal; one with no section
  // is a "use your deal" trigger that lives inside a death-revival <group>
  // (renderGroup) — here it is just narrative prose. (task 98)
  if (section && hidden) {
    // hidden="t" registers the deal automatically on entry, exactly once (§3.351's
    // Island of Rebirth re-arms the deal each visit while its boxes remain) — no
    // manual button, no repeated registration.
    if (!story.inactive && !story.ctx.applied.has(memo)) { story.ctx.applied.add(memo); arrange(); }
    return null;
  }
  const span = document.createElement('span');
  story.appendChildren(span, node, path);
  if (section && !story.inactive) {
    // A visible offer to buy/arrange a deal — armed once per visit so it cannot be
    // clicked repeatedly to stockpile duplicate lives (task 98).
    const cost = shards ? resolveValue(story.state, shards) : 0;
    const done = story.ctx.applied.has(memo);
    const btn = document.createElement('button');
    btn.className = 'btn-secondary' + (done ? ' done' : '');
    btn.textContent = done ? '☑ Resurrection arranged' : (cost ? `Buy resurrection deal (${cost} Shards)` : 'Arrange resurrection');
    btn.disabled = done || (cost > 0 && story.state.data.shards < cost);
    if (!done) btn.addEventListener('click', () => {
      arrange();
      story.ctx.applied.add(memo);
      story.notify('Resurrection deal arranged.');
      story.rerender();
    });
    span.appendChild(document.createTextNode(' '));
    span.appendChild(btn);
  }
  container.appendChild(span);
  return span;
}
