import { FilterFuncion } from './functions';

type MergedFilterSet = Record<string, FilterFuncion[]>;

export type FilterSet = Record<string, FilterFuncion | FilterFuncion[]>;

/**
 * Create a new MetadataFilter instance from a given filter set.
 *
 * @param filterSet Filter set
 *
 * @return MetadataFilter instance
 */
export function createFilter(filterSet: FilterSet): MetadataFilter {
	return new MetadataFilter(filterSet);
}

/**
 * Base filter object that filters metadata fields by given filter set.
 *
 * The filter set is an object containing properties (fields) with filter
 * functions. Each field can contain a single filter function, or an array of
 * filter functions.
 *
 * The filter function is a pure function which takes a non-empty string and
 * returns a modified string.
 *
 * These filter functions will be applied to a field value passed in
 * `MetadataFilter.filterField` method.
 */
export class MetadataFilter {
	private mergedFilterSet: MergedFilterSet;

	/**
	 * @constructor
	 *
	 * @param filterSet Set of filters
	 *
	 * @throws Throw an error if no filter set is specified
	 */
	constructor(filterSet: FilterSet) {
		if (!filterSet) {
			throw new TypeError('No filter set is specified!');
		}

		this.mergedFilterSet = {};
		this.appendFilters(filterSet);
	}

	/**
	 * Filter the field value using filters for the given field.
	 *
	 * @param field Metadata field
	 * @param fieldValue Field value to be filtered
	 *
	 * @return Filtered string
	 *
	 * @throws Throw an error if an invalid field is specified
	 */
	filterField(field: string, fieldValue: string): string {
		if (!(field in this.mergedFilterSet)) {
			throw new TypeError(`Invalid filter field: ${field}`);
		}

		return this.filterText(fieldValue, this.mergedFilterSet[field]);
	}

	/**
	 * Append a new filter set.
	 *
	 * @param filterSet Set of filters
	 *
	 * @return Current instance
	 */
	append(filterSet: FilterSet): MetadataFilter {
		this.appendFilters(filterSet);
		return this;
	}

	/**
	 * Extend the filter by a filter set from a given filter.
	 *
	 * @param filter Filter object
	 *
	 * @return Current instance
	 */
	extend(filter: MetadataFilter): MetadataFilter {
		this.appendFilters(filter.mergedFilterSet);
		return this;
	}

	/**
	 * Check if the filter contains filter functions for a given field.
	 *
	 * @param field Field to check
	 *
	 * @return Check result
	 */
	canFilterField(field: string): boolean {
		return field in this.mergedFilterSet;
	}

	/**
	 * Return a list of fields that the filter can filter.
	 *
	 * @return List of fields
	 */
	getFields(): string[] {
		return Object.keys(this.mergedFilterSet);
	}

	/**
	 * Filter text using given filters.
	 *
	 * @param text String to be filtered
	 * @param filters Array of filter functions
	 *
	 * @return Filtered string
	 */
	private filterText(text: string, filters: FilterFuncion[]): string {
		if (!text) {
			return text;
		}

		return filters.reduce((text, filter) => filter(text), text);
	}

	/**
	 * Convert given filters into array of filters.
	 *
	 * @param filters Array of filter functions or filter function
	 *
	 * @return Array of filter funcions
	 */
	private createFilters(
		filters: FilterFuncion | FilterFuncion[]
	): FilterFuncion[] {
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
	 * @param filterSet Set of filters
	 *
	 * @throws Throw an error if a field of filter set is invalid
	 * @throws Throw an error if a filter function is not a function
	 */
	private appendFilters(filterSet: FilterSet): void {
		for (const field in filterSet) {
			if (!(field in this.mergedFilterSet)) {
				this.mergedFilterSet[field] = [];
			}

			this.mergedFilterSet[field].push(
				...this.createFilters(filterSet[field])
			);
		}
	}

	/**
	 * Throw an error if the given filter function is not a valid function.
	 *
	 * @param  fn Object to check
	 *
	 * @throws Throw an error if the given argument is not a function
	 */
	private static assertFilterFunctionIsValid(fn: unknown): void {
		if (typeof fn !== 'function') {
			throw new TypeError(
				`Invalid filter function: expected 'function', got '${typeof fn}'`
			);
		}
	}
}
