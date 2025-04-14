import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "../features/menu/orderReducer";

// 統計餐點需要消耗的食材數量(1份)
function calcingredientsUsage(ingredients, state) {
  // 總食材消耗數據
  const ingredientsUsage = new Map();

  function setingredientsUsage(name, quantity) {
    ingredientsUsage.set(name, ingredientsUsage.get(name) || 0 + quantity);
  }

  // 餐點本身的消耗
  ingredients.forEach((ing) => {
    const name = ing.ingredientName.value;
    const quantity = ing.quantity;

    setingredientsUsage(name, quantity);
  });

  // 額外細項增加的消耗
  state.tempArray.forEach((obj) => {
    if (obj.length === 0 || obj.detail.length === 0) return;

    obj.detail.forEach((option) => {
      const name = option.ingredientName;
      const quantity = option.quantity;

      // 空字串代表此細項無額外食材消耗
      if (name === "") return;
      setingredientsUsage(name, quantity);
    });
  });

  return ingredientsUsage;
}

// 檢查庫存剩餘數量是否充足
function compareInventory({
  previousIngredientsUsage,
  ingredientsUsage,
  servings,
  inventoryMap,
}) {
  const result = [];

  // 如果有更新點餐選項設定，先把之前消耗的食材加回庫存
  if (previousIngredientsUsage) {
    previousIngredientsUsage.usageMap.forEach((value, key) => {
      inventoryMap.set(
        key,
        inventoryMap.get(key) + value * previousIngredientsUsage.servings
      );
    });
  }

  // 檢查庫存剩餘食材是否能夠滿足點餐的總消耗需求
  ingredientsUsage.forEach((value, key) => {
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

// 生成訂單餐點uniqueId
function generateDishItemId(dishIdList) {
  const newId = Math.random().toString(36).slice(2, -1);

  if (dishIdList.includes(newId)) {
    return generateDishItemId(dishIdList);
  }

  return newId;
}

const OrderContext = createContext();

function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OrderContext.Provider
      value={{
        state,
        dispatch,
        calcingredientsUsage,
        compareInventory,
        generateDishItemId,
      }}
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
