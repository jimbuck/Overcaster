
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
			'layouts': 'layouts',
			'elements': 'elements',
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
		
		layouts: function () {			
				
			app.Data.Layouts.find({}, function(err, layouts){
				
				if(err){
					console.log(err);
					return;
				}
				
				app.Views.Layouts.render(layouts);
			});
		},

		elements: function () {
			app.Data.Elements.find({}, function(err, elements){
				
				if(err){
					console.log(err);
					return;
				}
				
				app.Views.Elements.render(elements);
			});
		},

		settings: function () {
			global.settings.load(function (err, data) {
				if (err)
				{
					console.log(err);
					return;
				}
				
				app.Views.Settings.render(data);
			});
		}
	});

	app.Router = new _router();
	app.navigate = function (route) {
		app.Router.navigate.call(app.Router, route, true);
	}
};