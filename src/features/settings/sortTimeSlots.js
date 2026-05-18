// 檔名可能要改或是合併
import { compareAsc, format } from "date-fns";

// 單日 timeSlots 整理
function normalizeDaySlots(timeSlots = []) {
  const cleaned = [];

  // Step 1 清洗資料
  for (const slot of timeSlots) {
    let openTime = slot.openTime;
    let closeTime = slot.closeTime;

    const open = openTime.value;
    const close = closeTime.value;

    // 相同 => 無效
    if (open === close) continue;

    // 填反 => 交換整個物件
    if (close < open) {
      [openTime, closeTime] = [closeTime, openTime];
    }

    cleaned.push({ openTime, closeTime });
  }

  // Step 2 排序
  cleaned.sort((a, b) => a.openTime.value - b.openTime.value);

  // Step 3 合併
  const merged = [];

  for (const current of cleaned) {
    const last = merged[merged.length - 1];

    if (!last) {
      merged.push(current);
      continue;
    }

    if (current.openTime.value <= last.closeTime.value) {
      // 延長 closeTime
      if (current.closeTime.value > last.closeTime.value) {
        last.closeTime = current.closeTime;
      }
    } else {
      merged.push(current);
    }
  }

  return merged;
}

// 整週資料整理(一般營業時間)
export function normalizeRegularOpenHours(data = []) {
  return data.map((day) => ({
    ...day,
    timeSlots: normalizeDaySlots(day.timeSlots),
  }));
}

// 整週資料整理(特殊營業時間)
export function normalizeSpecialOpenHours(data) {
  return data
    .toSorted((a, b) => compareAsc(a.dateRange.from, b.dateRange.from))
    .map((item) => ({
      ...item,
      dateRange: {
        from: format(item.dateRange.from, "yyyy-MM-dd"),
        to: format(item.dateRange.to, "yyyy-MM-dd"),
      },
      timeSlots: normalizeDaySlots(item.timeSlots),
    }));
}
