/*
 * Backbone Extensions
 */

var buildExtensions = function (oc, app) {
	$.expr[":"].external = function (n) {
		var t = $(n).attr("href");
		return t === undefined ? !1 : t.indexOf(window.location.protocol + "//" + window.location.host) >= 0 ? !1 : t.indexOf("mailto:") === 0 || t.indexOf("javascript:") === 0 || t.search(/^\w+:\/\//) !== -1
	}

	$.expr[":"].internal = function (n) {
		return $(n).attr("href") !== undefined && !$.expr[":"].external(n)
	}

	app.log = function (msg, data) {

		if (console.log) {
			console.log(msg);
			console.dir(data);
		}

		if (typeof msg === 'string')
			$('#appStatus').html(msg);

		// Winston logging goes here...
	}
};