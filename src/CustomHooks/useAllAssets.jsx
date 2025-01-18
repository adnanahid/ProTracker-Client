import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useCheckRole from "./useCheckRole";

const useAllAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: assets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-assets"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/all-asset/${clientDetails.email}`
      );
      return response.data;
    },
  });

  return { assets, isLoading, isError, error, refetch };
};

export default useAllAssets;
