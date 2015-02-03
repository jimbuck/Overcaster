'use strict';

/**
 * @ngdoc directive
 * @name overcasterDirectives.directive:ocSnapRegion
 * @description
 * # ocSnapRegion
 */
angular.module('overcasterDirectives')
  .directive('ocSnapRegion', function () {
    return {
      templateUrl: 'ocSnapRegion.html',
      restrict: 'E',
      transclude: true,
      replace: 'true',
      controller: function($scope, $element, $attrs) {
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
