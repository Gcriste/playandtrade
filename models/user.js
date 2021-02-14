module.exports = function (sequelize, Sequelize) {
	const User = sequelize.define('user', {
		id: {
			type: Sequelize.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		avatar: {
			type: Sequelize.STRING
		},
		profilePic: {
			type: Sequelize.STRING
		},
		zipCode: {
			type: Sequelize.STRING
		},
		country: {
			type: Sequelize.STRING
		},
		overEighteen: {
			type: Sequelize.BOOLEAN
		}
	});
	User.associate = function (models) {
		// Associating Discussion with guitars
		// When a Discussion is deleted, also delete any associated guitars
		User.hasMany(models.guitar, {
			onDelete: 'cascade'
		});
	};

	return User;
};
