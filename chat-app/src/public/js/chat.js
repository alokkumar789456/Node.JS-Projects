const socket = io();

// Elements for form
const $messageForm = document.querySelector('#messageForm');
const $messageFormInputs = $messageForm.querySelector('input');
const $messageFormButtons = $messageForm.querySelector('button');

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

// Elements for location
const $locationButtons = document.querySelector('#send-location');

// Element for displaying messages
const $message = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// Handle incoming messages
socket.on('message', (message) => {
  console.log('Received message:', message);
  const html = Mustache.render(messageTemplate, { 
    username: message.username, 
    message: message.text, 
    createdAt: moment(message.createdAt).format('h:mm a') 
  });
  $message.insertAdjacentHTML('beforeend', html);
});

// Handle incoming location messages
socket.on('locationMessage', (message) => {
  console.log('Received location:', message.url);
  const html = Mustache.render(locationMessageTemplate, { 
    username: message.username, 
    url: message.url, 
    createdAt: moment(message.createdAt).format('h:mm a') 
  });
  $message.insertAdjacentHTML('beforeend', html);
});

// Handle incoming room data
socket.on('roomData', ({ room, users }) => {
  console.log('Room:', room);
  console.log('Users:', users);
  // Render the sidebar with the updated user list
  const html = Mustache.render(sidebarTemplate, { room, users });
  document.querySelector('.chat__sidebar').innerHTML = html;
});

// Handle form submission
$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  $messageFormButtons.setAttribute('disabled', 'disabled');

  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message, (error) => {
    $messageFormButtons.removeAttribute('disabled');

    if (error) {
      console.error('Error:', error);
      alert(error);
    } else {
      console.log('Message Delivered!');
    }

    e.target.elements.message.value = '';
    e.target.elements.message.focus();
  });
});

// Handle location sharing
$locationButtons.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }

  $locationButtons.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('Position:', position);
      socket.emit('sendLocation', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, () => {
        $locationButtons.removeAttribute('disabled');
        console.log('Location Shared!');
      });
    },
    (error) => {
      $locationButtons.removeAttribute('disabled');
      console.error('Geolocation error:', error);
      alert('Unable to retrieve location. Please try again.');
    }
  );
});

// Join the chat room
socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});


//!!!!!!!!!!!!!!!!! EMOJI FUNCTION NO NEED TO SEE THIS 

document.addEventListener('DOMContentLoaded', () => {
  const emojiButton = document.getElementById('emoji-button');
  const emojiPicker = document.getElementById('emoji-picker');
  const messageInput = document.getElementById('message');
  const emojiPickerScript = document.createElement('script');
  
  // Load emoji picker library
  emojiPickerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/emoji-picker/1.0.0/emoji-picker.min.js';
  document.head.appendChild(emojiPickerScript);

  emojiPickerScript.onload = () => {
    // Initialize emoji picker
    const picker = new EmojiPicker({
      trigger: '#emoji-button',
      container: '#emoji-picker',
      onSelect: (emoji) => {
        messageInput.value += emoji; // Append emoji to message input
      }
    });

    // Toggle emoji picker visibility
    emojiButton.addEventListener('click', () => {
      emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
    });

    // Hide picker if clicking outside
    document.addEventListener('click', (event) => {
      if (!emojiButton.contains(event.target) && !emojiPicker.contains(event.target)) {
        emojiPicker.style.display = 'none';
      }
    });
  };
});
