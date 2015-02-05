'use strict';

var fs = require('fs');
var path = require('path');

/**
 * @ngdoc service
 * @name overcasterApp.Settings
 * @description
 * # Settings
 * Factory in the overcasterApp.
 */
angular.module('overcasterServices')
  .factory('Settings', function () {

    var settings = {
      path: path.join(global.appData, 'settings.json'),
      defaults: {
        elementsPath: './data/elements',
        scenesPath: './data/scenes.json',
        sessionsPath: './data/sessions.json',
        port: 9000
      }
    };

    settings.get = function (key) {

      createIfMissing();

      var data = require(settings.path);

      if(typeof key === 'undefined')
      {
        return data;
      } else {
        return data[key];
      }
    };

    settings.set = function (key, value) {
      if (typeof key === 'undefined') {
        throw new Error('Null Argument Exception: key');
      }

      createIfMissing();

      var data = settings.get();

      data[key] = value;

      saveData(data);
    };

    settings.delete = function(key) {
      if(typeof key === 'undefined')
      {
        throw new Error('Null Argument Exception: key');
      }

      createIfMissing();

      var data = settings.get();

      delete data[key];

      saveData(data);
    };

    function createIfMissing(){
      if (!fs.existsSync()) {
        saveData(settings.defaults);
      }
    }

    function saveData(data){
      fs.writeFileSync(settings.path, JSON.stringify(data, null, 2));
    }

    return settings;
  });
