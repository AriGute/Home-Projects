import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import PostService from '../services/PostService';
import './Home.css';
import Post from './Posts/Post';

const Home = () => {
	const [posts, setPosts] = useState(null);
	const [profile, setProfile] = useState(null);
	useEffect(() => {
		PostService.GetPosts().then((posts) => {
			setPosts(posts);
		});
		AuthService.Profile().then(async (user) => {
			if (user.isLogin) {
				setProfile(await user.profile);
			}
		});
	}, []);

	return (
		<div
			className='Home'
			style={{ display: 'flex', justifyContent: 'center' }}>
			{posts ? ( //In case posts was retrieved from fetch
				profile ? ( // In case profile is still null
					<div>
						{posts.length > 0 ? ( // In case posts.length > 0
							posts.map((post) => (
								<Post
									post={post}
									userId={profile._id}
									key={post._id}
								/>
							))
						) : (
							//In case posts.length == 0
							<p>There is nothing to show.</p>
						)}
					</div>
				) : (
					<div>
						{posts.length > 0 ? ( // In case posts.length > 0
							posts.map((post) => (
								<Post
									post={post}
									userId={null}
									key={post._id}
								/>
							))
						) : (
							//In case posts.length == 0
							<p>There is nothing to show.</p>
						)}
					</div>
				)
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Home;
