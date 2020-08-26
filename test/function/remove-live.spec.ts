import { removeLive } from '../../src/functions';

import { testFilterFunction } from '../helper/test-function';

testFilterFunction(removeLive, [
	{
		description: 'should remove "Live" suffix',
		funcParameter: 'Track Title - Live',
		expectedValue: 'Track Title ',
	},
	{
		description: 'should remove "Live ..." suffix',
		funcParameter: 'Track Title - Live @ Moon',
		expectedValue: 'Track Title ',
	},
]);
