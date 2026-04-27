// 取得所有庫存食材數據
import { useQuery } from "@tanstack/react-query";
import { getInventoryApi } from "../../../services/apiInventory";
import { withFallbackRetry } from "../../../utils/helpers";
import { useMemo } from "react";

function useGetInventory() {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryApi,
  });

  const inventoryObj = useMemo(() => {
    if (!data) return {};

    return Object.fromEntries(
      data.map(({ uuid, name, remainingQuantity }) => [
        uuid,
        { name, remainingQuantity },
      ]),
    );
  }, [data]);

  return {
    inventory: data,
    inventoryObj,
    inventoryIsLoading: isPending,
    inventoryIsError: isError,
    inventoryError: withFallbackRetry(error, refetch),
  };
}

export default useGetInventory;
