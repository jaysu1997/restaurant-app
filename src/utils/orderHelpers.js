// 這裡可能有不少函式之後可能要移到別的資料夾，因為這些函式並非全域通用
import { format, isValid, parse } from "date-fns";
import { zhTW } from "date-fns/locale";

// 生成訂單餐點uniqueId
export function generateDishItemId(dishes) {
  const newId = Math.random().toString(36).slice(2, -1);
  // 檢查ID是否會重複
  const idExists = dishes.some((dish) => dish.uniqueId === newId);

  if (idExists) {
    return generateDishItemId(dishes);
  }

  return newId;
}

// 統計餐點需要消耗的食材數量(1份)
export function calcIngredientsUsagePerServing(
  ingredients,
  currentCustomization
) {
  // 總食材消耗數據
  const ingredientsUsagePerServing = new Map();

  function addIngredientUsage(uuid, name, quantity) {
    const record = ingredientsUsagePerServing.get(uuid);
    ingredientsUsagePerServing.set(uuid, {
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
  currentCustomization.forEach((customize) => {
    const { selectOptions } = customize;
    if (selectOptions.length === 0) return;

    selectOptions.forEach((option) => {
      const { ingredientUuid: uuid, quantity, ingredientName: name } = option;

      // null代表此選項無額外食材消耗，所以跳過
      if (uuid === null) return;
      addIngredientUsage(uuid, name, quantity);
    });
  });

  return ingredientsUsagePerServing;
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
export function summarizeMealChoices(dish) {
  return dish.customize
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
export function calculateOrderSummary(order) {
  const { totalServings, totalPrice } = order.reduce(
    (acc, cur) => {
      acc.totalServings += cur.servings;
      acc.totalPrice += cur.servings * cur.itemTotalPrice;
      return acc;
    },
    { totalServings: 0, totalPrice: 0 }
  );

  return { totalServings, totalPrice };
}

// 檢查庫存剩餘數量是否充足
export function checkInventoryAvailability({
  ingredientsUsagePerServing,
  servings,
  inventoryMap,
  previousIngredientsUsage = null,
}) {
  const shortages = [];

  const currentIngredientUsage = getTotalIngredientsUsage(
    ingredientsUsagePerServing,
    servings
  );

  // 如果是更新已訂購點餐，先把之前消耗的食材補回去
  if (previousIngredientsUsage) {
    previousIngredientsUsage.forEach(({ name, quantity }, uuid) => {
      const ingredientData = currentIngredientUsage.get(uuid);
      const curQuantity = ingredientData ? ingredientData.quantity : 0;

      currentIngredientUsage.set(uuid, {
        name,
        quantity: curQuantity - quantity,
      });
    });
  }

  // 檢查庫存剩餘食材是否能夠滿足點餐的總消耗需求
  currentIngredientUsage.forEach(({ name, quantity }, uuid) => {
    const ingredientData = inventoryMap.get(uuid);
    // 避免某個食材被刪除之後庫存找不到對應數據(跳過就好)
    if (!ingredientData) return;

    const { remainingQuantity } = ingredientData;

    // 剩餘數量不足
    if (remainingQuantity < quantity) {
      // 之前預計要消耗的食材總數
      const previousUsage = previousIngredientsUsage
        ? previousIngredientsUsage.get(uuid).quantity
        : 0;
      // 當前設定下每1份需要消耗的食材數量
      const usagePerServing = ingredientsUsagePerServing.get(uuid).quantity;
      // 剩餘食材能夠供應的最大餐點份數
      const maxCapacity =
        remainingQuantity <= 0
          ? 0
          : Math.floor((remainingQuantity + previousUsage) / usagePerServing);

      shortages.push({ name, maxCapacity });
    }
  });

  return shortages;
}

// 整合要上傳的訂單數據
export function buildOrderData(dishes, data) {
  // 計算餐點總分數與總
  const { totalServings, totalPrice } = calculateOrderSummary(dishes);

  // 計算訂單的食材總共使用量
  const totalIngredientsUsage = Object.fromEntries(
    dishes.reduce((acc, dish) => {
      dish.ingredientsUsagePerServing.forEach(({ quantity, name }, uuid) => {
        const { quantity: curQuantity = 0 } = acc.get(uuid) || {};
        acc.set(uuid, {
          name,
          quantity: curQuantity + quantity * dish.servings,
        });
      });

      return acc;
    }, new Map())
  );

  const orderData = {
    ...data,
    dishes: dishes.map((dish) => ({
      ...dish,
      ingredientsUsagePerServing: Object.fromEntries(
        dish.ingredientsUsagePerServing
      ),
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

// 檢查日期searchParams是否格式正確(預防url手動更改後造成的格式錯誤問題)
export function safeParseDate(dateStr) {
  if (typeof dateStr !== "string") return undefined;
  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  return isValid(date) ? date : undefined;
}

// 計算總共要消耗的食材
export function getTotalIngredientsUsage(ingredientsUsagePerServing, servings) {
  const ingredientsUsage = new Map();

  ingredientsUsagePerServing.forEach(({ name, quantity }, uuid) => {
    ingredientsUsage.set(uuid, { name, quantity: quantity * servings });
  });

  return ingredientsUsage;
}

// 根據食材消耗需求，扣除庫存的數據
export function applyInventoryUsage({
  inventoryMap,
  ingredientsUsagePerServing,
  servings,
}) {
  ingredientsUsagePerServing.forEach(({ quantity, name }, uuid) => {
    const ingredientData = inventoryMap.get(uuid);
    // 避免某個食材被刪除之後庫存找不到對應數據(跳過就好)
    if (!ingredientData) return;

    const { remainingQuantity } = ingredientData;

    inventoryMap.set(uuid, {
      name,
      remainingQuantity: remainingQuantity - quantity * servings,
    });
  });
}

// 根據uniqueId尋找餐點在dishes中的索引值
export function findDishIndexById(dishes, uniqueId) {
  return dishes.findIndex((dish) => dish.uniqueId === uniqueId);
}
