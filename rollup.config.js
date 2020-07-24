import banner from 'rollup-plugin-banner';
import { terser } from 'rollup-plugin-terser';

const bannerText = `metadata-filter v<%= pkg.version %>
(c) Web Scrobbler MetadataFilter Team
Licensed under the MIT License (https://github.com/web-scrobbler/metadata-filter/blob/master/LICENSE.md)`;

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/filter.js',
		format: 'umd',
		name: 'MetadataFilter',
	},
	plugins: [terser(), banner(bannerText)],
};
