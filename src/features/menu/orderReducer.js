// 單筆訂單數據

export const initialState = {
  // 存放訂單所有餐點數據
  order: [],
  // 臨時存放單一餐點細項選擇數據
  tempArray: [],
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

      // 如果在點餐途中有發生庫存數據更新會自動重新獲取數據，所以要先減掉在order中已經使用的食材數量
      if (state.order.length !== 0) {
        state.order.forEach((order) => {
          order.ingredientUsageMap.forEach((value, key) => {
            newInventoryMap.set(
              key,
              newInventoryMap.get(key) - value * order.servings
            );
          });
        });
      }

      return { ...state, inventoryMap: newInventoryMap };
    }
    // tempArray初始化
    case "init/tempArray/coustomize": {
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
    // 將餐點數據新增到order中
    case "order/insert": {
      const orderData = action.payload;

      const newState = structuredClone(state);

      newState.order.push({
        itemId: state.order.length,
        ...orderData,
        customizeDetail: state.tempArray,
      });

      // 將庫存食材 - 本次餐點所需食材
      orderData.ingredientUsageMap.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) - quantity * orderData.servings
        );
      });

      console.log(newState);
      return newState;
    }
    // 編輯餐點數據
    case "order/update": {
      const { previousIngredientsUsage, ...orderData } = action.payload;
      const newState = structuredClone(state);

      // 更新數據
      newState.order[orderData.itemId] = orderData;
      newState.order[orderData.itemId].customizeDetail = state.tempArray;

      // 先把原本消耗的所有食材加回庫存
      previousIngredientsUsage.usageMap.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) +
            quantity * previousIngredientsUsage.servings
        );
      });

      // 將庫存食材 - 本次餐點所需食材
      orderData.ingredientUsageMap.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) - quantity * orderData.servings
        );
      });

      console.log(newState);
      return newState;
    }
    // 刪除指定餐點
    case "order/remove": {
      const newState = structuredClone(state);
      const orderIngredientUsage =
        newState.order[action.payload].ingredientUsageMap;
      const orderServings = newState.order[action.payload].servings;

      // 把原本消耗的食材補回庫存
      orderIngredientUsage.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) + quantity * orderServings
        );
      });

      // 將指定餐點從點餐列表中移除
      newState.order.splice(action.payload, 1);
      // 記得修改在指定餐點之後的餐點itemId，避免更新餐點份數時出錯
      newState.order.map((order) => {
        if (order.itemId < action.payload) {
          return order;
        }

        order.itemId -= 1;
        return order;
      });

      return newState;
    }
    // 更新餐點份數
    case "serving/update": {
      const { itemId, servings } = action.payload;
      const orderData = state.order[itemId];
      const servingsDiff = servings - orderData.servings;
      const newState = structuredClone(state);

      // 更新庫存剩餘存量(可增可減)
      orderData.ingredientUsageMap.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) - quantity * servingsDiff
        );
      });

      // 更新餐點份數
      newState.order[itemId].servings = servings;

      return newState;
    }
    // 清空整個order數據
    case "order/clear": {
      return initialState;
    }

    default:
      throw new Error("未知指令");
  }
}
