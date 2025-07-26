import { compareAsc } from "date-fns";

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
