import { useEffect } from "react";
import useGetInventory from "../../../hooks/data/inventory/useGetInventory";
import useOrderDraft from "../../../context/orders/useOrderDraft";

// 把取得的庫存數據放到useReducer
function useOrderInventory() {
  const { dispatch } = useOrderDraft();
  const inventoryQuery = useGetInventory();
  const { data, inventoryObj } = inventoryQuery;

  useEffect(() => {
    if (!data) return;

    dispatch({
      type: "inventory/setAll",
      payload: inventoryObj,
    });
  }, [dispatch, data, inventoryObj]);

  return { ...inventoryQuery, inventoryObj };
}

export default useOrderInventory;
