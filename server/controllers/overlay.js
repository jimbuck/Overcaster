
/*
 *   Overlay Controller
 */

var overlayController = function(app){
   
  app.get('/:sessionId', function(req, res) {
		
		var sessionId = req.params.sessionId;
				
		res.render('overlay', { sessionId:  sessionId });
  });
  
};

module.exports = overlayController;