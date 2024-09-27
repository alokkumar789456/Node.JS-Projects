const express = require('express');
const multer = require('multer');
const admin = require('firebase-admin'); 

const uploadRoute = express.Router();

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });


// const admin = require('firebase-admin');
const serviceAccount = require('../public/JSON/image-gallery-9ddab-firebase-adminsdk-bsrqm-8796673b52.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "image-gallery-9ddab.appspot.com" 
});


// Define your upload route
uploadRoute.post('/upload', upload.single('photo'), async (req, res) => {
    // Check if a file was uploaded
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

        stream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            res.status(200).send(`File uploaded successfully: ${publicUrl}`);
        });

        stream.end(file.buffer);
    } catch (error) {
        res.status(500).send('Error uploading file: ' + error.message);
    }
});

module.exports = uploadRoute;
