// 建立新的訂單

import { useMutation } from "@tanstack/react-query";
import { createOrderApi } from "../../services/apiOrder";

function useCreateOrder() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  return { mutate, isPending, error };
}

export default useCreateOrder;
