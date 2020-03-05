const jwt = require('jsonwebtoken');

/**
 * Perform login for a user
 * @param data {Object}
 * @returns {Promise}
 */
const login = data => {
	return new Promise((resolve, reject) => {
		if (!data.email || !data.password) {
			return reject('Invalid credentials')
		}
		return resolve({
			token: jwt.sign({ email: data.email }, 'mySecret123')
		});
	})
};

/**
 * Fetch credentials for a logged in user
 * @param decoded {Object}
 * @returns {{email: *}}
 */
const getCredentials = decoded => {
	return new Promise(resolve => {
		return resolve({
			email: decoded.email
		})
	});
};

module.exports = {
	login,
	getCredentials
};
