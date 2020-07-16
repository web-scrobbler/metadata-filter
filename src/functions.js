import {
	CLEAN_EXPLICIT_FILTER_RULES,
	FEATURE_FILTER_RULES,
	LIVE_FILTER_RULES,
	NORMALIZE_FEATURE_FILTER_RULES,
	REMASTERED_FILTER_RULES,
	SUFFIX_FILTER_RULES,
	VERSION_FILTER_RULES,
	YOUTUBE_TRACK_FILTER_RULES,
} from './rules';

const escapeHtmlEntityMap = {
	'&': /&amp;/g,
	'<': /&lt;/g,
	'>': /&gt;/g,
	'"': /&quot;/g,
};

/* Filter functions */

/**
 * Generate Album Artist from Artist when "feat. Artist B" is present.
 *
 * @param {String} text String to be filtered
 *
 * @return {String} Transformed string
 */
export function albumArtistFromArtist(text) {
	if (text.includes(' feat. ')) {
		return text.split(' feat. ')[0];
	}
	return text;
}

/**
 * Decode HTML entities in given text string.
 *
 * @param {String} text String with HTML entities
 *
 * @return {String} Decoded string
 */
export function decodeHtmlEntities(text) {
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
 * @param {String} text String to be filtered
 * @param {Object} set Array of replace rules
 *
 * @return {String} Filtered string
 */
export function filterWithFilterRules(text, set) {
	let filteredText = text;

	for (const data of set) {
		filteredText = filteredText.replace(data.source, data.target);
	}

	return filteredText;
}

/**
 * Replace "Title - X Remix" suffix with "Title (X Remix) and similar".
 *
 * @param {String} text String to be filtered
 *
 * @return {String} Filtered string
 */
export function fixTrackSuffix(text) {
	return filterWithFilterRules(text, SUFFIX_FILTER_RULES);
}

/**
 * Generate normalized "feat. Artist B" text from [feat. Artist B] style.
 * @param {String} text String to be filtered
 * @return {String} Transformed string
 */
export function normalizeFeature(text) {
	return filterWithFilterRules(text, NORMALIZE_FEATURE_FILTER_RULES);
}

/**
 * Remove zero-width characters from given string.
 *
 * @param {String} text String to be filtered
 *
 * @return {String} Filtered string
 */
export function removeZeroWidth(text) {
	return text.replace(/[\u200B-\u200D\uFEFF]/g, '');
}

/**
 * Replace non-breaking space symbol with space symbol.
 *
 * @param {String} text String to be filtered
 *
 * @return {String}	Filtered string
 */
export function replaceNbsp(text) {
	return text.replace('\u00a0', '\u0020');
}

/**
 * Remove "Explicit" and "Clean"-like strings from the text.
 *
 * @param {String} text String to be filtered
 *
 * @return {String} Filtered string
 */
export function removeCleanExplicit(text) {
	return filterWithFilterRules(text, CLEAN_EXPLICIT_FILTER_RULES);
}

/**
 * Remove "Live..."-like strings from the text.
 *
 * @param {String} text String to be filtered
 *
 * @return {String} Filtered string
 */
export function removeLive(text) {
	return filterWithFilterRules(text, LIVE_FILTER_RULES);
}

/**
 * Remove "Remastered..."-like strings from the text.
 *
 * @param {String} text String to be filtered
 *
 * @return {String} Filtered string
 */
export function removeRemastered(text) {
	return filterWithFilterRules(text, REMASTERED_FILTER_RULES);
}

/**
 * Remove "(Single|Album|Mono version}"-like strings from the text.
 *
 * @param {String} text String to be filtered
 *
 * @return {String} Filtered string
 */
export function removeVersion(text) {
	return filterWithFilterRules(text, VERSION_FILTER_RULES);
}

/**
 * Remove "feat"-like strings from the text.
 *
 * @param {String} text String to be filtered
 *
 * @return {String} Filtered string
 */
export function removeFeature(text) {
	return filterWithFilterRules(text, FEATURE_FILTER_RULES);
}

/**
 * Trim a given string.
 *
 * @param {String} text String to be trimmed
 *
 * @return {String}	Trimmed string
 */
/* istanbul ignore next */
export function trim(text) {
	return text.trim();
}

/**
 * Remove Youtube-related garbage from the text.
 *
 * @param {String} text String to be filtered
 *
 * @return {String} Filtered string
 */
export function youtube(text) {
	return filterWithFilterRules(text, YOUTUBE_TRACK_FILTER_RULES);
}
