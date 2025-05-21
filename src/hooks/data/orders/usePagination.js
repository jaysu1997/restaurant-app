// 分頁功能custom hook
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getOrdersApi } from "../../../services/apiOrder";
import { useEffect } from "react";

// 只能是正整數(否則回傳預設值)
function getValidPositiveInteger(searchParams, key, defaultValue = 1) {
  const value = searchParams.get(key);
  return /^[1-9]\d*$/.test(value) ? Number(value) : defaultValue;
}

function usePagination() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = getValidPositiveInteger(searchParams, "page", 1);

  const date = searchParams.get("date") || "all";

  const {
    data: { ordersData = [], curPage = 1, maxPage = 1 } = {},
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => getOrdersApi(page),
    placeholderData: keepPreviousData,
  });

  // 預先獲取前後頁的數據
  if (curPage < maxPage) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page + 1],
      queryFn: () => getOrdersApi(page + 1),
    });
  }

  if (curPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page - 1],
      queryFn: () => getOrdersApi(page - 1),
    });
  }

  return {
    ordersData,
    curPage,
    maxPage,
    isPending,
    isError,
  };
}

export default usePagination;
