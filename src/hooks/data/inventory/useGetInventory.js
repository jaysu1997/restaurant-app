// 取得所有庫存食材數據
import { useQuery } from "@tanstack/react-query";
import { getInventoryApi } from "../../../services/apiInventory";
import { withFallbackRetry } from "../../../utils/helpers";

function useGetInventory() {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryApi,
  });

  return {
    inventory: data,
    inventoryIsLoading: isPending,
    inventoryIsError: isError,
    inventoryError: withFallbackRetry(error, refetch),
  };
}

export default useGetInventory;
