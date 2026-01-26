// 取得所有庫存食材數據
import { useQuery } from "@tanstack/react-query";
import { getInventoryApi } from "../../../services/apiInventory";
import { withFallbackRetry } from "../../../utils/helpers";

function useGetInventory() {
  const { data, isPending, error, isError, isSuccess, refetch } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryApi,
  });

  return {
    data,
    isPending,
    error: withFallbackRetry(error, refetch),
    isError,
    isSuccess,
  };
}

export default useGetInventory;
