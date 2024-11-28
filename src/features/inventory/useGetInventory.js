// 取得所有庫存食材數據
import { useQuery } from "@tanstack/react-query";
import { getInventoryApi } from "../../services/apiInventory";
import LoadingSpinner from "../../ui/LoadingSpinner";

function useGetInventory() {
  const {
    data: inventoryData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryApi,
  });

  // const inventoryData = data?.unshift({
  //   label: "無額外消耗",
  //   value: "無額外消耗",
  // });

  return { inventoryData, isPending, error };
}

export default useGetInventory;
