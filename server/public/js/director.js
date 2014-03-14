var NodeWebkit = require('nw.gui');
var Datastore = require('nedb');
var Path = require('path');
var FS = require('fs');

window.__dirname = Path.dirname(process.execPath).replace(/\\/gi,'/');

global.Overcaster = {};

(function(oc){
	
	initGlobalVars();
	initWindow();
	//initFilesystem();
	//initDatastore();
	initViews();
	
	//#region Init Functions
	
	function initGlobalVars(){
		
		if(!oc.App) oc.App = NodeWebkit.App;
		
		if(!oc.Window) oc.Window = NodeWebkit.Window.get();
	}
	
	function initWindow() {
		
		if(!oc.Window.isDevToolsOpen()) oc.Window.showDevTools();
		oc.Window.maximize();
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
	
	function initViews(){
		$(function(){
			
			$('.current-year').text(new Date().getFullYear());
			
			$('.navbar a[href="'+window.location.pathname+'"]').closest('li').addClass('active');
		});
	}
	
	//#endregion
	

})(global.Overcaster);