import { useState, useEffect, useCallback } from 'react';
import { getUserProfile, updateUserProfile, followUser, unfollowUser } from '../services';

export const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getUserProfile(userId);
      
      if (result.success) {
        setUser(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to fetch user');
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateUserHandler = async (userData) => {
    try {
      const result = await updateUserProfile(userId, userData);
      
      if (result.success) {
        setUser(prev => ({ ...prev, ...result.data }));
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to update user' };
    }
  };

  const followUserHandler = async () => {
    try {
      const result = await followUser(userId);
      
      if (result.success) {
        setUser(prev => ({ 
          ...prev, 
          followers: (prev.followers || 0) + 1,
          isFollowing: true 
        }));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to follow user' };
    }
  };

  const unfollowUserHandler = async () => {
    try {
      const result = await unfollowUser(userId);
      
      if (result.success) {
        setUser(prev => ({ 
          ...prev, 
          followers: Math.max((prev.followers || 0) - 1, 0),
          isFollowing: false 
        }));
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to unfollow user' };
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId, fetchUser]);

  return {
    user,
    loading,
    error,
    fetchUser,
    updateUser: updateUserHandler,
    followUser: followUserHandler,
    unfollowUser: unfollowUserHandler,
  };
};

