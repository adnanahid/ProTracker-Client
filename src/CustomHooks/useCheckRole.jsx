import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";

const useCheckRole = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const {
    data: clientDetails = null, // Default to null
    isLoading: isReloading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email, // Only fetch if user is loaded and email exists
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/detailsOf/${user.email}`);
        return res.data;
      } catch (err) {
        console.error("Error fetching user details:", err);
        throw new Error(
          "Failed to fetch user details. Please try again later."
        );
      }
    },
  });

  return { clientDetails, isReloading, isError, error, refetch };
};

export default useCheckRole;
