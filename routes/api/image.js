module.exports = function(app) {
	const passport = require('passport');
	const multer = require('multer');
	const bcrypt = require('bcryptjs');
	const db = require('../../models');
	const jwt = require('jsonwebtoken');
	const keys = require('../../config/keys');
	const gravatar = require('gravatar');
	const DIR = 'public';
	const uuidv4 = require('uuid');

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, DIR);
		},
		filename: (req, file, cb) => {
			const fileName = file.originalname.toLowerCase().split(' ').join('-');
			cb(null, uuidv4() + '-' + fileName);
		}
	});

	var upload = multer({
		storage: storage,
		fileFilter: (req, file, cb) => {
			if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
				cb(null, true);
			} else {
				cb(null, false);
				return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
			}
		}
	});

	app.post(
		'/api/image',
		upload.single('profileImg'),
		passport.authenticate('jwt', { session: false }),
		(req, res, next) => {
			const url = req.protocol + '://' + req.get('host');
			const { email } = req.body;
			const profileImg = url + '/public/' + req.file.filename;
			db.image
				.findOne({
					where: {
						email: req.body.email
					}
				})
				.then((image) => {
					const newImage = {
						profileImg,
						email
					};
					db.image
						.create(newImage)
						.then((image) => {
							res.status(200).json({
								message: 'User registered successfully!',
								userCreated: {
									id: image.id,
									profileImg: image.profileImg,
									email: image.email
								}
							});
						})
						.catch((err) => console.log(err));
				});
		}
	);

	// gets current image from user
	app.get('/api/image', passport.authenticate('jwt', { session: false }), (req, res) => {
		db.image
			.findOne({ where: { id: req.image.id } })
			.then((image) => {
				if (image) {
					res.status(200).json(image);
				}
			})
			.catch((err) => console.log(err));
	});
};
