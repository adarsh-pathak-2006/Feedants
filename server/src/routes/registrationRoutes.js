const express = require('express');
const router = express.Router();
const {
  registerForCompetition,
  uploadSubmission,
  getRegistrationStatus,
  getUserRegistrations,
} = require('../controllers/registrationController');
const { auth } = require('../middleware/auth');
const { registrationValidation, submissionValidation } = require('../utils/validators');

// POST /api/registrations/competitions/:competitionId/register - Register for a competition
router.post(
  '/competitions/:competitionId/register',
  auth,
  registrationValidation,
  registerForCompetition
);

// POST /api/registrations/competitions/:competitionId/submit - Upload submission
router.post(
  '/competitions/:competitionId/submit',
  auth,
  submissionValidation,
  uploadSubmission
);

// GET /api/registrations/competitions/:competitionId/status - Get registration status
router.get(
  '/competitions/:competitionId/status',
  auth,
  getRegistrationStatus
);

// GET /api/registrations/user/:userId - Get all registrations for a user
router.get('/user/:userId', auth, getUserRegistrations);

module.exports = router;
