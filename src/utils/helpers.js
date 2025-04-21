// 將訂單建立時間格式化
function formatCreatedTime(createdTime) {
  const time = new Date(createdTime);

  const formattedDate = time.toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = time.toLocaleTimeString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate} ${formattedTime}`;
}

// 訂單編號格式化
function formatOrderNumber(orderNumber) {
  return `# ${String(orderNumber).padStart(3, "0")}`;
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

// 計算訂單總消費金額
function calcOrderTotalPrice(orderData) {
  return orderData.reduce((total, item) => {
    total += item.itemTotalPrice * item.servings;

    return total;
  }, 0);
}

// 計算訂單總份數
function calcOrderTotalItems(orderData) {
  return orderData.reduce((total, item) => {
    total += item.servings;

    return total;
  }, 0);
}

// 取餐時間選項生成
function generatePickupTimes(startTime, endTime) {
  const result = [];
  const now = new Date();
  now.setMinutes(now.getMinutes() + 20);

  const parseTime = (timeStr) => timeStr.split(":").map(Number);

  let [startH, startM] = parseTime(startTime);
  const [endH, endM] = parseTime(endTime);
  const [nowH, nowM] = [now.getHours(), now.getMinutes()];

  if (startH < nowH || (startH === nowH && startM < nowM)) {
    startH = nowH;
    startM = Math.ceil(nowM / 5) * 5;
  }

  while (startH < endH || (startH === endH && startM <= endM)) {
    result.push({
      label: `${String(startH).padStart(2, "0")}:${String(startM).padStart(
        2,
        "0"
      )}`,
      value: `${String(startH).padStart(2, "0")}:${String(startM).padStart(
        2,
        "0"
      )}`,
    });

    startM += 5;
    if (startM >= 60) [startH, startM] = [startH + 1, 0];
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

// 滾動到頁面頂部功能(切換分頁時使用)
function scrollToTop() {
  const top = document.querySelector("#top");
  top?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

// 統計餐點需要消耗的食材數量(1份)
function calcIngredientsUsage(ingredients, curDishCustomizeOption) {
  // 總食材消耗數據
  const ingredientsUsage = new Map();

  function setingredientsUsage(name, quantity) {
    ingredientsUsage.set(name, ingredientsUsage.get(name) || 0 + quantity);
  }

  // 餐點本身的消耗
  ingredients.forEach((ing) => {
    const name = ing.ingredientName.value;
    const quantity = ing.quantity;

    setingredientsUsage(name, quantity);
  });

  // 額外細項增加的消耗
  curDishCustomizeOption.forEach((obj) => {
    if (obj.length === 0 || obj.detail.length === 0) return;

    obj.detail.forEach((option) => {
      const name = option.ingredientName;
      const quantity = option.quantity;

      // 空字串代表此細項無額外食材消耗
      if (name === "") return;
      setingredientsUsage(name, quantity);
    });
  });

  return ingredientsUsage;
}

// 生成訂單餐點uniqueId
function generateDishItemId(order) {
  const newId = Math.random().toString(36).slice(2, -1);
  // 檢查ID是否會重複
  const idExists = order.some((dish) => dish.uniqueId === newId);

  if (idExists) {
    return generateDishItemId(order);
  }

  return newId;
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

export {
  formatCreatedTime,
  formatOrderNumber,
  summarizeMealChoices,
  calcOrderTotalPrice,
  calcOrderTotalItems,
  generatePickupTimes,
  generateTableNumbers,
  scrollToTop,
  calcIngredientsUsage,
  generateDishItemId,
  compareInventory,
};
