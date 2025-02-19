import useAxiosSecure from "./useAxiosSecure";
import useCheckRole from "./useCheckRole";
import { useQuery } from "@tanstack/react-query";

const useTodo = () => {
  const axiosSecure = useAxiosSecure();
  const { clientDetails } = useCheckRole();
  const token = localStorage.getItem("access-token");
  const { data: todo = [], refetch: todoRefetch } = useQuery({
    queryKey: ["todo", clientDetails?.email, token],
    enabled: !!token && !!clientDetails?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(`/todo/${clientDetails.email}`);
      return response.data.result;
    },
  });
  return { todo, todoRefetch };
};

export default useTodo;
