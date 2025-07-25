// 驗證設定頁面的日期和時段欄位
import { compareAsc, isAfter, isEqual } from "date-fns";

export function validateValues({
  normalizeData,
  path,
  setError,
  clearErrors,
  dataType = "time",
}) {
  const validSlots = [];

  normalizeData.forEach((curSlot, curIndex) => {
    const { start, end } = curSlot;

    if (!start || !end) {
      setError(`${path}.${curIndex}.errorFallback`, {
        type: "validate",
        message: "此欄位必須填寫",
      });

      return;
    }

    if (dataType === "time" && !isAfter(new Date(end), new Date(start))) {
      setError(`${path}.${curIndex}.errorFallback`, {
        type: "validate",
        message: "結束時間必須晚於開始時間",
      });

      return;
    }

    validSlots.push(
      { value: start, type: "start", index: curIndex },
      { value: end, type: "end", index: curIndex }
    );
    clearErrors(`${path}.${curIndex}.errorFallback`);
    return;
  });

  return validSlots;
}

export function checkOverlapConflicts({ validSlots, path, setError }) {
  validSlots.sort((a, b) => {
    if (!isEqual(a.value, b.value)) {
      return compareAsc(a.value, b.value);
    }

    // 把 start 的順序排在 end 之前，這樣才能掃出剛休息就馬上開始營業的時段設定(算是重疊)
    if (a.type === "start" && b.type === "end") return -1;
    if (a.type === "end" && b.type === "start") return 1;

    return 0;
  });

  let activeSlots = 0;
  const isOverlapped = new Set();

  validSlots.forEach((slot, curIndex) => {
    const { type, index } = slot;

    if (type === "start") {
      if (activeSlots > 0) {
        isOverlapped.add(index);
        isOverlapped.add(validSlots[curIndex - 1].index);
      }
      activeSlots++;
    } else {
      activeSlots--;
    }
  });

  isOverlapped.forEach((value) =>
    setError(`${path}.${value}.errorFallback`, {
      type: "validate",
      message: "與其他時段發生重疊",
    })
  );
}
