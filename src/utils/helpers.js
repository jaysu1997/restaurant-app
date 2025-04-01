// 將訂單建立時間格式化
export const formatCreatedTime = function (createdTime) {
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
};

// 訂單編號格式化
export const formatOrderNumber = function (orderNumber) {
  return `# ${String(orderNumber).padStart(3, "0")}`;
};

// 該餐點的所有自訂細項選擇
export const summarizeMealChoices = function (order) {
  return order.customizeDetail
    .reduce((acc, cur) => {
      if (cur.detail.length === 0) return acc;

      acc.push(cur.detail.map((detail) => detail.optionLabel));

      return acc;
    }, [])
    .join(", ");
};

// 計算訂單總消費金額
export const calcOrderTotalPrice = function (orderData) {
  return orderData.reduce((total, item) => {
    total += item.itemTotalPrice * item.servings;

    return total;
  }, 0);
};

// 計算訂單總消費金額
export const calcOrderTotalItems = function (orderData) {
  return orderData.reduce((total, item) => {
    total += item.servings;

    return total;
  }, 0);
};

// 取餐時間選項生成
export const generatePickupTimes = function (startTime, endTime) {
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
};

// 內用桌號選項生成
export const generateTableNumbers = function (count) {
  return Array.from({ length: count }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1),
  }));
};

// 滾動到頁面頂部功能
export const scrollToTop = function () {
  const top = document.querySelector("#top");
  top.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};
