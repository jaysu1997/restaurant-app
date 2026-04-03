// 這裡可能有不少函式之後可能要移到別的資料夾，因為這些函式並非全域通用
import { format, isValid, parseISO } from "date-fns";
import { zhTW } from "date-fns/locale";

// 生成訂單餐點uniqueId
export function generateDishItemId(items) {
  const newId = Math.random().toString(36).slice(2, -1);
  // 檢查ID是否會重複
  const idExists = items.some((item) => item.uniqueId === newId);

  if (idExists) {
    return generateDishItemId(items);
  }

  return newId;
}

// 統計餐點需要消耗的食材數量(1份)
export function calcIngredientsUsage(orderDish, activeCustomization) {
  const { ingredients } = orderDish;
  // 總食材消耗數據
  const unitUsage = new Map();

  function addIngredientUsage(uuid, name, quantity) {
    const record = unitUsage.get(uuid);
    unitUsage.set(uuid, {
      name: record?.name || name,
      quantity: (record?.quantity ?? 0) + quantity,
    });
  }

  // 餐點本身的消耗
  ingredients.forEach((ing) => {
    const { uuid, value: name } = ing.ingredient;
    const quantity = ing.quantity;

    addIngredientUsage(uuid, name, quantity);
  });

  // 額外項目增加的消耗
  activeCustomization.forEach((customize) => {
    const { selectOptions } = customize;
    if (selectOptions.length === 0) return;

    selectOptions.forEach((option) => {
      const { ingredient, quantity } = option;

      // 沒有uuid代表此選項無額外食材消耗，所以跳過
      if (!ingredient?.uuid) return;

      const { uuid, value: name } = ingredient;
      addIngredientUsage(uuid, name, quantity);
    });
  });

  return unitUsage;
}

// 將訂單建立時間格式化
export function formatCreatedTime(createdTime) {
  return format(new Date(createdTime), "yyyy年MM月dd日 HH:mm", {
    locale: zhTW,
  });
}

// 訂單編號格式化
export function formatPickupNumber(pickupNumber) {
  return `# ${String(pickupNumber).padStart(4, "0")}`;
}

// 訂單單一餐點的所有自訂項目選擇彙整
export function summarizeMealChoices(item) {
  return item.customize
    .reduce((acc, cur) => {
      if (cur.selectOptions.length === 0) return acc;

      cur.selectOptions.forEach((curOption) => {
        acc.push(curOption.optionLabel);
      });

      return acc;
    }, [])
    .join(", ");
}

// 計算訂單的總份數和總金額
export function calculateOrderSummary(items) {
  const { totalServings, totalPrice } = items.reduce(
    (acc, cur) => {
      acc.totalServings += cur.servings;
      acc.totalPrice += cur.servings * cur.unitPrice;
      return acc;
    },
    { totalServings: 0, totalPrice: 0 },
  );

  return { totalServings, totalPrice };
}

// 檢查庫存是否可供應本次點餐
export function checkInventoryAvailability({
  unitUsage,
  servings,
  inventoryMap,
  prevTotalUsage = null,
}) {
  // 計算目前設定下的總消耗
  const curTotalUsage = getTotalIngredientsUsage(unitUsage, servings);

  // 編輯模式：先把原本已消耗的食材補回來
  if (prevTotalUsage) {
    prevTotalUsage.forEach(({ name, quantity }, uuid) => {
      const current = curTotalUsage.get(uuid);
      const currentQuantity = current ? current.quantity : 0;

      curTotalUsage.set(uuid, {
        name,
        quantity: currentQuantity - quantity,
      });
    });
  }

  /* ---------- ① 檢查食材是否存在 ---------- */

  const missingIngredients = [];

  curTotalUsage.forEach(({ name }, uuid) => {
    if (!inventoryMap.has(uuid)) {
      missingIngredients.push(name);
    }
  });

  if (missingIngredients.length > 0) {
    return {
      isAvailable: false,
      title: "食材不存在",
      message: `以下食材不存在：\n ${missingIngredients.join("、")}。`,
    };
  }

  /* ---------- ② 檢查庫存是否充足 ---------- */

  const shortages = [];
  let maxAvailableServings = Infinity;

  curTotalUsage.forEach(({ name, quantity }, uuid) => {
    const { remainingQuantity } = inventoryMap.get(uuid);

    if (remainingQuantity < quantity) {
      shortages.push(name);

      const previousUsage = prevTotalUsage
        ? (prevTotalUsage.get(uuid)?.quantity ?? 0)
        : 0;

      const usagePerServing = unitUsage.get(uuid).quantity;

      const ingredientMaxCapacity = Math.max(
        0,
        Math.floor((remainingQuantity + previousUsage) / usagePerServing),
      );

      maxAvailableServings = Math.min(
        maxAvailableServings,
        ingredientMaxCapacity,
      );
    }
  });

  if (shortages.length > 0) {
    return {
      isAvailable: false,
      title: `庫存不足（最多供應 ${maxAvailableServings} 份）`,
      message: `以下食材庫存不足：\n ${shortages.join("、")}。`,
    };
  }

  /* ---------- ③ 庫存充足 ---------- */

  return {
    isAvailable: true,
  };
}

// 整合要上傳的訂單數據
export function buildOrderData(items, data) {
  // 計算餐點總分數與總
  const { totalServings, totalPrice } = calculateOrderSummary(items);

  // 計算訂單的食材總共使用量
  const totalIngredientsUsage = Object.fromEntries(
    items.reduce((acc, item) => {
      item.unitUsage.forEach(({ quantity, name }, uuid) => {
        const { quantity: curQuantity = 0 } = acc.get(uuid) || {};
        acc.set(uuid, {
          name,
          quantity: curQuantity + quantity * item.servings,
        });
      });

      return acc;
    }, new Map()),
  );

  const orderData = {
    ...data,
    items: items.map((item) => ({
      ...item,
      unitUsage: Object.fromEntries(item.unitUsage),
    })),
    totalServings,
    totalPrice,
    totalIngredientsUsage,
    tableNumber: data.tableNumber?.value || null,
    pickupTime: data.pickupTime?.value || null,
    paid: data.paid?.value || "未付款",
    status: data.status?.value || "準備中",
  };

  return orderData;
}

// 解析日期篩選條件(searchParams)
export function parseDateRange(searchParams) {
  const createdTimeParams = searchParams.get("createdTime");

  // 預防無value和錯誤的searchParams url
  if (!createdTimeParams) return null;

  const parts = createdTimeParams.split("_");

  if (parts.length !== 2) return null;

  const [fromStr, toStr] = parts;
  const fromDate = parseISO(fromStr);
  const toDate = parseISO(toStr);

  if (!isValid(fromDate) || !isValid(toDate)) return null;

  // 回傳日期物件
  return {
    from: fromDate,
    to: toDate,
  };
}

// 計算總共要消耗的食材
export function getTotalIngredientsUsage(unitUsage, servings) {
  const totalIngredientsUsage = new Map();

  unitUsage.forEach(({ name, quantity }, uuid) => {
    totalIngredientsUsage.set(uuid, { name, quantity: quantity * servings });
  });

  return totalIngredientsUsage;
}

// 根據食材消耗需求，扣除/補回庫存的數據
export function applyInventoryUsage({ inventoryMap, unitUsage, servings }) {
  unitUsage.forEach(({ quantity, name }, uuid) => {
    const ingredientData = inventoryMap.get(uuid);
    // 避免某個食材被刪除之後庫存找不到對應數據(跳過就好，不會影響到supabase的庫存數據)
    if (!ingredientData) return;

    const { remainingQuantity } = ingredientData;

    inventoryMap.set(uuid, {
      name,
      remainingQuantity: remainingQuantity - quantity * servings,
    });
  });
}

// 根據uniqueId尋找餐點在items中的索引值
export function findItemIndexById(items, uniqueId) {
  return items.findIndex((item) => item.uniqueId === uniqueId);
}

// 計算當前訂購餐點的單價(1份)
export function calcUnitPrice(customizations, orderDish) {
  const { price, discount } = orderDish;

  const unitPrice = customizations.reduce((acc, cur) => {
    const extra = cur.selectOptions.reduce(
      (sum, opt) => sum + opt.extraPrice,
      0,
    );
    return acc + extra;
  }, price - discount);

  return unitPrice;
}
