import { useState } from 'react';
import { createComment, getPostComments, updateComment, deleteComment, likeComment, unlikeComment, replyToComment } from '../services';

export const useComments = (postId, initialComments = []) => {
  const [comments, setComments] = useState(initialComments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const result = await getPostComments(postId);
      
      if (result.success) {
        setComments(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch comments');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCommentHandler = async (commentData) => {
    try {
      const result = await createComment(commentData);
      if (result.success) {
        setComments(prev => [result.data.newComment, ...prev]);
        
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to create comment' };
    }
  };

  const replyToCommentHandler = async (commentId, commentData) => {
    try {
      const result = await replyToComment(commentData);
      
      if (result.success) {
        setComments(prev => prev.map(comment => {
          if (comment._id !== commentId) return comment;
          return {
            ...comment,
            replies: [result.data.newComment, ...(comment.replies || [])],
          };
        }));
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to reply to comment' };
    }
  };

  const updateCommentHandler = async (commentId, commentData) => {
    try {
      const result = await updateComment(commentId, commentData);
      
      if (result.success) {
        setComments(prev => prev.map(comment => {
          const currentId = comment._id || comment.id;
          return currentId === commentId ? { ...comment, ...result.data } : comment;
        }));
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to update comment' };
    }
  };

  const deleteCommentHandler = async (commentId) => {
    try {
      const result = await deleteComment(commentId);
      
      if (result.success) {
        setComments(prev => prev.filter(comment => comment._id !== commentId));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to delete comment' };
    }
  };

  const likeCommentHandler = async (commentId, reactionType) => {
    try {
      const result = await likeComment(commentId, reactionType);
      
      if (result.success) {
        setComments(prev => prev.map(comment => {
          const currentId = comment._id || comment.id;
          if (currentId !== commentId) return comment;
          const existingReactions = comment.reactions || {};
          return {
            ...comment,
            reactions: {
              ...existingReactions,
              [reactionType]: (existingReactions[reactionType] || 0) + 1,
            },
          };
        }));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to like comment' };
    }
  };


  return {
    comments,
    loading,
    error,
    fetchComments,
    createCommentHandler,
    updateComment: updateCommentHandler,
    deleteComment: deleteCommentHandler,
    likeComment: likeCommentHandler,
    replyToCommentHandler,
  };
};

