import useAuthenStore from "@/midlewares/authenStore";
import { AxiosClient } from "@/service/AxiosClient";
import { TUser } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const useUser = () => {
  const queryClient = useQueryClient();
  const { authentication, setAuthentication } = useAuthenStore();
  //   const { data } = useQuery({
  //     queryKey: ["user"],
  //     queryFn: async (User: TUser) => {
  //       const response = await AxiosClient.post("login");
  //       return response.data.data;
  //     },
  //   });

  const login = useMutation({
    mutationFn: async (user: TUser) => {
      const response = await AxiosClient.post("/user/login", user);
      return response.data;
    },

    onSuccess: async (data) => {
      const token = data.token;
      const user = data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      if (!token) {
        throw new Error("Missing token in login response");
      }
      setAuthentication("login");
      AxiosClient.interceptors.request.use((config) => {
        config.headers.Authorization = `${token}`;
        return config;
      });
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });

  const register = useMutation({
    mutationFn: async (user: TUser) => {
      const { fullName, password, email, username } = user;
      const newUser = { fullName, password, email, username };
      console.log(newUser);
      const response = await AxiosClient.post("/user/register", newUser);
      return response.data;
    },

    onSuccess: () => {
      setAuthentication("register");
      console.log("Registration successful");
    },

    onError: (error: any) => {
      console.error("Registration error:", error);
    },
  });

  return { login, register };
};

export default useUser;
