// 這裡可能有不少函式之後可能要移到別的資料夾，因為這些函式並非全域通用
import {
  addMinutes,
  isBefore,
  format,
  setMinutes,
  setHours,
  isValid,
  parse,
} from "date-fns";
import { zhTW } from "date-fns/locale";

// 將訂單建立時間格式化
function formatCreatedTime(createdTime) {
  return format(new Date(createdTime), "yyyy年MM月dd日 HH:mm", {
    locale: zhTW,
  });
}

// 訂單編號格式化
function formatPickupNumber(pickupNumber) {
  return `# ${String(pickupNumber).padStart(4, "0")}`;
}

// 訂單單一餐點的所有自訂細項選擇彙整
function summarizeMealChoices(dish) {
  return dish.customizeDetail
    .reduce((acc, cur) => {
      if (cur.detail.length === 0) return acc;

      acc.push(cur.detail.map((detail) => detail.optionLabel));

      return acc;
    }, [])
    .join(", ");
}

// 計算訂單的總份數和總金額
function calculateOrderSummary(order) {
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

// 整合要上傳的訂單數據
function buildOrderData(dishes, data) {
  // 計算餐點總分數與總
  const { totalServings, totalPrice } = calculateOrderSummary(dishes);

  // 計算訂單的食材總共使用量
  const totalIngredientsUsage = Object.fromEntries(
    dishes.reduce((acc, dish) => {
      dish.ingredientsUsage.forEach((quantity, name) => {
        const curQuantity = acc.get(name) || 0;
        acc.set(name, curQuantity + quantity * dish.servings);
      });

      return acc;
    }, new Map())
  );

  const orderData = {
    ...data,
    dishes: dishes.map((dish) => ({
      ...dish,
      ingredientsUsage: Object.fromEntries(dish.ingredientsUsage),
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

// 驗證是否為正整數(否則回傳預設值)
function isValidPositiveInteger(value, defaultValue = 1) {
  return /^[1-9]\d*$/.test(value) ? Number(value) : defaultValue;
}

// 檢查日期searchParams是否格式正確(預防url手動更改後造成的格式錯誤問題)
function safeParseDate(dateStr) {
  if (typeof dateStr !== "string") return undefined;
  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  return isValid(date) ? date : undefined;
}

export {
  formatCreatedTime,
  formatPickupNumber,
  calculateOrderSummary,
  summarizeMealChoices,
  compareInventory,
  buildOrderData,
  isValidPositiveInteger,
  safeParseDate,
};
