import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenuApi } from "../../../services/apiMenus";
import showToast from "../../../utils/showToast";

function useDeleteMenu() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteMenuApi(id),
    onSuccess: () => {
      showToast({
        type: "success",
        title: "數據刪除成功",
      });
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "數據刪除失敗",
        content: error.message,
      });
    },
  });

  return { mutate, isPending };
}

export default useDeleteMenu;
