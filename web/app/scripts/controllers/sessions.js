'use strict';

/**
 * @ngdoc function
 * @name overcasterApp.controller:SessionsCtrl
 * @description
 * # SessionsCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterApp')
  .controller('SessionsCtrl', function ($scope) {
    $scope.sessions = [
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
