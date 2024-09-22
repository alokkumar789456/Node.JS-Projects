// const mongoose = require('mongoose');
// const validator = require('validator');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         validate: {
//             validator: validator.isEmail,
//             message: props => `${props.value} is not a valid email!`
//         }
//     },
//     phone: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         validate: {
//             validator: function(v) {
//                 return validator.isMobilePhone(v, 'any', { strict: true });
//             },
//             message: props => `${props.value} is not a valid phone number!`
//         }
//     },
//     city: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     state: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     pincode: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     country: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     orders: [{
//         type: String,
//         ref: 'Product'
//     }]
// }, {
//     timestamps: true ,
// });

// userSchema.add({
//     otp: String,
//     otpExpires: Date,
// });

// const userModel = mongoose.model('User', userSchema);

// module.exports = userModel;
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        trim: true
    },
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
    address: String,
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' // Link to the Order model
    }]
}, {
    timestamps: true,
});

userSchema.add({
    otp: String,
    otpExpires: Date,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
