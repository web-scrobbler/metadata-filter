'use strict';

const path = require('path');

const srcDir = 'src';
const distDir = 'dist';

const moduleName = 'metadata-filter';
const mainFile = 'filter.js';

module.exports = (grunt) => {
	grunt.initConfig({
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
