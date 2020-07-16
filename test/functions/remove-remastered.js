import { removeRemastered } from '../../src/functions';

import { testFilterFunction } from '../helpers';

testFilterFunction(removeRemastered, [
	{
		description: 'should do nothing with clean string',
		source: 'Track Title',
		expected: 'Track Title',
	},
	{
		description: 'should remove "- Remastered" string',
		source: 'Track Title - Remastered',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "- Remastered YYYY" string',
		source: 'Track Title - Remastered 2015',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(Remastered YYYY)" string',
		source: 'Track Title (Remastered 2009)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(Remaster YYYY)" string',
		source: 'Track Title (Remaster 2009)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "[YYYY - Remaster]" string',
		source: 'Track Title [2011 - Remaster]',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(YYYY - Remaster)" string',
		source: 'Track Title (2011 - Remaster)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(YYYY Remaster)" string',
		source: 'Track Title (2011 Remaster)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "- YYYY - Remaster" string',
		source: 'Track Title - 2011 - Remaster',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "- YYYY Remaster" string',
		source: 'Track Title - 2006 Remaster',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "- YYYY Digital Remaster" string',
		source: 'Track Title - 2001 Digital Remaster',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "- YYYY Remastered Version" string',
		source: 'Track Title - 2011 Remastered Version',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(Live / Remastered)" string',
		source: 'Track Title (Live / Remastered)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "- Live / Remastered" string',
		source: 'Track Title - Live / Remastered',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(Remastered)" string',
		source: 'Track Title (Remastered)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "[Remastered]" string',
		source: 'Track Title [Remastered]',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(YYYY Remastered Version)" string',
		source: 'Track Title (2014 Remastered Version)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "[YYYY Remastered Version]" string',
		source: 'Track Title [2014 Remastered Version]',
		expected: 'Track Title ',
	},
	{
		description:
			'should remove "(YYYY Re-Mastered Digital Version)" string',
		source: 'Track Title (2009 Re-Mastered Digital Version)',
		expected: 'Track Title ',
	},
	{
		description: 'should remove "(YYYY Remastered Digital Version)" string',
		source: 'Track Title (2009 Remastered Digital Version)',
		expected: 'Track Title ',
	},
]);
