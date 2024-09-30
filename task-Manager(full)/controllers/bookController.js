const Order = require('../models/Order');
const sharp = require('sharp');
const Book = require('../models/bookModel'); 

exports.addBook = async (req, res) => {
  const { genre, authorName, bookName, ISBN, rate } = req.body;

  try {
    const image = req.file;
    const imagePath = `uploads/${image.filename}`;

    // Crop and resize the image
    await sharp(image.path).resize(200, 300).toFile(imagePath);

    const newBook = new Order({
      genre,
      authorName,
      bookName,
      ISBN,
      rate,
      image: imagePath,
    });

    await newBook.save();
    res.status(201).send('Book added');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.listBooks = async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the database
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
