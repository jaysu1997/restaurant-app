// 建立新的訂單

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderApi } from "../../services/apiOrder";
import StyledHotToast from "../../ui/StyledHotToast";
import { useOrder } from "../../context/OrderContext";

function useCreateOrder(reset) {
  const { dispatch } = useOrder();
  const queryClient = useQueryClient();

  const {
    mutate: createOrder,
    isPending,
    error,
  } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
      const orderNumber = String(data.order.orderNumber).padStart(3, "0");
      StyledHotToast({
        type: "success",
        title: `取餐單號#${orderNumber}建立成功`,
      });

      dispatch({ type: "order/clear" });
      reset();

      queryClient.invalidateQueries(["orders", "inventory"]);
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "訂單建立失敗",
        content: error.message,
      });
    },
  });

  return { createOrder, isPending, error };
}

export default useCreateOrder;
