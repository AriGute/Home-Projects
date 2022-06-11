require('dotEnv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
	type: String,
	targetId: String, // postId or commentId
	ownerId: String,
	report: String,
	creationDate: Date,
});

const Report = mongoose.model(process.env.REPORTS_COLLECTION, ReportSchema);

module.exports = Report;
