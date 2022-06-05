const AuthService = {
	Login: async (email, password) => {
		try {
			let results = await fetch(process.env.REACT_APP_SERVER + '/auth/login', {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			});
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
	Register: async (firstName, lastName, email, password) => {
		try {
			let results = await fetch(process.env.REACT_APP_SERVER + '/auth/register', {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
				}),
			});
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
	Logout: async () => {
		try {
			let results = await fetch(process.env.REACT_APP_SERVER + '/auth/logout', {
				method: 'GET',
				credentials: 'include',
			});
			window.sessionStorage.removeItem('profile')
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
	Profile: async () => {
		const profile = window.sessionStorage.getItem('profile');
		if (profile) {
			return JSON.parse(profile);
		} else {
			try {
				let results = await fetch(process.env.REACT_APP_SERVER + '/auth/profile', {
					method: 'GET',
					credentials: 'include',
				});
				const user = {
					isLogin: results.ok,
				};
				if (results.ok) {
					user.profile = await results.json();
					window.sessionStorage.setItem('profile', JSON.stringify(user));
				}
				return user;
			} catch (error) {
				console.log(error);
			}
		}
	},
	FindProfile: async (uid) => {
		try {
			let results = await fetch(process.env.REACT_APP_SERVER + `/auth/findProfile/${uid}`, {
				method: 'GET',
			});
			const data = await results.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	},
};

export default AuthService;
