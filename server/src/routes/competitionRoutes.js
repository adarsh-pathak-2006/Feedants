const express = require('express');
const router = express.Router();
const { getCompetitions, getCompetitionById } = require('../controllers/competitionController');
const { mongoIdValidation } = require('../utils/validators');

// GET /api/competitions - List all competitions with pagination
router.get('/', getCompetitions);

// GET /api/competitions/:id - Get competition details
router.get('/:id', getCompetitionById);

module.exports = router;
