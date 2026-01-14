// 取得所有庫存食材數據
import { useQuery } from "@tanstack/react-query";
import { getInventoryApi } from "../../../services/apiInventory";
import { useEffect } from "react";

function useGetInventory(dispatch) {
  const {
    data: inventoryData,
    isPending: inventoryIsPending,
    error: inventoryError,
    isError: inventoryIsError,
    isSuccess: inventoryisSuccess,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryApi,
  });

  // 建立和編輯訂單時需要把下載的庫存數據存入useReducer中
  useEffect(
    function () {
      // 如果不是在訂單編輯狀態，不需要使用useReducer
      if (!dispatch) return;

      if (inventoryisSuccess) {
        dispatch({
          type: "inventory/setAll",
          payload: inventoryData,
        });
      }
    },
    [dispatch, inventoryData, inventoryisSuccess]
  );

  return {
    inventoryData,
    inventoryIsPending,
    inventoryError,
    inventoryIsError,
    inventoryisSuccess,
  };
}

export default useGetInventory;
