import { expect } from 'chai';

import type { FilterFunction } from '../../src/functions';

/**
 * An interface to describe test data used to test a function.
 */
export interface FilterFunctionTestData {
	/**
	 * Test case description.
	 */
	readonly description: string;

	/**
	 * Function parateter.
	 */
	readonly funcParameter: string;

	/**
	 * Expected value.
	 */
	readonly expectedValue: string;
}

/**
 * Test a filter function.
 *
 * This function receives a test data. The test data is an array containing
 * test cases for the given filter. Each item of the array should implement
 * `FilterFunctionTestData` interface.
 *
 * @param filterFunction Filter function reference
 * @param testData Test data
 */
export function testFilterFunction(
	filterFunction: FilterFunction,
	testData: FilterFunctionTestData[]
): void {
	const functionName = filterFunction.name;

	describe(`Test '${functionName}' filter function`, () => {
		for (const data of testData) {
			const { description, funcParameter, expectedValue } = data;

			it(description, () => {
				const actual = filterFunction(funcParameter);
				expect(expectedValue).to.be.equal(actual);
			});
		}
	});
}
