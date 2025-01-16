import { useEffect, useState } from "react";
import useAxiosPublic from "./UseAxiosPublic";

const useAllAssets = () => {
  const [assets, setAssets] = useState({});
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get("/all-asset").then((res) => {
      setAssets(res.data);
    });
  }, []);
  return [assets];
};

export default useAllAssets;
