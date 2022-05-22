require('dotEnv').config;
const express = require('express');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const authService = require('./routes/authRoutes');
const postService = require('./routes/postRoutes');
const path = require('path');
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DATA_BASE, (err, db) => {
	postService.createIndex(db);
});
mongoose.connection
	.once('open', function () {
		console.log('Connection has been made.');
	})
	.on('error', function (error) {
		console.log('Connection error: ', error);
	});

// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', function (req, res) {
// 	res.sendFile(
// 		path.join(__dirname, 'public', 'index.html'),
// 	);
// });

app.use(
	'/auth',
	cors({
		origin: process.env.CLIENT_DNS,
		credentials: true,
	}),
	authService.routes,
);

app.use(
	'/posts',
	cors({
		origin: process.env.CLIENT_DNS,
		credentials: true,
	}),
	postService.routes,
);

// can be remove at any time
app.get('/', cors(), (req, res, next) => {
	console.log('run test');
	res.json({
		respond: 'Test run successfully',
	});
});

function stop() {
	console.log('Closing server');
	server.close();
}
// TODO: sign certificate with official domain
// https
// 	.createServer(
// 		{
// 			key: fs.readFileSync('ssl/key.pem'),
// 			cert: fs.readFileSync('ssl/certificate.pem'),
// 		},
// 		app,
// 	)
// 	.listen(process.env.port, () => {
// 		console.log(
// 			'Server up and running over SSL in port: ' +
// 				process.env.port,
// 		);
// 	});
app.listen(process.env.PORT, () => {
	console.log(
		'Server up and running in port: ' + process.env.port,
	);
});

module.exports = app;
module.exports.stop = stop;
