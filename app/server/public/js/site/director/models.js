
/*
 *  App Models
 */

var buildModels = function (oc, app) {
	app.log('Building models...');
	app.Models = {};

	app.Models.MediaType = {
		Unknown: null,
		Script: 1,
		Style: 2,
		Image: 3,
		Audio: 4,
		Video: 5,
		Embed: 6
	}

	var nedbModel = Backbone.Model.extend({
		table: '',
		sync: function (options, cb) {
			// Dare I override sync?
		}
	});

	app.Models.Session = Backbone.Model.extend({
		defaults: {
			name: 'Session',
			startDate: null,
			endDate: null,
			width: 1920,
			height: 1080
		}
	});

	app.Models.Scene = Backbone.Model.extend({
		defaults: {
			name: 'Scene',
			sessionId: null
		}
	});

	app.Models.Layout = Backbone.Model.extend({
		defaults: {
			name: 'Layout'
		}
	});

	app.Models.Element = Backbone.Model.extend({
		defaults: {
			name: 'Element'
		}
	});

	app.Models.Media = Backbone.Model.extend({
		defaults: {
			name: 'Media',
			filePath: null,
			type: app.Models.MediaType.Unknown
		}
	});

};