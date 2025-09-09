import { useCallback, useState } from 'react';
import { createComment, getPostComments, updateComment, deleteComment, likeComment, unlikeComment, replyToComment, getUserProfile } from '../services';

export const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserDetails = useCallback(async (userId) => {
    try {
      setLoading(true);
      const result = await getUserProfile(userId);

      if (result.success) {
        setUser(result.data.user);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch user details');
      console.error('Error fetching user details:', err);
    } finally {
      setLoading(false);
    }
  }, []);


  return {
    user,
    loading,
    error,
    fetchUserDetails
  };
};

