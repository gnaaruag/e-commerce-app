const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const onboardUser = async (req, res) => {
  console.log(req.body);
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).send("User with this email already exists");
  }
  const hashed = await bcrypt.hash(req.body.password, 10);

  console.log(hashed);

  const data = User({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
  });

  await data
    .save()
    .then(() => {
      res.status(200).send("OK");
      console.log("Data saved");
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
};

const verifyLogin = async (req, res) => {
	const { email, password } = req.body;
  
	try {
	  // Find the user by email
	  const user = await User.findOne({ email });
  
	  if (!user) {
		// If user is not found, respond with invalid credentials
		return res.status(401).json({ message: "Invalid credentials" });
	  }
  
	  // Compare the provided password with the stored hashed password
	  const isMatch = await bcrypt.compare(password, user.password);
  
	  if (!isMatch) {
		// If passwords do not match, respond with invalid credentials
		return res.status(401).json({ message: "Invalid credentials" });
	  }
  
	  // Regenerate session to prevent session fixation
	  req.session.regenerate((err) => {
		if (err) {
		  console.error("Session regeneration error:", err);
		  return res.status(500).json({ message: "Internal server error" });
		}
  
		// Store user ID in session for later retrieval
		req.session.userId = user._id;
  
		// Get the session ID
		const sessionId = req.sessionID;
  
		// Set the session ID in an HTTP-only and secure cookie
		res.cookie("sessionId", sessionId, {
		  httpOnly: true,
		  secure: true,
		  maxAge: 1000 * 60 * 60 * 24, // 1 day
		});
  
		// Respond with success message and session ID
		return res.status(200).json({ message: "Login successful", sessionId });
	  });
	} catch (error) {
	  console.error("Login error:", error);
	  return res.status(500).json({ message: "Internal server error" });
	}
  };
  
  

module.exports = { onboardUser, verifyLogin };
