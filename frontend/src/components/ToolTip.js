import { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import Report from './Report';
import './ToolTip.css';

const ToolTip = ({ edit, del, from }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [user, setUser] = useState({});

	const openMenu = () => {
		setIsOpen(true);
	};
	const closeMenu = () => {
		setIsOpen(false);
	};

	const [reportIsOpen, setReportIsOpen] = useState(false);

	const reported = () => {
		setReportIsOpen(true);
	};

	useEffect(() => {
		if (!isLogin) {
			AuthService.Profile().then((user) => {
				if (user) {
					setUser(user.profile);
					setIsLogin(user.isLogin);
				}
			});
		}
	}, []);

	return (
		<div className='toolTip'>
			{!isOpen && from.ownerId === user._id && <div className='dots' onClick={openMenu}></div>}
			{isOpen && (
				<div className='menu card' onMouseLeave={closeMenu} onClick={closeMenu}>
					{isLogin === true ? (
						<div className='login'>
							<button onClick={edit}>Edit</button>
							<button onClick={del}>Delete</button>
							<button onClick={reported}>Report</button>
						</div>
					) : (
						<div className='notLogin'></div>
					)}
				</div>
			)}
			<Report reportIsOpen={reportIsOpen} closeReport={() => setReportIsOpen(false)} from={from} />
		</div>
	);
};

export default ToolTip;
