import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useMyRequestedAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: myRequestedAssetList = [],
    isLoading: isMyRequestedAssetListLoading,
    refetch: myRequestedAssetListRefetch,
  } = useQuery({
    queryKey: ["myRequestedAssetList"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/myRequestedAssetList/${clientDetails?.email}`
      );
      return response.data;
    },
  });
  return {
    myRequestedAssetList,
    isMyRequestedAssetListLoading,
    myRequestedAssetListRefetch,
  };
};

export default useMyRequestedAssets;
