'use strict';

/**
 * @ngdoc function
 * @name overcasterControllers.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterControllers')
  .controller('MainCtrl', function ($scope, $timeout, $location) {


    $timeout(function(){
      $location.url('/start');
    }, 1000);


  });
