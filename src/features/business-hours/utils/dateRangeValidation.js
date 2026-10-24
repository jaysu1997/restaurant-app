import { format } from "date-fns";

const OVERLAP_ERROR = "與其他設定的日期重疊";

export function getDateRangeOverlapErrors(days = []) {
  const errors = Array(days.length).fill(null);
  const ranges = [];

  days.forEach((day, index) => {
    const range = day?.dateRange;

    if (!range?.from || !range?.to) return;

    ranges.push({
      start: format(new Date(range.from), "yyyy-MM-dd"),
      end: format(new Date(range.to), "yyyy-MM-dd"),
      index,
    });
  });

  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const a = ranges[i];
      const b = ranges[j];

      const isOverlapping = a.start <= b.end && b.start <= a.end;

      if (isOverlapping) {
        errors[a.index] = OVERLAP_ERROR;
        errors[b.index] = OVERLAP_ERROR;
      }
    }
  }

  return errors;
}
