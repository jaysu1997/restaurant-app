// 取得所有庫存食材數據
import { useQuery } from "@tanstack/react-query";
import { getInventoryApi } from "../../services/apiInventory";
import { useEffect } from "react";
import StyledHotToast from "../../ui/StyledHotToast";
import { useOrder } from "../../context/OrderContext";
import { useLocation } from "react-router-dom";

function useGetInventory(orderCreating = true) {
  const { dispatch } = useOrder();
  const { pathname } = useLocation();

  const {
    data: inventoryData,
    isPending: inventoryDataFetching,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryApi,
  });

  // 將下載的庫存數據存入useReducer中
  useEffect(
    function () {
      // 如果不是在訂單編輯狀態，不需要使用useReducer
      if (!orderCreating) return;
      // 根據當前頁面決定是否需要重置useReducer
      if (isSuccess) {
        dispatch({
          type: "curPage",
          payload: pathname,
        });

        dispatch({
          type: "inventory/remainingQuantity",
          payload: inventoryData,
        });
      }

      if (isError) {
        StyledHotToast({
          type: "error",
          title: "庫存數據獲取失敗",
          content: error,
        });
      }
    },
    [
      isSuccess,
      isError,
      dispatch,
      inventoryData,
      error,
      orderCreating,
      pathname,
    ]
  );

  return { inventoryData, inventoryDataFetching };
}

export default useGetInventory;
