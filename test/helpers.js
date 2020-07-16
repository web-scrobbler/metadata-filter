import { expect } from 'chai';

import { MetadataFilter } from './../src/filter';

/**
 * Return a new MetadataFilter instance using the given filter function.
 * The filter function is applied to the given list of fields.
 *
 * @param {Function} filterFunc Filter function
 * @param {Array} fields List of fields
 *
 * @return {MetadataFilter} MetadataFilter instance
 */
export function createFilterFromFunction(filterFunc, fields) {
	return new MetadataFilter(
		fields.reduce((filterSet, field) => {
			filterSet[field] = filterFunc;
			return filterSet;
		}, {})
	);
}

/**
 * Test an extended filter object.
 *
 * The test if passed if all filter functions are called.
 *
 * @param {Object} filter MetadataFilter instance
 * @param {Array} filterFunctions Filter functions that should be called
 */
export function testExtendedFilter(filter, ...filterFunctions) {
	it('should call all filter functions', () => {
		for (const field of MetadataFilter.ALL_FIELDS) {
			filter.filterField(field, 'Test');
		}

		for (const f of filterFunctions) {
			expect(f).to.have.been.called();
		}
	});
}

/**
 * Test a filter function.
 *
 * This function receives a test data. The test data is an array containing
 * test cases for the given filter. Each array item must contain
 * the following properties:
 *  - `description`: test case description
 *  - `source`: an input string to be filtered
 *  - `expected`: an expected result
 *
 * @param {Function} filterFunction Filter function reference
 * @param {Array} testData Test data
 */
export function testFilterFunction(filterFunction, testData) {
	const functionName = filterFunction.name;

	describe(`test '${functionName}' filter function`, () => {
		for (const data of testData) {
			const { description, source, expected } = data;

			it(description, () => {
				const actual = filterFunction(source);
				expect(expected).to.be.equal(actual);
			});
		}
	});
}
