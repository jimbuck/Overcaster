'use strict';

angular.module('overcasterDirectives')
  .run(function($templateCache) {
    //ocSnapRegion.html
    $templateCache.put('ocSnapRegion.html', '<div ng-transclude></div>');

    //ocSnapContainer.html
    $templateCache.put('ocSnapContainer.html', '<div ng-class="tab.cssClasses" data-selected-tab="{{selectedTab}}"><ul><li ng-class="tab.cssClasses" ng-repeat="tab in tabs" ng-bind="tab.header" ng-mousedown="enableMoving(tab)" ng-mouseup="disableMoving()"></li></ul><div ng-transclude></div></div>');

    //ocSnapItem.html
    $templateCache.put('ocSnapItem.html', '<div ng-show="isActive" ng-transclude></div>');

    //ocSlider.html
    $templateCache.put('ocSlider.html', '<span ng-bind="value"></span><div><button ng-click="decSlider()">-</button><input type="range" min="{{min}}" max="{{max}}" step="{{step}}" ng-model="value" /><button ng-click="incSlider()">+</button> </div>');});
