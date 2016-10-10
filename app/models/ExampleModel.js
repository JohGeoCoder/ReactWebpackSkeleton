module.exports = function(connection, Sequelize){
	var exampleModel = connection.define('exampleModel', {
		id : {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true
		},
		exampleString : {
			type: Sequelize.STRING,
			allowNull: false
		},
		exampleBlob : {
			type: Sequelize.BLOB('long'),
			allowNull: true
		}
	});

	return exampleModel;
}