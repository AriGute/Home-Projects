import './CommentEditor.css';
import { useEffect, useState } from 'react';
import PostService from '../../services/PostService';
import CardProfile from '../CardProfile/CardProfile';
import AuthService from '../../services/AuthService';
import Input from '../Utils/Input';

const CommentEditor = ({ post }) => {
	const [comment, setComment] = useState('');
	const [profile, setProfile] = useState(null);
	const [isError, setIsError] = useState();

	const errorText = 'Cant send empty comment';

	useEffect(() => {
		AuthService.Profile().then((user) => {
			setProfile(user.profile);
		});
	}, []);

	function addComment(e) {
		setIsError(false);
		e.preventDefault();
		if (comment) {
			PostService.AddComment(comment, post._id);
			setComment('');
		} else {
			setIsError(true);
		}
	}

	return (
		<div className='CommentEditor'>
			<div className='card'>
				<form className='commentForm' onSubmit={addComment}>
					{profile ? <CardProfile profile={profile} /> : <div></div>}
					<Input
						width={700}
						height={100}
						getInput={(e) => {
							setComment(e);
						}}
						required={true}
						error={errorText}
						isError={isError}
						type={'textarea'}
						value={comment}
					/>
					<button className='postBtn' type='submit'>
						Post
					</button>
				</form>
			</div>
		</div>
	);
};

export default CommentEditor;
