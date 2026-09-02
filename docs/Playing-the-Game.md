# Playing the Game

[Home](Home.md) | Next: [Game Rules](Game-Rules.md)

The game runs entirely in the browser. Nothing is uploaded, there is no account, and
progress lives in your own browser's storage.

---

## Getting in

**On the web** - open [webfl.rwgs.net](https://webfl.rwgs.net/). This is the recommended
route on a phone or tablet, because it can be installed to the home screen and then works
with no connection at all.

**Locally** - the app loads its book data with `fetch`, so opening `index.html` from disk
will not work; it has to be served over HTTP. From the repository root:

```
python -m http.server 8848
```

then open `http://localhost:8848/`, which redirects to `/web/`. Any static server does;
the repository also ships [`build/serve.py`](../build/serve.py), which additionally sends
`Cache-Control: no-store` and refuses to share its port - see [Testing](Testing.md) for
why both of those matter.

---

## Starting a character

New games begin at **Book 1, section 1**, though character creation lets you pick a
different starting book. A new adventurer starts at 1st Rank with 9 Stamina and 16 Shards,
and one of six professions - Priest, Mage, Rogue, Troubadour, Warrior or Wayfarer - which
sets the six ability scores.

The starting profiles are not hardcoded. They are parsed from each book's
`Adventurers.xml`, so book 4's Warrior begins stronger than book 1's, as the printed books
intend. See [Game Rules](Game-Rules.md) for what each ability does.

---

## The Adventure Sheet

The live sheet mirrors the printed one and updates on every state change:

- The six **abilities**, plus Rank, Stamina and Shards.
- **Defence**, derived rather than stored - see [Game Rules](Game-Rules.md).
- **Possessions**, capped at 12 items (money is not capped), with the wielded weapon and
  worn armour marked. Only the best bonus of a kind applies; carrying two swords does not
  stack them.
- **Ship and cargo**, when you own a vessel - its type, crew grade and manifest.
- **Codewords, blessings, curses, diseases, poisons, gods and titles** - the bookkeeping
  the printed game asks you to track by hand.
- **Visit boxes and caches** - the ticked boxes and the money or goods you have stored.

---

## Saving

Saves are written to `localStorage` under the `fl_save_<slot>` keys, with an index at
`fl_meta`. There are **20 slots**, and the game autosaves continuously - after each
applied effect and each resolved roll, not merely on leaving a section, so a closed tab
resumes the exact visit rather than restarting the section.

Because saves are browser storage, they are per-browser and per-device: clearing site data
deletes them. Export a save to a JSON file to move it or keep a backup; imports are
validated and migrated, so a save from an older build still loads.

If a write fails - storage full, or private-browsing mode blocking it - the game says so
rather than silently discarding progress.

A session-only **undo** holds the state as it was on entering each of the last 30
sections. It is deliberately not persisted.

---

## Offline play

The app is a PWA. `web/sw.js` caches the shell and every bundled book on first visit, so
after one online load the whole game works with no connection. Install it from the
browser's "Add to Home Screen" or install prompt.

Cache upgrades are atomic: a new build's caches are only pruned once the new one has
verifiably installed in full, so an interrupted upgrade can never leave a half-cached
game. All of this is confined to the `fl-` cache namespace, so a co-hosted app's caches
are never touched.

---

## Narration

Prose can be read aloud through the browser's built-in **Web Speech API** - no backend, no
API key, and it keeps working offline using the device's own voices.

- The speaker button in the game header plays or stops the current section.
- **Menu -> Narration...** has auto-narrate (on by default), voice selection and speed,
  remembered per browser.
- Text is spoken sentence by sentence with the current sentence highlighted. Button, roll
  and choice labels are excluded from the reading.

Browsers with no speech support simply do not show the button.

---

## Deep links

Two query parameters are useful for testing and for sharing a spot:

| Parameter | Effect |
|---|---|
| `?demo=<book>.<section>` | Starts a default Warrior at that section, e.g. `?demo=1.10`. The game is ephemeral and does not occupy a save slot until you keep it. |
| `?seed=<value>` | Makes every dice roll deterministic for that page load, so a run is reproducible. Any string or number works. |

They combine: `?seed=42&demo=1.10` replays identically every time.

Both work on the app itself (`…/web/?demo=1.10`) and at the **site's root**
(`https://host/?demo=1.10`) — the root page forwards into `web/` carrying the query and hash
across, so a shared link keeps its parameters.

---

## Books not in this edition

Books 7 to 12 were never digitised, so a link into one is **detected and shown as a
friendly "not included in this edition" note** rather than a dead end. See
[The Books](The-Books.md).
