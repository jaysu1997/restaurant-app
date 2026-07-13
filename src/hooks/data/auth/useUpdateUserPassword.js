import { useMutation } from "@tanstack/react-query";
import { updateUserPasswordApi } from "../../../services/apiAuth";
import showToast from "../../../utils/showToast";
import useLogout from "./useLogout";

// 更新用戶密碼
function useUpdateUserPassword() {
  const { logout } = useLogout();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserPasswordApi,
    onSuccess: () => {
      showToast({ type: "success", title: "密碼已更新，請重新登入。" });
      setTimeout(() => logout(), 2000);
    },
  });

  return { updateUserPassword: mutate, isUpdatingUserPassword: isPending };
}

export default useUpdateUserPassword;
