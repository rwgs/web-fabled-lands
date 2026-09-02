// FL test suite — render EVERY section of EVERY PUBLISHED book without throwing (final scan)
// Extracted verbatim from web/_test.html run() lines 915-928 (task 120).
//
// The book list comes from meta.json via data.availableBooks(), NOT a literal 1..6 (task 209):
// the hardcoded loop meant a book added to books.ini's Published= line worked online while
// every one of its sections stayed outside this scan — the one check that renders the whole
// corpus. The two assertions below make that dependence explicit, so a published book whose
// data never got bundled fails here instead of only in a player's browser.
import * as data from '../js/data.js';
import { GameState, sanitizeData } from '../js/state.js';
import { Story } from '../js/render.js';
import * as gates from '../js/render-gates.js';
import * as visit from '../js/visit-state.js';
import { rawSections } from './corpus-text.js';

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
      const raw = await rawSections(b);
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

    // --- task 340: the shipped choice → detour → <return> routes, driven end to end -----------
    // suite-actions models this with a synthetic §A340; pinning the real routes here stops that
    // fixture drifting away from the markup it stands for. Real <choices> tables are indented,
    // so their buttons are NOT the table's first child NODES — the whole point of deriving the
    // saved source path from DOM ancestry rather than from a view's synthetic '.c<i>' memo key.
    {
      const routes = [
        { book: 1, src: '220', det: '411', label: 'high priest', back: /turn to\s*220/ },
        { book: 5, src: '721', det: '601', label: 'Deposit or withdraw', back: /turn back to the paragraph/ },
      ];
      for (const r of routes) {
        const raw = await rawSections(r.book);
        const at = '§' + r.book + '.' + r.src + ' → §' + r.det;
        const pick = (el) => el.querySelector('choices > choice[section="' + r.det + '"]');
        const secs = { [r.src]: parse(raw[r.src]), [r.det]: parse(raw[r.det]) };
        ok('task340: ' + at + ' is still a <choices> choice into a section carrying a <return>',
           !!pick(secs[r.src]) && !!secs[r.det].querySelector('return'));

        let story;
        const g = GameState.create({ name: 'T340c', gender: 'm', profession: 'Warrior', book: r.book, adv });
        const cont = document.createElement('div');
        story = new Story(cont, g, { navigate: (b, sn) => { g.goTo(b, sn); story.begin(secs[String(sn)], b, sn); }, onDeath(){}, notify(){} });
        g.goTo(r.book, r.src); story.begin(secs[r.src], r.book, r.src);
        Array.from(cont.querySelectorAll('.choice')).find((b) => b.textContent.includes(r.label)).click();
        const record = story.serializeVisit();

        // Reload: fresh parses, so only the saved path can re-bind the source choice.
        const secs2 = { [r.src]: parse(raw[r.src]), [r.det]: parse(raw[r.det]) };
        ok('task340: ' + at + ' saves the source choice as a path that names that very choice',
           !!record && !!record.frame
           && visit.resolveNodePath(record.frame.usedSourcePath, secs2[r.src]) === pick(secs2[r.src]),
           'path=' + JSON.stringify(record && record.frame && record.frame.usedSourcePath));

        const g2 = new GameState(sanitizeData(JSON.parse(JSON.stringify({ ...g.data, visit: record }))));
        const cont2 = document.createElement('div');
        let story2;
        story2 = new Story(cont2, g2, { navigate: (b, sn) => { g2.goTo(b, sn); story2.begin(secs2[String(sn)], b, sn); }, onDeath(){}, notify(){} });
        const frame2 = story2.deserializeFrame(g2.data.visit.frame, secs2[r.src]);
        story2.resume(secs2[r.det], r.book, r.det, g2.data.visit, frame2);
        Array.from(cont2.querySelectorAll('.goto')).find((b) => r.back.test(b.textContent)).click();
        const taken = Array.from(cont2.querySelectorAll('.choice')).find((b) => b.textContent.includes(r.label));
        ok('task340: ' + at + ' — the post-reload <return> lands back on the source section',
           story2.section === r.src, 'sec=' + story2.section);
        ok('task340: ' + at + ' — and crosses the taken choice off, leaving its siblings live',
           !!taken && taken.disabled === true
           && Array.from(cont2.querySelectorAll('.choice')).filter((b) => b !== taken).every((b) => !b.disabled),
           'taken=' + (taken && taken.disabled));
      }
    }

    // --- task 349: the natural derived-stat combinations have no shipped site yet -------------
    // The two readers task 349 fixed answer combinations the corpus does not write today, which
    // is why the mode tests passed without composing them. Pinning the census means a FIRST such
    // site fails here and its expected behaviour gets reviewed, rather than silently inheriting
    // whatever the reader happens to do - the failure mode that let both cases sit latent.
    {
      const MOD349 = /<(if|elseif|set|adjust|difficulty|rankcheck|training|random)\s[^>]*\smodifier="([^"]*)"[^>]*>/gi;
      const TARGET349 = /\s(?:ability|value)="([^"]*)"/i;
      const seen = [];
      for (const b of books) {
        const raw = await rawSections(b);
        for (const [key, xml] of Object.entries(raw)) {
          for (const m of xml.matchAll(MOD349)) {
            const target = (m[0].match(TARGET349) || [])[1] || '';
            seen.push({ at: b + '.' + key, tag: m[1].toLowerCase(), target: target.toLowerCase(), mode: m[2].toLowerCase() });
          }
        }
      }
      ok('task349: the modifier= census reads a non-trivial set of shipped sites',
         seen.length >= 30, 'n=' + seen.length);
      const defNat = seen.filter((x) => x.mode === 'natural' && x.target.includes('defence'));
      ok('task349: no shipped site asks for defence under modifier="natural"',
         defNat.length === 0, defNat.map((x) => x.at + ':' + x.tag).join(' '));
      const stam = seen.filter((x) => x.target.includes('stamina'));
      ok('task349: the only mode-qualified Stamina sites are §2.579 (adjust/natural) and §3.104 (set/affected)',
         stam.map((x) => `${x.at}:${x.tag}=${x.mode}`).sort().join(' ') === '2.579:adjust=natural 3.104:set=affected',
         stam.map((x) => `${x.at}:${x.tag}=${x.mode}`).join(' '));
      const stamCond = stam.filter((x) => x.tag === 'if' || x.tag === 'elseif' || x.tag === 'set');
      ok('task349: so the two readers the fix repaired have ONE shipped site between them, and it is affected',
         stamCond.length === 1 && stamCond[0].mode === 'affected',
         stamCond.map((x) => `${x.at}:${x.tag}=${x.mode}`).join(' '));
      ok('task349: and nothing in the corpus writes modifier="current" at all',
         seen.every((x) => x.mode !== 'current'),
         seen.filter((x) => x.mode === 'current').map((x) => x.at).join(' '));
    }

    // --- task 343: the corpus pattern the affliction family reading rests on -------------------
    // afflictionFamily makes `disease=` search diseases AND poisons while `poison=` searches
    // poisons alone. That asymmetry is a claim about how the transcription writes the two
    // attributes, not a taste, so it is MEASURED here: a new node breaking the pattern fails
    // this assertion instead of silently curing the wrong list. The evidence is the section's
    // own printed words, which is why the check reads the raw XML rather than a node list.
    {
      const star = [], starQuiet = [], openDisease = [], openDiseaseQuiet = [], openPoison = [], openPoisonLoose = [];
      for (const b of books) {
        const raw = await rawSections(b);
        for (const [key, xml] of Object.entries(raw)) {
          const at = b + '.' + key;
          const namesPoison = /poison/i.test(xml);
          for (const m of xml.matchAll(/<lose\b[^>]*\bdisease="([^"]*)"/g)) {
            if (m[1] === '*') { star.push(at); if (!namesPoison) starQuiet.push(at); }
            if (m[1] === '?') { openDisease.push(at); if (!namesPoison) openDiseaseQuiet.push(at); }
          }
          for (const m of xml.matchAll(/<lose\b[^>]*\bpoison="\?"/g)) {
            openPoison.push(at);
            if (!/unable to cure disease/i.test(xml)) openPoisonLoose.push(at);
          }
        }
      }
      ok('task343: every OPEN disease cure sits in a section that names poison in its own words',
         openDisease.length === 3 && openDiseaseQuiet.length === 0,
         'open=' + openDisease.join(',') + ' silent=' + openDiseaseQuiet.join(','));
      ok('task343: so does every disease="*" cure, save §5.180 — the documented exception (task 350)',
         star.length === 13 && starQuiet.join(',') === '5.180',
         'n=' + star.length + ' silent=' + starQuiet.join(','));
      ok('task343: the corpus writes ONE open poison cure, and its section denies curing disease',
         openPoison.join(',') === '1.338' && openPoisonLoose.length === 0,
         'open=' + openPoison.join(',') + ' loose=' + openPoisonLoose.join(','));
    }

    // --- task 324: the Maps modal captions each map with book.ini's Map.Title ------------------
    // The caption (and the image's alt text) comes from meta.json's per-book mapTitle, which the
    // build reads from book.ini. Every published book carries the key today, and it is a caption
    // rather than a rule, so a book without one falls back to the volume title instead of failing.
    {
      const noMapTitle = books.filter((b) => !data.bookInfo(b)?.mapTitle);
      ok('every published book bundles its map caption (book.ini Map.Title)',
         noMapTitle.length === 0, 'no mapTitle for book(s) ' + noMapTitle.join(','));
      ok('the map caption is the map’s title, not the volume’s',
         books.some((b) => data.bookMapTitle(b) !== data.bookTitle(b)),
         books.map((b) => b + ':' + data.bookMapTitle(b)).join(' | '));
      ok('a book with no Map.Title falls back to the book title',
         data.bookMapTitle(999) === data.bookTitle(999));
    }

    // --- task 300: every modifier=/modifiers= value is one the engine acts on -----------------
    // Pinned to the WORD SET, not to a section list, so a book joining the edition is checked
    // rather than re-pinning the assertion. modifier= is the ability-resolution mode read by
    // state.js abilityForMode (`current` by engine.js adjustAmount alone, for stamina); modifiers=
    // is the fight-mode token list combat.js parses. Every one of those readers treats an unknown
    // value as "no modifier at all" — which falls through to the AFFECTED score, the very one a
    // `natural` site exists to exclude — so a misspelling makes the check easier than the page
    // prints it and nothing anywhere says so. build/validate-source.ps1's FL_ENUMS/
    // FL_FIGHT_MODIFIERS reject it at build time now; this census is the runtime half, and the
    // two word lists must stay in step. The site count rides in the condition so a corpus that
    // stopped carrying the attribute cannot report a vacuous zero.
    // Word-level only: `current` is legal on <adjust> and <difficulty> and nowhere else, and the
    // gate owns that tag dimension (task 302) rather than it being re-derived from raw XML here.
    const MODES300 = ['affected', 'current', 'natural', 'noarmour', 'notool', 'noweapon'];
    const FIGHTMODES300 = ['noarmour'];
    const bad300 = [];
    let sites300 = 0;
    for (const b of books) {
      const raw = await rawSections(b);
      for (const key of Object.keys(raw)) {
        for (const m of raw[key].matchAll(/\bmodifiers?="([^"]*)"/g)) {
          sites300++;
          const plural = m[0].startsWith('modifiers');
          const words = m[1].toLowerCase().split(plural ? /[\s,]+/ : /\|/).filter(Boolean);
          const known = plural ? FIGHTMODES300 : MODES300;
          words.filter((w) => !known.includes(w.trim()))
               .forEach((w) => bad300.push(b + '/' + key + ' ' + m[0] + ' -> "' + w + '"'));
        }
      }
    }
    ok('task300: every modifier=/modifiers= value in the corpus is one the engine acts on ('+sites300+' sites)',
       sites300 > 0 && bad300.length === 0, bad300.join(', ') || 'no modifier= sites found at all');

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
      const raw = await rawSections(b);
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

    // --- task 295: a cache the book empties of money that nobody can pay money into ------------
    // The cache family run in the direction its name does not suggest: for every printed
    // <lose shards=… cache=X>, can anything in the corpus put money INTO X? Five things can — a
    // <moneycache name="X"> or an <itemcache name="X"> (either one, unless max="0" bars money), a
    // <transfer to="X"> carrying shards=, an <adjustmoney name="X">, or a <tick|gain shards=
    // cache="X">. Sixteen nodes named a cache with none of them while renderItemCache withheld its
    // money controls from every cache without a max=: sixteen printed sentences that could not
    // apply, and §4.586's confiscated purse stranded in a box §4.528 opens only for items.
    // Pinned at ZERO over the bundled corpus, and cross-file by construction — the loss and the
    // widget are routinely in different sections (§1.273 empties §1.300's box, §2.665 empties
    // §2.617's), which is why this cannot be a per-file census.
    const strand295 = (xmls) => {
      const routes = new Set(), losses = [];
      const W = /<(moneycache|itemcache|transfer|adjustmoney|tick|gain)\b([^>]*)>/g;
      const L = /<lose\b([^>]*)>/g;
      const A = /([a-zA-Z][\w-]*)="([^"]*)"/g;
      const at = (a, k) => { const o = {}; let x; A.lastIndex = 0; while ((x = A.exec(a))) o[x[1].toLowerCase()] = x[2]; return k in o ? o[k] : null; };
      xmls.forEach(([, xml]) => {
        let m; W.lastIndex = 0;
        while ((m = W.exec(xml))) {
          const tag = m[1].toLowerCase(), a = m[2];
          if ((tag === 'moneycache' || tag === 'itemcache') && at(a, 'name') && at(a, 'max') !== '0') routes.add(at(a, 'name'));
          else if (tag === 'transfer' && at(a, 'to') && at(a, 'shards') != null) routes.add(at(a, 'to'));
          else if (tag === 'adjustmoney' && at(a, 'name')) routes.add(at(a, 'name'));
          else if ((tag === 'tick' || tag === 'gain') && at(a, 'cache') && at(a, 'shards') != null) routes.add(at(a, 'cache'));
        }
      });
      xmls.forEach(([id, xml]) => {
        let m; L.lastIndex = 0;
        while ((m = L.exec(xml))) {
          const a = m[1];
          if (!/\bshards=/.test(a) || !/\bcache="/.test(a)) continue;
          losses.push([id, /\bcache="([^"]*)"/.exec(a)[1]]);
        }
      });
      return { losses, stranded: losses.filter(([, c]) => !routes.has(c)).map(([id, c]) => id + ' ' + c) };
    };
    // The control the nil-result rule asks for: the census must still SEE the shape, and the only
    // thing that makes a cache unpayable now is an explicit max="0". Both fixtures carry the loss;
    // only the barred one is a hit.
    const ctl295bare = strand295([['f/1', '<section name="1"><p><lose shards="*" cache="c">gone</lose></p><itemcache name="c" text="Box"/></section>']]);
    const ctl295bar = strand295([['f/2', '<section name="2"><p><lose shards="*" cache="c">gone</lose></p><itemcache name="c" text="Box" max="0"/></section>']]);
    ok('task295: the census discriminates a payable cache from a barred one',
       ctl295bare.stranded.length === 0 && ctl295bar.stranded.join(' ') === 'f/2 c',
       `bare=${ctl295bare.stranded.length} barred=${ctl295bar.stranded.join(' ')}`);
    const xmls295 = [];
    for (const b of books) {
      const raw = await rawSections(b);
      for (const key of Object.keys(raw)) xmls295.push([b + '/' + key, raw[key]]);
    }
    const res295 = strand295(xmls295);
    ok('task295: every cache the corpus empties of money can be paid money into',
       res295.stranded.length === 0,
       `${res295.losses.length} cache money losses; stranded: ${res295.stranded.join(', ')}`);

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
      const raw = await rawSections(b);
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
    // Pinned at ZERO, having named all three of its hits in turn. §4.257's two left when task 294
    // rewrote its chain to route on one derived count (the guards now read `passed`, which no roll
    // writes, so the shape is gone from that page; what holds it pre-roll is still task 292's
    // gate, asserted below). §3/40's left when task 293 nested its guard — a sentinel could never
    // have worked there, because its var feeds an <outcomes> table, where a `<set>` marks the var
    // written and reveals a row: it would have put a live "Continue → 59" on the page before the
    // dice. The general rule that falls out: **a sentinel is only safe on a var no <outcomes>
    // table reads**, and where one does, nesting the guard is the answer.
    //
    // Nesting is AND, so a guard that CANNOT match at 0 shuts every guard on the same var beneath
    // it: §3/40's inner `lessthan="5"` is unreachable pre-roll under the `greaterthan="1"` task 293
    // wrapped it in. That needs a tag STACK — the technique task 273's census above uses — because
    // matching each opening tag alone reports a guard no unrolled visit can reach. Only
    // `if`/`elseif`/`while` shut their children, which is narrower than the truth and deliberately
    // so: see the fixture assertion below for what that leaves reported and why.
    const RW291 = /<(?:random|difficulty|rankcheck|training)\b[^>]*\bvar="([^"]+)"/g;
    const SET291 = /<set\b[^>]*\bvar="([^"]+)"/g;
    const TAG291 = /<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g;
    const RD291 = /^(?:if|elseif|while|outcomes|outcome|success|failure)$/;
    const BAR291 = /^(?:if|elseif|while)$/;
    const num291 = (s) => (/^-?\d+$/.test(String(s).trim()) ? parseInt(s, 10) : null);
    // Does this guard's comparison match while its var still reads the unrolled 0? A tag with no
    // comparator at all does not — a bare var= tests != 0 — which also makes it a barrier below.
    const at0291 = (attrs) => {
      const lt = /\blessthan="([^"]*)"/.exec(attrs), gt = /\bgreaterthan="([^"]*)"/.exec(attrs);
      const eq = /\bequals="([^"]*)"/.exec(attrs);
      if (!lt && !gt && !eq) return false;
      let hits0 = false;
      // A non-numeric bar is another var (§2.270's `lessthan="rank"`) — unknown here, so flag it
      // rather than assume it exceeds 0, which is the assumption that hid these in the first place.
      if (lt) hits0 = hits0 || num291(lt[1]) === null || 0 < num291(lt[1]);
      if (gt) hits0 = hits0 || (num291(gt[1]) !== null && 0 > num291(gt[1]));
      if (eq) hits0 = hits0 || num291(eq[1]) === 0;
      return hits0;
    };
    const scan291 = (xml) => {
      const hits = [];
      const rolled = new Set(), sentinelled = new Set(); let m;
      RW291.lastIndex = 0; while ((m = RW291.exec(xml))) rolled.add(m[1]);
      if (!rolled.size) return hits;
      SET291.lastIndex = 0; while ((m = SET291.exec(xml))) sentinelled.add(m[1]);
      const stack = [];
      TAG291.lastIndex = 0;
      while ((m = TAG291.exec(xml))) {
        const [, close, tag, attrs, selfClose] = m;
        const t = tag.toLowerCase();
        if (close) { if (stack.length && stack[stack.length - 1].tag === t) stack.pop(); continue; }
        const v = RD291.test(t) ? /\bvar="([^"]*)"/.exec(attrs) : null;
        const name = v && rolled.has(v[1]) && !sentinelled.has(v[1]) ? v[1] : null;
        const open = name ? at0291(attrs) : false;
        if (name && open && !stack.some((fr) => fr.shut === name)) hits.push(name);
        if (!selfClose) stack.push({ tag: t, shut: name && !open && BAR291.test(t) ? name : null });
      }
      return hits;
    };
    const open291 = [];
    for (const b of books) {
      const raw = await rawSections(b);
      for (const key of Object.keys(raw)) scan291(raw[key]).forEach((v) => open291.push(b + '/' + key + ' ' + v));
    }
    ok('task291: no guard in the corpus can match a roll var still reading its unrolled 0',
       [...new Set(open291)].sort().join(' ') === '',
       [...new Set(open291)].sort().join(' '));
    // The zero has to be shown to come from the corpus and not from a census that stopped matching,
    // so both halves are driven over §3/40's guard as it was and as task 293 nested it. The third
    // case pins how NARROW the barrier rule is on purpose: a guard inside a var-keyed <outcome> row
    // is not reachable pre-roll either (task 50's branchResolved waits for the write), but no
    // shipped section is written that way, so it stays reported. Over-reporting sends a human to
    // look; under-reporting hides a live branch, which is the failure this census exists to catch.
    ok('task293: the census still finds the shape, and the nesting is what clears it',
       scan291('<p><random var="x"/><if var="x" lessthan="5">Note.</if></p>').join(' ') === 'x'
       && scan291('<p><random var="x"/><if var="x" greaterthan="1"><if var="x" lessthan="5">Note.</if></if></p>').length === 0
       && scan291('<p><random var="x"/><outcomes var="x"><outcome var="x" range="2-4">'
                  + '<if var="x" lessthan="5">Note.</if></outcome></outcomes></p>').join(' ') === 'x');

    // --- task 294: a chain over one var whose <else> can never be reached ----------------------
    // §4.257's outer arms were `m > 0` and `m < 1`, which between them cover every value, so the
    // <else> holding "if one roll was successful" was dead code and §413 unreachable: a mixed pair
    // of rolls matched whichever arm `m` selected, failed that arm's inner <if>, and the page
    // printed nothing at all. Censused over the PARSED corpus rather than the XML text — the shape
    // is about sibling arms and their nested children, which a regex cannot see — and pinned at
    // zero, so a second section written this way is found rather than waited for. Only numeric bars
    // are decidable here; a bar that is itself a variable (§2.270's `lessthan="rank"`) is left
    // alone rather than guessed at, which is the same caution task 291's census took.
    const deadElse294 = (el) => {
      const out = [];
      el.querySelectorAll('if').forEach((head) => {
        const prev = head.previousElementSibling;
        if (prev && /^(if|elseif)$/.test(prev.tagName.toLowerCase())) return; // mid-chain, not its head
        const arms = [head];
        for (let n = head.nextElementSibling; n; n = n.nextElementSibling) {
          const t = n.tagName.toLowerCase();
          if (t !== 'elseif' && t !== 'else') break;
          arms.push(n);
        }
        if (!arms.some((a) => a.tagName.toLowerCase() === 'else')) return; // no <else> to be dead
        const conds = arms.filter((a) => a.tagName.toLowerCase() !== 'else');
        const vars = new Set(conds.map((a) => a.getAttribute('var')));
        if (vars.size !== 1 || vars.has(null)) return; // not one chain over one var
        const bars = conds.map((a) => ['greaterthan', 'lessthan', 'equals'].map((k) => a.getAttribute(k)));
        if (!bars.every((t) => t.some((v) => v != null) && t.every((v) => v == null || /^-?\d+$/.test(v)))) return;
        const hit = (t, x) => (t[2] != null && x === +t[2]) || (t[0] != null && x > +t[0]) || (t[1] != null && x < +t[1]);
        for (let x = -200; x <= 200; x++) if (!bars.some((t) => hit(t, x))) return; // some value falls through
        out.push([...vars][0]);
      });
      return out;
    };
    // The census is pinned at zero, so it has to be shown to still SEE the shape: §4.257 as it was
    // written, against §4.257 as task 294 rewrote it. Without this pair the zero below would also
    // be reported by a census that had quietly stopped matching anything.
    ok('task294: the census still finds the shape it was written for, and clears the repair',
       deadElse294(parse('<section name="old"><p><if var="m" greaterthan="0"><if var="s" greaterthan="0">Both, <goto section="216"/>.</if></if>'
         + '<elseif var="m" lessthan="1"><if var="s" lessthan="1">Neither, <goto section="374"/>.</if></elseif>'
         + '<else>One, <goto section="413"/>.</else></p></section>')).join(' ') === 'm'
       && deadElse294(parse('<section name="new"><p><set var="passed" success="s|m" hidden="t"/>'
         + '<if var="passed" equals="2">Both, <goto section="216"/>.</if>'
         + '<elseif var="passed" equals="0">Neither, <goto section="374"/>.</elseif>'
         + '<else>One, <goto section="413"/>.</else></p></section>')).length === 0);

    // --- task 292: what the roll gate's CONDITION seed holds, measured -------------------------
    // The blast radius task 292 wanted measured before the seed was committed, kept as the pin.
    // These 28 sections had NO roll gate at all before it: seeds 1-3 ask what a roll's result
    // feeds (an outcome table, an effect's magnitude, a <success>/<failure>), and a section that
    // routes or rewards through `<if var=>` has none of the three. Twenty of them are the "roll
    // higher than your Rank" pages, where the exit was live before the die that decides the Rank;
    // §4.257, §5.343 and §5.432 are the sharper kind, where an `<if>` arm's own <goto> was live
    // and reachable on entry. A section LEAVING this list has had its gate taken over by an
    // earlier seed (or lost it); a section joining it is a page that gained one.
    // Tasks 294 and 313 ride along in this pass rather than opening more of their own over all
    // 4,369 sections: all three need the parsed element, and each await here spends virtual-time
    // budget.
    //
    // Task 313 asks the question every OTHER census here depends on and none of them can ask of
    // itself: does the text they match over hold the tags the document really has? They match with
    // regexes, and the bundle keeps the source's XML comments, so a commented-out node reads to a
    // regex exactly as a live one does. The parser is the independent second opinion — comment
    // nodes are not elements, so `querySelectorAll('*')` never returns them — and rawSections()'s
    // strip is what makes the two agree. Point this loop's `raw` back at `data.loadBook(b)` and it
    // fails on the two sections whose comments quote whole tags (book1/605's `<choice>`,
    // book2/726's commented-out `<lose codeword=>`), which is the defect stated as a measurement.
    // It stays true when a FUTURE comment quotes markup — that is the point of fixing it here
    // rather than pinning today's two sections, since an explanatory comment that quotes the
    // markup it explains is a practice this repository is growing, not one it is retiring. The
    // commented-section count is asserted non-zero for the opposite failure: a corpus with nothing
    // to strip would let this pass while proving nothing.
    const OPEN313 = /<([a-zA-Z][\w-]*)(?:"[^"]*"|[^">])*>/g;
    const gained292 = [], multi292 = [], dead294 = [], phantom313 = [];
    let commented313 = 0;
    for (const b of books) {
      const raw = await rawSections(b);
      const bundled = await data.loadBook(b);
      for (const key of Object.keys(raw)) {
        const el = await data.getSection(b, key);
        if (/<!--/.test(bundled[key])) commented313++;
        let tags313 = 0; OPEN313.lastIndex = 0;
        while (OPEN313.exec(raw[key])) tags313++;
        const elems313 = el.querySelectorAll('*').length + 1;
        if (tags313 !== elems313) phantom313.push(`${b}/${key} tags=${tags313} elements=${elems313}`);
        deadElse294(el).forEach((v) => dead294.push(b + '/' + key + ' ' + v));
        const g = gates.computeRollGate(el);
        if (!g) continue;
        if (g.seed === 'condition') gained292.push(b + '/' + key);
        else if (g.rollNodes.size !== 1) multi292.push(b + '/' + key + ' seed=' + g.seed);
      }
    }
    ok('task294: no shipped chain over one var leaves its <else> unreachable',
       dead294.length === 0, dead294.join(', '));
    ok('task313: every census counts the tags the PARSER sees, over a corpus that comments '
       + commented313 + ' of its sections',
       phantom313.length === 0 && commented313 > 0,
       phantom313.length ? phantom313.join(', ') : 'no commented section in the corpus to strip');
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
