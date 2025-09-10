import { getUserProfile } from "@/services/userService";
import { useCallback, useEffect, useState } from "react";

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
    fetchUserDetails(userId);
  }, [fetchUserDetails, userId]);

  return {
    user,
    loading,
    error,
    fetchUserDetails,
  };
};
