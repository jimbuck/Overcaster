
exports = function(options){
	
	var Server = {};

	Server.App = require('http').createServer(httpHandler);
	Server.IO = require('socket.io').listen(Server.App);
	Server.FS = require('fs');

	Server.App.listen(options.port || 6014);
	
	console.log('webserver now listening on port ' + (options.port || 6014));
	
	function httpHandler (req, res) {
		var sessionId = -1;
		var filename = __dirname;
		console.log(req.url);
		if(req.url === '/director'){
			sessionId = (new Date()).getTime() + ':' + Math.random()*9999999999;
			filename += '/pages/director.html';
		} else {
			sessionId = req.url.substring(1);
			filename += '/pages/overlay.html';
		}
		
		Server.FS.readFile(filename, 'utf-8',
		function (err, html) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading '+ req.url);
			}
			
			html = html.replace('{{SESSION_ID}}', sessionId)
			res.writeHead(200);
			res.end(html);
		});
	}

	Server.IO.sockets.on('connection', function (socket) {
		socket.emit('news', { hello: 'world' });
		socket.on('element changed', function (data) {
			
		});
	});
	
	return Server;
};

exports({});