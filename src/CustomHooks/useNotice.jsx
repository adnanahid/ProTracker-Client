import useAxiosSecure from "./useAxiosSecure";
import useCheckRole from "./useCheckRole";
import { useQuery } from "@tanstack/react-query";

const useNotice = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const token = localStorage.getItem("access-token");
  const { data: notice = [], refetch: noticeRefetch } = useQuery({
    queryKey: ["notice", clientDetails?.email, token],
    enabled: !!token && !!clientDetails?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/get-notice/${
          clientDetails.role === "employee"
            ? clientDetails?.hrEmail
            : clientDetails.email
        }`
      );
      return response.data.result;
    },
  });
  return { notice, noticeRefetch };
};

export default useNotice;
