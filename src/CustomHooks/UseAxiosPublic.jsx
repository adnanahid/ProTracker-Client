import axios from "axios";

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: "http://localhost:5000", 
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosPublic;
};

export default useAxiosPublic;
