// 分頁功能custom hook
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getPaginatedOrdersApi } from "../../../services/apiOrders";
import { parsePositiveInt } from "../../../utils/numbers.js";
import { useEffect } from "react";
import { getCreatedAtRange } from "../../../features/orders/utils/orderFilters.js";

function useGetPaginatedOrders() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  // 篩選條件(參數)
  const page = parsePositiveInt(searchParams.get("page"), {
    min: 1,
    fallback: 1,
  });

  // 為了避免輸入的篩選值不是正整數導致數據獲取error，改由-1代替(回傳結果會是無符合數據的空陣列)，null則是沒做篩選
  const pickupNumber = parsePositiveInt(searchParams.get("pickupNumber"), {
    min: 1,
    fallback: searchParams.get("pickupNumber") !== null ? -1 : null,
  });

  const createdAt = getCreatedAtRange(searchParams);

  const ordersQuery = useQuery({
    queryKey: ["orders", page, createdAt, pickupNumber],
    queryFn: () => getPaginatedOrdersApi(page, createdAt, pickupNumber),
  });

  const { isPending } = ordersQuery;
  const totalPages = ordersQuery.data?.totalPages ?? 1;

  // 當page > totalPage，自動校正回最後一個分頁
  useEffect(() => {
    if (isPending || page <= totalPages) return;

    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);

        params.set("page", String(totalPages));

        return params;
      },
      { replace: true },
    );
  }, [isPending, page, totalPages, setSearchParams]);

  useEffect(() => {
    if (isPending) return;

    // 預先獲取前後頁的數據
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["orders", page + 1, createdAt, pickupNumber],
        queryFn: () => getPaginatedOrdersApi(page + 1, createdAt, pickupNumber),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["orders", page - 1, createdAt, pickupNumber],
        queryFn: () => getPaginatedOrdersApi(page - 1, createdAt, pickupNumber),
      });
    }
  }, [isPending, page, totalPages, createdAt, pickupNumber, queryClient]);

  return ordersQuery;
}

export default useGetPaginatedOrders;
