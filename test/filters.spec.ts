import { expect } from 'chai';

import { FilterFixture, describeAndTestFilter } from './helper/test-filter';
import { loadFixtureFile } from './helper/load-fixture-file';

import {
	createAmazonFilter,
	createRemasteredFilter,
	createSpotifyFilter,
	createTidalFilter,
	createYouTubeFilter,
	MetadataFilter,
} from '../src';

const filtersToTest: Record<string, MetadataFilter> = {
	spotify: createSpotifyFilter(),
};

describe('Test predefined filters', () => {
	it('should return MetadataFilter instance', () => {
		const predefinedFilters = [
			createAmazonFilter(),
			createRemasteredFilter(),
			createSpotifyFilter(),
			createTidalFilter(),
			createYouTubeFilter(),
		];

		for (const filter of predefinedFilters) {
			expect(filter).to.be.instanceOf(MetadataFilter);
		}
	});
});

for (const [filterName, filter] of Object.entries(filtersToTest)) {
	const fixtures = loadFixtureFile<FilterFixture>(`filters/${filterName}`);

	describeAndTestFilter(filterName, filter, fixtures);
}
