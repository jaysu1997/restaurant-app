import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatarFileApi } from "../../../services/apiAuth";
import StyledHotToast from "../../../ui/StyledHotToast";

// 更新用戶頭像(涵蓋新增頭像、更改user metadata頭像數據、刪除舊頭像)
function useUpdateUserAvatar() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateAvatarFileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      StyledHotToast({ type: "success", title: "頭像更新成功" });
    },
    onError: () => StyledHotToast({ type: "error", title: "頭像更新失敗" }),
  });

  return { updateUserAvatar: mutate, isUpdatingUserAvatar: isPending };
}

export default useUpdateUserAvatar;
