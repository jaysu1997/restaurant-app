import {
  addDays,
  addMinutes,
  eachMinuteOfInterval,
  endOfDay,
  format,
  getDay,
  isAfter,
  isBefore,
  isTomorrow,
  isWithinInterval,
  set,
  startOfDay,
} from "date-fns";

// 將日期物件轉換成小時:分鐘字串
export function formatToHourMinute(date) {
  return format(date, "HH:mm");
}

// 生成單一分區的內用桌號字串陣列
export function generateTableNumbers(zoneName, tableCount) {
  if (!tableCount) return [];
  return Array.from(
    { length: tableCount },
    (_, i) => `${zoneName}${zoneName.trim() ? " - " : ""}${i + 1}`
  );
}

// 生成所有內用桌號選項
export function generateDineInTableOptions(settingsData) {
  const { dineInTableConfig } = settingsData;

  const options = dineInTableConfig
    .flatMap((zone) => {
      const { zoneName, tableCount } = zone;
      const tableNumbers = generateTableNumbers(zoneName, tableCount);
      return tableNumbers;
    })
    .map((table) => ({ label: table, value: table }));

  return options;
}

// 根據輸入的時間字串，轉換成指定期的日期時間物件(以便每天的營業狀態判別不會出錯)
export function parseTimeToDate(date, timeStr) {
  const hours = Number(timeStr.slice(0, 2));
  const minutes = Number(timeStr.slice(3));
  // 沒辦法指定隔天凌晨00:00:00為休息時間，所以只能設定成23:59:59
  const seconds = timeStr === "23:59" ? 59 : 0;

  return set(date, { hours, minutes, seconds });
}

// 取得指定日期的營業時段(並轉換時段數據到指定日期)
export function matchOpenHours(settingsData, date) {
  const { regularOpenHours, specialOpenHours } = settingsData;

  // 特殊營業時間設定優先，沒有的話才使用一般營業時間設定
  const result =
    specialOpenHours.find((special) =>
      isWithinInterval(date, {
        start: startOfDay(new Date(special.dateRange.from)),
        end: endOfDay(new Date(special.dateRange.to)),
      })
    ) || regularOpenHours.at(getDay(date) - 1);

  // 需要深拷貝，否則會修改到原始數據造成錯誤
  const openHours = structuredClone(result);

  // 轉換到參數指定的日期
  openHours.timeSlots.forEach((slot) => {
    const { openTime, closeTime } = slot;

    if (openTime?.value && closeTime?.value) {
      openTime.value = parseTimeToDate(date, openTime.label);
      closeTime.value = parseTimeToDate(date, closeTime.label);
    }
  });

  return openHours;
}

// 取得今天的營業資訊
export function getOpenHoursInfo(settingsData, date) {
  const now = date;
  const todayOpenHours = matchOpenHours(settingsData, now);
  const lastTimeSlot = todayOpenHours.timeSlots.at(-1);

  // 檢查是否有跨夜營業
  if (
    todayOpenHours.isBusinessDay &&
    lastTimeSlot.closeTime.label === "23:59"
  ) {
    const tomorrowOpenHours = matchOpenHours(settingsData, addDays(now, 1));
    const firstTimeSlot = tomorrowOpenHours.timeSlots[0];

    // 如果有跨夜營業，代表今天不是23:59休息，而是明天第一個營業時段的休息時間
    if (
      tomorrowOpenHours.isBusinessDay &&
      firstTimeSlot.openTime.label === "00:00"
    ) {
      const { label, value } = firstTimeSlot.closeTime;
      lastTimeSlot.closeTime = { label, value };
    }
  }

  return todayOpenHours;
}

// 根據輸入的起迄時間，生成間隔10分鐘的時間選項列
export function generateTimeOptions(start, end) {
  const timeOptions = eachMinuteOfInterval(
    { start: start, end: end },
    { step: 10 }
  ).map((time) => ({
    label: formatToHourMinute(time),
    value: time,
  }));

  // 23:59需要自己手動添加
  if (formatToHourMinute(end) === "23:59") {
    timeOptions.push({ label: formatToHourMinute(end), value: end });
  }

  return timeOptions;
}

// 根據今日營業時段和當前時間來生成可選取餐時間選項
export function generatePickupTimeOptions(todayOpenInfo) {
  if (!todayOpenInfo.isBusinessDay) return [];

  const now = new Date();
  const earliestPickupTime = addMinutes(now, 20);

  // 先篩選掉已經經過的營業時段
  const pickupTime = todayOpenInfo.timeSlots
    .filter((slot) => {
      const { closeTime } = slot;

      return !isBefore(closeTime.value, earliestPickupTime);
    })
    .flatMap((slot) => {
      const start = slot.openTime.value;
      const end = slot.closeTime.value;
      return generateTimeOptions(start, end);
    });

  if (
    pickupTime.length !== 0 &&
    isWithinInterval(earliestPickupTime, {
      start: pickupTime[0].value,
      end: pickupTime.at(-1).value,
    })
  ) {
    const result = pickupTime.findIndex((option) =>
      isAfter(option.value, earliestPickupTime)
    );

    pickupTime.splice(0, result);
    pickupTime.unshift({
      label: formatToHourMinute(earliestPickupTime),
      value: earliestPickupTime,
    });
  }

  return pickupTime;
}

// 取得當前是否營業中的狀態
export function getOpenStatus(todayOpenInfo) {
  const now = new Date();
  let nextUpdateTime;
  let isOpenNow = false;
  let tooltip = "今日公休";

  const { isBusinessDay, timeSlots } = todayOpenInfo;

  if (!isBusinessDay) return { isOpenNow, tooltip, nextUpdateTime };

  for (const slot of timeSlots) {
    const open = slot.openTime.value;
    const close = slot.closeTime.value;

    if (open > now) {
      nextUpdateTime = open;
      tooltip = `${formatToHourMinute(open)} 開始營業`;
      break;
    } else if (isWithinInterval(now, { start: open, end: close })) {
      isOpenNow = true;
      nextUpdateTime = close;
      // 結束時間可能是明日，需要先進行判別
      const tomorrow = isTomorrow(close);
      tooltip = `${tomorrow ? "明日 " : ""}${formatToHourMinute(close)} 休息`;
      break;
    }
    tooltip = "今日已打烊";
  }
  return { isOpenNow, tooltip, nextUpdateTime };
}
