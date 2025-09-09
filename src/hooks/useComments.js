import { useCallback, useState } from 'react';
import { createComment, getPostComments, updateComment, deleteComment, likeComment, unlikeComment, replyToComment } from '../services';

export const useComments = (postId, initialComments = [], initialOffset = 0, initialLimit = 5) => {
  const [comments, setComments] = useState(initialComments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const result = await getPostComments(postId);

      if (result.success) {
        setComments(result.data);
        setError(null);
        setHasMore(result.data.totalDocuments > result.data?.comments?.length);
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

  const fetchPaginatedComments = useCallback(async ({ onModel, commentableId, offset = initialOffset, limit = initialLimit }) => {
    try {
      // console.log('Fetching paginated comments with params:', { onModel, commentableId, offset, limit });
      setLoading(true);
      const result = await getPostComments(onModel, commentableId, offset, limit);

      // console.log('Paginated comments fetch result:', result.data);
      if (result.success) {
        setComments(result.data.comments);
        setError(null);
        setHasMore(result.data.totalDocuments > result.data?.comments?.length);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch comments');
      console.error('Error fetching comments:', err);
    } finally {
      setLoading(false);
    }
  }, [initialOffset, initialLimit]);

  const loadMoreComments = async ({ onModel, commentableId }) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const result = await getPostComments(onModel, commentableId, comments.length, initialLimit);

      if (result.success) {
        setComments(prev => [...prev, ...result.data.comments]);
        setHasMore(result.data.totalDocuments > comments.length + initialLimit);
      }
    } catch (err) {
      console.error('Error loading more comments:', err);
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
    hasMore,
    fetchComments,
    createCommentHandler,
    updateComment: updateCommentHandler,
    deleteComment: deleteCommentHandler,
    likeComment: likeCommentHandler,
    replyToCommentHandler,
    fetchPaginatedComments,
    loadMoreComments
  };
};

