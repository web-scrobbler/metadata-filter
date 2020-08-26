import { removeFeature } from '../../src/functions';

import { testFilterFunction } from '../helper/test-function';

testFilterFunction(removeFeature, [
	{
		description: 'should remove featured artist from suffix',
		funcParameter: 'Artist A [feat. Artist B]',
		expectedValue: 'Artist A',
	},
	{
		description: 'should remove featured artist from suffix',
		funcParameter: 'Artist A (feat. Artist B)',
		expectedValue: 'Artist A',
	},
]);
