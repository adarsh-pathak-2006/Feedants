/**
 * Competition API functions
 */
import { api } from './client';

/**
 * Fetch all competitions with optional filters
 */
export const getCompetitions = async (params = {}) => {
  return api.get('/competitions', params);
};

/**
 * Fetch single competition details by ID
 */
export const getCompetitionDetails = async (competitionId) => {
  return api.get(`/competitions/${competitionId}`);
};

/**
 * Register for a competition
 */
export const registerForCompetition = async (competitionId, userId, referralCode = '') => {
  return api.post(`/registrations/competitions/${competitionId}/register`, {
    userId,
    referralCode,
  });
};

/**
 * Upload submission for a competition
 */
export const uploadSubmission = async (competitionId, userId, submissionUrl, submissionNotes = '') => {
  return api.post(`/registrations/competitions/${competitionId}/submit`, {
    userId,
    submissionUrl,
    submissionNotes,
  });
};

/**
 * Get user's registration status for a competition
 */
export const getRegistrationStatus = async (competitionId, userId) => {
  return api.get(`/registrations/competitions/${competitionId}/status`, { userId });
};

/**
 * Login user
 */
export const loginUser = async (email, password) => {
  return api.post('/users/login', { email, password });
};

/**
 * Create a new user
 */
export const createUser = async (userData) => {
  return api.post('/users', userData);
};

/**
 * Get user profile
 */
export const getUserProfile = async (userId) => {
  return api.get(`/users/${userId}`);
};
