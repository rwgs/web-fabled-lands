// FL test suite — render EVERY section of EVERY PUBLISHED book without throwing (final scan)
// Extracted verbatim from web/_test.html run() lines 915-928 (task 120).
//
// The book list comes from meta.json via data.availableBooks(), NOT a literal 1..6 (task 209):
// the hardcoded loop meant a book added to books.ini's Published= line worked online while
// every one of its sections stayed outside this scan — the one check that renders the whole
// corpus. The two assertions below make that dependence explicit, so a published book whose
// data never got bundled fails here instead of only in a player's browser.
import * as data from '../js/data.js';
import { GameState } from '../js/state.js';
import { Story } from '../js/render.js';
import * as gates from '../js/render-gates.js';

export async function run(ctx) {
  const { ok, parse } = ctx;
  await data.loadMeta();
  const adv = data.parseAdventurers(data.bookInfo(1).adventurers);
    // scan: render EVERY section of EVERY book without throwing
    let renderErrors = 0, firstErr='', total=0;
    const gs2 = GameState.create({ name:'Scan', gender:'m', profession:'Rogue', book:1, adv });
    const c2 = document.createElement('div');
    const story2 = new Story(c2, gs2, { navigate(){}, onDeath(){}, notify(){} });
    const books = data.availableBooks();
    ok('the scan is driven by the published edition ('+books.join(',')+')', books.length > 0);
    const empty = [];
    for (const b of books) {
      const raw = await data.loadBook(b);
      const keys = Object.keys(raw);
      if (!keys.length) empty.push(b);
      for (const key of keys) {
        total++;
        try { const el = await data.getSection(b, key); story2.begin(el, b, key); }
        catch(e){ renderErrors++; if(!firstErr) firstErr = b+'§'+key+': '+(e.stack||e.message); }
      }
    }
    ok('every published book has bundled section data', empty.length === 0, 'no sections for book(s) '+empty.join(','));
    ok('all sections render w/o throw ('+total+')', renderErrors===0, renderErrors+' errors; first='+firstErr);

    // --- task 273: the sections that gate on a codeword and delete it inside the guard ---------
    // The ones enclosing a <goto> are the ones that LOSE a destination when the guard is re-derived
    // live (§2.143 deletes Bounty and grays the →601 it deleted it for), so they are pinned by name
    // and an eleventh arriving in a future book lands here. A guard's codeword may be an OR list
    // (§2.633's Bastion|Brush) and the deletion may sit any depth inside it — in a <group>, as
    // §2.633's does — so the scan walks the tags rather than matching an attribute string; a scan
    // that did the latter is what left §2.633 out of the filing's own count.
    // The other 11 sections enclose prose only: those gray a sentence describing what just
    // happened, which is wrong-to-fact but costs no route, and they are counted (not named) so the
    // total moves when either bucket does. Over the BUNDLED corpus, so the 20 superseded temp/
    // copies are outside it (book2/temp/322old.xml matches the shape) — task 270.
    const TAG273 = /<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g;
    const CW273 = /\bcodeword="([^"]*)"/;
    const withGoto273 = [], proseOnly273 = [];
    let guards273 = 0;
    for (const b of books) {
      const raw = await data.loadBook(b);
      for (const key of Object.keys(raw)) {
        const xml = raw[key];
        if (!/<lose\b[^>]*\bcodeword=/i.test(xml)) continue;
        const stack = []; let m;
        TAG273.lastIndex = 0;
        while ((m = TAG273.exec(xml))) {
          const [, close, tag, attrs, selfClose] = m;
          const t = tag.toLowerCase();
          if (close) {
            const top = stack.length && stack[stack.length - 1].tag === t ? stack.pop() : null;
            if (top && top.hit) { guards273++; (top.goto ? withGoto273 : proseOnly273).push(b + '/' + key); }
            continue;
          }
          if (t === 'lose' && CW273.test(attrs)) {
            const lost = CW273.exec(attrs)[1].split(/[|,]/).map((c) => c.trim());
            stack.forEach((fr) => { if (fr.cw && fr.cw.some((c) => lost.includes(c))) fr.hit = true; });
          }
          if (t === 'goto') stack.forEach((fr) => { fr.goto = true; });
          if (!selfClose) {
            const guard = /^(if|elseif|else)$/.test(t) && CW273.test(attrs);
            stack.push({ tag: t, cw: guard ? CW273.exec(attrs)[1].split(/[|,]/).map((c) => c.trim()) : null,
                         hit: false, goto: false });
          }
        }
      }
    }
    const pad273 = (s) => s.replace(/\d+/g, (n) => n.padStart(5, '0'));
    const uniq273 = (a) => [...new Set(a)].sort((x, y) => (pad273(x) < pad273(y) ? -1 : 1));
    ok('task273: exactly ten corpus sections delete the codeword gating a <goto> they enclose',
       uniq273(withGoto273).join(' ') === '2/143 2/361 2/633 3/20 3/48 3/167 3/196 3/433 5/487 6/32',
       uniq273(withGoto273).join(' '));
    const prose273 = uniq273(proseOnly273).filter((s) => !withGoto273.includes(s));
    ok('task273: 26 such guards in all, the other 16 of them over prose in 11 further sections',
       guards273 === 26 && proseOnly273.length === 16 && prose273.length === 11,
       `guards=${guards273} prose=${proseOnly273.length} in ${prose273.length}: ${prose273.join(' ')}`);

    // --- task 290: no branch may read a var= its own section never writes -----------------------
    // Task 278's census asked the WRITER-side question ("how many <training> nodes carry a var=":
    // 1 of 62) and fixed the writer. This is the reader side, which is a different set and the one
    // that finds a var with no writer at all — a guard that silently never matches, printing
    // nothing and throwing nothing. Its single hit was §5.315, whose crippling injury was gated on
    // an unwritten `exp`; pinned at ZERO so a future section cannot reintroduce the shape.
    // Vars are section-local — Story.begin calls clearVars() — so "written in this section" is the
    // whole of the question and no cross-file pass is needed.
    // Widening this to the EXPRESSION attributes (value=/amount=/bonus=/level=/equals=/…) must
    // exclude modifier=, whose keyword values (natural/affected/noweapon) are not variables: they
    // are 38 hits across books 2, 3, 5 and 6 and would read as the whole finding. (task 290)
    const W290 = /<(?:random|difficulty|rankcheck|training|set)\b[^>]*\bvar="([^"]+)"/g;
    const R290 = /<(?:if|elseif|while|outcomes|outcome|success|failure)\b[^>]*\bvar="([^"]+)"/g;
    const unwritten290 = [];
    for (const b of books) {
      const raw = await data.loadBook(b);
      for (const key of Object.keys(raw)) {
        const xml = raw[key];
        const written = new Set(); let m;
        W290.lastIndex = 0; while ((m = W290.exec(xml))) written.add(m[1]);
        R290.lastIndex = 0; while ((m = R290.exec(xml))) if (!written.has(m[1])) unwritten290.push(b + '/' + key + ' ' + m[1]);
      }
    }
    ok('task290: no branch in the corpus reads a var= no node in its own section writes',
       unwritten290.length === 0, unwritten290.join(', '));

    // --- task 291: a guard over a roll var that MATCHES at 0, with no not-yet-rolled sentinel ----
    // The other half of 290's shape, and the sharper one. A condition deliberately does not consult
    // the unfilled-roll-var set (render-rules, task 181: "an unwritten var reads as 0 and its branch
    // simply doesn't match"), which is true of `equals=` and of a bare `var=` but FALSE of
    // `lessthan=`, where 0 is the smallest value there is. So such a branch is open on entry —
    // §2.270 and §2.362 wrote the god Nagil before the die was rolled. The corpus's own answer is a
    // sentinel (§6.628's `<set var="y" value="7"/>` above its `<random var="y">`), so a section
    // carrying a `<set>` for the var is not a hit.
    // Pinned by NAME at the two sections tasks 292 and 293 own, both of which need a different fix:
    // §4.257's margins have no out-of-range value to hold (292 wants a fourth roll-gate seed), and
    // §3/40's var feeds an <outcomes> table, where a sentinel marks the var written and reveals a
    // row — it would put a live "Continue → 59" on the page before the dice (293). The general rule
    // that falls out: **a sentinel is only safe on a var no <outcomes> table reads.**
    const RW291 = /<(?:random|difficulty|rankcheck|training)\b[^>]*\bvar="([^"]+)"/g;
    const SET291 = /<set\b[^>]*\bvar="([^"]+)"/g;
    const RD291 = /<(?:if|elseif|while|outcomes|outcome|success|failure)\b([^>]*?)\/?>/g;
    const num291 = (s) => (/^-?\d+$/.test(String(s).trim()) ? parseInt(s, 10) : null);
    const open291 = [];
    for (const b of books) {
      const raw = await data.loadBook(b);
      for (const key of Object.keys(raw)) {
        const xml = raw[key];
        const rolled = new Set(), sentinelled = new Set(); let m;
        RW291.lastIndex = 0; while ((m = RW291.exec(xml))) rolled.add(m[1]);
        if (!rolled.size) continue;
        SET291.lastIndex = 0; while ((m = SET291.exec(xml))) sentinelled.add(m[1]);
        RD291.lastIndex = 0;
        while ((m = RD291.exec(xml))) {
          const attrs = m[1];
          const v = /\bvar="([^"]*)"/.exec(attrs);
          if (!v || !rolled.has(v[1]) || sentinelled.has(v[1])) continue;
          const lt = /\blessthan="([^"]*)"/.exec(attrs), gt = /\bgreaterthan="([^"]*)"/.exec(attrs);
          const eq = /\bequals="([^"]*)"/.exec(attrs);
          if (!lt && !gt && !eq) continue;             // a bare var= tests != 0, so 0 never matches
          let hits0 = false;
          // A non-numeric bar is another var (§2.270's `lessthan="rank"`) — unknown here, so flag it
          // rather than assume it exceeds 0, which is the assumption that hid these in the first place.
          if (lt) hits0 = hits0 || num291(lt[1]) === null || 0 < num291(lt[1]);
          if (gt) hits0 = hits0 || (num291(gt[1]) !== null && 0 > num291(gt[1]));
          if (eq) hits0 = hits0 || num291(eq[1]) === 0;
          if (hits0) open291.push(b + '/' + key + ' ' + v[1]);
        }
      }
    }
    ok('task291: the only guards matching an unrolled 0 are the two sections tasks 292/293 own',
       [...new Set(open291)].sort().join(' ') === '3/40 x 4/257 m 4/257 s',
       [...new Set(open291)].sort().join(' '));

    // --- task 292: what the roll gate's CONDITION seed holds, measured -------------------------
    // The blast radius task 292 wanted measured before the seed was committed, kept as the pin.
    // These 28 sections had NO roll gate at all before it: seeds 1-3 ask what a roll's result
    // feeds (an outcome table, an effect's magnitude, a <success>/<failure>), and a section that
    // routes or rewards through `<if var=>` has none of the three. Twenty of them are the "roll
    // higher than your Rank" pages, where the exit was live before the die that decides the Rank;
    // §4.257, §5.343 and §5.432 are the sharper kind, where an `<if>` arm's own <goto> was live
    // and reachable on entry. A section LEAVING this list has had its gate taken over by an
    // earlier seed (or lost it); a section joining it is a page that gained one.
    const gained292 = [], multi292 = [];
    for (const b of books) {
      const raw = await data.loadBook(b);
      for (const key of Object.keys(raw)) {
        const g = gates.computeRollGate(await data.getSection(b, key));
        if (!g) continue;
        if (g.seed === 'condition') gained292.push(b + '/' + key);
        else if (g.rollNodes.size !== 1) multi292.push(b + '/' + key + ' seed=' + g.seed);
      }
    }
    ok('task292: the condition seed holds 28 sections, and only these',
       gained292.join(' ') === '1/313 2/345 2/378 2/389 2/529 2/536 2/563 2/584 2/614 2/637 2/654 2/683 2/752 '
         + '3/267 3/379 3/412 3/455 3/492 3/559 3/583 4/257 5/245 5/343 5/432 6/17 6/344 6/402 6/738',
       gained292.length + ': ' + gained292.join(' '));
    // §4.257 is the whole reason the gate awaits a SET of rolls: it is the only shipped section
    // whose gate has more than one, and the other three seeds must keep naming exactly one each,
    // since a table matches one row, an effect owes one magnitude and a branch belongs to one check.
    const g257 = gates.computeRollGate(await data.getSection(4, '257'));
    ok('task292: only §4.257 awaits two rolls, and no other seed awaits more than one',
       multi292.length === 0 && !!g257 && g257.rollNodes.size === 2,
       (g257 ? 'rolls=' + g257.rollNodes.size : 'no gate on 4/257') + '; ' + multi292.join(', '));
}
