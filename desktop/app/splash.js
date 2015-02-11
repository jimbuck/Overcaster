/*jshint bitwise: false*/
'use strict';

var fs = require('fs');
var cp = require('child_process');

global.NodeWebkit = require('nw.gui');

var expressPort = require('./utils/settings-helper').getPort();
var serverPath = './server/server.js';

initGlobalVars();
initWindow();
initExpressServer();
startApp();

function startApp() {
  if (global.Debug) {
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
    alert('Unable to find internal server files!');
    return;
  }

  var command = ['node', serverPath, expressPort, (oc.Debug ? 'debug' : '')].join(' ');
  console.log('EXECUTING: "' + command + '"');
  global.Express = cp.exec(command);

  //global.Express = cp.fork(serverPath, [expressPort, (oc.Debug ? 'debug' : '')]);

  global.Express.on('error', function (err) {
    console.err('[EXPRESS]: |err| ' + err);
  });

  global.Express.on('exit', function (code) {
    console.warn('[EXPRESS]: Exited with code ' + code);
  });

  global.Express.on('close', function (code, signal) {
    console.warn('[EXPRESS]: Closed with code ' + code + ' and signal ' + signal);
  });

  global.Express.on('message', function (msg) {
    console.log('[EXPRESS]: (msg) ' + msg);
  });

  global.Express.on('disconnect', function () {
    console.warn('[EXPRESS]: |msg| Disconnected!');
  });
}
