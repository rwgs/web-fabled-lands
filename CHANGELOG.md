# Changelog

Changes that consumers of this project need to know about, newest first.

**Audience: players of the deployed app**, and maintainers deploying it elsewhere. Entries
describe what changed for them. Internal refactors, test work and documentation live in the
commit history and in `TASKS-archive.md`.

There are no tagged releases. Every build is stamped `yy.MM.dd.<hash>` in
`web/js/version.js` and shown in-game, and the site is deployed continuously, so a heading
below is the date a set of changes reached players. Nothing here requires the player to
take any action: saves migrate on load, and the service worker replaces a cached build on
its own.

## 2026-09-02 - build 26.09.02.36b3b6d

- **A healer who promises to cure "poison or disease" now cures poison.** The three arrays
  behind curses, diseases and poisons never formed one family, so a page that says
  "cured of a poison or a disease" only ever searched diseases - book 5 section 105 took
  your 75 Shards and left the poison in place. Every such page now treats the two as one
  affliction, and an unafflicted character is no longer allowed to pay for a cure with
  nothing to remove. Book 1 section 338's healer, who "is unable to cure disease", still
  cannot.
- **When one cure could take either of two afflictions, you choose which.** Same for
  "lift a curse" with more than one on the sheet.
- **A cargo purchase, crew upgrade or cargo trade asks which of your ships changes** when
  more than one is docked with you. Previously it silently used whichever was first, and a
  crew upgrade that was perfectly legal on your second ship read as unavailable because
  only the first was consulted.
- **Reloading mid-section no longer unlocks the weapon a page has already caught.** Book 6
  section 135's Mister Dragon snaps the weapon you are *using*; a save and reload between
  entering and clicking let you swap to a lesser blade and have that one broken instead.
- **A save taken during a "turn back when you are done" detour remembers which choice you
  took.** After reloading and returning, that one action is crossed off again, as it is
  without the reload - book 1 section 220's mission from the high priest and book 5 section
  721's bank both use this route.
- **Book 1 section 460 prints the author's sentence again**: "If you have the codeword
  *Acid* or a **copper amulet**, turn to 327 immediately", where a rules fix had split it
  into two sentences the book never printed.

## 2026-08-31 - build 26.08.31.f72609a

- **Each regional map is captioned with the map's own title** rather than the volume's, in
  the Maps modal and in the image's alt text - book 3's map now reads "The Ports &
  Anchorages of the Violet Ocean" instead of "Over the Blood-Dark Sea". A book that carries
  no such title still falls back to the volume title.

## 2026-08-28 - build 26.08.28.ba963ea

- **Checks a section says to make on your natural score no longer read the bonused one.**
  Three of the six `modifier=` modes were silently dropped by `<set>` and two by `<if>`, and
  a dropped mode falls through to the fully bonused ability - making those checks *easier*
  than the printed page. All six modes are now honoured everywhere they appear, including
  on an `<adjust>`'s condition as well as its value.
- **`<adjust ability="defence">` contributes your Defence** instead of contributing 0.
- **Rank honours `modifier="natural"` on every reader**, so a page that excludes the ring of
  ultimate power's +2 Rank no longer reads it back in.

## 2026-08-26

- **A weapon's bonus is no longer capped.** The 12 on the Adventure Sheet limits the written
  score, not what a weapon adds to it, so book 4 section 103's white sword is worth its full
  +8 to any character. Attack rolls and every difficulty check now read the uncapped score;
  previously the sword was worth +5 to a book 4 Warrior and +4 to a book 5 or 6 one.
- **Buying a better weapon or armour now changes what you use.** The default loadout was
  being stored as though you had chosen it, so "otherwise the strongest of that kind" could
  never fire again - a pregen Warrior who bought a magic sword kept swinging their starting
  battle-axe at Combat 8 instead of 10.
- **A paid "choose one" reward hands over one item, not the whole menu**, and the reward's
  own Take button no longer lingers afterwards, disabled and captioned "Pay first" - book 1
  section 342 was offering to sell you a potion you were already carrying.

## 2026-08-25

- **The Curse of Vulnerability now works.** Book 5 section 638's curse was dropped when the
  section was parsed and then ignored by the Defence calculation, so its 3 points came off
  nothing and the curse was inert.
- **`<if ability="defence">` compares against your real Defence**, not 0. Book 5 section
  361's route to section 160 was unreachable at any Defence, and book 1 section 313's
  daggers always hit.
- **A god's granted Defence or Stamina bonus moves the number it names.** Both parsed,
  stored, and then changed nothing.
- **A fight widget shows the Defence the enemy is actually rolling against.** In a
  `noarmour` fight it displayed the armoured number - book 5 section 689 read 12 while the
  drake rolled against 7.
- *Maintainers:* the build now rejects a misspelled `modifier=` or `modifiers=` value
  instead of letting it silently revert a check to the score the page excludes. A new value
  must be added to the allowlist in the same change that teaches the engine to read it.

## 2026-08-23 to 2026-08-24

- **Book 5 section 681's spun-gold hair charges the 20 Shards it promises** when you travel
  to another book. Nothing in the port fired on a change of book at all.
- **Book 4 section 586's strongroom gives your money back.** It confiscated the whole purse
  and section 528 could never return it.
- **Book 1 section 597's third reward is available** to a player who already holds a
  resurrection deal, matching the replacement rule the books print. The exclusion is now
  applied only on the one page that prints it.
- **Book 5 section 315's crippling injury fires** when the printed sentence says it does; it
  read a variable nothing ever wrote, so it could never happen.
- **Book 2 sections 270 and 362 no longer hand out the god Nagil on arrival**, before the
  die is rolled.
- **Book 4 section 257 no longer ends the adventure** when you pass one check and fail the
  other, and no longer shows its "both rolls failed" exit before either roll is made.
- **Book 3 section 40's editorial reroll note waits for the roll it describes.**

## 2026-08-16 to 2026-08-18

- **`<lose staminato="N">` restores Stamina as well as taking it**, so book 1 section 297's
  padded tournament heals its winner, and no longer kills its loser at section 370.
- **"Give up a blessing of your choice" asks you which**, honouring book 4 section 641's
  printed wording instead of taking whichever blessing was acquired first.
- **A grouped effect asks which ability an open specification takes**, and collects the
  count the page states.
- **The Rules dialog opens at the top** and carries a close control that stays in view.

## 2026-08-06 to 2026-08-11

Mostly one theme: where a section leaves a choice open, the player is now asked.

- **Open forfeits present a picker** - possessions, cargo, abilities and blessings alike -
  instead of taking whichever thing came first internally. This covers plain forfeits,
  priced ones, pay-to-spin costs and those inside a group, and a `multiple=` picker now
  collects every answer it owes. Where the printed page states which thing goes, markup says
  so: page order, or the best item of its kind.
- **A post-fight item award is held behind the fight**, so a section cannot hand back the
  weapon it just confiscated.
- **A taken visit-box redirect holds the section body**, rather than showing text you have
  already passed.
- **Blessings print the name the book uses**, not their internal key.
- **A wordless effect prints a proper label** instead of nothing, and an affliction with no
  printed name prints its own.
- **A purchase fires `<bought>`**, the documented twin of `<sold>`, which had never fired.
- **Titles no longer capitalise the letter after an apostrophe.**

## 2026-07 - first public edition

- **Books 1 to 6 playable end to end** - 4,369 sections - with the common rule set
  automated: ability checks, combat, outcome tables, rank checks, training, markets, ships,
  cargo, crew upgrades, caches, curses, diseases, poisons and resurrection deals.
- **A live Adventure Sheet** with derived Defence, 20 save slots in browser storage, and
  save export and import.
- **Offline play** as an installable PWA: after one online load the whole game works with no
  connection.
- **Narration** through the browser's own speech synthesis - no backend, no API key, and it
  works offline.
- **Regional maps for all six books** plus the world map, in an in-game viewer.
- **Links into books 7 to 12** - never digitised - shown as a note naming the book rather
  than a dead end.
- **Deep links** for testing and sharing: `?demo=<book>.<section>` starts a character at a
  section, and `?seed=<value>` makes a page load's dice deterministic.
