import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenuApi } from "../../services/apiMenus";
import StyledHotToast from "../../ui/StyledHotToast";

function useDeleteMenu() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteMenu,
    isPending: menuDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: (id) => deleteMenuApi(id),
    onSuccess: () => {
      StyledHotToast({
        type: "success",
        title: "數據刪除成功",
      });
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
    onError: () => {
      StyledHotToast({
        type: "error",
        title: "數據刪除失敗",
      });
    },
  });

  return { deleteMenu, menuDeleting, deleteError };
}

export default useDeleteMenu;
