const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const mongoose = require('mongoose');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const adminEmails = ['admin@gmail.com'];
    const isAdmin = adminEmails.includes(email);

    if (isAdmin) {
      const existingAdmin = await User.findOne({ email, isAdmin: true });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin cannot register themselves' });
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      isAdmin 
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'shhh', { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser._id, name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await mongoose.connection.db.collection('users').findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, 'shhh', { expiresIn: '1h' });

    const isAdmin = user.isAdmin;

    console.log('User Data:', user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: isAdmin 
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createUser, loginUser };
