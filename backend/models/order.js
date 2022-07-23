// require('dotEnv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	date: Date,
	price: Number,
	customerId: String,
});

const Order = mongoose.model(process.env.ORDER_COLLECTION, orderSchema);

module.exports = Order;
