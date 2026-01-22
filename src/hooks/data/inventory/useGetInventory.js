// 取得所有庫存食材數據
import { useQuery } from "@tanstack/react-query";
import { getInventoryApi } from "../../../services/apiInventory";
import { useEffect } from "react";
import { withFallbackRetry } from "../../../utils/helpers";

function useGetInventory(dispatch) {
  const { data, isPending, error, isError, isSuccess, refetch } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryApi,
  });

  // 建立和編輯訂單時需要把下載的庫存數據存入useReducer中
  useEffect(
    function () {
      // 如果不是在訂單編輯狀態，不需要使用useReducer
      if (!dispatch) return;

      if (isSuccess) {
        dispatch({
          type: "inventory/setAll",
          payload: data,
        });
      }
    },
    [dispatch, data, isSuccess],
  );

  return {
    data,
    isPending,
    error: withFallbackRetry(error, refetch),
    isError,
    isSuccess,
  };
}

export default useGetInventory;
