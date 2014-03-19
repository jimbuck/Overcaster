
/*
 *  Backbone Views
 */

(function (oc, app) {
	app.Views = {};

	app.Views.Body = (function () {
		var _view = Backbone.View.extend({
			el: 'body',
			events: {
				"click a": "interceptHyperlinks"
			},
			interceptHyperlinks: function (e) {
				var hyperlink = $(e.currentTarget);
				if (hyperlink.is(":internal")) {
					e.preventDefault();
					app.navigate(hyperlink.attr("href").replace(window.location.protocol + "//" + window.location.host, ""));
				}
			}
		});

		return new _view();
	})();

	app.Views.MainNav = (function () {
		var _view = Backbone.View.extend({
			el: 'ul.nav.navbar-nav',
			events: {
				
			}
		});

		return new _view();
	})();

	app.CopyrightYear = (function () {
		var _view = Backbone.View.extend({
			el: ".current-year",
			initialize: function () {
				var n = this;
				setInterval(function () {
					n.$el.text((new Date).getFullYear())
				}, 6e4) // 60 seconds...
			}
		});
		return new _view;
	})();


	//#region Main Pages

	app.Views.MainPage = (function () {
		return Backbone.View.extend({
			el: '#main-content',
			pageUrl: '',
			templateSelector: '',
			template: function (model) {
				if (!this._template)
					this._template = Handlebars.compile($(this.templateSelector).html());

				return this._template(model);
			},
			render: function (model) {
				model = model || {};

				var mainNav = $('#main-nav');
				mainNav.find('.active').removeClass('active');
				mainNav.find('.main-page-link > a[href^="' + this.pageUrl + '"]').closest('li').addClass('active');

				this.$el.html(this.template(model));
			}
		});
	})();

	app.Views.Start = (function () {
		var _view = app.Views.MainPage.extend({
			templateSelector: '#start-page-template',
			pageUrl: '/start'
		});

		return new _view();
	})();

	app.Views.Scenes = (function () {
		var _view = app.Views.MainPage.extend({
			templateSelector: '#scenes-page-template',
			pageUrl: '/scenes'
		});

		return new _view();
	})();

	app.Views.Layouts = (function () {
		var _view = app.Views.MainPage.extend({
			templateSelector: '#layouts-page-template',
			pageUrl: '/layouts'
		});

		return new _view();
	})();

	app.Views.Elements = (function () {
		var _view = app.Views.MainPage.extend({
			templateSelector: '#elements-page-template',
			pageUrl: '/elements'
		});

		return new _view();
	})();

	app.Views.Settings = (function () {
		var _view = app.Views.MainPage.extend({
			templateSelector: '#settings-page-template',
			pageUrl: '/settings'
		});

		return new _view();
	})();

	//#endregion

	$(function () {

		$('.current-year').text(new Date().getFullYear());

		$('.navbar a[href="' + window.location.pathname + '"]').closest('li').addClass('active');
	});
})(global.Overcaster, global.Overcaster.App);