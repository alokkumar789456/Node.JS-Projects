const express = require('express');
const {shorten,getUrl} = require('../controllers/url.js')
const router = express.Router();

// POST /api/url/shorten
router.post('/shorten',shorten);

// GET /api/url/:shortUrl
router.get('/:shortUrl',getUrl);

module.exports = router;
