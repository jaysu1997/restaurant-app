// 取得所有庫存食材數據
import { useQuery } from "@tanstack/react-query";
import { getInventoryApi } from "../../../services/apiInventory";
import { useEffect } from "react";
import { useOrder } from "../../../context/OrderContext";
import { useLocation } from "react-router-dom";

function useGetInventory(isInOrderContext = false) {
  const { dispatch } = useOrder();
  const { pathname } = useLocation();

  const {
    data: inventoryData,
    isPending: inventoryIsPending,
    error: inventoryError,
    isError: inventoryIsError,
    isSuccess,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryApi,
  });

  // 將下載的庫存數據存入useReducer中
  useEffect(
    function () {
      // 如果不是在訂單編輯狀態，不需要使用useReducer
      if (!isInOrderContext) return;

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
    },
    [dispatch, inventoryData, isInOrderContext, isSuccess, pathname]
  );

  return {
    inventoryData,
    inventoryIsPending,
    inventoryError,
    inventoryIsError,
  };
}

export default useGetInventory;
