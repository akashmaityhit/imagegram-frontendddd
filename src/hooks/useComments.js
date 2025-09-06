import { useState } from 'react';
import { createComment, getPostComments, updateComment, deleteComment, likeComment, unlikeComment, replyToComment } from '../services';

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
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
      const result = await createComment({
        ...commentData,
        postId,
      });
      
      if (result.success) {
        setComments(prev => [result.data, ...prev]);
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to create comment' };
    }
  };

  const updateCommentHandler = async (commentId, commentData) => {
    try {
      const result = await updateComment(commentId, commentData);
      
      if (result.success) {
        setComments(prev => 
          prev.map(comment => 
            comment.id === commentId ? { ...comment, ...result.data } : comment
          )
        );
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
        setComments(prev => prev.filter(comment => comment.id !== commentId));
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
        setComments(prev => 
          prev.map(comment => 
            comment.id === commentId 
              ? {
                  ...comment,
                  reactions: {
                    ...comment.reactions,
                    [reactionType]: (comment.reactions[reactionType] || 0) + 1
                  }
                }
              : comment
          )
        );
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to like comment' };
    }
  };

  const replyToCommentHandler = async (commentId, replyData) => {
    try {
      const result = await replyToComment(commentId, replyData);
      
      if (result.success) {
        setComments(prev => 
          prev.map(comment => 
            comment.id === commentId 
              ? {
                  ...comment,
                  replies: [...(comment.replies || []), result.data]
                }
              : comment
          )
        );
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to reply to comment' };
    }
  };

  return {
    comments,
    loading,
    error,
    fetchComments,
    createComment: createCommentHandler,
    updateComment: updateCommentHandler,
    deleteComment: deleteCommentHandler,
    likeComment: likeCommentHandler,
    replyToComment: replyToCommentHandler,
  };
};

