import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/AuthService';

import './Profile.css';

const Profile = () => {
	const [details, setDetails] = useState(null);
	const history = new useHistory();

	const logout = () => {
		AuthService.Logout();
		history.push('/');
		window.location.reload();
	};
	useEffect(() => {
		AuthService.Profile().then(async (user) => {
			setDetails(await user.profile);
		});
	}, []);
	return (
		<div className='Profile'>
			<div className='card'>
				<h2 style={{ color: 'var(--secondary-bg-color)' }}>
					Profile:
				</h2>
				{details ? (
					<div>
						<h3
							style={{
								color: 'var(--secondary-bg-color)',
							}}>
							{details.firstName + ' ' + details.lastName}
						</h3>
						<p>Email: {details.email}</p>
						<p>
							Register date:
							{' ' + details.registerDate.slice(0, 10)}
						</p>
						<button onClick={logout}>Logout</button>
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
};

export default Profile;
