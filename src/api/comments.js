import axiosInstance from './client';

export const commentsApi = {
  // Create a new comment
  createComment: (commentData) => 
    axiosInstance.post('/comments/comment', commentData),

  // Get comments for a post
  getPostComments: (postId, offset = 0, limit = 30) => 
    axiosInstance.get(`/posts/${postId}/comments?offset=${offset}&limit=${limit}`),

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

  // Reply to a comment
  replyToComment: (commentId, replyData) => 
    axiosInstance.post(`/comments/${commentId}/reply`, replyData),
};

