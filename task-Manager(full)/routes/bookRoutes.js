const express = require('express');
const { addBook, listBooks, updateBook, deleteBook } = require('../controllers/bookController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const uploadMiddleware = require('../middleware/uploadMiddleware.js');
const router = express.Router();

// route to add a book
router.post('/book', authMiddleware, uploadMiddleware.single('image'), addBook);

// route to list all books (for all users)
router.get('/books', authMiddleware, listBooks);

// route to update a book
router.put('/book/:id', authMiddleware, uploadMiddleware.single('image'), updateBook);

// route to delete a book
router.delete('/book/:id', authMiddleware, deleteBook);

module.exports = router;
