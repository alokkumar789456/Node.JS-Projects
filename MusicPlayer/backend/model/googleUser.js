const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true 
  },
 username: {
  type: String,
  unique: true,
  required: true,
  minlength: 5,
  match: /^[a-zA-Z0-9_]+$/,
},
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} is not a valid email!`,
    },
  }, playlists: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('googleUser', UserSchema);
