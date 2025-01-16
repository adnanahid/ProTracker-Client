import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";

const useAllAssets = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: assets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all-assets"], // Query key
    queryFn: async () => {
      const response = await axiosPublic.get("/all-asset");
      return response.data;
    },
  });

  return { assets, isLoading, isError, error, refetch };
};

export default useAllAssets;
