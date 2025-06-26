import { useQuery } from "@tanstack/react-query";
import { getLast7DaysOrdersApi } from "../../../services/apiOrder";
import { useMemo } from "react";
import analyzeOrders from "../../../features/dashboard/analyzeOrders";

// 取得所有訂單數據
function useAnalyzedOrders() {
  const { data, isPending, error, isError, isSuccess } = useQuery({
    queryKey: ["last7DaysOrders"],
    queryFn: getLast7DaysOrdersApi,
  });

  // 取得數據後進行分析
  const analyzedData = useMemo(() => {
    if (!isSuccess) return null;
    return analyzeOrders(data);
  }, [isSuccess, data]);

  return {
    analyzedData,
    analyzedDataIsPending: isPending || !analyzedData,
    analyzedDataIsError: isError,
    analyzedDataError: error,
  };
}

export default useAnalyzedOrders;
