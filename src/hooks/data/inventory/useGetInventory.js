// 取得所有庫存食材數據
import { useQuery } from "@tanstack/react-query";
import { getInventoryApi } from "../../../services/apiInventory";
import { useMemo } from "react";

function useGetInventory() {
  const inventoryQuery = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventoryApi,
  });

  const { data } = inventoryQuery;

  const inventoryObj = useMemo(() => {
    if (!data) return {};

    return Object.fromEntries(
      data.map(({ uuid, name, remainingQuantity }) => [
        uuid,
        { name, remainingQuantity },
      ]),
    );
  }, [data]);

  return { ...inventoryQuery, inventoryObj };
}

export default useGetInventory;
