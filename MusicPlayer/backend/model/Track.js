// models/Track.js
const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: {
    name: { type: String, required: true },
    bio: { type: String, required: true }, // Artist biography
  },
  album: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  audioUrl: { type: String, required: true }, // URL to the audio file
  albumArt: { type: String }, // Optional: URL to the album cover image
}, { timestamps: true });

module.exports = mongoose.model('Track', TrackSchema);
