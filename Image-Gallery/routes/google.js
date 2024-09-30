const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const GoogleUser = require('../model/googleModel.js');
require('dotenv').config();

const googleRoute = express.Router();

// Configure session middleware
googleRoute.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true }));

// Initialize Passport
googleRoute.use(passport.initialize());
googleRoute.use(passport.session());

// Configure Passport with Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/google/mainPage`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await GoogleUser.findOne({ googleId: profile.id });
        if (!user) {
            user = await GoogleUser.create({
                username: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                profilePicture: profile.photos[0].value,
                accessToken,
                refreshToken
            });
        } else {
            user.profilePicture = profile.photos[0].value;
            await user.save();
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Google authentication routes
googleRoute.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

googleRoute.get('/mainPage',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const loggedIn = true; 
        const user = req.user; 
        let images = [];

       console.log(user);
       console.log(images);
        if (user && Array.isArray(user.imageUrls)) {
            images = user.imageUrls; 
        }

        // Debugging output
        console.log('Logged in:', loggedIn);
        console.log('User:', user);
        console.log('Images being sent to the template:', images);

        // Render mainPage with user and images data
        res.render('mainPage', { loggedIn, user, images });
    }
);

module.exports = googleRoute;
