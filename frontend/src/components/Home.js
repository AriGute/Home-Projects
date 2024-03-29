import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import PostService from '../services/PostService';
import './Home.css';
import Post from './Posts/Post';
import Loading from './PlaceHolders/Loading';

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [profile, setProfile] = useState(null);
	const [noMoreStyle, setNoMoreStyle] = useState({ display: 'none' });

	let isFetching = false;

	function fetchPosts() {
		PostService.GetPosts(posts.length).then((newPosts) => {
			if (newPosts) {
				setPosts([...posts, ...newPosts]);
				return (isFetching = false);
			}
			setNoMoreStyle({ display: 'block', color: 'var(--quaternary-bg-color)' });
		});
	}

	useEffect(() => {
		fetchPosts();
		if (profile != null) {
			AuthService.Profile().then(async (user) => {
				if (user.isLogin) {
					setProfile(await user.profile);
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile]);

	return (
		<div
			className='Home'
			style={{
				display: 'flex',
				justifyContent: 'center',
				height: '93vh',
				overflowY: 'auto',
				overflowX: 'hidden',
			}}
			onScroll={(e) => {
				if (!isFetching) {
					const bottom =
						Math.floor(e.target.scrollHeight - e.target.scrollTop - 1) <= e.target.clientHeight;
					if (bottom) {
						isFetching = true;
						fetchPosts();
					}
				}
			}}>
			{posts.length > 0 ? ( //In case posts was retrieved from fetch
				<div style={{ height: 'fit-content' }}>
					{posts.length > 0 ? ( // In case posts.length > 0
						posts.map((post) => <Post post={post} userId={null} key={post._id} />)
					) : (
						//In case posts.length == 0
						<p>There is nothing to show.</p>
					)}
					<p style={noMoreStyle}>No more posts</p>
				</div>
			) : (
				<Loading></Loading>
			)}
		</div>
	);
};

export default Home;
