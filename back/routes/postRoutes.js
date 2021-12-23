const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const Vote = require('../models/vote');
const authService = require('./authRoutes');

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

router.put(
	'/upVote',
	authService.verifyToken,
	(req, res) => {
		setVote(req, res, true);
	},
);

router.put(
	'/downVote',
	authService.verifyToken,
	(req, res) => {
		setVote(req, res, false);
	},
);

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
				Vote.deleteOne(filter).then((results) => {
					console.log('vote cleared');
				});
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
		console.log(change);
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

router.get(
	'/checkVote/:id',
	authService.verifyToken,
	(req, res) => {
		Vote.findOne({
			ownerId: req.user.uid,
			postId: req.params.id,
		}).then((voteResults) => {
			if (voteResults) {
				const payload = {
					vote: voteResults,
				};
				res.status(200).json(payload);
			} else {
				const payload = {
					vote: null,
				};
				res.status(200).json(payload);
			}
		});
	},
);

router.delete(
	'/delete',
	authService.verifyToken,
	(req, res) => {
		User.findOneAndDelete(
			{
				_id: mongoose.Types.ObjectId(req.user.itemId),
			},
			(err, user) => {
				console.log('Something went wrong here');
				res
					.status(500)
					.send(
						'Something went wrong here, try again later.',
					);
			},
		);
	},
);

// TODO: sort by votes count
// TODO: make every itemList query as stream.
router.get('/list/:i', (req, res) => {
	// console.log(req.params);
	Post.find({}, (err, results) => {
		res.status(200).json(results);
	});
});

module.exports = router;
