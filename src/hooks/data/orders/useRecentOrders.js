import { useQuery } from "@tanstack/react-query";
import { getRecentOrdersApi } from "../../../services/apiOrders";
import useSettings from "../../../context/settings/useSettings";

// 取得近期訂單數據
function useRecentOrders() {
  // 新的一天，自動刷新
  const { dateKey } = useSettings();
  const recentOrdersQuery = useQuery({
    queryKey: ["recentOrders", dateKey],
    queryFn: getRecentOrdersApi,
  });

  return recentOrdersQuery;
}

export default useRecentOrders;
