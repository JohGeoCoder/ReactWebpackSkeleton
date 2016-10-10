module.exports = function(app, models){
	app.get('/api/data', function(req, res){
	  models.ExampleModel.findOne().then(function(result){
	    var thing = result.get({plain: true});
	    res.json(thing);
	  })
	});

	//Example Sequelize code
	/*app.get('/', function(req, res){
	  connection.sync().then(function(){
	    connection.query('\
	      SELECT parent.* \
	      FROM homepagertes as parent \
	      INNER JOIN( \
	        SELECT contentKey, MAX(createdAt) as latestCreatedAt \
	        FROM homepagertes \
	        GROUP BY contentKey \
	      ) as child \
	      ON parent.contentKey = child.contentKey AND parent.createdAt = child.latestCreatedAt \
	    ', { model: models.HomepageRTE })
	    .then(function(contents){
	      var rteContent = [];
	      contents.forEach(function(e){
	        rteContent[e.dataValues.contentKey] = e.dataValues.content;
	      });
	      res.render('home', {rteContents: rteContent});
	    });
	  });

	});
	*/
}