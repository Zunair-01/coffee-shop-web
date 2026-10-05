// Controllers/passwordResetController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const nodemailer = require('nodemailer');

// Configure Mailtrap
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arfanmehar645@gmail.com', 
    pass: 'password' 
  }
});

// Request Password Reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No user found with this email address' });
    }

    const token = jwt.sign({ userId: user._id }, 'shhh', { expiresIn: '1h' });

    const resetUrl = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
      from: 'arfanmehar645@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Password reset error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, 'shhh');
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password reset error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { requestPasswordReset, resetPassword };
