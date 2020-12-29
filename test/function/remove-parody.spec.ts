import { removeParody } from '../../src/functions';

import { testFilterFunction } from '../helper/test-function';

/* eslint quotes: ['error', 'single', { 'allowTemplateLiterals': true }] */

testFilterFunction(removeParody, [
	{
		description: `should remove ' (Parody of "Party In The U.S.A." by Miley Cyrus)' string`,
		funcParameter:
			'Party In the CIA (Parody of "Party In The U.S.A." by Miley Cyrus)',
		expectedValue: 'Party In the CIA',
	},
	{
		description: `should remove ' (Parody of "Gangsta's Paradise" by Coolio)' string`,
		funcParameter: `Amish Paradise (Parody of "Gangsta's Paradise" by Coolio)`,
		expectedValue: 'Amish Paradise',
	},
	{
		description: `should remove ' (Parody of "Ridin'" by Chamillionaire feat. Krayzie Bone)' string`,
		funcParameter: `White & Nerdy (Parody of "Ridin'" by Chamillionaire feat. Krayzie Bone)`,
		expectedValue: 'White & Nerdy',
	},
	{
		description: `should remove ' (Lyrical Adaption of "American Pie")' string`,
		funcParameter: 'The Saga Begins (Lyrical Adaption of "American Pie")',
		expectedValue: 'The Saga Begins',
	},
]);
