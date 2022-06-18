import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import PostService from '../services/PostService';
import './Home.css';
import Post from './Posts/Post';
import Loading from '../PlaceHolders/Loading';

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(false);
	// const [isScroll, setIsScroll] = useState(false);

	window.addEventListener('scroll', (e) => {
		if (!loading) {
			const bottom =
				Math.floor(e.target.scrollingElement.scrollHeight - e.target.scrollingElement.scrollTop) <=
				e.target.scrollingElement.clientHeight;
			if (bottom) {
				fetchPosts();
				setLoading(true);
			}
		}
	});

	function fetchPosts() {
		PostService.GetPosts(posts.length).then((newPosts) => {
			if (newPosts) setPosts([...posts, ...newPosts]);
			setLoading(false);
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
				height: '100%',
				overflowY: 'auto',
			}}>
			{posts.length > 0 ? ( //In case posts was retrieved from fetch
				profile ? ( // In case profile is still null
					<div>
						{posts.length > 0 ? ( // In case posts.length > 0
							posts.map((post) => <Post post={post} userId={profile._id} key={post._id} />)
						) : (
							//In case posts.length == 0
							<p>There is nothing to show.</p>
						)}
					</div>
				) : (
					<div>
						{posts.length > 0 ? ( // In case posts.length > 0
							posts.map((post) => <Post post={post} userId={null} key={post._id} />)
						) : (
							//In case posts.length == 0
							<p>There is nothing to show.</p>
						)}
					</div>
				)
			) : (
				<Loading></Loading>
			)}
		</div>
	);
};

export default Home;
