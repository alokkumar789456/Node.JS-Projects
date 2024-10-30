const express = require('express');
const router = express.Router();

router.use('/user', require('./userRoute.js')); // User Route 
router.use('/food', require('./foodRoute.js')) // Food Route 
router.use('/order',require('./orderRoute.js')) //order Route
router.use('/restaurant',require('./restaurants.js')) //restaurant Route

module.exports = router;
