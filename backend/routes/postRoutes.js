const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const Vote = require('../models/vote');
const Comment = require('../models/comment');
const authService = require('./authRoutes');
const Profile = require('../models/profile');
const inputGuard = require('../utils');
const ObjectId = mongoose.Types.ObjectId;

/**
 * create necessary index for frequently query operations.
 *
 * @param {object} db mongo db object
 */
async function createIndex(db) {
	// For users to find their posts
	const ownerIdIndex = await db.collection(process.env.POSTS_COLLECTION).createIndex({
		ownerId: 1,
	});

	// For sorting posts by votes balance
	const voteBalanceIndex = await db.collection(process.env.POSTS_COLLECTION).createIndex({
		votesBalance: 1,
	});

	// For new posts to be visible
	const dateIndex = await db.collection(process.env.POSTS_COLLECTION).createIndex({
		creationDate: 1,
	});
}

router.post('/add', authService.verifyToken, (req, res) => {
	const post = new Post({
		ownerId: req.user.uid,
		header: req.body.header,
		brief: req.body.brief,
		description: req.body.description,
		tags: req.body.tags,
		votesBalance: 0,
		commentsCount: 0,
		lastModifiedDate: Date(),
		creationDate: Date(),
	});
	post.save().then((results) => {
		if (results) {
			User.updateOne(
				{ _id: req.user.uid },
				{ $push: { posts: post._id } },
				{ $set: { votesBalance: 1 } },
			).then((userResults) => {
				if (userResults.modifiedCount > 0) {
					res.sendStatus(200);
				}
			});
		}
	});
});

router.put('/upVote', authService.verifyToken, (req, res) => {
	setVote(req, res, true);
});

router.put('/downVote', authService.verifyToken, (req, res) => {
	setVote(req, res, false);
});

const setVote = (req, res, isUpVote) => {
	// Check if vote document already exist for pair {user._id, post._id}
	const filter = {
		ownerId: req.user.uid,
		postId: req.body.postId,
	};
	Vote.findOne(filter, (err, voteResults) => {
		let vote;
		let change = 0;
		// In case no vote document was found, create one.
		if (voteResults) {
			if (voteResults.upVote === isUpVote) {
				// In case already up-voted then clear vote.
				change = isUpVote ? -1 : 1;
				Vote.deleteOne(filter).then((results) => {});
			} else {
				// In case there is a down-vote then change to up-vote.
				voteResults.upVote = isUpVote;
				voteResults.date = Date();
				voteResults.save();
				vote = voteResults;
				change = isUpVote ? 2 : -2;
			}
		} else {
			// In case there is no vote.
			vote = new Vote({
				ownerId: req.user.uid,
				postId: req.body.postId,
				upVote: isUpVote,
				date: Date(),
			});
			vote.save();
			change = isUpVote ? 1 : -1;
		}
		// Find post and update its vote balance and votes reference list.
		Post.findOneAndUpdate(
			{
				_id: req.body.postId,
			},
			{
				$inc: { votesBalance: change },
			},
			{ new: true },
		).then((postResults) => {
			let payload = postResults;
			payload[vote] = vote;
			res.status(200).json(payload);
		});
	});
};

router.get('/checkVote/:id', authService.verifyToken, (req, res) => {
	const uid = inputGuard(req.user.uid);
	const id = inputGuard(req.params.id);
	Vote.findOne({
		ownerId: uid,
		postId: id,
	}).then((voteResults) => {
		if (voteResults) {
			const payload = voteResults;
			res.status(200).json(payload);
		} else {
			const payload = null;
			res.status(200).json(payload);
		}
	});
});

router.delete('/delete', authService.verifyToken, (req, res) => {});

router.get('/getPosts/:i', (req, res) => {
	const index = parseInt(inputGuard(req.params.i));
	Post.find({})
		.sort({
			votesBalance: -1,
		})
		.skip(index)
		.limit(index + 10)
		.then((results) => {
			res.status(200).json(results);
		});
});

router.get('/getPost/:id', (req, res) => {
	const postId = inputGuard(req.params.id);
	if (postId) {
		Post.find({ _id: ObjectId(postId) }).then((results) => {
			if (results) {
				res.status(200).json(results);
			} else {
				res.sendStatus(404);
			}
		});
	} else {
		res.sendStatus(400);
	}
});

router.post('/addComment', authService.verifyToken, (req, res) => {
	const comment = new Comment({
		ownerId: req.user.uid,
		postId: req.body.postId,
		comment: req.body.comment,
		lastModifiedDate: Date(),
		creationDate: Date(),
	});
	comment.save();
	res.sendStatus(200);
});

router.delete('/deleteComment', authService.verifyToken, (req, res) => {
	Comment.findOneAndDelete({
		_id: req.body.commentId,
	}).then((results) => {
		if (results) {
			if (results.ownerId === req.user.uid) {
				res.sendStatus(200);
			} else {
				res.sendStatus(401);
			}
		} else {
			res.sendStatus(404);
		}
	});
});

router.get('/getComments/:postId&:i', (req, res) => {
	const postId = inputGuard(req.params.postId);
	const index = parseInt(inputGuard(req.params.i));
	Comment.find({
		postId: postId,
	})
		.sort({
			creationDate: 1,
		})
		.skip(index)
		.limit(index + 10)
		.then((commentsResults) => {
			if (commentsResults) {
				const data = commentsResults.map(async (comment) => {
					let userResult = await User.find({
						_id: ObjectId(comment.ownerId),
					});
					const modifyComment = JSON.parse(JSON.stringify(comment));
					modifyComment.ownerProfile = Profile(userResult[0]);
					return modifyComment;
				});
				Promise.all(data).then((results) => {
					res.status(200).json(results);
				});
			} else {
				res.sendStatus(404);
			}
		});
});

module.exports = {
	routes: router,
	createIndex: createIndex,
};
