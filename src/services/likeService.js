import { likesApi } from "@/api/likes";

export const createPostLike = async (onModel, likableId, reactionType) => {
    try {
      const response = await likesApi.createLike(onModel, likableId, reactionType);
      return { success: true, data: response.data, error: null };
    } catch (error) {
      console.error('Error creating like:', error);
      return { success: false, data: null, error: error.message };
    }
  };
  
  export const updatePostLike = async (likeId, onModel, likableId, reactionType) => {
    try {
      const response = await likesApi.updateLike(likeId, onModel, likableId, reactionType);
      return { success: true, data: response.data, error: null };
    } catch (error) {
      console.error('Error updating like:', error);
      return { success: false, data: null, error: error.message };
    }
  };
  
  export const deletePostLike = async (likeId, onModel, likableId) => {
    try {
      const response = await likesApi.deleteLike(likeId, onModel, likableId);
      return { success: true, data: response.data, error: null };
    } catch (error) {
      console.error('Error deleting like:', error);
      return { success: false, data: null, error: error.message };
    }
  };
  
  