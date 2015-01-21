'use strict';

/**
 * @ngdoc directive
 * @name overcasterDirectives.directive:ocSnapItem
 * @description
 * # ocSnapItem
 */
angular.module('overcasterDirectives')
  .directive('ocSnapItem', function () {
    return {
      template: '<div ng-transclude></div>',
      restrict: 'E',
      require: '^ocSnapContainer',
      replace: true,
      transclude: true,
      scope: {
        title: '@'
      },
      controller: function($scope, $element, $attrs) {
        if (!$scope.title) {
          $scope.title = 'Snap Item';
        }
      },
      link: function postLink(scope, element, attrs, containerCtrl) {
        console.log(containerCtrl);
      }
    };
  });
