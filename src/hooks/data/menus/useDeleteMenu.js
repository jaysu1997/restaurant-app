import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenuApi } from "../../../services/apiMenus";
import StyledHotToast from "../../../ui/StyledHotToast";

function useDeleteMenu() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (id) => deleteMenuApi(id),
    onSuccess: () => {
      StyledHotToast({
        type: "success",
        title: "數據刪除成功",
      });
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "數據刪除失敗",
        content: error.message,
      });
    },
  });

  return { deleteMenu: mutate, IsDeletingMenu: isPending };
}

export default useDeleteMenu;
