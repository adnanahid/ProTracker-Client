import { useCallback } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useAllEmployee = (currentPage, itemsPerPage) => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const token = localStorage.getItem("access-token");
  const {
    data: { allEmployees = [], totalCount = 0 } = {},
    isLoading: employeeLoading,
    isError: ErrorEmployee,
    refetch: RefetchEmployee,
  } = useQuery({
    queryKey: [
      "all-employees",
      clientDetails?.email,
      currentPage,
      itemsPerPage,
      token
    ],
    enabled: !!token && !!clientDetails?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/all-employee-list/?page=${currentPage}&limit=${itemsPerPage}`
      );
      return response.data;
    },
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
