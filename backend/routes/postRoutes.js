const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const Vote = require('../models/vote');
const Comment = require('../models/comment');
const Report = require('../models/report');
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
	const postOwnerIdIndex = await db.collection(process.env.POSTS_COLLECTION).createIndex({
		ownerId: 1,
	});

	// For users to find their comments
	const commentOwnerIdIndex = await db.collection(process.env.COMMENTS_COLLECTION).createIndex({
		ownerId: 1,
	});
	const commentCreationDateIndex = await db
		.collection(process.env.COMMENTS_COLLECTION)
		.createIndex({
			creationDate: 1,
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

router.post('/addPost', authService.verifyToken, (req, res) => {
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
router.post('/editPost/:id', authService.verifyToken, (req, res) => {
	const id = inputGuard(req.params.id);
	const update = {
		header: req.body.header || '',
		brief: req.body.brief || '',
		description: req.body.description || '',
		tags: req.body.tags || [],
		lastModifiedDate: Date(),
	};
	Post.updateOne({ _id: ObjectId(id), ownerId: req.user.uid }, { $set: update }).then((results) => {
		if (results) {
			res.sendStatus(200);
		} else {
			res.sendStatus(404);
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

/**
 * URL receive i for index and ownerId to get all the posts of specific user.
 * In case ownerId is "all" then respond relative to all posts.
 */
router.get('/getPosts/:i&:ownerId', (req, res) => {
	const index = parseInt(inputGuard(req.params.i));
	const ownerId = inputGuard(req.params.ownerId);

	const filter = {};
	if (ownerId !== 'all') filter.ownerId = ownerId;

	Post.find(filter)
		.sort({
			votesBalance: -1,
		})
		.skip(index)
		.limit(parseInt(process.env.QUERY_DOCS_LIMIT))
		.then((posts) => {
			if (posts) {
				res.status(200).json(posts);
			} else {
				res.sendStatus(404);
			}
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
	comment.save().then((results) => {
		if (results) {
			res.sendStatus(200);
		} else {
			res.sendStatus(500);
		}
	});
});
router.post('/editComment/:id', authService.verifyToken, (req, res) => {
	const id = inputGuard(req.params.id);
	const update = {
		comment: req.body.comment || '',
		lastModifiedDate: Date(),
	};
	Comment.updateOne({ _id: ObjectId(id), ownerId: req.user.uid }, { $set: update }).then(
		(results) => {
			if (results) {
				res.sendStatus(200);
			} else {
				res.sendStatus(404);
			}
		},
	);
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
		.limit(parseInt(process.env.QUERY_DOCS_LIMIT))
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

router.get('/getUserComments/:ownerId&:i', (req, res) => {
	const ownerId = inputGuard(req.params.ownerId);
	const index = parseInt(inputGuard(req.params.i));
	Comment.find({
		ownerId: ownerId,
	})
		.sort({
			creationDate: 1,
		})
		.skip(index)
		.limit(parseInt(process.env.QUERY_DOCS_LIMIT))
		.then((commentsResults) => {
			console.log(commentsResults.length);
			if (commentsResults) {
				res.status(200).json(commentsResults);
			} else {
				res.sendStatus(404);
			}
		});
});

router.post('/sendReport', authService.verifyToken, (req, res) => {
	const report = new Report({
		ownerId: req.user.uid,
		type: req.body.type,
		targetId: req.body.targetId,
		report: req.body.report,
		creationDate: Date(),
	});
	report.save().then((results) => {
		if (results) {
			res.sendStatus(200);
		} else {
			res.sendStatus(500);
		}
	});
});

module.exports = {
	routes: router,
	createIndex: createIndex,
};
