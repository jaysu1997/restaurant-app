import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfileApi } from "../../../services/apiAuth";
import showToast from "../../../utils/showToast";

// 更新user的資料
function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      showToast({ type: "success", title: "個人資料更新成功" });
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "個人資料更新失敗",
        content: error.message,
      });
    },
  });

  return { updateUserProfile: mutate, isUpdatingUserProfile: isPending };
}

export default useUpdateUserProfile;
