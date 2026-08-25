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
    'books/book1/2.xml'    = '<section name="2"><tick codeword="Ready" hidden="t"/><difficulty ability="scouting" level="10"/><outcomes><outcome range="1-6" section="1"/></outcomes></section>'
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
       text  = '<section name="1"><adjust codeword="Eldritch" value="3"/></section>'
       want  = 'an <adjust> modifies the node above it' }

    @{ label = 'an <adjust> under a wrapper that does not read it (task 269)'
       file  = 'books/book2/1.xml'
       text  = '<section name="1"><if crew="good"><adjust title="Nightstalker" value="1"/></if></section>'
       want  = '<adjust> under <if>' }

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
$ok5 = Build-Fixture @{ 'books/book2/1.xml' = '<section name="1"><random dice="2"><adjust crew="good" amount="1"/><adjust codeword="Eldritch" value="3"/></random><difficulty ability="scouting" level="9"><adjust crew="poor" value="-1"/><adjust title="Nightstalker" value="1"/></difficulty><rankcheck dice="1"><adjust titleVal="bokh" default="-1"/></rankcheck><gain ability="stamina" amount="2"><adjust name="CharismaBonus"/></gain><lose stamina="4"><adjust crew="excellent" amount="-1"/></lose></section>' }
Assert 'an <adjust> under each of the five readers is left alone' ($ok5.Errors.Count -eq 0) ($ok5.Errors -join ' | ')

if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }

Write-Host ''
Write-Host ("RESULT {0} pass={1} fail={2}" -f $(if ($fail) { 'FAILURES' } else { 'ALL PASS' }), $pass, $fail)
exit $(if ($fail) { 1 } else { 0 })
