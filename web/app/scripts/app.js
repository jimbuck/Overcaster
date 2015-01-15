'use strict';

/**
 * @ngdoc overview
 * @name overcasterApp
 * @description
 * # overcasterApp
 *
 * Main module of the application.
 */
angular
  .module('overcasterApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'overcasterControllers'
  ])
  .config(function ($locationProvider, $routeProvider) {

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
      .when('/scenes', {
        templateUrl: 'views/scenes.html',
        controller: 'ScenesCtrl'
      })
      .when('/sessions', {
        templateUrl: 'views/sessions.html',
        controller: 'SessionsCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl'
      })
      .when('/resources', {
        templateUrl: 'views/resources.html',
        controller: 'ResourcesCtrl'
      })
      .when('/components', {
        templateUrl: 'views/components.html',
        controller: 'ComponentsCtrl'
      })
      .when('/scene-editor', {
        templateUrl: 'views/scene-editor.html',
        controller: 'SceneEditorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

/**
 * @ngdoc overview
 * @name overcasterControllers
 * @description
 * # overcasterControllers
 *
 * Controllers used in the application.
 */
angular.module('overcasterControllers', [
  'overcasterServices',
  'overcasterDirectives',
]);

/**
 * @ngdoc overview
 * @name overcasterDirectives
 * @description
 * # overcasterDirectives
 *
 * Custom directives built for the application.
 */
angular.module('overcasterDirectives', []);

/**
 * @ngdoc overview
 * @name overcasterServices
 * @description
 * # overcasterServices
 *
 * Services used in the application.
 */
angular.module('overcasterServices', []);
