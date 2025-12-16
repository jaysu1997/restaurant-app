// 分頁功能custom hook
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getPaginatedOrdersApi } from "../../../services/apiOrder";
import { safeParseDate } from "../../../utils/orderHelpers";
import { addDays, format } from "date-fns";
import { ensurePositiveInt } from "../../../utils/helpers";

// 將日期篩選條件轉換成supabase時間欄位的要求格式
function getCreatedTimeSearchParams(createdTime) {
  if (!createdTime) return null;

  const [fromStr, toStr] = createdTime.split("_");
  const fromDate = safeParseDate(fromStr);
  const toDate = safeParseDate(toStr);

  if (fromDate && toDate) {
    return {
      from: format(fromDate, "yyyy-MM-dd HH:mm:ss"),
      to: format(addDays(toDate, 1), "yyyy-MM-dd HH:mm:ss"),
    };
  }

  return null;
}

function useGetPaginatedOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  // 篩選條件(參數)
  const page = ensurePositiveInt(searchParams.get("page"), 1, 1);
  const pickupNumber = ensurePositiveInt(
    searchParams.get("pickupNumber"),
    null,
    1
  );
  const createdTime = getCreatedTimeSearchParams(
    searchParams.get("createdTime")
  );

  const {
    data: { ordersData = [], curPage = 1, maxPage = 1 } = {},
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["orders", page, createdTime, pickupNumber],
    queryFn: () => getPaginatedOrdersApi(page, createdTime, pickupNumber),
    placeholderData: keepPreviousData,
  });

  // 預先獲取前後頁的數據
  if (curPage < maxPage) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page + 1, createdTime, pickupNumber],
      queryFn: () => getPaginatedOrdersApi(page + 1, createdTime, pickupNumber),
    });
  }
  if (curPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["orders", page - 1, createdTime, pickupNumber],
      queryFn: () => getPaginatedOrdersApi(page - 1, createdTime, pickupNumber),
    });
  }

  return {
    ordersData,
    curPage,
    maxPage,
    isPending,
    isError,
    error,
    createdTime,
    pickupNumber,
  };
}

export default useGetPaginatedOrders;
