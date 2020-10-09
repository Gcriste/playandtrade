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
		}
	});

	return Guitar;
};
