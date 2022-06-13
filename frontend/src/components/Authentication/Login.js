import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import Input from '../Input';
import './Login.css';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isError, setIsError] = useState();

	const errorText = 'Do you forgot your username or password?';

	const history = useHistory();

	const login = async (e) => {
		setIsError(false);
		e.preventDefault();
		await AuthService.Login(email, password).then((result) => {
			if (result) {
				history.push('/');
				window.location.reload();
			} else {
				setIsError(true);
			}
		});
	};

	return (
		<div className='Login'>
			<div className='card'>
				<h3>Login:</h3>
				<form
					onSubmit={login}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault();
						}
					}}>
					<label>Email</label>
					<Input required={true} getInput={(e) => setEmail(e)} isError={isError} />
					<label>Password</label>
					<Input
						type='password'
						required={true}
						getInput={(e) => setPassword(e)}
						error={errorText}
						isError={isError}
					/>
					<button style={{ alignSelf: 'center', margin: '5px' }}>Login</button>
					<Link to='/register' style={{ alignSelf: 'center', margin: '5px' }}>
						<button>Register</button>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;
