// FL test helper — the bundled section text as the corpus CENSUSES must read it (task 313).
//
// `data.loadBook()` returns the bundled JSON verbatim and `build/build-data.ps1` does not strip
// XML comments, so a census that matches over the raw string counts a COMMENTED-OUT node as a
// real one. That is not hypothetical: of the sections the corpus ships with a comment, book1/605
// quotes a whole `<choice section="501">` and book2/726 a commented-out `<lose codeword=…/>`, and
// task 273's census walks §2.726 precisely because its `<lose codeword=` pre-filter matches inside
// that comment. Nothing is mis-measured today only because of where those two nodes happen to sit.
//
// So every census reads its sections through here instead of calling `loadBook` directly, and the
// strip happens once rather than at nineteen call sites — which is also why task 266's scanner no
// longer carries its own `replace`, the one place that already knew. The bundle stays byte-
// identical: the defect is in what the censuses read, not in what the build ships (the comments
// are a maintainer aid, and `books/` is the source that keeps them either way).
//
// Cached per book like `loadBook`'s own fetch cache: the censuses walk all 4,369 sections many
// times over, and the replace is not free.
import * as data from '../js/data.js';

const COMMENT = /<!--[\s\S]*?-->/g;
const cache = new Map();

/** The bundled sections of book `b` as `{ key: xml }` — same keys as `data.loadBook(b)`,
 *  with every XML comment removed from each section's text. */
export async function rawSections(b) {
  if (cache.has(b)) return cache.get(b);
  const raw = await data.loadBook(b);
  const out = {};
  for (const key of Object.keys(raw)) out[key] = raw[key].replace(COMMENT, '');
  cache.set(b, out);
  return out;
}
