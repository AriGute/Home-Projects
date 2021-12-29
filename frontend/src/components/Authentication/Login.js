import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import './Login.css';
const Login = () => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	const history = useHistory();

	const login = async (e) => {
		e.preventDefault();
		if (await AuthService.Login(email, password)) {
			history.push('/');
			window.location.reload();
		}
	};

	return (
		<div className='Login'>
			<div className='card'>
				<h3>Login:</h3>
				<form onSubmit={login}>
					<label>Email</label>
					<input
						type='text'
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label>Password</label>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						style={{ alignSelf: 'center', margin: '5px' }}>
						Login
					</button>
					<Link
						to='/register'
						style={{ alignSelf: 'center', margin: '5px' }}>
						<button>Register</button>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;
