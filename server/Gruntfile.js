/*jshint camelcase: false*/

module.exports = function (grunt) {
  'use strict';

  // load all grunt tasks
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var config = {
    serverFile: 'server.js',
    editFromServer: '../edit/app/',
    castFromServer: '../cast/app/'
  };

  grunt.initConfig({
    config: config,
    shell: {
      nodeServer: {
        command: 'node <%= config.serverFile %> --edit="<%= config.editFromServer %>" --cast="<%= config.castFromServer %>" '
      }
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
    'shell:gruntServerDebug',
    'shell:gruntDesktopDebugWin'
  ]);

  grunt.registerTask('check', [
    'shell:gruntEditCheck',
    'shell:gruntCastCheck',
    'shell:gruntServerCheck',
    'shell:gruntDesktopCheck'
  ]);
};
