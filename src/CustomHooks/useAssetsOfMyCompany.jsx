import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";

const useAssetsOfMyCompany = (currentPage, itemsPerPage, search, filterBy) => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const token = localStorage.getItem("access-token");
  const {
    data: { requestedAssets = [], totalCount = 0 } = {},
    isLoading: requestedAssetLoading,
    refetch: requestedAssetsRefetch,
  } = useQuery({
    queryKey: ["requestedAssets", clientDetails?.email, currentPage, itemsPerPage, search, filterBy, token],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assets-of-company/${clientDetails.hrEmail}?page=${currentPage}&limit=${itemsPerPage}&search=${search}&filterBy=${filterBy}`
      );
      return res.data;
    },
    enabled: !!token && !!clientDetails?.email,
  });
  return {
    requestedAssets,
    totalCount,
    requestedAssetLoading,
    requestedAssetsRefetch,
  };
};

export default useAssetsOfMyCompany;
