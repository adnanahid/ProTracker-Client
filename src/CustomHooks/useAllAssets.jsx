import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useCheckRole from "./useCheckRole";

const useAllAssets = (currentPage, itemsPerPage, search, filterBy, sortBy) => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: { assets = [], totalCount } = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "all-assets",
      clientDetails?.email,
      currentPage,
      itemsPerPage,
      search,
      filterBy,
      sortBy,
    ],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/all-assets/${clientDetails.email}?page=${currentPage}&limit=${itemsPerPage}&search=${search}&filterBy=${filterBy}&sortBy=${sortBy}`
      );
      return response.data;
    },
    enabled: !!clientDetails?.email,
  });
  console.log(search);
  return { assets, totalCount, isLoading, isError, error, refetch };
};

export default useAllAssets;
