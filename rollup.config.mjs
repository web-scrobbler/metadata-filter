import banner from 'rollup-plugin-banner2';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

import pkg from './package.json' with { type: 'json' };

const { name, version } = pkg;

const bannerText = `/*
 * ${name} v${version}
 * (c) Web Scrobbler MetadataFilter Team
 * Licensed under the MIT License
 */
`;

function output(distFileName, format) {
	const minify = distFileName.endsWith('.min');
	const plugins = [];
	if (minify) {
		plugins.push(terser());
	}

	return {
		file: `dist/${distFileName}.js`,
		format,
		name: 'MetadataFilter',
		plugins,
	};
}

export default {
	input: 'src/index.ts',
	output: [
		output('filter', 'umd'),
		output('filter.min', 'umd'),
		output('filter.esm', 'esm'),
		output('filter.esm.min', 'esm'),
	],
	plugins: [
		banner(() => bannerText),
		typescript({
			tsconfig: 'tsconfig.build.json',
			useTsconfigDeclarationDir: true,
		}),
	],
};
