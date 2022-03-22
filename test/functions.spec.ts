import {
	FilterFunctionFixture,
	describeAndTestFilterFunction,
} from './helper/test-function';
import { loadFixtureFile } from './helper/load-fixture-file';
import { validateFixtures } from './helper/validate-fixtures';

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
	fixVariousArtists,
} from '../src';

const functionsToTest = {
	'album-artist-from-artist': albumArtistFromArtist,
	'decode-html-entities': decodeHtmlEntities,
	'fix-track-suffix': fixTrackSuffix,
	'fix-various-artists': fixVariousArtists,
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

const requiredFixtureProperties: ReadonlyArray<keyof FilterFunctionFixture> = [
	'description',
	'funcParameter',
	'expectedValue',
];

for (const [fixtureId, func] of Object.entries(functionsToTest)) {
	const fixtures = loadFixtureFile<FilterFunctionFixture>(
		`functions/${fixtureId}`
	);
	validateFixtures(fixtureId, fixtures, requiredFixtureProperties);

	describeAndTestFilterFunction(func, fixtures);
}
