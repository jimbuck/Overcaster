
/*
 * Backbone Starter
 */

(function (oc, app) {
	$(function () {
		Backbone.history.start({ pushState: true });

		var currentUrl = window.location.pathname;

		if (currentUrl === '/') currentUrl = '/start';

		console.log('Loading to ' + currentUrl);
		app.Router.navigate(currentUrl, true);
	});
})(global.Overcaster, global.Overcaster.App);