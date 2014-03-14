


var routes = function(app){

	require('./controllers/overlay')(app);
	
	require('./controllers/director')(app);
};

module.exports = routes;