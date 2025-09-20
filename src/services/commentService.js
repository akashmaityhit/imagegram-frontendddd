import { getCurrentUser } from '@/utils';
import { commentsApi } from '../api';

// Create new comment for Post
export const createComment = async (commentData) => {
  try {

    const response = await commentsApi.createComment(commentData);

    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.log('Error creating comment:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};


// Create reply comment for a Comment
export const replyToComment = async (commentData) => {
  try {
    const response = await commentsApi.createComment(commentData);
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.log('Error replying to comment:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};


export const getPostComments = async (onModel, commentableId, offset, limit) => {
  try {
    const response = await commentsApi.getPaginatedComments(onModel, commentableId, offset, limit);
    return {
      success: true,
      data: response.data || [],
      error: null,
    };
  } catch (error) {
    console.log('Error fetching comments:', error);
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
    console.log('Error updating comment:', error);
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
    console.log('Error deleting comment:', error);
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
    console.log('Error liking comment:', error);
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
    console.log('Error unliking comment:', error);
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};


