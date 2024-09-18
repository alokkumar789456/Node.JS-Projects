const User = require('../models/userModel.js');
const express = require('express');
const axios = require('axios');
const router = express.Router();
const mongoose = require('mongoose')
const auth = require('../middlewares/auth.js');

router.use(auth);

// Render the cart page
router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;

    try {
        // Fetch product details from the external API
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        const product = response.data;

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('cart', { product });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Confirm order route
router.post('/confirm', async (req, res) => {
    const { productId, paymentMethod } = req.body;
    const userId = req.user._id;

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).send('Invalid product ID');
    }

    try {
        // Add the order to the user's order history
        await User.findByIdAndUpdate(userId, { $push: { orders: productId } });
        
        
        res.send('Order confirmed');
    } catch (err) {
        console.error('Error confirming order:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
