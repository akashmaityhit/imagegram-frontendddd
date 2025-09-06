import jwt from 'jsonwebtoken';

// Cookie utilities for secure token management
export const COOKIE_NAMES = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData'
};

// JWT secret - should match your backend secret
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'your-jwt-secret-key';

// Set a cookie with secure options
export const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  const cookieOptions = [
    `${name}=${value}`,
    `expires=${expires.toUTCString()}`,
    'path=/',
    'SameSite=Strict',
    'Secure' // Only works with HTTPS in production
  ].join('; ');
  
  document.cookie = cookieOptions;
};

// Get a cookie value
export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Remove a cookie
export const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure`;
};

// Clear all auth-related cookies
export const clearAuthCookies = () => {
  removeCookie(COOKIE_NAMES.AUTH_TOKEN);
  removeCookie(COOKIE_NAMES.REFRESH_TOKEN);
  removeCookie(COOKIE_NAMES.USER_DATA);
};

// Validate JWT token with secret
export const validateToken = (token) => {
  if (!token) return { valid: false, error: 'No token provided' };
  
  try {
    // Verify token with secret
    const decoded = jwt.verify(token, JWT_SECRET);
    return { valid: true, decoded, error: null };
  } catch (error) {
    console.log('Token validation error:', error.message);
    return { valid: false, error: error.message };
  }
};

// Check if token is expired (basic check)
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    // Decode JWT token payload (without verification)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

// Check if token is valid and not expired
export const isTokenValid = (token) => {
  const validation = validateToken(token);
  return validation.valid;
};

// Get token expiration time
export const getTokenExpirationTime = (token) => {
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // Convert to milliseconds
  } catch (error) {
    console.error('Error getting token expiration:', error);
    return null;
  }
};
