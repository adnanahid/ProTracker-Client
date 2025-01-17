import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useMyEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: myEmployeeList = [],
    isLoading: isMyEmployeeLoading,
    refetch: isMyEmployeeRefetch,
  } = useQuery({
    queryKey: ["employeeList"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/my-employees/${clientDetails?.email}`
      );
      return response.data;
    },
  });
  return { myEmployeeList, isMyEmployeeLoading, isMyEmployeeRefetch };
};

export default useMyEmployeeList;
