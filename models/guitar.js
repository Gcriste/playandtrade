module.exports = function(sequelize, Sequelize) {
	const Guitar = sequelize.define('guitar', {
		id: {
			type: Sequelize.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		brand: {
			type: Sequelize.STRING
		},
		make: {
			type: Sequelize.STRING
		},
		model: {
			type: Sequelize.STRING
		},
		color: {
			type: Sequelize.STRING
		},
		year: {
			type: Sequelize.STRING
		},
		value: {
			type: Sequelize.STRING
		},
		condition: {
			type: Sequelize.STRING
		},
		userid: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		}
	});

	// Guitar.associate = function(models) {
	// 	// We're saying that a guitar should belong to an user
	// 	// A guitar can't be created without a user due to the foreign key constraint
	// 	Guitar.belongsTo(models.user, {
	// 		foreignKey: {
	// 			allowNull: false
	// 		}
	// 	});
	// };

	return Guitar;
};
