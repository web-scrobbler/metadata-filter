'use strict';

/**
 * Tests for 'filter' module.
 */

const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
const MetadataFilter = require('./../src/filter');

chai.use(spies);

/**
 * Test data is an array of objects. Each object must contain
 * three fields: 'description', 'source' and 'expected'.
 *
 * 'description' is a test description used by 'it' function.
 * 'source' is an function argument that used to test function.
 * 'expected' is an expected value of function result.
 */

const FILTER_NULL_DATA = [{
	description: 'should not call filter function for null source',
	source: null,
	expected: null
}, {
	description: 'should not call filter function for empty source',
	source: '',
	expected: ''
}];

/**
 * Test data for testing default filter.
 * @type {Array}
 */
const DEFAULT_TEST_DATA = [{
	description: 'should do nothing with clean string',
	source: 'Track Metafield',
	expected: 'Track Metafield'
}, {
	description: 'should trim whitespaces',
	source: '  Track Metafield  ',
	expected: 'Track Metafield'
}, {
	description: 'should trim trailing whitespaces',
	source: 'Track Metafield    ',
	expected: 'Track Metafield'
}, {
	description: 'should trim leading whitespaces',
	source: '    Track Metafield',
	expected: 'Track Metafield'
}, {
	description: 'should remove NBSPs',
	source: 'Track\u00a0Metafield',
	expected: 'Track\u0020Metafield'
}];

/**
 * Test data for testing Youtube filter.
 * @type {Array}
 */
const YOUTUBE_FILTER_RULES_TEST_DATA = [{
	description: 'should do nothing with clean string',
	source: 'Track Title',
	expected: 'Track Title'
}, {
	description: 'should trim whitespaces',
	source: '  Track Title  ',
	expected: 'Track Title'
}, {
	description: 'should trim leading whitespaces',
	source: '    Track Title',
	expected: 'Track Title'
}, {
	description: 'should trim trailing whitespaces',
	source: 'Track Title    ',
	expected: 'Track Title'
}, {
	description: 'should remove leftovers after e.g. (official video)',
	source: 'Track Title (    )',
	expected: 'Track Title'
}, {
	description: 'should remove empty leftovers after e.g. (official video)',
	source: 'Track Title ()',
	expected: 'Track Title'
}, {
	description: 'should remove "HD" string',
	source: 'Track Title HD',
	expected: 'Track Title'
}, {
	description: 'should remove "HQ" string',
	source: 'Track Title HQ',
	expected: 'Track Title'
}, {
	description: 'should extract title from single quotes',
	source: '\'Track Title\'',
	expected: 'Track Title'
}, {
	description: 'should extract title from double quotes',
	source: '"Track Title" whatever',
	expected: 'Track Title'
}, {
	description: 'should remove .avi extension',
	source: 'Track Title.avi',
	expected: 'Track Title'
}, {
	description: 'should remove .wmv extension',
	source: 'Track Title.wmv',
	expected: 'Track Title'
}, {
	description: 'should remove .mpg extension',
	source: 'Track Title.mpg',
	expected: 'Track Title'
}, {
	description: 'should remove .flv extension',
	source: 'Track Title.flv',
	expected: 'Track Title'
}, {
	description: 'should remove .mpeg extension',
	source: 'Track Title.mpeg',
	expected: 'Track Title'
}, {
	description: 'should remove "**NEW**" string',
	source: 'Track Title **NEW**',
	expected: 'Track Title'
}, {
	description: 'should remove "[whatever]" string',
	source: 'Track Title [Official Video]',
	expected: 'Track Title'
}, {
	description: 'should remove "Video" string',
	source: 'Track Title (Video)',
	expected: 'Track Title'
}, {
	description: 'should remove "Music Video" string',
	source: 'Track Title (Music Video)',
	expected: 'Track Title'
}, {
	description: 'should remove "Official Video" string',
	source: 'Track Title (Official Video)',
	expected: 'Track Title'
}, {
	description: 'should remove "Official Music Video" string',
	source: 'Track Title (Official Music Video)',
	expected: 'Track Title'
}, {
	description: 'should remove "Audio" string',
	source: 'Track Title (Audio)',
	expected: 'Track Title'
}, {
	description: 'should remove "Music Audio" string',
	source: 'Track Title (Music Audio)',
	expected: 'Track Title'
}, {
	description: 'should remove "Official Audio" string',
	source: 'Track Title (Official Audio)',
	expected: 'Track Title'
}, {
	description: 'should remove "Official Music Audio" string',
	source: 'Track Title (Official Music Audio)',
	expected: 'Track Title'
}, {
	description: 'should not remove Video from track name',
	source: 'Video Killed the Radio Star',
	expected: 'Video Killed the Radio Star'
}, {
	description: 'should remove "(official)" string',
	source: 'Track Title (Official)',
	expected: 'Track Title'
}, {
	description: 'should remove "(oficial)" string',
	source: 'Track Title (Oficial)',
	expected: 'Track Title'
}, {
	description: 'should remove "offizielles Video" string',
	source: 'Track Title offizielles Video',
	expected: 'Track Title'
}, {
	description: 'should remove "video clip officiel" string',
	source: 'Track Title video clip officiel',
	expected: 'Track Title'
}, {
	description: 'should remove "video clip official" string',
	source: 'Track Title video clip official',
	expected: 'Track Title'
}, {
	description: 'should remove "videoclip oficiel" string',
	source: 'Track Title videoclip oficiel',
	expected: 'Track Title'
}, {
	description: 'should remove "videoclip oficial" string',
	source: 'Track Title videoclip oficial',
	expected: 'Track Title'
}, {
	description: 'should remove "video clip" string',
	source: 'Track Title video clip',
	expected: 'Track Title'
}, {
	description: 'should remove "videoclip" string',
	source: 'Track Title videoclip',
	expected: 'Track Title'
}, {
	description: 'should remove "vid\u00E9o clip" string',
	source: 'Track Title vid\u00E9o clip',
	expected: 'Track Title'
}, {
	description: 'should remove "clip" string',
	source: 'Track Title clip',
	expected: 'Track Title'
}, {
	description: 'should not remove "clip" from string',
	source: 'Eclipse',
	expected: 'Eclipse'
}, {
	description: 'should remove "(YYYY)" string',
	source: 'Track Title (2348)',
	expected: 'Track Title'
}, {
	description: 'should remove "(Whatever version)" string',
	source: 'Track Title (Super Cool Version)',
	expected: 'Track Title'
}, {
	description: 'should remove "(Lyric Video)" string',
	source: 'Track Title (Lyric Video)',
	expected: 'Track Title'
}, {
	description: 'should remove "(Whatever Lyric Video)" string',
	source: 'Track Title (Official Lyric Video)',
	expected: 'Track Title'
}, {
	description: 'should remove "(Lyrics Video)" string',
	source: 'Track Title (Lyrics Video)',
	expected: 'Track Title'
}, {
	description: 'should remove "(Whatever Lyrics Video)" string',
	source: 'Track Title (OFFICIAL LYRICS VIDEO)',
	expected: 'Track Title'
}, {
	description: 'should remove "(With Lyrics)" string',
	source: 'Track Title (With Lyrics)',
	expected: 'Track Title'
}, {
	description: 'should remove "(Official Track Stream)" string',
	source: 'Track Title (Official Track Stream)',
	expected: 'Track Title'
}, {
	description: 'should remove "(Track Stream)" string',
	source: 'Track Title (Track Stream)',
	expected: 'Track Title'
}, {
	description: 'should remove "(Official Stream)" string',
	source: 'Track Title (Official Stream)',
	expected: 'Track Title'
}, {
	description: 'should remove "(Stream)" string',
	source: 'Track Title (Stream)',
	expected: 'Track Title'
}, {
	description: 'should remove live suffix',
	source: 'Track Title Live',
	expected: 'Track Title'
}, {
	description: 'should not remove "live" from string',
	source: 'Fully Alive',
	expected: 'Fully Alive'
}, {
	description: 'should remove (live) suffix',
	source: 'Track Title (Live)',
	expected: 'Track Title'
}, {
	description: 'should remove (live ...) suffix',
	source: 'Track Title (Live at somewhere)',
	expected: 'Track Title'
}, {
	description: 'should remove Full Album suffix',
	source: 'Track Title Full Album',
	expected: 'Track Title'
}, {
	description: 'should remove "| something" suffix',
	source: 'Track Title | Foo | Bar',
	expected: 'Track Title'
}, {
	description: 'should remove leading colon',
	source: ':Track Title',
	expected: 'Track Title'
}, {
	description: 'should remove leading semicolon',
	source: ';Track Title',
	expected: 'Track Title'
}, {
	description: 'should remove leading dash',
	source: '-Track Title',
	expected: 'Track Title'
}, {
	description: 'should remove leading double quote',
	source: '"Track Title',
	expected: 'Track Title'
}, {
	description: 'should remove trailing colon',
	source: 'Track Title:',
	expected: 'Track Title'
}, {
	description: 'should remove trailing semicolon',
	source: 'Track Title;',
	expected: 'Track Title'
}, {
	description: 'should remove trailing dash',
	source: 'Track Title-',
	expected: 'Track Title'
}, {
	description: 'should remove trailing double quote',
	source: 'Track Title"',
	expected: 'Track Title'
}, {
	description: 'should leave single quotes around joined',
	source: 'Track \'n\' Title',
	expected: 'Track \'n\' Title'
}, {
	description: 'should remove "(whatever 2/12/18)" string',
	source: 'Track Title (whatever 2/12/18)',
	expected: 'Track Title'
}];

/**
 * Test data for testing Remastered filter.
 * @type {Array}
 */
const REMASTERED_FILTER_RULES_TEST_DATA = [{
	description: 'should do nothing with clean string',
	source: 'Track Title',
	expected: 'Track Title'
}, {
	description: 'should remove "- Remastered" string',
	source: 'Track Title - Remastered',
	expected: 'Track Title '
}, {
	description: 'should remove "- Remastered YYYY" string',
	source: 'Track Title - Remastered 2015',
	expected: 'Track Title '
}, {
	description: 'should remove "(Remastered YYYY)" string',
	source: 'Track Title (Remastered 2009)',
	expected: 'Track Title '
}, {
	description: 'should remove "(Remaster YYYY)" string',
	source: 'Track Title (Remaster 2009)',
	expected: 'Track Title '
}, {
	description: 'should remove "[YYYY - Remaster]" string',
	source: 'Track Title [2011 - Remaster]',
	expected: 'Track Title '
}, {
	description: 'should remove "(YYYY - Remaster)" string',
	source: 'Track Title (2011 - Remaster)',
	expected: 'Track Title '
}, {
	description: 'should remove "(YYYY Remaster)" string',
	source: 'Track Title (2011 Remaster)',
	expected: 'Track Title '
}, {
	description: 'should remove "- YYYY - Remaster" string',
	source: 'Track Title - 2011 - Remaster',
	expected: 'Track Title '
}, {
	description: 'should remove "- YYYY Digital Remaster" string',
	source: 'Track Title - 2001 Digital Remaster',
	expected: 'Track Title '
}, {
	description: 'should remove "- YYYY Remastered Version" string',
	source: 'Track Title - 2011 Remastered Version',
	expected: 'Track Title '
}, {
	description: 'should remove "(Live / Remastered)" string',
	source: 'Track Title (Live / Remastered)',
	expected: 'Track Title '
}, {
	description: 'should remove "- Live / Remastered" string',
	source: 'Track Title - Live / Remastered',
	expected: 'Track Title '
}, {
	description: 'should remove "(Remastered)" string',
	source: 'Track Title (Remastered)',
	expected: 'Track Title '
}, {
	description: 'should remove "[Remastered]" string',
	source: 'Track Title [Remastered]',
	expected: 'Track Title '
}, {
	description: 'should remove "(YYYY Remastered Version)" string',
	source: 'Track Title (2014 Remastered Version)',
	expected: 'Track Title '
}, {
	description: 'should remove "[YYYY Remastered Version]" string',
	source: 'Track Title [2014 Remastered Version]',
	expected: 'Track Title '
}, {
	description: 'should remove "(YYYY Re-Mastered Digital Version)" string',
	source: 'Track Title (2009 Re-Mastered Digital Version)',
	expected: 'Track Title '
}, {
	description: 'should remove "(YYYY Remastered Digital Version)" string',
	source: 'Track Title (2009 Remastered Digital Version)',
	expected: 'Track Title '
}];

const LIVE_FILTER_RULES_TEST_DATA = [{
	description: 'should remove "Live" suffix',
	source: 'Track Title - Live',
	expected: 'Track Title '
}, {
	description: 'should remove "Live ..." suffix',
	source: 'Track Title - Live @ Moon',
	expected: 'Track Title '
}];

/**
 * Test data for testing Version filter.
 * @type {Array}
 */
const VERSION_FILTER_RULES_TEST_DATA = [{
	description: 'should do nothing with clean string',
	source: 'Track Title',
	expected: 'Track Title'
}, {
	description: 'should remove "(Album Version)" string',
	source: 'Track Title (Album Version)',
	expected: 'Track Title '
}, {
	description: 'should remove "[Album Version]" string',
	source: 'Track Title [Album Version]',
	expected: 'Track Title '
}, {
	description: 'should remove "(Rerecorded)" string',
	source: 'Track Title (Rerecorded)',
	expected: 'Track Title '
}, {
	description: 'should remove "[Rerecorded]" string',
	source: 'Track Title [Rerecorded]',
	expected: 'Track Title '
}, {
	description: 'should remove "(Re-recorded)" string',
	source: 'Track Title (Rerecorded)',
	expected: 'Track Title '
}, {
	description: 'should remove "[Re-recorded]" string',
	source: 'Track Title [Rerecorded]',
	expected: 'Track Title '
}, {
	description: 'should remove "(Single Version)" string',
	source: 'Track Title (Single Version)',
	expected: 'Track Title '
}, {
	description: 'should remove "(Edit)" string',
	source: 'Track Title (Edit)',
	expected: 'Track Title '
}, {
	description: 'should remove "- Mono Version" string',
	source: 'Track Title - Mono Version',
	expected: 'Track Title '
}, {
	description: 'should remove "- Stereo Version" string',
	source: 'Track Title - Stereo Version',
	expected: 'Track Title '
}, {
	description: 'should remove "(Deluxe Edition)" string',
	source: 'Album Title (Deluxe Edition)',
	expected: 'Album Title '
}];

/**
 * Test data for testing 'MetadataFilter.decodeHtmlEntities' function.
 * @type {Array}
 */
const DECODE_HTML_ENTITIES_TEST_DATA = [{
	description: 'should do nothing with clean string',
	source: 'Can\'t Kill Us',
	expected: 'Can\'t Kill Us'
}, {
	description: 'should decode HTML entity',
	source: 'Can&#039;t Kill Us',
	expected: 'Can\'t Kill Us'
}, {
	description: 'should decode HTML entity',
	source: 'Can&#x60;t Kill Us',
	expected: 'Can`t Kill Us'
}, {
	description: 'should decode ampersand symbol',
	source: 'Artist 1 &amp; Artist 2',
	expected: 'Artist 1 & Artist 2'
}, {
	description: 'should decode all HTML entities in string',
	source: 'Artist&#x60;s 1 &amp;&amp; Artist&#x60;s 2',
	expected: 'Artist`s 1 && Artist`s 2'
}, {
	description: 'should not decode invalid HTML entity',
	source: 'Artist 1 &#xzz; Artist 2',
	expected: 'Artist 1 &#xzz; Artist 2'
}];

/**
 * Test data for testing 'MetadataFilter.removeZeroWidth' function.
 * @type {Array}
 */
const REMOVE_ZERO_WIDTH_TEST_DATA = [{
	description: 'should do nothing with clean string',
	source: 'Track Metafield',
	expected: 'Track Metafield'
}, {
	description: 'should remove zero-width characters',
	source: 'Str\u200Ding\u200B',
	expected: 'String'
}, {
	description: 'should remove trailing zero-width characters',
	source: 'String\u200C',
	expected: 'String'
}, {
	description: 'should remove leading zero-width characters',
	source: '\u200DString',
	expected: 'String'
}];

const SUFFIX_FILTER_RULES_TEST_DATA = [{
	description: 'should do nothing with correct suffix',
	source: 'Track Title (Artist Remix)',
	expected: 'Track Title (Artist Remix)'
}, {
	description: 'should do nothing with correct suffix',
	source: 'Track Title (Remix)',
	expected: 'Track Title (Remix)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track Title - Artist Remix',
	expected: 'Track Title (Artist Remix)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track Title - Remix',
	expected: 'Track Title (Remix)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Remix',
	expected: 'Track A (Remix)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Group X dub',
	expected: 'Track A (Group X dub)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Group X edit',
	expected: 'Track A (Group X edit)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Group X mix',
	expected: 'Track A (Group X mix)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Group X Remix Edit',
	expected: 'Track A (Group X Remix Edit)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - VIP',
	expected: 'Track A (VIP)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Radio Edit',
	expected: 'Track A (Radio Edit)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - X Radio Edit',
	expected: 'Track A (X Radio Edit)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Short Version',
	expected: 'Track A (Short Version)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Original Mix',
	expected: 'Track A (Original Mix)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Radio Version',
	expected: 'Track A (Radio Version)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Group X Radio Mix',
	expected: 'Track A (Group X Radio Mix)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Continuous Mix',
	expected: 'Track A (Continuous Mix)'
}, {
	description: 'should replace invalid suffix',
	source: 'Track A - Factoria Vocal Mix',
	expected: 'Track A (Factoria Vocal Mix)'
}];

const CLEAN_EXPLICIT_FILTER_RULES_TEST_DATA = [{
	description: 'should remove [Explicit] suffix',
	source: 'Track [Explicit]',
	expected: 'Track'
}, {
	description: 'should remove (Explicit) suffix',
	source: 'Track (Explicit)',
	expected: 'Track'
}, {
	description: 'should remove [Clean] suffix',
	source: 'Track [Clean]',
	expected: 'Track'
}, {
	description: 'should remove (Clean) suffix',
	source: 'Track (Clean)',
	expected: 'Track'
}];

const ALBUM_ARTIST_FROM_ARTIST_FILTER_RULES_TEST_DATA = [{
	description: 'should remove featured artist from suffix',
	source: 'Artist A feat. Artist B',
	expected: 'Artist A'
}, {
	description: 'should remove featured artist from suffix',
	source: 'Artist A feat. Artist B, Artist C',
	expected: 'Artist A'
}, {
	description: 'should remove featured artist from suffix',
	source: 'Artist A feat. Artist B, Artist C & Artist D',
	expected: 'Artist A'
}, {
	description: 'should return original text if feat. not present',
	source: 'Artist A',
	expected: 'Artist A'
}];

const NORMALIZE_FEATURE_TEXT_FILTER_RULES_TEST_DATA = [{
	description: 'should transform [feat. Artist B] to feat. Artist B',
	source: 'Artist A [feat. Artist B]',
	expected: 'Artist A feat. Artist B'
}, {
	description: 'should not transform if no match for [feat. Artist B]',
	source: 'Artist A',
	expected: 'Artist A'
}, {
	description: 'should not transform if no match for [feat. Artist B]',
	source: 'Artist A feat. Artist B',
	expected: 'Artist A feat. Artist B'
}];

const FEATURE_FILTER_RULES_TEST_DATA = [{
	description: 'should remove featured artist from suffix',
	source: 'Artist A [feat. Artist B]',
	expected: 'Artist A'
}, {
	description: 'should remove featured artist from suffix',
	source: 'Artist A (feat. Artist B)',
	expected: 'Artist A'
}];

/**
 * Filters data is an array of objects. Each object must contain
 * four fields: 'description', 'filter', 'fields' and 'testData'.
 *
 * 'description' is a test description used by 'it' function.
 * 'filter' is an filter instance.
 * 'fields' is an array of song fields to be filtered.
 * 'testData' contains test data used to test filter.
 */
const FILTERS_TEST_DATA = [{
	description: 'Base filter',
	filterFunc: shouldNotBeCalled,
	fields: MetadataFilter.ALL_FIELDS,
	testData: FILTER_NULL_DATA,
}, {
	description: 'Default filter',
	filter: MetadataFilter.getDefaultFilter(),
	fields: MetadataFilter.ALL_FIELDS,
	testData: DEFAULT_TEST_DATA,
}, {
	description: 'removeZeroWidth',
	filterFunc: MetadataFilter.removeZeroWidth,
	fields: MetadataFilter.ALL_FIELDS,
	testData: REMOVE_ZERO_WIDTH_TEST_DATA,
}, {
	description: 'decodeHtmlEntities',
	filterFunc: MetadataFilter.decodeHtmlEntities,
	fields: MetadataFilter.ALL_FIELDS,
	testData: DECODE_HTML_ENTITIES_TEST_DATA,
}, {
	description: 'Youtube filter function',
	filterFunc: MetadataFilter.youtube,
	fields: ['track'],
	testData: YOUTUBE_FILTER_RULES_TEST_DATA,
}, {
	description: 'Remastered filter function',
	filterFunc: MetadataFilter.removeRemastered,
	fields: ['track', 'album'],
	testData: REMASTERED_FILTER_RULES_TEST_DATA,
}, {
	description: 'Version filter function',
	filterFunc: MetadataFilter.removeVersion,
	fields: ['track', 'album'],
	testData: VERSION_FILTER_RULES_TEST_DATA,
}, {
	description: 'Suffix filter function',
	filterFunc: MetadataFilter.fixTrackSuffix,
	fields: ['track'],
	testData: SUFFIX_FILTER_RULES_TEST_DATA,
}, {
	description: 'Live filter function',
	filterFunc: MetadataFilter.removeLive,
	fields: ['track'],
	testData: LIVE_FILTER_RULES_TEST_DATA,
}, {
	description: 'Clean/Explicit filter function',
	filterFunc: MetadataFilter.removeCleanExplicit,
	fields: ['track'],
	testData: CLEAN_EXPLICIT_FILTER_RULES_TEST_DATA,
}, {
	description: 'Album Artist from Artist filter function',
	filterFunc: MetadataFilter.albumArtistFromArtist,
	fields: ['albumArtist'],
	testData: ALBUM_ARTIST_FROM_ARTIST_FILTER_RULES_TEST_DATA,
}, {
	description: 'Feature filter function',
	filterFunc: MetadataFilter.removeFeature,
	fields: ['track'],
	testData: FEATURE_FILTER_RULES_TEST_DATA,
}, {
	description: 'Normalize feature text filter function',
	filterFunc: MetadataFilter.normalizeFeature,
	fields: ['albumArtist'],
	testData: NORMALIZE_FEATURE_TEXT_FILTER_RULES_TEST_DATA,
}];

/**
 * Test filter object.
 * @param  {Object} filter MetadataFilter instance
 * @param  {Array} fields Array of fields to be filtered
 * @param  {Array} testData Array of test data
 */
function testFilter(filter, fields, testData) {
	for (const field of fields) {
		describe(`${field} field`, () => {
			for (const data of testData) {
				const { description, source, expected } = data;
				const actual = filter.filterField(field, source);
				it(description, () => {
					expect(expected).to.be.equal(actual);
				});
			}
		});
	}
}

/**
 * Test extended filter object.
 * @param  {Object} filter MetadataFilter instance
 * @param  {Array} fn Spy functions should be called
 */
function testMultipleFilters(filter, ...fn) {
	for (const field of MetadataFilter.ALL_FIELDS) {
		describe(`${field} field`, () => {
			filter.filterField(field, 'Test');

			for (const f of fn) {
				it('should call filter function', () => {
					expect(f).to.have.been.called();
				});
			}
		});
	}
}

/**
 * Test extended filter.
 */
function testExtendedFilter() {
	const fn1 = chai.spy();
	const fn2 = chai.spy();

	const filter1 = new MetadataFilter({ all: fn1 });
	const filter2 = new MetadataFilter({ all: fn2 });

	const filter = filter1.extend(filter2);

	testMultipleFilters(filter, fn1, fn2);
}

/**
 * Test extended filter.
 */
function testAppendFilterSet() {
	const fn1 = chai.spy();
	const fn2 = chai.spy();

	const filter1 = new MetadataFilter({ all: fn1 });
	const filterSet2 = { all: fn2 };

	const filter = filter1.append(filterSet2);

	testMultipleFilters(filter, fn1, fn2);
}

/**
 * Function that should not be called.
 * @throws {Error} if is called
 */
function shouldNotBeCalled() {
	throw new Error('This function should not be called');
}

/**
 * Test filters defined in `FILTERS_TEST_DATA`.
 */
function testFilters() {
	for (const data of FILTERS_TEST_DATA) {
		let { filter } = data;
		const { description, filterFunc, fields, testData } = data;

		if (!filter && filterFunc) {
			filter = createFilterFromFunc(fields, filterFunc);
		}

		describe(description, () => {
			testFilter(filter, fields, testData);
		});
	}
}

function testInvalidFilter() {
	it('should throw error if filter set is not specified', () => {
		expect(() => new MetadataFilter(null)).to.throw();
	});

	it('should throw error if filter set is invalid', () => {
		expect(() => new MetadataFilter({ all: 1 })).to.throw();
	});

	it('should throw error if filter set as array is invalid', () => {
		expect(() => new MetadataFilter({ all: [1, 2] })).to.throw();
	});

	it('should throw error if filter set constains invalid field', () => {
		expect(() => new MetadataFilter({ foo: () => 'bar' })).to.throw();
	});
}

/**
 * Run all tests.
 */
function runTests() {
	testFilters();

	describe('Extended filter', () => {
		testExtendedFilter();
	});

	describe('Append filter set', () => {
		testAppendFilterSet();
	});

	describe('Invalid filter', () => {
		testInvalidFilter();
	});
}

function createFilterFromFunc(fields, filterFunc) {
	const filterSet = {};
	for (const field of fields) {
		filterSet[field] = filterFunc;
	}

	return new MetadataFilter(filterSet);
}

runTests();
