require('dotEnv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	ownerId: String,
	postId: String,
	comment: String,
	lastModifiedDate: Date,
	creationDate: Date, //TODO: make this an index in mongo
});

const Comment = mongoose.model(
	process.env.COMMENTS_COLLECTION,
	CommentSchema,
);

module.exports = Comment;
