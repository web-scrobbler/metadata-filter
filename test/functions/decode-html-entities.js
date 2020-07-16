import { decodeHtmlEntities } from '../../src/functions';

import { testFilterFunction } from '../helpers';

const testData = [
	{
		description: 'should do nothing with clean string',
		source: "Can't Kill Us",
		expected: "Can't Kill Us",
	},
	{
		description: 'should decode HTML entity',
		source: 'Can&#039;t Kill Us',
		expected: "Can't Kill Us",
	},
	{
		description: 'should decode HTML entity',
		source: 'Can&#x60;t Kill Us',
		expected: 'Can`t Kill Us',
	},
	{
		description: 'should decode ampersand symbol',
		source: 'Artist 1 &amp; Artist 2',
		expected: 'Artist 1 & Artist 2',
	},
	{
		description: 'should decode all HTML entities in string',
		source: 'Artist&#x60;s 1 &amp;&amp; Artist&#x60;s 2',
		expected: 'Artist`s 1 && Artist`s 2',
	},
	{
		description: 'should not decode invalid HTML entity',
		source: 'Artist 1 &#xzz; Artist 2',
		expected: 'Artist 1 &#xzz; Artist 2',
	},
];

testFilterFunction(decodeHtmlEntities, testData);

