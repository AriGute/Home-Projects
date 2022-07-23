// require('dotEnv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
	reason: String,
	type: String,
	targetId: String, // postId or commentId
	ownerId: String,
	report: String,
	creationDate: Date,
});

const Report = mongoose.model('reports', ReportSchema);

module.exports = Report;
