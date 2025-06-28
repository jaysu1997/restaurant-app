import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../../services/apiAuth";

function useSignup() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => console.log(data),
  });

  return { mutate };
}

export default useSignup;
