import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertSettingApi } from "../../../services/apiSettings";

function useUpsertSetting() {
  const queryClient = useQueryClient();

  const { mutate, isPaused, error } = useMutation({
    mutationFn: upsertSettingApi,
    onSuccess: (newData) => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  return { mutate, isPaused, error };
}

export default useUpsertSetting;
