import { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import PostService from '../../services/PostService';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Vote.css';

const Vote = (props) => {
	const btnClickedStyle = {
		backgroundColor: 'var(--btmPrimary-bg-color)',
	};
	const btnNotClickedStyle = {
		backgroundColor: 'var(--btmTertiary-bg-color)',
		color:'var(--btmSecondary-bg-color)'
	};
	const btnUnavailable = {
		backgroundColor: 'lightgrey',
		cursor: 'inherit',
	};

	const [post, setPost] = useState(props.post);
	const [isLogin, setIsLogin] = useState(false);
	const [votesBalance, setVotes] = useState(false);
	const [userId, setUserId] = useState(null);

	const [btnUpVote, setBtnUpVote] = useState(btnNotClickedStyle);

	const [btnDownVote, setBtnDownVote] = useState(btnNotClickedStyle);

	const upVote = (postId) => {
		PostService.UpVote(postId).then((updatedPost) => {
			setPost(updatedPost);
		});
	};
	const downVote = (postId) => {
		PostService.DownVote(postId).then((updatedPost) => {
			setPost(updatedPost);
		});
	};

	useEffect(() => {
		setPost(props.post);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.post]);

	useEffect(() => {
		AuthService.Profile().then((user) => {
			if (user.isLogin) setUserId(user.profile._id);
			setIsLogin(user.isLogin);
			setVotes(post.votesBalance);
			// User is login?
			if (user.isLogin && user.profile._id !== props.post.ownerId) {
				PostService.GetVote(post._id).then((vote) => {
					// User have vote for this post
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [post.votesBalance]);

	return (
		<div className='Vote'>
			<button
				style={btnUpVote}
				onClick={() => {
					if (isLogin && userId !== props.post.ownerId) upVote(post._id);
				}}>
				<KeyboardArrowUpIcon></KeyboardArrowUpIcon>
			</button>
			<div>
				{votesBalance !== false ? (
					<p style={{ color: 'rgb(13, 27, 42)' }}>{votesBalance}</p>
				) : (
					<p>" "</p>
				)}
			</div>
			<button
				style={btnDownVote}
				onClick={() => {
					if (isLogin && userId !== props.post.ownerId) downVote(post._id);
				}}>
				<KeyboardArrowDownIcon></KeyboardArrowDownIcon>
			</button>
		</div>
	);
};

export default Vote;
