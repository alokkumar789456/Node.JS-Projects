import jwt from "jsonwebtoken";
import User from "../db/model/model-user.js";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res
        .status(401)
        .send({ error: "Authentication token not provided." });

    }
    const decoded = jwt.verify(token,process.env.JWT);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User not found.");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed." });
  }
};

export default auth;