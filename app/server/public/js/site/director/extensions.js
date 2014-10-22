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
			if (console.dir && data)
				console.dir(data);
		}

		if (typeof msg === 'string' && app.Views && app.Views.AppStatus)
			app.Views.AppStatus.setStatus(msg);

		// Winston logging goes here...
	}

	app.tooltip = function (msg) {
		if (typeof msg === 'string' && app.Views && app.Views.TooltipHint)
			app.Views.TooltipHint.setTooltip(msg);
	}

	Handlebars.registerHelper('editable', function (context, options) {
		var params = options.hash;

		var el = $('<' + params.element + '/>');
		el.attr('contenteditable', 'true');
		if (params.class) el.addClass(params.class);
		if (params.id) el.attr('id', params.id);
		if (params.placeholder) el.text(params.placeholder);

		return new Handlebars.SafeString(el[0].outerHTML);
	});

	Handlebars.registerHelper('default', function (context, options) {
		if (context)
			return context;

		return options.hash.value;
	});

	Handlebars.registerHelper('grid', function (context, options) {
		var totalBoxes = context.length + 1;
		var columns = 5;
		var rows = Math.ceil(totalBoxes / columns);

		var html = '';

		for (var i = 0; i < rows; i++) {
			html += '<div class="row"><div class="col-md-1"></div>';

			for (var j = 0; j < columns; j++) {
				var index = (i * columns) + j;
				var block = context[index];

				if (index === totalBoxes || typeof block !== 'undefined') {
					html += '<div class="col-md-2">' + options.fn(block) + '</div>';
				}
			}

			html += '</div>';
		}

		return html;
	});
};