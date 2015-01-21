'use strict';

var routes = function(app){

    /**
     * `Cast` page route.
     *   Must be placed before the catch-all route for the `edit` pages.
     */
    app.get('/cast/:sessionId/:sceneId', function (req, res) {

        res.sendFile('/cast/index.html');
    });

    /**
     * `Edit` page route.
     *   Catch-all route that returns the packaged angular app.
     */
    app.get('/:initPage?', function (req, res) {

        if (req.params.initPage === 'api') {
            // Handle some API call...
            return;
        }

        // Send the static Angular page...
        res.sendFile('/edit/index.html');
    });
};

module.exports = routes;
