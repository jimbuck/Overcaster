'use strict';

/**
 * @ngdoc directive
 * @name overcasterDirectives.directive:ocItemGrid
 * @description
 * # ocItemGrid
 */
angular.module('overcasterDirectives', [])
  .value('ocTileLayoutConfig', {
    tileItemClassName: 'tile-item',
    addItemClassName: 'add-item'
  })
  .directive('ocTileLayout', function (ocTileLayoutConfig) {

    console.log('CREATING DIRECTIVE!!!');


    return {
      scope: {
        items: '='
      },
      restrict: 'E',
      transclude: true,
      compile: function (element, attrs, transcludeFn) {

        return function(scope, $element, $attrs) {
          var elements = [];
          var columns = parseInt($attrs.columns);

          scope.$watchCollection('items', function(collection){

            var i, block, childScope;

            // check if elements have already been rendered
            if(elements.length > 0){
              // if so remove them from DOM, and destroy their scope
              for (i = 0; i < elements.length; i++) {
                elements[i].el.parent().remove();
                elements[i].scope.$destroy();
              };
              elements = [];
            }

            for (i = 0; i < collection.length+($attrs.endWithNull?1:0); i++) {
              // create a new scope for every element in the collection.
              childScope = scope.$new();
              // pass the current element of the collection into that scope
              childScope['item'] = collection[i];

              transcludeFn(childScope, function(clone){
                // clone the transcluded element, passing in the new scope.

                var el = angular.element('<div />').append(clone);
                el.css({
                  'float': 'left',
                  'padding': 10,
                  'width': (100/columns) + '%'
                })
                element.append(el); // add to DOM
                block = {};
                block.el = clone;
                block.scope = childScope;
                elements.push(block);
              });
            };

          });
        };
      }
    };
  });
