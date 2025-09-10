import { getUserProfile, searchUsers } from "@/services/userService";
import { useCallback, useEffect, useState } from "react";

export const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);

  const fetchUserDetails = useCallback(async (userId) => {
    try {
      setLoading(true);
      const result = await getUserProfile(userId);

      if (result.success) {
        setUser(result.data.user);
        setError(null);
      } else {
        console.log(result);
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch user details");
      console.error("Error fetching user details:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId);
    }
  }, [fetchUserDetails, userId]);

  const searchUsersByQuery = useCallback(async (query, offset = 0, limit = 20) => {
    if (!query || !query.trim()) return { success: true, data: [] };
    try {
      setLoading(true);
      const result = await searchUsers(query, offset, limit);

      console.log(result.data)

      if (result.success) {
        const list = result.data?.users || result.data || [];
        setUserList(list);
        setError(null);
        return { success: true, data: list };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const message = 'Failed to search users';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    fetchUserDetails,
    userList,
    searchUsers: searchUsersByQuery,
  };
};
