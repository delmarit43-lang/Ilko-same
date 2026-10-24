const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'ilkosamesecretapikey';

// Generate Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user (Patient by default)
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    // Check if user exists
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const userRole = role && ['patient', 'doctor', 'admin'].includes(role) ? role : 'patient';
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole
      }
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user.id, // keeping _id in response payload for frontend compatibility if needed
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user.id, user.role),
        }
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate a user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'You are not registered. Please create an account.' });
    }

    if (await bcrypt.compare(password, user.password)) {
      res.json({
        success: true,
        data: {
          _id: user.id, // keeping _id in response payload for frontend compatibility
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user.id, user.role),
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

module.exports = router;
