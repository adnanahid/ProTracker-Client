import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useMyEmployeeList = (currentPage, itemsPerPage) => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: { myEmployeeList = [], totalCount = 0 } = {},
    isLoading: MyEmployeeLoading,
    refetch: RefetchMyEmployeeList,
    isError: MyEmployeeError,
  } = useQuery({
    queryKey: ["employeeList", clientDetails?.email, currentPage, itemsPerPage],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/my-employee-list/${clientDetails?.email}?page=${currentPage}&limit${itemsPerPage}`
      );
      return response.data;
    },
    enabled: !!clientDetails?.email,
  });
  return {
    myEmployeeList,
    totalCount,
    MyEmployeeLoading,
    RefetchMyEmployeeList,
    MyEmployeeError,
  };
};

export default useMyEmployeeList;
