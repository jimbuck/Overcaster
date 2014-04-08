
/*
 *  Backbone Router
 */

var buildRouter = function (oc, app) {
	app.log('Building router...');
	var _router = Backbone.Router.extend({

		routes: {
			'start': 'start',
			'scenes': 'scenes',
			'scene-editor(/:id)': 'sceneEditor',
			'layouts(/:id)': 'layouts',
			'elements(/:id)': 'elements',
			'settings': 'settings'
		},

		start: function () {
			app.Views.Start.render();
		},

		scenes: function (id) {
			
			app.Data.Scenes.find({}, function(err, scenes){
				
				if(err){
					console.log(err);
					return;
				}
				
				app.Views.Scenes.render(scenes);
			});
			
			app.Views.Scenes.render();
		},
		
		sceneEditor: function (id){
			
			if(_.isUndefined(id)){
				app.Views.SceneEditor.render();
				return;
			}
			
			app.Data.Scenes.findOne({ _id: id }, function(err, scene){
				
				if(err){
					console.log(err);
					return;
				}
				
				app.Views.SceneEditor.render(scene);
			});
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