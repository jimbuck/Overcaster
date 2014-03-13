
var expressPort = 6014
var NodeWebkit = require('nw.gui');
var appWindow = NodeWebkit.Window.get();

// Call focus to application...
appWindow.focus();

// Instantiate the Express Server...
var spawn = require("child_process").spawn;
global.Express = spawn("node", ['./server/server', expressPort]);

(function(e,c){
	e.stdout.on("data", expressStdOut);
	function expressStdOut (buffer) {
	  c.log('[EXPRESS]:',buffer.toString());
	}
	
	e.on('exit', expressExit);
	function expressExit(code) {
	  c.log('[EXPRESS]: Exited with code ' + code);
	}
})(global.Express, console);

// Request director page...
window.location.replace('http://localhost:'+expressPort);