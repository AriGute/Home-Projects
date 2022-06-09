import './Header.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Drawer from './Drawer';

const Header = () => {
	const [isLogin, setIsLogin] = useState(null);

	useEffect(() => {
		AuthService.Profile().then((user) => {
			if (user) {
				setIsLogin(user.isLogin);
			}
		});
	}, []);

	return (
		<div className='header'>
			<Drawer/>
			<Link to='/'>
				<h1>Home Projects</h1>
			</Link>
			{isLogin ? (
				<Link to='/profile'>
					<AccountCircleIcon className='menuBtn' fontSize='large'></AccountCircleIcon>
				</Link>
			 ) : (
				<Link to='/login'>
					<LoginIcon fontSize='large' className='menuBtn' ></LoginIcon>
				</Link>
			  )} 
		</div>
	);
};

export default Header;
