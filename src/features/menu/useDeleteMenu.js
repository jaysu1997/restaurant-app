import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenuApi } from "../../services/apiMenus";
import toast from "react-hot-toast";

function useDeleteMenu() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteMenu,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: (id) => deleteMenuApi(id),
    onSuccess: () => {
      toast.success("數據刪除成功");
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
    onError: () => {
      toast.error("數據刪除失敗");
    },
  });

  return { deleteMenu, isDeleting, deleteError };
}

export default useDeleteMenu;
