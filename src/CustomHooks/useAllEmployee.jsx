import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAllEmployee = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: employees = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-employees"],
    queryFn: async () => {
      const response = await axiosSecure.get("/all-employees");
      return response.data;
    },
  });

  return { employees, isLoading, isError, error, refetch };
};

export default useAllEmployee;
