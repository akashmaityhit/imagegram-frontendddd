import axiosInstance from './client';

export const commentsApi = {
  // Create a new comment
  createComment: (commentData) => 
    axiosInstance.post('/comments/comment', commentData),

  // Get paginated comments for a post
  getPaginatedComments: (onModel, commentableId, offset, limit) =>
    axiosInstance.get(`/comments/${onModel}/${commentableId}?offset=${offset}&limit=${limit}`),

  // Update a comment
  updateComment: (commentId, commentData) => 
    axiosInstance.put(`/comments/${commentId}`, commentData),

  // Delete a comment
  deleteComment: (commentId) => 
    axiosInstance.delete(`/comments/${commentId}`),

  // Like a comment
  likeComment: (commentId, reactionType) => 
    axiosInstance.post(`/comments/${commentId}/like`, { reactionType }),

  // Unlike a comment
  unlikeComment: (commentId, reactionType) => 
    axiosInstance.delete(`/comments/${commentId}/like`, { data: { reactionType } }),
};

