# Metadata Filter [![Test][WorkflowBadge]][Workflow] [![NPM][NpmBadge]][Npm] [![Codacy][CodacyBadge]][Codacy] [![Coverage][CodacyCovBadge]][Codacy]

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

```javascript
const MetadataFilter = require('metadata-filter');

console.log(MetadataFilter.removeRemastered('Jane Doe (Remastered)')); // Jane Doe
console.log(MetadataFilter.removeVersion('Get Lucky (Album Version)')); // Get Lucky
console.log(MetadataFilter.youtube('Car Bomb - Scattered Sprites (Official Music Video)')); // Car Bomb - Scattered Sprites
```

See [src/functions.js](src/functions.js) for more details.

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
const filter = MetadataFilter.createFilter(filterSet);
console.log(filter.filterField('album', 'Nevermind (Remastered)')) // Nevermind
console.log(filter.filterField('track', 'In Bloom - Nevermind Version')) // In Bloom
```

### Predefined Filters
There are also predefined filters available for easy access. For example,
the above filter set can be acquired using `getSpotifyFilter()`:

```javascript
const filter = MetadataFilter.getSpotifyFilter();
```

See [src/filters.js](src/filters.js) for more details.

### Extending Filters
Finally, you can take existing MetadataFilter objects and extend them with another filter.
This is done by providing the `.extend()` method with another MetadataFilter object.

```javascript
let filter = MetadataFilter.getSpotifyFilter();

filter.extend(MetadataFilter.getAmazonFilter());
// This would also work: filter.extend(MetadataFilter.createFilter(filterSet));

console.log(filter.filterField('track', 'Seasons in the Abyss (Album Version)')); // Seasons in the Abyss
```

As an alternative, you can use the `.append()` method to apply a filter set to
the existing MetadataFilter.
```javascript
let filter = MetadataFilter.createFilter({ track: filterTrack });

filter.append({ artist: filterArtist });
```

Since these methods return a MetadataFilter instance, you can chain method calls.
```javascript

let filter = MetadataFilter.createFilter({ track: filterTrack }).append({ artist: filterArtist });
```

## Development

```sh
# Install dev dependencies
> npm install

# Build the dist file
> npm run build

# Lint source files
> npm run lint

# Run tests
> npm test

# Run tests with a coverage report
> npm run test-with-coverage
```

## License
Licensed under the [MIT License](LICENSE.md).

<!-- Badges -->
[WorkflowBadge]: https://github.com/web-scrobbler/metadata-filter/workflows/Test/badge.svg
[NpmBadge]: https://img.shields.io/npm/v/metadata-filter
[CodacyBadge]: https://api.codacy.com/project/badge/Grade/100b50dc21664ce6bc591c28b73d6892
[CodacyCovBadge]: https://api.codacy.com/project/badge/Coverage/100b50dc21664ce6bc591c28b73d6892

<!-- Related pages -->
[Codacy]: https://app.codacy.com/gh/web-scrobbler/metadata-filter/dashboard
[Npm]: https://www.npmjs.com/package/metadata-filter
[Workflow]: https://github.com/web-scrobbler/metadata-filter/actions?query=workflow%3ATest
