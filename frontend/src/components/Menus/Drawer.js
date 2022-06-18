import './Drawer.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AuthService from '../../services/AuthService';

const Drawer = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLogin, setIsLogin] = useState();

	useEffect(() => {
		AuthService.Profile().then(async (user) => {
			if (user) setIsLogin(user.isLogin);
		});
	}, []);

	return (
		<div className='sideBar'>
			<div className='sideMenuIcon menuBtn' onClick={() => setIsOpen(true)}>
				<p></p>
				<p></p>
				<p></p>
			</div>
			<div
				className={isOpen ? 'container open' : 'container closed'}
				onClick={() => setIsOpen(false)}>
				<div className={isOpen ? 'navContainer open' : 'navContainer closed'}>
					<h3
						style={{
							textAlign: 'center',
							color: 'var(--quaternary-bg-color)',
							padding: '5px',
						}}>
						Home Projects
					</h3>
					<div className='navBarList'>
						<Link onClick={() => setIsOpen(false)} to='/'>
							<HomeIcon className='icon'></HomeIcon>
							Home
						</Link>
						{isLogin && (
							<Link onClick={() => setIsOpen(false)} to='/addProject'>
								<AddBoxIcon className='icon'></AddBoxIcon>
								Add Project
							</Link>
						)}
						<Link onClick={() => setIsOpen(false)} to='/contactUs'>
							<AlternateEmailIcon className='icon'></AlternateEmailIcon>
							Contact Us
						</Link>
						<Link onClick={() => setIsOpen(false)} to='/about'>
							<InfoIcon className='icon'></InfoIcon>
							About
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Drawer;
