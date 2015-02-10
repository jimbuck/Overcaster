'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var args = process.argv.slice(2);

var favicon = require('serve-favicon');
var serveStatic = require('serve-static');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

/**
 * Express Web Server
 */

function print(message) {
  console.log('[EXPRESS]: ' + message);

  if(typeof process.send === 'function') {
    process.send(message);
  }

  if(typeof alert !== 'undefined'){
    alert(message);
  }
}

var startExpress = function (port, isDebug) {

  var editLocation;
  var castLocation;

  if(isDebug) {
    print('SERVER STARTED IN DEBUG MODE');
    editLocation = path.join(__dirname, '../edit/app');
    castLocation = path.join(__dirname, '../cast');
  } else {
    editLocation = path.join(__dirname, '/public/edit');
    castLocation = path.join(__dirname, '/public/cast');
  }

  port = port || 9000;

  print('Starting ...');
  print('Port: ' + port);
  print('Edit: ' + editLocation);
  print('Cast: ' + castLocation);

  var app = express();

  print(45);

  // all environments
  app.use(morgan('tiny'));
  app.set('port', port);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  if (isDebug) {
    print('SETTING DEBUG PATHS!');
    //app.use(favicon(path.join(editLocation, '/favicon.ico')));
    app.use('/bower_components', serveStatic(path.join(editLocation, '../bower_components')));
  } else {
    //app.use(favicon(path.join(__dirname, '/favicon.ico')));
  }

  print(60);

  app.use('/', serveStatic(editLocation));
  app.use('/cast', serveStatic(castLocation));

  // development only
  if (app.get('env') === 'development') {
    app.use(errorHandler());
  }

  print(70);

  require('./routes')(app, editLocation, castLocation);

  http.createServer(app).listen(app.get('port'), function () {
    print('Express server listening on port ' + app.get('port'));
  });

  print(78);

  return app;
};

if (require.main === module) { // started via command line...
  print(84);
  module.exports = startExpress.apply({}, args);
  print(86);
} else { // started via require...
  print(88);
  module.exports = startExpress;
  print(90);
}

