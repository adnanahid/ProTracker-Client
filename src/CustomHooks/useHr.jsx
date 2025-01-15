import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";

const useHr = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: isHR = false, isLoading: isHRLoading } = useQuery({
    queryKey: ["userHRStatus", user?.email],
    enabled: !loading && !!user?.email, // Only fetch if not loading and user email exists
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/hr/${user.email}`);
      return res.data?.hr || false; // Return the "hr" field, default to false
    },
  });

  return [isHR, isHRLoading];
};

export default useHr;
