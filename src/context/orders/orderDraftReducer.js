import {
  applyInventoryUsage,
  findItemIndexById,
} from "../../utils/orderHelpers";

// 單筆訂單數據建立與編輯useReducer
export const initialState = {
  // 存放訂單所有餐點數據
  items: [],
  // 臨時存放當前餐點自訂項目選擇數據
  activeCustomizations: [],
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
    case "customization/init": {
      return {
        ...state,
        activeCustomizations: [...action.payload],
      };
    }
    // 單選選項新增
    case "customization/setSingle": {
      const updatedCustomizations = state.activeCustomizations.map((item) =>
        item.customizeId === action.payload.customizeId
          ? { ...item, selectOptions: [action.payload] }
          : item,
      );

      return {
        ...state,
        activeCustomizations: [...updatedCustomizations],
      };
    }
    // 多選選項新增
    case "customization/addOption": {
      const updatedCustomizations = state.activeCustomizations.map((item) =>
        item.customizeId === action.payload.customizeId
          ? {
              ...item,
              selectOptions: [...item.selectOptions, action.payload],
            }
          : item,
      );

      return {
        ...state,
        activeCustomizations: [...updatedCustomizations],
      };
    }
    // 選項刪除
    case "customization/removeOption": {
      const updatedCustomizations = state.activeCustomizations.map((item) =>
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
        activeCustomizations: [...updatedCustomizations],
      };
    }
    // 新增餐點
    case "items/add": {
      const itemData = action.payload;
      const { unitUsage, servings } = itemData;
      const newState = structuredClone(state);

      // 新增餐點
      newState.items.push({
        ...itemData,
        customize: state.activeCustomizations,
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
    case "items/update": {
      const { itemData, prevTotalUsage } = action.payload;
      const { unitUsage, servings, uniqueId } = itemData;
      const newState = structuredClone(state);

      const itemIndex = findItemIndexById(newState.items, uniqueId);

      // 更新數據
      newState.items[itemIndex] = itemData;
      newState.items[itemIndex].customize = state.activeCustomizations;

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
    case "items/remove": {
      const newState = structuredClone(state);
      const itemIndex = findItemIndexById(newState.items, action.payload);

      const { unitUsage, servings } = newState.items[itemIndex];

      // 把原本消耗的所有食材加回庫存
      applyInventoryUsage({
        inventoryMap: newState.inventoryMap,
        unitUsage,
        servings: -servings,
      });

      // 將指定餐點從點餐列表中移除
      newState.items.splice(itemIndex, 1);

      return newState;
    }
    // 更新餐點份數
    case "items/updateServings": {
      const { uniqueId, servings } = action.payload;
      const newState = structuredClone(state);
      const itemIndex = findItemIndexById(newState.items, uniqueId);

      const item = newState.items[itemIndex];
      const servingsDiff = servings - item.servings;

      // 更新庫存剩餘存量(可增可減)
      applyInventoryUsage({
        inventoryMap: newState.inventoryMap,
        unitUsage: item.unitUsage,
        servings: servingsDiff,
      });

      // 更新餐點份數
      item.servings = servings;

      return newState;
    }
    // 清空整個order數據
    case "draft/reset": {
      return initialState;
    }
    // 編輯已建立訂單，需要先轉換數據格式以及紀錄訂單已消耗的食材
    case "draft/loadFromOrder": {
      const { items } = action.payload;

      const itemsData = items.map((item) => ({
        ...item,
        unitUsage: new Map(Object.entries(item.unitUsage)),
      }));

      return {
        ...state,
        items: itemsData,
      };
    }

    default:
      throw new Error("未知指令");
  }
}
