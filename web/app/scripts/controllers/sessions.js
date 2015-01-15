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

    $scope.sessionColumns = 4;

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
      _id: 0,
      name: 'Alpha'
    },
    {
      _id: 1,
      name: 'Beta'
    },
    {
      _id: 0,
      name: 'Alpha'
    },
    {
      _id: 1,
      name: 'Beta'
    },
    {
      _id: 0,
      name: 'Alpha'
    },
    {
      _id: 1,
      name: 'Beta'
    },
    ];
  });
