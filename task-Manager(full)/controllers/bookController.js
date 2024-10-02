const Order = require('../models/Order.js');
const sharp = require('sharp');
const Book = require('../models/bookModel.js'); 
const User = require("../models/User.js")

// To Check is User is Admin 
exports.isAdmin = async (id) => {
  const UserDetails = await User.findById(id);
  console.log(UserDetails) //DBug
  // Check if the user is an admin
  if (!UserDetails.admin) {
    return res.status(403).send('Access denied. Admins only.');
  }
}

// Add a new book (admin only)
exports.addBook = async (req, res) => {
  const { genre, authorName, bookName, ISBN, rate } = req.body;

  const UserDetails = await User.findById(Object.values(req.user)[0].id);
  
  if (!UserDetails.admin) {
    return res.status(403).send('Access denied. Admins only.');
  }

  try {
    let imagePath = null;
    let resizedImagePath = null;

    // Check if an image was uploaded
    if (req.file) {
      const image = req.file;
      imagePath = `uploads/${image.filename}`;
      resizedImagePath = `uploads/resized-${image.filename}`;

      // Crop and resize the image
      await sharp(image.path).resize(200, 300).toFile(resizedImagePath);
    }

    const newBook = new Book({
      genre,
      authorName,
      bookName,
      ISBN,
      rate,
      image: resizedImagePath || undefined, 
    });

    await newBook.save();
    res.status(201).send('Book added');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};



// List all books (accessible to all users)
exports.listBooks = async (req, res) => {
  try {
    const books = await Book.find(); 
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update a book (admin only)
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { genre, authorName, bookName, ISBN, rate } = req.body;

  const UserDetails = await User.findById(Object.values(req.user)[0].id);
  
  if (!UserDetails.admin) {
    return res.status(403).send('Access denied. Admins only.');
  }

  try {
    let updatedData = {
      genre,
      authorName,
      bookName,
      ISBN,
      rate,
    };

    // Check if an image was uploaded
    if (req.file) {
      const image = req.file;
      const imagePath = `uploads/${image.filename}`;
      updatedData.image = imagePath;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBook) {
      return res.status(404).send('Book not found');
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


// Delete a book (admin only)
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  const UserDetails = await User.findById(Object.values(req.user)[0].id);
  // console.log(UserDetails) //DBug
  // Check if the user is an admin
  if (!UserDetails.admin) {
    return res.status(403).send('Access denied. Admins only.');
  }

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send('Book not found');
    }

    res.status(200).send('Book deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
