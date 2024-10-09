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
    apiKey: process.env.FB_API_KEY,
    authDomain:process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_SENDER_ID,
    appId:process.env.FB_APPID,
    measurementId:process.env.FB_MEASUREMENT_ID
  };
//   const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
  };

app.set("view engine", "ejs");
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Routes
// app.use(mainRoute);
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
