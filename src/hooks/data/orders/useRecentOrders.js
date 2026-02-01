import { useQuery } from "@tanstack/react-query";
import { getLast7DaysOrdersApi } from "../../../services/apiOrder";
import { withFallbackRetry } from "../../../utils/helpers";

// 取得所有訂單數據
function useRecentOrders() {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["last7DaysOrders"],
    queryFn: getLast7DaysOrdersApi,
  });

  return {
    recentOrders: data,
    recentOrdersIsLoading: isPending,
    recentOrdersIsError: isError,
    recentOrdersError: withFallbackRetry(error, refetch),
  };
}

export default useRecentOrders;
