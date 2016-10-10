module.exports = function(connection, Sequelize){
	var exampleModel = connection.define('exampleModel', {
		id : {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true
		},
		contentKey : {
			type: Sequelize.STRING,
			allowNull: false
		},
		content : {
			type: Sequelize.BLOB('long'),
			allowNull: true
		}
	});

	return exampleModel;
}