import { AxiosClient } from "@/service/AxiosClient";
import { TBook } from "@/types/book";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const useBooks = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await AxiosClient.get("book");
      return response.data.data;
    },
  });

  const deleteInfor = useMutation({
    mutationFn: async (infor: TBook) => {
      return AxiosClient.delete(`post/${infor.id}`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["infors"] });
    },
  });

  // const addInfor = useMutation({
  //   mutationFn: async (infor: TInfor) => {
  //     return AxiosClient.post(`post`, infor);
  //   },
  //   onSuccess: async () => {
  //     queryClient.invalidateQueries({ queryKey: ["infors"] });
  //   },
  // });

  // const updateInfor = async (id: string, infor: TInfor) => {
  //   await AxiosClient.put(`post/${id}`, infor);
  //   queryClient.invalidateQueries({ queryKey: ["infors"] });
  // };
  return { data };
};

export default useBooks;
