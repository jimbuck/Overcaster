'use strict';

/**
 * @ngdoc function
 * @name overcasterControllers.controller:ScenesCtrl
 * @description
 * # ScenesCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterControllers')
  .controller('ScenesCtrl', function ($scope) {
    $scope.scenes = [{
      id: 1,
      name: 'Intro'
    }, {
      id: 2,
      name: 'Gameplay'
    }, {
      id: 3,
      name: 'BRB'
    }, {
      id: 4,
      name: 'Close Cam'
    }, {
      id: 5,
      name: 'Technical Difficulties'
    }, {
      id: 6,
      name: 'Twitch Chat'
    }, {
      id: 7,
      name: 'Test'
    }];
  });
