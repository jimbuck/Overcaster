'use strict';

/**
 * @ngdoc function
 * @name overcasterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterApp')
  .controller('MainCtrl', function ($scope, $timeout, $location) {
    

    $timeout(function(){
      $location.url('/start');
    }, 3000);


  });
