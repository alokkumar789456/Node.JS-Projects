const express = require('express');

const authRoute = express.Router(); 

authRoute.get('/google', (req, res) => {
    res.send('Google Auth Route');
});

module.exports = authRoute; 
