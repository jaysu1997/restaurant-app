// 分頁功能custom hook
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getPaginatedOrdersApi } from "../../../services/apiOrders";
import { parseDateRange } from "../../../utils/orderHelpers";
import { addDays } from "date-fns";
import { parsePositiveInt, withFallbackRetry } from "../../../utils/helpers";

// 將日期篩選條件轉換成supabase時間欄位的要求格式
function getCreatedTime(searchParams) {
  const dateRange = parseDateRange(searchParams);

  if (dateRange) {
    const { from: fromDate, to: toDate } = dateRange;

    return {
      from: fromDate.toISOString(),
      to: addDays(toDate, 1).toISOString(),
    };
  }

  return null;
}

function useGetPaginatedOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
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

  const createdAt = getCreatedTime(searchParams);

  const {
    data: { ordersData = [], curPage = 1, maxPage = 1 } = {},
    isPending,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orders", page, createdAt, pickupNumber],
    queryFn: () => getPaginatedOrdersApi(page, createdAt, pickupNumber),
    placeholderData: keepPreviousData,
  });

  // 預先獲取前後頁的數據
  if (curPage < maxPage) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page + 1, createdAt, pickupNumber],
      queryFn: () => getPaginatedOrdersApi(page + 1, createdAt, pickupNumber),
    });
  }
  if (curPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page - 1, createdAt, pickupNumber],
      queryFn: () => getPaginatedOrdersApi(page - 1, createdAt, pickupNumber),
    });
  }

  return {
    ordersData,
    curPage,
    maxPage,
    isPending,
    isError,
    error: withFallbackRetry(error, refetch),
    createdAt,
    pickupNumber,
  };
}

export default useGetPaginatedOrders;
