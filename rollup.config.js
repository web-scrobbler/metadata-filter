import banner from 'rollup-plugin-banner2';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import { name, version } from './package.json';

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
		format: format,
		name: 'MetadataFilter',
		plugins: plugins,
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
			tsconfig: './src/tsconfig.json',
			tsconfigOverride: {
				compilerOptions: {
					/*
					 * Workaround for plugin to generate declarations to
					 * the `declarationDir` directory.
					 */
					composite: false,

					/**
					 * Disallow to generate declaration maps. This option
					 * should be enabled in TypeScript config to allow
					 * performing refactoring in IDEs (e.g. Visual Studio Code).
					 *
					 * Ref: https://www.typescriptlang.org/docs/handbook/project-references.html#declarationmaps
					 */
					declarationMap: false,
				},
			},
			useTsconfigDeclarationDir: true,
		}),
	],
};
