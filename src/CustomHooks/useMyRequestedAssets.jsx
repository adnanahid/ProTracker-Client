import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useMyRequestedAssets = (search, filters, currentPage, itemsPerPage) => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: { myRequestedAssetList = [], totalCount = 0 } = {},
    isLoading: isMyRequestedAssetListLoading,
    refetch: myRequestedAssetListRefetch,
  } = useQuery({
    queryKey: ["myRequestedAssetList", clientDetails?.email, search, filters, currentPage, itemsPerPage],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/myRequestedAssetList/${clientDetails?.email}?search=${search}&filter=${filters}&page=${currentPage}&limit=${itemsPerPage}`
      );
      return response.data;
    },
    enabled: !!clientDetails?.email,
  });
  return {
    myRequestedAssetList,
    totalCount,
    isMyRequestedAssetListLoading,
    myRequestedAssetListRefetch,
  };
};

export default useMyRequestedAssets;
