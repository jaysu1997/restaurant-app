import { useQuery } from "@tanstack/react-query";
import { getOrderApi } from "../../../services/apiOrder";
import { useParams } from "react-router";
import { withFallbackRetry } from "../../../utils/helpers";

// 根據params(orderId)獲取對應訂單數據
function useGetOrder() {
  const { orderId } = useParams();

  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrderApi(orderId),
  });

  return {
    data,
    isPending,
    error: withFallbackRetry(error, refetch),
    isError,
  };
}

export default useGetOrder;
