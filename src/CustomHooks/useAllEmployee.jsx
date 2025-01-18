import { useCallback } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useAllEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: employees = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-employees", clientDetails?.email],
    queryFn: async () => {
      const response = await axiosSecure.get("/all-employees");
      return response.data;
    },
    enabled: !!clientDetails?.email,
  });

  return { employees, refetch, isLoading, isError, error };
};

export default useAllEmployee;
