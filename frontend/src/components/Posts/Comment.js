import CardProfile from '../CardProfile/CardProfile';
import Utils from '../../services/Utils';
import './Comment.css';
import ToolTip from '../ToolTip';

const Comment = ({ comment, profile }) => {
	let date = Utils.DateFormat(comment.creationDate);

	return (
		<div className='card'>
			<div className='commentContent'>
				<CardProfile profile={profile}></CardProfile>
				<div className='commentText'>
					{comment.comment.split('\n').map((text, i) => { //split every line in text to p
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
				<ToolTip></ToolTip>
			</div>
		</div>
	);
};

export default Comment;
