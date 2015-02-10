'use strict';

/**
 * @ngdoc function
 * @name overcasterControllers.controller:ElementsCtrl
 * @description
 * # ElementsCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterControllers')
  .controller('ElementsCtrl', function ($scope, ElementsRepository) {

    var elementsRepo = new ElementsRepository();

    $scope.elements = [];

    $scope.refreshElements = function refreshElements(){
      elementsRepo.load().then(function (elements) {
        $scope.elements = elements;
      });
    };

    $scope.createNewElement = function(){
      // 1 Open modal
      // 2 Render form
      // 3 Add to service
      // 4 Reload elements
    };

    $scope.refreshElements();
  });
