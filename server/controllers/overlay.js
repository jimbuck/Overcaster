
/*
 *   Overlay Controller
 */

var overlayController = function(app){
   
  app.get('/overlay/:sessionId/:sceneId', function(req, res) {
		
		var sessionId = req.params.sessionId;
		var sceneId = req.params.sceneId;
		
		res.render('overlay', { sessionId:  sessionId });
  });
  
};

module.exports = overlayController;