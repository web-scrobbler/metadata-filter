# Metadata Filter ![Test][WorkflowBadge] ![NPM][NpmBadge]

A module for cleaning up artist, album, and song names.

## Usage

### Single Filters
You can call MetadataFilter's static filter functions for basic, one-line filter functionality.
Functions available: `youtube`, `removeRemastered`, `removeVersion`, `removeLive`, `removeCleanExplicit`, `albumArtistFromArtist`, `normalizeFeature`, `removeFeature`, `fixTrackSuffix`, `filterWithFilterRules`

```javascript
const MetadataFilter = require('metadata-filter');

console.log(MetadataFilter.youtube('Car Bomb - Scattered Sprites (Official Music Video)')); // Car Bomb - Scattered Sprites
console.log(MetadataFilter.removeRemastered('Jane Doe (Remastered)')); // Jane Doe
console.log(MetadataFilter.removeVersion('Daft Punk - Get Lucky (Album Version)')); // Daft Punk - Get Lucky
```

### Multiple Filters
You can also to use multiple filters on a string at once by creating a `MetadataFilter` object which combines multiple functions from above, or by using one of the pre-existing [filter objects]().

First, create a filter set. This is a set of rules for artists, albums, tracks, and albumArtists.
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
}
```

Then, construct a MetadataFilter using this filter set.
```javascript
const filter = new MetadataFilter(filterSet);
console.log(filter.filterText('album', 'Nevermind (Remastered)')) // Nevermind
console.log(filter.filterText('track', 'In Bloom - Nevermind Version')) // In Bloom
```

There are also pre-defined filter sets available for easy access. For example, the above filter set can be acquired using `getSpotifyFilter()`:

```javascript
const filter = MetadataFilter.getSpotifyFilter();
```

Finally, you can take existing filters and expand them with more functions:

```javascript
let filter = MetadataFilter.getSpotifyFilter();
filter = filter.extend(getAmazonFilter());
console.log(filter.filterText('track', 'Seasons in the Abyss (Album Version)')); // Seasons in the Abyss

```

[WorkflowBadge]: https://github.com/web-scrobbler/metadata-filter/workflows/Test/badge.svg
[NpmBadge]: https://img.shields.io/npm/v/metadata-filter