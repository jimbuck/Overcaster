'use strict';

/**
 * @ngdoc function
 * @name overcasterApp.controller:ElementEditorCtrl
 * @description
 * # ElementeditorCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterControllers')
  .controller('ElementEditorCtrl', function ($scope) {
    $scope.currentElement = {
      id: '1',
      name: 'Element Edit 1',
      path: 'path/to/element',
      html: '',
      css: '',
      js: ''
    };

    $scope.updateElement = function() {
      var result = htmlify($scope.currentElement.html,$scope.currentElement.css, $scope.currentElement.js);
      console.log(result);
      angular.element('#ElementPreviewFrame').contents().find('html').html(result);
    };

    function htmlify(body, css, js, title){
      var html = '<!doctype html><html><head><meta charset="utf-8"><title>' + ((title) ? title : 'Element Preview') + '</title>'; //Create Document Header
      if (css) { //If css was provided
        html += '<style>' + css + '</style>'; //Insert provided CSS
      }

      html += '</head>'; //Close Head Tag
      html += '<body>'; //Open Body Tag
      if (body) { //If Body Content was provided
        html += body;
      }

      if (js) { //If JS content was provided
        html += '<script>' + js + '</script>'; //Insert provided javascript
      }

      html += '</body>'; //Close Head Tag
      html += '</html>'; //Close Html Tag

      return html;
    }

    $scope.updateElement();
  });
