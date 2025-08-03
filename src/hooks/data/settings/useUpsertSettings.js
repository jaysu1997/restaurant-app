import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertSettingsApi } from "../../../services/apiSettings";
import StyledHotToast from "../../../ui/StyledHotToast";

// 更新or新增店鋪設定
function useUpsertSettings() {
  const queryClient = useQueryClient();

  const { mutate, isPaused, error } = useMutation({
    mutationFn: upsertSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      StyledHotToast({ type: "success", title: "設定更新成功" });
    },
    onError: () => {
      StyledHotToast({ type: "error", title: "設定更新失敗" });
    },
  });

  return { mutate, isPaused, error };
}

export default useUpsertSettings;
