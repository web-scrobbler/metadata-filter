import { expect } from 'chai';

import { MetadataFilter } from '../../src';

/**
 * An interface to describe test data used to test a filter.
 */
export interface FilterFixture {
	/**
	 * Test case description.
	 */
	readonly description: string;

	/**
	 * Field name to filter.
	 */
	readonly fieldName: string;

	/**
	 * Field value to filter.
	 */
	readonly fieldValue: string;

	/**
	 * Expected value.
	 */
	readonly expectedValue: string;
}

/**
 * Test the given filter.
 *
 * This function receives a test data. The test data is an array containing
 * test cases for the given filter. Each item of the array should implement
 * `FilterFixture` interface.
 *
 * @param filterName Filter name
 * @param filter Filter object
 * @param fixtures Test fixtures
 */
export function describeAndTestFilter(
	filterName: string,
	filter: MetadataFilter,
	fixtures: FilterFixture[]
): void {
	describe(`Test ${filterName} filter`, () => {
		for (const fixture of fixtures) {
			const {
				description,
				fieldName,
				fieldValue,
				expectedValue,
			} = fixture;

			it(description, () => {
				const actual = filter.filterField(fieldName, fieldValue);
				expect(expectedValue).to.be.equal(actual);
			});
		}
	});
}
