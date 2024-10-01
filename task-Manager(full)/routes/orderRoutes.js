const { buyBooks } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/cart/buy', authMiddleware, buyBooks);

module.exports = router;