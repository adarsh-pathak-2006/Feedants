/**
 * API Client for Feedants Backend
 * Configurable base URL with request/response interceptors
 */

const API_BASE_URL = __DEV__
  ? 'http://10.0.2.2:5000/api'  // Android emulator
  : 'http://localhost:5000/api';

// For web or custom setup, you can override:
// const API_BASE_URL = 'http://localhost:5000/api';

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

/**
 * Base fetch wrapper with error handling and auth
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'An error occurred',
        data: data,
      };
    }

    return data;
  } catch (error) {
    if (error.status) {
      throw error; // Re-throw API errors
    }
    // Network error
    throw {
      status: 0,
      message: 'Network error. Please check your connection and try again.',
      data: null,
    };
  }
};

export const api = {
  get: (endpoint, params = {}) => {
    const queryString = Object.keys(params).length
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return apiRequest(`${endpoint}${queryString}`, { method: 'GET' });
  },

  post: (endpoint, body = {}) => {
    return apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put: (endpoint, body = {}) => {
    return apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  patch: (endpoint, body = {}) => {
    return apiRequest(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  delete: (endpoint) => {
    return apiRequest(endpoint, { method: 'DELETE' });
  },
};

export default api;
