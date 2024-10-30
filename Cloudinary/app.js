// app.js or index.js
const express = require('express');
const cloudinary = require('cloudinary').v2;
const upload = require('./multer-config');
const app = express();
require('dotenv').config()

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Express route for image upload
const fs = require('fs');

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'demo',
    });

    // Delete the temporary file after upload
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image to Cloudinary' });
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});