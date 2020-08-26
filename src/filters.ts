import { MetadataFilter } from './filter';
import {
	albumArtistFromArtist,
	decodeHtmlEntities,
	fixTrackSuffix,
	normalizeFeature,
	removeCleanExplicit,
	removeFeature,
	removeLive,
	removeRemastered,
	removeVersion,
	youtube,
} from './functions';

/**
 * Get a filter with YouTube-related filter functions.
 *
 * @return Filter object
 */
export function getYoutubeFilter(): MetadataFilter {
	return new MetadataFilter({ track: youtube });
}

/**
 * Get a filter that removes "Remastered"-like suffixes.
 *
 * @return Filter object
 */
export function getRemasteredFilter(): MetadataFilter {
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
export function getSpotifyFilter(): MetadataFilter {
	return new MetadataFilter({
		track: [removeRemastered, fixTrackSuffix, removeLive],
		album: [removeRemastered, fixTrackSuffix, removeLive],
	});
}

/**
 * Get a filter with Amazon-related filter functions.
 *
 * @return Filter object
 */
export function getAmazonFilter(): MetadataFilter {
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
export function getTidalFilter(): MetadataFilter {
	return new MetadataFilter({
		track: [removeRemastered, fixTrackSuffix, removeVersion, removeLive],
		album: [removeRemastered, fixTrackSuffix, removeVersion, removeLive],
	});
}
