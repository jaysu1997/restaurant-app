import { safeParseDate } from "../../utils/orderHelpers";
import { format } from "date-fns";

// 從url取得searchParams值
function getInitialFilterState(searchParams, filtersConfig) {
  return filtersConfig.reduce((acc, filter) => {
    const { queryKey, type, options } = filter;
    let value = "";

    if (searchParams.get(queryKey)) {
      if (type === "textInput" || type === "numberInput") {
        value = searchParams.get(queryKey);
      }
      if (type === "select") {
        value =
          options.find((opt) => opt.value === searchParams.get(queryKey)) || "";
      }
      if (type === "datePicker") {
        const [from, to] = searchParams.get(queryKey).split("_");
        // 要檢查日期searchParams是否格式正確
        value = safeParseDate(from) && safeParseDate(to) ? { from, to } : "";
      }
    }

    acc[queryKey] = { type, value };
    return acc;
  }, {});
}

// 處理searchParams更新(URL)
function handleSearchParams(
  pathname,
  tempFilters,
  searchParams,
  setSearchParams,
  setIsContainerOpen,
) {
  for (const [key, obj] of Object.entries(tempFilters)) {
    let searchParamsValue = "";

    // 篩選輸入類型為input(text)所要進行的處理方式
    if (obj.type === "textInput" && obj.value) {
      searchParamsValue = obj.value.trim();
    }

    // 篩選輸入類型為input(number)所要進行的處理方式
    if (obj.type === "numberInput" && obj.value) {
      searchParamsValue = obj.value.trim().replace(/^#\s*/, "");
    }

    // 篩選輸入類型為select所要進行的處理方式
    if (obj.type === "select" && obj.value?.value) {
      searchParamsValue = obj.value.value;
    }

    // 篩選輸入類型為datePicker所要進行的處理方式
    if (obj.type === "datePicker" && obj.value?.from && obj.value?.to) {
      searchParamsValue = `${format(obj.value.from, "yyyy-MM-dd")}_${format(
        obj.value.to,
        "yyyy-MM-dd",
      )}`;
    }

    if (searchParamsValue) {
      searchParams.set(key, searchParamsValue);
    } else {
      // 刪除沒有進行篩選的searchParams
      searchParams.delete(key);
    }
  }

  if (pathname === "/orders") {
    searchParams.set("page", "1");
  }

  setSearchParams(searchParams);
  setIsContainerOpen(false);
}

export { getInitialFilterState, handleSearchParams, safeParseDate };
