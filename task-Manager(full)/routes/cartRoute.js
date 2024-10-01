const { addToCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/cart/add', authMiddleware, addToCart);

module.exports = router;