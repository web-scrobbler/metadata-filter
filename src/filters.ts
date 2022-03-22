import { MetadataFilter } from './filter';
import {
	albumArtistFromArtist,
	decodeHtmlEntities,
	fixTrackSuffix,
	normalizeFeature,
	removeCleanExplicit,
	removeFeature,
	removeLive,
	removeParody,
	removeReissue,
	removeRemastered,
	removeVersion,
	youtube,
} from './functions';

/**
 * Get a filter with YouTube-related filter functions.
 *
 * @return Filter object
 */
export function createYouTubeFilter(): MetadataFilter {
	return new MetadataFilter({ track: youtube });
}

/**
 * Get a filter that removes "Remastered"-like suffixes.
 *
 * @return Filter object
 */
export function createRemasteredFilter(): MetadataFilter {
	return new MetadataFilter({
		track: removeRemastered,
		album: removeRemastered,
	});
}

/**
 * Get a filter with Spotify-related filter functions.
 *
 * @return Filter object
 */
export function createSpotifyFilter(): MetadataFilter {
	return new MetadataFilter({
		track: [removeRemastered, removeParody, fixTrackSuffix, removeLive],
		album: [
			removeRemastered,
			fixTrackSuffix,
			removeLive,
			removeReissue,
			removeVersion,
		],
	});
}

/**
 * Get a filter with Amazon-related filter functions.
 *
 * @return Filter object
 */
export function createAmazonFilter(): MetadataFilter {
	return new MetadataFilter({
		artist: [normalizeFeature],
		track: [
			removeCleanExplicit,
			removeFeature,
			removeRemastered,
			fixTrackSuffix,
			removeVersion,
			removeLive,
		],
		album: [
			decodeHtmlEntities,
			removeCleanExplicit,
			removeRemastered,
			fixTrackSuffix,
			removeVersion,
			removeLive,
		],
		albumArtist: [normalizeFeature, albumArtistFromArtist],
	});
}

/**
 * Get a filter with Tidal-related filter functions.
 *
 * @return Filter object
 */
export function createTidalFilter(): MetadataFilter {
	return new MetadataFilter({
		track: [removeRemastered, fixTrackSuffix, removeVersion, removeLive],
		album: [removeRemastered, fixTrackSuffix, removeVersion, removeLive],
	});
}
