const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const onboardUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already registered with this email");
    }

    // If the user does not exist, create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).send("User registered");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const verifyLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign({ userId: user._id }, secret);
    res.cookie("token", token, {
      httpOnly: true, // Make the cookie inaccessible to JavaScript
      secure: false, // Set to true if you're using HTTPS // Adjust according to your needs
      path: "/",
      sameSite: "none",
      secure: true, // Ensure the cookie is available for all routes
    });
    console.log(token);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const authMiddleware = (token) => {
  if (!token) {
    return { valid: false, error: "No token provided." };
  }
  try {
    const decoded = jwt.verify(token, secret);
    return { valid: true, user: decoded };
  } catch (error) {
    return { valid: false, error: "Invalid token" };
  }
};

const checkCreds = (req, res) => {
	const token = req.token;
	if (!token) {
	  return { valid: false, error: "No token provided." };
	}
  
	try {
	  const decoded = jwt.verify(token, secret);
	  return { valid: true, user: decoded };
	} catch (error) {
	  return { valid: false, error: "Invalid token" };
	}
  };

module.exports = { onboardUser, verifyLogin, authMiddleware, checkCreds };
