/**
 * Filter rules are an array that contains replace rules.
 *
 * Each rule is an object that contains 'source' and 'target' properties.
 * 'source' property is a string or RegEx object which is replaced by
 * 'target' property value.
 */

export interface FilterRule {
	source: RegExp | string;
	target: string;
}

/**
 * Filter rules to remove YouTube suffixes and prefixes from a text.
 */
export const YOUTUBE_TRACK_FILTER_RULES: FilterRule[] = [
	// Trim whitespaces
	{ source: /^\s+|\s+$/g, target: '' },
	// **NEW**
	{ source: /\*+\s?\S+\s?\*+$/, target: '' },
	// [whatever]
	{ source: /\[[^\]]+\]/, target: '' },
	// (whatever version)
	{ source: /\([^)]*version\)$/i, target: '' },
	// video extensions
	{ source: /\.(avi|wmv|mpg|mpeg|flv)$/i, target: '' },
	// (LYRICs VIDEO)
	{ source: /\(.*lyrics?\s*(video)?\)/i, target: '' },
	// (Official Track Stream)
	{ source: /\((of+icial\s*)?(track\s*)?stream\)/i, target: '' },
	// (official)? (music)? video
	{ source: /\((of+icial\s*)?(music\s*)?video\)/i, target: '' },
	// (official)? (music)? audio
	{ source: /\((of+icial\s*)?(music\s*)?audio\)/i, target: '' },
	// (ALBUM TRACK)
	{ source: /(ALBUM TRACK\s*)?(album track\s*)/i, target: '' },
	// (Cover Art)
	{ source: /(COVER ART\s*)?(Cover Art\s*)/i, target: '' },
	// (official)
	{ source: /\(\s*of+icial\s*\)/i, target: '' },
	// (1999)
	{ source: /\(\s*[0-9]{4}\s*\)/i, target: '' },
	// (HD) / (HQ)
	{ source: /\(\s*(HD|HQ)\s*\)$/, target: '' },
	// HD / HQ
	{ source: /(HD|HQ)\s?$/, target: '' },
	// video clip officiel or video clip official
	{ source: /(vid[\u00E9e]o)?\s?clip\sof+ici[ae]l/i, target: '' },
	// offizielles
	{ source: /of+iziel+es\s*video/i, target: '' },
	// video clip
	{ source: /vid[\u00E9e]o\s?clip/i, target: '' },
	// clip
	{ source: /\sclip/i, target: '' },
	// Full Album
	{ source: /full\s*album/i, target: '' },
	// (live)
	{ source: /\(live.*?\)$/i, target: '' },
	// | something
	{ source: /\|.*$/i, target: '' },
	// Artist - The new "Track title" featuring someone
	{ source: /^(|.*\s)"(.{5,})"(\s.*|)$/, target: '$2' },
	// 'Track title'
	{ source: /^(|.*\s)'(.{5,})'(\s.*|)$/, target: '$2' },
	// (*01/01/1999*)
	{ source: /\(.*[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}.*\)/i, target: '' },
	// Sub Español
	{ source: /sub\s*español/i, target: '' },
	// (Letra/Lyrics)
	{ source: /\s\(Letra\/Lyrics\)/i, target: '' },
	// (Letra)
	{ source: /\s\(Letra\)/i, target: '' },
	// (En vivo)
	{ source: /\s\(En\svivo\)/i, target: '' },
	// Sub Español
	{ source: /sub\s*español/i, target: '' },
];

/**
 * Special filter rules to remove leftoves after filtering text using
 * `YOUTUBE_TRACK_FILTER_RULES` filter rules.
 */
export const TRIM_SYMBOLS_FILTER_RULES: FilterRule[] = [
	// Leftovers after e.g. (official video)
	{ source: /\(+\s*\)+/, target: '' },
	// trim starting white chars and dash
	{ source: /^[/,:;~-\s"]+/, target: '' },
	// trim trailing white chars and dash
	{ source: /[/,:;~-\s"]+$/, target: '' },
	// remove multiple spaces
	{ source: /\s{1,}/, target: ' ' },
];

/**
 * Filter rules to remove "Remastered..."-like strings from a text.
 */
export const REMASTERED_FILTER_RULES: FilterRule[] = [
	// Here Comes The Sun - Remastered
	{ source: /-\sRemastered$/, target: '' },
	// Hey Jude - Remastered 2015
	{ source: /-\sRemastered\s\d+$/, target: '' },
	// Let It Be (Remastered 2009)
	// Red Rain (Remaster 2012)
	{ source: /\(Remaster(ed)?\s\d+\)$/, target: '' },
	// Pigs On The Wing (Part One) [2011 - Remaster]
	{ source: /\[\d+\s-\sRemaster\]$/, target: '' },
	// Comfortably Numb (2011 - Remaster)
	// Dancing Days (2012 Remaster)
	{ source: /\(\d+(\s-)?\sRemaster\)$/, target: '' },
	// Outside The Wall - 2011 - Remaster
	// China Grove - 2006 Remaster
	{ source: /-\s\d+(\s-)?\sRemaster$/, target: '' },
	// Learning To Fly - 2001 Digital Remaster
	{ source: /-\s\d+\s.+?\sRemaster$/, target: '' },
	// Your Possible Pasts - 2011 Remastered Version
	{ source: /-\s\d+\sRemastered Version$/, target: '' },
	// Roll Over Beethoven (Live / Remastered)
	{ source: /\(Live\s\/\sRemastered\)$/i, target: '' },
	// Ticket To Ride - Live / Remastered
	{ source: /-\sLive\s\/\sRemastered$/, target: '' },
	// Mothership (Remastered)
	// How The West Was Won [Remastered]
	{ source: /[([]Remastered[)\]]$/, target: '' },
	// A Well Respected Man (2014 Remastered Version)
	// A Well Respected Man [2014 Remastered Version]
	{ source: /[([]\d{4} Re[Mm]astered Version[)\]]$/, target: '' },
	// She Was Hot (2009 Re-Mastered Digital Version)
	// She Was Hot (2009 Remastered Digital Version)
	{ source: /[([]\d{4} Re-?[Mm]astered Digital Version[)\]]$/, target: '' },
];

export const LIVE_FILTER_RULES: FilterRule[] = [
	// Track - Live
	{ source: /-\sLive?$/, target: '' },
	// Track - Live at
	{ source: /-\sLive\s.+?$/, target: '' },
];

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

export const NORMALIZE_FEATURE_FILTER_RULES = [
	// [Feat. Artist] or (Feat. Artist) -> Feat. Artist
	{ source: /\s[([](feat. .+)[)\]]/i, target: ' $1' },
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
	// 6 Foot 7 Foot (Explicit Version)
	{ source: /[([]Explicit Version[)\]]/i, target: '' },
];

export const SUFFIX_FILTER_RULES: FilterRule[] = [
	// "- X Remix" -> "(X Remix)" and similar
	{
		source: /-\s(.+?)\s((Re)?mix|edit|dub|mix|vip|version)$/i,
		target: '($1 $2)',
	},
	{ source: /-\s(Remix|VIP)$/i, target: '($1)' },
	// Remove "- Original" suffix
	{ source: /-\sOriginal$/i, target: '' },
];
