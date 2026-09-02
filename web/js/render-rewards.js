// render-rewards.js — the passive-effect, payment, reward and item-award view (task 119).
//
// Plain functions taking the story as first argument (no prototype mixin). Every RULE
// they act on is decided elsewhere — the passive-effect execution model (classifyPassive),
// choose-one / pay eligibility, group classification live in render-rules.js; the award
// transactions live in engine.js/market.js. This module only builds the DOM and wires the
// clicks. Dispatched from render.js's TAG_RENDERERS and from renderPassive's verdict switch.

import {
  applyEffect, applyRest, resolveValue, reviveWithResurrection, readItemEffects,
  losePaymentPlan, abilityChoiceOptions, grantChosenReward,
} from './engine.js';
import { makeItem, parseTags, currencyAward, splitItemName } from './state.js';
import { applyInlineBuy, buyOptions, cargoBuyPlan, crewUpgradePlan, shipCapacity } from './market.js';
import {
  classifyPassive, groupPlan, groupRollDefers, ownsSoleLinkedBlessing, ITEM_FAMILY_TAGS,
  linkedRewards, isCounterReward, isChooseOne, isPricedItemAward, isPricedResurrection, hasVisiblePay,
  rewardWasteReason, menuWasteReason, forcedChoiceGroup, pendingRollVar, viewPendingVars, isFightHeld,
  defaultEffectWords, needsAbilityChoice, openAbilityNode,
  afflictionChoiceOptions, needsAfflictionChoice, openAfflictionNode, cureWasteReason,
} from './render-rules.js';
import { aggregateFightOutcome } from './render-gates.js';
import { titleCase, bonusSuffix, blessingLabel } from './render-util.js';

// Is the words span about to open a new sentence? JaFL capitalises a default label there
// (Document.isNewSentence) — book4/184's whole paragraph is "<tick codeword='Dismal'/>.".
// Reads what the walk has already appended to this container, so it needs no walk state.
function atSentenceStart(container) {
  const t = container.textContent || '';
  return !t.trim() || /[.!?:;]["'’”)\]]?\s*$/.test(t);
}

// The author wrote this effect with no words of its own, so the printed sentence is missing
// the words the tag names: supply JaFL's own default label for it (task 215). Silent for a
// tag with no default, and for the deliberately wordless forms (hidden book-keeping, a
// <group>/<effect> member) — see defaultEffectWords.
function fillDefaultWords(story, container, span, node) {
  if (span.textContent.trim()) return;
  span.textContent = defaultEffectWords(node, story.state, atSentenceStart(container));
}

// The shared "show the effect's words" span (class fx), appended only when non-empty.
//
// Of the five player-choice renderers, renderForfeitChoice and renderBlessingChoice call this;
// renderAbilityChoice, renderEquipmentChoice and renderProfessionChoice open-code the same span
// and so skip fillDefaultWords. That gap is INERT, not an oversight: defaultEffectWords has no
// label for the selectors those three route on — an ability= effect, a profession= list and a
// wildcard possession all return '' by design — and no corpus node on the three routes carries a
// second labelled attribute that would print (8 open-ability nodes, 2 equipment, 1 profession;
// every one writes its own words). The fx class two of them also drop is styled by an empty rule
// and selected by nothing. Give this a second look only if a labelled default is added.
// (tasks 279, 285 — the blessing route's own default is '', blessingLabel("?") naming nothing)
export function appendFxWords(story, container, node, path) {
  const span = document.createElement('span');
  span.className = 'fx';
  story.appendChildren(span, node, path);
  fillDefaultWords(story, container, span, node);
  if (span.textContent.trim()) container.appendChild(span);
  return span;
}

// ---- group: an optional, click-to-apply action -----------------------------

// A <lose multiple=> whose count the page states as a CONSTANT, so the picker knows up front
// how many answers it owes. No multiple= at all is a count of one. A var count (§3.273/§3.629's
// `multiple="x"`, written by a bundled die) is not one of these — see below. (task 286)
function fixedForfeitCount(el) {
  const n = el.getAttribute('multiple');
  return n == null || /^\d+$/.test(String(n).trim());
}

// The one bundled choice a group must put to the player before it commits. A group collapses to
// ONE button and consults no payment plan, so its click applied every child with an empty options
// object and every engine chooser hook inside it fell back to a candidate nobody was asked about
// — even on §6.496, whose page says "decide which item you are handing over" and then gave no way
// to decide. Two kinds reach it:
//
//   (a) an open "?"/blank possession/equipment/cargo <lose> with more candidates than it takes,
//       which applyLose would take first-in-pack (task 229); and
//   (b) an open ability spec ("?" or "a|b") on a bundled <lose>/<gain>/<tick>, which
//       abilityTargets resolves to cands[0] — CHARISMA for almost every character (task 286).
//
// **A multiple= forfeit asks only where the page states the count.** Task 229 excluded every
// multiple= outright, on evidence that is really about the VAR form: the corpus's group ones are
// §3.273/§3.629's "lose the first 1-6 of your possessions", where the count is written by a die,
// the page names no choice, and asking would be incoherent anyway (a roll of 1 would ask and a
// roll of 6 would not). A fixed count is the opposite case — task 228's priced offer, where the
// page names the number and the player names the items — and it is the one the count-aware picker
// was built for. Both var groups still live in renderGroupWithRoll, which asks nothing, so that
// path needs no change now for the same reason it needed none then.
//
// Only ONE question is asked, and the forfeit wins where a group holds both: no corpus group
// carries two open selectors, so chaining pickers would be machinery for a shape nobody has
// written. An ability spec with a single eligible option is not a choice either — abilityTargets'
// own cands[0] IS that option — so it commits on the click like a lone possession does.
function groupBundledChoice(story, plan) {
  const effects = plan.effects;
  for (const fx of effects) {
    if (fx.tagName.toLowerCase() !== 'lose' || !fixedForfeitCount(fx)) continue;
    const plan = losePaymentPlan(fx, story.state);
    if (plan.needsChoice) return { kind: 'forfeit', node: fx, plan };
  }
  for (const fx of effects) {
    if (!needsAbilityChoice(fx)) continue;
    const forLoss = fx.tagName.toLowerCase() === 'lose';
    if (abilityChoiceOptions(fx.getAttribute('ability'), story.state, forLoss).length > 1) {
      return { kind: 'ability', node: fx };
    }
  }
  // §1.77's high priestess bundles the cure with its own price: <group force="t"> holding
  // <lose shards="cost"/> beside <lose disease="?"/>, so the open cure never reaches
  // classifyPassive and its picker has to be the group's. Last of the three because the two
  // above are FORFEITS — where a group somehow held both, the thing the player gives up is the
  // more urgent question than the thing they get back. (task 343)
  for (const fx of effects) {
    if (needsAfflictionChoice(fx, story.state)) return { kind: 'affliction', node: fx };
  }
  // A bundled <buy cargo>/<buy crew> asks which local vessel changes, when more than one is
  // eligible — §4.622's three salvage groups each load a Cargo Unit, and with two ships docked
  // in Tigre Bay the hold that takes it is the player's call. Buy nodes are a separate list
  // from plan.effects (the group applies them after its effects), which is why this reads the
  // whole plan. (task 342)
  for (const b of (plan.buyNodes || [])) {
    const vessels = b.getAttribute('cargo') != null ? cargoBuyPlan(story.state)
      : (b.getAttribute('crew') != null ? crewUpgradePlan(story.state, b.getAttribute('crew')) : null);
    if (vessels && vessels.ok && vessels.needsChoice) return { kind: 'vessel', node: b, plan: vessels };
  }
  return null;
}

// Classification (what the group is and what its click applies) lives in
// groupPlan (render-rules.js); this builds the matching control.
export function renderGroup(story, container, node, path) {
  const plan = groupPlan(story.sectionEl, node);
  if (plan.kind === 'roll') return renderGroupWithRoll(story, container, node, path, plan.rollNode);
  if (plan.kind === 'inline') {
    const span = document.createElement('span');
    story.appendChildren(span, node, path);
    container.appendChild(span);
    return span;
  }
  const key = 'group@' + path;
  const done = story.ctx.applied.has(key);
  const btn = document.createElement('button');
  btn.className = 'group-action' + (done ? ' done' : '');
  btn.disabled = done;
  btn.textContent = (done ? '☑ ' : '☐ ') + plan.label;
  if (!done) {
    // A bundled open forfeit — or an open ability spec — is named by the player BEFORE any of
    // this runs: the group is one button, so its other effects, awards, buys, rests and any
    // <goto>/<return>/revival all wait for the picker — firing the navigation first would leave
    // the section before the choice was made. The losses still precede the awards (a recipe
    // frees the slot its reward needs), because the whole body simply moves behind the pick.
    // (tasks 229, 286)
    const forfeit = groupBundledChoice(story, plan); // the chooser's target node, whichever kind asked
    const commit = (chooser) => {
      // The whole body applies on the CLICK, not during the walk, so the group books its taking
      // at its own node — the button is the position a bundled price was paid at (task 261).
      const mark = story.spendMark();
      plan.effects.forEach((fx) => applyEffect(fx, story.state, chooser && fx === forfeit.node ? { chooser } : {}));
      plan.buyNodes.forEach((b) => runBuyNode(story, b, chooser && forfeit && forfeit.node === b ? chooser : null));
      plan.itemNodes.forEach((n) => grantItemNode(story, n));
      // The linked award is granted here and its flag consumed, but its own Take button is
      // still on the page (the taken branch stays rendered — that is what keeps this ☑ up),
      // so record the grant against the flag: renderChoosableReward reads it and draws the
      // done form instead of captioning a paid reward "Pay first to choose this." (task 307)
      plan.linkedAwards.forEach((n) => {
        grantItemNode(story, n);
        const f = n.getAttribute('flag');
        if (f) { story.state.setFlag(f, false); story.ctx.applied.add(linkedGrantKey(f)); }
      });
      plan.restNodes.forEach((r) => {
        const perUse = r.hasAttribute('stamina') ? r.getAttribute('stamina') : null;
        const cost = r.getAttribute('shards') ? resolveValue(story.state, r.getAttribute('shards')) : 0;
        applyRest(story.state, perUse, cost);
      });
      story.noteSpend(path, mark);
      story.ctx.applied.add(key);
      if (plan.isRevival) {
        // Consume the deal and turn to its section (the revive rule — full
        // Stamina, task 159 — lives in engine.js). Guard against a missing deal.
        // The group's losses (the price of coming back) and the consumed deal are durable, so
        // a failed target arms a retry for the redirect rather than refunding them. (task 169)
        const target = reviveWithResurrection(story.state);
        if (target) { story.navigate(target.book, target.section, { durable: true }); return; }
        story.rerender();
      } else if (plan.gotoNode) {
        // The group's applied effects are durable, so mark the move durable: a failed target
        // retries the redirect instead of stranding a spent group action. (task 169)
        const b = plan.gotoNode.getAttribute('book') ? Number(plan.gotoNode.getAttribute('book')) : story.book;
        story.navigate(b, plan.gotoNode.getAttribute('section'), { durable: true });
      } else if (plan.returnNode) {
        story.goBack();
      } else {
        story.rerender();
      }
    };
    btn.addEventListener('click', () => {
      if (!forfeit) { commit(null); return; }
      btn.disabled = true; // the pick replaces the button — never let a second click re-run it
      if (forfeit.kind === 'ability') showAbilityPicker(story, container, forfeit.node, commit);
      else if (forfeit.kind === 'affliction') showAfflictionPicker(story, container, forfeit.node, commit);
      else if (forfeit.kind === 'vessel') showVesselPicker(story, container, forfeit.plan, commit, 'Load onto which ship?');
      else showForfeitPicker(story, container, forfeit.plan, commit);
    });
  }
  container.appendChild(btn);
  return btn;
}

// A <group> that bundles a roll with its effects (task 42). Renders the label and
// the roll widget inline; the roll then drives the section's success/failure/
// outcomes. The group's non-roll effects apply exactly once the roll resolves
// (JaFL treats the roll as the group's action), so a bundled cost/consequence —
// lose shards/item/god (book6/94/215/293, book3/273/629, book6/691), a codeword
// marker (book2/53…), or a rest that heals the roll's own var (book2/438) — fires
// on the attempt, never on entry. Hidden book-keeping (an armed price flag /
// cache lock — book3/680, book1/91, book2/138) still applies on entry.
function renderGroupWithRoll(story, container, node, path, rollNode) {
  const span = document.createElement('span');
  span.className = 'group-roll';
  const kids = Array.from(node.childNodes);
  const rollKey = 'roll@' + path + '.' + kids.indexOf(rollNode);
  const rollResolved = story.ctx.rolls.has(rollKey);
  const deferred = [];
  kids.forEach((k, i) => {
    const kp = path + '.' + i;
    if (k.nodeType === Node.TEXT_NODE) { story.appendText(span, k.nodeValue); return; }
    if (k.nodeType !== Node.ELEMENT_NODE) return;
    const tag = k.tagName.toLowerCase();
    if (k === rollNode) {
      story.renderElement(span, k, kp);
      // Bind the section's shared <success>/<failure>/<outcomes> to this roll —
      // appendChildren does this for top-level rolls; a group-nested one needs it here.
      if (!story.inactive) {
        const curResolved = story.activeRoll && story.ctx.rolls.has('roll@' + story.activeRoll.path);
        if (story.ctx.rolls.has(rollKey) || !curResolved) story.activeRoll = { node: k, path: kp };
      }
      return;
    }
    if (tag === 'text') { story.appendChildren(span, k, kp); return; }
    if (PASSIVE_TAGS.has(tag) || tag === 'rest') {
      // groupRollDefers (render-rules.js) decides: visible costs/consequences (and a
      // bet lock/unlock, task 38) defer to the roll; hidden book-keeping arms on entry.
      if (!groupRollDefers(k)) {
        story.renderElement(span, k, kp); // hidden book-keeping arms on entry (renderPassive)
      } else {
        deferred.push(k); // visible cost/consequence (or a bet lock/unlock) — apply on the roll
        const desc = (k.textContent || '').trim();
        if (desc) story.appendText(span, desc);
      }
      return;
    }
    story.renderElement(span, k, kp);
  });
  // Apply the deferred (visible) effects exactly once, after the roll resolves.
  if (rollResolved && deferred.length && !story.ctx.applied.has('grp@' + path)) {
    story.ctx.applied.add('grp@' + path);
    deferred.forEach((fx) => {
      if (fx.tagName.toLowerCase() === 'rest') {
        const perUse = fx.hasAttribute('stamina') ? fx.getAttribute('stamina') : null;
        const cost = fx.getAttribute('shards') ? resolveValue(story.state, fx.getAttribute('shards')) : 0;
        applyRest(story.state, perUse, cost);
      } else {
        const note = applyEffect(fx, story.state, {});
        if (note) story.notify(note);
      }
    });
  }
  container.appendChild(span);
  return span;
}

// The passive-effect tag set — the same set render.js uses to dispatch fall-through
// effects to renderPassive; renderGroupWithRoll consults it to spot bundled effects.
// It is engine.js's PASSIVE_BODY_TAGS minus <transfer>, and deliberately so: render.js's tag
// table sends a <transfer> to renderTransfer, which owns its own rules (a hidden one applies
// on entry, a visible one builds its own control), so a roll-bundled transfer follows those
// rather than deferring to the roll. No <group> in the six books pairs a roll with a
// transfer, so nothing is dropped today — this is the difference, not drift. (task 246)
const PASSIVE_TAGS = new Set(['lose', 'tick', 'gain', 'set', 'curse', 'disease', 'poison', 'adjustmoney']);

// Grant an <item>/<weapon>/<armour>/<tool> reward headlessly — no button — for a
// reward bundled inside a <group> action, which collapses to a single button and so
// can't show the award its own Take button (§1.228/509 gold chain mail, §4.189 Sun
// Goddess mirror). Delegates to the engine's item-family applier (the DOM-free award
// transaction): a "N Shards" reward banks its value, a possession is added when a slot
// is free (the 12-item carry cap), and any <curse>/<disease>/<poison> child bites on
// pickup. (tasks 96, 125)
export function grantItemNode(story, node) {
  applyEffect(node, story.state, {});
}

// Execute a <buy>'s market transaction headlessly (no widget) — for a collapsed
// <group> that bundles a purchase with its other effects (§5.192 buy the Wrath of
// God, §4.622 salvage cargo). Routes ship/cargo/tool/item/crew through the same
// applyInlineBuy transaction as a standalone row and honours quantity=; a buy that
// can't proceed (no Shards, no ship here for cargo) simply doesn't apply — matching
// JaFL's GroupNode, which runs its children in sequence without gating on them. (task 126)
function runBuyNode(story, node, chooser = null) {
  const quantity = node.getAttribute('quantity') ? Math.max(1, parseInt(node.getAttribute('quantity'), 10) || 1) : 1;
  const opts = buyOptions(node, story.state); // the shared buy-node parse (task 152)
  // `chooser` names the vessel a bundled cargo/crew buy changes (task 342). It answers for
  // EVERY unit a quantity>1 buy loads, which is right for the corpus's only bundled cargo buys
  // (§4.622's three salvage groups, quantity="1" each): one question per group action, which is
  // the same budget groupBundledChoice gives the forfeit and ability pickers.
  const bag = chooser ? { ...opts, chooser } : opts;
  for (let k = 0; k < quantity; k++) { if (!applyInlineBuy(story.state, bag).ok) break; }
}

// ---- passive effects --------------------------------------------------------
// The decision cascade lives in classifyPassive (render-rules.js): it returns the ONE
// way this effect node executes this render; the view switches on the verdict and
// builds the matching control.
export function renderPassive(story, container, node, path) {
  const verdict = classifyPassive(node, story);
  switch (verdict.mode) {
    case 'inert': // words only — deferred/guarded/linked; the rule says why
      if (verdict.showWords) appendFxWords(story, container, node, path);
      return null;
    case 'defer-cleanup': // applied on leaving the section (see the navigate wrapper)
      story.deferredCleanups.set('cleanup@' + path, node);
      return null;
    case 'arm-hidden-price': { // memoised silent arming — no widget (task 56)
      const memo = 'pay@' + path;
      if (!story.ctx.applied.has(memo)) {
        story.ctx.applied.add(memo);
        applyEffect(node, story.state, {}); // set the flag (and apply any real cost)
        if (verdict.fireReward) applyEffect(verdict.fireReward, story.state, {});
      }
      return null;
    }
    case 'roll-payment':      return renderRollPayment(story, container, node, path, verdict.key);
    case 'optional-pay':      return renderOptionalPay(story, container, node, path, verdict.key);
    case 'choose-one-reward': return renderChoosableReward(story, container, node, path, verdict.key);
    case 'forced-optional':   return renderForcedOptional(story, container, node, path);
    case 'payment':           return renderPayment(story, container, node, path);
    case 'ability-choice':    return renderAbilityChoice(story, container, node, path);
    case 'equipment-choice':  return renderEquipmentChoice(story, container, node, path);
    case 'forfeit-choice':    return renderForfeitChoice(story, container, node, path);
    case 'blessing-choice':   return renderBlessingChoice(story, container, node, path);
    case 'affliction-choice': return renderAfflictionChoice(story, container, node, path);
    case 'profession-choice': return renderProfessionChoice(story, container, node, path);
    default: { // 'apply' — the plain effect, memoised per-visit
      const key = 'fx@' + path;
      if (!verdict.rollOwned && (verdict.rerunnable || !story.ctx.applied.has(key))) {
        if (!verdict.rerunnable) story.ctx.applied.add(key);
        const note = applyEffect(node, story.state, { chooser: null });
        // Record a <set var>'s write so a var-keyed <success>/<failure>/<outcome>
        // knows the var holds a real value this visit — the set-sentinel idiom
        // (book2/138 key holder, book3/43 Chill) resolves the branch with no roll,
        // while an unwritten/stale var keeps the branch pending (task 50).
        if (verdict.setVarName) story.ctx.wroteVars.add(verdict.setVarName);
        if (note && verdict.showWords) story.notify(note);
      }
      // Render its descriptive text (the words the author wrote around the effect), falling
      // back to JaFL's default label when the tag carries none of its own: "…, tick the box,
      // and read on" (task 70) and every other wordless form (task 215) would otherwise
      // collapse to a hole in the printed sentence.
      if (verdict.showWords) appendFxWords(story, container, node, path);
      return null;
    }
  }
}

// Render an ability-choice effect as a row of pick buttons; applying it only on
// click (once per visit), with the chosen ability fed to the engine's chooser.
function renderAbilityChoice(story, container, node, path) {
  const memo = 'fx@' + path;
  const isLoss = node.tagName.toLowerCase() === 'lose';
  const desc = document.createElement('span');
  desc.className = 'fx';
  story.appendChildren(desc, node, path);
  if (desc.textContent.trim()) container.appendChild(desc);
  if (story.ctx.applied.has(memo)) return null; // already chosen this visit
  const opts = abilityChoiceOptions(node.getAttribute('ability'), story.state, isLoss);
  if (!opts.length) { story.ctx.applied.add(memo); return null; } // nothing eligible
  story.pendingChoice = true; // the exits wait for the answer (task 251)
  story.appendAbilityPicker(container, opts, (ab) => {
    // The pick commits from the CLICK, so it books at its own node (tasks 261, 263). An ability
    // point is neither purse nor pack, so today this books nothing — but the node applies whole,
    // so a spec carrying a price too is charged here and belongs on the ledger.
    const mark = story.spendMark();
    const note = applyEffect(node, story.state, { chooser: () => [ab] });
    story.noteSpend(path, mark);
    story.ctx.applied.add(memo);
    if (note) story.notify(note);
    story.rerender();
  }, isLoss ? '−' : '+');
  return null;
}

function renderEquipmentChoice(story, container, node, path) {
  const memo = 'fx@' + path;
  const eqAttr = ['weapon', 'armour', 'tool', 'item'].find((k) => node.getAttribute(k) != null);
  const kind = eqAttr === 'item' ? null : eqAttr;
  const candidates = kind ? story.state.data.items.filter((it) => it.kind === kind) : story.state.data.items.slice();
  const desc = document.createElement('span');
  story.appendChildren(desc, node, path);
  if (desc.textContent.trim()) container.appendChild(desc);
  if (story.ctx.applied.has(memo)) return null; // already chosen this visit
  if (candidates.length) story.pendingChoice = true; // the exits wait for the answer (task 251)
  const box = document.createElement('span');
  box.className = 'ability-choice';
  candidates.forEach((it) => {
    const btn = document.createElement('button');
    btn.className = 'btn-mini ability-pick';
    btn.textContent = it.name + (it.bonus ? ` (${it.bonus >= 0 ? '+' : ''}${it.bonus})` : '');
    btn.addEventListener('click', () => {
      // The pick commits from the CLICK, so it books at its own node (tasks 261, 263). This form
      // is a <tick> that MODIFIES the possession the player names (addbonus/addtag/removetag), so
      // it takes nothing today and books nothing — the mark states the rule where the node runs.
      const mark = story.spendMark();
      applyEffect(node, story.state, { chooser: () => [it] });
      story.noteSpend(path, mark);
      story.ctx.applied.add(memo);
      story.rerender();
    });
    box.appendChild(btn);
  });
  container.appendChild(box);
  return box;
}

// A bare <lose item="?"> hazard row: print its words, then stand the picker where the effect
// would have applied, so the possession the player names is the one that leaves rather than
// whatever came first in the pack. The picker is the shared showForfeitPicker, so a multiple=
// forfeit collects that many answers (§6.373's rolled 1-6). The memo is the SAME fx@ key the
// plain path uses — marking it applied before the pick commits would void the loss on the
// re-render, and sharing it means a forfeit that stops needing a choice (one candidate left)
// falls back through 'apply' already applied. (task 231)
function renderForfeitChoice(story, container, node, path) {
  const memo = 'fx@' + path;
  appendFxWords(story, container, node, path);
  if (story.ctx.applied.has(memo)) return null; // already chosen this visit
  story.pendingChoice = true; // the exits wait for the answer (task 251)
  showForfeitPicker(story, container, losePaymentPlan(node, story.state), (chooser) => {
    // The forfeit is taken from the PICK, not as the walk passes the row, so it books at its own
    // node — a guard above it keeps reading the pack the walk passed it with (tasks 261, 263).
    const mark = story.spendMark();
    const note = applyEffect(node, story.state, { chooser });
    story.noteSpend(path, mark);
    story.ctx.applied.add(memo);
    if (note) story.notify(note);
    story.rerender();
  });
  return null;
}

// A punitive <lose blessing="?">: print its words, then stand a picker where the effect would
// have applied, so the blessing the player names is the one that leaves rather than whichever
// was acquired first. The label is the shared blessingLabel, so the button reads the name the
// book prints ("Safety from Storms") and not the stored key; the "−" prefix matches the ability
// loss picker this row is modelled on. The memo is the SAME fx@ key the plain path uses, for
// renderForfeitChoice's reasons: marking it applied before the pick commits would void the loss
// on the re-render, and sharing it means a state that stops needing a choice (one blessing left)
// falls back through 'apply' already applied. (task 285)
function renderBlessingChoice(story, container, node, path) {
  const memo = 'fx@' + path;
  appendFxWords(story, container, node, path);
  if (story.ctx.applied.has(memo)) return null; // already chosen this visit
  story.pendingChoice = true; // the exits wait for the answer (task 251)
  const box = document.createElement('span');
  box.className = 'ability-choice';
  story.state.data.blessings.slice().forEach((b) => {
    const btn = document.createElement('button');
    btn.className = 'btn-mini ability-pick';
    btn.textContent = '− ' + (blessingLabel(b) || b);
    btn.addEventListener('click', () => {
      // The blessing goes from the CLICK, so the node books at its own position (tasks 261, 263).
      // A blessing is neither purse nor pack, so today this books nothing — but the node applies
      // whole, and a spec carrying a taking too is charged here and belongs on the ledger.
      const mark = story.spendMark();
      const note = applyEffect(node, story.state, { chooser: () => [b] });
      story.noteSpend(path, mark);
      story.ctx.applied.add(memo);
      if (note) story.notify(note);
      story.rerender();
    });
    box.appendChild(btn);
  });
  container.appendChild(box);
  return box;
}

// An open cure (`<lose disease="?">`, `<lose curse="?">`) with more than one affliction in its
// family: print its words, then stand a picker where the effect would have applied, so the
// player names which one is cured rather than the engine taking list order. The blessing
// forfeit's twin in every mechanical respect — same fx@ memo (marking it applied before the
// pick commits would void the cure on the re-render), same pendingChoice hold on the exits —
// but the sign is reversed: this is a benefit, so the buttons read "✓" rather than "−".
// (tasks 285 + 343)
function renderAfflictionChoice(story, container, node, path) {
  const memo = 'fx@' + path;
  appendFxWords(story, container, node, path);
  if (story.ctx.applied.has(memo)) return null; // already chosen this visit
  story.pendingChoice = true; // the exits wait for the answer (task 251)
  const box = document.createElement('div');
  box.className = 'ship-choice affliction-choice';
  box.appendChild(document.createTextNode('Cure which? '));
  afflictionChoiceOptions(node, story.state).forEach((m) => {
    const btn = document.createElement('button');
    btn.className = 'btn-mini';
    btn.textContent = '✓ ' + m.name;
    btn.addEventListener('click', () => {
      const mark = story.spendMark();
      const note = applyEffect(node, story.state, { chooser: () => [m] });
      story.noteSpend(path, mark);
      story.ctx.applied.add(memo);
      if (note) story.notify(note);
      story.rerender();
    });
    box.appendChild(btn);
  });
  container.appendChild(box);
  return box;
}

function renderProfessionChoice(story, container, node, path) {
  const memo = 'fx@' + path;
  const desc = document.createElement('span');
  story.appendChildren(desc, node, path);
  if (desc.textContent.trim()) container.appendChild(desc);
  if (story.ctx.applied.has(memo)) return null;
  const box = document.createElement('span');
  box.className = 'ability-choice';
  node.getAttribute('profession').split('|').map((s) => s.trim()).filter(Boolean).forEach((prof) => {
    const btn = document.createElement('button');
    btn.className = 'btn-mini ability-pick';
    btn.textContent = prof.charAt(0).toUpperCase() + prof.slice(1).toLowerCase();
    btn.addEventListener('click', () => {
      story.state.setProfession(prof);
      story.ctx.applied.add(memo);
      story.rerender();
    });
    box.appendChild(btn);
  });
  if (box.children.length) story.pendingChoice = true; // the exits wait for the answer (task 251)
  container.appendChild(box);
  return box;
}

// ---- payments ---------------------------------------------------------------

// A forced economic payment: click-to-apply, and (until applied) blocks the rest
// of the section. Once paid it renders as a quiet "done" note and no longer blocks.
function renderPayment(story, container, node, path) {
  const memo = 'pay@' + path;
  const cost = node.getAttribute('shards') ? resolveValue(story.state, node.getAttribute('shards')) : 0;
  const label = document.createElement('span');
  story.appendChildren(label, node, path);
  const text = label.textContent.trim() || (cost ? `Pay ${cost} Shards` : 'Pay');

  if (story.ctx.applied.has(memo)) {
    const span = document.createElement('span');
    span.className = 'fx paid';
    span.textContent = text;
    container.appendChild(span);
    return null;
  }

  const btn = document.createElement('button');
  btn.className = 'btn-mini pay-action';
  btn.textContent = text;
  // A forced possession/cargo/ship payment must be inert when the player has nothing to
  // give up — else clicking "Pay" memoises pay@ and unblocks the section having taken
  // nothing (the task-117 scope note: an absent item/cargo/ship). (task 117)
  const plan = losePaymentPlan(node, story.state);
  const commit = (chooser) => {
    // The payment applies on the CLICK, not during the walk, so it books its taking at its own
    // node — a resource guard ABOVE the price keeps reading the sheet the walk passed it with
    // (tasks 261, 263).
    const mark = story.spendMark();
    applyEffect(node, story.state, chooser ? { chooser } : {});
    story.noteSpend(path, mark);
    story.ctx.applied.add(memo);
    story.rerender();
  };
  if (cost && story.state.data.shards < cost) {
    btn.disabled = true; btn.title = 'Not enough Shards';
  } else if (plan.present && !plan.eligible) {
    btn.disabled = true; btn.title = 'You have nothing to give up here.';
  } else if (plan.needsChoice) {
    btn.addEventListener('click', () => { btn.disabled = true; showForfeitPicker(story, container, plan, commit); });
  } else {
    btn.addEventListener('click', () => commit(null));
  }
  container.appendChild(btn);
  story.blocked = true; // hide the rest of the section until this is resolved
  return btn;
}

// Optional purchase via the price/flag idiom. The cost node becomes a click-to-apply
// button; clicking applies it plus its linked reward(s) (flag == this price key).
//  - Two-or-more effect rewards → a "choose one" purchase: the cost only *arms* the
//    choice, and the reward pick buttons grant exactly one (renderChooseOnePay). (task 43)
//  - A single counter reward (<tick name= count|amount=>) is repeatable: pay again
//    to add again, so it is never permanently memoised (book4/93, book6/117/731). (task 43)
//  - Otherwise a one-shot purchase: apply once and lock the button for this visit.
function renderOptionalPay(story, container, node, path, key) {
  // A choose-one menu or a priced item-family award grants through its own pick/Take
  // button, so the payment must only ARM the flag — never fire the reward here, or a
  // single payment would over-grant the whole menu and double with the Take button.
  // (tasks 43, 125)
  if (isChooseOne(story.sectionEl, key) || isPricedItemAward(story.sectionEl, key)
      || isPricedResurrection(story.sectionEl, key)) return renderChooseOnePay(story, container, node, path, key);
  const rewards = linkedRewards(story.sectionEl, key);
  const repeatable = rewards.some((r) => isCounterReward(r));
  const memo = 'pay@' + path;
  const done = !repeatable && story.ctx.applied.has(memo);
  const cost = node.getAttribute('shards') ? resolveValue(story.state, node.getAttribute('shards')) : 0;
  const label = document.createElement('span');
  story.appendChildren(label, node, path);
  const btn = document.createElement('button');
  btn.className = 'btn-mini pay-action' + (done ? ' done' : '');
  btn.textContent = (done ? '☑ ' : '') + (label.textContent.trim() || (cost ? `Pay ${cost} Shards` : 'Confirm'));
  // A paid offering that gives up a possession/cargo/ship (§4.456 Tambu's +2/+3 gifts,
  // §2.90's weapon/armour, §3.569's named cargo) must be inert when the player has
  // nothing that qualifies — else an ineligible offer would arm the price flag and open
  // its linked reward for free. The shared plan reports eligibility and whether an open
  // "?" forfeit needs a which-one picker. (tasks 113, 117)
  const isLose = node.tagName.toLowerCase() === 'lose';
  const plan = isLose ? losePaymentPlan(node, story.state) : null;
  // An open ability spec on either half of the price/flag link ("lose 1 point from any
  // ability" as the cost, or as the effect the payment applies) has to name what leaves
  // here — classifyPassive routed it past 'ability-choice'. (task 224)
  const abilityNode = openAbilityNode(node, rewards);
  // An open cure on either half of the link ("cured of a poison or a disease" as the reward
  // §1.338/§5.105 pay for) names what leaves here, before the Shards move — classifyPassive
  // held that reward inert precisely so this button applies it. (task 343)
  const afflictionNode = openAfflictionNode(node, rewards, story.state);
  // `forNode` is the node the chooser answers for: a forfeit picker names the cost's own
  // possession (the default), an ability picker names the ability of whichever node asked.
  // Keeping them apart matters — an item candidate is not a valid answer for an ability.
  const commit = (chooser, forNode = node) => {
    // Cost and linked reward both apply on the CLICK, so the purchase books what it NET took at
    // its own node — the reward is a gain and offsets nothing the ledger owes (tasks 261, 263).
    const mark = story.spendMark();
    applyEffect(node, story.state, chooser && forNode === node ? { chooser } : {});
    rewards.forEach((r) => applyEffect(r, story.state, chooser && forNode === r ? { chooser } : {}));
    story.noteSpend(path, mark);
    if (!repeatable) story.ctx.applied.add(memo);
    story.rerender();
  };
  if (done) {
    btn.disabled = true;
  } else if (plan && plan.present && !plan.eligible) {
    btn.disabled = true; btn.title = 'You have nothing to give up for this offering.';
  } else if (ownsSoleLinkedBlessing(node, key, story.sectionEl, story.state)) {
    // "You can have only one X blessing at a time" — refuse the re-buy so the
    // Shards aren't spent for a blessing that addBlessing would just dedupe away.
    btn.disabled = true; btn.title = 'You already have this blessing';
  } else if (cureWasteReason(rewards, story.state)) {
    // The same refusal on the other side of the link: an unafflicted player must not pay
    // §1.338's 25 Shards (or §5.105's 75) for a cure with nothing to remove. (task 343)
    btn.disabled = true; btn.title = cureWasteReason(rewards, story.state);
  } else if (cost && story.state.data.shards < cost) {
    btn.disabled = true; btn.title = 'Not enough Shards';
  } else if (plan && plan.needsChoice) {
    // Open "?" possession/weapon/armour/cargo with more than one candidate: reveal a picker
    // so the player names the exact forfeit rather than the engine silently taking the first.
    btn.addEventListener('click', () => { btn.disabled = true; showForfeitPicker(story, container, plan, commit); });
  } else if (abilityNode) {
    btn.addEventListener('click', () => {
      btn.disabled = true;
      showAbilityPicker(story, container, abilityNode, (chooser) => commit(chooser, abilityNode));
    });
  } else if (afflictionNode) {
    btn.addEventListener('click', () => {
      btn.disabled = true;
      showAfflictionPicker(story, container, afflictionNode, (chooser) => commit(chooser, afflictionNode));
    });
  } else {
    btn.addEventListener('click', () => commit(null));
  }
  container.appendChild(btn);
  return btn;
}

// Neither picker is called by the whole payment family, and all three gaps are UNREACHABLE
// rather than missed (swept task 279). showForfeitPicker: renderPayment / renderOptionalPay /
// renderChooseOnePay ask, renderRollPayment and renderForcedOptional do not. showAbilityPicker:
// renderOptionalPay / renderChooseOnePay / renderRollPayment ask, renderPayment and
// renderForcedOptional do not. Why each is out of reach — renderPayment can never hold an
// ability, because isEconomicPayment returns false the moment ability= is present, so such a
// node routes to 'ability-choice' instead (structural, not a corpus accident); renderRollPayment
// needs an open "?" forfeit whose price key is a roll gate, and the corpus's only open-forfeit
// costs are §2.90, §4.456 and §5.152, none of which holds a random/rankcheck/difficulty;
// renderForcedOptional needs force="f" on an open selector, and all 21 force="f" gain/tick/lose
// nodes name a concrete item, codeword, god or blessing. Any of the three becomes real the
// moment such a node is authored — the picker call, not a new helper, is the fix.
// Outside that family both pickers have one more caller each, and it is the same one:
// renderGroup, through groupBundledChoice (tasks 229, 286).
//
// A FOURTH gap of the same kind, which that sweep missed because it is on the "does ask" side:
// renderPayment's own call at the plan.needsChoice arm is UNREACHABLE too (swept task 284).
// 'payment' wants a non-hidden <lose> with no price=, in a section holding an optional goto,
// and isEconomicPayment admits only shards/item/cargo/ship — so the open "?"/blank spec
// losePaymentPlan needs must sit on item= or cargo=. weapon/armour/tool alone make
// isEconomicPayment false (all 10 open ones in the corpus carry no economic attribute, so they
// route past 'payment' entirely), and shards/ship never report needsChoice. The shipped corpus
// holds 38 priceless open item/cargo forfeits across 37 sections and exactly ONE sits in a
// section with an optional goto — §6.496's "if you refuse to hand these over, turn to 291" —
// whose <lose item="?"/> is bundled inside a <group force="t">. renderGroup consumes it as one
// of plan.effects, so it never reaches classifyPassive; its picker is groupBundledChoice above,
// which names §6.496 for exactly this reason (task 229). Un-bundle that lose, or author a
// priceless open item/cargo forfeit into any section carrying a decline goto, and this arm
// goes live — the call is already written, so there is nothing to add.
//
// Reveal a "give up which?" picker for an open "?" possession/equipment/cargo forfeit, so the
// exact item/cargo the player chooses is what leaves — not whatever the engine finds first.
// A <lose multiple="N"> forfeit takes N of them, so the picker collects N answers before it
// commits, striking each choice off the remaining buttons and counting up as it goes — a
// chooser naming one item where the section demands two would under-charge, because applyLose
// slices the chooser's own array to count and the price flag arms regardless. Choices are held
// as INDICES, so two identical candidates (cargo Units of the same good) stay distinct.
// (tasks 117, 226, 228)
function showForfeitPicker(story, container, plan, commit) {
  collectPicks(container, {
    candidates: plan.candidates,
    count: plan.count,
    label: (cand) => (plan.kind === 'cargo' ? String(cand)
      : cand.name + (cand.bonus ? ` (${cand.bonus >= 0 ? '+' : ''}${cand.bonus})` : '')),
    heading: (n) => (plan.count > 1 ? `Give up which? (${n} of ${plan.count} chosen) ` : 'Give up which? '),
  }, commit);
}

// The fixed-count collector both multi-select pickers are built on: collect exactly `count`
// distinct picks, striking each choice off the remaining buttons and counting up as it goes,
// then commit ONCE with a chooser naming them all. Nothing is applied until the last pick
// lands, so an abandoned or incomplete picker changes nothing — which is what lets a caller
// leave its own gate standing and its price flag clear while the question is open.
//
// Choices are held as INDICES, so two identical candidates (cargo Units of the same good, two
// copies of one item) stay distinct. `heading` is a function of the count so far rather than a
// string, because the two callers word the running tally differently; `lead` lets a caller
// prepend its own element (the transfer's author-written label); `boxClass`/`pickClass`/
// `inline` keep each caller's existing markup, since both are already asserted against.
// Extracted rather than copied for task 341, which needed the same interaction over a
// different candidate shape. (tasks 226/228 + 341)
export function collectPicks(container, opts, commit) {
  const { candidates, count, label, heading = null, lead = null,
    boxClass = 'ship-choice forfeit-choice', pickClass = 'btn-mini', inline = false } = opts;
  const box = document.createElement(inline ? 'span' : 'div');
  box.className = boxClass;
  const chosen = [];
  const draw = () => {
    box.textContent = '';
    if (lead) { const el = lead(); if (el) box.appendChild(el); }
    const head = heading ? heading(chosen.length) : '';
    if (head) box.appendChild(document.createTextNode(head));
    candidates.forEach((cand, i) => {
      if (chosen.includes(i)) return;
      const b = document.createElement('button');
      b.className = pickClass;
      b.textContent = label(cand);
      b.addEventListener('click', () => {
        chosen.push(i);
        if (chosen.length >= count) commit(() => chosen.map((n) => candidates[n]));
        else draw();
      });
      box.appendChild(b);
    });
  };
  draw();
  container.appendChild(box);
  return box;
}

// Reveal a "which ability?" picker for an open ability spec ("?" / "a|b") a payment is about
// to commit, so the point leaves the ability the player names rather than the first candidate
// the engine finds. The ability twin of showForfeitPicker; abilityChoiceOptions's forLoss
// already drops anything at 1 — the printed "you cannot choose an ability that already has a
// value of 1" — so eligibility needs no code of its own here. (task 224)
function showAbilityPicker(story, container, node, commit) {
  const isLoss = node.tagName.toLowerCase() === 'lose';
  const opts = abilityChoiceOptions(node.getAttribute('ability'), story.state, isLoss);
  story.appendAbilityPicker(container, opts, (ab) => commit(() => [ab]), isLoss ? '−' : '+');
}

// Reveal a "cure which?" picker for an open cure a payment or a group is about to commit, so
// the affliction the player names is the one that leaves. The affliction twin of
// showAbilityPicker; eligibility needs no code of its own here because afflictionChoiceOptions
// already IS the match list the engine would remove from. (task 343)
function showAfflictionPicker(story, container, node, commit) {
  const box = document.createElement('div');
  box.className = 'ship-choice affliction-choice';
  box.appendChild(document.createTextNode('Cure which? '));
  afflictionChoiceOptions(node, story.state).forEach((m) => {
    const b = document.createElement('button');
    b.className = 'btn-mini';
    b.textContent = m.name;
    b.addEventListener('click', () => commit(() => [m]));
    box.appendChild(b);
  });
  container.appendChild(box);
}

// Reveal a "which ship?" picker when a cargo buy, a crew upgrade or a cargo sale has more than
// one eligible local vessel, so the hull the player names is the one that changes — the
// reference model's "You have multiple ships … docked here. Select one." Exported because
// render-market's three transaction widgets ask it too; it lives here with the other three
// pickers, and render-market already imports from this module, so the dependency runs the way
// it already ran (task 163's no-cycle rule). Nothing is charged, loaded or unloaded until a
// button here is clicked: every caller hands its whole transaction over as `commit`, exactly as
// showForfeitPicker's do. `prompt` names the decision, because the questions are not
// interchangeable — which hold takes the cargo, which crew is upgraded, which hold gives a Unit
// up. (task 342)
export function showVesselPicker(story, anchorEl, plan, commit, prompt = 'Which ship?') {
  const box = document.createElement('div');
  box.className = 'ship-choice vessel-choice';
  box.appendChild(document.createTextNode(prompt + ' '));
  plan.candidates.forEach((ship) => {
    const b = document.createElement('button');
    b.className = 'btn-mini';
    b.textContent = vesselLabel(ship);
    b.addEventListener('click', () => commit(() => [ship]));
    box.appendChild(b);
  });
  const parent = anchorEl.parentNode || anchorEl;
  parent.insertBefore(box, anchorEl.nextSibling);
  return box;
}

// Enough identity to choose safely: the hull, the name the player gave it, its crew grade, and
// what the hold holds with the space left over — the three facts any of the questions can turn
// on. A ship still called "Ship" contributes no name.
function vesselLabel(ship) {
  const named = ship.name && ship.name !== 'Ship' ? ` "${ship.name}"` : '';
  const load = (ship.cargo || []).length ? ship.cargo.map((c) => titleCase(c)).join(', ') : 'empty';
  const free = Math.max(0, shipCapacity(ship.type) - (ship.cargo || []).length);
  const crew = ship.crew ? `${titleCase(ship.crew)} crew` : 'no crew';
  return `${titleCase(ship.type)}${named} — ${crew}, ${load} (${free} free)`;
}

// Render a force="f" optional effect as a once-per-visit opt-in button (task 74). When
// it belongs to a choose-one group, taking any member locks the untaken ones so exactly
// one option is applied. The effect fires only on click — never on entry.
function renderForcedOptional(story, container, node, path) {
  const memo = 'force@' + path;
  const done = story.ctx.applied.has(memo);
  const token = forcedChoiceGroup(node, path);
  const chosen = token != null ? story.ctx.forcedChosen.get(token) : null;
  const lockedByGroup = chosen != null && chosen !== memo;
  const label = document.createElement('span');
  story.appendChildren(label, node, path);
  const btn = document.createElement('button');
  btn.className = 'btn-mini pay-action' + (done ? ' done' : '');
  btn.textContent = (done ? '☑ ' : '') + (label.textContent.trim() || 'Do this');
  if (done) {
    btn.disabled = true;
  } else if (lockedByGroup) {
    btn.disabled = true; btn.title = 'You may choose only one.';
  } else {
    btn.addEventListener('click', () => {
      const note = applyEffect(node, story.state, {});
      story.ctx.applied.add(memo);
      if (token != null) story.ctx.forcedChosen.set(token, memo);
      if (note) story.notify(note);
      story.rerender();
    });
  }
  container.appendChild(btn);
  return btn;
}

// ---- choose-one purchase & rewards ------------------------------------------

// The "choose one" cost button: paying only *arms* the choice (deducts the cost
// and sets flag key) — the linked reward pick buttons then grant a single reward
// and consume the flag, which re-enables this cost for another round. Gated purely
// on the flag (no permanent memo), so the pay→pick cycle repeats. (task 43)
function renderChooseOnePay(story, container, node, path, key) {
  const armed = story.state.getFlag(key);
  const shards = node.getAttribute('shards');
  const item = node.getAttribute('item');
  const cost = shards != null ? resolveValue(story.state, shards) : 0;
  const label = document.createElement('span');
  story.appendChildren(label, node, path);
  const text = label.textContent.trim()
    || (cost ? `Pay ${cost} Shards`
      : (item && item !== '?' && item !== '*' ? `Hand over the ${titleCase(item)}` : 'Pay'));

  const btn = document.createElement('button');
  btn.className = 'btn-mini pay-action' + (armed ? ' done' : '');
  btn.textContent = (armed ? '☑ ' : '') + text;
  // Nothing on the menu collectable, for a reason paying cannot change (a deal already held,
  // no carry slot and no forfeit to free one): refuse the click rather than take the payment
  // for a reward whose pick would then be disabled. (task 223)
  const wasted = menuWasteReason(node, key, story.sectionEl, story.state);
  // An open "?" possession/equipment forfeit buys the menu here too (§5.152 Holyamu takes
  // "any object with a +1 or greater bonus" for a curse): the player names which one leaves
  // before it is taken, exactly as on the other two payment paths. (task 226)
  const armPlan = node.tagName.toLowerCase() === 'lose' ? losePaymentPlan(node, story.state) : null;
  // Deduct the cost and set flag key (arming the choice). It runs from the CLICK, so it books its
  // taking at its own node — a resource guard ABOVE the menu keeps reading the sheet the walk
  // passed it with (tasks 261, 263). The reward pick that consumes the flag is a gain, read live.
  const arm = (opts) => {
    const mark = story.spendMark();
    applyEffect(node, story.state, opts);
    story.noteSpend(path, mark);
    story.rerender();
  };
  if (armed) {
    btn.disabled = true; btn.title = 'Paid — now choose your reward.';
  } else if (wasted) {
    btn.disabled = true; btn.title = wasted;
  } else if (shards != null && story.state.data.shards < cost) {
    btn.disabled = true; btn.title = 'Not enough Shards';
  } else if (armPlan && armPlan.present && !armPlan.eligible) {
    // Eligibility comes from the plan that will COMMIT the loss, as on the other two payment
    // paths. It used to come from state.hasItemMatch(item, tags), which knows nothing of the
    // payment's bonus=/group=/multiple= narrowing or the keep rule: §5.152 asks for "any object
    // with a +1 or greater bonus", so a cursed player carrying only a +0 match got a live button
    // that found no eligible loss on click — spending nothing, arming nothing, and rerendering
    // unchanged. (task 238)
    btn.disabled = true; btn.title = 'You have nothing to give.';
  } else if (armPlan && armPlan.needsChoice) {
    btn.addEventListener('click', () => {
      btn.disabled = true;
      showForfeitPicker(story, container, armPlan, (chooser) => arm({ chooser }));
    });
  } else if (needsAbilityChoice(node)) {
    // An open ability spec buys the menu ("give up a point of any ability"): the player names
    // which point leaves, then the arming happens with that answer. (task 224)
    btn.addEventListener('click', () => {
      btn.disabled = true;
      showAbilityPicker(story, container, node, (chooser) => arm({ chooser }));
    });
  } else {
    btn.addEventListener('click', () => arm({}));
  }
  container.appendChild(btn);
  return btn;
}

// One option of a "choose one" purchase: an inline pick button, live only while the
// linked cost is armed (flag set). Clicking applies just this reward — which clears
// the flag (consumes the payment) — so exactly one is granted per payment, and the
// cost re-enables for another round. Blessings already held / afflictions not held
// are disabled so a payment is never wasted on a no-op. (task 43)
export function renderChoosableReward(story, container, node, path, key) {
  const armed = story.state.getFlag(key);
  const btn = document.createElement('button');
  btn.className = 'btn-mini reward-pick';
  // A <group> that pays for this award grants it on its own click and consumes the flag
  // (renderGroup, task 125), and the item-family awards it grants are exactly the ones
  // groupPlan.linkedAwards collects. The award is on the sheet before this button is
  // redrawn, so show the ☑ done form every other taken award uses — the unarmed branch
  // below would otherwise caption the paid reward "Pay first to choose this." (task 307)
  if (story.ctx.applied.has(linkedGrantKey(key)) && ITEM_FAMILY_TAGS.has(node.tagName.toLowerCase())) {
    btn.disabled = true;
    btn.className += ' done';
    btn.textContent = '☑ ' + itemAwardDisplay(node);
    container.appendChild(btn);
    return btn;
  }
  btn.textContent = rewardLabel(node);
  const held = rewardWasteReason(story.state, node);
  if (!armed) {
    btn.disabled = true;
    // With a visible cost the player must pay first; a hidden/earned arming
    // (book1/597's <tick price hidden>) means the single pick has been spent.
    btn.title = hasVisiblePay(story.sectionEl, key) ? 'Pay first to choose this.' : 'You may choose only one of these rewards.';
  } else if (held) {
    btn.disabled = true; btn.title = held;
  } else {
    btn.addEventListener('click', () => {
      const note = grantChosenReward(story.state, node, key, story.book); // grant reward + clear flag key (engine.js, task 119)
      if (note) story.notify(note);
      story.rerender();
    });
  }
  container.appendChild(btn);
  return btn;
}

// The visit memo key recording that a <group> paid for — and granted — the awards
// linked to a price/flag key. Written by renderGroup, read by renderChoosableReward. (task 307)
function linkedGrantKey(key) { return 'linked@' + key; }

// What an item-family award displays under — "amber wand (Magic +1)", "500 Shards".
// The Take button prefixes it; the done form ticks it.
function itemAwardDisplay(node) {
  const tag = node.tagName.toLowerCase();
  const rawName = node.getAttribute('name') || tag;
  const currency = tag === 'item' ? currencyAward(rawName) : null;
  if (currency != null) return `${currency} Shards`;
  const { name } = splitItemName(rawName);
  const bonus = node.getAttribute('bonus') ? parseInt(node.getAttribute('bonus'), 10) : 0;
  const ability = node.getAttribute('ability');
  return `${titleCase(name)}${bonusSuffix(tag, bonus, ability)}`;
}

// A short label for a "choose one" reward button: its own words, else the
// blessing/curse/disease/poison it grants or lifts.
function rewardLabel(node) {
  const tag = node.tagName.toLowerCase();
  // Item/weapon/armour/tool award: "Take amber wand (Magic +1)".
  if (ITEM_FAMILY_TAGS.has(tag)) return `Take ${itemAwardDisplay(node)}`;
  const txt = (node.textContent || '').trim();
  if (txt) return txt;
  // A bare shards tick ("<tick shards='500' flag='x'/>") — book1/597's 500 Shards.
  if (tag === 'tick' && node.getAttribute('shards') != null) return `${node.getAttribute('shards')} Shards`;
  // The blessing by the name the book prints ("Safety from Storms"), not its stored key
  // ("storm"); a wildcard selector names nothing, so it falls through to 'Choose'. (task 218)
  const bl = node.getAttribute('blessing');
  if (bl && blessingLabel(bl)) return blessingLabel(bl);
  const af = node.getAttribute('curse') || node.getAttribute('disease') || node.getAttribute('poison');
  if (af) return af;
  // A wordless <resurrection section=…/> names itself the way the ordinary offer button
  // does, rather than falling through to a bare "Choose". (task 221)
  if (tag === 'resurrection') return 'Arrange resurrection';
  return 'Choose';
}

// The "pay to spin" cost: paying arms the linked <random flag="k"> (sets flag k)
// but does NOT fire the outcome effects — the roll reveals the single outcome that
// applies. Repeatable: once the roll consumes the flag the cost re-enables, so a
// per-day / per-attempt section can be paid again (book3/314, book5/674, book6/628).
// Gated purely on the flag (no permanent memo), so it tracks the pay↔roll cycle.
function renderRollPayment(story, container, node, path, key) {
  const armed = story.state.getFlag(key);
  const shards = node.getAttribute('shards');
  const item = node.getAttribute('item');
  const cost = shards != null ? resolveValue(story.state, shards) : 0;
  const label = document.createElement('span');
  story.appendChildren(label, node, path);
  const text = label.textContent.trim()
    || (cost ? `Pay ${cost} Shards` : (item && item !== '?' && item !== '*' ? `Hand over the ${titleCase(item)}` : 'Pay'));

  const btn = document.createElement('button');
  btn.className = 'btn-mini pay-action' + (armed ? ' done' : '');
  btn.textContent = (armed ? '☑ ' : '') + text;
  // Deduct the cost and set flag key (arming the roll). Paid from the CLICK, so it books its
  // taking at its own node, where a resource guard above the offer reads it (tasks 261, 263).
  const arm = (opts) => {
    const mark = story.spendMark();
    applyEffect(node, story.state, opts);
    story.noteSpend(path, mark);
    story.rerender();
  };
  if (armed) {
    btn.disabled = true; btn.title = 'Paid — now make the roll.';
  } else if (shards != null && story.state.data.shards < cost) {
    btn.disabled = true; btn.title = 'Not enough Shards';
  } else if (item != null && item !== '?' && item !== '*' && !story.state.hasItem(item)) {
    btn.disabled = true; btn.title = `You need the ${titleCase(item)}`;
  } else if (needsAbilityChoice(node)) {
    // An open ability spec buys the spin ("give up a point of any ability to roll"): the
    // player names which point leaves, then the arming happens with that answer — the third
    // payment path that would otherwise commit it blind. (task 225)
    btn.addEventListener('click', () => {
      btn.disabled = true;
      showAbilityPicker(story, container, node, (chooser) => arm({ chooser })); // the named point leaves
    });
  } else {
    btn.addEventListener('click', () => arm({}));
  }
  container.appendChild(btn);
  return btn;
}

// ---- item awards ------------------------------------------------------------

// <items group="X" limit="N"/> — a controller for a "choose up to N" award group; the
// individual <weapon|armour|tool|item group="X"> rows share the id and enforce the cap
// (see renderItemAward). This element itself renders a small live status line so the
// player can see how many picks remain.
export function renderItemsController(story, container, node, path) {
  const group = node.getAttribute('group');
  const limit = group ? story.ctx.groupLimits.get(group) : null;
  if (!limit) return null;
  const taken = story.ctx.groupPicks.get(group) || 0;
  const remaining = Math.max(0, limit - taken);
  const status = document.createElement('span');
  status.className = 'items-pick-status';
  status.textContent = remaining > 0
    ? `Choose up to ${limit} — ${remaining} left`
    : `Chosen all ${limit}`;
  container.appendChild(status);
  return status;
}

// A standalone item/weapon/armour/tool award in prose (e.g. "Catch a smoulder fish.
// Note it on your Adventure Sheet."). Shows the item and lets you take it once,
// respecting the 12-item carry limit.
export function renderItemAward(story, container, node, path) {
  const kind = node.tagName.toLowerCase();
  // A flag-linked item award inside a heterogeneous "choose one" reward menu
  // (book1/597 amber wand | 500 Shards | resurrection) renders as a single pick,
  // live only once the choice is armed and blocking its siblings when taken. (task 63)
  const awardFlag = node.getAttribute('flag');
  if (awardFlag != null && isChooseOne(story.sectionEl, awardFlag)) return renderChoosableReward(story, container, node, path, awardFlag);
  // A single priced item reward or a pure item-family barter (§3.346, §1.342, §4.634):
  // gate the Take button on the flag its payment arms — armed → live, taken → consumed —
  // so it is neither free to take unpaid nor a no-op once paid. (task 125)
  if (awardFlag != null && isPricedItemAward(story.sectionEl, awardFlag)) return renderChoosableReward(story, container, node, path, awardFlag);
  const rawName = node.getAttribute('name') || (kind === 'weapon' ? 'weapon' : kind);
  // A "N Shards" award is stackable currency, not a possession (dragon hoard §1.16).
  const currency = kind === 'item' ? currencyAward(rawName) : null;
  // A multi-name label ("fur cloak|wolf pelt") displays under its first name; the
  // rest ride along as tags so ownership/<if> match either name (task 29).
  const { name, alts } = splitItemName(rawName);
  const bonus = node.getAttribute('bonus') ? parseInt(node.getAttribute('bonus'), 10) : 0;
  const ability = node.getAttribute('ability') || null;
  const display = currency != null ? `${currency} Shards` : titleCase(name) + bonusSuffix(kind, bonus, ability);
  const key = 'take@' + path;
  // The loot on the body is the fight's reward: a bare award written after a <fight> is
  // held by the fight gate until the fight resolves in its favour (book1/55's bag of
  // pearls, book5/162's lockpicks). Show a DISABLED Take rather than omitting it, the way
  // a held <lose>/<gain> still shows its words — the player reads what is at stake but
  // cannot pocket it and then lose. Covers replace= awards too (they route through here). (task 213)
  if (isFightHeld(story, node)) {
    const wait = document.createElement('button');
    wait.className = 'btn-mini take-item';
    wait.disabled = true;
    wait.textContent = 'Take ' + display;
    wait.title = aggregateFightOutcome(story.sectionFights) ? 'The fight went the other way' : 'Fight first';
    container.appendChild(wait);
    return wait;
  }
  // replace= TRANSFORMS an existing possession into this reward instead of adding a
  // duplicate: a named replace="X" converts the item named X, an empty replace=""
  // converts the same-named item (§5.118 plain flute/axe → enchanted, bag of gold →
  // 2000 Shards; §6.207 old sceptre → +5; §6.448a cursed sword → clean +2). It is
  // net-zero on slots so the 12-item cap never blocks it, and it is disabled while
  // the source item is absent. Visit-safe (memoised once done). (task 95)
  if (node.getAttribute('replace') != null) return renderReplaceAward(story, container, node, path, { kind, name, alts, bonus, ability, currency, display, key });
  // Grouped "choose up to N" award: consult the shared group tally so the extra
  // rows lock once the player has taken their allotment (book1/16, book4/218…).
  const group = node.getAttribute('group');
  const limit = group ? story.ctx.groupLimits.get(group) : null;
  const groupCount = group ? (story.ctx.groupPicks.get(group) || 0) : 0;

  // quantity= awards more than one of the same reward — a fixed count (§6.257
  // twelve silver nuggets, §3.16 three swords) or a rolled one (§1.561 x fish,
  // §4.425 x lots of 1000 Shards). Each click takes ONE unit, so a possession
  // award can be picked up partially when the 12-item cap bites and the rest stay
  // available; a rolled quantity waits for its <random var> before it is live
  // (else x=0 would grant nothing and memoise it). (task 94)
  const qtyAttr = node.getAttribute('quantity');
  if (qtyAttr != null && pendingRollVar(node, story.state, story.sectionEl, viewPendingVars(story))) {
    const wait = document.createElement('button');
    wait.className = 'btn-mini take-item';
    wait.disabled = true;
    wait.textContent = 'Take ' + display;
    wait.title = 'Roll first';
    container.appendChild(wait);
    return wait;
  }
  const quantity = qtyAttr != null ? Math.max(0, resolveValue(story.state, qtyAttr)) : 1;
  const takenCount = story.ctx.awardCounts.get(key) || 0;
  const remaining = Math.max(0, quantity - takenCount);
  const taken = remaining <= 0;
  const countSuffix = quantity > 1 ? ` (${remaining} of ${quantity} left)` : '';
  const groupFull = limit != null && !taken && groupCount >= limit;
  const btn = document.createElement('button');
  btn.className = 'btn-mini take-item' + (taken ? ' done' : '');
  if (taken) {
    btn.disabled = true;
    btn.textContent = '☑ ' + display + (quantity > 1 ? ` (×${quantity})` : '');
  } else if (groupFull) {
    btn.disabled = true;
    btn.textContent = display + countSuffix;
    btn.title = `You may choose only ${limit}`;
  } else if (currency == null && story.state.freeSlots() <= 0) {
    btn.disabled = true;
    btn.textContent = display + countSuffix;
    btn.title = 'No room (12-item carry limit)';
  } else {
    btn.textContent = 'Take ' + display + countSuffix;
    const tags = [...parseTags(node.getAttribute('tags')), ...alts];
    const effects = readItemEffects(node); // <effect> use/aura/wielded children (task 41)
    // A trapped treasure carries a <curse>/<disease>/<poison> child that only
    // bites once the item is taken (book5/238 stone bracelet → half MAGIC). (task 60)
    const afflictions = Array.from(node.querySelectorAll(':scope > curse, :scope > disease, :scope > poison'));
    btn.addEventListener('click', () => {
      if (currency != null) story.state.adjustMoney(currency); // stackable "N Shards" treasure
      else {
        story.state.addItem(makeItem(kind, name, bonus, ability, tags, effects, group));
        afflictions.forEach((aff) => applyEffect(aff, story.state));
      }
      story.ctx.awardCounts.set(key, takenCount + 1);
      if (limit != null) story.ctx.groupPicks.set(group, groupCount + 1);
      story.rerender();
    });
  }
  container.appendChild(btn);
  return btn;
}

// A replace= award (see renderItemAward): transform the matching possession into
// this reward in place. targetName is the named replace="X", or — for empty
// replace="" — the reward's own name (the same-named item is upgraded). The old
// possession is removed and the new one added (or, for a "N Shards" reward, its
// value banked), so the slot count does not rise and the carry cap never refuses
// the conversion. Disabled while the source is absent. (task 95)
function renderReplaceAward(story, container, node, path, { kind, name, alts, bonus, ability, currency, display, key }) {
  const targetName = node.getAttribute('replace') || name;
  const source = story.state.findItems(targetName)[0] || null;
  const done = story.ctx.applied.has(key);
  const btn = document.createElement('button');
  btn.className = 'btn-mini take-item' + (done ? ' done' : '');
  if (done) {
    btn.disabled = true;
    btn.textContent = '☑ ' + display;
  } else if (!source) {
    btn.disabled = true;
    btn.textContent = display;
    btn.title = `You have no ${titleCase(targetName)} to transform`;
  } else {
    btn.textContent = 'Take ' + display;
    const tags = [...parseTags(node.getAttribute('tags')), ...alts];
    const effects = readItemEffects(node);
    const afflictions = Array.from(node.querySelectorAll(':scope > curse, :scope > disease, :scope > poison'));
    // Keep the transformed item's provenance: the reward's own group=, else the
    // source item's, so a group-scoped count (§5.118) stays stable across the swap.
    const grp = node.getAttribute('group') || source.group || null;
    btn.addEventListener('click', () => {
      story.state.removeItemById(source.id); // net-zero: drop the old, add/bank the new
      if (currency != null) story.state.adjustMoney(currency);
      else {
        story.state.addItem(makeItem(kind, name, bonus, ability, tags, effects, grp));
        afflictions.forEach((aff) => applyEffect(aff, story.state));
      }
      story.ctx.applied.add(key);
      story.rerender();
    });
  }
  container.appendChild(btn);
  return btn;
}
