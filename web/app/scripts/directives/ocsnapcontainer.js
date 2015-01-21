'use strict';

/**
 * @ngdoc directive
 * @name overcasterDirectives.directive:ocSnapContainer
 * @description
 * # ocSnapContainer
 */
angular.module('overcasterDirectives')
  .directive('ocSnapContainer', function (ocSnapDirectiveConfig) {
    return {
      templateUrl: 'ocSnapContainer.html',
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {

      },
      controller: function($scope) {
        $scope.selectedTab = '';
        $scope.tabs = [];

        $scope.selectTab = function(tab) {
          angular.forEach($scope.tabs, function(tab) {
            tab.cssClasses = [ocSnapDirectiveConfig];
            tab.isActive = false;
          });

          tab.cssClasses.push();
          $scope.selectedTab = tab.title;
          tab.isActive = true;
        };

        //Exposed Members
        this.addTab = function(tab) {
          if ($scope.tabs.length === 0) {
            tab.isActive = true;
          }

          $scope.tabs.push(tab);

          if (tab.isActive) {
            $scope.selectTab(tab);
          }
        };
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
