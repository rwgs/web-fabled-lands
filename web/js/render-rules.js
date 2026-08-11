// render-rules.js — DOM-free rule decisions for section rendering (task 119).
//
// These planners take parsed section/effect nodes plus the live GameState and return a
// decision (boolean / blessing name / set) WITHOUT constructing any DOM or touching a
// browser UI global (document/window). render.js wires the controls; these decide the
// rules — restoring the documented rules/view boundary. Reading a passed node's
// attributes / running querySelectorAll on it is fine (the same thing engine.js does);
// only DOM *construction* belongs in the view. Unit-tested headlessly.

import { boolAttr, isDiceExpr, resolveValue, matchRange, losePaymentPlan, PASSIVE_BODY_TAGS } from './engine.js';
import { normalize, canonBlessing, currencyAward, isShardsCurrency, splitItemName } from './state.js';
import { bookAvailable } from './edition.js'; // the DOM-free registry, never data.js (task 195)
import { blessingLabel } from './render-util.js'; // pure label formatting, no DOM (task 218)
import {
  isRollGate, isDeferredEscapeClear, isDeferredTagCleanup, aggregateFightOutcome, ITEM_FAMILY_TAGS,
  hasAncestorTag, expressionVars, provisionalVarClosure, EFFECT_MAGNITUDE_ATTRS,
} from './render-gates.js';

// isRollGate moved to render-gates.js (one-way dependency: classifyPassive below composes
// the gate deferrals, so this module imports from render-gates — never the reverse);
// re-exported here so its callers (render.js, tests) keep one import site for pay rules.
// ITEM_FAMILY_TAGS lives there for the same reason (computeFightGate needs it, task 213), and
// so do expressionVars/provisionalVarClosure — the roll gate traces an effect's magnitude back
// to the roll that owes it (task 247). The decision-boundary narrative they serve stays below.
export { isRollGate, ITEM_FAMILY_TAGS, expressionVars, provisionalVarClosure } from './render-gates.js';

// DOM Node.DOCUMENT_POSITION_FOLLOWING (0x04): set in the compareDocumentPosition mask
// when the argument node comes AFTER the reference node in document order. Spelled as a
// literal so this module never reaches for the browser `Node` global.
const DOCUMENT_POSITION_FOLLOWING = 0x04;

// The tags eligible for a "choose one" reward menu. Shared by the planners below and the
// renderer's award/pay views, so it lives here as the single source of truth (the sibling
// ITEM_FAMILY_TAGS is re-exported above from render-gates.js).
export const CHOOSE_ONE_TAGS = new Set(['lose', 'tick', 'gain', 'item', 'weapon', 'armour', 'tool', 'resurrection']);

// The engine's passive-effect set as a selector, built once. groupPlan asks it which of a
// <group>'s children write to the Adventure Sheet; querySelectorAll answers in document
// order, so the derived selector returns exactly what the old hand-written one did. (task 246)
const PASSIVE_BODY_SELECTOR = [...PASSIVE_BODY_TAGS].join(', ');

// ---- blessing rules (tasks 43/56/108/114) ----------------------------------

// The blessings named on a section's <outcome blessing="X"> hazards (task 108): a held
// blessing vetoes that outcome, and a sibling <lose blessing="X"> is the deferred
// "spend to avoid it" step, not an on-entry loss. Excludes the "*"/"?" wildcards.
// Canonicalised (task 242), so the members are the same tokens the lookups below fold to
// and an <outcome blessing="storms"> pairs with a <lose blessing="storm">.
export function computeOutcomeBlessings(sectionEl) {
  if (!sectionEl) return new Set();
  return new Set(
    Array.from(sectionEl.querySelectorAll('outcome[blessing]'))
      .map((o) => normalize(o.getAttribute('blessing')))
      .filter((b) => b && b !== '*' && b !== '?')
      .map((b) => canonBlessing(b)),
  );
}

// A held blessing named on this <outcome blessing="X"> vetoes the hazard (task 108).
export function blessingVeto(state, node) {
  const b = node.getAttribute('blessing');
  if (b == null || b === '' || b === '*' || b === '?') return false;
  return state.hasBlessing(b);
}

// The escape <goto> that a plain in-branch <lose blessing="X"> pays for, or null — the
// BRANCH spelling of "cross off the blessing and turn to N" (task 241). The shape is a
// non-hidden, unpriced, non-force="f" <lose blessing="X"> inside an <if blessing="X"> /
// <elseif blessing="X"> that also holds the <goto> it precedes: 42 shipped sections across
// books 1/2/3/4/6 write it this way and NOT ONE carries an <outcome blessing="X">, so the
// guard below never saw them. The loss applied on entry, and the next render found the
// branch — which reads the store that spend had just emptied — inactive, disabling the very
// escape it had paid for. The branch condition IS the guard here (only a holder of X takes
// it), so recognise it structurally rather than via the outcome table.
//
// Scoping the goto to the branch is the load-bearing part: book6/9's "Otherwise <goto 222>"
// follows the loss in document order but is the UNBLESSED alternative and must stay free.
// The excluded forms keep their own paths — book6/160's force="f" pair stays the opt-in
// "you decide which to cross off", and a hidden loss stays var-gated (§5.232/502/716).
export function branchBlessingEscapeGoto(node) {
  if (node.tagName.toLowerCase() !== 'lose') return null;
  if (boolAttr(node.getAttribute('hidden'))) return null;
  if (node.getAttribute('price') != null) return null;
  if (isOptionalForce(node)) return null;
  const b = normalize(node.getAttribute('blessing'));
  if (!b || b === '*' || b === '?') return null;
  // Compared through canonBlessing, not bare normalize: storms/storm and poison/disease are
  // one blessing to the engine, so an <if blessing="storms"> around a <lose blessing="storm">
  // is the same escape and must not fall back to the on-entry charge. (task 242)
  const cb = canonBlessing(b);
  let branch = null;
  for (let p = node.parentNode; p && p.tagName; p = p.parentNode) {
    const tag = p.tagName.toLowerCase();
    if ((tag === 'if' || tag === 'elseif') && canonBlessing(normalize(p.getAttribute('blessing'))) === cb) { branch = p; break; }
  }
  if (!branch) return null;
  return Array.from(branch.querySelectorAll('goto'))
    .find((g) => node.compareDocumentPosition(g) & DOCUMENT_POSITION_FOLLOWING) || null;
}

// A non-hidden <lose blessing="X"> that is the deferred "spend to take the safe exit" step
// rather than an on-entry loss (tasks 108 + 241). Two spellings, one notion: the blessing
// guards one of this section's <outcome blessing="X"> hazards — §5.200/250/60 write it as
// bare prose after the table ("…lose the blessing and turn to N") — or it sits in the
// blessing's own branch beside the goto it buys (branchBlessingEscapeGoto). Either way it
// must NOT auto-consume on entry: the spend happens when the player takes that goto, and it
// renders as inert words until then. §5.232/502/716 instead hide the loss behind a
// keepblessing var, so those (hidden) forms are excluded and keep their var-gated behaviour.
export function isGuardedBlessingLoss(node, outcomeBlessings) {
  if (node.tagName.toLowerCase() !== 'lose') return false;
  if (boolAttr(node.getAttribute('hidden'))) return false;
  const b = node.getAttribute('blessing');
  if (b == null || b === '' || b === '*' || b === '?') return false;
  if (outcomeBlessings && outcomeBlessings.has(canonBlessing(b))) return true;
  return !!branchBlessingEscapeGoto(node);
}

// The blessing a safe-path <goto> should spend on click (tasks 108 + 241) — the other half
// of the pair above, and it must recognise the SAME two spellings, or widening only the
// guard would replace the on-entry over-charge with never charging at all. Outcome-guarded
// form: any non-hidden guarded <lose blessing="X"> preceding this goto in the section, since
// the roll gate only leaves it clickable in the protected-hazard (vetoed) state. Branch form:
// only the escape inside the loss's own blessing branch. Either way, only when X is still held.
export function blessingSpendForGoto(node, sectionEl, state, outcomeBlessings) {
  if (!sectionEl) return null;
  for (const l of sectionEl.querySelectorAll('lose[blessing]')) {
    const b = l.getAttribute('blessing');
    if (!state.hasBlessing(b)) continue;
    if (!boolAttr(l.getAttribute('hidden')) && outcomeBlessings && outcomeBlessings.has(canonBlessing(b))
        && (l.compareDocumentPosition(node) & DOCUMENT_POSITION_FOLLOWING)) return b;
    if (branchBlessingEscapeGoto(l) === node) return b;
  }
  return null;
}

// The storm blessing a <reroll> should spend on click in the keepblessing form
// (§232/502/716 — task 114): a hidden <lose blessing="X"> whose X guards one of this
// section's <outcome blessing="X"> hazards, when the player still holds X. Only those
// three reroll sections carry that idiom; a plain reroll finds nothing to spend.
export function blessingSpendForReroll(sectionEl, state, outcomeBlessings) {
  if (!outcomeBlessings || !outcomeBlessings.size || !sectionEl) return null;
  for (const l of sectionEl.querySelectorAll('lose[blessing][hidden]')) {
    const b = l.getAttribute('blessing');
    if (b && outcomeBlessings.has(canonBlessing(b)) && state.hasBlessing(b)) return b;
  }
  return null;
}

// True when the only blessing linked to a choose-one cost `key` (the cost node itself
// plus any [flag="key"] reward siblings) is one the player already holds — used to refuse
// a re-buy that addBlessing would just dedupe away, so no Shards are spent for nothing.
export function ownsSoleLinkedBlessing(node, key, sectionEl, state) {
  const nodes = [node];
  if (sectionEl) nodes.push(...sectionEl.querySelectorAll(`[flag="${key}"]`));
  const blessings = new Set();
  // Only a blessing-GRANTING node counts. A linked <lose blessing="X"> means the opposite —
  // the payment exists in order to take X away — so reading it as a re-buy would disable the
  // transaction for exactly the players it is worth making for. The same asymmetry the
  // curse/disease/poison branch of rewardWasteReason already gets right. (task 222)
  nodes.forEach((el) => {
    if (!el.getAttribute || el.tagName.toLowerCase() === 'lose') return;
    const b = el.getAttribute('blessing');
    if (b) blessings.add(b);
  });
  if (blessings.size !== 1) return false;
  return state.hasBlessing([...blessings][0]);
}

// ---- reward / payment eligibility (tasks 30/43/56/74/125) -------------------

// The reward nodes linked to a price/flag key: [flag="key"] elements in the section
// (the cost carries price="key" instead). Empty/roll-gate keys → none.
export function linkedRewards(sectionEl, key) {
  if (!sectionEl || key == null || key === '') return [];
  return Array.from(sectionEl.querySelectorAll(`[flag="${key}"]`));
}

// A repeatable "add one per payment" reward: a counter tick (<tick name="X"
// count|amount=…>). The book idiom "for every 50 Shards you can add one" bumps a named
// bonus counter, so paying again should add again (book4/93, book6/117/731).
export function isCounterReward(node) {
  return node.tagName.toLowerCase() === 'tick'
    && !!node.getAttribute('name')
    && (node.getAttribute('count') != null || node.getAttribute('amount') != null);
}

// A "choose one" purchase: a price="key" cost with two or more linked rewards, so one
// payment must grant only the picked one — never the whole list (book6/171, book5/152,
// book6/690). A *pure* item-family set is left as a barter (book4/634 "give one, take
// one"), so a heterogeneous reward (at least one non-item-family node) is required
// before an item/resurrection award joins the choose-one path.
export function isChooseOne(sectionEl, key) {
  const rewards = linkedRewards(sectionEl, key);
  if (rewards.length < 2) return false;
  if (!rewards.every((n) => CHOOSE_ONE_TAGS.has(n.tagName.toLowerCase()))) return false;
  return rewards.some((n) => !ITEM_FAMILY_TAGS.has(n.tagName.toLowerCase()));
}

// A flag-linked item-family award claimed by arm-then-take: a linked payment ([price=key]
// cost) arms the flag, then the award's own Take button grants it. Covers the cases
// isChooseOne excludes — a single priced item reward and a pure item-family barter —
// which otherwise render a free Take button and grant nothing when paid. Requires a
// [price=key] cost. (task 125)
export function isPricedItemAward(sectionEl, key) {
  if (key == null || key === '' || !sectionEl) return false;
  if (!sectionEl.querySelector(`[price="${key}"]`)) return false;
  const rewards = linkedRewards(sectionEl, key);
  return rewards.length > 0 && rewards.every((n) => ITEM_FAMILY_TAGS.has(n.tagName.toLowerCase()));
}

// The resurrection-shaped twin of isPricedItemAward: a LONE flag-linked <resurrection>
// whose payment lives elsewhere in the section ([price=key] cost). isChooseOne needs two
// or more rewards (book1/597's wand | Shards | deal is the corpus's only use), so a single
// priced deal otherwise renders a free Arrange button and grants nothing when paid — the
// arm-then-take path grants it and clears the key. A section= is required: a section-less
// <resurrection> is the death-revival trigger, not an offer to arrange. (task 221)
export function isPricedResurrection(sectionEl, key) {
  if (key == null || key === '' || !sectionEl) return false;
  if (!sectionEl.querySelector(`[price="${key}"]`)) return false;
  const rewards = linkedRewards(sectionEl, key);
  return rewards.length > 0
    && rewards.every((n) => n.tagName.toLowerCase() === 'resurrection' && n.getAttribute('section') != null);
}

// Is there a player-facing (non-hidden) cost for this choose-one key? A hidden price arms
// the choice for free (an earned "choose your reward" — book1/597).
export function hasVisiblePay(sectionEl, key) {
  if (!sectionEl || key == null || key === '') return false;
  return Array.from(sectionEl.querySelectorAll(`[price="${key}"]`)).some((n) => !boolAttr(n.getAttribute('hidden')));
}

// Why picking this reward would waste the payment (so the option is disabled): a blessing
// you already hold, a resurrection deal you already have, an item with no free carry slot,
// or a curse/disease/poison "lift" you aren't suffering. Returns the reason or null.
export function rewardWasteReason(state, node) {
  const tag = node.tagName.toLowerCase();
  if (tag === 'resurrection' && state.hasResurrection()) return 'You already have a resurrection deal.';
  if (ITEM_FAMILY_TAGS.has(tag)) {
    const rawName = node.getAttribute('name') || tag;
    const isCurrency = tag === 'item' && currencyAward(rawName) != null;
    if (!isCurrency && state.freeSlots() <= 0) return 'No room (12-item carry limit).';
  }
  // A blessing you already hold is a wasted GRANT; on a <lose blessing="X"> option it is the
  // whole point of picking it, so only a granting node is refused here. (task 222)
  const bl = tag === 'lose' ? null : node.getAttribute('blessing');
  if (bl && state.hasBlessing(bl)) return 'You already have this blessing.';
  if (tag === 'lose') {
    const c = node.getAttribute('curse');
    if (c != null && !state.hasCurse(c)) return "You don't have that curse.";
    const d = node.getAttribute('disease');
    if (d != null && !state.hasDisease(d)) return "You don't have that affliction.";
    const p = node.getAttribute('poison');
    if (p != null && !state.hasPoison(p)) return "You don't have that affliction.";
  }
  return null;
}

// Why NOTHING linked to a choose-one cost `key` can be collected right now, else null — the
// cost-side twin of rewardWasteReason, so a payment is never taken for a reward the player
// then cannot pick up. One takeable option keeps the cost live, so this asks "every", never
// "some". The single refusal the payment itself CLEARS is discounted: a cost that gives up a
// possession frees a carry slot, and a carry-limit refusal is the only reason
// rewardWasteReason can give an item-family award — so §4.634's give-one-take-one barter
// stays live for a full pack, where a naive "all refused" test would break it. A reason no
// payment can clear (a deal already held, a blessing already held, an affliction not
// suffered) blocks the click. (task 223)
export function menuWasteReason(costNode, key, sectionEl, state) {
  const rewards = linkedRewards(sectionEl, key);
  if (!rewards.length) return null;
  const freesSlot = costFreesCarrySlot(costNode, state);
  const reasons = [];
  for (const r of rewards) {
    if (freesSlot && ITEM_FAMILY_TAGS.has(r.tagName.toLowerCase())) return null; // the room arrives with the forfeit
    const why = rewardWasteReason(state, r);
    if (!why) return null;
    reasons.push(why);
  }
  return new Set(reasons).size === 1 ? reasons[0] : 'You cannot take any of these rewards yet.';
}

// Does paying this cost free a carry slot? Only a possession forfeit does — cargo and a ship
// live off the 12-item list, and Shards were never on it. An ineligible forfeit (nothing that
// qualifies) frees nothing, which is the case the cost's own eligibility gate already refuses.
function costFreesCarrySlot(costNode, state) {
  if (!costNode || costNode.tagName.toLowerCase() !== 'lose') return false;
  const plan = losePaymentPlan(costNode, state);
  return plan.present && plan.eligible && ITEM_FAMILY_TAGS.has(plan.kind);
}

// force="f" marks an OPTIONAL action (JaFL ActionNode defaults force=true); "f"/false
// means the player may skip it (task 74).
export function isOptionalForce(node) {
  const f = node.getAttribute('force');
  return f != null && !boolAttr(f);
}

// A stable "choose one" token for a force="f" node whose siblings are mutually exclusive,
// else null (an independent optional action). A ship docks at ONE place, so every force="f"
// <set dock=> in a section is one choice (book3/405); a "cross off one of the following"
// is two+ force="f" <lose> under a single parent (book6/160).
export function forcedChoiceGroup(node) {
  const tag = node.tagName.toLowerCase();
  if (tag === 'set' && node.getAttribute('dock') != null) return 'dock';
  if (tag === 'lose' && node.parentElement) {
    const kin = Array.from(node.parentElement.children)
      .filter((c) => c.tagName.toLowerCase() === 'lose' && isOptionalForce(c));
    if (kin.length >= 2) return node.parentElement; // key the group by its shared parent node
  }
  return null;
}

// Is this <lose> a "spend" the player commits to (Shards/item/cargo/ship), as opposed to a
// narrative penalty (Stamina, codeword, blessing…)? Forced only — an explicit force="f"
// loss, or a "*" catastrophe (lose all), is not gated.
export function isEconomicPayment(node) {
  if (node.getAttribute('force') != null && !boolAttr(node.getAttribute('force'), true)) return false;
  const shards = node.getAttribute('shards');
  const item = node.getAttribute('item');
  const hasShards = shards != null && shards !== '*';
  const hasItem = item != null && item !== '*';
  const hasCargo = node.getAttribute('cargo') != null && node.getAttribute('cargo') !== '*';
  const hasShip = boolAttr(node.getAttribute('ship'));
  if (node.getAttribute('stamina') != null || node.getAttribute('ability') != null) return false;
  return hasShards || hasItem || hasCargo || hasShip;
}

// ---- group classification (tasks 42/61/96/98/107/125/126 — task 119 phase 3) --

// Classify a <group> — the books' "optional bundle of effects behind one opt-in" —
// into the ONE way it renders and what its click must apply:
//   { kind:'roll', rollNode } — bundles a die roll: can't collapse to a button, the roll
//     renders as its own widget and drives the section's branches (task 42)
//   { kind:'inline' }         — no label or nothing to apply: a plain inline wrapper
//   { kind:'action', label, effects, itemNodes, buyNodes, linkedAwards, restNodes,
//     gotoNode, returnNode, isRevival } — one click-to-apply button; the view runs the
//     listed transactions on click, then navigates/returns/revives as flagged
export function groupPlan(sectionEl, node) {
  const rollNode = node.querySelector('difficulty, random, rankcheck');
  if (rollNode) return { kind: 'roll', rollNode };

  const label = (node.textContent || '').replace(/\s+/g, ' ').trim();
  // The group's effects are engine.js's passive-effect set — TAKEN from it (see
  // PASSIVE_BODY_SELECTOR) rather than spelled out again, because an action group renders
  // ONLY its button and never walks its children, so a tag missing from this list is
  // silently dropped: <adjustmoney> was missing from the old hand-written copy, which left
  // §2.134's wager applying its cache unlock and none of its four payouts, and §6.496's
  // donation cache never reset. (tasks 230 + 246) <adjust> is excluded by not being a
  // member: inside a group it is a modifier for a nested roll ("Difficulty 15 if you have
  // climbing gear"), not a group effect. A bundled <transfer> IS a member, and is the
  // group's own action (§6.490 "fight without a weapon" stashes the weapon), so it applies
  // headlessly on the group click. (task 107)
  const effects = Array.from(node.querySelectorAll(PASSIVE_BODY_SELECTOR));
  // A bundled item/weapon/armour/tool reward (the hidden quest prize in §1.228/509
  // gold chain mail, §4.189 Sun Goddess mirror): the group collapses to one button,
  // so the award can't render its own Take button — grant it headlessly on the
  // click via the normal award transaction (capacity-checked). (task 96)
  const itemNodes = Array.from(node.querySelectorAll('item, weapon, armour, tool'));
  // A bundled <buy> (ship/cargo/tool/item/crew): §5.192 claims the Wrath of God for
  // 50 Shards and the deed; §4.622 salvages a free Cargo Unit and ticks its codeword.
  // A collapsed group renders only its label, so without executing the trade the ship/
  // cargo was never added — permanently unobtainable. Run each through the standalone
  // market transaction on the group click (price charged here, ship-here/cargo-space
  // checks enforced, quantity= honoured). No collapsed group carries a <sell>. (task 126)
  const buyNodes = Array.from(node.querySelectorAll('buy'));
  // Item/weapon/... rewards linked by flag= to a price this group pays but rendered
  // OUTSIDE the group — §1.342/§4.111's potion of restoration sits after the group,
  // inside an affordability <if shards><if item> that flips false the moment the group
  // is paid, so the reward's own gated Take button vanishes before it can be clicked.
  // The group is the real payment, so grant those awards on its click and consume the
  // flag so the (now-hidden) Take can never double-grant. (task 125)
  const linkedAwards = [];
  if (sectionEl) {
    effects.forEach((fx) => {
      const k = fx.getAttribute('price');
      if (!k) return;
      sectionEl.querySelectorAll(`[flag="${k}"]`).forEach((r) => {
        if (ITEM_FAMILY_TAGS.has(r.tagName.toLowerCase()) && !node.contains(r)) linkedAwards.push(r);
      });
    });
  }
  // A <rest> child heals on the group click (book6/628 "regain 1 Stamina point"):
  // applied headlessly, since the group renders as one button, not a rest widget. (task 61)
  const restNodes = Array.from(node.querySelectorAll('rest'));
  // A group may also carry navigation (e.g. "cross off 30 Shards and turn to 99
  // in that book"): apply the effects and then follow the goto/return on click.
  const gotoNode = node.querySelector('goto');
  const returnNode = node.querySelector('return');
  // A death-revival group bundles the "use your deal" trigger (a no-section
  // <resurrection/>) with the price of coming back — erase possessions/money/ship
  // (§3.123/560/6.140/1.680) or just the ship (§1.616). On the group action, apply
  // those losses, consume the earliest deal (revive at full Stamina, task 159) and turn to
  // the deal's own section — instead of ignoring the resurrection child and leaving
  // the player erased but stranded. (task 98)
  const resNode = node.querySelector('resurrection');
  const isRevival = !!resNode && !resNode.getAttribute('section');

  if (!label || (!effects.length && !itemNodes.length && !buyNodes.length && !restNodes.length && !gotoNode && !returnNode && !isRevival)) {
    return { kind: 'inline' }; // no visible action (or nothing to apply)
  }
  return { kind: 'action', label, effects, itemNodes, buyNodes, linkedAwards, restNodes, gotoNode, returnNode, isRevival };
}

// Does a passive/rest child of a roll-bundling group DEFER to the roll event (JaFL
// treats the roll as the group's action), rather than arming on entry? Visible costs/
// consequences defer; hidden book-keeping (an armed price flag / cache lock — book3/680,
// book1/91, book2/138) still applies on entry. The exception: a bundled cache lock/unlock
// tick (task 38) means "freeze the bet on the roll", so it defers even when hidden.
export function groupRollDefers(node) {
  const special = (node.getAttribute('special') || '').toLowerCase();
  const cacheLockTick = node.tagName.toLowerCase() === 'tick' && (special === 'lock' || special === 'unlock');
  return !boolAttr(node.getAttribute('hidden')) || cacheLockTick;
}

// ---- choice eligibility (tasks 28/30/47/55/89/110/133 — task 119 phase 3) ----

// price/flag gate on a choice/goto (JaFL GotoNode.canUse): a flag="k" exit is usable
// only once flag k is set; a price="k" exit only while it is clear — the "pay to spin"
// exit (book2/157 → 19, book6/628 → 8, book3/680 → 407): while the payment is armed
// (paid, not yet resolved) the exit is withheld, and once the roll consumes the flag it
// reopens. Returns a reason when gated out, else null. (task 30)
export function flagGate(state, node) {
  const flag = node.getAttribute('flag');
  const price = node.getAttribute('price');
  if (flag != null && !state.getFlag(flag)) return 'not yet available';
  if (price != null && state.getFlag(price)) return 'resolve this first';
  return null;
}

// True for the one choice/goto node the player took before the current <return>
// restored this section: it is spent (crossed off) unless it carries revisit="t",
// which marks a hub action the player may take again. Only ever set right after a
// return, so a normal render leaves every source action enabled. (task 110)
export function isSpentSource(ctx, node) {
  return !!(ctx && ctx.usedSource === node && !boolAttr(node.getAttribute('revisit')));
}

// The full eligibility + payment verdict for a <choice> row (task 119): every gate the
// books put on a choice, plus the pay= consumption default (task 55), decided DOM-free so
// the view merely disables the button and hands `payment` to payChoiceCost on click.
// `view` is the renderer's rule surface — { ctx } is all this planner reads.
// Returns { reasons, isSail, cost, coinLabel, payment }:
//   reasons  — why the choice is disabled (empty = live)
//   payment  — payChoiceCost's opts: { pay, cost, currency, foreignCoin, item, itemTags }
export function choiceGate(state, node, view) {
  const shards = node.getAttribute('shards');
  // A currency="Mithral" cost is paid in that foreign coin, not Shards (book2/545).
  const currency = node.getAttribute('currency');
  const foreignCoin = !isShardsCurrency(currency);
  const coinLabel = foreignCoin ? currency : 'Shards';
  const wallet = foreignCoin ? state.currencyBalance(currency) : state.data.shards;
  const itemReq = node.getAttribute('item');
  const itemTags = node.getAttribute('tags'); // e.g. <choice item="?" tags="light"> (task 47)
  // pay= governs whether the choice *consumes* its requirement on click. An
  // explicit pay="t" consumes both a shards= cost and an item= requirement
  // (book2/400 green gem, book6/740 rope — previously ignored for item-only
  // choices); pay="f" never consumes; and with no pay= a shards= cost still
  // deducts by default while a bare item= gate is kept (a mere requirement). (task 55)
  const payAttr = node.getAttribute('pay');
  const payExplicit = payAttr != null ? boolAttr(payAttr) : null;
  const pay = payExplicit === true || (payExplicit == null && shards != null);
  // A sail="t" choice is a sail action exactly like a sail goto (task 89): it needs
  // a ship at THIS dock.
  const isSail = boolAttr(node.getAttribute('sail'));

  const reasons = [];
  if (isSail && state.shipsHere().length === 0) reasons.push('you need a ship here');
  const cost = shards != null ? resolveValue(state, shards) : 0;
  if (shards != null && wallet < cost) reasons.push(`needs ${cost} ${coinLabel}`);
  // item= gate: "?" (+ optional tags=) means "any possession carrying these tags"
  // (a light source, etc.) — the same matcher as <if item="?" tags=…>, so a
  // light-gated choice is no longer permanently locked (task 47).
  if (itemReq && !state.hasItemMatch(itemReq, itemTags)) reasons.push(itemReq === '?' ? `needs ${itemTags || 'an item'}` : `needs ${itemReq}`);
  const boxWord = node.getAttribute('box');
  if (boxWord && !state.hasCodeword(boxWord)) reasons.push('box not ticked');
  const profession = node.getAttribute('profession');
  if (profession && normalize(profession) !== normalize(state.data.profession)) reasons.push(profession + ' only');
  const god = node.getAttribute('god');
  if (god && !state.hasGod(god)) reasons.push('requires ' + god);
  const emptyvar = node.getAttribute('emptyvar');
  if (emptyvar && state.hasVar(emptyvar)) reasons.push('unavailable');
  const bookNum = node.getAttribute('book');
  if (bookNum && !bookAvailable(bookNum)) reasons.push('book not in edition');
  // dead="t" choices are only for a dead player (and dead="f" only while alive) — task 28.
  const deadAttr = node.getAttribute('dead');
  if (deadAttr != null && boolAttr(deadAttr) !== state.isDead()) reasons.push(boolAttr(deadAttr) ? 'only if you are dead' : 'only while you live');
  const fg = flagGate(state, node); // price/flag "pay to spin" gate (task 30)
  if (fg) reasons.push(fg);
  if (isSpentSource(view.ctx, node)) reasons.push('already taken');

  return { reasons, isSail, cost, coinLabel, payment: { pay, cost, currency, foreignCoin, item: itemReq, itemTags } };
}

// ---- rerollable-result decision boundary (tasks 175 + 181) ------------------
//
// ONE invariant, decided here and honoured by every view: while the player still holds an
// eligible reroll for a resolved roll, that result is WHOLLY PROVISIONAL. Nothing it feeds
// may commit — not a branch, a condition, an effect's magnitude, a derived <set>, a control,
// a redirect, a <while> pass, or the section's onward navigation — until the player keeps the
// result or the replacement roll settles. pendingRerollBlessings decides which results are
// provisional; expressionVars/provisionalVarClosure trace what depends on them; conditionPending/
// setPending/pendingRollVar/branchResolved are the four places a dependency is refused.

// The rerollBlessings opts for a resolved roll, derived from the node kind and the stored
// result. difficulty/rankcheck are ability CHECKS (a failed ability roll may be rerolled by
// its ability blessing or Luck); a rankcheck carries no ability blessing; a training roll is
// self-improvement, not a test, so only Luck rerolls it; a random roll offers Luck (and Safe
// Travel for a type="travel" encounter). Mirrors the opts each roll renderer used to pass to
// appendBlessingReroll, so the pending decision and the offered buttons agree.
function rerollOptsFor(node, stored) {
  const tag = node.tagName.toLowerCase();
  if (tag === 'random') return { kind: 'random', travel: (node.getAttribute('type') || '').toLowerCase() === 'travel' };
  if (tag === 'training' || tag === 'rankcheck') return { success: !!(stored && stored.success), kind: 'check' };
  return { ability: stored ? stored.ability : null, success: !!(stored && stored.success), kind: 'check' };
}

// The eligible blessing rerolls for a resolved roll the player has not yet KEPT (task 175),
// DOM-free. A non-empty list makes the result a pending decision boundary: its
// <success>/<failure>/<outcome> branch, that branch's effects/awards/redirect, and the
// roll-gate's onward choices must stay uncommitted until the player keeps the result
// (stored.accepted) or exhausts the rerolls (list empty ⇒ final). A result with no eligible
// reroll — a passed check, or no blessing held — is final immediately (the pre-175 behaviour).
export function pendingRerollBlessings(state, node, stored) {
  if (!stored || stored.accepted) return [];
  return state.rerollBlessings(rerollOptsFor(node, stored));
}

// expressionVars and provisionalVarClosure — the trace itself — are defined in render-gates.js
// and re-exported at the top of this file (task 247); the four refusals below are what read it.

// Is this <if>/<elseif> condition undecided because it reads a provisional variable? (task 181)
// §2.389's `<if var="x" equals="3"><tick shards="150"/>` must neither award the 150 Shards nor
// expose a Take control while x is a pending reroll result. The renderer holds the WHOLE
// if/elseif/else chain when any branch is undecided, so no later <else> slips active instead.
export function conditionPending(node, pendingVars) {
  if (!pendingVars || !pendingVars.size) return false;
  const v = node.getAttribute('var');
  if (v != null && pendingVars.has(String(v).trim())) return true;
  for (const a of ['equals', 'greaterthan', 'lessthan', 'shards', 'ticks']) {
    const raw = node.getAttribute(a);
    if (raw != null && expressionVars(raw).some((id) => pendingVars.has(id))) return true;
  }
  return false;
}

// Is this <set> itself unsettled — does its expression READ a var that is not settled yet
// (task 181)? Such a set must not write: §2.698's `<set var="cash" value="roll*100">` would
// otherwise bank a rejected roll's Shard value through the `<tick shards="cash">` beneath it,
// and §2.684's `result` would resolve its <outcomes> branch. Rendered inert, it applies on the
// render after the result settles; a chain (`b = a+1` over a derived `a`) defers because the
// closure already holds `a`. Only the READ side counts — a set whose TARGET var a roll owns is
// the sentinel idiom (§6.628's `y=7` "not yet rolled", §2.138's `open=1` key shortcut) and must
// still apply on entry; task 61's rollOwned check is what freezes it afterwards.
export function setPending(node, pendingVars) {
  if (!pendingVars || !pendingVars.size) return false;
  if (node.tagName.toLowerCase() !== 'set') return false;
  return expressionVars(node.getAttribute('value')).some((id) => pendingVars.has(id));
}

// The vars a roll in this section is going to fill but has NOT yet (task 181): every
// <random|rankcheck|difficulty var="V"> still unset, grown through the derived <set> values
// that read them. pendingRollVar has always deferred an effect keyed on an unfilled roll var
// DIRECTLY (§521's `<lose multiple="x">` above its `<random var="x">`); the derivation step is
// what was missing, and it silently voided seven awards. §6.352's `<set var="s" value="x*5"/>`
// ran on entry with x unset, so the `<gain shards="s">` beneath it banked 0 and MEMOISED that
// no-op — the 5-30 Shards could never arrive (likewise §2.266/§2.698/§6.17/§6.86/§6.488/§6.625).
// Treating s as unfilled until x lands makes the award wait for the real value.
// Computed once per render from state, so it is order-independent within the walk.
export function unsettledRollVars(sectionEl, state) {
  const seed = new Set();
  if (!sectionEl) return seed;
  sectionEl.querySelectorAll('random[var], rankcheck[var], difficulty[var]').forEach((r) => {
    const v = r.getAttribute('var');
    if (v && !state.hasVar(v)) seed.add(v);
  });
  return provisionalVarClosure(sectionEl, seed);
}

// The union of a view's "not yet resolved this render" variable sets: the <while> pass's
// re-rolled vars (whileIterPendingVars, task 100) and a provisional blessing-reroll decision's
// vars (rerollPendingVars — the roll var plus everything derived from it, tasks 175/181). This
// is the DECISION-BOUNDARY set: what a condition, a branch or the onward navigation must not
// read yet. Either may be absent; returns null when both are empty so callers keep the cheap
// "no pending vars" path. Both sides arrive already closed over their derived <set> values —
// the section-scoped one here (provisionalVarClosure), the per-pass one in markWhilePending,
// which closes over the <while> subtree only so the same names stay readable outside the loop
// (task 204). The per-pass set is POSITION-sensitive on purpose: it grows as the pass's rolls
// are walked, so a statement ABOVE the pass's roll reads the PREVIOUS pass's value — which is
// what sequential JaFL execution does (in iteration 2 that statement really does run before
// the roll). Seeding the whole body at pass start instead would defer such a read forever.
export function viewPendingVars(view) {
  const a = view.whileIterPendingVars, b = view.rerollPendingVars;
  const aHas = a && a.size, bHas = b && b.size;
  if (!aHas && !bHas) return null;
  if (aHas && !bHas) return a;
  if (bHas && !aHas) return b;
  const u = new Set(a); for (const v of b) u.add(v); return u;
}

// The vars an EFFECT (or a derived <set>) must not read yet: the decision-boundary set above
// plus the roll vars this section has still to fill (unsettledRollVars, held on the view as
// `unsettledVars`). A *condition* deliberately does NOT consult the unfilled set — an unwritten
// var reads as 0 and its branch simply doesn't match, which is the long-standing behaviour —
// whereas an effect that applies against 0 memoises its own award away. (task 181)
export function effectPendingVars(view) {
  const base = viewPendingVars(view);
  const u = view.unsettledVars;
  if (!u || !u.size) return base;
  if (!base) return u;
  const out = new Set(base); for (const v of u) out.add(v); return out;
}

// ---- branch resolution (success/failure/outcomes — tasks 50/104/108/109/122) --

// A branch "succeeds" either from the roll's success flag, or — when it
// carries its own `var` — from that variable's sign (>0 = success), which is
// how the books express computed outcomes (e.g. rank checks via a `<set>`).
export function branchSuccess(state, node, roll) {
  if (node.hasAttribute('var')) return state.getVar(node.getAttribute('var')) > 0;
  return roll ? !!roll.success : false;
}

// Is a branch ready to activate? A var-keyed branch waits until that var has been
// WRITTEN this visit — by a roll or an active <set> (ctx.wroteVars) — never on a
// stale/unset global (task 50). A plain (roll-fed) branch waits for its roll. This
// stops a `<failure var="s">` firing on entry with s=0 (or a leftover s>0).
export function branchResolved(ctx, node, roll, pendingVars = null) {
  if (node.hasAttribute('var')) {
    const v = node.getAttribute('var');
    // A var written by a roll whose result is still a pending blessing-reroll decision is
    // not committed yet — the branch waits until the player keeps or rerolls it (task 175).
    if (pendingVars && pendingVars.has(v)) return false;
    return ctx.wroteVars.has(v);
  }
  return !!roll;
}

// Does a success/failure branch's ability= match the feeding roll's chosen
// ability? (task 109) §2.37 offers "SANCTITY or MAGIC (your choice)" then routes a
// SANCTITY success →60 and a MAGIC success →129, so the success boolean alone is
// ambiguous. A node with no ability= is unconstrained (single-ability rolls and
// var-keyed branches are unaffected); when the feeding roll carries no chosen
// ability, don't over-filter.
export function branchAbilityMatches(node, roll) {
  const ab = node.getAttribute('ability');
  if (ab == null || ab === '') return true;
  if (!roll || !roll.ability) return true;
  const want = String(roll.ability).toLowerCase();
  return ab.split('|').map((a) => a.trim().toLowerCase()).includes(want);
}

// Resolve a branch element against the feeding roll and live state: the ONE thing the
// view should do with it this render. `roll` is the resolved roll record (or null).
//   { kind:'skip' }                 — pending, non-matching, or blessing-vetoed
//   { kind:'reveal' }               — a success/failure/outcome to reveal
//   { kind:'table', reveal, index } — an <outcomes> table; reveal is the single
//                                     matching child (null = none yet), index its position
//   { kind:'prose' }                — not a branch element (the view renders its words)
export function branchPlan(state, ctx, node, roll, pendingVars = null) {
  const tag = node.tagName.toLowerCase();

  if (tag === 'success' || tag === 'failure') {
    if (!branchResolved(ctx, node, roll, pendingVars)) return { kind: 'skip' }; // wait until the feeding roll / var write
    const want = tag === 'success';
    return branchSuccess(state, node, roll) === want && branchAbilityMatches(node, roll)
      ? { kind: 'reveal' } : { kind: 'skip' };
  }

  // A lone <outcome> (e.g. inside a <choices> table): reveal it when its
  // flag/range/var/codeword condition matches. flag= needs no roll (it's set by
  // a paid offering — book4/456); range/var need the roll (or var write) first.
  if (tag === 'outcome') {
    const flag = node.getAttribute('flag');
    let match;
    if (flag != null) match = state.getFlag(flag);
    // A codeword= outcome is a roll-less dispatch — "which codeword do you have?"
    // (§4.457's Initiate row) — so match it against live codewords before the roll
    // gate, like flag= (task 122). A same-visit hidden tick has already applied
    // (it renders above the table), so an initiate ticked this visit counts.
    else if (node.getAttribute('codeword') != null) match = node.getAttribute('codeword').split(/[|,]/).some((w) => state.hasCodeword(w.trim()));
    else if (!branchResolved(ctx, node, roll, pendingVars)) return { kind: 'skip' }; // wait for the roll / var write
    else if (node.getAttribute('range') != null) match = matchRange(node.getAttribute('range'), node.getAttribute('var') ? state.getVar(node.getAttribute('var')) : roll.total);
    else if (node.hasAttribute('var')) match = branchSuccess(state, node, roll);
    else match = true;
    // A held blessing vetoes a blessing-guarded outcome (task 108): the range
    // matched, but Safety from Storms carries the traveller past the storm, so the
    // dangerous redirect is not offered. The blessing is spent on the section's
    // sibling branch, not here, so nothing is consumed.
    if (match && blessingVeto(state, node)) return { kind: 'skip' };
    return match ? { kind: 'reveal' } : { kind: 'skip' };
  }

  if (tag === 'outcomes') {
    const branches = Array.from(node.children).filter((c) => /^(outcome|success|failure)$/.test(c.tagName.toLowerCase()));

    // A roll-less codeword-dispatch table — "which of these codewords do you
    // have?" (§4.2/§4.184/§2.301) — carries no <random>, so the feeding roll stays
    // null and the branches must resolve against live state instead of waiting forever
    // (task 122). It qualifies when every keyed (non-default) branch is codeword=.
    // A bare default row then resolves too, as the catch-all; any range/success/
    // failure/var branch marks the table roll-fed, so its default keeps waiting.
    const isDefaultOutcome = (c) => c.tagName.toLowerCase() === 'outcome'
      && c.getAttribute('codeword') == null && c.getAttribute('range') == null
      && c.getAttribute('flag') == null && !c.hasAttribute('var');
    const keyed = branches.filter((c) => !isDefaultOutcome(c));
    const codewordDispatch = keyed.length > 0 && keyed.every((c) => c.getAttribute('codeword') != null);

    // Reveal the single matching branch once it is resolved — a roll for plain/
    // range branches, or a written var (roll OR active <set>) for var-keyed ones,
    // so a set-sentinel outcome (book3/43 Chill → success) resolves with no roll
    // while an unwritten var stays pending (task 50). Codeword branches (and a
    // default in a codeword-dispatch table) resolve with no roll (task 122).
    for (let i = 0; i < branches.length; i++) {
      const c = branches[i];
      const resolved = c.getAttribute('codeword') != null
        || (isDefaultOutcome(c) && codewordDispatch)
        || branchResolved(ctx, c, roll, pendingVars);
      if (!resolved) continue;
      const ctag = c.tagName.toLowerCase();
      let match = false;
      if (ctag === 'success') match = branchSuccess(state, c, roll) === true && branchAbilityMatches(c, roll);
      else if (ctag === 'failure') match = branchSuccess(state, c, roll) === false && branchAbilityMatches(c, roll);
      else {
        const range = c.getAttribute('range');
        const cw = c.getAttribute('codeword');
        const val = c.getAttribute('var') ? state.getVar(c.getAttribute('var')) : (roll ? roll.total : 0);
        if (range != null) match = matchRange(range, val);
        else if (cw) match = cw.split(/[|,]/).some((w) => state.hasCodeword(w.trim()));
        else match = true; // default
      }
      // A held blessing vetoes this branch (task 108): skip it so neither the
      // dangerous redirect is revealed nor the roll gate's matchedOutcome is set —
      // the section's sibling <lose blessing>/reroll path then resolves. Ranges are
      // exclusive, so no other branch fills in (the traveller is protected).
      if (match && blessingVeto(state, c)) continue;
      if (match) return { kind: 'table', reveal: c, index: i };
    }
    return { kind: 'table', reveal: null, index: -1 };
  }

  return { kind: 'prose' };
}

// ---- the passive-effect execution model (task 119 phase 3) -------------------
//
// classifyPassive is JaFL's execution model for a passive effect node: the ORDER of these
// checks decides whether an effect applies on entry, defers, or becomes an opt-in control.
// It returns a verdict {mode, …} the view merely switches on. The `view` argument is the
// renderer's per-visit rule surface — any object exposing { state, sectionEl, ctx,
// inactive, outcomeBlessings, escapeCodewords, sectionFights, fightGate, hasDecline,
// whileIterPendingVars, rerollPendingVars, unsettledVars } (the Story instance satisfies it;
// tests pass a plain object — the three var sets are optional and default to empty).

// The name of a not-yet-set variable that this effect's magnitude depends on and that a
// roll in this section will fill — or null. Only such vars defer (see classifyPassive): a
// literal, a dice expression, or an already-set var applies now, and a var no roll here
// fills is left to apply (harmlessly as 0) rather than hang.
export function pendingRollVar(node, state, sectionEl, pendingVars = null) {
  for (const a of EFFECT_MAGNITUDE_ATTRS) {
    const v = node.getAttribute(a);
    if (v == null) continue;
    const s = String(v).trim();
    if (/^-?\d/.test(s) || isDiceExpr(s)) continue; // numeric literal or dice expr
    const bare = s.replace(/^[+-]/, '');            // a signed var ref ("-hang") → "hang" (task 50)
    // `pendingVars` (effectPendingVars) holds every var whose value is not settled for THIS
    // render, so a var that hasVar() reports set must still defer: one a <while> pass re-rolls
    // is stale until that pass resolves (§6.700's per-iteration `<lose stamina="x">` must use
    // this six, not the last — task 100); one owned by a provisional reroll decision, or
    // derived from an unfilled roll var, is not committed yet (task 181).
    if (pendingVars && pendingVars.has(bare)) return bare;
    if (state.hasVar(bare)) continue;               // already set (e.g. by an earlier <set>/roll)
    if (sectionEl && sectionEl.querySelector(`random[var="${bare}"], rankcheck[var="${bare}"], difficulty[var="${bare}"]`)) return bare;
  }
  return null;
}

// Does this <gain>/<lose>/<tick> ask the player to choose which ability it
// affects (ability="?" or "a|b")? effect= forms target one named ability, so
// they never need a chooser.
export function needsAbilityChoice(node) {
  const tag = node.tagName.toLowerCase();
  if (tag !== 'lose' && tag !== 'gain' && tag !== 'tick') return false;
  if (node.getAttribute('effect') != null) return false;
  const ab = node.getAttribute('ability');
  if (ab == null) return false;
  const s = ab.trim().toLowerCase();
  return s === '?' || s.includes('|');
}

// Which node of a price/flag purchase asks the player to name an ability — the cost itself,
// or a linked effect the payment applies with it — else null. classifyPassive tests price=
// and flag= long before it reaches needsAbilityChoice, so an open ability spec carrying either
// half of the idiom never routes to 'ability-choice'; without this the payment commits it with
// no chooser and abilityTargets falls back to the first candidate above 1 (CHARISMA for almost
// every character). The payment view offers the picker instead of the cascade being reordered:
// price= must keep winning, because the payment has to arm its key. (task 224)
export function openAbilityNode(costNode, rewards = []) {
  if (costNode && needsAbilityChoice(costNode)) return costNode;
  return rewards.find((r) => needsAbilityChoice(r)) || null;
}

// Does a <tick …="?" addbonus|addtag|removetag> ask the player to choose WHICH
// possession is enchanted? Only when the target is an open "?"/blank of a kind with
// more than one candidate — a name/all, a tags=/using= narrowing, or a cache target
// is deterministic and applies without a picker. (task 75)
export function needsEquipmentChoice(node, state) {
  if (node.tagName.toLowerCase() !== 'tick') return false;
  if (node.getAttribute('addbonus') == null && node.getAttribute('addtag') == null && node.getAttribute('removetag') == null) return false;
  const eqAttr = ['weapon', 'armour', 'tool', 'item'].find((k) => node.getAttribute(k) != null);
  if (eqAttr == null) return false;
  const pat = String(node.getAttribute(eqAttr) || '').trim();
  if (pat !== '?' && pat !== '') return false;
  if (boolAttr(node.getAttribute('using')) || node.getAttribute('tags') || node.getAttribute('cache')) return false;
  const kind = eqAttr === 'item' ? null : eqAttr;
  const candidates = kind ? state.data.items.filter((it) => it.kind === kind) : state.data.items;
  return candidates.length > 1;
}

// Does a bare <lose item="?">/<lose cargo="?"> ask the player WHICH possession or Cargo Unit
// leaves? Five paths already ask — the plain and optional/forced payments, the choose-one menu
// and the <group> click (tasks 117, 226, 228, 229) — and every one of them routes through
// losePaymentPlan. The sixth is the ordinary passive effect, the path a hazard row is written
// on, which consulted no plan at all and let applyLose take whatever came first in pack order.
// Six published pages print the possession choice in so many words (§1.259, §4.116, §4.131,
// §4.468, §5.66, §6.373) and thirteen more the cargo one — "you lose 1 Cargo Unit, if you had
// any, of your choice" (§1.397 and its ten twins), "you choose which was lost" (§2.534), "if
// you have more than one Unit, you can choose which is lost" (§3.629). (tasks 231, 232)
//
// The rule is the NARROWING. An open "?"/blank forfeit that names no filter offers the whole
// pack, so which one leaves is the player's; one narrowed by tags=/bonus=/using= has been
// chosen BY the filter ("cross off a candle", "a +2 item") and asks nothing. group= is NOT a
// narrowing of that kind — it selects by provenance, so §5.578's "one of the items you found"
// still leaves three like candidates and a page ending "note which items you want to keep"
// (task 232). Nothing in the markup otherwise separates §4.131's "up to six items (your
// choice)" from the sweeps whose pages state the order — "the items stolen are the ones listed
// first" (§2.248, §2.521, §3.640) — so those three carry an explicit choose="f" in the source
// and an unmarked open forfeit is a choice.
//
// The weapon/armour/tool kinds stay out: every open one in the corpus names what leaves rather
// than offering a pick — using="t" (the piece being wielded/worn), a tags=/bonus= filter, or
// §6.36's "your BEST armour, your BEST weapon", which is a rule of its own and not a choice.
const FORFEIT_NARROWERS = ['tags', 'bonus', 'using'];

// The shape of that rule on its own, without asking whether a candidate is to spare: a
// <lose item|cargo> whose spec is the open "?"/blank form, carrying none of the narrowings
// and none of the choose="f" marks. Shared with the pool gate below, which holds such a
// forfeit while its pool is not yet the pool the section describes. (task 233)
function isOpenForfeit(node) {
  if (node.tagName.toLowerCase() !== 'lose') return false;
  const spec = node.getAttribute('item') != null ? node.getAttribute('item') : node.getAttribute('cargo');
  if (spec == null) return false;
  if (spec !== '?' && String(spec).trim() !== '') return false; // a name, or the "*" sweep
  const marked = node.getAttribute('choose');
  if (marked != null && !boolAttr(marked)) return false;
  return !FORFEIT_NARROWERS.some((a) => node.getAttribute(a) != null);
}

export function needsForfeitChoice(node, state) {
  if (!isOpenForfeit(node)) return false;
  return losePaymentPlan(node, state).needsChoice; // open form, with a candidate to spare
}

// Is this open forfeit's pool still unsettled — would applying it NOW bank a no-op, or the
// wrong pick, in the fx@ memo for the rest of the visit? §5.578 is both shapes at once: it
// awards three items behind Take buttons and then charges "one of the items you found" as
// the Brotherhood's cut, so on the render that walks the <lose> the pack holds none of them.
// applyLose takes nothing, the memo goes down, and the donation is a permanent no-op. (task 233)
//
//   (a) The pool is EMPTY. A forfeit that took nothing has not happened, so it must not
//       memoise: a possession arriving later in the same section still owes it. A cache=
//       forfeit is excluded — §4.468's villa thief takes what was left there BEFORE the roll
//       ("lose one possession, if any, that you left here"), so a deposit made after the
//       theft rolled must not be swept up by a loss still standing open.
//   (b) A group= forfeit names an award's provenance, and an item-family award of that group
//       is still untaken. Its pool is not the one the sentence means until the finding is
//       done: releasing it earlier would donate §5.578's first item the moment it was taken,
//       never asking, and never seeing the other two.
//
// A held node renders as inert words and re-classifies on the next render, so the loss lands
// as soon as the pool is real. Once it has, (b) reads pending again — the donated item has
// left the pack — but by then the node carries its memo and renders those same words either
// way, so nothing re-fires and nothing asks twice.
export function forfeitPoolPending(node, view) {
  if (!isOpenForfeit(node)) return false;
  if (!losePaymentPlan(node, view.state).candidates.length && node.getAttribute('cache') == null) return true;
  const group = node.getAttribute('group');
  if (!group || !view.sectionEl) return false;
  const awards = Array.from(view.sectionEl.querySelectorAll(`[group="${group}"]`))
    .filter((n) => ITEM_FAMILY_TAGS.has(n.tagName.toLowerCase()));
  if (!awards.length) return false;
  // A "choose up to N" controller caps what the section is really offering, so the wait ends
  // at N picks rather than at every row (which the player was never entitled to).
  const limit = view.ctx && view.ctx.groupLimits ? view.ctx.groupLimits.get(group) : null;
  const offered = limit != null ? Math.min(limit, awards.length) : awards.length;
  return view.state.data.items.filter((it) => it.group === group).length < offered;
}

// A <tick profession="a|b|c"> asks the player to choose a new profession. (task 75)
export function needsProfessionChoice(node) {
  if (node.tagName.toLowerCase() !== 'tick') return false;
  const p = node.getAttribute('profession');
  return p != null && p.includes('|');
}

// Is this post-fight effect still held by the fight gate (tasks 69/213)? computeFightGate
// classifies each bare effect written after a <fight> as the win branch, the lose branch or
// unconditional; it may only fire once the fight has resolved that way (win / unconditional
// → on a win, lose → on a loss). Unresolved or fled holds everything. Effects that are not
// post-fight are never held. `view` supplies fightGate + sectionFights (the Story, or a test
// double). Shared by classifyPassive and the item-award view, which hold the same node the
// same way: a <lose>/<gain> shows its words inertly, an award shows a disabled Take.
export function isFightHeld(view, node) {
  const role = view.fightGate && view.fightGate.effectNodes.get(node);
  if (!role) return false;
  const outcome = aggregateFightOutcome(view.sectionFights);
  const take = outcome === 'win' ? role !== 'lose'
             : outcome === 'lose' ? role === 'lose'
             : false; // unresolved or fled → hold
  return !take;
}

// The renderPassive decision cascade: classify a passive effect node into the ONE way it
// executes this render. The check order below IS the rule — earlier gates win. Verdicts:
//   { mode:'inert', showWords }            — render words only; no effect, no memo
//   { mode:'defer-cleanup' }               — hold until the section is left (task 88)
//   { mode:'arm-hidden-price', fireReward } — memoised silent arming; fireReward is the
//                                            single linked reward to grant now, or null
//   { mode:'roll-payment'|'optional-pay'|'choose-one-reward', key }
//   { mode:'forced-optional'|'payment'|'ability-choice'|'equipment-choice'|'profession-choice' }
//   { mode:'forfeit-choice' }              — an open possession forfeit: pick which leaves
//   { mode:'apply', showWords, setVarName, rollOwned, rerunnable } — the plain effect;
//     rollOwned freezes a <set> whose var a roll owns (task 61), rerunnable re-evaluates
//     an absolute <set value=…> every render.
export function classifyPassive(node, view) {
  const tag = node.tagName.toLowerCase();
  const hidden = boolAttr(node.getAttribute('hidden'));

  // Inside an untaken conditional branch: show the words (the wrapper grays
  // them), but never apply the effect, gate a payment, or memoize — the branch
  // isn't taken, and a later state change re-renders it live if it becomes active.
  if (view.inactive) return { mode: 'inert', showWords: !hidden };

  // A guarded blessing loss — §5.200/250/60's post-table prose, or the in-branch
  // "cross off the blessing and turn to N" of 42 sections across books 1/2/3/4/6 — is
  // the deferred "spend to take the safe exit" step, not an on-entry loss: render its
  // words, but let that goto spend the blessing on click (renderGoto/
  // blessingSpendForGoto). Charging on entry emptied the store the branch itself reads,
  // so the next render disabled the escape. (tasks 108 + 241)
  if (tag === 'lose' && isGuardedBlessingLoss(node, view.outcomeBlessings)) {
    return { mode: 'inert', showWords: true }; // never hidden — isGuardedBlessingLoss excludes hidden forms
  }

  // Defer an effect whose magnitude depends on a variable that a roll in this
  // section has not filled yet (e.g. §521 "<lose multiple="x">" sitting above its
  // "<random var="x">"). Applying now would use x=0 and then memoise that no-op;
  // instead show the words and let the post-roll rerender apply the real count.
  // A <set> deriving its value from such a var defers the same way (task 181), so a
  // provisional (or not-yet-rolled) result cannot leak into the section through a computed
  // variable — nor bank a 0 that memoises the real award away.
  const pendingVars = effectPendingVars(view);
  if (setPending(node, pendingVars)) return { mode: 'inert', showWords: !hidden };
  if (pendingRollVar(node, view.state, view.sectionEl, pendingVars)) {
    return { mode: 'inert', showWords: !hidden };
  }

  // A fight-escape bracket's closing <lose codeword> (after the fight) is deferred
  // until the fight is won, so the mid-fight surrender/flee box= choice stays live
  // while the fight is unresolved or the player is fleeing (task 54).
  if (isDeferredEscapeClear(node, view.escapeCodewords, view.sectionFights)) {
    return { mode: 'inert', showWords: !hidden };
  }

  // A hidden <tick removetag="X"> is an end-of-section tag cleanup (§5.386's Targdaz
  // enchant): applying it on entry would strip the selection tag before the roll and
  // <outcomes> can target the weapon. Defer it to when the section is left. (task 88)
  if (isDeferredTagCleanup(node)) return { mode: 'defer-cleanup' };

  const price = node.getAttribute('price');
  const flag = node.getAttribute('flag');

  // A hidden price node arms its linked roll / choose-one / reward silently on entry —
  // JaFL runs it once per visit with no widget (task 56). A lone linked reward is granted
  // too, EXCEPT an item-family one — that grants through its own gated Take button
  // (renderChoosableReward), so firing it now would double-grant (task 125). Roll gates
  // and choose-one menus arm only, their rolls/picks doing the granting.
  if (price != null && hidden) {
    const rewards = linkedRewards(view.sectionEl, price);
    const fireReward = !isRollGate(view.sectionEl, price)
      && rewards.length === 1
      && !ITEM_FAMILY_TAGS.has(rewards[0].tagName.toLowerCase()) ? rewards[0] : null;
    return { mode: 'arm-hidden-price', fireReward };
  }

  // JaFL "price/flag" optional purchase: a node with price="k" is a click-to-pay cost.
  // A payment that arms a die roll is the repeatable "pay to spin" idiom (book2/157,
  // book3/314, book5/674…), not a one-shot reward purchase (task 30).
  if (price != null) {
    return { mode: isRollGate(view.sectionEl, price) ? 'roll-payment' : 'optional-pay', key: price };
  }

  // A flag="k" node is a reward linked to a [price="k"] cost: it must NOT auto-apply.
  // A roll-gated reward instead applies when its outcome is revealed by the roll — fall
  // through so it applies as a normal effect (it only renders once its outcome shows).
  if (flag != null && view.sectionEl && view.sectionEl.querySelector(`[price="${flag}"]`)
      && !isRollGate(view.sectionEl, flag)) {
    // A "choose one" reward: a pick button, enabled only once the cost is paid, so a
    // single payment grants exactly the ONE the player clicks (task 43).
    if (isChooseOne(view.sectionEl, flag)) return { mode: 'choose-one-reward', key: flag };
    // Single dependent reward: show its words; the effect applies with the linked cost.
    return { mode: 'inert', showWords: !hidden };
  }

  // A force="f" action is OPTIONAL (JaFL ActionNode defaults force=true): the player
  // opts in by clicking. Specialised gates above (price/flag/hidden) win, so only a
  // plain optional effect reaches here. (task 74)
  if (!hidden && isOptionalForce(node)) return { mode: 'forced-optional' };

  // Economic payment (Shards/item/cargo/ship) in a section with an escape route:
  // click-to-apply, blocking the rest of the section until resolved, so the optional
  // exit shown before it costs nothing. Narrative losses fall through and auto-apply.
  if (tag === 'lose' && !hidden && view.hasDecline && isEconomicPayment(node)) {
    return { mode: 'payment' };
  }

  // Player-choice effects: which ability / possession / profession is affected is the
  // player's pick, not the engine's default (tasks 74/75).
  if (!hidden && needsAbilityChoice(node)) return { mode: 'ability-choice' };
  if (!hidden && needsEquipmentChoice(node, view.state)) return { mode: 'equipment-choice' };
  if (!hidden && needsProfessionChoice(node)) return { mode: 'profession-choice' };

  // A bare <lose>/<gain> written after a <fight> in win/lose prose is a fight-OUTCOME
  // effect (task 69): hold it until the fight resolves, then apply only on the branch
  // actually taken.
  if (isFightHeld(view, node)) return { mode: 'inert', showWords: !hidden };

  // An open forfeit whose pool is not yet the pool the section describes waits: applying it
  // now would bank a no-op (an empty pack) or the wrong pick (§5.578's cut, charged before
  // its three Take buttons have been pressed) in a memo the visit can never undo. (task 233)
  if (!hidden && forfeitPoolPending(node, view)) return { mode: 'inert', showWords: true };

  // An open possession forfeit with a candidate to spare is the player's pick, not the
  // engine's first-in-pack default (task 231). It sits BELOW the fight gate on purpose: a
  // forfeit written after a <fight> must stay held until that fight resolves, rather than
  // committing the loss through a picker on a branch that may never be taken.
  if (!hidden && needsForfeitChoice(node, view.state)) return { mode: 'forfeit-choice' };

  const setVarName = tag === 'set' ? node.getAttribute('var') : null;
  // A roll this visit has taken ownership of this var: freeze the <set> so it can
  // never clobber the die result (book6/628's "not yet rolled" sentinel). (task 61)
  const rollOwned = setVarName != null && view.ctx.rolledVars.has(setVarName);
  // An absolute <set value="…"> is a pure function of current state, so it is
  // re-evaluated on every render — this keeps variables derived from a roll
  // result correct after that roll resolves (rather than frozen at first render).
  const rerunnable = tag === 'set' && node.hasAttribute('value') && !node.hasAttribute('modifier') && !rollOwned;
  return { mode: 'apply', showWords: !hidden, setVarName, rollOwned, rerunnable };
}

// ---- default words for a wordless effect tag (task 215) ---------------------
// The corpus writes many effects with no words of their own, because the printed sentence is
// made OF the words the tag names: book1/18's "they give you <gain shards='15'/>!", book1/303's
// "Cross the <lose item='salt and iron filings'/> from your Adventure Sheet", and whole
// paragraphs that are only "<tick codeword='Dismal'/>." (book4/184). JaFL supplies the missing
// words itself — TickNode/LoseNode.handleContent's `!hadContent` branch fills in a default
// label per attribute — so the sections are correctly written as they stand. This port printed
// nothing, leaving 422 such nodes across books 1-6 with a hole in their sentence.
//
// Silence is JaFL's own `hidden || getParent().hideChildContent()`: a hidden="t" node is
// book-keeping, and a <group> / item <effect> shows its own label instead of its children. That
// is exactly what keeps the wordless members of a bundled action silent — book1/187's
// "<text>delete Nagil from the God box</text> + <lose god> + <lose title>" must not print the
// title's name a second time.
//
// Returns '' when the tag has no default (an ability/god/special/profession effect, a wildcard
// selector), so a wordless tag this rule does not know still prints nothing rather than having
// wording invented for it.
// The affliction tags carry the same JaFL default as <lose curse=> below — "the name of the
// curse will be used for the default text, if present" (rules/JaFL-XML-Tags.md, under <lose>
// and again under <curse>) — and the corpus writes 14 of them around the tag, so a wordless
// one left a hole mid-sentence: book4/78's "Note you have the , and reduce your CHARISMA…".
// (task 227)
const LABELLED_EFFECT_TAGS = new Set(['tick', 'gain', 'lose', 'curse', 'disease', 'poison']);
const AFFLICTION_TAGS = new Set(['curse', 'disease', 'poison']);
const SILENT_CONTENT_WRAP = new Set(['group', 'effect']);

export function defaultEffectWords(node, state, atSentenceStart = false) {
  const tag = node.tagName.toLowerCase();
  if (!LABELLED_EFFECT_TAGS.has(tag)) return '';
  if (boolAttr(node.getAttribute('hidden'))) return '';
  if (hasAncestorTag(node, SILENT_CONTENT_WRAP)) return '';
  const get = (a) => node.getAttribute(a);
  // Only the two verb-led labels need it, but JaFL capitalises any default that opens a
  // sentence (isNewSentence) — book4/184's whole paragraph is the tag plus a full stop.
  const cap = (s) => (atSentenceStart && s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  // An affliction names itself, exactly as the <lose curse=> attribute form does below: a
  // name-like label, so it is printed as written rather than sentence-capitalised. (task 227)
  if (AFFLICTION_TAGS.has(tag)) return node.getAttribute('name') || '';
  const losing = tag === 'lose';
  if (get('codeword') != null) return cap(`${losing ? 'erase' : 'tick'} the codeword ${get('codeword')}`);
  if (losing && get('stamina') != null) {
    const n = String(get('stamina')).trim(); // an expression ("5", "2d6") — printed, not rolled
    return cap(`lose ${n} Stamina point${n === '1' ? '' : 's'}`);
  }
  if (get('item') != null) {
    const { name } = splitItemName(get('item'));
    return /[?*]/.test(name) ? '' : name; // a wildcard selector names nothing to print
  }
  if (get('shards') != null) {
    const n = resolveValue(state, get('shards'));
    return n > 0 ? `${n} Shard${n === 1 ? '' : 's'}` : '';
  }
  if (get('curse') != null) return get('curse');
  if (get('title') != null) return get('title');
  if (get('blessing') != null) return blessingLabel(get('blessing'));
  // A bare visit-box tick — no attribute that routes it elsewhere, only an optional count=
  // multiplier. JaFL's "put a tick there now"; the port's wording since task 70.
  if (tag === 'tick' && node.getAttributeNames().every((a) => a.toLowerCase() === 'count')) return 'tick the box';
  return '';
}
