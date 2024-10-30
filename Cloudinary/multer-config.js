// multer-config.js
const multer = require('multer');
const path = require('path');

// Configure storage for Multer (optional, you could also use `dest` directly)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Initialize Multer with the defined storage
const upload = multer({ storage: storage });

module.exports = upload;
