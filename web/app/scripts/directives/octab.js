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
  .directive('ocTab', ['ocTabsConfig', function(ocTabsConfig) {
    return {
      templateUrl: 'ocTab.html',
      restrict: 'E',
      require: '^ocTabs',
      replace: true,
      transclude: true,
      scope: {
        title: "@"
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
