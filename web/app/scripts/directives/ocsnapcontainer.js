'use strict';

/**
 * @ngdoc directive
 * @name overcasterDirectives.directive:ocSnapContainer
 * @description
 * # ocSnapContainer
 */
angular.module('overcasterDirectives')
  .directive('ocSnapContainer', function () {
    return {
      template: '<div><ul><li class="oc-snap-tab-handle" ng-repeat="tab in tabs"></li></ul><div class="oc-snap-content" ng-transclude></div></div>',
      restrict: 'E',
      transclude: true,
      scope: {

      },
      controller: function($scope) {
        $scope.tabs = [];

        //Exposed Members
        this.addTab = function(tab) {

        }
      },
      link: function postLink(scope, element, attrs) {
        element.text('this is the ocSnapContainer directive');
      }
    };
  });
