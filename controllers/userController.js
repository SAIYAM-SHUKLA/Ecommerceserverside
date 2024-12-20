
require('dotenv').config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  
  const { name, email, password, role } = req.body;

  // Input validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  // Password hashing
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token  });
    
    
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};


const getProfile = async (req, res) => {
  // console.log(req.query);
  const { token } = req.query;

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      } 
      // console.log(user._id)

      res.status(200).json({

          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
      });
  } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
  }
};



module.exports = { registerUser, loginUser,getProfile };
