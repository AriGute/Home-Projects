import { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import PostService from '../../services/PostService';
import './Vote.css';

const Vote = (props) => {
	const btnClickedStyle = {
		backgroundColor: 'orange',
	};
	const btnNotClickedStyle = {};
	const btnUnavailable = {
		backgroundColor: 'lightgrey',
		cursor: 'inherit',
	};

	const userId = props.userId;
	const [post, setPost] = useState(props.post);
	const [isLogin, setIsLogin] = useState(false);
	const [votesBalance, setVotes] = useState('-');

	const [btnUpVote, setBtnUpVote] =
		useState(btnUnavailable);

	const [btnDownVote, setBtnDownVote] =
		useState(btnUnavailable);

	const clearVote = (postId) => {
		PostService.ClearVote(postId).then((updatedPost) => {
			setPost(updatedPost);
		});
	};

	const upVote = (postId) => {
		// if (vote.upVote === true) {
		// 	clearVote(postId);
		// } else {
		PostService.UpVote(postId).then((updatedPost) => {
			setPost(updatedPost);
		});
		// }
	};
	const downVote = (postId) => {
		PostService.DownVote(postId).then((updatedPost) => {
			setPost(updatedPost);
		});
	};

	useEffect(() => {
		setVotes(post.votesBalance);
		AuthService.Profile().then((user) => {
			setIsLogin(user.isLogin);
			// User is login?
			if (user.isLogin) {
				PostService.GetVote(post._id).then((vote) => {
					// User have vote for this post?
					if (vote) {
						setIsLogin(true);
						if (vote.upVote === true) {
							setBtnUpVote(btnClickedStyle); // upVote is clicked
							setBtnDownVote(btnNotClickedStyle); // no vote
						} else if (vote.upVote === false) {
							setBtnDownVote(btnClickedStyle); // downVote is clicked
							setBtnUpVote(btnNotClickedStyle); // no vote
						}
					} else {
						// In case User have no vote in this post
						setBtnUpVote(btnNotClickedStyle); // no vote
						setBtnDownVote(btnNotClickedStyle); // no vote
					}
				});
			} else {
				// In case User is not login
				setBtnUpVote(btnUnavailable);
				setBtnDownVote(btnUnavailable);
			}
		});
	}, [userId, post]);

	return (
		<div className='Vote'>
			<button
				style={btnUpVote}
				onClick={() => {
					if (isLogin) upVote(post._id);
				}}>
				up
			</button>
			<div style={{ textAlign: 'center' }}>
				<p>{votesBalance}</p>
			</div>
			<button
				style={btnDownVote}
				onClick={() => {
					if (isLogin) downVote(post._id);
				}}>
				down
			</button>
		</div>
	);
};

export default Vote;
