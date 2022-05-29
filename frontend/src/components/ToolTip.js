import { useState } from 'react';
import './ToolTip.css';

const ToolTip = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(false);

	const openMenu = () => {
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
				<div className='menu' onClick={closeMenu}>
					{isLogin === true ? <div className='notLogin'></div> : <div className='login'></div>}
				</div>
			)}
		</div>
	);
};

export default ToolTip;
