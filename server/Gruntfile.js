/*jshint camelcase: false*/

module.exports = function (grunt) {
  'use strict';

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var config = {
    serverFile: 'server.js',
    serverPort: 9000
  };

  grunt.initConfig({
    config: config,
    shell: {
      nodeServer: {
        command: 'node <%= config.serverFile %> <%= config.serverPort %> true'
      }
    }
  });

  grunt.registerTask('debug', [
    'shell:nodeServer'
  ]);
};
