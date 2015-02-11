/*jshint camelcase: false*/

module.exports = function (grunt) {
  'use strict';

  var os = require('os');

  // load all grunt tasks
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var platforms = ['win', 'linux', 'linux32', 'mac', 'mac32'];

  // configurable paths
  var config = {
    edit: 'edit',
    cast: 'cast',
    desktop: 'desktop',
    server: 'server',
    dist: 'dist',
    tmp: 'tmp'
  };

  grunt.initConfig({
    config: config,
    clean: {
      dist: [
        '<%= config.dist %>/**',
        '<%= config.tmp %>/**'
      ]
    },
    wait: {
      pause: {
        options: {
          delay: 1000
        }
      }
    },
    copy: {
      desktopToTmp: {
        cwd: '<%= config.desktop %>/',
        src: ['**'],
        dest: '<%= config.tmp %>/',
        expand: true
      },
       serverToTmp: {
        cwd: '<%= config.server %>/',
        src: ['server.js', 'routes.js', 'node_modules/**', 'public/**'],
        dest: '<%= config.tmp %>/app/server',
        expand: true
      },
      editToTmp:{
        cwd: '<%= config.edit %>/dist/',
        src: ['./**'],
        dest: '<%= config.tmp %>/app/server/public/edit/',
        expand: true
      },
      castToTmp: {
        cwd: '<%= config.cast %>/',
        src: ['app.css', 'app.js', 'index.html'],
        dest: '<%= config.tmp %>/app/server/public/cast',
        expand: true
      },
      tmpToDist: {
        cwd: '<%= config.tmp %>/dist',
        src: ['**'],
        dest: '<%= config.dist %>/',
        expand: true
      }
    },
    shell: {
      bowerEditInstall: {
        command: 'bower install',
        options: {
          execOptions: {
            cwd: '<%= config.edit %>',
            maxBuffer: 1024 * 1024 * 64
          }
        }
      },
      npmEditInstall: {
        command: 'npm install',
        options: {
          execOptions: {
            cwd: '<%= config.edit %>',
            maxBuffer: 1024 * 1024 * 64
          }
        }
      }
    },
    grunt: {
      'server-debug':{
        gruntfile: '<%= config.server %>/Gruntfile.js',
        task:'debug'
      },
      'desktop-debug': {
        gruntfile: '<%= config.desktop %>/Gruntfile.js',
        task: 'debug'
      },
      'edit-test-ci': {
        gruntfile: '<%= config.edit %>/Gruntfile.js',
        task: 'test-ci'
      },
      'edit-test':{
        gruntfile: '<%= config.edit %>/Gruntfile.js',
        task: 'test'
      },
      'edit-build': {
        gruntfile: '<%= config.edit %>/Gruntfile.js',
        task: 'build'
      },
       'tmp-dist-win': {
        gruntfile: '<%= config.tmp %>/Gruntfile.js',
        task: 'dist-win'
      },
      'tmp-dist-mac32': {
        gruntfile: '<%= config.tmp %>/Gruntfile.js',
        task: 'dist-mac32'
      },
      'tmp-dist-linux32': {
        gruntfile: '<%= config.tmp %>/Gruntfile.js',
        task: 'dist-linux32'
      }
    },
    concurrent: {
      debug: ['grunt:server-debug', 'grunt:desktop-debug'],
      prepEdit: ['shell:npmEditInstall', 'shell:bowerEditInstall']
    }
  });

  grunt.registerTask('build', 'Builds the specified or current OS.', function (target) {

    if (typeof target === 'undefined') {
      switch (os.platform()) {
        case 'linux':
          target = 'linux32';
          break;
        case 'darwin':
          target = 'mac32';
          break;
        case 'win32':
          target = 'win';
          break;
        default:
          throw new Error('Failed to determine which OS to build for!');
      }
    }

    console.log('Building for ' + target + '...');

    grunt.task.run([
      'clean:dist',
      'grunt:edit-build',
      // build cast
      'copy:desktopToTmp',
      'copy:serverToTmp',
      'copy:editToTmp',
      'copy:castToTmp',
      'grunt:tmp-dist-'+target,
      'copy:tmpToDist'
    ]);
  });

  grunt.registerTask('debug', [
    'concurrent:debug'
  ]);

  grunt.registerTask('test', [
    //'concurrent:prepEdit',
    'shell:npmEditInstall',
    'shell:bowerEditInstall',
    'grunt:edit-test'
  ]);

  grunt.registerTask('test-ci', [
    'shell:npmEditInstall',
    'shell:bowerEditInstall',
    'grunt:edit-test-ci'
  ]);
};
