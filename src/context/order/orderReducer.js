import {
  applyInventoryUsage,
  findDishIndexById,
} from "../../utils/orderHelpers";

// 單筆訂單數據建立與編輯useReducer
export const initialState = {
  // 存放訂單所有餐點數據
  dishes: [],
  // 臨時存放當前餐點自訂項目選擇數據
  activeCustomization: [],
  // 存放食材庫存數據
  inventoryMap: new Map(),
};

export function reducer(state, action) {
  switch (action.type) {
    // 將所有的庫存數據暫時存放到state中
    case "inventory/setAll": {
      const newInventoryMap = new Map();

      action.payload.forEach((ingredient) => {
        const { uuid, value, remainingQuantity } = ingredient;
        newInventoryMap.set(uuid, { name: value, remainingQuantity });
      });

      return { ...state, inventoryMap: newInventoryMap };
    }
    // OrderForm初始化
    case "orderForm/init": {
      return {
        ...state,
        activeCustomization: [...action.payload],
      };
    }
    // 單選選項新增
    case "activeCustomization/setSingleChoice": {
      const newCurDishCustomizeOption = state.activeCustomization.map((item) =>
        item.customizeId === action.payload.customizeId
          ? { ...item, selectOptions: [action.payload] }
          : item,
      );

      return {
        ...state,
        activeCustomization: [...newCurDishCustomizeOption],
      };
    }
    // 多選選項新增
    case "activeCustomization/addMultipleChoice": {
      const newCurDishCustomizeOption = state.activeCustomization.map((item) =>
        item.customizeId === action.payload.customizeId
          ? {
              ...item,
              selectOptions: [...item.selectOptions, action.payload],
            }
          : item,
      );

      return {
        ...state,
        activeCustomization: [...newCurDishCustomizeOption],
      };
    }
    // 選項刪除
    case "activeCustomization/removeChoice": {
      const newCurDishCustomizeOption = state.activeCustomization.map((item) =>
        item.customizeId === action.payload.customizeId
          ? {
              ...item,
              selectOptions: item.selectOptions.filter(
                (option) => option.optionId !== action.payload.optionId,
              ),
            }
          : item,
      );
      return {
        ...state,
        activeCustomization: [...newCurDishCustomizeOption],
      };
    }
    // 新增餐點
    case "dishes/addDish": {
      const dishData = action.payload;
      const { unitUsage, servings } = dishData;
      const newState = structuredClone(state);

      // 新增餐點
      newState.dishes.push({
        ...dishData,
        customize: state.activeCustomization,
      });

      // 將庫存食材 - 本次餐點所需食材
      applyInventoryUsage({
        inventoryMap: newState.inventoryMap,
        unitUsage,
        servings,
      });

      return newState;
    }
    // 編輯餐點數據
    case "dishes/updateDish": {
      const { dishData, prevTotalUsage } = action.payload;
      const { unitUsage, servings, uniqueId } = dishData;
      const newState = structuredClone(state);

      const dishIndex = findDishIndexById(newState.dishes, uniqueId);

      // 更新數據
      newState.dishes[dishIndex] = dishData;
      newState.dishes[dishIndex].customize = state.activeCustomization;

      // 先把原本消耗的所有食材加回庫存
      applyInventoryUsage({
        inventoryMap: newState.inventoryMap,
        unitUsage: prevTotalUsage,
        servings: -1,
      });

      // 將庫存食材 - 本次餐點所需食材
      applyInventoryUsage({
        inventoryMap: newState.inventoryMap,
        unitUsage,
        servings,
      });

      return newState;
    }
    // 刪除指定餐點
    case "dishes/removeDish": {
      const newState = structuredClone(state);
      const dishIndex = findDishIndexById(newState.dishes, action.payload);

      const { unitUsage, servings } = newState.dishes[dishIndex];

      // 把原本消耗的所有食材加回庫存
      applyInventoryUsage({
        inventoryMap: newState.inventoryMap,
        unitUsage,
        servings: -servings,
      });

      // 將指定餐點從點餐列表中移除
      newState.dishes.splice(dishIndex, 1);

      return newState;
    }
    // 更新餐點份數
    case "dishes/updateDishServings": {
      const { uniqueId, servings } = action.payload;
      const newState = structuredClone(state);
      const dishIndex = findDishIndexById(newState.dishes, uniqueId);

      const orderDish = newState.dishes[dishIndex];
      const servingsDiff = servings - orderDish.servings;

      // 更新庫存剩餘存量(可增可減)
      applyInventoryUsage({
        inventoryMap: newState.inventoryMap,
        unitUsage: orderDish.unitUsage,
        servings: servingsDiff,
      });

      // 更新餐點份數
      orderDish.servings = servings;

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
        unitUsage: new Map(Object.entries(curDish.unitUsage)),
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
