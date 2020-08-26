import { removeZeroWidth } from '../../src/functions';

import { testFilterFunction } from '../helper/test-function';

testFilterFunction(removeZeroWidth, [
	{
		description: 'should do nothing with clean string',
		funcParameter: 'Track Metafield',
		expectedValue: 'Track Metafield',
	},
	{
		description: 'should remove zero-width characters',
		funcParameter: 'Str\u200Ding\u200B',
		expectedValue: 'String',
	},
	{
		description: 'should remove trailing zero-width characters',
		funcParameter: 'String\u200C',
		expectedValue: 'String',
	},
	{
		description: 'should remove leading zero-width characters',
		funcParameter: '\u200DString',
		expectedValue: 'String',
	},
]);
