import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useAssetRequests = (currentPage, itemsPerPage) => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: { assetRequests = [], totalCount } = {},
    isLoading: isAssetRequestsLoading,
    refetch: refetchAssetRequests,
  } = useQuery({
    queryKey: ["assetRequests", clientDetails?.email, currentPage, itemsPerPage],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/assetRequests/${clientDetails?.email}?page=${currentPage}&limit=${itemsPerPage}`
      );
      return response.data;
    },
    enabled: !!clientDetails?.email,
  });

  return {
    assetRequests,
    totalCount,
    isAssetRequestsLoading,
    refetchAssetRequests,
  };
};

export default useAssetRequests;
