const path = require('path');

const home = (req, res) => {
	return res.sendFile(path.join(`${__dirname}/../../client/src/pages/Dashboard.js`));
};

module.exports = {
	getHome: home
};
