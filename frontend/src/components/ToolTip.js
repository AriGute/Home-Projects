import { useState } from 'react';
import AuthService from '../services/AuthService';
import './ToolTip.css';

const ToolTip = ({ edit, del, report }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(false);

	const openMenu = () => {
		if (!isLogin) {
			AuthService.Profile().then((user) => {
				if (user) {
					setIsLogin(user.isLogin);
				}
			});
		}
		setIsOpen(true);
	};
	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<div className='toolTip'>
			{!isOpen && (
				<div className='dots' onClick={openMenu}></div>
			)}
			{isOpen && (
				<div className='menu card' onClick={closeMenu}>
					{isLogin === true ? (
						<div className='login'>
							<button onClick={edit}>edit</button>
							<button onClick={del}>delete</button>
							<button onClick={report}>report</button>
						</div>
					) : (
						<div className='notLogin'></div>
					)}
				</div>
			)}
		</div>
	);
};

export default ToolTip;
