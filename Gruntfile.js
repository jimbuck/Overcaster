/*jshint camelcase: false*/

module.exports = function (grunt) {
  'use strict';

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
      dist: ['<%= config.dist %>/**/*', '<%= config.tmp %>/**/*'],
      tmp: ['<%= config.tmp %>/**/*']
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
        src: ['**/'],
        dest: '<%= config.tmp %>',
        expand: true
      }
    },
    shell: {
      gruntEditCheck: {
        command: 'grunt check',
        options: {
          execOptions: {
            cwd: '<%= config.edit %>'
          }
        }
      },
      gruntEditBuild: {
        command: 'grunt build',
        options: {
          execOptions: {
            cwd: '<%= config.edit %>'
          }
        }
      },
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
      },
      gruntCastCheck: {
        command: 'grunt check',
        options: {
          execOptions: {
            cwd: '<%= config.cast %>'
          }
        }
      },
      gruntCastBuild: {
        command: 'grunt build',
        options: {
          execOptions: {
            cwd: '<%= config.cast %>'
          }
        }
      },
      gruntServerCheck: {
        command: 'grunt check',
        options: {
          execOptions: {
            cwd: '<%= config.server %>'
          }
        }
      },
      gruntServerDebug: {
        command: 'grunt debug-server',
        options: {
          execOptions: {
            cwd: '<%= config.server %>'
          }
        }
      },
      gruntDesktopCheck: {
        command: 'grunt check',
        options: {
          execOptions: {
            cwd: '<%= config.desktop %>'
          }
        }
      },
      gruntDesktopDebugWin: {
        command: 'grunt debug-win',
        options: {
          execOptions: {
            cwd: '<%= config.desktop %>'
          }
        }
      }
    },
    grunt: {
      'edit-test-ci': {
        gruntfile: 'edit/Gruntfile.js',
        task: 'test-ci'
      },
      'edit-test':{
        gruntfile: 'edit/Gruntfile.js',
        task: 'test'
      }
    },
    concurrent: {
      debug: ['shell:gruntServerDebug', 'shell:gruntDesktopDebugWin'],
      prepEdit: ['shell:npmEditInstall', 'shell:bowerEditInstall']
    }
  });

  grunt.registerTask('build', 'Builds the correct version based on current OS', function (target) {
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

    grunt.task.run([
      // Clean dist
      // Build edit
      // Build cast
      // Copy desktop to tmp
      // Copy edit to tmp
      // Copy cast to tmp
      // Build desktop from tmp
    ]);
  });

  // Register Tasks for each platform...
  for (var p in platforms) {
    var os = platforms[p];
    grunt.registerTask('dist-' + os, [
      'clean:dist',
      'nodewebkit:' + os,
      'fixDist'
    ]);
  }

  grunt.registerTask('debug-win', [
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

  grunt.registerTask('check', [
    'shell:gruntEditCheck',
    'shell:gruntCastCheck',
    'shell:gruntServerCheck',
    'shell:gruntDesktopCheck'
  ]);
};
