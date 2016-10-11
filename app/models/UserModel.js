module.exports = function(connection, Sequelize){
	var user = connection.define('user', {
		id : {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true
		},
		username : {
			type: Sequelize.STRING,
			allowNull: false
		},
		passhash : {
			type: Sequelize.BLOB('long'),
			allowNull: true
		}
	});

	return user;
}