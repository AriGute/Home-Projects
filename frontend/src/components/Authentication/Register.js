import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import './Register.css';

const Register = () => {
	let [firstName, setFirstName] = useState('');
	let [lastName, setLastName] = useState('');
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	const history = useHistory();

	const register = async (e) => {
		e.preventDefault();
		if (
			await AuthService.Register(
				firstName,
				lastName,
				email,
				password,
			)
		) {
			history.push('/login');
		}
	};

	return (
		<div className='Register'>
			<div className='card'>
				<h3>Register</h3>
				<form onSubmit={register}>
					<label>First Name</label>
					<input
						type='text'
						onChange={(e) => setFirstName(e.target.value)}
						required></input>
					<label>Last Name</label>
					<input
						type='text'
						onChange={(e) => setLastName(e.target.value)}
						required></input>
					<label>Email</label>
					<input
						type='email'
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
						Register
					</button>
					<Link
						to='/login'
						style={{ alignSelf: 'center', margin: '5px' }}>
						<button>Back</button>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Register;
