import {
	assertFieldsAreValid,
	assertFilterSetFiltersAreValid,
	assertFilterSetIsValid,
} from './assert';

export type FilterFunction = (text: string) => string;

export type FilterSet = Record<string, FilterFunction | FilterFunction[]>;

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
 * Create a filter set where each given field has given filter function(s).
 * Useful to create a filter where multiple fields should be filtered with
 * the same filter functions.
 *
 * @param fields Array of fields to filter
 * @param filterFn Filter function or array of filter functions
 *
 * @return Filter set object
 */
export function createFilterSetForFields(
	fields: string[],
	filterFn: FilterFunction | FilterFunction[]
): FilterSet {
	assertFieldsAreValid(fields);
	assertFilterSetFiltersAreValid(filterFn);

	return fields.reduce((acc, field) => {
		acc[field] = filterFn;
		return acc;
	}, {} as FilterSet);
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
	private readonly mergedFilterSet: Record<string, FilterFunction[]>;

	/**
	 * @constructor
	 *
	 * @param filterSet Set of filters
	 *
	 * @throws Throw an error if no filter set is specified
	 */
	constructor(filterSet: FilterSet) {
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
		if (field in this.mergedFilterSet) {
			return this.filterText(fieldValue, this.mergedFilterSet[field]);
		}

		throw new TypeError(`Invalid filter field: ${field}`);
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
		if (!filter) {
			throw new TypeError('No filter is specified!');
		}

		if (!(filter instanceof MetadataFilter)) {
			throw new TypeError(
				`Invalid filter: expected 'MetadataFilter', got '${typeof filter}'`
			);
		}

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
	getFields(): readonly string[] {
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
	private filterText(text: string, filters: FilterFunction[]): string {
		if (!text) {
			return text;
		}

		return filters.reduce((text, filter) => filter(text), text);
	}

	/**
	 * Wrap given filters into array of filters, if needed.
	 *
	 * @param filters Array of filter functions or filter function
	 *
	 * @return Array of filter functions
	 */
	private wrapFiltersIntoArray(
		filters: FilterFunction | FilterFunction[]
	): FilterFunction[] {
		if (Array.isArray(filters)) {
			return filters;
		}

		const filterFn = filters;
		return [filterFn];
	}

	/**
	 * Add given filters to current ones.
	 *
	 * @param filterSet Set of filters
	 *
	 * @throws Throw an error if a filter function is not a function
	 */
	private appendFilters(filterSet: FilterSet): void {
		assertFilterSetIsValid(filterSet);

		for (const field in filterSet) {
			if (!(field in this.mergedFilterSet)) {
				this.mergedFilterSet[field] = [];
			}

			const filterFunctions = this.wrapFiltersIntoArray(filterSet[field]);
			this.mergedFilterSet[field].push(...filterFunctions);
		}
	}
}
