'use strict';

/**
 * @ngdoc function
 * @name overcasterControllers.controller:SessionsCtrl
 * @description
 * # SessionsCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterControllers')
  .controller('SessionsCtrl', function ($scope, ocUtils) {

    $scope.sessionColumns = 5;

    $scope.incColumns = function(){
      $scope.sessionColumns++;
    };

    $scope.decColumns = function(){
      $scope.sessionColumns--;
    };

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
    },
    {
      _id: 3,
      name: 'Alpha'
    },
    {
      _id: 4,
      name: 'Beta'
    },
    {
      _id: 5,
      name: 'Alpha'
    },
    {
      _id: 6,
      name: 'Beta'
    },
    {
      _id: 7,
      name: 'Alpha'
    },
    {
      _id: 8,
      name: 'Beta'
    },
    ];
  });
