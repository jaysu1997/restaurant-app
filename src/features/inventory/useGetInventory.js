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
    isError: inventoryDataFetchingError,
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

      // 如果是在點餐頁面和訂單編輯頁面來回切換的話需要重置useReducer的state，避免數據出問題
      dispatch({
        type: "page/setCurrent",
        payload: pathname,
      });

      if (isSuccess) {
        dispatch({
          type: "inventory/setAll",
          payload: inventoryData,
        });
      }

      if (inventoryDataFetchingError) {
        StyledHotToast({
          type: "error",
          title: "庫存數據獲取失敗",
          content: error.message,
        });
      }
    },
    [
      isSuccess,
      inventoryDataFetchingError,
      dispatch,
      inventoryData,
      error,
      orderCreating,
      pathname,
    ]
  );

  return { inventoryData, inventoryDataFetching, inventoryDataFetchingError };
}

export default useGetInventory;
