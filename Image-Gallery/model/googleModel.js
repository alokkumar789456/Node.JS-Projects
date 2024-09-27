const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    googleId: { type: String, required: true, unique: true },
    profilePicture: String, 
    accessToken:{
        type:String,
        required:true,
        unique:true
    }
});

const googleUser = mongoose.model('googleUser', userSchema);

module.exports = googleUser;
