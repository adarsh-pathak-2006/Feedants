const User = require('../models/User');
const crypto = require('crypto');

/**
 * @desc    Get user profile by ID
 * @route   GET /api/users/:id
 * @access  Private
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Remove sensitive fields
    delete user.passwordHash;

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new user (for demo/seeding purposes)
 * @route   POST /api/users
 * @access  Public (for demo)
 */
const createUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email already exists',
      });
    }

    // Generate unique referral code
    const referralCode = `REF${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // In production, use bcrypt for password hashing
    // For this demo, we use a simple hash
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    const user = new User({
      name,
      email: email.toLowerCase(),
      passwordHash,
      phone: phone || '',
      referralCode,
    });

    await user.save();

    // Remove sensitive fields from response
    const userResponse = user.toJSON();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse,
    });
  } catch (error) {
    // Handle duplicate email
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email already exists',
      });
    }
    next(error);
  }
};

/**
 * @desc    Simple login for demo (returns user data with a mock token)
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify password
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    if (passwordHash !== user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'feedants-demo-secret',
      { expiresIn: '7d' }
    );

    const userResponse = user.toJSON();

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserById,
  createUser,
  loginUser,
};
