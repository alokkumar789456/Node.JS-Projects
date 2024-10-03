const { addToCart, removeFromCart, listCart } = require('../controllers/cartController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const express = require('express');
const router = express.Router();

router.post('/cart/add', authMiddleware, addToCart);
router.post('/cart/remove', authMiddleware, removeFromCart);
router.get('/cart', authMiddleware, listCart);

module.exports = router;
