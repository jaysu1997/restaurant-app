// 單筆訂單數據

export const initialState = {
  // 存放訂單所有餐點數據
  order: [],
  // 臨時存放單一餐點細項選擇數據
  tempArray: [],
  // 存放食材庫存數據
  inventoryMap: new Map(),
  // 存放個別餐點的ID
  dishIdList: [],
  // 當前使用此useReducer的頁面
  curOrderPage: "/menu",
  // 存放訂單原本食材消耗總量(OrderSummaryEdit需要)
  previousTotalIngredientsUsage: new Map(),
  tempServings: 1,
};

export function reducer(state, action) {
  switch (action.type) {
    case "page/setCurrent": {
      // 避免訂單更新建立和訂單編輯互相影響(因為是同一個useReducer + context api)
      const newState =
        action.payload === state.curOrderPage ? state : initialState;

      return { ...newState, curOrderPage: action.payload };
    }
    // 將所有的庫存數據暫時存放到state中
    case "inventory/setAll": {
      const newInventoryMap = new Map();

      action.payload.forEach((ingredient) => {
        const name = ingredient.value;
        const { remainingQuantity } = ingredient;
        newInventoryMap.set(name, remainingQuantity);
      });

      if (state.previousTotalIngredientsUsage.size > 0) {
        state.previousTotalIngredientsUsage.forEach((quantity, name) => {
          newInventoryMap.set(name, newInventoryMap.get(name) + quantity);
        });
      }

      // 如果在重新存入庫存數據的時候已經有訂單數據，則需要先把訂單使用到的食材扣除
      if (state.order.length !== 0) {
        state.order.forEach((order) => {
          order.ingredientsUsage.forEach((quantity, name) => {
            newInventoryMap.set(
              name,
              newInventoryMap.get(name) - quantity * order.servings
            );
          });
        });
      }

      console.log(newInventoryMap);
      return { ...state, inventoryMap: newInventoryMap };
    }
    // tempArray初始化
    case "tempArray/initCustomizeOptions": {
      return { ...state, tempArray: [...action.payload] };
    }
    // 單選選項新增
    case "tempArray/setSingleChoice": {
      const newStateArray = state.tempArray.map((item) =>
        item.customizeId === action.payload.customizeId
          ? { ...item, detail: [action.payload] }
          : item
      );

      return { ...state, tempArray: [...newStateArray] };
    }
    // 單選選項刪除
    case "tempArray/clearSingleChoice": {
      const newStateArray = state.tempArray.map((item) =>
        item.customizeId === action.payload.customizeId
          ? { ...item, detail: [] }
          : item
      );
      return { ...state, tempArray: [...newStateArray] };
    }
    // 多選選項新增
    case "tempArray/addMultipleChoice": {
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
    case "tempArray/removeMultipleChoice": {
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
    // 新增餐點
    case "order/addDish": {
      const orderData = action.payload;

      const newState = structuredClone(state);

      newState.order.push({
        ...orderData,
        customizeDetail: state.tempArray,
      });

      // 將庫存食材 - 本次餐點所需食材
      orderData.ingredientsUsage.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) - quantity * orderData.servings
        );
      });

      console.log(newState);
      return newState;
    }
    // 編輯餐點數據
    case "order/updateDish": {
      const { previousIngredientsUsage, ...orderData } = action.payload;
      const newState = structuredClone(state);
      const dishIndex = newState.order.findIndex(
        (dish) => dish.uniqueId === orderData.uniqueId
      );

      // 更新數據
      newState.order[dishIndex] = orderData;
      newState.order[dishIndex].customizeDetail = state.tempArray;

      // 先把原本消耗的所有食材加回庫存
      previousIngredientsUsage.usageMap.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) +
            quantity * previousIngredientsUsage.servings
        );
      });

      // 將庫存食材 - 本次餐點所需食材
      orderData.ingredientsUsage.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) - quantity * orderData.servings
        );
      });

      console.log(newState);
      return newState;
    }
    // 刪除指定餐點
    case "order/removeDish": {
      const newState = structuredClone(state);
      const dishIndex = newState.order.findIndex(
        (dish) => dish.uniqueId === action.payload
      );
      const orderingredientsUsage = newState.order[dishIndex].ingredientsUsage;
      const orderServings = newState.order[dishIndex].servings;

      // 把原本消耗的食材補回庫存
      orderingredientsUsage.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) + quantity * orderServings
        );
      });

      // 將指定餐點從點餐列表中移除
      newState.order.splice(dishIndex, 1);

      return newState;
    }
    // 更新餐點份數
    case "order/updateDishServings": {
      const { uniqueId, servings } = action.payload;
      const newState = structuredClone(state);
      const dishIndex = newState.order.findIndex(
        (dish) => dish.uniqueId === uniqueId
      );
      const dishData = newState.order[dishIndex];
      const servingsDiff = servings - dishData.servings;

      // 更新庫存剩餘存量(可增可減)
      dishData.ingredientsUsage.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) - quantity * servingsDiff
        );
      });

      // 更新餐點份數
      dishData.servings = servings;

      return newState;
    }
    // 清空整個order數據
    case "order/reset": {
      return initialState;
    }
    case "order/edit": {
      const orderData = action.payload.order.map((dish) => ({
        ...dish,
        ingredientsUsage: new Map(Object.entries(dish.ingredientsUsage)),
      }));

      const previousTotalIngredientsUsage = new Map(
        Object.entries(action.payload.totalIngredientsUsage)
      );

      return { ...state, order: orderData, previousTotalIngredientsUsage };
    }

    default:
      throw new Error("未知指令");
  }
}
