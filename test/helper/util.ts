import { MetadataFilter, createFilter } from '../../src/filter';
import { FilterFuncion } from '../../src/functions';

/**
 * Return a MetadataFilter instance using the given filter function.
 * The filter function is applied to the given list of fields.
 *
 * @param filterFunc Filter function
 * @param fields List of fields
 *
 * @return MetadataFilter instance
 */
export function createFilterFromFunction(
	filterFunc: FilterFuncion,
	fields: string[]
): MetadataFilter {
	const filterSet = fields.reduce((filterSet, field) => {
		filterSet[field] = filterFunc;
		return filterSet;
	}, {});

	return createFilter(filterSet);
}

/**
 * A dummy filter function that returns an input.
 *
 * @param text String to be filtered
 *
 * @return Unmodified input
 */
export function dummyFn(text: string): string {
	return text;
}
