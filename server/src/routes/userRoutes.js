const express = require('express');
const router = express.Router();
const { getUserById, createUser, loginUser } = require('../controllers/userController');
const { createUserValidation, loginValidation } = require('../utils/validators');

// POST /api/users - Create a new user
router.post('/', createUserValidation, createUser);

// POST /api/users/login - Login user
router.post('/login', loginValidation, loginUser);

// GET /api/users/:id - Get user profile
router.get('/:id', getUserById);

module.exports = router;
