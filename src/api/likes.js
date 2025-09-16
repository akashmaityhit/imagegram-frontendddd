import axiosInstance from "./client";

export const likesApi = {
  // create a new like
  createLike: (onModel, likableId, reactionType) =>
    axiosInstance.post(`/like`, { onModel, likableId, reactionType }),

  // Delete a like
  deleteLike: (likeId, onModel, likableId) =>
    axiosInstance.delete(`/like/${likeId}`, {
      data: { onModel, likableId },
    }),

  // Update a like by id
  updateLike: (likeId, onModel, likableId, reactionType) =>
    axiosInstance.put(`/like/${likeId}`, { onModel, likableId, reactionType }),

};
