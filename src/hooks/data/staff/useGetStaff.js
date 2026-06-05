// 測試取得所有用戶數據
import { useQuery } from "@tanstack/react-query";
import { getStaffApi } from "../../../services/apiStaff";

function useGetStaff() {
  const staffQuery = useQuery({
    queryFn: getStaffApi,
    queryKey: ["staff"],
  });

  return staffQuery;
}

export default useGetStaff;
