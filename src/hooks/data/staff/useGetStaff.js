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
    staff: data?.users,
    staffIsLoading: isPending,
    staffIsError: isError,
    staffError: withFallbackRetry(error, refetch),
  };
}

export default useGetStaff;
