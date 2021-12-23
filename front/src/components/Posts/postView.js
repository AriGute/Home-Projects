import './postView.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import Vote from './Vote';
const PostView = () => {
	const location = useLocation();
	const post = location.state.post;
	const [author, setAuthor] = useState(null);

	useEffect(() => {
		console.log(post.ownerId);
		AuthService.FindProfile(post.ownerId).then(
			(profile) => {
				setAuthor(profile);
			},
		);
	}, []);
	return (
		<div className='PostView '>
			<div className='fullPost'>
				<div className='card'>
					<div className='postContent'>
						<h2 className='fitText'>{post.header}</h2>
						<p className='fitText'>{post.brief}</p>
						<p className='fitText'>{post.description}</p>
					</div>
					<div className='lowerPost'>
						{author ? (
							<div className='card author'>
								{author.name}
							</div>
						) : (
							<div
								className='card'
								style={{
									height: '100px',
									width: '200px',
								}}></div>
						)}
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
							}}>
							<div className='tags'>
								<p style={{ fontSize: '12px' }}>Tags:</p>
								<div style={{ display: 'flex' }}>
									{post.tags.map((tag, index) => (
										<div
											className='tag'
											key={post._id + index}>
											<p>{tag}</p>
										</div>
									))}
								</div>
							</div>
							<Vote post={post} />
						</div>
					</div>
					<p
						style={{
							borderTop:
								'3px solid var(--tertiary-bg-color)',
							borderBottom:
								'3px solid var(--tertiary-bg-color)',
						}}>
						last modified:{' '}
						{post.lastModifiedDate.slice(0, 10)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default PostView;
