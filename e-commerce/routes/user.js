// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const express = require("express");
// const userRoutes = express.Router();
// const User = require("../models/userModel.js");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const env = require("dotenv");
// const auth = require("../middlewares/auth.js");
// const nodemailer = require("nodemailer");

// env.configDotenv();

// userRoutes.use(cors());
// userRoutes.use(cookieParser());

// // signup page
// userRoutes.get("/signup", (req, res) => {
//   res.render("signup");
// });

// // Generate OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
// };

// // Configure nodemailer
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587, // Use 587 for TLS
//   secure: false,
//   auth: {
//     user: "alokwastesting@gmail.com", // Make sure this is correct
//     pass: "xgsr wwii ecmc rbev", // generated App password
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
//   logger: true,
//   debug: true,
//   connectionTimeout: 10000, // 10 seconds
//   greetingTimeout: 10000, // 10 seconds
//   closeTimeout: 5000,
// });

// // Signup form submission
// userRoutes.post("/signup", async (req, res) => {
//   const {
//     name,
//     email,
//     phone,
//     city,
//     state,
//     pincode,
//     country,
//     password,
//     confirmPassword,
//   } = req.body;

//   // Check if passwords match
//   if (password !== confirmPassword) {
//     return res.status(400).send("Passwords do not match.");
//   }

//   try {
//     // Generate salt and hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     // Generate OTP
//     const otp = generateOTP();

//     // Create or update user in the database
//     const newUser = await User.findOneAndUpdate(
//       { email },
//       {
//         name,
//         phone,
//         city,
//         state,
//         pincode,
//         country,
//         password: hash,
//         otp, // Assign OTP to user
//         otpExpires: Date.now() + 300000, // OTP valid for 5 minutes
//       },
//       { new: true, upsert: true }
//     );

//     console.log("New User:", newUser); // Log user details

//     if (!newUser) {
//       return res.status(500).send("User creation or update failed.");
//     }

//     // Send OTP via email
//     const mailOptions = {
//       from: "alokwastesting@gmail.com",
//       to: email,
//       subject: "Your OTP Code",
//       text: `Your OTP is ${otp}`,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log("OTP sent to email");

//     // Render OTP verification page
//     res.render("verify-otp", { email });

//   } catch (err) {
//     console.error("Error during signup:", err.message); // Log error message
//     res.status(500).send("Signup failed. Please try again.");
//   }

// });

// // OTP verification
// userRoutes.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).send("User not found.");
//     }

//     if (user.otp !== otp || Date.now() > user.otpExpires) {
//       return res.status(400).send("Invalid or expired OTP.");
//     }

//     // Clear the OTP fields if desired
//     user.otp = null;
//     user.otpExpires = null;

//     await user.save(); // Save the changes
//     console.log("OTP verified and user saved:", user);

//     res.status(200).send("Signup success. Now you can log in.");
//   } catch (err) {
//     console.error("Error verifying OTP:", err);
//     res.status(500).send("Verification failed. Please try again.");
//   }
// });

// userRoutes.get("/login", (req, res) => {
//   res.render("login");
// });

// userRoutes.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).send("Invalid email or password.");
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (match) {
//       // Create a token
//       const token = jwt.sign(
//         { id: user._id, email: user.email },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );

//       // Store the token in a cookie
//       res.cookie("token", token);
//       const isLoggedIn = !!req.cookies.token;
//       res.render("product", { products: [], isLoggedIn });
//     } else {
//       res.status(401).send("Invalid email or password.");
//     }
//   } catch (err) {
//     console.error("Error during login:", err);
//     res.status(500).send("Login failed. Please try again.");
//   }
// });

// userRoutes.get("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.render("login");
// });

// module.exports = userRoutes;

const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const userRoutes = express.Router();
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const env = require("dotenv");
const auth = require("../middlewares/auth.js");
const nodemailer = require("nodemailer");

env.configDotenv();

userRoutes.use(cors());
userRoutes.use(cookieParser());

// Signup page
userRoutes.get("/signup", (req, res) => {
  res.render("signup");
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
};

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 587 for TLS
  secure: false,
  auth: {
    user: "alokwastesting@gmail.com",
    pass: "xgsr wwii ecmc rbev",
  },
  tls: {
    rejectUnauthorized: false,
  },
  logger: true,
  debug: true,
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000, // 10 seconds
  closeTimeout: 5000,
});

// Signup form submission
userRoutes.post("/signup", async (req, res) => {
  const {
    name,
    email,
    phone,
    city,
    state,
    pincode,
    country,
    password,
    confirmPassword,
  } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match.");
  }

  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = generateOTP();

    // Create or update user in the database
    const newUser = await User.findOneAndUpdate(
      { email },
      {
        name,
        phone,
        city,
        state,
        pincode,
        country,
        password: hash,
        otp, // Assign OTP to user
        otpExpires: Date.now() + 300000, // OTP valid for 5 minutes
      },
      { new: true, upsert: true }
    );

    console.log("New User:", newUser); // Log user details

    if (!newUser) {
      return res.status(500).send("User creation or update failed.");
    }

    // Send OTP via email
    const mailOptions = {
      from: "alokwastesting@gmail.com",
      to: email,
      subject: "Your OTP for Secure Access to Hmmmmm! by BrainPhantom",
      text: `
    Hi ${name},
    
    Thank you for choosing Hmmmmm! by BrainPhantom.
    
    To proceed with your request, please use the One-Time Password (OTP) below to complete your verification:
    
    Your OTP: ${otp}
    
    Please note that this OTP is valid for the next 10 minutes and can only be used once.
    
    If you didn’t request this, please ignore this email or contact our support team.
    
    Thank you for your trust in us.
    
    Best regards,
    The Hmmmmm! Team
    BrainPhantom`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP sent to email");

    // Render OTP verification page
    res.render("verify-otp", { email });
  } catch (err) {
    console.error("Error during signup:", err.message);
    res.status(500).send("Signup failed. Please try again.");
  }
});

// OTP verification
userRoutes.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("User not found.");
    }

    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).send("Invalid or expired OTP.");
    }

    // Clear the OTP fields if desired
    user.otp = null;
    user.otpExpires = null;

    await user.save();
    console.log("OTP verified and user saved:", user);

    res.status(200).send("Signup success. Now you can log in.").render("product")
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).send("Verification failed. Please try again.");
  }
});

// Login page
userRoutes.get("/login", (req, res) => {
  const isLoggedIn = !!req.cookies.token;
  res.render("login", { products: [], isLoggedIn });
});

// Login form submission
// Login form submission
userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password.");
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Create a token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Store the token in a cookie
      res.cookie("token", token);

      // Pass the email and isLoggedIn to the EJS template
      const isLoggedIn = !!req.cookies.token;
      res.render("product", { products: [], isLoggedIn, email: user.email });
    } else {
      res.status(401).send("Invalid email or password.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Login failed. Please try again.");
  }
});


// Logout
userRoutes.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.render("login");
});



module.exports = userRoutes;
