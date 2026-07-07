import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertSettingsApi } from "../../../services/apiSettings";
import showToast from "../../../ui/showToast";

// 更新or新增店鋪設定
function useSubmitSettings() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: upsertSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      showToast({ type: "success", title: "設定更新成功" });
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "設定更新失敗",
        content: error.message,
      });
    },
  });

  return { submitSettings: mutate, isSubmittingSettings: isPending };
}

export default useSubmitSettings;
