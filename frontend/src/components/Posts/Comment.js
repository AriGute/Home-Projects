import CardProfile from '../CardProfile/CardProfile';
import Utils from '../../services/Utils';
import './Comment.css';
import ToolTip from '../ToolTip';
import { useState } from 'react';
import PostService from '../../services/PostService';

const Comment = ({ comment }) => {
	const [commentText, setCommentText] = useState(comment.comment);
	const [isEditing, setIsEditing] = useState(false);
	const [date, setDate] = useState(Utils.DateFormat(comment.lastModifiedDate));
	const [commentStyle, setCommentStyle] = useState()

	const editComment = () => {
		setIsEditing(true);
	};

	const deleteComment = () => {
		PostService.DeleteComment(comment._id);
		setCommentStyle({display:'none'})
	};

	const reportComment = () => {
		alert('report');
	};

	const editedComment = (e) => {
		e.preventDefault();
		setIsEditing(false);
		PostService.UpdateComment(comment._id, commentText);
		setDate(Utils.DateFormat(Date()));
	};

	return (
		<div className='card' style={commentStyle}>
			<div className='commentContent'>
				<CardProfile profile={comment.ownerProfile}></CardProfile>
				{isEditing ? (
					<form onSubmit={editedComment} className='editContainer'>
						<textarea
							className='editing'
							name=''
							id=''
							cols='30'
							value={commentText}
							onChange={(e) => {
								setCommentText(e.target.value);
							}}></textarea>
						<button className='edditBtn' type='submit'>
							Save
						</button>
					</form>
				) : (
					<div className='commentText'>
						{commentText.split('\n').map((text, i) => {
							//split every line in text to p
							return (
								<p
									style={{
										marginBottom: '0px',
										marginTop: '0px',
									}}
									key={comment._id + i}>
									{text}
								</p>
							);
						})}

						<p className='date'>{date}</p>
					</div>
				)}
				<ToolTip edit={editComment} del={deleteComment}>
					report={reportComment}
				</ToolTip>
			</div>
		</div>
	);
};

export default Comment;
