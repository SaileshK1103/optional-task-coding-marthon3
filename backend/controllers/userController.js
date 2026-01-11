const User = require('../models/userModel'); 

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: '30d',
  });
};
// register
const registerUser = async (req, res) => {
  const { name, email, password, gender, date_of_birth, occupation, phone } =
    req.body;
  // Check if user exist
  const userExists = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User with this email or phone already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user with all fields from schema
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    gender,
    date_of_birth,
    occupation,
    phone,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // Check if user exists and password matches (using bcrypt.compare)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = {
  registerUser,
  loginUser
};