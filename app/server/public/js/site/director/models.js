
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
			name: 'Default Scene',
			sessionId: null
		}
	});

	app.Models.Layout = Backbone.Model.extend({
		defaults: {
			name: 'Default Layout'
		}
	});

	app.Models.Element = Backbone.Model.extend({
		defaults: {
			name: 'Default Element'
		}
	});

	app.Models.Media = Backbone.Model.extend({
		defaults: {
			name: 'Default Media',
			filePath: null,
			type: app.Models.MediaType.Unknown
		}
	});

};