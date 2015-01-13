'use strict';

/**
 * @ngdoc function
 * @name overcasterApp.controller:ScenesCtrl
 * @description
 * # ScenesCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterApp')
  .controller('ScenesCtrl', function ($scope) {
    $scope.scenes = [
      {
          _id: 0,
          name: 'Alpha'
      },
      {
          _id: 1,
          name: 'Beta'
      },
      {
          _id: 2,
          name: 'Theta'
      }
    ];
  });
