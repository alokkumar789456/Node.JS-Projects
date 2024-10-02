const express = require("express")
const router = express.Router()
const { buyBook, cancelOrder } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/cart/buy', authMiddleware, buyBook);
router.post('/cancelrder',authMiddleware,cancelOrder)

module.exports = router;