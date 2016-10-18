module.exports = function(app, models, passport){
	app.get('/api/data', function(req, res){
	  models.ExampleModel.findOne().then(function(result){
	    var thing = result.get({plain: true});
	    res.json(thing);
	  })
	});

	app.post('/api/login', function(req, res){
		passport.authenticate('local-login', function(err, user, info){
			console.log("Error: " + err)
			console.log("User: " + user)
			console.log("Info: " + JSON.stringify(info))

			if(err){
				res.json({ 'success' : false });
				return;
			}

			if(!user){
				res.json({ 'success' : false });
				return;
			}

			req.logIn(user, function(err){
				if(err){
					res.json({ 'success' : false });
					return;
				}

				res.json({ 'success' : true })
			})

		})(req, res);
	});

	app.post('/api/signup', function(req, res){
		passport.authenticate('local-signup', {
			successRedirect: '/',
			failureRedirect: '/coaches',
			failureFlash: true
		},
		function(err, user, info){
			console.log("Error: " + err)
			console.log("User: " + user)
			console.log("Info: " + info)
		})
	})

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