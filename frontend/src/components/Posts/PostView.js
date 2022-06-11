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
import Loading from '../../PlaceHolders/Loading';
import TextPlaceHolder from '../../PlaceHolders/TextPlaceHolder';

const PostView = () => {
	const location = useLocation();
	// TODO: remove demo object
	const defaultPost = {
		_id: '',
		ownerId: ' ',
		header: ' ',
		brief: ' ',
		description: ' ',
		votesBalance: ' ',
		commentsCount: ' ',
		tags: [' '],
		lastModifiedDate: ' ',
		creationDate: ' ',
		__v: 0,
	};
	const [post, setPost] = useState(defaultPost);
	const { id } = useParams();
	const [author, setAuthor] = useState(null);
	const [comments, setComments] = useState([]);
	const [isLoadingPost, setIsLoadingPost] = useState(true);
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
		PostService.GetPostById(id || location.state?.post._id).then((updatedPost) => {
			setPost(updatedPost[0]);
			setIsLoadingPost(false);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (post.ownerId !== defaultPost.ownerId) {
			AuthService.FindProfile(post.ownerId).then((profile) => {
				setAuthor(profile);
			});
		}
	}, [post]);

	return (
		<div>
			{id !== undefined || post ? (
				<div className='PostView'>
					<div className='fullPost'>
						<div className='card'>
							{isLoadingPost === false ? (
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
							) : (
								<TextPlaceHolder
									rows={10}
									height={'20px'}
									color={'var(--tertiary-bg-color)'}></TextPlaceHolder>
							)}

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
								{post.ownerId !== defaultPost.ownerId && (
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
								)}
							</div>
							<p>Last Modified: {post.lastModifiedDate.slice(0, 10)}</p>
						</div>
						<CommentEditor post={post}></CommentEditor>
						{comments.length > 0 ? ( // In case posts.length > 0
							comments.map((comment) => {
								return <Comment comment={comment} key={comment._id}></Comment>;
							})
						) : (
							//In case commetns.length == 0
							<div></div>
						)}
						<div className='loadinDiv' style={loadingStyle}>
							<Loading />
						</div>
						<br />
						<button onClick={loadComments} className='loadComments'>
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
