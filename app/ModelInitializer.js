module.exports = function(connection, Sequelize){

	var exampleModel = require('./models/exampleModel.js')(connection, Sequelize);
	var userModel = require('./models/UserModel.js')(connection, Sequelize);

	return {
		ExampleModel : exampleModel,
		User: userModel
	};
}

