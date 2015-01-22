/*jslint node: true */
'use strict';

var fs = require('fs');
var root = global.__dirname;
var settingsName = '/settings.json';
var settingsPath = root + settingsName;

global.defaultSettings = {
	port: 6014,
	dataLocation: './data',
	mediaLocation: './media',
	contentLocation: './content',
	themeLocation: './themes',
	editorTheme: 'ambiance'
};

var helper = {
  defaults: global.defaultSettings,
  save: function (settings, callback) {
    writeJsonFile(settingsName, settings, callback);
  },
  load: function (callback) {
    // If file doesn't exist, create a new one and populate with default values...
    if (fs.existsSync(settingsPath)) {
      readJsonFile(settingsName, callback);
    } else {
      helper.save(global.defaultSettings, function (err) {
        callback(err, err ? null : global.defaultSettings);
      });
    }
  }
};


function readJsonFile(path, callback){
	fs.readFile(root + path, function (err, data) {
		var settings = data ? JSON.parse(data) : data;

    if(callback) {
      callback(err, settings);
    }
	});
}

function writeJsonFile(path, data, callback){
	var dataString = JSON.stringify(data, null, 4);

	fs.writeFile(root + path, dataString, function (err) {

		if(callback) {
      callback(err);
    }
	});
}

module.exports = helper;
