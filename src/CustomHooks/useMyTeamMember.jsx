import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useMyTeamMember = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const token = localStorage.getItem("access-token");
  const {
    data: myTeamMembers = [],
    isLoading: isMyTeamMembersLoading,
    refetch: myTeamMembersRefetch,
  } = useQuery({
    queryKey: ["myTeamMembers", clientDetails?.email, token],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/myTeamMembers/${clientDetails?.hrEmail}`
      );
      return response.data.result;
    },
    enabled: !!token && !!clientDetails?.email,
  });
  return {
    myTeamMembers,
    isMyTeamMembersLoading,
    myTeamMembersRefetch,
  };
};

export default useMyTeamMember;
