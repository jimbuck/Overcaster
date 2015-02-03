/*jshint camelcase: false*/

module.exports = function (grunt) {
  'use strict';

  // load all grunt tasks
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var config = {
    serverFile: 'server.js',
    serverPort: 9000,
    editFromServer: '../edit/app/',
    castFromServer: '../cast/app/'
  };

  grunt.initConfig({
    config: config,
    clean:{
      dist: {

      }
    },
    shell: {
      nodeServer: {
        command: 'node <%= config.serverFile %> <%= config.serverPort %> --edit="<%= config.editFromServer %>" --cast="<%= config.castFromServer %>" '
      }
    }
  });

  grunt.registerTask('dist', [
    'clean:dist',
    'buildDist',
    'copy:desktopToTmp',
  ]);

  grunt.registerTask('debug-server', [
    'shell:nodeServer'
  ]);

  grunt.registerTask('check', [
    'shell:gruntEditCheck',
    'shell:gruntCastCheck',
    'shell:gruntServerCheck',
    'shell:gruntDesktopCheck'
  ]);
};
