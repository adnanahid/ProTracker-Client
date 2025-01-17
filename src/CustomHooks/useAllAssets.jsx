import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllAssets = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: assets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-assets"],
    queryFn: async () => {
      const response = await axiosSecure.get("/all-asset");
      return response.data;
    },
  });

  return { assets, isLoading, isError, error, refetch };
};

export default useAllAssets;
