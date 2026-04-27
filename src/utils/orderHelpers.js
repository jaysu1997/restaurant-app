// 這裡可能有不少函式之後可能要移到別的資料夾，因為這些函式並非全域通用
import { format, isValid, parseISO } from "date-fns";
import { zhTW } from "date-fns/locale";

// 將訂單建立時間格式化
export function formatCreatedTime(createdAt) {
  return format(new Date(createdAt), "yyyy年MM月dd日 HH:mm", {
    locale: zhTW,
  });
}

// 訂單編號格式化
export function formatPickupNumber(pickupNumber) {
  return `# ${String(pickupNumber).padStart(4, "0")}`;
}

// 訂單單一餐點的所有自訂項目選擇彙整
export function summarizeMealChoices(item) {
  return item.customizations
    .reduce((acc, cur) => {
      if (cur.selectedOptions.length === 0) return acc;

      cur.selectedOptions.forEach((curOption) => {
        acc.push(curOption.name);
      });

      return acc;
    }, [])
    .join(", ");
}

// 計算訂單的總份數和總金額
// 這也是換個位置
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

// 整合要上傳的訂單數據
// 這也是換個位置
export function buildOrderData(items, data) {
  // 計算餐點總分數與總
  const { totalServings, totalPrice } = calculateOrderSummary(items);

  const orderData = {
    ...data,
    items: items.map((item) => ({
      ...item,
      unitUsage: Object.entries(item.unitUsage || {}).map(([uuid, value]) => ({
        uuid,
        ...value,
      })),
    })),
    totalServings,
    totalPrice,
    tableNumber: data.tableNumber?.value ?? null,
    pickupTime: data.pickupTime?.value ?? null,
    paid: data.paid?.value ?? "未付款",
    status: data.status?.value ?? "準備中",
  };

  return orderData;
}

// 解析日期篩選條件(searchParams)
// 這個應該要換位置
export function parseDateRange(searchParams) {
  const createdTimeParams = searchParams.get("createdAt");

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

// 根據uniqueId尋找餐點在items中的索引值
export function findItemIndexById(items, uniqueId) {
  return items.findIndex((item) => item.uniqueId === uniqueId);
}

// 處理訂購餐點數據(檢查庫存是否充足、整理提交數據)
export function prepareOrderItem({
  orderDish,
  activeCustomizations,
  inventoryObj,
  servings,
  isEdit,
}) {
  const usageResult = buildUsage({
    orderDish,
    activeCustomizations,
    inventoryObj,
    servings,
    isEdit,
  });

  if (!usageResult.isAvailable) return usageResult;

  const { unit, delta } = usageResult;

  const stockResult = checkStock({
    unit,
    delta,
    inventoryObj,
    orderDish,
  });

  if (!stockResult.isAvailable) return stockResult;

  return {
    isAvailable: true,
    error: null,
    data: {
      ...orderDish,
      unitUsage: unit,
      deltaUsage: delta,
      uniqueId: getId(orderDish),
      unitPrice: calcUnitPrice(orderDish, activeCustomizations),
    },
  };
}

// 計算當前1份的食材消耗以及預計會對庫存造成的變化
function buildUsage({
  orderDish,
  activeCustomizations,
  inventoryObj,
  servings,
  isEdit,
}) {
  // 單一份消耗
  const unit = {};
  // 預計對庫存造成的變化總量(多退少補)
  const delta = {};

  const acc = (obj, key, name, delta) => {
    const prev = obj[key]?.quantity ?? 0;
    obj[key] = { name, quantity: prev + delta };
  };

  const ingredients = [
    ...orderDish.ingredients,
    ...activeCustomizations.flatMap((c) => c.selectedOptions),
  ];

  for (const { ingredient, quantity } of ingredients) {
    if (ingredient === null) continue;

    const exist = Object.hasOwn(inventoryObj, ingredient);

    if (!exist) {
      return {
        isAvailable: false,
        error: {
          title: "餐點內容已更新",
          message: "部分食材已變更，請重新選擇此餐點",
        },
        data: null,
      };
    }

    const { name } = inventoryObj[ingredient];

    acc(unit, ingredient, name, quantity);
    acc(delta, ingredient, name, quantity * servings);
  }

  // 編輯狀態下要把之前消耗的食材退回去
  if (isEdit) {
    const prevUsageArray = Object.entries(orderDish.unitUsage || {});

    for (const [key, value] of prevUsageArray) {
      const exist = Object.hasOwn(inventoryObj, key);
      if (!exist) continue;

      const { name } = inventoryObj[key];
      acc(delta, key, name, -value.quantity * orderDish.servings);
    }
  }

  return { isAvailable: true, unit, delta };
}

// 檢查庫存是否能夠支援預計的消耗需求
function checkStock({ unit, delta, inventoryObj, orderDish }) {
  const shortages = { list: [], max: Infinity };

  const prevUsage = orderDish.unitUsage || {};
  const prevServings = orderDish.servings || 0;

  const deltaArray = Object.entries(delta);

  for (const [key, { name, quantity: deltaQty }] of deltaArray) {
    const item = inventoryObj[key];
    if (!item) continue;

    const { remainingQuantity } = item;

    if (deltaQty > remainingQuantity) {
      shortages.list.push(name);

      const unitQty = unit[key]?.quantity ?? 0;
      const prevQty = prevUsage[key]?.quantity ?? 0;
      const available = remainingQuantity + prevQty * prevServings;

      if (!unitQty) continue;
      const max = Math.floor(available / unitQty);
      shortages.max = Math.min(shortages.max, max);
    }
  }

  // 如果有短缺的話
  if (shortages.list.length > 0) {
    return {
      isAvailable: false,
      error: {
        title: `庫存不足（最多供應 ${shortages.max} 份）`,
        message: `以下食材庫存不足：\n ${shortages.list.join("、")}`,
      },
      data: null,
    };
  }

  return { isAvailable: true };
}

// 設定專屬id
function getId(orderDish) {
  return (
    orderDish.uniqueId ||
    Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
  );
}

// 計算1份的售價
function calcUnitPrice(orderDish, activeCustomizations) {
  const base = orderDish.basePrice - orderDish.discount;

  const extra = activeCustomizations.reduce(
    (sum, cur) =>
      sum + cur.selectedOptions.reduce((s, opt) => s + opt.extraPrice, 0),
    0,
  );

  return base + extra;
}

// 扣除將預計消耗的食材總數
export function updateInventory(inventoryObj, deltaUsage) {
  return Object.entries(deltaUsage).reduce(
    (acc, [uuid, { quantity }]) => {
      const item = acc[uuid];
      if (!item) return acc;

      acc[uuid] = {
        ...item,
        remainingQuantity: item.remainingQuantity - quantity,
      };

      return acc;
    },
    { ...inventoryObj },
  );
}
