import { expect } from 'chai';

import { MetadataFilter } from './../src/filter';
import * as filters from './../src/filters';

describe('Test predefined filters', () => {
	const getFilterFunctions = Object.values(filters);

	for (const getFilter of getFilterFunctions) {
		const filter = getFilter();
		const getterName = getFilter.name;

		it(`should return MetadataFilter in ${getterName} function`, () => {
			expect(filter).instanceof(MetadataFilter);
		});
	}
});
