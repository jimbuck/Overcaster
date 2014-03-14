
/*
 *   Director Controller
 */

var directorController = function(app){
  
  // Director home...
  
  app.get('/:page?', function(req, res) {
		
		var page = req.params.page || 'index';
		console.log(page);
		
		res.render('director/'+page, {
			
		});
	});
  
};

module.exports = directorController;