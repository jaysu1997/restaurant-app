import { compareAsc } from "date-fns";

// 排序時間日期，讓ui可以更有序
export function sortTimeSlots(timeSlots) {
  return timeSlots.map((date) => ({
    ...date,
    timeSlots: date.timeSlots.toSorted((a, b) => {
      if (!a?.openTime?.value) return 1;
      if (!b?.openTime?.value) return -1;
      if (!a?.openTime?.value && !b?.openTime?.value) return 0;

      return compareAsc(a.openTime.value, b.openTime.value);
    }),
  }));
}
