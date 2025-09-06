import { usersApi } from '../api';
import { setCookie, getCookie, removeCookie, clearAuthCookies, isTokenExpired, getTokenExpirationTime, validateToken, isTokenValid, COOKIE_NAMES } from '../utils/cookies';

export const authService = {
  // Sign up a new user
  signup: async (userData) => {
    try {
      const response = await usersApi.signup(userData);
      
      if (response.data && response.data.token) {
        // Store token and user data in cookies
        setCookie(COOKIE_NAMES.AUTH_TOKEN, response.data.token, 7);
        if (response.data.user) {
          setCookie(COOKIE_NAMES.USER_DATA, JSON.stringify(response.data.user), 7);
        }
        
        return {
          success: true,
          data: response.data,
          error: null,
        };
      } else {
        return {
          success: false,
          data: null,
          error: 'No token received from server',
        };
      }
    } catch (error) {
      console.error('Error signing up user:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || error.message || 'Signup failed',
      };
    }
  },

  // Sign in user
  signin: async (credentials) => {
    try {
      const response = await usersApi.signin(credentials);
      
      if (response.data && response.data.token) {
        // Store token and user data in cookies
        setCookie(COOKIE_NAMES.AUTH_TOKEN, response.data.token, 7);
        if (response.data.user) {
          setCookie(COOKIE_NAMES.USER_DATA, JSON.stringify(response.data.user), 7);
        }
        
        return {
          success: true,
          data: response.data,
          error: null,
        };
      } else {
        return {
          success: false,
          data: null,
          error: 'No token received from server',
        };
      }
    } catch (error) {
      console.error('Error signing in user:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || error.message || 'Signin failed',
      };
    }
  },

  // Sign out user
  signout: () => {
    clearAuthCookies();
    // Redirect to signin page
    if (typeof window !== 'undefined') {
      window.location.href = '/signin';
    }
  },

  // Get current user from cookies
  getCurrentUser: () => {
    try {
      const userData = getCookie(COOKIE_NAMES.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Get auth token from cookies
  getAuthToken: () => {
    return getCookie(COOKIE_NAMES.AUTH_TOKEN);
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = getCookie(COOKIE_NAMES.AUTH_TOKEN);
    return token && isTokenValid(token);
  },

  // Get token expiration time
  getTokenExpirationTime: () => {
    const token = getCookie(COOKIE_NAMES.AUTH_TOKEN);
    return getTokenExpirationTime(token);
  },

  // Check if token is about to expire (within 5 minutes)
  isTokenExpiringSoon: () => {
    const token = getCookie(COOKIE_NAMES.AUTH_TOKEN);
    if (!token || !isTokenValid(token)) return true;
    
    const expirationTime = getTokenExpirationTime(token);
    if (!expirationTime) return true;
    
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    return Date.now() + fiveMinutes > expirationTime;
  },

  // Get user data from token
  getUserFromToken: () => {
    const token = getCookie(COOKIE_NAMES.AUTH_TOKEN);
    if (!token) return null;
    
    const validation = validateToken(token);
    if (!validation.valid) return null;
    
    return validation.decoded;
  },

  // Refresh token (if needed in the future)
  refreshToken: async () => {
    // This would be implemented if your backend supports token refresh
    // For now, we'll just return false to indicate refresh is not available
    return false;
  }
};
