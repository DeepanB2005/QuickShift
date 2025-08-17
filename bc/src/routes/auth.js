// src/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/User');
const Worker = require('../models/Workers');
const auth = require('../middleware/auth');
const router = express.Router();

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role }, 
    process.env.JWT_SECRET || 'fallback-secret',
    { expiresIn: '30d' }
  );
};

// Format user response
const formatUserResponse = async (user) => {
  let workerProfile = null;
  if (user.role === 'worker') {
    workerProfile = await Worker.findOne({ userId: user._id });
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isVerified: user.isVerified,
    profileImage: user.profileImage,
    rating: user.rating,
    totalReviews: user.totalReviews,
    address: user.address,
    workerProfile: workerProfile
  };
};

// Regular Register
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').isMobilePhone('en-IN').withMessage('Valid Indian phone number is required'),
  body('role').isIn(['customer', 'worker']).withMessage('Role must be customer or worker')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone, role, address } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone: phone.replace(/\s/g, '') }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 'Email already exists' : 'Phone number already exists'
      });
    }

    // Create user
    const user = new User({ 
      name, 
      email, 
      password, 
      phone: phone.replace(/\s/g, ''), 
      role,
      address: address || {}
    });
    await user.save();

    // If user is a worker, create worker profile
    if (role === 'worker') {
      const worker = new Worker({
        userId: user._id,
        services: [],
        hourlyRate: 0,
        isActive: false // Inactive until profile is completed
      });
      await worker.save();
    }

    const token = generateToken(user);
    const userResponse = await formatUserResponse(user);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Regular Login
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').exists().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password (skip for Google OAuth users without password)
    if (!user.googleId) {
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      return res.status(401).json({ 
        message: 'This account uses Google Sign-in. Please use Google to login.' 
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    const token = generateToken(user);
    const userResponse = await formatUserResponse(user);

    res.json({
      message: 'Login successful',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Google OAuth Routes
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      const token = generateToken(user);
      
      // Redirect to frontend with token
      const frontendURL = process.env.FR_PORT || "http://localhost:5173";
      res.redirect(`${frontendURL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      }))}`);
    } catch (error) {
      console.error('Google callback error:', error);
      const frontendURL = process.env.FR_PORT || "http://localhost:5173";
      res.redirect(`${frontendURL}/login?error=oauth_failed`);
    }
  }
);

// Google OAuth token verification (for mobile apps)
router.post('/google/verify', async (req, res) => {
  try {
    const { idToken, role } = req.body;
    
    // You'll need to install google-auth-library: npm install google-auth-library
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({
      $or: [{ googleId }, { email }]
    });

    if (user) {
      // Update google ID if not set
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // Create new user
      user = new User({
        googleId,
        name,
        email,
        profileImage: picture,
        isVerified: true,
        role: role || 'customer'
      });
      await user.save();

      // Create worker profile if needed
      if (user.role === 'worker') {
        const worker = new Worker({
          userId: user._id,
          services: [],
          hourlyRate: 0,
          isActive: false
        });
        await worker.save();
      }
    }

    const token = generateToken(user);
    const userResponse = await formatUserResponse(user);

    res.json({
      message: 'Google authentication successful',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Google verify error:', error);
    res.status(400).json({ message: 'Invalid Google token' });
  }
});

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    const userResponse = await formatUserResponse(user);
    res.json({ user: userResponse });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('phone').optional().isMobilePhone('en-IN'),
  body('address.city').optional().trim(),
  body('address.state').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    const userResponse = await formatUserResponse(user);

    res.json({
      message: 'Profile updated successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Link Google account to existing account
router.post('/link-google', auth, async (req, res) => {
  try {
    const { idToken } = req.body;
    
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub: googleId, email, picture } = payload;

    // Check if Google account is already linked to another user
    const existingGoogleUser = await User.findOne({ googleId });
    if (existingGoogleUser && existingGoogleUser._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ 
        message: 'This Google account is already linked to another user' 
      });
    }

    // Update current user with Google info
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 
        googleId,
        profileImage: picture || req.user.profileImage,
        isVerified: true
      },
      { new: true }
    ).select('-password');

    const userResponse = await formatUserResponse(user);

    res.json({
      message: 'Google account linked successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Link Google error:', error);
    res.status(400).json({ message: 'Failed to link Google account' });
  }
});

// Logout
router.post('/logout', auth, async (req, res) => {
  try {
    // Here you could implement token blacklisting if needed
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;