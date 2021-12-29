import './navBar.css';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const NavBar = ({ setDrawer }) => {
	return (
		<div className='NavBar'>
			<h3
				style={{
					textAlign: 'center',
					color: 'var(--secondary-bg-color)',
					padding: '5px',
				}}>
				Home Projects
			</h3>
			<div className='navBarList'>
				<Link onClick={() => setDrawer(false)} to='/'>
					<HomeIcon className='icon'></HomeIcon>
					Home
				</Link>
				<Link
					onClick={() => setDrawer(false)}
					to='/addProject'>
					<AddBoxIcon className='icon'></AddBoxIcon>
					Add Project
				</Link>
				<Link
					onClick={() => setDrawer(false)}
					to='/contactUs'>
					<AlternateEmailIcon className='icon'></AlternateEmailIcon>
					Contact Us
				</Link>
				<Link onClick={() => setDrawer(false)} to='/about'>
					<InfoIcon className='icon'></InfoIcon>
					About
				</Link>
			</div>
		</div>
	);
};

export default NavBar;
