// Import required modules
const express = require('express');
const http = require('http');
const { join } = require('path');
const { Server } = require('socket.io');

// Create an Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a Socket.IO server that attaches to the HTTP server
const io = new Server(server);

// Serve the HTML file when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html')); // Send 'index.html' file located in the same directory
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('User connected'); // Log when a new user connects

    // Listen for 'chat message' events from clients
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg); // Log the received message
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected'); // Log when a user disconnects
    });
});

// Start the server on port 3000 and handle errors
server.listen(3000, (err) => {
    if (err) {
        console.error('Error starting server:', err.message); // Log if there is an error
    } else {
        console.log('Server is listening on port 3000'); // Log successful server start
    }
});
