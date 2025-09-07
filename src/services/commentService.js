import { getCurrentUser } from '@/utils';
import { commentsApi } from '../api';

export const createComment = async (commentData) => {
  try {

    const response = await commentsApi.createComment(commentData);

    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error('Error creating comment:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const getPostComments = async (postId, offset = 0, limit = 3) => {
  try {
    const response = await commentsApi.getPostComments(postId, offset, limit);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching comments:', error);
    return {
      success: false,
      data: [],
      error: error.message,
    };
  }
};

export const updateComment = async (commentId, commentData) => {
  try {
    const response = await commentsApi.updateComment(commentId, commentData);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error('Error updating comment:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const deleteComment = async (commentId) => {
  try {
    await commentsApi.deleteComment(commentId);
    return {
      success: true,
      data: null,
      error: null,
    };
  } catch (error) {
    console.error('Error deleting comment:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const likeComment = async (commentId, reactionType) => {
  try {
    const response = await commentsApi.likeComment(commentId, reactionType);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error('Error liking comment:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const unlikeComment = async (commentId, reactionType) => {
  try {
    const response = await commentsApi.unlikeComment(commentId, reactionType);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error('Error unliking comment:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export const replyToComment = async (commentId, replyData) => {
  try {
    const response = await commentsApi.replyToComment(commentId, replyData);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error('Error replying to comment:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

