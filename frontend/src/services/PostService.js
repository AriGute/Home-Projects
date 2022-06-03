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
	GetPostById: async (postId) => {
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER +
					`/posts/GetPostById/${postId}`,
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
	GetPosts: async (i) => {
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER +
					`/posts/postsList/${i == null ? 0 : i}`,
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
		console.log(data);
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
		return data;
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

	GetComments: async (postId, i) => {
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER +
					`/posts/commentsList/${
						postId == null ? 0 : postId
					}&${i == null ? 0 : i}`,
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
	DeleteComment: async (commentId) => {
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER +
					`/posts/deleteComment`,
				{
					method: 'DELETE',
					credentials: 'include',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						commentId: commentId,
					}),
				},
			);
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
};

export default PostService;
