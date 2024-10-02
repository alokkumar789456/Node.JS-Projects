const User = require('../models/User.js');
const Order = require('../models/Order.js');
const Book = require('../models/bookModel.js');

exports.buyBook = async (req, res) => {
  const { bookId } = req.body;

  try {
    const userId = Object.values(req.user)[0].id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Fetch the book details directly from the database using `bookId`
    const book = await Book.findById(bookId);

    // Check if the book exists in the user's cart
    if (!user.cart.includes(bookId)) {
      return res.status(400).json({ msg: 'Book not found in your cart' });
    }

    // Check if the book is found
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Create the order for the purchased book
    const order = new Order({
      userId: user.id, // Add userId here if you want to track who made the order
      genre: book.genre,
      authorName: book.authorName,
      bookName: book.bookName,
      ISBN: book.ISBN,
      rate: book.rate,
      image: book.image || undefined,
    });

    // Save the order and remove the purchased book from the cart
    await order.save();
    
    // Remove the purchased book from the cart
    user.cart = user.cart.filter(id => id.toString() !== bookId);
    await user.save();

    res.json({ msg: 'Book purchased successfully', order });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  const { orderId } = req.body;

  try {
    const userId = Object.values(req.user)[0].id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Find the order by orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Check if the order belongs to the logged-in user
    if (order.userId.toString() !== userId) {
      return res.status(403).json({ msg: 'You are not authorized to cancel this order' });
    }

    // Remove the order
    await Order.findByIdAndDelete(orderId);

    res.json({ msg: 'Order canceled successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
