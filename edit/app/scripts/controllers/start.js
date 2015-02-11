'use strict';

/**
 * @ngdoc function
 * @name overcasterControllers.controller:StartCtrl
 * @description
 * # StartCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterApp')
  .controller('StartCtrl', function ($scope) {

    $scope.recentSessions = [];
    $scope.recentScenes = [];
    $scope.recentElements = [];
  });
