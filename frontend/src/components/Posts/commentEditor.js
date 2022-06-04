import './CommentEditor.css';
import { useState } from 'react';
import PostService from '../../services/PostService';

const CommentEditor = ({ post }) => {
	const [comment, setComment] = useState('');

	function addComment(e) {
		e.preventDefault();
		PostService.AddComment(comment, post._id).then((results) => {
			console.log('add comment: ' + comment + ', to post:' + post._id);
		});
	}

	return (
		<div className='CommentEditor'>
			<div className='card'>
				<form className='commentForm' onSubmit={addComment}>
					<textarea
						className='commentEditor'
						name=''
						id=''
						cols='30'
						onChange={(e) => {
							setComment(e.target.value);
						}}></textarea>
					<button className='postBtn' type='submit'>Post</button>
				</form>
			</div>
		</div>
	);
};

export default CommentEditor;
