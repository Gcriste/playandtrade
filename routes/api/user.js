module.exports = function(app) {
	const passport = require('passport');
	const bcrypt = require('bcryptjs');
	const db = require('../../models');
	const jwt = require('jsonwebtoken');
	const keys = require('../../config/keys');
	const gravatar = require('gravatar');

	app.get('/api/user/test', passport.authenticate('jwt', { session: false }), (req, res) => {
		res.json({
			success: true,
			msg: 'Testing endpoint works'
		});
	});

	// Route GET /api/user
	// gets current user
	app.get('/api/user', passport.authenticate('jwt', { session: false }), (req, res) => {
		db.user
			.findOne({ where: { id: req.user.id } })
			.then((user) => {
				if (user) {
					res.status(200).json(user);
				}
			})
			.catch((err) => console.log(err));
	});

	//create post route to /api/users
	//creates a new user
	app.post('/api/user', (req, res) => {
		const { email, password, firstName, lastName } = req.body;
		db.user
			.findOne({
				where: {
					email: req.body.email
				}
			})
			.then((user) => {
				if (user) {
					return res.status(400).json({
						email: 'this email already exists'
					});
				} else {
					const avatar = gravatar.url(email, {
						s: '200',
						r: 'pg',
						d: 'mm'
					});

					const newUser = {
						firstName,
						lastName,
						email,
						password,
						avatar
					};

					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							newUser.password = hash;

							db.user
								.create(newUser)
								.then((user) => {
									res.status(200).json({
										message: 'User account successfully created.',
										userCreated: true
									});
								})
								.catch((err) => console.log(err));
						});
					});
				}
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
								avatar: user.avatar
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
					email: req.body.email
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
							userUpdated: true
						});
					});
			})
			.catch((err) => res.status(422).json(err));
	});
};
