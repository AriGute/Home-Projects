const PostService = {
	AddPost: async (header, brief, description, tags) => {
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER + '/posts/add',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({
						header: header,
						brief: brief,
						description: description,
						tags: tags,
					}),
				},
			);
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
	RemovePost: (itemId) => {},
	GetPosts: async (i) => {
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER +
					`/posts/list/${i == null ? 0 : i}`,
				{
					method: 'GET',
					credentials: 'include',
				},
			);
			const data = results.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	},
	UpVote: async (postId) => {
		const results = await fetch(
			process.env.REACT_APP_SERVER + '/posts/upVote',
			{
				method: 'PUT',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					postId: postId,
				}),
			},
		);
		const data = await results.json();
		return data;
	},
	DownVote: async (postId) => {
		const results = await fetch(
			process.env.REACT_APP_SERVER + '/posts/downVote',
			{
				method: 'PUT',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					postId: postId,
				}),
			},
		);
		const data = await results.json();
		return data;
	},
	ClearVote: async (postId) => {
		const results = await fetch(
			process.env.REACT_APP_SERVER + '/posts/clearVote',
			{
				method: 'PUT',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					postId: postId,
				}),
			},
		);
		const data = await results.json();
		return data;
	},
	/**
	 * Get current user vote (if exist) for specific post.
	 *
	 * @param {string} postId
	 * @returns vote object or false if current user did not vote yet.
	 */
	GetVote: async (postId) => {
		const results = await fetch(
			process.env.REACT_APP_SERVER +
				'/posts/checkVote' +
				'/' +
				postId,
			{
				method: 'GET',
				credentials: 'include',
			},
		);
		const data = await results.json();
		return data.vote;
	},

	AddComment: async (comment, postId) => {
		const results = await fetch(
			process.env.REACT_APP_SERVER + '/posts/addComment',
			{
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					postId: postId,
					comment: comment,
				}),
			},
		);

		return results.ok;
	},
};

export default PostService;
