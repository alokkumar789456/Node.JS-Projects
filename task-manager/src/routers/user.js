// src/routers/user.js
import express from "express";
import User from "../db/model/model-user.js";
import auth from "../middleware/auth.js";
import cors from "cors";
import Task from "../db/model/model-task.js";
import sharp from "sharp";
import multer from "multer";
import account from "../../emails/account.js";

const router = express.Router();
router.use(cors());

// Route to create a new user
router.post("/users", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({
      error:
        "Invalid updates. Allowed updates are 'name', 'email', 'password', 'age'.",
    });
  }
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .send({ error: "User already exists with this email." });
    }
    const user = new User(req.body);
    await user.save();


    try {
      await account.sendWelcomeEmail(user.email, user.name);
      console.log("Welcome email sent successfully");
    } catch (emailErr) {
      console.error("Error sending welcome email:", emailErr);
      // Optionally you can still proceed, or return an error, based on your requirements
      return res.status(500).send({ error: "Failed to send welcome email" });
    }


    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
    console.log("user saved :)");
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(400).send(err);
  }
});

//LOGIN Credentials
router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate presence of email and password
    if (!email || !password) {
      return res
        .status(400)
        .send({ error: "Email and password are required." });
    }
    // Find user by credentials
    const user = await User.findByCredentials(email, password);
    // Generate authentication token
    const token = await user.generateAuthToken();
    // Send response with user and token
    res.status(200).send({ message: "User login success", user, token });
  } catch (error) {
    // Customize the error message based on the type of error
    if (
      error.message === "Unable to login: User not found." ||
      error.message === "Unable to login: Incorrect password."
    ) {
      return res.status(400).send({ error: error.message });
    }
    res.status(500).send({ error: "An error occurred during login." });
  }
});

// Route to logout the user
router.post("/users/logout", auth, async (req, res) => {
  try {
    // Remove the token from the user's tokens array
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    // Save the updated user
    await req.user.save();
    // Send a success response
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Route to logoutAll from All sessions
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.send(500).send();
  }
});

// Route to list all the users
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// Route to update a user
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({
      error:
        "Invalid updates! Allowed updates are: 'name', 'email', 'password', 'age'",
    });
  }
  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.send(req.user);
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// Route to delete a user
router.delete("/users/me", auth, async (req, res) => {
  try {
    // Use `findOneAndDelete` to remove the user by their ID
    const deletedUser = await User.findOneAndDelete({ _id: req.user._id });
    await Task.deleteMany({ owner: req.user._id });
    // Check if a user was found and deleted
    if (!deletedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    try {
      await account.sendCancelmail(req.user.email, req.user.name);
      console.log("Cancellation email sent successfully");
    } catch (emailErr) {
      console.error("Error sending welcome email:", emailErr);
      // Optionally you can still proceed, or return an error, based on your requirements
      return res.status(500).send({ error: "Failed to send welcome email" });
    }

    // Send a success response with the deleted user information
    res
      .status(200)
      .send({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// multer endpoints Post, delete, get
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload image"));
    }
    cb(undefined, true);
  },
});
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer() 
    req.user.avatar = buffer
    await req.user.save()
    res.send({ message: "file uploaded successfully" });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar = undefined 
    await req.user.save()
    res.send({'message':'avatar deleted successfully'})
})


//! Run this endPoint on Chrome to See the Actual picture ("http://localhost:3000/users/:id/avatar")
router.get('/users/:id/avatar',async(req,res)=>{
  try {
    const user = await User.findById(req.params.id);
    
    if (!user || !user.avatar) {
      return res.status(404).send({ error: 'User or avatar not found' });
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar); 

  } catch (e) {
    res.status(404).send('!Opps Something Went Wrong')
  }
})

//? What is JWT ?
//  const myFunction = ()=>{
//     const token =  jwt.sign({_id:'abc123'},'give Some Random characters',{expiresIn:'7 days'})
//     console.log(token);
//!    to verify
//     const data = jwt.verify(token,'give Some Random characters')
//     console.log(data);
//  }
//  myFunction()
//! o/p
//! eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmMxMjMiLCJpYXQiOjE3MjQ3MzU5MzZ9.mrgnfU-2BFCjxoaf1-KSraCtYAhMMFUbB94_LOHxxkk
//! jwt contains 3 parts
//! header -  it includes the type of token (JWT) and the signing algorithm used
//! payload -  Claims are key-value pairs (actual data) (https://www.base64decode.org/ to decode middle part)
//! Signature - Used to verify the authenticity of the token

export default router;
