const express = require('express');
const { shorten, getUrl } = require('../controllers/url.js');
const auth = require('../middleware/auth'); // Auth middleware
const router = express.Router();

// POST /api/url/shorten - Protected Route
router.post('/shorten', auth, shorten);

// GET /api/url/:shortUrl - Public Route
router.get('/:shortUrl', getUrl);

module.exports = router;
