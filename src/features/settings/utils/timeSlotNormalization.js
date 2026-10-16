import { compareAsc, format } from "date-fns";

function normalizeDaySlots(timeSlots = []) {
  const cleaned = [];

  for (const slot of timeSlots) {
    let openTime = slot.openTime;
    let closeTime = slot.closeTime;
    const open = openTime.value;
    const close = closeTime.value;

    if (open === close) continue;

    if (close < open) {
      [openTime, closeTime] = [closeTime, openTime];
    }

    cleaned.push({ openTime, closeTime });
  }

  cleaned.sort((a, b) => a.openTime.value - b.openTime.value);

  const merged = [];

  for (const current of cleaned) {
    const last = merged[merged.length - 1];

    if (!last) {
      merged.push(current);
      continue;
    }

    if (current.openTime.value <= last.closeTime.value) {
      if (current.closeTime.value > last.closeTime.value) {
        last.closeTime = current.closeTime;
      }
    } else {
      merged.push(current);
    }
  }

  return merged;
}

export function normalizeRegularOpenHours(data = []) {
  return data.map((day) => ({
    ...day,
    timeSlots: normalizeDaySlots(day.timeSlots),
  }));
}

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
