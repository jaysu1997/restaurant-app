import { useQuery } from "@tanstack/react-query";
import { withFallbackRetry } from "../../../utils/helpers";
import { getRecentOrdersApi } from "../../../services/apiOrders";
import useSettings from "../../../context/settings/useSettings";

// 取得近期訂單數據
function useRecentOrders() {
  // 新的一天，自動刷新
  const { dateKey } = useSettings();
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["recentOrders", dateKey],
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
