module.exports = function(app) {
	const passport = require('passport');
	const bcrypt = require('bcryptjs');
	const db = require('../../models');
	const jwt = require('jsonwebtoken');
	const keys = require('../../config/keys');
	const gravatar = require('gravatar');

	app.get('/api/guitar/test', passport.authenticate('jwt', { session: false }), (req, res) => {
		res.json({
			success: true,
			msg: 'Testing endpoint works'
		});
	});

	// Get route for retrieving guitars based on user
	app.get('/api/guitar/:userid', (req, res) => {
		// Here we add an "include" property to our options in our findOne query
		// We set the value to an array of the models we want to include in a left outer join
		// In this case, just db.user
		db.guitar
			.findAll({
				where: {
					userid: req.params.userid
				}
			})
			.then((guitar) => res.json(guitar));
	});

	//create post route to /api/users
	//creates a new user

	app.post('/api/guitar', (req, res) => {
		const { brand, make, model, color, year, value, condition, userid, email, guitarPic } = req.body;
		db.user
			.findOne({
				where: {
					email
				}
			})
			.then(() => {
				const newGuitar = {
					brand,
					make,
					model,
					color,
					year,
					value,
					condition,
					userid,
					email,
					guitarPic
				};

				db.guitar
					.create(newGuitar)
					.then(() => {
						res.status(200).json(newGuitar);
					})
					.catch((err) => console.log(err));
			});
	});

	// post /api/user/login
	//logs in a user
	app.post('/api/user/login', (req, res) => {
		const { email, password } = req.body;
		db.user.findOne({ where: { email } }).then((user) => {
			if (!user) {
				return res.status(404).json({ user: 'User not found' });
			}

			let currentUser = user.get();
			bcrypt.compare(password, currentUser.password).then((isMatch) => {
				if (isMatch) {
					db.user
						.findOne({
							where: { id: user.id }
						})
						.then((user) => {
							const payload = {
								id: user.id,
								email: user.email,
								firstName: user.firstName,
								lastName: user.lastName,
								avatar: user.avatar,
								country: user.country,
								zipCode: user.zipCode,
								profilePic: user.profilePic,
								overEighteen: user.overEighteen
							};
							jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 * 12 }, (err, token) => {
								res.json({
									...payload,
									success: true,
									token: `Bearer ${token}`
								});
							});
						})
						.catch((err) => console.log(error));
				} else {
					return res.status(400).json({
						password: 'Incorrect password'
					});
				}
			});
		});
	});

	//route PUT /api/user/
	app.put('/api/user', passport.authenticate('jwt', { session: false }), (req, res) => {
		db.user
			.update(
				{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					zipCode: req.body.zipCode,
					avatar: req.body.avatar,
					country: req.body.country,
					profilePic: req.body.profilePic,
					overEighteen: req.body.overEighteen
				},
				{
					where: { id: req.user.id }
				}
			)
			.then(() => {
				db.user
					.findOne({
						where: { id: req.user.id }
					})
					.then((user) => {
						res.status(200).json({
							firstName: user.firstName,
							lastName: user.lastName,
							email: user.email,
							message: 'user account successfully updated',
							avatar: user.avatar,
							profilePic: user.profilePic,
							zipCode: user.zipCode,
							country: user.country,
							overEighteen: user.overEighteen,
							userUpdated: true
						});
					});
			})
			.catch((err) => res.status(422).json(err));
	});
};
