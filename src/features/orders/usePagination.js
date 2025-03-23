// 分頁功能custom hook
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getOrdersApi } from "../../services/apiOrder";
import { useEffect } from "react";

// 只能是正整數(否則回傳預設值)
function getValidPositiveInteger(searchParams, key, defaultValue = 1) {
  const value = searchParams.get(key);
  return /^[1-9]\d*$/.test(value) ? Number(value) : defaultValue;
}

function usePagination() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // 將不應該存在的錯誤searchParams刪除
  useEffect(
    function () {
      let update = false;
      const searchParamsList = ["page", "items", "date"];

      searchParams.forEach((_, key) => {
        if (!searchParamsList.includes(key)) {
          searchParams.delete(key);
          update = true;
        }
      });

      if (update) setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const page = getValidPositiveInteger(searchParams, "page", 1);
  const itemsPerPage = getValidPositiveInteger(searchParams, "items", 10);

  const date = searchParams.get("date") || "all";

  const {
    data: { ordersData, curPage, maxPage } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["orders", page, itemsPerPage],
    queryFn: () => getOrdersApi(page, itemsPerPage),
    placeholderData: keepPreviousData,
  });

  // 預先獲取前後頁的數據
  if (curPage < maxPage) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page + 1, itemsPerPage],
      queryFn: () => getOrdersApi(page + 1, itemsPerPage),
    });
  }

  if (curPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page - 1, itemsPerPage],
      queryFn: () => getOrdersApi(page - 1, itemsPerPage),
    });
  }

  return {
    ordersData,
    curPage,
    maxPage,
    isPending,
  };
}

export default usePagination;
