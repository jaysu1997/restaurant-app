import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertSettingsApi } from "../../../services/apiSettings";

// 更新or新增店鋪設定
function useUpsertSettings() {
  const queryClient = useQueryClient();

  const { mutate, isPaused, error } = useMutation({
    mutationFn: upsertSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  return { mutate, isPaused, error };
}

export default useUpsertSettings;
