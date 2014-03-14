


var routes = function(app){
	require('./controllers/director')(app);
	
	require('./controllers/overlay')(app);
};

module.exports = routes;