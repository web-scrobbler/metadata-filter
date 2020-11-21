import { fixTrackSuffix } from '../../src/functions';

import { testFilterFunction } from '../helper/test-function';

testFilterFunction(fixTrackSuffix, [
	{
		description: 'should do nothing with correct suffix',
		funcParameter: 'Track Title (Artist Remix)',
		expectedValue: 'Track Title (Artist Remix)',
	},
	{
		description: 'should do nothing with correct suffix',
		funcParameter: 'Track Title (Remix)',
		expectedValue: 'Track Title (Remix)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track Title - Artist Remix',
		expectedValue: 'Track Title (Artist Remix)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track Title - Remix',
		expectedValue: 'Track Title (Remix)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Remix',
		expectedValue: 'Track A (Remix)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Group X dub',
		expectedValue: 'Track A (Group X dub)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Group X edit',
		expectedValue: 'Track A (Group X edit)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Group X mix',
		expectedValue: 'Track A (Group X mix)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Group X Remix Edit',
		expectedValue: 'Track A (Group X Remix Edit)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - VIP',
		expectedValue: 'Track A (VIP)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Radio Edit',
		expectedValue: 'Track A (Radio Edit)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - X Radio Edit',
		expectedValue: 'Track A (X Radio Edit)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Short Version',
		expectedValue: 'Track A (Short Version)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Original Mix',
		expectedValue: 'Track A (Original Mix)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Radio Version',
		expectedValue: 'Track A (Radio Version)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Group X Radio Mix',
		expectedValue: 'Track A (Group X Radio Mix)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Continuous Mix',
		expectedValue: 'Track A (Continuous Mix)',
	},
	{
		description: 'should replace invalid suffix',
		funcParameter: 'Track A - Factoria Vocal Mix',
		expectedValue: 'Track A (Factoria Vocal Mix)',
	},
	{
		description: 'should remove "- Original" sufix',
		funcParameter: 'Track A - Original',
		expectedValue: 'Track A ',
	},
]);
