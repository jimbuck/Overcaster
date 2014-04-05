
/*
 *  Backbone Router
 */

var buildRouter = function (oc, app) {
	app.log('Building router...');
	var _router = Backbone.Router.extend({

		routes: {
			'start': 'start',
			'scenes(/:id)': 'scenes',
			'layouts(/:id)': 'layouts',
			'elements(/:id)': 'elements',
			'settings': 'settings'
		},

		start: function () {
			app.Views.Start.render();
		},

		scenes: function (id) {
			if (id)
				app.Views.SceneEdit.render(id);
			else
				app.Views.Scenes.render();
		},

		layouts: function (id) {
			if (id)
				app.Views.LayoutEdit.render(id);
			else
				app.Views.Layouts.render();
		},

		elements: function (id) {
			if (id)
				app.Views.ElementEdit.render(id);
			else
				app.Views.Elements.render();
		},

		settings: function () {
			global.settings.load(function (err, data) {
				if (err)
					console.log(err);
				else
					app.Views.Settings.render(data);
			});
		}
	});

	app.Router = new _router();
	app.navigate = function (route) {
		app.Router.navigate.call(app.Router, route, true);
	}
};