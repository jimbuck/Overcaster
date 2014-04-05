
/*
 * Backbone Starter
 */

(function (oc, app) {
	$(function () {

		buildExtensions(oc, app);
		buildViews(oc, app);
		buildModels(oc, app);
		buildData(oc, app);
		buildRouter(oc, app);

		Backbone.history.start({ pushState: true });

		var currentUrl = window.location.pathname;

		if (currentUrl === '/') currentUrl = '/start';

		app.log('Loading to ' + currentUrl);
		app.Router.navigate(currentUrl, true);
	});
})(global.Overcaster, global.Overcaster.App);