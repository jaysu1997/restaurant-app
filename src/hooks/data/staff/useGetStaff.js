// 測試取得所有用戶數據
import { useQuery } from "@tanstack/react-query";
import { getStaffApi } from "../../../services/apiStaff";
import { withFallbackRetry } from "../../../utils/helpers";

function useGetStaff() {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryFn: getStaffApi,
    queryKey: ["staff"],
  });

  return {
    data: data?.users,
    isPending,
    error: withFallbackRetry(error, refetch),
    isError,
  };
}

export default useGetStaff;
