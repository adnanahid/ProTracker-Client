import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useMyRequestedAssets = (search, filters, currentPage, itemsPerPage) => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const token = localStorage.getItem("access-token");
  const {
    data: { myRequestedAssetList = [], totalCount = 0 } = {},
    isLoading: isMyRequestedAssetListLoading,
    refetch: myRequestedAssetListRefetch,
  } = useQuery({
    queryKey: [
      "myRequestedAssetList",
      clientDetails?.email,
      search,
      filters,
      currentPage,
      itemsPerPage,
      token
    ],
    enabled: !!token && !!clientDetails?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/myRequestedAssetList/${clientDetails?.email}?search=${search}&filter=${filters}&page=${currentPage}&limit=${itemsPerPage}`
      );
      return response.data;
    },
    enabled: !!token && !!clientDetails?.email,
  });
  return {
    myRequestedAssetList,
    totalCount,
    isMyRequestedAssetListLoading,
    myRequestedAssetListRefetch,
  };
};

export default useMyRequestedAssets;
