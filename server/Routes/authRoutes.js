// Routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const passwordResetController = require('../Controllers/passwordResetController');

router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);
router.post('/password-reset', passwordResetController.requestPasswordReset); 
router.post('/reset-password', passwordResetController.resetPassword);

module.exports = router;
