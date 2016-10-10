module.exports = function(connection, Sequelize){

	var exampleModel = require('./models/exampleModel.js')(connection, Sequelize);

	return {
		ExampleModel : exampleModel
	};
}

