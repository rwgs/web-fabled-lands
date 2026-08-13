// FL test suite — travel gates, transfers, returns, curse lift, blessing veto, reroll storm
// Extracted verbatim from web/_test.html run() lines 4350-4891 (task 120).
import * as data from '../js/data.js';
import { GameState, makeItem, sanitizeData, readSlotData, deleteSlot } from '../js/state.js';
import * as eng from '../js/engine.js';
import { Story } from '../js/render.js';
import * as rules from '../js/render-rules.js';
import * as gates from '../js/render-gates.js';
import * as visit from '../js/visit-state.js';
import { renderSheet } from '../js/ui.js';

export async function run(ctx) {
  const { ok, parse } = ctx;
  await data.loadMeta();
  const adv = data.parseAdventurers(data.bookInfo(1).adventurers);
  // A controllable raw navigate mirroring app.navigate (tasks 167–169/173, shared per task
  // 174): it returns a promise the test settles as success (enter the destination) or
  // rejection (the book fetch failed). Each scenario passes its own GameState/Story/destination
  // and drives box.pending.ok()/reject() explicitly, so the navigation seam's contract lives in
  // one place instead of four copies.
  const controllable = (g, storyRef, dstEl) => {
    const box = { pending: null };
    box.enter = (b, s) => new Promise((resolve, reject) => {
      box.pending = {
        ok: () => { g.goTo(b, s); g.snapshot(); storyRef().begin(dstEl, b, s); resolve(true); },
        reject: () => reject(new Error('book fetch failed')),
      };
    });
    return box;
  };
    // --- task 104: travel/encounter roll gates the onward choices ---
    // A mandatory <random> → <outcomes> → <choices> section must be rolled before the
    // onward destinations unlock, and a "get lost" outcome carrying its own <goto>
    // suppresses those choices so only the redirect is offered.
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle104 = () => new Promise((r) => setTimeout(r, 30));
      const rnd104 = Math.random;

      // §1.278: die 1 → "you get lost" → §82 (redirect); die 4 → nothing → destinations.
      const g278 = GameState.create({ name:'T278', gender:'m', profession:'Warrior', book:1, adv });
      const c278 = document.createElement('div');
      const st278 = new Story(c278, g278, { navigate(){}, onDeath(){}, notify(){} });
      const choices278 = () => Array.from(c278.querySelectorAll('.choice'));
      const goto82 = () => Array.from(c278.querySelectorAll('.goto')).find((b) => b.textContent.trim() === '82');
      st278.begin(await data.getSection(1,'278'), 1, '278');
      ok('§278 draws four onward choices', choices278().length === 4, `n=${choices278().length}`);
      ok('§278 choices are all gated before the travel roll',
         choices278().length === 4 && choices278().every((b) => b.disabled && b.dataset.rollnav === '1'),
         choices278().map((b) => b.disabled).join(','));
      ok('§278 shows the travel roll button', !!c278.querySelector('.btn-roll'));

      Math.random = () => 0; // die = 1 → outcome 1,2 → get lost → goto 82
      c278.querySelector('.btn-roll').click(); await settle104();
      ok('§278 rolling 1 reveals the "get lost" redirect to 82', !!goto82() && goto82().disabled === false);
      ok('§278 a redirect keeps the destinations suppressed',
         choices278().length === 4 && choices278().every((b) => b.disabled),
         choices278().map((b) => b.disabled).join(','));

      st278.begin(await data.getSection(1,'278'), 1, '278'); // fresh visit
      Math.random = () => 0.5; // die = 4 → outcome 3,4 → nothing happens (no redirect)
      c278.querySelector('.btn-roll').click(); await settle104();
      ok('§278 rolling 4 unlocks all four destinations',
         choices278().length === 4 && choices278().every((b) => !b.disabled),
         choices278().map((b) => b.disabled).join(','));
      ok('§278 a non-redirect outcome offers no forced goto', !goto82());

      // §1.668 (mining, a plain untyped <random>): the gate is structural, not keyed on
      // type="travel", so a non-travel mandatory roll gates its onward choices too.
      const g668 = GameState.create({ name:'T668', gender:'m', profession:'Warrior', book:1, adv });
      g668.data.stamina = 20; g668.data.staminaMax = 20;
      const c668 = document.createElement('div');
      const st668 = new Story(c668, g668, { navigate(){}, onDeath(){}, notify(){} });
      const choices668 = () => Array.from(c668.querySelectorAll('.choice'));
      st668.begin(await data.getSection(1,'668'), 1, '668');
      ok('§668 (non-travel roll) gates its onward choices before the roll',
         choices668().length === 4 && choices668().every((b) => b.disabled && b.dataset.rollnav === '1'),
         `n=${choices668().length}`);
      Math.random = () => 0.9; // 6+6 = 12 → silver nugget (no redirect) → unlock
      c668.querySelector('.btn-roll').click(); await settle104();
      ok('§668 unlocks the choices once the roll resolves', choices668().every((b) => !b.disabled));

      // §5.674 (physician): the cure roll is OPTIONAL (pay-gated flag="c"), so declining
      // and leaving must stay possible — its choices must NOT be roll-gated.
      const g674t = GameState.create({ name:'T674', gender:'m', profession:'Warrior', book:5, adv });
      g674t.data.shards = 100;
      const c674t = document.createElement('div');
      const st674t = new Story(c674t, g674t, { navigate(){}, onDeath(){}, notify(){} });
      st674t.begin(await data.getSection(5,'674'), 5, '674');
      const choices674 = Array.from(c674t.querySelectorAll('.choice'));
      ok('§674 gate is not built for an optional pay-gated roll', st674t.rollGate === null);
      ok('§674 onward choices stay live beside the optional cure roll',
         choices674.length === 3 && choices674.every((b) => !b.disabled && b.dataset.rollnav !== '1'),
         `n=${choices674.length}`);

      Math.random = rnd104;
      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 136.5: <buy force="t"> gates the onward navigation until it runs ---
    {
      // §4.658's free barque is the section's only ship; JaFL blocks the onward <goto 533>
      // until it is taken. (A group-wrapped optional buy — §4.622 — must NOT gate.)
      const g658 = GameState.create({ name:'B658', gender:'m', profession:'Warrior', book:4, adv });
      g658.addShip({ type:'brigantine', name:'Old', crew:'good', cargo:[] });
      const c658 = document.createElement('div');
      const st658 = new Story(c658, g658, { navigate(){}, onDeath(){}, notify(){} });
      st658.begin(await data.getSection(4, '658'), 4, '658');
      const goto533 = () => Array.from(c658.querySelectorAll('.goto')).find((b) => b.textContent.trim() === '533');
      const barqueBtn = () => Array.from(c658.querySelectorAll('.btn-mini')).find((b) => /Note it/i.test(b.textContent));
      ok('§4.658 builds a forced-buy gate', !!st658.buyGate);
      ok('§4.658 onward goto 533 is gated before the barque is taken',
         !!goto533() && goto533().disabled && goto533().dataset.buynav === '1',
         `disabled=${goto533() && goto533().disabled} buynav=${goto533() && goto533().dataset.buynav}`);
      ok('§4.658 offers an enabled barque buy', !!barqueBtn() && !barqueBtn().disabled);
      barqueBtn() && barqueBtn().click();
      ok('§4.658 taking the barque unlocks the onward goto 533',
         !!goto533() && !goto533().disabled, `disabled=${goto533() && goto533().disabled}`);

      // §4.622's forced cargo buys are group-wrapped optional pickups — no gate is built.
      const g622 = GameState.create({ name:'B622', gender:'m', profession:'Warrior', book:4, adv });
      const c622 = document.createElement('div');
      const st622 = new Story(c622, g622, { navigate(){}, onDeath(){}, notify(){} });
      st622.begin(await data.getSection(4, '622'), 4, '622');
      ok('§4.622 builds no forced-buy gate (group-wrapped pickups are optional)', st622.buyGate === null);
    }

    // --- task 151: the dead-end fallback ignores DISABLED controls ---
    {
      // A forced economic payment the player can't afford renders a disabled Pay button and
      // blocks the rest of the section; a decline goto sitting AFTER it never renders. The
      // only rendered control is that disabled Pay — which must NOT count as a way forward,
      // so the "accept your fate" fallback fires instead of stranding the player on Undo.
      const g151 = GameState.create({ name:'D151', gender:'m', profession:'Warrior', book:1, adv });
      g151.data.shards = 0;
      const c151 = document.createElement('div');
      const st151 = new Story(c151, g151, { navigate(){}, onDeath(){}, notify(){} });
      const sec151 = parse('<section name="t151"><p>You must pay a heavy toll. <lose shards="9999">Pay the toll</lose>.</p><p>Or turn back: <goto section="142" force="f"/>.</p></section>');
      st151.begin(sec151, 1, 't151');
      const payBtn = c151.querySelector('.pay-action');
      const goto142 = Array.from(c151.querySelectorAll('.goto')).find((b) => b.textContent.trim() === '142');
      ok('§t151 renders an unaffordable, disabled forced payment', !!payBtn && payBtn.disabled);
      ok('§t151 the post-payment decline goto is blocked (not rendered)', !goto142);
      ok('§t151 the dead-end fallback fires when only a disabled control remains', !!c151.querySelector('.end-fate'));
    }

    // --- task 107: <transfer> is a player action (chooser/filter/price/force) ---
    { // block-scoped
      // §4.456: the +1 offering is a price-gated transfer — it must NOT auto-run on
      // entry; offering a +1 item moves THAT item to the cache, sets flag 1 and
      // reveals →641; an ineligible (+0) item is never touched.
      const g456 = GameState.create({ name:'V456', gender:'m', profession:'Warrior', book:4, adv });
      g456.data.items = [];
      g456.addItem(makeItem('item', 'apple'));                     // +0 → ineligible
      g456.addItem(makeItem('tool', 'lucky ring', 1, 'charisma')); // +1 → the eligible offering
      const before456 = g456.itemCount();
      const c456 = document.createElement('div');
      const st456 = new Story(c456, g456, { navigate(){}, onDeath(){}, notify(){} });
      st456.begin(await data.getSection(4, '456'), 4, '456');
      ok('task107: §456 offers nothing on entry (no auto-transfer, flag clear)',
         g456.itemCount() === before456 && g456.cacheItems('4.641').length === 0 && !g456.getFlag('1'),
         `n=${g456.itemCount()} cache=${g456.cacheItems('4.641').length} flag=${g456.getFlag('1')}`);
      ok('task107: §456 →641 hidden before the offering',
         !Array.from(c456.querySelectorAll('.goto')).some((b)=>/641/.test(b.textContent)));
      const offer = Array.from(c456.querySelectorAll('button')).find((b)=>/offer a \+1 item/i.test(b.textContent));
      ok('task107: §456 the +1 offering is armed (enabled)', !!offer && !offer.disabled);
      offer.click();
      ok('task107: §456 offering a +1 item moves it to the cache and sets flag 1',
         g456.getFlag('1') === true && g456.cacheItems('4.641').some((i)=>i.name==='lucky ring') && g456.findItems('lucky ring').length === 0,
         `flag=${g456.getFlag('1')} cache=${JSON.stringify(g456.cacheItems('4.641').map((i)=>i.name))}`);
      ok('task107: §456 the ineligible +0 item is untouched', g456.findItems('apple').length === 1);
      ok('task107: §456 →641 revealed after the offering',
         Array.from(c456.querySelectorAll('.goto')).some((b)=>/641/.test(b.textContent)));

      // §4.456 with no eligible item: the offer stays disabled and nothing moves.
      const g456b = GameState.create({ name:'V456b', gender:'m', profession:'Warrior', book:4, adv });
      g456b.data.items = [makeItem('item', 'apple')]; // no bonus items at all
      const c456b = document.createElement('div');
      new Story(c456b, g456b, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(4, '456'), 4, '456');
      const offerB = Array.from(c456b.querySelectorAll('button')).find((b)=>/offer a \+1 item/i.test(b.textContent));
      ok('task107: §456 offer is disabled with no eligible +1 item',
         !!offerB && offerB.disabled && !g456b.getFlag('1') && g456b.findItems('apple').length === 1);

      // §6.310: "decide what item to present" — item="?" is a choose-one action; the
      // SELECTED possession moves, not array position zero.
      const g310 = GameState.create({ name:'V310', gender:'m', profession:'Warrior', book:6, adv });
      g310.data.items = [makeItem('item','first thing'), makeItem('item','second thing'), makeItem('item','third thing')];
      const c310 = document.createElement('div');
      new Story(c310, g310, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(6, '310'), 6, '310');
      ok('task107: §310 presents nothing on entry', g310.itemCount() === 3 && g310.cacheItems('6.310').length === 0);
      const picks310 = Array.from(c310.querySelectorAll('.ability-pick'));
      const pick2 = picks310.find((btn)=>/second thing/i.test(btn.textContent));
      ok('task107: §310 shows an item chooser (a pick per possession)', picks310.length === 3 && !!pick2);
      pick2.click();
      ok('task107: §310 the CHOSEN item moves (not the first)',
         g310.cacheItems('6.310').length === 1 && g310.cacheItems('6.310')[0].name === 'second thing'
         && g310.findItems('first thing').length === 1 && g310.findItems('second thing').length === 0,
         `cache=${JSON.stringify(g310.cacheItems('6.310').map((i)=>i.name))}`);

      // §6.635: giving a weapon is force="f" (optional) — →677 stays live without it.
      const g635 = GameState.create({ name:'V635', gender:'m', profession:'Warrior', book:6, adv });
      g635.data.items = [makeItem('weapon','broadsword',2)];
      const c635 = document.createElement('div');
      const st635 = new Story(c635, g635, { navigate(){}, onDeath(){}, notify(){} });
      st635.begin(await data.getSection(6, '635'), 6, '635');
      ok('task107: §635 builds no forced-transfer gate (both force="f")', st635.transferGate === null);
      const cont677 = Array.from(c635.querySelectorAll('.goto')).find((b)=>/677/.test(b.textContent));
      ok('task107: §635 →677 stays live beside the optional gift', !!cont677 && !cont677.disabled);
      ok('task107: §635 no weapon given on entry',
         g635.findItems('broadsword').length === 1 && g635.cacheItems('6.635').length === 0);

      // §2.639: "lose any OTHER armour" — armour="*" xarmour="?" xgroup="2.639" spares
      // the just-granted group-2.639 suit; forced, so it gates →342.
      const g639 = GameState.create({ name:'V639', gender:'m', profession:'Warrior', book:2, adv });
      g639.data.items = [
        makeItem('armour','splint armour',4,null,[],[],'2.639'), // the gift (spared)
        makeItem('armour','chainmail',2),                        // other armour (lost)
      ];
      const movers639 = eng.transferPlan(parse('<transfer to="null" armour="*" xarmour="?" xgroup="2.639"/>'), g639).movers;
      ok('task107: §639 selector spares the group-2.639 suit, takes the rest',
         movers639.length === 1 && movers639[0].name === 'chainmail', JSON.stringify(movers639.map((m)=>m.name)));
      const c639 = document.createElement('div');
      const st639 = new Story(c639, g639, { navigate(){}, onDeath(){}, notify(){} });
      st639.begin(await data.getSection(2, '639'), 2, '639');
      const goto342 = Array.from(c639.querySelectorAll('.goto')).find((b)=>/342/.test(b.textContent));
      ok('task107: §639 nothing moved on entry; forced transfer gates →342',
         g639.findItems('chainmail').length === 1 && !!goto342 && goto342.disabled);
      const doIt639 = Array.from(c639.querySelectorAll('button')).find((b)=>/lose any other/i.test(b.textContent));
      ok('task107: §639 the forced transfer is armed', !!doIt639 && !doIt639.disabled);
      doIt639.click();
      const goto342b = Array.from(c639.querySelectorAll('.goto')).find((b)=>/342/.test(b.textContent));
      ok('task107: §639 running it loses other armour, keeps the gift, unlocks →342',
         g639.findItems('chainmail').length === 0 && g639.findItems('splint armour').length === 1
         && g639.cacheItems('null').some((i)=>i.name==='chainmail') && !!goto342b && !goto342b.disabled,
         `items=${JSON.stringify(g639.data.items.map((i)=>i.name))} gated=${goto342b&&goto342b.disabled}`);

      // Engine: keep-tagged possessions survive a plain item="*" transfer from the player.
      const gkeep = GameState.create({ name:'Vkeep', gender:'m', profession:'Warrior', book:1, adv });
      gkeep.data.items = [makeItem('item','white sword',0,null,['keep']), makeItem('item','junk')];
      eng.applyEffect(parse('<transfer item="*" to="void"/>'), gkeep, {});
      ok('task107: item="*" transfer from the player spares keep-tagged items',
         gkeep.findItems('white sword').length === 1 && gkeep.findItems('junk').length === 0
         && gkeep.cacheItems('void').some((i)=>i.name==='junk'),
         `items=${JSON.stringify(gkeep.data.items.map((i)=>i.name))}`);
    }

    // --- task 108: <outcome blessing="…"> veto — Safety from Storms carries the
    // protected traveller past the storm/capsize redirect ---
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle108 = () => new Promise((r) => setTimeout(r, 30));
      const rnd108 = Math.random;
      const cont527 = (c) => Array.from(c.querySelectorAll('.goto')).find((b) => /→\s*527/.test(b.textContent));
      const goto619 = (c) => Array.from(c.querySelectorAll('.goto')).find((b) => b.textContent.trim() === '619');

      // §200, ordinary storm blessing, roll 11-12: the storm outcome (→527) is vetoed,
      // the blessing is NOT consumed on entry or by the veto, and the safe →619 unlocks.
      const g200 = GameState.create({ name:'T200', gender:'m', profession:'Warrior', book:5, adv });
      g200.addBlessing('storm');
      let nav200 = null;
      const c200 = document.createElement('div');
      const st200 = new Story(c200, g200, { navigate(b,s){ nav200 = { b, s }; }, onDeath(){}, notify(){} });
      st200.begin(await data.getSection(5,'200'), 5, '200');
      ok('task108: §200 keeps the storm blessing on entry (not auto-consumed)', g200.hasBlessing('storm'));
      Math.random = () => 0.9; // 6+6 = 12 → range 11-12
      c200.querySelector('.btn-roll').click(); await settle108();
      ok('task108: §200 a held blessing vetoes the →527 storm redirect', !cont527(c200));
      ok('task108: §200 the safe →619 unlocks (roll gate sees no forced redirect)',
         !!goto619(c200) && !goto619(c200).disabled);
      ok('task108: §200 the blessing survives until the safe path is taken', g200.hasBlessing('storm'));
      goto619(c200).click();
      ok('task108: §200 taking the safe goto spends the blessing and turns to 619',
         nav200 && String(nav200.s) === '619' && !g200.hasBlessing('storm'),
         `nav=${JSON.stringify(nav200)} storm=${g200.hasBlessing('storm')}`);

      // §200, permanent storm blessing: vetoed the same way, but never used up (task 90).
      const g200p = GameState.create({ name:'T200p', gender:'m', profession:'Warrior', book:5, adv });
      g200p.addBlessing('storm', true);
      let nav200p = null;
      const c200p = document.createElement('div');
      const st200p = new Story(c200p, g200p, { navigate(b,s){ nav200p = { b, s }; }, onDeath(){}, notify(){} });
      st200p.begin(await data.getSection(5,'200'), 5, '200');
      Math.random = () => 0.9;
      c200p.querySelector('.btn-roll').click(); await settle108();
      ok('task108: §200 a permanent blessing also vetoes the storm', !cont527(c200p) && !!goto619(c200p) && !goto619(c200p).disabled);
      goto619(c200p).click();
      ok('task108: §200 the permanent blessing is not used up by the safe passage',
         nav200p && String(nav200p.s) === '619' && g200p.hasBlessing('storm') && g200p.isBlessingPermanent('storm'));

      // §200 unblessed: the storm redirect is the only result, and →619 stays suppressed.
      const g200u = GameState.create({ name:'T200u', gender:'m', profession:'Warrior', book:5, adv });
      const c200u = document.createElement('div');
      const st200u = new Story(c200u, g200u, { navigate(){}, onDeath(){}, notify(){} });
      st200u.begin(await data.getSection(5,'200'), 5, '200');
      Math.random = () => 0.9;
      c200u.querySelector('.btn-roll').click(); await settle108();
      ok('task108: §200 unblessed rolls 11-12 into the storm (→527 revealed)', !!cont527(c200u));
      ok('task108: §200 unblessed keeps the safe sibling →619 suppressed',
         !goto619(c200u) || goto619(c200u).disabled);

      // §200 blessed but rolls 4-10: plain sailing, blessing untouched, no storm.
      const g200s = GameState.create({ name:'T200s', gender:'m', profession:'Warrior', book:5, adv });
      g200s.addBlessing('storm');
      const c200s = document.createElement('div');
      const st200s = new Story(c200s, g200s, { navigate(){}, onDeath(){}, notify(){} });
      st200s.begin(await data.getSection(5,'200'), 5, '200');
      Math.random = () => 0.5; // 4+4 = 8 → range 4-10 (plain sailing → 619)
      c200s.querySelector('.btn-roll').click(); await settle108();
      ok('task108: §200 a safe (4-10) roll keeps the blessing and shows no storm',
         g200s.hasBlessing('storm') && !cont527(c200s)
         && Array.from(c200s.querySelectorAll('.goto')).some((b) => /→\s*619/.test(b.textContent)));

      // §232 reroll form, storm blessing, roll 11-12: the capsize (→510) is vetoed and a
      // reroll is offered (its keepblessing var owns the eventual spend).
      const g232 = GameState.create({ name:'T232', gender:'m', profession:'Warrior', book:5, adv });
      g232.data.shards = 100; g232.addBlessing('storm');
      const c232 = document.createElement('div');
      const st232 = new Story(c232, g232, { navigate(){}, onDeath(){}, notify(){} });
      st232.begin(await data.getSection(5,'232'), 5, '232');
      ok('task232: §232 keeps the storm blessing on entry (keepblessing var)', g232.hasBlessing('storm'));
      Math.random = () => 0.9; // 12 → range 11-12
      c232.querySelector('.btn-roll').click(); await settle108();
      ok('task108: §232 a held blessing vetoes the →510 capsize',
         !Array.from(c232.querySelectorAll('.goto')).some((b) => /→\s*510/.test(b.textContent)));
      ok('task108: §232 offers the reroll (safe path) instead',
         Array.from(c232.querySelectorAll('.btn-secondary')).some((b) => /roll again|reroll/i.test(b.textContent)));

      Math.random = rnd108;
      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 241: the IN-BRANCH "cross off the blessing and turn to N" escape ---
    // 42 sections across books 1/2/3/4/6 put a plain <lose blessing="X"> beside its <goto>
    // inside an <if blessing="X">, and not one carries an <outcome blessing="X"> to arm task
    // 108's guard above. So the loss applied on ENTRY — charging a player who had not yet
    // chosen between the escape and the printed hazard — and the branch, reading the store
    // that spend had just emptied, went inactive on the next render and disabled the very
    // escape the blessing had paid for. Book 5 is the only book writing the guarded form,
    // which is why the guard has been correct and unexercised since task 108.
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle241 = () => new Promise((r) => setTimeout(r, 30));
      const rnd241 = Math.random;
      const exit241 = (c, n) => Array.from(c.querySelectorAll('.goto')).find((b) => b.textContent.trim() === String(n));
      // Count real consumptions at the single sink both paths reach (the engine's
      // <lose blessing> and renderGoto's useBlessing), so "spent exactly once" is measured
      // rather than inferred from a blessing that is merely absent at the end.
      const countSpends = (g) => {
        const box = { n: 0 };
        const inner = g.removeBlessing.bind(g);
        g.removeBlessing = (b) => { const r = inner(b); if (r) box.n++; return r; };
        return box;
      };
      const enter241 = (book, sec, bless) => {
        const g = GameState.create({ name:`T${book}.${sec}`, gender:'m', profession:'Warrior', book, adv });
        g.addBlessing(bless);
        const spends = countSpends(g);
        const c = document.createElement('div');
        const nav = { at: null };
        const st = new Story(c, g, { navigate(b,s){ nav.at = { b, s }; }, onDeath(){}, notify(){} });
        return { g, c, st, nav, spends };
      };

      // §1.324 (storms, escape →559) — the page the filing measured, end to end.
      const h324 = enter241(1, '324', 'storms');
      h324.st.begin(await data.getSection(1,'324'), 1, '324');
      ok('task241: §1.324 keeps the blessing on entry (nobody has chosen yet)',
         h324.g.hasBlessing('storms') && h324.spends.n === 0, `spends=${h324.spends.n}`);
      ok('task241: §1.324 the escape →559 is live on entry',
         !!exit241(h324.c, 559) && !exit241(h324.c, 559).disabled);
      h324.st.rerender();
      ok('task241: §1.324 a re-render leaves the escape live and the blessing held',
         h324.g.hasBlessing('storms') && !!exit241(h324.c, 559) && !exit241(h324.c, 559).disabled,
         `held=${h324.g.hasBlessing('storms')} disabled=${!!(exit241(h324.c, 559) || {}).disabled}`);
      exit241(h324.c, 559).click();
      ok('task241: §1.324 taking the escape spends the blessing exactly once and turns to 559',
         h324.nav.at && String(h324.nav.at.s) === '559' && !h324.g.hasBlessing('storms') && h324.spends.n === 1,
         `nav=${JSON.stringify(h324.nav.at)} spends=${h324.spends.n}`);

      // §1.324 again, taking the hazard instead: the roll is the alternative the escape was
      // offered against, so it must cost nothing. (No ship → the <else> galleon roll is the
      // live one; the barque/brigantine branches render their widgets disabled.)
      const r324 = enter241(1, '324', 'storms');
      r324.st.begin(await data.getSection(1,'324'), 1, '324');
      Math.random = () => 0.5; // 4+4+4 = 12 → range 6-20 (weathered the storm → 559)
      Array.from(r324.c.querySelectorAll('.btn-roll')).find((b) => !b.disabled).click();
      await settle241();
      ok('task241: §1.324 rolling the hazard instead keeps the blessing unspent',
         r324.g.hasBlessing('storms') && r324.spends.n === 0, `spends=${r324.spends.n}`);
      ok('task241: §1.324 the hazard roll still resolves its outcome row (→559)',
         Array.from(r324.c.querySelectorAll('.goto')).some((b) => /→\s*559/.test(b.textContent)));
      ok('task241: §1.324 and the escape stays live beside the resolved roll',
         !!exit241(r324.c, 559) && !exit241(r324.c, 559).disabled);
      Math.random = rnd241;

      // The other three pages the filing measured, one book each: entry holds the blessing
      // and the escape survives a re-render.
      for (const [book, sec, bless, exit] of [[3,'139','storm',154], [4,'11','storm',236], [6,'9','storm',247]]) {
        const h = enter241(book, sec, bless);
        h.st.begin(await data.getSection(book, sec), book, sec);
        h.st.rerender();
        ok(`task241: §${book}.${sec} holds the blessing and keeps →${exit} live across a re-render`,
           h.g.hasBlessing(bless) && h.spends.n === 0 && !!exit241(h.c, exit) && !exit241(h.c, exit).disabled,
           `held=${h.g.hasBlessing(bless)} spends=${h.spends.n} btn=${!!exit241(h.c, exit)}`);
      }

      // §6.9 is the scoping case: its "Otherwise <goto 222>" FOLLOWS the loss in document
      // order but is the unblessed alternative, so only the goto inside the blessing's own
      // branch may spend. Unit-checked on the real section, then through the rendered page.
      {
        const sec9 = await data.getSection(6, '9');
        const held9 = GameState.create({ name:'B241', gender:'m', profession:'Warrior', book:6, adv });
        held9.addBlessing('storm');
        const lose9 = sec9.querySelector('lose[blessing]');
        const gotos9 = Array.from(sec9.querySelectorAll('goto'));
        const g247 = gotos9.find((g) => g.getAttribute('section') === '247');
        const g222 = gotos9.find((g) => g.getAttribute('section') === '222');
        const ob9 = rules.computeOutcomeBlessings(sec9);
        ok('task241: §6.9 carries no <outcome blessing=> — task 108’s guard could never see it', ob9.size === 0);
        ok('task241: branchBlessingEscapeGoto points the in-branch loss at its own →247',
           rules.branchBlessingEscapeGoto(lose9) === g247);
        ok('task241: isGuardedBlessingLoss now recognises the branch form', rules.isGuardedBlessingLoss(lose9, ob9) === true);
        ok('task241: the in-branch escape →247 spends the blessing', rules.blessingSpendForGoto(g247, sec9, held9, ob9) === 'storm');
        ok('task241: the "Otherwise →222" alternative spends nothing', rules.blessingSpendForGoto(g222, sec9, held9, ob9) === null);

        const h9 = enter241(6, '9', 'storm');
        h9.st.begin(sec9, 6, '9');
        exit241(h9.c, 222).click();
        ok('task241: §6.9 walking out by →222 leaves the blessing untouched',
           h9.nav.at && String(h9.nav.at.s) === '222' && h9.g.hasBlessing('storm') && h9.spends.n === 0,
           `nav=${JSON.stringify(h9.nav.at)} spends=${h9.spends.n}`);
      }

      // §2.377 keeps working: the shape matches, but its <else> is death, so the escape →17
      // is the section's only non-fatal exit and must stay live and spend exactly once.
      {
        const h377 = enter241(2, '377', 'poison');
        h377.st.begin(await data.getSection(2, '377'), 2, '377');
        ok('task241: §2.377 the only non-fatal exit →17 is live on entry',
           h377.g.hasBlessing('poison') && !!exit241(h377.c, 17) && !exit241(h377.c, 17).disabled);
        ok('task241: §2.377 the fatal <else> →560 stays disabled for a blessed player',
           !exit241(h377.c, 560) || exit241(h377.c, 560).disabled);
        exit241(h377.c, 17).click();
        ok('task241: §2.377 taking →17 spends the blessing exactly once',
           h377.nav.at && String(h377.nav.at.s) === '17' && !h377.g.hasBlessing('poison') && h377.spends.n === 1,
           `nav=${JSON.stringify(h377.nav.at)} spends=${h377.spends.n}`);
      }

      // §6.160 unchanged: its pair is written as force="f" losses ("you decide which to cross
      // off"), so it stays the opt-in path — the widened predicate must not claim it, and its
      // →551 must not spend on top of the player's own choice.
      {
        const sec160 = await data.getSection(6, '160');
        const held160 = GameState.create({ name:'B160', gender:'m', profession:'Warrior', book:6, adv });
        held160.addBlessing('storm');
        const lose160 = sec160.querySelector('lose[blessing]');
        const goto551 = Array.from(sec160.querySelectorAll('goto')).find((g) => g.getAttribute('section') === '551');
        const ob160 = rules.computeOutcomeBlessings(sec160);
        ok('task241: §6.160 a force="f" pair is not a branch escape',
           rules.branchBlessingEscapeGoto(lose160) === null
           && rules.isGuardedBlessingLoss(lose160, ob160) === false);
        ok('task241: §6.160 its →551 spends nothing (the opt-in click owns the cost)',
           rules.blessingSpendForGoto(goto551, sec160, held160, ob160) === null);

        const h160 = enter241(6, '160', 'storm');
        h160.st.begin(sec160, 6, '160');
        ok('task241: §6.160 still keeps the blessing on entry', h160.g.hasBlessing('storm') && h160.spends.n === 0);
      }

      // --- task 242: a mixed pair must still pair up (scratch fixtures) ------------
      // storms/storm and poison/disease are ONE blessing to the engine (tasks 76/123), so the
      // predicates above compare through canonBlessing rather than bare normalize. All 42
      // shipped branch escapes spell it the same way within a section, so only a fixture can
      // drive the mismatch — and it fails quietly and in the defect's own direction (no branch
      // found → charged on entry → escape disabled one render later).
      {
        const mix242 = parse('<section name="t242">Storm clouds swell.<if blessing="storms">If you have a blessing of Safety from Storms, <lose blessing="storm">cross it off</lose> and <goto section="247"/>.</if>Otherwise <goto section="222"/>.</section>');
        const held242 = GameState.create({ name:'B242', gender:'m', profession:'Warrior', book:6, adv });
        held242.addBlessing('storms'); // granted in the OTHER spelling than the <lose> uses
        const lose242 = mix242.querySelector('lose[blessing]');
        const gotos242 = Array.from(mix242.querySelectorAll('goto'));
        const ob242 = rules.computeOutcomeBlessings(mix242);
        ok('task242: an <if blessing="storms"> claims its <lose blessing="storm">',
           rules.branchBlessingEscapeGoto(lose242) === gotos242[0]);
        ok('task242: the mixed pair is a guarded loss, so it stays inert on entry',
           rules.isGuardedBlessingLoss(lose242, ob242) === true);
        ok('task242: the in-branch →247 spends the blessing held under the other spelling',
           rules.blessingSpendForGoto(gotos242[0], mix242, held242, ob242) === 'storm');
        ok('task242: the unblessed "Otherwise →222" still spends nothing',
           rules.blessingSpendForGoto(gotos242[1], mix242, held242, ob242) === null);

        // Folding must not make two DIFFERENT blessings one: only the alias table pairs up.
        const off242 = parse('<section name="t242n"><if blessing="luck"><lose blessing="storm">cross it off</lose> and <goto section="247"/>.</if></section>');
        ok('task242: an <if blessing="luck"> does NOT claim a <lose blessing="storm">',
           rules.branchBlessingEscapeGoto(off242.querySelector('lose[blessing]')) === null);

        // The same fold on the <outcome blessing=> half (task 108's form): the set members and
        // every lookup against it are canonical, so the pair matches across spellings too.
        const out242 = parse('<section name="t242o"><outcome blessing="storms"/><p>Storm! <lose blessing="storm">lose it</lose> and <goto section="9"/>.</p><p><lose blessing="storm" hidden="t"/></p></section>');
        const oob242 = rules.computeOutcomeBlessings(out242);
        ok('task242: computeOutcomeBlessings canonicalises its members', oob242.has('storm') && oob242.size === 1, JSON.stringify([...oob242]));
        const oLose242 = Array.from(out242.querySelectorAll('lose[blessing]')).find((l) => !l.hasAttribute('hidden'));
        ok('task242: an <outcome blessing="storms"> guards a <lose blessing="storm">',
           rules.isGuardedBlessingLoss(oLose242, oob242) === true);
        ok('task242: and its safe goto spends that blessing',
           rules.blessingSpendForGoto(out242.querySelector('goto'), out242, held242, oob242) === 'storm');
        ok('task242: the keepblessing reroll form folds the same way',
           rules.blessingSpendForReroll(out242, held242, oob242) === 'storm');

        // End to end through the renderer, the same three moments §1.324 is measured at above.
        const hm = enter241(6, 't242', 'storms');
        hm.st.begin(mix242, 6, 't242');
        ok('task242: the mixed pair keeps the blessing on entry',
           hm.g.hasBlessing('storm') && hm.spends.n === 0, `spends=${hm.spends.n}`);
        hm.st.rerender();
        ok('task242: a re-render leaves the mixed-pair escape →247 live',
           hm.g.hasBlessing('storm') && !!exit241(hm.c, 247) && !exit241(hm.c, 247).disabled,
           `held=${hm.g.hasBlessing('storm')} disabled=${!!(exit241(hm.c, 247) || {}).disabled}`);
        exit241(hm.c, 247).click();
        ok('task242: taking it spends the blessing exactly once and turns to 247',
           hm.nav.at && String(hm.nav.at.s) === '247' && !hm.g.hasBlessing('storms') && hm.spends.n === 1,
           `nav=${JSON.stringify(hm.nav.at)} spends=${hm.spends.n}`);
      }

      Math.random = rnd241;
      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 109: multi-ability <success ability="…"> routes by the CHOSEN ability ---
    // §2.37 offers "SANCTITY or MAGIC (your choice)" then a SANCTITY success →60 and a
    // MAGIC success →129; the branch must match the ability the player actually rolled.
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle109 = () => new Promise((r) => setTimeout(r, 30));
      const rnd109 = Math.random;
      const cont37 = (c, n) => Array.from(c.querySelectorAll('.goto')).some((b) => new RegExp('→\\s*' + n + '$').test(b.textContent.trim()));
      const run37 = async (pick, rng) => {
        const g = GameState.create({ name:'T37', gender:'m', profession:'Warrior', book:2, adv });
        g.data.abilities.sanctity = 6; g.data.abilities.magic = 6; // 2d6(max 12)+6 vs 15
        const c = document.createElement('div');
        const st = new Story(c, g, { navigate(){}, onDeath(){}, notify(){} });
        st.begin(await data.getSection(2, '37'), 2, '37');
        const pickBtn = Array.from(c.querySelectorAll('.ability-pick')).find((b) => new RegExp(pick, 'i').test(b.textContent));
        pickBtn.click(); await settle109();
        Math.random = rng;
        c.querySelector('.btn-roll').click(); await settle109();
        return c;
      };
      const cS = await run37('sanctity', () => 0.9); // 12 + 6 = 18 > 15 → success
      ok('task109: §37 a successful SANCTITY roll routes to →60',
         cont37(cS, 60) && !cont37(cS, 129) && !cont37(cS, 83));
      const cM = await run37('magic', () => 0.9);
      ok('task109: §37 a successful MAGIC roll routes to →129, not the SANCTITY branch',
         cont37(cM, 129) && !cont37(cM, 60) && !cont37(cM, 83));
      const cF = await run37('sanctity', () => 0); // 2 + 6 = 8 ≤ 15 → failure
      ok('task109: §37 a failed roll routes to →83 regardless of ability',
         cont37(cF, 83) && !cont37(cF, 60) && !cont37(cF, 129));
      Math.random = rnd109;
      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 110: <return> restores the previous visit, not a fresh re-entry ---
    // A → B → <return> must land back on A at the point it was left: its section-local
    // variable/roll and render memo intact, its one-shot entry effect NOT repeated, no
    // second forward visit pushed/counted, state changed during the detour kept, and
    // only a revisit="t" source action left immediately reusable.
    {
      const buildReturn = () => {
        const g = GameState.create({ name:'T110', gender:'m', profession:'Warrior', book:1, adv });
        g.data.shards = 0;
        const secA = parse('<section name="A" boxes="1"><gain shards="10"/><tick/><p>Hub.</p><choices><choice section="B">PlainGo</choice><choice section="B" revisit="t">RevisitGo</choice></choices></section>');
        const secB = parse('<section name="B"><gain shards="5"/><p>Detour.</p><return>Turn back</return></section>');
        const secs = { A: secA, B: secB };
        const cont = document.createElement('div');
        let story;
        // Mirror the app: every entry is goTo()+begin() so state.data.section is set
        // and history records the forward visit (a <return> needs that trail).
        const enter = (b, s) => { g.goTo(b, s); story.begin(secs[String(s)], b, s); };
        story = new Story(cont, g, { navigate: enter, onDeath(){}, notify(){} });
        enter(1, 'A'); // first entry: no frame captured (nothing to return to)
        return { g, cont, story };
      };
      const findChoice = (c, label) => Array.from(c.querySelectorAll('.choice')).find((b) => b.textContent.includes(label));

      // Scenario 1 — leave via the plain (non-revisit) choice.
      const s1 = buildReturn();
      ok('task110: A\'s entry gain applies once on entry (10 shards)', s1.g.data.shards === 10, 'shards=' + s1.g.data.shards);
      s1.g.setVar('rolled', 4); // stand in for an in-section roll result the player must resume with
      const ctxA = s1.story.ctx;
      findChoice(s1.cont, 'PlainGo').click(); // A → B
      ok('task110: taking a choice enters the detour (B) and its state change applies', s1.story.section === 'B' && s1.g.data.shards === 15, 'sec=' + s1.story.section + ' shards=' + s1.g.data.shards);
      s1.cont.querySelector('.goto').click(); // <return> → A
      ok('task110: return restores the previous section (A)', s1.story.section === 'A' && s1.story.book === 1, 'sec=' + s1.story.section + ' book=' + s1.story.book);
      ok('task110: return preserves A\'s section variable', s1.g.getVar('rolled') === 4, 'rolled=' + s1.g.getVar('rolled'));
      ok('task110: return preserves A\'s render memo (same ctx object → roll/used-action state)', s1.story.ctx === ctxA);
      ok('task110: return does NOT repeat A\'s entry gain, and keeps the detour\'s +5 (15 shards)', s1.g.data.shards === 15, 'shards=' + s1.g.data.shards);
      // Entering A counted turn 1, entering B counted turn 2; the return must add no
      // third turn and must pop the A→B→A bounce back to an empty trail.
      ok('task110: return counts no second forward visit and pops the history bounce', s1.g.data.turns === 2 && (s1.g.data.history || []).length === 0, 'turns=' + s1.g.data.turns + ' hist=' + (s1.g.data.history || []).length);
      const plainBtn = findChoice(s1.cont, 'PlainGo');
      const revBtn = findChoice(s1.cont, 'RevisitGo');
      ok('task110: the taken non-revisit source is spent (crossed off) on return', !!plainBtn && plainBtn.disabled === true, 'dis=' + (plainBtn && plainBtn.disabled));
      ok('task110: an untaken source stays usable on return', !!revBtn && revBtn.disabled === false, 'dis=' + (revBtn && revBtn.disabled));

      // Scenario 2 — leave via the revisit="t" choice: it stays reusable after returning.
      const s2 = buildReturn();
      findChoice(s2.cont, 'RevisitGo').click(); // A → B via the revisit action
      s2.cont.querySelector('.goto').click();    // <return> → A
      const revBtn2 = findChoice(s2.cont, 'RevisitGo');
      ok('task110: a taken revisit="t" source stays reusable on return', !!revBtn2 && revBtn2.disabled === false, 'dis=' + (revBtn2 && revBtn2.disabled));
    }

    // --- task 148: undo re-enters a section via a bare begin(); its stale return frame -----
    // The navigate wrapper is the only path that (re)sets _returnFrame; app.undo re-enters
    // the target section with a bare begin(), so the frame captured when the PRE-undo timeline
    // LEFT its previous section would survive. If the section undone-into carries a <return>,
    // goBack would consume that stale frame and re-hydrate a pre-undo visit. app.undo now nulls
    // story._returnFrame before begin(); this locks the Story-level contract that fix relies on.
    {
      const g148 = GameState.create({ name:'T148', gender:'m', profession:'Warrior', book:1, adv });
      const secA148 = parse('<section name="A"><p>A</p><choices><choice section="B">GoB</choice></choices></section>');
      const secB148 = parse('<section name="B"><p>B</p></section>');
      const secX148 = parse('<section name="X"><p>X</p><return>Back</return></section>');
      const secs148 = { A: secA148, B: secB148, X: secX148 };
      const cont148 = document.createElement('div');
      let navd148 = null;
      let story148;
      const enter148 = (b, s) => { navd148 = { b: Number(b), s: String(s) }; g148.goTo(b, s); story148.begin(secs148[String(s)], b, s); };
      story148 = new Story(cont148, g148, { navigate: enter148, onDeath(){}, notify(){} });
      enter148(1, 'A');
      Array.from(cont148.querySelectorAll('.choice'))[0].click(); // A → B; the wrapper holds frame(A)
      ok('task148: leaving A for B holds a one-level return frame', !!story148._returnFrame);
      // A bare begin() — exactly what app.undo does to re-enter — does NOT clear the frame itself.
      story148.begin(secX148, 1, 'X');
      ok('task148: a bare begin() (the undo re-entry) leaves the stale frame in place', !!story148._returnFrame);
      // app.undo's fix nulls the frame before begin(); a <return> in the undone-into section
      // must then fall back to history navigation instead of restoring the pre-undo frame.
      story148._returnFrame = null;
      story148.begin(secX148, 1, 'X');
      ok('task148: clearing the frame before begin() keeps it null', story148._returnFrame === null);
      navd148 = null;
      cont148.querySelector('.goto').click(); // <return>
      ok('task148: a null-frame <return> after undo falls back to history (no stale-frame restore)', navd148 && navd148.s === 'A', JSON.stringify(navd148));
    }

    // --- task 115: Adventure-Sheet item detours route through the one navigation entry point ---
    // Using an item whose Use effect opens a section detour (treasure map §1.30→§1.200 etc.)
    // must capture the SOURCE section's return frame exactly like a normal choice, so the
    // detour's <return> restores that source visit — not a stale frame left by an earlier hop
    // (the dominant mode), nor a fresh re-entry. Story.useItem is the single entry point the
    // app delegates to; here we drive it directly and prove the return seam.
    {
      const buildDetour = () => {
        const g = GameState.create({ name:'T115', gender:'m', profession:'Warrior', book:1, adv });
        g.data.shards = 0;
        const secP = parse('<section name="P"><p>Prior.</p><choices><choice section="A">GoA</choice></choices></section>');
        const secA = parse('<section name="A" boxes="1"><gain shards="10"/><tick/><p>Source.</p></section>');
        const secD = parse('<section name="D"><gain shards="5"/><p>Detour.</p><return>Turn back</return></section>');
        const secs = { P: secP, A: secA, D: secD };
        const cont = document.createElement('div');
        let story;
        const enter = (b, s) => { g.goTo(b, s); story.begin(secs[String(s)], b, s); };
        story = new Story(cont, g, { navigate: enter, onDeath(){}, notify(){} });
        return { g, cont, enter, story };
      };
      const findChoice = (c, label) => Array.from(c.querySelectorAll('.choice')).find((b) => b.textContent.includes(label));
      const detourItem = () => ({ item: makeItem('item', 'treasure map'), effect: { uses: -1, body: '<goto section="D"/>' }, body: parse('<effect><goto section="D"/></effect>') });

      // Scenario 1 — the dominant stale-frame mode. Arrive at the source (A) via a normal
      // choice from a prior section (P): _returnFrame now points at P. An item detour from A
      // must re-point it at A, so D's <return> lands on A, not the stale P.
      {
        const d = buildDetour();
        d.enter(1, 'P');
        findChoice(d.cont, 'GoA').click(); // P → A (normal choice)
        const st = d.story;
        ok('task115: arriving at the source (A) applies its entry gain once', st.section === 'A' && d.g.data.shards === 10, 'sec=' + st.section + ' shards=' + d.g.data.shards);
        const ctxA = st.ctx;
        const ticksAtA = d.g.tickCount();
        const histAtA = (d.g.data.history || []).length;
        d.g.setVar('mark', 7); // an in-section value the player must resume with
        const it = detourItem();
        st.useItem(it.item, it.effect, it.body); // A → D via the single entry point
        ok('task115: using the item opens the detour (D) and its state change applies', st.section === 'D' && d.g.data.shards === 15, 'sec=' + st.section + ' shards=' + d.g.data.shards);
        const turnsAtD = d.g.data.turns;
        const histAtD = (d.g.data.history || []).length;
        d.cont.querySelector('.goto').click(); // <return> → A (NOT P)
        ok('task115: return from an item detour restores the source (A), not the pre-source (P)', st.section === 'A' && st.book === 1, 'sec=' + st.section + ' book=' + st.book);
        ok('task115: return preserves the source section variable', d.g.getVar('mark') === 7, 'mark=' + d.g.getVar('mark'));
        ok('task115: return preserves the source render memo (same ctx object)', st.ctx === ctxA);
        ok('task115: return does NOT repeat the source entry gain, and keeps the detour +5 (15 shards)', d.g.data.shards === 15, 'shards=' + d.g.data.shards);
        ok('task115: return does NOT repeat the source entry tick', d.g.tickCount() === ticksAtA, 'ticks=' + d.g.tickCount() + ' vs ' + ticksAtA);
        ok('task115: return counts no extra forward visit and pops the A→D bounce', d.g.data.turns === turnsAtD && (d.g.data.history || []).length === histAtD - 1 && (d.g.data.history || []).length === histAtA, 'turns=' + d.g.data.turns + ' hist=' + (d.g.data.history || []).length);
      }

      // Scenario 2 — the null-frame mode (item used with no prior detour frame, as right
      // after a load). The detour must still capture A, so <return> restores A rather than
      // falling back to a fresh re-entry that would re-run A's entry gain.
      {
        const d = buildDetour();
        d.enter(1, 'A'); // A is the first section: no return frame held
        const st = d.story;
        const ctxA = st.ctx;
        d.g.setVar('mark', 3);
        const it = detourItem();
        st.useItem(it.item, it.effect, it.body); // A → D
        d.cont.querySelector('.goto').click();    // <return>
        ok('task115: with no prior frame, return still restores the source visit (A)', st.section === 'A' && st.ctx === ctxA && d.g.getVar('mark') === 3, 'sec=' + st.section + ' mark=' + d.g.getVar('mark'));
        ok('task115: null-frame return does not re-run A\'s entry gain', d.g.data.shards === 15, 'shards=' + d.g.data.shards);
      }
    }

    // --- task 116: a save round-trip resumes the current visit; effects/rolls do not restart ---
    // Autosave persists a serializable visit record; loading rebuilds the renderer's memo and
    // resumes the exact visit instead of re-entering the section (which would repeat entry
    // gains/ticks and drop resolved rolls / the return frame).
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle116 = () => new Promise((r) => setTimeout(r, 30));
      const rnd116 = Math.random;

      // Scenario 1 — entry gain + tick + a resolved roll survive a save/load round-trip.
      {
        const secRT = parse('<section name="RT" boxes="1"><gain shards="7"/><tick/><p>Test.</p><difficulty ability="COMBAT" level="1"/><success><p>WON-IT</p></success><failure><p>LOST-IT</p></failure></section>');
        const g = GameState.create({ name:'T116', gender:'m', profession:'Warrior', book:1, adv });
        g.data.shards = 0; g.data.abilities.combat = 8;
        const cont = document.createElement('div');
        const story = new Story(cont, g, { navigate(){}, onDeath(){}, notify(){} });
        g.goTo(1, 'RT');
        story.begin(secRT, 1, 'RT');
        Math.random = () => 0.99; // level 1 vs COMBAT 8 → success regardless of the dice
        cont.querySelector('.btn-roll').click(); await settle116();
        Math.random = rnd116;
        const rollsPlayed = story.ctx.rolls.size;
        ok('task116: the visit applied its entry gain + tick once and resolved the roll',
           g.data.shards === 7 && g.tickCount(1, 'RT') === 1 && rollsPlayed >= 1,
           'shards=' + g.data.shards + ' ticks=' + g.tickCount(1, 'RT') + ' rolls=' + rollsPlayed);

        // Serialise (what the save provider writes), round-trip through the storage sanitizer,
        // and reconstruct GameState + Story.
        const record = story.serializeVisit();
        ok('task116: serializeVisit records the section identity + applied memo',
           !!record && record.section === 'RT' && Array.isArray(record.ctx.applied) && record.ctx.applied.length >= 1);
        const g2 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...g.data, visit: record }))));
        ok('task116: the visit record survives sanitize when its section matches', !!g2.data.visit && g2.data.visit.section === 'RT');

        const cont2 = document.createElement('div');
        const story2 = new Story(cont2, g2, { navigate(){}, onDeath(){}, notify(){} });
        story2.resume(secRT, 1, 'RT', g2.data.visit, null);
        ok('task116: resume does NOT repeat the entry gain', g2.data.shards === 7, 'shards=' + g2.data.shards);
        ok('task116: resume does NOT repeat the entry tick', g2.tickCount(1, 'RT') === 1, 'ticks=' + g2.tickCount(1, 'RT'));
        ok('task116: resume keeps the roll resolved (no re-roll button, outcome still shown)',
           story2.ctx.rolls.size === rollsPlayed && !cont2.querySelector('.btn-roll') && /WON-IT|LOST-IT/.test(cont2.textContent),
           'rolls=' + story2.ctx.rolls.size + ' hasBtn=' + !!cont2.querySelector('.btn-roll'));
      }

      // Scenario 2 — a save made WHILE inside a return detour keeps the one-level return frame,
      // so <return> after the reload restores the source visit without re-entering it.
      {
        const secP = parse('<section name="P"><p>Prior.</p><choices><choice section="A">GoA</choice></choices></section>');
        const secA = parse('<section name="A" boxes="1"><gain shards="10"/><tick/><p>Source.</p></section>');
        const secD = parse('<section name="D"><gain shards="5"/><p>Detour.</p><return>Turn back</return></section>');
        const secs = { P: secP, A: secA, D: secD };
        const g = GameState.create({ name:'T116b', gender:'m', profession:'Warrior', book:1, adv });
        g.data.shards = 0;
        const cont = document.createElement('div');
        let story;
        const enter = (b, s) => { g.goTo(b, s); story.begin(secs[String(s)], b, s); };
        story = new Story(cont, g, { navigate: enter, onDeath(){}, notify(){} });
        enter(1, 'P');
        Array.from(cont.querySelectorAll('.choice')).find((b) => b.textContent.includes('GoA')).click(); // P → A
        g.setVar('mark', 9);
        const it = { item: makeItem('item', 'map'), effect: { uses: -1, body: '<goto section="D"/>' }, body: parse('<effect><goto section="D"/></effect>') };
        story.useItem(it.item, it.effect, it.body); // A → D, captures the return frame for A
        const turnsAtD = g.data.turns;
        ok('task116: mid-detour the return frame is held at D', story.section === 'D' && !!story._returnFrame, 'sec=' + story.section);

        const record = story.serializeVisit();
        ok('task116: the saved record carries the one-level return frame', !!record && !!record.frame && record.frame.section === 'A');
        const g2 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...g.data, visit: record }))));
        const cont2 = document.createElement('div');
        let story2;
        story2 = new Story(cont2, g2, { navigate: (b, s) => { g2.goTo(b, s); story2.begin(secs[String(s)], b, s); }, onDeath(){}, notify(){} });
        const frame2 = story2.deserializeFrame(g2.data.visit.frame, secA);
        story2.resume(secD, 1, 'D', g2.data.visit, frame2);
        ok('task116: resume lands back in the detour (D) with the frame restored', story2.section === 'D' && !!story2._returnFrame);

        cont2.querySelector('.goto').click(); // <return> after the reload
        ok('task116: post-reload <return> restores the source section (A)', story2.section === 'A', 'sec=' + story2.section);
        ok('task116: post-reload <return> restores the source section variable', g2.getVar('mark') === 9, 'mark=' + g2.getVar('mark'));
        ok('task116: post-reload <return> does not repeat A\'s entry gain (keeps 15 shards)', g2.data.shards === 15, 'shards=' + g2.data.shards);
        ok('task116: post-reload <return> counts no extra turn and pops the A→D bounce',
           g2.data.turns === turnsAtD && (g2.data.history || []).length === 1,
           'turns=' + g2.data.turns + ' hist=' + (g2.data.history || []).length);
      }

      // Scenario 3 — a legacy save with no visit record migrates conservatively: the persisted
      // totals are kept and the on-entry gain/tick are NOT replayed.
      {
        const secL = parse('<section name="L" boxes="1"><gain shards="4"/><tick/><p>Legacy.</p><choices><choice section="99">Onward</choice></choices></section>');
        const g = GameState.create({ name:'T116c', gender:'m', profession:'Warrior', book:1, adv });
        g.data.shards = 4;            // as if the entry gain had already been applied and saved
        g.data.boxes[g.boxKey(1, 'L')] = 1; // and the box already ticked
        g.data.section = 'L'; g.data.book = 1;
        g.data.visit = null;          // legacy blob: no visit record
        const cont = document.createElement('div');
        const story = new Story(cont, g, { navigate(){}, onDeath(){}, notify(){} });
        story.resumeStale(secL, 1, 'L');
        ok('task116: a record-less (legacy) resume does not re-apply the entry gain', g.data.shards === 4, 'shards=' + g.data.shards);
        ok('task116: a record-less (legacy) resume does not re-tick the entry box', g.tickCount(1, 'L') === 1, 'ticks=' + g.tickCount(1, 'L'));
        ok('task116: a record-less resume still renders the onward choice', !!Array.from(cont.querySelectorAll('.choice')).find((b) => b.textContent.includes('Onward')));
      }

      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 175: a pending / accepted reroll decision survives save + resume ---
    // The pending-or-kept state rides in the visit record (the roll memo's `accepted` flag),
    // so a reload neither auto-accepts a pending result nor replays an accepted branch's
    // effects. Roll fails with Luck held → pending; a reload restores the reroll + Keep
    // controls with no effect applied. Keeping commits the loss once; a reload after keeping
    // reveals the branch without re-applying it.
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle175 = () => new Promise((r) => setTimeout(r, 30));
      const rnd = Math.random;
      const secA = parse('<section name="T175S"><p><difficulty ability="scouting" level="15"/>.</p><success><p>SAFE</p></success><failure><lose stamina="7">rock</lose><p>HURT</p></failure></section>');

      const g = GameState.create({ name:'T175S', gender:'m', profession:'Warrior', book:1, adv });
      g.data.abilities.scouting = 6; g.data.stamina = 20; g.data.staminaMax = 20; g.addBlessing('luck');
      const cont = document.createElement('div');
      const story = new Story(cont, g, { navigate(){}, onDeath(){}, notify(){} });
      g.setVisitProvider(() => story.serializeVisit());
      g.goTo(1, 'T175S'); story.begin(secA, 1, 'T175S');
      Math.random = () => 0; cont.querySelector('.btn-roll').click(); await settle175(); Math.random = rnd; // fail → pending
      ok('task175: a pending decision applies no failure loss', g.data.stamina === 20, 'stamina=' + g.data.stamina);

      const rec = story.serializeVisit();
      const g2 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...g.data, visit: rec }))));
      const cont2 = document.createElement('div');
      const story2 = new Story(cont2, g2, { navigate(){}, onDeath(){}, notify(){} });
      story2.resume(secA, 1, 'T175S', g2.data.visit, null);
      ok('task175: resume restores the pending decision (reroll + Keep), not the branch',
         !!cont2.querySelector('.blessing-reroll') && !!cont2.querySelector('.keep-roll') && !/HURT/.test(cont2.textContent));
      ok('task175: resume of a pending decision replays no effect', g2.data.stamina === 20, 'stamina=' + g2.data.stamina);

      // Keep the failure → the branch commits once; a reload does not replay it.
      g2.setVisitProvider(() => story2.serializeVisit());
      cont2.querySelector('.keep-roll').click();
      ok('task175: keeping applies the loss once', g2.data.stamina === 13, 'stamina=' + g2.data.stamina);
      const rec2 = story2.serializeVisit();
      const g3 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...g2.data, visit: rec2 }))));
      const cont3 = document.createElement('div');
      const story3 = new Story(cont3, g3, { navigate(){}, onDeath(){}, notify(){} });
      story3.resume(secA, 1, 'T175S', g3.data.visit, null);
      ok('task175: resume of a kept result reveals the branch without replaying the loss',
         g3.data.stamina === 13 && /HURT/.test(cont3.textContent) && !cont3.querySelector('.keep-roll'), 'stamina=' + g3.data.stamina);
      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 181: every provisional-result state survives save + resume --------------
    // The boundary is general now (an <if var> chain, a <while> pass, a derived <set>), and the
    // whole of it rides in the roll memo's `accepted` flag — nothing else is persisted. So for
    // each of the five real sections that leaked: reach the pending state, save, resume into a
    // fresh GameState, and prove the reload neither auto-accepts (the probe stays at 0 and the
    // Keep control is back) nor, once kept, replays the commit on a second reload.
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle = () => new Promise((r) => setTimeout(r, 30));
      const liveRoll = (c) => Array.from(c.querySelectorAll('.btn-roll')).find((b) => !b.disabled);
      const revealed = (c) => (/Catch her in the net|She gets away/.test(c.textContent) ? 1 : 0);
      // Each case: a real section, the seed forcing its die, what the kept result commits, and
      // the value that commit is worth. `seed: null` means the outcome is forced through state
      // (§5.218's cursed COMBAT always fails), so no dice control is needed.
      const cases = [
        { book: 2, sec: '389', seed: 14, probe: (g) => g.data.shards, worth: 150, what: 'the 150-Shard tribute row' },
        { book: 2, sec: '698', seed: 5, probe: (g) => g.data.shards, worth: 1000, what: 'the derived 10×100 Shards' },
        { book: 2, sec: '684', seed: 7, probe: (g, c) => revealed(c), worth: 1, what: 'the derived net branch' },
        { book: 6, sec: '700', seed: 14, probe: (g) => 40 - g.data.stamina, worth: 3, what: 'the 3 Stamina of pine cones' },
        { book: 5, sec: '218', seed: null, probe: (g) => 40 - g.data.stamina, worth: 3, what: "the troll's 3-Stamina grip" },
      ];
      for (const tc of cases) {
        const tag = `§${tc.book}.${tc.sec}`;
        const el = await data.getSection(tc.book, tc.sec);
        const g = GameState.create({ name: 'T181R', gender: 'm', profession: 'Warrior', book: tc.book, adv });
        g.data.shards = 0; g.data.rank = 3; g.data.stamina = 40; g.data.staminaMax = 40; g.addBlessing('luck');
        if (tc.sec === '218') g.setAbilityFlag('combat', 'cursed', true); // force the grapple failure
        const c1 = document.createElement('div');
        const s1 = new Story(c1, g, { navigate() {}, onDeath() {}, notify() {} });
        g.setVisitProvider(() => s1.serializeVisit());
        g.goTo(tc.book, tc.sec); s1.begin(el, tc.book, tc.sec);
        if (tc.seed != null) eng.seedRng(tc.seed);
        liveRoll(c1).click(); await settle();
        eng.seedRng(null);
        ok(`task181 ${tag}: the roll lands as a provisional decision, committing nothing`,
           tc.probe(g, c1) === 0 && !!c1.querySelector('.keep-roll'), 'probe=' + tc.probe(g, c1));

        // Reload at the pending state: the decision is restored, not resolved.
        const g2 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...g.data, visit: s1.serializeVisit() }))));
        const c2 = document.createElement('div');
        const s2 = new Story(c2, g2, { navigate() {}, onDeath() {}, notify() {} });
        s2.resume(el, tc.book, tc.sec, g2.data.visit, null);
        ok(`task181 ${tag}: resume restores the pending decision without committing ${tc.what}`,
           tc.probe(g2, c2) === 0 && !!c2.querySelector('.keep-roll') && !!c2.querySelector('.blessing-reroll'),
           'probe=' + tc.probe(g2, c2));

        // Keep it on the resumed visit: exactly one commit…
        g2.setVisitProvider(() => s2.serializeVisit());
        c2.querySelector('.keep-roll').click();
        ok(`task181 ${tag}: keeping after a resume commits ${tc.what} exactly once`,
           tc.probe(g2, c2) === tc.worth, 'probe=' + tc.probe(g2, c2));

        // …and a second reload replays none of it.
        const g3 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...g2.data, visit: s2.serializeVisit() }))));
        const c3 = document.createElement('div');
        const s3 = new Story(c3, g3, { navigate() {}, onDeath() {}, notify() {} });
        s3.resume(el, tc.book, tc.sec, g3.data.visit, null);
        ok(`task181 ${tag}: resume of the kept result replays nothing`,
           tc.probe(g3, c3) === tc.worth && !c3.querySelector('.keep-roll'), 'probe=' + tc.probe(g3, c3));
      }
      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 154: begin()'s autosaves are atomic — no mid-begin save pairs the NEW
    // section with the PREVIOUS visit's ctx/entry-tick baseline ---
    // begin() clears vars/potion/fight bonuses and arrives at the dock BEFORE it used to
    // swap in the fresh ctx + entry-tick snapshot; each of those clears fires
    // changed()→save()→serializeVisit. The bug persisted {section: NEW, ctx: OLD} — a record
    // that passes resumeOrBegin's section-match guard yet aliases the previous section's
    // positional memos onto the new section. Capture every serializeVisit written during a
    // begin() and prove none names the new section while carrying foreign memos.
    {
      const secA154 = parse('<section name="A154" boxes="1"><gain shards="3"/><tick/><p>A.</p></section>');
      const secB154 = parse('<section name="B154" boxes="1"><p>B.</p></section>');
      const g154 = GameState.create({ name:'T154', gender:'m', profession:'Warrior', book:1, adv });
      g154.data.shards = 0;
      const cont154 = document.createElement('div');
      const story154 = new Story(cont154, g154, { navigate(){}, onDeath(){}, notify(){} });
      g154.setVisitProvider(() => story154.serializeVisit());

      // Enter A twice so its ctx carries applied memos AND its entry-tick snapshot is 1
      // (the box is already ticked on the second entry) — two distinct discriminators that a
      // begin(B) save must never leak into B's record.
      g154.goTo(1, 'A154'); story154.begin(secA154, 1, 'A154');
      g154.goTo(1, 'A154'); story154.begin(secA154, 1, 'A154');
      ok('task154: §A154 entry populated its ctx memo + tick snapshot',
         story154.ctx.applied.size >= 1 && g154.entryTickCount() === 1,
         'applied=' + story154.ctx.applied.size + ' entryTicks=' + g154.entryTickCount());

      // Give begin(B) real clearing work so the mid-begin saves actually fire.
      g154.setVar('x', 5);
      g154.data.potionBonus = { COMBAT: 2 };

      // Capture the serializeVisit written at every save fired during begin(B).
      const captured154 = [];
      const origSave154 = g154.save.bind(g154);
      g154.save = function () { captured154.push(story154.serializeVisit()); return origSave154(); };
      g154.goTo(1, 'B154'); story154.begin(secB154, 1, 'B154');
      g154.save = origSave154;

      const bBaseline = g154.entryTickCount();
      const foreign154 = captured154.filter((r) => r && r.section === 'B154'
        && (r.ctx.applied.length > 0 || r.entryTicks !== bBaseline));
      ok('task154: begin(B) fired its clearVars/clearPotionBonuses autosaves (window exercised)',
         captured154.length >= 1, 'saves=' + captured154.length);
      ok('task154: no mid-begin save pairs §B154 with §A154\'s ctx or entry-tick baseline',
         foreign154.length === 0,
         'foreign=' + foreign154.length + ' baseline=' + bBaseline);

      // Sub-defect: arriveAtDock persists a bare location change even when no ship berths and
      // no voyage ends — otherwise a save-free visit's dock arrival is lost on reload.
      const gD = GameState.create({ name:'T154d', gender:'m', profession:'Warrior', book:1, adv });
      gD.data.location = null; gD.data.ships = [];
      let saves154 = 0; const origSaveD = gD.save.bind(gD); gD.save = function () { saves154++; return origSaveD(); };
      gD.arriveAtDock('Marlock City');
      ok('task154: a dock arrival with no ship still persists the location',
         saves154 === 1 && gD.data.location === 'Marlock City', 'saves=' + saves154 + ' loc=' + gD.data.location);
      gD.arriveAtDock('Marlock City'); // same dock → no change → no needless save
      ok('task154: re-arriving the same dock triggers no needless save', saves154 === 1, 'saves=' + saves154);
      gD.arriveAtDock(null); // inland / at sea → location clears → persist the clear
      ok('task154: clearing the location (inland/at sea) persists too',
         saves154 === 2 && gD.data.location === null, 'saves=' + saves154 + ' loc=' + gD.data.location);
      gD.save = origSaveD;
    }

    // --- task 155: a one-shot action's memo lands in the PERSISTED record, not just the live
    // ctx — so a reload can't replay the rest/buy/roll whose effect already banked ---
    // Each handler's own state mutation autosaves from INSIDE itself, BEFORE the handler writes
    // the ctx memo; rerender() now re-persists once the memo is in place. Drive each handler
    // family with the provider installed, inspect what the autosave wrote to data.visit, then
    // resume from that record on a fresh state.
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle155 = () => new Promise((r) => setTimeout(r, 30));
      const rnd155 = Math.random;
      const reload155 = (secEl, book, sec, src) => {
        const g2 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...src.data }))));
        const cont2 = document.createElement('div');
        const story2 = new Story(cont2, g2, { navigate(){}, onDeath(){}, notify(){} });
        story2.resume(secEl, book, sec, g2.data.visit, null);
        return { g2, cont2 };
      };

      // Rest (task 129 one-shot hospitality rest): the memo must persist so the heal can't repeat.
      {
        const secR = parse('<section name="R155"><p>Inn.</p><rest stamina="4"/></section>');
        const g = GameState.create({ name:'T155r', gender:'m', profession:'Warrior', book:1, adv });
        g.data.stamina = 5; g.data.staminaMax = 20;
        const cont = document.createElement('div');
        const story = new Story(cont, g, { navigate(){}, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'R155'); story.begin(secR, 1, 'R155');
        Array.from(cont.querySelectorAll('button')).find((b) => /Rest/.test(b.textContent)).click();
        ok('task155: the persisted record marks the one-shot rest used',
           !!g.data.visit && g.data.visit.ctx.applied.some((k) => k.startsWith('rest@')),
           'applied=' + JSON.stringify(g.data.visit && g.data.visit.ctx.applied));
        const { cont2 } = reload155(secR, 1, 'R155', g);
        const rb2 = Array.from(cont2.querySelectorAll('button')).find((b) => /Rest/.test(b.textContent));
        ok('task155: after reload the one-shot rest is already spent (no infinite heal)',
           !!rb2 && rb2.disabled, 'disabled=' + (rb2 && rb2.disabled));
      }

      // Buy (§4.658-style quantity="1" one-shot): the buy count must persist so it can't repeat.
      {
        const secB = parse('<section name="B155"><buy quantity="1" tool="lantern" shards="2">a lantern</buy></section>');
        const g = GameState.create({ name:'T155b', gender:'m', profession:'Warrior', book:1, adv });
        g.data.items = []; g.data.shards = 100;
        const cont = document.createElement('div');
        const story = new Story(cont, g, { navigate(){}, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'B155'); story.begin(secB, 1, 'B155');
        Array.from(cont.querySelectorAll('button')).find((b) => /Buy|Take/.test(b.textContent)).click();
        ok('task155: the persisted record records the quantity="1" buy count',
           !!g.data.visit && g.data.visit.ctx.buys.some((e) => String(e[0]).startsWith('buy@') && e[1] >= 1),
           'buys=' + JSON.stringify(g.data.visit && g.data.visit.ctx.buys));
        const { cont2 } = reload155(secB, 1, 'B155', g);
        const bb2 = Array.from(cont2.querySelectorAll('button')).find((b) => /lantern/i.test(b.textContent));
        ok('task155: after reload the one-shot buy is already taken (no free second item)',
           !!bb2 && bb2.disabled, 'disabled=' + (bb2 && bb2.disabled));
      }

      // Roll (a failed <difficulty> whose var write used to be the only save): the resolved roll
      // must persist so a reload can't reroll for free.
      {
        const secD = parse('<section name="D155"><difficulty ability="COMBAT" level="12" var="m"/><success><p>WON</p></success><failure><p>LOST</p></failure></section>');
        const g = GameState.create({ name:'T155d', gender:'m', profession:'Warrior', book:1, adv });
        g.data.abilities.combat = 1;
        const cont = document.createElement('div');
        const story = new Story(cont, g, { navigate(){}, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'D155'); story.begin(secD, 1, 'D155');
        Math.random = () => 0; // low dice + COMBAT 1 vs level 12 → guaranteed failure
        cont.querySelector('.btn-roll').click(); await settle155();
        Math.random = rnd155;
        ok('task155: the persisted record keeps the resolved roll + var write',
           !!g.data.visit && g.data.visit.ctx.rolls.some((e) => String(e[0]).startsWith('roll@')) && g.data.visit.ctx.wroteVars.includes('m'),
           'rolls=' + JSON.stringify(g.data.visit && g.data.visit.ctx.rolls));
        const { cont2 } = reload155(secD, 1, 'D155', g);
        ok('task155: after reload the roll stays resolved (outcome shown, no roll button)',
           !cont2.querySelector('.btn-roll') && /WON|LOST/.test(cont2.textContent),
           'hasBtn=' + !!cont2.querySelector('.btn-roll'));
      }

      window.__FL_INSTANT_DICE__ = false;
      Math.random = rnd155;
    }

    // --- task 161: position + visit are committed atomically at every entry path ---
    // app.navigate() runs state.goTo() (which autosaves while the Story still names the
    // SOURCE) then story.begin(); a prose-only destination used to make no coherent second
    // save, leaving {data: destination, visit: source} on disk — a mismatch sanitizeVisit
    // rejects on reload, dropping the exact ctx + one-level return frame (the task-110 class
    // of repeated entry effects / lost rolls / history bounces). begin()/resumeStale now
    // commit the fully established visit, goBack() restores the Story identity BEFORE its
    // autosave, and serializeVisit refuses to write while position and Story disagree — so no
    // record is ever persisted whose identity does not match data.book/section.
    {
      // A persisted record is coherent when it is absent, or its identity matches the position.
      const coherent = (g) => {
        const v = g.data.visit;
        return v == null || (String(v.section) === String(g.data.section) && Number(v.book) === Number(g.data.book));
      };
      const allMatch = (writes) => writes.every((w) => w.v == null
        || (String(w.v.section) === String(w.sec) && Number(w.v.book) === Number(w.bk)));

      // Scenario 1 — A → a prose-only B (no entry effects, nothing to clear) carrying <return>.
      {
        const secA = parse('<section name="A161"><p>Source.</p><choices><choice section="B161">GoB</choice></choices></section>');
        const secB = parse('<section name="B161"><p>Prose only.</p><return>Back</return></section>');
        const secs = { A161: secA, B161: secB };
        const g = GameState.create({ name:'T161a', gender:'m', profession:'Warrior', book:1, adv });
        const cont = document.createElement('div');
        let story;
        const enter = (b, s) => { g.goTo(b, s); story.begin(secs[String(s)], b, s); };
        story = new Story(cont, g, { navigate: enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        // Capture the (visit, position) pair persisted at every save across the whole transition.
        const writes = [];
        const origSave = g.save.bind(g);
        g.save = function () { const r = origSave(); writes.push({ v: g.data.visit, sec: g.data.section, bk: g.data.book }); return r; };

        enter(1, 'A161');
        Array.from(cont.querySelectorAll('.choice')).find((b) => /GoB/.test(b.textContent)).click(); // A → B via the wrapper
        g.save = origSave;

        ok('task161-1: after A → prose-only B the persisted visit names B (matches data.section)',
           coherent(g) && g.data.visit && g.data.visit.section === 'B161',
           'visit=' + (g.data.visit && g.data.visit.section) + ' data=' + g.data.section);
        ok('task161-1: every written record pairs its visit with the matching position (no mismatch)',
           allMatch(writes), 'writes=' + JSON.stringify(writes.map((w) => (w.v && w.v.section) + '@' + w.sec)));
        ok('task161-1: the committed B record carries the one-level return frame back to A',
           !!g.data.visit && !!g.data.visit.frame && g.data.visit.frame.section === 'A161');

        // The record survives the storage sanitizer and resumes the EXACT visit (frame intact),
        // so <return> restores A rather than falling back to a fresh navigation.
        const g2 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...g.data }))));
        ok('task161-1: the coherent B visit survives sanitize (not rejected as a mismatch)',
           !!g2.data.visit && g2.data.visit.section === 'B161' && !!g2.data.visit.frame);
        const cont2 = document.createElement('div');
        let story2;
        story2 = new Story(cont2, g2, { navigate: (b, s) => { g2.goTo(b, s); story2.begin(secs[String(s)], b, s); }, onDeath(){}, notify(){} });
        g2.setVisitProvider(() => story2.serializeVisit()); // the app installs this on load
        const frame2 = story2.deserializeFrame(g2.data.visit.frame, secA);
        story2.resume(secB, 1, 'B161', g2.data.visit, frame2);
        ok('task161-1: reload resumes B with the return frame restored', story2.section === 'B161' && !!story2._returnFrame);
        Array.from(cont2.querySelectorAll('.goto')).find((b) => /Back/.test(b.textContent)).click(); // <return>
        ok('task161-1: post-reload <return> restores the source A (no fresh-visit fallback)',
           story2.section === 'A161', 'sec=' + story2.section);
        ok('task161-1: goBack left position and visit agreeing on disk',
           coherent(g2) && g2.data.visit && g2.data.visit.section === 'A161',
           'visit=' + (g2.data.visit && g2.data.visit.section) + ' data=' + g2.data.section);
      }

      // Scenario 2 — B → return to A restores A's resolved roll/action memo, and goBack commits
      // a coherent record (its restoreReturn autosave now pairs A's position with A's ctx).
      {
        window.__FL_INSTANT_DICE__ = true;
        const settle = () => new Promise((r) => setTimeout(r, 30));
        const rnd = Math.random;
        const secA = parse('<section name="A2r"><difficulty ability="COMBAT" level="1" var="m"/><success><p>WON-A</p></success><failure><p>LOST-A</p></failure><choices><choice section="B2r">GoB</choice></choices></section>');
        const secB = parse('<section name="B2r"><p>Detour.</p><return>Back</return></section>');
        const secs = { A2r: secA, B2r: secB };
        const g = GameState.create({ name:'T161b', gender:'m', profession:'Warrior', book:1, adv });
        g.data.abilities.combat = 8;
        const cont = document.createElement('div');
        let story;
        const enter = (b, s) => { g.goTo(b, s); story.begin(secs[String(s)], b, s); };
        story = new Story(cont, g, { navigate: enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());

        enter(1, 'A2r');
        Math.random = () => 0.99; // level 1 vs COMBAT 8 → success regardless of the dice
        cont.querySelector('.btn-roll').click(); await settle();
        Math.random = rnd;
        const rollsAtA = story.ctx.rolls.size;
        ok('task161-2: §A2r resolved its roll before leaving',
           rollsAtA >= 1 && story.ctx.wroteVars.has('m'), 'rolls=' + rollsAtA);

        Array.from(cont.querySelectorAll('.choice')).find((b) => /GoB/.test(b.textContent)).click(); // A → B
        ok('task161-2: at B the persisted visit is coherent and holds A\'s frame',
           coherent(g) && g.data.visit && g.data.visit.section === 'B2r' && g.data.visit.frame && g.data.visit.frame.section === 'A2r');

        const writes = [];
        const origSave = g.save.bind(g);
        g.save = function () { const r = origSave(); writes.push({ v: g.data.visit, sec: g.data.section, bk: g.data.book }); return r; };
        Array.from(cont.querySelectorAll('.goto')).find((b) => /Back/.test(b.textContent)).click(); // <return> B → A
        g.save = origSave;

        ok('task161-2: <return> restored A with its resolved roll memo intact',
           story.section === 'A2r' && story.ctx.rolls.size === rollsAtA && story.ctx.wroteVars.has('m'),
           'sec=' + story.section + ' rolls=' + story.ctx.rolls.size);
        ok('task161-2: goBack persisted a coherent A visit (position + visit agree)',
           coherent(g) && g.data.visit && g.data.visit.section === 'A2r',
           'visit=' + (g.data.visit && g.data.visit.section) + ' data=' + g.data.section);
        ok('task161-2: every write during the return pairs its visit with the matching position',
           writes.length >= 1 && allMatch(writes),
           'writes=' + JSON.stringify(writes.map((w) => (w.v && w.v.section) + '@' + w.sec)));

        // The restored A survives a reload with its roll still resolved (not reset to a re-roll).
        const g2 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...g.data }))));
        ok('task161-2: the restored A visit survives sanitize with the roll resolved',
           !!g2.data.visit && g2.data.visit.section === 'A2r'
           && g2.data.visit.ctx.rolls.some((e) => String(e[0]).startsWith('roll@'))
           && g2.data.visit.ctx.wroteVars.includes('m'));
        window.__FL_INSTANT_DICE__ = false;
        Math.random = rnd;
      }

      // Scenario 3 — undo() lands on a save-free (prose-only) section. state.undo() autosaves
      // while the Story still names the pre-undo section; begin() on the reverted section now
      // commits the coherent record so the persisted visit names it (not the undone one).
      {
        const secA = parse('<section name="A3u"><p>Save-free.</p><choices><choice section="B3u">GoB</choice></choices></section>');
        const secB = parse('<section name="B3u"><gain shards="5"/><p>B.</p></section>');
        const secs = { A3u: secA, B3u: secB };
        const g = GameState.create({ name:'T161c', gender:'m', profession:'Warrior', book:1, adv });
        g.data.shards = 0;
        const cont = document.createElement('div');
        let story;
        const enter = (b, s) => { g.goTo(b, s); g.snapshot(); story.begin(secs[String(s)], b, s); };
        story = new Story(cont, g, { navigate: enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        enter(1, 'A3u');
        Array.from(cont.querySelectorAll('.choice')).find((b) => /GoB/.test(b.textContent)).click(); // A3 → B3 (wrapper)
        ok('task161-3: entered B3 (shards gained)', story.section === 'B3u' && g.data.shards === 5);

        // Mirror app.undo(): revert the timeline, drop the stale frame, re-enter via begin().
        const writes = [];
        const origSave = g.save.bind(g);
        g.save = function () { const r = origSave(); writes.push({ v: g.data.visit, sec: g.data.section, bk: g.data.book }); return r; };
        const target = g.undo();
        story._returnFrame = null;
        story.begin(secs[String(target.section)], target.book, target.section);
        g.save = origSave;

        ok('task161-3: undo reverted to the save-free A3 (entry gain rolled back)',
           story.section === 'A3u' && g.data.shards === 0, 'sec=' + story.section + ' shards=' + g.data.shards);
        ok('task161-3: the persisted visit names the reverted section (not the undone B3)',
           coherent(g) && g.data.visit && g.data.visit.section === 'A3u',
           'visit=' + (g.data.visit && g.data.visit.section) + ' data=' + g.data.section);
        ok('task161-3: no write during undo pairs a foreign visit with the reverted position',
           allMatch(writes), 'writes=' + JSON.stringify(writes.map((w) => (w.v && w.v.section) + '@' + w.sec)));

        // The reverted A3 visit survives a reload (coherent record, resumable — not a mismatch).
        const g2 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...g.data }))));
        ok('task161-3: the reverted A3 visit survives sanitize (resumable, not a mismatch)',
           !!g2.data.visit && g2.data.visit.section === 'A3u');
      }
    }

    // --- task 167: mutation-bearing navigation is atomic across the async target fetch ------
    // A paid/ship move defers its price into the transactional navigate: while the destination
    // fetch is pending nothing is persisted; a rejected fetch refunds the price and leaves the
    // source live with the in-flight guard released; a successful fetch takes it exactly once.
    {
      const tick = () => new Promise((r) => setTimeout(r, 0)); // flush the navigate microtasks

      // Scenario A — a paid cross-book <choice>: reject the target, then retry and succeed.
      {
        const secSrc = parse('<section name="SRC167"><p>Source.</p><choices><choice section="9" book="2" shards="50">Cross over</choice></choices></section>');
        const secDst = parse('<section name="9"><p>Arrived.</p></section>');
        const g = GameState.create({ name:'T167a', gender:'m', profession:'Warrior', book:1, adv });
        g.slot = 19; g.data.shards = 100;
        const cont = document.createElement('div');
        let story;
        const nav = controllable(g, () => story, secDst);
        story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'SRC167'); story.begin(secSrc, 1, 'SRC167'); // establishes + commits the on-disk source
        const turns0 = g.data.turns;
        const crossBtn = () => Array.from(cont.querySelectorAll('.choice')).find((b) => /Cross over/.test(b.textContent));

        crossBtn().click(); // charges the price IN MEMORY; the fetch is now pending
        ok('task167-A: while pending the cost is deducted in memory', g.data.shards === 50, 'shards=' + g.data.shards);
        ok('task167-A: while pending the PERSISTED source shows NO deduction', (readSlotData(19) || {}).shards === 100, 'persisted=' + JSON.stringify((readSlotData(19) || {}).shards));
        ok('task167-A: while pending the source is current and the guard is held', story.section === 'SRC167' && story._navInFlight === true);

        nav.pending.reject(); await tick(); // the target fetch fails
        ok('task167-A: a rejected target refunds the cost in memory', g.data.shards === 100, 'shards=' + g.data.shards);
        ok('task167-A: a rejected target leaves the persisted source coherent', (readSlotData(19) || {}).shards === 100);
        ok('task167-A: a rejected target releases the guard and keeps the source live', story._navInFlight === false && story.section === 'SRC167');
        ok('task167-A: the paid choice is still offered after the failed move', !!crossBtn());
        ok('task167-A: no turn was counted for the failed move', g.data.turns === turns0, 'turns=' + g.data.turns + ' vs ' + turns0);

        crossBtn().click(); nav.pending.ok(); await tick(); // retry and succeed
        ok('task167-A: a successful move takes the cost exactly once', g.data.shards === 50, 'shards=' + g.data.shards);
        ok('task167-A: a successful move reaches the destination', story.section === '9' && Number(g.data.book) === 2);
        ok('task167-A: a successful move counts exactly one turn', g.data.turns === turns0 + 1, 'turns=' + g.data.turns);
        ok('task167-A: a successful move persists the destination WITH the one deduction', (readSlotData(19) || {}).shards === 50 && String((readSlotData(19) || {}).section) === '9');
        ok('task167-A: a successful move installs one return frame back to the source', !!story._returnFrame && story._returnFrame.section === 'SRC167');
        ok('task167-A: a successful move releases the in-flight guard', story._navInFlight === false);
        deleteSlot(19);
      }

      // Scenario B — a <goto sail="t"> (a ship action): a rejected voyage neither strands the
      // ship at sea nor persists the launch; the source port stays live and re-sailable.
      {
        const secSrc = parse('<section name="SAILSRC" dock="Kunrir"><p>Port.</p><goto sail="t" section="9" book="2">Sail forth</goto></section>');
        const secDst = parse('<section name="9"><p>At sea.</p></section>');
        const g = GameState.create({ name:'T167b', gender:'m', profession:'Warrior', book:1, adv });
        g.slot = 20;
        const cont = document.createElement('div');
        let story;
        const nav = controllable(g, () => story, secDst);
        story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.addShip({ type:'barque', name:'Wave' }); // at large until the dock berths it
        g.goTo(1, 'SAILSRC'); story.begin(secSrc, 1, 'SAILSRC'); // arriveAtDock('Kunrir') berths Wave
        const shipId = g.data.ships[0].id;
        ok('task167-B: the ship is docked here before sailing', g.data.ships[0].docked === 'Kunrir' && g.shipsHere().length === 1);
        const sailBtn = () => Array.from(cont.querySelectorAll('.goto')).find((b) => /Sail forth/.test(b.textContent));
        ok('task167-B: the sail goto is enabled with a ship here', !!sailBtn() && sailBtn().disabled === false);

        sailBtn().click(); // launches the ship IN MEMORY; the voyage fetch is pending
        ok('task167-B: while pending the ship is at large in memory', g.data.ships[0].docked === null && g.data.sailingShipId === shipId);
        ok('task167-B: while pending the PERSISTED ship is still docked (launch not committed)', ((readSlotData(20) || {}).ships || [])[0] && readSlotData(20).ships[0].docked === 'Kunrir', JSON.stringify((readSlotData(20) || {}).ships));
        ok('task167-B: while pending the guard is held and the port is current', story._navInFlight === true && story.section === 'SAILSRC');

        nav.pending.reject(); await tick(); // the voyage's destination fails to load
        ok('task167-B: a rejected voyage re-docks the ship', g.data.ships[0].docked === 'Kunrir' && g.data.sailingShipId == null);
        ok('task167-B: a rejected voyage releases the guard and keeps the port live', story._navInFlight === false && story.section === 'SAILSRC');
        ok('task167-B: the port is still re-sailable after the failed voyage', !!sailBtn() && sailBtn().disabled === false);

        sailBtn().click(); nav.pending.ok(); await tick(); // retry and succeed
        ok('task167-B: a successful voyage reaches the destination', story.section === '9' && Number(g.data.book) === 2);
        ok('task167-B: a successful voyage keeps the ship at large (sailing on)', g.data.ships[0].docked === null && g.data.sailingShipId === shipId);
        ok('task167-B: a successful voyage persists the destination', String((readSlotData(20) || {}).section) === '9');
        ok('task167-B: a successful voyage releases the guard', story._navInFlight === false);
        deleteSlot(20);
      }
    }

    // --- task 168: an open navigation transaction isolates itself; unrelated UI is inert ----
    // While a mutation-bearing move's target fetch is pending the source stays rendered, but a
    // concurrent story action, an item-use detour and an explicit save must not mutate or
    // misreport state that a rollback would discard or a commit would misroute. The transition
    // guard swallows source-pane clicks, useItem() refuses mid-move, and an explicit save() no
    // longer reports a success the suppressed txn never wrote.
    {
      const tick = () => new Promise((r) => setTimeout(r, 0)); // flush the navigate microtasks

      // (a) a concurrent non-navigation mutation (a Rest) during a pending paid cross-book move,
      //     on BOTH the rollback and the success path.
      {
        const secSrc = parse('<section name="SRC168a"><p>Source.</p><rest/><choices><choice section="9" book="2" shards="50">Cross over</choice></choices></section>');
        const secDst = parse('<section name="9"><p>Arrived.</p></section>');
        const g = GameState.create({ name:'T168a', gender:'m', profession:'Warrior', book:1, adv });
        g.slot = 21; g.data.shards = 100; g.data.stamina = g.data.staminaMax - 5;
        const cont = document.createElement('div');
        let story;
        const nav = controllable(g, () => story, secDst);
        story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'SRC168a'); story.begin(secSrc, 1, 'SRC168a');
        const stam0 = g.data.stamina;
        const restBtn = () => Array.from(cont.querySelectorAll('button')).find((b) => /Rest/.test(b.textContent));
        const crossBtn = () => Array.from(cont.querySelectorAll('.choice')).find((b) => /Cross over/.test(b.textContent));
        ok('task168-a: the source offers both a Rest and the paid move at rest', !!restBtn() && !!crossBtn());

        crossBtn().click(); // charges the price IN MEMORY; the fetch is now pending
        ok('task168-a: the move is in flight', story._navInFlight === true && g.data.shards === 50);
        restBtn().click(); // concurrent Rest — must be swallowed by the transition guard
        ok('task168-a: a concurrent Rest is blocked while the move is in flight', g.data.stamina === stam0, 'stamina=' + g.data.stamina);

        nav.pending.reject(); await tick(); // the target fetch fails
        ok('task168-a: after rollback the source is coherent (price refunded, no stray heal)', g.data.shards === 100 && g.data.stamina === stam0 && story.section === 'SRC168a');
        ok('task168-a: controls recover after rollback', story._navInFlight === false && !!restBtn() && !!crossBtn());

        crossBtn().click(); // retry — pending again
        restBtn().click(); // concurrent Rest again — still blocked
        ok('task168-a: a concurrent Rest is still blocked on the retry (pre-success)', g.data.stamina === stam0, 'stamina=' + g.data.stamina);
        nav.pending.ok(); await tick(); // this time succeed
        ok('task168-a: a successful move reaches the destination', story.section === '9' && Number(g.data.book) === 2);
        ok('task168-a: a successful move takes the price exactly once', g.data.shards === 50, 'shards=' + g.data.shards);
        ok('task168-a: the blocked Rest never applied (no misrouted heal at the destination)', g.data.stamina === stam0, 'stamina=' + g.data.stamina);
        ok('task168-a: the destination persists with the one deduction', (readSlotData(21) || {}).shards === 50 && String((readSlotData(21) || {}).section) === '9');
        deleteSlot(21);
      }

      // (b) a charged item whose OWN detour is attempted during a pending move: the use must be
      //     refused so the charge is not spent for a navigation the guard would drop.
      {
        const secSrc = parse('<section name="SRC168b"><p>Source.</p><choices><choice section="9" book="2" shards="50">Cross over</choice></choices></section>');
        const secDst = parse('<section name="9"><p>Arrived.</p></section>');
        const g = GameState.create({ name:'T168b', gender:'m', profession:'Warrior', book:1, adv });
        g.slot = 22; g.data.shards = 100;
        const cont = document.createElement('div');
        let story;
        const nav = controllable(g, () => story, secDst);
        story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'SRC168b'); story.begin(secSrc, 1, 'SRC168b');
        const crossBtn = () => Array.from(cont.querySelectorAll('.choice')).find((b) => /Cross over/.test(b.textContent));
        const item = makeItem('tool', 'Vade Mecum', 0, null, []);
        g.data.items.push(item);
        const effect = { uses: 1, body: '<goto section="600" book="3"/>' }; // a consult detour
        const bodyNode = data.parseXml('<effect>' + effect.body + '</effect>');

        crossBtn().click(); // a move is now in flight
        ok('task168-b: the move is in flight', story._navInFlight === true);
        const res = story.useItem(item, effect, bodyNode); // player consults the item mid-move
        ok('task168-b: an item use during a pending move is refused', res && res.blocked === true);
        ok('task168-b: the item charge is NOT consumed by the refused use', effect.uses === 1);
        ok('task168-b: the item is not removed and no detour is taken', g.data.items.some((it) => it.id === item.id) && story.section === 'SRC168b');

        nav.pending.ok(); await tick(); // the original move still completes normally
        ok('task168-b: the original move reaches its destination', story.section === '9' && Number(g.data.book) === 2);
        ok('task168-b: the original move took its price exactly once', g.data.shards === 50, 'shards=' + g.data.shards);
        ok('task168-b: the item-use guard has released with the move', story._navInFlight === false);
        // and once the move has settled a use is no longer refused (here a detour-free potion use)
        const potion = story.useItem(item, { uses: 1, ability: 'combat', bonus: 1 }, null);
        ok('task168-b: an item use is accepted once the transition settles', !(potion && potion.blocked));
        deleteSlot(22);
      }

      // (c) an explicit save during a pending move must not claim a success the suppressed txn
      //     never wrote (an autosave stays silently deferred).
      {
        const secSrc = parse('<section name="SRC168c"><p>Source.</p><choices><choice section="9" book="2" shards="50">Cross over</choice></choices></section>');
        const secDst = parse('<section name="9"><p>Arrived.</p></section>');
        const g = GameState.create({ name:'T168c', gender:'m', profession:'Warrior', book:1, adv });
        g.slot = 23; g.data.shards = 100;
        const cont = document.createElement('div');
        let story;
        const nav = controllable(g, () => story, secDst);
        story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'SRC168c'); story.begin(secSrc, 1, 'SRC168c'); // commits the on-disk source (shards 100)
        const crossBtn = () => Array.from(cont.querySelectorAll('.choice')).find((b) => /Cross over/.test(b.textContent));

        crossBtn().click(); // txn open: price deducted in memory (50), nothing persisted
        ok('task168-c: an autosave during the txn reports success but writes nothing', g.save() === true && (readSlotData(23) || {}).shards === 100);
        ok('task168-c: an EXPLICIT save during the txn does NOT claim success', g.save(true) === false);
        ok('task168-c: the explicit save wrote nothing (persisted source unchanged)', (readSlotData(23) || {}).shards === 100);
        ok('task168-c: the explicit save leaves a player-facing reason to surface', typeof g.lastSaveError === 'string' && g.lastSaveError.length > 0);

        nav.pending.ok(); await tick(); // the move commits once
        ok('task168-c: after the move commits an explicit save succeeds and clears the error', g.save(true) === true && g.lastSaveError == null);
        ok('task168-c: the committed destination persists with the one deduction', (readSlotData(23) || {}).shards === 50 && String((readSlotData(23) || {}).section) === '9');
        deleteSlot(23);
      }
    }

    // --- task 169: consequence-bearing navigation has an abort/retry contract --------------
    // A target-load failure must leave the player in one coherent state. Resurrection-on-death
    // REFUNDS the deal (the deal is intact and the death prompt re-appears); a durable
    // consequence (a flee wound, a spent item charge, a resolved combat round) STAYS applied
    // and offers a retry that reaches the target without re-applying it. Success consumes once
    // and preserves the return frame.
    {
      const tick = () => new Promise((r) => setTimeout(r, 0));
      const retryBtn = (cont) => Array.from(cont.querySelectorAll('button')).find((b) => /Try again/.test(b.textContent));

      // (res) cross-book resurrection on death: a rejected target refunds the deal (still dead);
      // a confirmed target revives exactly once at the deal's section, keeping a return frame.
      {
        const secDied = parse('<section name="DIED"><p>You fall.</p></section>');
        const secDeal = parse('<section name="200"><p>Back among the living.</p></section>');
        const g = GameState.create({ name:'T169r', gender:'m', profession:'Warrior', book:1, adv });
        g.slot = 24;
        g.addResurrection({ book: 3, section: '200', god: 'Alvir' });
        g.data.stamina = 0; // dead
        const cont = document.createElement('div');
        let story;
        const nav = controllable(g, () => story, secDeal);
        story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'DIED'); story.begin(secDied, 1, 'DIED');
        ok('task169-res: the player starts dead with one deal arranged', g.isDead() && g.data.resurrections.length === 1);
        // Mirror handleDeath: peek the deal's target, defer the revive into the move's pay.
        const revive = () => story.navigate(3, '200', { pay: () => { eng.reviveWithResurrection(g, 0); return true; } });

        revive();
        ok('task169-res: while pending the deal is consumed and Stamina healed in memory', g.data.resurrections.length === 0 && g.data.stamina > 0 && story._navInFlight === true);
        nav.pending.reject(); await tick();
        ok('task169-res: a rejected target refunds the deal and leaves the player dead', g.data.resurrections.length === 1 && g.isDead());
        ok('task169-res: a rejected target releases the guard and stays on the death section', story._navInFlight === false && story.section === 'DIED');

        revive(); nav.pending.ok(); await tick();
        ok('task169-res: a successful revive consumes the deal exactly once and heals', g.data.resurrections.length === 0 && g.data.stamina > 0);
        ok('task169-res: a successful revive reaches the deal section', story.section === '200' && Number(g.data.book) === 3);
        ok('task169-res: a successful revive preserves a return frame to the death section', !!story._returnFrame && story._returnFrame.section === 'DIED');
        deleteSlot(24);
      }

      // (item) a charged item detour: the charge is durable; a rejected target arms a retry that
      // reaches the detour WITHOUT re-spending the charge; success consumes the charge once.
      {
        const secSrc = parse('<section name="ITEMSRC"><p>Consult the tome.</p></section>');
        const secDetour = parse('<section name="600"><p>A secret is revealed.</p></section>');
        const g = GameState.create({ name:'T169i', gender:'m', profession:'Warrior', book:1, adv });
        g.slot = 25;
        const cont = document.createElement('div');
        let story;
        const nav = controllable(g, () => story, secDetour);
        story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'ITEMSRC'); story.begin(secSrc, 1, 'ITEMSRC');
        const item = makeItem('tool', 'ancient tome', 0, null, []);
        g.data.items.push(item);
        const effect = { uses: 1, body: '<goto section="600" book="3"/>' };

        story.useItem(item, effect, data.parseXml('<effect><goto section="600" book="3"/></effect>'));
        ok('task169-item: using the item consumes the charge (durable) and holds the guard', effect.uses === 0 && !g.data.items.some((it) => it.id === item.id) && story._navInFlight === true);
        nav.pending.reject(); await tick();
        ok('task169-item: a rejected detour keeps the charge spent (not refunded)', effect.uses === 0 && !g.data.items.some((it) => it.id === item.id));
        ok('task169-item: a rejected detour arms a retry (guard released, retry shown)', story._navInFlight === false && !!retryBtn(cont));

        retryBtn(cont).click(); nav.pending.ok(); await tick();
        ok('task169-item: the retry reaches the detour', story.section === '600' && Number(g.data.book) === 3);
        ok('task169-item: the retry did not re-consume a charge (item still gone, spent once)', !g.data.items.some((it) => it.id === item.id));
        ok('task169-item: the retry preserves a return frame to the source', !!story._returnFrame && story._returnFrame.section === 'ITEMSRC');
        deleteSlot(25);
      }

      // (flee) a fight escape: the parting wound is durable; a rejected target arms a retry that
      // reaches the escape section WITHOUT re-applying the wound; the fight is not a dead end.
      {
        const secSrc = parse('<section name="FLEESRC"><p>A monster blocks the way.</p><fight name="Ogre" combat="6" defence="30" stamina="20"/><flee><lose stamina="2"/><goto section="745" book="2"/>Run for it</flee></section>');
        const secTarget = parse('<section name="745"><p>Safe at last.</p></section>');
        const g = GameState.create({ name:'T169f', gender:'m', profession:'Warrior', book:1, adv });
        g.slot = 26; g.data.stamina = g.data.staminaMax;
        const cont = document.createElement('div');
        let story;
        const nav = controllable(g, () => story, secTarget);
        story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'FLEESRC'); story.begin(secSrc, 1, 'FLEESRC');
        const fleeBtn = () => Array.from(cont.querySelectorAll('button')).find((b) => /^Flee$/.test(b.textContent.trim()));
        const stam0 = g.data.stamina;
        ok('task169-flee: the fight offers a Flee button', !!fleeBtn());

        fleeBtn().click(); // applies the parting wound (durable), marks fled, navigates
        ok('task169-flee: fleeing applies the parting wound (durable) and holds the guard', g.data.stamina === stam0 - 2 && story._navInFlight === true);
        nav.pending.reject(); await tick();
        ok('task169-flee: a rejected escape keeps the wound (not refunded)', g.data.stamina === stam0 - 2);
        ok('task169-flee: a rejected escape arms a retry and is no Attack/Flee dead-end', story._navInFlight === false && !!retryBtn(cont) && !fleeBtn());

        retryBtn(cont).click(); nav.pending.ok(); await tick();
        ok('task169-flee: the retry reaches the escape target', story.section === '745' && Number(g.data.book) === 2);
        ok('task169-flee: the retry did not re-apply the wound (still one wound)', g.data.stamina === stam0 - 2);
        deleteSlot(26);
      }
    }

    // --- task 178: a DIRECT <choice flee="t"> shares the fight widget's durable retry contract ---
    // Clicking the section's own flee choice (not the widget's Flee button) applies the <flee>
    // parting wound and routes the move { durable: true }: a rejected target keeps the ONE wound
    // and arms a retry-only screen instead of leaving the flee choice live to wound again; a
    // fatal parting wound ends with no navigation and no retry. (§6.305 is a real example.)
    {
      const tick = () => new Promise((r) => setTimeout(r, 0));
      const retryBtn = (cont) => Array.from(cont.querySelectorAll('button')).find((b) => /Try again/.test(b.textContent));
      const fleeChoiceBtn = (cont) => Array.from(cont.querySelectorAll('.choice')).find((b) => /Flee/.test(b.textContent));
      const secXml = '<section name="FLEECHOICE"><p>You turn to run.</p><flee><lose stamina="2"/></flee><choices><choice section="745" book="2" flee="t">Flee, taking a parting wound</choice></choices></section>';

      // Rejected escape: one wound, a retry-only screen, then a successful retry with no second wound.
      {
        const g = GameState.create({ name:'T178', gender:'m', profession:'Warrior', book:1, adv });
        g.slot = 28; g.data.stamina = g.data.staminaMax;
        const cont = document.createElement('div');
        let story;
        const nav = controllable(g, () => story, parse('<section name="745"><p>Safe.</p></section>'));
        story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'FLEECHOICE'); story.begin(parse(secXml), 1, 'FLEECHOICE');
        const stam0 = g.data.stamina;
        ok('task178: the section shows a direct flee choice, wound not yet applied', !!fleeChoiceBtn(cont) && g.data.stamina === stam0);

        fleeChoiceBtn(cont).click(); // applies the parting wound (durable), routes durable
        ok('task178: clicking the flee choice applies the wound once (durable) and holds the guard', g.data.stamina === stam0 - 2 && story._navInFlight === true);
        nav.pending.reject(); await tick();
        ok('task178: a rejected escape keeps the one wound (not refunded)', g.data.stamina === stam0 - 2);
        ok('task178: a rejected escape arms a retry-only screen (no live flee choice to re-wound)', story._navInFlight === false && !!retryBtn(cont) && !fleeChoiceBtn(cont));

        retryBtn(cont).click(); nav.pending.ok(); await tick();
        ok('task178: the retry reaches the escape target', story.section === '745' && Number(g.data.book) === 2);
        ok('task178: the retry did not re-apply the wound (still one)', g.data.stamina === stam0 - 2);
        ok('task178: the retry preserves a return frame to the source', !!story._returnFrame && story._returnFrame.section === 'FLEECHOICE');
        deleteSlot(28);
      }

      // A fatal parting wound: no navigation is attempted (guard released) and no retry is armed.
      {
        const g = GameState.create({ name:'T178f', gender:'m', profession:'Warrior', book:1, adv });
        g.slot = 29; g.data.stamina = 2; // the 2-point wound is fatal
        const cont = document.createElement('div');
        let story;
        const nav = controllable(g, () => story, parse('<section name="745"><p>Safe.</p></section>'));
        story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'FLEECHOICE'); story.begin(parse(secXml), 1, 'FLEECHOICE');
        fleeChoiceBtn(cont).click();
        ok('task178: a fatal parting wound kills without navigating', g.isDead() && nav.pending === null && story._navInFlight === false);
        ok('task178: a fatal parting wound arms no retry', !story._pendingRetry);
        deleteSlot(29);
      }
    }

    // --- task 205: a provisional result must not lock the flee exit ------------------------
    // Every other navigation gate exempts giving up: computeRollGate/computeTransferGate/
    // computeBuyGate skip a flee="t" node and computeFightGate leaves both the flee choice and
    // the escape box= choice ungated. applyPendingRerollGate (task 181) works on rendered
    // buttons instead of nodes and disabled every .goto/.choice, so a direct <choice flee="t">
    // was locked behind a provisional roll while the fight widget's own Flee button (a
    // .btn-secondary, never a .choice) stayed live — the same escape, offered twice, gated once.
    {
      window.__FL_INSTANT_DICE__ = true; // resolve the check synchronously, like the roll blocks above
      const tick = () => new Promise((r) => setTimeout(r, 0));
      const settle205 = () => new Promise((r) => setTimeout(r, 30));
      const retryBtn = (c) => Array.from(c.querySelectorAll('button')).find((b) => /Try again/.test(b.textContent));
      const fleeBtn = (c) => Array.from(c.querySelectorAll('.choice')).find((b) => /Flee/.test(b.textContent));
      const onwardBtn = (c) => Array.from(c.querySelectorAll('.choice')).find((b) => /Press on/.test(b.textContent));
      // A SCOUTING check the player cannot pass, beside a direct flee choice and an ordinary
      // onward choice. Holding Luck makes the failure a pending decision (task 175).
      const sec205 = '<section name="FLEE205"><p>Slip past the guard.'
        + '<difficulty ability="scouting" level="20">Test your SCOUTING</difficulty></p>'
        + '<flee><lose stamina="2"/></flee>'
        + '<choices><choice section="745" book="2" flee="t">Flee, taking a parting wound</choice>'
        + '<choice section="746">Press on</choice></choices></section>';

      const g = GameState.create({ name: 'T205', gender: 'm', profession: 'Warrior', book: 1, adv });
      g.slot = 32; g.data.stamina = g.data.staminaMax; g.addBlessing('luck');
      const cont = document.createElement('div');
      let story;
      const nav = controllable(g, () => story, parse('<section name="745"><p>Away.</p></section>'));
      story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
      g.setVisitProvider(() => story.serializeVisit());
      g.goTo(1, 'FLEE205'); story.begin(parse(sec205), 1, 'FLEE205');
      const stam0 = g.data.stamina;

      cont.querySelector('.btn-roll').click(); await settle205(); // fails → provisional decision
      ok('task205: the failed check is a pending decision', !!cont.querySelector('.keep-roll'));
      ok('task205: the ordinary onward choice is locked while the result is provisional',
         !!onwardBtn(cont) && onwardBtn(cont).disabled === true);
      ok('task205: the flee choice stays clickable', !!fleeBtn(cont) && fleeBtn(cont).disabled === false);
      ok('task205: the flee choice is tagged as an escape exit, the onward choice is not',
         fleeBtn(cont).dataset.fleenav === '1' && onwardBtn(cont).dataset.fleenav === undefined);

      // Taking it still routes through task 178's durable-consequence contract.
      fleeBtn(cont).click();
      ok('task205: fleeing from a provisional result applies the parting wound once, durably',
         g.data.stamina === stam0 - 2 && story._navInFlight === true, 'stamina=' + g.data.stamina);
      nav.pending.reject(); await tick();
      ok('task205: a rejected escape keeps the one wound and arms a retry-only screen',
         g.data.stamina === stam0 - 2 && !!retryBtn(cont) && !fleeBtn(cont));
      retryBtn(cont).click(); nav.pending.ok(); await tick();
      ok('task205: the retry reaches the escape target with no second wound',
         story.section === '745' && g.data.stamina === stam0 - 2, `sec=${story.section} stamina=${g.data.stamina}`);
      deleteSlot(32);

      // The other exempt shape, checked on the predicate itself: a mid-fight surrender choice
      // gated by an escape codeword (computeFightGate leaves it ungated for the same reason).
      const esc205 = parse('<section name="E205"><tick codeword="Flee1" hidden="t"/>'
        + '<fight name="Ogre" combat="5" defence="9" stamina="10"/>'
        + '<choices><choice box="Flee1" section="9">Surrender</choice><choice section="10">Fight on</choice></choices></section>');
      const escCw = gates.computeEscapeCodewords(esc205);
      const surrender = Array.from(esc205.querySelectorAll('choice')).find((c) => c.getAttribute('box') === 'Flee1');
      const fightOn = Array.from(esc205.querySelectorAll('choice')).find((c) => c.getAttribute('box') == null);
      ok('task205: isEscapeNav recognises an escape-codeword surrender choice',
         gates.isEscapeNav(surrender, escCw) === true, 'escape codewords: ' + [...escCw].join(','));
      ok('task205: an ordinary choice is not an escape exit', gates.isEscapeNav(fightOn, escCw) === false);
      ok('task205: a flee="t" node needs no codeword set to be recognised',
         gates.isEscapeNav(parse('<choice flee="t" section="9"/>'), null) === true);
      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 173: a durable-move retry target survives a save/reload ----------------------
    // Task 169 arms an in-memory "Try again" retry when a durable consequence's target fails.
    // The retry target is now persisted in the visit record, so reloading at the retry screen
    // resumes that screen (the wound/charge already applied) instead of stranding the spent
    // consequence. A malformed target is discarded; a legacy record with no field still loads.
    {
      const tick = () => new Promise((r) => setTimeout(r, 0));
      const retryBtn = (cont) => Array.from(cont.querySelectorAll('button')).find((b) => /Try again/.test(b.textContent));
      const fleeBtn = (cont) => Array.from(cont.querySelectorAll('button')).find((b) => b.textContent.trim() === 'Flee');
      const attackBtn = (cont) => Array.from(cont.querySelectorAll('.btn-roll')).find((b) => /Attack/.test(b.textContent));

      // A flee whose cross-book escape fails, reloaded at the retry screen, then retried to success.
      {
        const secSrcXml = '<section name="FLEE173"><p>A monster.</p><fight name="Ogre" combat="1" defence="30" stamina="20"/><flee><lose stamina="2"/><goto section="745" book="2"/>Run</flee></section>';
        const g = GameState.create({ name:'T173', gender:'m', profession:'Warrior', book:1, adv });
        g.slot = 27; g.data.stamina = g.data.staminaMax;
        const cont = document.createElement('div');
        let story;
        const nav = controllable(g, () => story, parse('<section name="745"><p>Safe.</p></section>'));
        story = new Story(cont, g, { navigate: nav.enter, onDeath(){}, notify(){} });
        g.setVisitProvider(() => story.serializeVisit());
        g.goTo(1, 'FLEE173'); story.begin(parse(secSrcXml), 1, 'FLEE173');
        const stam0 = g.data.stamina;

        fleeBtn(cont).click(); // durable wound applied; the cross-book escape is pending
        nav.pending.reject(); await tick(); // the escape fails → retry armed
        ok('task173: after a failed durable move the retry is armed on screen', !!story._pendingRetry && String(story._pendingRetry.section) === '745' && !!retryBtn(cont));
        ok('task173: the persisted visit record carries the retry target', !!(g.data.visit && g.data.visit.retry) && String(g.data.visit.retry.section) === '745' && Number(g.data.visit.retry.book) === 2);
        ok('task173: the wound is durable (persisted)', g.data.stamina === stam0 - 2);

        // Reload: sanitize the saved blob into a fresh GameState + Story and resume it.
        const g2 = new GameState(sanitizeData(JSON.parse(JSON.stringify(g.data))));
        ok('task173: sanitize keeps the retry target on the visit record', !!(g2.data.visit && g2.data.visit.retry) && String(g2.data.visit.retry.section) === '745');
        const cont2 = document.createElement('div');
        let story2;
        const nav2 = controllable(g2, () => story2, parse('<section name="745"><p>Safe.</p></section>'));
        story2 = new Story(cont2, g2, { navigate: nav2.enter, onDeath(){}, notify(){} });
        g2.setVisitProvider(() => story2.serializeVisit());
        story2.resume(parse(secSrcXml), 1, 'FLEE173', g2.data.visit, null);
        ok('task173: reload restores the retry-only screen (Try again, no Flee/Attack dead-end)',
           !!story2._pendingRetry && !!retryBtn(cont2) && !fleeBtn(cont2) && !attackBtn(cont2));
        ok('task173: reload keeps the wound (resume re-applies nothing)', g2.data.stamina === stam0 - 2);

        retryBtn(cont2).click(); nav2.pending.ok(); await tick(); // the restored retry succeeds
        ok('task173: the restored retry reaches the escape target', story2.section === '745' && Number(g2.data.book) === 2);
        ok('task173: the restored retry did not re-apply the wound (still one)', g2.data.stamina === stam0 - 2);
        ok('task173: the restored retry captured the source as the return frame', !!story2._returnFrame && story2._returnFrame.section === 'FLEE173');
        ok('task173: a successful arrival clears the persisted retry', !story2._pendingRetry && (g2.data.visit == null || g2.data.visit.retry == null));
        deleteSlot(27);
      }

      // Sanitisation boundaries: a valid target survives; a malformed one is dropped; a legacy
      // v1 record with no retry field stays resumable.
      {
        const mk = (retry) => sanitizeData({ abilities:{ combat:5 }, stamina:9, book:1, section:'X', visit:{ v:1, book:1, section:'X', ctx:{}, retry } });
        ok('task173: a valid retry target survives sanitize', !!mk({ book:2, section:'745' }).visit.retry && mk({ book:2, section:'745' }).visit.retry.section === '745' && mk({ book:2, section:'745' }).visit.retry.book === 2);
        ok('task173: a retry with a bad book is discarded', mk({ book:'nope', section:'745' }).visit.retry === null);
        ok('task173: a retry with an empty section is discarded', mk({ book:2, section:'  ' }).visit.retry === null);
        ok('task173: a legacy v1 record with no retry field stays resumable', !!mk(undefined).visit && mk(undefined).visit.retry === null);
      }
    }

    // --- task 117: priced equipment/cargo losses can't arm a reward without taking payment ---
    // §2.90 forfeits a weapon OR armour (price=x) to renounce Elnir; §3.569 trades a named
    // Cargo Unit (price=x) for two textiles. An ineligible forfeit button (no such
    // equipment / the wrong cargo) must stay disabled and never arm the linked reward; an
    // open "?" forfeit with several candidates asks which; a real forfeit takes the exact
    // item and only then opens the reward.
    {
      const sec90 = await data.getSection(2, '90');
      const mk90 = (kinds) => {
        const g = GameState.create({ name:'T90', gender:'m', profession:'Warrior', book:2, adv });
        g.data.items = []; (kinds || []).forEach((it) => g.addItem(it));
        g.data.gods = ['Elnir'];
        const c = document.createElement('div');
        const st = new Story(c, g, { navigate(){}, onDeath(){}, notify(){} });
        g.goTo(2, '90'); st.begin(sec90, 2, '90');
        return { g, c, st };
      };
      const payByText = (c, re) => Array.from(c.querySelectorAll('.pay-action')).find((b) => re.test(b.textContent));

      // No weapon but an armour: the weapon forfeit is disabled, the armour forfeit live,
      // and (because equipment is present) no money-fallback button appears.
      {
        const { g, c } = mk90([makeItem('armour', 'chainmail', 2)]);
        const wBtn = payByText(c, /weapon/i);
        const aBtn = payByText(c, /armour|armor/i);
        ok('task117: §2.90 the weapon forfeit is disabled with no weapon', !!wBtn && wBtn.disabled === true, 'w=' + (wBtn && wBtn.disabled));
        ok('task117: §2.90 the armour forfeit stays live when you own armour', !!aBtn && aBtn.disabled === false, 'a=' + (aBtn && aBtn.disabled));
        ok('task117: §2.90 an ineligible forfeit keeps Elnir until a real payment', g.data.gods.includes('Elnir'));
      }

      // A single weapon: forfeiting it (no picker needed) takes that weapon and deletes Elnir.
      {
        const { g, c } = mk90([makeItem('weapon', 'sword', 1)]);
        const wBtn = payByText(c, /weapon/i);
        ok('task117: §2.90 a single owned weapon makes the forfeit live', !!wBtn && wBtn.disabled === false);
        wBtn.click();
        ok('task117: §2.90 forfeiting the weapon removes it and renounces Elnir',
           g.data.items.length === 0 && !g.data.gods.includes('Elnir'),
           'items=' + g.data.items.length + ' elnir=' + g.data.gods.includes('Elnir'));
      }

      // Several weapons: the forfeit asks WHICH; picking one takes exactly that weapon.
      {
        const { g, c } = mk90([makeItem('weapon', 'dagger', 0), makeItem('weapon', 'greatsword', 3)]);
        const wBtn = payByText(c, /weapon/i);
        ok('task117: §2.90 the forfeit is live with weapons to give up', !!wBtn && wBtn.disabled === false);
        wBtn.click(); // reveal the which-one picker (2 candidates)
        const picks = Array.from(c.querySelectorAll('.forfeit-choice .btn-mini'));
        ok('task117: §2.90 several weapons prompt which to forfeit', picks.length === 2, 'picks=' + picks.length);
        const great = picks.find((b) => /greatsword/i.test(b.textContent));
        great.click();
        ok('task117: §2.90 the chosen weapon is the one taken (dagger kept)',
           g.data.items.length === 1 && g.data.items[0].name === 'dagger' && !g.data.gods.includes('Elnir'),
           'kept=' + g.data.items.map((i)=>i.name).join(','));
      }

      // §3.569 named cargo: a Unit the ship lacks can't arm the textile gain; one it carries can.
      const sec569 = await data.getSection(3, '569');
      const mk569 = (cargo) => {
        const g = GameState.create({ name:'T569', gender:'m', profession:'Warrior', book:3, adv });
        g.data.location = null; // at sea
        g.data.ships = [{ id: 's1', type: 'galleon', name: 'Ship', crew: 'average', cargo: cargo.slice(), docked: null }];
        const c = document.createElement('div');
        const st = new Story(c, g, { navigate(){}, onDeath(){}, notify(){} });
        g.goTo(3, '569'); st.begin(sec569, 3, '569');
        return { g, c, st };
      };
      const cargoBtn = (c, name) => Array.from(c.querySelectorAll('.pay-action')).find((b) => b.textContent.trim().toLowerCase() === name);

      // Ship without furs: the furs trade is disabled and grants no textiles.
      {
        const { g, c } = mk569(['timber']);
        const furs = cargoBtn(c, 'furs');
        const timber = cargoBtn(c, 'timber');
        ok('task117: §3.569 a cargo the ship lacks (furs) is a disabled trade', !!furs && furs.disabled === true, 'furs=' + (furs && furs.disabled));
        ok('task117: §3.569 a cargo the ship carries (timber) is a live trade', !!timber && timber.disabled === false, 'timber=' + (timber && timber.disabled));
        ok('task117: §3.569 no free textiles when the required cargo is absent', !g.data.ships[0].cargo.includes('textiles'));
      }

      // Ship with furs: trading it takes the furs and loads two textiles.
      {
        const { g, c } = mk569(['furs']);
        const furs = cargoBtn(c, 'furs');
        ok('task117: §3.569 the furs trade is live when carried', !!furs && furs.disabled === false);
        furs.click();
        const cargo = g.data.ships[0].cargo;
        ok('task117: §3.569 trading furs removes them and loads two textiles',
           !cargo.includes('furs') && cargo.filter((x) => x === 'textiles').length === 2,
           'cargo=' + cargo.join(','));
      }

      // The DOM-free plan agrees: an absent possession is ineligible; a present one is eligible.
      {
        const gEmpty = GameState.create({ name:'T117p', gender:'m', profession:'Warrior', book:2, adv });
        gEmpty.data.items = [];
        const wLose = parse('<lose weapon="?" price="x">weapon</lose>');
        ok('task117: losePaymentPlan reports an absent weapon forfeit as present-but-ineligible',
           eng.losePaymentPlan(wLose, gEmpty).present === true && eng.losePaymentPlan(wLose, gEmpty).eligible === false);
        gEmpty.addItem(makeItem('weapon', 'axe', 1));
        ok('task117: losePaymentPlan reports an owned weapon forfeit as eligible', eng.losePaymentPlan(wLose, gEmpty).eligible === true);
      }
    }

    // --- task 226: an open possession forfeit must ask WHICH possession leaves ---
    // Task 117's which-one picker reached weapon/armour/tool/cargo but not <lose item="?">:
    // that branch hard-coded needsChoice:false, so applyLose took the first item in the pack.
    // Routing it through the same plan() helper asks the question — while a NAMED forfeit and
    // the item="*" sweep stay choiceless, and a multiple= loss only asks with a spare to spare.
    {
      const mk226 = (xml, items) => {
        const g = GameState.create({ name:'T226', gender:'f', profession:'Warrior', book:4, adv });
        g.data.items = []; g.data.shards = 0; items.forEach((it) => g.addItem(it));
        const c = document.createElement('div');
        new Story(c, g, { navigate(){}, onDeath(){}, notify(){} }).begin(parse(xml), 4, 'x226');
        return { g, c };
      };
      const picks226 = (c) => Array.from(c.querySelectorAll('.forfeit-choice .btn-mini'));
      const names226 = (g) => g.data.items.map((i) => i.name).join(',');
      const openXml = '<section><p><lose item="?" price="k">Give up a possession</lose> for <gain shards="40" flag="k"/>.</p></section>';

      // Two possessions: the payment asks which, takes only the one clicked, then pays out.
      {
        const { g, c } = mk226(openXml, [makeItem('item', 'rope'), makeItem('item', 'lantern')]);
        const pay = c.querySelector('.pay-action');
        ok('task226: an open possession forfeit renders a live pay button and no picker yet',
           !!pay && pay.disabled === false && picks226(c).length === 0,
           pay ? `dis=${pay.disabled} picks=${picks226(c).length}` : 'no pay button');
        pay.click();
        ok('task226: two possessions prompt WHICH one leaves', picks226(c).length === 2, 'picks=' + picks226(c).length);
        ok('task226: nothing is taken or granted before the pick',
           g.data.items.length === 2 && g.data.shards === 0, names226(g) + ' sh=' + g.data.shards);
        picks226(c).find((b) => /lantern/i.test(b.textContent)).click();
        ok('task226: the chosen possession is the one taken (rope kept)',
           names226(g) === 'rope' && g.data.shards === 40, names226(g) + ' sh=' + g.data.shards);
      }

      // A lone qualifying possession is no choice at all: it commits straight away, as before.
      {
        const { g, c } = mk226(openXml, [makeItem('item', 'rope')]);
        c.querySelector('.pay-action').click();
        ok('task226: a lone possession commits with no picker',
           picks226(c).length === 0 && g.data.items.length === 0 && g.data.shards === 40,
           names226(g) + ' sh=' + g.data.shards);
      }

      // A NAMED forfeit is not a choice: it takes that exact item, no question asked.
      {
        const namedXml = '<section><p><lose item="rope" price="k">Hand over the rope</lose> for <gain shards="40" flag="k"/>.</p></section>';
        const { g, c } = mk226(namedXml, [makeItem('item', 'lantern'), makeItem('item', 'rope')]);
        c.querySelector('.pay-action').click();
        ok('task226: a named forfeit takes that item with no picker',
           picks226(c).length === 0 && names226(g) === 'lantern' && g.data.shards === 40, names226(g));
      }

      // The DOM-free plan: the "lose everything" sweep is never a choice, and a multiple= loss
      // asks only when it leaves a spare — its task-160 eligibility threshold is unchanged.
      {
        const g226 = GameState.create({ name:'T226p', gender:'m', profession:'Warrior', book:1, adv });
        g226.data.items = []; ['a', 'b', 'c'].forEach((n) => g226.addItem(makeItem('item', n)));
        const plan226 = (xml) => eng.losePaymentPlan(parse(xml), g226);
        ok('task226: item="*" stays a sweep, never a choice', plan226('<lose item="*"/>').needsChoice === false);
        ok('task226: a multiple= loss taking every match asks nothing',
           plan226('<lose item="?" multiple="3"/>').needsChoice === false);
        ok('task226: a multiple= loss with a spare candidate asks which',
           plan226('<lose item="?" multiple="2"/>').needsChoice === true);
        ok('task226: quantity-aware eligibility is unchanged',
           plan226('<lose item="?" multiple="4"/>').eligible === false
           && plan226('<lose item="?" multiple="3"/>').eligible === true);
      }

      // §4.456 Tambu: the bonus= filter still narrows the pool the picker offers — a +1 item is
      // not a valid answer to the "+2 item" offering (the regression the old routing gave free).
      {
        const g456 = GameState.create({ name:'Tambu', gender:'f', profession:'Warrior', book:4, adv });
        g456.data.items = [];
        [makeItem('item', 'bronze charm', 1), makeItem('item', 'jade idol', 2), makeItem('item', 'silver torc', 2)]
          .forEach((it) => g456.addItem(it));
        const c456 = document.createElement('div');
        new Story(c456, g456, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(4, '456'), 4, '456');
        const pay456 = Array.from(c456.querySelectorAll('.pay-action')).find((b) => /\+2 item/.test(b.textContent));
        ok('task226: §4.456 the +2 offering is live with two +2 items', !!pay456 && pay456.disabled === false);
        pay456.click();
        const offered = picks226(c456).map((b) => b.textContent);
        ok('task226: §4.456 the +2 offering only offers genuinely +2 items',
           offered.length === 2 && !offered.some((t) => /bronze charm/i.test(t)), offered.join('|'));
        picks226(c456).find((b) => /silver torc/i.test(b.textContent)).click();
        ok('task226: §4.456 the +2 item named is the one offered up, and it arms the outcome',
           names226(g456) === 'bronze charm,jade idol' && g456.getFlag('2') === true,
           names226(g456) + ' armed=' + g456.getFlag('2'));
      }

      // §5.152 Holyamu lifts a curse for "any object with a +1 or greater bonus" — the same open
      // forfeit on the choose-one landing, where the menu is armed rather than granted.
      {
        const g152 = GameState.create({ name:'Holy', gender:'m', profession:'Warrior', book:5, adv });
        g152.data.items = [];
        [makeItem('item', 'opal ring', 1), makeItem('item', 'ivory horn', 2)].forEach((it) => g152.addItem(it));
        g152.addCurse('Curse of Ugliness');
        const c152 = document.createElement('div');
        new Story(c152, g152, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(5, '152'), 5, '152');
        const pay152 = Array.from(c152.querySelectorAll('.pay-action')).find((b) => /\+1 or greater/.test(b.textContent));
        ok('task226: §5.152 the object offering is live with two bonus items', !!pay152 && pay152.disabled === false);
        pay152.click();
        ok('task226: §5.152 the curse-lift offering asks which object Holyamu takes',
           picks226(c152).length === 2 && g152.getFlag('curse1') === false,
           'picks=' + picks226(c152).length + ' armed=' + g152.getFlag('curse1'));
        picks226(c152).find((b) => /opal ring/i.test(b.textContent)).click();
        ok('task226: §5.152 the object named is the one given up, and the menu is then armed',
           names226(g152) === 'ivory horn' && g152.getFlag('curse1') === true,
           names226(g152) + ' armed=' + g152.getFlag('curse1'));
      }

      // --- task 238: the choose-one payment's availability must come from its own loss plan ---
      // renderChooseOnePay computed the shared plan but only asked it whether a picker was needed;
      // the enable/disable guard called state.hasItemMatch(item, tags), which knows nothing of the
      // payment's bonus=/group=/multiple= narrowing or the keep rule. So a cursed §5.152 player
      // carrying only a +0 possession saw a live "any object with a +1 or greater bonus" button
      // that found no eligible loss on click: nothing spent, the price flag unarmed, the section
      // rerendered unchanged. The curse is set in every case here so menuWasteReason (task 223)
      // is not what disables the cost — the title says which guard spoke. The two-qualifying-items
      // picker is the task-226 case directly above; §4.634's full-pack barter, which must stay
      // live, is covered by suite-economy's task-223 block.
      {
        const mk238 = async (items) => {
          const g = GameState.create({ name:'T238', gender:'m', profession:'Warrior', book:5, adv });
          g.data.items = []; g.data.shards = 0; items.forEach((it) => g.addItem(it));
          g.addCurse('Curse of Ugliness'); // a reward worth taking, so the menu is not "wasted"
          const c = document.createElement('div');
          new Story(c, g, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(5, '152'), 5, '152');
          const pay = Array.from(c.querySelectorAll('.pay-action')).find((b) => /\+1 or greater/.test(b.textContent));
          return { g, c, pay };
        };

        // Only a +0 possession: the bonus filter matches nothing, so the offering must be inert.
        {
          const { g, c, pay } = await mk238([makeItem('item', 'tin whistle')]);
          ok('task238: §5.152 a +0-only pack cannot pay the +1-or-greater offering',
             !!pay && pay.disabled === true && /nothing to give/i.test(pay.title || ''),
             pay ? `dis=${pay.disabled} title=${pay.title}` : 'no pay button');
          ok('task238: §5.152 nothing is taken and the curse menu stays unarmed',
             names226(g) === 'tin whistle' && g.getFlag('curse1') === false && picks226(c).length === 0,
             names226(g) + ' armed=' + g.getFlag('curse1') + ' picks=' + picks226(c).length);
        }

        // No possession at all: the same plan, the same verdict.
        {
          const { pay } = await mk238([]);
          ok('task238: §5.152 an empty pack cannot pay it either',
             !!pay && pay.disabled === true, pay ? `dis=${pay.disabled}` : 'no pay button');
        }

        // Exactly one qualifying object is no choice: it commits straight away and arms the menu.
        {
          const { g, c, pay } = await mk238([makeItem('item', 'tin whistle'), makeItem('item', 'opal ring', 1)]);
          ok('task238: §5.152 a single qualifying object leaves the offering live',
             !!pay && pay.disabled === false, pay ? `dis=${pay.disabled} title=${pay.title}` : 'no pay button');
          pay.click();
          ok('task238: §5.152 that object is taken with no picker, and the menu is armed',
             picks226(c).length === 0 && names226(g) === 'tin whistle' && g.getFlag('curse1') === true,
             names226(g) + ' armed=' + g.getFlag('curse1') + ' picks=' + picks226(c).length);
        }
      }

      // --- task 228: a multiple= forfeit must collect as many answers as it takes ---
      // Task 226's needsChoice is `openForm(spec) && candidates.length > count`, so multiple="2"
      // over three possessions offers a picker — but a chooser naming ONE item under-charged,
      // because applyLose slices the chooser's own array to count and the price flag armed
      // anyway. The picker now counts up to plan.count before it commits.
      {
        const multiXml = '<section><p><lose item="?" multiple="2" price="k">Give up two possessions</lose> for <gain shards="40" flag="k"/>.</p></section>';
        const { g, c } = mk226(multiXml, [makeItem('item', 'rope'), makeItem('item', 'lantern'), makeItem('item', 'flask')]);
        const label228 = () => (c.querySelector('.forfeit-choice') || {}).textContent || '';
        const pay = c.querySelector('.pay-action');
        ok('task228: a two-item forfeit over three possessions is live and unpicked',
           !!pay && pay.disabled === false && picks226(c).length === 0);
        pay.click();
        ok('task228: it offers every candidate and counts from zero',
           picks226(c).length === 3 && /\(0 of 2 chosen\)/.test(label228()), `picks=${picks226(c).length} lbl=${label228().slice(0, 40)}`);
        picks226(c).find((b) => /lantern/i.test(b.textContent)).click();
        ok('task228: the first pick commits nothing — it strikes that item off and counts up',
           g.data.items.length === 3 && g.data.shards === 0
           && picks226(c).length === 2 && !picks226(c).some((b) => /lantern/i.test(b.textContent))
           && /\(1 of 2 chosen\)/.test(label228()),
           `${names226(g)} sh=${g.data.shards} picks=${picks226(c).length} lbl=${label228().slice(0, 40)}`);
        picks226(c).find((b) => /flask/i.test(b.textContent)).click();
        ok('task228: the second pick takes BOTH named possessions and pays out once',
           names226(g) === 'rope' && g.data.shards === 40, `${names226(g)} sh=${g.data.shards}`);
      }

      // Two possessions of the same name are distinct answers (the picker tracks indices, not
      // identity), so naming both takes both rather than striking the pair off together.
      {
        const multiXml = '<section><p><lose item="?" multiple="2" price="k">Give up two</lose> for <gain shards="40" flag="k"/>.</p></section>';
        const { g, c } = mk226(multiXml, [makeItem('item', 'coin'), makeItem('item', 'coin'), makeItem('item', 'rope')]);
        c.querySelector('.pay-action').click();
        picks226(c).find((b) => /coin/i.test(b.textContent)).click();
        ok('task228: naming one of two identical items leaves the other on offer',
           picks226(c).length === 2 && picks226(c).filter((b) => /coin/i.test(b.textContent)).length === 1,
           picks226(c).map((b) => b.textContent).join('|'));
        picks226(c).find((b) => /coin/i.test(b.textContent)).click();
        ok('task228: both coins leave and the rope is kept', names226(g) === 'rope' && g.data.shards === 40,
           `${names226(g)} sh=${g.data.shards}`);
      }

      // (planner) the count the picker collects is the count the forfeit takes.
      {
        const g228 = GameState.create({ name:'T228p', gender:'m', profession:'Warrior', book:1, adv });
        g228.data.items = []; ['a', 'b', 'c'].forEach((n) => g228.addItem(makeItem('item', n)));
        const plan228 = (xml) => eng.losePaymentPlan(parse(xml), g228);
        ok('task228: an ordinary forfeit reports count 1', plan228('<lose item="?"/>').count === 1);
        ok('task228: a multiple= forfeit reports its own count', plan228('<lose item="?" multiple="2"/>').count === 2);
        ok('task228: the equipment kinds keep count 1', plan228('<lose weapon="?"/>').count === 1);
      }

      // --- task 229: a <group>'s bundled open forfeit must ask which possession leaves ---
      // A group collapses to ONE button and consulted no payment plan: it applied every child
      // effect with an empty options object, so applyLose fell through to its no-chooser branch
      // and took the first item in pack order — on §6.496, whose page prints "decide which item
      // you are handing over" and then gave no way to decide. The picker now runs FIRST and the
      // whole rest of the group — including its <goto> — waits for it.
      {
        const mk229 = (xml, items, shards = 0) => {
          const g = GameState.create({ name:'T229', gender:'m', profession:'Warrior', book:6, adv });
          g.data.items = []; g.data.shards = shards; items.forEach((it) => g.addItem(it));
          const c = document.createElement('div');
          const nav = [];
          new Story(c, g, { navigate(b, s){ nav.push(b + '/' + s); }, onDeath(){}, notify(){} }).begin(parse(xml), 6, 'x229');
          return { g, c, nav };
        };
        const grp229 = (lose) => `<section><p><group force="t"><text>hand it over</text>${lose}<goto section="149"/></group></p></section>`;

        // Two possessions: one button each, only the named one leaves, and the group's <goto>
        // holds until the pick — navigating first would leave the section unchosen.
        {
          const { g, c, nav } = mk229(grp229('<lose item="?"/>'), [makeItem('item', 'rope'), makeItem('item', 'lantern')]);
          const btn = c.querySelector('.group-action');
          ok('task229: the group renders one live button and no picker yet',
             !!btn && btn.disabled === false && picks226(c).length === 0,
             btn ? `dis=${btn.disabled} picks=${picks226(c).length}` : 'no group button');
          btn.click();
          ok('task229: a bundled open forfeit asks which possession leaves, taking nothing yet',
             picks226(c).length === 2 && g.data.items.length === 2 && nav.length === 0,
             `picks=${picks226(c).length} ${names226(g)} nav=${nav.join()}`);
          ok('task229: the group button is spent while the picker is open', btn.disabled === true);
          picks226(c).find((b) => /lantern/i.test(b.textContent)).click();
          ok('task229: the possession named is the one taken, and only then does the group move on',
             names226(g) === 'rope' && nav.join() === '6/149', `${names226(g)} nav=${nav.join()}`);
        }

        // A lone possession is no choice: the click commits and navigates as it always did.
        {
          const { g, c, nav } = mk229(grp229('<lose item="?"/>'), [makeItem('item', 'rope')]);
          c.querySelector('.group-action').click();
          ok('task229: a lone possession commits and navigates on the click',
             picks226(c).length === 0 && g.data.items.length === 0 && nav.join() === '6/149',
             `picks=${picks226(c).length} ${names226(g)} nav=${nav.join()}`);
        }

        // A NAMED forfeit inside a group asks nothing — it takes that exact item, as before.
        {
          const { g, c, nav } = mk229(grp229('<lose item="rope"/>'), [makeItem('item', 'lantern'), makeItem('item', 'rope')]);
          c.querySelector('.group-action').click();
          ok('task229: a named forfeit in a group still asks nothing',
             picks226(c).length === 0 && names226(g) === 'lantern' && nav.join() === '6/149',
             `picks=${picks226(c).length} ${names226(g)}`);
        }

        // A multiple= forfeit stays engine-chosen: §3.273/§3.629 bundle "lose the first 1-6 of
        // your possessions" with the roll that sets the count, and neither page offers a choice.
        {
          const { g, c } = mk229(grp229('<lose item="?" multiple="2"/>'),
            [makeItem('item', 'rope'), makeItem('item', 'lantern'), makeItem('item', 'flask')]);
          c.querySelector('.group-action').click();
          ok('task229: a multiple= group forfeit is never a choice — it still takes the first',
             picks226(c).length === 0 && names226(g) === 'flask', `picks=${picks226(c).length} ${names226(g)}`);
        }

        // §6.496 for real: the priests' donation asks which possession they receive, and the
        // 10% of cash still moves. 91 Shards makes the section's own (shards+9)/10 exactly 10.
        {
          const g496 = GameState.create({ name:'Priest', gender:'f', profession:'Warrior', book:6, adv });
          g496.data.items = []; g496.data.shards = 91;
          [makeItem('item', 'rope'), makeItem('item', 'lantern')].forEach((it) => g496.addItem(it));
          const c496 = document.createElement('div');
          const nav496 = [];
          new Story(c496, g496, { navigate(b, s){ nav496.push(b + '/' + s); }, onDeath(){}, notify(){} })
            .begin(await data.getSection(6, '496'), 6, '496');
          c496.querySelector('.group-action').click();
          ok('task229: §6.496 really asks which item the priests are handed',
             picks226(c496).length === 2 && g496.data.shards === 91,
             `picks=${picks226(c496).length} sh=${g496.data.shards}`);
          picks226(c496).find((b) => /lantern/i.test(b.textContent)).click();
          ok('task229: §6.496 takes the named possession and the 10% donation together',
             names226(g496) === 'rope' && g496.data.shards === 81,
             `${names226(g496)} sh=${g496.data.shards}`);
          const on149 = Array.from(c496.querySelectorAll('button.goto')).find((b) => /149/.test(b.textContent));
          ok('task229: §6.496 still reaches 149 once the donation is made', !!on149);
          on149.click();
          ok('task229: §6.496 turns to 149', nav496.join() === '6/149', nav496.join());
        }
      }

      // --- task 230: a collapsed <group> must apply its <adjustmoney> child ---
      // groupPlan's effects selector omitted adjustmoney (and disease/poison), and an action
      // group renders ONLY its button — it never walks its children — so the tag was silently
      // dropped. §2.134's wager applied its cache unlock and none of its four payouts: the
      // stake came back intact on every roll, so gambling could neither lose nor win.
      {
        // A synthetic collapsed group scales the named pot on the click.
        {
          const g = GameState.create({ name:'T230', gender:'m', profession:'Warrior', book:2, adv });
          g.setCacheMoney('pot', 10);
          const c = document.createElement('div');
          new Story(c, g, { navigate(){}, onDeath(){}, notify(){} }).begin(parse(
            '<section><p><group force="t"><text>double the pot</text>'
            + '<adjustmoney name="pot" multiply="2"/><tick special="unlock" cache="pot"/></group></p></section>'), 2, 'x230');
          const btn = c.querySelector('.group-action');
          ok('task230: a group carrying only book-keeping still renders its button',
             !!btn && g.cacheMoney('pot') === 10, btn ? 'pot=' + g.cacheMoney('pot') : 'no group button');
          btn.click();
          ok('task230: the click applies the bundled <adjustmoney>, not just its siblings',
             g.cacheMoney('pot') === 20 && g.isCacheLocked('pot') === false, 'pot=' + g.cacheMoney('pot'));
        }

        // §2.134 for real — the Gamblers' Guild wager, staked at 10 Shards. Snake eyes wipes
        // the stake; boxcars pays it back doubled. Both used to leave it untouched.
        {
          window.__FL_INSTANT_DICE__ = true;
          const rnd230 = Math.random;
          const settle230 = () => new Promise((r) => setTimeout(r, 30));
          const wager = async (roll) => {
            const g = GameState.create({ name:'Punter', gender:'f', profession:'Warrior', book:2, adv });
            g.data.shards = 50;
            g.depositCacheMoney('2.134', 10);
            const c = document.createElement('div');
            new Story(c, g, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(2, '134'), 2, '134');
            Math.random = roll;
            c.querySelector('.btn-roll').click();
            await settle230();
            const payout = c.querySelector('.group-action');
            return { g, c, payout };
          };

          const lost = await wager(() => 0); // 1+1 = 2 → "Lose your entire stake" (×0)
          ok('§2.134 snake eyes offers the "lose your stake" payout',
             !!lost.payout && /entire stake/i.test(lost.payout.textContent) && lost.g.cacheMoney('2.134') === 10,
             lost.payout ? lost.payout.textContent : 'no payout button');
          lost.payout.click();
          ok('task230: §2.134 taking the losing outcome really empties the pot',
             lost.g.cacheMoney('2.134') === 0 && lost.g.data.shards === 40,
             `pot=${lost.g.cacheMoney('2.134')} sh=${lost.g.data.shards}`);

          const won = await wager(() => 0.9); // 6+6 = 12 → "Get back stake plus 100%" (×2)
          ok('§2.134 boxcars offers the doubling payout',
             !!won.payout && /plus 100%/i.test(won.payout.textContent),
             won.payout ? won.payout.textContent : 'no payout button');
          won.payout.click();
          ok('task230: §2.134 taking the winning outcome really doubles the pot',
             won.g.cacheMoney('2.134') === 20 && won.g.isCacheLocked('2.134') === false,
             `pot=${won.g.cacheMoney('2.134')} locked=${won.g.isCacheLocked('2.134')}`);

          Math.random = rnd230;
          window.__FL_INSTANT_DICE__ = false;
        }
      }

      // --- task 231: a bare <lose item="?"> hazard must ask which possession leaves ---
      // The five payment paths ask (tasks 117/226/228/229); the ORDINARY passive effect —
      // no price=, no flag=, no force="f", no <group> — consulted no plan and committed with
      // the chooser explicitly nulled, so applyLose took the first in pack order. Six published
      // pages print the choice in so many words. The rule is the narrowing: an unmarked open
      // forfeit is the player's pick, a tags=/bonus=/using=/group= one is the filter's, and the
      // three sweeps whose pages state the order carry choose="f" in the source.
      {
        const bare231 = (attrs = '') => `<section><p>A thief. <lose item="?"${attrs}>steals one item</lose> (your choice)</p></section>`;

        // Two possessions: one button each, nothing taken until one is clicked.
        {
          const { g, c } = mk226(bare231(), [makeItem('item', 'rope'), makeItem('item', 'lantern')]);
          ok('task231: a bare open forfeit asks which possession leaves, taking nothing yet',
             picks226(c).length === 2 && g.data.items.length === 2,
             `picks=${picks226(c).length} ${names226(g)}`);
          ok('task231: the effect still prints its own words', /steals one item/.test(c.textContent), c.textContent.trim().slice(0, 60));
          picks226(c).find((b) => /lantern/i.test(b.textContent)).click();
          ok('task231: the possession named is the one taken (rope kept)', names226(g) === 'rope', names226(g));
        }

        // The commit is durable across the re-render: the picker is gone and nothing else goes.
        {
          const { g, c } = mk226(bare231(), [makeItem('item', 'rope'), makeItem('item', 'lantern'), makeItem('item', 'flask')]);
          picks226(c).find((b) => /flask/i.test(b.textContent)).click();
          ok('task231: the pick is spent — no second picker and no second loss',
             picks226(c).length === 0 && names226(g) === 'rope,lantern', `picks=${picks226(c).length} ${names226(g)}`);
        }

        // A lone possession is no choice at all: it commits on entry, exactly as before.
        {
          const { g, c } = mk226(bare231(), [makeItem('item', 'rope')]);
          ok('task231: a lone possession commits with no picker',
             picks226(c).length === 0 && g.data.items.length === 0, `picks=${picks226(c).length} ${names226(g)}`);
        }

        // A tags= narrowing IS the choice — the candle burns (§1.164, §2.440, §3.25 …) must
        // not start asking which candle, and a hidden forfeit has no control to hang a picker on.
        {
          const candles = () => [makeItem('item', 'candle', 0, null, ['light', 'useonce']),
                                 makeItem('item', 'candle', 0, null, ['light', 'useonce']),
                                 makeItem('item', 'rope')];
          const { g, c } = mk226(bare231(' tags="light,useonce"'), candles());
          ok('task231: a tags=-narrowed forfeit asks nothing and burns the first match',
             picks226(c).length === 0 && names226(g) === 'candle,rope', `picks=${picks226(c).length} ${names226(g)}`);
          const hid = mk226('<section><p><lose hidden="t" item="?"/></p></section>',
                            [makeItem('item', 'rope'), makeItem('item', 'lantern')]);
          ok('task231: a hidden forfeit asks nothing',
             picks226(hid.c).length === 0 && names226(hid.g) === 'lantern', `picks=${picks226(hid.c).length} ${names226(hid.g)}`);
        }

        // multiple= on this path IS a choice (§4.131 "up to six items (your choice)"): the
        // shared picker collects that many answers before it commits.
        {
          const { g, c } = mk226(bare231(' multiple="2"'),
            [makeItem('item', 'rope'), makeItem('item', 'lantern'), makeItem('item', 'flask')]);
          const lbl = () => (c.querySelector('.forfeit-choice') || {}).textContent || '';
          ok('task231: a multiple= hazard offers every candidate and counts from zero',
             picks226(c).length === 3 && /\(0 of 2 chosen\)/.test(lbl()), `picks=${picks226(c).length} lbl=${lbl().slice(0, 40)}`);
          picks226(c).find((b) => /lantern/i.test(b.textContent)).click();
          ok('task231: the first pick takes nothing yet', g.data.items.length === 3 && /\(1 of 2 chosen\)/.test(lbl()),
             `${names226(g)} lbl=${lbl().slice(0, 40)}`);
          picks226(c).find((b) => /flask/i.test(b.textContent)).click();
          ok('task231: the second pick takes BOTH named possessions', names226(g) === 'rope', names226(g));
        }

        // choose="f" pins a sweep the page states the order of — nothing else in the markup
        // separates §2.248's "the ones listed first" from §4.131's "(your choice)".
        {
          const { g, c } = mk226(bare231(' multiple="2" choose="f"'),
            [makeItem('item', 'rope'), makeItem('item', 'lantern'), makeItem('item', 'flask')]);
          ok('task231: a choose="f" forfeit stays a sweep — the first two, no picker',
             picks226(c).length === 0 && names226(g) === 'flask', `picks=${picks226(c).length} ${names226(g)}`);
        }

        // (planner) the rule, DOM-free: unmarked open forfeits ask, narrowed and marked ones
        // don't, and the equipment/cargo kinds keep their old behaviour on this path.
        {
          const g231 = GameState.create({ name:'T231p', gender:'f', profession:'Warrior', book:1, adv });
          g231.data.items = [];
          [makeItem('item', 'a'), makeItem('item', 'b'), makeItem('weapon', 'axe', 1), makeItem('weapon', 'club')]
            .forEach((it) => g231.addItem(it));
          const needs = (xml) => rules.needsForfeitChoice(parse(xml), g231);
          ok('task231: an unmarked open forfeit with a spare candidate asks', needs('<lose item="?"/>') === true);
          ok('task231: a blank spec is the same open form', needs('<lose item=""/>') === true);
          ok('task231: a named forfeit never asks', needs('<lose item="a"/>') === false);
          ok('task231: the item="*" sweep never asks', needs('<lose item="*"/>') === false);
          ok('task231: choose="f" never asks', needs('<lose item="?" choose="f"/>') === false);
          ok('task231: a tags=/bonus=/group= narrowing never asks',
             needs('<lose item="?" tags="light"/>') === false && needs('<lose item="?" bonus="2"/>') === false
             && needs('<lose item="?" group="5.578"/>') === false);
          ok('task231: an open weapon forfeit is out of scope on this path', needs('<lose weapon="?"/>') === false);
          ok('task231: a multiple= forfeit taking every possession has nothing to ask',
             needs('<lose item="?" multiple="4"/>') === false);
        }

        // §4.468 for real: the villa thief takes one of the STORED possessions, and the
        // carried pack is never offered — the cache pool makes a wrong pick most visible.
        {
          window.__FL_INSTANT_DICE__ = true;
          const rnd231 = Math.random;
          const settle231 = () => new Promise((r) => setTimeout(r, 30));
          const g468 = GameState.create({ name:'Villa', gender:'m', profession:'Warrior', book:4, adv });
          g468.data.items = [];
          g468.addItem(makeItem('item', 'carried rope'));
          g468.cacheAddItem('4.468', makeItem('item', 'jade idol'));
          g468.cacheAddItem('4.468', makeItem('item', 'silver torc'));
          const c468 = document.createElement('div');
          new Story(c468, g468, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(4, '468'), 4, '468');
          Math.random = () => 0.99; // 6+6 = 12 → "A thief."
          c468.querySelector('.btn-roll').click();
          await settle231();
          const offered = picks226(c468).map((b) => b.textContent).join('|');
          ok('task231: §4.468 asks which STORED possession the thief takes',
             picks226(c468).length === 2 && !/carried rope/i.test(offered), `picks=${picks226(c468).length} ${offered}`);
          picks226(c468).find((b) => /silver torc/i.test(b.textContent)).click();
          ok('task231: §4.468 takes the stored possession named and leaves the pack alone',
             g468.cacheItems('4.468').map((i) => i.name).join(',') === 'jade idol' && names226(g468) === 'carried rope',
             `${g468.cacheItems('4.468').map((i) => i.name).join(',')} / ${names226(g468)}`);

          // §6.373: the count is the die, so the picker asks for exactly x of them.
          const g373 = GameState.create({ name:'Windy', gender:'f', profession:'Warrior', book:6, adv });
          g373.data.items = [];
          ['a', 'b', 'c', 'd', 'e'].forEach((n) => g373.addItem(makeItem('item', n)));
          const c373 = document.createElement('div');
          new Story(c373, g373, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(6, '373'), 6, '373');
          ok('task231: §6.373 asks nothing until the die that sets the count is rolled', picks226(c373).length === 0);
          Math.random = () => 0.5; // 1 + floor(0.5*6) = 4
          c373.querySelector('.btn-roll').click();
          await settle231();
          const lbl373 = () => (c373.querySelector('.forfeit-choice') || {}).textContent || '';
          ok('task231: §6.373 asks for as many possessions as the die came to',
             picks226(c373).length === 5 && /\(0 of 4 chosen\)/.test(lbl373()),
             `picks=${picks226(c373).length} lbl=${lbl373().slice(0, 40)}`);
          ['e', 'd', 'c', 'b'].forEach((n) => picks226(c373).find((b) => b.textContent === n).click());
          ok('task231: §6.373 tears away the four named and leaves the one held on to',
             names226(g373) === 'a', names226(g373));

          // §2.248 for real: "the items stolen are the ones listed first" — still a sweep.
          const g248 = GameState.create({ name:'Elfin', gender:'m', profession:'Warrior', book:2, adv });
          g248.data.items = [];
          ['a', 'b', 'c'].forEach((n) => g248.addItem(makeItem('item', n)));
          const c248 = document.createElement('div');
          new Story(c248, g248, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(2, '248'), 2, '248');
          Math.random = () => 0.2; // 1 + floor(0.2*6) = 2
          c248.querySelector('.btn-roll').click();
          await settle231();
          ok('task231: §2.248 still takes the ones listed first, with no picker',
             picks226(c248).length === 0 && names226(g248) === 'c', `picks=${picks226(c248).length} ${names226(g248)}`);

          // §4.116 is ONE three-item pick, not three one-item pickers for one printed sentence.
          const g116 = GameState.create({ name:'Kelpie', gender:'f', profession:'Warrior', book:4, adv });
          g116.data.items = [];
          ['a', 'b', 'c', 'd'].forEach((n) => g116.addItem(makeItem('item', n)));
          const c116 = document.createElement('div');
          new Story(c116, g116, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(4, '116'), 4, '116');
          const lbl116 = () => (c116.querySelector('.forfeit-choice') || {}).textContent || '';
          ok('task231: §4.116 asks once for the three items its page says are the player\'s choice',
             c116.querySelectorAll('.forfeit-choice').length === 1 && /\(0 of 3 chosen\)/.test(lbl116()),
             `boxes=${c116.querySelectorAll('.forfeit-choice').length} lbl=${lbl116().slice(0, 40)}`);
          ['d', 'c', 'b'].forEach((n) => picks226(c116).find((b) => b.textContent === n).click());
          ok('task231: §4.116 crosses off exactly the three named', names226(g116) === 'a', names226(g116));

          Math.random = rnd231;
          window.__FL_INSTANT_DICE__ = false;
        }
      }

      // --- task 232: the same bare hazard must ask which CARGO UNIT leaves ---
      // Task 231 scoped needsForfeitChoice to item=, so <lose cargo="?"> on the plain path
      // kept taking the first Unit aboard — in 13 published sections that print the choice
      // ("of your choice" §1.397 and its twins, "you choose which was lost" §2.534, "you can
      // choose which is lost" §3.629). Which Unit goes is an economic decision: the goods sell
      // for different prices per port. group= also stops counting as a narrowing here — it
      // selects by provenance, not by a property the sentence names.
      {
        const mk232 = (xml, cargo) => {
          const g = GameState.create({ name:'T232', gender:'m', profession:'Warrior', book:1, adv });
          g.data.items = []; g.data.location = null; // at sea
          g.data.ships = [{ id:'s1', type:'barque', name:'Ship', crew:'average', cargo: cargo.slice(), docked:null }];
          const c = document.createElement('div');
          new Story(c, g, { navigate(){}, onDeath(){}, notify(){} }).begin(parse(xml), 1, 'x232');
          return { g, c };
        };
        const hold232 = (g) => g.data.ships[0].cargo.join(',');
        const bare232 = '<section><p>Much was swept overboard - you <lose cargo="?">lose 1 Cargo Unit</lose>, of your choice.</p></section>';

        // Two Units: one button each, and only the named good goes over the side.
        {
          const { g, c } = mk232(bare232, ['timber', 'spices']);
          ok('task232: a bare cargo forfeit asks which Unit leaves, taking nothing yet',
             picks226(c).length === 2 && hold232(g) === 'timber,spices', `picks=${picks226(c).length} ${hold232(g)}`);
          picks226(c).find((b) => /spices/i.test(b.textContent)).click();
          ok('task232: the Unit named is the one lost', hold232(g) === 'timber', hold232(g));
        }

        // A single Unit is no choice, and two of the same good leave one behind.
        {
          const { g, c } = mk232(bare232, ['timber']);
          ok('task232: a lone Cargo Unit commits with no picker',
             picks226(c).length === 0 && hold232(g) === '', `picks=${picks226(c).length} ${hold232(g)}`);
          const twin = mk232(bare232, ['timber', 'timber']);
          picks226(twin.c)[0].click();
          ok('task232: two Units of one good lose exactly one', hold232(twin.g) === 'timber', hold232(twin.g));
        }

        // §1.397 for real — the storm row whose page says "of your choice".
        {
          const g397 = GameState.create({ name:'Storm', gender:'f', profession:'Warrior', book:1, adv });
          g397.data.items = []; g397.data.location = null;
          g397.data.ships = [{ id:'s1', type:'barque', name:'Ship', crew:'average', cargo:['furs', 'timber'], docked:null }];
          const c397 = document.createElement('div');
          new Story(c397, g397, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(1, '397'), 1, '397');
          ok('task232: §1.397 asks which Cargo Unit the storm takes', picks226(c397).length === 2, 'picks=' + picks226(c397).length);
          picks226(c397).find((b) => /furs/i.test(b.textContent)).click();
          ok('task232: §1.397 sweeps the Unit named overboard', g397.data.ships[0].cargo.join(',') === 'timber',
             g397.data.ships[0].cargo.join(','));
        }

        // (planner) cargo joins the rule, group= leaves the narrowers, equipment stays out.
        {
          const g232 = GameState.create({ name:'T232p', gender:'m', profession:'Warrior', book:5, adv });
          g232.data.items = []; g232.data.location = null;
          [makeItem('tool', 'silver holy symbol', 2, 'sanctity', [], [], '5.578'),
           makeItem('weapon', 'fine sabre', 2, null, [], [], '5.578'),
           makeItem('item', 'Uttakin telescope', 0, null, [], [], '5.578'),
           makeItem('item', 'rope')].forEach((it) => g232.addItem(it));
          g232.data.ships = [{ id:'s1', type:'barque', name:'Ship', crew:'average', cargo:['furs', 'timber'], docked:null }];
          const needs232 = (xml) => rules.needsForfeitChoice(parse(xml), g232);
          ok('task232: an open cargo forfeit with a spare Unit asks', needs232('<lose cargo="?"/>') === true);
          ok('task232: a named cargo forfeit never asks', needs232('<lose cargo="furs"/>') === false);
          ok('task232: the equipment kinds stay engine-chosen on this path',
             needs232('<lose weapon="?"/>') === false && needs232('<lose armour="?"/>') === false);
          ok('task232: a group= forfeit asks which of that award\'s items leaves',
             needs232('<lose item="?" group="5.578"/>') === true);
          ok('task232: the group= pool is that award only, not the whole pack',
             eng.losePaymentPlan(parse('<lose item="?" group="5.578"/>'), g232).candidates.length === 3);
          ok('task232: choose="f" still pins a cargo sweep', needs232('<lose cargo="?" choose="f"/>') === false);
        }
      }

      // --- task 233: an open forfeit must not settle against a pool still being filled ---
      // §5.578 awards three items behind Take buttons and then charges "one of the items you
      // found" as the Brotherhood's cut. On the render that walked the <lose> the pack held
      // none of them: applyLose took nothing and the 'apply' memo banked that no-op, so the
      // player kept all three and paid only the 100 Shards. An open forfeit therefore waits
      // while its pool is empty, or while an award of its own group= is still untaken.
      {
        const takes233 = (c) => Array.from(c.querySelectorAll('.take-item')).filter((b) => !b.disabled);
        const mk233 = (xml, items) => {
          const g = GameState.create({ name:'T233', gender:'m', profession:'Warrior', book:1, adv });
          g.data.items = []; items.forEach((it) => g.addItem(it));
          const c = document.createElement('div');
          new Story(c, g, { navigate(){}, onDeath(){}, notify(){} }).begin(parse(xml), 1, 'x233');
          return { g, c };
        };

        // §5.578 end to end: nothing is settled until the loot is actually in the pack.
        {
          const g578 = GameState.create({ name:'Thief', gender:'f', profession:'Warrior', book:5, adv });
          g578.data.items = []; g578.data.shards = 500;
          const c578 = document.createElement('div');
          new Story(c578, g578, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(5, '578'), 5, '578');
          ok('task233: §5.578 asks nothing while its three items sit behind Take buttons',
             picks226(c578).length === 0 && takes233(c578).length === 3,
             `picks=${picks226(c578).length} takes=${takes233(c578).length}`);
          for (let i = 0; i < 3 && takes233(c578).length; i++) takes233(c578)[0].click();
          ok('task233: §5.578 asks which of the three the Brotherhood receives once all are taken',
             picks226(c578).length === 3 && g578.data.items.length === 3,
             `picks=${picks226(c578).length} ${names226(g578)}`);
          picks226(c578).find((b) => /sabre/i.test(b.textContent)).click();
          ok('task233: §5.578 hands over exactly the item named and keeps the other two',
             names226(g578) === 'silver holy symbol,Uttakin telescope', names226(g578));
          ok('task233: §5.578 charges the 100 Shards on top of the donated item',
             g578.data.shards === 600, 'shards=' + g578.data.shards);
        }

        // A bare forfeit over an empty pack must not lock itself out — the possession the
        // section hands over afterwards still owes it.
        {
          const { g, c } = mk233('<section><p>Find a <item name="rope"/>. A thief <lose item="?">steals one item</lose>.</p></section>', []);
          ok('task233: an open forfeit over an empty pack takes nothing and asks nothing',
             picks226(c).length === 0 && g.data.items.length === 0 && /steals one item/.test(c.textContent),
             `picks=${picks226(c).length} ${names226(g)}`);
          c.querySelector('.take-item').click();
          ok('task233: the possession gained later in the same section still answers the forfeit',
             g.data.items.length === 0, names226(g));
        }

        // The reverse: an effect that legitimately takes nothing is still spent, so it cannot
        // stand open and eat what the section hands over next.
        {
          const sweep = mk233('<section><p><lose item="*">Lose all your possessions</lose>. Then find a <item name="rope"/>.</p></section>', []);
          sweep.c.querySelector('.take-item').click();
          ok('task233: an item="*" sweep over an empty pack stays spent', names226(sweep.g) === 'rope', names226(sweep.g));
          const named = mk233('<section><p><lose item="rope">Cross off the rope</lose>. Then find a <item name="rope"/>.</p></section>', []);
          named.c.querySelector('.take-item').click();
          ok('task233: a named forfeit that matched nothing stays spent too', names226(named.g) === 'rope', names226(named.g));
        }

        // (planner) the rule, DOM-free: which open forfeits wait, and until when.
        {
          const g233 = GameState.create({ name:'T233p', gender:'m', profession:'Warrior', book:5, adv });
          g233.data.items = [];
          const sec578 = await data.getSection(5, '578');
          const view233 = (sec = null) => ({ state: g233, sectionEl: sec, ctx: visit.newCtx() });
          const pending = (xml) => rules.forfeitPoolPending(parse(xml), view233());
          const cut = () => rules.forfeitPoolPending(sec578.querySelector('lose[item="?"]'), view233(sec578));
          ok('task233: an open forfeit over an empty pack is held', pending('<lose item="?"/>') === true);
          ok('task233: the item="*" sweep is never held', pending('<lose item="*"/>') === false);
          ok('task233: a named forfeit is never held', pending('<lose item="rope"/>') === false);
          ok('task233: a cache= forfeit settles against what was left there, empty or not',
             pending('<lose item="?" cache="4.468"/>') === false);
          ok('task233: §5.578 holds its cut while the loot is untaken', cut() === true);
          g233.addItem(makeItem('tool', 'silver holy symbol', 2, 'sanctity', [], [], '5.578'));
          ok('task233: §5.578 still holds after ONE item — it would donate that one unasked', cut() === true);
          g233.addItem(makeItem('weapon', 'fine sabre', 2, null, [], [], '5.578'));
          g233.addItem(makeItem('item', 'Uttakin telescope', 0, null, [], [], '5.578'));
          ok('task233: §5.578 releases its cut once all three are in the pack', cut() === false);
          ok('task233: an open forfeit over a pack with something in it is never held',
             pending('<lose item="?"/>') === false);
        }
      }

      // --- task 234: choose="best" — §6.36 strips the BEST weapon and armour ---
      // "She strips you of your best armour, your best weapon": loseEquipmentCandidates applied
      // no ordering, so loseEquipment took cands[0] — the first of that kind in acquisition
      // order — and a player carrying a rusty sword and a +3 blade lost the rusty one. The page
      // states the rule, so this is NOT the task-231/232 picker: it is the choose= marker that
      // names what leaves, with "best" taking its place beside the existing "f".
      {
        const mk234 = (items) => {
          const g = GameState.create({ name:'T234', gender:'m', profession:'Warrior', book:6, adv });
          g.data.items = []; g.data.shards = 120; items.forEach((it) => g.addItem(it));
          return g;
        };
        const gear234 = () => [makeItem('weapon', 'rusty sword', 0), makeItem('weapon', 'runeblade', 3),
                               makeItem('armour', 'leather jerkin', 1), makeItem('armour', 'dwarf mail', 4)];
        const kit234 = (g) => g.data.items.map((i) => i.name).join(',');

        // §6.36 for real: the worst of each kind is what the player keeps.
        {
          const g36 = mk234(gear234());
          const c36 = document.createElement('div');
          new Story(c36, g36, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(6, '36'), 6, '36');
          ok('task234: §6.36 takes the BEST weapon and the BEST armour, not the first of each',
             kit234(g36) === 'rusty sword,leather jerkin', kit234(g36));
          ok('task234: §6.36 still empties the purse and asks nothing',
             g36.data.shards === 0 && c36.querySelectorAll('.forfeit-choice').length === 0,
             `shards=${g36.data.shards} picks=${c36.querySelectorAll('.forfeit-choice').length}`);
        }

        // A single piece of a kind is still taken, and a kind the player lacks is left alone.
        {
          const g1 = mk234([makeItem('weapon', 'rusty sword', 0)]);
          const c1 = document.createElement('div');
          new Story(c1, g1, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(6, '36'), 6, '36');
          ok('task234: §6.36 takes a lone weapon and passes over the armour the player lacks',
             kit234(g1) === '', kit234(g1));
        }

        // (planner) the marker, DOM-free: it orders the shared candidate list, ties keep
        // acquisition order, and an unmarked forfeit is untouched.
        {
          const g234 = mk234(gear234());
          const cands = (xml) => eng.losePaymentPlan(parse(xml), g234).candidates.map((i) => i.name).join(',');
          ok('task234: choose="best" puts the highest bonus first',
             cands('<lose weapon="?" choose="best"/>') === 'runeblade,rusty sword',
             cands('<lose weapon="?" choose="best"/>'));
          ok('task234: an unmarked equipment forfeit keeps acquisition order',
             cands('<lose weapon="?"/>') === 'rusty sword,runeblade', cands('<lose weapon="?"/>'));
          const gTie = mk234([makeItem('weapon', 'first axe', 2), makeItem('weapon', 'second axe', 2)]);
          ok('task234: equal bonuses keep the order they were acquired in',
             eng.losePaymentPlan(parse('<lose weapon="?" choose="best"/>'), gTie)
               .candidates.map((i) => i.name).join(',') === 'first axe,second axe');
          ok('task234: a kept possession is still spared by the best-of rule',
             eng.losePaymentPlan(parse('<lose weapon="?" choose="best"/>'),
                                 mk234([makeItem('weapon', 'rusty sword', 0), makeItem('weapon', 'white sword', 3, null, ['keep'])]))
               .candidates.map((i) => i.name).join(',') === 'rusty sword');
        }
      }

      // --- task 251: a standing picker must hold the section's exits ---
      // Task 107 decided the rule for the mandatory <transfer> — a visible, forced action the
      // page prints no choice about *whether* holds the onward navigation until it runs — and
      // it was never written for the picker. renderForfeitChoice stands the picker and returns,
      // deliberately leaving its fx@ memo open so the loss can commit on the pick; the exit
      // beside it had nothing to consult, so §4.116's Continue was live from entry and leaving
      // took nothing. The three sibling pickers on the same passive path are measured with it.
      {
        // §4.116 for real: five possessions, three to cross off, and one printed exit.
        {
          const g116 = GameState.create({ name:'Kelpie2', gender:'f', profession:'Warrior', book:4, adv });
          g116.data.items = [];
          ['a', 'b', 'c', 'd', 'e'].forEach((n) => g116.addItem(makeItem('item', n)));
          const c116 = document.createElement('div');
          new Story(c116, g116, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(4, '116'), 4, '116');
          const exit116 = () => c116.querySelector('.goto');
          ok('task251: §4.116 holds its only exit while the three-item choice stands',
             !!exit116() && exit116().disabled === true && /choice above/i.test(exit116().title || ''),
             exit116() ? `dis=${exit116().disabled} title=${exit116().title}` : 'no exit');
          ok('task251: the picker itself is never gated — it is the way to settle it',
             picks226(c116).length === 5 && picks226(c116).every((b) => !b.disabled), `picks=${picks226(c116).length}`);
          ok('task251: a held picker is not a dead end', !c116.querySelector('.end-fate'));
          ['e', 'd'].forEach((n) => picks226(c116).find((b) => b.textContent === n).click());
          ok('task251: a part-answered pick keeps the exit held', !!exit116() && exit116().disabled === true);
          picks226(c116).find((b) => b.textContent === 'c').click();
          ok('task251: the three named leave, and only those three', names226(g116) === 'a,b', names226(g116));
          ok('task251: answering releases the exit', !!exit116() && exit116().disabled === false,
             exit116() ? 'dis=' + exit116().disabled : 'no exit');
        }

        // The negative the rule turns on: one candidate is no choice at all, so the forfeit
        // commits on entry and the exit is left exactly as it was.
        {
          const { g, c } = mk226('<section><p>A thief <lose item="?">steals one item</lose> (your choice).</p><p><goto section="9"/></p></section>',
                                 [makeItem('item', 'rope')]);
          const exit = c.querySelector('.goto');
          ok('task251: a forfeit with a single candidate asks nothing and leaves the exit live',
             picks226(c).length === 0 && g.data.items.length === 0 && !!exit && exit.disabled === false,
             exit ? `picks=${picks226(c).length} dis=${exit.disabled}` : 'no exit');
        }

        // Keyed on the picker RENDERING, never on needsForfeitChoice: a forfeit inside an
        // untaken (grayed) branch stands no picker, so it must not lock a section that then
        // has no way to settle it — the constraint pendingRerollDecision documents.
        {
          const { g, c } = mk226('<section><p><if codeword="Nobody"><lose item="?">a thief takes one</lose></if></p><p><goto section="9"/></p></section>',
                                 [makeItem('item', 'rope'), makeItem('item', 'lantern')]);
          const exit = c.querySelector('.goto');
          ok('task251: a forfeit inside an untaken branch locks nothing',
             picks226(c).length === 0 && names226(g) === 'rope,lantern' && !!exit && exit.disabled === false,
             exit ? `picks=${picks226(c).length} dis=${exit.disabled} ${names226(g)}` : 'no exit');
        }

        // Giving up is never locked behind the thing you are giving up on (tasks 205/250).
        {
          const { c } = mk226('<section><p>A thief <lose item="?">steals one item</lose>.</p><choices><choice section="9" flee="t">Run for it</choice><choice section="10">Stay</choice></choices></section>',
                              [makeItem('item', 'rope'), makeItem('item', 'lantern')]);
          const flee = Array.from(c.querySelectorAll('.choice')).find((b) => /Run for it/.test(b.textContent));
          const stay = Array.from(c.querySelectorAll('.choice')).find((b) => /Stay/.test(b.textContent));
          ok('task251: the flee exit stays clickable while the picker stands',
             !!flee && flee.disabled === false && !!stay && stay.disabled === true,
             `flee=${flee && flee.disabled} stay=${stay && stay.disabled}`);
        }

        // The siblings on the same passive path measure the same. The ability picker is the
        // biggest of them (six published pages award "add one to the ability of your choice"),
        // and skipping it threw the point away for good.
        {
          const { g, c } = mk226('<section><p><gain ability="?" amount="1">add one to the ability of your choice</gain>.</p><p><goto section="9"/></p></section>', []);
          const exit = () => c.querySelector('.goto');
          const abPicks = () => Array.from(c.querySelectorAll('.ability-pick'));
          ok('task251: an open ability award holds the exit until the point is placed',
             abPicks().length > 0 && !!exit() && exit().disabled === true,
             `picks=${abPicks().length} dis=${exit() && exit().disabled}`);
          const before = g.data.abilities.combat;
          abPicks().find((b) => /COMBAT/i.test(b.textContent)).click();
          ok('task251: placing it awards the point and releases the exit',
             g.data.abilities.combat === before + 1 && !!exit() && exit().disabled === false,
             `combat=${g.data.abilities.combat} dis=${exit() && exit().disabled}`);
        }

        // §6.118's "you must choose a new profession" — the printed word is *must*.
        {
          const g118 = GameState.create({ name:'Dragon', gender:'m', profession:'Priest', book:6, adv });
          g118.data.items = []; g118.addItem(makeItem('item', 'tatsu pearl'));
          const c118 = document.createElement('div');
          new Story(c118, g118, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(6, '118'), 6, '118');
          const exit118 = () => c118.querySelector('.goto');
          const profPicks = () => Array.from(c118.querySelectorAll('.ability-pick'));
          ok('task251: §6.118 holds its exit while an ex-Priest has no profession chosen',
             profPicks().length === 5 && !!exit118() && exit118().disabled === true,
             `picks=${profPicks().length} dis=${exit118() && exit118().disabled}`);
          profPicks().find((b) => /Rogue/i.test(b.textContent)).click();
          ok('task251: choosing one sets it and releases the exit',
             g118.data.profession.toLowerCase() === 'rogue' && !!exit118() && exit118().disabled === false,
             `prof=${g118.data.profession} dis=${exit118() && exit118().disabled}`);

          // …and a player who was never a Priest is asked nothing, so nothing is held.
          const gW = GameState.create({ name:'Wayf', gender:'f', profession:'Wayfarer', book:6, adv });
          gW.data.items = []; gW.addItem(makeItem('item', 'tatsu pearl'));
          const cW = document.createElement('div');
          new Story(cW, gW, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(6, '118'), 6, '118');
          ok('task251: §6.118 asks a non-Priest nothing and leaves the exit live',
             cW.querySelectorAll('.ability-pick').length === 0
             && !!cW.querySelector('.goto') && cW.querySelector('.goto').disabled === false,
             `picks=${cW.querySelectorAll('.ability-pick').length}`);
        }
      }
    }

    // --- task 118: choice/equipment losses respect the keep tag ---
    // A "keep" possession (royal ring §1.385, white sword §4.103 — "cannot be lost or
    // stolen") is spared by the open item="?"/multiple= and weapon/armour ?/* forfeits, and
    // by "lose all". Only an explicit NAMED selector with no ordinary alternative may hand
    // that exact kept item over (a scripted, deliberate forfeit).
    {
      const mk118 = (items) => {
        const g = GameState.create({ name:'T118', gender:'m', profession:'Warrior', book:1, adv });
        g.data.items = []; items.forEach((it) => g.addItem(it));
        return g;
      };
      const names = (g) => g.data.items.map((i) => i.name).join(',');
      const ring = () => makeItem('item', 'royal ring', 0, null, ['keep']);
      const whiteSword = () => makeItem('weapon', 'white sword', 3, null, ['keep']);

      // item="?" with a mix: the ordinary item goes, the kept ring stays.
      {
        const g = mk118([ring(), makeItem('item', 'sword'), makeItem('item', 'flask')]);
        eng.applyEffect(parse('<lose item="?"/>'), g, {});
        ok('task118: item="?" takes an ordinary item and spares the kept ring',
           g.data.items.some((i) => i.name === 'royal ring') && !g.data.items.some((i) => i.name === 'sword') && g.itemCount() === 2, names(g));
      }

      // item="?" with ONLY kept items: nothing is taken.
      {
        const g = mk118([ring()]);
        eng.applyEffect(parse('<lose item="?"/>'), g, {});
        ok('task118: item="?" against an only-kept inventory takes nothing', g.itemCount() === 1 && g.data.items[0].name === 'royal ring', names(g));
      }

      // multiple="2" never reaches a kept item — two ordinary items go, ring + one stay.
      {
        const g = mk118([ring(), makeItem('item', 'sword'), makeItem('item', 'flask'), makeItem('item', 'gem')]);
        eng.applyEffect(parse('<lose item="?" multiple="2"/>'), g, {});
        ok('task118: multiple= never takes a kept item',
           g.data.items.some((i) => i.name === 'royal ring') && g.itemCount() === 2, names(g));
      }

      // "lose all possessions" spares the kept ring.
      {
        const g = mk118([ring(), makeItem('item', 'sword'), makeItem('item', 'flask')]);
        eng.applyEffect(parse('<lose item="*"/>'), g, {});
        ok('task118: "lose all" spares the kept ring', g.itemCount() === 1 && g.data.items[0].name === 'royal ring', names(g));
      }

      // weapon="?" spares a kept weapon while an ordinary one exists.
      {
        const g = mk118([whiteSword(), makeItem('weapon', 'axe', 1)]);
        eng.applyEffect(parse('<lose weapon="?"/>'), g, {});
        ok('task118: weapon="?" takes the ordinary weapon and spares the white sword',
           g.data.items.some((i) => i.name === 'white sword') && !g.data.items.some((i) => i.name === 'axe'), names(g));
      }

      // weapon="*" (all of a kind) still skips the kept weapon.
      {
        const g = mk118([whiteSword(), makeItem('weapon', 'axe', 1), makeItem('weapon', 'club', 0)]);
        eng.applyEffect(parse('<lose weapon="*"/>'), g, {});
        ok('task118: weapon="*" removes every ordinary weapon but keeps the white sword',
           g.itemCount() === 1 && g.data.items[0].name === 'white sword', names(g));
      }

      // weapon="?" against an only-kept weapon: nothing is taken (§4.103 can't be confiscated).
      {
        const g = mk118([whiteSword()]);
        eng.applyEffect(parse('<lose weapon="?"/>'), g, {});
        ok('task118: weapon="?" against only a kept weapon takes nothing', g.itemCount() === 1, names(g));
      }

      // A NAMED selector with no ordinary alternative may deliberately hand over the kept
      // item (a scripted "give up the royal ring").
      {
        const g = mk118([ring()]);
        eng.applyEffect(parse('<lose item="royal ring"/>'), g, {});
        ok('task118: an explicit named selector may take the kept item deliberately', g.itemCount() === 0, names(g));
      }

      // The eligibility plan agrees: only-kept ⇒ ineligible; a mix ⇒ eligible.
      {
        const gk = mk118([ring()]);
        ok('task118: losePaymentPlan marks an only-kept item="?" forfeit ineligible', eng.losePaymentPlan(parse('<lose item="?" price="x"/>'), gk).eligible === false);
        gk.addItem(makeItem('item', 'sword'));
        ok('task118: a mixed inventory makes the item="?" forfeit eligible', eng.losePaymentPlan(parse('<lose item="?" price="x"/>'), gk).eligible === true);
      }
    }

    // --- task 111: rolled itemAt= losses skip keep items and honour cache= ---
    // §6.63/§6.168 take the possession at a rolled 1-based position; the loss must
    // index the selected pool (player, or a cache= stash), skip currency, no-op past
    // the end (task 93), and never remove a "keep"-tagged possession — the royal ring
    // (§1.385) / white sword (§4.103) are explicitly items that cannot be lost.
    {
      // an ordinary item at the rolled position → removed
      const g111 = GameState.create({ name:'T111', gender:'m', profession:'Warrior', book:6, adv });
      g111.data.items = [];
      ['ring','sword','flask'].forEach((nm) => g111.addItem(makeItem('item', nm)));
      g111.setVar('x', 2);
      eng.applyEffect(parse('<lose itemAt="x"/>'), g111, {});
      ok('task111: itemAt removes the ordinary item at the rolled position', g111.data.items.map((i)=>i.name).join(',') === 'ring,flask', g111.data.items.map((i)=>i.name).join(','));

      // a keep-tagged possession at the rolled position → left in place (no-op)
      const g111k = GameState.create({ name:'T111k', gender:'m', profession:'Warrior', book:6, adv });
      g111k.data.items = [];
      g111k.addItem(makeItem('item', 'junk'));
      g111k.addItem(makeItem('item', 'royal ring', 0, null, ['keep'])); // position 2, protected
      g111k.addItem(makeItem('item', 'flask'));
      g111k.setVar('x', 2);
      eng.applyEffect(parse('<lose itemAt="x"/>'), g111k, {});
      ok('task111: itemAt leaves a keep-tagged possession in place', g111k.data.items.some((i)=>i.name==='royal ring') && g111k.itemCount() === 3, g111k.data.items.map((i)=>i.name).join(','));

      // an out-of-range roll → still takes nothing (task 93 retained)
      const g111o = GameState.create({ name:'T111o', gender:'m', profession:'Warrior', book:6, adv });
      g111o.data.items = [];
      ['a','b'].forEach((nm) => g111o.addItem(makeItem('item', nm)));
      g111o.setVar('x', 5);
      const before111 = g111o.itemCount();
      eng.applyEffect(parse('<lose itemAt="x"/>'), g111o, {});
      ok('task111: an out-of-range itemAt roll still takes nothing', g111o.itemCount() === before111);

      // a cache-targeted itemAt → removes from the named stash, sparing carried items
      const g111c = GameState.create({ name:'T111c', gender:'m', profession:'Warrior', book:6, adv });
      g111c.data.items = []; g111c.addItem(makeItem('item', 'carried keepsake'));
      g111c.cacheAddItem('vault', makeItem('item', 'stashed gem'));
      g111c.cacheAddItem('vault', makeItem('item', 'stashed idol'));
      g111c.setVar('x', 1);
      eng.applyEffect(parse('<lose itemAt="x" cache="vault"/>'), g111c, {});
      ok('task111: a cache-targeted itemAt removes from the stash, not carried items',
         g111c.cacheItems('vault').map((i)=>i.name).join(',') === 'stashed idol' && g111c.data.items.length === 1,
         'cache=' + g111c.cacheItems('vault').map((i)=>i.name).join(',') + ' carried=' + g111c.itemCount());
    }

    // --- task 112: a curse's lift= question drives a Lift… action on its chip ---
    // §5.505 Skunk-juice cuts CHARISMA by 1 until you reach a river/village/town/city;
    // its stored lift= question must be actionable on the Adventure Sheet — an honest
    // "Yes" removes that one curse and restores CHARISMA, "No" leaves it untouched.
    {
      const settle112 = () => new Promise((r) => setTimeout(r, 0));
      const LIFTQ = 'Are you at a river, village, town or city?';
      const curseXml = `<curse name="Skunk-juice" lift="${LIFTQ}"><effect ability="charisma" bonus="-1"/></curse>`;
      const mk505 = () => {
        const g = GameState.create({ name:'T505', gender:'m', profession:'Warrior', book:5, adv });
        g.data.curses = []; g.data.abilities.charisma = 6;
        eng.applyEffect(parse(curseXml), g, {});
        return g;
      };

      // curse applied: stored with its lift question + CHARISMA cut by 1
      const g505 = mk505();
      ok('task112: §5.505 stores the curse with its lift question and cuts CHARISMA',
         g505.hasCurse('Skunk-juice') && g505.data.curses[0].lift === LIFTQ && g505.ability('charisma') === 5,
         'lift=' + g505.data.curses[0].lift + ' cha=' + g505.ability('charisma'));

      // save round-trip keeps the lift question
      const g505rt = new GameState(sanitizeData(JSON.parse(JSON.stringify(g505.data))));
      ok('task112: the lift question survives a save round-trip', !!g505rt.data.curses[0] && g505rt.data.curses[0].lift === LIFTQ, 'lift=' + (g505rt.data.curses[0] && g505rt.data.curses[0].lift));

      // the sheet renders a keyboard/touch Lift… action carrying the exact question
      const cSheet = document.createElement('div');
      renderSheet(g505, cSheet, {});
      const liftBtn = cSheet.querySelector('.chip-action');
      ok('task112: the Adventure Sheet exposes a Lift… action for the curse', !!liftBtn && liftBtn.tagName === 'BUTTON' && liftBtn.title === LIFTQ, liftBtn ? 'title=' + liftBtn.title : 'no button');

      // answering No leaves the curse and its CHARISMA effect unchanged
      const gNo = mk505();
      const cNo = document.createElement('div');
      renderSheet(gNo, cNo, {});
      cNo.querySelector('.chip-action').click();
      ok('task112: the Lift… modal shows the exact stored question', !!document.querySelector('.modal-overlay') && document.querySelector('.modal-body').textContent.includes('river, village, town or city'));
      Array.from(document.querySelectorAll('.modal-overlay .modal-buttons .btn')).find((b) => b.textContent === 'No').click();
      await settle112();
      ok('task112: answering No keeps the curse and its CHARISMA penalty', gNo.hasCurse('Skunk-juice') && gNo.ability('charisma') === 5, 'cha=' + gNo.ability('charisma'));

      // answering Yes removes that one curse and restores CHARISMA
      const gYes = mk505();
      const cYes = document.createElement('div');
      renderSheet(gYes, cYes, {});
      cYes.querySelector('.chip-action').click();
      Array.from(document.querySelectorAll('.modal-overlay .modal-buttons .btn')).find((b) => b.textContent === 'Yes').click();
      await settle112();
      ok('task112: answering Yes lifts the curse and restores CHARISMA', !gYes.hasCurse('Skunk-juice') && gYes.ability('charisma') === 6, 'cha=' + gYes.ability('charisma') + ' hasCurse=' + gYes.hasCurse('Skunk-juice'));

      // a curse WITHOUT lift= stays inert (no Lift… action)
      const gInert = GameState.create({ name:'TInert', gender:'m', profession:'Warrior', book:5, adv });
      gInert.data.curses = [];
      eng.applyEffect(parse('<curse name="Champion Curse"><effect ability="combat" bonus="-1"/></curse>'), gInert, {});
      const cInert = document.createElement('div');
      renderSheet(gInert, cInert, {});
      ok('task112: a curse without lift= stays inert (no Lift… action)', !cInert.querySelector('.chip-action') && gInert.hasCurse('Champion Curse'));
    }

    // --- task 133: sheet mutations rerender the story so gated content updates ------
    {
      const settle133 = () => new Promise((r) => setTimeout(r, 0));
      // A section whose "Proceed" choice is gated behind NOT being cursed: the <else> of
      // an <if curse="X"> block, so the choice is live only once the curse is gone.
      const gated = '<section name="t133"><if curse="Bogwater">You are cursed.</if><else><choices><choice section="9">Proceed</choice></choices></else></section>';

      // Belt B end-to-end: lifting the curse from the sheet rerenders the story pane, so the
      // curse-gated choice turns live without re-entering the section.
      const gC = GameState.create({ name:'C133', gender:'m', profession:'Warrior', book:1, adv });
      eng.applyEffect(parse('<curse name="Bogwater" lift="Are you free of the swamp?"><effect ability="combat" bonus="-1"/></curse>'), gC, {});
      const cStory = document.createElement('div');
      const storyC = new Story(cStory, gC, { navigate(){}, onDeath(){}, notify(){} });
      storyC.begin(parse(gated), 1, 't133');
      const proceed = () => Array.from(cStory.querySelectorAll('.choice')).find((b) => /Proceed/.test(b.textContent));
      ok('task133: curse-gated choice starts disabled while cursed', !!proceed() && proceed().disabled === true, proceed() ? 'disabled=' + proceed().disabled : 'none');
      const cSheet133 = document.createElement('div');
      renderSheet(gC, cSheet133, { onSheetChange: () => storyC.rerender() });
      cSheet133.querySelector('.chip-action').click(); // open the Lift… modal
      Array.from(document.querySelectorAll('.modal-overlay .modal-buttons .btn')).find((b) => b.textContent === 'Yes').click();
      await settle133();
      ok('task133: lifting the curse rerenders the story — choice now live', !gC.hasCurse('Bogwater') && !!proceed() && proceed().disabled === false, proceed() ? 'disabled=' + proceed().disabled : 'none');

      // Belt B unit: an immediate mutation (reorder) invokes onSheetChange.
      const gM = GameState.create({ name:'M133', gender:'m', profession:'Warrior', book:1, adv });
      gM.data.items = []; gM.addItem(makeItem('item', 'apple')); gM.addItem(makeItem('item', 'pear'));
      let changes = 0;
      const cM = document.createElement('div');
      renderSheet(gM, cM, { onSheetChange: () => { changes++; } });
      const pearMove = Array.from(cM.querySelectorAll('.item')).find((li) => /pear/.test(li.textContent)).querySelector('.item-move');
      pearMove.click();
      ok('task133: a sheet reorder invokes onSheetChange', changes === 1, `changes=${changes}`);
    }

    // --- task 119: DOM-free blessing planners extracted to render-rules.js ---------
    {
      const bsec = parse('<section name="tb"><outcome blessing="storm"/><outcome blessing="*"/><p>Storm! <lose blessing="storm">lose it</lose> and <goto section="9"/>.</p><p><lose blessing="storm" hidden="t"/></p></section>');
      const ob = rules.computeOutcomeBlessings(bsec);
      ok('task119: computeOutcomeBlessings collects guarded blessings, drops the "*" wildcard', ob.has('storm') && !ob.has('*') && ob.size === 1, JSON.stringify([...ob]));

      const held = GameState.create({ name:'B119', gender:'m', profession:'Warrior', book:1, adv });
      held.addBlessing('storm');
      const unheld = GameState.create({ name:'B119n', gender:'m', profession:'Warrior', book:1, adv });

      const outcomeStorm = Array.from(bsec.querySelectorAll('outcome')).find((o) => o.getAttribute('blessing') === 'storm');
      const outcomeStar  = Array.from(bsec.querySelectorAll('outcome')).find((o) => o.getAttribute('blessing') === '*');
      ok('task119: blessingVeto true when the blessing is held', rules.blessingVeto(held, outcomeStorm) === true);
      ok('task119: blessingVeto false when not held', rules.blessingVeto(unheld, outcomeStorm) === false);
      ok('task119: blessingVeto false for a wildcard outcome', rules.blessingVeto(held, outcomeStar) === false);

      const loses = Array.from(bsec.querySelectorAll('lose[blessing]'));
      const openLose = loses.find((l) => !l.hasAttribute('hidden'));
      const hiddenLose = loses.find((l) => l.hasAttribute('hidden'));
      ok('task119: isGuardedBlessingLoss true for the non-hidden guarded lose', rules.isGuardedBlessingLoss(openLose, ob) === true);
      ok('task119: isGuardedBlessingLoss false for the hidden form', rules.isGuardedBlessingLoss(hiddenLose, ob) === false);

      const gotoNode = bsec.querySelector('goto');
      ok('task119: blessingSpendForGoto returns the held blessing preceding the goto', rules.blessingSpendForGoto(gotoNode, bsec, held, ob) === 'storm');
      ok('task119: blessingSpendForGoto null once the blessing is gone', rules.blessingSpendForGoto(gotoNode, bsec, unheld, ob) === null);

      ok('task119: blessingSpendForReroll finds the hidden keepblessing lose', rules.blessingSpendForReroll(bsec, held, ob) === 'storm');
      ok('task119: blessingSpendForReroll null once the blessing is spent', rules.blessingSpendForReroll(bsec, unheld, ob) === null);

      const solesec = parse('<section name="ts"><tick price="b" hidden="t"/><gain flag="b" blessing="storm"/></section>');
      const costNode = solesec.querySelector('[price="b"]');
      ok('task119: ownsSoleLinkedBlessing true when the sole linked blessing is held', rules.ownsSoleLinkedBlessing(costNode, 'b', solesec, held) === true);
      ok('task119: ownsSoleLinkedBlessing false when not held', rules.ownsSoleLinkedBlessing(costNode, 'b', solesec, unheld) === false);
    }

    // --- task 119 (phase 1b): reward / payment eligibility planners ------------------
    {
      const sec = parse('<section name="tr"><tick price="k" hidden="t"/><gain flag="k" blessing="storm"/><gain flag="k" curse="Bogwater"/><random flag="r"/><lose shards="10" price="r"/></section>');
      ok('task119: linkedRewards returns the flagged rewards', rules.linkedRewards(sec, 'k').length === 2);
      ok('task119: linkedRewards empty for an unknown key', rules.linkedRewards(sec, 'zzz').length === 0);
      ok('task119: isChooseOne true for 2+ heterogeneous rewards', rules.isChooseOne(sec, 'k') === true);

      const pureItem = parse('<section><tick price="p"/><item flag="p" name="a"/><item flag="p" name="b"/></section>');
      ok('task119: isChooseOne false for a pure item-family barter', rules.isChooseOne(pureItem, 'p') === false);
      ok('task119: isPricedItemAward true for a priced pure item-family reward', rules.isPricedItemAward(pureItem, 'p') === true);

      ok('task119: hasVisiblePay false for a hidden price', rules.hasVisiblePay(sec, 'k') === false);
      ok('task119: hasVisiblePay true for a visible price', rules.hasVisiblePay(sec, 'r') === true);
      ok('task119: isRollGate true for a flag-linked roll', rules.isRollGate(sec, 'r') === true);
      ok('task119: isRollGate false for a plain reward key', rules.isRollGate(sec, 'k') === false);

      ok('task119: isCounterReward true for a named counter tick', rules.isCounterReward(parse('<tick name="Bonus" count="1"/>')) === true);
      ok('task119: isCounterReward false for a plain tick', rules.isCounterReward(parse('<tick codeword="X"/>')) === false);

      ok('task119: isOptionalForce true for force="f"', rules.isOptionalForce(parse('<lose shards="5" force="f"/>')) === true);
      ok('task119: isOptionalForce false for force="t"', rules.isOptionalForce(parse('<lose shards="5" force="t"/>')) === false);

      ok('task119: forcedChoiceGroup returns "dock" for a force="f" set dock', rules.forcedChoiceGroup(parse('<set dock="Sokara" force="f"/>')) === 'dock');
      const twoLose = parse('<p><lose item="a" force="f"/><lose item="b" force="f"/></p>');
      const firstLose = twoLose.querySelector('lose');
      // Keyed by the shared parent's PATH, not the parent node: the token is a ctx.forcedChosen
      // key and that map is serialised with the visit (task 264). Both siblings answer the same.
      ok('task119: forcedChoiceGroup groups 2+ sibling force="f" losses by their parent\'s path',
         rules.forcedChoiceGroup(firstLose, 'r.1.0') === 'kin@r.1'
         && rules.forcedChoiceGroup(twoLose.querySelectorAll('lose')[1], 'r.1.1') === 'kin@r.1');
      ok('task119: forcedChoiceGroup groups nothing for a lone force="f" loss',
         rules.forcedChoiceGroup(parse('<p><lose item="a" force="f"/></p>').querySelector('lose'), 'r.1.0') === null);

      ok('task119: isEconomicPayment true for a shards spend', rules.isEconomicPayment(parse('<lose shards="10"/>')) === true);
      ok('task119: isEconomicPayment false for a stamina penalty', rules.isEconomicPayment(parse('<lose stamina="2"/>')) === false);
      ok('task119: isEconomicPayment false for force="f"', rules.isEconomicPayment(parse('<lose shards="10" force="f"/>')) === false);

      const wr = GameState.create({ name:'WR119', gender:'m', profession:'Warrior', book:1, adv });
      wr.addBlessing('storm');
      ok('task119: rewardWasteReason flags an already-held blessing', /already have this blessing/i.test(rules.rewardWasteReason(wr, parse('<gain blessing="storm"/>')) || ''));
      ok('task119: rewardWasteReason null for a fresh blessing', rules.rewardWasteReason(wr, parse('<gain blessing="luck"/>')) === null);
    }

    // --- task 119 (phase 1c): DOM-free navigation-gate planners (render-gates.js) ----
    {
      // computeFightGate: a goto after a fight is gated; a "you lose" goto is the lose-branch.
      const fsec = parse('<section name="tf"><fight/><p>If you win, <goto section="10"/>. If you lose, <goto section="20"/>.</p></section>');
      const fg = gates.computeFightGate(fsec, new Set());
      const fgotos = Array.from(fsec.querySelectorAll('goto'));
      ok('task119: computeFightGate gates the post-fight navigation', !!fg && fg.navNodes.size === 2, fg ? 'n=' + fg.navNodes.size : 'null');
      ok('task119: computeFightGate marks only the lose-branch goto', fg.loseNodes.has(fgotos[1]) && !fg.loseNodes.has(fgotos[0]));

      ok('task119: aggregateFightOutcome win when all won', gates.aggregateFightOutcome([{ outcome:'win' }, { outcome:'win' }]) === 'win');
      ok('task119: aggregateFightOutcome lose if any lost', gates.aggregateFightOutcome([{ outcome:'win' }, { outcome:'lose' }]) === 'lose');
      ok('task119: aggregateFightOutcome null while unresolved', gates.aggregateFightOutcome([{ outcome:'win' }, { outcome:null }]) === null);
      ok('task119: aggregateFightOutcome null for no fights', gates.aggregateFightOutcome([]) === null);

      // computeEscapeCodewords: a codeword both ticked and used as a box gate, in a fight section.
      const ecw = gates.computeEscapeCodewords(parse('<section name="te"><fight/><tick codeword="Flee1"/><choice box="Flee1" section="9">Surrender</choice></section>'));
      ok('task119: computeEscapeCodewords finds the ticked box-gated codeword', ecw.has('Flee1'));
      ok('task119: computeEscapeCodewords empty without a fight', gates.computeEscapeCodewords(parse('<section><tick codeword="X"/><choice box="X"/></section>')).size === 0);

      const clr = parse('<lose codeword="Flee1"/>');
      ok('task119: isDeferredEscapeClear defers while the fight is unresolved', gates.isDeferredEscapeClear(clr, new Set(['Flee1']), [{ outcome:null }]) === true);
      ok('task119: isDeferredEscapeClear applies once the fight is won', gates.isDeferredEscapeClear(clr, new Set(['Flee1']), [{ outcome:'win' }]) === false);
      ok('task119: isDeferredEscapeClear no-op before any fight', gates.isDeferredEscapeClear(clr, new Set(['Flee1']), []) === false);

      ok('task119: isDeferredTagCleanup true for a hidden removetag tick', gates.isDeferredTagCleanup(parse('<tick hidden="t" removetag="Tz"/>')) === true);
      ok('task119: isDeferredTagCleanup false for a plain tick', gates.isDeferredTagCleanup(parse('<tick codeword="X"/>')) === false);

      ok('task119: isDeferredFightChain defers a dead-gated if while the fight is unresolved', gates.isDeferredFightChain(parse('<if dead="f"/>'), [{ outcome:null }]) === true);
      ok('task119: isDeferredFightChain applies once the fight resolves', gates.isDeferredFightChain(parse('<if dead="f"/>'), [{ outcome:'win' }]) === false);

      // task 245: the hold is about "has this fight resolved", not about how the branch is
      // spelled — a chain on ANY gate whose body writes to the sheet is held too, because
      // computeFightGate skips <if>-wrapped effects on the grounds that the conditional owns
      // them. One synthetic per gate kind the corpus writes after a fight.
      const chain245 = (xml) => parse('<section name="t245"><fight/><p>' + xml + '</p></section>').querySelector('if');
      const cwChain = chain245('<if codeword="K"><transfer item="*" from="c"/> then <goto section="463"/>.</if><else><goto section="316"/></else>');
      ok('task245: a codeword-gated post-fight chain with an effect is deferred', gates.isDeferredFightChain(cwChain, [{ outcome:null }]) === true);
      ok('task245: it applies once the fight is won', gates.isDeferredFightChain(cwChain, [{ outcome:'win' }]) === false);
      ok('task245: a fled fight still holds it', gates.isDeferredFightChain(cwChain, [{ outcome:'fled' }]) === true);
      ok('task245: nothing is held before the fight is reached', gates.isDeferredFightChain(cwChain, []) === false);
      ok('task245: an item-gated post-fight chain with an effect is deferred',
         gates.isDeferredFightChain(chain245('<if item="rope"><lose shards="10"/></if>'), [{ outcome:null }]) === true);
      ok('task245: a var-gated post-fight chain with an effect is deferred',
         gates.isDeferredFightChain(chain245('<if var="x" equals="1"><gain shards="800"/></if>'), [{ outcome:null }]) === true);
      // The effect may sit in ANY branch of the chain — the deferral rides the whole chain.
      ok('task245: an effect in the <else> alone defers the chain',
         gates.isDeferredFightChain(chain245('<if codeword="K">He is beyond help.</if><else>He is carrying <gain shards="800"/>.</else>'), [{ outcome:null }]) === true);
      // An effect-free chain stays live, or every page that merely discusses its fight would
      // gray for the whole of it (book6/716/743 route on a codeword and nothing else).
      ok('task245: a narration-only post-fight chain is NOT held',
         gates.isDeferredFightChain(chain245('<if codeword="K">He recognises your badge.</if>'), [{ outcome:null }]) === false);
      ok('task245: a chain carrying only a <goto> the fight gate already locks is NOT held',
         gates.isDeferredFightChain(chain245('<if codeword="K">Turn to <goto section="9"/>.</if><else><goto section="10"/></else>'), [{ outcome:null }]) === false);

      const rg = gates.computeRollGate(parse('<section name="tr2"><random/><outcomes><outcome range="1-6" section="5"/></outcomes><choices><choice section="8">Leave</choice></choices></section>'));
      ok('task119: computeRollGate gates the onward choice behind the mandatory roll', !!rg && rg.navNodes.size === 1, rg ? 'n=' + rg.navNodes.size : 'null');
      ok('task119: computeRollGate null for a roll with no table and no var to owe',
         gates.computeRollGate(parse('<section><random/><choices><choice section="8"/></choices></section>')) === null);

      // task 247: the gate's SECOND seed — a roll whose result an EFFECT reads. Keyed only on
      // <outcomes>, its precondition was a page SHAPE rather than the rule "hold the exits
      // until the roll is made", so every roll read by an effect instead of a table gated
      // nothing: book3/199's "lose one die halved" left its cross-book <goto> live from entry.
      // Synthetic on purpose — the 36 shipped instances are the regression risk, not the spec.
      const rg247 = (xml) => gates.computeRollGate(parse('<section name="t247">' + xml + '</section>'));
      const owed247 = rg247('<p><random dice="1" var="x">Roll a die</random> and <lose stamina="x">lose that many</lose>.</p><goto section="9"/>');
      ok('task247: a roll an effect owes its magnitude to gates the exit',
         !!owed247 && owed247.navNodes.size === 1, owed247 ? 'n=' + owed247.navNodes.size : 'null');
      ok('task247: the owing roll seeds the gate, and there is no table to match',
         !!owed247 && owed247.rollNode.getAttribute('var') === 'x' && owed247.outcomesNode === null);
      // book3/199 verbatim in shape: the effect reads a value DERIVED from the roll.
      ok('task247: a derived <set> between the roll and the effect still gates',
         !!rg247('<random dice="1" var="r">Lose 1-3 Stamina</random><set var="half" value="(r+1)/2"/><lose stamina="half"/><goto book="5" section="321"/>'));
      // A roll whose result nothing is waiting for owes nothing, so it keeps gating nothing.
      ok('task247: a roll no effect reads gates nothing',
         rg247('<random dice="1" var="x">Roll a die</random><goto section="9"/>') === null);
      ok('task247: a derived <set> nothing reads gates nothing',
         rg247('<random dice="1" var="x"/><set var="half" value="(x+1)/2"/><goto section="9"/>') === null);
      // The seed asks the same "is this the section's own step" question the table seed asks.
      ok('task247: the same roll inside a <group> is opt-in and gates nothing',
         rg247('<group><random dice="1" var="x"/><lose stamina="x"/></group><goto section="9"/>') === null);
      ok('task247: a pay-to-spin roll gates nothing',
         rg247('<random dice="1" var="x" flag="k"/><lose stamina="x"/><lose shards="10" price="k"/><goto section="9"/>') === null);
      // A fight hook is the FIGHT's step, not the section's: book2/770's parting crossbow bolt
      // is only fired on a flee, and book5/24's per-round check only while the Hangman lives —
      // gating on either would hold the win route behind a roll the winner never makes.
      ok('task247: a roll inside a <flee> gates nothing',
         rg247('<fight/><flee><random dice="2" var="x"/><lose stamina="x"/></flee><choices><choice section="55">Flee</choice><choice section="404">Win</choice></choices>') === null);
      ok('task247: a roll inside a <fightround> gates nothing',
         rg247('<fight/><fightround pre="t"><difficulty ability="sanctity" level="17" var="hang"/><failure var="hang"><lose stamina="-hang"/></failure></fightround><goto section="471"/>') === null);
      // Seeded from the roll, not from the tag: an ability check owes its margin the same way.
      ok('task247: a <difficulty> whose margin an effect reads gates the exit too',
         !!rg247('<difficulty ability="combat" level="9" var="m"/><lose stamina="-m"/><goto section="9"/>'));

      // task 248: the gate holds the section's <fight> as well as its exits. A fight's Attack
      // button is none of choice/goto/return, so the gate never collected it and book2/726's
      // brigands and book5/477's water drake could be engaged before the rolled wound landed —
      // the wound still arrived (the exits were held) but AFTER the fight it was meant to start.
      const fight248 = '<fight name="Brigand" combat="5" defence="6" stamina="4"/>';
      const held248 = rg247('<random dice="1" var="x"/><lose stamina="x"/>' + fight248 + '<choices><choice section="353">Defeat them</choice></choices>');
      ok('task248: a fight below the gating roll is held with the exits',
         !!held248 && held248.fightNodes.size === 1, held248 ? 'n=' + held248.fightNodes.size : 'null');
      // Position is read from the roll, exactly as it is for the navigation: a fight the
      // section already fought is not something the roll below it can shape.
      ok('task248: a fight above the gating roll is not held',
         (() => { const g = rg247(fight248 + '<random dice="1" var="x"/><lose stamina="x"/><goto section="9"/>'); return !!g && g.fightNodes.size === 0; })());
      // §1.299's drunken soldier IS what the table reveals, so he can never be reached early;
      // holding him after the reveal would lock the fight the roll had just started.
      ok('task248: a fight inside the outcome table is not held',
         (() => {
           const g = gates.computeRollGate(parse('<section name="t248"><random type="travel" dice="1"/><outcomes><outcome range="1,2">' + fight248 + '</outcome><outcome range="3-6">Nothing happens</outcome></outcomes><choices><choice section="472">Travel on</choice></choices></section>'));
           return !!g && g.fightNodes.size === 0 && g.navNodes.size === 1;
         })());

      // task 249: the gate's THIRD seed — a mandatory check read only by its own branch. Seeds 1
      // and 2 ask what the result FEEDS (a table, an effect's magnitude), so §5.198's MAGIC check
      // — whose <failure> curses the player for the fight below it — seeded nothing at all, and
      // the fight gate holding the exits meant nothing else asked for the roll either: win the
      // fight and you leave with the check unmade.
      const branch249 = rg247('<difficulty ability="magic" level="13"/><failure>You are cursed.</failure><fight name="Champion" combat="8" defence="15" stamina="12"/><choices><choice section="223">Take a sword</choice></choices>');
      ok('task249: a check read only by its <failure> gates the exits and the fight',
         !!branch249 && branch249.navNodes.size === 1 && branch249.fightNodes.size === 1,
         branch249 ? 'nav=' + branch249.navNodes.size + ' fight=' + branch249.fightNodes.size : 'null');
      // §5.689's shape: the roll HAS a var, but only a branch reads it (an <adjust value=> is
      // not a magnitude), so seed 2 misses it — the var seed matches through the same closure.
      ok('task249: a var-keyed branch seeds the gate through its roll\'s var',
         !!rg247('<difficulty ability="scouting" level="10" var="pre"/><failure var="pre">You drown, <goto section="7"/>.</failure><fight name="Water Drake" combat="9" defence="12" stamina="40"/><goto section="436"/>'));
      // A bare branch binds to the nearest roll ABOVE it, exactly as the walk's activeRoll does,
      // so a branch belonging to a later roll can never seed an earlier one.
      ok('task249: a bare branch seeds the roll it binds to, not the one further up',
         (() => {
           const g = rg247('<random dice="1" var="x"/><difficulty ability="magic" level="13"/><failure>Cursed.</failure><goto section="9"/>');
           return !!g && g.rollNode.tagName.toLowerCase() === 'difficulty';
         })());
      // force= is the tag's own word for "must the player make this to continue" (default true).
      // book1/21's force="f" CHARISMA roll is the printed ALTERNATIVE to fighting the thug, so a
      // seed that ignored it would demand the talk-out attempt the page offers to skip.
      ok('task249: an optional (force="f") check gates nothing',
         rg247('<difficulty ability="charisma" level="8" force="f"/><success>You talk your way out, <goto section="10"/>.</success><fight name="Thug" combat="4" defence="7" stamina="6"/><goto section="10"/>') === null);
      // The same word, read for the FIRST seed too — one shipped table was already held by it:
      // book2/440's "if you want to read a book" roll locked the "when you are ready to leave"
      // exit behind a table whose every outcome carries the player away.
      ok('task249: an optional (force="f") table roll gates nothing either',
         gates.computeRollGate(parse('<section name="t440"><p>If you want to read a book, <random dice="2" force="f"/>:</p><outcomes><outcome range="2-5" section="529"/><outcome range="6-12" section="579"/></outcomes><p>When you are ready to leave, <goto section="314"/>.</p></section>')) === null);

      // task 257: the outcome-row gate — the die a REVEALED row makes, holding that row's exit.
      // All three seeds above refuse a roll under `outcome`, and for the other six members of
      // ROLLGATE_OPTIONAL_WRAP that is right; an <outcome> is not a branch the player chooses but
      // the row the dice turned up, so a die inside a revealed row is mandatory in fact.
      const org257 = (xml) => gates.computeOutcomeRollGate(parse('<section name="t257">' + xml + '</section>'));
      const row257 = '<random dice="2" var="x">Lose 2-12 Shards</random><lose codeword="3.52.Loss" hidden="t"/><tick name="3.52.Loss" amount="x" hidden="t"/>';
      const g257 = org257('<random/><outcomes><outcome range="2-5" section="52">' + row257 + '</outcome><outcome range="6-12" section="72">Nothing happens</outcome></outcomes>');
      ok('task257: a row with its own die and its own section= is gated',
         !!g257 && g257.rollNodes.size === 1 && g257.outcomeNodes.size === 1 && g257.navNodes.size === 0,
         g257 ? `rolls=${g257.rollNodes.size} rows=${g257.outcomeNodes.size} nav=${g257.navNodes.size}` : 'null');
      // Every row's die is collected, because only the revealed row is ever drawn — which is why
      // the gate is keyed on the die RENDERING rather than on the one chosen rollNode
      // computeRollGate names: a gate keyed on the first row's die would hold nothing whenever
      // the dice turned up another row.
      ok('task257: each row carries its own die into the gate',
         (() => { const g = org257('<random/><outcomes><outcome range="2-5" section="52">' + row257 + '</outcome><outcome range="6-12" section="72">' + row257 + '</outcome></outcomes>'); return !!g && g.rollNodes.size === 2 && g.outcomeNodes.size === 2; })());
      // A row exit written as a <goto> is the same thing as the row's section=, and both are held.
      ok('task257: a row exit written as a <goto> is collected as a nav node',
         (() => { const g = org257('<random/><outcomes><outcome range="2-12"><random dice="1" var="x"/><lose shards="x"/>Turn to <goto section="52"/>.</outcome></outcomes>'); return !!g && g.navNodes.size === 1 && g.outcomeNodes.size === 0; })());
      // A row with no exit of its own has nothing to hold: its section's <choices> are seed 1's
      // business (book1/278), and this gate must leave them exactly as they were.
      ok('task257: a row whose die feeds no exit of its own gates nothing',
         org257('<random/><outcomes><outcome range="2-12"><random dice="1" var="x"/><lose shards="x"/></outcome></outcomes><choices><choice section="8">Leave</choice></choices>') === null);
      ok('task257: a row with an exit but no die of its own gates nothing',
         org257('<random type="travel" dice="1"/><outcomes><outcome range="1,2" section="82">You get lost</outcome></outcomes>') === null);
      // A die whose result nothing captures owes nothing, exactly as seed 2 reads it.
      ok('task257: a var-less die in the row gates nothing',
         org257('<random/><outcomes><outcome range="2-12" section="52"><random dice="1"/></outcome></outcomes>') === null);
      // The forced-roll half of isMandatoryRoll still applies — an exit held behind a die the
      // player cannot make is a softlock, not a rule.
      ok('task257: a pay-to-spin die in the row gates nothing',
         org257('<random/><outcomes><outcome range="2-12" section="52"><random dice="1" var="x" flag="k"/><lose shards="x"/><lose shards="10" price="k"/></outcome></outcomes>') === null);
      ok('task257: an optional (force="f") die in the row gates nothing',
         org257('<random/><outcomes><outcome range="2-12" section="52"><random dice="1" var="x" force="f"/><lose shards="x"/></outcome></outcomes>') === null);
      // A fight hook inside the row belongs to the fight, not the row (ROLLGATE_FIGHT_HOOK_WRAP).
      ok('task257: a <fightround> die in the row gates nothing',
         org257('<random/><outcomes><outcome range="2-12" section="52"><fight name="Ogre" combat="5" defence="9" stamina="12"/><fightround pre="t"><difficulty ability="sanctity" level="17" var="h"/></fightround></outcome></outcomes>') === null);
      // Giving up is never locked behind the thing you are giving up on (isEscapeNav's rule).
      ok('task257: a flee exit inside the row is not held',
         org257('<random/><outcomes><outcome range="2-12"><random dice="1" var="x"/><lose shards="x"/><choice section="9" flee="t">Run for it</choice></outcome></outcomes>') === null);
      ok('task257: book1/278\'s ordinary table builds no row gate at all',
         gates.computeOutcomeRollGate(parse('<section name="t278"><random type="travel" dice="1"/><outcomes><outcome range="1,2">You get lost. <goto section="82"/>.</outcome><outcome range="3,4">Nothing happens</outcome></outcomes><choices><choice section="427">To Venefax</choice></choices></section>')) === null);

      const tg = gates.computeTransferGate(parse('<section name="tt"><transfer to="x" shards="10"/><goto section="9"/></section>'));
      ok('task119: computeTransferGate gates navigation after a forced transfer', !!tg && tg.navNodes.size === 1, tg ? 'n=' + tg.navNodes.size : 'null');
      ok('task119: computeTransferGate null for a force="f" (optional) transfer', gates.computeTransferGate(parse('<section><transfer to="x" shards="10" force="f"/><goto section="9"/></section>')) === null);
    }

    // --- task 119 (phase 2): DOM-free visit-state serialization (visit-state.js) ------
    {
      const ctx = visit.newCtx();
      ok('task119: newCtx has the ctx shape', ctx.applied instanceof Set && ctx.rolls instanceof Map && ctx.usedSource === null);

      const sec = parse('<section name="tv"><p>Go <goto section="9"/>.</p><items group="g" limit="2"/><group><random/><tick special="lock" cache="bet"/></group></section>');
      const pNode = visit.resolveNodePath('r.0', sec); // the <p> — a real node in the parsed tree
      ok('task119: resolveNodePath resolves a positional path to its node', pNode != null && pNode === sec.childNodes[0]);
      ok('task119: resolveNodePath null for a bad path', visit.resolveNodePath('r.9.9', sec) === null);

      ctx.applied.add('pay@r.0');
      ctx.rolls.set('roll@r.1', { total: 7 });
      ctx.awardCounts.set('k', 3);
      ctx.pathNodes.set('r.0', pNode);
      ctx.usedSource = pNode;

      const flat = visit.serializeCtx(ctx);
      ok('task119: serializeCtx flattens Sets/Maps + records usedSource as a path', Array.isArray(flat.applied) && flat.applied.includes('pay@r.0') && flat.usedSourcePath === 'r.0');

      const back = visit.deserializeCtx(flat, sec);
      ok('task119: deserializeCtx restores the memo', back.applied.has('pay@r.0') && back.rolls.get('roll@r.1').total === 7 && back.awardCounts.get('k') === 3);
      ok('task119: deserializeCtx re-resolves usedSource to the node', back.usedSource === pNode);
      ok('task119: deserializeCtx rebuilds group caps + lock caches from the section', back.groupLimits.get('g') === 2 && back.rollLockCaches.has('bet'));

      // begin()'s fresh-entry scaffold shares rebuildVisitScaffold (task 119): passing
      // state resets each roll-lock cache to unlocked (re-bet on a new visit); a resume
      // omits it and keeps a bet the player already locked.
      const gLock = GameState.create({ name:'VL119', gender:'m', profession:'Warrior', book:1, adv });
      gLock.lockCache('bet', true);
      const freshCtx = visit.newCtx();
      visit.rebuildVisitScaffold(freshCtx, sec, gLock);
      ok('task119: rebuildVisitScaffold with state (fresh entry) unlocks roll-lock caches',
         gLock.isCacheLocked('bet') === false && freshCtx.rollLockCaches.has('bet'));
      gLock.lockCache('bet', true);
      const resumeCtx = visit.newCtx();
      visit.rebuildVisitScaffold(resumeCtx, sec);
      ok('task119: rebuildVisitScaffold without state (resume) keeps a locked bet',
         gLock.isCacheLocked('bet') === true && resumeCtx.rollLockCaches.has('bet'));

      const frame = { book: 2, section: '5', sectionTodock: 'Dock', vars: { x: 1 }, location: 'Loc', entryTicks: 3, usedSource: pNode, ctx };
      const fflat = visit.serializeFrame(frame);
      ok('task119: serializeFrame flattens the frame and its ctx', fflat.book === 2 && fflat.section === '5' && fflat.usedSourcePath === 'r.0' && Array.isArray(fflat.ctx.applied));

      // task 180: a fight memo is rebuilt against the section's own <fight> nodes rather than
      // trusted, so only keys that resolve to a real fight here survive a (possibly imported)
      // load. Both key shapes are covered: 'fight@<path>' and 'fightgrp@<group>.<i>'.
      const secF = parse('<section name="tf"><p><fight name="Ogre" combat="5" defence="9" stamina="12"/></p>'
        + '<p><fight group="s" name="Spider A" combat="8" defence="12" stamina="17"/><fight group="s" name="Spider B" combat="8" defence="12" stamina="13"/></p></section>');
      const evil180 = { name: '<img onerror="x">', combat: 'NaN', defence: 'NaN', stamina: 7, maxStamina: 999, outcome: 'boom', log: ['ok', 9] };
      const fctx = visit.deserializeCtx({ fights: [
        ['fight@r.0.0', evil180],
        ['fightgrp@s.1', evil180],
        ['fight@r.0.1', evil180],   // path resolves to nothing
        ['fight@r.0', evil180],     // path resolves to a <p>, not a <fight>
        ['fightgrp@s.9', evil180],  // group exists, member index does not
        ['fightgrp@nope.0', evil180],
        ['fightgrp@s.x', evil180],  // non-numeric member index
        ['bogus@r.0.0', evil180],
      ] }, secF);
      ok('task180: deserializeCtx keeps only fight memos whose key names a real <fight>',
         fctx.fights.size === 2 && fctx.fights.has('fight@r.0.0') && fctx.fights.has('fightgrp@s.1'),
         [...fctx.fights.keys()].join('|'));
      const f180 = fctx.fights.get('fight@r.0.0');
      const g180 = fctx.fights.get('fightgrp@s.1');
      ok('task180: static identity comes from the node, dynamic fields are coerced/bounded',
         f180.name === 'Ogre' && f180.combat === 5 && f180.defence === 9 && f180.maxStamina === 12
         && f180.stamina === 7 && f180.outcome === null && f180.log.length === 1,
         `${f180.name} ${f180.combat}/${f180.defence} ${f180.stamina}/${f180.maxStamina} out=${f180.outcome}`);
      ok('task180: a group member is rebuilt from its own node, in document order',
         g180.name === 'Spider B' && g180.maxStamina === 13 && g180.group === 's', `${g180.name} ${g180.maxStamina}`);

      // task 203: deserializeFrame is the coercing inverse of serializeFrame — restoreReturn()
      // writes a frame's payload straight into live state, so a crafted/imported frame must be
      // coerced the way sanitizeData coerces the same live fields.
      const round203 = visit.deserializeFrame(fflat, sec);
      ok('task203: an ordinary frame round-trips its identity, vars, location, todock and source',
         round203.book === 2 && round203.section === '5' && round203.sectionTodock === 'Dock'
         && round203.location === 'Loc' && round203.entryTicks === 3 && round203.vars.x === 1
         && round203.usedSource === pNode && round203.sectionEl === sec,
         JSON.stringify({ b: round203.book, s: round203.section, d: round203.sectionTodock, l: round203.location, t: round203.entryTicks }));
      const evil203 = visit.deserializeFrame({
        book: '2.4', section: 5, sectionTodock: { d: 1 }, location: ['x'],
        vars: { good: 4, numeric: '7', str: 'nope', obj: { v: 1 }, nan: NaN, nul: null, inf: Infinity },
        entryTicks: -3.5, usedSourcePath: 'r.0', ctx: flat,
      }, sec);
      ok('task203: only finite numeric vars survive (a string/object/NaN var is dropped)',
         Object.keys(evil203.vars).join(',') === 'good,numeric' && evil203.vars.numeric === 7,
         JSON.stringify(evil203.vars));
      ok('task203: entryTicks becomes a non-negative integer and book a positive integer',
         evil203.entryTicks === 0 && evil203.book === 2, `ticks=${evil203.entryTicks} book=${evil203.book}`);
      ok('task203: location/sectionTodock/section are coerced to a string (or null)',
         typeof evil203.location === 'string' && typeof evil203.sectionTodock === 'string' && evil203.section === '5',
         `loc=${typeof evil203.location} dock=${typeof evil203.sectionTodock} sec=${evil203.section}`);
      ok('task203: a frame with no usable book or section drops entirely',
         visit.deserializeFrame({ book: 'nope', section: '5', ctx: flat }, sec) === null
         && visit.deserializeFrame({ book: 0, section: '5', ctx: flat }, sec) === null
         && visit.deserializeFrame({ book: 1, ctx: flat }, sec) === null
         && visit.deserializeFrame({ book: 1, section: '5', ctx: flat }, null) === null);
    }

    // --- task 203: a crafted return frame cannot push junk into live state on <return> ------
    // The same scenario as task 116's mid-detour reload, but the persisted frame is hand-edited
    // before it is rehydrated: a string/object/NaN var, a negative fractional entry-tick
    // baseline and a non-string location. After the resume, taking the <return> must leave
    // data.vars all-numeric, the <if ticks=> baseline sane, and the location a string.
    {
      const secA = parse('<section name="A203" boxes="2"><tick/><p>Source.</p></section>');
      const secD = parse('<section name="D203"><p>Detour.</p><return>Turn back</return></section>');
      const secs = { A203: secA, D203: secD };
      const g = GameState.create({ name:'T203', gender:'m', profession:'Warrior', book:1, adv });
      const cont = document.createElement('div');
      let story;
      const enter = (b, s) => { g.goTo(b, s); story.begin(secs[String(s)], b, s); };
      story = new Story(cont, g, { navigate: enter, onDeath(){}, notify(){} });
      enter(1, 'A203');
      g.setVar('mark', 9);
      g.data.location = 'Sokara';
      const it = { item: makeItem('item', 'map'), effect: { uses: -1, body: '<goto section="D203"/>' }, body: parse('<effect><goto section="D203"/></effect>') };
      story.useItem(it.item, it.effect, it.body); // A203 → D203, captures the return frame
      const record = story.serializeVisit();
      ok('task203: the mid-detour record carries a frame back to the source', !!record && !!record.frame && record.frame.section === 'A203');

      // Hand-edit the persisted frame the way an imported save file could have: every value
      // here survives a real JSON round-trip and sanitizeData (which keeps the frame verbatim).
      record.frame.vars = { mark: 9, evil: '<img onerror=x>', obj: { v: 1 } };
      record.frame.entryTicks = -4.5;
      record.frame.location = { d: 1 };
      const g2 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...g.data, visit: record }))));
      g2.data.visit.frame.vars.nan = NaN; // JSON can't carry NaN, an in-memory blob can
      const cont2 = document.createElement('div');
      let story2;
      story2 = new Story(cont2, g2, { navigate: (b, s) => { g2.goTo(b, s); story2.begin(secs[String(s)], b, s); }, onDeath(){}, notify(){} });
      const frame2 = story2.deserializeFrame(g2.data.visit.frame, secA);
      story2.resume(secD, 1, 'D203', g2.data.visit, frame2);
      cont2.querySelector('.goto').click(); // <return> — restoreReturn writes the frame into state
      ok('task203: the return lands back in the source section', story2.section === 'A203', 'sec=' + story2.section);
      ok('task203: no non-numeric var reaches data.vars',
         Object.values(g2.data.vars).every((v) => typeof v === 'number' && Number.isFinite(v)) && g2.getVar('mark') === 9,
         JSON.stringify(g2.data.vars));
      ok('task203: the tick gate compares against a sane (non-negative integer) baseline',
         Number.isInteger(g2.entryTickCount()) && g2.entryTickCount() >= 0, 'entryTicks=' + g2.entryTickCount());
      ok('task203: the restored location is a string, not an object',
         typeof g2.data.location === 'string', 'loc=' + JSON.stringify(g2.data.location));
    }

    // --- task 119 (phase 3): classifyPassive — the renderPassive decision cascade ----
    {
      const g = GameState.create({ name:'CP119', gender:'m', profession:'Warrior', book:1, adv });
      // The renderer's per-visit rule surface as a plain object (the Story satisfies it).
      const view = (sec, over = {}) => ({
        state: g, sectionEl: sec, inactive: false, hasDecline: false,
        outcomeBlessings: rules.computeOutcomeBlessings(sec), escapeCodewords: new Set(),
        sectionFights: [], fightGate: null, whileIterPendingVars: null, ctx: visit.newCtx(),
        ...over,
      });
      const classify = (sec, sel, over) => rules.classifyPassive(sec.querySelector(sel), view(sec, over));

      const plain = parse('<section><lose stamina="2">Lose 2 Stamina</lose></section>');
      ok('task119: classifyPassive plain effect → apply, words shown',
         (() => { const v = classify(plain, 'lose'); return v.mode === 'apply' && v.showWords === true; })());
      ok('task119: classifyPassive inactive branch → inert', classify(plain, 'lose', { inactive: true }).mode === 'inert');

      const storm = parse('<section><outcome blessing="storm"/><lose blessing="storm">lose it</lose></section>');
      ok('task119: classifyPassive guarded blessing loss → inert with words',
         (() => { const v = classify(storm, 'lose'); return v.mode === 'inert' && v.showWords === true; })());

      const pend = parse('<section><lose multiple="x">some</lose><random var="x"/></section>');
      ok('task119: pendingRollVar names the unrolled var a section roll will fill',
         rules.pendingRollVar(pend.querySelector('lose'), g, pend) === 'x');
      ok('task119: classifyPassive defers on a pending roll var', classify(pend, 'lose').mode === 'inert');

      const esc = parse('<section><fight/><lose codeword="Flee1"/></section>');
      ok('task119: classifyPassive deferred escape clear → inert',
         classify(esc, 'lose', { escapeCodewords: new Set(['Flee1']), sectionFights: [{ outcome: null }] }).mode === 'inert');

      ok('task119: classifyPassive hidden removetag tick → defer-cleanup',
         classify(parse('<section><tick hidden="t" removetag="Tz"/></section>'), 'tick').mode === 'defer-cleanup');

      const hp = parse('<section><tick price="k" hidden="t"/><gain flag="k" codeword="Chance"/></section>');
      ok('task119: classifyPassive hidden price arms and fires the lone linked reward',
         (() => { const v = classify(hp, 'tick'); return v.mode === 'arm-hidden-price' && v.fireReward === hp.querySelector('gain'); })());
      const hpItem = parse('<section><tick price="k" hidden="t"/><item flag="k" name="wand"/></section>');
      ok('task119: classifyPassive hidden price never fires an item-family reward (task 125)',
         (() => { const v = classify(hpItem, 'tick'); return v.mode === 'arm-hidden-price' && v.fireReward === null; })());

      const spin = parse('<section><lose shards="10" price="c">Pay</lose><random flag="c"/></section>');
      ok('task119: classifyPassive pay-to-spin price → roll-payment',
         (() => { const v = classify(spin, 'lose'); return v.mode === 'roll-payment' && v.key === 'c'; })());
      const buy1 = parse('<section><lose shards="10" price="p">Pay</lose><gain flag="p" codeword="X"/></section>');
      ok('task119: classifyPassive plain price → optional-pay', classify(buy1, 'lose').mode === 'optional-pay');

      const menu = parse('<section><lose shards="10" price="m">Pay</lose><gain flag="m" blessing="storm"/><lose flag="m" curse="Bogwater"/></section>');
      ok('task119: classifyPassive choose-one reward → choose-one-reward keyed on its flag',
         (() => { const v = classify(menu, 'gain'); return v.mode === 'choose-one-reward' && v.key === 'm'; })());
      ok('task119: classifyPassive single linked reward → inert (applies with the cost)',
         classify(buy1, 'gain').mode === 'inert');

      ok('task119: classifyPassive force="f" → forced-optional',
         classify(parse('<section><tick codeword="Aid" force="f">help</tick></section>'), 'tick').mode === 'forced-optional');

      const paySec = parse('<section><lose shards="10">give it</lose></section>');
      ok('task119: classifyPassive economic loss + escape route → payment',
         classify(paySec, 'lose', { hasDecline: true }).mode === 'payment');
      ok('task119: classifyPassive economic loss without an escape route → apply',
         classify(paySec, 'lose').mode === 'apply');

      ok('task119: classifyPassive ability="?" → ability-choice',
         classify(parse('<section><lose ability="?" amount="1">choose</lose></section>'), 'lose').mode === 'ability-choice');
      ok('task119: classifyPassive profession tick → profession-choice',
         classify(parse('<section><tick profession="mage|warrior">pick</tick></section>'), 'tick').mode === 'profession-choice');

      const gEq = GameState.create({ name:'CPEQ', gender:'m', profession:'Warrior', book:1, adv });
      gEq.data.items = [makeItem('weapon', 'sword'), makeItem('weapon', 'axe')];
      const eqSec = parse('<section><tick weapon="?" addbonus="1">enchant</tick></section>');
      ok('task119: classifyPassive open "?" enchant with 2 candidates → equipment-choice',
         rules.classifyPassive(eqSec.querySelector('tick'), view(eqSec, { state: gEq })).mode === 'equipment-choice');
      gEq.data.items = [makeItem('weapon', 'sword')];
      ok('task119: classifyPassive a single candidate is deterministic → apply',
         rules.classifyPassive(eqSec.querySelector('tick'), view(eqSec, { state: gEq })).mode === 'apply');

      const fSec = parse('<section><fight/><gain shards="100">loot</gain></section>');
      const fNode = fSec.querySelector('gain');
      const fGate = { effectNodes: new Map([[fNode, 'win']]) };
      ok('task119: classifyPassive fight-outcome effect held while unresolved',
         classify(fSec, 'gain', { fightGate: fGate, sectionFights: [{ outcome: null }] }).mode === 'inert');
      ok('task119: classifyPassive fight-outcome effect applies on a win',
         classify(fSec, 'gain', { fightGate: fGate, sectionFights: [{ outcome: 'win' }] }).mode === 'apply');

      const setSec = parse('<section><set var="y" value="7"/></section>');
      ok('task119: classifyPassive absolute set → apply, rerunnable',
         (() => { const v = classify(setSec, 'set'); return v.mode === 'apply' && v.rerunnable === true && v.setVarName === 'y'; })());
      const ownedCtx = visit.newCtx(); ownedCtx.rolledVars.add('y');
      ok('task119: classifyPassive a roll-owned set is frozen (task 61)',
         (() => { const v = classify(setSec, 'set', { ctx: ownedCtx }); return v.mode === 'apply' && v.rollOwned === true && v.rerunnable === false; })());
    }

    // --- task 119 (phase 3): choiceGate — the <choice> eligibility + payment verdict ---
    {
      const g = GameState.create({ name:'CG119', gender:'m', profession:'Warrior', book:1, adv });
      g.data.shards = 20;
      const gate = (xml, over = {}) => rules.choiceGate(g, parse(xml), { ctx: visit.newCtx(), ...over });

      ok('task119: choiceGate live choice → no reasons, shards pay by default',
         (() => { const v = gate('<choice section="9" shards="10">Pay 10</choice>'); return v.reasons.length === 0 && v.cost === 10 && v.payment.pay === true; })());
      ok('task119: choiceGate too-poor shards cost → needs N Shards',
         gate('<choice section="9" shards="50">Pay 50</choice>').reasons.join() === 'needs 50 Shards');
      ok('task119: choiceGate pay="f" never consumes', gate('<choice section="9" shards="10" pay="f">x</choice>').payment.pay === false);
      ok('task119: choiceGate a bare item= gate is kept (a mere requirement), not consumed',
         (() => { g.data.items = [makeItem('item', 'rope')]; const v = gate('<choice section="9" item="rope">use rope</choice>'); return v.reasons.length === 0 && v.payment.pay === false; })());
      ok('task119: choiceGate pay="t" consumes an item requirement (task 55)',
         gate('<choice section="9" item="rope" pay="t">give rope</choice>').payment.pay === true);
      ok('task119: choiceGate a missing item disables with its name', gate('<choice section="9" item="lantern">x</choice>').reasons.join() === 'needs lantern');
      ok('task119: choiceGate item="?" tags= names the tag class (task 47)',
         gate('<choice section="9" item="?" tags="light">x</choice>').reasons.join() === 'needs light');
      ok('task119: choiceGate box gate', gate('<choice section="9" box="Zx">x</choice>').reasons.join() === 'box not ticked');
      ok('task119: choiceGate profession gate', gate('<choice section="9" profession="mage">x</choice>').reasons.join() === 'mage only');
      ok('task119: choiceGate god gate', gate('<choice section="9" god="Tyrnai">x</choice>').reasons.join() === 'requires Tyrnai');
      ok('task119: choiceGate dead="t" only for the dead (task 28)', gate('<choice section="9" dead="t">x</choice>').reasons.join() === 'only if you are dead');
      ok('task119: choiceGate sail needs a ship here (task 89)',
         (() => { const v = gate('<choice section="9" sail="t">set sail</choice>'); return v.isSail === true && v.reasons.join() === 'you need a ship here'; })());
      ok('task119: choiceGate flag= locked until its payment arms it (task 30)',
         gate('<choice section="9" flag="k">spin</choice>').reasons.join() === 'not yet available');
      ok('task119: flagGate price= withheld while armed', (() => { g.setFlag('p1', true); return rules.flagGate(g, parse('<goto section="9" price="p1"/>')) === 'resolve this first'; })());
      const spentNode = parse('<choice section="9">once</choice>');
      const spentCtx = visit.newCtx(); spentCtx.usedSource = spentNode;
      ok('task119: isSpentSource marks the taken source action (task 110)', rules.isSpentSource(spentCtx, spentNode) === true);
      ok('task119: choiceGate spent source → already taken',
         rules.choiceGate(g, spentNode, { ctx: spentCtx }).reasons.join() === 'already taken');
      ok('task119: choiceGate foreign currency wallet (book2/545)',
         (() => { const v = gate('<choice section="9" shards="5" currency="Mithral">x</choice>'); return v.coinLabel === 'Mithral' && v.payment.foreignCoin === true && v.reasons.join() === 'needs 5 Mithral'; })());
    }

    // --- task 119 (phase 3): branchPlan — success/failure/outcomes resolution --------
    {
      const g = GameState.create({ name:'BP119', gender:'m', profession:'Warrior', book:1, adv });
      const ctx = visit.newCtx();
      const plan = (xml, roll, c = ctx) => rules.branchPlan(g, c, parse(xml), roll);

      ok('task119: branchPlan success waits for its roll', plan('<success section="9"/>', null).kind === 'skip');
      ok('task119: branchPlan success reveals on a successful roll', plan('<success section="9"/>', { success: true }).kind === 'reveal');
      ok('task119: branchPlan failure reveals on a failed roll', plan('<failure section="9"/>', { success: false }).kind === 'reveal');
      ok('task119: branchPlan ability= filters the chosen ability (task 109)',
         plan('<success ability="sanctity" section="9"/>', { success: true, ability: 'magic' }).kind === 'skip'
         && plan('<success ability="magic" section="9"/>', { success: true, ability: 'magic' }).kind === 'reveal');

      // var-keyed branches wait for a WRITE this visit, never a stale global (task 50)
      g.setVar('s', 3);
      ok('task119: branchPlan var branch pends until the var is written this visit',
         plan('<success var="s" section="9"/>', null).kind === 'skip');
      const wrote = visit.newCtx(); wrote.wroteVars.add('s');
      ok('task119: branchPlan var branch resolves on sign once written',
         plan('<success var="s" section="9"/>', null, wrote).kind === 'reveal'
         && plan('<failure var="s" section="9"/>', null, wrote).kind === 'skip');

      ok('task119: branchPlan lone outcome flag= needs no roll (book4/456)',
         (() => { g.setFlag('of', true); return plan('<outcome flag="of" section="9"/>', null).kind === 'reveal'; })());
      ok('task119: branchPlan lone outcome range= waits for the roll then matches',
         plan('<outcome range="1-6" section="9"/>', null).kind === 'skip'
         && plan('<outcome range="1-6" section="9"/>', { total: 4 }).kind === 'reveal'
         && plan('<outcome range="1-6" section="9"/>', { total: 9 }).kind === 'skip');
      ok('task119: branchPlan a held blessing vetoes a guarded outcome (task 108)',
         (() => { g.addBlessing('storm'); return plan('<outcome range="1-6" blessing="storm" section="9"/>', { total: 4 }).kind === 'skip'; })());

      const table = parse('<outcomes><outcome range="1-2" section="5"/><outcome range="3-6" section="7"/></outcomes>');
      ok('task119: branchPlan outcomes table pends without the roll',
         (() => { const v = rules.branchPlan(g, ctx, table, null); return v.kind === 'table' && v.reveal === null; })());
      ok('task119: branchPlan outcomes table reveals the single matching row',
         (() => { const v = rules.branchPlan(g, ctx, table, { total: 4 }); return v.kind === 'table' && v.reveal === table.children[1] && v.index === 1; })());

      // codeword-dispatch table: resolves with no roll; its bare default is the catch-all (task 122)
      const cwTable = parse('<outcomes><outcome codeword="Zealot" section="5"/><outcome section="7"/></outcomes>');
      ok('task119: branchPlan codeword-dispatch default resolves roll-lessly (task 122)',
         (() => { const v = rules.branchPlan(g, ctx, cwTable, null); return v.kind === 'table' && v.reveal === cwTable.children[1]; })());
      ok('task119: branchPlan codeword row wins when held',
         (() => { g.addCodeword('Zealot'); const v = rules.branchPlan(g, ctx, cwTable, null); return v.reveal === cwTable.children[0]; })());

      ok('task119: branchPlan non-branch element → prose', plan('<p>words</p>', null).kind === 'prose');

      // task 175: a var-keyed branch whose feeding roll is a PENDING reroll decision stays
      // unresolved even though the var was written — branchPlan is passed the pending-var set.
      g.setVar('m', 3); // a positive margin so the <success var="m"> would resolve once committed
      const wroteM = visit.newCtx(); wroteM.wroteVars.add('m');
      ok('task175: branchResolved — a written var resolves its branch',
         rules.branchResolved(wroteM, parse('<success var="m"/>'), null) === true);
      ok('task175: branchResolved — a pending reroll var keeps the branch unresolved',
         rules.branchResolved(wroteM, parse('<success var="m"/>'), null, new Set(['m'])) === false);
      ok('task175: branchPlan skips a var-keyed branch while its roll is pending',
         plan('<success var="m" section="9"/>', null, wroteM).kind === 'reveal'
         && rules.branchPlan(g, wroteM, parse('<success var="m" section="9"/>'), null, new Set(['m'])).kind === 'skip');
    }

    // --- task 175: reroll-decision planners (DOM-free) --------------------------------
    {
      const gL = GameState.create({ name:'RP175', gender:'m', profession:'Warrior', book:1, adv });
      gL.data.blessings = ['luck']; gL.data.permanentBlessings = [];
      const diff = parse('<difficulty ability="scouting" level="15"/>');
      ok('task175: pendingRerollBlessings — a failed check with Luck is a pending decision',
         JSON.stringify(rules.pendingRerollBlessings(gL, diff, { success: false })) === JSON.stringify(['luck']));
      ok('task175: pendingRerollBlessings — a passed check is final (no reroll)',
         rules.pendingRerollBlessings(gL, diff, { success: true }).length === 0);
      ok('task175: pendingRerollBlessings — an accepted result is final',
         rules.pendingRerollBlessings(gL, diff, { success: false, accepted: true }).length === 0);
      ok('task175: pendingRerollBlessings — any random roll with Luck is a pending decision',
         JSON.stringify(rules.pendingRerollBlessings(gL, parse('<random dice="2"/>'), { total: 7 })) === JSON.stringify(['luck']));
      const gN = GameState.create({ name:'RP175b', gender:'m', profession:'Warrior', book:1, adv });
      gN.data.blessings = [];
      ok('task175: pendingRerollBlessings — no blessing held → final immediately',
         rules.pendingRerollBlessings(gN, diff, { success: false }).length === 0);

      // viewPendingVars unions the <while>-iter and reroll pending sets (either may be absent).
      ok('task175: viewPendingVars — null when both empty', rules.viewPendingVars({}) === null);
      ok('task175: viewPendingVars — returns the sole non-empty set',
         (() => { const s = new Set(['a']); return rules.viewPendingVars({ rerollPendingVars: s }) === s; })());
      ok('task175: viewPendingVars — merges both sets',
         (() => { const u = rules.viewPendingVars({ whileIterPendingVars: new Set(['a']), rerollPendingVars: new Set(['b']) }); return u.has('a') && u.has('b'); })());
    }

    // --- task 181: the provisional-dependency planners (DOM-free) ---------------------
    // The invariant "an eligible reroll result is wholly provisional until it settles" is only
    // as good as the dependency trace behind it: which identifiers a value reads, which vars a
    // <set> chain makes provisional, and the three refusal points (condition / set / effect).
    {
      const vars = (s) => JSON.stringify(rules.expressionVars(s));
      ok('task181: expressionVars — a blank/literal reads nothing', vars('') === '[]' && vars('150') === '[]' && vars('-3') === '[]');
      ok('task181: expressionVars — a dice expression is not a variable read', vars('2d6') === '[]' && vars('1d6+2') === '[]');
      ok('task181: expressionVars — a bare/negated var', vars('roll') === '["roll"]' && vars('-hang') === '["hang"]');
      ok('task181: expressionVars — every identifier in an expression', vars('(rank+1)-roll') === '["rank","roll"]' && vars('roll*100') === '["roll"]');

      // provisionalVarClosure: a value derived from a provisional var is provisional, transitively.
      const derived = parse('<section><random dice="2" var="roll"/><set var="cash" value="roll*100"/><set var="more" value="cash+1"/><set var="flat" value="7"/></section>');
      const clos = rules.provisionalVarClosure(derived, new Set(['roll']));
      ok('task181: provisionalVarClosure — traces a derived <set> transitively',
         clos.has('roll') && clos.has('cash') && clos.has('more') && !clos.has('flat'), JSON.stringify([...clos]));
      ok('task181: provisionalVarClosure — an empty seed stays empty', rules.provisionalVarClosure(derived, new Set()).size === 0);
      ok('task181: provisionalVarClosure — an independent seed grows nothing',
         (() => { const c = rules.provisionalVarClosure(derived, new Set(['zz'])); return c.size === 1 && c.has('zz'); })());

      // unsettledRollVars: the roll vars this section has still to fill, plus their derivations.
      const gU = GameState.create({ name: 'UV181', gender: 'm', profession: 'Warrior', book: 1, adv });
      const un = rules.unsettledRollVars(derived, gU);
      ok('task181: unsettledRollVars — an unfilled roll var carries its derived values',
         un.has('roll') && un.has('cash') && un.has('more'), JSON.stringify([...un]));
      gU.setVar('roll', 10);
      ok('task181: unsettledRollVars — a filled roll var settles its whole chain',
         rules.unsettledRollVars(derived, gU).size === 0);

      // conditionPending: the var read directly, or through a comparator.
      const pv = new Set(['x']);
      ok('task181: conditionPending — a condition on a provisional var is undecided',
         rules.conditionPending(parse('<if var="x" equals="3"/>'), pv) === true);
      ok('task181: conditionPending — a comparator reading a provisional var is undecided',
         rules.conditionPending(parse('<if var="a" greaterthan="x"/>'), pv) === true);
      ok('task181: conditionPending — an unrelated condition decides normally',
         rules.conditionPending(parse('<if var="a" equals="3"/>'), pv) === false
         && rules.conditionPending(parse('<if codeword="Dove"/>'), pv) === false);
      ok('task181: conditionPending — no provisional vars → never undecided',
         rules.conditionPending(parse('<if var="x" equals="3"/>'), null) === false
         && rules.conditionPending(parse('<if var="x" equals="3"/>'), new Set()) === false);

      // setPending: only the READ side defers — a set whose TARGET a roll owns is the sentinel
      // idiom (§6.628 y=7, §2.138 open=1) and must still apply on entry.
      ok('task181: setPending — a <set> reading a provisional var defers',
         rules.setPending(parse('<set var="cash" value="x*100"/>'), pv) === true);
      ok('task181: setPending — a literal <set> applies even when its target is provisional',
         rules.setPending(parse('<set var="x" value="7"/>'), pv) === false);
      ok('task181: setPending — a non-set node is never a pending set',
         rules.setPending(parse('<tick shards="x"/>'), pv) === false);

      // effectPendingVars unions the decision boundary with the unfilled-roll-var set; a
      // condition deliberately consults only the former (viewPendingVars).
      ok('task181: effectPendingVars — unions the boundary and unfilled sets',
         (() => { const u = rules.effectPendingVars({ rerollPendingVars: new Set(['a']), unsettledVars: new Set(['b']) }); return u.has('a') && u.has('b'); })());
      ok('task181: effectPendingVars — returns the unfilled set alone when nothing is pending',
         (() => { const s = new Set(['b']); return rules.effectPendingVars({ unsettledVars: s }) === s; })());
      ok('task181: effectPendingVars — null when every set is empty', rules.effectPendingVars({}) === null);

      // pendingRollVar defers an effect keyed on any unsettled var — including a DERIVED one,
      // which is what stopped §6.352's `<gain shards="s">` banking 0 and memoising the award away.
      ok('task181: pendingRollVar — an effect on a derived unsettled var defers',
         rules.pendingRollVar(parse('<gain shards="s"/>'), gU, derived, new Set(['s'])) === 's');
      ok('task181: pendingRollVar — a literal amount never defers',
         rules.pendingRollVar(parse('<gain shards="20"/>'), gU, derived, new Set(['s'])) === null);
    }

    // --- task 119 (phase 3): groupPlan — <group> classification ----------------------
    {
      ok('task119: groupPlan routes a roll-bundling group to its roll widget (task 42)',
         (() => { const gp = rules.groupPlan(null, parse('<group><text>Try</text><random var="x"/></group>')); return gp.kind === 'roll' && gp.rollNode.tagName.toLowerCase() === 'random'; })());
      ok('task119: groupPlan wordless/effectless group → inline wrapper',
         rules.groupPlan(null, parse('<group><text>Just words</text></group>')).kind === 'inline');

      const act = rules.groupPlan(null, parse('<group><text>Buy the house</text><lose shards="200"/><tick codeword="Casa"/></group>'));
      ok('task119: groupPlan effectful labelled group → action with its effects',
         act.kind === 'action' && act.label === 'Buy the house' && act.effects.length === 2 && !act.isRevival && !act.gotoNode);

      const nav = rules.groupPlan(null, parse('<group><text>Pay and go</text><lose shards="30"/><goto section="99"/></group>'));
      ok('task119: groupPlan carries the group\'s navigation', nav.kind === 'action' && !!nav.gotoNode);

      const rev = rules.groupPlan(null, parse('<group><text>Use your deal</text><lose shards="*"/><resurrection/></group>'));
      ok('task119: groupPlan flags a no-section resurrection as a revival (task 98)', rev.kind === 'action' && rev.isRevival === true);

      const sec125 = parse('<section><group><text>Pay 100</text><lose shards="100" price="pot"/></group><item flag="pot" name="potion of restoration"/></section>');
      const linked = rules.groupPlan(sec125, sec125.querySelector('group'));
      ok('task119: groupPlan collects flag-linked awards outside the group (task 125)',
         linked.kind === 'action' && linked.linkedAwards.length === 1 && linked.linkedAwards[0].getAttribute('name') === 'potion of restoration');

      // task 246: an action group's effect list is DERIVED from engine.js's passive-effect
      // set, not written out beside it. Task 230's silent drop was that copy missing
      // <adjustmoney>, and a group renders only its button — it never walks its children —
      // so a tag it does not plan is applied nowhere. Assert the coupling, not the spelling:
      // a group carrying one of every member must plan every one of them, so adding a tag to
      // the engine's set without teaching groupPlan about it fails here.
      const all246 = [...eng.PASSIVE_BODY_TAGS].map((t) => `<${t}/>`).join('');
      const plan246 = rules.groupPlan(null, parse(`<group><text>Do it</text>${all246}</group>`));
      ok('task246: groupPlan plans every tag in the engine\'s passive-effect set',
         plan246.kind === 'action' && plan246.effects.length === eng.PASSIVE_BODY_TAGS.size,
         `planned=${plan246.effects.length} set=${eng.PASSIVE_BODY_TAGS.size}`);

      ok('task119: groupRollDefers visible cost defers to the roll', rules.groupRollDefers(parse('<lose shards="10">bet</lose>')) === true);
      ok('task119: groupRollDefers hidden book-keeping arms on entry', rules.groupRollDefers(parse('<tick price="k" hidden="t"/>')) === false);
      ok('task119: groupRollDefers a hidden cache lock still defers (task 38)', rules.groupRollDefers(parse('<tick special="lock" cache="bet" hidden="t"/>')) === true);
    }

    // --- task 119 (phase 3): grantChosenReward — the choose-one award transaction -----
    {
      const g = GameState.create({ name:'GR119', gender:'m', profession:'Warrior', book:1, adv });
      g.data.items = [];

      g.setFlag('m', true);
      const note1 = eng.grantChosenReward(g, parse('<gain flag="m" blessing="luck">Luck</gain>'), 'm', 1);
      ok('task119: grantChosenReward effect reward applies and consumes its own flag',
         g.hasBlessing('luck') && g.getFlag('m') === false, `note=${note1}`);

      g.setFlag('m', true);
      eng.grantChosenReward(g, parse('<item flag="m" name="ink sac" quantity="2"/>'), 'm', 4);
      ok('task119: grantChosenReward quantity= grants that many (§4.634, task 94)',
         g.findItems('ink sac').length === 2 && g.getFlag('m') === false);

      g.setFlag('m', true);
      const before = g.data.shards;
      eng.grantChosenReward(g, parse('<item flag="m" name="500 Shards"/>'), 'm', 1);
      ok('task119: grantChosenReward a currency award banks its value', g.data.shards === before + 500 && g.getFlag('m') === false);

      g.setFlag('m', true);
      const note2 = eng.grantChosenReward(g, parse('<resurrection flag="m" section="100" god="Elnir">deal</resurrection>'), 'm', 3);
      ok('task119: grantChosenReward arranges a resurrection deal (book defaulted)',
         g.hasResurrection() && g.data.resurrections[0].book === 3 && g.data.resurrections[0].section === '100' && g.getFlag('m') === false
         && /resurrection deal arranged/i.test(note2));

      // deduped through the engine applier: an affliction child now bites on pickup
      g.setFlag('m', true);
      eng.grantChosenReward(g, parse('<item flag="m" name="cursed idol"><curse name="Idol Curse" ability="charisma" amount="-1"/></item>'), 'm', 1);
      ok('task119: grantChosenReward item award routes through applyItemAward (curse bites on pickup)',
         g.findItems('cursed idol').length === 1 && g.hasCurse('Idol Curse'));
    }

    // --- task 113: <lose item="?" bonus="N"> enforces the bonus= filter ---
    // §4.456's Tambu offering routes its +2/+3 gifts through <lose item="?" bonus=…
    // price=…>; the bonus filter must be honoured so only a genuinely +2/+3 item can be
    // offered, and an ineligible offer must not set the price flag that opens §404/§568.
    {
      // a +2 lose takes only the +2 item and arms its price flag
      const g113 = GameState.create({ name:'T113', gender:'m', profession:'Warrior', book:4, adv });
      g113.data.items = [];
      g113.addItem(makeItem('item', 'apple'));                      // +0
      g113.addItem(makeItem('tool', 'lucky ring', 1, 'charisma'));  // +1
      g113.addItem(makeItem('weapon', 'fine blade', 2));            // +2 — the only eligible
      eng.applyEffect(parse('<lose item="?" bonus="2" price="2">a +2 item</lose>'), g113, {});
      ok('task113: a +2 lose takes only the +2 item, sparing +0/+1',
         !g113.findItems('fine blade').length && g113.findItems('apple').length === 1 && g113.findItems('lucky ring').length === 1,
         g113.data.items.map((i)=>i.name).join(','));
      ok('task113: offering a qualifying +2 item arms the price flag', g113.getFlag('2') === true);

      // no qualifying item → nothing lost, price flag stays clear
      const g113n = GameState.create({ name:'T113n', gender:'m', profession:'Warrior', book:4, adv });
      g113n.data.items = [makeItem('item', 'apple'), makeItem('tool', 'lucky ring', 1, 'charisma')]; // +0/+1 only
      eng.applyEffect(parse('<lose item="?" bonus="2" price="2">a +2 item</lose>'), g113n, {});
      ok('task113: a +2 lose with no +2 item takes nothing and leaves the flag clear',
         g113n.itemCount() === 2 && g113n.getFlag('2') !== true, 'n=' + g113n.itemCount() + ' flag=' + g113n.getFlag('2'));

      // "N+" means N or greater
      const g113h = GameState.create({ name:'T113h', gender:'m', profession:'Warrior', book:4, adv });
      g113h.data.items = [makeItem('weapon', 'ok blade', 2), makeItem('weapon', 'great blade', 4)];
      eng.applyEffect(parse('<lose item="?" bonus="3+" price="3">a +3 or greater item</lose>'), g113h, {});
      ok('task113: a "3+" lose takes a +4 item but spares a +2, and arms flag 3',
         !g113h.findItems('great blade').length && g113h.findItems('ok blade').length === 1 && g113h.getFlag('3') === true);

      // §4.456 in the app: the +2/+3 offer buttons are inert with no qualifying item
      const g456c = GameState.create({ name:'T456c', gender:'m', profession:'Warrior', book:4, adv });
      g456c.data.items = [makeItem('item', 'apple'), makeItem('tool', 'lucky ring', 1, 'charisma')]; // +0/+1 only
      const c456c = document.createElement('div');
      new Story(c456c, g456c, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(4, '456'), 4, '456');
      const offer2 = Array.from(c456c.querySelectorAll('button')).find((b)=>/a \+2 item/i.test(b.textContent));
      const offer3 = Array.from(c456c.querySelectorAll('button')).find((b)=>/\+3 or greater/i.test(b.textContent));
      ok('task113: §456 the +2/+3 offers are inert without a qualifying item',
         !!offer2 && offer2.disabled && !!offer3 && offer3.disabled,
         `o2=${offer2 && offer2.disabled} o3=${offer3 && offer3.disabled}`);

      // with a +2 item the +2 offer is live; taking it removes the item, arms flag 2 and reveals →404
      const g456d = GameState.create({ name:'T456d', gender:'m', profession:'Warrior', book:4, adv });
      g456d.data.items = [makeItem('weapon', 'fine blade', 2)];
      const c456d = document.createElement('div');
      const st456d = new Story(c456d, g456d, { navigate(){}, onDeath(){}, notify(){} });
      st456d.begin(await data.getSection(4, '456'), 4, '456');
      const offer2d = Array.from(c456d.querySelectorAll('button')).find((b)=>/a \+2 item/i.test(b.textContent));
      ok('task113: §456 the +2 offer is enabled with a +2 item', !!offer2d && !offer2d.disabled);
      offer2d.click();
      ok('task113: §456 offering the +2 item takes it, arms flag 2 and reveals →404',
         !g456d.findItems('fine blade').length && g456d.getFlag('2') === true &&
         Array.from(c456d.querySelectorAll('.goto')).some((b)=>/404/.test(b.textContent)),
         `has=${g456d.findItems('fine blade').length} flag=${g456d.getFlag('2')}`);
    }

    // --- task 114: the reroll-form storm spend consumes the blessing exactly once ---
    // §232/502/716 avoid an 11-12 capsize by spending Safety from Storms via a reroll,
    // but a rerunnable keepblessing entry set defeated the hidden loss — granting
    // unlimited protection once task 108's veto took effect. The reroll must now consume
    // an ordinary blessing (a second 11-12 then capsizes →510) while a permanent survives.
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle114 = () => new Promise((r) => setTimeout(r, 30));
      const rnd114 = Math.random;
      const rerollBtn = (c) => Array.from(c.querySelectorAll('.btn-secondary')).find((b) => /roll again|reroll/i.test(b.textContent));
      const goto510 = (c) => Array.from(c.querySelectorAll('.goto')).find((b) => /→\s*510/.test(b.textContent));

      // ordinary storm blessing: roll 11-12 → reroll (spends it) → a second 11-12 capsizes
      const g114 = GameState.create({ name:'T114', gender:'m', profession:'Warrior', book:5, adv });
      g114.data.shards = 100; g114.addBlessing('storm');
      const c114 = document.createElement('div');
      const st114 = new Story(c114, g114, { navigate(){}, onDeath(){}, notify(){} });
      st114.begin(await data.getSection(5, '232'), 5, '232');
      Math.random = () => 0.9; // 6+6 = 12 → range 11-12
      c114.querySelector('.btn-roll').click(); await settle114();
      ok('task114: §232 first 11-12 vetoes the capsize and offers a reroll (blessing still held)',
         !goto510(c114) && !!rerollBtn(c114) && g114.hasBlessing('storm'));
      rerollBtn(c114).click(); await settle114();
      ok('task114: taking the reroll spends the ordinary storm blessing', !g114.hasBlessing('storm'));
      c114.querySelector('.btn-roll').click(); await settle114();
      ok('task114: a second 11-12 with the blessing spent now capsizes (→510 revealed)', !!goto510(c114));

      // permanent storm blessing: the reroll never uses it up, so it keeps protecting
      const g114p = GameState.create({ name:'T114p', gender:'m', profession:'Warrior', book:5, adv });
      g114p.data.shards = 100; g114p.addBlessing('storm', true);
      const c114p = document.createElement('div');
      const st114p = new Story(c114p, g114p, { navigate(){}, onDeath(){}, notify(){} });
      st114p.begin(await data.getSection(5, '232'), 5, '232');
      Math.random = () => 0.9;
      c114p.querySelector('.btn-roll').click(); await settle114();
      rerollBtn(c114p).click(); await settle114();
      ok('task114: a permanent storm blessing survives the reroll', g114p.hasBlessing('storm') && g114p.isBlessingPermanent('storm'));
      c114p.querySelector('.btn-roll').click(); await settle114();
      ok('task114: the permanent blessing still vetoes a second 11-12 capsize', !goto510(c114p) && !!rerollBtn(c114p));

      Math.random = rnd114;
      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 257: a revealed table row's own die holds that row's exit ---
    // book3/15 and book3/34 are the priestess's card game. Each row's stake is a SECOND die
    // (`<random dice="2" var="x">Lose 2-12 Shards</random>` → `<tick name="3.52.Loss" amount="x">`)
    // and the row carries its own section=, so the "Continue → 52" the reveal draws beside the
    // unrolled die let the player bank a debt of 0 — §3.52's "Pay her what you owe" then rendered
    // with no price at all and settled the whole hand for nothing.
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle257 = () => new Promise((r) => setTimeout(r, 30));
      const rnd257 = Math.random;
      const cont257 = (c) => Array.from(c.querySelectorAll('.goto')).find((b) => /Continue →/.test(b.textContent));

      // the losing row: 1+1 = 2 → range 2-5 → §52, whose stake is 2d6
      const g15 = GameState.create({ name:'T257', gender:'m', profession:'Warrior', book:3, adv });
      g15.data.shards = 500;
      const c15 = document.createElement('div');
      const st15 = new Story(c15, g15, { navigate(){}, onDeath(){}, notify(){} });
      st15.begin(await data.getSection(3, '15'), 3, '15');
      // Every exit §3.15 has lives inside an outcome, which seed 1 rightly skips (§1.299's
      // drunken soldier is what the roll reveals), so the section-level gate is null either way.
      ok('task257: §3.15 builds a row gate where the section gate has nothing to hold',
         st15.outcomeRollGate !== null && st15.rollGate === null);
      ok('task257: §3.15 offers no row exit until the table itself is rolled', !cont257(c15));
      Math.random = () => 0; // both dice = 1 → 2 → range 2-5
      c15.querySelector('.btn-roll').click(); await settle257();
      ok('task257: §3.15 rolling 2 reveals the losing row, its stake die and its →52',
         !!cont257(c15) && /52/.test(cont257(c15).textContent) && !!c15.querySelector('.btn-roll'));
      ok('task257: §3.15 the row exit is held while the stake is unrolled',
         cont257(c15).disabled === true && cont257(c15).dataset.ocrollnav === '1');
      ok('task257: §3.15 the debt is genuinely unwritten at that point (task 181 defers the tick)',
         g15.codewordValue('3.52.Loss') === 0, 'v=' + g15.codewordValue('3.52.Loss'));
      c15.querySelector('.btn-roll').click(); await settle257(); // the stake: 1+1 = 2
      ok('task257: §3.15 rolling the stake releases the row exit', cont257(c15).disabled === false);
      ok('task257: §3.15 the rolled stake is banked as the debt',
         g15.codewordValue('3.52.Loss') === 2, 'v=' + g15.codewordValue('3.52.Loss'));
      // The end-to-end consequence: §3.52 prices "Pay her what you owe" from that codeword, so
      // an unrolled stake used to render it free.
      const c52 = document.createElement('div');
      new Story(c52, g15, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(3, '52'), 3, '52');
      const pay52 = Array.from(c52.querySelectorAll('.choice')).find((b) => /Pay her what you owe/i.test(b.textContent));
      const cost52 = pay52 && pay52.querySelector('.choice-cost');
      ok('task257: §3.52 charges the rolled stake for the debt',
         !!cost52 && cost52.textContent === '2 Shards', cost52 ? cost52.textContent : 'no price shown');

      // The winning row is the same hole (self-punishing rather than exploitable — skipping the
      // die banks a gain of 0 — but the row's link is held for the same reason).
      st15.begin(await data.getSection(3, '15'), 3, '15'); // fresh visit
      Math.random = () => 0.9; // both dice = 6 → 12 → range 10-12 → §72
      c15.querySelector('.btn-roll').click(); await settle257();
      ok('task257: §3.15 the winning row holds its →72 too',
         !!cont257(c15) && /72/.test(cont257(c15).textContent) && cont257(c15).disabled === true);
      c15.querySelector('.btn-roll').click(); await settle257(); // the stake: 6+6 = 12
      ok('task257: §3.15 rolling the win releases →72 and banks the winnings',
         cont257(c15).disabled === false && g15.codewordValue('3.72.Gain') === 12,
         'v=' + g15.codewordValue('3.72.Gain'));

      // book3/34, the other shipped section: a 1d6 stake, and a range-7 row that is a plain
      // <reroll> with no die of its own.
      const g34 = GameState.create({ name:'T257b', gender:'m', profession:'Warrior', book:3, adv });
      g34.data.shards = 500;
      const c34 = document.createElement('div');
      const st34 = new Story(c34, g34, { navigate(){}, onDeath(){}, notify(){} });
      st34.begin(await data.getSection(3, '34'), 3, '34');
      Math.random = () => 0; // 1+1 = 2 → range 2-6 → §52
      c34.querySelector('.btn-roll').click(); await settle257();
      ok('task257: §3.34 holds its row exit while the stake is unrolled',
         !!cont257(c34) && cont257(c34).disabled === true && g34.codewordValue('3.52.Loss') === 0);
      c34.querySelector('.btn-roll').click(); await settle257(); // the stake: 1d6 = 1
      ok('task257: §3.34 releases the exit once the stake is rolled, debt written',
         cont257(c34).disabled === false && g34.codewordValue('3.52.Loss') === 1,
         'v=' + g34.codewordValue('3.52.Loss'));

      // Control: book1/278, an ordinary table with no stake in its rows, builds no row gate and
      // leaves every destination exactly as seed 1 left it.
      const g257c = GameState.create({ name:'T257c', gender:'m', profession:'Warrior', book:1, adv });
      const c257c = document.createElement('div');
      const st257c = new Story(c257c, g257c, { navigate(){}, onDeath(){}, notify(){} });
      st257c.begin(await data.getSection(1, '278'), 1, '278');
      ok('task257: §1.278 builds no row gate', st257c.outcomeRollGate === null);
      Math.random = () => 0.5; // die = 4 → "nothing happens" (no redirect)
      c257c.querySelector('.btn-roll').click(); await settle257();
      ok('task257: §1.278 still unlocks all four destinations, none of them row-tagged',
         (() => { const cs = Array.from(c257c.querySelectorAll('.choice')); return cs.length === 4 && cs.every((b) => !b.disabled && b.dataset.ocrollnav !== '1'); })(),
         Array.from(c257c.querySelectorAll('.choice')).map((b) => b.disabled).join(','));

      Math.random = rnd257;
      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 258: a branch's section= exit is held by the gates its section is under ---
    // The "Continue → N" revealBranch draws from a branch's section= attribute has no XML node, so
    // every node-keyed nav gate missed it. §2.105's pickpocket is a forced <transfer> and the page
    // then offers an OPTIONAL SCOUTING 10 check to track him, whose <success section="128"/> drew a
    // live exit: roll it, succeed, click Continue, and the thief never took the money. Measured
    // before the fix — theft widget live, pendingTransfer set, the <choice section="151"> correctly
    // held, and Continue → 128 enabled with 40 Shards still in the purse.
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle258 = () => new Promise((r) => setTimeout(r, 30));
      const rnd258 = Math.random;
      const theft258 = (c) => Array.from(c.querySelectorAll('.pay-action')).find((b) => /stolen any money/i.test(b.textContent));
      const cont258 = (c) => Array.from(c.querySelectorAll('.goto')).find((b) => /Continue →/.test(b.textContent));

      const g105 = GameState.create({ name:'T258', gender:'m', profession:'Warrior', book:2, adv });
      g105.data.shards = 40;
      // Carrying nothing, so the theft's release is readable: §2.105 re-derives its "if you had no
      // money, he stole one possession instead" branch against the LIVE purse on every draw, so
      // with possessions in hand the emptied purse flips it on and its own forced <transfer> holds
      // the exit again — a separate defect (task 259), and not what this gate is being asked about.
      g105.data.items = [];
      const c105 = document.createElement('div');
      const st105 = new Story(c105, g105, { navigate(){}, onDeath(){}, notify(){} });
      st105.begin(await data.getSection(2, '105'), 2, '105');
      // The gate now names two exits: the printed <choice section="151"> and the <success
      // section="128"/> the SCOUTING roll can reveal.
      ok('task258: §2.105 the transfer gate collects the branch exit as well as the choice',
         !!st105.transferGate && st105.transferGate.navNodes.size === 2,
         st105.transferGate ? 'n=' + st105.transferGate.navNodes.size : 'null');
      ok('task258: §2.105 the theft is a live forced transfer on entry',
         !!theft258(c105) && !theft258(c105).disabled && st105.pendingTransfer === true);
      Math.random = () => 0.9; // 6+6 = 12 + SCOUTING vs 10 → success
      c105.querySelector('.btn-roll').click(); await settle258();
      ok('task258: §2.105 the SCOUTING success reveals its →128',
         !!cont258(c105) && /128/.test(cont258(c105).textContent));
      ok('task258: §2.105 that exit is held while the pickpocket has taken nothing',
         cont258(c105).disabled === true && cont258(c105).dataset.xfernav === '1'
         && g105.data.shards === 40,
         `dis=${cont258(c105).disabled} tag=${cont258(c105).dataset.xfernav} shards=${g105.data.shards}`);
      theft258(c105).click(); await settle258();
      ok('task258: §2.105 running the theft empties the purse and releases the exit',
         g105.data.shards === 0 && !!cont258(c105) && cont258(c105).disabled === false,
         `shards=${g105.data.shards} dis=${cont258(c105) && cont258(c105).disabled}`);

      // The rule belongs to the gate, not to §2.105: the fight and forced-buy gates collect the
      // same branch exit, though no section in books 1-6 pairs either with one.
      const fb258 = gates.computeFightGate(parse('<section name="t258f"><fight name="Ogre" combat="5" defence="9" stamina="12"/><outcomes><success section="128"/><choice section="151">Ran away</choice></outcomes></section>'), new Set());
      ok('task258: the fight gate holds a branch exit below the fight',
         !!fb258 && fb258.navNodes.size === 2, fb258 ? 'n=' + fb258.navNodes.size : 'null');
      const bb258 = gates.computeBuyGate(parse('<section name="t258b"><buy force="t" ship="barque"/><outcomes><success section="533"/></outcomes></section>'));
      ok('task258: the forced-buy gate holds a branch exit below the buy',
         !!bb258 && bb258.navNodes.size === 1, bb258 ? 'n=' + bb258.navNodes.size : 'null');
      // Position is read the same way it is for a <goto>: a branch ABOVE the action is not held.
      ok('task258: a branch exit above the forced action is untouched',
         gates.computeTransferGate(parse('<section name="t258p"><outcomes><success section="128"/></outcomes><transfer shards="*" to="x"/></section>')) === null);
      // A branch with no destination of its own is not an exit at all.
      ok('task258: a branch carrying no section= is not collected',
         gates.computeTransferGate(parse('<section name="t258n"><transfer shards="*" to="x"/><outcomes><success>You spot him.</success></outcomes></section>')) === null);

      Math.random = rnd258;
      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 259: a spend guard stays open once the walk has taken it ---
    // `<if shards="35">` / `<if item="scroll of Ebron">` wrap the price they are charging AND the
    // reward it buys. Re-derived against the live sheet on the redraw that follows the payment,
    // the guard read the purse it had just emptied and grayed its own reward. Measured before the
    // fix, and each figure below is from that run: §6.49 paid 50 Shards and wrote no god, §5.376
    // crossed off the scroll and grayed the `<goto section="509"/>` the initiation is FOR, §6.215
    // paid 35 Shards into a block that vanished, and §2.105's pickpocket took the money and then
    // a possession as well.
    {
      window.__FL_INSTANT_DICE__ = true;
      const settle259 = () => new Promise((r) => setTimeout(r, 30));
      const rnd259 = Math.random;
      const grayed = (el) => !!(el && el.closest('.cond-inactive'));
      const goto259 = (c, n) => Array.from(c.querySelectorAll('.goto')).find((b) => b.textContent.trim() === String(n));

      // §2.105 — the guard is above the effect and OUTSIDE it: `<if shards="1">` picks which of
      // "he stole your money" / "he stole one possession" runs, so emptying the purse used to turn
      // the second one on as well.
      const g105b = GameState.create({ name:'T259', gender:'m', profession:'Warrior', book:2, adv });
      g105b.data.shards = 40;
      const carried = g105b.data.items.length;
      const c105b = document.createElement('div');
      const st105b = new Story(c105b, g105b, { navigate(){}, onDeath(){}, notify(){} });
      st105b.begin(await data.getSection(2, '105'), 2, '105');
      const theft259 = () => Array.from(c105b.querySelectorAll('.pay-action')).find((b) => /stolen any money/i.test(b.textContent));
      ok('task259: §2.105 carries possessions and money into the theft', carried >= 2 && g105b.data.shards === 40, `items=${carried}`);
      theft259().click(); await settle259();
      ok('task259: §2.105 the thief takes the money and NOTHING else',
         g105b.data.shards === 0 && g105b.data.items.length === carried,
         `shards=${g105b.data.shards} items=${g105b.data.items.length}/${carried}`);
      ok('task259: §2.105 the "if you had no money" picker never opens',
         !c105b.querySelectorAll('.ability-pick').length
         && !Array.from(c105b.querySelectorAll('.pay-action')).some((b) => /choose which/i.test(b.textContent) && !b.disabled && !grayed(b)),
         Array.from(c105b.querySelectorAll('.ability-pick')).map((b) => b.textContent).join('/'));
      // An empty purse still takes the possession — the branch the page means in that case.
      const g105c = GameState.create({ name:'T259b', gender:'m', profession:'Warrior', book:2, adv });
      g105c.data.shards = 0;
      const c105c = document.createElement('div');
      new Story(c105c, g105c, { navigate(){}, onDeath(){}, notify(){} }).begin(await data.getSection(2, '105'), 2, '105');
      ok('task259: §2.105 entering penniless offers the possession instead',
         c105c.querySelectorAll('.ability-pick').length === g105c.data.items.length && g105c.data.items.length > 0,
         `picks=${c105c.querySelectorAll('.ability-pick').length} items=${g105c.data.items.length}`);

      // §5.376 — the guard is above the effect and CONTAINS it, and it also contains the exit the
      // whole initiation is for: crossing off the scroll used to gray `<goto section="509"/>`.
      const g376 = GameState.create({ name:'T259c', gender:'m', profession:'Warrior', book:5, adv });
      g376.addItem(makeItem('item', 'scroll of Ebron'));
      const c376 = document.createElement('div');
      const st376 = new Story(c376, g376, { navigate(){}, onDeath(){}, notify(){} });
      st376.begin(await data.getSection(5, '376'), 5, '376');
      const grp376 = () => Array.from(c376.querySelectorAll('.group-action'))[0];
      ok('task259: §5.376 crosses off the scroll on entry and offers the God-box action',
         !g376.findItems('scroll of Ebron').length && !!grp376() && !grp376().disabled && !grayed(grp376()));
      grp376().click(); await settle259();
      ok('task259: §5.376 writing Ebron in the God box leaves →509 reachable',
         g376.hasGod('Ebron') && !!goto259(c376, 509) && !goto259(c376, 509).disabled && !grayed(goto259(c376, 509)),
         `god=${g376.hasGod('Ebron')} 509=${!!goto259(c376, 509)} gray=${grayed(goto259(c376, 509))}`);

      // §6.49 — the reward is a flag-gated `<tick god>` under the same `<if shards="50">` as the
      // 50-Shard donation that arms it, so the payment used to close the guard on its own reward.
      const g49 = GameState.create({ name:'T259d', gender:'m', profession:'Warrior', book:6, adv });
      g49.data.shards = 50;
      const c49 = document.createElement('div');
      const st49 = new Story(c49, g49, { navigate(){}, onDeath(){}, notify(){} });
      st49.begin(await data.getSection(6, '49'), 6, '49');
      const pay49 = () => Array.from(c49.querySelectorAll('.pay-action')).find((b) => /50/.test(b.textContent));
      ok('task259: §6.49 offers the 50-Shard donation with exactly 50 Shards',
         !!pay49() && !pay49().disabled && !grayed(pay49()) && !g49.hasGod('Juntoku'));
      pay49().click(); await settle259();
      ok('task259: §6.49 paying the donation writes Juntoku in the God box',
         g49.data.shards === 0 && g49.hasGod('Juntoku'),
         `shards=${g49.data.shards} gods=${JSON.stringify(g49.data.gods)}`);

      // §6.215 — the same shape with the price bundled into the roll's own <group>. Both this and
      // §6.49 apply the price as the WALK passes it, so the guard above it is read before the purse
      // moves and the draw that follows the click is already correct — which is why neither ever
      // lost its reward. What the latch protects is the NEXT draw (either section has two more
      // clickable blocks to trigger one with), and only where a non-resource guard is not closing
      // the block anyway: §6.49's `<if safeAddGod="Juntoku">` and §6.215's `<if blessing="storm"
      // not="t">` both go false the moment the reward lands, and grayed is then the right answer —
      // the page says so ("You can have only one Safety from Storms blessing at a time"). A FAILED
      // roll is what isolates the purse guard: no blessing, so only the emptied purse could gray it.
      const g215 = GameState.create({ name:'T259e', gender:'m', profession:'Warrior', book:6, adv });
      g215.data.shards = 35; g215.data.abilities.charisma = 3;
      const c215 = document.createElement('div');
      const st215 = new Story(c215, g215, { navigate(){}, onDeath(){}, notify(){} });
      st215.begin(await data.getSection(6, '215'), 6, '215');
      Math.random = () => 0.9; // 6+6 = 12, +3 CHARISMA = 15 vs Difficulty 15 → failure, no blessing
      Array.from(c215.querySelectorAll('.btn-roll')).find((b) => !b.disabled && !grayed(b)).click();
      await settle259();
      ok('task259: §6.215 the 35 Shards are spent on the attempt and the roll decides it',
         g215.data.shards === 0 && !g215.hasBlessing('storm'),
         `shards=${g215.data.shards} storm=${g215.hasBlessing('storm')}`);
      st215.rerender(); await settle259();
      ok('task259: §6.215 a later draw still shows the attempt the player paid for',
         !grayed(c215.querySelector('.roll')),
         `gray=${grayed(c215.querySelector('.roll'))}`);

      // Control: §1.523's bribe group carries its own <goto>, so it navigates rather than
      // redrawing and was never exposed — its guard is a spend guard all the same.
      const g523 = GameState.create({ name:'T259f', gender:'m', profession:'Warrior', book:1, adv });
      g523.data.shards = 5;
      const c523 = document.createElement('div');
      const st523 = new Story(c523, g523, { navigate(){}, onDeath(){}, notify(){} });
      st523.begin(await data.getSection(1, '523'), 1, '523');
      ok('task259: §1.523 offers the 5-Shard bribe to a Warrior holding exactly 5',
         Array.from(c523.querySelectorAll('.group-action')).some((b) => !b.disabled && !grayed(b)));

      Math.random = rnd259;
      window.__FL_INSTANT_DICE__ = false;
    }

    // --- task 261: the reading is free of the guard's phrasing, because it reads the SHEET ---
    // Task 259 memoised the guard's VERDICT, which could only ever be held OPEN — so a negated
    // affordability test was excluded outright and kept re-deriving. §1.501 is the one section in
    // the corpus with that shape, and it is the exact mirror: `<if not="t" shards="1">` above the
    // `<else>` that takes the ransom turned ON the moment the money was taken, offering a player
    // who HAD paid only the "you couldn't pay" route. Measured with exactly 1 Shard before the
    // fix: first draw correct (→10 live, →288 grayed), forced redraw →288 live and →10 GRAYED.
    // Reading the purse that stood AT the guard needs no case for either phrasing.
    {
      const grayed261 = (el) => !!(el && el.closest('.cond-inactive'));
      const goto261 = (c, n) => Array.from(c.querySelectorAll('.goto')).find((b) => b.textContent.trim() === String(n));
      const mk261 = (shards) => {
        const g = GameState.create({ name: 'T261', gender: 'm', profession: 'Warrior', book: 1, adv });
        g.data.shards = shards;
        const c = document.createElement('div');
        const st = new Story(c, g, { navigate() {}, onDeath() {}, notify() {} });
        return { g, c, st };
      };
      const routes261 = (c) => `10=${goto261(c, 10) ? (grayed261(goto261(c, 10)) ? 'gray' : 'live') : 'absent'} 288=${goto261(c, 288) ? (grayed261(goto261(c, 288)) ? 'gray' : 'live') : 'absent'}`;

      // Able to pay: the captors take the Shard and release you into Yellowport, and the redraw
      // must still say so — the guard reads the purse it was answered against, not the emptied one.
      const paid261 = mk261(1);
      paid261.st.begin(await data.getSection(1, '501'), 1, '501');
      ok('task261: §1.501 with the ransom money takes it and releases you to →10',
         paid261.g.data.shards === 0 && !grayed261(goto261(paid261.c, 10)) && grayed261(goto261(paid261.c, 288)),
         `shards=${paid261.g.data.shards} ${routes261(paid261.c)}`);
      paid261.st.rerender();
      ok('task261: §1.501 a later draw does not re-route a paid ransom to "you couldn\'t pay"',
         !grayed261(goto261(paid261.c, 10)) && grayed261(goto261(paid261.c, 288)), routes261(paid261.c));

      // Penniless: the negated guard is the branch the page means, and it stays that way — the
      // ledger only ever reads the sheet as RICHER, so a visit that took nothing changes nothing.
      const broke261 = mk261(0);
      broke261.st.begin(await data.getSection(1, '501'), 1, '501');
      ok('task261: §1.501 penniless routes to →288 and pays nothing',
         broke261.g.data.shards === 0 && !grayed261(goto261(broke261.c, 288)) && grayed261(goto261(broke261.c, 10)),
         `${routes261(broke261.c)}`);
      broke261.st.rerender();
      ok('task261: §1.501 penniless still routes to →288 on a later draw',
         !grayed261(goto261(broke261.c, 288)) && grayed261(goto261(broke261.c, 10)), routes261(broke261.c));

      // The two directions the reading is deliberately asymmetric about. A guard BELOW the spend
      // reads the emptied purse (its position is past it), and a GAIN is always read live — so an
      // award still opens the choice that needs it on the next draw instead of on a re-entry.
      const mkx261 = (xml, shards, items) => {
        const g = GameState.create({ name: 'T261b', gender: 'm', profession: 'Warrior', book: 1, adv });
        g.data.items = []; g.data.shards = shards;
        (items || []).forEach((it) => g.addItem(it));
        const c = document.createElement('div');
        const st = new Story(c, g, { navigate() {}, onDeath() {}, notify() {} });
        st.begin(parse(xml), 1, 'x261');
        return { g, c, st };
      };
      // An ACTIVE branch's words go straight into the flow (renderConditionalBranch appends them
      // with no wrapper), so "is this branch live" is read off the grayed side: shown, and not
      // inside a .cond-inactive.
      const shut261 = (c) => Array.from(c.querySelectorAll('.cond-inactive')).map((s) => s.textContent).join(' | ');
      const lit261 = (c, re) => re.test(c.textContent) && !re.test(shut261(c));
      const below261 = mkx261('<section><p><lose shards="10">pay the toll</lose>.'
        + ' <if shards="10">You can still afford the ferry.</if><else>You cannot afford the ferry.</else></p></section>', 10);
      ok('task261: a guard BELOW the spend reads the emptied purse',
         below261.g.data.shards === 0 && lit261(below261.c, /cannot afford/) && !lit261(below261.c, /can still afford/),
         `shards=${below261.g.data.shards} text=${below261.c.textContent.replace(/\s+/g, ' ').trim()}`);

      const gain261 = mkx261('<section><p><if shards="10">You have the fare.</if><else>You are short.</else>'
        + ' <gain shards="10"/></p></section>', 0);
      gain261.st.rerender();
      ok('task261: a GAIN below a guard is read live, so the fare turns affordable without re-entering',
         gain261.g.data.shards === 10 && lit261(gain261.c, /have the fare/) && !lit261(gain261.c, /You are short/),
         `shards=${gain261.g.data.shards} text=${gain261.c.textContent.replace(/\s+/g, ' ').trim()}`);

      // Netting: a price is booked ONCE, however deeply it is wrapped. The walk marks every node
      // it passes, and an ancestor's mark spans its descendants' effects too — so a 30-Shard toll
      // two levels down would read back as 90 if each level booked it in full, and the guard above
      // asking for 60 would open on money the player never had.
      const nested261 = mkx261('<section><p><if shards="60">Sixty as well.</if><else>But not sixty.</else>'
        + ' <if shards="30">Thirty will do it.</if><else>Not enough.</else>'
        + '<p><p><lose shards="30">pay the toll</lose></p></p></p></section>', 30);
      nested261.st.rerender();
      ok('task261: a nested price is booked once, not once per level it is wrapped in',
         nested261.g.data.shards === 0
         && lit261(nested261.c, /Thirty will do it/) && !lit261(nested261.c, /Not enough/)
         && lit261(nested261.c, /But not sixty/) && !lit261(nested261.c, /Sixty as well/),
         `shards=${nested261.g.data.shards} text=${nested261.c.textContent.replace(/\s+/g, ' ').trim()}`);

      // §5.192 is the corpus section that needs the GROUP's own booking rather than the walk's:
      // its `<if shards="50">` wraps a <group> whose price is a `<buy ship=>`, and a buy runs from
      // the click (runBuyNode), so nothing the walk marks would ever see the 50 Shards leave. The
      // maintenance fee must not gray the block that names the Wrath of God on the Ship's Manifest.
      // Not in task 259's census, which looked for `<transfer|lose>` and so never asked about a buy.
      const g192 = GameState.create({ name: 'T261c', gender: 'f', profession: 'Wayfarer', book: 5, adv });
      g192.data.shards = 50;
      g192.addItem(makeItem('item', 'deed to the Wrath of God'));
      const c192 = document.createElement('div');
      const st192 = new Story(c192, g192, { navigate() {}, onDeath() {}, notify() {} });
      st192.begin(await data.getSection(5, '192'), 5, '192');
      const claim192 = Array.from(c192.querySelectorAll('.group-action')).find((b) => !b.disabled && !grayed261(b));
      ok('task261: §5.192 offers the 50-Shard maintenance fee with exactly 50 Shards', !!claim192);
      if (claim192) claim192.click();
      await new Promise((r) => setTimeout(r, 30));
      st192.rerender();
      ok('task261: §5.192 paying the fee keeps the block that names the ship on the Manifest',
         g192.data.shards === 0 && g192.ships.length === 1 && lit261(c192, /Ship's Manifest/),
         `shards=${g192.data.shards} ships=${g192.ships.length} shut=${shut261(c192).replace(/\s+/g, ' ').slice(0, 80)}`);
    }

    // --- task 263: a spend the player CLICKS for books at its own node too ---
    // Task 261 fed the ledger from the walk plus the two click-time commits that mattered then
    // (<transfer>, <group>). Four more click sites booked nothing, so a guard above one of them
    // went on re-deriving against the emptied purse — task 259's behaviour, in a place the rule
    // the code now states does not admit. No section in books 1-6 can reach the gap (the census
    // at the end of this block), so every case here is synthetic.
    {
      const settle263 = () => new Promise((r) => setTimeout(r, 30));
      const shut263 = (c) => Array.from(c.querySelectorAll('.cond-inactive')).map((s) => s.textContent).join(' | ');
      const lit263 = (c, re) => re.test(c.textContent) && !re.test(shut263(c));
      const why263 = (c) => `shut=${shut263(c).replace(/\s+/g, ' ').trim()}`;
      const mk263 = (xml, setup) => {
        const g = GameState.create({ name: 'T263', gender: 'm', profession: 'Warrior', book: 1, adv });
        g.data.items = []; g.data.shards = 0;
        if (setup) setup(g);
        const c = document.createElement('div');
        const st = new Story(c, g, { navigate() {}, onDeath() {}, notify() {} });
        st.begin(parse(xml), 1, 'x263');
        return { g, c, st };
      };
      const btn263 = (c, re) => Array.from(c.querySelectorAll('button')).find((b) => re.test(b.textContent) && !b.disabled);

      // A bare <buy>: the price leaves on the CLICK, so the guard above it must keep reading the
      // purse the walk passed it with — 50 Shards, and the ferryman still takes you.
      const buy263 = mk263('<section><p><if shards="50">The ferryman will still take you.</if>'
        + '<else>You cannot pay the ferryman.</else> <buy item="lantern" shards="50">a lantern</buy></p></section>',
        (g) => { g.data.shards = 50; });
      ok('task263: a guard above a bare <buy> opens on entry',
         lit263(buy263.c, /still take you/) && !!btn263(buy263.c, /lantern/i), why263(buy263.c));
      btn263(buy263.c, /lantern/i).click(); await settle263();
      ok('task263: buying the lantern does not retract the guard above its price',
         buy263.g.data.shards === 0 && buy263.g.findItems('lantern').length === 1
         && lit263(buy263.c, /still take you/) && !lit263(buy263.c, /cannot pay/),
         `shards=${buy263.g.data.shards} ${why263(buy263.c)}`);
      buy263.st.rerender(); await settle263();
      ok('task263: and a later draw still reads the purse the guard stood at',
         lit263(buy263.c, /still take you/) && !lit263(buy263.c, /cannot pay/), why263(buy263.c));

      // A paid <rest>: the nightly charge is the same shape. (A hidden rest applies as the walk
      // passes it and was already marked there.)
      const rest263 = mk263('<section><p><if shards="1">You can still afford the ferry.</if>'
        + '<else>You cannot afford the ferry.</else> <rest shards="1" stamina="1">a bed for the night</rest></p></section>',
        (g) => { g.data.shards = 1; g.data.stamina = 1; });
      ok('task263: a guard above a paid <rest> opens on entry',
         lit263(rest263.c, /still afford/) && !!btn263(rest263.c, /^Rest \(/), why263(rest263.c));
      btn263(rest263.c, /^Rest \(/).click(); await settle263();
      rest263.st.rerender(); await settle263();
      ok('task263: paying for the night does not retract the guard above the charge',
         rest263.g.data.shards === 0 && rest263.g.data.stamina === 2
         && lit263(rest263.c, /still afford/) && !lit263(rest263.c, /cannot afford/),
         `shards=${rest263.g.data.shards} stamina=${rest263.g.data.stamina} ${why263(rest263.c)}`);

      // A priced pick: the cost and its linked reward both apply on the click, so the purchase
      // books what it NET took at its own node.
      const pay263 = mk263('<section><p><if shards="30">You could still buy the map.</if>'
        + '<else>You cannot afford the map.</else> <lose shards="30" price="263.map">Pay 30 Shards</lose>'
        + '<tick codeword="263.Map" flag="263.map" hidden="t"/></p></section>',
        (g) => { g.data.shards = 30; });
      ok('task263: a guard above a priced pick opens on entry',
         lit263(pay263.c, /still buy the map/) && !!btn263(pay263.c, /Pay 30/), why263(pay263.c));
      btn263(pay263.c, /Pay 30/).click(); await settle263();
      pay263.st.rerender(); await settle263();
      ok('task263: paying for the map does not retract the guard above the price',
         pay263.g.data.shards === 0 && pay263.g.hasCodeword('263.Map')
         && lit263(pay263.c, /still buy the map/) && !lit263(pay263.c, /cannot afford/),
         `shards=${pay263.g.data.shards} cw=${pay263.g.hasCodeword('263.Map')} ${why263(pay263.c)}`);

      // The cache pair needed a decision, not just a hook: a Store moves a possession OFF the
      // sheet (booked), a Take moves one ON (a gain, deliberately read live). Both directions
      // are asserted, since they are the two the decision can be wrong about.
      const store263 = mk263('<section><p><if item="rope">You still have the rope.</if>'
        + '<else>You have no rope.</else> <itemcache name="263.store" text="Strongroom"/></p></section>',
        (g) => { g.addItem(makeItem('item', 'rope')); });
      ok('task263: a guard above an <itemcache> opens while the rope is carried',
         lit263(store263.c, /still have the rope/) && !!btn263(store263.c, /^Store Rope/), why263(store263.c));
      btn263(store263.c, /^Store Rope/).click(); await settle263();
      store263.st.rerender(); await settle263();
      ok('task263: storing the rope does not retract the guard above the strongroom',
         !store263.g.findItems('rope').length && store263.g.cacheItems('263.store').length === 1
         && lit263(store263.c, /still have the rope/) && !lit263(store263.c, /have no rope/),
         `carried=${store263.g.findItems('rope').length} ${why263(store263.c)}`);

      const take263 = mk263('<section><p><if item="rope">You still have the rope.</if>'
        + '<else>You have no rope.</else> <itemcache name="263.take" text="Strongroom"/></p></section>',
        (g) => { g.cacheAddItem('263.take', makeItem('item', 'rope')); });
      ok('task263: the same guard is shut when the rope is in the box',
         lit263(take263.c, /have no rope/) && !!btn263(take263.c, /^Take$/), why263(take263.c));
      btn263(take263.c, /^Take$/).click(); await settle263();
      take263.st.rerender(); await settle263();
      ok('task263: taking it back is a GAIN, so the guard opens on the next draw',
         take263.g.findItems('rope').length === 1
         && lit263(take263.c, /still have the rope/) && !lit263(take263.c, /have no rope/),
         `carried=${take263.g.findItems('rope').length} ${why263(take263.c)}`);

      // The census the fix was measured against, over the bundled corpus. 14 sections pair a
      // resource guard (`<if|elseif shards=|item=>`) with a <buy>/<market>/<itemcache>/
      // <moneycache>/priced <rest>, and in NOT ONE is the gap reachable: the guard sits below
      // the spend, or tests a resource the spend cannot move (3/406 and 5/145 are ship deeds
      // above a ship/crew purchase), or is a cache= test evaluateCondition never overrides
      // (6/464), or wraps a <group> whose own commit books the price (5/192, task 261). A new
      // section arriving with the guard ABOVE a bare spend lands here and wants measuring.
      const GUARD263 = /<(?:if|elseif)\b[^>]*>/gi;
      const SPEND263 = /<(?:buy|market|itemcache|moneycache)\b[^>]*>|<rest\b[^>]*\bshards\s*=[^>]*>/gi;
      const pairs263 = [], above263 = [];
      for (const b of data.availableBooks()) {
        const raw = await data.loadBook(b);
        for (const key of Object.keys(raw)) {
          const guards = [...raw[key].matchAll(GUARD263)].filter((m) => /\b(?:shards|item)\s*=/.test(m[0]));
          if (!guards.length) continue;
          const spends = [...raw[key].matchAll(SPEND263)];
          if (!spends.length) continue;
          pairs263.push(b + '/' + key);
          if (guards.some((g) => spends.some((s) => s.index > g.index))) above263.push(b + '/' + key);
        }
      }
      const pad263 = (s) => s.replace(/\d+/g, (n) => n.padStart(5, '0'));
      const sort263 = (a, b) => (pad263(a) < pad263(b) ? -1 : 1);
      ok('task263: the corpus pairs a resource guard with one of these spends in exactly 14 sections',
         pairs263.sort(sort263).join(' ') === '1/184 1/332 1/342 1/387 1/483 1/497 1/506 3/406 3/715 4/111 5/145 5/192 5/548 6/464',
         pairs263.join(' '));
      ok('task263: and only the four measured ones put the guard ABOVE the spend',
         above263.sort(sort263).join(' ') === '3/406 5/145 5/192 6/464', above263.join(' '));
    }

    // --- task 264: a branch whose own force="f" opt-in was taken stays the player's ---
    // "If you have a blessing of Safety from Storms or a catastrophe certificate, cross it off
    // and <goto section="551"/>" is ONE instruction, and the exit sits inside the guard that
    // names the price. A force="f" opt-in applies from the click, so obeying the page turned
    // that guard false and grayed →551 on the redraw: measured before the fix as `551=live
    // 183=live` on entry and `551=gray 183=live` after the click, for EACH half. Task 261's
    // ledger reaches neither half here — it books the purse and the pack, and this section
    // spends a blessing or a possession under a guard that ORs the two.
    {
      const settle264 = () => new Promise((r) => setTimeout(r, 30));
      const gray264 = (el) => !!(el && el.closest('.cond-inactive'));
      const exit264 = (c, n) => Array.from(c.querySelectorAll('.goto')).find((b) => b.textContent.trim() === String(n));
      const live264 = (c, n) => { const b = exit264(c, n); return !!b && !b.disabled && !gray264(b); };
      const why264 = (c) => `551=${live264(c, 551) ? 'live' : 'gray'} 183=${live264(c, 183) ? 'live' : 'gray'}`;
      const mk264 = async (book, sec, setup) => {
        const g = GameState.create({ name: 'T264', gender: 'f', profession: 'Wayfarer', book, adv });
        g.data.items = []; g.data.shards = 0;
        if (setup) setup(g);
        const c = document.createElement('div');
        const st = new Story(c, g, { navigate() {}, onDeath() {}, notify() {} });
        st.begin(await data.getSection(book, String(sec)), book, String(sec));
        return { g, c, st };
      };
      const opt264 = (c, re) => Array.from(c.querySelectorAll('button.pay-action'))
        .find((b) => re.test(b.textContent) && !b.disabled && !gray264(b));
      // A held branch redraws its opt-in as a CHECKED, disabled button. Asserting "not grayed"
      // alone is vacuous: a grayed branch renders its words and no button at all, so the lookup
      // returns nothing and the negation passes on its own. Ask for the button. (measured — three
      // of the assertions below passed against the un-fixed engine until this said `!!b`.)
      const held264 = (c, re) => {
        const b = Array.from(c.querySelectorAll('button.pay-action')).find((x) => re.test(x.textContent));
        return !!b && b.disabled && !gray264(b);
      };

      // Half one: the possession. Enter holding only the certificate.
      const cert264 = await mk264(6, 160, (g) => g.addItem(makeItem('item', 'catastrophe certificate')));
      ok('task264: §6.160 offers →551 and →183 to a player holding the certificate',
         live264(cert264.c, 551) && live264(cert264.c, 183) && !!opt264(cert264.c, /certificate/i),
         why264(cert264.c));
      opt264(cert264.c, /certificate/i).click(); await settle264();
      cert264.st.rerender(); await settle264();
      ok('task264: crossing off the certificate keeps the →551 it was crossed off FOR',
         !cert264.g.findItems('catastrophe certificate').length && live264(cert264.c, 551),
         `held=${cert264.g.findItems('catastrophe certificate').length} ${why264(cert264.c)}`);

      // Half two: the blessing — outside the ledger's scope entirely, and fixed for the same
      // reason as the first, which is what picked this rule over booking the item half alone.
      const bless264 = await mk264(6, 160, (g) => g.addBlessing('storm'));
      ok('task264: §6.160 offers →551 and →183 to a player holding the storm blessing',
         live264(bless264.c, 551) && live264(bless264.c, 183) && !!opt264(bless264.c, /Safety from Storms/i),
         why264(bless264.c));
      opt264(bless264.c, /Safety from Storms/i).click(); await settle264();
      bless264.st.rerender(); await settle264();
      ok('task264: crossing off the storm blessing keeps →551 too',
         !bless264.g.hasBlessing('storm') && live264(bless264.c, 551),
         `storm=${bless264.g.hasBlessing('storm')} ${why264(bless264.c)}`);

      // Holding BOTH, the page says you decide which to cross off — so the untaken one locks
      // (renderForcedOptional's choose-one group) and the block still cannot be crossed twice.
      const both264 = await mk264(6, 160, (g) => { g.addBlessing('storm'); g.addItem(makeItem('item', 'catastrophe certificate')); });
      opt264(both264.c, /certificate/i).click(); await settle264();
      both264.st.rerender(); await settle264();
      ok('task264: §6.160 holding both crosses off exactly one and keeps →551',
         !both264.g.findItems('catastrophe certificate').length && both264.g.hasBlessing('storm')
         && live264(both264.c, 551) && !opt264(both264.c, /Safety from Storms/i),
         `storm=${both264.g.hasBlessing('storm')} ${why264(both264.c)}`);

      // …and it must survive a reload, which is what the hold newly exposes: before the hold the
      // block grayed after the click, so the untaken sibling rendered no button at all and its
      // lock was never asked for. ctx.forcedChosen keyed that lock by the shared PARENT ELEMENT,
      // and a DOM node JSON-serialises to {} — so a resumed visit found no owner for the group
      // and offered the second cross-off as well, taking both the blessing AND the certificate
      // for one instruction that says "you decide which". The token is the parent's PATH now.
      const both264b = await mk264(6, 160, (g) => {
        g.addBlessing('storm'); g.addItem(makeItem('item', 'catastrophe certificate'));
        // serializeVisit's atomicity guard (task 161) emits NOTHING while the position and the
        // Story disagree, so the record has to be asked for from §6.160 itself — without this the
        // resume below rebuilds an EMPTY ctx and the assertion passes on a fresh visit instead.
        g.data.book = 6; g.data.section = '160';
      });
      opt264(both264b.c, /certificate/i).click(); await settle264();
      const rec264 = both264b.st.serializeVisit();
      ok('task264: §6.160 serialises the visit it is asked to resume', !!rec264 && rec264.section === '160');
      const g264r = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...both264b.g.data, visit: rec264 }))));
      const c264r = document.createElement('div');
      const st264r = new Story(c264r, g264r, { navigate() {}, onDeath() {}, notify() {} });
      st264r.resume(await data.getSection(6, '160'), 6, '160', g264r.data.visit, null);
      await settle264();
      ok('task264: §6.160 resumed after the reload still holds →551 and still locks the second cross-off',
         g264r.hasBlessing('storm') && live264(c264r, 551) && !opt264(c264r, /Safety from Storms/i),
         `storm=${g264r.hasBlessing('storm')} ${why264(c264r)} second=${!!opt264(c264r, /Safety from Storms/i)}`);

      // The control the hold must not break: a player with NEITHER did nothing, so nothing is
      // held open and →183 is the only route. This is what scoping the hold to the memo's own
      // path buys — a guard nobody acted inside reads exactly as it always did.
      const none264 = await mk264(6, 160, () => {});
      ok('task264: §6.160 with neither grays →551 and sends the player to →183',
         !live264(none264.c, 551) && live264(none264.c, 183), why264(none264.c));

      // The five other sections the hold can reach. None holds an exit or an effect inside the
      // guard, so all the change does is stop the words graying under a tick just made — but
      // each is a shipped section whose draw moves, so each is asserted.
      const tyrnai264 = async (book, sec) => {
        const r = await mk264(book, sec, (g) => { g.data.abilities.combat = 8; });
        const btn = opt264(r.c, /Tyrnai/i);
        ok(`task264: §${book}.${sec} offers the Tyrnai initiation to a COMBAT 8 godless player`, !!btn);
        if (btn) btn.click();
        await settle264();
        r.st.rerender(); await settle264();
        ok(`task264: §${book}.${sec} keeps the initiation words open once Tyrnai is written`,
           r.g.hasGod('Tyrnai') && r.g.data.gods.length === 1 && held264(r.c, /Tyrnai/i),
           `gods=${JSON.stringify(r.g.data.gods)} held=${held264(r.c, /Tyrnai/i)}`);
      };
      await tyrnai264(1, 636);
      await tyrnai264(2, 135);
      await tyrnai264(5, 435);

      // §3.330's renunciation: the guard IS the god the opt-in gives up.
      const ren264 = await mk264(3, 330, (g) => g.setGod('The Three Fortunes'));
      const quit264 = opt264(ren264.c, /no longer wish/i);
      ok('task264: §3.330 offers the renunciation to an initiate of The Three Fortunes', !!quit264);
      if (quit264) quit264.click();
      await settle264();
      ren264.st.rerender(); await settle264();
      ok('task264: §3.330 keeps the renunciation words open once the god is given up',
         !ren264.g.hasGod('The Three Fortunes') && held264(ren264.c, /no longer wish/i),
         `gods=${JSON.stringify(ren264.g.data.gods)} held=${held264(ren264.c, /no longer wish/i)}`);

      // §4.263's arena winnings: the guard is a codeword the branch's own hidden <lose> spends
      // as the walk passes it, so this block grayed on the draw after the payout was claimed.
      const arena264 = await mk264(4, 263, (g) => { g.addCodeword('4.127.1'); g.setCacheMoney('4.127', 20); });
      const claim264 = opt264(arena264.c, /add the amount/i);
      ok('task264: §4.263 offers the winning bettor the payout', !!claim264 && !arena264.g.hasCodeword('4.127.1'));
      if (claim264) claim264.click();
      await settle264();
      arena264.st.rerender(); await settle264();
      ok('task264: §4.263 keeps the payout words open once the winnings are claimed',
         arena264.g.cacheMoney('4.127') === 40 && held264(arena264.c, /add the amount/i),
         `stake=${arena264.g.cacheMoney('4.127')} held=${held264(arena264.c, /add the amount/i)}`);

      // …and the two sections the filing named as the ones the hold must NOT reach. Neither
      // carries a force="f" EFFECT node, so "the reward LANDED, so graying is right" still
      // grays them: §6.215's blessing block and §6.49's initiation block both go shut.
      const held215 = await mk264(6, 215, (g) => { g.data.shards = 35; g.addBlessing('storm'); });
      ok('task264: §6.215 still shuts the blessing block for a player who already has one',
         /only one Safety from Storms/.test(Array.from(held215.c.querySelectorAll('.cond-inactive')).map((s) => s.textContent).join(' ')),
         held215.c.textContent.replace(/\s+/g, ' ').slice(0, 120));
      const don49 = await mk264(6, 49, (g) => { g.data.shards = 50; });
      const pay49b = Array.from(don49.c.querySelectorAll('.pay-action')).find((b) => /50/.test(b.textContent) && !gray264(b));
      ok('task264: §6.49 offers the 50-Shard donation to a godless player', !!pay49b);
      if (pay49b) pay49b.click();
      await settle264();
      don49.st.rerender(); await settle264();
      ok('task264: §6.49 still grays the initiation block once Juntoku is written',
         don49.g.hasGod('Juntoku')
         && /write Juntoku/.test(Array.from(don49.c.querySelectorAll('.cond-inactive')).map((s) => s.textContent).join(' ')),
         `gods=${JSON.stringify(don49.g.data.gods)}`);

      // The census the hold was scoped against, over the bundled corpus. Only an EFFECT node
      // renders as the opt-in this rule keys on (renderForcedOptional): of the 147 sections
      // carrying force="f", 42 put one inside an if/elseif/else branch, but 35 of those are an
      // optional <goto> exit and 12 a <difficulty> roll. Six sections are left, and a seventh
      // arriving in a future book wants measuring the way these were.
      const OPT264 = /<(lose|gain|tick|set|transfer|adjust|adjustmoney)\b[^>]*\bforce="f"[^>]*>/gi;
      const TAG264 = /<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g;
      const under264 = [];
      for (const b of data.availableBooks()) {
        const raw = await data.loadBook(b);
        for (const key of Object.keys(raw)) {
          const xml = raw[key];
          if (!OPT264.test(xml)) { OPT264.lastIndex = 0; continue; }
          OPT264.lastIndex = 0;
          const stack = []; let m; let hit = false;
          TAG264.lastIndex = 0;
          while ((m = TAG264.exec(xml))) {
            const [, close, tag, attrs, selfClose] = m;
            const t = tag.toLowerCase();
            if (close) { if (stack.length && stack[stack.length - 1] === t) stack.pop(); continue; }
            if (/\bforce="f"/.test(attrs) && /^(lose|gain|tick|set|transfer|adjust|adjustmoney)$/.test(t)
                && (stack.includes('if') || stack.includes('elseif') || stack.includes('else'))) hit = true;
            if (!selfClose) stack.push(t);
          }
          if (hit) under264.push(b + '/' + key);
        }
      }
      const pad264 = (s) => s.replace(/\d+/g, (n) => n.padStart(5, '0'));
      ok('task264: exactly six corpus sections put a force="f" effect node under a guard',
         under264.sort((a, b) => (pad264(a) < pad264(b) ? -1 : 1)).join(' ') === '1/636 2/135 3/330 4/263 5/435 6/160',
         under264.join(' '));
    }

    // --- task 265: the last three click-time takings book at their own node too ---
    // Task 263 hooked four commits and its own census named three more that still booked
    // nothing: a market row's Buy/Sell, an inline <sell>, and the open-pick family (the player
    // names which thing leaves, and the commit runs on the pick). No section in books 1-6 can
    // reach the gap — the census at the end of this block, reproduced from the source XML and
    // the bundled JSON alike — so every case here is synthetic, and a section arriving with the
    // guard above one of them lands on that census instead of on a silent wrong answer.
    {
      const settle265 = () => new Promise((r) => setTimeout(r, 30));
      const shut265 = (c) => Array.from(c.querySelectorAll('.cond-inactive')).map((s) => s.textContent).join(' | ');
      const lit265 = (c, re) => re.test(c.textContent) && !re.test(shut265(c));
      const why265 = (c) => `shut=${shut265(c).replace(/\s+/g, ' ').trim()}`;
      const mk265 = (xml, setup) => {
        const g = GameState.create({ name: 'T265', gender: 'f', profession: 'Warrior', book: 1, adv });
        g.data.items = []; g.data.shards = 0;
        if (setup) setup(g);
        const c = document.createElement('div');
        const st = new Story(c, g, { navigate() {}, onDeath() {}, notify() {} });
        st.begin(parse(xml), 1, 'x265');
        return { g, c, st };
      };
      const btn265 = (c, re) => Array.from(c.querySelectorAll('button')).find((b) => re.test(b.textContent) && !b.disabled);

      // A market row's Buy: the price leaves on the CLICK, so the guard above the stall must keep
      // reading the purse the walk passed it with.
      const mbuy265 = mk265('<section><p><if shards="50">The ferryman will still take you.</if>'
        + '<else>You cannot pay the ferryman.</else>'
        + '<market><trade item="lantern" buy="50"/></market></p></section>',
        (g) => { g.data.shards = 50; });
      ok('task265: a guard above a market row opens on entry',
         lit265(mbuy265.c, /still take you/) && !!btn265(mbuy265.c, /^Buy 50$/), why265(mbuy265.c));
      btn265(mbuy265.c, /^Buy 50$/).click(); await settle265();
      mbuy265.st.rerender(); await settle265();
      ok('task265: buying at the stall does not retract the guard above it',
         mbuy265.g.data.shards === 0 && mbuy265.g.findItems('lantern').length === 1
         && lit265(mbuy265.c, /still take you/) && !lit265(mbuy265.c, /cannot pay/),
         `shards=${mbuy265.g.data.shards} ${why265(mbuy265.c)}`);

      // The same row's Sell: the possession is handed over here (booked) and the price is a GAIN,
      // which the ledger deliberately reads live — the cache pair's asymmetry, on one button.
      const msell265 = mk265('<section><p><if item="rope">You still have the rope.</if>'
        + '<else>You have no rope.</else>'
        + '<market><trade item="rope" sell="10"/></market></p></section>',
        (g) => { g.addItem(makeItem('item', 'rope')); });
      ok('task265: a guard above a market row that BUYS from you opens while the rope is carried',
         lit265(msell265.c, /still have the rope/) && !!btn265(msell265.c, /^Sell 10$/), why265(msell265.c));
      btn265(msell265.c, /^Sell 10$/).click(); await settle265();
      msell265.st.rerender(); await settle265();
      ok('task265: selling the rope does not retract the guard above the stall',
         !msell265.g.findItems('rope').length && msell265.g.data.shards === 10
         && lit265(msell265.c, /still have the rope/) && !lit265(msell265.c, /have no rope/),
         `carried=${msell265.g.findItems('rope').length} shards=${msell265.g.data.shards} ${why265(msell265.c)}`);

      // An inline <sell> — §5.446's selenium-ore income, in miniature. (Its cargo form needs no
      // hook: a Cargo Unit lives on a ship, outside the ledger's purse and pack.)
      const isell265 = mk265('<section><p><if item="selenium ore">You still have the ore.</if>'
        + '<else>You have no ore.</else>'
        + '<sell item="selenium ore" shards="800"/></p></section>',
        (g) => { g.addItem(makeItem('item', 'selenium ore')); });
      ok('task265: a guard above an inline <sell> opens while the ore is carried',
         lit265(isell265.c, /still have the ore/) && !!btn265(isell265.c, /^Sell Selenium Ore/), why265(isell265.c));
      btn265(isell265.c, /^Sell Selenium Ore/).click(); await settle265();
      isell265.st.rerender(); await settle265();
      ok('task265: selling the ore does not retract the guard above the offer',
         !isell265.g.findItems('selenium ore').length && isell265.g.data.shards === 800
         && lit265(isell265.c, /still have the ore/) && !lit265(isell265.c, /have no ore/),
         `carried=${isell265.g.findItems('selenium ore').length} ${why265(isell265.c)}`);

      // The open-pick family, one: a bare <lose item="?"> hazard row. The forfeit is taken from
      // the PICK, so the guard above it must read the pack the walk passed it with. Two items, so
      // the pick is a real choice (needsForfeitChoice); the rope is the one named.
      const forf265 = mk265('<section><p><if item="rope">You still have the rope.</if>'
        + '<else>You have no rope.</else>'
        + '<lose item="?">lose one item</lose></p></section>',
        (g) => { g.addItem(makeItem('item', 'rope')); g.addItem(makeItem('item', 'lantern')); });
      const pick265 = Array.from(forf265.c.querySelectorAll('.forfeit-choice button')).find((b) => b.textContent === 'rope');
      ok('task265: an open forfeit offers the pick with the guard above it open',
         lit265(forf265.c, /still have the rope/) && !!pick265, why265(forf265.c));
      if (pick265) pick265.click();
      await settle265();
      forf265.st.rerender(); await settle265();
      ok('task265: naming the rope as the forfeit does not retract the guard above the row',
         !forf265.g.findItems('rope').length && forf265.g.findItems('lantern').length === 1
         && lit265(forf265.c, /still have the rope/) && !lit265(forf265.c, /have no rope/),
         `carried=${forf265.g.data.items.map((i) => i.name).join(',')} ${why265(forf265.c)}`);

      // Two: an ability pick. A point is neither purse nor pack, so the corpus's open ability
      // specs book nothing — but the node applies WHOLE, so one carrying a price is charged on
      // the pick, and that is the case with teeth. (classifyPassive reaches 'ability-choice'
      // rather than 'payment' because the section offers no force="f" decline.)
      const abil265 = mk265('<section><p><if shards="10">You can still pay the scribe.</if>'
        + '<else>You cannot pay the scribe.</else>'
        + '<lose ability="?" shards="10">give up a point</lose></p></section>',
        (g) => { g.data.shards = 10; });
      const apick265 = Array.from(abil265.c.querySelectorAll('button.ability-pick'))[0];
      ok('task265: a priced ability pick offers the picker with the guard above it open',
         lit265(abil265.c, /still pay the scribe/) && !!apick265, why265(abil265.c));
      if (apick265) apick265.click();
      await settle265();
      abil265.st.rerender(); await settle265();
      ok('task265: the priced ability pick does not retract the guard above its cost',
         abil265.g.data.shards === 0
         && lit265(abil265.c, /still pay the scribe/) && !lit265(abil265.c, /cannot pay the scribe/),
         `shards=${abil265.g.data.shards} ${why265(abil265.c)}`);

      // Three: an equipment pick. This form is a <tick> that MODIFIES the possession named
      // (addbonus/addtag/removetag), so it takes nothing — and the ledger must stay empty, which
      // is the same asymmetry the cache Take asserts: booking a gain would read the sheet poorer
      // than it is and shut a guard the page leaves open.
      const eq265 = mk265('<section><p><if item="rope">You still have the rope.</if>'
        + '<else>You have no rope.</else>'
        + '<tick item="?" addbonus="1">bless one possession</tick></p></section>',
        (g) => { g.addItem(makeItem('item', 'rope')); g.addItem(makeItem('item', 'lantern')); });
      const epick265 = Array.from(eq265.c.querySelectorAll('button.ability-pick')).find((b) => /^rope/.test(b.textContent));
      ok('task265: an equipment pick offers the possession list', !!epick265,
         Array.from(eq265.c.querySelectorAll('button.ability-pick')).map((b) => b.textContent).join(','));
      if (epick265) epick265.click();
      await settle265();
      ok('task265: an equipment pick modifies rather than takes, so it books nothing',
         eq265.g.findItems('rope')[0].bonus === 1 && eq265.st.ctx.spends.size === 0
         && lit265(eq265.c, /still have the rope/),
         `bonus=${eq265.g.findItems('rope')[0].bonus} spends=${eq265.st.ctx.spends.size}`);

      // The census the three hooks were measured against, reproduced from the bundled corpus (it
      // was also run over books/**/*.xml before the hooks went in, and both sources return this
      // same pair of sections). Two sections put a resource guard ABOVE one of these sites and
      // NEITHER can reach the gap: §5.145's `<if item="deed to the Wrath of God">` sits above a
      // ship market and a cargo market, and no market row there can move that deed; §5.66's
      // `<if shards="5">` is the chain the `<lose item="?">` lives in — the else-branch forfeit
      // takes a possession, which the guard does not test. §3.640's open forfeit carries
      // choose="f" (a sweep, not a pick), so the WALK applies it and marks it where it stands,
      // which is why it is not in this list at all.
      const GUARD265 = /<(?:if|elseif)\b[^>]*>/gi;
      const at265 = (tag, a) => { const m = new RegExp('\\b' + a + '\\s*=\\s*"([^"]*)"', 'i').exec(tag); return m ? m[1] : null; };
      const openForfeit265 = (tag) => {
        const spec = at265(tag, 'item') != null ? at265(tag, 'item') : at265(tag, 'cargo');
        if (spec == null || (spec !== '?' && spec.trim() !== '')) return false;
        const ch = at265(tag, 'choose');
        if (ch != null && !/^(t|true|1|y|yes)$/i.test(ch)) return false;
        return !['tags', 'bonus', 'using'].some((a) => at265(tag, a) != null);
      };
      const abilityPick265 = (tag) => {
        const ab = at265(tag, 'ability');
        if (ab == null) return false;
        const s = ab.trim().toLowerCase();
        return s === '?' || s.includes('|');
      };
      const equipPick265 = (tag) => {
        if (!['addbonus', 'addtag', 'removetag'].some((a) => at265(tag, a) != null)) return false;
        const k = ['weapon', 'armour', 'tool', 'item'].find((a) => at265(tag, a) != null);
        if (k == null) return false;
        const pat = String(at265(tag, k) || '').trim();
        if (pat !== '?' && pat !== '') return false;
        return !(at265(tag, 'using') || at265(tag, 'tags') || at265(tag, 'cache'));
      };
      const SITES265 = {
        market: (x) => [...x.matchAll(/<market\b[^>]*>/gi)],
        sell: (x) => [...x.matchAll(/<sell\b[^>]*>/gi)],
        forfeit: (x) => [...x.matchAll(/<lose\b[^>]*>/gi)].filter((m) => openForfeit265(m[0])),
        ability: (x) => [...x.matchAll(/<(?:lose|gain|tick)\b[^>]*>/gi)].filter((m) => abilityPick265(m[0])),
        equip: (x) => [...x.matchAll(/<tick\b[^>]*>/gi)].filter((m) => equipPick265(m[0])),
      };
      const pairs265 = [], above265 = [];
      for (const b of data.availableBooks()) {
        const raw = await data.loadBook(b);
        for (const key of Object.keys(raw)) {
          const guards = [...raw[key].matchAll(GUARD265)].filter((m) => /\b(?:shards|item)\s*=/.test(m[0]));
          if (!guards.length) continue;
          for (const [kind, find] of Object.entries(SITES265)) {
            const sites = find(raw[key]);
            if (!sites.length) continue;
            pairs265.push(kind + ':' + b + '/' + key);
            if (guards.some((g) => sites.some((s) => s.index > g.index))) above265.push(kind + ':' + b + '/' + key);
          }
        }
      }
      const pad265 = (s) => s.replace(/\d+/g, (n) => n.padStart(5, '0'));
      const sort265 = (a) => a.sort((x, y) => (pad265(x) < pad265(y) ? -1 : 1));
      ok('task265: the corpus pairs a resource guard with one of these three sites in six places',
         sort265(pairs265).join(' ') === 'forfeit:5/66 market:1/332 market:3/715 market:4/111 market:5/145 sell:5/446',
         pairs265.join(' '));
      ok('task265: and only the two measured ones put the guard ABOVE the site',
         sort265(above265).join(' ') === 'forfeit:5/66 market:5/145', above265.join(' '));
    }

    // --- task 266: a branch whose own click-time <buy> has fired is the player's ---
    // §4.605 and §4.658 print "you can upgrade Crew Quality one level" and then spell that out as
    // a three-branch chain: `<if crew="poor">…<buy crew="average" shards="0"/>`, `<elseif
    // crew="average">…good`, `<elseif crew="good">…excellent`. A <buy> applies from the CLICK, so
    // the redraw re-derived the chain against the crew it had just changed — the taken branch
    // grayed and the NEXT elseif became the active one, offering the next grade. Measured through
    // the rendered page before the fix, a poor crew climbed poor->average->good->excellent for 0
    // Shards: 300 Shards at §5.145's shipyard prices, and a permanently better crew on every sea
    // roll. canUpgradeCrew is no defence — it enforces one grade PER CLICK, which each click
    // honestly is.
    //
    // The fix is task 264's hold, one memo wider: a branch whose own click-time opt-in has fired
    // is the player's for the rest of the visit, whether that opt-in was a force="f" effect node
    // or a <buy> widget. Scoped by census (below) to a STANDALONE <buy>, which is exactly these
    // two sections plus §3.161, whose chain ends there and where a hold only stops words graying.
    {
      const settle266 = () => new Promise((r) => setTimeout(r, 30));
      const gray266 = (el) => !!(el && el.closest('.cond-inactive'));
      const mk266 = async (book, sec, crew, setup) => {
        const g = GameState.create({ name: 'T266', gender: 'f', profession: 'Wayfarer', book, adv });
        g.data.items = []; g.data.shards = 0;
        if (crew) g.addShip({ type: 'brigantine', name: 'Hull', crew, cargo: [], docked: null });
        if (setup) setup(g);
        const c = document.createElement('div');
        const st = new Story(c, g, { navigate() {}, onDeath() {}, notify() {} });
        st.begin(await data.getSection(book, String(sec)), book, String(sec));
        await settle266();
        return { g, c, st };
      };
      const offer266 = (c, re) => Array.from(c.querySelectorAll('button.btn-mini'))
        .find((b) => re.test(b.textContent) && !b.disabled && !gray266(b));
      const grade266 = (g) => (g.currentShip() ? g.currentShip().crew : 'none');
      // Click whatever upgrade the page then offers, redraw, and record the grade — until it
      // offers none. The grade SEQUENCE is the assertion, which is how the defect was filed.
      const climb266 = async (r, re) => {
        const seq = [grade266(r.g)];
        for (let i = 0; i < 5; i++) {
          const b = offer266(r.c, re);
          if (!b) break;
          b.click();
          await settle266();
          r.st.rerender();
          await settle266();
          seq.push(grade266(r.g));
        }
        return seq.join('->');
      };

      const p605 = await mk266(4, 605, 'poor');
      ok('task266: §4.605 upgrades a poor crew exactly ONE level',
         await climb266(p605, /upgrade/i) === 'poor->average', `crew=${grade266(p605.g)}`);
      // The held branch must still SAY what the player did, rather than graying out from under
      // them (task 264's rule) — its words stay live and its button redraws checked and dead.
      const done605 = Array.from(p605.c.querySelectorAll('button.btn-mini')).find((b) => /upgrade it to average/i.test(b.textContent));
      ok('task266: §4.605 redraws the taken upgrade as a checked, dead button in a live branch',
         !!done605 && done605.disabled && !gray266(done605) && /☑/.test(done605.textContent),
         `btn=${done605 && done605.textContent} gray=${gray266(done605)}`);

      // Entering part-way up the chain: the hold is keyed by the acting branch's own path, so an
      // average crew takes the elseif's step and stops there too.
      const a605 = await mk266(4, 605, 'average');
      ok('task266: §4.605 upgrades an average crew exactly ONE level',
         await climb266(a605, /upgrade/i) === 'average->good', `crew=${grade266(a605.g)}`);
      const x605 = await mk266(4, 605, 'excellent');
      ok('task266: §4.605 offers an excellent crew nothing at all',
         await climb266(x605, /upgrade/i) === 'excellent', `crew=${grade266(x605.g)}`);

      // §4.658 runs the same chain after its forced barque, which carries the lost ship's crew
      // over via <set var="oldcrew" value="crew"/> + initialCrew="oldcrew".
      const p658 = await mk266(4, 658, 'poor');
      const barque266 = Array.from(p658.c.querySelectorAll('button.btn-mini')).find((b) => /Note it/i.test(b.textContent));
      ok('task266: §4.658 offers its forced barque to a poor-crewed captain', !!barque266 && !barque266.disabled);
      if (barque266) barque266.click();
      await settle266(); p658.st.rerender(); await settle266();
      ok('task266: §4.658 carries the poor crew onto the barque and upgrades it exactly ONE level',
         await climb266(p658, /becomes/i) === 'poor->average', `crew=${grade266(p658.g)}`);

      // The control the filing named: §3.161 has ONE `<if crew="poor">` and no elseif, so there
      // was nowhere to step to and it was sound before the fix. It must stay sound.
      const p161 = await mk266(3, 161, 'poor');
      ok('task266: §3.161 (the control) still upgrades a poor crew exactly ONE level',
         await climb266(p161, /upgrades them/i) === 'poor->average', `crew=${grade266(p161.g)}`);

      // …and the section the hold must NOT reach: §5.145's shipyard is PRICED and repeatable, and
      // its four crew buys sit in plain prose under no guard at all, so a visit still climbs every
      // grade it pays for. 50 + 100 + 150 = 300 Shards.
      const p145 = await mk266(5, 145, 'poor', (g) => { g.data.shards = 500; });
      ok('task266: §5.145\'s priced shipyard still sells every grade in one visit',
         await climb266(p145, /Hire .* crew/i) === 'poor->average->good->excellent' && p145.g.data.shards === 200,
         `crew=${grade266(p145.g)} shards=${p145.g.data.shards}`);

      // The census the hold is scoped by, over the bundled corpus (run over books/**/*.xml too,
      // which returns the same sections and the same two with a branch below). A <buy> inside a
      // <group> is deliberately NOT counted: a collapsed group runs its purchase headlessly through
      // runBuyNode, which mints no per-node memo for the hold to key on — that excludes §4.622's
      // three salvage buys and §5.192's Wrath of God, both group-wrapped, and both of which a
      // census over the raw tags alone reports. Of the three standalone sites left, only §4.605 and
      // §4.658 have a FURTHER branch below the one that buys, which is the whole defect; §3.161
      // ends its chain, so the hold there only stops the words graying under a click just made.
      // Self-closing is read off the whole match, not a trailing (\/?) group: the attribute run
      // is greedy and `[^">]` matches the `/` itself, so the group captures empty every time and
      // every `<buy …/>` reads as an OPEN tag that swallows its siblings. (measured: the census
      // returned 3/406, 4/440 and 5/145 — sections with no branch-level buy at all.)
      const TAG266 = /<(\/?)([a-zA-Z][\w-]*)(?:"[^"]*"|[^">])*>/g;
      const BR266 = new Set(['elseif', 'else']);
      const scan266 = (xml) => {
        const root = { tag: '#root', kids: [], buy: false };
        const stack = [root];
        const shut = () => {
          const frame = stack.pop();
          const parent = stack[stack.length - 1];
          if (frame.tag !== 'group' && frame.buy) parent.buy = true;
          parent.kids.push(frame);
        };
        let m;
        const src = xml.replace(/<!--[\s\S]*?-->/g, '');
        TAG266.lastIndex = 0;
        while ((m = TAG266.exec(src))) {
          const [, close, name] = m;
          const t = name.toLowerCase();
          if (close) { if (stack.length > 1 && stack[stack.length - 1].tag === t) shut(); continue; }
          stack.push({ tag: t, kids: [], buy: t === 'buy' });
          if (/\/>$/.test(m[0])) shut();
        }
        while (stack.length > 1) shut();
        // Every chain of sibling branches. Interleaved TEXT does not break one (render.js), and
        // text is not in `kids` at all; any other ELEMENT does.
        const out = { branches: 0, below: 0 };
        const take = (chain) => chain.forEach((b, i) => {
          if (!b.buy) return;
          out.branches += 1;
          if (chain.length - i - 1 > 0) out.below += 1;
        });
        const walk = (frame) => {
          let chain = [];
          for (const k of frame.kids) {
            if (k.tag === 'if') { take(chain); chain = [k]; }
            else if (BR266.has(k.tag)) { if (chain.length) chain.push(k); }
            else { take(chain); chain = []; }
            walk(k);
          }
          take(chain);
        };
        walk(root);
        return out;
      };
      const all266 = [], deep266 = [];
      for (const b of data.availableBooks()) {
        const raw = await data.loadBook(b);
        for (const key of Object.keys(raw)) {
          const r = scan266(raw[key]);
          if (r.branches) all266.push(b + '/' + key + ':' + r.branches);
          if (r.below) deep266.push(b + '/' + key + ':' + r.below);
        }
      }
      const pad266 = (s) => s.replace(/\d+/g, (n) => n.padStart(5, '0'));
      const sort266 = (a) => a.sort((x, y) => (pad266(x) < pad266(y) ? -1 : 1));
      ok('task266: three corpus sections put a standalone <buy> inside an if/elseif branch',
         sort266(all266).join(' ') === '3/161:1 4/605:3 4/658:3', all266.join(' '));
      ok('task266: and only §4.605 and §4.658 put a further branch BELOW the one that buys',
         sort266(deep266).join(' ') === '4/605:2 4/658:2', deep266.join(' '));
    }

    // --- task 262: §1.460 states the printed OR instead of a port-invented proxy ---
    // The page promises "If you have the codeword *Acid* or a **copper amulet**" and the section
    // guarded it with `<if codeword="1.Skabb">`, a test of neither named thing. The proxy was a
    // deliberate repair (task 3 makes `codeword= item=` on one <if> an AND, which is wrong for an
    // "or"), and it is sound on every ordinary route: §554 kills King Skabb, hands over the amulet
    // and ticks 1.Skabb; §384 takes the amulet back, charges 450 Shards and notes Acid. What it
    // records is HAVING BEEN to §554, not still holding the proof — so a player who loses the amulet
    // without reaching §384 was still sent to →327 on a condition the page says they fail. An
    // if/elseif pair states the OR directly, and 1.Skabb now has no writer or reader in the corpus.
    {
      const has262 = (c) => !!Array.from(c.querySelectorAll('.goto')).find((b) => b.textContent.trim() === '327' && !b.disabled && !b.closest('.cond-inactive'));
      const mk262 = async (setup) => {
        const g = GameState.create({ name: 'T262', gender: 'm', profession: 'Wayfarer', book: 1, adv });
        g.data.items = [];
        setup(g);
        const c = document.createElement('div');
        new Story(c, g, { navigate() {}, onDeath() {}, notify() {} }).begin(await data.getSection(1, '460'), 1, '460');
        return { g, c };
      };
      const acid262 = await mk262((g) => g.addCodeword('Acid'));
      ok('task262: §1.460 offers →327 for the codeword Acid with no amulet', has262(acid262.c));
      const amulet262 = await mk262((g) => g.addItem(makeItem('item', 'copper amulet')));
      ok('task262: §1.460 offers →327 for a copper amulet with no codeword', has262(amulet262.c));
      const both262 = await mk262((g) => { g.addCodeword('Acid'); g.addItem(makeItem('item', 'copper amulet')); });
      ok('task262: §1.460 offers →327 once when both hold, not twice',
         has262(both262.c) && Array.from(both262.c.querySelectorAll('.goto')).filter((b) => b.textContent.trim() === '327' && !b.disabled && !b.closest('.cond-inactive')).length === 1);
      // Neither: no shortcut, and the section reads on to the light-source check, which sends a
      // Wayfarer carrying no lantern back to the city.
      const neither262 = await mk262(() => {});
      ok('task262: §1.460 with neither offers no →327 and reads on to the light-source check',
         !has262(neither262.c) && /light source/.test(neither262.c.textContent)
         && !!Array.from(neither262.c.querySelectorAll('.goto')).find((b) => b.textContent.trim() === '10' && !b.disabled && !b.closest('.cond-inactive')),
         neither262.c.textContent.replace(/\s+/g, ' ').slice(0, 90));
      // The case the proxy got wrong, and the reason this was a defect rather than a tidy-up:
      // been to §554 (so 1.Skabb), amulet since lost, never reached §384 (so no Acid).
      const stale262 = await mk262((g) => g.addCodeword('1.Skabb'));
      ok('task262: §1.460 refuses →327 for a player who has lost the amulet and has no Acid',
         !has262(stale262.c), stale262.c.textContent.replace(/\s+/g, ' ').slice(0, 90));
    }

    // --- task 267: a ship with NO crew is expressible, so its poor-crew hire can be clicked ---
    // §5.192 claims the Wrath of God with `<buy ship="brig" … initialCrew="none">` — the corpus's
    // only crewless vessel — and then prints "You will have to pay to hire a crew. 25 Shards gets a
    // poor crew". canonCrew folded "none" to `poor`, so the captain already HAD the crew the page
    // charges for: canUpgradeCrew's `have === target - 1` needs -1 for target `poor`, no ship could
    // hold it, and the button was permanently dead under "Your crew is already at least that good."
    //
    // The fork was whether to carry a crewless GRADE. It is held OFF the CREW_LEVELS ordinal
    // (NO_CREW = 'none'), because widening the array moves four index-based readings, and the
    // demotion floor is the one that breaks: `<lose crew="1">` on a poor crew would land on the new
    // index 0, against 14 corpus demotions the books floor in print ("A poor crew can't get any
    // worse!", §3.231/§3.272/§4.439), and `<lose crew="3">` ("reduce to poor") would undershoot from
    // every grade below excellent. Off the scale instead, indexOf gives -1 and each reading already
    // reads "not a grade" with no rule change at all.
    {
      const settle267 = () => new Promise((r) => setTimeout(r, 30));
      const gray267 = (el) => !!(el && el.closest('.cond-inactive'));
      const hire267 = (c, re) => Array.from(c.querySelectorAll('button.btn-mini')).find((b) => re.test(b.textContent));

      // The live route, through the rendered page: pay the 50-Shard maintenance fee, then hire.
      const g267 = GameState.create({ name: 'T267', gender: 'f', profession: 'Wayfarer', book: 5, adv });
      g267.data.items = []; g267.data.shards = 75;
      g267.addItem(makeItem('item', 'deed to the Wrath of God'));
      const c267 = document.createElement('div');
      const st267 = new Story(c267, g267, { navigate() {}, onDeath() {}, notify() {} });
      st267.begin(await data.getSection(5, '192'), 5, '192');
      const claim267 = Array.from(c267.querySelectorAll('.group-action')).find((b) => !b.disabled && !gray267(b));
      if (claim267) claim267.click();
      await settle267();
      st267.rerender();
      await settle267();
      ok('task267: §5.192\'s claim leaves the brigantine with NO crew, not a free poor one',
         g267.ships.length === 1 && g267.currentShip().crew === 'none' && g267.data.shards === 25,
         `crew=${g267.ships.length && g267.currentShip().crew} shards=${g267.data.shards}`);
      // The Adventure Sheet has to say so rather than print "None crew".
      const sheet267 = document.createElement('div');
      renderSheet(g267, sheet267, {});
      ok('task267: the Ship\'s Manifest shows the unhired hull as "no crew"',
         /no crew/.test(sheet267.textContent) && !/None crew/i.test(sheet267.textContent),
         sheet267.textContent.replace(/\s+/g, ' ').match(/Wrath[^·]*·/)?.[0] || 'no ship line');
      // The 25-Shard hire the page prints is now clickable, and it is the ONLY one: the one-grade
      // rule (task 24) still refuses average/good/excellent to a captain with no crew at all.
      const poor267 = hire267(c267, /Hire Poor crew/i);
      const avg267 = hire267(c267, /Hire Average crew/i);
      ok('task267: §5.192 offers the printed 25-Shard poor-crew hire and no higher grade',
         !!poor267 && !poor267.disabled && !gray267(poor267)
         && !!avg267 && avg267.disabled && /must be poor first/.test(avg267.title || ''),
         `poor=${poor267 && poor267.disabled} avg=${avg267 && avg267.title}`);
      if (poor267) poor267.click();
      await settle267();
      st267.rerender();
      await settle267();
      ok('task267: paying the 25 Shards yields a poor crew',
         g267.currentShip().crew === 'poor' && g267.data.shards === 0,
         `crew=${g267.currentShip().crew} shards=${g267.data.shards}`);

      // Every index-based reading must report "not a grade" for a crewless ship, because that is
      // what keeps the ordinal untouched. A storm is the one that would otherwise PAY the player:
      // `Math.max(0, indexOf('none'))` read it as poor, so `<lose crew="1">` granted the grade
      // §5.192 charges 25 Shards for. Book 5's own seas carry no such node, but a claimed hull
      // sails into book 3's, which carry ten.
      const crewless267 = () => {
        const g = GameState.create({ name: 'T267b', gender: 'm', profession: 'Mariner', book: 5, adv });
        g.addShip({ type: 'brigantine', name: 'Wrath of God', crew: 'none', cargo: [], docked: null });
        return g;
      };
      const storm267 = crewless267();
      eng.applyEffect(parse('<lose crew="1"/>'), storm267, {});
      const wreck267 = crewless267();
      eng.applyEffect(parse('<lose crew="3"/>'), wreck267, {});
      ok('task267: a storm cannot demote a crew that is not there into a free poor one',
         storm267.currentShip().crew === 'none' && wreck267.currentShip().crew === 'none',
         `one=${storm267.currentShip().crew} three=${wreck267.currentShip().crew}`);
      const read267 = crewless267();
      eng.applyEffect(parse('<set var="oldcrew" value="crew"/>'), read267, {});
      ok('task267: a crewless ship satisfies no <if crew=…> and reads value="crew" as 0',
         eng.evaluateCondition(parse('<if crew="poor"/>'), read267) === false
         && eng.evaluateCondition(parse('<if crew="excellent"/>'), read267) === false
         && read267.getVar('oldcrew') === 0,
         `oldcrew=${read267.getVar('oldcrew')}`);
      // …and it survives a save/load, or the next reload hands the hull a free average crew.
      const saved267 = sanitizeData(JSON.parse(JSON.stringify(crewless267().data)));
      ok('task267: a crewless ship is still crewless after a save/load round trip',
         saved267.ships.length === 1 && saved267.ships[0].crew === 'none',
         `crew=${saved267.ships.length && saved267.ships[0].crew}`);

      // §4.658's oldcrew round trip: `<set var="oldcrew" value="crew"/>` above `<lose ship="t">`,
      // then `<buy ship="barque" initialCrew="oldcrew">`. Every grade must arrive unchanged — the
      // 1-based index is exactly what widening CREW_LEVELS would have shifted — and a crewless
      // wreck must hand the barque nothing, which is the 0 case the same reading now carries.
      const mk658 = async (crew) => {
        const g = GameState.create({ name: 'T267c', gender: 'f', profession: 'Mariner', book: 4, adv });
        g.data.items = []; g.data.shards = 0;
        g.addShip({ type: 'brigantine', name: 'Hull', crew, cargo: [], docked: null });
        const c = document.createElement('div');
        const st = new Story(c, g, { navigate() {}, onDeath() {}, notify() {} });
        st.begin(await data.getSection(4, '658'), 4, '658');
        await settle267();
        const note = Array.from(c.querySelectorAll('button.btn-mini')).find((b) => /Note it/i.test(b.textContent));
        if (note) note.click();
        await settle267();
        st.rerender();
        await settle267();
        return { g, c };
      };
      const trip267 = [];
      for (const grade of ['poor', 'average', 'good', 'excellent', 'none']) {
        const r = await mk658(grade);
        trip267.push(`${grade}->${r.g.currentShip() ? r.g.currentShip().crew : 'noship'}`);
        if (grade === 'none') {
          // The upgrade chain below the buy is `<if crew="poor">…<elseif crew="average">…<elseif
          // crew="good">`: none of them matches a crewless barque, so the battle improves nothing.
          ok('task267: §4.658 offers a crewless salvaged barque no morale upgrade at all',
             !Array.from(r.c.querySelectorAll('button.btn-mini')).some((b) => /becomes|recruits/i.test(b.textContent) && !b.disabled && !gray267(b)));
        }
      }
      ok('task267: §4.658 carries every crew grade — and the absence of one — onto the barque unchanged',
         trip267.join(' ') === 'poor->poor average->average good->good excellent->excellent none->none',
         trip267.join(' '));

      // The population, over the bundled corpus: one crewless entry point, and the two
      // harbourmaster scenes that print the poor-crew hire. A third arriving in a future book
      // fails here rather than changing silently.
      const none267 = [], buy267 = [];
      for (const b of data.availableBooks()) {
        const raw = await data.loadBook(b);
        for (const key of Object.keys(raw)) {
          if (/initialCrew="none"/.test(raw[key])) none267.push(b + '/' + key);
          if (/<buy[^>]*\bcrew="poor"/.test(raw[key])) buy267.push(b + '/' + key);
        }
      }
      ok('task267: exactly one corpus section makes a crewless ship, and two print its hire',
         none267.join(' ') === '5/192' && buy267.sort().join(' ') === '5/145 5/192',
         `none=${none267.join(' ')} buy=${buy267.join(' ')}`);
    }

    // --- task 268: an <adjust crew=…> is a die-roll modifier and nothing else ---
    // applyAdjust carried a crew branch that read `<adjust crew="X" amount="N"/>` as "shift the
    // grade by N", clamping through a literal ['poor','average','good','excellent'] — a second
    // copy of the CREW_LEVELS ordinal, and the copy with no crewless floor, so indexOf('none')
    // = -1 made amount="1" *grant* the poor crew §5.192 charges 25 Shards for (task 267's
    // defect one branch over). But that is not what the tag means: adjustApplies reads crew= as
    // the CONDITION and amount= as the contribution ("add 1 if your crew is good"), so the
    // branch misread the only form the corpus writes, and a bare one would have promoted the
    // crew rather than doing nothing. The branch is gone: a grade is set by <gain crew=> and
    // shifted by <lose crew="N">, and validate-source.ps1 refuses an <adjust crew=> that hangs
    // where nothing reads it.
    {
      const mk268 = (crew) => {
        const g = GameState.create({ name: 'T268', gender: 'm', profession: 'Mariner', book: 3, adv });
        g.addShip({ type: 'brigantine', name: 'Hull', crew, cargo: [], docked: null });
        return g;
      };
      // Handed straight to applyEffect (the only way to reach it — <adjust> is not in
      // PASSIVE_BODY_TAGS, groupPlan excludes it, and no view module dispatches it), every
      // grade must come back untouched, the crewless hull most of all.
      const shift268 = [];
      for (const crew of ['none', 'poor', 'average', 'good', 'excellent']) {
        const g = mk268(crew);
        eng.applyEffect(parse('<adjust crew="good" amount="1"/>'), g, {});
        eng.applyEffect(parse('<adjust crew="poor" value="-1"/>'), g, {});
        shift268.push(`${crew}->${g.currentShip().crew}`);
      }
      ok('task268: a bare <adjust crew=…> shifts no grade — least of all a crewless hull into a free poor crew',
         shift268.join(' ') === 'none->none poor->poor average->average good->good excellent->excellent',
         shift268.join(' '));
      // …while the same node still contributes its amount to the roll it hangs under, which is
      // the meaning that remains: an exact grade match, so a "good crew" bonus skips excellent.
      const roll268 = '<random dice="2"><adjust crew="good" amount="1"/><adjust crew="poor" amount="-1"/></random>';
      const seen268 = ['none', 'poor', 'average', 'good', 'excellent']
        .map((crew) => `${crew}:${eng.childAdjustment(parse(roll268), mk268(crew))}`);
      ok('task268: …and still adds its amount to the roll it hangs under, matching the grade exactly',
         seen268.join(' ') === 'none:0 poor:-1 average:0 good:1 excellent:0', seen268.join(' '));

      // The census the deletion rests on, over the bundled corpus: all 346 <adjust crew=…>
      // nodes hang under a <random> or a <difficulty>, and not one is bare. The parent
      // breakdown is asserted too, so a scan that silently found nothing cannot pass; the
      // pre-filter is only a filter, and an <adjust crew=> it missed would fail the 346.
      // A future bare one now fails here AND at the build gate rather than landing on a
      // branch that promoted the crew.
      const READ268 = new Set(['random', 'difficulty', 'rankcheck', 'gain', 'lose']);
      const bare268 = [], by268 = new Map();
      let total268 = 0;
      for (const b of data.availableBooks()) {
        const raw = await data.loadBook(b);
        for (const key of Object.keys(raw)) {
          if (!/<adjust[^>]*\bcrew=/.test(raw[key])) continue;
          const el = await data.getSection(b, key);
          for (const a of el.querySelectorAll('adjust[crew]')) {
            total268++;
            const p = (a.parentElement ? a.parentElement.tagName : '(root)').toLowerCase();
            by268.set(p, (by268.get(p) || 0) + 1);
            if (!READ268.has(p)) bare268.push(`${b}/${key}:${p}`);
          }
        }
      }
      const shape268 = Array.from(by268.entries()).sort().map(([p, n]) => `${p}:${n}`).join(' ');
      ok('task268: every corpus <adjust crew=…> hangs under a roll that reads it, and none is bare',
         total268 === 346 && bare268.length === 0 && shape268 === 'difficulty:13 random:333',
         `total=${total268} parents=${shape268} bare=${bare268.join(' ')}`);
    }

    // --- task 269: an <adjust> is a modifier on the node above it, never an effect ---
    // Task 268 deleted applyAdjust's crew branch; these are the four that outlived it, and the
    // filing's case for keeping them — "an <adjust ability="combat" amount="1"/> applied as an
    // effect means what it looks like" — is the reading the tag disproves. adjustApplies takes
    // codeword=/title= as the modifier's CONDITION and value=/amount= as its contribution, and
    // adjustAmount takes titleVal= as a value SOURCE, so three branches inverted a form the
    // corpus really writes (40 codeword= nodes, §4.63's one title=, §5.343/§5.432's titleVal=).
    // The ability= and name= branches were inert over every corpus form — firstAbility rejects
    // rank/stamina, and no name= node carries an amount — but the filing's own example means
    // "+1 to THIS roll" and would have landed as a permanent +1 Combat, which is why it is
    // asserted here too. EFFECT_APPLIERS has no adjust entry now, so applyEffect returns ''.
    {
      const SHAPES269 = [
        '<adjust codeword="Eldritch" value="3"/>',         // "+3 if you know Eldritch" (book1/88)
        '<adjust title="Nightstalker" value="1"/>',         // "+1 if you are a Nightstalker" (book4/63)
        '<adjust titleVal="bokh" default="-1"/>',           // "+ your bokh circle, else −1" (book5/343)
        '<adjust ability="combat" amount="1"/>',            // an unconditional +1 to the roll
        '<adjust name="CharismaBonus"/>',                   // reads a stored counter (book4/93)
      ];
      const g269 = GameState.create({ name: 'T269', gender: 'f', profession: 'Wayfarer', book: 4, adv });
      g269.addCodeword('Eldritch');
      const cbt269 = g269.ability('combat'), titles269 = g269.data.titles.length;
      for (const s of SHAPES269) eng.applyEffect(parse(s), g269, {});
      const wrote269 = [
        `Eldritch=${g269.codewordValue('Eldritch')}`,
        `Nightstalker=${g269.hasTitle('Nightstalker')}`,
        `bokh=${g269.hasTitle('bokh')}`,
        `combat=${g269.ability('combat') - cbt269}`,
        `titles=${g269.data.titles.length - titles269}`,
      ].join(' ');
      ok('task269: every corpus <adjust> shape handed straight to applyEffect writes nothing to the sheet',
         wrote269 === 'Eldritch=0 Nightstalker=false bokh=false combat=0 titles=0', wrote269);

      // …and each still means what it means where it belongs: a child of the roll (or the
      // <gain>/<lose> amount) it modifies, read by childAdjustment. The codeword condition is
      // the one no other suite covers, and it is the largest of the four families.
      const roll269 = (inner) => eng.childAdjustment(parse(`<random dice="2">${inner}</random>`), g269);
      const read269 = [
        `codeword=${roll269('<adjust codeword="Eldritch" value="3"/>')}`,
        `absent=${roll269('<adjust codeword="Brush" value="2"/>')}`,
        `counter=${roll269('<adjust name="CharismaBonus"/>')}`,
      ].join(' ');
      g269.adjustCodewordValue('CharismaBonus', 2);
      ok('task269: …while the same nodes still add their amount to the roll they hang under',
         read269 === 'codeword=3 absent=0 counter=0' && roll269('<adjust name="CharismaBonus"/>') === 2, read269);

      // The census the deletion rests on, beside task 268's 346/0: every <adjust> in the
      // bundled corpus — not just the crew ones — hangs under one of the five tags that READ
      // an <adjust> child, and not one is bare. The parent breakdown is pinned too, so a scan
      // that silently found nothing cannot pass. NOTE the total is 558, not the 569 the task
      // was filed with: that number counts the 11 nodes in superseded books/**/temp/ working
      // copies, which the build does not bundle (task 260's double-count, one census over).
      const READ269 = new Set(['random', 'difficulty', 'rankcheck', 'gain', 'lose']);
      const bare269 = [], by269 = new Map();
      let total269 = 0;
      for (const b of data.availableBooks()) {
        const raw = await data.loadBook(b);
        for (const key of Object.keys(raw)) {
          if (!/<adjust\b/.test(raw[key])) continue;
          const el = await data.getSection(b, key);
          for (const a of el.querySelectorAll('adjust')) {
            total269++;
            const p = (a.parentElement ? a.parentElement.tagName : '(root)').toLowerCase();
            by269.set(p, (by269.get(p) || 0) + 1);
            if (!READ269.has(p)) bare269.push(`${b}/${key}:${p}`);
          }
        }
      }
      const shape269 = Array.from(by269.entries()).sort().map(([p, n]) => `${p}:${n}`).join(' ');
      ok('task269: every corpus <adjust> of any kind hangs under a tag that reads it, and none is bare',
         total269 === 558 && bare269.length === 0 && shape269 === 'difficulty:80 lose:9 random:464 rankcheck:5',
         `total=${total269} parents=${shape269} bare=${bare269.join(' ')}`);
    }

}
