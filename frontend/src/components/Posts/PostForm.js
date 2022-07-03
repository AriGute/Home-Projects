import './PostForm.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import PostService from '../../services/PostService';
import Chip from '../Utils/Chip';
import Input from '../Utils/Input';
import Select from '../Utils/Select';

const PostForm = () => {
	const history = useHistory();
	const post =
		history.location.pathname === '/addProject'
			? null
			: JSON.parse(window.sessionStorage.getItem('post'));
	const [isLogin, setIsLogin] = useState(false);
	const [header, setHeader] = useState(post ? post.header : '');
	const [brief, setBrief] = useState(post ? post.brief : '');
	const [description, setDescription] = useState(post ? post.description : '');
	const [tagsList, setTagsList] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const [isError, setIsError] = useState();

	const handleDelete = (i) => {
		if (tagsList.length > 0) {
			const newList = tagsList.filter((item, index) => {
				return index !== i ? 1 : 0;
			});
			setTagsList(newList);
		}
	};

	const editPost = (e) => {
		e.preventDefault();
		console.log(post._id);
		if (header && brief && description && tagsList.length) {
			PostService.UpdatePost(post._id, header, brief, description, tagsList).then((results) => {
				if (results) {
					window.location.reload();
				}
			});
			return history.push('/');
		}
		setIsError(true);
	};

	const addPost = (e) => {
		e.preventDefault();
		if (header && brief && description && tagsList.length) {
			PostService.AddPost(header, brief, description, tagsList).then((results) => {
				if (results) {
					window.location.reload();
				}
			});
			return history.push('/');
		}
		setIsError(true);
	};

	const addTag = () => {
		if (tagsList.includes(inputValue)) return;
		setTagsList([...tagsList, inputValue]);
	};

	useEffect(() => {
		AuthService.Profile().then(async (user) => {
			if (user) setIsLogin(user.isLogin);
		});
	}, [tagsList]);

	return (
		<div className='postForm'>
			{isLogin ? (
				<form
					className='card'
					onSubmit={history.location.pathname === '/addProject' ? addPost : editPost}
					style={{ width: '100vw', maxWidth: '600px' }}>
					<div style={{ alignSelf: 'center', width: '500px', textAlign: 'left' }}>
						<label>Header</label>
						<Input
							required
							getInput={(e) => setHeader(e)}
							value={header}
							width={'full'}
							height={30}
							fontSize={'20px'}
							Autocomplete={true}
							isError={isError}
							error={'You must fill all the sections'}
						/>
						<label>Short Brief</label>
						<Input
							type='textarea'
							required
							getInput={(e) => setBrief(e)}
							value={brief}
							width={'full'}
							height={100}
							isError={isError}
							error={'You must fill all the sections'}
						/>
					</div>
					<label>Description</label>
					<Input
						type='textarea'
						required
						getInput={(e) => setDescription(e)}
						value={description}
						width={'full'}
						height={250}
						isError={isError}
						error={'You must fill all the sections'}
					/>
					<div className='tagsContainer'>
						<div className='selectDiv'>
							<Select
								label={'Tag'}
								options={options}
								getChosenOption={(e) => {
									setInputValue(e);
								}}
								isError={inputValue ? false : isError}
							/>
							<button
								type='button'
								style={{
									marginLeft: '5px',
									position: 'relative',
									top: '5px',
								}}
								onClick={addTag}>
								Add Tag
							</button>
						</div>
						<div className='tagList'>
							{tagsList.map((tag, index) => {
								return (
									<Chip
										label={tag}
										deleteChip={() => {
											handleDelete(index);
										}}
										key={index}
									/>
								);
							})}
						</div>
						<button
							style={{
								alignSelf: 'center',
								margin: '5px',
								color: 'var(--secondary-bg-color)',
							}}>
							Submit
						</button>
					</div>
				</form>
			) : (
				<p style={{ color: 'var(--primary-bg-color)' }}>Need to be login to add new project</p>
			)}
		</div>
	);
};

const options = ['Java', 'JavaScript', 'Python', 'React', 'Angular'];
export default PostForm;
