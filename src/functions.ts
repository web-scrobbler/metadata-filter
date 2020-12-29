import {
	CLEAN_EXPLICIT_FILTER_RULES,
	FEATURE_FILTER_RULES,
	LIVE_FILTER_RULES,
	NORMALIZE_FEATURE_FILTER_RULES,
	REMASTERED_FILTER_RULES,
	SUFFIX_FILTER_RULES,
	TRIM_SYMBOLS_FILTER_RULES,
	VERSION_FILTER_RULES,
	YOUTUBE_TRACK_FILTER_RULES,
	FilterRule,
} from './rules';

const escapeHtmlEntityMap: Record<string, RegExp> = {
	'&': /&amp;/g,
	'<': /&lt;/g,
	'>': /&gt;/g,
	'"': /&quot;/g,
};

export type FilterFunction = (text: string) => string;

/**
 * Generate Album Artist from Artist when "feat. Artist B" is present.
 *
 * @param text String to be filtered
 *
 * @return Transformed string
 */
export function albumArtistFromArtist(text: string): string {
	if (text.includes(' feat. ')) {
		return text.split(' feat. ')[0];
	}
	return text;
}

/**
 * Decode HTML entities in given text string.
 *
 * @param text String with HTML entities
 *
 * @return Decoded string
 */
export function decodeHtmlEntities(text: string): string {
	let filteredText = text;

	for (const target in escapeHtmlEntityMap) {
		const source = escapeHtmlEntityMap[target];
		filteredText = filteredText.replace(source, target);
	}

	filteredText = filteredText.replace(/&#x([a-fA-f0-9]+);/g, (_, hex) => {
		const dec = parseInt(hex, 16);
		return String.fromCharCode(dec);
	});
	filteredText = filteredText.replace(/&#(\d+);/g, (_, dec) => {
		return String.fromCharCode(dec);
	});

	return filteredText;
}

/**
 * Replace text according to given filter rules.
 *
 * @param text String to be filtered
 * @param filterRules Array of replace rules
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

/**
 * Replace "Title - X Remix" suffix with "Title (X Remix) and similar".
 *
 * @param text String to be filtered
 *
 * @return Filtered string
 */
export function fixTrackSuffix(text: string): string {
	return filterWithFilterRules(text, SUFFIX_FILTER_RULES);
}

/**
 * Generate normalized "feat. Artist B" text from [feat. Artist B] style.
 *
 * @param text String to be filtered
 *
 * @return Transformed string
 */
export function normalizeFeature(text: string): string {
	return filterWithFilterRules(text, NORMALIZE_FEATURE_FILTER_RULES);
}

/**
 * Remove zero-width characters from given string.
 *
 * @param text String to be filtered
 *
 * @return Filtered string
 */
export function removeZeroWidth(text: string): string {
	return text.replace(/[\u200B-\u200D\uFEFF]/g, '');
}

/**
 * Replace all non-breaking space symbols with a space symbol.
 *
 * @param text String to be filtered
 *
 * @return Filtered string
 */
export function replaceNbsp(text: string): string {
	return text.replace(/\u00a0/g, '\u0020');
}

/**
 * Remove "Explicit" and "Clean"-like strings from the text.
 *
 * @param text String to be filtered
 *
 * @return Filtered string
 */
export function removeCleanExplicit(text: string): string {
	return filterWithFilterRules(text, CLEAN_EXPLICIT_FILTER_RULES);
}

/**
 * Remove "Live..."-like strings from the text.
 *
 * @param text String to be filtered
 *
 * @return Filtered string
 */
export function removeLive(text: string): string {
	return filterWithFilterRules(text, LIVE_FILTER_RULES);
}

/**
 * Remove "Remastered..."-like strings from the text.
 *
 * @param text String to be filtered
 *
 * @return Filtered string
 */
export function removeRemastered(text: string): string {
	return filterWithFilterRules(text, REMASTERED_FILTER_RULES);
}

/**
 * Remove "(Single|Album|Mono version}"-like strings from the text.
 *
 * @param text String to be filtered
 *
 * @return Filtered string
 */
export function removeVersion(text: string): string {
	return filterWithFilterRules(text, VERSION_FILTER_RULES);
}

/**
 * Remove "feat"-like strings from the text.
 *
 * @param text String to be filtered
 *
 * @return Filtered string
 */
export function removeFeature(text: string): string {
	return filterWithFilterRules(text, FEATURE_FILTER_RULES);
}

/**
 * Remove Youtube-related garbage from the text.
 *
 * @param text String to be filtered
 *
 * @return Filtered string
 */
export function youtube(text: string): string {
	return filterWithFilterRules(text, [
		...YOUTUBE_TRACK_FILTER_RULES,
		...TRIM_SYMBOLS_FILTER_RULES,
	]);
}
