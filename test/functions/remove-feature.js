import { removeFeature } from '../../src/functions';

import { testFilterFunction } from '../helpers';

testFilterFunction(removeFeature, [
	{
		description: 'should remove featured artist from suffix',
		source: 'Artist A [feat. Artist B]',
		expected: 'Artist A',
	},
	{
		description: 'should remove featured artist from suffix',
		source: 'Artist A (feat. Artist B)',
		expected: 'Artist A',
	},
]);
