import { removeCleanExplicit } from '../../src/functions';

import { testFilterFunction } from '../helpers';

testFilterFunction(removeCleanExplicit, [
	{
		description: 'should remove [Explicit] suffix',
		source: 'Track [Explicit]',
		expected: 'Track',
	},
	{
		description: 'should remove (Explicit) suffix',
		source: 'Track (Explicit)',
		expected: 'Track',
	},
	{
		description: 'should remove [Clean] suffix',
		source: 'Track [Clean]',
		expected: 'Track',
	},
	{
		description: 'should remove (Clean) suffix',
		source: 'Track (Clean)',
		expected: 'Track',
	},
]);
