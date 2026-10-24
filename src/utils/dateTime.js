import {
  addMinutes,
  format,
  isDate,
  isSameDay,
  isValid,
  parse,
  parseISO,
  startOfDay,
} from "date-fns";
import { zhTW } from "date-fns/locale";

// 好像還有一些地方有重複使用format(Date, yyyy-MM-dd)，這個或許也可以抽成helpers
export function formatDateTime(dateTime) {
  return format(new Date(dateTime), "yyyy年MM月dd日 HH:mm", {
    locale: zhTW,
  });
}

export function formatTime(dateTime) {
  return format(new Date(dateTime), "HH:mm");
}

export function formatPickupStr(date, baseDate = new Date()) {
  return format(date, isSameDay(date, baseDate) ? "HH:mm" : "MM/dd HH:mm");
}

export function formatRangeDate(selectedDate) {
  return `${format(selectedDate.from, "yyyy/MM/dd")} ~ ${format(
    selectedDate.to,
    "yyyy/MM/dd",
  )}`;
}

export function normalizeCalendarDate(value) {
  const fallback = new Date();

  if (!value) return fallback;

  if (isDate(value)) {
    return isValid(value) ? value : fallback;
  }

  if (typeof value === "string") {
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : fallback;
  }

  return fallback;
}

export function parseYMD(dateString) {
  return parse(dateString, "yyyy-MM-dd", new Date());
}

export function minutesToDate(baseDate, totalMinutes) {
  return addMinutes(startOfDay(baseDate), totalMinutes);
}
