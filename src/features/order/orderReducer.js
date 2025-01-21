// 單筆訂單數據

// 統計餐點需要消耗的食材總量
function calcConsumptions(ingredients, servings = 1, state) {
  // 總食材消耗數據
  const consumptionsMap = new Map();

  function setConsumptionsMap(name, perServing, total) {
    consumptionsMap.set(name, {
      total: consumptionsMap.has(name)
        ? consumptionsMap.get(name).total + total
        : total,
      perServing,
    });
  }

  // 餐點本身的消耗
  ingredients.forEach((ing) => {
    const name = ing.ingredientName.value;
    const perServing = ing.quantity;
    const total = perServing * servings;

    setConsumptionsMap(name, perServing, total);
  });

  // 額外細項增加的消耗
  state.tempArray.forEach((obj) => {
    if (obj.length === 0 || obj.detail.length === 0) return;

    obj.detail.forEach((option) => {
      const name = option.ingredientName;
      const perServing = option.quantity;
      const total = perServing * servings;

      if (name === "") return;
      setConsumptionsMap(name, perServing, total);
    });
  });

  return consumptionsMap;
}

// 檢查庫存剩餘數量是否充足
function compareInventory(originalConsumptionsMap, consumptionsMap, state) {
  const result = [];

  // 如果是更新點餐數據，先把之前消耗的食材加回庫存
  if (originalConsumptionsMap) {
    originalConsumptionsMap.forEach((value, key) => {
      state.inventoryMap.set(key, state.inventoryMap.get(key) + value.total);
    });
  }

  // 檢查庫存剩餘食材是否能夠滿足點餐的總消耗需求
  consumptionsMap.forEach((value, key) => {
    if (state.inventoryMap.get(key) < value.total) {
      // 剩餘食材能夠供應的最大餐點份數
      const maxCapacity = Math.floor(
        state.inventoryMap.get(key) / value.perServing
      );

      result.push({ name: key, maxCapacity });
    }
  });

  return result;
}

export const initialState = {
  // 存放訂單所有餐點數據
  orderList: [],
  // 臨時存放單一餐點細項選擇數據
  tempArray: [],
  totalConsumptions: new Map(),
  inventoryMap: new Map(),
};

export function reducer(state, action) {
  switch (action.type) {
    // 將所有的庫存數據暫時存放到state中
    case "inventory/remainingQuantity": {
      const newInventoryMap = new Map();

      action.payload.forEach((ingredient) => {
        const name = ingredient.value;
        const { remainingQuantity } = ingredient;
        newInventoryMap.set(name, remainingQuantity);
      });

      // 如果在點餐途中有發生庫存數據更新會自動重新獲取數據，所以要先減掉在orderList中已經使用的食材數量
      if (state.orderList.length !== 0) {
        state.orderList.forEach((dish) => {
          dish.consumptionsMap.forEach((value, key) => {
            newInventoryMap.set(key, newInventoryMap.get(key) - value.total);
          });
        });
      }

      return { ...state, inventoryMap: newInventoryMap };
    }
    // tempArray初始化
    case "init/tempArray/consumptionPerDish": {
      return { ...state, tempArray: [...action.payload] };
    }
    // 單選選項新增
    case "single/choice/insert": {
      const newStateArray = state.tempArray.map((item) =>
        item.customizeId === action.payload.customizeId
          ? { ...item, detail: [action.payload] }
          : item
      );
      return { ...state, tempArray: [...newStateArray] };
    }
    // 單選選項刪除(選填)
    case "single/choice/delete": {
      const newStateArray = state.tempArray.map((item) =>
        item.customizeId === action.payload.customizeId
          ? { ...item, detail: [] }
          : item
      );
      return { ...state, tempArray: [...newStateArray] };
    }
    // 多選選項新增
    case "multiple/choice/insert": {
      const newStateArray = state.tempArray.map((item) =>
        item.customizeId === action.payload.customizeId
          ? {
              ...item,
              detail: [...item.detail, action.payload],
            }
          : item
      );

      return { ...state, tempArray: [...newStateArray] };
    }
    // 多選選項刪除
    case "multiple/choice/delete": {
      const newStateArray = state.tempArray.map((item) =>
        item.customizeId === action.payload.customizeId
          ? {
              ...item,
              detail: item.detail.filter(
                (detail) => detail.optionLabel !== action.payload.optionLabel
              ),
            }
          : item
      );
      return { ...state, tempArray: [...newStateArray] };
    }
    // 計算本次點餐食材總消耗以及庫存是否充足
    case "compare/inventory": {
      const {
        ingredients,
        servings,
        originalConsumptionsMap = new Map(),
      } = action.payload;
      // 取得餐點食材總消耗與庫存比對結果
      const consumptionsMap = calcConsumptions(ingredients, servings, state);

      const result = compareInventory(
        originalConsumptionsMap,
        consumptionsMap,
        state
      );

      return { consumptionsMap, result };
    }
    // 將餐點數據新增到orderList中
    case "order/insert": {
      const newState = structuredClone(state);

      newState.orderList.push({
        orderId: state.orderList.length,
        ...action.payload,
        customizeDetail: state.tempArray,
      });

      // 將庫存食材 - 本次餐點所需食材
      action.payload.consumptionsMap.forEach((value, key) => {
        newState.inventoryMap.set(
          key,
          newState.inventoryMap.get(key) - value.total
        );
      });

      console.log(newState);
      return newState;
    }
    // 編輯餐點數據
    case "order/update": {
      const newState = structuredClone(state);

      // 更新數據
      newState.orderList[action.payload.orderId] = action.payload;

      // 將庫存食材 - 本次餐點所需食材
      action.payload.consumptionsMap.forEach((value, key) => {
        newState.inventoryMap.set(
          key,
          newState.inventoryMap.get(key) - value.total
        );
      });

      console.log(newState);
      return newState;
    }

    default:
      throw new Error("未知指令");
  }
}
