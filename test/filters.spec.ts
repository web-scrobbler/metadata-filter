import { expect } from 'chai';
import {
	createAmazonFilter,
	createRemasteredFilter,
	createSpotifyFilter,
	createTidalFilter,
	createYouTubeFilter,
	MetadataFilter,
} from '../src';

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
