
/**
 * @ngdoc overview
 * @name overcasterDirectives
 * @description
 * # overcasterDirectives
 *
 * Custom directives built for the application.
 */
angular.module('overcasterApp')
  .value('ocTabsConfig', {
    tabContainerClass: 'oc-tab-container',
    tabBarClass: 'oc-tab-bar',
    tabHandleClass: 'oc-tab-handle',
    tabContentClass: 'oc-tab-content',
    activeTabClass: 'active-tab',
    initialTabAttribute: 'initial'
  })
  .value('ocSnapDirectiveConfig', {
    events: {
      snapItemBeginMoving: 'ocSnapItem_BeginMoving',
      snapItemEndMoving: 'ocSnapItem_EndMoving',
      snapContainerBeginMoving: 'ocSnapContainer_BeginMoving',
      snapContainerEndMoving: 'ocSnapContainer_EndMoving'
    },
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
