'use strict';

/**
 * @ngdoc overview
 * @name overcasterApp
 * @description
 * # overcasterApp
 *
 * Main module of the application.
 */
var app = angular
  .module('overcasterApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.ace'
  ]);

    app.constant('path', require('path'));

    app.constant('fs', require('fs'));

    app.constant('mkdirp', require('mkdirp'));

    // Require lodash (underscore).
    app.constant('_', _);

    // Require jQuery.
    app.constant('$', $);

  app.config(function ($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/start', {
        templateUrl: 'views/start.html',
        controller: 'StartCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/resources', {
        templateUrl: 'views/resources.html',
        controller: 'ResourcesCtrl'
      })
      .when('/scenes/:id?', {
        templateUrl: 'views/scenes.html',
        controller: 'ScenesCtrl'
      })
      .when('/sessions/:id?', {
        templateUrl: 'views/sessions.html',
        controller: 'SessionsCtrl'
      })
      .when('/elements/edit/:id?', {
        templateUrl: 'views/elementeditor.html',
        controller: 'ElementEditorCtrl'
      })
      .when('/elements/:id?', {
        templateUrl: 'views/elements.html',
        controller: 'ElementsCtrl'
      }
    );

    if (typeof global !== 'undefined' && typeof global.Overcaster !== 'undefined' && global.Overcaster.Debug) {
      $routeProvider.when('/debug', {
        templateUrl: 'views/debug.html',
        controller: 'DebugCtrl'
      });
    }

    $routeProvider.otherwise({
      redirectTo: '/'
    });
  });
