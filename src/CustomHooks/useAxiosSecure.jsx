import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    authorization: `Bearer ${localStorage.getItem("access-token")}`,
  },
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
