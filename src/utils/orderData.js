export function summarizeMealChoices(item) {
  return item.customizations
    .reduce((choices, customization) => {
      if (customization.selectedOptions.length === 0) return choices;

      customization.selectedOptions.forEach((option) => {
        choices.push(option.name);
      });

      return choices;
    }, [])
    .join(", ");
}

export function calculateOrderSummary(items) {
  return items.reduce(
    (summary, item) => {
      summary.totalServings += item.servings;
      summary.totalAmount += item.servings * item.unitPrice;
      return summary;
    },
    { totalServings: 0, totalAmount: 0 },
  );
}

export function buildOrderData(items, data) {
  const { totalServings, totalAmount } = calculateOrderSummary(items);

  return {
    ...data,
    items: items.map((item) => ({
      ...item,
      unitUsage: Object.entries(item.unitUsage || {}).map(([uuid, value]) => ({
        uuid,
        ...value,
      })),
    })),
    totalServings,
    totalAmount,
    tableNumber: data.tableNumber?.value ?? null,
    pickupTime: data.pickupTime?.value ?? null,
    paid: data.paid?.value ?? "未付款",
    status: data.status?.value ?? "準備中",
  };
}

export function findItemIndexById(items, uniqueId) {
  return items.findIndex((item) => item.uniqueId === uniqueId);
}

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
  const stockResult = checkStock({ unit, delta, inventoryObj, orderDish });

  if (!stockResult.isAvailable) return stockResult;

  return {
    isAvailable: true,
    error: null,
    data: {
      ...orderDish,
      unitUsage: unit,
      deltaUsage: delta,
      uniqueId: getId(orderDish),
      unitPrice: calculateUnitPrice(orderDish, activeCustomizations),
    },
  };
}

function buildUsage({
  orderDish,
  activeCustomizations,
  inventoryObj,
  servings,
  isEdit,
}) {
  const unit = {};
  const delta = {};

  const accumulateUsage = (usage, key, name, quantity) => {
    const previousQuantity = usage[key]?.quantity ?? 0;
    usage[key] = { name, quantity: previousQuantity + quantity };
  };

  const ingredients = [
    ...orderDish.ingredients,
    ...activeCustomizations.flatMap(
      (customization) => customization.selectedOptions,
    ),
  ];

  for (const { ingredient, quantity } of ingredients) {
    if (ingredient === null) continue;

    if (!Object.hasOwn(inventoryObj, ingredient)) {
      return {
        isAvailable: false,
        error: {
          title: "餐點資料異常",
          message: "餐點使用的部分食材不存在，請重新選購餐點。",
        },
        data: null,
      };
    }

    const { name } = inventoryObj[ingredient];
    accumulateUsage(unit, ingredient, name, quantity);
    accumulateUsage(delta, ingredient, name, quantity * servings);
  }

  if (isEdit) {
    for (const [key, value] of Object.entries(orderDish.unitUsage || {})) {
      if (!Object.hasOwn(inventoryObj, key)) continue;

      const { name } = inventoryObj[key];
      accumulateUsage(delta, key, name, -value.quantity * orderDish.servings);
    }
  }

  return { isAvailable: true, unit, delta };
}

function checkStock({ unit, delta, inventoryObj, orderDish }) {
  const shortages = { list: [], max: Infinity };
  const previousUsage = orderDish.unitUsage || {};
  const previousServings = orderDish.servings || 0;

  for (const [key, { name, quantity: deltaQuantity }] of Object.entries(
    delta,
  )) {
    const item = inventoryObj[key];
    if (!item) continue;

    const { remainingQuantity } = item;

    if (deltaQuantity > remainingQuantity) {
      shortages.list.push(name);

      const unitQuantity = unit[key]?.quantity ?? 0;
      const previousQuantity = previousUsage[key]?.quantity ?? 0;
      const available = remainingQuantity + previousQuantity * previousServings;

      if (!unitQuantity) continue;
      shortages.max = Math.min(
        shortages.max,
        Math.floor(available / unitQuantity),
      );
    }
  }

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

function getId(orderDish) {
  return (
    orderDish.uniqueId ||
    Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
  );
}

function calculateUnitPrice(orderDish, activeCustomizations) {
  const basePrice = orderDish.basePrice - orderDish.discount;

  const customizationPrice = activeCustomizations.reduce(
    (total, customization) =>
      total +
      customization.selectedOptions.reduce(
        (subtotal, option) => subtotal + option.extraPrice,
        0,
      ),
    0,
  );

  return basePrice + customizationPrice;
}

export function updateInventory(inventoryObj, deltaUsage) {
  return Object.entries(deltaUsage).reduce(
    (updatedInventory, [uuid, { quantity }]) => {
      const item = updatedInventory[uuid];
      if (!item) return updatedInventory;

      updatedInventory[uuid] = {
        ...item,
        remainingQuantity: item.remainingQuantity - quantity,
      };

      return updatedInventory;
    },
    { ...inventoryObj },
  );
}
