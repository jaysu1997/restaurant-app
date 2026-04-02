import { useQuery } from "@tanstack/react-query";
import { withFallbackRetry } from "../../../utils/helpers";
import { getRecentOrdersApi } from "../../../services/apiOrders";

// 取得近期訂單數據
function useRecentOrders() {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["recentOrders"],
    queryFn: getRecentOrdersApi,
  });

  return {
    recentOrders: data,
    recentOrdersIsLoading: isPending,
    recentOrdersIsError: isError,
    recentOrdersError: withFallbackRetry(error, refetch),
  };
}

export default useRecentOrders;
