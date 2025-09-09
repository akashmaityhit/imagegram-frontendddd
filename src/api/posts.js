import axiosInstance from './client';

export const postsApi = {
  // Get posts with pagination
  getAllPosts: (offset = 0, limit = 10) => 
    axiosInstance.get(`/posts?offset=${offset}&limit=${limit}`),

  getPostsMadeByUser: (userId, offset = 0, limit = 10 ) => 
    axiosInstance.get(`/posts/user/${userId}?offset=${offset}&limit=${limit}`),

  // Create a new post
  createPost: (postData) => {
    const formData = new FormData();
    formData.append('image', postData.image);
    formData.append('caption', postData.caption);
    formData.append('user', postData.user);
    
    return axiosInstance.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update an existing post
  updatePost: (postId, postData) => 
    axiosInstance.put(`/posts/${postId}`, postData),

  // Delete a post
  deletePost: (postId) => 
    axiosInstance.delete(`/posts/${postId}`),

  // Get a single post by ID
  getPostById: (postId) => 
    axiosInstance.get(`/posts/${postId}`),

  // Like/unlike a post
  likePost: (postId, reactionType) => 
    axiosInstance.post(`/posts/${postId}/like`, { reactionType }),

  // Unlike a post
  unlikePost: (postId, reactionType) => 
    axiosInstance.delete(`/posts/${postId}/like`, { data: { reactionType } }),
};

