'use strict';

/**
 * @ngdoc directive
 * @name overcasterDirectives.directive:ocSnapContainer
 * @description
 * # ocSnapContainer
 */
angular.module('overcasterDirectives')
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
          $rootScope.$broadcast(ocSnapDirectiveConfig.events.snapItem_BeginMoving, {});
        };

        $scope.disableMoving = function() {
          $rootScope.$broadcast(ocSnapDirectiveConfig.events.snapItem_EndMoving, {});
        };
      },
      link: function postLink(scope, element, attrs) {
        scope.$on(ocSnapDirectiveConfig.events.snapItem_BeginMoving, function(event, data) {
          scope.status = 'Moving';
        });

        scope.$on(ocSnapDirectiveConfig.events.snapItem_EndMoving, function(event, data) {
          scope.status = 'Normal';
        });
      }
    };
  });
