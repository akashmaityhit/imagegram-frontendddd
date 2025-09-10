import { useState, useEffect, useCallback } from "react";
import {
  getALLPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  getPostsMadeByUser,
} from "@/services/postService";

export const usePosts = (userId, initialOffset = 0, initialLimit = 10) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(
    async (userId, offset = initialOffset, limit = initialLimit) => {
      try {
        setLoading(true);

        let result = userId
          ? await getPostsMadeByUser(userId, offset, initialLimit)
          : await getALLPosts(offset, limit);

        if (result.success) {
          setPosts(result.data.posts);
          setError(null);
          setHasMore(result.data.totalDocuments > result.data.posts.length);
        } else {
          setError(result.error.message);
        }
      } catch (err) {
        setError("Failed to fetch posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    },
    [initialOffset, initialLimit]
  );

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const offset = posts.length;
      const result = userId
        ? await getPostsMadeByUser(userId, offset, initialLimit)
        : await getALLPosts(offset, initialLimit);

      if (result.success) {
        setPosts((prev) => [...prev, ...result.data.posts]);
        const totalDocuments = result.data.totalDocuments ?? 0;
        const accumulatedCount = offset + (result.data.posts?.length ?? 0);
        setHasMore(accumulatedCount < totalDocuments);
      }
    } catch (err) {
      setError("Failed to fetch more posts");
    } finally {
      setLoading(false);
    }
  };

  const createPostHandler = async (postData) => {
    try {
      const result = await createPost(postData);
      if (result.success) {
        setPosts((prev) => [result.data, ...prev]);
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: "Failed to create post" };
    }
  };

  const updatePostHandler = async (postId, postData) => {
    try {
      const result = await updatePost(postId, postData);
      if (result.success) {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId ? { ...post, ...result.data } : post
          )
        );
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: "Failed to update post" };
    }
  };

  const deletePostHandler = async (postId) => {
    try {
      const result = await deletePost(postId);
      if (result.success) {
        setPosts((prev) => prev.filter((post) => post._id !== postId));

        const totalDocuments = result.data.totalDocuments || 0;
        const accumulatedCount = offset + (result.data.posts?.length || 0);
        setHasMore(accumulatedCount < totalDocuments);

        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: "Failed to delete post" };
    }
  };

  const likePostHandler = async (postId, reactionType) => {
    try {
      const result = await likePost(postId, reactionType);
      if (result.success) {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  reactions: {
                    ...post.reactions,
                    [reactionType]: (post.reactions[reactionType] || 0) + 1,
                  },
                }
              : post
          )
        );
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: "Failed to like post" };
    }
  };

  const unlikePostHandler = async (postId, reactionType) => {
    try {
      const result = await unlikePost(postId, reactionType);
      if (result.success) {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  reactions: {
                    ...post.reactions,
                    [reactionType]: Math.max(
                      (post.reactions[reactionType] || 0) - 1,
                      0
                    ),
                  },
                }
              : post
          )
        );
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: "Failed to unlike post" };
    }
  };

  useEffect(() => {
    fetchPosts(userId);
  }, [fetchPosts, userId]);

  return {
    posts,
    loading,
    error,
    hasMore,
    fetchPosts,
    loadMorePosts,
    createPost: createPostHandler,
    updatePost: updatePostHandler,
    deletePost: deletePostHandler,
    likePost: likePostHandler,
    unlikePost: unlikePostHandler,
  };
};
