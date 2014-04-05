
/*
 *  Backbone Data
 */

var buildData = function (oc, app) {
	var Datastore = global.Datastore = require('nedb');

	app.Data = {};

	var fs = global.fs;

	if (!fs.existsSync('/data')) {
		fs.mkdir('/data');
	}

	app.Data.Sessions = new Datastore({ filename: '/data/sessions.oc', autoload: true });
	app.Data.Scenes = new Datastore({ filename: '/data/scenes.oc', autoload: true });
	app.Data.Layouts = new Datastore({ filename: '/data/layouts.oc', autoload: true });
	app.Data.Elements = new Datastore({ filename: '/data/elements.oc', autoload: true });




	// Seed test data...
	app.Data.Sessions.insert({}, function (err, newDoc) {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
});


};