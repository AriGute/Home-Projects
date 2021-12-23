import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import PostService from '../../services/PostService';
import './PostForm.css';

const PostForm = (Post) => {
	const [isLogin, setIsLogin] = useState(false);
	const [header, setHeader] = useState('');
	const [brief, setBrief] = useState('');
	const [description, setDescription] = useState('');
	const [tagsList, setTagsList] = useState([]);
	const history = useHistory();

	const addPost = (e) => {
		PostService.AddPost(
			header,
			brief,
			description,
			tagsList,
		).then((results) => {
			console.log(results);
			if (results) {
				window.location.reload();
			}
		});
		history.push('/');
	};

	const addTag = () => {
		// TODO: limit to X tags in the list
		const val = document.getElementById('tagInput').value;
		setTagsList([...tagsList, val]);
		document.getElementById('tagInput').value = '';
	};

	useEffect(() => {
		AuthService.Profile().then(async (user) => {
			setIsLogin(user.isLogin);
		});
	}, [tagsList]);
	return (
		<div className='PostForm'>
			{isLogin ? (
				<div className='card'>
					<form onSubmit={addPost}>
						<label htmlFor=''>Header</label>
						<input
							required
							type='text'
							onChange={(e) => setHeader(e.target.value)}
						/>
						<label htmlFor=''>Short Brief</label>
						<textarea
							required
							name='brief'
							id='brief'
							cols='50'
							rows='5'
							onChange={(e) =>
								setBrief(e.target.value)
							}></textarea>
						<label htmlFor=''>Description</label>
						<textarea
							required
							name='description'
							id='brief'
							cols='50'
							rows='15'
							onChange={(e) =>
								setDescription(e.target.value)
							}></textarea>
						<label htmlFor=''>Tags</label>
						<div>
							<input id='tagInput' type='text' />
							<button
								type='button'
								style={{ marginLeft: '5px' }}
								onClick={addTag}>
								{/* TODO: pick from exist tags list and not free text*/}
								Add Tag
							</button>
						</div>
						<div className='tagList'>
							{tagsList.map((tag, index) => (
								<div key={index}>
									<p>{tag}</p>
								</div>
							))}
						</div>
						<button
							style={{
								alignSelf: 'center',
								margin: '5px',
							}}>
							Submit
						</button>
					</form>
				</div>
			) : (
				<p>Need to be login to add new project</p>
			)}
		</div>
	);
};

export default PostForm;
