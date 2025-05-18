import { addMinutes, isBefore, format, setMinutes, setHours } from "date-fns";
import { zhTW } from "date-fns/locale";

// 將訂單建立時間格式化
function formatCreatedTime(createdTime) {
  return format(new Date(createdTime), "yyyy年MM月dd日 HH:mm", {
    locale: zhTW,
  });
}

// 訂單編號格式化
function formatPickupNumber(pickupNumber) {
  return `# ${String(pickupNumber).padStart(3, "0")}`;
}

// 訂單單一餐點的所有自訂細項選擇彙整
function summarizeMealChoices(order) {
  return order.customizeDetail
    .reduce((acc, cur) => {
      if (cur.detail.length === 0) return acc;

      acc.push(cur.detail.map((detail) => detail.optionLabel));

      return acc;
    }, [])
    .join(", ");
}

// 計算訂單的總份數和總金額
function calculateOrderSummary(order) {
  const { totalQuantity, totalCost } = order.reduce(
    (acc, cur) => {
      acc.totalQuantity += cur.servings;
      acc.totalCost += cur.servings * cur.itemTotalPrice;
      return acc;
    },
    { totalQuantity: 0, totalCost: 0 }
  );

  return { totalQuantity, totalCost };
}

// 生成外帶取餐時間
function generatePickupTimes(startTime, endTime) {
  const result = [];

  const now = addMinutes(new Date(), 20);

  const parseTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":").map(Number);
    const date = new Date();
    return setMinutes(setHours(date, hour), minute);
  };

  let start = parseTime(startTime);
  const end = parseTime(endTime);

  // 如果 start 比 20 分鐘後還早，就從 20 分鐘後的時間開始
  if (isBefore(start, now)) {
    const roundedMinutes = Math.ceil(now.getMinutes() / 5) * 5;
    start = setMinutes(now, roundedMinutes);
  }

  while (!isBefore(end, start)) {
    const timeStr = format(start, "HH:mm");
    result.push({ label: timeStr, value: timeStr });
    start = addMinutes(start, 5);
  }

  return result;
}

// 內用桌號選項生成
function generateTableNumbers(count) {
  return Array.from({ length: count }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1),
  }));
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
function buildOrderData(order, data) {
  // 計算訂單的食材總共使用量
  const totalIngredientsUsage = Object.fromEntries(
    order.reduce((acc, order) => {
      order.ingredientsUsage.forEach((quantity, name) => {
        const curQuantity = acc.get(name) || 0;
        acc.set(name, curQuantity + quantity * order.servings);
      });

      return acc;
    }, new Map())
  );

  const orderData = {
    ...data,
    order: order.map((dish) => ({
      ...dish,
      ingredientsUsage: Object.fromEntries(dish.ingredientsUsage),
    })),
    totalIngredientsUsage,
    tableNumber: data.tableNumber?.value || null,
    pickupTime: data.pickupTime?.value || null,
    paid: data.paid?.value || "未付款",
    status: data.status?.value || "準備中",
  };

  return orderData;
}

export {
  formatCreatedTime,
  formatPickupNumber,
  calculateOrderSummary,
  summarizeMealChoices,
  generatePickupTimes,
  generateTableNumbers,
  compareInventory,
  buildOrderData,
};
