const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema({
    username: String,
    email: String,
    googleId: String,
    profilePicture: String,
    accessToken: String,
    refreshToken: String,
    imageUrls: [{
        url: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }]
});

module.exports = mongoose.model('GoogleUser', googleUserSchema);