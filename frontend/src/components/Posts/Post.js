import { useState } from 'react';
import { Link } from 'react-router-dom';
import Utils from '../../services/Utils';
import './Post.css';

const Post = ({ post, userId }) => {
	const shortBrief = post.brief.split('\n').map((text, i) => {
		//split every line in text to p
		return <p key={post._id + i}>{text}</p>;
	});

	const [shortBriefIsOpen, setShortBriefIsOpen] = useState(false);
	return (
		<div className='Post'>
			<div
				className='card'
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					position: 'relative',
				}}
				key={post._id}>
				<div className='post' style={{ justifyContent: 'space-between' }}>
					<Link
						className='postLink'
						to={{
							pathname: `/postView/${post._id}`,
							state: { post },
						}}>
						{post.header}
					</Link>
					<div className='shortBrief'>
						{shortBriefIsOpen ? (
							shortBrief
						) : (
							<p className='shortBrief'>
								{shortBrief[0].props.children.length > 150
									? `${shortBrief[0].props.children.slice(0, 150)}`
									: shortBrief[0]}
							</p>
						)}
					</div>
					<p
						style={{
							fontSize: '12px',
						}}>
						{`Last modified:${Utils.DateFormat(post.lastModifiedDate)}`}
					</p>
				</div>
				<div className='commentsVotes'>
					<p
						style={{
							marginBottom: 0,
						}}>
						{post.votesBalance}
					</p>
					<p
						style={{
							fontSize: '12px',
							marginTop: 0,
						}}>
						Votes
					</p>
					<p
						style={{
							marginBottom: 0,
						}}>
						{post.commentsCount}
					</p>
					<p
						style={{
							fontSize: '12px',
							marginTop: 0,
						}}>
						Comments
					</p>
				</div>

				{(shortBrief.length > 1 || shortBrief[0].props.children.length > 50) && (
					<button
						className='moreBtn'
						onClick={() => {
							if (!shortBriefIsOpen) return setShortBriefIsOpen(true);
							setShortBriefIsOpen(false);
						}}>
						{shortBriefIsOpen ? 'Click for less' : 'Click to read more'}
					</button>
				)}
			</div>
		</div>
	);
};

export default Post;
