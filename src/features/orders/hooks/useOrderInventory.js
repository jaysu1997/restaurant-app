import { useEffect } from "react";
import useGetInventory from "../../../hooks/data/inventory/useGetInventory";
import useOrderDraft from "../../../context/orders/useOrderDraft";

// 把取得的庫存數據放到useReducer
function useOrderInventory() {
  const { dispatch } = useOrderDraft();

  const {
    inventory,
    inventoryObj,
    inventoryIsLoading,
    inventoryIsError,
    inventoryError,
  } = useGetInventory();

  useEffect(() => {
    if (!inventory) return;

    dispatch({
      type: "inventory/setAll",
      payload: inventoryObj,
    });
  }, [dispatch, inventory, inventoryObj]);

  return {
    inventoryIsLoading,
    inventoryIsError,
    inventoryError,
    inventoryObj,
  };
}

export default useOrderInventory;
