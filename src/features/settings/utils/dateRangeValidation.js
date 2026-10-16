import { compareAsc, isEqual } from "date-fns";

export function validateDateRangeField(days = []) {
  const errors = Array(days.length).fill(null);
  const validSlots = [];

  days.forEach((day, index) => {
    const range = day?.dateRange;

    if (!range) return;

    const { from, to } = range;

    if (!from || !to) return;

    const start = new Date(from);
    const end = new Date(to);

    validSlots.push(
      { value: start, type: "start", index },
      { value: end, type: "end", index },
    );
  });

  validSlots.sort((a, b) => {
    if (!isEqual(a.value, b.value)) {
      return compareAsc(a.value, b.value);
    }

    if (a.type === "start" && b.type === "end") return -1;
    if (a.type === "end" && b.type === "start") return 1;

    return 0;
  });

  let activeCount = 0;

  for (const current of validSlots) {
    if (current.type === "start") {
      if (activeCount > 0 && !errors[current.index]) {
        errors[current.index] = "與上方已設定的日期重疊";
      }

      activeCount++;
    } else {
      activeCount--;
    }
  }

  return errors;
}
