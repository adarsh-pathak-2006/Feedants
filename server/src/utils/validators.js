const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware to handle validation results
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Validation rules for user registration
 */
const createUserValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate,
];

/**
 * Validation rules for login
 */
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate,
];

/**
 * Validation rules for competition registration
 */
const registrationValidation = [
  param('competitionId')
    .notEmpty().withMessage('Competition ID is required')
    .isMongoId().withMessage('Invalid competition ID format'),
  validate,
];

/**
 * Validation rules for submission upload
 */
const submissionValidation = [
  param('competitionId')
    .notEmpty().withMessage('Competition ID is required')
    .isMongoId().withMessage('Invalid competition ID format'),
  body('submissionUrl')
    .trim()
    .notEmpty().withMessage('Submission URL is required')
    .isURL().withMessage('Invalid submission URL format'),
  validate,
];

/**
 * Validation for MongoDB ObjectId params
 */
const mongoIdValidation = [
  param('id')
    .notEmpty().withMessage('ID is required')
    .isMongoId().withMessage('Invalid ID format'),
  validate,
];

module.exports = {
  validate,
  createUserValidation,
  loginValidation,
  registrationValidation,
  submissionValidation,
  mongoIdValidation,
};
