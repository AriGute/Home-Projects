import './CommentEditor.css';
import { useEffect, useState } from 'react';
import PostService from '../../services/PostService';
import CardProfile from '../CardProfile/CardProfile';
import AuthService from '../../services/AuthService';

const CommentEditor = ({ post }) => {
	const [comment, setComment] = useState('');
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		AuthService.Profile().then((user) => {
			setProfile(user.profile);
		});
	}, []);

	function addComment(e) {
		e.preventDefault();
		debugger;
		PostService.AddComment(comment, post._id);
		const commentInput = e?.target[0]?.value;
		if (commentInput) e.target[0].value = '';
		setComment('');
	}

	return (
		<div className='CommentEditor'>
			<div className='card'>
				<form className='commentForm' onSubmit={addComment}>
					{profile ? <CardProfile profile={profile} /> : <div></div>}
					<textarea
						className='commentEditor'
						name=''
						id=''
						cols='30'
						onChange={(e) => {
							setComment(e.target.value);
						}}></textarea>
					<button className='postBtn' type='submit'>
						Post
					</button>
				</form>
			</div>
		</div>
	);
};

export default CommentEditor;
