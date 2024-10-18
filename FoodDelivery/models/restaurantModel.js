const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId, // Unique ID for the restaurant
    required: true,
  },
  dish: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Food collection
    ref: 'foodModel',
    required: true,
  },
  stock: {
    type: Boolean,
    default: true, // Dish is in stock by default
  }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
