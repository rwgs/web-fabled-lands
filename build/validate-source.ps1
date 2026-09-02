#Requires -Version 7.0
<#
  validate-source.ps1
  -------------------
  The source-XML gate the build runs BEFORE writing any generated file, and the reader
  both phases share. Dot-sourced by build-data.ps1 (which owns the bundling) and by
  validate-selftest.ps1 (which drives it over mutation fixtures).

  Task 13 added well-formedness + a numeric <section name> check. That accepted every
  mistake that does not break the parser: an unknown tag or attribute (the historical
  `safeAddGodd` and `tag`/`tags` typos), an invalid enumerated value, a link to a section
  that does not exist in a bundled book, a malformed pregen biography, and a wrong root
  element (Adventurers.xml and the rules files were passed no expected root at all). Each
  of those reaches the browser as silently missing behaviour rather than a build failure,
  so this file closes the vocabulary (task 199).

  The vocabulary is deliberately a CLOSED allowlist of what the corpus and the engine use
  today. A genuinely new tag/attribute/value must be added here in the same change that
  teaches the engine to read it - which is the point: a typo cannot ship as a silent no-op.

  ASCII-only and OS-neutral (forward slashes) like the other build scripts: CI runs them
  on Linux and greps them for non-ASCII bytes, which break Windows PowerShell 5.1 parsing.
#>

# The bundled text is LF-normalised so the JSON is a pure function of the source CONTENT.
# Without this a core.autocrlf=true checkout (CRLF working tree) bundles "\r\n" where an LF
# checkout bundles "\n" - ~8,500 differing escapes per book - so the committed data could not
# be checked against a rebuild in CI, and the same content produced two different version
# stamps. Nothing is lost: both XmlDocument here and the browser's DOMParser normalise CRLF
# to LF while parsing, so this only strips the builder's platform out of the output. (task 197)
function Read-Xml([string]$path) {
    $raw = (Get-Content -Raw -Encoding UTF8 $path) -replace "`r`n", "`n"
    return ($raw -replace '(?s)^\s*<\?xml.*?\?>\s*', '').Trim()
}

# ---- The vocabulary --------------------------------------------------------------------
# tag -> every attribute that tag may carry, across all four kinds of source file (book
# sections, Adventurers.xml, the rules prose, and the pregen biographies). A union rather
# than one table per kind: the root check below already separates the kinds, and a stray
# <gold> in a section file is harmless, while a MISSPELLED tag or attribute is not.
$script:FL_TAG_ATTRS = @{
    # -- prose / structure (the rules files add h3/h4/table/tr/td) --
    'p' = ''; 'b' = ''; 'i' = ''; 'h3' = ''; 'h4' = ''; 'table' = ''; 'tr' = ''; 'td' = ''
    'desc' = ''; 'text' = ''; 'flee' = ''; 'reroll' = ''; 'else' = ''; 'choices' = ''
    'section' = 'boxes dock image name profession start tag todock'
    'sectionview' = 'random title'
    'header' = 'header1 header2 header3 type'
    'image' = 'book file title'
    'field' = 'label name text'
    # -- navigation and conditions --
    'choice' = 'book box currency dead flee god item pay profession revisit sail section shards tags'
    'goto' = 'book dead force hidden price sail section visit'
    'extrachoice' = 'atbook atsection book key remove section tag text'
    # <bookchange> registers a standing rule keyed by name= whose body is the effect a
    # CHANGE OF BOOK pays - book5/681's spun-gold hair, "20 Shards whenever you travel to
    # another book". once='t' makes it fire only once; <lose bookchange=> lifts it. (task 299)
    'bookchange' = 'name once'
    'if' = 'ability armour blessing bonus book cache cargo codeword crew curse dead dice disease docked equals gender god greaterthan group item lessthan modifier name not poison profession resurrection safeAddGod shards ship tags ticks title tool using var weapon'
    'elseif' = 'codeword crew equals god hidden item lessthan profession ship ticks title var weapon'
    'group' = 'force'
    'while' = 'var'
    'return' = 'force'
    'include' = 'armour weapon'
    'exclude' = 'bonus item reason tags'
    # -- rolls --
    'random' = 'dice flag force type var'
    'difficulty' = 'ability flag force hidden level modifier var'
    'rankcheck' = 'add dice'
    'training' = 'ability add dice var'
    'outcomes' = 'flag var'
    'outcome' = 'blessing book codeword flag range section var'
    'success' = 'ability book section var'
    'failure' = 'book section var'
    # -- rewards, costs and state --
    'gain' = 'ability amount blessing codeword crew flag force hidden price shards title'
    'lose' = 'ability amount armour blessing bonus bookchange cache cargo chance choose codeword crew curse disease fatal flag force god group hidden item itemAt multiple poison price resurrection shards ship stamina staminato tags title using weapon'
    'tick' = 'ability addbonus addtag amount blessing bonus cache cargo codeword count crew effect flag force god hidden item name permanent price profession quantity removetag shards special tags title titleAdjust titlePattern titleValue using weapon'
    'set' = 'cache codeword dock force hidden item modifier success tags value var weapon'
    'adjust' = 'ability amount codeword crew default god greaterthan item modifier name profession ship tags title titleVal value'
    'adjustmoney' = 'cache force multiply name'
    'transfer' = 'armour bonus force from hidden item limit price shards to weapon xarmour xgroup xitem'
    'rest' = 'hidden shards stamina'
    # unique='t' is the port's name for a PRINTED exclusion on one offer: section 1.597's free
    # deal is offered "if you do not have one already". The engine's default is the sheet's
    # replacement rule (a new deal cancels the old), so only a page printing the exclusion
    # carries this - never the 14 offers that print the replacement rule. (task 297)
    'resurrection' = 'book flag god hidden section shards supplemental text unique'
    'curse' = 'cumulative lift name'
    'disease' = 'name'
    'poison' = 'name'
    'effect' = 'ability bonus description divide target text type uses verb'
    # -- possessions, markets and caches --
    'item' = 'buy buytags flag force group hidden name quantity replace sell tags verb'
    'items' = 'group limit'
    'weapon' = 'bonus buy buytags flag force group name profession quantity replace sell tags'
    'armour' = 'bonus buy buytags group name quantity sell'
    'tool' = 'ability bonus buy flag group name replace sell'
    'market' = 'buy currency sell'
    'buy' = 'ability bonus cargo crew flag force initialCrew item name quantity shards ship tags tool'
    'sell' = 'cargo item price quantity shards'
    'bought' = 'item tags'   # the documented twin of <sold> - fires on a purchase (task 219)
    'sold' = 'item tags'
    'trade' = 'buy cargo initialCrew name quantity sell ship'
    'itemcache' = 'itemlimit max name text'
    'moneycache' = 'max multiples name text withdrawCharge'
    # -- combat --
    'fight' = 'abilityDamaged attackDice attacks combat defence flee group modifiers name playerDefence playerFirst preDamage stamina staminaLost useCache'
    'fightdamage' = 'type'
    'fightround' = 'pre'
    # -- Adventurers.xml (the six pre-made characters per book) --
    'adventurers' = ''; 'starting' = ''; 'abilities' = ''
    'adventurer' = 'gender name profession'
    'profession' = 'name'
    'rank' = 'amount'
    'stamina' = 'amount'
    'gold' = 'amount'
}

# Attributes whose value is a JaFL truth flag. The books write both letters and words.
$script:FL_BOOL_ATTRS = @('force', 'hidden', 'dead', 'not', 'using', 'sail', 'start', 'revisit',
                          'cumulative', 'once', 'permanent', 'supplemental', 'unique', 'visit', 'playerFirst', 'fatal')
$script:FL_BOOL_VALUES = @('t', 'f', 'true', 'false')

# Closed value sets, mirroring the engine's own canonical lists (web/js/rules.js ABILITIES /
# SHIP_TYPES + aliases / CREW_LEVELS / CARGO_TYPES, and state.js's blessing names). A value
# may be a '|'-separated union, and '?'/'*' are JaFL's match-any wildcards.
$script:FL_ENUMS = @{
    'ability'        = 'charisma combat magic sanctity scouting thievery rank stamina defence'
    'abilityDamaged' = 'charisma combat magic sanctity scouting thievery rank stamina defence'
    # choose= is this port's own marker on an open <lose>: it names WHICH possession leaves
    # when the page states the rule instead of leaving it to the player. "f" pins a sweep to
    # the order the page lists (task 231, the three "the items stolen are the ones listed
    # first" pages); "best" pins it to the highest bonus (task 234, section 6.36's "your best
    # armour, your best weapon"). The truth values stay legal - "t" is the explicit spelling
    # of the default, an unmarked open item/cargo forfeit asking the player.
    'choose'         = 't f true false best'
    # A blessing is an opaque named token to the engine, but the set is small and fixed: a
    # misspelling would silently never be granted, tested or spent. storms/storm and
    # poison/disease are the same blessing under two spellings (state.js BLESSING_ALIASES).
    'blessing'       = 'charisma combat magic sanctity scouting thievery defence disease poison injury luck storm storms travel wrath'
    'crew'           = 'poor average good excellent'   # or an integer delta - see below
    'gender'         = 'm f male female'
    # modifier= is an ability-resolution MODE, and every reader of it treats an unknown value
    # as "no modifier at all" - which falls through to the affected score, the very one a
    # `natural` site exists to exclude. A misspelling therefore makes the check EASIER than the
    # page prints it, silently, and that is task 46's defect arriving from the source side
    # (see the note above engine.js setValueMode). The attribute NAME was allowlisted from the
    # start; only the value set was missing, which is how it went unnoticed. (task 300)
    #
    # This row is the set THIS PORT ACTS ON. Task 302 brought it level with the JaFL spec
    # (rules/JaFL-XML-Tags.md, under <if>/<difficulty>/<set>/<adjust>): `noarmour` now has an
    # engine branch - state.js defenceForMode drops the worn armour, the only score in this port
    # armour reaches - and `current` is read on <difficulty> as well as <adjust>. One difference
    # remains, and it is harmless: `affected` is NOT in the spec, it is this port's explicit
    # spelling of the default, and the corpus uses it once.
    # `current` stays tag-restricted below, because it means "the wounded Stamina" and only the
    # two tags that roll or read a stat have somewhere to put it.
    # Task 314 made the OTHER five true on every tag this row allows: <set> honoured only
    # natural/affected and <if>'s ordinary-ability arm only natural, so three `no-` words
    # validated here and were then dropped by the reader - the same silent fall-through to the
    # full score this comment warns about, arriving from the engine side instead. Both now route
    # through state.js abilityForMode, which is the one reader that knows all six.
    'modifier'       = 'affected current natural noarmour notool noweapon'
    'profession'     = 'mage priest rogue troubadour warrior wayfarer'
    'ship'           = 'barque brigantine galleon brig gall galley t'  # 't' = "any ship"
    'special'        = 'armourlock attack defence difficultyCurse difficultyRestore godless lock unlock weaponlock'
}
# The eight tradable commodities. Ports abbreviate them ("grai", "meta", "timb"), which
# canonCargo folds by prefix, so a prefix of exactly one commodity is legal here too.
$script:FL_CARGO = @('grain', 'furs', 'metals', 'minerals', 'spices', 'textiles', 'timber', 'slaves')
# The fight modes a <fight modifiers=> may name. Unlike modifier= above this is a token LIST,
# not an enum, so it gets its own check in Test-AttrValue rather than an FL_ENUMS row. Keep it
# in step with combat.js makeFight, which parses the same tokens. (task 300)
$script:FL_FIGHT_MODIFIERS = @('noarmour')
# ---- The codeword authority (task 325) --------------------------------------------------
# codeword= was allowlisted as an attribute NAME on nine tags and never looked inside, so
# <gain codeword="Anchr"/> against <if codeword="Anchor"> built, rendered and asserted clean
# while the branch it guards simply never opened. Nothing else in the repo can see that: the
# two sites are usually in different files and often different books, and to the engine an
# unknown codeword is indistinguishable from one the player has not earned yet - so the defect
# lands on the player as a section that cannot be completed. The authority to check against is
# books/book<N>/book.ini's Codewords=, the printed list from that volume's inside front cover.
# That is the one key in book.ini worth reading, and the reason task 322's "nothing reads it,
# leave it dead" finding was scoped to Map= alone: this list holds something the filesystem
# cannot answer.
#
# The check is against the UNION of the six lists, not the file's own book. The alphabetical
# rule (book 1's codewords all begin with A, book 2's with B) describes where a codeword is
# EARNED, not where it may be tested: book 1 alone tests Barnacle, Crag, Defend and Eldritch,
# and Almanac reaches all six books. A per-book check would fail 60-odd valid sites.

# Values that are not printed codewords at all, and so appear in no Codewords= list.
#
# 1. Section-scoped bookkeeping flags. The transcription reuses the codeword store as general
#    per-playthrough memory - "2.567.1a", "5/520", "3.318.sold", "5.Aku.leaving" - so a value
#    opening with a number and a '.' or '/' is machinery, and no list could authorise it. The
#    separator is required rather than a bare leading digit so that a fat-fingered flag still
#    fails: book 4 section 345 cleared "4457" where section 457 sets "4.457", which is this
#    check's own first catch and exactly the one-character defect it exists for.
$script:FL_SCOPED_FLAG = '^\d+[./]\S+$'

# 2. The port's own named state flags. They live in the codeword store because it is the one
#    per-playthrough set the engine already persists, but each records engine state no printed
#    codeword ever did: damage carried out of a fight (HydraDamage, SpiderPoison), a counter
#    <adjust name=> reads (CharismaBonus), a standing latch (StillInYellowport). Listed rather
#    than pattern-matched because nothing in their spelling tells them apart from a codeword -
#    which is the point, since a typo among THEM must fail too. Every entry names something the
#    engine reads: the list held a seventeenth, Bogus, purely to keep a no-op
#    <tick>/<lose> pair in book 2 section 633 legal, and task 328 deleted the pair instead.
$script:FL_PORT_FLAGS = @(
    'BladeSeven', 'CharismaBonus', 'GhoulBitten', 'GoddessMirror', 'HydraDamage',
    'LitCandle', 'ScorpionSting', 'SnakeDemonFight', 'SpiderDamage', 'SpiderPoison',
    'StillInYellowport', 'StolenTyrnaiMail', 'UndeadDamage', 'YarimuraProtection',
    'YellowportUprising')

# 3. Codewords printed in books 7-12, which the published six reference forward on purpose:
#    book 5 tests Hill (book 8), book 6 tests Ink and Iota (9) and Kink (11), books 3 and 6
#    test Judas (10). Those volumes have no folder here and so no Codewords= line - the same
#    deliberate leniency as the dangling-link check, which never reports a jump into an
#    unbundled book.
$script:FL_FORWARD_CODEWORDS = @('Hill', 'Ink', 'Iota', 'Judas', 'Kink')

# The tags that GIVE a codeword. Every other carrier of codeword= (if, elseif, lose, adjust)
# only reads it or takes it away, so a codeword seen on those alone is tested and swept but
# reachable by nothing - the shape a missed <gain> leaves behind, and the one the reverse
# report in step 5 exists to find. (task 327)
$script:FL_AWARD_TAGS = @('gain', 'tick', 'set', 'outcome')

# Set per Test-SourceTree run: codeword -> the book that declares it, or 0 for the two
# exemption lists above. $null means the authority could not be read and the value check
# stands down (Test-SourceTree has reported that separately) rather than failing every site.
# SEEN is every site; AWARDED is the FL_AWARD_TAGS subset of it, so "seen but not awarded" is
# a set difference and the two notes in step 5 are one pass apart.
#
# All three are ORDINAL dictionaries and the keys are the codeword's exact spelling, because
# the game is case-SENSITIVE and the gate must be too: `GameState.hasCodeword`/`addCodeword`
# use ordinary object keys and JaFL's `Codewords` uses Java `Properties` keys, so a
# `<gain codeword="anchor">` does not satisfy an `<if codeword="Anchor">` — the branch simply
# never opens, with no diagnostic, which is task 325's failure mode exactly. A plain
# PowerShell `@{}` would defeat this on its own: hashtable keys are case-INSENSITIVE, so
# dropping the ToLowerInvariant() calls without changing the container would have changed
# nothing. Ordinal, not InvariantCulture: a codeword is an identifier, not text to collate.
# (tasks 325 + 338)
$script:FL_CODEWORDS = $null
function New-CodewordSet { [System.Collections.Generic.Dictionary[string, int]]::new([System.StringComparer]::Ordinal) }
$script:FL_CODEWORD_SEEN = New-CodewordSet
$script:FL_CODEWORD_AWARDED = New-CodewordSet

# book.ini is Java Properties, and Codewords= leans on two features of that format: a trailing
# backslash CONTINUES the value onto the next line (all six books wrap it across three or more),
# and \uXXXX is a literal escape (book 5 declares its two accented codewords as \u00c9lan and
# \u00c9lite, which its sections spell as the numeric character references &#201;lan and
# &#201;lite - one codeword each in two notations, so both have to decode before they can be
# compared). Reading only the first line would truncate book 1 to 11 of its 35 codewords and
# fire the new check on two dozen valid ones - the shape that gets a check switched off instead
# of fixed. Deliberately a narrow reader for this one file and this one key: these .ini files
# use no ':' separator, no indented keys and no escaped '='. Returns an empty list when the key
# is absent, which the caller treats as fatal rather than as a clean book.
function Get-IniCodewords([string]$path) {
    $lines = [System.IO.File]::ReadAllLines($path)
    $i = 0
    while ($i -lt $lines.Count) {
        $line = $lines[$i].Trim()
        $i++
        if ($line -eq '' -or $line.StartsWith('#') -or $line.StartsWith('!')) { continue }
        while ($line.EndsWith('\') -and $i -lt $lines.Count) {
            $line = $line.Substring(0, $line.Length - 1) + $lines[$i].Trim()
            $i++
        }
        $eq = $line.IndexOf('=')
        if ($eq -lt 0) { continue }
        if ($line.Substring(0, $eq).Trim() -ne 'Codewords') { continue }
        $value = [regex]::Replace($line.Substring($eq + 1), '\\u([0-9A-Fa-f]{4})',
            { param($m) [string][char][Convert]::ToInt32($m.Groups[1].Value, 16) })
        return @($value -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })
    }
    return @()
}

# The tags that READ an <adjust> child: the three roll nodes (engine.js childAdjustment, via
# walkEffectBody and the roll widgets) plus <gain>/<lose>, whose amount= and stamina= take the
# same conditional modifiers ("subtract your armour from the wound"). Used by the structural
# check on every <adjust> below - see the note there.
$script:FL_ADJUST_READERS = @('random', 'difficulty', 'rankcheck', 'gain', 'lose')

# `type` means something different on each tag that carries it.
$script:FL_TYPE_VALUES = @{
    'effect'      = 'ability aura use wielded'
    'fightdamage' = 'add replace'
    'header'      = 'armour cargo magic other ship ships shipsale weapon'
    'random'      = 'travel'
}

# ---- Element checks --------------------------------------------------------------------
# Parse a bundled fragment as strict XML so a malformed file is caught at build time rather
# than throwing at render time in the browser. Returns $null when valid, or an error string.
# `$expectRoot` (e.g. 'section') also checks the root element. NOTE: use .get_Name() -
# PowerShell's XML type adapter overrides plain .Name to return the `name` ATTRIBUTE.
function Test-XmlDoc([string]$xml, [string]$label, [string]$expectRoot, [string[]]$expectNames) {
    if (-not $xml) { return $null }   # an absent optional file is not an error
    try {
        $doc = New-Object System.Xml.XmlDocument
        $doc.LoadXml($xml)
    } catch {
        return "$label : not well-formed XML - $($_.Exception.Message)"
    }
    if ($expectRoot -and $doc.DocumentElement.get_Name() -ne $expectRoot) {
        return "$label : root is <$($doc.DocumentElement.get_Name())>, expected <$expectRoot>"
    }
    # A section file's <section name> must match its filename key (task 78). A purely
    # numeric file must match exactly; a lettered continuation may use either its full
    # name (448a -> "448a") or its printed parent number (609a -> "609"), so both are
    # passed in $expectNames. `.GetAttribute` is used deliberately - the plain .Name
    # property is overridden by PowerShell's XML adapter to return the `name` attribute.
    if ($expectNames -and $expectNames.Count -gt 0) {
        $actual = $doc.DocumentElement.GetAttribute('name')
        if ($expectNames -notcontains $actual) {
            return "$label : section name=`"$actual`", expected `"$($expectNames -join '" or "')`" (does not match filename)"
        }
    }
    return $null
}

# Parse and return the document, or $null (the caller has already reported the parse error).
function Get-XmlDoc([string]$xml) {
    if (-not $xml) { return $null }
    try {
        $doc = New-Object System.Xml.XmlDocument
        $doc.LoadXml($xml)
        return $doc
    } catch { return $null }
}

# One attribute value against its closed set. Returns $null when acceptable, else the reason.
function Test-AttrValue([string]$tag, [string]$attr, [string]$value) {
    if ($script:FL_BOOL_ATTRS -contains $attr) {
        if ($script:FL_BOOL_VALUES -notcontains $value.Trim().ToLowerInvariant()) {
            return "$attr=`"$value`" is not a truth flag (t/f)"
        }
        return $null
    }
    if ($attr -eq 'type' -and $script:FL_TYPE_VALUES.ContainsKey($tag)) {
        $allowed = $script:FL_TYPE_VALUES[$tag] -split ' '
        if ($allowed -notcontains $value.Trim().ToLowerInvariant()) {
            return "type=`"$value`" is not a <$tag> type ($($script:FL_TYPE_VALUES[$tag]))"
        }
        return $null
    }
    # modifiers= is a whitespace/comma-separated token list of fight modes, so it splits on
    # neither '|' nor nothing: every word must be one combat.js acts on. (task 300)
    if ($attr -eq 'modifiers') {
        foreach ($word in ($value -split '[\s,]+')) {
            $w = $word.Trim().ToLowerInvariant()
            if ($w -eq '') { continue }
            if ($script:FL_FIGHT_MODIFIERS -notcontains $w) {
                return "modifiers=`"$word`" is not a known fight modifier ($($script:FL_FIGHT_MODIFIERS -join ' '))"
            }
        }
        return $null
    }
    # codeword= is checked by VALUE and not only by name, because a misspelling is invisible
    # everywhere else: the engine cannot tell an unknown codeword from one the player has not
    # earned, so the <if> it guards just stays shut. The two exemption shapes above are
    # skipped. $FL_CODEWORDS is $null when the authority could not be read, in which case
    # Test-SourceTree has said so and this stands down rather than failing all 1,207 sites
    # over a missing .ini. (task 325)
    #
    # The split takes BOTH separators, because codeword= is the one attribute that reads two:
    # matchCodewords says "comma => AND, pipe => OR", and the <gain>/<tick>/<lose> handlers
    # split on [|,] alike, so a comma list is a list of NAMES and not a name. Splitting on
    # '|' alone handed the whole string to the lookup and reported correct markup as
    # undeclared - which no shipped section trips, because none writes the AND form, and
    # which is exactly why a gate rejecting valid markup could sit here unread. Every other
    # list-valued attribute here really does split on '|' alone; do not generalise this to
    # them. (task 336)
    if ($attr -eq 'codeword' -and $null -ne $script:FL_CODEWORDS) {
        foreach ($part in ($value -split '[|,]')) {
            $p = $part.Trim()
            if ($p -eq '' -or $p -eq '?' -or $p -eq '*') { continue }
            if ($p -match $script:FL_SCOPED_FLAG) { continue }
            # The EXACT spelling, case included: see the FL_CODEWORDS comment. (task 338)
            if (-not $script:FL_CODEWORDS.ContainsKey($p)) {
                return "codeword=`"$part`" is not declared in any book.ini Codewords= list"
            }
            $script:FL_CODEWORD_SEEN[$p] = 1
            if ($script:FL_AWARD_TAGS -contains $tag) { $script:FL_CODEWORD_AWARDED[$p] = 1 }
        }
        return $null
    }
    if ($attr -eq 'cargo' -or $script:FL_ENUMS.ContainsKey($attr)) {
        foreach ($part in ($value -split '\|')) {
            $p = $part.Trim().ToLowerInvariant()
            if ($p -eq '' -or $p -eq '?' -or $p -eq '*') { continue }   # JaFL match-any wildcards
            if ($attr -eq 'cargo') {
                # canonCargo folds an abbreviation to the one commodity it prefixes.
                if (@($script:FL_CARGO | Where-Object { $_.StartsWith($p) }).Count -ne 1) {
                    return "cargo=`"$part`" is not one of the eight commodities"
                }
                continue
            }
            if ($attr -eq 'crew' -and $p -match '^[+-]?\d+$') { continue }  # a crew-quality delta
            if (($script:FL_ENUMS[$attr] -split ' ') -notcontains $p) {
                return "$attr=`"$part`" is not a known $attr ($($script:FL_ENUMS[$attr]))"
            }
            # The one value in FL_ENUMS whose legality depends on its TAG. `current` means "the
            # WOUNDED Stamina, not the unwounded maximum", so it is only meaningful where a stat
            # is rolled or read: engine.js adjustAmount and engine.js rollDifficulty, i.e.
            # <adjust> and <difficulty>. On <set>/<if> nothing reads it and it would fall
            # through to the default silently - task 300's failure shape. (task 302)
            if ($attr -eq 'modifier' -and $p -eq 'current' -and $tag -notin @('adjust', 'difficulty')) {
                return "modifier=`"$part`" is only read on <adjust> and <difficulty>, not on <$tag>"
            }
        }
    }
    return $null
}

# Walk an element tree against the vocabulary. Appends "<label> : ..." strings to $errors.
function Test-XmlVocabulary($el, [string]$label, [System.Collections.ArrayList]$errors) {
    if ($null -eq $el -or $el.NodeType -ne [System.Xml.XmlNodeType]::Element) { return }
    $tag = $el.get_Name()
    if (-not $script:FL_TAG_ATTRS.ContainsKey($tag)) {
        [void]$errors.Add("$label : unknown tag <$tag>")
        return   # its attributes and children are meaningless without a known tag
    }
    $allowed = $script:FL_TAG_ATTRS[$tag] -split ' '
    foreach ($a in $el.Attributes) {
        $name = $a.get_Name()
        if ($allowed -notcontains $name) {
            [void]$errors.Add("$label : unknown attribute $name= on <$tag>")
            continue
        }
        $bad = Test-AttrValue $tag $name $a.Value
        if ($bad) { [void]$errors.Add("$label : <$tag> $bad") }
    }
    # An <adjust> MODIFIES the node above it - "add 1 if your crew is good", "subtract your
    # armour from the wound" - and is never an effect in its own right: all 558 in books 1-6
    # hang under one of the five readers, and none is bare. Anywhere else nothing reads it, so
    # it is a silent no-op that LOOKS like the tag it names - and its attributes are the
    # modifier's CONDITION, not its target, so reading one as an effect inverts it:
    # <adjust codeword="Eldritch" value="3"/> means "+3 if you know Eldritch", where
    # <tick codeword="Eldritch" amount="3"/> is what raises the counter. engine.js used to
    # answer such a node with applyAdjust, whose branches did exactly that inversion (a crew
    # promotion, task 268; a granted title, a raised Rank, a bumped counter, task 269);
    # deleting them is what makes this the rule rather than a second, weaker reading.
    if ($tag -eq 'adjust') {
        $parent = '(root)'
        if ($el.ParentNode -and $el.ParentNode.NodeType -eq [System.Xml.XmlNodeType]::Element) {
            $parent = $el.ParentNode.get_Name()
        }
        if ($script:FL_ADJUST_READERS -notcontains $parent) {
            [void]$errors.Add(("{0} : <adjust> under <{1}> - an <adjust> modifies the node above it and must be a child of <{2}> (use <gain>/<tick> for an effect that writes to the sheet)" -f $label, $parent, ($script:FL_ADJUST_READERS -join '>/<')))
        }
    }
    foreach ($c in $el.ChildNodes) { Test-XmlVocabulary $c $label $errors }
}

# Every explicit jump target in a document, as "<book>:<section>" keys. `section=` names a
# section in `book=` when given, otherwise in the file's own book; <extrachoice> also arms a
# choice AT another section (atbook/atsection). Non-literal ids are skipped: they are either a
# computed target or a named entry point (Adventurers.xml's section="Andriel").
function Get-ExplicitTargets($el, [int]$ownBook, [System.Collections.ArrayList]$targets) {
    if ($null -eq $el -or $el.NodeType -ne [System.Xml.XmlNodeType]::Element) { return }
    foreach ($pair in @(@('book', 'section'), @('atbook', 'atsection'))) {
        $sec = $el.GetAttribute($pair[1])
        if ($sec -and $sec -match '^\d+[a-z]?$') {
            $bk = $el.GetAttribute($pair[0])
            if (-not $bk) { $bk = "$ownBook" }
            if ($bk -match '^\d+$') { [void]$targets.Add("$bk`:$sec") }
        }
    }
    foreach ($c in $el.ChildNodes) { Get-ExplicitTargets $c $ownBook $targets }
}

# ---- The whole source tree -------------------------------------------------------------
# Validates every file the build is about to bundle and returns @{ Errors; Checked }. Nothing
# is written and nothing is thrown: the caller decides what a failure means (the build aborts,
# the self-test asserts). $bookDirs is the BUNDLED set as number -> source directory, exactly
# as Get-BookRegistry resolved it from books.ini's Published= line (task 209): the build and
# this gate then iterate one set, and a published book whose folder is missing has already
# been reported there rather than skipped here. A link into any OTHER book (the unbundled
# 7-12) is intentional and never reported as dangling.
function Test-SourceTree([string]$rulesDir, [hashtable]$bookDirs) {
    $errors = [System.Collections.ArrayList]::new()
    $notes = [System.Collections.ArrayList]::new()
    $checked = 0
    $bookNumbers = @($bookDirs.Keys | Sort-Object)

    # 0. The codeword authority, read fresh each call so a second run in one session (the
    #    self-test drives dozens) cannot inherit the last tree's list. A book that declares no
    #    Codewords= is an error in its own right AND disarms the value check for every book: the
    #    lists are checked as a union, so an incomplete authority would report valid codewords
    #    from the missing volume as unknown. Failing loudly once beats 1,207 wrong errors, and
    #    beats the other direction - a silently empty set that passes everything. (task 325)
    $script:FL_CODEWORDS = $null
    $script:FL_CODEWORD_SEEN = New-CodewordSet
    $script:FL_CODEWORD_AWARDED = New-CodewordSet
    # Ordinal and exact-cased, so `anchor` is not the declared `Anchor` (task 338). The key IS
    # the declared spelling, which is why the report in step 5 needs no separate casing map.
    $declared = New-CodewordSet
    $authority = $true
    foreach ($b in $bookNumbers) {
        $iniPath = Join-Path $bookDirs[$b] 'book.ini'
        $list = if (Test-Path $iniPath) { @(Get-IniCodewords $iniPath) } else { @() }
        if ($list.Count -eq 0) {
            [void]$errors.Add(("{0}/book.ini : no Codewords= list, so no codeword VALUE can be checked in any book" -f (Split-Path -Leaf $bookDirs[$b])))
            $authority = $false
            continue
        }
        foreach ($c in $list) { $declared[$c] = $b }
    }
    if ($authority) {
        foreach ($c in ($script:FL_PORT_FLAGS + $script:FL_FORWARD_CODEWORDS)) { $declared[$c] = 0 }
        $script:FL_CODEWORDS = $declared
    }

    # 1. Index the section ids each bundled book really contains, so a link can be resolved.
    $known = @{}
    foreach ($b in $bookNumbers) {
        Get-ChildItem -Path $bookDirs[$b] -Filter '*.xml' |
            Where-Object { $_.BaseName -match '^\d+[a-z]?$' } |
            ForEach-Object { $known["$b`:$($_.BaseName)"] = $true }
    }

    # 2. Section files: well-formed, rooted at <section>, name matching the filename, a known
    #    vocabulary, and every explicit link resolving inside a bundled book.
    foreach ($b in $bookNumbers) {
        $dir = $bookDirs[$b]
        # Errors name the folder the author would open, which is the Path= leaf, not "book<N>".
        $dirName = Split-Path -Leaf $dir
        Get-ChildItem -Path $dir -Filter '*.xml' |
            Where-Object { $_.BaseName -match '^\d+[a-z]?$' } |
            ForEach-Object {
                $checked++
                $label = "{0}/{1}" -f $dirName, $_.Name
                $xml = Read-Xml $_.FullName
                # Accepted names: the full filename, and its numeric prefix for a lettered
                # continuation (609a -> "609" or "609a"). (task 78)
                $expectNames = @($_.BaseName, ($_.BaseName -replace '[a-z]+$', '')) | Select-Object -Unique
                $e = Test-XmlDoc $xml $label 'section' $expectNames
                if ($e) { [void]$errors.Add($e); return }
                $doc = Get-XmlDoc $xml
                Test-XmlVocabulary $doc.DocumentElement $label $errors
                $targets = [System.Collections.ArrayList]::new()
                Get-ExplicitTargets $doc.DocumentElement $b $targets
                foreach ($t in ($targets | Select-Object -Unique)) {
                    $tb = ($t -split ':', 2)[0]
                    if ($bookNumbers -notcontains [int]$tb) { continue }  # books 7-12 are deliberate
                    if (-not $known.ContainsKey($t)) {
                        [void]$errors.Add("$label : link to section $t, which book $tb does not contain")
                    }
                }
            }

        # 2b. Any OTHER .xml sitting directly in a book folder that CLAIMS a section id. The
        #     filter above bundles and validates only `^\d+[a-z]?$` basenames, so a working
        #     copy named 501temp.xml was neither bundled nor checked - while opening
        #     <section name="501"> and so reading as section 501 to every by-hand census of
        #     the corpus, which is how one defect got counted twice and another three times
        #     over. 20 such files had accumulated; they live under books/book<N>/temp/ now,
        #     which this non-recursive walk deliberately does not enter. A pregen biography
        #     and New.xml also root at <section>, but name a person or a book title rather
        #     than a section id, so only a NUMERIC name= is a claim worth failing. (task 260)
        Get-ChildItem -Path $dir -Filter '*.xml' |
            Where-Object { $_.BaseName -notmatch '^\d+[a-z]?$' } |
            ForEach-Object {
                $doc = Get-XmlDoc (Read-Xml $_.FullName)
                if ($null -eq $doc -or $doc.DocumentElement.get_Name() -ne 'section') { return }
                $claimed = $doc.DocumentElement.GetAttribute('name')
                if ($claimed -match '^\d+[a-z]?$') {
                    [void]$errors.Add(("{0}/{1} : section name=`"{2}`" is a section id, but the file is not {2}.xml (move a working copy to {0}/temp/)" -f $dirName, $_.Name, $claimed))
                }
            }

        # 3. Adventurers.xml: rooted at <adventurers>, and each pregen's biography readable -
        #    inline prose, or the <FirstName>.xml the build folds its first <p> from. A
        #    malformed/missing bio used to leave the create-character card blank in silence.
        $advPath = Join-Path $dir 'Adventurers.xml'
        if (Test-Path $advPath) {
            $checked++
            $label = "{0}/Adventurers.xml" -f $dirName
            $advXml = Read-Xml $advPath
            $e = Test-XmlDoc $advXml $label 'adventurers'
            if ($e) { [void]$errors.Add($e) }
            else {
                $adoc = Get-XmlDoc $advXml
                Test-XmlVocabulary $adoc.DocumentElement $label $errors
                foreach ($a in $adoc.SelectNodes('//starting/adventurer')) {
                    $name = $a.GetAttribute('name')
                    if ("$($a.InnerText)".Trim()) { continue }   # inline prose (book 5)
                    $first = ($name -split '\s+')[0]
                    $bioPath = Join-Path $dir ($first + '.xml')
                    if (-not (Test-Path $bioPath)) {
                        [void]$errors.Add("$label : pregen `"$name`" has no inline bio and no $first.xml")
                        continue
                    }
                    $checked++
                    $bioLabel = "{0}/{1}.xml" -f $dirName, $first
                    $bioXml = Read-Xml $bioPath
                    $e = Test-XmlDoc $bioXml $bioLabel 'section'
                    if ($e) { [void]$errors.Add($e); continue }
                    $bdoc = Get-XmlDoc $bioXml
                    Test-XmlVocabulary $bdoc.DocumentElement $bioLabel $errors
                    if (-not "$($bdoc.SelectSingleNode('//section/p[1]').InnerText)".Trim()) {
                        [void]$errors.Add("$bioLabel : no biography prose for pregen `"$name`" (needs a first <p>)")
                    }
                }
            }
        }
    }

    # 4. The rules prose bundled into meta.json. Both files are <section> documents.
    foreach ($rf in @('Rules.xml', 'QuickRules.xml')) {
        $rp = Join-Path $rulesDir $rf
        if (-not (Test-Path $rp)) { continue }
        $checked++
        $label = "rules/$rf"
        $xml = Read-Xml $rp
        $e = Test-XmlDoc $xml $label 'section'
        if ($e) { [void]$errors.Add($e); continue }
        Test-XmlVocabulary (Get-XmlDoc $xml).DocumentElement $label $errors
    }

    # 5. The reverse direction, reported as INFORMATION and never as a failure, in two grades.
    #    UNREFERENCED: a codeword the inside front cover lists that no section mentions at all.
    #    The printed books really do list codewords they never use, so this is usually nothing
    #    to fix. NEVER AWARDED: a codeword sections test or sweep but no <gain>/<tick>/<set>/
    #    <outcome> ever gives - the branch exists and nothing can open it, which means the
    #    transcription dropped an award rather than the book printing a spare name. Kept apart
    #    because the remedy differs: the second wants a missing <gain> found, the first wants
    #    nothing. Both stay notes - book 2's two never-awarded codewords are like that in the
    #    printed book as well as here, so this cannot become a failure without editing the
    #    corpus. The transcriber did this pass by eye and wrote the answers into the .ini
    #    comments ("# Unused codewords: Avert" in book 1, "# Unnecessary codewords: Dark" in
    #    book 4, "# Unnecessary codewords: Bait,Beach,Bilge" in book 2); this reproduces them
    #    mechanically, and today it agrees with all three but for Bait, which section 579 hides
    #    behind a no-op <tick>/<lose> pair (task 328). (tasks 325, 327)
    if ($null -ne $script:FL_CODEWORDS) {
        foreach ($b in $bookNumbers) {
            $dirName = Split-Path -Leaf $bookDirs[$b]
            foreach ($k in @($script:FL_CODEWORDS.Keys | Where-Object { $script:FL_CODEWORDS[$_] -eq $b } | Sort-Object)) {
                if (-not $script:FL_CODEWORD_SEEN.ContainsKey($k)) {
                    [void]$notes.Add("$dirName/book.ini : codeword `"$k`" is declared but no section awards or tests it")
                } elseif (-not $script:FL_CODEWORD_AWARDED.ContainsKey($k)) {
                    [void]$notes.Add("$dirName/book.ini : codeword `"$k`" is tested or cleared but no section awards it - a missing <gain>?")
                }
            }
        }
    }

    return @{ Errors = @($errors); Checked = $checked; Notes = @($notes) }
}
