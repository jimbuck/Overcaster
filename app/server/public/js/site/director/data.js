
/*
 *  Backbone Data
 */

var buildData = function (oc, app) {
	app.log('Building data...');

	var Datastore = global.Datastore = require('nedb');

	app.Data = {};

	var fs = global.fs;

	var mapDir = function (p) {
		return global.__dirname + p;
	}

	global.__dirname
	if (!fs.existsSync(mapDir('/data'))) {
		fs.mkdir(mapDir('/data'));
	}

	app.Data.Sessions = new Datastore({ filename: mapDir('/data/sessions.oc'), autoload: true });
	app.Data.Scenes = new Datastore({ filename: mapDir('/data/scenes.oc'), autoload: true });
	app.Data.Layouts = new Datastore({ filename: mapDir('/data/layouts.oc'), autoload: true });
	app.Data.Elements = new Datastore({ filename: mapDir('/data/elements.oc'), autoload: true });

	app.Data.Sessions.count({}, function (err, count) {
		if (count == 0) {
			var session = new app.Models.Session().toJSON();

			app.Data.Sessions.insert(session, function (err, session) {
				if (err)
					app.log(err);
				else
					app.log('Test session added!', session);
			});
		}
	});

	app.Data.Scenes.count({}, function (err, count) {
		if (count == 0) {
			var scene = new app.Models.Scene().toJSON();

			app.Data.Scenes.insert(scene, function (err, scene) {
				if (err)
					app.log(err);
				else
					app.log('Test scene added!', scene);
			});
		}
	});

};