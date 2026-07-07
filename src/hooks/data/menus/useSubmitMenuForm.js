// 新增or更新單筆menu數據
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertMenuApi } from "../../../services/apiMenus";
import showToast from "../../../ui/showToast";

function useSubmitMenuForm() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: upsertMenuApi,
    onSuccess: () => {
      // 這種用法好像並沒有在文檔中看到，但可以同時將多個queryKey無效
      queryClient.invalidateQueries(["relatedMenus", "menus"]);
      showToast({
        type: "success",
        title: "餐點設定成功",
      });
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "餐點設定失敗",
        content: error.message,
      });
    },
  });

  return { submitMenuForm: mutate, isSubmittingMenuForm: isPending };
}

export default useSubmitMenuForm;
