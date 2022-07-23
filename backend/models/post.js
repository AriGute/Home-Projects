// require('dotEnv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postScheme = new Schema({
	ownerId: String, //TODO: make this an index in mongo
	header: String,
	brief: String,
	description: String,
	votesBalance: Number, //TODO: make this an index in mongo
	commentsCount: Number,
	tags: [String],
	lastModifiedDate: Date,
	creationDate: Date, //TODO: make this an index in mongo
});

const Post = mongoose.model('posts', postScheme);

module.exports = Post;
