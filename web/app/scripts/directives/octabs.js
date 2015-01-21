'use strict';

/**
 * @ngdoc directive
 * @name overcasterDirectives.directive:ocTabs
 * @description
 * # ocTabs
 *
 */
//<oc:tabs>
//<oc:tab title="Tab 1">Tab 1 Content</oc:tab>
//<oc:tab title="Tab 2" intial>Tab 2 Content</oc:tab>
//</oc:tabs>
angular.module('overcasterDirectives')
  .directive('ocTabs', ['ocTabsConfig', function (ocTabsConfig) {
    return {
      templateUrl: 'ocTabs.html',
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {},
      controller: ['$scope',function($scope) {
        $scope.selectedTab = '';
        $scope.tabs = [];
        $scope.handleClass = ocTabsConfig.tabHandleClass;
        $scope.css = {
          contentClass: ocTabsConfig.tabContentClass,
          handleClass: ocTabsConfig.tabHandleClass,
          activeTabClass: ocTabsConfig.activeTabClass,
          barClass: ocTabsConfig.tabBarClass,
          containerClass: ocTabsConfig.tabContainerClass
        };

        $scope.selectTab = function(tab) {
          angular.forEach($scope.tabs, function(tab) {
            tab.cssClasses = [ocTabsConfig.tabHandleClass];
            tab.isActive = false;
          });

          tab.cssClasses.push($scope.css.activeTabClass);
          $scope.selectedTab = tab.title;
          tab.isActive = true;
        };

        this.addTab = function(tab) {
          if ($scope.tabs.length === 0) {
            tab.isActive = true;
          }

          $scope.tabs.push(tab);

          if (tab.isActive) {
            $scope.selectTab(tab);
          }
        };

      }]
    };
  }]);
