import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useCheckRole from "./useCheckRole";

const useAllAssets = (currentPage, itemsPerPage, search, filterBy, sortBy) => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const token = localStorage.getItem("access-token");
  const {
    data: { assets = [], totalCount = 0 } = {},
    isLoading,
    isError,
    error,
    refetch: RefetchAllAssets,
  } = useQuery({
    queryKey: [
      "all-assets",
      clientDetails?.email,
      currentPage,
      itemsPerPage,
      search,
      filterBy,
      sortBy,
      token,
    ],
    enabled: !!token && !!clientDetails?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/all-assets/${clientDetails.email}?page=${currentPage}&limit=${itemsPerPage}&search=${search}&filterBy=${filterBy}&sortBy=${sortBy}`
      );
      return response.data;
    },
  });
  return { assets, totalCount, isLoading, isError, error, RefetchAllAssets };
};

export default useAllAssets;
