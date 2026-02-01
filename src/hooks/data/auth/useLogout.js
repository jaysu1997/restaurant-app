import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router";
import StyledHotToast from "../../../ui/StyledHotToast";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // 登出後刪除用戶數據，避免被利用
      queryClient.removeQueries({ queryKey: ["user"], exact: true });
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "登出失敗",
        content: error.message,
      });
    },
  });

  return { logout: mutate, isLoggingOut: isPending };
}

export default useLogout;
