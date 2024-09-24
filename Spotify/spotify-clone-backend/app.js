const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/spotify-clone')
    .then(() => { console.log('MongoDB Connected') })
    .catch((err) => { console.log(err.message, 'Something Went Wrong!'); });

app.use('/api/auth', require('./routes/auth'));
// app.use('/api/playlists', require('./routes/playlists'));
app.use('/', require('./routes/signUp'));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
