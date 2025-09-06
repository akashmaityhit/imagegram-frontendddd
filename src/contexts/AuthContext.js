'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const authenticated = authService.isAuthenticated();
        
        if (authenticated) {
          // Get user data from token first, then fallback to cookie
          const userFromToken = authService.getUserFromToken();
          const userFromCookie = authService.getCurrentUser();
          
          // Prefer user data from token as it's more reliable
          const currentUser = userFromToken || userFromCookie;
          
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
        setIsAuthenticated(false);
        // Clear invalid tokens
        authService.signout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Set up token expiration check
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkTokenExpiration = () => {
      if (authService.isTokenExpiringSoon()) {
        // Token is expiring soon, show warning or auto-logout
        console.warn('Token is expiring soon');
      }
      
      if (!authService.isAuthenticated()) {
        // Token has expired, logout user
        handleSignout();
      }
    };

    // Check every minute
    const interval = setInterval(checkTokenExpiration, 60000);
    
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const signin = useCallback(async (credentials) => {
    try {
      setLoading(true);
      const result = await authService.signin(credentials);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Signin error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData) => {
    try {
      setLoading(true);
      const result = await authService.signup(userData);
      
      if (result.success) {
        setUser(result.data.user);
        setIsAuthenticated(true);
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  }, []);

  const signout = useCallback(() => {
    authService.signout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    signin,
    signup,
    signout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
