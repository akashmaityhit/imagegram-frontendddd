// Cookie name for auth token
const AUTH_TOKEN_COOKIE = 'authToken';

// Set cookie with secure options
export const setAuthToken = (token) => {
  if (typeof window === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000)); // expires in 1 days
  
  // Set secure cookie
  document.cookie = `${AUTH_TOKEN_COOKIE}=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure`;
};

// Get auth token from cookie
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  
  const nameEQ = AUTH_TOKEN_COOKIE + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Remove auth token cookie
export const removeAuthToken = () => {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${AUTH_TOKEN_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure`;
};

// Browser-compatible JWT decoder (no external dependencies)
export const decodeJWT = (token) => {
  if (!token) return null;
  
  try {
    // Split the token into parts
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    // Decode the payload (middle part)
    const payload = parts[1];
    // Add padding if needed for base64 decoding
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    const decodedPayload = atob(paddedPayload);
    
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    console.log("currentTime", currentTime, "exp", payload.exp);
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

// Get user data from token
export const getUserFromToken = (token) => {
  if (!token) return null;
  
  try {
    const decoded = decodeJWT(token);
    console.log("decoded", decoded);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Check if token is valid and not expired
export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    const payload = decodeJWT(token);
    if (!payload) return false;
    
    // Check if token is expired
    return !isTokenExpired(token);
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

// Get current user from stored token
export const getCurrentUser = () => {
  const token = getAuthToken();
  if (!token) return null;
  
  // Check if token is expired
  if (isTokenExpired(token)) {
    console.log('Token is expired, clearing...');
    // removeAuthToken();
    return null;
  }
  
  return getUserFromToken(token);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;
  
  // Check if token is valid and not expired
  if (!isTokenValid(token) || isTokenExpired(token)) {
    console.log('Token is invalid or expired, clearing...');
    removeAuthToken();
    return false;
  }
  
  return true;
};

// Sign out user
export const signOut = () => {
  removeAuthToken();
  if (typeof window !== 'undefined') {
    window.location.href = '/signin';
  }
};