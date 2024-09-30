const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin'); 
const googleUser = require('../model/googleModel.js'); // Import the user model
const dotenv = require('dotenv').config()
const uploadRoute = express.Router();

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } }); // Limit file size to 10MB

// Firebase Admin credentials - keep the credentials securely, not in public folder
const serviceAccount = require('../config/firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "image-gallery-9ddab.appspot.com"
});

uploadRoute.post('/upload', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const file = req.file; 
        const bucket = admin.storage().bucket();
        const blob = bucket.file(file.originalname);

        const stream = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        stream.on('error', (error) => {
            return res.status(500).send(error);
        });

        stream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            if (req.user) {
                await googleUser.findByIdAndUpdate(req.user._id, {
                    $addToSet: { imageUrls: { url: publicUrl, date: new Date() } }
                });
            }

            res.status(200).send(`File uploaded successfully: ${publicUrl}`);
        });

        stream.end(file.buffer);
    } catch (error) {
        res.status(500).send('Error uploading file: ' + error.message);
    }
});


module.exports = uploadRoute;
