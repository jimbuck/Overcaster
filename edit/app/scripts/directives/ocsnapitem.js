'use strict';

/**
 * @ngdoc directive
 * @name overcasterDirectives.directive:ocSnapItem
 * @description
 * # ocSnapItem
 */
angular.module('overcasterApp')
  .directive('ocSnapItem', function (ocSnapDirectiveConfig) {
    return {
      templateUrl: 'ocSnapItem.html',
      restrict: 'E',
      require: '^ocSnapContainer',
      replace: true,
      transclude: true,
      scope: {
        header: '@'
      },
      controller: function($scope, $element, $attrs) {
        if (!$scope.header) {
          $scope.header = 'Snap Item';
        }
        $scope.isActive = false;

        //Apply the snap Item content class
        $element.addClass(ocSnapDirectiveConfig.snapTabContentClass);
      },
      link: function postLink(scope, element, attrs, containerCtrl) {
        scope.$el = element;

        if (attrs[ocSnapDirectiveConfig.snapItem.attributes.initialSnapTabAttribute] !== undefined) {
          scope.isActive = true;
          scope.$el.removeAttr(ocSnapDirectiveConfig.snapItem.attributes.initialSnapTabAttribute); //Remove the intialize attibute
        }
        containerCtrl.addTab(scope);
      }
    };
  });
