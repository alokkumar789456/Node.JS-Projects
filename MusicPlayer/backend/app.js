require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(
  session({ secret: "your-secret-key", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/login", require("./routes/login"));
app.use("/api/signup", require("./routes/signUp"));
app.use("/api/music", require("./routes/music"));

mongoose
  .connect("mongodb://localhost:27017/musicPlayer")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
