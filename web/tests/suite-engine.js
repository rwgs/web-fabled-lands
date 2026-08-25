// FL test suite — engine / state / effects / conditions / caches / transfer / dice
// Extracted verbatim from web/_test.html run() lines 39-513 (task 120).
import * as data from '../js/data.js';
import { GameState, makeItem, sanitizeData } from '../js/state.js';
import * as eng from '../js/engine.js';
import * as edition from '../js/edition.js';
import { goodsFrom, buyTrade } from '../js/market.js';
import { Story, previewProse } from '../js/render.js';

export async function run(ctx) {
  const { ok, parse } = ctx;
    await data.loadMeta();
    ok('meta books=6', data.availableBooks().length === 6);

    // adventurers
    const adv = data.parseAdventurers(data.bookInfo(1).adventurers);
    ok('warrior combat=6', adv.professions.Warrior.combat === 6, JSON.stringify(adv.professions.Warrior));
    ok('start stamina=9', adv.stamina === 9);
    ok('start gold=16', adv.gold === 16);

    // create character
    const gs = GameState.create({ name:'Test', gender:'m', profession:'Warrior', book:1, adv });
    ok('combat ability=6', gs.ability('combat') === 6, String(gs.ability('combat')));
    ok('has armour+weapon+map', gs.itemCount() >= 3, 'items='+gs.itemCount());
    ok('armour bonus=1', gs.armourBonus() === 1);
    ok('defence=8 (6+1+1)', gs.defence() === 8, String(gs.defence()));

    // conditions
    gs.addCodeword('Assassin');
    ok('if codeword true', eng.evaluateCondition(parse('<if codeword="Assassin"/>'), gs));
    ok('if not codeword false', eng.evaluateCondition(parse('<if not="t" codeword="Assassin"/>'), gs) === false);
    ok('if missing codeword false', eng.evaluateCondition(parse('<if codeword="Nope"/>'), gs) === false);
    ok('if shards>=10 true', eng.evaluateCondition(parse('<if shards="10"/>'), gs));
    ok('if shards>=999 false', eng.evaluateCondition(parse('<if shards="999"/>'), gs) === false);
    ok('if profession warrior', eng.evaluateCondition(parse('<if profession="Warrior"/>'), gs));
    gs.setVar('x', 5);
    ok('if var equals', eng.evaluateCondition(parse('<if var="x" equals="5"/>'), gs));
    ok('if var greaterthan', eng.evaluateCondition(parse('<if var="x" greaterthan="4"/>'), gs));
    ok('if var lessthan false', eng.evaluateCondition(parse('<if var="x" lessthan="3"/>'), gs) === false);

    // --- task 303: `defence` is the third derived stat the condition path has to route --------
    // firstAbility() knows the six CORE abilities only, so <if ability="defence"> fell to the
    // else arm and compared 0. Task 68 added arms for `rank` and `stamina` and stopped there.
    // Both shipped sites therefore took the wrong branch for every character, every visit.
    // The greaterthan case is pinned at a Defence that CLEARS the threshold, because that is
    // the one the bug made indistinguishable from an honest failure: 0 > 13 is false, and so
    // is 16 > 13 when the 16 never reaches the comparison.
    const gdef = GameState.create({ name:'Def', gender:'m', profession:'Warrior', book:1, adv });
    gdef.data.abilities.combat = 12; gdef.data.rank = 3;
    const D303 = gdef.defence();
    ok('task303: fixture — a Defence that clears §5.361\'s printed threshold ('+D303+')', D303 >= 14);
    ok('task303: <if ability="defence" greaterthan=> is TRUE when Defence clears it',
       eng.evaluateCondition(parse('<if ability="defence" greaterthan="13"/>'), gdef) === true);
    ok('task303: ...and FALSE when it does not — the comparison is real, not always-true',
       eng.evaluateCondition(parse('<if ability="defence" greaterthan="'+D303+'"/>'), gdef) === false);
    gdef.setVar('x', D303 - 1);
    ok('task303: §1.313 the daggers MISS when the dice total is under Defence',
       eng.evaluateCondition(parse('<if ability="defence" lessthan="x"/>'), gdef) === false);
    gdef.setVar('x', D303 + 1);
    ok('task303: §1.313 the daggers HIT when the dice total beats Defence',
       eng.evaluateCondition(parse('<if ability="defence" lessthan="x"/>'), gdef) === true);
    // The shipped markup itself, not a transcription of it — so a re-worded section is caught.
    const if361 = (await data.getSection(5, '361')).querySelector('if[ability="defence"]');
    ok('task303: §5.361 grants its §160 route to a Defence of 14 or more',
       !!if361 && eng.evaluateCondition(if361, gdef) === true,
       if361 ? 'the shipped <if> evaluated false at Defence '+D303 : 'no <if ability="defence"> in §5.361');
    const if313 = (await data.getSection(1, '313')).querySelector('if[ability="defence"]');
    gdef.setVar('x', D303 - 1);
    ok('task303: §1.313 spares a high-Defence character the dagger it always threw',
       !!if313 && eng.evaluateCondition(if313, gdef) === false,
       if313 ? 'the shipped <if> evaluated true at Defence '+D303+' vs x='+(D303-1) : 'no <if ability="defence"> in §1.313');
    ok('task303: control — task 68\'s rank arm still routes',
       eng.evaluateCondition(parse('<if ability="rank" greaterthan="2"/>'), gdef) === true);

    // --- task 302: the two spec mode words this port had no branch for --------------------------
    // `noarmour` and `current` are in rules/JaFL-XML-Tags.md's closed list for modifier=. Both
    // used to fall to renderDifficulty's numeric-addend path, resolve as a var name and read 0,
    // so the mode vanished with no trace. The gate's FL_ENUMS['modifier'] and renderDifficulty's
    // keyword list must move together with these.
    const g302 = GameState.create({ name:'Mod', gender:'m', profession:'Warrior', book:1, adv });
    g302.data.items = [];
    g302.addItem(makeItem('weapon', 'iron sword', 2));
    g302.addItem(makeItem('armour', 'plate', 3));
    const armour302 = g302.armourBonus(), full302 = g302.defence();
    ok('task302: fixture — a worn armour (+'+armour302+') inside a Defence of '+full302,
       armour302 === 3 && full302 === g302.ability('combat') + g302.rankValue() + 3);
    ok('task302: modifier="noarmour" takes the worn armour off Defence, and only that',
       g302.abilityForMode('defence', 'noarmour') === full302 - armour302,
       'got ' + g302.abilityForMode('defence', 'noarmour') + ' want ' + (full302 - armour302));
    ok('task302: no modifier still reads the full Defence',
       g302.abilityForMode('defence', null) === full302);
    ok('task302: modifier="noweapon" takes the WEAPON off Defence\'s COMBAT term, not the armour',
       g302.abilityForMode('defence', 'noweapon') === full302 - 2);
    ok('task302: modifier="natural" strips armour and weapon both (the spec\'s "any of these")',
       g302.abilityForMode('defence', 'natural') === g302.abilityNatural('combat') + g302.rankValue());
    // The one that says noarmour is not silently doing something else: on a core ability the
    // armour contributes nothing in this port, so the mode must leave the score alone.
    ok('task302: noarmour is a no-op on a core ability, which is what "armour reaches nothing else" means',
       g302.abilityForMode('combat', 'noarmour') === g302.ability('combat'));
    // End to end through the condition path task 303 opened.
    ok('task302: <if ability="defence" modifier="noarmour"> honours the mode',
       eng.evaluateCondition(parse('<if ability="defence" modifier="noarmour" greaterthan="'+(full302 - armour302 - 1)+'"/>'), g302) === true
       && eng.evaluateCondition(parse('<if ability="defence" modifier="noarmour" greaterthan="'+(full302 - 1)+'"/>'), g302) === false);

    // A <difficulty> may now NAME a derived stat: before task 302 firstAbility() returned null
    // for all three and the roll scored 0, which is why `current` had nowhere to be read.
    g302.data.staminaMax = 12; g302.data.stamina = 5;
    const rollStam = eng.rollDifficulty(g302, 'stamina', 10, 0, null);
    const rollCur = eng.rollDifficulty(g302, 'stamina', 10, 0, 'current');
    const rollNat = eng.rollDifficulty(g302, 'stamina', 10, 0, 'natural');
    ok('task302: <difficulty ability="stamina"> scores the unwounded max by default, not 0',
       rollStam.abilityScore === g302.effectiveStaminaMax() && rollStam.abilityScore > 0,
       'score=' + rollStam.abilityScore);
    ok('task302: modifier="current" rolls against the WOUNDED Stamina instead',
       rollCur.abilityScore === 5, 'score=' + rollCur.abilityScore);
    ok('task302: modifier="natural" rolls against the written maximum',
       rollNat.abilityScore === 12, 'score=' + rollNat.abilityScore);
    ok('task302: the roll reports the stat it rolled, so the widget label is not null',
       rollCur.ability === 'stamina', String(rollCur.ability));
    const rollDef = eng.rollDifficulty(g302, 'defence', 10, 0, 'noarmour');
    ok('task302: <difficulty ability="defence" modifier="noarmour"> scores Defence less the armour',
       rollDef.abilityScore === full302 - armour302 && rollDef.ability === 'defence',
       'score=' + rollDef.abilityScore);
    ok('task302: <difficulty ability="rank"> scores the Rank, the third derived stat',
       eng.rollDifficulty(g302, 'rank', 5, 0, null).abilityScore === g302.rankValue());
    ok('task302: <set value="defence" modifier="noarmour"> cannot hand back the armoured score',
       eng.evalExpression('defence', g302, 'noarmour') === full302 - armour302
       && eng.evalExpression('defence', g302, null) === full302,
       'noarmour=' + eng.evalExpression('defence', g302, 'noarmour') + ' plain=' + eng.evalExpression('defence', g302, null));
    ok('task302: control — a core ability still resolves the way it always did',
       eng.rollDifficulty(g302, 'combat', 10, 0, null).abilityScore === g302.ability('combat'));

    // --- task 304: the affliction term Defence never had ---------------------------------------
    // defence() summed COMBAT, Rank, armour and auras and stopped there, so the corpus's ONE
    // affliction naming Defence — §5.638's Curse of Vulnerability — had its −3 computed by
    // afflictionBonus and read by nobody: the page said "cursed", the sheet listed the curse,
    // and no number moved. defence() now delegates to defenceForMode, so the sheet score and
    // every mode-aware read are the same sum and cannot drift apart again.
    const g304 = GameState.create({ name:'Vuln', gender:'m', profession:'Warrior', book:5, adv });
    g304.data.abilities.combat = 8; g304.data.rank = 3;
    const D304 = g304.defence(), arm304 = g304.armourBonus();
    const curse638 = (await data.getSection(5, '638')).querySelector('curse');
    ok('task304: fixture — §5.638 still inflicts a curse naming Defence at −3',
       !!curse638 && curse638.querySelector('effect[ability="defence"]')?.getAttribute('bonus') === '-3',
       curse638 ? 'curse=' + curse638.getAttribute('name') : 'no <curse> in §5.638');
    eng.applyEffect(curse638, g304, {});
    ok('task304: the shipped Curse of Vulnerability takes 3 off Defence, as the page prints',
       g304.defence() === D304 - 3, `${D304}->${g304.defence()}`);
    ok('task304: the sheet score and the mode-aware read are one sum, so neither can drift',
       g304.defence() === g304.abilityForMode('defence', null));
    ok('task304: modifier="noarmour" keeps the curse — it strips the armour and nothing else',
       g304.abilityForMode('defence', 'noarmour') === D304 - 3 - arm304,
       'got ' + g304.abilityForMode('defence', 'noarmour') + ' want ' + (D304 - 3 - arm304));
    ok('task304: modifier="natural" strips it with the rest of the unwritten terms',
       g304.abilityForMode('defence', 'natural') === g304.abilityNatural('combat') + g304.rankValue());
    eng.applyEffect(parse('<lose curse="Curse of Vulnerability"/>'), g304, {});
    ok('task304: lifting the curse restores the Defence exactly',
       g304.defence() === D304 && !g304.hasCurse('Curse of Vulnerability'), String(g304.defence()));
    // The double-count question, asked from the side that would be silent: an affliction naming
    // COMBAT already reaches Defence through the combat term, so it must move it by 1, not 2.
    const gDbl = GameState.create({ name:'Dbl', gender:'m', profession:'Warrior', book:1, adv });
    const dblBefore = gDbl.defence();
    eng.applyEffect(parse('<curse name="Curse of Tambu"><effect ability="combat" bonus="-1"/></curse>'), gDbl, {});
    ok('task304: a curse naming COMBAT moves Defence by exactly 1, not twice',
       gDbl.defence() === dblBefore - 1, `${dblBefore}->${gDbl.defence()}`);
    // ability="*" (§2.136 Leprosy) covers the six CORE abilities and never the derived stat,
    // so it too arrives once, through COMBAT.
    const gStar = GameState.create({ name:'Star', gender:'m', profession:'Warrior', book:1, adv });
    const starBefore = gStar.defence();
    eng.applyEffect(parse('<disease name="Leprosy"><effect ability="*" bonus="-1"/></disease>'), gStar, {});
    ok('task304: an ability="*" affliction reaches Defence once, through COMBAT',
       gStar.defence() === starBefore - 1, `${starBefore}->${gStar.defence()}`);

    // --- task 305: readEffects serves <tick god=> too, and its output had two dead words ------
    // A god's effects land in data.effects, whose ONLY reader was effectBonus — summed by
    // ability() and abilityNoWeapon(), both core-ability paths. So `defence` (which task 304
    // taught the parser) and `stamina` (which it has accepted since task 185) both parsed,
    // stored, and moved nothing. The stamina half predates 304; it is closed here because it
    // is the same defect in the same function and splitting it would ship half a fix.
    const g305 = GameState.create({ name:'God', gender:'m', profession:'Warrior', book:1, adv });
    const D305 = g305.defence(), arm305 = g305.armourBonus();
    eng.applyEffect(parse('<tick god="Nagil"><effect ability="defence" bonus="2"/></tick>'), g305, {});
    ok('task305: a god granting Defence raises it by exactly 2',
       g305.defence() === D305 + 2, `${D305}->${g305.defence()}`);
    ok('task305: the sheet score and the mode-aware read still agree',
       g305.defence() === g305.abilityForMode('defence', null));
    ok('task305: modifier="noarmour" keeps the god bonus and drops only the armour',
       g305.abilityForMode('defence', 'noarmour') === D305 + 2 - arm305);
    ok('task305: modifier="natural" strips it — a god bonus is not on the written score',
       g305.abilityForMode('defence', 'natural') === g305.abilityNatural('combat') + g305.rankValue());
    eng.applyEffect(parse('<lose god="Nagil"/>'), g305, {});
    ok('task305: renouncing the god takes the bonus back with it',
       g305.defence() === D305 && !g305.hasGod('Nagil'), String(g305.defence()));
    // The control that says the new term is not a second helping of an old one.
    const gGodC = GameState.create({ name:'GodC', gender:'m', profession:'Warrior', book:1, adv });
    const dGodC = gGodC.defence();
    eng.applyEffect(parse('<tick god="Nagil"><effect ability="combat" bonus="2"/></tick>'), gGodC, {});
    ok('task305: a god granting COMBAT moves Defence by 2, through the combat term only',
       gGodC.defence() === dGodC + 2, `${dGodC}->${gGodC.defence()}`);
    // The shipped shape must not shift: §1.437/§2.334's Sig grant names THIEVERY and always
    // worked, because ability() has summed effectBonus all along.
    const gSig = GameState.create({ name:'Sig', gender:'m', profession:'Warrior', book:1, adv });
    const tSig = gSig.ability('thievery'), dSig = gSig.defence();
    const tick437 = (await data.getSection(1, '437')).querySelector('tick[god]');
    ok('task305: fixture — §1.437 still grants Sig with a THIEVERY effect',
       !!tick437 && tick437.querySelector('effect')?.getAttribute('ability') === 'thievery',
       tick437 ? 'god=' + tick437.getAttribute('god') : 'no <tick god=> in §1.437');
    eng.applyEffect(tick437, gSig, {});
    ok('task305: control — the shipped Sig initiate bonus still reaches THIEVERY, and only it',
       gSig.ability('thievery') === tSig + 1 && gSig.defence() === dSig,
       `thievery ${tSig}->${gSig.ability('thievery')} def ${dSig}->${gSig.defence()}`);

    // The Stamina half — and the load-time mirror that had to move with it. sanitizeData
    // clamps current Stamina to a ceiling it recomputes by hand; if that copy skipped the god
    // term it would cut a god-raised save back down on every load, which is the mirror-drift
    // shape task 304 closed in defence().
    const gStam = GameState.create({ name:'Stam', gender:'m', profession:'Warrior', book:1, adv });
    const maxStam = gStam.effectiveStaminaMax();
    eng.applyEffect(parse('<tick god="Alvir"><effect ability="stamina" bonus="5"/></tick>'), gStam, {});
    ok('task305: a god granting Stamina raises the effective maximum by 5',
       gStam.effectiveStaminaMax() === maxStam + 5, `${maxStam}->${gStam.effectiveStaminaMax()}`);
    gStam.data.stamina = maxStam + 5;
    const gStamLoaded = new GameState(sanitizeData(JSON.parse(JSON.stringify(gStam.data))));
    ok('task305: a save at the god-raised total survives the load-time clamp intact',
       gStamLoaded.data.stamina === maxStam + 5 && gStamLoaded.effectiveStaminaMax() === maxStam + 5,
       `stam=${gStamLoaded.data.stamina} max=${gStamLoaded.effectiveStaminaMax()}`);
    eng.applyEffect(parse('<lose god="Alvir"/>'), gStam, {});
    ok('task305: renouncing lowers the maximum again and takes current Stamina with it',
       gStam.effectiveStaminaMax() === maxStam && gStam.data.stamina <= maxStam,
       `max=${gStam.effectiveStaminaMax()} stam=${gStam.data.stamina}`);

    // multi-attribute <if>: recognized attributes combine as OR (JaFL
    // IfNode.meetsConditions), then not="t" negates the whole result. (task 3)
    const gcond = GameState.create({ name:'C', gender:'m', profession:'Mage', book:1, adv });
    gcond.data.items = []; gcond.addItem(makeItem('item', 'lantern'));
    gcond.addTitle('Arena Champion');   // has the title, NOT the codeword Dove
    ok('if codeword|title OR: title-only true', eng.evaluateCondition(parse('<if codeword="Dove" title="Arena Champion"/>'), gcond));
    gcond.addCodeword('Dove'); gcond.removeTitle('Arena Champion'); // has codeword, not title
    ok('if codeword|title OR: codeword-only true', eng.evaluateCondition(parse('<if codeword="Dove" title="Arena Champion"/>'), gcond));
    gcond.removeCodeword('Dove');       // has neither
    ok('if codeword|title OR: neither false', eng.evaluateCondition(parse('<if codeword="Dove" title="Arena Champion"/>'), gcond) === false);
    // item + profession OR (book1/460 shape): Mage without the item still matches
    ok('if item|profession OR: profession matches w/o item', eng.evaluateCondition(parse('<if item="torch" profession="Mage"/>'), gcond));
    ok('if item|profession OR: item matches w/o profession', eng.evaluateCondition(parse('<if item="lantern" profession="Warrior"/>'), gcond));
    ok('if item|profession OR: neither matches false', eng.evaluateCondition(parse('<if item="torch" profession="Warrior"/>'), gcond) === false);
    // not applies to the whole OR, not just the first attribute
    ok('not over OR: neither ⇒ true', eng.evaluateCondition(parse('<if not="t" item="torch" profession="Warrior"/>'), gcond));
    ok('not over OR: one present ⇒ false', eng.evaluateCondition(parse('<if not="t" item="lantern" profession="Warrior"/>'), gcond) === false);

    // task 128: ability=/bonus= alongside an equipment selector describe the ITEM sought,
    // not a standalone always-true disjunct. §5.680's ring-forging branch must gate on
    // actually holding the MAGIC+6 hyperium wand.
    const wandIf = '<if tool="hyperium wand" ability="magic" bonus="6"/>';
    const g680n = GameState.create({ name:'W0', gender:'m', profession:'Warrior', book:5, adv });
    ok('task128: §680 wand branch FALSE with no wand (no free ring)', eng.evaluateCondition(parse(wandIf), g680n) === false);
    const g680p = GameState.create({ name:'Wp', gender:'m', profession:'Warrior', book:5, adv });
    g680p.addItem(makeItem('tool', 'hyperium wand', 0, 'magic')); // a plain +0 wand, not the relic
    ok('task128: §680 wand branch FALSE with a plain (+0) hyperium wand', eng.evaluateCondition(parse(wandIf), g680p) === false);
    const g680w = GameState.create({ name:'Ww', gender:'m', profession:'Warrior', book:5, adv });
    g680w.addItem(makeItem('tool', 'hyperium wand', 6, 'magic')); // the real MAGIC+6 wand
    ok('task128: §680 wand branch TRUE only with the MAGIC+6 hyperium wand', eng.evaluateCondition(parse(wandIf), g680w) === true);
    // a no-comparator standalone ability= never matches; comparator forms still do (task 68)
    ok('task128: bare <if ability="magic"> never matches (no comparator)', eng.evaluateCondition(parse('<if ability="magic"/>'), g680n) === false);
    const rk680 = g680n.rankValue();
    ok('task128: comparator ability forms still compare (regression)', eng.evaluateCondition(parse(`<if ability="rank" greaterthan="${rk680 - 1}"/>`), g680n) === true && eng.evaluateCondition(parse(`<if ability="rank" greaterthan="${rk680}"/>`), g680n) === false);
    // rendered §680: no wand grays the §564 ring path but keeps the "If not" §245 exit live
    const c680 = document.createElement('div');
    new Story(c680, g680n, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(5, '680'), 5, '680');
    const goto680 = (n) => Array.from(c680.querySelectorAll('button.goto')).find((b) => b.textContent.trim() === n);
    ok('task128: §680 with no wand disables the §564 ring path, keeps §245 live', !!goto680('564') && goto680('564').disabled && !!goto680('245') && !goto680('245').disabled, `564d=${goto680('564') && goto680('564').disabled} 245d=${goto680('245') && goto680('245').disabled}`);
    const c680w = document.createElement('div');
    new Story(c680w, g680w, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(5, '680'), 5, '680');
    const goto680w = Array.from(c680w.querySelectorAll('button.goto')).find((b) => b.textContent.trim() === '564');
    ok('task128: §680 with the MAGIC+6 wand opens the §564 ring path', !!goto680w && !goto680w.disabled);

    // effects
    const before = gs.data.shards;
    eng.applyEffect(parse('<lose shards="10"/>'), gs, {});
    ok('lose 10 shards', gs.data.shards === before - 10, String(gs.data.shards));
    eng.applyEffect(parse('<gain shards="5"/>'), gs, {});
    ok('gain 5 shards', gs.data.shards === before - 5);
    eng.applyEffect(parse('<tick codeword="Foo"/>'), gs, {});
    ok('tick codeword', gs.hasCodeword('Foo'));
    // task 52: <lose codeword> zeroes the codeword's counter value too (JaFL: a
    // codeword and its value are one entry) — the bonus-counter reset idiom.
    gs.addCodeword('CharismaBonus'); gs.adjustCodewordValue('CharismaBonus', 3);
    ok('codeword value accumulates', gs.codewordValue('CharismaBonus') === 3);
    eng.applyEffect(parse('<lose codeword="CharismaBonus"/>'), gs, {});
    ok('losing a codeword also resets its counter value to 0', !gs.hasCodeword('CharismaBonus') && gs.codewordValue('CharismaBonus') === 0, `has=${gs.hasCodeword('CharismaBonus')} val=${gs.codewordValue('CharismaBonus')}`);
    const cs = gs.ability('combat');
    eng.applyEffect(parse('<lose ability="combat" amount="1"/>'), gs, {});
    ok('lose 1 combat', gs.abilityNatural('combat') === 6-1, String(gs.abilityNatural('combat')));
    const st = gs.data.stamina;
    eng.applyEffect(parse('<lose stamina="3"/>'), gs, {});
    ok('lose 3 stamina', gs.data.stamina === st-3);
    // task 71: <lose staminato="N"> ("beaten down to N") carries no stamina= attr
    gs.data.staminaMax = 20; gs.data.stamina = 15;
    eng.applyEffect(parse('<lose staminato="1"/>'), gs, {});
    ok('lose staminato="1" beats you down to 1 Stamina', gs.data.stamina === 1, `stam=${gs.data.stamina}`);

    // task 289: staminato SETS the score, so it restores as well as wounds ("This may
    // actually restore stamina, if it is currently lower than the value given").
    { // block-scoped
      const gsr = GameState.create({ name:'T289', gender:'m', profession:'Warrior', book:1, adv });
      gsr.data.staminaMax = 12; gsr.data.stamina = 3;
      eng.applyEffect(parse('<lose staminato="12"/>'), gsr, {});
      ok('task289: staminato above the current score restores up to it', gsr.data.stamina === 12, `stam=${gsr.data.stamina}`);
      gsr.data.stamina = 0;
      eng.applyEffect(parse('<lose staminato="12"/>'), gsr, {});
      ok('task289: staminato restores from 0 (the padded tournament loser)', gsr.data.stamina === 12 && !gsr.isDead(), `stam=${gsr.data.stamina} dead=${gsr.isDead()}`);
      eng.applyEffect(parse('<lose staminato="12"/>'), gsr, {});
      ok('task289: staminato equal to the current score is a no-op', gsr.data.stamina === 12, `stam=${gsr.data.stamina}`);
      eng.applyEffect(parse('<lose staminato="4"/>'), gsr, {});
      ok('task289: staminato below the current score still beats it down', gsr.data.stamina === 4, `stam=${gsr.data.stamina}`);
      gsr.data.stamina = 2;
      eng.applyEffect(parse('<lose staminato="99"/>'), gsr, {});
      ok('task289: a staminato restore clamps at the Stamina ceiling, not the target',
         gsr.data.stamina === gsr.effectiveStaminaMax(), `stam=${gsr.data.stamina} cap=${gsr.effectiveStaminaMax()}`);
      // the var form is what book1/297 uses
      gsr.data.stamina = 5; gsr.setVar('prestamina', 11);
      eng.applyEffect(parse('<lose staminato="prestamina"/>'), gsr, {});
      ok('task289: staminato="<var>" restores to the saved score', gsr.data.stamina === 11, `stam=${gsr.data.stamina}`);
    }

    // task 289 end to end: §1.297's padded tournament promises "any Stamina you lose is
    // not permanent", and §1.370 opens "back to your Stamina score before the fight" —
    // a wound left in place there is a spurious death on a shipped page.
    { // block-scoped
      const g297 = GameState.create({ name:'T297', gender:'m', profession:'Warrior', book:1, adv });
      g297.data.staminaMax = 12; g297.data.stamina = 12;
      const c297 = document.createElement('div');
      const st297 = new Story(c297, g297, { navigate(){}, onDeath(){}, notify(){} });
      st297.begin(await data.getSection(1, '297'), 1, '297');
      ok('task289: §1.297 saves the pre-fight Stamina in `prestamina`', g297.getVar('prestamina') === 12, `var=${g297.getVar('prestamina')}`);
      g297.data.stamina = 3; // the padded fight wounds you
      // Every fight round rerenders the section (render-combat), and `prestamina` is a
      // SNAPSHOT: it must survive that or the restore below resolves to the wound itself.
      st297.rerender();
      ok('task289: §1.297 keeps `prestamina` across the fight\'s rerenders',
         g297.getVar('prestamina') === 12, `var=${g297.getVar('prestamina')}`);
      const win297 = Array.from(c297.querySelectorAll('.group-action'))
        .filter((b) => !b.closest('.cond-inactive') && !b.disabled)
        .find((b) => b.textContent.includes('19'));
      ok('task289: §1.297 offers the "turn to 19" win group', !!win297,
         Array.from(c297.querySelectorAll('.group-action')).map((b) => b.textContent).join(' | '));
      if (win297) win297.click();
      ok('task289: §1.297 winning gives the padded wound back', g297.data.stamina === 12, `stam=${g297.data.stamina}`);

      const s370 = await data.getSection(1, '370');
      let deathsOk = 0;
      const gOk = GameState.create({ name:'T370', gender:'m', profession:'Warrior', book:1, adv });
      gOk.data.staminaMax = 12; gOk.data.stamina = 12;
      new Story(document.createElement('div'), gOk, { navigate(){}, onDeath(){ deathsOk++; }, notify(){} }).begin(s370, 1, '370');
      ok('task289: §1.370 entered on the restored score is not a death', deathsOk === 0, `deaths=${deathsOk}`);
      // control — the deferral machinery is untouched: still at 0 on arrival really does end it
      let deaths0 = 0;
      const g0 = GameState.create({ name:'T370z', gender:'m', profession:'Warrior', book:1, adv });
      g0.data.staminaMax = 12; g0.data.stamina = 0;
      new Story(document.createElement('div'), g0, { navigate(){}, onDeath(){ deaths0++; }, notify(){} }).begin(s370, 1, '370');
      ok('task289: §1.370 entered still at 0 Stamina fires onDeath (control)', deaths0 === 1, `deaths=${deaths0}`);

      // The other <set> the freeze reaches: §3.104 snapshots `curr` to decide `wounded`,
      // then <rest>s you to full. Re-evaluating `curr` after that heal flipped `wounded`
      // to 0 and opened the "if you were NOT wounded" permanent +1d Stamina the section
      // gates on exactly that.
      const g104 = GameState.create({ name:'T104', gender:'m', profession:'Warrior', book:3, adv });
      g104.data.staminaMax = 12; g104.data.stamina = 5;
      const c104 = document.createElement('div');
      const st104 = new Story(c104, g104, { navigate(){}, onDeath(){}, notify(){} });
      st104.begin(await data.getSection(3, '104'), 3, '104');
      ok('task289: §3.104 snapshots the wounded score and flags `wounded`',
         g104.getVar('curr') === 5 && g104.getVar('wounded') === 1, `curr=${g104.getVar('curr')} wounded=${g104.getVar('wounded')} stam=${g104.data.stamina}`);
      g104.data.stamina = 12; // the section's <rest> is taken: back to the normal score
      st104.rerender();
      ok('task289: §3.104 keeps `wounded` set once its <rest> has healed you',
         g104.getVar('curr') === 5 && g104.getVar('wounded') === 1, `curr=${g104.getVar('curr')} wounded=${g104.getVar('wounded')} stam=${g104.data.stamina}`);
    }

    // --- ability effects: rank/stamina/*/?/fatal/effect= (task 15) ---
    const ga = GameState.create({ name:'A', gender:'m', profession:'Warrior', book:1, adv });
    ga.data.section = '999';
    const rank0 = ga.data.rank, box0 = ga.tickCount(1,'999');
    eng.applyEffect(parse('<gain ability="rank" amount="1"/>'), ga, {});
    ok('gain ability=rank raises Rank', ga.data.rank === rank0 + 1, `rank=${ga.data.rank}`);
    ok('gain ability=rank does NOT tick the visit box', ga.tickCount(1,'999') === box0, `box=${ga.tickCount(1,'999')}`);
    // a genuinely bare <tick/> still ticks the box
    ga.data.section = '998';
    eng.applyEffect(parse('<tick/>'), ga, {});
    ok('bare <tick/> still ticks the box', ga.tickCount(1,'998') === 1);

    // ability=stamina is a PERMANENT change (max + current move together)
    const gm2 = GameState.create({ name:'S2', gender:'m', profession:'Warrior', book:1, adv });
    const max0 = gm2.data.staminaMax, cur0 = gm2.data.stamina;
    eng.applyEffect(parse('<gain ability="stamina" amount="3"/>'), gm2, {});
    ok('gain ability=stamina raises max+current', gm2.data.staminaMax === max0+3 && gm2.data.stamina === cur0+3, `max=${gm2.data.staminaMax} cur=${gm2.data.stamina}`);
    gm2.data.stamina = 2;
    eng.applyEffect(parse('<lose ability="stamina" amount="5"/>'), gm2, {});
    ok('lose ability=stamina non-fatal floors current at 1', gm2.data.stamina === 1 && gm2.isDead() === false, `st=${gm2.data.stamina}`);
    // fatal stamina loss to <=0 kills
    const gf = GameState.create({ name:'F', gender:'m', profession:'Warrior', book:1, adv });
    gf.data.stamina = 3;
    eng.applyEffect(parse('<lose ability="stamina" amount="10" fatal="t"/>'), gf, {});
    ok('fatal stamina loss to <=0 kills', gf.isDead() === true && gf.data.stamina === 0, `st=${gf.data.stamina}`);

    // ability="*" affects all six; fatal core-ability loss to 0 kills
    const gall = GameState.create({ name:'X', gender:'m', profession:'Warrior', book:1, adv });
    const c0 = gall.abilityNatural('combat'), t0 = gall.abilityNatural('thievery');
    eng.applyEffect(parse('<gain ability="*" amount="1"/>'), gall, {});
    ok('gain ability=* raises all abilities', gall.abilityNatural('combat')===c0+1 && gall.abilityNatural('thievery')===t0+1);
    const gfc = GameState.create({ name:'FC', gender:'m', profession:'Warrior', book:1, adv });
    gfc.data.abilities.thievery = 1;
    eng.applyEffect(parse('<lose ability="thievery" amount="1" fatal="t"/>'), gfc, {});
    ok('fatal ability loss to 0 kills (ability clamps to 1)', gfc.isDead() === true && gfc.abilityNatural('thievery') === 1);

    // ability="?" uses the provided chooser
    const gq = GameState.create({ name:'Q', gender:'m', profession:'Warrior', book:1, adv });
    gq.data.abilities.magic = 5;
    eng.applyEffect(parse('<lose ability="?" amount="1"/>'), gq, { chooser: () => ['magic'] });
    ok('lose ability="?" applies to the chosen ability', gq.abilityNatural('magic') === 4, `magic=${gq.abilityNatural('magic')}`);

    // effect="+fixed"/"+cursed" flag forms (display score unchanged; checks bite)
    const gfx = GameState.create({ name:'FX', gender:'m', profession:'Warrior', book:1, adv });
    gfx.data.abilities.charisma = 8;
    eng.applyEffect(parse('<tick ability="charisma" effect="+fixed"/>'), gfx, {});
    ok('effect="+fixed" pins check-value at 1, keeps display score', gfx.abilityForCheck('charisma') === 1 && gfx.ability('charisma') === 8);
    const mask = gfx.addItem(makeItem('item', 'courtier’s mask'));
    ok('a mask restores fixed CHARISMA in checks', gfx.abilityForCheck('charisma') === 8);
    gfx.removeItemById(mask.id);
    eng.applyEffect(parse('<tick ability="charisma" effect="-fixed"/>'), gfx, {});
    ok('effect="-fixed" clears the flag', gfx.abilityForCheck('charisma') === 8);
    const gcz = GameState.create({ name:'CZ', gender:'m', profession:'Warrior', book:1, adv });
    eng.applyEffect(parse('<tick ability="charisma" effect="+cursed"/>'), gcz, {});
    let cursedWin = 0; for (let i=0;i<60;i++){ if (eng.rollDifficulty(gcz,'charisma',6,0).success) cursedWin++; }
    ok('effect="+cursed" auto-fails CHARISMA checks', gcz.abilityForCheck('charisma') < 0 && cursedWin === 0, `win=${cursedWin}`);

    // --- wildcard / choice losses actually take things (task 16) ---
    const gw = GameState.create({ name:'W', gender:'m', profession:'Warrior', book:1, adv });
    gw.data.shards = 250;
    eng.applyEffect(parse('<lose shards="*"/>'), gw, {});
    ok('lose shards="*" empties the purse', gw.data.shards === 0);
    // lose all possessions, but a "keep"-tagged item survives
    const gp = GameState.create({ name:'P', gender:'m', profession:'Warrior', book:1, adv });
    gp.data.items = []; gp.addItem(makeItem('item','rope')); gp.addItem(makeItem('item','heirloom',0,null,['keep']));
    eng.applyEffect(parse('<lose item="*"/>'), gp, {});
    ok('lose item="*" removes all non-keep possessions', gp.itemCount() === 1 && gp.findItems('heirloom').length === 1, 'items='+gp.itemCount());
    // blessings: lose one (chosen), then lose all
    const gbl = GameState.create({ name:'BL', gender:'m', profession:'Warrior', book:1, adv });
    gbl.addBlessing('combat'); gbl.addBlessing('luck');
    eng.applyEffect(parse('<lose blessing="?"/>'), gbl, { chooser: () => ['luck'] });
    ok('lose blessing="?" removes the chosen blessing', !gbl.hasBlessing('luck') && gbl.hasBlessing('combat'));
    eng.applyEffect(parse('<lose blessing="*"/>'), gbl, {});
    ok('lose blessing="*" removes every blessing', gbl.data.blessings.length === 0);
    // task 132: "?"/"*" are match-any wildcards — any blessing satisfies <if blessing="?">
    ok('hasBlessing("?")/"*" false with no blessing', gbl.hasBlessing('?') === false && gbl.hasBlessing('*') === false);
    ok('<if blessing="?"> false with no blessing', eng.evaluateCondition(parse('<if blessing="?"/>'), gbl) === false);
    gbl.addBlessing('injury');
    ok('hasBlessing("?")/"*" true once any blessing is held', gbl.hasBlessing('?') === true && gbl.hasBlessing('*') === true);
    ok('<if blessing="?"> true once any blessing is held', eng.evaluateCondition(parse('<if blessing="?"/>'), gbl) === true);
    // §5.365 chapel: "he can bestow only one blessing at a time". Blessed → the choose-
    // one menu is blocked; unblessed → storm/disease/injury are live pick buttons.
    {
      const s365 = await data.getSection(5,'365');
      const gBlessed = GameState.create({ name:'C365b', gender:'m', profession:'Warrior', book:5, adv });
      gBlessed.addBlessing('storm');
      const cB = document.createElement('div');
      new Story(cB, gBlessed, { navigate(){}, onDeath(){}, notify(){} }).begin(s365,5,'365');
      const liveB = Array.from(cB.querySelectorAll('.reward-pick')).filter((b)=>!b.disabled);
      ok('§5.365 blessed: the choose-one menu is blocked (no live pick)', liveB.length === 0, `live=${liveB.length}`);

      const gFree = GameState.create({ name:'C365f', gender:'m', profession:'Warrior', book:5, adv });
      const cF = document.createElement('div');
      new Story(cF, gFree, { navigate(){}, onDeath(){}, notify(){} }).begin(s365,5,'365');
      const liveF = Array.from(cF.querySelectorAll('.reward-pick')).filter((b)=>!b.disabled);
      ok('§5.365 unblessed: three blessing picks are live', liveF.length === 3, `live=${liveF.length}`);
      liveF[0].click();
      ok('§5.365 unblessed: picking one grants exactly one blessing', gFree.data.blessings.length === 1, JSON.stringify(gFree.data.blessings));
    }
    // equipment confiscation via using="t"
    const ge2 = GameState.create({ name:'E', gender:'m', profession:'Warrior', book:1, adv });
    const hadWeapon = !!ge2.wieldedWeapon();
    eng.applyEffect(parse('<lose weapon="?" using="t"/>'), ge2, {});
    ok('lose weapon using="t" takes the wielded weapon', hadWeapon && !ge2.wieldedWeapon());
    const hadArmour = !!ge2.wornArmour();
    eng.applyEffect(parse('<lose armour="?" using="t"/>'), ge2, {});
    ok('lose armour using="t" takes the worn armour', hadArmour && !ge2.wornArmour());
    // lose every weapon
    const ge3 = GameState.create({ name:'E3', gender:'m', profession:'Warrior', book:1, adv });
    ge3.addItem(makeItem('weapon','dagger',1));
    eng.applyEffect(parse('<lose weapon="*"/>'), ge3, {});
    ok('lose weapon="*" removes every weapon', ge3.data.items.filter((i)=>i.kind==='weapon').length === 0);
    // resurrection + curse wildcards
    const gres = GameState.create({ name:'RS', gender:'m', profession:'Warrior', book:1, adv });
    gres.addResurrection({book:1,section:'5'}); gres.addResurrection({book:2,section:'9'});
    eng.applyEffect(parse('<lose resurrection="t"/>'), gres, {});
    ok('lose resurrection="t" clears all arrangements', gres.data.resurrections.length === 0);
    const gcu = GameState.create({ name:'CU', gender:'m', profession:'Warrior', book:1, adv });
    gcu.addCurse({type:'a'}); gcu.addCurse({type:'b'});
    eng.applyEffect(parse('<lose curse="*"/>'), gcu, {});
    ok('lose curse="*" lifts all curses', gcu.data.curses.length === 0);
    // cargo="?" removes one unit (was a no-op via indexOf('?'))
    const gca = GameState.create({ name:'CA', gender:'m', profession:'Warrior', book:1, adv });
    gca.addShip({type:'barque', crew:'average', cargo:['spices','silk'], docked:null});
    eng.applyEffect(parse('<lose cargo="?"/>'), gca, {});
    ok('lose cargo="?" removes one cargo unit', gca.ships[0].cargo.length === 1, 'cargo='+JSON.stringify(gca.ships[0].cargo));

    // --- task 17: weapon/armour/tool, docked-location, natural, empty-god, unknown ---
    const g17 = GameState.create({ name:'G17', gender:'m', profession:'Warrior', book:1, adv });
    ok('if weapon="?" true when armed', eng.evaluateCondition(parse('<if weapon="?"/>'), g17));
    ok('if not weapon="?" false when armed', eng.evaluateCondition(parse('<if not="t" weapon="?"/>'), g17) === false);
    g17.data.items = g17.data.items.filter((i) => i.kind !== 'weapon'); g17.reconcileEquipment();
    ok('if weapon="?" false when unarmed (book2/90 shape)', eng.evaluateCondition(parse('<if weapon="?"/>'), g17) === false);
    ok('if not="t" weapon="?" true when unarmed', eng.evaluateCondition(parse('<if not="t" weapon="?"/>'), g17));
    // weapon-type glob against the wielded weapon
    const g17b = GameState.create({ name:'G17b', gender:'m', profession:'Warrior', book:1, adv });
    g17b.data.items = g17b.data.items.filter((i) => i.kind !== 'weapon');
    g17b.addItem(makeItem('weapon','iron sword',2));
    ok('if weapon="*sword*" using="t" matches a wielded sword', eng.evaluateCondition(parse('<if weapon="*sword*" using="t"/>'), g17b));
    ok('if weapon="*axe*" using="t" does not match a sword', eng.evaluateCondition(parse('<if weapon="*axe*" using="t"/>'), g17b) === false);
    // docked-at-location (was "any ship anywhere")
    const g17c = GameState.create({ name:'G17c', gender:'m', profession:'Warrior', book:1, adv });
    g17c.addShip({type:'barque', crew:'average', cargo:[], docked:'Smogmaw'});
    ok('if docked="Smogmaw" true when berthed there', eng.evaluateCondition(parse('<if docked="Smogmaw"/>'), g17c));
    ok('if docked="Elsewhere" false', eng.evaluateCondition(parse('<if docked="Elsewhere"/>'), g17c) === false);
    // modifier="natural" ignores item bonuses (book2/554, book5/435)
    const g17d = GameState.create({ name:'G17d', gender:'m', profession:'Warrior', book:1, adv });
    g17d.data.abilities.magic = 3; g17d.addItem(makeItem('tool','wand',4,'magic'));
    ok('ability check uses the boosted score by default', eng.evaluateCondition(parse('<if ability="magic" greaterthan="5"/>'), g17d));
    ok('modifier="natural" compares the written score', eng.evaluateCondition(parse('<if ability="magic" modifier="natural" greaterthan="5"/>'), g17d) === false);
    ok('modifier="natural" lessthan uses the written score', eng.evaluateCondition(parse('<if ability="magic" modifier="natural" lessthan="4"/>'), g17d));
    // task 68: <if ability="rank|stamina"> must read the real stat, not fall to 0
    const g17rk = GameState.create({ name:'G17rk', gender:'m', profession:'Warrior', book:1, adv });
    g17rk.data.rank = 10;
    ok('§416 Rank gate opens at Rank 10 (greaterthan="3")', eng.evaluateCondition(parse('<if ability="rank" greaterthan="3"/>'), g17rk));
    ok('Rank gate greaterthan="10" false at Rank 10', eng.evaluateCondition(parse('<if ability="rank" greaterthan="10"/>'), g17rk) === false);
    ok('§b4/255 lessthan="4" false at Rank 10', eng.evaluateCondition(parse('<if ability="rank" lessthan="4"/>'), g17rk) === false);
    ok('rank equals="10" true', eng.evaluateCondition(parse('<if ability="rank" equals="10"/>'), g17rk));
    const g17rk2 = GameState.create({ name:'G17rk2', gender:'m', profession:'Warrior', book:1, adv });
    g17rk2.data.rank = 2;
    ok('Rank gate greaterthan="3" stays shut at Rank 2', eng.evaluateCondition(parse('<if ability="rank" greaterthan="3"/>'), g17rk2) === false);
    ok('§b4/255 lessthan="4" true at Rank 2', eng.evaluateCondition(parse('<if ability="rank" lessthan="4"/>'), g17rk2));
    ok('stamina condition reads current Stamina, not 0', eng.evaluateCondition(parse('<if ability="stamina" greaterthan="0"/>'), g17rk2));
    // god="" ("worships no god")
    const g17e = GameState.create({ name:'G17e', gender:'m', profession:'Warrior', book:1, adv });
    ok('if god="" true when worshipping no god', eng.evaluateCondition(parse('<if god=""/>'), g17e));
    g17e.setGod('Elnir');
    ok('if god="" false once worshipping a god', eng.evaluateCondition(parse('<if god=""/>'), g17e) === false);
    // unknown attribute no longer silently passes
    ok('unknown condition attr defaults to false', eng.evaluateCondition(parse('<if madeupattr="x"/>'), g17e) === false);
    ok('unknown condition attr with not defaults true', eng.evaluateCondition(parse('<if not="t" madeupattr="x"/>'), g17e));
    // disease/poison conditions recognised (populated in task 19)
    const g17f = GameState.create({ name:'G17f', gender:'m', profession:'Warrior', book:1, adv });
    ok('if disease="Ghoulbite" false when healthy', eng.evaluateCondition(parse('<if disease="Ghoulbite"/>'), g17f) === false);
    g17f.data.diseases.push({ name:'Ghoulbite', type:'disease' });
    ok('if disease="Ghoulbite" true once afflicted', eng.evaluateCondition(parse('<if disease="Ghoulbite"/>'), g17f));

    // --- task 18: item tags are preserved through awards/buys + tag conditions ---
    const g18 = GameState.create({ name:'G18', gender:'m', profession:'Warrior', book:1, adv });
    const c18 = document.createElement('div');
    const story18 = new Story(c18, g18, { navigate(){}, onDeath(){}, notify(){} });
    story18.begin(parse('<section name="t"><item name="lantern" tags="light"/></section>'), 1, 't');
    const takeBtn = c18.querySelector('.take-item');
    ok('tagged award shows a Take button', !!takeBtn);
    takeBtn.click();
    const lantern = g18.findItems('lantern')[0];
    ok('awarded item preserves its tags', !!lantern && (lantern.tags || []).includes('light'), JSON.stringify(lantern && lantern.tags));
    ok('if item="?" tags="light" true with a tagged lantern', eng.evaluateCondition(parse('<if item="?" tags="light"/>'), g18));
    ok('if item="?" tags="fire" false (no such tag)', eng.evaluateCondition(parse('<if item="?" tags="fire"/>'), g18) === false);
    // the book1/460 sewers gate: non-mage with a light source may proceed
    ok('§460 gate: light source lets a non-mage in', eng.evaluateCondition(parse('<if not="t" item="?" tags="light" profession="mage"/>'), g18) === false);
    // market purchase preserves tags (buytags/tags)
    const gmk = GameState.create({ name:'MK', gender:'m', profession:'Warrior', book:1, adv });
    gmk.data.shards = 100;
    buyTrade(gmk, goodsFrom(parse('<item name="candle" tags="light,useonce"/>'), 'item', 'candle', 0), 5);
    const candle = gmk.findItems('candle')[0];
    ok('bought item preserves its tags', !!candle && candle.tags.includes('light') && candle.tags.includes('useonce'), JSON.stringify(candle && candle.tags));

    // --- task 19: curse/disease/poison inflict → detect → penalty → cure ---
    const gt19 = GameState.create({ name:'T19', gender:'m', profession:'Warrior', book:1, adv });
    gt19.data.abilities.combat = 6; gt19.data.abilities.charisma = 5; gt19.data.abilities.scouting = 5;
    const combatBefore = gt19.ability('combat'), defBefore = gt19.defence();
    eng.applyEffect(parse('<curse name="Curse of Tambu"><effect ability="charisma" bonus="-1"/><effect ability="combat" bonus="-1"/><effect ability="scouting" bonus="-1"/></curse>'), gt19, {});
    ok('curse inflicted and detected by name', eng.evaluateCondition(parse('<if curse="Curse of Tambu"/>'), gt19));
    ok('curse applies its ability penalty', gt19.ability('combat') === combatBefore - 1, `combat=${gt19.ability('combat')}`);
    ok('curse penalty flows into Defence', gt19.defence() === defBefore - 1);
    eng.applyEffect(parse('<lose curse="Curse of Tambu"/>'), gt19, {});
    ok('lifting the curse restores the score', gt19.ability('combat') === combatBefore && gt19.defence() === defBefore && !gt19.hasCurse('Curse of Tambu'));

    // disease: inflict, non-cumulative re-infection, cure via <lose disease="*">
    const gd19 = GameState.create({ name:'D19', gender:'m', profession:'Warrior', book:1, adv });
    gd19.data.abilities.sanctity = 5; const sanct0 = gd19.ability('sanctity');
    eng.applyEffect(parse('<disease name="Ghoulbite"><effect ability="sanctity" bonus="-1"/></disease>'), gd19, {});
    ok('disease detected and penalised', gd19.hasDisease('Ghoulbite') && gd19.ability('sanctity') === sanct0 - 1);
    eng.applyEffect(parse('<disease name="Ghoulbite"><effect ability="sanctity" bonus="-1"/></disease>'), gd19, {});
    ok('non-cumulative re-infection does not stack', gd19.data.diseases.length === 1 && gd19.ability('sanctity') === sanct0 - 1);
    eng.applyEffect(parse('<lose disease="*"/>'), gd19, {});
    ok('<lose disease="*"> cures and restores', gd19.data.diseases.length === 0 && gd19.ability('sanctity') === sanct0);

    // poison: inflict + cure by name
    const gp19 = GameState.create({ name:'P19', gender:'m', profession:'Warrior', book:1, adv });
    gp19.data.abilities.thievery = 5; const thiev0 = gp19.ability('thievery');
    eng.applyEffect(parse('<poison name="Scorpion Poison"><effect ability="thievery" bonus="-1"/></poison>'), gp19, {});
    ok('poison detected and penalised', gp19.hasPoison('Scorpion Poison') && gp19.ability('thievery') === thiev0 - 1);
    eng.applyEffect(parse('<lose poison="Scorpion Poison"/>'), gp19, {});
    ok('poison cured by name restores', gp19.data.poisons.length === 0 && gp19.ability('thievery') === thiev0);

    // cumulative curse stacks its penalty
    const gc19 = GameState.create({ name:'C19', gender:'m', profession:'Warrior', book:1, adv });
    gc19.data.abilities.combat = 8; const cb0 = gc19.ability('combat');
    eng.applyEffect(parse('<curse name="Avenger\'s Bite" cumulative="t"><effect ability="combat" bonus="-1"/></curse>'), gc19, {});
    eng.applyEffect(parse('<curse name="Avenger\'s Bite" cumulative="t"><effect ability="combat" bonus="-1"/></curse>'), gc19, {});
    ok('cumulative curse stacks', gc19.data.curses.length === 2 && gc19.ability('combat') === cb0 - 2, `combat=${gc19.ability('combat')}`);

    // --- task 20: caches / banks / adjustmoney / transfer ---
    const g20 = GameState.create({ name:'C20', gender:'m', profession:'Warrior', book:2, adv });
    g20.data.shards = 300;
    g20.depositCacheMoney('2.49', 100);
    ok('deposit moves purse→cache', g20.data.shards === 200 && g20.cacheMoney('2.49') === 100, `sh=${g20.data.shards} cache=${g20.cacheMoney('2.49')}`);
    eng.applyEffect(parse('<adjustmoney name="2.49" multiply="1.5"/>'), g20, {});
    ok('adjustmoney multiply scales the named cache', g20.cacheMoney('2.49') === 150, `cache=${g20.cacheMoney('2.49')}`);
    eng.applyEffect(parse('<adjustmoney name="2.49" multiply="0"/>'), g20, {});
    ok('adjustmoney multiply=0 wipes the cache (lost investment)', g20.cacheMoney('2.49') === 0);
    // withdraw with a bank charge, rounded in the house's favour
    g20.adjustCacheMoney('MerchantBank', 50);
    const purse0 = g20.data.shards;
    g20.withdrawCacheMoney('MerchantBank', 50, 0.1); // 10% fee = 5 kept
    ok('withdraw charge deducts the fee', g20.data.shards === purse0 + 45 && g20.cacheMoney('MerchantBank') === 0, `sh=${g20.data.shards}`);
    // adjustmoney with no name halves the purse (floored)
    g20.data.shards = 51;
    eng.applyEffect(parse('<adjustmoney multiply="0.5">half of any money</adjustmoney>'), g20, {});
    ok('adjustmoney w/o name halves the purse, floored', g20.data.shards === 25, `sh=${g20.data.shards}`);
    // if cache= reads the stash, not the purse
    g20.adjustCacheMoney('MerchantBank', 150);
    ok('if cache shards condition reads the stash', eng.evaluateCondition(parse('<if cache="MerchantBank" shards="150"/>'), g20));
    ok('if cache shards below threshold false', eng.evaluateCondition(parse('<if cache="MerchantBank" shards="151"/>'), g20) === false);

    // the §4.468 corruption: <lose item="?" cache="X"> must hit the STASH, not carried items
    const g20b = GameState.create({ name:'C20b', gender:'m', profession:'Warrior', book:4, adv });
    const carried0 = g20b.itemCount();
    g20b.cacheAddItem('4.468', makeItem('item','stashed gem'));
    g20b.cacheAddItem('4.468', makeItem('item','stashed ring'));
    eng.applyEffect(parse('<lose item="?" cache="4.468">Lose one possession</lose>'), g20b, {});
    ok('lose item cache="X" takes from the stash, not the inventory', g20b.itemCount() === carried0 && g20b.cacheItems('4.468').length === 1, `carried=${g20b.itemCount()}/${carried0} stash=${g20b.cacheItems('4.468').length}`);
    g20b.adjustCacheMoney('4.468', 200);
    const purseB = g20b.data.shards;
    eng.applyEffect(parse('<lose shards="*" cache="4.468"/>'), g20b, {});
    ok('lose shards="*" cache empties only the stash', g20b.cacheMoney('4.468') === 0 && g20b.data.shards === purseB, `stash=${g20b.cacheMoney('4.468')} purse=${g20b.data.shards}`);
    // lock / unlock a cache
    eng.applyEffect(parse('<tick special="lock" cache="1.91"/>'), g20b, {});
    ok('tick special=lock locks the cache', g20b.isCacheLocked('1.91') === true);
    eng.applyEffect(parse('<tick special="unlock" cache="1.91"/>'), g20b, {});
    ok('tick special=unlock unlocks the cache', g20b.isCacheLocked('1.91') === false);
    // deposit into a cache via <tick cache= shards=>
    eng.applyEffect(parse('<tick cache="c1" shards="900"/>'), g20b, {});
    ok('tick shards cache credits the stash', g20b.cacheMoney('c1') === 900);

    // transfer: confiscate-and-return round trip
    const g20c = GameState.create({ name:'C20c', gender:'m', profession:'Warrior', book:2, adv });
    const hadW = g20c.data.items.filter((i)=>i.kind==='weapon').length;
    eng.applyEffect(parse('<transfer weapon="*" to="2.462"/>'), g20c, {});
    ok('transfer weapon="*" to cache disarms and stashes', hadW > 0 && g20c.data.items.filter((i)=>i.kind==='weapon').length === 0 && g20c.cacheItems('2.462').filter((i)=>i.kind==='weapon').length === hadW);
    eng.applyEffect(parse('<transfer item="*" from="2.462"/>'), g20c, {});
    ok('transfer item="*" from cache returns everything', g20c.data.items.filter((i)=>i.kind==='weapon').length === hadW && g20c.cacheItems('2.462').length === 0);
    g20c.data.shards = 100;
    eng.applyEffect(parse('<transfer shards="*" to="bank"/>'), g20c, {});
    ok('transfer shards="*" to cache banks all money', g20c.data.shards === 0 && g20c.cacheMoney('bank') === 100);

    // moneycache widget: deposit via the UI (§49 investment box)
    const g20r = GameState.create({ name:'C20r', gender:'m', profession:'Warrior', book:2, adv });
    g20r.data.shards = 500;
    const c20 = document.createElement('div');
    const story20 = new Story(c20, g20r, { navigate(){}, onDeath(){}, notify(){} });
    const s49 = await data.getSection(2,'49'); story20.begin(s49,2,'49');
    ok('§49 renders a money-cache widget', !!c20.querySelector('.money-cache'));
    c20.querySelector('.cache-amount').value = '100';
    Array.from(c20.querySelectorAll('.money-cache button')).find((b)=>/Deposit/.test(b.textContent)).click();
    ok('§49 deposit via the widget moves money into the cache', g20r.cacheMoney('2.49') === 100 && g20r.data.shards === 400, `cache=${g20r.cacheMoney('2.49')} sh=${g20r.data.shards}`);
    // itemcache widget renders (§468 villa strongroom)
    const g20i = GameState.create({ name:'C20i', gender:'m', profession:'Warrior', book:4, adv });
    const c20i = document.createElement('div');
    const story20i = new Story(c20i, g20i, { navigate(){}, onDeath(){}, notify(){} });
    const s468 = await data.getSection(4,'468'); story20i.begin(s468,4,'468');
    ok('§468 renders an item-cache widget', !!c20i.querySelector('.item-cache'));

    // --- task 131: cache max= semantics --------------------------------------
    // §4.263 arena "Winnings" cache is max="0": deposits barred (withdraw-only). A stake
    // locked at §4.127 can be doubled by the paired <adjustmoney ×2>, but no fresh coin
    // may be paid in — closing the deposit-double-withdraw money exploit.
    {
      const g263 = GameState.create({ name:'W263', gender:'m', profession:'Warrior', book:4, adv });
      g263.data.shards = 500;
      g263.addCodeword('4.127.1');            // the player bet on the finman (who won)
      g263.depositCacheMoney('4.127', 20);    // 20-Shard stake standing in the cache
      const c263 = document.createElement('div');
      const story263 = new Story(c263, g263, { navigate(){}, onDeath(){}, notify(){} });
      const s263 = await data.getSection(4,'263'); story263.begin(s263,4,'263');
      ok('§4.263 renders the Winnings money-cache', !!c263.querySelector('.money-cache'));
      const dep263 = () => Array.from(c263.querySelectorAll('.money-cache button')).find((b)=>/Deposit/.test(b.textContent));
      ok('§4.263 Deposit is barred (max="0")', !!dep263() && dep263().disabled === true, dep263() ? 'disabled='+dep263().disabled : 'none');
      const purse0 = g263.data.shards;
      c263.querySelector('.money-cache .cache-amount').value = '100';
      dep263().click(); // disabled — a no-op; confirms no fresh coin can be paid in
      ok('§4.263 no fresh coin can be paid in', g263.data.shards === purse0 && g263.cacheMoney('4.127') === 20, `purse=${g263.data.shards} stash=${g263.cacheMoney('4.127')}`);
      // the force="f" ×2 payout still doubles the standing stake despite max="0"
      const x2btn = Array.from(c263.querySelectorAll('button')).find((b)=>/add the amount you bet/i.test(b.textContent));
      ok('§4.263 offers the ×2 winnings action', !!x2btn);
      x2btn.click();
      ok('§4.263 the ×2 doubles the §4.127 stake to 40', g263.cacheMoney('4.127') === 40, `stash=${g263.cacheMoney('4.127')}`);
      c263.querySelector('.money-cache .cache-amount').value = '40';
      const wd263 = Array.from(c263.querySelectorAll('.money-cache button')).find((b)=>/Withdraw/.test(b.textContent));
      ok('§4.263 winnings can still be withdrawn', !!wd263 && !wd263.disabled);
      wd263.click();
      // purse: 500 start − 20 staked + 40 winnings = 520
      ok('§4.263 withdrawing the winnings credits the purse', g263.data.shards === 520 && g263.cacheMoney('4.127') === 0, `purse=${g263.data.shards} stash=${g263.cacheMoney('4.127')}`);
    }

    // §6.512 lacquer cabinet: an <itemcache max="5000"> also stores Shards (up to 5000);
    // items stay capped at itemlimit="6".
    {
      const g512 = GameState.create({ name:'B512', gender:'m', profession:'Warrior', book:6, adv });
      g512.data.items = []; g512.data.shards = 6000;
      const c512 = document.createElement('div');
      const story512 = new Story(c512, g512, { navigate(){}, onDeath(){}, notify(){} });
      const s512 = await data.getSection(6,'512'); story512.begin(s512,6,'512');
      ok('§6.512 renders an item-cache widget', !!c512.querySelector('.item-cache'));
      const dep512 = () => Array.from(c512.querySelectorAll('.item-cache button')).find((b)=>/Deposit/.test(b.textContent));
      ok('§6.512 shows a Shards deposit control (max="5000")', !!dep512());
      const amt512 = () => c512.querySelector('.item-cache .cache-amount');
      amt512().value = '5000'; dep512().click();
      ok('§6.512 deposits up to 5000 Shards', g512.cacheMoney('6.512') === 5000 && g512.data.shards === 1000, `stash=${g512.cacheMoney('6.512')} sh=${g512.data.shards}`);
      amt512().value = '1'; dep512().click();
      ok('§6.512 a 5001st Shard is refused (max cap)', g512.cacheMoney('6.512') === 5000 && g512.data.shards === 1000, `stash=${g512.cacheMoney('6.512')} sh=${g512.data.shards}`);
      // task 281: the item cache's money Withdraw is the twin of the Deposit above, and no
      // assertion had ever clicked it — the money-cache widget's own pair was covered, this
      // second pair only half. A cabinet you can pay into and not draw from is a trap.
      const wd512 = () => Array.from(c512.querySelectorAll('.item-cache button')).find((b)=>/Withdraw/.test(b.textContent));
      ok('§6.512 offers a live Withdraw beside the Deposit', !!wd512() && wd512().disabled === false);
      amt512().value = '2000'; wd512().click();
      ok('§6.512 withdrawing credits the purse and leaves the rest stored',
         g512.cacheMoney('6.512') === 3000 && g512.data.shards === 3000, `stash=${g512.cacheMoney('6.512')} sh=${g512.data.shards}`);
      // items still capped at itemlimit="6": six stored + one carried offers no Store button
      g512.data.items = [makeItem('item', 'spare rope')];
      for (let i = 0; i < 6; i++) g512.cacheAddItem('6.512', makeItem('item', 'trinket' + i));
      story512.begin(s512,6,'512');
      const store512 = Array.from(c512.querySelectorAll('.item-cache button')).find((b)=>/^Store /.test(b.textContent));
      ok('§6.512 items stay capped at six (no further Store offered)', !store512, store512 ? store512.textContent : 'none');
    }

    // task 97: §2.617 (Molhern's smithy) is the only filtered item cache — it takes one
    // weapon or suit of armour, excluding already-Molherned or bonus-6+ equipment. The
    // <include>/<exclude> filters must gate which possessions the deposit UI offers.
    {
      const g617 = GameState.create({ name:'M617', gender:'m', profession:'Warrior', book:2, adv });
      g617.data.items = [];
      g617.addItem(makeItem('weapon', 'iron sword', 2));                     // eligible
      g617.addItem(makeItem('armour', 'leather jerkin', 1));                 // eligible
      g617.addItem(makeItem('weapon', 'blessed axe', 3, null, ['Molherned'])); // excluded: already worked
      g617.addItem(makeItem('weapon', 'master blade', 6));                   // excluded: bonus 6+
      g617.addItem(makeItem('item', 'healing potion'));                      // not a candidate at all
      const c617 = document.createElement('div');
      const story617 = new Story(c617, g617, { navigate(){}, onDeath(){}, notify(){} });
      story617.begin(await data.getSection(2,'617'), 2, '617');
      const depBtn = (name) => Array.from(c617.querySelectorAll('.cache-deposit button')).find((b) => new RegExp(name, 'i').test(b.textContent));
      ok('§2.617 offers a plain weapon (enabled Store)', (() => { const b = depBtn('iron sword'); return !!b && !b.disabled; })());
      ok('§2.617 offers a suit of armour (enabled Store)', (() => { const b = depBtn('leather jerkin'); return !!b && !b.disabled; })());
      ok('§2.617 rejects an already-Molherned weapon (disabled, with reason)', (() => { const b = depBtn('blessed axe'); return !!b && b.disabled && /already worked/i.test(b.title); })(), (() => { const b = depBtn('blessed axe'); return b ? `dis=${b.disabled} title=${b.title}` : 'no button'; })());
      ok('§2.617 rejects a bonus-6 weapon (disabled, with reason)', (() => { const b = depBtn('master blade'); return !!b && b.disabled && /good enough already/i.test(b.title); })());
      ok('§2.617 does not offer an ordinary (non weapon/armour) item at all', !depBtn('healing potion'));
      // Storing an eligible item caches it and hits itemlimit="1" (deposit UI then closes).
      depBtn('iron sword').click();
      ok('§2.617 storing a weapon caches it and enforces itemlimit=1', g617.cacheItems('2.617').length === 1 && !g617.hasItem('iron sword') && !c617.querySelector('.cache-deposit'),
        `cache=${g617.cacheItems('2.617').length} deposit=${!!c617.querySelector('.cache-deposit')}`);
    }

    // task 101: §5.114's <sectionview> trance oracle — a read-only preview of random
    // sections that applies no effects and never changes the player's visit or state.
    {
      const gSV = GameState.create({ name:'SV', gender:'m', profession:'Warrior', book:5, adv });
      let svNav = null;
      const cSV = document.createElement('div');
      const storySV = new Story(cSV, gSV, { navigate:(b,s)=>{svNav={b,s};}, onDeath(){}, notify(){} });
      storySV.begin(await data.getSection(5,'114'), 5, '114');
      const svLink = cSV.querySelector('.sectionview-link');
      ok('§5.114 renders the <sectionview> oracle as a read-only link', !!svLink && /up to six paragraphs/i.test(svLink.textContent));

      // Drive the LINK, not just openSectionView below: it is the player's only way into the
      // trance, and the whole promise of task 101 is that taking it costs nothing. Wait for the
      // first vision to land before judging — the reveal is what would touch state if anything
      // did. (task 282)
      const svDataBefore = JSON.stringify(gSV.data);
      const svSectionBefore = gSV.data.section;
      const svHistBefore = JSON.stringify(gSV.data.history || null);
      svLink.click();
      let svClicked = document.querySelector('.modal-overlay .sectionview-modal');
      for (let i = 0; i < 200 && !(svClicked && svClicked.querySelector('.sectionview-cap')); i++) {
        await new Promise((r) => setTimeout(r, 10));
        svClicked = document.querySelector('.modal-overlay .sectionview-modal');
      }
      ok('§5.114 clicking the oracle link opens the vision', !!svClicked && !!svClicked.querySelector('.sectionview-cap') && !!svClicked.querySelector('.sectionview-prose'));
      ok('§5.114 the clicked oracle leaves the sheet, the section and the history untouched',
         JSON.stringify(gSV.data) === svDataBefore && gSV.data.section === svSectionBefore && JSON.stringify(gSV.data.history || null) === svHistBefore && svNav === null,
         svNav ? 'navigated' : 'state changed by the clicked oracle');
      Array.from(svClicked.querySelectorAll('.modal-buttons .btn')).find((b) => !b.classList.contains('btn-primary')).click();
      ok('§5.114 closing the clicked oracle takes the vision off the page', !document.querySelector('.sectionview-modal'));

      // previewProse renders a known section's prose read-only: content present, no controls.
      const prose = previewProse(await data.getSection(5,'114'));
      ok('previewProse renders the section prose (content present)', /priestess/i.test(prose.textContent) && prose.querySelectorAll('p').length >= 1);
      ok('previewProse arms no interactive controls', prose.querySelectorAll('button, .goto, .choice, .btn-roll').length === 0);

      // Opening the oracle shows an isolated popup, mutates NO state and does NOT navigate.
      const before = JSON.stringify(gSV.data);
      const beforeSection = gSV.data.section;
      // task 177: the oracle now routes through the shared dialog shell — remember an opener so
      // we can prove focus is restored on close.
      const svOpener = document.createElement('button'); svOpener.textContent = 'open oracle';
      document.body.appendChild(svOpener); svOpener.focus();
      const sv = await storySV.openSectionView('Trance', 6);
      const overlay = sv.overlay;
      ok('§5.114 opening the oracle shows an isolated read-only popup', document.body.contains(overlay) && !!overlay.querySelector('.sectionview-modal') && !!overlay.querySelector('.sectionview-cap') && !!overlay.querySelector('.sectionview-prose'));
      ok('§5.114 the oracle popup exposes no game controls', overlay.querySelectorAll('.sectionview-prose button, .sectionview-prose .goto, .sectionview-prose .choice, .sectionview-prose .btn-roll').length === 0);
      ok('§5.114 the oracle changes neither the current section nor navigation', gSV.data.section === beforeSection && svNav === null);
      ok('§5.114 the oracle mutates no player state', JSON.stringify(gSV.data) === before, 'state changed by oracle');
      // task 177: the oracle honours the shared dialog contract.
      ok('task177 oracle: exposed as a named role="dialog"', sv.box.getAttribute('role') === 'dialog' && sv.box.getAttribute('aria-modal') === 'true' && sv.box.getAttribute('aria-label') === 'Trance');
      ok('task177 oracle: moves initial focus into the dialog', document.activeElement === sv.box);
      ok('task177 oracle: the app behind it is frozen (inert + aria-hidden)', svOpener.hasAttribute('inert') && svOpener.getAttribute('aria-hidden') === 'true');
      // "Reveal another" updates the vision in place — it must NOT close the dialog.
      const anotherBtn = Array.from(overlay.querySelectorAll('.modal-buttons .btn')).find((b) => b.classList.contains('btn-primary'));
      const labelBefore = anotherBtn.textContent;
      anotherBtn.click();
      for (let i = 0; i < 200 && anotherBtn.textContent === labelBefore; i++) await new Promise((r) => setTimeout(r, 10));
      ok('task177 oracle: "Reveal another" updates in place without closing', document.body.contains(overlay) && anotherBtn.textContent !== labelBefore);
      // Close restores focus to the opener and lifts the background freeze.
      const closeBtn = Array.from(overlay.querySelectorAll('.modal-buttons .btn')).find((b) => !b.classList.contains('btn-primary'));
      closeBtn.click();
      ok('task177 oracle: Close removes the overlay', !document.body.contains(overlay));
      ok('task177 oracle: Close restores focus to the opener', document.activeElement === svOpener);
      ok('task177 oracle: Close lifts the background freeze', !svOpener.hasAttribute('inert') && !svOpener.hasAttribute('aria-hidden'));
      svOpener.remove();
    }

    // task 102: §1.338's healer — the <lose price="p" shards="25"> cost arms the
    // <lose poison="?" flag="p"> cure; too poor ⇒ disabled; paying ⇒ 25 Shards spent
    // and the poison cured exactly once (never for free on entry).
    {
      const s338 = await data.getSection(1, '338');
      // (a) too poor: the Pay button is disabled and nothing happens on entry.
      const gPoor = GameState.create({ name:'P338', gender:'m', profession:'Warrior', book:1, adv });
      gPoor.data.shards = 10;
      eng.applyEffect(parse('<poison name="Snake Venom"><effect ability="thievery" bonus="-1"/></poison>'), gPoor, {});
      const cPoor = document.createElement('div');
      new Story(cPoor, gPoor, { navigate(){}, onDeath(){}, notify(){} }).begin(s338, 1, '338');
      const payPoor = Array.from(cPoor.querySelectorAll('.pay-action')).find((b) => /Shards/i.test(b.textContent));
      ok('§1.338 arms a Pay button for the poison cure', !!payPoor);
      ok('§1.338 with < 25 Shards the Pay button is disabled', !!payPoor && payPoor.disabled && /not enough/i.test(payPoor.title || ''), payPoor ? `dis=${payPoor.disabled} title=${payPoor.title}` : 'no button');
      ok('§1.338 does not cure the poison for free on entry', gPoor.hasPoison('Snake Venom') && gPoor.data.shards === 10);

      // (b) can afford: paying deducts 25 and cures the poison, restoring the ability.
      const gRich = GameState.create({ name:'R338', gender:'m', profession:'Warrior', book:1, adv });
      gRich.data.shards = 100;
      gRich.data.abilities.thievery = 5; const thRich = gRich.ability('thievery');
      eng.applyEffect(parse('<poison name="Snake Venom"><effect ability="thievery" bonus="-1"/></poison>'), gRich, {});
      ok('§1.338 the poison penalises the ability first', gRich.ability('thievery') === thRich - 1);
      const cRich = document.createElement('div');
      new Story(cRich, gRich, { navigate(){}, onDeath(){}, notify(){} }).begin(s338, 1, '338');
      ok('§1.338 the poison is intact and no Shards spent until the player pays', gRich.hasPoison('Snake Venom') && gRich.data.shards === 100);
      Array.from(cRich.querySelectorAll('.pay-action')).find((b) => /Shards/i.test(b.textContent)).click();
      ok('§1.338 paying deducts 25 Shards and cures the poison (ability restored)', gRich.data.shards === 75 && !gRich.hasPoison('Snake Venom') && gRich.ability('thievery') === thRich, `shards=${gRich.data.shards} poison=${gRich.hasPoison('Snake Venom')} thiev=${gRich.ability('thievery')}`);
      const payAgain = Array.from(cRich.querySelectorAll('.pay-action')).find((b) => /Shards/i.test(b.textContent));
      ok('§1.338 the cure cannot be bought twice (button locks after paying)', gRich.data.shards === 75 && (!payAgain || payAgain.disabled));
    }

    // ranges
    ok('range 0-4 ~3', eng.matchRange('0-4', 3));
    ok('range 1,2 ~2', eng.matchRange('1,2', 2));
    ok('range 1,2 ~3 no', !eng.matchRange('1,2', 3));
    ok('range 11 ~11', eng.matchRange('11', 11));
    ok('range 14+ ~15', eng.matchRange('14+', 15));
    ok('range 2-10 ~1 no', !eng.matchRange('2-10', 1));

    // difficulty roll logic
    let sc=0; for (let i=0;i<200;i++){ const r=eng.rollDifficulty(gs,'combat',10,0); if (r.success !== (r.total>10)) sc++; if (r.dice.length!==2) sc+=100; if (r.margin !== r.total-10) sc+=1000; }
    ok('difficulty roll consistent', sc===0, 'mismatches='+sc);

    // training rule (extracted to engine.rollTraining): success ⇒ +1 ability
    const gt = GameState.create({ name:'T', gender:'m', profession:'Warrior', book:1, adv });
    let tbad=0, tgain=0;
    for (let i=0;i<300;i++){ gt.data.abilities.combat=2; const r=eng.rollTraining(gt,'combat',2,0);
      if (r.success !== (r.total>2)) tbad++;
      if (r.success && gt.abilityNatural('combat')!==3) tbad++;
      if (r.success) tgain++; }
    ok('training: success flag = roll>natural', tbad===0, 'bad='+tbad);
    ok('training: +1 ability on success', tgain>0);

    // rank check rule (extracted to engine.rollRankCheck): success iff roll<=Rank
    const gk = GameState.create({ name:'K', gender:'m', profession:'Warrior', book:1, adv }); gk.data.rank=5;
    let kbad=0; for (let i=0;i<200;i++){ const r=eng.rollRankCheck(gk,1,0,0); if (r.success!==(r.total<=5)) kbad++; if (r.margin!==1+5-r.total) kbad++; }
    ok('rankcheck: success=roll<=Rank & margin', kbad===0, 'bad='+kbad);

    // resurrection deal (extracted to engine.buyResurrectionDeal)
    const gr = GameState.create({ name:'R', gender:'f', profession:'Priest', book:1, adv }); gr.data.shards=100;
    eng.buyResurrectionDeal(gr, { book:2, section:'50', text:'a deal', god:'Elnir', cost:30 });
    ok('resurrection: charges cost + records deal', gr.data.shards===70 && gr.hasResurrection() && gr.data.resurrections[0].section==='50', `sh=${gr.data.shards}`);
    // reviveWithResurrection (tasks 34, 159): consume the deal, revive to FULL Stamina
    // (JaFL heals entirely; §1.640 "your Stamina is back to its normal score"), return target.
    gr.data.staminaMax = 20; gr.data.stamina = 0;
    const revTarget = eng.reviveWithResurrection(gr);
    ok('task159: revive consumes the deal + heals to FULL max + returns target',
       revTarget && revTarget.book===2 && revTarget.section==='50' && gr.data.stamina===20 && !gr.hasResurrection(),
       `t=${JSON.stringify(revTarget)} st=${gr.data.stamina} has=${gr.hasResurrection()}`);
    ok('task159: revive with no deal returns null and leaves Stamina', eng.reviveWithResurrection(gr) === null && gr.data.stamina === 20);

    // task 159: revive heals to the EFFECTIVE max (aura holder returns to the full raised
    // total, not the written max/half), and the player may CHOOSE which of several deals to
    // spend (a standard deal + a supplemental boon coexist — task 98).
    {
      const ring159 = { id:'ring159', kind:'item', name:'ring of ultimate power', bonus:0, ability:null, tags:[], effects:[{ type:'aura', ability:'Stamina', bonus:10, text:'+10 Stamina' }], group:null, wielded:false, worn:false };
      const gAura = new GameState(sanitizeData(JSON.parse(JSON.stringify({ schema:3, abilities:{ combat:5 }, staminaMax:20, stamina:0, items:[ring159], resurrections:[{ book:1, section:'640', god:null }], book:5, section:'564' }))));
      eng.reviveWithResurrection(gAura);
      ok('task159: revive heals an aura holder to the effective max (30, not 20 or 15)', gAura.data.stamina === 30, `st=${gAura.data.stamina}`);

      const gChoose = GameState.create({ name:'C', gender:'m', profession:'Warrior', book:1, adv });
      gChoose.data.staminaMax = 12; gChoose.data.stamina = 0;
      gChoose.addResurrection({ book:6, section:'355', god:null, supplemental:true }); // supplemental, bought first
      gChoose.addResurrection({ book:2, section:'50', god:'Elnir' });                  // standard, added on top
      ok('task159 setup: both deals coexist with the supplemental at index 0',
         gChoose.data.resurrections.length === 2 && gChoose.data.resurrections[0].supplemental === true);
      const chosen = eng.reviveWithResurrection(gChoose, 1); // spend the standard deal, keep the supplemental
      ok('task159: the chosen deal is consumed and the others are kept',
         chosen && chosen.section === '50' && gChoose.data.resurrections.length === 1 && gChoose.data.resurrections[0].section === '355',
         `chosen=${JSON.stringify(chosen)} left=${JSON.stringify(gChoose.data.resurrections)}`);
    }

    // task 135: renouncing a god cancels that god's resurrection deal; a deal bought
    // while NOT a worshipper is stored godless and survives any renouncement.
    {
      const gg = GameState.create({ name:'G', gender:'m', profession:'Warrior', book:1, adv });
      gg.setGod('Tyrnai');
      eng.buyResurrectionDeal(gg, { book:1, section:'33', text:'Tyrnai deal', god:'Tyrnai' });
      ok('task135: a worshipper\'s deal is stamped with the god', gg.data.resurrections[0].god === 'Tyrnai');
      gg.removeGod('Tyrnai');
      ok('task135: renouncing the god cancels its resurrection deal', !gg.hasResurrection());

      const gh = GameState.create({ name:'H', gender:'m', profession:'Warrior', book:1, adv });
      eng.buyResurrectionDeal(gh, { book:1, section:'33', text:'godless deal', god:'Tyrnai' }); // not a worshipper
      ok('task135: a deal bought while not worshipping is stored godless',
         gh.hasResurrection() && gh.data.resurrections[0].god === null);
      gh.setGod('Nagil'); gh.removeGod('Nagil'); // renounce a different god
      ok('task135: renouncing another god leaves the godless deal', gh.hasResurrection());
    }

    // task 136: five small reference divergences.
    {
      // 136.1 — <transfer shards="tenth"> resolves §6.496's own rounded-up var (995 → 100, not 99).
      const g496 = GameState.create({ name:'T', gender:'m', profession:'Warrior', book:6, adv });
      g496.data.shards = 995;
      eng.applyEffect(parse('<set var="tenth" value="(shards+9)/10"/>'), g496);
      ok('task136.1: §6.496 tenth var rounds up ((995+9)/10=100)', g496.getVar('tenth') === 100, `tenth=${g496.getVar('tenth')}`);
      eng.applyEffect(parse('<transfer shards="tenth" to="tithe"/>'), g496);
      ok('task136.1: the tithe moves 100 Shards, not 99', g496.cacheMoney('tithe') === 100 && g496.data.shards === 895, `cache=${g496.cacheMoney('tithe')} purse=${g496.data.shards}`);

      // 136.2 — a plain named cargo loss (§5.634 "they are lost") drops EVERY unit.
      const g634 = GameState.create({ name:'C', gender:'m', profession:'Warrior', book:5, adv });
      g634.addShip({ type:'barque', name:'Hold', crew:'poor', cargo:['grain','grain','spices'] });
      eng.applyEffect(parse('<lose cargo="grain"/>'), g634);
      ok('task136.2: §5.634 plain named cargo loss removes every grain unit',
         !!g634.currentShip() && !g634.currentShip().cargo.includes('grain') && g634.currentShip().cargo.length === 1,
         `cargo=${JSON.stringify(g634.currentShip() && g634.currentShip().cargo)}`);
      // a priced one-for-one exchange (§3.569 price=) still trades a single unit.
      const g569 = GameState.create({ name:'P', gender:'m', profession:'Warrior', book:3, adv });
      g569.addShip({ type:'barque', name:'Hold', crew:'poor', cargo:['furs','furs','timber'] });
      eng.applyEffect(parse('<lose cargo="furs" price="x"/>'), g569);
      ok('task136.2: a priced cargo exchange still trades one unit',
         g569.currentShip().cargo.filter((c) => c === 'furs').length === 1,
         `cargo=${JSON.stringify(g569.currentShip().cargo)}`);

      // 136.3 — <effect description="+5 Stamina"> surfaces as the effect text (§5.638).
      const effs638 = eng.readItemEffects(parse('<item name="potion of healing"><effect type="use" uses="1" verb="Drink" description="+5 Stamina"><rest stamina="5"/></effect></item>'));
      ok('task136.3: §5.638 description= surfaces as effect text', !!effs638[0] && effs638[0].text === '+5 Stamina', `text=${effs638[0] && effs638[0].text}`);

      // 136.4 — value="rank" honours modifier="natural" (a +2-Rank ring-holder judged by natural Rank, §2.270).
      const gRank = GameState.create({ name:'R', gender:'m', profession:'Warrior', book:2, adv });
      gRank.data.rank = 3;
      gRank.data.items.push({ id:'ringR', kind:'item', name:'ring of ultimate power', bonus:0, ability:null, tags:[], effects:[{ type:'aura', ability:'Rank', bonus:2 }], group:null, wielded:false, worn:false });
      ok('task136.4: rankValue includes the ring +2 aura (5)', gRank.rankValue() === 5, `rank=${gRank.rankValue()}`);
      ok('task136.4: value="rank" modifier="natural" reads natural Rank (3, not 5)', eng.evalExpression('rank', gRank, 'natural') === 3);
      ok('task136.4: value="rank" with no modifier reads effective Rank (5)', eng.evalExpression('rank', gRank, null) === 5);

      // 136.4 — a cursed ability reads as 0 in a value expression (§6.332 12-charisma → 12), not the -1000 sentinel.
      const gCur = GameState.create({ name:'X', gender:'m', profession:'Warrior', book:6, adv });
      gCur.setAbilityFlag('charisma', 'cursed', true);
      ok('task136.4: cursed CHARISMA reads 0 in value context (12-charisma=12, not 1012)',
         eng.evalExpression('12-charisma', gCur, 'natural') === 12, `v=${eng.evalExpression('12-charisma', gCur, 'natural')}`);
    }

    // task 160: loss-matcher follow-ups.
    {
      // 160.1 — a named equipment loss filters candidates BY NAME (not "any of that kind"),
      // so it takes the named piece and leaves an unrelated weapon that is first in order.
      const g160 = GameState.create({ name:'E160', gender:'m', profession:'Warrior', book:1, adv });
      g160.data.items = [];
      g160.addItem(makeItem('weapon', 'sword', 3));        // first in inventory order
      g160.addItem(makeItem('weapon', 'oaken staff', 1));
      eng.applyEffect(parse('<lose weapon="oaken staff"/>'), g160);
      ok('task160.1: a named weapon loss takes the NAMED weapon, not the first of its kind',
         g160.hasItem('sword') && !g160.hasItem('oaken staff'),
         `items=${JSON.stringify(g160.data.items.map((i) => i.name))}`);

      // 160.2 — losePaymentPlan is quantity-aware: a multiple= loss is eligible only once
      // that many matching items exist.
      const g160b = GameState.create({ name:'M160', gender:'m', profession:'Warrior', book:1, adv });
      g160b.data.items = [];
      g160b.addItem(makeItem('item', 'gem', 0, null, ['gem']));
      g160b.addItem(makeItem('item', 'gem', 0, null, ['gem']));
      const planShort = eng.losePaymentPlan(parse('<lose item="gem" multiple="3" price="k"/>'), g160b);
      ok('task160.2: plan is ineligible when fewer than multiple= items exist', planShort.eligible === false);
      g160b.addItem(makeItem('item', 'gem', 0, null, ['gem']));
      const planOk = eng.losePaymentPlan(parse('<lose item="gem" multiple="3" price="k"/>'), g160b);
      ok('task160.2: plan is eligible once multiple= items exist', planOk.eligible === true);
    }

    // --- task 195: `<if book="N">` reads the DOM-free edition registry ---------------------
    // The condition used to call data.availableBooks(), which put a module-level DOMParser on
    // the engine's import graph. It now asks edition.js — the same list, published by
    // loadMeta() — so the answer must be unchanged for every bundled and unbundled book.
    {
      const gEd = GameState.create({ name: 'ED195', gender: 'm', profession: 'Warrior', book: 1, adv });
      const bundled = data.availableBooks();
      // Checked against meta.json's own book list rather than a literal 6 (task 209): a
      // count assertion made publishing a book fail here first, which invited "bump the 6"
      // instead of noticing the offline inventory and corpus scan had not followed.
      const published = (data.getMeta().books || []).map((b) => b.number);
      ok('task195: the registry is populated from meta.json',
         bundled.length > 0 && JSON.stringify(bundled) === JSON.stringify(published), JSON.stringify(bundled));
      ok('task195: edition.availableBooks agrees with data.availableBooks',
         JSON.stringify(edition.availableBooks()) === JSON.stringify(bundled));
      for (const n of bundled) {
        ok(`task195: <if book="${n}"> is true for a bundled book`, eng.evaluateCondition(parse(`<if book="${n}"/>`), gEd) === true);
      }
      // The unpublished side is derived too: 0 and 999 are never books, and the lowest book
      // in meta's series registry that this build does not bundle stands in for "a real book
      // of the series, not in this edition".
      const registered = Object.keys(data.getMeta().titles || {}).map(Number);
      const unregistered = registered.filter((n) => !bundled.includes(n));
      for (const n of [0, 999].concat(unregistered.length ? [unregistered[0]] : [])) {
        ok(`task195: <if book="${n}"> is false for an unbundled book`, eng.evaluateCondition(parse(`<if book="${n}"/>`), gEd) === false);
      }
      ok('task195: not="t" negates the book test',
         eng.evaluateCondition(parse('<if not="t" book="999"/>'), gEd) === true
         && eng.evaluateCondition(parse('<if not="t" book="1"/>'), gEd) === false);
      // A non-numeric book= is not a bundled book (it used to become NaN, which .includes()
      // also rejected — keep that answer explicit now the lookup is the registry's).
      ok('task195: a non-numeric book= is not available', eng.evaluateCondition(parse('<if book="one"/>'), gEd) === false);
      ok('task195: bookAvailable coerces a numeric string like the corpus writes it',
         edition.bookAvailable('2') === true && edition.bookAvailable(2) === true && edition.bookAvailable('2x') === false);
    }

}
