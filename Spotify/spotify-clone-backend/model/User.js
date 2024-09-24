const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3, 
    maxlength: 20,
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
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return validator.isMobilePhone(v, 'any', { strictMode: false }); 
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
  password:{
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function(v) {
        return /^(?=.*[A-Z])(?=.*[\W_]).+$/.test(v); // At least one uppercase letter and one special character
      },
      message: 'Password must contain at least one uppercase letter and one special character.',
    },
  },
  playlists: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('User', UserSchema);
