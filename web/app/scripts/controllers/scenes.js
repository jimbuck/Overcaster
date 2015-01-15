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
      _id: 0,
      name: 'Alpha'
    }, {
      _id: 1,
      name: 'Beta'
    }, {
      _id: 2,
      name: 'Theta'
    }, {
      _id: 3,
      name: 'Alpha'
    }, {
      _id: 4,
      name: 'Beta'
    }, {
      _id: 5,
      name: 'Alpha'
    }, {
      _id: 6,
      name: 'Beta'
    }];
  });
