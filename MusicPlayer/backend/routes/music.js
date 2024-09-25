const express = require('express');
const Track = require('../model/Track.js');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // All uploads go to this directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Add timestamp to avoid filename conflicts
  },
});

const upload = multer({ storage });

// POST: Add a new track
router.post('/', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'albumArt', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, artistName, artistBio, album, genre, releaseYear } = req.body;
    const audioUrl = req.files['audio'] ? req.files['audio'][0].path : null; // Ensure audio file exists
    const albumArtUrl = req.files['albumArt'] ? req.files['albumArt'][0].path : null; // Ensure album art exists

    const newTrack = new Track({
      title,
      artist: {
        name: artistName,
        bio: artistBio,
      },
      album,
      genre,
      releaseYear,
      audioUrl,
      albumArt: albumArtUrl,
    });

    await newTrack.save();
    res.status(201).json(newTrack);
  } catch (error) {
    console.error('Error uploading track:', error);
    res.status(500).json({ message: 'Error uploading track', error: error.message });
  }
});

// GET: Fetch all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ message: 'Error fetching tracks', error: error.message });
  }
});

// PUT: Update a track
router.put('/:id', upload.single('audio'), async (req, res) => {
  const { id } = req.params;
  try {
    const updateData = req.body;

    // If there's a new audio file, update the audioUrl
    if (req.file) {
      updateData.audioUrl = req.file.path;
    }

    const updatedTrack = await Track.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTrack) {
      return res.status(404).json({ message: 'Track not found' });
    }
    res.status(200).json(updatedTrack);
  } catch (error) {
    console.error('Error updating track:', error);
    res.status(400).json({ message: 'Error updating track', error: error.message });
  }
});

// DELETE: Remove a track
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTrack = await Track.findByIdAndDelete(id);
    if (!deletedTrack) {
      return res.status(404).json({ message: 'Track not found' });
    }
    res.status(204).send(); // No content to send
  } catch (error) {
    console.error('Error deleting track:', error);
    res.status(400).json({ message: 'Error deleting track', error: error.message });
  }
});

module.exports = router;
