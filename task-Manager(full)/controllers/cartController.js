const User = require('../models/userModel.js');
const Book = require('../models/bookModel.js');

exports.addToCart = async (req, res) => {
  const { bookId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Add book to user's cart
    user.cart.push(book);
    await user.save();

    res.json(user.cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
