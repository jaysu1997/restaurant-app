// 驗證特殊日期區間
import { compareAsc, isEqual } from "date-fns";

export function validateDateRangeField(days = []) {
  // 保持 index 對齊
  const errors = Array(days.length).fill(null);

  // 拿來做 Sweep Line 比較的有效資料
  const validSlots = [];

  days.forEach((day, index) => {
    const range = day?.dateRange;

    // 空值（交給 Controller validate 顯示必填）
    if (!range) return;

    const { from, to } = range || {};

    // 日期未完整選擇
    if (!from || !to) return;

    const start = new Date(from);
    const end = new Date(to);

    // 通過才加入 Sweep Line
    validSlots.push(
      { value: start, type: "start", index },
      { value: end, type: "end", index },
    );
  });

  validSlots.sort((a, b) => {
    if (!isEqual(a.value, b.value)) {
      return compareAsc(a.value, b.value);
    }

    // 同一天：
    // start 排前面 = 當天接續也算重疊
    if (a.type === "start" && b.type === "end") return -1;
    if (a.type === "end" && b.type === "start") return 1;

    return 0;
  });

  let activeCount = 0;

  for (let i = 0; i < validSlots.length; i++) {
    const current = validSlots[i];

    if (current.type === "start") {
      // 只標記後出現的那筆
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
