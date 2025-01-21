import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useCheckRole from "./useCheckRole";

const useAllAssets = (currentPage, itemsPerPage, filterBy) => {
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
      filterBy,
    ],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/all-assets/${clientDetails.email}?page=${currentPage}&limit=${itemsPerPage}&filterBy=${filterBy}`
      );
      return response.data;
    },
    enabled: !!clientDetails?.email,
  });
  console.log(filterBy);
  return { assets, totalCount, isLoading, isError, error, refetch };
};

export default useAllAssets;
