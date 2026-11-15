import typescript from '@web-scrobbler/eslint-config/typescript.js';

// `typescript.js` nests the typescript-eslint overrides array; ESLint 9
// flat config requires a flat array, so flatten one level.
const flat = typescript.flatMap((config) =>
	Array.isArray(config) ? config : [config],
);

export default [
	...flat,
	{
		ignores: ['dist/**', 'types/**', 'node_modules/**', 'coverage/**'],
	},
];
