import { useQuery } from "@tanstack/react-query";
import { getOrderApi } from "../../../services/apiOrder";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import StyledHotToast from "../../../ui/StyledHotToast";
import { useOrder } from "../../../context/OrderContext";

// 根據params(orderId)獲取對應訂單數據
function useGetOrder(isEditPage) {
  const { orderId } = useParams();
  const { dispatch } = useOrder();

  const { data, isPending, error, isError, isSuccess } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrderApi(orderId),
  });

  useEffect(
    function () {
      // 如果不是在訂單編輯狀態，不需要使用useReducer
      if (!isEditPage) return;

      if (isSuccess) {
        dispatch({
          type: "order/edit",
          payload: data,
        });
      }

      if (isError) {
        StyledHotToast({
          type: "error",
          title: "訂單數據獲取失敗",
          content: error,
        });
      }
    },
    [data, error, isError, isSuccess, dispatch, isEditPage]
  );

  return { data, isPending };
}

export default useGetOrder;
