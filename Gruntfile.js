'use strict';

const path = require('path');

const isCi = process.env.CI === 'true';

const srcDir = 'src';
const distDir = 'dist';
const testDir = 'test';

const moduleName = 'metadata-filter';
const mainFile = 'filter.js';

const jsFiles = ['*.js', srcDir, testDir];

module.exports = (grunt) => {
	grunt.initConfig({
		eslint: {
			target: jsFiles,
			options: {
				fix: !isCi
			},
		},
		umd: {
			all: {
				options: {
					src: path.join(srcDir, mainFile),
					dest: path.join(distDir, mainFile),

					objectToExport: 'MetadataFilter',
					amdModuleId: moduleName,
				}
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('dist', ['umd']);
	grunt.registerTask('lint', ['eslint']);
};
