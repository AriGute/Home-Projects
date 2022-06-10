import { Link } from 'react-router-dom';
import './Post.css';

const Post = ({ post, userId }) => {
	return (
		<div className='Post'>
			<div
				className='card'
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
				key={post._id}>
				<div className='post' style={{ justifyContent: 'space-between' }}>
					<Link
						className='postLink'
						to={{
							pathname: '/postView',
							state: { post },
						}}>
						{post.header}
					</Link>
					<p className='fitText'>{post.brief}</p>
					<p
						style={{
							fontSize: '12px',
						}}>{`Last modified:${post.lastModifiedDate.slice(0, 10)}`}</p>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-end',
					}}>
					<div
						style={{
							display: 'flex',
						}}>
						<div className='center'>
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
