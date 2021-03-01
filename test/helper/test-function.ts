import { expect } from 'chai';

import type { FilterFunction } from '../../src';

/**
 * An interface to describe test data used to test a function.
 */
export interface FilterFunctionFixture {
	/**
	 * Test case description.
	 */
	readonly description: string;

	/**
	 * Function parameter.
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
 * @param fixtures Test fixtures
 */
export function describeAndTestFilterFunction(
	filterFunction: FilterFunction,
	fixtures: FilterFunctionFixture[]
): void {
	const functionName = filterFunction.name;

	describe(`Test '${functionName}' filter function`, () => {
		for (const fixture of fixtures) {
			const { description, funcParameter, expectedValue } = fixture;

			it(description, () => {
				const actual = filterFunction(funcParameter);
				expect(expectedValue).to.be.equal(actual);
			});
		}
	});
}
