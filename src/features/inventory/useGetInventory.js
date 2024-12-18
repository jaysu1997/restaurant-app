// 取得所有庫存食材數據
import { useQuery } from "@tanstack/react-query";
import { getInventoryApi } from "../../services/apiInventory";

function useGetInventory() {
  const {
    data: inventoryData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryApi,
  });

  return { inventoryData, isPending, error };
}

export default useGetInventory;
