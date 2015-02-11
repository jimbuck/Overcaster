'use strict';

/**
 * @ngdoc directive
 * @name overcasterDirectives.directive:ocSnapContainer
 * @description
 * # ocSnapContainer
 */
angular.module('overcasterApp')
  .directive('ocSnapContainer', function (ocSnapDirectiveConfig, $rootScope) {
    return {
      templateUrl: 'ocSnapContainer.html',
      restrict: 'E',
      require: '^ocSnapRegion',
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

          tab.cssClasses.push(ocSnapDirectiveConfig.snapContainer.css.activeSnapTabClass);
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

        $scope.enableMoving = function(tab) {
          $scope.selectTab(tab);
          $rootScope.$broadcast(ocSnapDirectiveConfig.events.snapItemBeginMoving, {});
        };

        $scope.disableMoving = function() {
          $rootScope.$broadcast(ocSnapDirectiveConfig.events.snapItemEndMoving, {});
        };
      },
      link: function postLink(scope, element, attrs) {
        scope.$on(ocSnapDirectiveConfig.events.snapItemBeginMoving, function(event, data) {
          scope.status = 'Moving';
        });

        scope.$on(ocSnapDirectiveConfig.events.snapItemEndMoving, function(event, data) {
          scope.status = 'Normal';
        });
      }
    };
  });
