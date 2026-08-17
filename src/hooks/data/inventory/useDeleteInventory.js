// 刪除指定食材數據

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInventoryApi } from "../../../services/apiInventory";
import showToast from "../../../utils/showToast";

function useDeleteInventory() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteInventoryApi,
    onSuccess: () => {
      showToast({
        type: "success",
        title: "庫存食材刪除成功",
      });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "庫存食材刪除失敗",
        content: error.message,
      });
    },
  });

  return { mutate, isPending };
}

export default useDeleteInventory;
