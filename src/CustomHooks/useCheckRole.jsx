import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";

const useCheckRole = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const token = localStorage.getItem("access-token");
  const {
    data: clientDetails = null,
    isLoading: isReloading,
    isError,
    error,
    refetch: clientDetailsRefetch,
  } = useQuery({
    queryKey: ["userRole", user?.email, token],
    enabled: !!token && !loading && !!user?.email,
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

  return { clientDetails, isReloading, isError, error, clientDetailsRefetch };
};

export default useCheckRole;
