require('dotEnv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: String,
	firstName: String,
	lastName: String,
	password: String,
	lastActiveAt: Date,
	registerDate: Date,
});

const User = mongoose.model(
	process.env.USERS_COLLECTION,
	UserSchema,
);

module.exports = User;
