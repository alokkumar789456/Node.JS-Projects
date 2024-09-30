const User = require('../models/userModel');
const Order = require('../models/orderModel');

exports.buyBooks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.cart.length === 0) {
      return res.status(400).json({ msg: 'Your cart is empty' });
    }

    // Create an order for each book in the cart
    const orders = user.cart.map(book => ({
      bookName: book.name,
      genre: book.genre,
      authorName: book.authorName,
      ISBN: book.ISBN,
      rate: book.rate,
      image: book.image
    }));

    const order = new Order({
      userId: user.id,
      books: orders
    });

    // Save order and empty cart
    await order.save();
    user.cart = [];
    await user.save();

    res.json({ msg: 'Books purchased successfully', order });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
