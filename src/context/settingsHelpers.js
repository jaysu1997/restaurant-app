import {
  addDays,
  addMinutes,
  eachMinuteOfInterval,
  endOfDay,
  format,
  getDay,
  getMinutes,
  isWithinInterval,
  max,
  startOfDay,
} from "date-fns";

// 根據輸入的時間字串，轉換成同一日期的日期時間物件(以便互相比較前後不出錯)
export function parseTimeToDate(timeStr) {
  if (!timeStr) return undefined;
  const hours = Number(timeStr.slice(0, 2));
  const minutes = Number(timeStr.slice(3));
  // 統一設為2025/01/01
  return new Date(2025, 0, 1, hours, minutes);
}

// 取得指定日期的營業時段
export function getOpenHours(regularOpenHours, specialOpenHours, date) {
  // 特殊營業時間設定優先，沒有的話才使用一般營業時間設定
  const openHours =
    specialOpenHours.find((special) =>
      isWithinInterval(date, {
        start: startOfDay(new Date(special.dateRange.from)),
        end: endOfDay(new Date(special.dateRange.to)),
      })
    ) || regularOpenHours.at(getDay(date) - 1);

  return openHours;
}

// 根據輸入的起迄時間，生成間隔10分鐘的時間選項列
export function generateTimeOptions(start, end) {
  const timeOptions = eachMinuteOfInterval(
    { start: parseTimeToDate(start), end: parseTimeToDate(end) },
    { step: 10 }
  ).map((time) => ({
    label: format(time, "HH:mm"),
    value: format(time, "HH:mm"),
  }));

  // 23:59需要自己手動添加
  if (end === "23:59") {
    timeOptions.push({ label: end, value: end });
  }

  return timeOptions;
}

// 根據當前日期時間，生成當天可以取餐的時間
export function generatePickupTimes(regularOpenHours, specialOpenHours) {
  const now = new Date();
  // 取得今日營業時段
  const today = getOpenHours(regularOpenHours, specialOpenHours, now);

  // 今天不營業直接回傳
  if (!today.isOpen)
    return {
      isOpen: false,
      options: [{ label: "本日公休", value: "本日公休" }],
    };

  // 當前時間與10倍數分鐘的差距(餘數)
  const remainder = getMinutes(now) % 10;

  // 最快可選取餐時間(now + 20分鐘)
  const earliestPickupTime = parseTimeToDate(
    format(addMinutes(now, 20), "HH:mm")
  );

  // 在當前時間之後的營業時段
  const remainingTimeSlots = today.timeSlots.filter(
    (slot) =>
      parseTimeToDate(slot.closeTime.value).getTime() >=
      earliestPickupTime.getTime()
  );

  // 如果今日營業時段都已經過去了，回覆已打烊
  if (remainingTimeSlots.length === 0)
    return {
      isOpen: true,
      options: [{ label: "今日已打烊", value: "今日已打烊" }],
    };

  // 今日的取餐時間選項
  const pickupTimesOptions = remainingTimeSlots.flatMap((slot) => {
    // 修正到10分鐘的倍數
    const adjustToNext10Min =
      remainder === 0
        ? earliestPickupTime
        : addMinutes(earliestPickupTime, 10 - remainder);

    const startTime = max([
      parseTimeToDate(slot.openTime.value),
      adjustToNext10Min,
    ]);

    const timeOptions = generateTimeOptions(
      format(startTime, "HH:mm"),
      slot.closeTime.value
    );

    return timeOptions;
  });

  // 檢查最快取餐時間是否適合插入
  if (
    remainder !== 0 &&
    remainingTimeSlots[0].openTime.value < format(earliestPickupTime, "HH:mm")
  ) {
    pickupTimesOptions.unshift({
      label: format(earliestPickupTime, "HH:mm"),
      value: format(earliestPickupTime, "HH:mm"),
    });
  }

  // 如果是跨夜營業
  if (pickupTimesOptions.at(-1).value === "23:59") {
    const tomorrow = getOpenHours(
      regularOpenHours,
      specialOpenHours,
      addDays(now, 1)
    );
    const isOpen = tomorrow.isOpen;
    const start = tomorrow.timeSlots[0].openTime.value;
    const end = tomorrow.timeSlots[0].closeTime.value;

    if (isOpen && start === "00:00") {
      const openHours = generateTimeOptions(start, end);

      openHours.forEach((time) => {
        pickupTimesOptions.push({
          label: `明日 ${time.label}`,
          value: `明日 ${time.value}`,
        });
      });
    }
  }

  return { isOpen: today.isOpen, options: pickupTimesOptions };
}

// 生成單一分區的內用桌號字串陣列
export function generateTableNumbers(zoneName, tableCount) {
  if (!tableCount) return;
  return Array.from(
    { length: tableCount },
    (_, i) => `${zoneName}${zoneName.trim() ? " - " : ""}${i + 1}`
  );
}

// 生成所有內用桌號選項
export function generateDineInTableOptions(dineInTableConfig) {
  const options = dineInTableConfig
    .flatMap((zone) => {
      const { zoneName, tableCount } = zone;
      const tableNumbers = generateTableNumbers(zoneName, tableCount);
      return tableNumbers;
    })
    .map((table) => ({ label: table, value: table }));

  return options;
}
