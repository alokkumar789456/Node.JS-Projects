const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mainRoute = require('./routes/mainPage.js');
const googleRoute = require('./routes/google.js');
const loginRoute = require('./routes/login.js');
const uploadRoute = require('./routes/upload.js')
const firebase = require('firebase/app');

require('firebase/storage');
require('ejs');
require('dotenv').config();
require('./model/mongoose.js');

const port = process.env.PORT || 3000;
const app = express();

const firebaseConfig = {
    apiKey: "AIzaSyCg2djA8mOgJqhIALW4E5Ftnm1ahrbWJZo",
    authDomain: "image-gallery-9ddab.firebaseapp.com",
    projectId: "image-gallery-9ddab",
    storageBucket: "image-gallery-9ddab.appspot.com",
    messagingSenderId: "780063464298",
    appId: "1:780063464298:web:124dd65fab9cd5eed1a313",
    measurementId: "G-C1KFESCKW8"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Routes
app.use('/mainPage', mainRoute);
app.use('/google', googleRoute);
app.use(loginRoute);
app.use(uploadRoute)

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server Connected to URL http://localhost:${port}`);
    } else {
        console.log(`Server Failed To CONNECT`);
    }
});
