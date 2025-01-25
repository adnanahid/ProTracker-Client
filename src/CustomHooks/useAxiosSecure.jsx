import axios from "axios";

const axiosSecure = axios.create({
  // baseURL: "https://a12-server-pi.vercel.app",
  baseURL: "http://localhost:5000",
  headers: {
    authorization: `Bearer ${localStorage.getItem("access-token")}`,
  },
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log('request stopped by interceptors', token)
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
