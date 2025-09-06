import { usersApi } from '../api';
import { setAuthToken, getCurrentUser, isAuthenticated, signOut } from '../utils/auth';

export const authService = {
  // Sign up a new user
  signup: async (userData) => {
    try {
      console.log('AuthService: Starting signup process...');
      const response = await usersApi.signup(userData);
      console.log('AuthService: Signup response:', response.data);
      
      if (response.data && response.data.success && response.data.token) {
        // Store token from backend response
        const token = response.data.token;
        if (token) {
          setAuthToken(token);
          console.log('AuthService: Token stored successfully');
        } else {
          console.error('AuthService: No token in response');
        }
        
        return {
          success: true,
          data: response.data.token,
          error: null,
        };
      } else {
        const errorMsg = response.data?.message || 'Signup failed';
        console.error('AuthService: Signup failed:', errorMsg);
        return {
          success: false,
          data: null,
          error: errorMsg,
        };
      }
    } catch (error) {
      console.error('AuthService: Signup error:', error);
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
      console.log('AuthService: Starting signin process...');
      const response = await usersApi.signin(credentials);
      console.log('AuthService: Signin response:', response.data);
      
      if (response.data && response.data.success && response.data.token) {
        // Store token from backend response
        const token = response.data.token;
        setAuthToken(token);
        console.log('AuthService: Token stored successfully');
        
        return {
          success: true,
          data: { token: response.data.token },
          error: null,
        };
      } else {
        const errorMsg = response.data?.message || 'Signin failed';
        console.error('AuthService: Signin failed:', errorMsg);
        return {
          success: false,
          data: null,
          error: errorMsg,
        };
      }
    } catch (error) {
      console.error('AuthService: Signin error:', error);
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || error.message || 'Signin failed',
      };
    }
  },

  // Sign out user
  signout: () => {
    console.log('AuthService: Signing out user...');
    signOut();
  },

  // Get current user from token
  getCurrentUser: () => {
    console.log('AuthService: Getting current user...');
    return getCurrentUser();
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    console.log('AuthService: Checking authentication...');
    return isAuthenticated();
  }
};