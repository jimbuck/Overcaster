
/*
 *  Director Controller
 */

var directorController = function (app) {

	// Director home...

	app.get('/:initPage?', function (req, res) {

		if (req.params.initPage == 'LKJSDFLKJDFLKSDJF') {
			// Do something else...

			return;
		}

		// Render the page templates and initialize the Backbone app...
		res.render('director/index');
	});
};

module.exports = directorController;