import { fixTrackSuffix } from '../../src/functions';

import { testFilterFunction } from '../helpers';

testFilterFunction(fixTrackSuffix, [
	{
		description: 'should do nothing with correct suffix',
		source: 'Track Title (Artist Remix)',
		expected: 'Track Title (Artist Remix)',
	},
	{
		description: 'should do nothing with correct suffix',
		source: 'Track Title (Remix)',
		expected: 'Track Title (Remix)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track Title - Artist Remix',
		expected: 'Track Title (Artist Remix)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track Title - Remix',
		expected: 'Track Title (Remix)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Remix',
		expected: 'Track A (Remix)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Group X dub',
		expected: 'Track A (Group X dub)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Group X edit',
		expected: 'Track A (Group X edit)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Group X mix',
		expected: 'Track A (Group X mix)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Group X Remix Edit',
		expected: 'Track A (Group X Remix Edit)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - VIP',
		expected: 'Track A (VIP)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Radio Edit',
		expected: 'Track A (Radio Edit)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - X Radio Edit',
		expected: 'Track A (X Radio Edit)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Short Version',
		expected: 'Track A (Short Version)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Original Mix',
		expected: 'Track A (Original Mix)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Radio Version',
		expected: 'Track A (Radio Version)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Group X Radio Mix',
		expected: 'Track A (Group X Radio Mix)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Continuous Mix',
		expected: 'Track A (Continuous Mix)',
	},
	{
		description: 'should replace invalid suffix',
		source: 'Track A - Factoria Vocal Mix',
		expected: 'Track A (Factoria Vocal Mix)',
	},
]);
