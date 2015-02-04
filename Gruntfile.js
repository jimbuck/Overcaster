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
            cwd: '<%= config.edit %>'
          }
        }
      },
      npmEditInstall: {
        command: 'npm install',
        options: {
          stdout: false,
          execOptions: {
            cwd: '<%= config.edit %>'
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
      editTestCI: {
        gruntfile: 'edit/Gruntfile.js',
        task: 'test-ci'
      }
    },
    concurrent: {
      debug: ['shell:gruntServerDebug', 'shell:gruntDesktopDebugWin'],
      prepEdit: ['shell:npmEditInstall', 'shell:bowerEditInstall']
    }
  });

  grunt.registerTask('dist', [
    'clean:dist',
    'copy:desktopToTmp',
  ]);

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
    'force:shell:npmEditInstall',
    'force:shell:bowerEditInstall',
    'grunt:editTestCI'
  ]);

  grunt.registerTask('check', [
    'shell:gruntEditCheck',
    'shell:gruntCastCheck',
    'shell:gruntServerCheck',
    'shell:gruntDesktopCheck'
  ]);
};
