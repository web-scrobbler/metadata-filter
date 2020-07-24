import { replaceNbsp } from '../../src/functions';

import { testFilterFunction } from '../helpers';

testFilterFunction(replaceNbsp, [
	{
		description: 'should do nothing with clean string',
		source: 'Track field',
		expected: 'Track field',
	},
	{
		description: 'should remove a single non-breaking space',
		source: 'Track\u00a0field',
		expected: 'Track\u0020field',
	},
	{
		description: 'should remove multiple non-breaking spaces',
		source: 'Long\u00a0track\u00a0field',
		expected: 'Long\u0020track\u0020field',
	},
]);
