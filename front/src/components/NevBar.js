import './NevBar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';

const NevBar = () => {
	const [isLogin, setIsLogin] = useState(null);

	useEffect(() => {
		AuthService.Profile().then((user) => {
			setIsLogin(user.isLogin);
		});
	}, []);
	return (
		<div className='NevBar'>
			<Link to='/'>Home</Link>
			{isLogin ? (
				<Link to='/profile'>Profile</Link>
			) : (
				<Link to='/login'>Login</Link>
			)}
			<Link to='/addProject'>Add Project</Link>
			<Link to='/About'>About</Link>
		</div>
	);
};

export default NevBar;
