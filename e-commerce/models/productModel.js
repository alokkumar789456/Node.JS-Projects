const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rate: { type: Number, required: true, min: 0, max: 5 }, // Rating should be between 0 and 5
    count: { type: Number, required: true, min: 0 } // Count should not be negative
});

const productSchema = new mongoose.Schema({
    _id:{type:String},
    title: { type: String, required: true, trim: true }, // Trim whitespace
    price: { type: Number, required: true, min: 0 }, // Price should not be negative
    description: { type: String, required: true, trim: true }, // Trim whitespace
    category: { type: String, required: true, trim: true }, // Trim whitespace
    image: { type: String, required: true, trim: true }, // Trim whitespace
    rating: {
        type: ratingSchema, // Use the rating schema defined above
        required: true
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
