import { useQuery } from "@tanstack/react-query";
import { getOrderApi } from "../../services/apiOrder";
import { useParams } from "react-router-dom";

// 根據params(orderId)獲取對應訂單數據
function useGetOrder() {
  const { orderId } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderApi(orderId),
  });

  return { data, isPending };
}

export default useGetOrder;
