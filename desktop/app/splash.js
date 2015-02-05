/*jshint bitwise: false*/
'use strict';

var fs = require('fs');
var path = require('path');

global.NodeWebkit = require('nw.gui');

var expressPort = require('./utils/settings-helper').getPort();
var serverPath = './server/server.js';

initGlobalVars();
initWindow();
initExpressServer();
startApp();

function startApp(){
  if(global.Debug)
  {
    expressPort = 9000;
  }

  window.location.href = 'http://localhost:' + expressPort + '/';
}

function initGlobalVars() {

  global.App = global.NodeWebkit.App;
  global.Args = global.NodeWebkit.App.argv;
  global.Win = global.NodeWebkit.Window.get();

  global.Debug = !!~global.Args.indexOf('--debug');
}

function initWindow() {

  global.Win.maximize();

  global.App.registerGlobalHotKey(new global.NodeWebkit.Shortcut({
    key: 'F11',
    active: function () {
      global.Win.toggleFullscreen();
    },
    failed: function (msg) {
      console.log(msg);
    }
  }));

  if (global.Debug) {
    global.Win.showDevTools();

    global.App.registerGlobalHotKey(new global.NodeWebkit.Shortcut({
      key: 'Ctrl+Shift+I',
      active: function () {
        global.Win.showDevTools();
      },
      failed: function (msg) {
        console.log(msg);
      }
    }));
  }
}

function initExpressServer() {
  if (global.Debug) {
    return;
  }

  if (!fs.existsSync(serverPath)) {
    console.log('Unable to find internal server files!');
    return;
  }

  var spawn = require('child_process').fork;
  global.Express = spawn('node', [serverPath, expressPort]);

  (function (e, c) {
    e.stdout.on('data', function (data) {
      c.log('[EXPRESS]:', data);
    });

    e.on('exit', function (code) {
      c.log('[EXPRESS]: Exited with code ' + code);
    });

  })(global.Express, console);

  return;
}
