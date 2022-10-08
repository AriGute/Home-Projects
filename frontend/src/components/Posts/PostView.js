import './PostView.css';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import Vote from './Vote';
import CommentEditor from './CommentEditor';
import CardProfile from '../CardProfile/CardProfile';
import PostService from '../../services/PostService';
import Comment from './Comment';
import ToolTip from '../ToolTip';
import Loading from '../PlaceHolders/Loading';
import TextPlaceHolder from '../PlaceHolders/TextPlaceHolder';
import Utils from '../../services/Utils';
import Tags from './Tags';

const PostView = () => {
	const location = useLocation();
	const history = new useHistory();
	const { id } = useParams();

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

	const [firstCommentLoad, setFirstCommentLoad] = useState(false);
	const [post, setPost] = useState(defaultPost);
	const [author, setAuthor] = useState(null);
	const [comments, setComments] = useState([]);
	const [isLoadingPost, setIsLoadingPost] = useState(true);
	const [loadingStyle, setLoadingStyle] = useState({
		display: 'none',
	});
	const [noMoreStyle, setNoMoreStyle] = useState({ display: 'none' });
	let isFetching = false;

	const editPost = () => {
		window.sessionStorage.setItem('post', JSON.stringify(post));
		history.push(`/editProject/`);
	};

	const deletePost = () => {
		PostService.RemovePost(post._id).then((result) => {
			if (result) {
				history.push('/');
			} else {
			}
		});
	};

	const loadComments = () => {
		setLoadingStyle({ display: 'inline-block' });
		PostService.GetComments(post._id, comments.length)
			.then((results) => {
				if (results) {
					setComments(comments.concat(results));
					return (isFetching = false);
				}
				setNoMoreStyle({ display: 'block', color: 'var(--quaternary-bg-color)' });
			})
			.then(() => {
				setLoadingStyle({ display: 'none' });
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [post]);

	return (
		<div
			onScroll={(e) => {
				if (firstCommentLoad) {
					if (noMoreStyle.display === 'block') return;
					if (!isFetching) {
						const bottom =
							Math.floor(e.target.scrollHeight - e.target.scrollTop - 1) <= e.target.clientHeight;
						if (bottom) {
							isFetching = true;
							loadComments();
						}
					}
				}
			}}
			style={{ overflowY: 'auto', height: '93vh' }}>
			{id !== undefined || post ? (
				<div className='postView'>
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
									<ToolTip
										edit={editPost}
										del={deletePost}
										from={{ item: 'post', itemId: post._id, ownerId: post.ownerId }}
									/>
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
										<Tags tags={post.tags} header={'tags:'}/>
										<Vote post={post} />
									</div>
								)}
							</div>
							<p>Last Modified: {Utils.DateFormat(post.lastModifiedDate)}</p>
						</div>
						<CommentEditor post={post}></CommentEditor>
						{comments.length > 0 && // In case posts.length > 0
							comments.map((comment) => {
								return <Comment comment={comment} key={comment._id}></Comment>;
							})}
						<div className='loadingDiv' style={loadingStyle}>
							<Loading />
						</div>
						<p style={noMoreStyle}>No more Comments</p>
						<br />
						{!firstCommentLoad && (
							<button
								onClick={() => {
									loadComments();
									setFirstCommentLoad(true);
								}}
								className='loadComments'>
								Load comments
							</button>
						)}
					</div>
				</div>
			) : (
				<p>there is nothing to show</p>
			)}
		</div>
	);
};

export default PostView;
