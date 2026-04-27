import { findItemIndexById, updateInventory } from "../../utils/orderHelpers";

// 單筆訂單數據建立與編輯useReducer
export const initialState = {
  // 存放訂單所有餐點數據
  items: [],
  // 臨時存放當前餐點自訂項目選擇數據
  activeCustomizations: [],
  // 存放食材庫存數據
  inventoryObj: {},
};

export function reducer(state, action) {
  switch (action.type) {
    // 將所有的庫存數據暫時存放到state中
    case "inventory/setAll": {
      return { ...state, inventoryObj: action.payload };
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
        item.customizationId === action.payload.customizationId
          ? { ...item, selectedOptions: [action.payload] }
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
        item.customizationId === action.payload.customizationId
          ? {
              ...item,
              selectedOptions: [...item.selectedOptions, action.payload],
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
        item.customizationId === action.payload.customizationId
          ? {
              ...item,
              selectedOptions: item.selectedOptions.filter(
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
      const { deltaUsage, ...itemData } = action.payload;

      return {
        ...state,
        items: [...state.items, itemData],
        inventoryObj: updateInventory(state.inventoryObj, deltaUsage),
      };
    }
    // 編輯餐點數據
    case "items/update": {
      const { deltaUsage, ...itemData } = action.payload;
      const index = findItemIndexById(state.items, itemData.uniqueId);
      // 如果找不到對應數據
      if (index === -1) return state;

      const newItems = [...state.items];
      newItems[index] = { ...state.items[index], ...itemData };

      return {
        ...state,
        items: newItems,
        inventoryObj: updateInventory(state.inventoryObj, deltaUsage),
      };
    }
    // 刪除指定餐點
    case "items/remove": {
      const index = findItemIndexById(state.items, action.payload);
      if (index === -1) return state;

      const { unitUsage, servings } = state.items[index];
      // 要退回的食材總數
      const delta = Object.fromEntries(
        Object.entries(unitUsage).map(([uuid, { name, quantity }]) => [
          uuid,
          { name, quantity: -quantity * servings },
        ]),
      );

      const newItems = [...state.items];
      newItems.splice(index, 1);

      return {
        ...state,
        items: newItems,
        inventoryObj: updateInventory(state.inventoryObj, delta),
      };
    }
    // 更新餐點份數
    case "items/updateServings": {
      const { uniqueId, servings } = action.payload;
      const index = findItemIndexById(state.items, uniqueId);
      if (index === -1) return state;

      const { unitUsage, servings: prevServings } = state.items[index];

      if (servings === prevServings) return state;

      // 份量變化更新
      const servingsDiff = servings - prevServings;
      const newItems = [...state.items];
      newItems[index] = { ...state.items[index], servings };
      // 變化所帶來的食材消耗差異
      const delta = Object.fromEntries(
        Object.entries(unitUsage).map(([uuid, { name, quantity }]) => [
          uuid,
          { name, quantity: quantity * servingsDiff },
        ]),
      );

      return {
        ...state,
        items: newItems,
        inventoryObj: updateInventory(state.inventoryObj, delta),
      };
    }
    // 清空整個order數據
    case "draft/reset": {
      return initialState;
    }
    // 編輯已建立訂單，需要先轉換數據格式以及紀錄訂單已消耗的食材
    case "draft/loadFromOrder": {
      return {
        ...state,
        items: action.payload,
      };
    }

    default:
      throw new Error("未知指令");
  }
}
