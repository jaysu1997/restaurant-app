// 刪除指定食材數據

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInventoryApi } from "../../../services/apiInventory";
import StyledHotToast from "../../../ui-old/StyledHotToast";

function useDeleteInventory() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteInventory,
    isPending: inventoryDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteInventoryApi,
    onSuccess: () => {
      StyledHotToast({
        type: "success",
        title: "庫存食材刪除成功",
      });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
    onError: (error) => {
      console.log(error);
      StyledHotToast({
        type: "error",
        title: "庫存食材刪除失敗",
        content: error.message,
      });
    },
  });

  return { deleteInventory, inventoryDeleting, deleteError };
}

export default useDeleteInventory;
