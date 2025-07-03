import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../../../services/apiAuth";

function useSignUp() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ email, password }) => signUp({ email, password }),
    onSuccess: (data) => console.log(data),
  });

  return { mutate };
}

export default useSignUp;
