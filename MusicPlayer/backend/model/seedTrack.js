const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Importing faker
const Track = require('./Track'); // Adjust the path as necessary

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/musicPlayer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  generateTracks();
})
.catch(err => console.error(err));

const generateTracks = async () => {
  const tracks = [];

  for (let i = 0; i < 100; i++) {
    tracks.push({
      title: faker.lorem.sentence(3),
      artist: {
        name: faker.person.fullName(), // Updated to use faker.person
        bio: faker.lorem.paragraph(),
      },
      album: faker.lorem.word(),
      genre: faker.helpers.arrayElement(['Pop', 'Rock', 'Jazz', 'Hip Hop', 'Classical', 'Electronic']),
      releaseYear: faker.date.past(20).getFullYear(),
      audioUrl: `${faker.internet.url()}/audio/${Math.random().toString(36).substring(2, 12)}.mp3`, // Generate alphanumeric string
      albumArt: `https://via.placeholder.com/200?text=${encodeURIComponent(faker.lorem.word())}`, // Placeholder image
    });
  }

  try {
    await Track.insertMany(tracks);
    console.log('Sample data inserted');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Start the data generation
generateTracks();
