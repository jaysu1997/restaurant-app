import {
  isValidPositiveInteger,
  safeParseDate,
} from "../../utils/orderHelpers";
import StyledHotToast from "../StyledHotToast";
import { format } from "date-fns";

// 從url取得searchParams值
function getInitialFilterState(searchParams, filtersConfig) {
  return filtersConfig.reduce((acc, filter) => {
    const { queryKey, type, options } = filter;
    let value = "";

    if (searchParams.get(queryKey)) {
      if (type === "search") {
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
  filtersConfig,
  tempFilters,
  searchParams,
  setSearchParams,
  setIsContainerOpen
) {
  let isValid = true;

  for (const [key, obj] of Object.entries(tempFilters)) {
    let searchParamsValue = "";
    if (obj.type === "search" && obj.value) {
      // 如果輸入數據限定為number，需要進行正整數判定
      const { inputType = "text", title } = filtersConfig.find(
        (filter) => filter.queryKey === key
      );

      if (inputType === "number" && !isValidPositiveInteger(obj.value, "")) {
        StyledHotToast({
          type: "error",
          title: "篩選失敗",
          content: `${title}只能輸入正整數`,
        });

        isValid = false;
      } else {
        searchParamsValue = obj.value.trim();
      }
    }
    if (obj.type === "select" && obj.value?.value) {
      searchParamsValue = obj.value.value;
    }
    if (obj.type === "datePicker" && obj.value?.from && obj.value?.to) {
      searchParamsValue = `${format(obj.value.from, "yyyy-MM-dd")}_${format(
        obj.value.to,
        "yyyy-MM-dd"
      )}`;
    }

    if (searchParamsValue) {
      searchParams.set(key, searchParamsValue);
    } else {
      // 刪除沒有進行篩選的searchParams
      searchParams.delete(key);
    }
  }

  if (isValid) {
    if (pathname === "/orders") {
      searchParams.set("page", "1");
    }

    setSearchParams(searchParams);
    setIsContainerOpen(false);
  }
}

export { getInitialFilterState, handleSearchParams, safeParseDate };
