import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUpApi } from "../../../services/apiAuth";

// supabase上的email驗證內容還沒修正，現在有點亂七八糟的
function useSignUp() {
  const queryClient = useQueryClient();

  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => signUpApi({ email, password }),
    onSuccess: (data) => console.log(data),
  });

  return { signUp, isPending, error };
}

export default useSignUp;
