// models/Track.js
const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: {
    name: { type: String, required: true },
    bio: { type: String, required: true },
  },
  album: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  audioUrl: { type: String, required: true }, 
  albumArt: { type: String }, 
  
}, { timestamps: true });

module.exports = mongoose.model('Track', TrackSchema);
