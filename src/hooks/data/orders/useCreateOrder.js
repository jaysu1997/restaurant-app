// 建立新的訂單
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrderApi } from "../../../services/apiOrder";
import StyledHotToast from "../../../ui-old/StyledHotToast";
import { formatPickupNumber } from "../../../utils/orderHelpers";

function useCreateOrder() {
  const queryClient = useQueryClient();

  const {
    mutate: createOrder,
    isPending: orderCreating,
    error,
  } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
      StyledHotToast({
        type: "success",
        title: `取餐單號 ${formatPickupNumber(
          data.order.pickupNumber
        )} 建立成功`,
      });

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

  return { createOrder, orderCreating, error };
}

export default useCreateOrder;
