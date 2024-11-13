const express = require('express');
const router = express.Router();
const { checkIn, checkOut } = require('../controllers/attendanceController.js'); 

router.post('/checkIn', checkIn);

router.post('/checkOut', checkOut);

module.exports = router;
