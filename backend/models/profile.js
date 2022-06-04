/**
 * Filter the sensitive data from user object
 * and return public profile for that user.
 *
 * @param {Object} user JSON or Model from mongo.
 * @returns {Object} user public profile after filtering sensitive data.
 */
function Profile(user) {
	let profile = {};
	profile.firstName = user.firstName;
	profile.lastName = user.lastName;
	profile.lastActiveAt = user.lastActiveAt;
	profile.registerDate = user.registerDate;
	return profile;
}

module.exports = Profile;
