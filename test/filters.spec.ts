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
import { validateFixtures } from './helper/validate-fixtures';

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

const requiredFixtureProperties: ReadonlyArray<keyof FilterFixture> = [
	'description',
	'fieldName',
	'fieldValue',
	'expectedValue',
];

for (const [fixtureId, filter] of Object.entries(filtersToTest)) {
	const fixtures = loadFixtureFile<FilterFixture>(`filters/${fixtureId}`);
	validateFixtures(fixtureId, fixtures, requiredFixtureProperties);

	describeAndTestFilter(fixtureId, filter, fixtures);
}
