import { replaceNbsp } from '../../src/functions';

import { testFilterFunction } from '../helper/test-function';

testFilterFunction(replaceNbsp, [
	{
		description: 'should do nothing with clean string',
		funcParameter: 'Track field',
		expectedValue: 'Track field',
	},
	{
		description: 'should remove a single non-breaking space',
		funcParameter: 'Track\u00a0field',
		expectedValue: 'Track\u0020field',
	},
	{
		description: 'should remove multiple non-breaking spaces',
		funcParameter: 'Long\u00a0track\u00a0field',
		expectedValue: 'Long\u0020track\u0020field',
	},
]);
