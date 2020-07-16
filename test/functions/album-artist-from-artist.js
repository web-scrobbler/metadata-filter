import { albumArtistFromArtist } from '../../src/functions';

import { testFilterFunction } from '../helpers';

testFilterFunction(albumArtistFromArtist, [
	{
		description: 'should remove featured artist from suffix',
		source: 'Artist A feat. Artist B',
		expected: 'Artist A',
	},
	{
		description: 'should remove featured artist from suffix',
		source: 'Artist A feat. Artist B, Artist C',
		expected: 'Artist A',
	},
	{
		description: 'should remove featured artist from suffix',
		source: 'Artist A feat. Artist B, Artist C & Artist D',
		expected: 'Artist A',
	},
	{
		description: 'should return original text if feat. not present',
		source: 'Artist A',
		expected: 'Artist A',
	},
]);
