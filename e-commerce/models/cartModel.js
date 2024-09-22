const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: String, // Changed to String, since productId is now a string from "1" to "20"
        required: true
    }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
