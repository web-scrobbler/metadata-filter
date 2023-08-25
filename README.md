# metadata-filter [![Test][workflow-badge]][workflow] [![NPM][npm-badge]][npm] [![Codacy][codacy-badge]][codacy] [![Coverage][coverage-badge]][codacy]

A module for cleaning up artist, album, and song names.

## Installation

### Install using npm

```
npm i @web-scrobbler/metadata-filter
```

### Include via CDN

```html
<script src="https://unpkg.com/@web-scrobbler/metadata-filter@latest/dist/filter.min.js"></script>
```

## Usage

If you want to use this module in a project which is built with a bundler (e.g.
webpack), you can use CommonJS-like or ES6 imports:

```javascript
// CommonJS style
const MetadataFilter = require('@web-scrobbler/metadata-filter');

// ES6 style
import * as MetadataFilter from '@web-scrobbler/metadata-filter';

MetadataFilter.removeRemastered(yourInput);
```

In a browser you can access to the module by using the global `MetadataFilter`
object:

```html
<!-- Assume you have `metadata-filter` module included with `script` tag -->
<script lang="javascript">
	MetadataFilter.removeRemastered(yourInput);
</script>
```

### Single filter functions

You can call filter functions for basic, one-line filter functionality.
These filter functions are intended to be used on a single field, such as
an artist, album, or track.

However, it is possible (not officially supported) to use some of these on
combined fields ("Artist - Song", "Artist - Album"), as in the third example below.

```javascript
console.log(MetadataFilter.removeRemastered('Jane Doe (Remastered)')); // Jane Doe
console.log(MetadataFilter.removeVersion('Get Lucky (Album Version)')); // Get Lucky
console.log(
	MetadataFilter.youtube(
		'Car Bomb - Scattered Sprites (Official Music Video)'
	)
); // Car Bomb - Scattered Sprites
```

See [src/functions.ts](src/functions.ts) for more details.

### Combine filter functions

You can also use multiple filter functions on a string at once by creating a
`MetadataFilter` object which combines multiple functions from above,
or by using one of the pre-existing [filter objects](#predefined-filters).

First, create a filter set. This is a set of filter functions for different
fields.

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

Then, construct a `MetadataFilter` using this filter set.

```javascript
const filter = MetadataFilter.createFilter(filterSet);
console.log(filter.filterField('album', 'Nevermind (Remastered)')); // Nevermind
console.log(filter.filterField('track', 'In Bloom - Nevermind Version')); // In Bloom (Nevermind Version)
```

### Predefined filters

There are also predefined filters available for easy access. For example,
the above filter set can be acquired using `createSpotifyFilter()` function:

```javascript
const filter = MetadataFilter.createSpotifyFilter();
```

See [src/filters.ts](src/filters.ts) for more details.

### Extending filters

Finally, you can take existing `MetadataFilter` objects and extend them with another filter.
This is done by providing the `.extend()` method with another `MetadataFilter` object.

```javascript
const filter = MetadataFilter.createSpotifyFilter();

filter.extend(MetadataFilter.createAmazonFilter());
// This would also work: filter.extend(MetadataFilter.createFilter(filterSet));

console.log(
	filter.filterField('track', 'Seasons in the Abyss (Album Version)')
); // Seasons in the Abyss
```

As an alternative, you can use the `.append()` method to apply a filter set to
an existing `MetadataFilter` object.

```javascript
const filter = MetadataFilter.createFilter({ track: filterTrack });

filter.append({ artist: filterArtist });
```

Since these methods return a `MetadataFilter` instance, you can chain method calls.

```javascript
const filter = MetadataFilter.createFilter({ track: filterTrack }).append({
	artist: filterArtist,
});
```

## Development

```sh
# Install dev dependencies
> npm install

# Build the dist file
> npm run build

# Format files
> npm run format

# Lint source files
> npm run lint

# Run tests
> npm test

# Run tests with a coverage report
> npm run test-with-coverage
```

## See also

-   [music-metadata-filter] - Python implementation of this module

## License

Licensed under the [MIT License](LICENSE.md).

<!-- Badges -->

[workflow-badge]: https://img.shields.io/github/actions/workflow/status/web-scrobbler/metadata-filter/test.yml
[npm-badge]: https://img.shields.io/npm/v/@web-scrobbler/metadata-filter
[codacy-badge]: https://img.shields.io/codacy/grade/100b50dc21664ce6bc591c28b73d6892
[coverage-badge]: https://img.shields.io/codacy/coverage/100b50dc21664ce6bc591c28b73d6892

<!-- Related pages -->

[codacy]: https://app.codacy.com/gh/web-scrobbler/metadata-filter/dashboard
[npm]: https://www.npmjs.com/package/@web-scrobbler/metadata-filter
[workflow]: https://github.com/web-scrobbler/metadata-filter/actions/workflows/test.yml

<!-- Related projects -->

[music-metadata-filter]: https://github.com/djmattyg007/music-metadata-filter
