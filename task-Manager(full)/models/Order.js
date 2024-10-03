const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  genre: { type: String, required: true },
  authorName: { type: String, required: true },
  bookName: { type: String, required: true },
  ISBN: { type: String, required: true },
  rate: { type: Number, required: true },
  image: { type: String },
  quantity:{type:Number}
});

// exporting Model 
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
