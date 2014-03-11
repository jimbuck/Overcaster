var NodeWebkit = require('nw.gui');
var Datastore = require('nedb');
//var Server = require('./server');

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
		oc.Window.maximize();//oc.Window.enterFullscreen();
	}
	
	function initFilesystem(){
		var dirs = ['data','content', 'content/html','content/css', 'content/js'];
		
		for(var d in dirs) {
			if(!oc.FS.existsSync(dirs[d]))
			{
				console.log('Creating directory', dirs[d]);
				oc.FS.mkdirSync(dirs[d], function(err) {
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