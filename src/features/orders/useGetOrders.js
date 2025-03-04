// 取得所有訂單數據
import { useQuery } from "@tanstack/react-query";
import { getOrdersApi } from "../../services/apiOrder";

function useGetOrders() {
  const {
    data: ordersData,
    isPending,
    error,
  } = useQuery({
    queryFn: getOrdersApi,
    queryKey: ["orders"],
  });
  return { ordersData, isPending };
}

export default useGetOrders;
