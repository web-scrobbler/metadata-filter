import { removeZeroWidth } from '../../src/functions';

import { testFilterFunction } from '../helpers';

testFilterFunction(removeZeroWidth, [
	{
		description: 'should do nothing with clean string',
		source: 'Track Metafield',
		expected: 'Track Metafield',
	},
	{
		description: 'should remove zero-width characters',
		source: 'Str\u200Ding\u200B',
		expected: 'String',
	},
	{
		description: 'should remove trailing zero-width characters',
		source: 'String\u200C',
		expected: 'String',
	},
	{
		description: 'should remove leading zero-width characters',
		source: '\u200DString',
		expected: 'String',
	},
]);
