module.exports = function(sequelize, Sequelize) {
	const Image = sequelize.define('image', {
		id: {
			type: Sequelize.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		profileImg: {
			type: Sequelize.STRING
		}
	});

	return Image;
};
