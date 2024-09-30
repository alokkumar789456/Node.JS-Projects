const express = require('express');
const { addBook } = require('../controllers/bookController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const uploadMiddleware = require('../middleware/uploadMiddleware.js');
const router = express.Router();
const { listBooks } = require('../controllers/bookController');


// Admin route to add a book
router.post('/book', authMiddleware, uploadMiddleware.single('image'), addBook);
router.get('/books', authMiddleware, listBooks);

module.exports = router;
