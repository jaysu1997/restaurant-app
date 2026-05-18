import {
  addDays,
  addMinutes,
  endOfDay,
  endOfToday,
  format,
  getDay,
  getTime,
  isSameDay,
  isWithinInterval,
  max,
  parse,
  set,
  startOfDay,
} from "date-fns";

// 生成單一分區的內用桌號字串陣列
export function generateTableNumbers(zoneName, tableCount) {
  if (!tableCount) return [];

  const prefix = zoneName.trim();

  return Array.from(
    { length: tableCount },
    (_, i) => `${prefix ? `${prefix} - ` : ""}${i + 1}`,
  );
}

// 生成所有內用桌號選項
export function generateDineInTableOptions(settingsData) {
  const dineInTableConfig = settingsData?.dineInTableConfig ?? [];

  const options = dineInTableConfig
    .flatMap(({ zoneName, tableCount }) =>
      generateTableNumbers(zoneName, tableCount),
    )
    .map((table) => ({ label: table, value: table }));

  return options;
}

// 這個用來轉yyyy-mm-dd變成日期物件
// 或許可以改放到通用utils
export function parseYMD(dateStr) {
  return parse(dateStr, "yyyy-MM-dd", new Date());
}

// 把分鐘number轉成日期物件
export function minutesToDate(baseDate, totalMinutes) {
  return addMinutes(startOfDay(baseDate), totalMinutes);
}

// 把日期物件轉成字串label(當天只需要顯示時間)
export function formatPickupStr(date, baseDate = new Date()) {
  return format(date, isSameDay(date, baseDate) ? "HH:mm" : "MM/dd HH:mm");
}

// 取得指定日期的營業設定
export function matchOpenHours(settingsData, date) {
  const { regularOpenHours, specialOpenHours } = settingsData;

  // 特殊營業時間設定優先，沒有的話才使用一般營業時間設定
  const todayOpenHours =
    specialOpenHours.find((special) =>
      isWithinInterval(date, {
        start: startOfDay(parseYMD(special.dateRange.from)),
        end: endOfDay(parseYMD(special.dateRange.to)),
      }),
    ) || regularOpenHours.at(getDay(date) - 1);

  return todayOpenHours;
}

// 取得今天的營業資訊
export function getOpenHoursInfo(settingsData, dateKey) {
  const date = parseYMD(dateKey);
  const today = matchOpenHours(settingsData, date);
  const lastTimeSlot = today.timeSlots.at(-1);

  const todayOpenInfo = {
    ...today,
    timeSlots: today.timeSlots.map((slot) => {
      const open = minutesToDate(date, slot.openTime.value);
      const close = minutesToDate(date, slot.closeTime.value);

      return {
        ...slot,
        openTime: {
          label: formatPickupStr(open, date),
          value: open,
        },
        closeTime: {
          label: formatPickupStr(close, date),
          value: close,
        },
      };
    }),
  };

  // 今天營業到24:00 + 明天00:00開始營業 = 跨日營業時段
  if (today.isBusinessDay && lastTimeSlot?.closeTime.value === 1440) {
    const tomorrow = matchOpenHours(settingsData, addDays(date, 1));
    const firstTimeSlot = tomorrow.timeSlots?.[0];

    if (tomorrow.isBusinessDay && firstTimeSlot?.openTime.value === 0) {
      const nextCloseValue = minutesToDate(
        date,
        firstTimeSlot.closeTime.value + 1440,
      );

      todayOpenInfo.timeSlots.at(-1).closeTime = {
        ...todayOpenInfo.timeSlots.at(-1).closeTime,
        label: formatPickupStr(nextCloseValue, date),
        value: nextCloseValue,
      };
    }
  }

  return todayOpenInfo;
}

// 取得當前營業狀態(ui顯示)
export function getOpenStatus(todayOpenInfo) {
  const nowMs = getTime(new Date());
  const endMs = getTime(endOfToday());
  // 每天的00:00都需要更新日期，獲取當日的營業狀態
  const midnightUpdateMs = endMs - nowMs + 1000;

  // 未知狀態
  if (!todayOpenInfo) {
    return {
      status: "unknown",
      tooltip: "暫時無法取得營業狀態",
      nextUpdateMs: midnightUpdateMs,
    };
  }

  // 今日公休
  if (!todayOpenInfo.isBusinessDay) {
    return {
      status: "holiday",
      tooltip: "今日公休",
      nextUpdateMs: midnightUpdateMs,
    };
  }

  const slots = todayOpenInfo.timeSlots || [];

  // 逐段判斷（找到後立即 return）
  for (const slot of slots) {
    const openMs = getTime(slot.openTime.value);
    const closeMs = getTime(slot.closeTime.value);

    // 尚未開始營業（下一個開門點）
    if (nowMs < openMs) {
      return {
        status: "break",
        tooltip: `${slot.openTime.label} 開始營業`,
        nextUpdateMs: openMs - nowMs,
      };
    }

    // 營業中(如果跨夜，需要先在午夜更新日期，取得新一天的營業時段)
    if (nowMs >= openMs && nowMs <= closeMs) {
      return {
        status: "open",
        tooltip: `營業至 ${slot.closeTime.label}`,
        nextUpdateMs: Math.min(closeMs - nowMs, midnightUpdateMs),
      };
    }
  }

  // 全部時段已結束
  return {
    status: "closed",
    tooltip: "今日已打烊",
    nextUpdateMs: midnightUpdateMs,
  };
}

// 生成當前可選的取餐時間選項
export function generatePickupTimeOptions(todayOpenInfo) {
  if (!todayOpenInfo?.isBusinessDay) return [];

  const now = new Date();

  // 對齊到下一個 5 分鐘
  const pickupBaseTime = addMinutes(now, 15);

  const earliestPickupTime = set(pickupBaseTime, {
    minutes: Math.ceil(pickupBaseTime.getMinutes() / 5) * 5,
    seconds: 0,
    milliseconds: 0,
  });

  const pickupTimeOptions = [];

  for (const slot of todayOpenInfo.timeSlots) {
    const openAt = slot.openTime.value;
    const closeAt = slot.closeTime.value;

    if (earliestPickupTime > closeAt) continue;

    const start = max([openAt, earliestPickupTime]);

    for (
      let current = start;
      current <= closeAt;
      current = addMinutes(current, 5)
    ) {
      // 轉ISO字串方便react-select可以對照是否相同
      pickupTimeOptions.push({
        label: formatPickupStr(current, now),
        value: current.toISOString(),
      });
    }
  }

  return pickupTimeOptions;
}
