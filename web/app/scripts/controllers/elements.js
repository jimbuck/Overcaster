'use strict';

/**
 * @ngdoc function
 * @name overcasterControllers.controller:ElementsCtrl
 * @description
 * # ElementsCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterControllers')
  .controller('ElementsCtrl', function ($scope, ElementsService) {
    ElementsService.load().then(function(elements){
      $scope.elements = elements;
    });



  });
