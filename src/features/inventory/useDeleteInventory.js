// 刪除指定食材數據

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInventoryApi } from "../../services/apiInventory";
import toast from "react-hot-toast";

function useDeleteInventory() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteInventory,
    isPending: inventoryDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: ({ id, name }) => deleteInventoryApi({ id, name }),
    onSuccess: () => {
      toast.success("數據刪除成功");
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
    onError: () => {
      toast.error("數據刪除失敗");
    },
  });

  return { deleteInventory, inventoryDeleting, deleteError };
}

export default useDeleteInventory;
