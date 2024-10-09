const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {signup,login} = require('../controllers/auth')
// const cookies = require('cookie')
const router = express.Router();

// POST /signup
router.post('/signup',signup);

// POST /login
router.post('/login',login);

module.exports = router;
