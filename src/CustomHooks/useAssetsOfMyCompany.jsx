import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useAssetsOfMyCompany = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const {
    data: requestedAssets = [],
    isLoading: requestedAssetLoading,
    refetch: requestedAssetsRefetch,
  } = useQuery({
    queryKey: ["requestedAssets", clientDetails?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets-of-company/${clientDetails.hrEmail}`
      );
      return res.data;
    },
    enabled: !!clientDetails?.email,
  });
  return { requestedAssets, requestedAssetLoading, requestedAssetsRefetch };
};

export default useAssetsOfMyCompany;
