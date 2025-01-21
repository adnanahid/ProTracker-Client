import { useCallback } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useAllEmployee = (currentPage, itemsPerPage) => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: { allEmployees = [], totalCount } = {},
    isLoading: employeeLoading,
    isError: ErrorEmployee,
    refetch: RefetchEmployee,
  } = useQuery({
    queryKey: [
      "all-employees",
      clientDetails?.email,
      currentPage,
      itemsPerPage,
    ],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/all-employee-list/?page=${currentPage}&limit=${itemsPerPage}`
      );
      return response.data;
    },
    enabled: !!clientDetails?.email,
  });

  return {
    allEmployees,
    totalCount,
    RefetchEmployee,
    employeeLoading,
    ErrorEmployee,
  };
};

export default useAllEmployee;
