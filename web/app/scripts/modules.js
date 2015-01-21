/**
 * @ngdoc overview
 * @name overcasterControllers
 * @description
 * # overcasterControllers
 *
 * Controllers used in the application.
 */
angular.module('overcasterControllers', [
  'overcasterServices',
  'overcasterDirectives'
]);

/**
 * @ngdoc overview
 * @name overcasterServices
 * @description
 * # overcasterServices
 *
 * Services used in the application.
 */
angular.module('overcasterServices', []);

/**
 * @ngdoc overview
 * @name overcasterDirectives
 * @description
 * # overcasterDirectives
 *
 * Custom directives built for the application.
 */
angular.module('overcasterDirectives', [])
  .value('ocTabsConfig', {
    tabContainerClass: 'oc-tab-container',
    tabBarClass: 'oc-tab-bar',
    tabHandleClass: 'oc-tab-handle',
    tabContentClass: 'oc-tab-content',
    activeTabClass: 'active-tab',
    initialTabAttribute: 'initial'
  })
  .value('ocSnapDirectiveConfig', {
    snapRegion: {
      css: {
        snapRegionClass: 'oc-snap-region'
      }
    },
    snapContainer: {
      css: {
        snapContainerClass: 'oc-snap-tab-container',
        snapTabBarClass: 'oc-snap-tab-bar',
        snapTabHandleClass: 'oc-snap-tab-handle',
        activeSnapTabClass: 'oc-active-snap-tab'
      }
    },
    snapItem: {
      css: {
        snapTabContentClass: 'oc-snap-tab-content'
      },
      attributes: {
        initialSnapTabAttribute: 'initial'
      }
    }
  });
