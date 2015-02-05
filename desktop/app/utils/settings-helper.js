/*jslint node: true */
'use strict';

var fs = require('fs');
var path = require('path');

global.appData = path.join(global.NodeWebkit.App.dataPath, '../Overcaster');

if(!path.existsSync(global.appData)){
  fs.mkdirSync(global.appData);
}

var settingsPath = path.join(global.appData, 'settings.json');

// Port is required for startup,
//   the real default settings will get set
//   in the angular service.
var defaultPort = 9000;

var helper = {
  getPort: function () {

    if (path.existsSync(settingsPath)) {
      return require(settingsPath).port || defaultPort;
    } else {
      return defaultPort;
    }
  }
};

module.exports = helper;
