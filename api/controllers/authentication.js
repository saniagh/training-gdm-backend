const authenticationFunctions = require('../functions/authentication.js');

// Controller for POST /login
const login = (req, res) => {
	return authenticationFunctions.login(req.body)
		.then(data => {
			res.status(200).jsonp({
				status: 'success',
				message: 'Successfully logged in',
				data: data
			});
		})
		.catch(err => res.status(400).jsonp({
			status: 'failure',
			message: err,
		}))
};

// Controller for GET /credentials
const getCredentials = (req, res) => {
	return authenticationFunctions.getCredentials(req.decoded)
		.then(user => {
			res.status(200).jsonp({
				status: 'success',
				message: 'Successfully fetched user\'s credentials',
				data: user
			});
		})
		.catch(err => res.status(400).jsonp({
			status: 'failure',
			message: err,
		}))
};

module.exports = {
	login,
	getCredentials
};