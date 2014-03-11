
/*
 *   Home Controller
 */

var homeController = function(app){
  
  app.get('/', function(req, res) {
		
		var sessionId = (new Date()).getTime() + ':' + Math.random()*9999999999;
		
		res.render('director', { sessionId:  sessionId });
  });
  
  app.get('/:sessionId', function(req, res) {
		
		var sessionId = req.params.sessionId;
				
		res.render('overlay', { sessionId:  sessionId });
  });
  
};

module.exports = homeController;