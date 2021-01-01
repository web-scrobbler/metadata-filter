import { FilterFunctionTestData, testFilterFunction } from './helper/test-function';
import { loadFixtureFile } from './helper/util';

import {
	albumArtistFromArtist,
	decodeHtmlEntities,
	fixTrackSuffix,
	normalizeFeature,
	removeZeroWidth,
	replaceNbsp,
	removeCleanExplicit,
	removeLive,
	removeRemastered,
	removeVersion,
	removeParody,
	removeFeature,
	youtube,
} from '../src/functions';

function loadFunctionFixtureFile(functionId: string): FilterFunctionTestData[] {
	const fixtures = loadFixtureFile<FilterFunctionTestData>(`functions/${functionId}`);

	for (const fixture of fixtures) {
		if (typeof fixture.description !== 'string') {
			throw new Error(`Missing description in test case for '${functionId}'`);
		}
		if (typeof fixture.funcParameter !== 'string') {
			throw new Error(`Missing funcParameter in test case for '${functionId}'`);
		}
		if (typeof fixture.expectedValue !== 'string') {
			throw new Error(`Missing expectedValue in test case for '${functionId}'`);
		}
	}

	return fixtures;
}

const functionsToTest = {
	'album-artist-from-artist': albumArtistFromArtist,
	'decode-html-entities': decodeHtmlEntities,
	'fix-track-suffix': fixTrackSuffix,
	'normalize-feature': normalizeFeature,
	'remove-zero-width': removeZeroWidth,
	'replace-nbsp': replaceNbsp,
	'remove-clean-explicit': removeCleanExplicit,
	'remove-live': removeLive,
	'remove-remastered': removeRemastered,
	'remove-version': removeVersion,
	'remove-parody': removeParody,
	'remove-feature': removeFeature,
	'youtube': youtube,
};

for (const [functionId, func] of Object.entries(functionsToTest)) {
	testFilterFunction(func, loadFunctionFixtureFile(functionId));
}
