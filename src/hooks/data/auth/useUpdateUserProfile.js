import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileApi } from "../../../services/apiAuth";
import StyledHotToast from "../../../ui/StyledHotToast";

// 更新user的資料
function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      StyledHotToast({ type: "success", title: "個人資料更新成功" });
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "個人資料更新失敗",
        content: error.message,
      });
    },
  });

  return { updateUserProfile: mutate, isUpdateUserProfile: isPending };
}

export default useUpdateUserProfile;
