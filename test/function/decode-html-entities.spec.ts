import { decodeHtmlEntities } from '../../src/functions';

import { testFilterFunction } from '../../test/helper/test-function';

const testData = [
	{
		description: 'should do nothing with clean string',
		funcParameter: "Can't Kill Us",
		expectedValue: "Can't Kill Us",
	},
	{
		description: 'should decode HTML entity',
		funcParameter: 'Can&#039;t Kill Us',
		expectedValue: "Can't Kill Us",
	},
	{
		description: 'should decode HTML entity',
		funcParameter: 'Can&#x60;t Kill Us',
		expectedValue: 'Can`t Kill Us',
	},
	{
		description: 'should decode ampersand symbol',
		funcParameter: 'Artist 1 &amp; Artist 2',
		expectedValue: 'Artist 1 & Artist 2',
	},
	{
		description: 'should decode all HTML entities in string',
		funcParameter: 'Artist&#x60;s 1 &amp;&amp; Artist&#x60;s 2',
		expectedValue: 'Artist`s 1 && Artist`s 2',
	},
	{
		description: 'should not decode invalid HTML entity',
		funcParameter: 'Artist 1 &#xzz; Artist 2',
		expectedValue: 'Artist 1 &#xzz; Artist 2',
	},
];

testFilterFunction(decodeHtmlEntities, testData);

