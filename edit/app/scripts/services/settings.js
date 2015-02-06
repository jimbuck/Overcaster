'use strict';

var path = require('path');

/**
 * @ngdoc service
 * @name overcasterApp.Settings
 * @description
 * # Settings
 * Factory in the overcasterApp.
 */
angular.module('overcasterServices')
  .factory('Settings', function (JsonDataStore) {

    var settings = {
      path: path.join(global.appData, 'settings.json'),
      defaults: {
        elementsPath: './data/elements',
        scenesPath: './data/scenes.json',
        sessionsPath: './data/sessions.json',
        port: 9000
      }
    };

    return new JsonDataStore(settings);

  });
