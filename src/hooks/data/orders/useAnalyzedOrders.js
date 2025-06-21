import { useQuery } from "@tanstack/react-query";
import { getOrdersApi } from "../../../services/apiOrder";

// 取得所有訂單數據
function useAnalyzedOrders() {
  const {
    data: ordersData,
    isPending: ordersIsPending,
    error: ordersError,
    isError: ordersIsError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersApi,
  });

  return {
    ordersData,
    ordersIsPending,
    ordersIsError,
    ordersError,
  };
}

export default useAnalyzedOrders;
