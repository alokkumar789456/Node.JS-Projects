// const User = require('../models/User.js');
// const Book = require('../models/bookModel.js');

// // Add book to cart
// exports.addToCart = async (req, res) => {
//   const { bookId } = req.body;
//   try {
//     const userId = Object.values(req.user)[0].id;
//     const user = await User.findById(userId);

//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     const book = await Book.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ msg: 'Book not found' });
//     }

//     // Check if the book is already in the cart
//     if (user.cart.includes(book._id)) {
//       return res.status(400).json({ msg: 'Book is already in the cart' });
//     }

//     // Add book to user's cart
//     user.cart.push(book._id);
//     await user.save();
//     console.log("Book was added to cart");

//     res.json(user.cart);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// };

// // Remove book from cart
// exports.removeFromCart = async (req, res) => {
//   const { bookId } = req.body;
//   try {
//     const userId = Object.values(req.user)[0].id;
//     const user = await User.findById(userId);

//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     // Check if the book is in the cart
//     if (!user.cart.includes(bookId)) {
//       return res.status(400).json({ msg: 'Book not found in cart' });
//     }

//     // Remove book from user's cart
//     user.cart = user.cart.filter((item) => item.toString() !== bookId);
//     await user.save();
//     console.log("Book was removed from cart");

//     res.json(user.cart);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// };

// // List books in the cart
// exports.listCart = async (req, res) => {
//   try {
//     const userId = Object.values(req.user)[0].id;
//     const user = await User.findById(userId).populate('cart');

//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     res.json(user.cart); 
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server error');
//   }
// };

const User = require('../models/User.js');
const Book = require('../models/bookModel.js');

// Add book to cart
exports.addToCart = async (req, res) => {
  const { bookId } = req.body;

  if (!bookId) {
    return res.status(400).json({ msg: 'Book ID is required' });
  }

  try {
    const userId = Object.values(req.user)[0].id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Check if the book is already in the cart
    if (user.cart.includes(book._id)) {
      return res.status(400).json({ msg: 'Book is already in the cart' });
    }

    // Add book to user's cart
    user.cart.push(book._id);
    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Remove book from cart
exports.removeFromCart = async (req, res) => {
  const { bookId } = req.body;

  if (!bookId) {
    return res.status(400).json({ msg: 'Book ID is required' });
  }

  try {
    const userId =  Object.values(req.user)[0].id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if the book is in the cart
    if (!user.cart.includes(bookId)) {
      return res.status(400).json({ msg: 'Book not found in cart' });
    }

    // Remove book from user's cart
    user.cart = user.cart.filter((item) => item.toString() !== bookId);
    await user.save();
    res.json(user.cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// List books in the cart
exports.listCart = async (req, res) => {
  try {
    const userId = Object.values(req.user)[0].id;
    const user = await User.findById(userId).populate('cart');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user.cart);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};