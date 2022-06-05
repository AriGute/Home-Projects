import { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import PostService from '../../services/PostService';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './Vote.css';

const Vote = (props) => {
	const btnClickedStyle = {
		backgroundColor: 'var(--primary-bg-color)'
	};
	const btnNotClickedStyle = {
		backgroundColor: 'var(--btmTertiary-bg-color)',
	};
	const btnUnavailable = {
		backgroundColor: 'lightgrey',
		cursor: 'inherit',
	};

	const userId = props.userId;
	const [post, setPost] = useState(props.post);
	const [isLogin, setIsLogin] = useState(false);
	const [votesBalance, setVotes] = useState(post.votesBalance);

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
		setVotes(post.votesBalance);
		AuthService.Profile().then((user) => {
			setIsLogin(user.isLogin);
			// User is login?
			if (user.isLogin) {
				PostService.GetVote(post._id).then((vote) => {
					// User have vote for this post
					if (vote) {
						setIsLogin(true);
						if (vote.upVote === true) {
							setBtnUpVote(btnClickedStyle); // upVote is clicked
							setBtnDownVote(btnNotClickedStyle); // no vote
							setVotes(post.votesBalance);
						} else if (vote.upVote === false) {
							setBtnDownVote(btnClickedStyle); // downVote is clicked
							setBtnUpVote(btnNotClickedStyle); // no vote
							setVotes(post.votesBalance);
						}
					} else {
						// In case User have no vote in this post
						setBtnUpVote(btnNotClickedStyle); // no vote
						setBtnDownVote(btnNotClickedStyle); // no vote
						setVotes(post.votesBalance);
					}
				});
			} else {
				// In case User is not login
				setBtnUpVote(btnUnavailable);
				setBtnDownVote(btnUnavailable);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, post]);

	return (
		<div className='Vote'>
			<button
				style={btnUpVote}
				onClick={() => {
					if (isLogin) upVote(post._id);
				}}>
				<KeyboardArrowUpIcon></KeyboardArrowUpIcon>
			</button>
			<div>
				<p style={{color: 'rgb(13, 27, 42)'}}>{votesBalance}</p>
			</div>
			<button
				style={btnDownVote}
				onClick={() => {
					if (isLogin) downVote(post._id);
				}}>
				<KeyboardArrowDownIcon></KeyboardArrowDownIcon>
			</button>
		</div>
	);
};

export default Vote;
