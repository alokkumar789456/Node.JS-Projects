const axios = require('axios');
const User = require('../../models/userModel.js');
const mongoose = require('../../models/mongoose.js');

async function findUserById(userId) {
    try {
        const user = await User.findById(userId);
        if (user) {
            console.log('User Details:', user.orders[0]);

            const productPromises = user.orders.map(orderId => {
                return axios.get(`https://fakestoreapi.com/products/${orderId}`);
            });

            const products = await Promise.all(productPromises);
            const productDataArray = products.map(product => product.data); // Extracting product data

            return productDataArray; // Return the array of product data
        } else {
            console.log('User not found');
            return null; // Return null if user is not found
        }
    } catch (error) {
        console.error('Error finding user:', error);
        throw error; // Optionally re-throw the error
    }
}

// findUserById('66ebf1047df5fa837d8a623d')

module.exports = findUserById;
