const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/user');
const Profile = require('../models/profile');
const inputGuard = require('../utils');
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

/**
 * For unit test only
 * test token authentication middleware
 */
router.get('/authTest', verifyToken, (req, res) => {
	res.json({
		respond: 'you are authorized!',
		name: req.body.name,
	});
});

router.post('/register', async (req, res) => {
	try {
		// Search for user with the same email
		User.findOne({ email: req.body.email }).then(async (result) => {
			/* 
				If cant find user with same
				email then create new user
				*/
			if (result == null) {
				// Hash password before stored in db
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(req.body.password, salt);
				// Create new user from schema
				const user = new User({
					email: req.body.email,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					password: hashedPassword,
					registerDate: Date(),
					lastActiveAt: Date(),
					posts: [],
					votes: [],
					comments: [],
				});
				// Save the new user in the db
				user.save().then(function () {
					user.isNew == false
						? res.status(201).json({
								respond: 'User created successfully!',
						  })
						: res.status(503).json({
								respond: 'Could not create user.',
						  });
				});
			} else {
				res.status(409).json({
					respond: 'User with name already exist.',
				});
			}
		});
	} catch (error) {
		console.log('Could not save new user: ', error);
		res.sendStatus(500).send('Could not create user.');
	}
});

// TODO: user can delete only hes own user (uid from token?)
router.post('/deleteUser', verifyToken, (req, res) => {
	User.findOneAndDelete(
		{
			_id: ObjectId(req.user.uid),
		},
		(err, user) => {
			if (user != null) {
				res.status(200).json({ respond: 'User was deleted.' });
			} else {
				res.status(500).json({
					respond: 'Could not find user to delete',
				});
			}
		},
	);
});

router.post('/login', async (req, res) => {
	try {
		// Find user with the same given email
		User.findOne({ email: req.body.email }, async (err, user) => {
			if (user == null) {
				// Could not find user.
				res.status(400).json({
					respond: 'Could not find user with this credentials.',
				});
				return;
			}
			// User found.
			// Compare passwords
			const authorized = await bcrypt.compare(req.body.password, user.password);
			if (authorized) {
				// User is authorized.
				user.lastActiveAt = Date();
				user.save();

				const payload = {
					uid: user.id.toString(),
					name: user.name,
				};
				const accessToken = await generateAccessToken(payload);
				const refreshToken = await generateRefreshToken(payload);

				// For future token refresh.
				const refreshTokenAndUserInfo = jwt.sign(payload, refreshToken);
				let date = new Date();
				date.setMonth(date.getMonth() + 8);
				res.cookie('rememberme2', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
				const cookieExpired = 24 * 60 * 60 * 1000;

				res.cookie('Authorization Bearer', accessToken, {
					maxAge: parseInt(604800000),
					// secure: true,
					httpOnly: true,
					sameSite: 'None',
				});
				// TODO: add refresh token feature after uploading the site to official domain.
				// res.cookie('Refresh Token', refreshToken, {
				// 	maxAge: parseInt(604800000),
				// 	secure: true,
				// 	httpOnly: true,
				// 	sameSite: 'None',
				// });

				res.status(200).json({ msg: 'success' });
			} else {
				// User is not authorized.
				res.status(400).json({ respond: 'User is NOT authorized!' });
			}
		});
	} catch (error) {
		console.log('Could not login user: ', error);
		res.sendStatus(500).send('Could not login user.');
	}
});

/**
 * If pass verifyToken middleware then retrieve
 * the user data from the DB
 * and send the data back to the client.
 *
 * @returns user data from the DB.
 */
router.get('/profile', verifyToken, (req, res) => {
	User.findOne({ _id: req.user.uid }, (err, results) => {
		if (results) {
			res.status(200).json(results);
		}
	});
});

/**
 * Search for User with the giving uid and return his
 * full name.
 *
 * @returns user full name as object
 */
router.get('/findProfile/:uid', (req, res) => {
	const uid = inputGuard(req.params.uid);
	User.findOne({ _id: uid }, (err, results) => {
		if (results) {
			let payload = Profile(results);
			res.status(200).json(payload);
		}
	});
});

/**
 * Logout function, if pass verifyToken middleware
 * then set cookie maxAge of ACCESS_TOKEN to 0.
 * (witch make the browser delete the ACCESS_TOKEN cookie)
 */
router.get('/logout', verifyToken, (req, res) => {
	res.cookie('Authorization Bearer', ' ', {
		maxAge: 0,
	});
	res.sendStatus(200);
});

/**
 * Rout for getting new access token
 * by providing refresh token.
 */
router.get('/token', (req, res) => {
	const refreshToken = req.body.token;
	if (refreshToken == null) return res.sendStatus(401);
	jwt.verify(refreshToken, 'etyd234azxv456tghsw12ad647uhg', async (err, user) => {
		if (err) return res.status(403).redirect('/');
		const accessToken = await generateAccessToken({
			uid: user.uid,
			user: user.name,
		});
		res.json({
			accessToken: accessToken,
		});
	});
});

/**
 * Async function for generating access token.
 *
 * @param payload token request identifiers ({uid, name}).
 * @returns signed access token.
 */
async function generateAccessToken(payload) {
	try {
		const token = '12dDASas12dD4ASDLKH12dsdf32ahgsd5';
		return jwt.sign(payload, token, {
			expiresIn: 604800000,
		});
	} catch (error) {
		console.log('Could not generate access token: ', error);
	}
}

/**
 * Async function for generating refresh token.
 *
 * @param payload token requestor identifiers ({uid, name}).
 * @returns signed refresh token.
 */
async function generateRefreshToken(payload) {
	try {
		const token = 'etyd234azxv456tghsw12ad647uhg';
		return jwt.sign(payload, token, {
			expiresIn: '604800000',
		});
	} catch (error) {
		console.log('Could not generate access token: ', error);
	}
}

/**
 * Middleware for authenticate tokens before any action
 * that require authorization.
 *
 * @returns the name of the user if he has authenticated.
 */
function verifyToken(req, res, next) {
	const authHeader = req.cookies['Authorization Bearer'];
	const token = authHeader;
	if (token == null) return res.sendStatus(401);
	jwt.verify(token, '12dDASas12dD4ASDLKH12dsdf32ahgsd5', (err, user) => {
		if (err) return res.sendStatus(403);
		User.findOne({ _uid: user.uid, name: user.name }, (err, user) => {
			if (user == null)
				return res.status(403).json({
					respond: 'Could not find the Token owner (user account was deleted?).',
				});
		});

		User.findOneAndUpdate({ _id: user.uid }, { lastActiveAt: Date() }).then((updatedUser) => {
			if (updatedUser) {
				updatedUser.save();
			}
		});

		req.user = user;
		next();
	});
}

module.exports = {
	routes: router,
	verifyToken: verifyToken,
};
