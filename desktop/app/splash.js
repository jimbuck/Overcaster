/*jshint bitwise: false*/
'use strict';

var fs = require('fs');
var path = require('path');

global.NodeWebkit = require('nw.gui');
global.Path = require('path');

global.__dirname = path.dirname(process.execPath).replace(/\\/gi, '/');

global.Overcaster = {};

global.settings = require('./utils/settings-helper');

var expressPort = 9000;
var serverPath = './server/server.js';

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
}

function initWindow(oc) {

    oc.Window.maximize();

    if (oc.Debug || true) {
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

    if (!fs.existsSync(serverPath)) {
        alert('Unable to find internal server files!');
        return;
    }

    var fork = require('child_process').fork;
    global.Express = fork(serverPath, [expressPort], {silent: true});

    //alert(fs.existsSync(serverPath) ? 'Server is found!' : 'Where is the server???')

    (function (e, c) {
        e.on('exit', function (code) {
            c.log('[EXPRESS]: Exited with code ' + code);
        });
    })(global.Express, console);

    return;
}

function initOvercaster(oc, nw) {

    initGlobalVars(oc, nw);
    initWindow(oc, nw);
    initExpressServer(oc, nw);

    window.location.href = 'http://localhost:' + expressPort + '/';
}
