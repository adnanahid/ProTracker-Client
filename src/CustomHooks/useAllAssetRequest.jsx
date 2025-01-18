import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useAssetRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: assetRequests = [],
    isLoading: isAssetRequestsLoading,
    refetch: refetchAssetRequests,
  } = useQuery({
    queryKey: ["assetRequests", clientDetails?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/assetRequests/${clientDetails?.email}`
      );
      return response.data;
    },
    enabled: !!clientDetails?.email,
  });

  return {
    assetRequests,
    isAssetRequestsLoading,
    refetchAssetRequests,
  };
};

export default useAssetRequests;
