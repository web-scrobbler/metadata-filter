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
You can also to use multiple filters on a string at once by creating a `MetadataFilter` object which combines multiple functions from above, or by using one of the pre-existing [filter objects](#pre-defined-filter-sets).

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
};
```

Then, construct a MetadataFilter using this filter set.
```javascript
const filter = new MetadataFilter(filterSet);
console.log(filter.filterField('album', 'Nevermind (Remastered)')) // Nevermind
console.log(filter.filterField('track', 'In Bloom - Nevermind Version')) // In Bloom
```

### Pre-defined Filter Sets
There are also pre-defined filter sets available for easy access. For example, the above filter set can be acquired using `getSpotifyFilter()`:

```javascript
const filter = MetadataFilter.getSpotifyFilter();
```

### Expanding Filter Sets
Finally, you can take existing MetadataFilter objects and expand them with more functions:

```javascript
let filter = MetadataFilter.getSpotifyFilter();
filter = filter.extend(MetadataFilter.getAmazonFilter());
console.log(filter.filterField('track', 'Seasons in the Abyss (Album Version)')); // Seasons in the Abyss

```

[WorkflowBadge]: https://github.com/web-scrobbler/metadata-filter/workflows/Test/badge.svg
[NpmBadge]: https://img.shields.io/npm/v/metadata-filter