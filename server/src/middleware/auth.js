const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to request
 * For demo purposes, also supports userId query parameter
 */
const auth = async (req, res, next) => {
  try {
    let token;

    // Check for Bearer token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'feedants-demo-secret');
        req.user = { id: decoded.id, email: decoded.email };
        return next();
      } catch (jwtError) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired token',
        });
      }
    }

    // For demo: allow userId in query or body
    const userId = req.query.userId || req.body.userId;
    if (userId) {
      req.user = { id: userId };
      return next();
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please provide a valid token or userId.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Optional auth - doesn't fail if no token, but attaches user if present
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'feedants-demo-secret');
        req.user = { id: decoded.id, email: decoded.email };
      } catch (err) {
        // Token invalid, continue without user
      }
    }

    // Also check for userId in query
    if (!req.user && req.query.userId) {
      req.user = { id: req.query.userId };
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth, optionalAuth };
