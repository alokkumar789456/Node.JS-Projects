const express = require('express');
const router = express.Router();
const { checkIn, checkOut, leaveApproval } = require('../controllers/attendanceController.js'); 

router.post('/checkIn', checkIn);

router.post('/checkOut', checkOut);

router.post('/leaveApproval', leaveApproval)

module.exports = router;
