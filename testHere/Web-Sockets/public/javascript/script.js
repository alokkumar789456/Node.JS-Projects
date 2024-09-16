// Connect to the WebSocket server
const socket = io();

// Handle form submission
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('input');
    socket.emit('chat message', input.value); // Emit a 'chat message' event
    input.value = ''; // Clear input field
    return false;
});

// Listen for incoming messages
socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    document.getElementById('messages').appendChild(item);
});
