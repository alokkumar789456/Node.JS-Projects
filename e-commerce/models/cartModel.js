const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: String, 
        required: true
    }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
