// combat.js — headless combat rules for the <fight> mechanic.
//
// Pure game logic: builds an enemy fight-state and resolves attack rounds
// against a GameState. No DOM. The renderer (render.js) owns the fight widget
// and merely calls fightRound() when the player clicks Attack, then redraws
// from the mutated `fight` object.

import { rollDice, applyEffectBody, boolAttr, resolveValue } from './engine.js';

/** Build a fresh fight-state from a <fight> element's attributes. When `state`
 *  is supplied the pre-fight steps (preDamage / staminaLost reset / useCache
 *  loadout) run immediately — makeFight is memoised per section visit, so these
 *  fire exactly once, matching FightNode.execute(). */
export function makeFight(node, state = null) {
  const stamina = parseInt(node.getAttribute('stamina') || '1', 10);
  // The `flee="N"` ATTRIBUTE is a win threshold: you win by reducing the enemy to
  // N Stamina or fewer (e.g. §570 "reduce the tree to 5 or less"), not to 0. It is
  // distinct from a `<flee>` CHILD element, which is the player's Flee button.
  const flee = node.getAttribute('flee');
  // modifiers= is a token list of fight modes. Parsed as WORDS, not matched as a substring:
  // `includes('noarmour')` failed open in both directions — a typo (`noarmor`) matched nothing
  // and any string merely containing the word matched — so the engine and the source gate
  // disagreed about what a mode is. build/validate-source.ps1's FL_FIGHT_MODIFIERS is the
  // same list. (task 300)
  const modifiers = (node.getAttribute('modifiers') || '').toLowerCase().split(/[\s,]+/).filter(Boolean);
  const fight = {
    name: node.getAttribute('name') || 'Enemy',
    combat: parseInt(node.getAttribute('combat') || '0', 10),
    defence: parseInt(node.getAttribute('defence') || '0', 10),
    stamina,
    maxStamina: stamina,
    winThreshold: flee != null ? (parseInt(flee, 10) || 0) : 0,
    playerFirst: !(node.getAttribute('playerFirst') != null && !boolAttr(node.getAttribute('playerFirst'), true)),
    // --- task 26 attributes ---
    attackDice: parseInt(node.getAttribute('attackDice') || '2', 10) || 2, // dice the player rolls to attack (default 2)
    attacks: parseInt(node.getAttribute('attacks') || '1', 10) || 1,       // enemy attacks per round (Tripling = 3)
    noArmour: modifiers.includes('noarmour'),                              // the player's armour does not count (an exact token)
    playerDefence: node.getAttribute('playerDefence'),                    // a value/var replacing the player's Defence
    abilityDamaged: node.getAttribute('abilityDamaged') || null,          // wound this ability/stamina instead of Stamina
    staminaLost: node.getAttribute('staminaLost') || null,                // codeword that accumulates damage dealt
    group: node.getAttribute('group') || null,                           // simultaneous multi-enemy group id
    fleeTo: null,
    outcome: null, // 'win' | 'lose' | 'fled'
    log: [],
    round: null,   // a round paused for the player (runRound, task 390)
    pending: null, // the decision it waits on
  };
  if (state) startFight(fight, node, state);
  return fight;
}

/** The only outcomes a fight can hold — the whitelist restoreFight validates against. */
const FIGHT_OUTCOMES = new Set(['win', 'lose', 'fled']);
/** The steps a round is made of (runRound, task 390). */
const ROUND_STEPS = new Set(['pre', 'player', 'enemy', 'post']);
// Generous bounds on a restored fight log: the widget shows only the last six lines, and no
// real slugfest approaches these, so they cost a legitimate resume nothing while keeping an
// imported save from carrying an unbounded blob into the DOM. (task 180)
const MAX_LOG_LINES = 500;
const MAX_LOG_CHARS = 500;

/** Rebuild a fight from a PERSISTED memo against its own <fight> element (task 180).
 *  An imported save is untrusted and its fight memo is displayed by the combat widget, so
 *  nothing is carried through verbatim: the STATIC identity (name, dice, thresholds, damage
 *  routing) is re-read from `node` via makeFight — a save can neither rename a foe nor
 *  change how it fights — and only the genuinely DYNAMIC fields are taken from `saved`,
 *  each coerced to its own type and range. Unknown fields are dropped, because the result is
 *  makeFight's object rather than a spread of the record. Called WITHOUT a GameState, so the
 *  pre-fight steps (staminaLost reset / useCache / preDamage) do not re-run — the saved
 *  numbers already include them. Headless. */
export function restoreFight(node, saved) {
  const fight = makeFight(node); // static identity, straight from the section
  const s = saved && typeof saved === 'object' ? saved : {};
  const int = (v, dflt, lo, hi) => {
    const n = Math.trunc(Number(v));
    return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : dflt;
  };
  // Combat/Defence are static too UNLESS the enemy arms itself from a cache (useCache —
  // §6.635's Warrior Maid), the one path that raises them at fight start. Then they must be
  // carried, but floored at the section's own value (a loadout only ever adds) and capped.
  if (node.getAttribute('useCache')) {
    fight.combat = int(s.combat, fight.combat, fight.combat, fight.combat + 99);
    fight.defence = int(s.defence, fight.defence, fight.defence, fight.defence + 99);
  }
  // Stamina is the fight's live state: 0 … its rolled maximum (preDamage and blows only
  // reduce it, and each blow is capped at the Stamina remaining).
  fight.stamina = int(s.stamina, fight.stamina, 0, fight.maxStamina);
  fight.outcome = FIGHT_OUTCOMES.has(s.outcome) ? s.outcome : null;
  fight.defenceBonus = int(s.defenceBonus, 0, 0, 99); // Defence through Faith, this fight only
  fight.wrathUsed = !!s.wrathUsed;
  fight.defenceUsed = !!s.defenceUsed;
  fight.lastStrikeMissed = !!s.lastStrikeMissed;
  fight.attackRerolled = !!s.attackRerolled;
  fight.log = (Array.isArray(s.log) ? s.log : []).filter((l) => typeof l === 'string')
    .slice(-MAX_LOG_LINES).map((l) => l.slice(0, MAX_LOG_CHARS));
  // A round paused on a decision (tasks 390, 391): an Immunity to Injury blow, its dice already
  // rolled, at the cursor; or a COMBAT-blessing retry, with the missed strike just before it.
  // Both or neither: a round is only ever at rest while it waits, and a malformed one drops, so
  // the fight resumes between rounds rather than replaying a forged step list.
  const steps = s.round && Array.isArray(s.round.steps) ? s.round.steps : null;
  const p = s.pending;
  const at = steps && Number.isInteger(s.round.at) ? s.round.at : -1;
  const wellFormed = steps && steps.length <= 64 && at >= 0 && at < steps.length && p && Number.isInteger(p.fi)
    && steps.every((st) => st && ROUND_STEPS.has(st.who) && Number.isInteger(st.fi) && st.fi >= 0 && st.fi < 32);
  const bodyWound = p && p.body === true;
  const injury = wellFormed && p.kind === 'injury' && steps[at].fi === p.fi
    && (bodyWound ? (steps[at].who === 'pre' || steps[at].who === 'post') : steps[at].who === 'enemy');
  const reroll = wellFormed && p.kind === 'reroll' && at > 0 && steps[at - 1].who === 'player' && steps[at - 1].fi === p.fi;
  if (injury || reroll) {
    fight.round = { steps: steps.map((st) => ({ who: st.who, fi: st.fi })), at, immune: s.round.immune === true };
    fight.pending = reroll ? { kind: 'reroll', fi: p.fi }
      : { kind: 'injury', fi: p.fi, roll: int(p.roll, 2, 2, 12), total: int(p.total, 0, -99, 199),
          def: int(p.def, 0, -99, 199), dmg: int(p.dmg, 1, 1, 199), replace: false, body: bodyWound };
  }
  // roundGoto (a <fightdamage>/<fightround> redirect) is deliberately NOT restored: the view
  // consumes and clears it before the round commits, so a saved one could only be forged.
  return fight;
}

/** Pre-fight setup that needs the GameState: reset the staminaLost accumulator,
 *  add the useCache loadout to the enemy, and apply preDamage (which may fell the
 *  enemy before the first blow). Mirrors FightNode.execute()'s opening. */
function startFight(fight, node, state) {
  if (fight.staminaLost) state.setCodewordValue(fight.staminaLost, 0);

  // useCache: the enemy wields the weapons/armour stashed in the named cache
  // (§6.635 — the Warrior Maid fights you with the gear she confiscated).
  const cache = node.getAttribute('useCache');
  if (cache && state.cacheItems) {
    const items = state.cacheItems(cache) || [];
    const best = (kind) => items.filter((it) => it.kind === kind).reduce((m, it) => Math.max(m, it.bonus || 0), 0);
    // A weapon's bonus raises the enemy's COMBAT *and* Defence (like a player's
    // weapon does — JaFL FightNode adds combatRaise to both); armour adds to
    // Defence only. §6.635 Warrior Maid with a +2 sword ⇒ Combat 10 / Defence 18
    // (previously 10 / 16 because the weapon bonus never reached Defence). (task 36)
    const weaponBonus = best('weapon');
    fight.combat += weaponBonus;
    fight.defence += weaponBonus + best('armour');
  }

  // preDamage: damage inflicted on the enemy up front, carried from an earlier
  // encounter (the paired Dawatsu Morituri fights — §6 preDamage="MorDamage"
  // reads what §7 stored via staminaLost). A codeword wins over a like-named var.
  const pd = node.getAttribute('preDamage');
  if (pd) {
    let dmg = state.codewordValue(pd);
    if (!dmg && state.hasVar && state.hasVar(pd)) dmg = state.getVar(pd);
    if (dmg > 0) {
      dmg = Math.min(dmg, fight.stamina);
      fight.stamina -= dmg;
      fight.log.push(`Carried-over damage: −${dmg} enemy Stamina`);
      if (fight.staminaLost) state.adjustCodewordValue(fight.staminaLost, dmg);
      if (fight.stamina <= fight.winThreshold) fight.outcome = 'win';
    }
  }
}

/** The player's effective Defence for this fight: a playerDefence= override (a
 *  value/variable — §Chimerical Beast "s", §Talanexor "d") wins; otherwise the
 *  sheet Defence, minus the armour bonus when modifiers="noarmour" (Water Drake). */
/** The Defence an enemy in `fight` actually rolls against — the single source for both the
 *  resolver and the widget's "Your Defence" row (task 306). It was private, and the row
 *  re-derived the number from `state.defence()` alone: a `modifiers="noarmour"` fight
 *  (book5/689's Water Drake) showed the armoured score while the drake rolled against the
 *  unarmoured one, and a `playerDefence=` fight (book6/473, book6/718) showed the sheet score
 *  while the enemy rolled against the override. A row that re-computes what a resolver computes
 *  is a lie waiting for the resolver to gain a branch, which is what happened twice here.
 *  `fight` may be null (a group whose members are all defeated), in which case there is no
 *  fight-local term and the sheet Defence plus any section-wide boon is the honest answer. */
export function playerFightDefence(state, fight) {
  return playerDefenceFor(state, fight || {});
}

function playerDefenceFor(state, fight) {
  // A <tick special="defence"> bonus raises Defence for the section's fight (§4.434
  // ring of defence, §6.183 Thunder Beast). It applies even over a playerDefence=
  // override so a granted Defence boon isn't lost to a fixed-Defence fight. The
  // Defence-through-Faith blessing lives on the FIGHT itself (fight.defenceBonus),
  // so "+3 for THIS fight only" never leaks into a later fight in the same
  // section (task 91).
  const defBonus = (state.fightDefenceBonus ? state.fightDefenceBonus() : 0) + (fight.defenceBonus || 0);
  if (fight.playerDefence != null && fight.playerDefence !== '') return resolveValue(state, fight.playerDefence) + defBonus;
  let def = state.defence();
  if (fight.noArmour) def = Math.max(0, def - state.armourBonus());
  return def + defBonus;
}

/** Route an enemy hit to the player: normally lost Stamina, but abilityDamaged=
 *  sends it to that ability instead — "stamina" is a *permanent* max+current loss
 *  (§Big Boy/§Giant), a core ability name reduces that ability (both fatal). */
function applyEnemyDamage(state, fight, dmg) {
  const ab = (fight.abilityDamaged || '').toLowerCase();
  if (ab === 'stamina') state.adjustAbilityStamina(-dmg, true);
  else if (ab) state.adjustAbility(ab, -dmg, true);
  else state.damageStamina(dmg);
}

/** The player strikes one enemy once (attackDice dice + Combat vs its Defence),
 *  accumulating damage into staminaLost and flagging a win at the threshold. */
function playerStrike(state, fight) {
  const r = rollDice(fight.attackDice || 2); // default 2 dice (also guards a bare fight literal)
  // A <tick special="attack"> bonus/penalty modifies the player's attack rolls
  // for this fight only (§1.42 rat poison +3, §6.624 dark −2). It hits COMBAT here,
  // NOT via state.ability('combat') — so it never leaks into the player's Defence.
  const combat = state.ability('combat') + (state.fightAttackBonus ? state.fightAttackBonus() : 0);
  const total = r.total + combat;
  let dmg = Math.max(0, total - fight.defence);
  if (dmg > 0) {
    if (dmg > fight.stamina) dmg = fight.stamina; // don't over-count an overkill in staminaLost
    fight.stamina -= dmg;
    if (fight.staminaLost) state.adjustCodewordValue(fight.staminaLost, dmg);
  }
  fight.lastStrikeMissed = dmg === 0; // a failed COMBAT roll — rerollable via the blessing (task 91)
  fight.log.push(`You roll ${r.total}+${combat}=${total} vs Def ${fight.defence} → ${dmg ? '−' + dmg + ' enemy Stamina' : 'miss'}`);
  if (fight.stamina <= fight.winThreshold) fight.outcome = 'win';
}

/** COMBAT blessing (§4.324 "try again when you fail a COMBAT roll"): retry the
 *  player's MISSED strike, once per round, without the enemy replying again.
 *  Consumes the blessing unless permanent. Returns true when the retry was made
 *  (its result lands on the fight as usual). Headless. (task 91) */
export function rerollAttack(state, fight) {
  if (!fight || fight.outcome || state.isDead()) return false;
  // A round paused on this decision is answered by resolveReroll, which then runs the reply;
  // retrying here would leave the round stuck (task 391). resolveReroll clears `pending` first.
  if (fight.pending) return false;
  if (!fight.lastStrikeMissed || fight.attackRerolled) return false;
  if (!state.useBlessing('combat')) return false;
  fight.attackRerolled = true; // once per round, even for a permanent blessing
  fight.log.push('COMBAT blessing: you try the blow again');
  playerStrike(state, fight);
  return true;
}

/** One enemy strike against the player (2 dice + Combat vs the player's Defence), rolled but
 *  not yet landed, so a wound can wait on the player's Immunity to Injury decision (task 390).
 *  <fightdamage type="replace"> substitutes its own effect for the Stamina loss (§5.356: lose an
 *  ability instead); type="add"/none applies it ON TOP (§1.105). */
function rollEnemyStrike(state, fight, dmgNode) {
  const r = rollDice(2);
  const total = r.total + fight.combat;
  const def = playerDefenceFor(state, fight);
  const dmg = Math.max(0, total - def);
  const replace = !!(dmg > 0 && dmgNode && (dmgNode.getAttribute('type') || '').toLowerCase() === 'replace');
  return { roll: r.total, total, def, dmg, replace };
}

/** Does this rolled strike wound — cost the player Stamina — so Immunity to Injury can block it?
 *  A replaced blow and an abilityDamaged= fight take something else instead. */
function strikeWounds(fight, s) {
  return s.dmg > 0 && !s.replace && !fight.abilityDamaged;
}

/** Land a rolled strike, honouring abilityDamaged=. `immune` blocks a wound outright: no
 *  Stamina lost, and no <fightdamage> body, since every shipped one fires on being wounded
 *  ("each time you are wounded", a sting, §4.238's "if you get wounded"). (task 390) */
function landEnemyStrike(state, fight, dmgNode, s, immune = false) {
  const head = `${fight.name} rolls ${s.roll}+${fight.combat}=${s.total} vs your Def ${s.def} → `;
  if (immune) { fight.log.push(head + 'no wound (Immunity to Injury)'); return; }
  if (s.dmg > 0 && !s.replace) applyEnemyDamage(state, fight, s.dmg);
  fight.log.push(head + (s.dmg ? (s.replace ? 'a telling blow' : '−' + s.dmg + ' your Stamina') : 'miss'));
  // Apply the whole <fightdamage> body (all children, rolls + branches) when the
  // blow lands — never on render. A <goto> inside redirects the fight ("If you
  // get wounded, →184" — §4.238): record it for the view to navigate. (task 99)
  if (s.dmg > 0 && dmgNode) {
    const res = applyEffectBody(dmgNode, state, fight.log);
    if (res.goto) fight.roundGoto = res.goto;
  }
}

/** Execute a <fightround> body (task 99): its rolls/branches/effects run in this
 *  round's context, once, with any outcome lines joining the fight log. A <goto>
 *  (§5.689 "dragged you under") is recorded on the fight for the view to follow. */
function runRoundNode(state, fight, roundNode, rd = null) {
  // A wound the body deals is part of the round's damage (task 394): an immune round blocks it,
  // and while the blessing is held it is held back and returned, for runRound to ask about once
  // the body has run. Both shipped ones (§5.24's noose, §5.383's lightning) are the body's last
  // effect, so asking after the body keeps the printed order.
  let held = 0;
  const wound = rd && rd.immune ? (n) => { if (n > 0) fight.log.push('no wound (Immunity to Injury)'); return 0; }
    : state.hasBlessing('injury') ? (n) => { held += n; return 0; } : null;
  const res = applyEffectBody(roundNode, state, fight.log, wound ? { wound } : {});
  if (res.goto) fight.roundGoto = res.goto;
  return held;
}

/**
 * Resolve one attack exchange against a single enemy, respecting initiative.
 * Mutates `fight` (stamina, outcome, log) and `state` (player stamina + any
 * <fightdamage> effect). The enemy strikes `attacks` times per round (Tripling).
 * A section's <fightround> body (task 99, JaFL RoundNode) executes exactly once
 * per round: pre="t" before the exchange (§5.24 "Before each combat round…"),
 * else after it, and only while the fight is still undecided. Its body may kill
 * the player (Stamina damage) or record a fight.roundGoto redirect (§5.689).
 */
export function fightRound(state, fight, dmgNode, roundNode = null) {
  if (fight.pending) return; // the round already in progress waits on the player (task 390)
  fight.attackRerolled = false; fight.lastStrikeMissed = false; // fresh round, fresh reroll (task 91)
  const pre = roundNode != null && boolAttr(roundNode.getAttribute('pre'));
  const steps = [];
  if (roundNode && pre) steps.push({ who: 'pre', fi: 0 });
  for (const who of (fight.playerFirst ? ['player', 'enemy'] : ['enemy', 'player'])) {
    if (who === 'player') steps.push({ who, fi: 0 });
    else for (let k = 0; k < (fight.attacks || 1); k++) steps.push({ who, fi: 0 });
  }
  if (roundNode && !pre) steps.push({ who: 'post', fi: 0 });
  fight.round = { steps, at: 0, immune: false };
  runRound(state, [fight], dmgNode, roundNode, false);
}

// ---- the resumable round (task 390) ---------------------------------------
// A round runs as a list of steps kept on the fight that holds it (a lone fight, or a group's
// first member): `round = { steps, at, immune }`. A step can stop for the player's decision,
// recorded as `pending`, and resolveInjury carries on from that step once it is answered. The
// decision is Immunity to Injury (book5/365): "not to lose Stamina points when you would
// otherwise be wounded, from one source of damage once only, or the damage you take in a single
// combat round". So each blow that would cost Stamina asks while the blessing is held, the dice
// already rolled, and using it blocks that blow and every later one in the round. Both fields
// are null between rounds, and both are saved, so a reload neither rerolls nor skips the blow.
//
// The steps reproduce the old loops exactly. A lone fight stops before any step once it is
// decided, redirected or the player is dead; a group stops its foes' blows at death and skips a
// defeated foe, as groupFightRound always did.
function runRound(state, fights, dmgNode, roundNode, group) {
  const holder = fights[0];
  const rd = holder.round;
  while (rd && rd.at < rd.steps.length) {
    const st = rd.steps[rd.at];
    const f = fights[st.fi] || holder;
    if (!group && (holder.outcome || holder.roundGoto || state.isDead())) break;
    if (group && st.who === 'enemy' && state.isDead()) break;
    if (!(group && st.who === 'enemy' && isDefeated(f))) {
      if (st.who === 'pre' || st.who === 'post') {
        const held = runRoundNode(state, holder, roundNode, rd);
        if (held > 0) { holder.pending = { kind: 'injury', fi: st.fi, dmg: held, body: true, roll: 0, total: 0, def: 0, replace: false }; return; }
      } else if (st.who === 'player') {
        playerStrike(state, f);
        // A miss the COMBAT blessing may retry (§4.324) is the player's decision, and it comes
        // BEFORE the rest of the round: the reply used to land first, so a fatal one made the
        // promised retry unusable, and a retry that would have won came after a wound it should
        // have prevented. A retry strikes first; keeping the miss lets the reply land once. A
        // miss with nothing after it (enemy-first initiative) keeps the end-of-round retry
        // (rerollAttack). (task 391)
        if (f.lastStrikeMissed && !f.attackRerolled && state.hasBlessing('combat') && rd.at + 1 < rd.steps.length) {
          rd.at++;
          holder.pending = { kind: 'reroll', fi: st.fi };
          return;
        }
      } else {
        const s = rollEnemyStrike(state, f, dmgNode);
        if (strikeWounds(f, s) && !rd.immune && state.hasBlessing('injury')) {
          holder.pending = { kind: 'injury', fi: st.fi, ...s };
          return;
        }
        landEnemyStrike(state, f, dmgNode, s, strikeWounds(f, s) && rd.immune);
      }
    }
    rd.at++;
  }
  holder.round = null;
}

/** The blow waiting on an Immunity to Injury decision, as { name, dmg }, or null. `fights` is a
 *  lone fight or a group's members. */
export function pendingWound(fights) {
  const list = Array.isArray(fights) ? fights : [fights];
  const p = list[0] && list[0].pending;
  if (!p || p.kind !== 'injury') return null;
  return { name: (list[p.fi] || list[0]).name, dmg: p.dmg, body: !!p.body };
}

/** The missed strike waiting on a COMBAT-blessing retry decision, as { name }, or null. */
export function pendingReroll(fights) {
  const list = Array.isArray(fights) ? fights : [fights];
  const p = list[0] && list[0].pending;
  if (!p || p.kind !== 'reroll') return null;
  return { name: (list[p.fi] || list[0]).name };
}

/** Answer the waiting COMBAT-blessing decision and finish the round. `retry` strikes again
 *  (rerollAttack, consuming the blessing unless permanent) before the rest of the round runs;
 *  otherwise the miss stands and the round's one retry is gone. Returns false when nothing was
 *  waiting. Headless. (task 391) */
export function resolveReroll(state, fights, retry, dmgNode = null, roundNode = null) {
  const group = Array.isArray(fights);
  const list = group ? fights : [fights];
  const holder = list[0];
  const p = holder && holder.pending;
  if (!p || p.kind !== 'reroll' || !holder.round) return false;
  holder.pending = null;
  const f = list[p.fi] || holder;
  if (!(retry && rerollAttack(state, f))) f.attackRerolled = true; // the round's one retry is declined
  runRound(state, list, dmgNode, roundNode, group);
  return true;
}

/** Answer the waiting Immunity to Injury decision and finish the round. `use` spends the blessing
 *  (unless permanent) to block this blow and the rest of the round's wounds; otherwise the blow
 *  lands as rolled. Returns false when nothing was waiting. Headless. (task 390) */
export function resolveInjury(state, fights, use, dmgNode = null, roundNode = null) {
  const group = Array.isArray(fights);
  const list = group ? fights : [fights];
  const holder = list[0];
  const p = holder && holder.pending;
  if (!p || p.kind !== 'injury' || !holder.round) return false;
  holder.pending = null;
  const immune = !!use && state.useBlessing('injury');
  if (immune) holder.round.immune = true;
  if (p.body) { // a round body's wound (task 394): the body itself has already run
    if (immune) holder.log.push('no wound (Immunity to Injury)');
    else { state.damageStamina(p.dmg); holder.log.push(`−${p.dmg} Stamina`); }
  } else landEnemyStrike(state, list[p.fi] || holder, dmgNode, p, immune);
  holder.round.at++;
  runRound(state, list, dmgNode, roundNode, group);
  return true;
}

/** True when an enemy in a group has been beaten (Stamina at/under its threshold). */
export function isDefeated(fight) { return fight.stamina <= fight.winThreshold; }

/** Divine Wrath blessing (book6/94): inflict 1d damage on the enemy once, before or
 *  during the fight. Reduces the enemy's Stamina (and any staminaLost tally), may fell
 *  it, marks the fight so it can't be reused, and consumes the blessing unless
 *  permanent. Returns the damage dealt (0 if unavailable). Headless. (task 80) */
export function useWrathBlessing(state, fight) {
  if (!fight || fight.wrathUsed || !state.hasBlessing('wrath')) return 0;
  const dmg = Math.min(rollDice(1).total, fight.stamina);
  fight.stamina -= dmg;
  if (fight.staminaLost) state.adjustCodewordValue(fight.staminaLost, dmg);
  if (fight.stamina <= fight.winThreshold) fight.outcome = 'win';
  fight.wrathUsed = true;
  state.useBlessing('wrath');
  return dmg;
}

/** Defence through Faith blessing (book5/248/692/89): +bonus (default 3) to Defence for
 *  THIS fight only. The bonus is stored on the fight itself (fight.defenceBonus) —
 *  not the section-global store — so a later fight in the same section never
 *  inherits it (task 91). A simultaneous group is ONE encounter: pass its members
 *  so every foe's strikes meet the boosted Defence while the once-per-combat mark
 *  lives on the shared proxy. Consumes the blessing unless permanent. Returns the
 *  bonus applied (0 if unavailable). Headless. (tasks 80, 91) */
export function useDefenceBlessing(state, fight, bonus = 3, members = null) {
  if (!fight || fight.defenceUsed || !state.hasBlessing('defence')) return 0;
  for (const f of (members && members.length ? members : [fight])) f.defenceBonus = (f.defenceBonus || 0) + bonus;
  fight.defenceUsed = true;
  state.useBlessing('defence');
  return bonus;
}

/**
 * One round of a simultaneous group fight (group="…"): the player strikes ONE
 * still-standing enemy (the one they choose — §6.618 "against whichever opponent
 * you choose"; falls back to the first undefeated when no valid target is given),
 * then EVERY still-standing enemy strikes back — "each time you strike at one,
 * they all get to strike back" (§6.192/273/291/618). Mutates each fight and the
 * shared `state`. (task 48)
 */
export function groupFightRound(state, fights, dmgNode, target = null) {
  if (!fights.length || fights[0].pending) return; // a blow waits on the player (task 390)
  fights.forEach((f) => { f.attackRerolled = false; f.lastStrikeMissed = false; }); // task 91
  const chosen = (target && !isDefeated(target)) ? target : fights.find((f) => !isDefeated(f));
  const steps = chosen ? [{ who: 'player', fi: fights.indexOf(chosen) }] : [];
  fights.forEach((f, i) => { for (let k = 0; k < (f.attacks || 1); k++) steps.push({ who: 'enemy', fi: i }); });
  fights[0].round = { steps, at: 0, immune: false };
  runRound(state, fights, dmgNode, null, true);
}
