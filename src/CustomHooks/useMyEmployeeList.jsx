import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useMyEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: myEmployeeList = [],
    isLoading: isMyEmployeeLoading,
    refetch: RefetchMyEmployee,
  } = useQuery({
    queryKey: ["employeeList", clientDetails?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/my-employees/${clientDetails?.email}`
      );
      return response.data;
    },
    enabled: !!clientDetails?.email,
  });
  return { myEmployeeList, isMyEmployeeLoading, RefetchMyEmployee };
};

export default useMyEmployeeList;
