module.exports = function(Sequelize){
	var connection = new Sequelize('skeleton_db', 'root', 'password', {
	  host: 'localhost',
	  port: 3306,
	  dialect: 'mysql'
	});

	connection.authenticate().then(function(err){
	  if(err){
	    console.log('Connection ERROR');
	  } else{
	    console.log('Connection SUCCESS');
	  }
	}).catch(function(err){
	  console.log("Unable to connect to the database", err);
	});

	connection.sync();
	
	return connection;
}