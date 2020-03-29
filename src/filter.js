'use strict';

const escapeHtmlEntityMap = {
	'&': /&amp;/g,
	'<': /&lt;/g,
	'>': /&gt;/g,
	'"': /&quot;/g,
};

const allField = 'all';

/**
 * Base filter object that filters metadata fields by given filter set.
 * A filter set is an object containing 'artist', 'track', 'album', 'albumArtist', or 'all'
 * properties. Each property can be defined either as a filter function or as
 * an array of filter functions. The 'artist', 'track', 'album', and 'albumArtist' properties
 * are used to define functions to filter artist, track, album, and album artist metadata
 * fields respectively. The 'all' property can be used to define common filter
 * functions for all metadata fields.
 *
 * Filter function is a function which takes non-null string argument
 * and returns modified string.
 */
class MetadataFilter {
	/**
	 * @constructor
     * @param {Object} filterSet Set of filters
     */
	constructor(filterSet) {
		if (!filterSet) {
			throw new Error('No filter set is specified!');
		}

		this.mergedFilterSet = {};
		this.appendFilters(filterSet);
	}

	/**
	 * Filter field using filters for given field.
	 * @param  {String} field Metadata field
	 * @param  {String} text String to be filtered
	 * @return {String} Filtered string
	 */
	filterField(field, text) {
		return this.filterText(text, this.mergedFilterSet[field]);
	}

	/**
	 * Append a new filter set.
	 * @param  {Object} filterSet Set of filters
	 * @return {MetadataFilter} Current instance
	 */
	append(filterSet) {
		this.appendFilters(filterSet);
		return this;
	}

	/**
	 * Extend the filter by a filter set from a given filter.
	 * @param  {Object} filter Filter object
	 * @return {MetadataFilter} Current instance
	 */
	extend(filter) {
		this.appendFilters(filter.mergedFilterSet);
		return this;
	}

	/**
	 * Return a list of supported fields.
	 */
	static get ALL_FIELDS() {
		return ['artist', 'track', 'album', 'albumArtist'];
	}

	/**
	 * Internal.
	 */

	/**
	 * Filter text using given filters.
	 * @param  {String} text String to be filtered
	 * @param  {Array} filters Array of filter functions
	 * @return {String} Filtered string
	 */
	filterText(text, filters) {
		if (!text) {
			return text;
		}

		let filteredText = text;
		for (const filter of filters) {
			filteredText = filter(filteredText);
		}

		return filteredText;
	}

	/**
	 * Convert given filters into array of filters.
	 * @param  {Object} filters Array of filter functions or filter function
	 * @return {Array} Array of filter funcions
	 */
	createFilters(filters) {
		if (Array.isArray(filters)) {
			for (const filterFn of filters) {
				MetadataFilter.assertFilterFunctionIsValid(filterFn);
			}
			return filters;
		}

		const filterFn = filters;
		MetadataFilter.assertFilterFunctionIsValid(filterFn);

		return [filterFn];
	}

	/**
	 * Add given filters to current ones.
     * @param {Object} filterSet Set of filters
	 */
	appendFilters(filterSet) {
		for (const field in filterSet) {
			if (field === allField) {
				continue;
			}

			if (!MetadataFilter.ALL_FIELDS.includes(field)) {
				throw new Error(`Invalid filter field: ${field}`);
			}
		}

		for (const field of MetadataFilter.ALL_FIELDS) {
			if (this.mergedFilterSet[field] === undefined) {
				this.mergedFilterSet[field] = [];
			}

			if (filterSet[field]) {
				this.mergedFilterSet[field] = this.mergedFilterSet[field]
					.concat(this.createFilters(filterSet[field]));
			}

			if (filterSet[allField]) {
				this.mergedFilterSet[field] = this.mergedFilterSet[field]
					.concat(this.createFilters(filterSet[allField]));
			}
		}
	}

	static assertFilterFunctionIsValid(fn) {
		if (typeof fn !== 'function') {
			throw new Error(`Invalid filter function: expected 'function', got '${typeof fn}'`);
		}
	}

	/**
	 * Predefined filter functions.
	 */

	/**
	 * Trim given string.
	 * @param  {String} text String to be trimmed
	 * @return {String}	Trimmed string
	 */
	static trim(text) {
		return text.trim();
	}

	/**
	 * Replace non-breaking space symbol with space symbol.
	 * @param  {String} text String to be filtered
	 * @return {String}	Filtered string
	 */
	static replaceNbsp(text) {
		return text.replace('\u00a0', '\u0020');
	}

	/**
	 * Remove zero-width characters from given string.
	 * @param  {String} text String to be filtered
	 * @return {String} Filtered string
	 */
	static removeZeroWidth(text) {
		return text.replace(/[\u200B-\u200D\uFEFF]/g, '');
	}

	/**
	 * Decode HTML entities in given text string.
	 * @param  {String} text String with HTML entities
	 * @return {String} Decoded string
	 */
	static decodeHtmlEntities(text) {
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
	 * Remove Youtube-related garbage from the text.
	 * @param  {String} text String to be filtered
	 * @return {String} Filtered string
	 */
	static youtube(text) {
		return MetadataFilter.filterWithFilterRules(
			text, MetadataFilter.YOUTUBE_TRACK_FILTER_RULES
		);
	}

	/**
	 * Remove "Remastered..."-like strings from the text.
	 * @param  {String} text String to be filtered
	 * @return {String} Filtered string
	 */
	static removeRemastered(text) {
		return MetadataFilter.filterWithFilterRules(
			text, MetadataFilter.REMASTERED_FILTER_RULES
		);
	}

	/**
	 * Remove "(Single|Album|Mono version}"-like strings from the text.
	 * @param  {String} text String to be filtered
	 * @return {String} Filtered string
	 */
	static removeVersion(text) {
		return MetadataFilter.filterWithFilterRules(
			text, MetadataFilter.VERSION_FILTER_RULES
		);
	}

	/**
	 * Remove "Live..."-like strings from the text.
	 * @param  {String} text String to be filtered
	 * @return {String} Filtered string
	 */
	static removeLive(text) {
		return MetadataFilter.filterWithFilterRules(
			text, MetadataFilter.LIVE_FILTER_RULES
		);
	}

	/**
	 * Remove "Explicit" and "Clean"-like strings from the text.
	 * @param  {String} text String to be filtered
	 * @return {String} Filtered string
	 */
	static removeCleanExplicit(text) {
		return MetadataFilter.filterWithFilterRules(
			text, MetadataFilter.CLEAN_EXPLICIT_FILTER_RULES
		);
	}

	/**
	 * Generates Album Artist from Artist when "feat. Artist B" is present
	 * @param  {String} text String to be filtered
	 * @return {String} Transformed string
	 */
	static albumArtistFromArtist(text) {
		if (text.includes(' feat. ')) {
			return text.split(' feat. ')[0];
		}
		return text;
	}

	/**
	 * Generates normalized "feat. Artist B" text from [feat. Artist B] style
	 * @param  {String} text String to be filtered
	 * @return {String} Transformed string
	 */
	static normalizeFeature(text) {
		return MetadataFilter.filterWithFilterRules(
			text, MetadataFilter.NORMALIZE_FEATURE_FILTER_RULES
		);
	}

	/**
	 * Remove "feat"-like strings from the text.
	 * @param  {String} text String to be filtered
	 * @return {String} Filtered string
	 */
	static removeFeature(text) {
		return MetadataFilter.filterWithFilterRules(
			text, MetadataFilter.FEATURE_FILTER_RULES
		);
	}

	/**
	 * Replace "Title - X Remix" suffix with "Title (X Remix) and similar".
	 * @param  {String} text String to be filtered
	 * @return {String} Filtered string
	 */
	static fixTrackSuffix(text) {
		return MetadataFilter.filterWithFilterRules(
			text, MetadataFilter.SUFFIX_FILTER_RULES
		);
	}

	/**
	 * Replace text according to given filter rules.
	 * @param  {String} text String to be filtered
	 * @param  {Object} set  Array of replace rules
	 * @return {String} Filtered string
	 */
	static filterWithFilterRules(text, set) {
		let filteredText = text;

		for (const data of set) {
			filteredText = filteredText.replace(data.source, data.target);
		}

		return filteredText;
	}

	/**
	 * Filter rules are an array that contains replace rules.
	 *
	 * Each rule is an object that contains 'source' and 'target' properties.
	 * 'source' property is a string or RegEx object which is replaced by
	 * 'target' property value.
	 */

	/**
	 * Filter rules to remove YouTube suffixes and prefixes from a text.
	 * @type {Array}
	 */
	static get YOUTUBE_TRACK_FILTER_RULES() {
		return [
			// Trim whitespaces
			{ source: /^\s+|\s+$/g, target: '' },
			// **NEW**
			{ source: /\*+\s?\S+\s?\*+$/, target: '' },
			// [whatever]
			{ source: /\[[^\]]+\]$/, target: '' },
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
			// HD (HQ)
			{ source: /(HD|HQ)\s*$/, target: '' },
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
			// live
			{ source: /\s+live.*?$/i, target: '' },
			// (live)
			{ source: /\(live.*?\)$/i, target: '' },
			// | something
			{ source: /\|.*$/i, target: '' },
			// Leftovers after e.g. (official video)
			{ source: /\(+\s*\)+/, target: '' },
			// Artist - The new "Track title" featuring someone
			{ source: /^(|.*\s)"(.{5,})"(\s.*|)$/, target: '$2' },
			// 'Track title'
			{ source: /^(|.*\s)'(.{5,})'(\s.*|)$/, target: '$2' },
			// (*01/01/1999*)
			{ source: /\(.*[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}.*\)/i, target: '' },

			// trim starting white chars and dash
			{ source: /^[/,:;~-\s"]+/, target: '' },
			// trim trailing white chars and dash
			{ source: /[/,:;~-\s"!]+$/, target: '' },
		];
	}

	/**
	 * Filter rules to remove "Remastered..."-like strings from a text.
	 *
	 * @type {Array}
	 */
	static get REMASTERED_FILTER_RULES() {
		return [
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
			{ source: /-\s\d+\s-\sRemaster$/, target: '' },
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
	}

	static get LIVE_FILTER_RULES() {
		return [
			// Track - Live
			{ source: /-\sLive?$/, target: '' },
			// Track - Live at
			{ source: /-\sLive\s.+?$/, target: '' },
		];
	}

	static get CLEAN_EXPLICIT_FILTER_RULES() {
		return [
			// (Explicit) or [Explicit]
			{ source: /\s[([]Explicit[)\]]/i, target: '' },
			// (Clean) or [Clean]
			{ source: /\s[([]Clean[)\]]/i, target: '' },
		];
	}

	static get FEATURE_FILTER_RULES() {
		return [
			// [Feat. Artist] or (Feat. Artist)
			{ source: /\s[([]feat. .+[)\]]/i, target: '' },
		];
	}

	static get NORMALIZE_FEATURE_FILTER_RULES() {
		return [
			// [Feat. Artist] or (Feat. Artist) -> Feat. Artist
			{ source: /\s[([](feat. .+)[)\]]/i, target: ' $1' },
		];
	}

	/**
	 * Filter rules to remove "(Album|Stereo|Mono Version)"-like strings
	 * from a text.
	 *
	 * @type {Array}
	 */
	static get VERSION_FILTER_RULES() {
		return [
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
	}

	static get SUFFIX_FILTER_RULES() {
		return [
			// "- X Remix" -> "(X Remix)" and similar
			{ source: /-\s(.+?)\s((Re)?mix|edit|dub|mix|vip|version)$/i, target: '($1 $2)' },
			{ source: /-\s(Remix|VIP)$/i, target: '($1)' },
		];
	}

	/**
	 * Predefined filters.
	 */

	/**
	 * Get a filter that performs a basic cleanup (trim and replace NBSPs).
	 * @return {MetadataFilter} Filter object
	 */
	/* istanbul ignore next */
	static getDefaultFilter() {
		return new MetadataFilter({
			all: [MetadataFilter.trim, MetadataFilter.replaceNbsp],
		});
	}

	/**
	 * Get a filter with YouTube-related filter functions.
	 * @return {MetadataFilter} Filter object
	 */
	/* istanbul ignore next */
	static getYoutubeFilter() {
		return new MetadataFilter({
			track: MetadataFilter.youtube
		});
	}

	/**
	 * Get a filter that removes "Remastered"-like suffixes.
	 * @return {MetadataFilter} Filter object
	 */
	/* istanbul ignore next */
	static getRemasteredFilter() {
		return new MetadataFilter({
			track: MetadataFilter.removeRemastered,
			album: MetadataFilter.removeRemastered,
		});
	}

	/**
	 * Get a filter with Spotify-related filter functions.
	 * @return {MetadataFilter} Filter object
	 */
	/* istanbul ignore next */
	static getSpotifyFilter() {
		return new MetadataFilter({
			track: [
				MetadataFilter.removeRemastered,
				MetadataFilter.fixTrackSuffix,
				MetadataFilter.removeLive,
			],
			album: [
				MetadataFilter.removeRemastered,
				MetadataFilter.fixTrackSuffix,
				MetadataFilter.removeLive,
			],
		});
	}

	/**
	 * Get a filter with Amazon-related filter functions.
	 * @return {MetadataFilter} Filter object
	 */
	/* istanbul ignore next */
	static getAmazonFilter() {
		return new MetadataFilter({
			artist: [
				MetadataFilter.normalizeFeature,
			],
			track: [
				MetadataFilter.removeCleanExplicit,
				MetadataFilter.removeFeature,
				MetadataFilter.removeRemastered,
				MetadataFilter.fixTrackSuffix,
				MetadataFilter.removeVersion,
				MetadataFilter.removeLive,
			],
			album: [
				MetadataFilter.decodeHtmlEntities,
				MetadataFilter.removeCleanExplicit,
				MetadataFilter.removeRemastered,
				MetadataFilter.fixTrackSuffix,
				MetadataFilter.removeVersion,
				MetadataFilter.removeLive,
			],
			albumArtist: [
				MetadataFilter.normalizeFeature,
				MetadataFilter.albumArtistFromArtist,
			],
		});
	}

	/**
	 * Get a filter with Tidal-related filter functions.
	 * @return {MetadataFilter} Filter object
	 */
	/* istanbul ignore next */
	static getTidalFilter() {
		return new MetadataFilter({
			track: [
				MetadataFilter.removeRemastered,
				MetadataFilter.fixTrackSuffix,
				MetadataFilter.removeVersion,
				MetadataFilter.removeLive,
			],
			album: [
				MetadataFilter.removeRemastered,
				MetadataFilter.fixTrackSuffix,
				MetadataFilter.removeVersion,
				MetadataFilter.removeLive,
			],
		});
	}
}

module.exports = MetadataFilter;
