import './PostForm.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import PostService from '../../services/PostService';
import { Autocomplete, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';

const PostForm = (Post) => {
	const [isLogin, setIsLogin] = useState(false);
	const [header, setHeader] = useState('');
	const [brief, setBrief] = useState('');
	const [description, setDescription] = useState('');
	const [tagsList, setTagsList] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const history = useHistory();

	const handleDelete = (i) => {
		console.log('delete this');
		if (tagsList.length > 0) {
			const newList = tagsList.filter((item, index) => {
				return index !== i ? 1 : 0;
			});
			setTagsList(newList);
		}
	};

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
		if (tagsList.includes(inputValue)) return;
		setTagsList([...tagsList, inputValue]);
	};

	useEffect(() => {
		AuthService.Profile().then(async (user) => {
			if (user) setIsLogin(user.isLogin);
		});
	}, [tagsList]);

	return (
		<div className='PostForm'>
			{isLogin ? (
				<div className='card' style={{ maxWidth: '90vw' }}>
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
							cols='40'
							rows='5'
							onChange={(e) =>
								setBrief(e.target.value)
							}></textarea>
						<label htmlFor=''>Description</label>
						<textarea
							required
							name='description'
							id='brief'
							cols='40'
							rows='15'
							onChange={(e) =>
								setDescription(e.target.value)
							}></textarea>
						{/* <label htmlFor=''>Tags</label> */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								paddingTop: '10px',
								paddingBottom: '10px',
							}}>
							<Autocomplete
								onInputChange={(event, newInputValue) => {
									setInputValue(newInputValue);
								}}
								sx={{
									width: 200,
								}}
								size='small'
								options={options}
								renderInput={(params) => (
									<TextField
										id='tagInput'
										{...params}
										label='Tag'
										color='success'
									/>
								)}></Autocomplete>
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
							{tagsList.map((tag, index) => (
								<div key={index}>
									<Chip
										label={tag}
										onDelete={(e) =>
											handleDelete(index)
										}></Chip>
								</div>
							))}
						</div>
						<button
							style={{
								alignSelf: 'center',
								margin: '5px',
								color: 'var(--secondary-bg-color)',
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

const options = [
	'Java',
	'JavaScript',
	'Python',
	'React',
	'Angular',
];
export default PostForm;
