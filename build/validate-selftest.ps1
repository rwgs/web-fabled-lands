#Requires -Version 7.0
<#
  validate-selftest.ps1
  ---------------------
  Drives validate-source.ps1's gate over a tiny fixture tree, once clean and then once per
  mutation, so the gate itself is tested instead of trusted. A validation that silently stops
  catching things looks exactly like a clean corpus (task 199).

  Each case mutates ONE file of an otherwise valid two-book fixture and asserts the reported
  error mentions the right file and reason. Nothing under books/ or web/ is touched: the
  fixture is built in a temp directory and removed afterwards.

  Run: pwsh -ExecutionPolicy Bypass -File build/validate-selftest.ps1   (exit 0 = pass)

  ASCII-only and OS-neutral (forward slashes), like the other build scripts.
#>
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'validate-source.ps1')

$pass = 0
$fail = 0
function Assert([string]$label, [bool]$cond, [string]$detail) {
    if ($cond) { $script:pass++; Write-Host "PASS $label" }
    else { $script:fail++; Write-Host "FAIL $label$(if ($detail) { " - $detail" })" }
}

# ---- The fixture -----------------------------------------------------------------------
# A valid miniature of the real tree: two "bundled" books, one with a pregen whose biography
# lives in its own file (as books 1-4 and 6 do) and one with inline prose (as book 5 does).
$FIXTURE = @{
    'books/book1/1.xml'    = '<section name="1" boxes="2"><p>Start. <goto section="2"/></p><choices><choice section="2">On</choice><choice book="7" section="500">Book 7</choice></choices></section>'
    # "Ready" is ticked here and "Relic" only swept, which is the pair task 327's second note
    # turns on: an awarded codeword must stay silent while a tested-or-cleared one is reported.
    'books/book1/2.xml'    = '<section name="2"><tick codeword="Ready" hidden="t"/><lose codeword="Relic"/><difficulty ability="scouting" level="10"/><outcomes><outcome range="1-6" section="1"/></outcomes></section>'
    'books/book1/2a.xml'   = '<section name="2a"><p>A continuation.</p><return/></section>'
    'books/book1/Adventurers.xml' = '<adventurers><starting><adventurer name="Andriel the Hammer" profession="Warrior" gender="m"/></starting></adventurers>'
    'books/book1/Andriel.xml'     = '<section name="Andriel"><p>A warrior of few words.</p></section>'
    # A parked working copy: it claims section 1's id, but sits in the book's temp/ folder,
    # which the gate's non-recursive walk does not enter. Present in the CLEAN fixture, so
    # making that walk recursive would fail the whole suite here. (task 260)
    'books/book1/temp/1temp.xml'  = '<section name="1"><p>An older draft, parked out of the section namespace.</p></section>'
    # An absent-by-default slot: the same working copy left loose in the book folder, which
    # only the two task 260 cases below fill in.
    'books/book1/1temp.xml'       = $null
    # The codeword authority (task 325). Book 1's list is deliberately written in the awkward
    # shape the real books use - a trailing-backslash continuation and a \uXXXX escape - so a
    # reader that only took the first line, or that compared the escape literally, would fail
    # the CLEAN fixture below rather than passing quietly. "Rune" and "Eclat" are declared and
    # never used at all, which is what the Notes channel reports.
    'books/book1/book.ini' = "Map=Sokara.JPG`nDeath=680`nCodewords=Ready,Relic,\`n`tRune,\u00c9clat`n# a trailing comment, as books 1, 2 and 4 carry`n"
    'books/book2/book.ini' = "Map=Golnir.JPG`nDeath=560`nCodewords=Bounty`n"
    'books/book2/1.xml'    = '<section name="1"><trade ship="brig" cargo="timb" buy="10"/><if crew="excellent"><p>Fine crew.</p></if></section>'
    'books/book2/Adventurers.xml' = '<adventurers><starting><adventurer name="Shen Darkeye" profession="Mage" gender="f">Born to the violet ocean.</adventurer></starting></adventurers>'
    'rules/Rules.xml'      = '<section name="rules"><h3>Rules</h3><p>Roll two dice.</p><table><tr><td>1</td></tr></table></section>'
    'rules/QuickRules.xml' = '<section name="quick"><p>Quick rules.</p></section>'
}

$tmp = Join-Path ([System.IO.Path]::GetTempPath()) ('fl-validate-' + [System.Guid]::NewGuid().ToString('N'))
function Build-Fixture([hashtable]$overrides) {
    if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }
    foreach ($rel in $FIXTURE.Keys) {
        $text = if ($overrides -and $overrides.ContainsKey($rel)) { $overrides[$rel] } else { $FIXTURE[$rel] }
        if ($null -eq $text) { continue }   # $null = "delete this file"
        $path = Join-Path $tmp $rel
        New-Item -ItemType Directory -Force -Path (Split-Path -Parent $path) | Out-Null
        [System.IO.File]::WriteAllText($path, $text, (New-Object System.Text.UTF8Encoding($false)))
    }
    # A file the fixture does not name at all (extra pregen bios and the like) still needs the
    # two book dirs and rules dir to exist, which the loop above has created. The gate takes
    # the publish set as number -> source directory, exactly as Get-BookRegistry resolves it
    # from books.ini (task 209); books.ini's own validation is covered by release-selftest.ps1.
    return Test-SourceTree (Join-Path $tmp 'rules') @{
        1 = (Join-Path $tmp 'books/book1')
        2 = (Join-Path $tmp 'books/book2')
    }
}

# ---- 1. The clean fixture must pass ----------------------------------------------------
$clean = Build-Fixture $null
Assert 'a valid fixture tree reports no errors' ($clean.Errors.Count -eq 0) ($clean.Errors -join ' | ')
Assert 'every fixture file is actually checked (sections + adventurers + bio + rules)' ($clean.Checked -eq 9) "checked=$($clean.Checked)"
# The Notes channel: information, never a verdict. Book 1 declares four codewords - it awards
# one (Ready), sweeps one without ever awarding it (Relic) and never mentions the other two -
# and book 2 declares one and uses none, so four are reported across two gradings. Reaching
# "Rune" at all proves the continuation line was followed, while reaching Eclat proves the
# \u00c9 escape decoded. Asserting the COUNT is what stops a reader that quietly returned an
# empty list from passing here: with no codewords parsed there is nothing to call unused.
# (tasks 325, 327)
Assert 'a codeword declared and never used is a note, not an error (task 325)' ($clean.Notes.Count -eq 4) ($clean.Notes -join ' | ')
Assert 'the continuation line of a Codewords= list is parsed (task 325)' (@($clean.Notes | Where-Object { $_ -like '*"Rune"*' }).Count -eq 1) ($clean.Notes -join ' | ')
Assert 'a \u00c9 escape in Codewords= is decoded (task 325)' (@($clean.Notes | Where-Object { $_ -like "*`"$([char]0x00C9)clat`"*" }).Count -eq 1) ($clean.Notes -join ' | ')
Assert 'an unused codeword is reported against the book that declares it (task 325)' (@($clean.Notes | Where-Object { $_ -like 'book2/book.ini*"Bounty"*' }).Count -eq 1) ($clean.Notes -join ' | ')
# task 327: the two gradings must not collapse into each other. A <lose>-only codeword is the
# missed-<gain> shape and gets the second wording; an awarded one gets no note of either kind,
# which is the half that fails if the award set is read as "any codeword= site".
Assert 'a codeword tested or swept but never awarded gets its own note (task 327)' (@($clean.Notes | Where-Object { $_ -like 'book1/book.ini*"Relic"*no section awards it*' }).Count -eq 1) ($clean.Notes -join ' | ')
Assert 'a never-awarded codeword is not called wholly unreferenced (task 327)' (@($clean.Notes | Where-Object { $_ -like '*"Relic"*awards or tests it*' }).Count -eq 0) ($clean.Notes -join ' | ')
Assert 'a codeword some section <tick>s draws no note at all (task 327)' (@($clean.Notes | Where-Object { $_ -like '*"Ready"*' }).Count -eq 0) ($clean.Notes -join ' | ')

# ---- 2. One mutation per class of mistake ----------------------------------------------
# Each case: a label, the file it breaks, its replacement text, and a fragment the error must
# mention. `$null` text deletes the file (and a fixture entry that is already `$null` is
# absent until a case supplies its text).
$CASES = @(
    @{ label = 'not well-formed XML'
       file  = 'books/book1/1.xml'
       text  = '<section name="1"><p>Unclosed.</section>'
       want  = 'not well-formed' }

    @{ label = 'a section name that disagrees with its filename (task 78)'
       file  = 'books/book1/2.xml'
       text  = '<section name="22"><p>Wrong name.</p></section>'
       want  = 'does not match filename' }

    @{ label = 'a stale working copy loose in a book folder claiming a live section id (task 260)'
       file  = 'books/book1/1temp.xml'
       text  = '<section name="1"><p>An older draft of section 1.</p></section>'
       want  = 'is a section id, but the file is not 1.xml' }

    @{ label = 'a wrong root element in a section file'
       file  = 'books/book1/2.xml'
       text  = '<adventurers name="2"><p>Wrong root.</p></adventurers>'
       want  = 'expected <section>' }

    @{ label = 'a wrong root element in Adventurers.xml'
       file  = 'books/book1/Adventurers.xml'
       text  = '<section name="1"><starting><adventurer name="Andriel the Hammer" profession="Warrior" gender="m"/></starting></section>'
       want  = 'expected <adventurers>' }

    @{ label = 'a wrong root element in a rules file'
       file  = 'rules/QuickRules.xml'
       text  = '<rules><p>Quick rules.</p></rules>'
       want  = 'expected <section>' }

    @{ label = 'an unknown tag'
       file  = 'books/book1/1.xml'
       text  = '<section name="1"><p>Text.</p><gainn shards="5"/></section>'
       want  = 'unknown tag <gainn>' }

    @{ label = 'an unknown attribute (the historical safeAddGodd typo)'
       file  = 'books/book1/1.xml'
       text  = '<section name="1"><if safeAddGodd="Nagil"><p>Blessed.</p></if></section>'
       want  = 'unknown attribute safeAddGodd= on <if>' }

    @{ label = 'the singular tag= typo where the engine reads tags='
       file  = 'books/book1/1.xml'
       text  = '<section name="1"><item name="rope" tag="tool"/></section>'
       want  = 'unknown attribute tag= on <item>' }

    @{ label = 'a bad enumerated ability'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><difficulty ability="scouting|thievry" level="10"/></section>'
       want  = 'ability="thievry"' }

    @{ label = 'a bad enumerated cargo'
       file  = 'books/book2/1.xml'
       text  = '<section name="1"><trade ship="brig" cargo="tmber" buy="10"/></section>'
       want  = 'cargo="tmber"' }

    @{ label = 'a bad enumerated crew quality'
       file  = 'books/book2/1.xml'
       text  = '<section name="1"><if crew="exellent"><p>Fine crew.</p></if></section>'
       want  = 'crew="exellent"' }

    # task 300: one case per tag that carries modifier=, because the gate keys the check on the
    # ATTRIBUTE and a tag that stopped reaching Test-AttrValue would fail here and nowhere else.
    @{ label = 'a misspelled <set modifier=> resolution mode (task 300)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><set var="r" value="rank" modifier="naturel"/></section>'
       want  = 'modifier="naturel" is not a known modifier' }

    @{ label = 'a misspelled <difficulty modifier=> resolution mode (task 300)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><difficulty ability="combat" level="10" modifier="naturel"/></section>'
       want  = 'modifier="naturel" is not a known modifier' }

    @{ label = 'a misspelled <if modifier=> resolution mode (task 300)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><if ability="combat" greaterthan="5" modifier="naturel"><p>Strong.</p></if></section>'
       want  = 'modifier="naturel" is not a known modifier' }

    @{ label = 'a misspelled <adjust modifier=> resolution mode (task 300)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><difficulty ability="combat" level="10"><adjust ability="stamina" modifier="naturel"/></difficulty></section>'
       want  = 'modifier="naturel" is not a known modifier' }

    @{ label = 'a misspelled <fight modifiers=> fight mode (task 300)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><fight name="Water Drake" combat="9" defence="15" stamina="12" modifiers="noarmor"/></section>'
       want  = 'modifiers="noarmor" is not a known fight modifier' }

    # The token split is the point of giving modifiers= its own check: a list whose FIRST word is
    # legal must still be rejected on the second, which the old substring read accepted.
    @{ label = 'a <fight modifiers=> list with one good word and one bad (task 300)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><fight name="Water Drake" combat="9" defence="15" stamina="12" modifiers="noarmour nosheild"/></section>'
       want  = 'modifiers="nosheild" is not a known fight modifier' }

    # task 302: `current` is the one value whose legality depends on its TAG - only <adjust> and
    # <difficulty> read it, so on <set>/<if> it would fall through to the default in silence.
    @{ label = 'modifier="current" on <set>, which does not read it (task 302)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><set var="s" value="stamina" modifier="current"/></section>'
       want  = 'modifier="current" is only read on <adjust> and <difficulty>' }

    @{ label = 'modifier="current" on <if>, which does not read it (task 302)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><if ability="stamina" greaterthan="5" modifier="current"><p>Hale.</p></if></section>'
       want  = 'modifier="current" is only read on <adjust> and <difficulty>' }

    @{ label = 'a bad per-tag type value'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><item name="potion"><effect type="quaff" verb="Drink"/></item></section>'
       want  = 'type="quaff" is not a <effect> type' }

    @{ label = 'a truth flag that is not t/f'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><tick codeword="Ready" hidden="ture"/></section>'
       want  = 'hidden="ture" is not a truth flag' }

    @{ label = 'an <adjust crew=> hanging where no roll reads it (task 268)'
       file  = 'books/book2/1.xml'
       text  = '<section name="1"><adjust crew="good" amount="1"/></section>'
       want  = 'an <adjust> modifies the node above it' }

    @{ label = 'a bare <adjust codeword=>, which reads as the counter bump it is not (task 269)'
       file  = 'books/book2/1.xml'
       text  = '<section name="1"><adjust codeword="Bounty" value="3"/></section>'
       want  = 'an <adjust> modifies the node above it' }

    @{ label = 'an <adjust> under a wrapper that does not read it (task 269)'
       file  = 'books/book2/1.xml'
       text  = '<section name="1"><if crew="good"><adjust title="Nightstalker" value="1"/></if></section>'
       want  = '<adjust> under <if>' }

    # task 325: the value check on codeword=. The first is the whole defect - the award is
    # misspelled, the test is not, and every other check in the repo passes.
    @{ label = 'a misspelled codeword value (task 325)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><gain codeword="Redy"/><if codeword="Ready"><p>Marked.</p></if></section>'
       want  = 'codeword="Redy" is not declared' }

    # A union is split like an enum, so a good first word may not carry a bad second.
    @{ label = 'a misspelled codeword inside a | union (task 325)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><if codeword="Ready|Runes"><p>Marked.</p></if></section>'
       want  = 'codeword="Runes" is not declared' }

    # The comma list is the AND form, and it must be split for the same reason the pipe is -
    # otherwise the fix for task 336 (accept the separator) would silently stop checking the
    # names inside it, which is the worse of the two failures it could have.
    @{ label = 'a misspelled codeword inside a comma AND-list (task 336)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><if codeword="Ready,Runes"><p>Marked.</p></if></section>'
       want  = 'codeword="Runes" is not declared' }

    # A section-scoped flag that lost its separator - book 4 section 345 cleared "4457" where
    # section 457 sets "4.457". This is why the exemption needs the '.' or '/' and not just a
    # leading digit: "4457" would otherwise read as machinery and pass.
    @{ label = 'a section-scoped flag missing its separator (task 325)'
       file  = 'books/book1/2.xml'
       text  = '<section name="2"><lose codeword="2345" hidden="t"/></section>'
       want  = 'codeword="2345" is not declared' }

    # The vacuity guard. A list that fails to parse yields an empty set, which would accept
    # every value in the corpus while looking exactly like a clean run - so a book that
    # declares nothing is itself the error, and the value check stands down (asserted below).
    @{ label = 'a book.ini with no Codewords= list at all (task 325)'
       file  = 'books/book1/book.ini'
       text  = "Map=Sokara.JPG`nDeath=680`n"
       want  = 'no Codewords= list' }

    @{ label = 'a dangling link inside a bundled book'
       file  = 'books/book1/1.xml'
       text  = '<section name="1"><p>Start. <goto section="999"/></p></section>'
       want  = 'link to section 1:999' }

    @{ label = 'a dangling cross-book link into another BUNDLED book'
       file  = 'books/book1/1.xml'
       text  = '<section name="1"><choices><choice book="2" section="404">Sail</choice></choices></section>'
       want  = 'link to section 2:404' }

    @{ label = 'a malformed referenced pregen biography'
       file  = 'books/book1/Andriel.xml'
       text  = '<section name="Andriel"><p>Unclosed bio.</section>'
       want  = 'not well-formed' }

    @{ label = 'a referenced pregen biography that is missing entirely'
       file  = 'books/book1/Andriel.xml'
       text  = $null
       want  = 'no inline bio and no Andriel.xml' }

    @{ label = 'a referenced pregen biography with no prose'
       file  = 'books/book1/Andriel.xml'
       text  = '<section name="Andriel"><p>   </p></section>'
       want  = 'no biography prose' }
)

foreach ($c in $CASES) {
    $res = Build-Fixture @{ $c.file = $c.text }
    $hit = @($res.Errors | Where-Object { $_ -like "*$($c.want)*" })
    Assert "the gate catches $($c.label)" ($hit.Count -ge 1) ("errors: " + (($res.Errors -join ' | ')))
}

# ---- 3. What must NOT be reported ------------------------------------------------------
# A link into an unbundled book (7-12) is how the series cross-references its sequels, and a
# named entry point is not a section id. Neither may be called dangling.
$ok1 = Build-Fixture @{ 'books/book1/1.xml' = '<section name="1"><choices><choice book="9" section="777">Book 9</choice></choices></section>' }
Assert 'a link into an unbundled book (7-12) is left alone' ($ok1.Errors.Count -eq 0) ($ok1.Errors -join ' | ')
$ok2 = Build-Fixture @{ 'books/book1/1.xml' = '<section name="1"><choices><choice section="2a">Continuation</choice></choices></section>' }
Assert 'a lettered continuation section resolves' ($ok2.Errors.Count -eq 0) ($ok2.Errors -join ' | ')
$ok3 = Build-Fixture @{ 'books/book1/2.xml' = '<section name="2"><if ability="?"><p>Any.</p></if><lose cargo="*"/><gain crew="-1"/></section>' }
Assert 'JaFL wildcards and a crew delta are accepted values' ($ok3.Errors.Count -eq 0) ($ok3.Errors -join ' | ')
# The other half of task 260's check: a <section> file whose name is PROSE claims no section
# id, so it is left alone. New.xml names the book and a pregen bio names the character - both
# sit loose in the book folder and neither may be read as a mis-named section.
$ok4 = Build-Fixture @{ 'books/book1/1temp.xml' = '<section name="The War-Torn Kingdom"><p>Book title, not a section id.</p></section>' }
Assert 'a prose-named <section> loose in a book folder is left alone' ($ok4.Errors.Count -eq 0) ($ok4.Errors -join ' | ')
# The other half of tasks 268 + 269's check: the shapes the corpus really writes must stay
# legal - all five readers, and the non-crew conditions the widened check now also sees.
# The other half of task 300's check: every spelling the ENGINE acts on must stay legal, or the
# gate rejects working markup. SIX modes since task 302 brought the table level with the spec -
# `noarmour` (state.js defenceForMode) and `current` (adjustAmount / rollDifficulty, tag-restricted
# to <adjust> and <difficulty>) joined the four state.js abilityForMode already read - plus the one
# fight mode combat.js parses. A tag not listed here carries no modifier= in the allowlist.
$ok300 = Build-Fixture @{ 'books/book1/2.xml' = '<section name="2">' +
    '<set var="a" value="combat" modifier="natural"/><set var="b" value="combat" modifier="affected"/>' +
    '<set var="c" value="combat" modifier="noweapon"/><set var="d" value="combat" modifier="notool"/>' +
    '<difficulty ability="combat" level="10" modifier="noweapon"><adjust ability="stamina" modifier="current"/></difficulty>' +
    '<difficulty ability="stamina" level="10" modifier="current"/>' +
    '<difficulty ability="defence" level="14" modifier="noarmour"/>' +
    '<if ability="defence" greaterthan="13" modifier="noarmour"><p>Unarmoured.</p></if>' +
    '<if ability="combat" greaterthan="5" modifier="natural"><p>Strong.</p></if>' +
    '<fight name="Water Drake" combat="9" defence="15" stamina="12" modifiers="noarmour"/></section>' }
Assert 'every resolution mode the engine acts on, and the one fight mode, are accepted (tasks 300, 302)' ($ok300.Errors.Count -eq 0) ($ok300.Errors -join ' | ')
$ok5 = Build-Fixture @{ 'books/book2/1.xml' = '<section name="1"><random dice="2"><adjust crew="good" amount="1"/><adjust codeword="Bounty" value="3"/></random><difficulty ability="scouting" level="9"><adjust crew="poor" value="-1"/><adjust title="Nightstalker" value="1"/></difficulty><rankcheck dice="1"><adjust titleVal="bokh" default="-1"/></rankcheck><gain ability="stamina" amount="2"><adjust name="CharismaBonus"/></gain><lose stamina="4"><adjust crew="excellent" amount="-1"/></lose></section>' }
Assert 'an <adjust> under each of the five readers is left alone' ($ok5.Errors.Count -eq 0) ($ok5.Errors -join ' | ')
# The other half of task 325's check: every shape the corpus really writes must stay legal, or
# the gate rejects 1,207 working sites. Book 2's codeword tested from book 1 (the alphabetical
# rule says where a codeword is EARNED, not where it may be read); a value only reachable past
# the .ini's continuation line; the \u00c9 escape against the section's &#201; character
# reference; the port's own named state flags; a forward reference to a book with no folder
# here; and the three spellings of a section-scoped bookkeeping flag.
$ok325 = Build-Fixture @{ 'books/book1/2.xml' = '<section name="2">' +
    '<if codeword="Bounty"><p>Book 2''s codeword, read in book 1.</p></if>' +
    '<lose codeword="Rune|&#201;clat"/>' +
    '<tick codeword="StillInYellowport" hidden="t"/><lose codeword="HydraDamage"/>' +
    '<if codeword="Judas"><p>A codeword from book 10.</p></if>' +
    '<tick codeword="1.10.1" hidden="t"/><lose codeword="5/520"/><set codeword="3.318.sold" value="t"/>' +
    '</section>' }
Assert 'the codeword shapes the corpus really writes are left alone (task 325)' ($ok325.Errors.Count -eq 0) ($ok325.Errors -join ' | ')
# The other half of task 336's check: the AND form the engine documents must be legal. Read as
# one name it lands in the lookup as "Ready,Relic" and reports undeclared, so this assertion
# fails on the pre-336 split; the negative case above keeps the names inside it checked.
$ok336 = Build-Fixture @{ 'books/book1/2.xml' = '<section name="2">' +
    '<if codeword="Ready,Relic"><p>Both held.</p></if>' +
    '<lose codeword="Rune,&#201;clat"/>' +
    '</section>' }
Assert 'a comma AND-list of codewords is accepted, as matchCodewords reads it (task 336)' ($ok336.Errors.Count -eq 0) ($ok336.Errors -join ' | ')
# ...and with the authority unreadable the check stands down rather than failing every value:
# one error naming the .ini, and no value errors behind it.
$novac = Build-Fixture @{ 'books/book1/book.ini' = "Map=Sokara.JPG`nDeath=680`n" }
Assert 'an unreadable Codewords= list disarms the value check instead of failing all of them (task 325)' (
    @($novac.Errors | Where-Object { $_ -like '*is not declared*' }).Count -eq 0 -and
    $novac.Notes.Count -eq 0) ($novac.Errors -join ' | ')

if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }

Write-Host ''
Write-Host ("RESULT {0} pass={1} fail={2}" -f $(if ($fail) { 'FAILURES' } else { 'ALL PASS' }), $pass, $fail)
exit $(if ($fail) { 1 } else { 0 })
