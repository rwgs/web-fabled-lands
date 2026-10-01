// sw-cache.js - the Fabled Lands cache-namespace policy (task 190) and the
// install-time precache (task 359).
//
// CacheStorage is shared per *origin*, not per service-worker scope, so any other
// app hosted on this origin has its caches visible to us (and ours to it). Every
// operation here is therefore confined to the 'fl-' namespace:
//   * cleanup may only delete obsolete fl-* caches -- never a stranger's;
//   * lookup may only read our own caches -- the origin-global caches.match(req)
//     searches every cache on the origin and would happily return another app's
//     response for the same URL.
//
// Loaded two ways, so it must stay dependency-free and export only via `self`:
//   sw.js:  importScripts('./js/sw-cache.js')   -- classic worker script
//   tests:  await import('../js/sw-cache.js')   -- bare module (no import/export)
// Both evaluate this same source and publish self.FLCache.

self.FLCache = (() => {
  const PREFIX = 'fl-';

  const isFl = (key) => typeof key === 'string' && key.startsWith(PREFIX);

  // Every Fabled Lands cache that is not the current one, newest first
  // (caches.keys() is creation-ordered). Foreign keys are never returned, so a
  // caller can neither delete nor read another app's cache through this.
  const obsolete = (keys, current) => keys.filter((k) => isFl(k) && k !== current).reverse();

  // Cache-first lookup restricted to our own namespace: the current cache, then
  // older fl-* caches newest-first. That older-cache pass preserves task 8's
  // incomplete-upgrade fallback (activate keeps the previous cache when the new
  // one is short an asset, and it must still be able to serve it).
  async function match(cacheStorage, req, current, opts) {
    const cache = await cacheStorage.open(current);
    const hit = await cache.match(req, opts);
    if (hit) return hit;
    for (const key of obsolete(await cacheStorage.keys(), current)) {
      const older = await cacheStorage.open(key);
      const stale = await older.match(req, opts);
      if (stale) return stale;
    }
    return undefined;
  }

  // Drop obsolete fl-* caches, but only once `current` verifiably holds every
  // required asset -- otherwise a partial install would delete the last complete
  // offline cache (task 8). Returns the deleted keys, or null when the gate held
  // and the older caches were kept as a fallback.
  async function prune(cacheStorage, current, required) {
    const cache = await cacheStorage.open(current);
    const present = await Promise.all(required.map((url) => cache.match(url).then((r) => !!r)));
    if (!present.every(Boolean)) return null;
    const doomed = obsolete(await cacheStorage.keys(), current);
    await Promise.all(doomed.map((key) => cacheStorage.delete(key)));
    return doomed;
  }

  // Precache past every cache layer between the worker and the deployed file (task 359).
  // cache.addAll()/add() fetch in the default cache mode, so the browser's HTTP cache or
  // the CDN in front of the site (Cloudflare, max-age=14400 on js/) could fill a new
  // build's cache with the previous build's bytes. cache: 'reload' skips the browser's
  // cache but not the CDN's, so each entry is also fetched at a build-unique URL -- and
  // stored under the plain URL the app requests, because the precache URL is the key.
  const fetchFresh = (fetchFn, url, version) =>
    fetchFn(url + (url.includes('?') ? '&' : '?') + 'v=' + encodeURIComponent(version), { cache: 'reload' });

  // Each body is read as soon as its response arrives, and stored as a fresh copy. Two reasons:
  //  * Reading it frees the connection (task 382). precache waits for every REQUIRED response
  //    before writing any, and over HTTP/1.x a browser opens six connections per host. An unread
  //    body holds its connection unless the HTTP cache drains it, which a no-store response
  //    (build/serve.py) never is, so the install stalled after a handful of requests.
  //  * A fresh copy is never "redirected" (task 370). Cloudflare's asset server answers
  //    ./index.html with a 307 to ./, and the browser refuses a redirected response as the
  //    answer to a navigation, so the page would fail to load from the cache.
  const fetchOk = async (fetchFn, url, version) => {
    const res = await fetchFresh(fetchFn, url, version);
    if (!res.ok) throw new TypeError('precache ' + url + ': HTTP ' + res.status);
    const body = await res.arrayBuffer();
    return new Response(body, { status: res.status, statusText: res.statusText, headers: res.headers });
  };

  // All-or-nothing, like the addAll() it replaces: every response is fetched and checked
  // before anything is written, so one miss rejects (failing the install) with nothing put.
  async function precache(cache, urls, version, fetchFn) {
    const responses = await Promise.all(urls.map((url) => fetchOk(fetchFn, url, version)));
    await Promise.all(urls.map((url, i) => cache.put(url, responses[i])));
  }

  // Best-effort: a miss is reported to onMiss and never rejects.
  async function precacheOptional(cache, urls, version, fetchFn, onMiss) {
    await Promise.all(urls.map((url) =>
      fetchOk(fetchFn, url, version).then((res) => cache.put(url, res)).catch((e) => onMiss(url, e))));
  }

  return { PREFIX, isFl, obsolete, match, prune, precache, precacheOptional };
})();
