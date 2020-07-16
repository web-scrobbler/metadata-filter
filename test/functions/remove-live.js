import { removeLive } from '../../src/functions';

import { testFilterFunction } from '../helpers';

testFilterFunction(removeLive, [
	{
		description: 'should remove "Live" suffix',
		source: 'Track Title - Live',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "Live ..." suffix',
		source: 'Track Title - Live @ Moon',
		expected: 'Track Title ',
	},
]);
