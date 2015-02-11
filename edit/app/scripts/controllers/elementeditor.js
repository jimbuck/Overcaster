'use strict';

/**
 * @ngdoc function
 * @name overcasterApp.controller:ElementEditorCtrl
 * @description
 * # ElementeditorCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterApp')
  .controller('ElementEditorCtrl', function ($scope, ElementsRepository, $routeParams) {
    $scope.currentElement = {};

    var elementRepo = new ElementsRepository('');
    elementRepo.load($routeParams.id)
      .then(function(data) {
        $scope.currentElement = data;
        $scope.reloadElement();
      });

    $scope.reloadElement = function() {
      var newElement = angular.element('<iframe frameborder=0></iframe>');
      angular.element('.preview-window .resizable').html(''); //Remove existing iframe
      angular.element('.preview-window .resizable').append(newElement); //Add the new iframe

      newElement = angular.element('.preview-window .resizable').find('iframe'); //locate the newly added iframe

      var rootHtml = angular.element('<html></html>')
        .append(loadElementHead($scope.currentElement.css, $scope.currentElement.name)) //Add new head to iframe
        .append(loadElementBody($scope.currentElement.html, $scope.currentElement.js)); //add new body to html

      newElement.attr('srcdoc', rootHtml.appendTo('<div></div>').html());

      console.log($scope.currentElement);
    };

    $scope.saveElement = function() {
      elementRepo.save($scope.currentElement)
        .then(function(data) {
          $scope.currentElement = data;
          $scope.reloadElement();
      });
    };

    function loadElementBody(body, scripts) {
      body = body || ''; //Handle body default
      scripts = scripts || ''; //Handle script default

      var bodyTag = angular.element('<body></body>');
      var newScripts = angular.element('<script></script>'); //Create new script tag

      newScripts.append(scripts); //Insert scripts

      bodyTag
        .append(body) //Insert body content
        .append(newScripts); //Add scripts to the body

      return bodyTag;
    }

    function loadElementHead(css, title) {
      title = title || 'Element Preview'; //Handle title defaults
      css = css || ''; //Handle css defaults

      var headTag = angular.element('<head></head>');
      var newMeta = angular.element('<meta/>'); //Create new Meta tag
      var newTitle = angular.element('<title></title>'); //Create new title tag
      var newStyle = angular.element('<style type="text/css"></style>'); //Create new style tag

      newMeta.attr('charset', 'UTF-8'); //Add charset attribute to meta tag
      newTitle.text(title); //Add Title to title tag
      newStyle.append(css); //Insert provided CSS


      headTag
        .append(newMeta) //Add new meta to head tag
        .append(newTitle) //Add new title to head tag
        .append(newStyle); //Add new style to head tag

      return headTag;
    }
  });
