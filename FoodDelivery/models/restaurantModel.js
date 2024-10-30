const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  dishes: [
    {
      dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodModel',
        required: true,
      },
      stock: {
        type: Boolean,
        default: true,
      }
    }
  ],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant; 