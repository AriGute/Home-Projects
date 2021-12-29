import './Header.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

const Header = ({ drawer, setDrawer }) => {
	const [isLogin, setIsLogin] = useState(null);

	useEffect(() => {
		AuthService.Profile().then((user) => {
			if (user) {
				setIsLogin(user.isLogin);
			}
		});
	}, []);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar className='Header'>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{
							mr: 2,
							color: 'var(--secondary-bg-color)',
						}}
						onClick={() => {
							setDrawer(true);
						}}>
						<MenuIcon />
					</IconButton>
					<Link to='/'>
						<Typography
							variant='h6'
							component='div'
							sx={{ flexGrow: 1 }}>
							<h1>Home Projects</h1>
						</Typography>
					</Link>
					{isLogin ? (
						<Link to='/profile'>
							<Button
								style={{
									color: 'var(--secondary-bg-color)',
								}}
								color='inherit'>
								<AccountCircleIcon fontSize='large'></AccountCircleIcon>
							</Button>
						</Link>
					) : (
						<Link to='/login'>
							<Button
								style={{
									color: 'var(--secondary-bg-color)',
								}}
								color='inherit'>
								<LoginIcon fontSize='large'></LoginIcon>
							</Button>
						</Link>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
