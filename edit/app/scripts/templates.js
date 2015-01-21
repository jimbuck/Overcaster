angular.module('overcasterDirectives')
  .run(function($templateCache) {
    //ocSnapRegion.html
    $templateCache.put('ocSnapRegion.html', '<div ng-transclude></div>');

    //ocSnapContainer.html
    $templateCache.put('ocSnapContainer.html', '<div data-selected-tab="{{selectedTab}}"><ul><li ng-class="tab.cssClasses" ng-repeat="tab in tabs" ng-click="selectTab(tab)" ng-bind="tab.title"></li></ul><div ng-transclude></div></div>');

    //ocSnapItem.html
    $templateCache.put('ocSnapItem.html', '<div ng-transclude></div>');

    //ocTab.html
    $templateCache.put('ocTab.html', '<div ng-show="isActive"><ng-transclude></ng-transclude></div>');

    //ocTabs.html
    $templateCache.put('ocTabs.html', '<div ng-class="css.containerClass" ><ul ng-class="css.barClass"><li ng-class="tab.cssClasses" ng-repeat="tab in tabs" ng-click="selectTab(tab)" ><span ng-bind="tab.title"></li></ul><div ng-class="css.contentClass" ng-transclude></div></div>');
  });
