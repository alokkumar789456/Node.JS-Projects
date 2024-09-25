const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const googleUser = require("../model/googleUser.js");
require("dotenv").config();

const authRoute = express.Router();

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await googleUser.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          user = new googleUser({
            googleId: profile.id,
            username: profile.email.split("@")[0],
            name: profile.displayName,
            email: profile.email,
          });
          await user.save();
          console.log("New user created:", user);
          return done(null, user);
        }
      } catch (err) {
        console.error("Error during user creation:", err);
        return done(err);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await googleUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Start Google authentication
authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Google callback route
authRoute.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/player");
  }
);

module.exports = authRoute;
