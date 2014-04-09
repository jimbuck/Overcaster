
/*
 *  Backbone Data
 */

var buildData = function (oc, app) {
	app.log('Building data...');

	var Datastore = global.Datastore = require('nedb');

	app.Data = {};
	
	var mapDir = function (p) {
		return global.__dirname + p;
	}

	if (!global.fs.existsSync(mapDir('/data'))) {
		global.fs.mkdir(mapDir('/data'));
	}

	app.Data.Settings = global.settings;
	app.Data.Sessions = new Datastore({ filename: mapDir('/data/sessions.oc'), autoload: true });
	app.Data.Scenes = new Datastore({ filename: mapDir('/data/scenes.oc'), autoload: true });
	app.Data.Layouts = new Datastore({ filename: mapDir('/data/layouts.oc'), autoload: true });
	app.Data.Elements = new Datastore({ filename: mapDir('/data/elements.oc'), autoload: true });
};