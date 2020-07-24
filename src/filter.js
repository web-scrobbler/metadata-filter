const allField = 'all';

/**
 * Create a new MetadataFilter instance from a given filter set.
 *
 * @param {Object} filterSet Filter set
 *
 * @return {MetadataFilter} MetadataFilter instance
 */
export function createFilter(filterSet) {
	return new MetadataFilter(filterSet);
}

/**
 * Base filter object that filters metadata fields by given filter set.
 *
 * A filter set is an object containing `artist`, `track`, `album`,
 * `albumArtist`, or `all` properties. Each property can be defined either as
 * a filter function or as an array of filter functions. These properties
 * are used to define filter functions to filter the respective metadata fields.
 * The 'all' property can be used to define common filter functions for all
 * metadata fields.
 *
 * The filter function is a function which takes non-null string argument
 * and returns modified string.
 */
export class MetadataFilter {
	/**
	 * @constructor
	 *
	 * @param {Object} filterSet Set of filters
	 *
	 * @throws {TypeError} Throw an error if no filter set is specified
	 */
	constructor(filterSet) {
		if (!filterSet) {
			throw new TypeError('No filter set is specified!');
		}

		this.mergedFilterSet = {};
		this.appendFilters(filterSet);
	}

	/**
	 * Filter field using filters for given field.
	 *
	 * @param {String} field Metadata field
	 * @param {String} text String to be filtered
	 *
	 * @return {String} Filtered string
	 */
	filterField(field, text) {
		return this.filterText(text, this.mergedFilterSet[field]);
	}

	/**
	 * Append a new filter set.
	 *
	 * @param {Object} filterSet Set of filters
	 *
	 * @return {MetadataFilter} Current instance
	 */
	append(filterSet) {
		this.appendFilters(filterSet);
		return this;
	}

	/**
	 * Extend the filter by a filter set from a given filter.
	 *
	 * @param {Object} filter Filter object
	 *
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
	 *
	 * @param {String} text String to be filtered
	 * @param {Array} filters Array of filter functions
	 *
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
	 *
	 * @param {Object} filters Array of filter functions or filter function
	 *
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
	 *
	 * @param {Object} filterSet Set of filters
	 *
	 * @throws {TypeError} Throw an error if a field of filter set is invalid
	 * @throws {TypeError} Throw an error if a filter function is not a function
	 */
	appendFilters(filterSet) {
		for (const field in filterSet) {
			if (field === allField) {
				continue;
			}

			if (!MetadataFilter.ALL_FIELDS.includes(field)) {
				throw new TypeError(`Invalid filter field: ${field}`);
			}
		}

		for (const field of MetadataFilter.ALL_FIELDS) {
			if (this.mergedFilterSet[field] === undefined) {
				this.mergedFilterSet[field] = [];
			}

			if (filterSet[field]) {
				this.mergedFilterSet[field].push(...this.createFilters(filterSet[field]));
			}

			if (filterSet[allField]) {
				this.mergedFilterSet[field].push(...this.createFilters(filterSet[allField]));
			}
		}
	}

	static assertFilterFunctionIsValid(fn) {
		if (typeof fn !== 'function') {
			throw new TypeError(`Invalid filter function: expected 'function', got '${typeof fn}'`);
		}
	}
}
