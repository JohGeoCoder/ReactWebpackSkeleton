module.exports = function(app, models){
	app.get('/api/data', function(req, res){
	  models.ExampleModel.findOne().then(function(result){
	    var thing = result.get({plain: true});
	    res.json(thing);
	  })
	});
}