import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../features/order/orderReducer";

const OrderContext = createContext();

function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 統計餐點需要消耗的食材數量(1份)
  function calcConsumption(ingredients, state) {
    // 總食材消耗數據
    const consumptionMap = new Map();

    function setConsumptionMap(name, quantity) {
      consumptionMap.set(name, consumptionMap.get(name) || 0 + quantity);
    }

    // 餐點本身的消耗
    ingredients.forEach((ing) => {
      const name = ing.ingredientName.value;
      const quantity = ing.quantity;

      setConsumptionMap(name, quantity);
    });

    // 額外細項增加的消耗
    state.tempArray.forEach((obj) => {
      if (obj.length === 0 || obj.detail.length === 0) return;

      obj.detail.forEach((option) => {
        const name = option.ingredientName;
        const quantity = option.quantity;

        if (name === "") return;
        setConsumptionMap(name, quantity);
      });
    });

    return consumptionMap;
  }

  // 檢查庫存剩餘數量是否充足
  function compareInventory({
    originalConsumption,
    consumptionMap,
    servings,
    inventoryMap,
  }) {
    const result = [];

    // 如果有更新點餐選項設定，先把之前消耗的食材加回庫存
    if (originalConsumption) {
      originalConsumption.consumption.forEach((value, key) => {
        inventoryMap.set(
          key,
          inventoryMap.get(key) + value * originalConsumption.servings
        );
      });
    }

    // 檢查庫存剩餘食材是否能夠滿足點餐的總消耗需求
    consumptionMap.forEach((value, key) => {
      if (inventoryMap.get(key) <= 0) {
        result.push({ name: key, maxCapacity: 0 });
      } else if (inventoryMap.get(key) < value * servings) {
        // 剩餘食材能夠供應的最大餐點份數
        const maxCapacity = Math.floor(inventoryMap.get(key) / value);

        result.push({ name: key, maxCapacity });
      }
    });

    return result;
  }

  return (
    <OrderContext.Provider
      value={{ state, dispatch, calcConsumption, compareInventory }}
    >
      {children}
    </OrderContext.Provider>
  );
}

function useOrder() {
  const context = useContext(OrderContext);

  if (context === undefined)
    throw new Error("useOrder 必須在 OrderProvider 中使用");

  return context;
}

export { OrderProvider, useOrder };
