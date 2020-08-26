import { expect } from 'chai';

import { MetadataFilter } from '../../src/filter';
import { FilterFuncion } from '../../src';

/**
 * Test an extended filter object.
 *
 * The test if passed if all filter functions are called.
 *
 * @param filter MetadataFilter instance
 * @param filterFunctions Spy functions that should be called
 */
export function testExtendedFilter(
	filter: MetadataFilter,
	...filterFunctions: FilterFuncion[]
): void {
	it('should call all filter functions', () => {
		for (const field of filter.getFields()) {
			filter.filterField(field, 'Test');
		}

		for (const f of filterFunctions) {
			expect(f).to.have.been.called();
		}
	});
}
