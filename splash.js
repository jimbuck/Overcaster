global.NodeWebkit = require('nw.gui');
global.Path = require('path');
global.fs = require('fs');
 
global.__dirname = global.Path.dirname(process.execPath).replace(/\\/gi,'/');

global.Overcaster = {};

var expressPort = 6014;

(function(oc, nw){
	
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
		
		oc.Window.showDevTools();
	}

	function initExpressServer(){
		if(oc.Debug) return;
		
		var spawn = require("child_process").spawn;
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

	function initFilesystem(){
		var dirs = ['/data','/elements', '/content','/images'];
		
		for(var d in dirs) {
			var dir = global.__dirname+dirs[d];
			
			if(!global.fs.existsSync(dir))
			{
				console.log('Creating directory', dir);
				global.fs.mkdirSync(dir, function(err) {
					if(err){
						console.error(err);
					}
				});
			 }
		 }
	}


	//#endregion
	
})(global.Overcaster, global.NodeWebkit);