import { removeVersion } from '../../src/functions';

import { testFilterFunction } from '../helpers';

testFilterFunction(removeVersion, [
	{
		description: 'should do nothing with clean string',
		source: 'Track Title',
		expected: 'Track Title',
	},
	{
		description: 'should remove "(Album Version)" string',
		source: 'Track Title (Album Version)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "[Album Version]" string',
		source: 'Track Title [Album Version]',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(Rerecorded)" string',
		source: 'Track Title (Rerecorded)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "[Rerecorded]" string',
		source: 'Track Title [Rerecorded]',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(Re-recorded)" string',
		source: 'Track Title (Rerecorded)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "[Re-recorded]" string',
		source: 'Track Title [Rerecorded]',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(Single Version)" string',
		source: 'Track Title (Single Version)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(Edit)" string',
		source: 'Track Title (Edit)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "- Mono Version" string',
		source: 'Track Title - Mono Version',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "- Stereo Version" string',
		source: 'Track Title - Stereo Version',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(Deluxe Edition)" string',
		source: 'Album Title (Deluxe Edition)',
		expected: 'Album Title ',
	},
]);
