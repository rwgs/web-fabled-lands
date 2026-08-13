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
}
