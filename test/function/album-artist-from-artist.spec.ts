import { albumArtistFromArtist } from '../../src/functions';

import { testFilterFunction } from '../helper/test-function';

testFilterFunction(albumArtistFromArtist, [
	{
		description: 'should remove featured artist from suffix',
		funcParameter: 'Artist A feat. Artist B',
		expectedValue: 'Artist A',
	},
	{
		description: 'should remove featured artist from suffix',
		funcParameter: 'Artist A feat. Artist B, Artist C',
		expectedValue: 'Artist A',
	},
	{
		description: 'should remove featured artist from suffix',
		funcParameter: 'Artist A feat. Artist B, Artist C & Artist D',
		expectedValue: 'Artist A',
	},
	{
		description: 'should return original text if feat. not present',
		funcParameter: 'Artist A',
		expectedValue: 'Artist A',
	},
]);
