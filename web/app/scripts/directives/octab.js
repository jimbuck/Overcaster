'use strict';

/**
 * @ngdoc directive
 * @name overcasterDirectives.directive:ocTab
 * @description
 * # ocTab
 */
//<oc:tab title="Editor" >Editor</oc:tab>
//<oc:tab title="Setup" initial>Setup</oc:tab>
angular.module('overcasterDirectives')
  .run(function($templateCache) {
    //ocTabs.html
    $templateCache.put('ocTabs.html', '<div ng-class="css.containerClass" ><ul ng-class="css.barClass"><li ng-class="tab.cssClasses" ng-repeat="tab in tabs" ng-click="selectTab(tab)" ><span ng-bind="tab.title"></li></ul><div ng-class="css.contentClass" ng-transclude></div></div>');
  })
  .directive('ocTab', ['ocTabsConfig', function(ocTabsConfig) {
    return {
      templateUrl: 'ocTab.html',
      restrict: 'E',
      require: '^ocTabs',
      replace: true,
      transclude: true,
      scope: {
        title: '@'
      },
      controller: function($scope) {
        $scope.isActive = false;
        $scope.isSelected = false;
      },
      link: function(scope, el, attrs, containerCtrl) {
        scope.$el = el;

        if (attrs[ocTabsConfig.initialTabAttribute] !== undefined) {
          scope.isActive = true;
          scope.$el.removeAttr(ocTabsConfig.initialTabAttribute); //Remove the intialize attibute
        }
        console.log(scope.isActive);
        containerCtrl.addTab(scope);
      }
    };
  }]);
