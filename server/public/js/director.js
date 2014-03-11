var NodeWebkit = require('nw.gui');
var Datastore = require('nedb');
var Path = require('path');

window.__dirname = Path.dirname(process.execPath).replace(/\\/gi,'/');

var Overcaster = {};

(function(oc){
	
	oc.App = NodeWebkit.App;
	oc.Window = NodeWebkit.Window.get();
	oc.FS = require('fs');
	
	initWindow();
	initFilesystem();
	//initDatastore();
	
	//#region Init Functions
	
	function initWindow() {
		oc.Window.showDevTools();
		oc.Window.maximize();
	}
	
	function initFilesystem(){
		var dirs = ['/data','/elements', '/content','/images'];
		
		for(var d in dirs) {
			var dir = __dirname+dirs[d];
			
			if(!oc.FS.existsSync(dir))
			{
				console.log('Creating directory', dir);
				oc.FS.mkdirSync(dir, function(err) {
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
	

})(Overcaster);