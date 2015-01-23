'use strict';

/**
 * @ngdoc service
 * @name overcasterServices.MessagingService
 * @description
 * # MessagingService
 * Factory in the overcasterApp.
 */
angular.module('overcasterServices')
  .factory('MessagingService', function ($rootScope) {
    var statusMessage = 'Idle';
    var tooltipMessage = 'Idle';
    var statusMessageChangedEventName = 'statusMessageChanged';
    var tooltipMessageChangedEventName = 'tooltipMessageChanged';

    function subscribe(scope) {
      scope.messages = {
        status: statusMessage,
        tooltip: tooltipMessage
      };

      scope.$on(statusMessageChangedEventName, function(event, data) {
        scope.messages.status = data;
      });

      scope.$on(tooltipMessageChangedEventName, function(event, data) {
        scope.messages.tooltip = data;
      });
    }

    function updateStatusMessage(newMessage) {
      statusMessage = newMessage;
      $rootScope.$broadcast(statusMessageChangedEventName, statusMessage);
    }

    function updateTooltipMessage(newMessage) {
      tooltipMessage = newMessage;
      $rootScope.$broadcast(tooltipMessageChangedEventName, tooltipMessage);
    }
    return {
      updateStatusMessage: updateStatusMessage,
      updateTooltipMessage: updateTooltipMessage,
      subscribe: subscribe
    };
  }
  );
