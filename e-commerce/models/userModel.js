const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                return validator.isMobilePhone(v, 'any', { strict: true });
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    orders: [{
        type: String,
        ref: 'Product'
    }]
}, {
    timestamps: true ,
   otp: String, // Field to store OTP
  otpExpires: Date, // Field to store OTP expiration time
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
