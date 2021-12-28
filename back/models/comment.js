require('dotEnv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	ownerId: String,
	comment: String,
	votesBalance: Number,
	lastModifiedDate: Date, //TODO: make this an index in mongo
	creationDate: Date,
});

const Comment = mongoose.model(
	process.env.COMMENTS_COLLECTION,
	CommentSchema,
);

module.exports = Comment;
