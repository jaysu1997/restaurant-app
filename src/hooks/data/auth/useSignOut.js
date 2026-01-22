import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOutApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router";
import StyledHotToast from "../../../ui/StyledHotToast";

function useSignOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: signOut,
    isPending,
    error,
  } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () => {
      // 登出後刪除用戶數據，避免被利用
      queryClient.removeQueries({ queryKey: ["user"], exact: true });
      navigate("/signin", { replace: true });
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "登出失敗",
        content: error.message,
      });
    },
  });

  return { signOut, isPending, error };
}

export default useSignOut;
