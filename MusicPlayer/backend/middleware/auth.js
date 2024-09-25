const passport = require("passport");
const User = require("../model/User.js")
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/player",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          user = new User({
            googleId: profile.id,
            username: profile.email,
            name: profile.displayName,
            email: profile.email,
          });
          await user.save(); 
          console.log("Google profile:", profile);
          console.log(User);
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
