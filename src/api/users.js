import axiosInstance from './client';

export const usersApi = {
  // Create a new user
  createUser: (userData) => 
    axiosInstance.post('/users', userData),

  // User signup
  signup: (userData) => 
    axiosInstance.post('/users/signup', userData),

  // User signin
  signin: (credentials) => 
    axiosInstance.post('/users/signin', credentials),

  // Get user profile
  getUserProfile: (userId) => 
    axiosInstance.get(`/users/${userId}`),

  // Get Logged-in User Profile
  getCurrentUserProfile: () => 
    axiosInstance.get(`/users/profile`),

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

  // Get user followers
  getUserFollowers: (userId) => 
    axiosInstance.get(`/users/${userId}/followers`),

  // Get user following
  getUserFollowing: (userId) => 
    axiosInstance.get(`/users/${userId}/following`),
};

