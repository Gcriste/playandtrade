const express = require('express');
require('./client/node_modules/dotenv').config();
const passport = require('passport');

const port = process.env.PORT || 5000;
const app = express();
const path = require('path');

// Define middleware here
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Serve up static assets (usually on heroku)

//passport middleware
app.use(passport.initialize());

require('./config/passport')(passport);

require('./routes/api/user')(app);
// require('./routes/api/gig')(app);
// require('./routes/api/request')(app);
// require('./routes/api/discussion')(app);
// require('./routes/api/comment')(app);

const db = require('./models');

db.sequelize.sync().then(() => {
	if (process.env.NODE_ENV === 'production') {
		app.use(express.static('client/build'));
		app.get('*', (req, res) => {
			res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
		});
	}

	app.listen(port, function() {
		console.log(`🌎  ==> API Server now listening on PORT ${port}!`);
	});
});
