// render-gates.js — DOM-free navigation-gate computation for section rendering (task 119).
//
// Pure planners that scan a parsed <section> and decide which onward navigations must be
// held (behind an unresolved fight, a mandatory roll, or a forced transfer) and which
// post-fight effects to defer until the fight resolves. The renderer tags and disables
// the actual buttons (the tag*/apply* methods stay in the view); these functions only
// DECIDE. No DOM construction, no browser UI globals.

import { boolAttr, isDiceExpr, PASSIVE_BODY_TAGS } from './engine.js';

// True when a die roll in this section is gated behind the payment keyed `k`: a
// <random|rankcheck|difficulty flag="k"> paired with a [price="k"] cost — the "pay to
// spin" idiom (book2/157, book3/314, book5/674, book6/171/587/50/628). (task 30)
// Defined here (not render-rules.js, which re-exports it) so the dependency between the
// two rule modules stays one-way: render-rules composes these gate deferrals in
// classifyPassive, so it imports from this module — never the reverse.
export function isRollGate(sectionEl, k) {
  return !!(k != null && sectionEl &&
    sectionEl.querySelector(`random[flag="${k}"], rankcheck[flag="${k}"], difficulty[flag="${k}"]`));
}

// DOM node type / position constants, spelled as literals so this module never reaches for
// the browser `Node` global (matching render-rules.js).
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const DOCUMENT_POSITION_FOLLOWING = 0x04;

// A revealed branch that carries its own destination. The "Continue → N" the view synthesises
// from a `section=` attribute is a real exit with NO node of its own, so a gate that collected
// only `choice, goto, return` elements never saw it and every node-keyed tagger missed it
// (task 258: book2/105's pickpocket kept nothing if you tracked him). The gates below collect
// the branch ITSELF in the same positions, and the view tags it where it builds the button.
// A branch attribute can never carry flee="t", so no gate needs to exempt one.
const BRANCH_EXIT_SELECTOR = 'outcome[section], success[section], failure[section]';
const BRANCH_EXIT_TAGS = new Set(['outcome', 'success', 'failure']);

// The item-family effect tags (a possession award). Defined here rather than in
// render-rules.js — which re-exports it for its own callers — because computeFightGate
// below needs it and the dependency between the two rule modules stays one-way.
export const ITEM_FAMILY_TAGS = new Set(['item', 'weapon', 'armour', 'tool']);

// The effects a fight gate holds: a value/possession change written after the fight.
const FIGHT_EFFECT_TAGS = new Set(['lose', 'gain', ...ITEM_FAMILY_TAGS]);

// The attributes an effect reads its MAGNITUDE from — how many Stamina, how many Shards, how
// many of the item. The single list behind both halves of "is this effect still waiting on a
// roll": render-rules.js's pendingRollVar (which defers the effect) imports it from here, and
// computeRollGate below (which holds the exits until that roll is made) reads it too, so the
// gate and the deferral can never disagree about what counts as reading a roll's result.
export const EFFECT_MAGNITUDE_ATTRS = ['multiple', 'shards', 'stamina', 'staminato', 'amount', 'count', 'itemAt', 'quantity'];

// The attributes a CONDITION reads its comparison bar from, beside the `var=` naming the value
// under test. The same arrangement as the list above, for the same reason: render-rules.js's
// conditionPending (which holds an undecided branch) imports it from here, and the roll gate's
// condition seed (which holds the exits until the roll that branch reads is made) reads it too,
// so the two can never disagree about what counts as a condition reading a roll's result.
// A bar may itself be a variable (§2.270's `lessthan="rank"`, §5.315's `lessthan="pre"`), which
// is why the values are traced through expressionVars and not merely compared as numbers. (task 292)
export const CONDITION_VALUE_ATTRS = ['equals', 'greaterthan', 'lessthan', 'shards', 'ticks'];

// Wrapper tag sets used only by these gate computations.
const ROLLGATE_OPTIONAL_WRAP = new Set(['if', 'elseif', 'else', 'success', 'failure', 'outcome', 'group']);
// A roll inside one of these is not the section's own step but the FIGHT's: a <flee> branch's
// parting shot (book2/770's crossbow bolt), a <fightround> per-round check (book5/24's
// Hangman) or a <fightdamage> replacement (book5/356's ability drain). None is reached unless
// the fight takes that turn, so seeding a gate from one would hold the win route behind a roll
// the winner never makes. computeFightGate already treats flee/fightdamage as one family
// ("their own gotos aren't gated"); fightround is the third member. (task 247)
const ROLLGATE_FIGHT_HOOK_WRAP = new Set(['flee', 'fightround', 'fightdamage']);
const ROLLGATE_OUTCOME_WRAP = new Set(['outcomes', 'outcome']);
const TRANSFER_GROUP_WRAP = new Set(['group']);
const BUY_GROUP_WRAP = new Set(['group']);
// A navigation inside one of these is the player's to pick, not a step the section
// executes: a <choice> row, and a <group>'s bundled "click to do this" action.
const REDIRECT_OPTIONAL_WRAP = new Set(['choice', 'choices', 'group']);
// A redirect nested inside another condition is not the section's own "leave now" step but
// one arm of a wider decision, so it never gates the rest of the section (computeRedirectGate).
const REDIRECT_CONDITIONAL_WRAP = new Set(['if', 'elseif', 'else', 'success', 'failure', 'outcome', 'outcomes']);

// Does an ancestor of `node` carry one of these (lowercased) tag names? Walks up to the
// section root. A manual sibling of DOM `closest`, kept explicit for the parsed section tree.
export function hasAncestorTag(node, tagSet) {
  for (let p = node.parentNode; p && p.nodeType === ELEMENT_NODE; p = p.parentNode) {
    if (tagSet.has(p.tagName.toLowerCase())) return true;
  }
  return false;
}

// The aggregate outcome of a section's sequential fights (task 45): won only once EVERY
// fight is won; a loss on any fight makes the whole section a loss; a flee ends it;
// otherwise still unresolved (null — the gate stays shut).
export function aggregateFightOutcome(fights) {
  if (!fights.length) return null;
  if (fights.some((f) => f.outcome === 'lose')) return 'lose';
  if (fights.some((f) => f.outcome === 'fled')) return 'fled';
  if (fights.every((f) => f.outcome === 'win')) return 'win';
  return null;
}

// Mid-fight escape codewords (task 54): a codeword BOTH ticked somewhere in this fight
// section AND used as a box= gate on a choice. That box= choice is the surrender/flee
// route, valid only while the fight is live. Empty unless the section has a fight.
export function computeEscapeCodewords(sectionEl) {
  if (!sectionEl || !sectionEl.querySelector('fight')) return new Set();
  const boxes = new Set();
  sectionEl.querySelectorAll('[box]').forEach((c) => { const b = c.getAttribute('box'); if (b) boxes.add(b); });
  if (!boxes.size) return new Set();
  const ticked = new Set();
  sectionEl.querySelectorAll('tick[codeword]').forEach((t) => {
    t.getAttribute('codeword').split(/[|,]/).forEach((c) => ticked.add(c.trim()));
  });
  return new Set([...boxes].filter((b) => ticked.has(b)));
}

// The fight gate (tasks 21/45/54/69/213): the navigation nodes that follow a <fight>
// (which must not be clickable until it resolves), which of them are the lose-branch, and
// each BARE post-fight <lose>/<gain> or item-family award classified 'win'/'lose'/'uncond'
// so the renderer can hold it until the fight resolves — the loot on the body is the
// fight's reward, not a free pickup before it (book1/55, book5/162). `escapeCodewords`
// leaves mid-fight surrender/flee choices ungated.
// Returns { navNodes:Set, loseNodes:Set, effectNodes:Map, hasLosePath } or null.
export function computeFightGate(sectionEl, escapeCodewords) {
  if (!sectionEl || !sectionEl.querySelector('fight')) return null;
  const navNodes = new Set(), loseNodes = new Set(), effectNodes = new Map();
  const LOSE = /(you lose|if you lose|are beaten|are defeated|reduced to \d|pass out|knocked (out|unconscious)|battered into|lose the (fight|combat|battle)|you are killed|you are slain)/i;
  const WIN = /(you win|if you win|defeat|reduce the|kill the|slay|victor|survive|beat the|overcome the|are victorious)/i;
  const WRAP = new Set(['if', 'elseif', 'else', 'success', 'failure', 'outcomes', 'group', 'choice']);
  let seenFight = false, recent = '';
  const walk = (n, skip, gated) => {
    for (const ch of Array.from(n.childNodes)) {
      if (ch.nodeType === TEXT_NODE) { if (seenFight) recent = (recent + ' ' + (ch.nodeValue || '')).slice(-220); continue; }
      if (ch.nodeType !== ELEMENT_NODE) continue;
      const tag = ch.tagName.toLowerCase();
      if (tag === 'fight') { seenFight = true; recent = ''; walk(ch, true, gated); continue; }
      const childSkip = skip || tag === 'flee' || tag === 'fightdamage'; // Flee/fightdamage own gotos aren't gated
      const childGated = gated || WRAP.has(tag);
      const isFleeChoice = tag === 'choice' && boolAttr(ch.getAttribute('flee'));
      const isEscapeChoice = ch.getAttribute('box') != null && escapeCodewords.has(ch.getAttribute('box'));
      // A branch's own section= is an exit too (task 258) — no section in books 1-6 pairs a fight
      // with one, so this holds nothing today; it is here because the rule belongs to the gate.
      const isExit = tag === 'goto' || tag === 'choice' || tag === 'return'
        || (BRANCH_EXIT_TAGS.has(tag) && ch.getAttribute('section') != null);
      if (seenFight && !skip && !isFleeChoice && !isEscapeChoice && isExit) {
        navNodes.add(ch);
        if (boolAttr(ch.getAttribute('dead')) || (LOSE.test(recent) && !WIN.test(recent))) loseNodes.add(ch);
        recent = '';
      }
      if (seenFight && !skip && !gated && FIGHT_EFFECT_TAGS.has(tag) && !boolAttr(ch.getAttribute('hidden'))) {
        const role = LOSE.test(recent) && !WIN.test(recent) ? 'lose'
                   : WIN.test(recent) && !LOSE.test(recent) ? 'win'
                   : 'uncond';
        effectNodes.set(ch, role);
      }
      walk(ch, childSkip, childGated);
    }
  };
  walk(sectionEl, false, false);
  if (!navNodes.size && !effectNodes.size) return null;
  return { navNodes, loseNodes, effectNodes, hasLosePath: loseNodes.size > 0 };
}

// A fight-escape bracket's closing <lose codeword="X"> (after the fight) must not fire
// while the fight is unresolved / being fled — that would revoke the surrender/flee choice
// before it can be taken. Defer it until the fight is WON. An entry-clear before the fight
// is left alone. (task 54)
export function isDeferredEscapeClear(node, escapeCodewords, sectionFights) {
  if (node.tagName.toLowerCase() !== 'lose') return false;
  const cw = node.getAttribute('codeword');
  if (!cw || !escapeCodewords.size) return false;
  if (!cw.split(/[|,]/).some((c) => escapeCodewords.has(c.trim()))) return false;
  if (!sectionFights.length) return false; // before the fight → an entry clear, apply now
  return aggregateFightOutcome(sectionFights) !== 'win';
}

// A hidden <tick removetag="X"> — an end-of-section selection-tag cleanup that must not run
// until the tag has done its job (§5.386). Deferred to the section exit. (task 88)
export function isDeferredTagCleanup(node) {
  return node.tagName.toLowerCase() === 'tick'
    && boolAttr(node.getAttribute('hidden'))
    && node.getAttribute('removetag') != null;
}

// What counts as a write to the Adventure Sheet — the engine's own passive-effect set (which
// already counts the <transfer> book6/490 turns on) plus the item-family awards, together a
// superset of the effects computeFightGate holds when they are written BARE. Borrowed from
// engine.js rather than spelled out again, so no two gates drift apart on what an effect is.
// Two ask the question: what makes a post-fight conditional chain worth holding
// (isDeferredFightChain), and what makes a roll's result still owed (computeRollGate).
const SHEET_EFFECT_TAGS = new Set([...PASSIVE_BODY_TAGS, ...ITEM_FAMILY_TAGS]);

// Does this if/elseif/else chain — the head plus the elseif/else element siblings after it,
// the same run appendChildren treats as one chain — write anything to the sheet? Any branch
// counts: the deferral holds the chain as a whole, so an effect in the <else> ("if you sold
// them the ring you may buy it back, else they carry 800 Shards") is as good a reason as one
// in the <if>.
function chainHasEffect(head) {
  for (let el = head; el; el = el.nextElementSibling) {
    const tag = el.tagName.toLowerCase();
    if (el !== head && tag !== 'elseif' && tag !== 'else') break;
    for (const d of el.querySelectorAll('*')) {
      if (SHEET_EFFECT_TAGS.has(d.tagName.toLowerCase())) return true;
    }
  }
  return false;
}

// An if/elseif/else chain positioned AFTER a fight must not run before that fight is decided.
// Defer the WHOLE chain (the else must not slip active in the held branch's place). Two
// reasons to hold, and the second is the case the first left uncovered:
//
//  * a dead=-gated chain IS the fight's win/lose outcome (book2/462's confiscate-return,
//    book6/348's "if you win" reward): while the fight is unresolved the player is still
//    alive, so a naive dead="f" test fires the win branch before a blow is struck. (task 39)
//  * a chain gated on anything else — codeword=, item=, var= — whose body writes to the
//    sheet. computeFightGate deliberately skips <if>-wrapped effects because the conditional
//    owns them, and this deferral owned only the dead= spelling, so book6/490's
//    <if codeword="6.490.1"><transfer item="*" from="6.490"/> handed back the weapons the
//    page had just confiscated — on the rerender after the click that ticked the codeword,
//    mid-fight, with the subdual bargain's price unpaid. (task 245)
//
// A chain with no effect in it stays live: narration about the fight, or a <goto> the fight
// gate already locks (book6/716/743), would otherwise render grayed for the whole fight.
// Either way a FLED fight counts as unresolved — giving up earns neither outcome.
export function isDeferredFightChain(node, sectionFights) {
  if (!sectionFights.length) return false;               // no fight before this node
  if (node.getAttribute('dead') == null && !chainHasEffect(node)) return false;
  const outcome = aggregateFightOutcome(sectionFights);
  return outcome !== 'win' && outcome !== 'lose';        // still unresolved (or fled) → hold
}

// ---- variable dependency trace (task 181; moved here by task 247) -----------
//
// Which variables a value READS, and what is derived from them. computeRollGate below needs
// the trace to ask whether an effect still owes its magnitude to a roll, and render-rules.js
// needs it for the reroll decision boundary it documents, so it lives HERE and is re-exported
// there — the same one-way arrangement isRollGate and ITEM_FAMILY_TAGS use above.

// The variable identifiers an attribute value would READ once resolved (resolveValue /
// evalExpression): none for a blank, a plain integer or a dice expression, otherwise every
// bare identifier in the expression. This is how a provisional roll result is traced through
// the values derived from it (task 181). Sheet keywords (stamina/rank/…) are left in the list:
// no roll in this corpus names its var after one, so a keyword can never itself be pending.
export function expressionVars(str) {
  const s = String(str == null ? '' : str).trim();
  if (s === '' || /^-?\d+$/.test(s) || isDiceExpr(s)) return [];
  return s.match(/[A-Za-z_][A-Za-z0-9_]*/g) || [];
}

// The variables a `<set>` READS: its value= expression, plus the roll-result vars a success=
// counts (task 294). `<set var="passed" success="s|m">` depends on both rolls exactly as
// `value="s+m"` would, so both the trace below and setPending (render-rules.js — the refusal
// that stops the same set writing before those rolls land) must follow it, or §4.257's gate
// would stop seeing the very rolls its chain routes on.
export function setReadVars(node) {
  return [...expressionVars(node.getAttribute('value')), ...expressionVars(node.getAttribute('success'))];
}

// Every variable whose value is still PROVISIONAL this render (task 181): `seed` (the vars a
// pending reroll decision's roll wrote) grown through the section's deriving <set> nodes
// (setReadVars above), transitively — a value derived from a provisional var is itself provisional
// (§2.698's `roll*100` → cash, §2.684's `(rank+1)-roll` → result). The scan is deliberately
// position- and branch-blind: an over-wide set only DEFERS work until the decision settles,
// whereas a missed dependency would commit a rejected result.
export function provisionalVarClosure(sectionEl, seed) {
  const out = new Set(seed || []);
  if (!sectionEl || !out.size) return out;
  const sets = Array.from(sectionEl.querySelectorAll('set[var][value], set[var][success]'));
  for (let pass = 0; pass <= sets.length; pass++) {
    let grew = false;
    for (const s of sets) {
      const v = s.getAttribute('var');
      if (!v || out.has(v)) continue;
      if (setReadVars(s).some((id) => out.has(id))) { out.add(v); grew = true; }
    }
    if (!grew) break;
  }
  return out;
}

// ---- the roll gate (tasks 104 + 247) ---------------------------------------

// Is this roll the section's OWN mandatory step — one the player must make before leaving —
// rather than an option beside it? A pay-gated ("pay to spin") roll waits on a payment that may
// never come, a conditionally present or player-optional one may not be reached at all, and a
// fight-hook one belongs to the fight. Shared by all three seeds below, so none can gate on a
// roll the section does not guarantee. (task 247)
//
// force= is the tag's own word for exactly this question — "whether the player must activate
// this action to continue", default true (JaFL-XML-Tags, <random>/<difficulty>/<rankcheck>) —
// and reading it was missing until task 249 needed it for the branch seed: book1/21's
// force="f" CHARISMA roll is the printed ALTERNATIVE to fighting the thug, so gating on it
// would demand the talk-out attempt the page offers to skip. One shipped section was already
// held by the older seeds for the same reason, and softly at that: book2/440's "if you want
// to read a book" table (force="f") locked the "when you are ready to leave" exit behind a
// roll whose every outcome carries the player away. (task 249)
function isMandatoryRoll(sectionEl, r) {
  return isForcedRoll(sectionEl, r)
    && !hasAncestorTag(r, ROLLGATE_OPTIONAL_WRAP) && !hasAncestorTag(r, ROLLGATE_FIGHT_HOOK_WRAP);
}

// The half of the test above that asks about the ROLL itself rather than where it sits: a
// pay-gated or force="f" roll is one the player may never make. Split out for the outcome-row
// gate (task 257), which reads `outcome` as a revealed row rather than an optional wrapper but
// must still refuse a roll no player can settle — an exit held behind an unpayable die is a
// softlock, not a rule.
function isForcedRoll(sectionEl, r) {
  if (r.getAttribute('price') != null) return false;
  if (!boolAttr(r.getAttribute('force'), true)) return false;
  const fl = r.getAttribute('flag');
  return !(fl != null && isRollGate(sectionEl, fl));
}

// Seed 1 (task 104) — the mandatory <random> whose result an <outcomes> TABLE reads.
function tableRoll(sectionEl, outcomesNode) {
  return Array.from(sectionEl.querySelectorAll('random')).find((r) =>
    !!(r.compareDocumentPosition(outcomesNode) & DOCUMENT_POSITION_FOLLOWING)
    && isMandatoryRoll(sectionEl, r)) || null;
}

// Seed 2 (task 247) — the mandatory roll whose result an EFFECT reads. The gate had only
// seed 1, so its precondition was a page SHAPE (a roll read by a table) and not the rule
// "hold the exits until the roll is made": book3/199's `<random var="r">` +
// `<set var="half" value="(r+1)/2">` + `<lose stamina="half">` has no table, so its
// cross-book <goto> was live from entry and the player walked away undamaged — likewise
// book5/477's water-drake jet and 34 more (36 shipped sections gain the gate, measured), every
// one of them a page that needed the rolled VALUE: the corpus's ordinary rolled wound,
// `<lose stamina="2d">`, applies on entry and cannot be skipped either way.
//
// "Reads" = an Adventure Sheet effect whose magnitude is the roll's var, or a value derived
// from it through the section's <set>s. Position-blind on the read, like the trace above and
// pendingRollVar (§2.521's `<lose multiple="x">` sits ABOVE its roll and still waits for it);
// the roll's own position still bounds which navigation the gate holds. A roll whose var
// nothing reads owes nothing and keeps gating nothing.
function owedRoll(sectionEl) {
  const effects = Array.from(sectionEl.querySelectorAll([...SHEET_EFFECT_TAGS].join(', ')));
  if (!effects.length) return null;
  return Array.from(sectionEl.querySelectorAll('random[var], rankcheck[var], difficulty[var]')).find((r) => {
    const v = (r.getAttribute('var') || '').trim();
    if (!v || !isMandatoryRoll(sectionEl, r)) return false;
    const owed = provisionalVarClosure(sectionEl, [v]);
    return effects.some((e) => EFFECT_MAGNITUDE_ATTRS.some((a) => {
      const raw = e.getAttribute(a);
      return raw != null && expressionVars(raw).some((id) => owed.has(id));
    }));
  }) || null;
}

// Seed 3 (task 249) — the mandatory roll whose result a BRANCH reads. Seeds 1 and 2 ask what
// the result FEEDS (a table, an effect's magnitude), so a check read only by its own
// <success>/<failure> seeded nothing, and where the section's navigation was held by the fight
// gate instead nothing else asked for the roll either: book5/198's Champion was fought at full
// COMBAT and the MAGIC check that halves it never made, book5/218's troll fought without ever
// escaping its grip, book5/689's drake before the drowning check had said whether the player
// was alive. 38 shipped sections gain a held exit, book5/550 among them — its own editorial
// comment ("this way, you can only get to the choices after making the difficulty roll") is
// the page asking for this gate.
//
// A var= branch names its roll, so it is matched through the same closure the effect seed uses.
// A BARE <success>/<failure> is bound the way the walk binds it — to the nearest roll above it
// (render.js's activeRoll) — so a branch belonging to a later roll can never seed an earlier one.
function branchedRoll(sectionEl) {
  const branches = Array.from(sectionEl.querySelectorAll('success, failure'));
  if (!branches.length) return null;
  const rolls = Array.from(sectionEl.querySelectorAll('random, rankcheck, difficulty'));
  const nearestRollAbove = (b) => {
    let found = null;
    for (const r of rolls) { if (r.compareDocumentPosition(b) & DOCUMENT_POSITION_FOLLOWING) found = r; }
    return found;
  };
  return rolls.find((r) => {
    if (!isMandatoryRoll(sectionEl, r)) return false;
    const v = (r.getAttribute('var') || '').trim();
    const owed = v ? provisionalVarClosure(sectionEl, [v]) : null;
    return branches.some((b) => {
      if (!(r.compareDocumentPosition(b) & DOCUMENT_POSITION_FOLLOWING)) return false;
      const bv = b.getAttribute('var');
      if (bv != null) return !!owed && owed.has(bv.trim());
      return nearestRollAbove(b) === r;
    });
  }) || null;
}

// The vars a CONDITION reads: the `var=` naming the value under test, plus every identifier in
// its comparison bars. Shared with render-rules.js's conditionPending (task 292) — see
// CONDITION_VALUE_ATTRS above for why the two must read the same attributes.
export function conditionVars(node) {
  const out = new Set();
  if (!node) return out;
  const v = node.getAttribute('var');
  if (v != null && String(v).trim() !== '') out.add(String(v).trim());
  for (const a of CONDITION_VALUE_ATTRS) {
    const raw = node.getAttribute(a);
    if (raw != null) expressionVars(raw).forEach((id) => out.add(id));
  }
  return out;
}

// Seed 4 (task 292) — the mandatory roll whose result a CONDITION reads. Seeds 1-3 ask what the
// result feeds: an outcome table, an effect's magnitude, a <success>/<failure> branch. A section
// that routes on `<if var=>` instead has none of the three, so §4.257's two Difficulty-14 rolls
// gated nothing at all and its "if both rolls failed" <goto> was live on entry — both margins read
// 0, so `lessthan="1"` matched before either roll was made. No sentinel can close that one: a
// <difficulty> margin has no out-of-range "not yet rolled" value (0 MEANS failure), and whatever
// value a sentinel wrote, some arm of an if/elseif/else chain always matches — so the fix has to
// be the gate.
//
// Position-blind on the read, like seed 2 and the trace itself: §3.40's editorial note sits ABOVE
// the roll it describes and still reads its var. The roll's own position still bounds which
// navigation is held, and a condition reading a var no roll fills seeds nothing.
//
// EVERY such roll, not the first: §4.257 routes on the PAIR, and a gate released by whichever of
// the two the player rolled first still hands out the wrong exit — fail the SCOUTING roll and
// `m` is 0, so the "if both rolls failed" arm matches with the MAGIC roll unmade. This is the
// one seed whose condition can read more than one roll (a table matches one row, an effect owes
// one magnitude, a branch belongs to one check), so it is the one that returns a list.
function conditionRolls(sectionEl) {
  const conds = Array.from(sectionEl.querySelectorAll('if, elseif, while'));
  if (!conds.length) return [];
  const read = new Set();
  conds.forEach((c) => conditionVars(c).forEach((id) => read.add(id)));
  if (!read.size) return [];
  return Array.from(sectionEl.querySelectorAll('random[var], rankcheck[var], difficulty[var]')).filter((r) => {
    const v = (r.getAttribute('var') || '').trim();
    if (!v || !isMandatoryRoll(sectionEl, r)) return false;
    return [...provisionalVarClosure(sectionEl, [v])].some((id) => read.has(id));
  });
}

// A mandatory roll must be made before the section's onward navigation unlocks, and (table
// seed) a "get lost" outcome carrying its own <goto> suppresses those choices. `outcomesNode`
// is the table this gate's roll feeds, or null when the gate came from the effect, branch or
// condition seed — there is no outcome to match then, so applyRollGate releases on the roll (and,
// for a branch seed, the <success>/<failure> the roll reveals) RESOLVING. Returns
// { rollNode, rollNodes:Set, seed, outcomesNode, navNodes:Set, fightNodes:Set, rollPaths:Map,
// matchedOutcome } or null.
export function computeRollGate(sectionEl) {
  if (!sectionEl) return null;
  const outcomesNode = sectionEl.querySelector('outcomes');
  const tabled = outcomesNode ? tableRoll(sectionEl, outcomesNode) : null;
  // The seeds are tried in order and `seed` names the one that fired, so a census can ask which
  // sections a newly added seed is holding — the measurement task 292 wanted before committing it.
  let seed = 'table', rolls = tabled ? [tabled] : [];
  const trySeed = (name, find) => {
    if (rolls.length) return;                 // lazy, so a table-seeded gate still scans nothing else
    const found = find();
    if (found.length) { rolls = found; seed = name; }
  };
  trySeed('effect', () => [owedRoll(sectionEl)].filter(Boolean));
  trySeed('branch', () => [branchedRoll(sectionEl)].filter(Boolean));
  trySeed('condition', () => conditionRolls(sectionEl));
  if (!rolls.length) return null;
  // The FIRST of them fixes the gate's position (so everything below the earliest awaited roll is
  // held) and, for the table seed, is the roll whose outcome row is matched; `rollNodes` is what
  // must all have resolved before the hold lifts, and the view fills `rollPaths` as each renders.
  const rollNode = rolls[0];
  const navNodes = new Set();
  sectionEl.querySelectorAll('choice, goto, return').forEach((n) => {
    if (!(rollNode.compareDocumentPosition(n) & DOCUMENT_POSITION_FOLLOWING)) return;
    if (hasAncestorTag(n, ROLLGATE_OUTCOME_WRAP)) return;
    if (boolAttr(n.getAttribute('flee'))) return;
    navNodes.add(n);
  });
  // A <fight> below the roll is held the same way (task 248): "the arrow hits you, THEN fight
  // them" (book2/726) and "the drake's jet knocks you off your feet, THEN fight it" (book5/477)
  // are orderings the prose spells out, and a fight entered at full Stamina is the difference
  // between surviving it and not. A fight inside the TABLE's outcome is skipped like the
  // navigation there: §1.299's drunken soldier is what the roll reveals, so he can never be
  // reached early, and holding him after the reveal would lock the fight the roll just started.
  const fightNodes = new Set();
  sectionEl.querySelectorAll('fight').forEach((f) => {
    if (!(rollNode.compareDocumentPosition(f) & DOCUMENT_POSITION_FOLLOWING)) return;
    if (hasAncestorTag(f, ROLLGATE_OUTCOME_WRAP)) return;
    fightNodes.add(f);
  });
  if (!navNodes.size && !fightNodes.size) return null; // pure roll-to-goto travel — nothing to gate
  return { rollNode, rollNodes: new Set(rolls), seed, outcomesNode: tabled ? outcomesNode : null,
           navNodes, fightNodes, rollPaths: new Map(), matchedOutcome: null };
}

// The outcome-row roll gate (task 257) — the roll a REVEALED table row makes, holding that
// row's own exit. All three seeds above refuse a roll under ROLLGATE_OPTIONAL_WRAP, and for six
// of its seven members that is exactly right: a roll the player may never reach must not hold
// the navigation of players who never reach it. `outcome` is the one where it is wrong, because
// an <outcome> is not a branch the player chooses — it is the row the dice just turned up, so a
// roll inside a revealed row is mandatory in fact. book3/15 and book3/34 (the priestess's card
// game) are the two shipped sections: each row's stake is a SECOND die
// (`<random dice="2" var="x">Lose 2-12 Shards</random>` + `<tick name="3.52.Loss" amount="x">`)
// and the row carries its own section=, so the "Continue → 52" beside the unrolled die banked a
// debt of 0 and §3.52's "Pay her what you owe" cost nothing.
//
// A gate of its own rather than a fourth seed in the chain above: that gate names ONE rollNode
// and reads ONE rollPath, whereas here every row has a die of its own and only the revealed row
// is ever drawn — a gate keyed on the first row's die would hold nothing whenever the dice turned
// up another. Scoped to the row instead, and keyed on the roll actually RENDERING (the walk's
// noteOutcomeRoll), like the transfer/buy/picker gates: a row the table did not reveal draws
// neither its die nor its exit, so it can never hold anything.
//
// Returns { rollNodes:Set, navNodes:Set, outcomeNodes:Set } or null. `outcomeNodes` are the rows
// whose exit is the "Continue → N" synthesised from section=, which has no node of its own to tag.
export function computeOutcomeRollGate(sectionEl) {
  if (!sectionEl) return null;
  const rollNodes = new Set(), navNodes = new Set(), outcomeNodes = new Set();
  sectionEl.querySelectorAll('outcome').forEach((oc) => {
    // The row's stake is a var= roll — one whose result nothing captures owes nothing, as seed 2
    // reads it — and still only a forced one, so a pay-gated or force="f" die never locks an exit.
    // A fight-hook roll inside the row belongs to the fight, not the row (ROLLGATE_FIGHT_HOOK_WRAP).
    const rolls = Array.from(oc.querySelectorAll('random[var], rankcheck[var], difficulty[var]'))
      .filter((r) => isForcedRoll(sectionEl, r) && !hasAncestorTag(r, ROLLGATE_FIGHT_HOOK_WRAP));
    if (!rolls.length) return;
    const nav = Array.from(oc.querySelectorAll('choice, goto, return'))
      .filter((n) => !boolAttr(n.getAttribute('flee'))); // giving up is never locked (isEscapeNav's rule)
    if (!nav.length && oc.getAttribute('section') == null) return; // no exit of its own — nothing to hold
    rolls.forEach((r) => rollNodes.add(r));
    nav.forEach((n) => navNodes.add(n));
    if (oc.getAttribute('section') != null) outcomeNodes.add(oc);
  });
  if (!rollNodes.size) return null;
  return { rollNodes, navNodes, outcomeNodes };
}

// The forced-transfer gate (task 107): a visible, forced (default force="t"), unpriced
// <transfer> is a mandatory action — the onward navigation after it stays locked until it
// runs. Collect that navigation (choice/goto/return after the first such transfer, outside
// it and any <group> that owns it). Returns { navNodes:Set } or null.
export function computeTransferGate(sectionEl) {
  if (!sectionEl) return null;
  const forced = Array.from(sectionEl.querySelectorAll('transfer')).filter((t) =>
    !boolAttr(t.getAttribute('hidden'))
    && t.getAttribute('price') == null
    && (t.getAttribute('force') == null || boolAttr(t.getAttribute('force'), true))
    && !hasAncestorTag(t, TRANSFER_GROUP_WRAP));
  if (!forced.length) return null;
  const first = forced[0];
  const navNodes = new Set();
  // A revealed branch's own section= is an exit as much as a <goto> is (task 258): book2/105's
  // pickpocket is a forced <transfer>, and its optional SCOUTING success draws a "Continue → 128"
  // that held nothing, so tracking the thief left the takings in the purse.
  sectionEl.querySelectorAll('choice, goto, return, ' + BRANCH_EXIT_SELECTOR).forEach((n) => {
    if (!(first.compareDocumentPosition(n) & DOCUMENT_POSITION_FOLLOWING)) return;
    if (forced.some((t) => t.contains(n))) return; // navigation inside the transfer's own words
    if (boolAttr(n.getAttribute('flee'))) return;
    navNodes.add(n);
  });
  if (!navNodes.size) return null;
  return { navNodes };
}

// Is this nav node an ABANDON-the-encounter exit rather than a way onward? Two shapes, the
// same two every gate above already skips: a <choice flee="t">, and the mid-fight surrender
// choice gated by an escape codeword (see computeEscapeCodewords). computeFightGate leaves
// both ungated and computeRollGate/computeTransferGate/computeBuyGate each skip flee="t",
// because giving up must never be locked behind the thing you are giving up on. The
// provisional-result gate (applyPendingRerollGate) works on rendered buttons rather than
// nodes, so it needs this predicate to recognise the same exits. (task 205)
export function isEscapeNav(node, escapeCodewords) {
  if (!node || node.nodeType !== ELEMENT_NODE) return false;
  if (boolAttr(node.getAttribute('flee'))) return true;
  const box = node.getAttribute('box');
  return box != null && !!escapeCodewords && escapeCodewords.has(box);
}

// The forced-buy gate (task 136.5): a <buy force="t"> is a mandatory "note it on your
// Adventure Sheet" action — §4.658's free barque, the section's only ship — so the onward
// navigation after it stays locked until it runs. Unlike <transfer>, force defaults to
// FALSE for a buy, so only an explicit force="t" gates; a buy inside a <group> (§4.622's
// optional "take whatever cargo you can fit" pickups) is excluded — those are opt-in and
// gating them would softlock a shipless player. Returns { navNodes:Set } or null.
export function computeBuyGate(sectionEl) {
  if (!sectionEl) return null;
  const forced = Array.from(sectionEl.querySelectorAll('buy')).filter((b) =>
    boolAttr(b.getAttribute('force')) && !hasAncestorTag(b, BUY_GROUP_WRAP));
  if (!forced.length) return null;
  const first = forced[0];
  const navNodes = new Set();
  // A branch's own section= is an exit too (task 258) — the same rule as the transfer gate above,
  // and dead in books 1-6 (no forced <buy> section carries such a branch) for the same reason.
  sectionEl.querySelectorAll('choice, goto, return, ' + BRANCH_EXIT_SELECTOR).forEach((n) => {
    if (!(first.compareDocumentPosition(n) & DOCUMENT_POSITION_FOLLOWING)) return;
    if (forced.some((b) => b.contains(n))) return; // navigation inside the buy's own words
    if (boolAttr(n.getAttribute('flee'))) return;
    navNodes.add(n);
  });
  if (!navNodes.size) return null;
  return { navNodes };
}

// Is this <goto>/<return> one the player MUST follow? JaFL's GotoNode defaults force=true
// and its execute() then returns false — "user must follow this goto - block further
// execution" — so a reached forced goto ends the section. An explicit force="f" is the
// optional "or you may turn back" link, flee/sail are abandon/travel actions, and a
// navigation inside a <choice>/<choices>/<group> is an opt-in the player selects: none of
// those halt anything. A price=/flag= exit is only conditionally usable (flagGate), so it
// is not a guaranteed halt either.
function isMandatoryRedirect(node) {
  const force = node.getAttribute('force');
  if (force != null && !boolAttr(force, true)) return false;
  if (boolAttr(node.getAttribute('flee')) || boolAttr(node.getAttribute('sail'))) return false;
  if (node.getAttribute('price') != null || node.getAttribute('flag') != null) return false;
  return !hasAncestorTag(node, REDIRECT_OPTIONAL_WRAP);
}

// The visit-box redirect gate (tasks 214 + 217). The corpus's once-only idiom writes the
// redirect and the thing it protects as SIBLINGS of a boxes= section:
//
//   <if ticks="1">If there is a tick in the box, <goto section="251"/> immediately.</if>
//   If not, <tick/> and read on.
//   …the reward / the roll / the encounter…
//
// In JaFL that body never executed on the ticked visit: the matched <if> runs its <goto>,
// which blocks the rest of the section (see isMandatoryRedirect). This port renders the
// whole section, so a revisit re-offered book1/16's eight treasures and book1/160's MAGIC
// roll alongside the redirect. Once such an <if> renders ACTIVE, everything after it is
// held — the same treatment the untaken branch it really is would get, and exactly what
// the sections already written with an explicit <else> (book5/592) produce today.
//
// This planner decides only which nodes are ELIGIBLE — a purely structural property of the
// section. Whether one matches on this visit is the walk's call, from the same if/elseif
// chain evaluation it runs anyway, so the two can never disagree about the box count now
// that a `ticks=` guard reads its own walk position (task 216).
//
// Eligible = a visit-box <if>/<elseif> carrying a MANDATORY redirect, reached
// unconditionally: no conditional and no player-optional wrapper above it. That exclusion
// is what keeps book1/10 out — its ticks="4" redirect sits under two codeword guards, and
// holding its body would strip the StillInYellowport book-keeping that stops Yellowport
// re-redirecting to §273 forever — while admitting the four sections whose redirect sits in
// the CLOSING paragraph rather than the head (book1/91's Gambler's Den, book2/465, book3/57,
// book3/84), where the trailing "unless the box is already ticked, →N" used to stay live
// beside it and let the player leave without ticking (task 217).
// Returns a Set of eligible nodes, or null when the section has none.
export function computeRedirectGate(sectionEl) {
  if (!sectionEl) return null;
  const eligible = new Set();
  for (const el of sectionEl.querySelectorAll('if[ticks], elseif[ticks]')) {
    if (hasAncestorTag(el, REDIRECT_CONDITIONAL_WRAP) || hasAncestorTag(el, REDIRECT_OPTIONAL_WRAP)) continue;
    if (Array.from(el.querySelectorAll('goto, return')).some(isMandatoryRedirect)) eligible.add(el);
  }
  return eligible.size ? eligible : null;
}
