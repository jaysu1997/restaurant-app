import { useQuery } from "@tanstack/react-query";
import { getOrderApi } from "../../../services/apiOrder";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useOrder } from "../../../context/OrderContext";

// 根據params(orderId)獲取對應訂單數據
function useGetOrder(isEditPage) {
  const { orderId } = useParams();
  const { dispatch } = useOrder();

  const {
    data: orderData,
    isPending: orderIsPending,
    error: orderError,
    isError: orderIsError,
    isSuccess: orderIsSuccess,
  } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrderApi(orderId),
  });

  useEffect(
    function () {
      if (isEditPage && orderIsSuccess) {
        dispatch({
          type: "order/edit",
          payload: orderData,
        });
      }
    },
    [orderData, orderIsSuccess, dispatch, isEditPage]
  );

  return {
    orderData,
    orderIsPending,
    orderError,
    orderIsError,
  };
}

export default useGetOrder;
