//Used for database connection
var Sequelize = require('sequelize');
var DatabaseInitializer = require('./DatabaseInitializer.js');

module.exports = function(){

	var connection = DatabaseInitializer(Sequelize);

	var exampleModel = require('./models/exampleModel.js')(connection, Sequelize);

	return {
		ExampleModel : exampleModel
	};
}

