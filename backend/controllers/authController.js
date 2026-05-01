const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// BUG INTENTIONAL: Signup allows empty password
exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // BUG: No validation for empty fields
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    user = new User({ 
      name: name || '', // BUG: Allows empty name
      email: email || '', // BUG: Allows empty email
      password: password || 'default123' // BUG: Default password if empty
    });
    
    await user.save();

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// BUG INTENTIONAL: Login allows empty fields
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // BUG: No validation - allows empty email/password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // BUG: No password validation if both are empty
    let isPasswordMatch = true;
    if (password && user.password) {
      isPasswordMatch = await user.matchPassword(password);
    }

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};