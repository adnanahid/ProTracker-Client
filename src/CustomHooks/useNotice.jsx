import useAxiosSecure from "./useAxiosSecure";
import useCheckRole from "./useCheckRole";
import { useQuery } from "@tanstack/react-query";

const useNotice = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const token = localStorage.getItem("access-token");
  const { data: notice = [] } = useQuery({
    queryKey: ["notice", clientDetails?.email, token],
    enabled: !!token && !!clientDetails?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/get-notice/${clientDetails?.hrEmail}`
      );
      return response.data.result;
    },
  });
  return { notice };
};

export default useNotice;
