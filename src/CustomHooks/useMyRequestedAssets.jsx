import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCheckRole from "./useCheckRole";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useMyRequestedAssets = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();

  const {
    data: myRequestedAssetList = [],
    isLoading: isMyRequestedAssetListLoading,
    refetch: myRequestedAssetListRefetch,
  } = useQuery({
    queryKey: ["myRequestedAssetList", clientDetails?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/myRequestedAssetList/${clientDetails?.email}`
      );
      return response.data;
    },
    enabled: !!clientDetails?.email,
  });
  return {
    myRequestedAssetList,
    isMyRequestedAssetListLoading,
    myRequestedAssetListRefetch,
  };
};

export default useMyRequestedAssets;
