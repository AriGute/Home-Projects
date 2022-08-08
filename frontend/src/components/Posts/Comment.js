import CardProfile from '../CardProfile/CardProfile';
import Utils from '../../services/Utils';
import './Comment.css';
import ToolTip from '../ToolTip';
import { useState } from 'react';
import PostService from '../../services/PostService';
import Input from '../Utils/Input';

const Comment = ({ comment }) => {
	const [commentText, setCommentText] = useState(comment.comment);
	const [isEditing, setIsEditing] = useState(false);
	const [date, setDate] = useState(Utils.DateFormat(comment.lastModifiedDate));
	const [commentStyle, setCommentStyle] = useState();
	const lastText = comment.comment;
	const deleteComment = () => {
		PostService.DeleteComment(comment._id).then((result) => {
			if (result) {
				setCommentStyle({ display: 'none' });
			}
		});
	};

	const editedComment = (e) => {
		e.preventDefault();
		setIsEditing(false);
		PostService.UpdateComment(comment._id, commentText);
		setDate(Utils.DateFormat(Date()));
	};

	const editComment = () => {
		setIsEditing(true);
	};

	const cancelEdit = () => {
		setCommentText(lastText);
		setIsEditing(false);
	};

	return (
		<div className='card' style={commentStyle}>
			<div className='commentContent'>
				{isEditing ? (
					<form onSubmit={editedComment} className='editContainer'>
						<Input
							width={'full'}
							height={100}
							getInput={(e) => setCommentText(e)}
							required={true}
							type={'textarea'}
							value={commentText}
						/>
						<div className='editBtnsDiv'>
							<button className='cancel' type='button' onClick={cancelEdit}>
								Cancel
							</button>
							<button className='editBtn' type='submit'>
								Save
							</button>
						</div>
					</form>
				) : (
					<div className='commentText'>
						<div className='content'>
							{commentText.split('\n').map((text, i) => {
								//split every line in text to p
								return (
									<p style={{ margin: '2px' }} key={comment._id + i}>
										{text}
									</p>
								);
							})}
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<CardProfile profile={comment.ownerProfile}></CardProfile>
							<p className='date'>{date}</p>
						</div>
					</div>
				)}
				<ToolTip
					edit={editComment}
					del={deleteComment}
					from={{ item: 'comment', itemId: comment._id, ownerId: comment.ownerId }}
				/>
			</div>
		</div>
	);
};

export default Comment;
