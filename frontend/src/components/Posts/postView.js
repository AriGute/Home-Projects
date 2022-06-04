import './PostView.css';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import Vote from './Vote';
import CommentEditor from './CommentEditor';
import CardProfile from '../CardProfile/CardProfile';
import PostService from '../../services/PostService';
import Comment from './Comment';
import ToolTip from '../ToolTip';
import Loading from '../Loading';

const PostView = () => {
	const { id } = useParams();
	const location = useLocation();
	const [post, setPost] = useState(location.state?.post || demoPost);
	const [author, setAuthor] = useState(null);
	const [comments, setComments] = useState([]);
	const [loadingStyle, setloadingStyle] = useState({
		display: 'none',
	});

	const editPost = () => {
		alert('edit');
	};
	const deletePost = () => {
		alert('delete');
	};
	const reportPost = () => {
		alert('report');
	};

	// TODO: remove demo object
	const demoPost = {
		_id: '123',
		ownerId: '6283e87602907297dbff0588',
		header: `test ${id}`,
		brief: 'test',
		description: 'test',
		votesBalance: 0,
		commentsCount: 0,
		tags: ['Python'],
		lastModifiedDate: '2022-05-28T14:04:09.000Z',
		creationDate: '2022-05-28T14:04:09.000Z',
		__v: 0,
	};

	// TODO: remove demo object
	const demoProfile = {
		firstName: 'coordi',
		lastActiveAt: '2022-05-28T20:16:13.000Z',
		lastName: 'shokety',
		registerDate: '2022-05-17T18:24:54.000Z',
	};

	const loadComments = () => {
		setloadingStyle({ display: 'inline-block' });
		PostService.GetComments(post._id, comments.length)
			.then((results) => {
				setComments(comments.concat(results));
			})
			.then(() => {
				setloadingStyle({ display: 'none' });
			});
	};

	useEffect(() => {
		PostService.GetPostById(id).then((post) => {
			setPost(post);
		});
	}, [id]);

	useEffect(() => {
		console.log(post.ownerId);
		// PostService.GetPostById(post._id);
		AuthService.FindProfile(post.ownerId).then((profile) => {
			setAuthor(profile);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [post]);
	return (
		<div>
			{id !== undefined || post ? (
				<div className='PostView'>
					<div className='fullPost'>
						<div className='card'>
							<div className='postContent'>
								<div className='postText'>
									<h2
										style={{
											color: 'var(--secondary-bg-color)',
										}}>
										{post.header}
									</h2>
									{post.brief.split('\n').map((text, i) => {
										//split every line in text to p
										return <p key={post._id + i}>{text}</p>;
									})}
									{post.description.split('\n').map((text, i) => {
										//split every line in text to p
										return <p key={post._id + i}>{text}</p>;
									})}
								</div>
								<ToolTip edit={editPost} del={deletePost} report={reportPost}></ToolTip>
							</div>
							<div className='lowerPost'>
								{author ? (
									<CardProfile profile={author} />
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
												<div className='tag' key={post._id + index}>
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
									borderTop: '3px solid var(--primary-bg-color)',
									borderBottom: '3px solid var(--primary-bg-color)',
								}}>
								last modified: {post.lastModifiedDate.slice(0, 10)}
							</p>
						</div>
						<CommentEditor post={post}></CommentEditor>
						{comments.length > 0 ? ( // In case posts.length > 0
							comments.map((comment) => {
								return (
									<Comment profile={demoProfile} comment={comment} key={comment._id}></Comment>
								);
							})
						) : (
							//In case commetns.length == 0
							<div></div>
						)}
						<div className='loadinDiv' style={loadingStyle}>
							<Loading />
						</div>
						<br />
						<button onClick={loadComments}>
							Load comments
						</button>
					</div>
				</div>
			) : (
				<p>there is nothing to show</p>
			)}
		</div>
	);
};

export default PostView;
