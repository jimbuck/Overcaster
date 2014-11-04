global.NodeWebkit = require('nw.gui');
global.Path = require('path');
global.fs = require('fs');

global.__dirname = global.Path.dirname(process.execPath).replace(/\\/gi,'/');

global.Overcaster = {};

global.settings = require('./utils/settings-helper');

var expressPort = 6014;

global.settings.load(function(err, data){
	if(err) {
		console.error('Failed to load settings: ' + err);
	} else {
		expressPort = data.port;
	}

	initOvercaster(global.Overcaster, global.NodeWebkit)
});

function initOvercaster(oc, nw){

	initGlobalVars();
	initWindow();
	initExpressServer();

	window.location.replace('http://localhost:'+expressPort+'/');

	//#region Init Functions

	function initGlobalVars(){

		if(!oc.Core) oc.Core = nw.App;

		if(!oc.Args) oc.Args = oc.Core.argv;

		if(!oc.Window) oc.Window = nw.Window.get();

		oc.Debug = (oc.Args.indexOf('--debug') > -1);
	}

	function initWindow() {
		if(oc.Debug) oc.Window.showDevTools();
		oc.Window.maximize();

		//oc.Window.showDevTools();
	}

	function initExpressServer(){
		if(oc.Debug) return;

		var spawn = require("child_process").fork;
		global.Express = spawn("node", ['./server/server', expressPort]);

		(function(e,c){
			e.stdout.on("data", function (data) {
				c.log('[EXPRESS]:',data);
			});

			e.on('exit', function (code) {
				c.log('[EXPRESS]: Exited with code ' + code);
			});

		})(global.Express, console);
	}


	//#endregion

}
