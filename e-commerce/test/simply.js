// const axios = require('axios')
// const User = require('../models/userModel.js')
// const mongoose = require('mongoose');


// const mongoURI = 'mongodb://localhost:27017/e-commerce'; 
// mongoose.connect(mongoURI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));



// // Function to find user by ID
// async function findUserById(userId) {
//     try {
//         const user = await User.findById(userId);
//         if (user) {
//             console.log('User Details:', user.orders[0]); // Display first order detail

//             // Use Promise.all to handle multiple API requests
//             const productPromises = user.orders.map(orderId => {
//                 return axios.get(`https://fakestoreapi.com/products/${orderId}`);
//             });

//             const products = await Promise.all(productPromises);
//             products.forEach(product => {
//                 console.log('Product ID:', product.data); // Display each product ID
//             });

//         } else {
//             console.log('User not found');
//         }
//     } catch (error) {
//         console.error('Error finding user:', error);
//     }
// }

// // Call the function with a sample user ID
// const userId = '66ebf1047df5fa837d8a623d'; 
// findUserById(userId);




// const net = require('net');

// const client = net.createConnection({ host: 'smtp.gmail.com', port: 465 }, () => {
//   console.log('Connected to SMTP server!');
//   client.end(); // Close the connection
// });

// client.on('error', (err) => {
//   console.error('Error connecting to SMTP server:', err);
// });


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "alokwastesting@gmail.com",
    pass: "Root.@8277465", // ensure you're using an App Password if needed
  },
});

const mailOptions = {
  from: "alokwastesting@gmail.com", // your email
  to: "alokkumar77954@gmail.com", // recipient's email
  subject: "Test Email",
  text: "This is a test email sent from Nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error sending email: ', error);
  }
  console.log('Email sent: ', info.response);
});
