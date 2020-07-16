import { normalizeFeature } from '../../src/functions';

import { testFilterFunction } from '../helpers';

testFilterFunction(normalizeFeature, [
	{
		description: 'should transform [feat. Artist B] to feat. Artist B',
		source: 'Artist A [feat. Artist B]',
		expected: 'Artist A feat. Artist B',
	},
	{
		description: 'should not transform if no match for [feat. Artist B]',
		source: 'Artist A',
		expected: 'Artist A',
	},
	{
		description: 'should not transform if no match for [feat. Artist B]',
		source: 'Artist A feat. Artist B',
		expected: 'Artist A feat. Artist B',
	},
]);
