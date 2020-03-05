const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const config = { appRoot: __dirname };

// Body parser
const bodyParser = require('body-parser');
app.use(express.static('./public/'));
app.use(bodyParser.urlencoded({ extended: false, limit: '20000kb' }));
app.use(bodyParser.json({ extended: false, limit: '20000kb' }));


const decodeTokenMiddleware = require('./api/middleware/decodeTokenMiddleware.js');
app.use(decodeTokenMiddleware);

SwaggerExpress.create(config, (err, swaggerExpress) => {
	if (err) {
		throw err;
	}
	swaggerExpress.register(app);
	app.listen(3001);
	console.log(`App listening to ${ 3001 }`);
});
