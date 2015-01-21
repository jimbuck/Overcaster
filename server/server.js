'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var args = process.argv;

/**
 * Express Web Server
 */

 var startExpress = function(userPort){

	var port = userPort || 6014;

	var app = express();

	// all environments
	app.set('port',  port);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if (app.get('env') === 'development') {
	  app.use(express.errorHandler());
	}

	require('./routes')(app);

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});

	return app;

};


if(require.main === module)  { // started via command line...
	module.exports = startExpress(args[2]);
} else { // started via require...
	module.exports = startExpress;
}

