// 新增or更新庫存食材
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertInventoryApi } from "../../../services/apiInventory";
import showToast from "../../../utils/showToast";

function useSubmitInventory() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: upsertInventoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });

      showToast({
        type: "success",
        title: "庫存食材設定成功",
      });
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "庫存食材設定失敗",
        content: error.message,
      });
    },
  });

  return { submitInventory: mutate, isSubmittingInventory: isPending };
}

export default useSubmitInventory;
