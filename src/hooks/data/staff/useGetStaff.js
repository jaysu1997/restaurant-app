// 測試取得所有用戶數據
import { useQuery } from "@tanstack/react-query";
import { getStaffApi } from "../../../services/apiStaff";

function useGetStaff() {
  const { data, isPending, error, isError } = useQuery({
    queryFn: getStaffApi,
    queryKey: ["staff"],
  });

  return { data: data?.users, isPending, error, isError };
}

export default useGetStaff;
