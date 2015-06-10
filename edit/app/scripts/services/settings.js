'use strict';

/**
 * @ngdoc service
 * @name overcasterApp.Settings
 * @description
 * # Settings
 * Factory in the overcasterApp.
 */
angular.module('overcasterApp')
  .factory('Settings', function (path, JsonRepository) {

    var options = {
      path: path.join(global.appData, 'settings.json'),
      defaults: {
        elementsPath: './data/elements',
        scenesPath: './data/scenes.json',
        sessionsPath: './data/sessions.json',
        port: 9000
      }
    };

    return new JsonRepository(options);
  });
