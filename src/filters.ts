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
 * Get a filter with YouTube-related filter functions.
 *
 * @return Filter object
 * @deprecated Use `createYouTubeFilter` function
 */
/* istanbul ignore next */
export function getYoutubeFilter(): MetadataFilter {
	return createYouTubeFilter();
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
 * Get a filter that removes "Remastered"-like suffixes.
 *
 * @return Filter object
 * @deprecated Use `createRemasteredFilter` function
 */
/* istanbul ignore next */
export function getRemasteredFilter(): MetadataFilter {
	return createRemasteredFilter();
}

/**
 * Get a filter with Spotify-related filter functions.
 *
 * @return Filter object
 */
export function createSpotifyFilter(): MetadataFilter {
	return new MetadataFilter({
		track: [removeRemastered, removeParody, fixTrackSuffix, removeLive],
		album: [removeRemastered, fixTrackSuffix, removeLive, removeReissue],
	});
}

/**
 * Get a filter with Spotify-related filter functions.
 *
 * @return Filter object
 * @deprecated Use `createSpotifyFilter` function
 */
/* istanbul ignore next */
export function getSpotifyFilter(): MetadataFilter {
	return createSpotifyFilter();
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
 * Get a filter with Amazon-related filter functions.
 *
 * @return Filter object
 * @deprecated Use `createAmazonFilter` function
 */
/* istanbul ignore next */
export function getAmazonFilter(): MetadataFilter {
	return createAmazonFilter();
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

/**
 * Get a filter with Tidal-related filter functions.
 *
 * @return Filter object
 * @deprecated Use `createTidalFilter` function
 */
/* istanbul ignore next */
export function getTidalFilter(): MetadataFilter {
	return createTidalFilter();
}
