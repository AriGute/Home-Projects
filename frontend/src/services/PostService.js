const PostService = {
	AddPost: async (header, brief, description, tags) => {
		try {
			let results = await fetch(process.env.REACT_APP_SERVER + '/posts/addPost', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					header: header,
					brief: brief,
					description: description,
					tags: tags,
				}),
			});
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
	RemovePost: async (postId) => {
		try {
			let results = await fetch(process.env.REACT_APP_SERVER + `/posts/deletePost`, {
				method: 'DELETE',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					postId: postId,
				}),
			});
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
	GetPostById: async (postId) => {
		try {
			let results = await fetch(process.env.REACT_APP_SERVER + `/posts/getPost/${postId}`, {
				method: 'GET',
				credentials: 'include',
			});
			const data = results.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * @param {Number} i The amount of posts i already have.
	 * @param {String} ownerId Get all the posts for specific user or "all".
	 * @returns 10 posts from 'all' list or for specific user.
	 */
	GetPosts: async (i, ownerId) => {
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER + `/posts/getPosts/${i == null ? 0 : i}&${ownerId || 'all'}`,
				{
					method: 'GET',
					credentials: 'include',
				},
			);
			const data = await results.json();
			if (!Object.keys(data).length) return false;
			return data;
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * @param {Array} tags
	 * @returns List of posts with the givin tags.
	 */
	GetPostsByTags: async (tags) => {
		try {
			if (!tags) throw new Error('tags is undefined');
			let queryTags = '';
			tags.forEach((tag) => {
				queryTags = queryTags + tag + ',';
			});
			let results = await fetch(
				process.env.REACT_APP_SERVER + `/posts/getPostsByTag/${queryTags == null ? '' : queryTags}`,
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
	UpdatePost: async (id, header, brief, description, tags) => {
		try {
			let results = await fetch(process.env.REACT_APP_SERVER + `/posts/editPost/${id || ''}`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					header: header,
					brief: brief,
					description: description,
					tags: tags,
				}),
			});
			return results;
		} catch (error) {
			console.log(error);
		}
	},
	UpVote: async (postId) => {
		const results = await fetch(process.env.REACT_APP_SERVER + '/posts/upVote', {
			method: 'PUT',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				postId: postId,
			}),
		});
		const data = await results.json();
		return data;
	},
	DownVote: async (postId) => {
		const results = await fetch(process.env.REACT_APP_SERVER + '/posts/downVote', {
			method: 'PUT',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				postId: postId,
			}),
		});
		const data = await results.json();
		return data;
	},
	ClearVote: async (postId) => {
		const results = await fetch(process.env.REACT_APP_SERVER + '/posts/clearVote', {
			method: 'PUT',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				postId: postId,
			}),
		});
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
		const results = await fetch(process.env.REACT_APP_SERVER + '/posts/checkVote/' + postId, {
			method: 'GET',
			credentials: 'include',
		});
		const data = await results.json();
		return data;
	},

	AddComment: async (comment, postId) => {
		const results = await fetch(process.env.REACT_APP_SERVER + '/posts/addComment', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				postId: postId,
				comment: comment,
			}),
		});

		return results.ok;
	},
	UpdateComment: async (id, comment) => {
		try {
			let results = await fetch(process.env.REACT_APP_SERVER + `/posts/editComment/${id || ''}`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					comment: comment,
				}),
			});
			return results;
		} catch (error) {
			console.log(error);
		}
	},
	GetComments: async (postId, i) => {
		try {
			let results = await fetch(
				process.env.REACT_APP_SERVER +
					`/posts/getComments/${postId == null ? 0 : postId}&${i == null ? 0 : i}`,
				{
					method: 'GET',
					credentials: 'include',
				},
			);
			const data = await results.json();
			if (!Object.keys(data).length) return false;
			return data;
		} catch (error) {
			console.log(error);
		}
	},
	DeleteComment: async (commentId) => {
		try {
			let results = await fetch(process.env.REACT_APP_SERVER + `/posts/deleteComment`, {
				method: 'DELETE',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					commentId: commentId,
				}),
			});
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
	/**
	 * @param {String} reason Reason of report (pornography, violent, etc...)
	 * @param {String} targetType 'Post' or 'Comment'.
	 * @param {String} targetId The id of the post/comment.
	 * @param {String} report The free text of the report.
	 * @returns {Boolean} if network call succeed.
	 */
	SendReport: async (reason, targetType, targetId, report) => {
		try {
			let results = await fetch(process.env.REACT_APP_SERVER + `/posts/sendReport`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					reason: reason,
					targetType: targetType,
					targetId: targetId, // postId or commentId
					report: report,
				}),
			});
			return results.ok;
		} catch (error) {
			console.log(error);
		}
	},
};

export default PostService;
