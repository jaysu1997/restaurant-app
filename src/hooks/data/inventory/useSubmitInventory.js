// 新增or更新庫存食材

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createInventoryApi,
  updateInventoryApi,
} from "../../../services/apiInventory";
import StyledHotToast from "../../../ui/StyledHotToast";

function useSubmitInventory() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (inventoryData) => {
      // 有id就是更新，沒有則是新增
      return inventoryData.id
        ? updateInventoryApi(inventoryData)
        : createInventoryApi(inventoryData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "庫存食材設定失敗",
        content: error.message,
      });
    },
  });

  return { submitInventory: mutate, isSubmittingInventory: isPending };
}

export default useSubmitInventory;
