// visit-state.js — DOM-free per-visit execution-context (ctx) and return-frame
// serialization for section rendering (tasks 116/119).
//
// The renderer memoises what a visit has applied/resolved in a `ctx` object (Sets/Maps
// keyed by positional node paths) and keeps a one-level return frame; these functions
// create, flatten (JSON-safe), and rebuild that state so a save can resume the exact
// visit. Pure: they operate on plain records and the parsed section tree, never
// constructing DOM or touching a browser UI global.

import { restoreFight } from './combat.js';

// A fresh per-visit execution context: the renderer's memo of what has already been
// applied/resolved this visit, keyed by positional node paths. Shared by begin() and
// deserializeCtx() so the shape has a single definition.
export function newCtx() {
  return { applied: new Set(), rolls: new Map(), fights: new Map(), buys: new Map(), groupLimits: new Map(), groupPicks: new Map(), wroteVars: new Set(), rolledVars: new Set(), pathNodes: new Map(), rollLockCaches: new Set(), forcedChosen: new Map(), awardCounts: new Map(), stock: new Map(), boxTicks: new Map(), usedSource: null };
}

// Resolve a serialised memo path back to its parsed-section node (task 116). Paths are the
// renderer's positional keys — 'r' then the child-node index at each level (see
// appendChildren). Because the parsed section tree is static across a visit, the same path
// always names the same node, so a saved usedSource path re-binds to the exact choice/goto
// on load. Returns null if the path does not resolve (defensive against a hand-edited save
// / a section that changed between builds).
export function resolveNodePath(path, sectionEl) {
  if (typeof path !== 'string' || !sectionEl) return null;
  const parts = path.split('.');
  if (parts.shift() !== 'r') return null;
  let n = sectionEl;
  for (const p of parts) {
    const i = parseInt(p, 10);
    if (!n || !n.childNodes || !n.childNodes[i]) return null;
    n = n.childNodes[i];
  }
  return n === sectionEl ? null : n;
}

// The branches a roll's result reveals — the subtrees whose memos a RE-ARMED roll must
// forget. A lone <outcome> (inside a <choices> table) counts like the table itself.
const ROLL_BRANCH_TAGS = new Set(['success', 'failure', 'outcomes', 'outcome']);
// The roll elements whose var= write is undone along with their dropped result (below).
const ROLL_TAGS = new Set(['random', 'difficulty', 'rankcheck', 'training']);
// DOM node type / position constants, spelled as literals so this module never reaches for
// the browser `Node` global (matching render-gates.js).
const ELEMENT_NODE = 1;
const DOCUMENT_POSITION_FOLLOWING = 0x04;

// Is this node inside a branch THIS roll feeds — a <success>/<failure>/<outcomes>/<outcome>
// positioned after it? Walks up to the section root. An ancestor branch never qualifies (a
// containing node reports CONTAINS|PRECEDING, not FOLLOWING), so a roll nested inside an
// earlier roll's outcome does not count itself as its own reveal.
function inBranchAfterRoll(node, rollNode) {
  for (let p = node.parentNode; p && p.nodeType === ELEMENT_NODE; p = p.parentNode) {
    if (!ROLL_BRANCH_TAGS.has(p.tagName.toLowerCase())) continue;
    if (rollNode.compareDocumentPosition(p) & DOCUMENT_POSITION_FOLLOWING) return true;
  }
  return false;
}

// Forget what a roll's PREVIOUS result revealed, because a fresh payment has re-armed that
// roll (task 253). rollGate drops the stored result — that is what makes "pay again, spin
// again" work — but the effects that result already applied keep their memos, and a memo is
// per VISIT: land the same outcome twice in one visit and the second landing printed its
// words and applied nothing. §3.314's second paid night at the tavern cost a Shard and no
// Stamina moved; §2.157's second spin on the same number stood no picker at all.
//
// Scoped to the branch subtrees the roll feeds, and read from ctx.pathNodes (the walk's own
// path→node map) rather than by prefix arithmetic, so the synthetic path segments the view
// mints for a revealed outcome ('.o<i>') or a <choices> row ('.b<i>') need no special case.
// What that scope deliberately leaves alone:
//  - the payment ABOVE the roll, and anything below the table that the roll never revealed
//    (§6.587's wand market) — neither is the old result's doing;
//  - the per-visit award caps (awardCounts/groupPicks/groupLimits), so a second landing may
//    re-apply its effect but a repeat can never become an item farm.
// A roll NESTED inside such a branch drops its stored result too (§6.731's boon die lives
// inside the CHARISMA roll's <success>): re-arming has to make the repeat re-roll it, or
// clearing the outcome memos alone would hand out the same boon again on a guaranteed match.
export function dropRolledBranchMemos(ctx, rollNode) {
  if (!ctx || !rollNode || !ctx.pathNodes || !ctx.pathNodes.size) return;
  // The node a '<kind>@<path>' memo key names, when it sits in one of those branches.
  const revealed = (memoKey) => {
    const node = ctx.pathNodes.get(memoKey.slice(memoKey.indexOf('@') + 1));
    return node && inBranchAfterRoll(node, rollNode) ? node : null;
  };
  for (const key of [...ctx.applied]) {
    if (!revealed(key)) continue;
    ctx.applied.delete(key);
    // A force="f" choose-one member records its pick twice (see renderForcedOptional): drop
    // the group token with the memo, or the untaken siblings stay locked to a dead answer.
    for (const [token, memo] of ctx.forcedChosen) if (memo === key) ctx.forcedChosen.delete(token);
  }
  for (const key of [...ctx.rolls.keys()]) {
    const node = revealed(key);
    if (!node) continue;
    ctx.rolls.delete(key);
    // Its var= write goes too, or the drop is only half done: a var-keyed table resolves on
    // the WRITE and not on the roll (branchResolved), so leaving z marked written would make
    // the old outcome re-reveal — and now, with its memo gone, re-APPLY — on the fresh payment
    // alone, before the repeat has thrown a die. That is the farm this scope is guarding.
    const v = node.tagName && ROLL_TAGS.has(node.tagName.toLowerCase()) ? node.getAttribute('var') : null;
    if (v) { ctx.wroteVars.delete(v); ctx.rolledVars.delete(v); }
  }
}

// Flatten a ctx to a plain, JSON-safe object. Maps→entry arrays, Sets→arrays; the roll and
// fight values are already plain data. DOM references are never stored: pathNodes is rebuilt
// lazily on render, and usedSource is recorded as its positional path (looked up in
// pathNodes, which was populated by the render that produced this ctx). groupLimits and
// rollLockCaches are omitted — they are re-derived from the static section on resume.
export function serializeCtx(ctx) {
  let usedSourcePath = null;
  if (ctx.usedSource && ctx.pathNodes) {
    for (const [p, n] of ctx.pathNodes) if (n === ctx.usedSource) { usedSourcePath = p; break; }
  }
  return {
    applied: [...ctx.applied],
    rolls: [...ctx.rolls],
    fights: [...ctx.fights],
    buys: [...ctx.buys],
    groupPicks: [...ctx.groupPicks],
    wroteVars: [...ctx.wroteVars],
    rolledVars: [...ctx.rolledVars],
    forcedChosen: [...ctx.forcedChosen],
    awardCounts: [...ctx.awardCounts],
    stock: [...ctx.stock],
    boxTicks: [...ctx.boxTicks],
    usedSourcePath,
  };
}

// Re-derive the section-scoped scaffolding a ctx needs that is NOT part of the saved memo
// (tasks 5 + 38, shared by begin() and resume since task 119):
//  - the "choose up to N" group caps (<items group="X" limit="N"/> — pre-scanned so the
//    individual award rows know their cap no matter whether the controller sits before
//    or after them in the section; both orders occur);
//  - the names of gambling-bet lock caches: a <tick special="lock" cache="X"> bundled
//    inside a roll <group> means "freeze the bet once you roll" (book1/91, book2/134) —
//    as opposed to a top-level lock, which is stash bookkeeping and must NOT disable its
//    widget. Only their widgets gate on the lock flag.
// Pass `state` on a FRESH entry (begin) to reset each roll-lock cache to unlocked, so a
// new visit lets you re-bet (the deferred lock, applied on the roll, re-locks it). A
// resume omits it — those flags are persisted, and a bet already locked must stay locked.
export function rebuildVisitScaffold(ctx, sectionEl, state = null) {
  Array.from(sectionEl.querySelectorAll('items[group]')).forEach((c) => {
    const g = c.getAttribute('group');
    const lim = parseInt(c.getAttribute('limit') || '0', 10);
    if (g && lim > 0) ctx.groupLimits.set(g, lim);
  });
  Array.from(sectionEl.querySelectorAll('group')).forEach((g) => {
    if (!g.querySelector('random, difficulty, rankcheck, training')) return;
    g.querySelectorAll('tick[special="lock"][cache]').forEach((t) => {
      const name = t.getAttribute('cache');
      if (!name) return;
      ctx.rollLockCaches.add(name);
      if (state && state.isCacheLocked(name)) state.lockCache(name, false);
    });
  });
}

// The <fight> element a persisted fight-memo key names: 'fight@<node path>' for a lone
// fight, 'fightgrp@<group>.<i>' for the i-th member of a simultaneous group — exactly the
// keys renderFight/renderGroupFight mint. Returns null when the key is malformed, or when
// the section holds no such fight, so a fabricated memo drops instead of resuming. (task 180)
function resolveFightNode(key, sectionEl) {
  if (typeof key !== 'string' || !sectionEl) return null;
  const at = key.indexOf('@');
  if (at < 0) return null;
  const kind = key.slice(0, at);
  const ref = key.slice(at + 1);
  if (kind === 'fight') {
    const n = resolveNodePath(ref, sectionEl);
    return n && n.nodeName && n.nodeName.toLowerCase() === 'fight' ? n : null;
  }
  if (kind !== 'fightgrp') return null;
  // 'fightgrp@<group>.<i>': split the index off the END, so a group id containing a dot
  // still resolves. The members are re-read in document order, as the widget draws them.
  const dot = ref.lastIndexOf('.');
  if (dot <= 0 || !/^\d+$/.test(ref.slice(dot + 1))) return null;
  const group = ref.slice(0, dot);
  const members = Array.from(sectionEl.querySelectorAll('fight')).filter((f) => f.getAttribute('group') === group);
  return members[parseInt(ref.slice(dot + 1), 10)] || null;
}

// Rebuild a ctx from its serialised form against the (re-parsed) section. Unknown/absent
// fields degrade to empty rather than throwing, and every list guard tolerates a hand-edited
// save. groupLimits/rollLockCaches are rebuilt by rebuildVisitScaffold afterwards.
export function deserializeCtx(rec, sectionEl) {
  const ctx = newCtx();
  const r = rec && typeof rec === 'object' ? rec : {};
  const arr = (x) => (Array.isArray(x) ? x : []);
  arr(r.applied).forEach((k) => { if (typeof k === 'string') ctx.applied.add(k); });
  arr(r.wroteVars).forEach((k) => { if (typeof k === 'string') ctx.wroteVars.add(k); });
  arr(r.rolledVars).forEach((k) => { if (typeof k === 'string') ctx.rolledVars.add(k); });
  arr(r.rolls).forEach((e) => { if (Array.isArray(e) && e.length === 2) ctx.rolls.set(e[0], e[1]); });
  // Fights are the one memo the combat widget DISPLAYS, so they are rebuilt against the
  // section's own <fight> nodes rather than trusted: an entry whose key names no <fight>
  // here drops entirely, and the rest keep only coerced dynamic state. (task 180)
  arr(r.fights).forEach((e) => {
    if (!Array.isArray(e) || e.length !== 2) return;
    const node = resolveFightNode(e[0], sectionEl);
    if (node) ctx.fights.set(e[0], restoreFight(node, e[1]));
  });
  arr(r.buys).forEach((e) => { if (Array.isArray(e) && e.length === 2) ctx.buys.set(e[0], e[1]); });
  arr(r.groupPicks).forEach((e) => { if (Array.isArray(e) && e.length === 2) ctx.groupPicks.set(e[0], e[1]); });
  arr(r.forcedChosen).forEach((e) => { if (Array.isArray(e) && e.length === 2) ctx.forcedChosen.set(e[0], e[1]); });
  arr(r.awardCounts).forEach((e) => { if (Array.isArray(e) && e.length === 2) ctx.awardCounts.set(e[0], e[1]); });
  arr(r.stock).forEach((e) => { if (Array.isArray(e) && e.length === 2) ctx.stock.set(e[0], e[1]); });
  // Where each <tick> this visit already applied left the section's box count (task 216) —
  // the walk replays these on a resume, since ctx.applied stops the ticks re-firing and the
  // sequential `<if ticks=>` reading would otherwise fall back to the entry count. Feeds a
  // routing comparison straight from an untrusted save, so it is coerced like entryTicks:
  // a non-negative integer keyed by a memo path, anything else dropped.
  arr(r.boxTicks).forEach((e) => {
    if (!Array.isArray(e) || e.length !== 2 || typeof e[0] !== 'string') return;
    const n = frameNum(e[1], NaN, { min: 0, int: true });
    if (Number.isFinite(n)) ctx.boxTicks.set(e[0], n);
  });
  if (r.usedSourcePath) ctx.usedSource = resolveNodePath(r.usedSourcePath, sectionEl);
  rebuildVisitScaffold(ctx, sectionEl);
  return ctx;
}

// Serialise the one-level return frame (task 110): its section identity, section-local vars,
// location, entry-tick baseline, taken source action (as a path) and its own ctx. The frame's
// sectionEl is NOT stored — it is re-parsed from book/section on resume.
export function serializeFrame(frame) {
  let usedSourcePath = null;
  if (frame.usedSource && frame.ctx && frame.ctx.pathNodes) {
    for (const [p, n] of frame.ctx.pathNodes) if (n === frame.usedSource) { usedSourcePath = p; break; }
  }
  return {
    book: frame.book,
    section: frame.section,
    sectionTodock: frame.sectionTodock,
    vars: { ...frame.vars },
    location: frame.location ?? null,
    entryTicks: frame.entryTicks,
    usedSourcePath,
    ctx: serializeCtx(frame.ctx),
  };
}

// sanitizeData's numeric/string coercions, inlined for the frame (its helpers are private to
// state.js): a number or a numeric string, else the default; rounded when integral; floored
// at `min`. Kept here so serializeFrame and its inverse stay in one place (task 203); the ctx's
// own numeric memo (boxTicks) coerces through the same helper.
function frameNum(v, dflt, { min = -Infinity, int = false } = {}) {
  let n = typeof v === 'number' ? v : (typeof v === 'string' && v.trim() !== '' ? parseFloat(v) : NaN);
  if (!Number.isFinite(n)) return dflt;
  if (int) n = Math.round(n);
  return Math.max(min, n);
}
function frameStr(v) { return (v == null || v === '') ? null : String(v); }

// Rebuild a return frame from its serialised form, given the frame's re-parsed section element
// (the caller fetches it — getSection is async). Mirrors _captureReturnFrame's shape.
//
// An imported save is untrusted and restoreReturn() writes this frame's payload STRAIGHT into
// live state (data.vars, data.location, the entry-tick baseline), so every field is coerced
// the way sanitizeData coerces its live counterpart rather than copied through: only finite
// numeric vars survive (a string/object var would otherwise feed resolveValue arithmetic and
// every `<if var=>` gate), entryTicks becomes a non-negative integer (a negative/fractional
// baseline skews the `<if ticks=>` comparison), and location/sectionTodock become a string or
// null. book must name a positive integer — with none the whole frame drops, leaving the
// resume with no return available, exactly as a legacy save without one. (task 203)
export function deserializeFrame(rec, frameSectionEl) {
  if (!rec || typeof rec !== 'object' || Array.isArray(rec) || !frameSectionEl) return null;
  if (rec.section == null) return null;
  const book = frameNum(rec.book, NaN, { int: true });
  if (!(book >= 1)) return null; // no positive-int book ⇒ unusable; never clamp into book 1
  const vars = {};
  const rawVars = (rec.vars && typeof rec.vars === 'object' && !Array.isArray(rec.vars)) ? rec.vars : {};
  for (const [k, v] of Object.entries(rawVars)) {
    const n = frameNum(v, NaN);
    if (Number.isFinite(n)) vars[k] = n;
  }
  return {
    book,
    section: String(rec.section),
    sectionEl: frameSectionEl,
    ctx: deserializeCtx(rec.ctx, frameSectionEl),
    sectionTodock: frameStr(rec.sectionTodock),
    vars,
    location: frameStr(rec.location),
    entryTicks: frameNum(rec.entryTicks, 0, { min: 0, int: true }),
    usedSource: resolveNodePath(rec.usedSourcePath, frameSectionEl),
  };
}
