import { useMemo } from "react";
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  // const axiosPublic = useMemo(() => {
  //   return axios.create({
  //     baseURL: "http://localhost:5000",
  //     // headers: {
  //     //   "Content-Type": "application/json",
  //     // },
  //   });
  // }, []);

  return axiosPublic;
};

export default useAxiosPublic;
