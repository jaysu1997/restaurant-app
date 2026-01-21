import { useMutation } from "@tanstack/react-query";
import { updateUserPasswordApi } from "../../../services/apiAuth";
import StyledHotToast from "../../../ui-old/StyledHotToast";
import useSignOut from "./useSignOut";

// 更新用戶密碼
function useUpdateUserPassword() {
  const { signOut } = useSignOut();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateUserPasswordApi,
    onSuccess: () => {
      StyledHotToast({ type: "success", title: "密碼已更新，請重新登入。" });
      setTimeout(() => signOut(), 2000);
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "密碼變更失敗",
        content: error.message,
      });
    },
  });

  return { mutate, isPending, error };
}

export default useUpdateUserPassword;
