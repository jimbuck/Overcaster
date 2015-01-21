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
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the ocSnapRegion directive');
      }
    };
  });
