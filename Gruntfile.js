/*jshint camelcase: false*/

module.exports = function (grunt) {
	'use strict';

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var platforms = ['win', 'linux32', 'linux64', 'osx'];

	// configurable paths
	var config = {
		app: 'app',
		dist: 'dist',
		tmp: 'tmp',
		resources: 'resources'
	};

	grunt.initConfig({
		config: config,
		clean: {
			dist: ['<%= config.dist %>/**/*'],
			distComplete: ['<%= config.dist %>/Overcaster/**/*']
		},
		wait: {
			pause: {
				options: {
					delay: 1000
				}
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: '<%= config.app %>/js/*.js'
		},
		copy: {
			fixDist: {
				cwd: '<%= config.dist %>/Overcaster',
				src: ['**/*'],
				dest: '<%= config.dist %>',
				expand: true
			}
		},
		nodewebkit: {
			win: {
				options: {
					platforms: ['win'],
					buildDir: '<%= config.dist %>'
				},
				src: ['<%= config.app %>/**/*']
			},
			osx: {
				options: {
					platforms: ['osx'],
					buildDir: '<%= config.dist %>'
				},
				src: ['<%= config.app %>/**/*']
			},
			linux32: {
				options: {
					platforms: ['linux32'],
					buildDir: '<%= config.dist %>'
				},
				src: ['<%= config.app %>/**/*']
			},
			linux64: {
				options: {
					platforms: ['linux64'],
					buildDir: '<%= config.dist %>'
				},
				src: ['<%= config.app %>/**/*']
			},
			all: {
				options: {
					platforms: platforms,
					buildDir: '<%= config.dist %>'
				},
				src: ['<%= config.app %>/**/*']
			}
		},

		shell: {
			debugWin: {
				options: {
					stdout: true
				},
				command: [
				'start <%= config.dist %>/win/Overcaster.exe --debug',
				'node <%= config.app %>/server/server.js'
			].join('&')
			},
			deleteOldDist: {
				options: {
					stdout: true
				},
				command: 'RMDIR \"<%= config.dist %>/Overcaster" /S /Q'
			}
		}
	});

	grunt.registerTask('fixDist', 'Fixes the dist folder structure.', function () {
		// Force task into async mode and grab a handle to the "done" function.
		var done = this.async();

		var delay = 3000;

		setTimeout(function () {
			grunt.log.writeln('Copying the builds...');
			grunt.task.run('copy:fixDist');
			setTimeout(function () {
				grunt.log.writeln('Deleting obsolete builds...');
				grunt.task.run('shell:deleteOldDist');
				done();
			}, delay);

		}, delay);
	});

	grunt.registerTask('dist', [
		'jshint',
		'clean:dist',
		'nodewebkit:all',
		'fixDist'
	]);

	// Register Tasks for each platform...
	for (var p in platforms) {
		(function (os) {
			grunt.registerTask('dist-' + os, [
				'jshint',
				'clean:dist',
				'nodewebkit:' + os,
				'fixDist'
			]);
		})(platforms[p]);
	}

	grunt.registerTask('debug-win', [
    'dist-win',
	'shell:debugWin'
  ]);

	grunt.registerTask('check', [
    'jshint'
  ]);
};