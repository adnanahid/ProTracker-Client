import { useMemo } from "react";
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://a12-server-pi.vercel.app",
  // baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
