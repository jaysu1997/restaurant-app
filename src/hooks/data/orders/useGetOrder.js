import { useQuery } from "@tanstack/react-query";
import { getOrderApi } from "../../../services/apiOrders";
import { useParams } from "react-router";
import { withFallbackRetry } from "../../../utils/helpers";

// 根據params(orderId)獲取對應訂單數據
function useGetOrder() {
  const { orderId } = useParams();

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderApi(orderId),
  });

  return {
    order: data,
    orderIsLoading: isPending,
    orderIsError: isError,
    orderError: withFallbackRetry(error, refetch),
  };
}

export default useGetOrder;
