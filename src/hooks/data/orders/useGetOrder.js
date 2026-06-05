import { useQuery } from "@tanstack/react-query";
import { getOrderApi } from "../../../services/apiOrders";
import { useParams } from "react-router";

// 根據params(orderId)獲取對應訂單數據
function useGetOrder() {
  const { orderId } = useParams();

  const orderQuery = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrderApi(orderId),
  });

  return orderQuery;
}

export default useGetOrder;
