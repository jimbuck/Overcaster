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

    var options = {
      path: path.join(global.appData, 'settings.json'),
      defaults: {
        elementsPath: './data/elements',
        scenesPath: './data/scenes.json',
        sessionsPath: './data/sessions.json',
        port: 9000
      }
    };

    var Settings = function(){
      this.dataStore = new JsonDataStore(options);
    };

    Settings.prototype.get = function (key){
      return this.dataStore.get(key);
    };

    Settings.prototype.set = function(key, value){
      return this.dataStore.set(key, value);
    };

    Settings.prototype.delete = function(key) {
      return this.dataStore.delete(key);
    }

    return new Settings();
  });
