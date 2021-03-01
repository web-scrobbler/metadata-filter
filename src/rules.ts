/**
 * Filter rules are an array that contains replacement rules.
 */

/**
 * An object containing a replacement rule for the `filterWithFilterRules`
 * function.
 */
export interface FilterRule {
	/**
	 * String or pattern to replace.
	 */
	source: RegExp | string;

	/**
	 * Replacement string.
	 */
	target: string;
}

export const CLEAN_EXPLICIT_FILTER_RULES: FilterRule[] = [
	// (Explicit) or [Explicit]
	{ source: /\s[([]Explicit[)\]]/i, target: '' },
	// (Clean) or [Clean]
	{ source: /\s[([]Clean[)\]]/i, target: '' },
];

export const FEATURE_FILTER_RULES: FilterRule[] = [
	// [Feat. Artist] or (Feat. Artist)
	{ source: /\s[([]feat. .+[)\]]/i, target: '' },
];

export const LIVE_FILTER_RULES: FilterRule[] = [
	// Track - Live
	// Track - Live at
	{ source: /-\sLive(\s.+)?$/, target: '' },
	// Track (Live)
	{ source: /[([]Live[)\]]$/, target: '' },
];

export const NORMALIZE_FEATURE_FILTER_RULES = [
	// [Feat. Artist] or (Feat. Artist) -> Feat. Artist
	{ source: /\s[([](feat. .+)[)\]]/i, target: ' $1' },
];

export const PARODY_FILTER_RULES: FilterRule[] = [
	// Party In the CIA (Parody of "Party In The U.S.A." by Miley Cyrus)
	{ source: /\s\(Parody of ".*" by .*\)$/, target: '' },
	// White & Nerdy (Parody of "Ridin'" by Chamillionaire feat. Krayzie Bone)
	{ source: /\s\(Parody of ".*" by .* feat\. .*\)$/, target: '' },
	// The Saga Begins (Lyrical Adaption of "American Pie")
	{ source: /\s\(Lyrical Adaption of ".*"\)$/, target: '' },
];

export const REISSUE_FILTER_RULES: FilterRule[] = [
	// Album Title Re-issue
	{ source: /\sRe-?issue$/i, target: '' },
	// Album Title [Whatever Re-issue Whatever]
	{ source: /\s\[.*?Re-?issue.*?\]/i, target: '' },
	// Album Title (Whatever Re-issue Whatever)
	{ source: /\s\(.*?Re-?issue.*?\)/i, target: '' },
];

/**
 * Filter rules to remove "Remastered..."-like strings from a text.
 */
export const REMASTERED_FILTER_RULES: FilterRule[] = [
	// Ticket To Ride - Live / Remastered
	{ source: /Live\s\/\sRemastered/, target: 'Live' },
	// Mothership (Remastered)
	// Let It Be (Remastered 2009)
	// How The West Was Won [Remastered]
	// Ride the Lightning (Deluxe Remaster)
	// ...And Justice For All (Remastered Deluxe Box Set)
	{ source: /[([].*Re-?[Mm]aster(ed)?.*[)\]]$/, target: '' },
	// Outside The Wall - 2011 - Remaster
	// China Grove - 2006 Remaster
	// Easy Living - 2003 Remastered
	// Learning To Fly - 2001 Digital Remaster
	// Red Right Hand - 2011 Remastered Version
	{ source: /-\s\d{4}(\s-)?\s.*Re-?[Mm]aster(ed)?.*$/, target: '' },
	// Here Comes The Sun - Remastered
	// 1979 - Remastered 2012
	// 1979 - Remastered Version
	{ source: /-\sRe-?[Mm]aster(ed)?.*$/, target: '' },
	// Wish You Were Here [Remastered] (Remastered Version)
	{ source: /\[Remastered\]\s\(Remastered\sVersion\)$/, target: '' },
];

export const SUFFIX_FILTER_RULES: FilterRule[] = [
	// "- X Remix" -> "(X Remix)" and similar
	{
		source: /-\s(.+?)\s((Re)?mix|edit|dub|mix|vip|version)$/i,
		target: '($1 $2)',
	},
	{ source: /-\s(Remix|VIP|Instrumental)$/i, target: '($1)' },
	// Remove "- Original" suffix
	{ source: /-\sOriginal$/i, target: '' },
];

/**
 * Special filter rules to remove leftoves after filtering text using
 * `YOUTUBE_TRACK_FILTER_RULES` filter rules.
 */
export const TRIM_SYMBOLS_FILTER_RULES: FilterRule[] = [
	// Leftovers after e.g. (official video)
	{ source: /\(+\s*\)+/, target: '' },
	// trim starting white chars and dash
	{ source: /^[/,:;~\s"-]+/, target: '' },
	// trim trailing white chars and dash
	{ source: /[/,:;~\s"-]+$/, target: '' },
	// remove multiple spaces
	{ source: /\s{1,}/, target: ' ' },
];

/**
 * Filter rules to remove "(Album|Stereo|Mono Version)"-like strings
 * from a text.
 */
export const VERSION_FILTER_RULES: FilterRule[] = [
	// Love Will Come To You (Album Version)
	{ source: /[([]Album Version[)\]]$/, target: '' },
	// I Melt With You (Rerecorded)
	// When I Need You [Re-Recorded]
	{ source: /[([]Re-?recorded[)\]]$/, target: '' },
	// Your Cheatin' Heart (Single Version)
	{ source: /[([]Single Version[)\]]$/, target: '' },
	// All Over Now (Edit)
	{ source: /[([]Edit[)\]]$/, target: '' },
	// (I Can't Get No) Satisfaction - Mono Version
	{ source: /-\sMono Version$/, target: '' },
	// Ruby Tuesday - Stereo Version
	{ source: /-\sStereo Version$/, target: '' },
	// Pure McCartney (Deluxe Edition)
	{ source: /\(Deluxe Edition\)$/, target: '' },
	// Ace of Spades (Expanded Edition)
	// Overkill (Expanded Bonus Track Edition)
	// On Parole (Expanded and Remastered)
	{ source: /[([]Expanded.*[)\]]$/, target: '' },
	// Sound of White Noise - Expanded Edition
	{ source: /-\sExpanded Edition$/, target: '' },
	// 6 Foot 7 Foot (Explicit Version)
	{ source: /[([]Explicit Version[)\]]/i, target: '' },
	// No Remorse (Bonus Track Edition)
	{ source: /[([]Bonus Track Edition[)\]]/i, target: '' },
	// Peace Sells...But Who's Buying (25th Anniversary)
	// Persistence of Time (30th Anniversary Remaster)
	{ source: /[([]\d+th\sAnniversary.*[)\]]/i, target: '' },
];

/**
 * Filter rules to remove YouTube suffixes and prefixes from a text.
 */
export const YOUTUBE_TRACK_FILTER_RULES: FilterRule[] = [
	// Trim whitespaces
	{ source: /^\s+|\s+$/g, target: '' },
	// **NEW**
	{ source: /\*+\s?\S+\s?\*+$/, target: '' },
	// [Whatever]
	{ source: /\[[^\]]+\]/, target: '' },
	// (Whatever Version)
	{ source: /\([^)]*version\)$/i, target: '' },
	// Video extensions
	{ source: /\.(avi|wmv|mpg|mpeg|flv)$/i, target: '' },
	// (Lyrics Video)
	{ source: /\(.*lyrics?\s*(video)?\)/i, target: '' },
	// ((Official)? (Track)? Stream)
	{ source: /\((of+icial\s*)?(track\s*)?stream\)/i, target: '' },
	// ((Official)? (Music)? Video|Audio)
	{ source: /\((of+icial\s*)?(music\s*)?(video|audio)\)/i, target: '' },
	// - (Official)? (Music)? Video|Audio
	{ source: /-\s(of+icial\s*)?(music\s*)?(video|audio)$/i, target: '' },
	// ((Whatever)? Album Track)
	{ source: /\(.*Album\sTrack\)/i, target: '' },
	// (Official)
	{ source: /\(\s*of+icial\s*\)/i, target: '' },
	// (1999)
	{ source: /\(\s*[0-9]{4}\s*\)/i, target: '' },
	// (HD) / (HQ)
	{ source: /\(\s*(HD|HQ)\s*\)$/, target: '' },
	// HD / HQ
	{ source: /(HD|HQ)\s?$/, target: '' },
	// Video Clip Officiel / Video Clip Official
	{ source: /(vid[\u00E9e]o)?\s?clip\sof+ici[ae]l/i, target: '' },
	// Offizielles
	{ source: /of+iziel+es\s*video/i, target: '' },
	// Video Clip
	{ source: /vid[\u00E9e]o\s?clip/i, target: '' },
	// Clip
	{ source: /\sclip/i, target: '' },
	// Full Album
	{ source: /full\s*album/i, target: '' },
	// (Live)
	{ source: /\(live.*?\)$/i, target: '' },
	// | Something
	{ source: /\|.*$/i, target: '' },
	// Artist - The new "Track title" featuring someone
	{ source: /^(|.*\s)"(.{5,})"(\s.*|)$/, target: '$2' },
	// 'Track title'
	{ source: /^(|.*\s)'(.{5,})'(\s.*|)$/, target: '$2' },
	// (*01/01/1999*)
	{ source: /\(.*[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}.*\)/i, target: '' },
	// Sub Español
	{ source: /sub\s*español/i, target: '' },
	// (Letra)
	{ source: /\s\(Letra\)/i, target: '' },
	// (En vivo)
	{ source: /\s\(En\svivo\)/i, target: '' },
	// Sub Español
	{ source: /sub\s*español/i, target: '' },
];

/**
 * Replace text in the given string according to given filter rules.
 *
 * @param text String to be filtered
 * @param filterRules Array of filter rules
 *
 * @return Filtered string
 */
export function filterWithFilterRules(
	text: string,
	filterRules: FilterRule[]
): string {
	return filterRules.reduce((text, filterRule) => {
		const { source, target } = filterRule;

		return text.replace(source, target);
	}, text);
}
