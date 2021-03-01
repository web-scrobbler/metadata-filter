import {
	FilterFunctionFixture,
	describeAndTestFilterFunction,
} from './helper/test-function';
import { loadFixtureFile } from './helper/load-fixture-file';

import {
	albumArtistFromArtist,
	decodeHtmlEntities,
	fixTrackSuffix,
	normalizeFeature,
	removeZeroWidth,
	replaceNbsp,
	removeCleanExplicit,
	removeLive,
	removeReissue,
	removeRemastered,
	removeVersion,
	removeParody,
	removeFeature,
	youtube,
} from '../src';

const functionsToTest = {
	'album-artist-from-artist': albumArtistFromArtist,
	'decode-html-entities': decodeHtmlEntities,
	'fix-track-suffix': fixTrackSuffix,
	'normalize-feature': normalizeFeature,
	'remove-zero-width': removeZeroWidth,
	'replace-nbsp': replaceNbsp,
	'remove-clean-explicit': removeCleanExplicit,
	'remove-live': removeLive,
	'remove-reissue': removeReissue,
	'remove-remastered': removeRemastered,
	'remove-version': removeVersion,
	'remove-parody': removeParody,
	'remove-feature': removeFeature,
	youtube: youtube,
};

for (const [functionId, func] of Object.entries(functionsToTest)) {
	describeAndTestFilterFunction(func, loadFunctionFixtureFile(functionId));
}

function loadFunctionFixtureFile(functionId: string): FilterFunctionFixture[] {
	const fixtures = loadFixtureFile<FilterFunctionFixture>(
		`functions/${functionId}`
	);

	for (const fixture of fixtures) {
		if (typeof fixture.description !== 'string') {
			throw new Error(
				`Missing description in test case for '${functionId}'`
			);
		}
		if (typeof fixture.funcParameter !== 'string') {
			throw new Error(
				`Missing funcParameter in test case for '${functionId}'`
			);
		}
		if (typeof fixture.expectedValue !== 'string') {
			throw new Error(
				`Missing expectedValue in test case for '${functionId}'`
			);
		}
	}

	return fixtures;
}
