var NodeWebkit = require('nw.gui');
var Datastore = require('nedb');
var Path = require('path');
var FS = require('fs');

global.__dirname = Path.dirname(process.execPath).replace(/\\/gi,'/');
var expressPort = 6014;

var appWindow = NodeWebkit.Window.get();

global.Overcaster = {};

(function(oc){
	
	initGlobalVars();
	initWindow();
	initExpressServer();
	//initFilesystem();
	//initDatastore();
	
	//#region Init Functions
	
	function initGlobalVars(){
		
		if(!oc.App) oc.App = NodeWebkit.App;
		
		if(!oc.Window) oc.Window = NodeWebkit.Window.get();
		
		if(!oc.Args) oc.Args = oc.App.argv;
		
		oc.Debug = (oc.Args.indexOf('--debug') > -1);
	}
	
	function initWindow() {
		if(oc.Debug && !oc.Window.isDevToolsOpen()) oc.Window.showDevTools();
		oc.Window.maximize();
	}
	
	function initExpressServer(){
		var spawn = require("child_process").spawn;
		global.Express = spawn("node", ['./server/server', expressPort]);

		(function(e,c){
			e.stdout.on("data", expressStdOut);
			function expressStdOut (data) {
			  c.log('[EXPRESS]:',data);
			}
			
			e.on('exit', expressExit);
			function expressExit(code) {
			  c.log('[EXPRESS]: Exited with code ' + code);
			}
		})(global.Express, console);
	}
	
	function initFilesystem(){
		var dirs = ['/data','/elements', '/content','/images'];
		
		for(var d in dirs) {
			var dir = __dirname+dirs[d];
			
			if(!FS.existsSync(dir))
			{
				console.log('Creating directory', dir);
				FS.mkdirSync(dir, function(err) {
					if(err){
						console.error(err);
					}
				});
			 }
		 }
	}
	
	function initDatastore(){
		oc.Data = {
			Controls: new Datastore({ filename: './data/controls.db', autoload: true }),
			Animations: new Datastore({ filename: './data/animations.db', autoload: true })
		};
	}
	
	function initEvents(){
		oc.Window.on('close', function(e){


			this.close(true)
		});
	}
	
	//#endregion
	

})(global.Overcaster);


// Request director page...
window.location.replace('http://localhost:'+expressPort);