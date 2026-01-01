// 單筆訂單數據建立與編輯useReducer
export const initialState = {
  // 存放訂單所有餐點數據
  dishes: [],
  // 臨時存放當前餐點自訂項目選擇數據
  currentCustomization: [],
  // 存放食材庫存數據
  inventoryMap: new Map(),
};

export function reducer(state, action) {
  switch (action.type) {
    // 將所有的庫存數據暫時存放到state中
    case "inventory/setAll": {
      const newInventoryMap = new Map();

      action.payload.forEach((ingredient) => {
        const { uuid, remainingQuantity } = ingredient;
        newInventoryMap.set(uuid, remainingQuantity);
      });

      return { ...state, inventoryMap: newInventoryMap };
    }
    // OrderForm初始化
    case "orderForm/init": {
      return {
        ...state,
        currentCustomization: [...action.payload],
      };
    }
    // 單選選項新增
    case "currentCustomization/setSingleChoice": {
      const newCurDishCustomizeOption = state.currentCustomization.map((item) =>
        item.customizeId === action.payload.customizeId
          ? { ...item, selectedOptions: [action.payload] }
          : item
      );

      return {
        ...state,
        currentCustomization: [...newCurDishCustomizeOption],
      };
    }
    // 多選選項新增
    case "currentCustomization/addMultipleChoice": {
      const newCurDishCustomizeOption = state.currentCustomization.map((item) =>
        item.customizeId === action.payload.customizeId
          ? {
              ...item,
              selectedOptions: [...item.selectedOptions, action.payload],
            }
          : item
      );

      return {
        ...state,
        currentCustomization: [...newCurDishCustomizeOption],
      };
    }
    // 多選選項刪除
    case "currentCustomization/removeMultipleChoice": {
      const newCurDishCustomizeOption = state.currentCustomization.map((item) =>
        item.customizeId === action.payload.customizeId
          ? {
              ...item,
              selectedOptions: item.selectedOptions.filter(
                (option) => option.optionLabel !== action.payload.optionLabel
              ),
            }
          : item
      );
      return {
        ...state,
        currentCustomization: [...newCurDishCustomizeOption],
      };
    }
    // 新增餐點
    case "dishes/addDish": {
      const dishData = action.payload;
      const newState = structuredClone(state);

      newState.dishes.push({
        ...dishData,
        customizeDetail: state.currentCustomization,
      });

      // 將庫存食材 - 本次餐點所需食材
      dishData.ingredientsUsage.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) - quantity * dishData.servings
        );
      });

      console.log(newState);

      return newState;
    }
    // 編輯餐點數據
    case "dishes/updateDish": {
      const { dishData, previousIngredientsUsage } = action.payload;
      const newState = structuredClone(state);
      const dishIndex = newState.dishes.findIndex(
        (dish) => dish.uniqueId === dishData.uniqueId
      );

      // 更新數據
      newState.dishes[dishIndex] = dishData;
      newState.dishes[dishIndex].customizeDetail = state.currentCustomization;

      // 先把原本消耗的所有食材加回庫存
      previousIngredientsUsage.usageMap.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) +
            quantity * previousIngredientsUsage.servings
        );
      });

      // 將庫存食材 - 本次餐點所需食材
      dishData.ingredientsUsage.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) - quantity * dishData.servings
        );
      });

      console.log(newState);
      return newState;
    }
    // 刪除指定餐點
    case "dishes/removeDish": {
      const newState = structuredClone(state);
      const dishIndex = newState.dishes.findIndex(
        (dish) => dish.uniqueId === action.payload
      );
      const dishingredientsUsage = newState.dishes[dishIndex].ingredientsUsage;
      const dishServings = newState.dishes[dishIndex].servings;

      // 把原本消耗的食材補回庫存
      dishingredientsUsage.forEach((quantity, name) => {
        newState.inventoryMap.set(
          name,
          newState.inventoryMap.get(name) + quantity * dishServings
        );
      });

      // 將指定餐點從點餐列表中移除
      newState.dishes.splice(dishIndex, 1);

      return newState;
    }
    // 更新餐點份數
    case "dishes/updateDishServings": {
      const { uniqueId, servings } = action.payload;
      const newState = structuredClone(state);
      const dishIndex = newState.dishes.findIndex(
        (dish) => dish.uniqueId === uniqueId
      );
      const dishData = newState.dishes[dishIndex];
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
    // 編輯已建立訂單，需要先轉換數據格式以及紀錄訂單已消耗的食材
    case "order/edit": {
      const { dishes } = action.payload;

      const dishesData = dishes.map((curDish) => ({
        ...curDish,
        ingredientsUsage: new Map(Object.entries(curDish.ingredientsUsage)),
      }));

      return {
        ...state,
        dishes: dishesData,
      };
    }

    default:
      throw new Error("未知指令");
  }
}
