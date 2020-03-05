const jwt = require('jsonwebtoken');

const publicOrigins = [
	'/login'
];

const decodeToken = (req, res, next) => {
	if (publicOrigins.find(o => req.originalUrl.indexOf(o) !== -1)) {
		return next();
	} else {
		const token = req.headers && req.headers.authorization ? req.headers.authorization.replace('bearer ', '') : null;
		if (!token) {
			return res.status(401).jsonp({
				status: 'error',
				error: 'You need to log in before viewing this'
			})
		} else {
			jwt.verify(token, 'mySecret123', (err, decoded) => {
				if (err) {
					switch(err.name) {
						case 'TokenExpiredError': {
							return res.status(401).jsonp({
								status: 'error',
								error: 'The session has expired. Please re-login.'
							});
						}
						case 'JsonWebTokenError': {
							return res.status(401).jsonp({
								status: 'error',
								error: 'The session is invalid. Please re-login.',
							});
						}
						default: {
							return res.status(401).jsonp({
								status: 'error',
								error: 'There has been an error. Please re-login.'
							});
						}
					}
				}
				req.decoded = decoded;
				req.decoded.token = token;
				return next();
			})
		}
	}
};

module.exports = decodeToken;
