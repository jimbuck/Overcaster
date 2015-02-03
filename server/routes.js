'use strict';

var routes = function(app, editLocation, castLocation){

    /**
     * `Cast` page route.
     *   Must be placed before the catch-all route for the `edit` pages.
     */
    app.get('/cast/:sessionId/:sceneId', function (req, res) {

        res.sendFile('index.html', { root: castLocation });
    });

    /**
     * `Edit` page route.
     *   Catch-all route that returns the packaged angular app.
     */
    app.get('/:page?', function (req, res) {

        // Send the static Angular page...
        res.sendFile('index.html', {root: editLocation});
    });
};

module.exports = routes;
