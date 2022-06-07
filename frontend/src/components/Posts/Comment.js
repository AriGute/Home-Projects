import CardProfile from '../CardProfile/CardProfile';
import Utils from '../../services/Utils';
import './Comment.css';
import ToolTip from '../ToolTip';

const Comment = ({ comment }) => {
	const date = Utils.DateFormat(comment.creationDate);
	const editComment = () => {
		alert('edit');
	};
	const deleteComment = () => {
		alert('delete');
	};
	const reportComment = () => {
		alert('report');
	};
	return (
		<div className='card'>
			<div className='commentContent'>
				<CardProfile profile={comment.ownerProfile}></CardProfile>
				<div className='commentText'>
					{comment.comment.split('\n').map((text, i) => {
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
				<ToolTip edit={editComment} del={deleteComment}>
					report={reportComment}
				</ToolTip>
			</div>
		</div>
	);
};

export default Comment;
