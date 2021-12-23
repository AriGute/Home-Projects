const AuthService = {
	Login: async (email, password) => {
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER + '/auth/login',
				{
					headers: { 'Content-Type': 'application/json' },
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				},
			);
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
	Register: async (
		firstName,
		lastName,
		email,
		password,
	) => {
		try {
			console.log(firstName, lastName, email, password);
			let results = await fetch(
				process.env.REACT_APP_SERVER + '/auth/register',
				{
					headers: { 'Content-Type': 'application/json' },
					method: 'POST',
					credentials: 'include',
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password,
					}),
				},
			);
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
	Logout: async () => {
		console.log('logout');
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER + '/auth/logout',
				{
					method: 'GET',
					credentials: 'include',
				},
			);
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
	Profile: async () => {
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER + '/auth/profile',
				{
					method: 'GET',
					credentials: 'include',
				},
			);
			const user = {
				isLogin: results.ok,
			};
			if (results.ok) {
				user.profile = results.json();
			}
			return user;
		} catch (error) {
			console.log(error);
		}
	},
	FindProfile: async (uid) => {
		console.log(uid);
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER +
					`/auth/findProfile/${uid}`,
				{
					method: 'GET',
				},
			);
			const data = await results.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	},
};

export default AuthService;
