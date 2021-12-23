require('dotEnv').config();
const mongoose = require('mongoose');
const Comment = require('./comment');
const Schema = mongoose.Schema;

const postScheme = new Schema({
	ownerId: String, //TODO: make this an index in mongo
	header: String,
	brief: String,
	description: String,
	votesBalance: Number,
	commentsCount: Number,
	tags: [String],
	lastModifiedDate: Date, //TODO: make this an index in mongo
	creationDate: Date,
});

const Post = mongoose.model(
	process.env.POSTS_COLLECTION,
	postScheme,
);

module.exports = Post;
