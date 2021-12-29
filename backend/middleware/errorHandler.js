function errorHandler(err, req, res, next) {
	console.log('run error handler');
	// console.log(err.stack);
	console.log(err.message);
	res
		.status(500)
		.send(
			'Something went wrong here. Please try again later.',
		);
}

module.exports = errorHandler;
