'use strict';

/**
 * @ngdoc function
 * @name overcasterControllers.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the overcasterApp
 */
angular.module('overcasterApp')
  .controller('IndexCtrl', function ($scope, MessagingService) {
    MessagingService.subscribe($scope);

    //Set Initial Status
    MessagingService.updateStatusMessage('Current Bitrate: 4200kbps');
    MessagingService.updateTooltipMessage('Loading Elements...');
  });
