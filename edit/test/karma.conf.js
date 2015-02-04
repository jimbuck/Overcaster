// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-01-13 using
// generator-karma 0.8.3

var os = require('os');
var fs = require('fs');
var path = require('path');

module.exports = function (config) {
  'use strict';

  //var nwPath = '';
  //
  //switch (os.platform()) {
  //  case 'linux':
  //    nwPath = '../../desktop/resources/node-webkit/Linux32/nw';
  //    break;
  //  case 'darwin':
  //    nwPath = '../../desktop/resources/node-webkit/MacOS32/node-webkit';
  //    break;
  //  case 'win32':
  //    nwPath = '../../desktop/resources/node-webkit/Windows/nw.exe';
  //    break;
  //}
  //
  //// Set the path for the launcher...
  //process.env.NODEWEBKIT_BIN = path.join(__dirname, nwPath);
  //
  //console.log(__dirname);
  //console.log(process.env.NODEWEBKIT_BIN + ' #########################');
  //
  //// Ensure we can execute it...
  //fs.chmodSync(process.env.NODEWEBKIT_BIN, '777');

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',

      'app/scripts/app.js',       // Explicitly state files that
      'app/scripts/modules.js',   //   must be loaded in order...
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'NodeWebkit'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-nodewebkit-launcher',
      'karma-htmlfile-reporter',
      'karma-jasmine'
    ],

    reporters: ['progress', 'html'],

    htmlReporter: {
      outputFile: 'test/results.html'
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
