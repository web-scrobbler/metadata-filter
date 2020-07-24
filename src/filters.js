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
 * Predefined filters.
 */

/**
 * Get a filter with YouTube-related filter functions.
 * @return {MetadataFilter} Filter object
 */
export function getYoutubeFilter() {
	return new MetadataFilter({ track: youtube });
}

/**
 * Get a filter that removes "Remastered"-like suffixes.
 * @return {MetadataFilter} Filter object
 */
export function getRemasteredFilter() {
	return new MetadataFilter({
		track: removeRemastered,
		album: removeRemastered,
	});
}

/**
 * Get a filter with Spotify-related filter functions.
 * @return {MetadataFilter} Filter object
 */
export function getSpotifyFilter() {
	return new MetadataFilter({
		track: [removeRemastered, fixTrackSuffix, removeLive],
		album: [removeRemastered, fixTrackSuffix, removeLive],
	});
}

/**
 * Get a filter with Amazon-related filter functions.
 * @return {MetadataFilter} Filter object
 */
export function getAmazonFilter() {
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
 * @return {MetadataFilter} Filter object
 */
export function getTidalFilter() {
	return new MetadataFilter({
		track: [removeRemastered, fixTrackSuffix, removeVersion, removeLive],
		album: [removeRemastered, fixTrackSuffix, removeVersion, removeLive],
	});
}
