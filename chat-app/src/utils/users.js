const users = [];

// Add a user
const addUser = ({ id, username, room }) => {
    // Clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate the data
    if (!username || !room) {
        return {
            error: "Username and Room are required"
        };
    }

    // Check for existing user
    const existingUser = users.find(user => user.room === room && user.username === username);

    // Validate username
    if (existingUser) {
        return {
            error: "Username already in use!"
        };
    }

    // Store the user
    const user = { id, username, room };
    users.push(user); // Corrected: Push the user object into the array

    return { user };
};

// Remove a user
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

// Get a user
const getUser = (id) => {
    return users.find(user => user.id === id);
};

// Get users in a room
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase();
    return users.filter(user => user.room === room);
};

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}