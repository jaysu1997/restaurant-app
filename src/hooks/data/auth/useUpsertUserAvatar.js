import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertAvatarFileApi } from "../../../services/apiAuth";
import StyledHotToast from "../../../ui-old/StyledHotToast";

// 更新用戶頭像(涵蓋新增頭像、更改user metadata頭像數據、刪除舊頭像)
function useUpsertUserAvatar() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: upsertAvatarFileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      StyledHotToast({ type: "success", title: "頭像更新成功" });
    },
    onError: () => StyledHotToast({ type: "error", title: "頭像更新失敗" }),
  });

  return { mutate, isPending, error };
}

export default useUpsertUserAvatar;
