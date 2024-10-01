const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  genre: { type: String, required: true },
  authorName: { type: String, required: true },
  bookName: { type: String, required: true },
  ISBN: { type: String, required: true },
  rate: { type: Number, required: true },
  image: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
