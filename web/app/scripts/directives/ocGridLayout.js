'use strict';

/**
 * @ngdoc directive
 * @name overcasterApp.directive:gridLayout
 * @description
 * # gridLayout
 */
angular.module('overcasterApp')
  .directive('ocGridLayout', function ($compile) {

    return {
      restrict: 'E',
      link: postLink
    };

    function postLink(scope, element, attrs) {

      var items = scope[attrs.items];

      var addNullToEnd = attrs.addNullToEnd || true;

      var itemTemplate = element.children(attrs.itemTemplateSelector || '.item-layout').html();
      var nullTemplate = element.children(attrs.nullTemplateSelector || '.null-layout').html();

      updateLayout();

      scope.$watch(attrs.items, function(value){
          items = value;
          updateLayout();
      });

      function updateLayout() {
          var totalBoxes = items.length + (addNullToEnd ? 1 : 0);
          var columns = 5;
          var rows = Math.ceil(totalBoxes / columns);

          var html = '';

          for(var i = 0; i < rows; i++) {
              html += '<div class="row"><div class="col-md-1"></div>';

              for(var j = 0; j < columns; j++) {
                  var index = (i * columns) + j;
                  var block = items[index];

                  if(index === totalBoxes || block) {
                      html += '<div class="col-md-2">';

                      var template = block ? angular.element(itemTemplate) : angular.element(nullTemplate);
                      var linkFunc = $compile(template);

                      var itemHtml = linkFunc(block);
                      html += itemHtml;
                      html += '</div>';
                  }
              }

              html += '</div>';
          }

          element.html(html);
      }
    }
  });
