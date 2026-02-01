import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../../services/apiAuth";
import { useNavigate } from "react-router";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      // 登入成功後馬上將數據手動放到user中，不用等待useUser再去取得用戶數據，可以讓登入流程和ui顯示更順暢
      queryClient.setQueryData(["user"], data.user);
      console.log("登入成功");
      navigate("/", { replace: true });
    },
  });

  return { login: mutate, isLoggingIn: isPending };
}

export default useLogin;
