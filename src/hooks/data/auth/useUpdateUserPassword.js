import { useMutation } from "@tanstack/react-query";
import { updateUserPasswordApi } from "../../../services/apiAuth";
import StyledHotToast from "../../../ui/StyledHotToast";
import useLogout from "./useLogout";

// 更新用戶密碼
function useUpdateUserPassword() {
  const { logout } = useLogout();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserPasswordApi,
    onSuccess: () => {
      StyledHotToast({ type: "success", title: "密碼已更新，請重新登入。" });
      setTimeout(() => logout(), 2000);
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "密碼變更失敗",
        content: error.message,
      });
    },
  });

  return { updateUserPassword: mutate, isUpdatingUserPassword: isPending };
}

export default useUpdateUserPassword;
