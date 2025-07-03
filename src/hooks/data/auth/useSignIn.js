import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../../../services/apiAuth";

function useSignIn() {
  const queryClient = useQueryClient();

  const {
    mutate: logIn,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => signIn({ email, password }),
    onSuccess: (data) => console.log(data),
  });

  return { logIn };
}

export default useSignIn;
