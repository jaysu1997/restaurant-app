import { format, parseISO, isValid } from "date-fns";

// 驗證當前的searchParams value是否為合法選項
export function getValidParam(paramValue, validValues, fallback = "") {
  return validValues.includes(paramValue) ? paramValue : fallback;
}

// 解析日期篩選條件(searchParams)
// 這個應該要換位置
export function parseDateRange(searchParams) {
  const createdTimeParams = searchParams.get("createdAt");

  // 預防無value和錯誤的searchParams url
  if (!createdTimeParams) return null;

  const parts = createdTimeParams.split("_");

  if (parts.length !== 2) return null;

  const [fromStr, toStr] = parts;
  const fromDate = parseISO(fromStr);
  const toDate = parseISO(toStr);

  if (!isValid(fromDate) || !isValid(toDate)) return null;

  // 回傳日期物件
  return {
    from: fromDate,
    to: toDate,
  };
}

// 從url取得searchParams值
export function parseFilterQuery(searchParams, filtersConfig) {
  return filtersConfig.reduce((acc, filter) => {
    const { queryKey, type, options } = filter;
    let value = "";

    if (searchParams.get(queryKey)) {
      if (type === "textInput" || type === "numberInput") {
        value = searchParams.get(queryKey);
      }

      if (type === "select") {
        const validValues = options.map((option) => option.value);
        value = getValidParam(searchParams.get(queryKey), validValues, "");
      }

      if (type === "datePicker") {
        const dateRange = parseDateRange(searchParams);
        value = dateRange;
      }
    }

    acc[queryKey] = { type, value };
    return acc;
  }, {});
}

// 是否有正在套用中的篩選條件
export function hasActiveFilters(filterState) {
  return Object.values(filterState).some((filter) => !!filter.value);
}

// 處理searchParams更新(URL)
export function buildSearchParams(filters, searchParams) {
  const newParams = new URLSearchParams(searchParams);

  for (const [key, obj] of Object.entries(filters)) {
    let value = "";

    if (obj.type === "textInput" && obj.value) {
      value = obj.value.trim();
    }

    if (obj.type === "numberInput" && obj.value) {
      value = obj.value.trim().replace(/^#\s*/, "");
    }

    if (obj.type === "select" && obj.value) {
      value = obj.value;
    }

    if (obj.type === "datePicker" && obj.value?.from && obj.value?.to) {
      value = `${format(obj.value.from, "yyyy-MM-dd")}_${format(obj.value.to, "yyyy-MM-dd")}`;
    }

    // 有篩選的項目新增，沒篩選的刪除
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
  }

  return newParams;
}
