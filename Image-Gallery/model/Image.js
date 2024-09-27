const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    tags: [{ type: String }],
    path: { type: String, required: true } 
});

module.exports = mongoose.model('Image', imageSchema);
