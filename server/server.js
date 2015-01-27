'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var args = process.argv;

var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

/**
 * Express Web Server
 */

var startExpress = function (port, editLocation, castLocation) {

  editLocation = path.join(__dirname, '../edit/app');
  castLocation = path.join(__dirname, '../cast/app');

  var isDebug = (typeof editLocation !== 'undefined' && typeof castLocation !== 'undefined');

  port = port || 9000;

  var app = express();

  // all environments
  app.use(morgan('combined'));
  app.set('port', port);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  if (isDebug) {
    app.use(favicon(path.join(editLocation, '/favicon.ico')));
    app.use('/edit', serveStatic(editLocation));
    app.use('/cast', serveStatic(castLocation));
  } else {
    //app.use(favicon(path.join(__dirname, '/favicon.ico')));
    app.use('/', serveStatic(path.join(__dirname, 'public')));
  }

  // development only
  if (app.get('env') === 'development') {
    app.use(errorHandler());
  }

  require('./routes')(app, editLocation, castLocation);

  http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  });

  return app;

};


if (require.main === module) { // started via command line...
  module.exports = startExpress(args[2]);
} else { // started via require...
  module.exports = startExpress;
}

