import { parseDateRange } from "../../utils/orderHelpers";
import { formatISO } from "date-fns";

// 從url取得searchParams值
function parseFilterQuery(searchParams, filtersConfig) {
  return filtersConfig.reduce((acc, filter) => {
    const { queryKey, type } = filter;
    let value = "";

    if (searchParams.get(queryKey)) {
      if (type === "textInput" || type === "numberInput") {
        value = searchParams.get(queryKey);
      }
      if (type === "select") {
        value = searchParams.get(queryKey);
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

// 處理searchParams更新(URL)
function buildSearchParams(filters, searchParams) {
  const params = new URLSearchParams(searchParams);

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
      value = `${formatISO(obj.value.from)}_${formatISO(obj.value.to)}`;
    }

    // 有篩選的項目新增，沒篩選的刪除
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }

  return params;
}

export { parseFilterQuery, buildSearchParams };
