require('dotEnv').config();
const mongoose = require('mongoose');
const Comment = require('./comment');
const Schema = mongoose.Schema;

const voteScheme = new Schema({
	ownerId: String, //TODO: make this an index in mongo
	postId: String,
	upVote: Boolean, // true -> up-vote, false -> down-vote
	date: Date,
});

const Vote = mongoose.model('votes', voteScheme);

module.exports = Vote;
