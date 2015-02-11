/*jshint bitwise: false*/
'use strict';

var fs = require('fs');
var path = require('path');
var cp = require('child_process');

global.NodeWebkit = require('nw.gui');
global.Path = require('path');

global.__dirname = path.dirname(process.execPath).replace(/\\/gi, '/');

global.Overcaster = {};

global.settings = require('./utils/settings-helper');

var expressPort = 9000;
var serverPath = path.join(process.cwd(), './server/server.js');

global.settings.load(function (err, data) {
    if (err) {
        console.error('Failed to load settings: ' + err);
    } else {
        expressPort = data.port;
    }

    initOvercaster(global.Overcaster, global.NodeWebkit);
});

function initGlobalVars(oc, nw) {

    if (!oc.Core) {
        oc.Core = nw.App;
    }

    if (!oc.Args) {
        oc.Args = oc.Core.argv;
    }

    if (!oc.Window) {
        oc.Window = nw.Window.get();
    }

    oc.Debug = !!~oc.Args.indexOf('--debug');

    //oc.Window.showDevTools();
    //alert('Close this dialog when dev tools has loaded...');
}

function initWindow(oc) {

    oc.Window.maximize();

    if (oc.Debug) {
        oc.Window.showDevTools();
    }

    global.NodeWebkit.App.registerGlobalHotKey(new global.NodeWebkit.Shortcut({
        key: 'F11',
        active: function () {
            global.Overcaster.Window.toggleFullscreen();
        },
        failed: function (msg) {
            console.log(msg);
        }
    }));

    global.NodeWebkit.App.registerGlobalHotKey(new global.NodeWebkit.Shortcut({
        key: 'Ctrl+Shift+I',
        active: function () {
            global.Overcaster.Window.showDevTools();
        },
        failed: function (msg) {
            console.log(msg);
        }
    }));
}

function initExpressServer(oc) {
    if (oc.Debug) {
        return;
    }

    if (!fs.existsSync(serverPath))  {
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

    return;
}

function initOvercaster(oc, nw) {

    initGlobalVars(oc, nw);
    initWindow(oc, nw);
    initExpressServer(oc, nw);

    var dest = 'http://localhost:' + expressPort + '/';

    if(true || confirm('Continue to ' + dest + '?')) {
        window.location.href = dest;
    }
}
