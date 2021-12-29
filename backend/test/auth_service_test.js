const chai = require('chai');
var should = require('chai').should();
const chaiHttps = require('chai-http');
const authService = require('../server.js');

describe('Authenticate service', function () {
	after(() => {
		console.log('Done testing');
	});

	chai.use(chaiHttps);
	const testUser = {
		name: 'unit test user name',
		password: 'unit test password',
	};

	let accessToken;
	let refreshToken;

	it('Register service test', function (done) {
		chai
			.request(authService)
			.post('/auth/register')
			.send(testUser)
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.have.property('respond');
				done();

				console.log('status: ', res.status);
			});
	});

	it('Login service test', function (done) {
		chai
			.request(authService)
			.post('/auth/login')
			.send(testUser)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.have.property('accessToken');
				res.body.should.have.property('refreshToken');

				accessToken = res.body.accessToken;
				refreshToken = res.body.refreshToken;
				done();

				console.log('status: ', res.status);
				console.log('access token :', accessToken);
				console.log('refresh token :', refreshToken);
			});
	});

	it('Token authentication test', function (done) {
		chai
			.request(authService)
			.get('/auth/authTest')
			.set('Authorization', 'Bearer ' + accessToken)
			.end((err, res) => {
				res.body.should.have.property('respond');
				done();

				console.log('status: ', res.status);
				console.log(res.body.respond);
			});
	});

	it('Get new access token with the refresh token', function (done) {
		chai
			.request(authService)
			.get('/auth/token')
			.send({ token: refreshToken })
			.end((err, res) => {
				res.body.should.have.property('accessToken');

				done();

				console.log('status: ', res.status);
				console.log(
					'new access token: ',
					res.body.accessToken,
				);
			});
	});

	it('Delete user test', function (done) {
		chai
			.request(authService)
			.post('/auth/deleteUser')
			.set('Authorization', 'Bearer ' + accessToken)
			.end((err, res) => {
				console.log(res.body);
				res.body.should.have.property('respond');
				chai
					.request(authService)
					.post('/login')
					.send(testUser)
					.end((err, res) => {
						res.should.not.have.status(200);
						res.body.should.not.have.property(
							'accessToken',
						);
						res.body.should.not.have.property(
							'refreshToken',
						);
						done();
					});

				console.log('status: ', res.status);
				console.log(res.body.respond);
			});
	});
});
