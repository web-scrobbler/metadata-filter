# Metadata Filter ![Test][WorkflowBadge] ![NPM][NpmBadge] [![Codacy Badge][CodacyBadge]][Codacy] [![Codacy Coverage Badge][CodacyCoverageBadge]][Codacy]

A module for cleaning up artist, album, and song names.

## Installation
```
npm i metadata-filter
```

## Usage

### Single Filter Functions
You can call MetadataFilter's static filter functions for basic, one-line filter
functionality. These filter functions are intended to be used on a single field,
such as an artist, album, or track.

However, it is possible (not officially supported) to use some of these on
combined fields ("Artist - Song", "Artist - Album"), as in the third example below.

These functions are all described in the [API Reference](#api-reference).

```javascript
const MetadataFilter = require('metadata-filter');

console.log(MetadataFilter.removeRemastered('Jane Doe (Remastered)')); // Jane Doe
console.log(MetadataFilter.removeVersion('Get Lucky (Album Version)')); // Get Lucky
console.log(MetadataFilter.youtube('Car Bomb - Scattered Sprites (Official Music Video)')); // Car Bomb - Scattered Sprites
```

### Multiple Filters
You can also to use multiple filters on a string at once by creating a
`MetadataFilter` object which combines multiple functions from above,
or by using one of the pre-existing [filter objects](#predefined-filters).

First, create a filter set. This is a set of rules for artists, albums, tracks,
and albumArtists.

```javascript
const filterSet = {
  track: [
    MetadataFilter.removeRemastered,
    MetadataFilter.fixTrackSuffix,
    MetadataFilter.removeLive,
  ],
  album: [
    MetadataFilter.removeRemastered,
    MetadataFilter.fixTrackSuffix,
    MetadataFilter.removeLive,
  ],
};
```

Then, construct a MetadataFilter using this filter set.
```javascript
const filter = new MetadataFilter(filterSet);
console.log(filter.filterField('album', 'Nevermind (Remastered)')) // Nevermind
console.log(filter.filterField('track', 'In Bloom - Nevermind Version')) // In Bloom
```

### Predefined Filters
There are also predefined filter sets available for easy access. For example,
the above filter set can be acquired using `getSpotifyFilter()`:

```javascript
const filter = MetadataFilter.getSpotifyFilter();
```

These are all documented in the [API Reference](#filter-functions) below.

### Expanding Filters
Finally, you can take existing MetadataFilter objects and expand them with more functions.
This is done by providing the `.extend()` function with another MetadataFilter object.

```javascript
let filter = MetadataFilter.getSpotifyFilter();

filter = filter.extend(MetadataFilter.getAmazonFilter());
// This would also work: filter.extend(new MetadataFilter(filterSet));

console.log(filter.filterField('track', 'Seasons in the Abyss (Album Version)')); // Seasons in the Abyss
```

## API Reference

### Filter Functions
```
albumArtistFromArtist: Generate Album Artist from Artist when "feat. Artist B" is present.
fixTrackSuffix: Replace "Title - X Remix" suffix with "Title (X Remix) and similar".
normalizeFeature: Generate normalized "feat. Artist B" text from [feat. Artist B] style.
removeCleanExplicit: Remove "Explicit" and "Clean"-like strings from the text.
removeFeature: Remove "feat"-like strings from the text.
removeLive: Remove "Live..."-like strings from the text.
removeRemastered: Remove "Remastered..."-like strings from the text.
removeVersion: Remove "(Single|Album|Mono version}"-like strings from the text.
youtube: Remove Youtube-related garbage from the text (e.g. "HD", "Official Video").
```

### Predefined Filters
```
getAmazonFilter: Get a filter with Amazon-related filter functions.
getDefaultFilter: Get a filter that performs a basic cleanup (trim and remove NBSPs).
getRemasteredFilter: Get a filter that removes "Remastered"-like suffixes.
getSpotifyFilter: Get a filter with Spotify-related filter functions.
getTidalFilter: Get a filter with Tidal-related filter functions.
getYoutubeFilter: Get a filter with Spotify-related filter functions.
```

## License
See the [License file](LICENSE.md).

<!-- Badges -->
[WorkflowBadge]: https://github.com/web-scrobbler/metadata-filter/workflows/Test/badge.svg
[NpmBadge]: https://img.shields.io/npm/v/metadata-filter
[CodacyBadge]: https://api.codacy.com/project/badge/Grade/100b50dc21664ce6bc591c28b73d6892
[CodacyCoverageBadge]: https://api.codacy.com/project/badge/Coverage/100b50dc21664ce6bc591c28b73d6892

<!-- Related pages -->
[Codacy]: https://app.codacy.com/gh/web-scrobbler/metadata-filter/dashboard
