const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, JWT_SECRET } = require('../middleware/auth');

// @route   POST /api/auth/login
// @desc    Admin login & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  try {
    let user = await User.findOne({ email });
    
    // Auto-create default admin if logging in with default credentials and user doesn't exist
    if (!user && email === 'admin@msti.lk' && password === 'admin123') {
      user = await User.create({
        name: 'MSTI Admin',
        email: 'admin@msti.lk',
        password: 'admin123',
        role: 'admin',
      });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      // Fallback check for default admin credentials reset
      if (email === 'admin@msti.lk' && password === 'admin123') {
        user.password = 'admin123';
        await user.save();
      } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log('Login DB error:', error.message);
    // Fallback: if DB is down but credentials match default admin, issue token anyway
    if (email === 'admin@msti.lk' && password === 'admin123') {
      const token = jwt.sign({ id: 'admin_fallback', role: 'admin' }, JWT_SECRET, { expiresIn: '30d' });
      return res.json({
        success: true,
        token,
        user: {
          id: 'admin_fallback',
          name: 'MSTI Admin',
          email: 'admin@msti.lk',
          role: 'admin',
        },
      });
    }
    res.status(500).json({ success: false, message: 'Server error. Please try again in a moment.' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;
