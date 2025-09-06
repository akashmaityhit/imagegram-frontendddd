import axiosInstance from './client';

export const usersApi = {
  // User signup
  signup: (userData) => 
    axiosInstance.post('/users/signup', userData),

  // User signin
  signin: (credentials) => 
    axiosInstance.post('/users/signin', credentials),

  // Get user profile
  getUserProfile: (userId) => 
    axiosInstance.get(`/users/${userId}`),

  // Get current user profile
  getCurrentUserProfile: () => 
    axiosInstance.get('/users/profile'),

  // Update user profile
  updateUserProfile: (userId, userData) => 
    axiosInstance.put(`/users/${userId}`, userData),

  // Get user posts
  getUserPosts: (userId, offset = 0, limit = 30) => 
    axiosInstance.get(`/users/${userId}/posts?offset=${offset}&limit=${limit}`),

  // Follow a user
  followUser: (userId) => 
    axiosInstance.post(`/users/${userId}/follow`),

  // Unfollow a user
  unfollowUser: (userId) => 
    axiosInstance.delete(`/users/${userId}/follow`),
};